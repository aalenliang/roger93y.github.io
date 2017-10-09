---
layout: post
title:  "Django 和 Flask 框架对比（未完待续）"
date:   2017-08-26 22:00 +0800
author: 纪连
categories: code
comments: true
hidden: false
---
本文是对 Flask 和 Django 的对比，也是第一次用 Django 开发项目的一些总结，尚未完结，还在不断补充之中。

---


1. 定义路由：Django 用正则表达式定义，这点有助于提升用户体验，Flask暂未测试正则表达式定义路由。

2. 路由与视图函数的关联：Flask 用 `@blueprint.route('/route', methods=['get', 'post'])装饰器写入一个自由变量中。Django 用 urlpatterns 列表，以 `url(regexp,view function)`来定义，值得注意的是 urlpatterns 是一个关键字，修改后全局路由无法识别单应用的路由。

3. 应用结构：Flask 用不同的文件夹区分应用，然后用Blueprint定义应用，在项目的`__init__.py`中注册不同应用的蓝图。 Django 则可以便利的生成新的应用，最后在项目的`urls.py` 中 用 `include('appname.urls')`  进行引入。

4. 配置定义：Flask 定义在`config.py`中，通过创建基本类定义基本变量，通过对基本类的继承来定义不同生产环境的特定变量，应用初始化时候通过`app.config.from_object`来获取。Django 通过项目的`setting.py`进行定义。

5. ORM：这是个大篇章，我将会单独进行分析。

6. Request：对于Request Flask 采用 request.args.get['name']方式获得，对于 Django 对请求方法进行了一定的区分，需要显式的标注 request.[METHOD]['name']以得到请求数据。

6. Generic Views：Django的特殊设计，为了减少代码量而将常见的视图函数转换为类，适用场景有待研究。

7. 静态文件引入：Flask采用`url_for('static', filename='style.css')`类似路由引用，Django在模板先声明`% load static %'，引用时候`% static 'greytomb/styles.css' %`。

8. 模板渲染：Django 用`template.loader.get_template('layout.html')`生成一个模板加载器，返回时候`template.render(context, request)将渲染的数据加入模板返回给客户端。Flask 则直接`render_template('layout.html', data=data)`。