---
layout: post
title:  "模拟一个精简版微博 DAY 1"
date:   2017-08-11 19:41 +0800
author: 纪连
categories: maibo
comments: true
---

<style>
img {
    width: 70%;
    padding-left: 15%;
}
</style>

### 前言

《Flask Web开发：基于Python的Web应用开发实战》这本书已经看完，说来惭愧，最后的成果只是按着书本做了一个小型的[博客]，给作者的 [Repository][pr for miguelgrinberg] 提交通过一个PR。

对于找一份工作来说，博客项目可能是含金量最低的，而看这本书的初衷是想建立一个模拟股票交易网站，这样涉及的内容较广。股价查询涉及到多线程工作，爬虫及 API 相关，虚拟货币的流通涉及较为复杂的数据库模型，我还希望这个股票交易网站具备社交化的功能，以便实现帮用户了解自身水平的目的，股价的实时性还对前端知识有较高的要求。这个项目我准备在完成这篇文章，亦即 [Maibo] 这个项目完成之后开始。而 [Maibo] 则是为了巩固知识和学习新的前端知识所做的项目。

本文将作为一个系列来记录[Maibo]实现过程，以记录难点和解决思路，尤其是前后端结合的实践。当然，再次强调**模拟**二字，在读过微博的架构相关文章后，我知道真正实现难度可能要比我想象的高无数倍，所以，这个项目主要是**模拟**和**练习**。

#### 问题 Jinja2 模版继承问题

---

在
在实现这个精简微博的过程中，我碰到的第一个问题就是如何仿制界面，出于节省时间和可复用性考虑，我选择 `Flask_Bootstrap` 这个包来利用用 Bootstarp 一些现成的样式，它的`base.html`结构大致如下：

```
[% block doc -%]
<!DOCTYPE html>
<html[% block html_attribs %] [% endblock html_attribs %]>
[%- block html %]
  <head>
    [%- block head %]
    [%- endblock head %]
  </head>
  <body[% block body_attribs %] [% endblock body_attribs %]>
    [% block body -%]
    [% block navbar %]
    [%- endblock navbar %]
    [% block content -%]
    [%- endblock content %]

    [% block scripts %]
    [%- endblock scripts %]
    [%- endblock body %]
  </body>
[%- endblock html %]
</html>
[% endblock doc -%]
```

我自己的模板为`layout.html`，引入方式如下：

```
[% extends 'bootstrap/base.html' %]

[% block head %]
[[ super() ]]
<meta charset="utf-8"/>
<link href="[[ url_for('static', filename='styles.css')]]" rel="stylesheet"/>
[% endblock head %]

[% block navbar %]
<nav>
</nav>
[% endblock navbar %]
```
设想中，页面的基本模板应该主要包含以下四个模块：

* navbar
* page-header
* page-content
* page-footer

我留意到在`Flask_Bootstrap`这个包中提供的基本模板中`[% block navbar %]`和`[% block content %]`两个块可以满足我的需要，我需要做的就是在我自己的`layout.html`添加两个没有的模块，那么自然而然的想到这么做：

```
[% extends 'bootstrap/base.html' %]
# ...
[% block header %]
<h1>This is a header</h1>
[% endblock header %]
[% block footer %]
<h1>This is a footer</h1>
[% endblock footer %]
```
试着渲染 `layout.html` 得到如下图的结果:
![inherit1]({{ site.url }}/assets/imgs/2017-08/day1 p1.png.jpg)

Oops，似乎测试模块并未正确的加载到对应位置。

原因可能众多，我有以下猜测：

* 新的 block 是写在`<html>`体之外的，Jinja2 不对其进行渲染。
* 模板只能继承一次，在子模板中新建的顶级 block 将不被渲染。

由于时间关系，这个项目不准备去深究 Jinja2 的源代码，直接贴出解决方案，我想了三种方式解决子模板新建 block 的方法：

* 方法1. 在`[% block content %]`中建立新的块，这种方式建立的块为块 content 的子块：

```
[% extends 'bootstrap/base.html' %]
# ...
[% block content %]
[% block footer %]
<h1>This is a footer</h1>
[% endblock footer %]
[% endblock content %]
```
* 方法2. 利用`[[ super() ]]`继承`[% block body %]`并添加新模块，这种方式建立的块和块 content 同级：
 
