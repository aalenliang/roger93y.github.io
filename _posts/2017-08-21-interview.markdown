---
layout: post
title:  "Python 面试题目汇总"
date:   2017-08-21 22:29 +0800
author: 纪连
categories: life
comments: true
hidden: true
---
> 这是我总结和收集的一些面试题，持续更新中，如果有错误欢迎在评论留言允我予以更正。题目未必权威，有一定猜测成分，如果你在面试中碰到其中的题目，还请在评论中留言，对应的题目我将进行标注。

#### 一、名词解释
---

* @staticmethod 和 @classmethod：

Python 中类的两种方法，前者为静态方法，可以理解为写在类体中的函数。后者为类方法，可以在不创建实例情况下调用，第一个参数必须为cls，两者区别在后者return 所有参数时候，第一个为类。

* 迭代器和生成器：

迭代器是Python 惰性获取数据的方式，它从集合中取出元素，与类的__iter__和__getitem__相关。函数如果用 yield 来定义就是生成器，生成器每次被调用返回一个生成值，当到达结尾时候抛出StopIterration异常。

* 闭包：

内部函数可以看作一个闭包。可以由另外一个函数动态生成的函数叫闭包。

* *args 和 **kwargs：

可变参数，可以接受任意多个位置参数和关键字参数。

* 具名元组：

类似不可变类，只有少数属性，但是没有方法，可以用名字和位置访问其中的值。通过functools.namedtuple 创建。

* @property 和 @setter

把一个方法当成属性来调用。

* URL

```
<scheme>://<user>:<password>@<host>:<port>/<path>;<params>?<query>#<frag>
```


* 进程

一个计算机程序被执行的实例就是进程。

* 线程

一个计算机程序指令被执行的最小序列。

* 解释性语言

运行时不像C一样需要先编译，而是在运行时处理。

* 面向对象

我的理解是 Python 中的一切都是对象和类，有自己的属性有自己的方法。

* pickle

Python 的序列化，把对象在内存中的结构转换成便于迁移的二进制或文本格式，在跨平台后还能重建对象的副本。

* PEP8

Python 的编程规范，如果没有更好的方案建议按照PEP8的风格进行写代码以提高可读性。

* debug及静态分析

最简单的是在对应位置打印信息，pdb pychecker pylint flake8 coverage。

* 装饰器

与闭包相关联，通过在定义函数前@装饰器名 为函数增加一定的特性。

* 字典推导式

```
country_code = {country: code for code, country in DIAL_CODES}
```

* 自带数据类型

数组 字典 集合，字符串 元组 数，以及部分collections下如orderdict等。

* 字符串方法

str(),+,*,getitem,[start:end:step],split(),.join(),start with(),len,find,count,isalnum,capitalize(),replace()

* 列表方法

list(), [offset],[slice],append(),extend(),insert(),del, remove(),pop(),index(),in(),count(),join(),sort(),len(),copy()

* 字典方法

dict(),update(),clear(),in,values(),items(),copy()

* .copy .deepcopy

浅拷贝只拷贝父对象，不会拷贝对象的内部的子对象。 深拷贝则拷贝对象及其子对象。

* 反序的迭代一个序列

list.reverse()

* Python 单例模式

防止类创建多个实例，方法众多。

* 弱引用

weakref.ref 不妨碍对象被当作垃圾回收。

* Python GC机制

Python 采用引用计数方式来确定是否销毁，当对象引用数量归零，立即销毁。

* 删除一个list里面的重复元素

set(arr)

* 元编程

代码增加一个抽象层级，即用代码来生成代码或者说类。

* with

with 是Python的上下文管理器，可理解为 try...finally。常见于 with open(file) as fp:

* @functools.lru_cache

为函数添加缓存，典型例子见递归生产fibonacci数列，显著提升速度。

#### 二、算法代码
---
* 二分搜索

```
def binary_search(arr,item):
    start = 0
    end = len(arr)-1

    while start <= end:
        mid = (start+end)/2
        if arr[mid] == item:
            return mid
        elif arr[mid]>item:
            end = mid - 1
        else:
            start = mid + 1
    return None
```

* 选择排序

```
def find_small(arr):
    small_idx = 0
    small_val = arr[0]
    for num in range(1,len(arr)):
        if arr[num] < small_val:
            small_val = arr[num]
            small_idx = num
    return small_idx

def selection_sort(arr):
    newArr = []
    for i in arr:
        newArr.append(arr.pop(find_small(arr)))
    return newArr
```

* 快速排序

```
def quick_sort(arr):
    if len(arr) < 2:
        return arr
    else:
        pivot = arr[0]
        less = [i for i in arr if i <= pivot]
        greater = [i for i in arr if i > pivot]
        return quick_sort(less) + pivot + quick_sort(greater)
```

