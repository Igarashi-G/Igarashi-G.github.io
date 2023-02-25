---
title: Go工具速用
date: 2023-02-12
category:
  - Go
tag:
  - GO
  - 速用
star: true
---

**Golang** 常用库方法、小工具，等开箱即用

<!-- more -->

## 1. 常用方法

### 随机数

#### **伪随机数 math/rand** 

- **无种子：** 默认种子为 **1**， `Seek(1)`
- **有种子：** 以时钟，输入输出等作为参数，比无种子 **重复概率低** 

```go
func randomSeed(min, max int) int {
	source := rand.NewSource(time.Now().UnixNano()) // 时间种子
	r := rand.New(source)
	return min + r.Intn(max-min)
}

func randomNoSeed(min, max int) int {
	return min + rand.Intn(max-min)	// 无种子
}

func main() {
    fmt.Println(rand.Intn(100))  //会产生0到100之间的随机整数
    fmt.Println(rand.Float64())	//会产生0到1之间的随机数
    
	for i := 0; i< 10;i++ {
		fmt.Printf("%d ", randomNoSeed(2, 8))
	}
	fmt.Println()
	for i := 0; i< 10;i++ {
		time.Sleep(1)	// 种子延时
		fmt.Printf("%d ", randomSeed(2, 8))
	}
}
```

#### **真随机数 crypto/rand**

比伪随机慢，但满足密码学安全需求（*无法预测*）

```go
package main

import (
	"crypto/rand"
	"fmt"
	"math/big"
)

func random(min, max int) int {
	ret, _ := rand.Int(rand.Reader, big.NewInt(int64(max-min)))
	return int(ret.Int64()) + min
}

func main() {
	li := make([]int, 100)

	for i := 0; i < 100; i++ {
		li[i] = random(2, 100)
	}
	fmt.Println("li:", li)
}
```

