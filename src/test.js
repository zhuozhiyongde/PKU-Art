// 1. 定义URL字符串
const url =
    'https://resourcese.pku.edu.cn/play/0/harpocrates/2024/03/11/980b81b28e0448b0bed27579cf65e61e/0/playlist.m3u8';

// 2. 使用正则表达式匹配所需的部分
const regex = /\/([a-f0-9]{32})\//;

// 3. 提取匹配结果
const match = url.match(regex);

// 4. 检查匹配结果并输出
if (match && match[1]) {
    console.log(match[1]); // 输出：980b81b28e0448b0bed27579cf65e61e
} else {
    console.log('No match found');
}