* 斐波那契数列

```
def fib(n):
    if n < 2:
        return n
    else:
        return fib(n-2)+fib(n-1)
```

* 阶乘

```
def fac(n):
    if n < 2:
        return n
    else:
        return n*fac(n-1)
```

* 多维数组转一维

```
from collections import Iterable

def flat(arr):
    for each in arr:
        if not isinstance(each, Iterable) or isinstance(each, str):
            yield each
        else:
            yield from flat(each)
```

#### 三、数据库操作
---

* 数据类型

TINYINT SMALLINT MEDIUMINT INT INTEGER BIGINT

FLOAT DOUBLE DECIMAL

YEAR DATE TIME DATETIME TIMESTAMP

CHAR VARCHAR BLOB TEXT ENUM SET

* 常用命令

```
CREATE DATABASE mydatabase;

SHOW DATABASES;

USE mydatabase;

DROP DATABASE mydatabase;

SHOW ENGINES;

SHOW VARIABLES LIKE "XXX%";

CREATE TABLE tables {
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(64) NOT NULL UNIQUE,
    sex TINYINT,
    confirm BOOLEAN DEFAULT false,
    course INT,
    class INT,
    PRIMARY KEY(course,name),
    CONSTRAINT cs_fk FOREIGN KEY (course_id, class_id) REFERENCES courses(course, class),
    UNIQUE|FULLTEXT|SPATIAL INDEX|KEY name_idx (name VARCHAR(10) ASC, class)
};

DESCRIBE tables;

SHOW CREATE TABLE tables;

ALTER TABLE tables RENAME [TO] tables_new;

ALTER TABLE tables MODIFY course BIGINT;

ALTER TABLE tables CHANGE course course_id INT;

ALTER TABLE tables ADD teacher INT NOT NULL AFTER|FIRST class;

ALTER TABLE tables DROP teacher;

ALTER TABLE tables MODIFY course_id INT AFTER|FIRST class;

ALTER TABLE tables ENGINE = MyISAM;

ALTER TABLE DROP FOREIGN KEY cs_fk;

DROP TABLE classes;

CREATE UNIQUE|FULLTEXT|SPATIAL INDEX id_idx ON tables (id);

DROP INDEX id_idx ON tables;

ALTET TABLE tables ADD UNIQUE|FULLTEXT|SPATIAL INDEX id_idx(id);

CREATE VIEW table_view(word,slice,end) AS SELECT class,name,job FROM tables;

CREATE ALGORITHM=MERGE VIEW work_view AS SELECT ab,bc,cd,ef FROM work1,work2 WHERE work1.id=work2.id WITH LOCAL CHECK OPTION;

SHOW TABLE STATUS LIKE 'work_view'；

SHOW CREATE VIEW view1;

CREATE OR REPLACE VIEW xxx AS SELECT * FROM xxxx;

ALTER VIEW xxx AS SELECT ;

DROP VIEW IF EXISTS work_view;

CREATE TRIGGER tg_none BEFORE|AFTER DELETE ON tables FOR EACH ROW INSERT INTO table2;

CREATE TRIGGER tg_1 BEFORE|AFTER INSERT ON tables FOR EACH ROW BEGIN xxxx END;

SHOW TRIGGERS;

DROP TRIGGER tg_n;

SELECT * FROM tables WHERE id IN (1,2,3) GOURP BY name ORDER BY time ASC;

SELECT * FROM tables WHERE id IN (SELECT id FROM t2);

SELECT * FROM tables WHERE id >=ANY|ALL(SELECT id FROM t2);

[><=, IN (a,b,c), BETWEEN a AND b, LIKE, IS NOT NULL, AND, OR, EXISTS, ALL]

SELECT DISTINCT name FROM tables WHERE id IN (1,2,3) GOURP BY name ORDER BY time ASC;

SELECT GROUP_CONCAT(name) FROM tables WHERE id IN (1,2,3) GOURP BY name ORDER BY time ASC;

SELECT COUNT(name) FROM tables GROUP BY name HAVING COUNT(name)>3 WITH ROLLUP LIMIT 3;

SELECT num,SUM(socre) FROM grade WHERE num=111;

[COUNT(), SUM(), AVG(), MAX(), MIN()]

SELECT name,work,job FROM tables t,works WHERE t.id = works.id;

SELECT name FROM t1 LEFT JOIN t2 ON t1.id = t2.id;

SELECT name FROM t1 RIGHT JOIN t2 ON t1.id =t2.id;

SELECT UNION|UNION ALL SELECT;

SELECT * FOR tables WHERE name REGEXP '^L';

INSERT INTO tables (name) VALUES ('WORD') WHERE id = 1;

UPDATE tables SET name='lord' WHERE id = 1;

DELETE FROM tables WHERE id = 99;

```