---
layout: post
title:  "构建新的博客主题"
date:   2017-10-11 12:00 +0800
author: 纪连
categories: code
comments: true
hidden: true
---


电脑升级到了最新的 macOS High Sierra 之后，Jekyll 的本地环境彻底崩溃了，原因猜测是最新版本的 Jekyll 不能正确的识别依赖包的版本和位置，作为一个工具带来的便利几乎与麻烦一样多，我决定暂时放弃 Jekyll 并将整个网站迁移到 [Hexo]。但在使用了一天后，我认为 [Hexo] 并没有比 Jekyll 更方便，所以迁回了 Jekyll，作为对 Jekyll 的补偿，我决定对主题进行扩展加入分类、归档等功能。

本文作为 [Hexo] 部署的研究。

> 补充：之前版本的 Jekyll 的本地环境崩溃解决方法为删掉 Gemfile 和 Gemfile.lock，这两个文件会导致无法正确判断依赖包的版本和位置。

### 安装

因为基于 Node.js 所以安装过程较 Jekyll 更简单，几分钟就能在本地搭建好一个博客环境了，引用官网的代码:

```
$ npm install hexo-cli -g
$ hexo init blog
$ cd blog
$ npm install
$ hexo server
```

> 考虑到国内网络不稳定等因素，这里推荐使用淘宝的 `cnpm` 作为 `npm` 的替代，如果使用 macOS 操作系统，建议在 npm 之前 加上 sudo。

### 部署

[Hexo] 默认主题使用了 EJS 作为模板，这个是没有碰到过的，不过按照了解了几套模板的工作模式后，想来搞定不难，我决定先跳过主题这个步骤，先把它部署到 [GitHub] 上。

在部署之前，我大致观察了一下主题配置和主题包含的文件，发现有三项工作应该做一下。

1. 添加自己的 [Google Analytics] ID ，留意到默认的主题有 [Google Analytics] 的配置项，该项位于默认主题 `thems/landscape/_comfig.yml` 下，为了让该项正确运行，在 `google_analytics` 一项上填写GA-ID。

2. i18n 中文配置，完成这项修改需要先在博客根目录 `_config.yml` 文件中将语言一项改为 `language: zh-CN` ，然后到 `thems/landscape/languages/zh-CN.yml` 进行符合自己想法的翻译。

3. 修改博客标题个人信息相关配置，需要编辑根目录 `_config.yml` 文件的 `#site` 区域，补完个人相关信息。

完成了以上工作后，修改根目录 `_config.yml` 文件最后部分，添加 [GitHub] Repo，具体代码如下:
```
# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type: git
  repo: https://github.com/rthel/rthel.github.io
  branch: master
  message: move to hexo
```

安装 hexo-deployer-git：

```
$ npm install hexo-deployer-git --save
```

部署的最后一步：

```
$ hexo deploy
```
全部完成后，就能在自己的 GitHub Pages 看到部署好的博客了。


### 迁移

从 Jekyll 迁移成本很低，包含两个步骤，一个是从原先 Jekyll 中 `_post` 文件下将所有文章复制到 `source/_post/`，第二就是修改配置文件，替换以下配置：
```
# Writing
new_post_name: :year-:month-:day-:title.markdown
```

### 定制主题


[Hexo]: https://hexo.io
[GitHub]: https://github.com
[Google Analytics]: https://analytics.google.com/