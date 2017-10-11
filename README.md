[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

访问本站，请点击链接 [纪连的博客](http://lorem.top)

## 简介

网站基于 [Jekyll] 搭建，主题参考 [Anatole] 基于自己偏好进行一定的重新设计，支持归档，分类等常用功能，并进行了一定程度的移动端适配，希望能够有个干净的写字空间，欢迎试用和提出建议。

网站有如下优点：

* 轻量：首页访问流量控制在 50kb 以内（未加载 Google Analytics 情况下）

* 搭建简单：只需要克隆到本地，然后上传到自己的 GitHub Pages Repository，即可使用

## 使用方式

搭建本地博客方法（以 macOS 为例）:
```
$ git clone https://github.com/rthel/rthel.github.io
$ cd rthel.github.io
$ sudo gem install jekyll
$ jekyll serve
```
本地博客默认访问地址:

```
http://localhost:4000
```

使用请编辑文件夹根目录 `_config.yml`，将对应项目替换为自己的信息，然后重新 `$ jekyll serve`。


关于用 Jekyll 和 GitHub 搭建个人博客的方法，可以阅读本博文 [如何用 GitHub Pages 和 Jekyll 搭建免费博客](http://lorem.top/code/2017/08/07/how-to-build-jekyll-blog.html)

## 未来的改进

* 继续压缩页面文件，减小访问流量，不给GitHub增加负担

* 增加博客文章列表分页

* 不增加页面流量的情况下，美化移动端的适配

## Licence

网站除文章外所有内容均基于 MIT license。

[Jekyll]: https://jekyllrb.com/docs/home
[Anatole]: https://github.com/hi-caicai/farbox-theme-Anatole
