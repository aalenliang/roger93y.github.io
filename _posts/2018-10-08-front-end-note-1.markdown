---
layout: post
title:  "前端课程学习笔记 - CSS 和 HTML"
date:   2017-10-08 12:00 +0800
author: 纪连
categories: code
comments: true
hidden: true
---

# CSS

* CSS 设计顺序

设计顺序这个部分是较为复杂且没有标准答案的，本文只简单描述目前较为认可的方法。

从细节入手最后谋划大局，这种工作方式被称作原子样式（atomic styling）。


* 样式继承(Inherit)

层级更接近祖先元素，样式优先级越高，但并非所有样式都可被继承，比如 `border` 。

属性选择器可以添加指定的属性值以实现更精确的匹配:

```
a[href='#'] {
	/* style declaration */
}
```

* `display: inline`

多数元素的默认属性为 `inline` ，渲染规则类似于文本。

> 渲染文本时，字母是沿着一条基线绘制的。某些字母，如p、q、y等，有一个下降部分——也就是位于基线下面的尾部。为了容纳它们，基线之下会留有一些空白。

* 关系选择器

关系选择器由两个选择器和一个连接符(> ~ +)组成，符号决定了两个选择器的关系，浏览器**从右向左**解析选择器。

* `@font-face`

```
@font-face {
    font-family: 'lakeshore';
    src: url('fonts/LAKESHOR-webfont.eot');
    src: url('fonts/LAKESHOR-webfont.eot?#iefix') format('embedded-opentype'),
         url('fonts/LAKESHOR-webfont.woff') format('woff'),
         url('fonts/LAKESHOR-webfont.ttf') format('truetype'),
         url('fonts/LAKESHOR-webfont.svg#lakeshore') format('svg');
    font-weight: normal;
    font-style: normal;
}
```

* 优先级

[MDN优先级](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)