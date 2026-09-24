<div align="center">

![cover](https://cdn.arthals.ink/bed/2025/11/cover-1b32229620764c46a2717d2b6291d93b.jpg)

# 🎨 PKU Art

</div>

PKU Art 是一款通过浏览器插件向页面附加的用户脚本（UserScript）。它可以完成对于原有样式的覆盖，从而增强教学网、选课网等北大相关网站的视觉体验与功能优化。

PKU Art 第一版发布于 2021 年 11 月，相对简陋；2022 年暑假更新的第二版实现了对第一版完整重构，完美支持了暗色模式，并且增加了更多的交互动效和设计改进。

> [!IMPORTANT]
> 这是增加了**课堂回放本地转写**功能的 Fork。只想使用原版美化功能的同学可以按原方式安装；
> 需要把课程录像转成 TXT 的同学，请按下面的快速部署步骤同时安装浏览器脚本和本地转写服务。

## 🚀 转写版快速部署

转写功能由两部分组成：Tampermonkey 中的 **PKU-Art 浏览器脚本**负责读取本人有权播放的录像，
电脑上的 **本地转写服务**负责临时下载音频并运行 Whisper。两部分缺一不可。

### 第一步：安装浏览器脚本

1. 安装 [Tampermonkey](https://www.tampermonkey.net/)；Chrome/Edge 还需要在扩展管理页打开“允许运行用户脚本”。
2. 点击 [安装 PKU-Art 转写版](https://raw.githubusercontent.com/qingshungLI/PKU-Art/main/release/PKU-Art.user.js)。
3. 在 Tampermonkey 安装页确认版本来自 `qingshungLI/PKU-Art`，然后点击安装。

> 普通使用者**不需要**安装 Node.js、Bun，也不需要自己构建 `.user.js`。

### 第二步：下载本仓库

不熟悉 Git 的同学可以点击仓库右上角 `Code → Download ZIP`，解压后在该目录打开终端。
也可以执行：

```bash
git clone https://github.com/qingshungLI/PKU-Art.git
cd PKU-Art
```

### 第三步：准备本地依赖

需要安装 [Python 3.10 或更高版本](https://www.python.org/downloads/)和
[FFmpeg](https://ffmpeg.org/download.html)。用下面三条命令确认安装成功：

```bash
python3 --version
ffmpeg -version
ffprobe -version
```

然后安装仓库声明的 Python 依赖。

macOS / Linux：

```bash
python3 -m venv video-text/.venv
video-text/.venv/bin/python -m pip install -r video-text/requirements.txt
```

Windows PowerShell：

```powershell
py -m venv video-text/.venv
video-text\.venv\Scripts\python.exe -m pip install -r video-text\requirements.txt
```

所有 Python 包及版本范围都在 [`video-text/requirements.txt`](video-text/requirements.txt) 中，
`pip install -r` 会自动安装，不需要逐个下载。

### 第四步：启动转写服务

macOS / Linux：

```bash
video-text/.venv/bin/python video-text/service.py
```

Windows PowerShell：

```powershell
video-text\.venv\Scripts\python.exe video-text\service.py
```

看到下面这行即表示启动成功。使用转写功能期间请保持这个终端窗口开启：

```text
PKU-Art transcription service: http://127.0.0.1:8878
```

首次识别会自动下载约 464 MB 的 Whisper `small` 模型，长期磁盘占用约 0.5 GB；
课程音频和分块在转写完成后自动删除。本地服务只监听 `127.0.0.1`，不会开放到局域网或公网。

### 第五步：开始使用

- 单节录像：打开能够正常播放的课堂实录，点击“提取完整课程文字”。
- 批量录像：进入教学网“我的主页”，在左侧“工具”下打开“课堂回放文字 · 批量转写”，选择课程后提交。
- 任务进入队列后可以整晚运行；第二天可下载单个 TXT，或将已完成课程批量下载为 ZIP。

更完整的参数、数据目录和故障说明见 [课堂转写详细文档](video-text/README.md)。

<div align="center">

[💫 碎碎念](#-%E7%A2%8E%E7%A2%8E%E5%BF%B5) · [✨ 功能](#-%E5%8A%9F%E8%83%BD) · [📦 安装](#-%E5%AE%89%E8%A3%85) · [🚨 使用须知](#-%E4%BD%BF%E7%94%A8%E9%A1%BB%E7%9F%A5) · [🧑‍💻 贡献](#-%E8%B4%A1%E7%8C%AE) · [📝 更新日志](#-%E6%9B%B4%E6%96%B0%E6%97%A5%E5%BF%97) · [💬 Q&A](#-qa) · [📜 后记](#-%E5%90%8E%E8%AE%B0) · [📋 LICENSE](#-license)

</div>

## 💫 碎碎念

作为一名 PKUer，我从入学伊始就对教学网的样式适应不来，这做的真的太丑了！这怎么会让人有学习的动力呢？！我为什么老摸鱼？不就是因为这教学网让我看了就不想学习吗！（震声

这种不满终于入学考完第一个期中后的某个周四爆发了。我看着又土又老的编程网格，再也忍不下去了，正好周五加周末没啥事，于是开始快乐地在图书馆摸鱼（其实只有最后看到成果的时候才快乐，期间调各种样式啊选择器啊的时候让我简直要吐血，好多知识和语法还是边用边学的），爆肝出了编程网格、IAAA 登录页、教学网大部分页面的 CSS。

我真的很想吐槽那用 Table 搭出来的编程网格、大黑框顶头上的教学网，还有那设计简直离天下之大谱、让我甚至真的想问 “就这还注册专利吗？” 的成绩页面（它居然还用 iframe 套娃套了两层！），但最终，我还是完成了这个略显稚嫩的作品。而这，就是 PKU Art 的诞生了。

现在想想，两三天的时间换未来几年的视觉快感，也算是值辽！

## ✨ 功能

### `1` 界面美化、日夜模式随心切换

<details>
<summary> 点击展开 </summary>

![1](https://cdn.arthals.ink/bed/2025/11/1-c7c2501d0dc21ae06d95378d73259709.jpg)

![2](https://cdn.arthals.ink/bed/2025/11/2-86d49b0f42b363292e70cf0385332011.jpg)

![3](https://cdn.arthals.ink/bed/2025/11/3-a6afff934e6b62349d77dee09d749589.jpg)

![4](https://cdn.arthals.ink/bed/2025/11/4-6de0f0ff3700e959edf315e5f77fcaa9.jpg)

![5](https://cdn.arthals.ink/bed/2025/11/5-3bfc4a18c240245fecbbc20068a35c3f.jpg)

![6](https://cdn.arthals.ink/bed/2025/11/6-7278087b80a5444cb8743bbe01e9171a.jpg)

</details>

### `2` 录播下载、重命名

<details>
<summary> 点击展开 </summary>

![7](https://cdn.arthals.ink/bed/2025/11/7-04e26f6488aa1ea63f5929ccc5654e93.jpg)

2026 年 09 月后，新版录播采用 AES-128 加密的 HLS 分片，后端不再提供可直接下载的单个 MP4。PKU Art 会按网页播放器使用的登录态逐段下载、解密，并以流式方式写入本地，最终保存为 `.ts` 文件；下载过程中请勿关闭录播页面。TS 文件可直接使用 VLC、IINA 等播放器播放，也可以无损封装为 MP4：

```bash
ffmpeg -i input.ts -c copy output.mp4
```

</details>

### `3` 课堂回放转写

将本人可播放的课堂录像转成带时间戳的完整 TXT，支持单节提取、按课程批量排队、
断点恢复和 ZIP 下载。音频只在本机临时处理，完成后自动删除；文字输出只进行繁体转简体，
不会生成摘要。首次使用前需要启动本地识别服务，参见
[课堂回放转写安装说明](video-text/README.md)。

## 📦 安装

> [!WARNING]
> CSS 安装方式自 v2.6.0 版本更新后被完全移除，不再提供支持。请改用 JavaScript 安装方式。

PKU Art 目前只支持 JavaScript 安装方式，兼容 Safari 与 Chrome（Edge/Arc）两大浏览器。

### 前置插件需求

#### Chrome/Edge/Arc

> [!WARNING]
> 注意，由于 Chrome 权限更新，你可能需要在 [扩展页面](chrome://extensions/) 打开开发者模式，详见 [这里](https://www.tampermonkey.net/faq.php?locale=en#Q209)。
>
> ![dev1](https://cdn.arthals.ink/bed/2025/11/dev1-ff3b7de53ddfcbaaa4da31a77a0dfa42.jpg)
>
> ![dev2](https://cdn.arthals.ink/bed/2025/11/dev2-3a8db595639040a8382c93c581521bd1.jpg)

需安装浏览器插件 [TamperMonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)，安装完成后点开 [脚本页面](https://cdn.arthals.ink/release/PKU-Art.user.js) 后自动触发安装页面，跟随指引即可完成安装。

扩展后插件安装完成后，还需要额外进行一些设置如下。

首先，请确保你在扩展页面里，对于 [其扩展设置](chrome://extensions/?id=dhdgffkkebhmkfjojejmpbldmpobfkfo)，打开了：

1. 允许此扩展程序读取和更改您访问网站时留存的所有数据：在所有网站上
2. 固定到工作栏
3. 允许运行用户脚本
4. 在无痕模式下启用
5. 允许访问文件网址

![dev1](https://cdn.arthals.ink/bed/2025/11/dev1-ff3b7de53ddfcbaaa4da31a77a0dfa42.jpg)

![ext1](https://cdn.arthals.ink/bed/2025/11/ext1-e29c00e4e81af2efef11099d4c9a36a3.jpg)

![ext2](https://cdn.arthals.ink/bed/2025/11/ext2-5e7fd2cc934f5acfb325557212234c44.jpg)

此外，出于稳定性的考虑，你还需要在 TamperMonkey 的设置中的 `通用` 面板首先选择 `配置模式` 为 `高级`，随后找到 `下载 BETA` 中的 `下载模式` 选项，修改为 `浏览器 API` 并在弹出窗口中给予授权。

![ext3](https://cdn.arthals.ink/bed/2025/11/ext3-177a91cd1e83e9c7786d078fc21c284a.jpg)

![ext4](https://cdn.arthals.ink/bed/2025/11/ext4-8dcf4549648896d3b161a1e662210d57.jpg)

![ext5](https://cdn.arthals.ink/bed/2025/11/ext5-c505771fef3cb0d32e0a3d0a89b980db.jpg)

![ext6](https://cdn.arthals.ink/bed/2025/11/ext6-7aa880f4b8d772810b3ae1113eb1c32f.jpg)

#### Safari

> [!IMPORTANT]
>
> Safari 下推荐使用 TamperMonkey 插件，因为 UserScripts 插件在 Safari 下存在一些已知问题（插件功能支持有限，为了规避 CSP 限制启用了 `@inject-into page`，导致 GM API 完全不可用，且即使可用也未提供 `GM_download` API），导致不能实现普通 MP4 录播的自动重命名、复制视频下载链接等；HLS 录播仍可逐段下载并保存为 TS 文件。
>
> **注意，无论你选择 UserScripts 还是 TamperMonkey，请都在设置里对扩展的「编辑网站」打开「在每个网站上始终允许」，从而确保一定能对页面完成修改。**
>
> ![safari-ext1](https://cdn.arthals.ink/bed/2025/11/safari-ext1-7726e1ca10e705cca5355e44d3713f22.jpg)
>
> ![safari-ext2](https://cdn.arthals.ink/bed/2025/11/safari-ext2-116f09a88c5d3d14bd10827556b3ddd4.jpg)

Safari 需安装浏览器插件 [UserScripts](https://apps.apple.com/cn/app/userscripts/id1463298887) 或者插件 [TamperMonkey](https://apps.apple.com/cn/app/tampermonkey/id6738342400)（售价 15 ￥，但是功能更全，推荐）：

-   UserScripts：安装好后点击工具栏图标，启用并授权后再在脚本页面点击图标，再点击 Click to install 即可安装。

    ![userscript-install](https://cdn.arthals.ink/bed/2025/11/userscript-install-b2b264b28c4fce3c48325ea9de3eab23.jpg)

-   TamperMonkey：点击链接会自动跳转到安装界面。

对比：TamperMonkey 相较 UserScripts 有着更宽松的权限管理，所以可以实现下载重命名，但需要额外配置如下（操作步骤类似前文 Chrome 一节，可参考附图）：在 TamperMonkey 的设置中的 `通用` 面板首先选择 `配置模式` 为 `高级`，随后找到 `下载 BETA` 中的 `下载模式` 选项，修改为 `浏览器 API` 才可以正常工作，否则会出现 `Out of memory` 的 Bug。不过此时无法正常使用 `onprogress` 回调，所以无法实时显示进度，但只要保持页面不关闭即可正常下载并重命名。

### 安装渠道

-   [CDN for JavaScript](https://cdn.arthals.ink/release/PKU-Art.user.js)：源代码更新后立即更新
-   [GreasyFork](https://greasyfork.org/zh-CN/scripts/436323-pku-art)：每天同步上述源一次

### 安装带课堂转写功能的版本

本仓库的转写版本不会使用上面的官方 CDN。请先安装 Tampermonkey，然后点击
[安装 PKU-Art 转写版](https://raw.githubusercontent.com/qingshungLI/PKU-Art/main/release/PKU-Art.user.js)。
浏览器脚本安装后，再按照[本地转写服务说明](video-text/README.md)安装 Python 依赖并启动服务。
普通使用者不需要安装 Node.js、Bun，也不需要自行构建源码。

## 🚨 使用须知

本脚本移除了一些我觉得没有用处的控件元素，如侧栏的收起框（这个太丑了），播放列表上方的导航栏（下方有一样的），这可能会导致一些特殊情况下，某些功能不可用（如助教功能）。你可以 **随时在插件内禁用本样式** ，以恢复到原有界面。

本样式覆盖了所有我认为常用的界面，但我毕竟不是教学网的专业前端维护人员，所以我并不能做到对全部的页面加以修改。但如果你认为某个页面十分常用但却没有被修改，欢迎联系我，在 GitHub 提 issue，抑或是直接加我微信的方式（zhuozhiyongde）都可以。

如果你喜欢这个样式，请不要吝啬点击 Star（树洞和 GitHub 的都可以！），这是对我最大的鼓励与肯定！

## 🧑‍💻 贡献

欢迎为 PKU Art 贡献代码！

1. 克隆本项目：

    ```bash
    git clone https://github.com/qingshungLI/PKU-Art.git
    ```

2. 进入工作目录，安装依赖：

    ```bash
    cd PKU-Art && bun install
    ```

3. 启动 Vite 服务器以获得 HMR 热更新开发体验：

    ```bash
    bun dev
    ```

4. 如果你需要引入新的图标（`src/css/src` 目录），你可能需要在本地额外启动文件服务器：

    ```bash
    python server.py
    ```

5. 编译，随后在本地预览：

    ```bash
    bun run build
    ```

6. 而后，你就可以发起 Pull Request，我将在审核代码后进行合并，随后更新 CDN。

## 📝 更新日志

参见 [CHANGELOG.md](https://github.com/zhuozhiyongde/PKU-Art/blob/main/CHANGELOG.md) 或 [GitHub Release](https://github.com/zhuozhiyongde/PKU-Art/releases)。

<div align="center">
  <div>
    <picture>
      <source
        media="(prefers-color-scheme:dark)"
        srcset="https://next.ossinsight.io/widgets/official/compose-activity-trends/thumbnail.png?repo_id=432452371&image_size=auto&color_scheme=dark"
        width="800"
        height="auto"
      />
      <img
        alt="Activity Trends of zhuozhiyongde/PKU-Art - Last 28 days"
        src="https://next.ossinsight.io/widgets/official/compose-activity-trends/thumbnail.png?repo_id=432452371&image_size=auto&color_scheme=light"
        width="800"
        height="auto"
      />
    </picture>
  </div>
  &nbsp;
  <div>
  <picture>
    <source media="(prefers-color-scheme:dark)" srcset="https://next.ossinsight.io/widgets/official/analyze-repo-pushes-and-commits-per-month/thumbnail.png?repo_id=432452371&image_size=auto&color_scheme=dark" width="800" height="auto">
    <img alt="Pushes and Commits of zhuozhiyongde/PKU-Art" src="https://next.ossinsight.io/widgets/official/analyze-repo-pushes-and-commits-per-month/thumbnail.png?repo_id=432452371&image_size=auto&color_scheme=light" width="800" height="auto">
  </picture>
  </div>
  &nbsp;
  <div>
    <picture>
      <source
        media="(prefers-color-scheme:dark)"
        srcset="https://next.ossinsight.io/widgets/official/analyze-repo-stars-history/thumbnail.png?repo_id=432452371&image_size=auto&color_scheme=dark"
        width="800"
        height="auto"
      />
      <img
        alt="Star History of zhuozhiyongde/PKU-Art"
        src="https://next.ossinsight.io/widgets/official/analyze-repo-stars-history/thumbnail.png?repo_id=432452371&image_size=auto&color_scheme=light"
        width="800"
        height="auto"
      />
    </picture>
  </div>
</div>

## 💬 Q&A

### 有适配手机版的打算吗？

没有，做手机版自适应工程量几乎等于重构，一个人维护这个项目，我真的太累了 qwq...

### 可以在 iPad 上使用吗？

可以，方式等同于在 Safari 上使用 JavaScript 安装。

### 我可以审阅代码、提交 PR 吗？

十分欢迎！你可以随时访问我的 GitHub，哪里有本项目用到的所有代码。我可以保证项目内不含有任何恶意代码，仅仅是通过附加 css（通过 CDN 分发）来改变页面样式。如果你愿意提交 PR，那我会十分乐意接受的！

## 📜 后记

平日里的我并非是个话很多的人，但这堪称疯狂的一周，实在是让我感触颇丰，总觉得还是得记下点什么。

去年刚刚进入燕园的我，因为受不了编程网格的老土设计，在图书馆摸了好半天，就为了把编程网格做的好看了一点（[树洞#2908869](https://treehole.pku.edu.cn/web/#2908869)），彼时的我甚至连 CSS 的容器布局都不甚了解，好多知识都是在敲代码的过程中才去第一次认真学习，可我没想到的是哪个略显粗糙的拙劣样式，却得到了很多同学的肯定。于是我再接再厉，凭借着那三脚猫的功夫，滥用各种现在看起来简直不可接受的语句完成了对于教学网的美化（也正是这烂到几乎不可维护的屎山让我下定决心重构整个项目），发布了 PKU Art v1。承蒙厚爱，发布以后我得到了很多同学的赞扬，收获了至今为止 Star 最多的一个树洞 & 项目。那段时间我最快乐的一件事情就是每天刷树洞看看涨了多少关注，在 Stylish 上看看涨了多少下载（好虚荣啊 hhh），真是相当感谢大家的支持！

开心过后的我，却也从未忘记，那只是一个徒有其表的半成品，根本经不起哪怕一次 Code Review。事实上，自从发布以后，我自己也就是用着，而并没有想办法去优化。毕竟程序员们不总是有句老话嘛 —— 代码能跑就不要动。就这么凑合着，我搁置了这个项目。

时光转眼来到今年的八月一日。对前端一直很感兴趣的我，在七月份刚刚系统化学了一遍 JavaScript，Vue，React 等前端常用技术，也对 CSS 有了一些新的了解。就如同去年的我一样，闲到不知道干什么的我，终于还是给自己找起了事情做 —— 我要重构这一坨屎山代码！

重构的过程，用到的知识其实相较第一版并没有太大的差异，但有了系统化知识的打底，我对于页面结构有了更深的理解，没有再滥用万能的 translate，也没有随意乱加伪类，而是顺着原有的结构一步步选择适合的语句去实现我想要的效果。同时，一回生二回熟的我，也对教学网的路由和套娃谙熟于心，没有再像之前一样对着一个 iframe 愣半天，也通过正则表达式对于样式生效的网址有了更精细的控制。

要说这一周真的学到了什么，我想，也没有什么。抠细节带来的大概只有对于耐心的考验，每个页面，我大概都要写数个小时才能满意，每个用到颜色的地方我都使用了变量来保证在黑暗模式下的可用性，每个我觉得原先图标不行的地方我都专门去 IconPark 网站上找了替代品并加以更换。Mac 告诉我，为了完成这个项目，我的相关屏幕使用时间在上周达到了 50 个小时，然而这还不算我找参考，挑配色的时间。

我向来是一个对于自己感兴趣的事物会不惜代价去投入的人，可是这次所花费的时间和最终写出的代码行数都远远超出了我最开始的预期。

期间，我也不是没有心生厌倦，我曾问过自己，就算花了这么久时间去写，最后能用上的又有多少人？我付出的时间精力难道不是自娱自乐吗？万一教学网也像编程网格一样更新了样式怎么办？... 但我却总是安慰自己，已经写了这么多了（沉没价值啊啊啊啊），怎么能忍心半途而废呢？于是，就在这种一边否定自己，一边问怀疑原有代码究竟是怎么写出来的，一边机械化的敲着已经用了数百遍的那些属性和变量的过程中，我还是渐渐磨出来了最终的成果 —— 全新的、带黑暗模式的 PKU Art v2。

于是，我终于相信，这一版的 PKU Art v2，足够让我、让大家满意。

## 📋 LICENSE

GPL-3.0 license
