# 课堂实录转文字

把本人可播放的教学网课堂录像转成带时间戳的完整 TXT。识别在本机完成，
不生成总结；输出前只执行繁体转简体。

> [!TIP]
> 初次安装建议先阅读仓库首页的[转写版快速部署](../README.md#-转写版快速部署)。
> 本文用于补充运行参数、存储位置、更新和故障排查。

## 普通用户安装

需要 **Python 3.10 或更高版本**和 **FFmpeg**。先在终端验证：

```bash
python3 --version
ffmpeg -version
ffprobe -version
```

如果命令不存在，请先安装 [Python](https://www.python.org/downloads/) 和
[FFmpeg](https://ffmpeg.org/download.html)。下载本仓库 ZIP 并解压，或者执行：

```bash
git clone https://github.com/qingshungLI/PKU-Art.git
cd PKU-Art
```

推荐使用独立虚拟环境，避免影响电脑里已有的 Python 包。

macOS / Linux：

```bash
python3 -m venv video-text/.venv
video-text/.venv/bin/python -m pip install -r video-text/requirements.txt
video-text/.venv/bin/python video-text/service.py
```

Windows PowerShell：

```powershell
py -m venv video-text/.venv
video-text\.venv\Scripts\python.exe -m pip install -r video-text\requirements.txt
video-text\.venv\Scripts\python.exe video-text\service.py
```

以后每次使用转写功能，只需执行上面最后一条启动命令。终端出现
`PKU-Art transcription service: http://127.0.0.1:8878` 即表示启动成功；使用期间不要关闭该终端。

所有 Python 依赖及允许的版本都声明在 [`requirements.txt`](requirements.txt) 中，
`pip install -r` 会自动安装，无需逐个查找。首次识别会自动下载约 464 MB 的 Whisper `small`
模型，长期磁盘占用约 0.5 GB。服务只监听本机 `127.0.0.1:8878`。

安装和启动必须使用同一个 Python。服务启动时会主动检查 Python 依赖、FFmpeg 和 ffprobe；
缺失时会显示对应的安装提示。

## 更新

使用 Git 克隆的用户可以执行：

```bash
git pull
video-text/.venv/bin/python -m pip install -r video-text/requirements.txt
```

Windows 将第二条命令替换为：

```powershell
video-text\.venv\Scripts\python.exe -m pip install -r video-text\requirements.txt
```

浏览器脚本会通过 Tampermonkey 检查更新；如果没有自动更新，也可以重新点击仓库首页的安装链接。

## 使用

- 单节：打开能正常播放的课堂实录，点击“提取完整课程文字”，完成后下载 TXT。
- 批量：在教学网“我的主页”左侧“工具”下打开“课堂回放文字 · 批量转写”，选择课程后提交。
  浏览器读取鉴权期间保持页面开启；加入队列后只需保持本地服务和网络运行。
- 刷新页面后可以继续查看任务，已完成录像不会重复识别；可以按所选课程下载 ZIP。

服务将队列和结果保存在 `video-text/outputs/jobs/`。未完成任务重启后会恢复，
但中断的当前录像会从头处理。临时音频在切块后删除，识别完的分块也会删除。

## 可选参数

```bash
# 降低内存占用
python3 video-text/service.py --workers 1

# 更大模型，通常更慢
python3 video-text/service.py --model medium --workers 1
```

默认使用 2 个 CPU 进程、int8 和 10 分钟分块。模型在服务进程存活期间只加载一次，
后续课程会复用同一组识别进程；关闭服务后释放内存。内存不足时使用 `--workers 1`。
`--batch-size 8` 虽然可能更快，但实测会改变部分文字，因此默认关闭。

## 限制

仅支持已结束录像、直接音视频地址和 AES-128 HLS。识别可能错写术语、公式或英文，
重要内容请核对原录像。服务不接收 Cookie/JWT；未完成队列会临时保存单个录像的播放清单和密钥，
任务结束后删除。强制结束进程可能在系统临时目录留下 `pku-audio-*`。

## 常见问题

### 页面提示“本地转写服务未连接”

确认 `service.py` 所在终端仍在运行，并且显示的地址是 `http://127.0.0.1:8878`。
服务不能关闭后继续在后台识别。

### 提示缺少 Python 依赖

通常是安装依赖和启动服务用了不同的 Python。请直接使用本文给出的 `.venv/bin/python`
或 `.venv\\Scripts\\python.exe`，不要混用系统 Python、Conda 和虚拟环境。

### 提示缺少 FFmpeg 或 ffprobe

重新安装 FFmpeg，并确认 `ffmpeg -version` 和 `ffprobe -version` 在新终端中都能运行。

### 第一次任务长时间没有开始识别

首次运行需要下载 Whisper 模型，取决于网络速度可能需要几分钟。模型下载完成后不会每节课重复下载。

开发构建检查：

```bash
npm install
npm run build:check
python3 -m py_compile video-text/service.py
python3 -m unittest discover -s video-text -p 'test_*.py'
```

维护者发布本仓库的可安装用户脚本：

```bash
npm run build:fork
```

版本号统一读取 `package.json` 的 `version` 字段，生成结果为 `release/PKU-Art.user.js`。
每次发布功能更新前先递增版本号。普通使用者不需要执行此步骤。
