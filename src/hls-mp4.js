import muxjs from 'mux.js';

// Keep one transmuxer for the entire recording so fragment timestamps stay continuous.
// Await each disk write before accepting another segment to bound memory usage.
export function createMp4Writer(output) {
    const transmuxer = new muxjs.mp4.Transmuxer({ remux: true });
    let initSegment;
    let chunks = [];
    transmuxer.on('data', (segment) => {
        if (!initSegment) {
            chunks.push(segment.initSegment);
            initSegment = segment.initSegment;
        } else if (initSegment.length !== segment.initSegment.length ||
            initSegment.some((byte, index) => byte !== segment.initSegment[index])) {
            throw new Error('视频轨道或编码参数发生变化，无法连续封装为 MP4');
        }
        chunks.push(segment.data);
    });

    return {
        async write(chunk) {
            transmuxer.push(new Uint8Array(chunk));
            transmuxer.flush();
            if (chunks.length === 0) {
                throw new Error('无法将该视频分片封装为 MP4（需要 H.264/AAC 编码）');
            }
            const pending = chunks;
            chunks = [];
            for (const data of pending) await output.write(data);
        },
        dispose() {
            chunks = [];
            transmuxer.dispose();
        },
    };
}
