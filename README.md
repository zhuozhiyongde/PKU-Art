# PKU Art
![Alt](https://repobeats.axiom.co/api/embed/272266acd73adbfd5ec5fc97dbab3e7a9aab296c.svg "Repobeats analytics image")
## 简介

PKU Art 是一款通过浏览器插件，向页面附加的 CSS 样式表。它可以完成对于原有样式的覆盖，从而增强教学网视觉体验。第一版发布于去年 11 月，相对简陋，最近更新的第二版实现了对第一版完整的重构，完美支持了暗色模式，并且增加了更多的交互动效和设计改进。



## 下载与开发

### 安装地址

- [Stylish](https://userstyles.org/styles/220453/pku-art)
- [GreasyFork](https://greasyfork.org/zh-CN/scripts/436323-pku-art)
- [Github Release](https://github.com/zhuozhiyongde/PKU-Art/releases)
- [CDN for CSS](https://cdn.arthals.ink/release/PKU-Art.css)
- [CDN for JavaScript](https://cdn.arthals.ink/release/PKU-Art.js)




### 项目地址

- [Github](https://github.com/zhuozhiyongde/PKU-Art)



### 本地开发

* 克隆本项目：

  ```bash
  git clone git@github.com:zhuozhiyongde/PKU-Art.git
  ```

* 进入工作目录后安装依赖：

  ```bash
  npm install
  ```

* 启动 Vite 服务器以获得 HMR 热更新开发体验：

  ```bash
  npm run dev
  ```

* 不要使用 `npm run build` 来构建项目，而是使用 `custom-builder.py` 脚本来生成发布版本：

  ```bash
  python3 custom-builder.py
  ```

  > 注：这么做的原因是我实际使用其构建的脚本存在我目前无法解决的显示 bug，如果你知道怎么解决，欢迎告诉我~
  >
  > 另：请参考现有的 `main.js` 格式来写匹配选择（即一次引入必须只有一个正则表达式），否则 `custom-builder.py` 脚本可能无法正常读取并生成发布版本。



## 更新日志

**2023.02.28 - v2.2.0**

> 修复了一些小的 bug。
>
> 通过更仔细的对比选择器修复了部分小的样式失效问题。
>
> 构建了完整的发布工作流程，并且迁移部署了 CDN 文件发放域名至 https://cdn.arthals.ink/ 下。稍后可能会完全禁用原有途径。




**2023.02.19 - v2.2.0 - dev**

> 状态：开发中，还未构建发布版 css/js。
>
> 简单的用 tampermonkey-vite-plugin 重构了一下，小修了几个明显的显示错误，现在可以直接在本地用 Vite HMR 了，不用手写自动刷新脚本了。



## Todo

参见 [Agenda.md](./Agenda.md)



## 效果预览

> 篇幅所限，只放黑暗模式下的效果: )
>
> 为展示效果，可能对 html 节点有删改，如录播界面太多了放不下

![CleanShot 2022-08-08 at 17.45.44.png](https://s2.loli.net/2022/08/31/NWOSD8TVIu69cfJ.png)
![CleanShot 2022-08-08 at 17.45.49.png](https://s2.loli.net/2022/08/31/IY28ijt9SuJGmb5.png)
![CleanShot 2022-08-08 at 17.49.23.png](https://s2.loli.net/2022/08/31/UXTx7kP6lEQNp3F.png)
![CleanShot 2022-08-08 at 17.46.05.png](https://s2.loli.net/2022/08/31/qG5om2htsXQ6Z8J.png)
![CleanShot 2022-08-08 at 17.46.35.png](https://s2.loli.net/2022/08/31/rjdVDaZPzT7H1iU.png)
![CleanShot 2022-08-08 at 17.47.15.png](https://s2.loli.net/2022/08/31/oKiAdce9z2FbmEP.png)
![CleanShot 2022-08-08 at 17.46.08.png](https://s2.loli.net/2022/08/31/t5s8zngJUVkKuBi.png)
![CleanShot 2022-08-08 at 17.47.40.png](https://s2.loli.net/2022/08/31/EDfsX1ChdakLjrx.png)
![CleanShot 2022-08-08 at 17.47.09.png](https://s2.loli.net/2022/08/31/Ye9N5yafdWOsliK.png)
![CleanShot 2022-08-08 at 17.46.57.png](https://s2.loli.net/2022/08/31/7pK8QN4n6yE1v3f.png)
![CleanShot 2022-08-08 at 17.49.35.png](https://s2.loli.net/2022/08/31/6VBjQGi5mpoWvXh.png)
![CleanShot 2022-08-08 at 17.52.04.png](https://s2.loli.net/2022/08/31/SH3e9wtAkOizDaM.png)
![CleanShot 2022-08-08 at 17.53.02.png](https://s2.loli.net/2022/08/31/VQPlabRoeYUE9uT.png)
![CleanShot 2022-08-08 at 17.49.44.png](https://s2.loli.net/2022/08/31/KEq38ldekCWZonG.png)

## 下载安装

PKU Art 目前支持 css 安装与 js 安装两种安装方式，兼容 Safari 与 Chrome（Edge）两大浏览器。两种安装方式并无效果差异，也都需要借用浏览器插件。

> 补充：有同学反映说 js 安装方式会导致一些页面的渲染会“卡一下”，猜测是 js 注入顺序导致的问题，所以建议同学们采用 css 安装以获得更稳定的体验。

### CSS 安装

#### Safari

需要在 App Store 安装 [Cascadea](https://apps.apple.com/cn/app/cascadea/id1432182561) 应用（￥18）。

安装完成后，访问 [CSS 下载链接](https://userstyles.org/styles/220453/pku-art)，点击右上角的 Install with Cascadea 即可。

除此之外，你也可以通过 [CDN for CSS](https://cdn.arthals.ink/release/PKU-Art.css) 或者 [Github Release](https://github.com/zhuozhiyongde/PKU-Art/releases) 来下载 CSS 源文件，并手动导入到 Cascadea 插件中。



#### Chrome (Edge/Arc/Chromium)

需要在 Chrome web store 安装 [xStyle](https://chrome.google.com/webstore/detail/xstyle/hncgkmhphmncjohllpoleelnibpmccpj) 或者 [Stylish](https://chrome.google.com/webstore/detail/stylish-custom-themes-for/fjnbnpbmkenffdnngjfgmeleoegfcffe) 插件。

注意：Stylish 的收费政策最近有所改变（最多免费使用三个样式）且访问不是很稳定的样子，所以建议安装 xStyle。

如果你安装的是 xStyle，那么安装完成后，你需要通过 [CDN for CSS](https://cdn.arthals.ink/release/PKU-Art.css) 或者 [Github Release](https://github.com/zhuozhiyongde/PKU-Art/releases) 来下载 CSS 源文件，并且手动导入到 xStyle 中，具体操作步骤如下：

> 获得源文件文本 - 复制到剪贴板 - 打开 xStyle 面板 - 点击 `WRITE A NEW STYLE` - 将文本直接拷贝到编辑区 - 在右侧面板中勾选 `Enabled` 并 **取消勾选**  `Enable less complier`

如果你装的是 Stylish，那么安装完成后，你同样可以访问 [CSS 下载链接](https://userstyles.org/styles/220453/pku-art)，然后点击 Install Style 即可。



### JavaScript 安装

#### Safari

需要在 App Store 安装 [Userscript](https://apps.apple.com/cn/app/userscripts/id1463298887) 插件。

安装完成后，访问 [JavaScript 下载链接](https://greasyfork.org/zh-CN/scripts/436323-pku-art)，点击安装即可，如果被您的电脑上有 AdGuard 可能会被抢占安装，但使用那种脚本附加手段其实并不影响最终效果。

除此之外，你也可以通过 [CDN for JavaScript](https://cdn.arthals.ink/release/PKU-Art.js) 或者 [Github Release](https://github.com/zhuozhiyongde/PKU-Art/releases) 来下载 JavaScript 源文件，并手动导入到 Userscript 插件中。



#### Chrome (Edge/Arc/Chromium)

需要在 Chrome web store 安装 [TamperMonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) 插件。

安装完成后，访问 [JavaScript 下载链接](https://greasyfork.org/zh-CN/scripts/436323-pku-art)，点击安装即可。

当然，除此之外，你也可以通过 [CDN for JavaScript](https://cdn.arthals.ink/release/PKU-Art.js) 或者 [Github Release](https://github.com/zhuozhiyongde/PKU-Art/releases) 来下载 JavaScript 源文件，并手动导入到 Userscript 插件中。



### CSS 和 JavaScript 安装方式的异同

两者实际上都是通过不同手段将我写的 CSS 样式附加到你的页面上，但添加手段上存在如下差异：

CSS 安装方式会直接通过插件，将你本地的样式通过在页面末附加 `<style>` 标签来引入本地样式。

JavaScript 安装方式会通过插件，实时获得你的页面 URL，并且根据正则匹配页面 URL，动态引入我部署在 CDN 上的 CSS 文件，其具体引入方式是通过在页面末附加 `<link>` 标签来引入外部样式。

说人话就是，CSS 安装方式会直接将你下载好的样式引入，而 JavaScript 安装方式会通过请求我 CDN 上的文件来引入，虽然浏览器有缓存策略，但是可能还是会存在一定的延迟，这可能会导致“页面闪烁”的问题出现。但 CSS 安装方式不会导致此问题。



## 使用须知

本样式移除了一些我觉得没有用处的控件元素，如侧栏的收起框（这个太丑了），播放列表上方的导航栏（下方有一样的），这可能会导致一些特殊情况下，某些功能不可用（如侧边栏收起后，在样式启用的状态下，现在无法重新展开侧边栏）。但你可以随时在插件内禁用本样式，以恢复到原有界面。

**因为最近教学网刚刚经历了更新，所以我并不能保证开发进度完全覆盖所有页面，因此我建议所有需要使用教学网的助教或者老师不要安装此样式，除非您明确知晓出现功能缺失时如何禁用样式。**

本样式覆盖了所有我认为常用的界面，但我毕竟不是教学网的专业前端维护人员，所以我并不能做到对全部的页面加以修改。但如果你认为某个页面十分常用但却没有被修改，欢迎联系我，在 Github 提 issue，在树洞下留言，抑或是直接加我微信的方式（在文末，这个最欢迎！）都可以。

如果你喜欢这个样式，请不要吝啬点击 Star（树洞和 Github 的都可以！），这是对我最大的鼓励与肯定！



## Q&A

### 有适配手机版的打算吗？

没有，做手机版自适应工程量几乎等于重构，一个人维护这个项目，我真的太累了 qwq...



### 可以在 iPad 上使用吗？

可以，方式等同于在 Safari 上使用 JavaScript 安装。



### 我可以审阅代码、提交 PR 吗？

十分欢迎！你可以随时访问我的 Github，哪里有本项目用到的所有代码。我可以保证项目内不含有任何恶意代码，仅仅是通过附加 css（通过 CDN 分发）来改变页面样式。如果你愿意提交 PR，那我会十分乐意接受的！



## 后记

平日里的我并非是个话很多的人，但这堪称疯狂的一周，实在是让我感触颇丰，总觉得还是得记下点什么。

去年刚刚进入燕园的我，因为受不了编程网格的老土设计，在图书馆摸了好半天，就为了把编程网格做的好看了一点（#2908869），彼时的我甚至连 css 的容器布局都不甚了解，好多知识都是在敲代码的过程中才去第一次认真学习，可我没想到的是哪个略显粗糙的拙劣样式，却得到了很多同学的肯定。于是我再接再厉，凭借着那三脚猫的功夫，滥用各种现在看起来简直不可接受的语句完成了对于教学网的美化（也正是这烂到几乎不可维护的屎山让我下定决心重构整个项目），发布了 PKU Art v1。承蒙厚爱，发布以后我得到了很多同学的赞扬，收获了至今为止 Star 最多的一个树洞&项目。那段时间我最快乐的一件事情就是每天刷树洞看看涨了多少关注，在 Stylish 上看看涨了多少下载（好虚荣啊 hhh），真是相当感谢大家的支持！

开心过后的我，却也从未忘记，那只是一个徒有其表的半成品，根本经不起哪怕一次 code review。事实上，自从发布以后，我自己也就是用着，而并没有想办法去优化。毕竟程序员们不总是有句老话嘛——代码能跑就不要动。就这么凑合着，我搁置了这个项目。

时光转眼来到今年的八月一日。对前端一直很感兴趣的我，在七月份刚刚系统化学了一遍 js，vue，react 等前端常用技术，也对 css 有了一些新的了解。就如同去年的我一样，闲到不知道干什么的我，终于还是给自己找起了事情做——我要重构这一坨屎山代码！

重构的过程，用到的知识其实相较第一版并没有太大的差异，但有了系统化知识的打底，我对于页面结构有了更深的理解，没有再滥用万能的 translate，也没有随意乱加伪类，而是顺着原有的结构一步步选择适合的语句去实现我想要的效果。同时，一回生二回熟的我，也对教学网的路由和套娃谙熟于心，没有再像之前一样对着一个 iframe 愣半天，也通过正则表达式对于样式生效的网址有了更精细的控制。

要说这一周真的学到了什么，我想，也没有什么。抠细节带来的大概只有对于耐心的考验，每个页面，我大概都要写数个小时才能满意，每个用到颜色的地方我都使用了变量来保证在黑暗模式下的可用性，每个我觉得原先图标不行的地方我都专门去 IconPark 网站上找了替代品并加以更换。Mac 告诉我，为了完成这个项目，我的相关屏幕使用时间在上周达到了 50 个小时，然而这还不算我找参考，挑配色的时间。

我向来是一个对于自己感兴趣的事物会不惜代价去投入的人，可是这次所花费的时间和最终写出的代码行数都远远超出了我最开始的预期。

期间，我也不是没有心生厌倦，我曾问过自己，就算花了这么久时间去写，最后能用上的又有多少人？我付出的时间精力难道不是自娱自乐吗？万一教学网也像编程网格一样更新了样式怎么办？... 但我却总是安慰自己，已经写了这么多了（沉没价值啊啊啊啊），怎么能忍心半途而废呢？于是，就在这种一边否定自己，一边问怀疑原有代码究竟是怎么写出来的，一边机械化的敲着已经用了数百遍的那些属性和变量的过程中，我还是渐渐磨出来了最终的成果——全新的、带黑暗模式的 PKU Art v2。

于是，我终于相信，这一版的 PKU Art v2，足够让我、让大家满意。

至此，教学网的页面设计问题终于被我解决，我预想的下一步是，通过新学到的 js 知识，解决一些功能交互方面的问题。譬如说期末考试前大预习的晚上发现下载教学网视频多有不便（不能批量下载、有这奇怪的 source 命名难以查找等…）除了教学网之外，常年闲逛于树洞的我更是从同学们的评论中找到了各种痛点：收藏夹无法导出、无法批量取关…（我也一直很想给树洞加一个限时功能来限制自己的摸鱼 hhh

我希望能够在接下来的暑假，除了学一学先修课之外，再为自己找点事情做——那就是，完成一个 PKU Tool 脚本/网站，尝试解决上述所有提出的问题！虽然能完成多少、要花多长时间完成都是一个未知数，但是我会尽力去做，就像去年年末那个成天在图书馆摸鱼 PKU Art 的我一样 hhh。

如果你有任何功能提议，或者希望能帮助我一起来完成这个项目，或者愿意带带我玩和平精英，都欢迎在这条树洞下留言，或者直接联系我的微信：zhuozhiyongde（呜呜同学们快来让我这个社恐恰个 v 吧）