```
[% extends 'bootstrap/base.html' %]
# ...
[% block body %]
[[ super()]]
[% block footer %]
<h1>This is a footer</h1>
[% endblock footer %]
[% endblock body %]
```
* 方法3. 无视块的继承，用`[% include '_footer.html' %]`将新建的`_footer.html`引入到模板中，这种方式也可以与前两种结合起来。

最终效果如下：

![inherit2]({{ site.url }}/assets/imgs/2017-08/day1 p2.png.jpg)
#### 问题：SQLAlachemy MySQLdb 引擎

---

在上一个项目[Flask Blog]，数据库使用了 SQLite3 ，对于一个小型的博客来说，在这个项目，我我决定换 MySQL 作为项目的数据库，在这个过程中碰到了这样一个报错:

```
ModuleNotFoundError: No module named 'MySQLdb'
``` 
* **SQLAlchemy 配置：**

```
from flask_sqlalchemy import SQLAlchemy

SQLALCHEMY_TRACK_MODIFICATIONS = True
QLALCHEMY_DATABASE_URI = 'mysql://root:pasword@localhost/maibo'

db = SQLAlchemy(app)
```

* **报错复现与分析：**

[Maibo] 此时写好了账号注册和账号登陆的功能，数据库结构定义完成。打开注册页面页面，输入符合规范的注册信息，点击提交页面，此时出现报错，关键报错信息为以下四行：

```
1- File "/Users/jilian/maibo/app/auth/forms.py", line 17, in validate_username
2- if User.query.filter_by(username=field.data).first()
3- File "/python3.6/site-packages/sqlalchemy/dialects/mysql/mysqldb.py", line 110, in dbapi
4- ModuleNotFoundError: No module named 'MySQLdb'
``` 
前两行报错信息为激活了报错的关键，这个对 `User` 的查询是整个流程中首次请求数据库，此时 SQLAlchemy 开始运作，在调取引擎的时候发现无法加载模块 `MySQLdb`，从这个目录层级来推测，`MySQLdb`是一个 dialect，而且看起来**不是唯一的** dialect。

* **解决流程：**

虽然我认为这个模块很基础，理应是SQLAlchemy ORM关键部分之一，但看起来SQLAlchemy并没有自带这个模块。按照常规做法，缺什么模块补什么模块就好，然后结果如下：

```
$ pip install MySQLdb
 Could not find a version that satisfies the requirement MySQLdb (from versions: )
 No matching distribution found for MySQLdb
# 查询资料发现 MySQLdb 的全名叫 mysql-python
$ pip install mysql-python
  ModuleNotFoundError: No module named 'ConfigParser'
# 安装 mysql-python 所需的 ConfigParser
$ pip install ConfigParser
  Requirement already satisfied: ConfigParser in /python3.6/site-packages
$ pip install mysql-python
  ModuleNotFoundError: No module named 'ConfigParser'
```
显然行不通，也查到资料说 `mysql-python` 模块不支持 Python3 ，是时候翻翻官方文档了。之前从目录推断出 `mysql-python` 是一个 dialect ，搜索 dialect 得到个页面 [DBAPI Support]，问题一下就简单了，文档显示支持的 dialect 有以下：

1. MySQL-Python
2. PyMySQL
3. MySQL Connector/Python
4. CyMySQL
5. OurSQL
6. Google Cloud SQL
7. PyODBC
8. zxjdbc for Jython

* **最终解决方案**

替换默认的 dialect `MySQLdb` 为 `PyMySQL`：

```
$ pip install pymysql
QLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:pasword@localhost/maibo'
```

目前进展就到这里，框架雏形已经出来了，虽然界面模仿的不是很像，后期会针对性的对前端进行修改。

![inherit2]({{ site.url }}/assets/imgs/2017-08/day2 p2.png.jpg)



[pr for miguelgrinberg]: https://github.com/miguelgrinberg/flasky/pull/288
[Stack Overflow]: https://stackoverflow.com
[Segment Fault]: https://segmentfault.com
[Angular]: https://angularjs.org
[Flask Blog]: https://github.com/rthel/finance
[Maibo]: https://github.com/rthel/Maibo
[DBAPI Support]: http://docs.sqlalchemy.org/en/latest/dialects/mysql.html
[pr for miguelgrinberg]: https://github.com/miguelgrinberg/flasky/pull/288
[博客]: https://github.com/rthel/finance