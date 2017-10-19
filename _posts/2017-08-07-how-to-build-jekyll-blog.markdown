---
layout: post
title:  "如何用 GitHub Pages 和 Jekyll 搭建免费博客"
date:   2017-08-08 00:21 +0800
author: 纪连
categories: build
comments: true
---

<style>
.post-content p img {
    width: 70%;
    padding-left: 15%;
}
</style>

GitHub 免费为项目或者个人提供博客服务 [GitHub Pages] ，简单讲述一下我是如何搭建一个可以自行定制，带有评论，统计功能的博客。

**⚠️注意：本文是基于 macOS 而写，理论上 Linux, Unix都可以采用，如果Windows 验证通过或者发现问题，劳烦请在文章下留言告知**

系统环境：

```
OS: macOS 10.12.6
Lang: Ruby 2.0.0p648
Git: 2.13.1
```
### 实现流程

1. 创建满足 [GitHub Pages] 要求的Repo
2. 创建 Jekyll 本地环境
3. 配置 Jekyll 并定制自己的主题
4. 添加 Google Analytics 标识，启用网站统计功能
5. 申请 Disqus Shortname， 启用文章评论功能
6. 将本地的 Jekyll 博客推送到 GitHub Repo 

#### 1. 创建满足 [GitHub Pages] 要求的Repo
---
这里我们假定你已经知道 GitHub 的存在，需要做的第一件事情就是申请一个账号并登陆。

创建 GitHub Repo 的基础教程网上有太多，这里不过多赘述，如果不太清楚，推荐GitHub官方的[Create A Repo] 。Repo的名字**强制要求**为`[username].github.io`，[username]替换成你自己的账号名称，GitHub 会自动识别此 Repo 为 [GitHub Pages] 页面。

出于安全性考虑，在创建好的 Repo 点击 Settings 跳转到设置页面，在 GitHub Pages 设置项勾选<input type="checkbox" checked> Enforce HTTPS。

到这里我们得到了一个空白的名为`[username].github.io` 的Repo 。

下一步我们需要将该 Repo Clone 到本地，这里需要借助 [Git] 这个版本控制工具来与GitHub 沟通。打开终端或者 Power Shell 输入以下命令，并将[username]替换成自己的账号名称：

```
$ git clone https://github.com/[username]/[username].github.io.git
```

到这里第一步就完成了，另外，[GitHub Pages] 支持个性域名，如果有需要也可以将自己的域名与这个 Repo 链接起来。方法是在 Settings - GitHub Pages - custom domain。

#### 2. 创建 Jekyll 本地环境
---
该项需要 Ruby 的支持，如果还未安装，请点击以下链接 [Download Ruby] 下载对应操作系统。

打开终端或者 Power Shell ，**定位到第一步中 Clone 好的文件夹** [username].github.io，输入以下命令来安装 Jekyll ：

```
$ gem install jekyll
```
> 注：官方不建议在 Windows 下安装 Jekyll

等待所有的依赖文件和 Jekyll 安装完毕，输入以下命令得到一个含有`minima`主题的 Jekyll 并运行一个开发服务器:

```
$ jekyll new .
$ jekyll serve
```
浏览器中输入 http://localhost:4000 可以访问创建好的博客。

![jekyll run]({{ site.url }}/assets/imgs/2017-08/jekyll run.png.jpg)

#### 3. 配置 Jekyll 并定制自己的主题
---

Jekyll 主要依赖的配置文件为`_config.yml`,它定义了博客的标题，简介，主题和其他全局的配置信息。

这里附上我对该文件的修改，其余部分保持自动生成的配置：

```
title: 纪连
description: 代码与逻辑，纪录与连接。
```
接下来我们需要做的就是定制一款自己的主题，对于我来说，从零开始编辑会占用太多时间，我选择的是基于当前主题进行增删改，源码全部公开，如果这么做违背了开源精神，请在评论予以指出，我会进行符合规范的调整。

**第一步，将主题依赖包的资源复制到该文件夹：**

```
# 获得主题包的位置
$ bundle show minima
/Library/Ruby/Gems/2.0.0/gems/minima-2.1.1
# 复制主题包资源到该文件夹
$ cp -R /Library/Ruby/Gems/2.0.0/gems/minima-2.1.1* .
```

**第二步，移除配置文件中对主题的配置：**

编辑`_config.yml` 删除或备注掉 <del>theme: minima</del>，编辑`Gemfile` 删除或备注掉 <del>gem "minima", "~> 2.0"</del>。

**第三步，增删改 Jekyll 的 minima 模板：**

基于**最少流量**，**最多信息**，**最少干扰**的原则，我将模板改成了如下 [纪连的主页]，详细的代码可以在我的博客 [Repo][Blog Repo] 中看到。

简单来说有如下几块改动：汉化，时间格式，文章列表视觉效果，页脚精简，页脚添加返回首页按钮，文章内容页效果，Markdown显示效果调整，多余插件删除。

涉及知识：`html`，`sass`，`jinja2`，`markdown`

涉及文件夹：`_includes`，`_layouts`，`_sass`

`_includes `：包含页面的页眉页脚和插件，插件被页眉页脚引用

`_layouts `：包含博客的主要页面，通过引用`_includes`中部件组合而成

`_sass `：包含全局的风格定义,`_layout.scss`对应页面，`_base.scss`对应 Markdown

到这里模板的修改就结束了，在终端输入`$ jekyll serve`查看编辑完的效果。

