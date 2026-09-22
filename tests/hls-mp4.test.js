import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, readFile, readdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createMp4Writer } from '../src/hls-mp4.js';

// Integration test: requires ffmpeg and ffprobe on PATH.
let hasFfmpeg = true;
try {
    execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' });
    execFileSync('ffprobe', ['-version'], { stdio: 'ignore' });
} catch {
    hasFfmpeg = false;
}

for (const audio of [true, false]) {
    test(`multiple HLS segments produce playable MP4 (audio=${audio})`, { skip: !hasFfmpeg }, async () => {
        const dir = await mkdtemp(join(tmpdir(), 'pku-mp4-'));
        let writer;
        try {
            const args = ['-v', 'error', '-f', 'lavfi', '-i', 'testsrc2=size=160x90:rate=25'];
            if (audio) args.push('-f', 'lavfi', '-i', 'sine=frequency=440:sample_rate=48000');
            args.push('-t', '6', '-c:v', 'libx264', '-g', '50', '-c:a', 'aac',
                '-f', 'hls', '-hls_time', '2', '-hls_list_size', '0', join(dir, 'input.m3u8'));
            execFileSync('ffmpeg', args);
            const chunks = [];
            writer = createMp4Writer({ async write(data) { chunks.push(data); } });
            for (const file of (await readdir(dir)).filter((name) => name.endsWith('.ts')).sort()) {
                await writer.write(await readFile(join(dir, file)));
            }
            const mp4 = Buffer.concat(chunks);
            assert.equal(mp4.toString('ascii', 4, 8), 'ftyp');
            const target = join(dir, 'output.mp4');
            await writeFile(target, mp4);
            const probe = JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-show_streams', '-show_format', '-of', 'json', target]));
            assert.deepEqual(probe.streams.map((s) => s.codec_name).sort(), audio ? ['aac', 'h264'] : ['h264']);
            assert.ok(Math.abs(Number(probe.format.duration) - 6) < 0.2, probe.format.duration);
            execFileSync('ffmpeg', ['-v', 'error', '-xerror', '-i', target, '-f', 'null', '-']);
        } finally {
            writer?.dispose();
            await rm(dir, { recursive: true, force: true });
        }
    });
}

test('invalid input fails instead of saving a fake MP4', async () => {
    const writer = createMp4Writer({ write() { assert.fail('unexpected write'); } });
    try {
        await assert.rejects(writer.write(new Uint8Array(188)), /无法/);
    } finally {
        writer.dispose();
    }
});

test('disk write failures propagate to download cleanup', { skip: !hasFfmpeg }, async () => {
    // Actual media write error handling is exercised using a generated TS segment.
    const dir = await mkdtemp(join(tmpdir(), 'pku-mp4-'));
    const writer = createMp4Writer({ async write() { throw new Error('disk full'); } });
    try {
        const target = join(dir, 'input.ts');
        execFileSync('ffmpeg', ['-v', 'error', '-f', 'lavfi', '-i', 'testsrc2=size=160x90:rate=25', '-t', '1', '-c:v', 'libx264', '-f', 'mpegts', target]);
        await assert.rejects(writer.write(await readFile(target)), /disk full/);
    } finally {
        writer.dispose();
        await rm(dir, { recursive: true, force: true });
    }
});
