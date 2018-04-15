---
layout: post
title:  "JSTL (TagLibs 1.2.5)  使用方法"
date:   2018-04-11 02:14 +0800
author: 纪连
categories: java
comments: true
---

> 写在最前： `Apache Taglibs` 或者说 `Apache Jakarta Taglibs` 已经于2014年正式退休并被迁移到 [Apache Attic](http://attic.apache.org)，版本号最终定格在`1.2.5` ，如果你在学习 JSP 的 `JSTL`，笔者建议稍加留意这个部分，在以后的 Web 开发中，不论是 Python, Ruby 或者一些前端框架你都可能见到相类似的模板系统。  

**本文写于2018年4月，内容可能有改动，如果出现异常情况，请读者在下方留言提醒我更新文章。**

### 下载
`Taglibs` 此前一直由 `Apache Jakarta` 小组在维护，所以我们可以在 [Apache Tomcat](http://tomcat.apache.org) 首页边栏找到 [Taglibs](http://tomcat.apache.org/taglibs.html) ，页面中下载地址为如下:

```
https://tomcat.apache.org/download-taglibs.cgi
```

页面提供两部分选项和五个下载选择。第一部分是源代码，因为时间过去较久，编译需要费些功夫。笔者建议直接看第二部分二进制文件，这部分包含了一个自述文件和四个 jar 包:
* Binary README : 自述文件
* taglibs-standard-impl-1.2.5.jar : JSTL 实现
* taglibs-standard-spec-1.2.5.jar : JSTL 标准接口
* taglibs-standard-jstlel-1.2.5.jar : JSTL 1.0 版本兼容包
* taglibs-standard-compat-1.2.5.jar : JSTL 1.0 版本兼容包

目前而言我们需要下载的是 `taglibs-standard-impl-1.2.5.jar`  和 `taglibs-standard-spec-1.2.5.jar` 两个文件。

### 加入项目
下图为典型的 JSP 目录结构，只需将下载的两个 jar 包放在 `${ProjectDir}/WebContent/WEB-INF/lib/` 目录下就能正常工作。
```
├── WebContent
│   ├── META-INF
│   │   └── MANIFEST.MF
│   ├── WEB-INF
│   │   └── lib
│   │       ├── taglibs-standard-impl-1.2.5.jar
│   │       └── taglibs-standard-spec-1.2.5.jar
│   └── countries.jsp
├── build
│   └── classes
│       └── myapp
│           └── MyApp.class
└── src
    └── myapp
        └── MyApp.java
```

### 在 Gradle 中加入 JSTL

在 `build.grale` 中加入以下依赖
```
dependencies {
    ...
    compile 'org.apache.taglibs:taglibs-standard-spec:+'
    compile 'org.apache.taglibs:taglibs-standard-impl:+'
    ...
}
```

### 在 Maven 中加入 JSTL

在 `pom.xml` 加入以下依赖
```
<dependency>
  <groupId>org.apache.taglibs</groupId>
  <artifactId>taglibs-standard-spec</artifactId>
  <version>1.2.5</version>
</dependency>
<dependency>
  <groupId>org.apache.taglibs</groupId>
  <artifactId>taglibs-standard-impl</artifactId>
  <version>1.2.5</version>
</dependency>
```

### 在 JSP 中使用 JSTL
这里只放一个核心 `<c:forEach>` 的简单示例，具体标签的使用请参考各类书籍或者官方文档 [JSR 52: A Standard Tag Library for JavaServer Pages](https://jcp.org/en/jsr/detail?id=52)。

*countries.jsp*

```
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
  <head>
    <title>Country List</title>
  </head>
  <body>
    <ul>
      <c:forEach items="${countries}" var="country">
        <li>${country.key} : ${country.value}</li>
      </c:forEach>
    </ul>
  </body>
</html>
```