> 注：minima 自带的 Markdown 主题对中文支持有一定的缺陷，我们要在`_sass/_base.scss `中编辑`<blockquote>`删除掉斜体效果，调整字体间距，编辑`<hr>`增加下边距。

#### 4. 添加 Google Analytics 标识，启用网站统计功能
---
在 [Google Analytics] 申请账号，填写好必要信息后会获得一个类似 `UA-104170649-1` 的ID，将这个ID写入 `_config.yml` 后，Jekyll 会自动加载 Google Analytics 的代码，这样就能实现网站访问统计功能，便于知道博客的浏览量等信息。

```
google_analytics: UA-104170649-1
```
具体效果如下：

![jekyll static]({{ site.url }}/assets/imgs/2017-08/jekyll static.png.jpg)

<br>

#### 5. 申请 Disqus Shortname， 启用文章评论功能
---
[Disqus] 是 Jekyll minima 主题自带的一个插件，可以用几行代码实现文章的评论系统，这对于一个博客来而言是非常重要的功能，现在请到 [Disqus] 注册一个自己的账号。

在`_config.yml`中添加刚申请到的 Disqus Shortname：

```
disqus:
  shortname: [your shortname]
```

在`_includes/disqus_comments.html`替换如下两行，来保证 [Disqus] 能够正确记录用户评论在哪个页面：

```
this.page.url = 'https://[username].github.io{{ page.url }}';
this.page.identifier = 'https://[username].github.io{{ page.url }}';
```

当文章头部的`YAML`信息区有`comments: true`时，Jekyll 就会加载 Disqus 的评论系统在文章的最底部。

需要注意，Disqus 模块加载耗费**巨大**的流量[1MB~1.5MB]，由于一些原因可能导致网页缓慢，如果没有没有评论的必要，请务必在文章头部的 `YAML` 信息区添加以下信息以关闭评论功能保持网站轻量：

```
comments: false
```

#### 6. 将本地的 Jekyll 博客推送到 GitHub Repo
---
完成以上步骤以后，请在本地项目文件夹运行 `jekyll serve` 来检查是否一切运行正常，然后将本地环境推送到 GitHub，打开终端，输入以下命令:
```
$ git add .
$ git commit -m"Initialize blog."
$ git push
```

试着访问 `https://[username].github.io` 观察页面是否与本地一直来 GitHub 是否正确接管了博客。


### 撰写你的第一篇文章并推送

在上一个环节，我们用 `$ jekyll new .` 在本地建立了一个 Jekyll 博客，细心观察其中已经有一篇自动生成的文章 *Welcome to Jekyll!*，这篇文章是 Jekyll 官方对撰写文章的指引，你可以尝试阅读 [Welcome to Jekyll!] 或者跟着本文来撰写出第一篇你自己的文章。

Jekyll 博客文件存放在 `_posts` 目录下，格式为`YYYY-MM-DD-post-title.ext`，也就是**日期 + 时间 + 扩展名**组合而成，扩展名`ext`为[Markdown]文件的扩展名`.markdown`或者`.md`。

文章一般采用以下结构：

| #  | 文章结构| 描述
------------- | -------------
|   | **YAML 头文件**| 在 ```---[YAML]---``` 之间
|1  | layout: post|标注文章引用的模板，一般情况不需修改|
|2  | title:  "[标题]" |文章标题，此项显示在文章列表和文章内容页
|3  | date:   2017-08-08 00:21 +0800|文章撰写时间，影响文章列表显示顺序
|4  | author: 纪连| 如引用他人文章记得修改此处作者名称
|5  | categories: code|文章分类，影响文章的url
|6  | comments: true|影响是否开启文章评论功能
|   | **文章正文** |YAML `---` 之后
|1  | 正文 |该项由[Markdown]进行排版

> 注：Jekyll minima 模板并不支持 [Markdown] 表格功能，需在 `_sass/_layout.scss` 添加，具体方式参见本博客的 [Repo][Blog Repo] 中`_sass/_layout.scss`最后部分

现在我们将 `2017-08-07-welcome-to-jekyll.markdown` 文件复制一份，修改文件名称，比如改为`2017-08-08-blog-is-ready.markdown`，修改 YAML 头文件，编辑文章正文，然后保存。

通过 [Git] 将最新的文章推送到 [GitHub] ：

```
$ git add .
$ git commit -m'post blog is ready'
$ git push
```
> GitHub 在收到新提交的文章后会有一个短暂的处理过程，静待片刻，刷新页面应该就能看到自己的新文章了。

### 完成项目
 
恭喜，现在你可以通过 [username].github.io 访问你的 Jekyll 博客了，谢谢你的阅读。
 
![Jekyll finish]({{ site.url }}/assets/imgs/2017-08/jekyll finish.png.jpg)


[GitHub]: https://github.com
[GitHub Pages]: https://pages.github.com
[Jekyll]: https://jekyllrb.com/docs/home
[Create A Repo]: https://help.github.com/articles/create-a-repo/
[Download Ruby]: http://www.ruby-lang.org/en/downloads/
[Git]: https://git-scm.com
[纪连的主页]: https://rthel.github.io
[Blog Repo]: https://github.com/rthel/rthel.github.io
[Google Analytics]: https://analytics.google.com/
[Disqus]: https://disqus.com/
[Welcome to Jekyll!]: {{ site.url }}/build/2017/08/07/welcome-to-jekyll.html
[Markdown]: https://en.wikipedia.org/wiki/Markdown
