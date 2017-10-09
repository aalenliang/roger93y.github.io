---
layout: post
title:  "《可汗学院公开课：统计学》的 Python 实现"
date:   2017-08-28 12:00 +0800
author: 纪连
categories: code stats
comments: true
hidden: false
---

本文为[可汗学院公开课：统计学]课程中统计学概念的 Python 实现，尽可能用两种以上方式对其进行实现，其中包含了部分科学计算库 `Scipy` `numpy` `pandas`等的实现方式。

* 平均数(mean)
```
mean = sum(arr)/len(arr)
import numpy as np
np_arr = np.array(arr)
mean = np_arr.mean()
```

* 中位数(median)
```
arr.sort()
mid = int(len(arr)/2)
numpy.median(arr)
```

* 众数(mode)
```
freq = {v:arr.count(v) for v in set(arr)}
max_occurance = 0
mode = 0
for key, val in freq.items():
    if val >= max_occurance:
        mode = key
        max_occurance = val
from scipy impost status
status.mode(arr)
```
* 极差(range)：`r = max(arr) - min(arr)`

* 中程数(midrange)：`r = (max(arr) + min(arr)) / 2`

* 总体方差(varience)
```
mean = sum(arr) / len(arr)
def distance(x):
    return (x - mean) ** 2
varience = sum(map(distance, arr)) / len(arr)
varience = sum(map(lambda x:x ** 2, arr))/len(arr) - mean ** 2
```
* 样本方差(sample varience)
```
def discance(x):
    return (x - mean) ** 2
varience = sum(map(distance, arr)) / len(arr)
```
* 样本方差的无偏估计(unbiased sample varience)：`varience = sum(map(distance, arr)) / (len(arr) - 1)`

* 标准差(stardard deviation): `stddev = varience ** 0.5`


[可汗学院公开课：统计学]: http://open.16*com/special/Khan/khstatistics.html