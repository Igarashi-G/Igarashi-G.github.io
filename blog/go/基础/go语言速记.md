---
title: Go语言速记
date: 2022-10-25
category:
  - Go
tag:
  - GO
  - 速记
star: true
---

**Golang** 特性、API、差异点等备忘速记

<!-- more -->



##### **路径**

**GOROOT = C://Program/go**

**GOPATH = 编译项目的工作路径**

##### **运行**

```shell
# 直接运行
go run main.go -- 参数

# 编译
go build 

# 编译为二进制 .a 文件
go 
```

## 1. 变量

```go
/*
声明 及 默认值、可海象、类型推导
*/

var (
	a int			// 0
    c float			// 0
    d bool			// false
	b string		// ""
    xx [] T 		// 切片, T 可以是 int、float、bool、[]、map、func() 类比列表
    e struct {		// {}
        x *int		// nil 切片、函数、指针
	}
)

const (				// 常量在编译期确定
    pi = 3.1415926
    e  = 2.718281
    ONEDAY = 1 << iota
    TWODAY
)
```

::: tip 注意

```go
// 不能单个重复定义
a := 1
a := 2				// error
a, err := xxx
b, err := xxx

// 可多变量同时赋值
a, b = b, a

// 匿名变量
a, _ = getData() 
```

:::

### **整型**

两大类，对应 **C**

- 按长度分类： `int8/16/32/64`、`int`
  - `int16` 对应 `short` 型
  - `int64` 对应 `long` 型
- 对应无符号： `uint8/16/32/64`、`uint`
  - `uint8` 对应 `byte` 型 

大整数计算 **big.Int**

```

```

::: tip 注意事项

- `int` 和 `uint` 自动匹配平台（*自动内存对齐* ），随平台变化，**二进制传输、读写文件时禁用**

:::

### **浮点型**

遵从**IEEE754** 标准有 `float32/64` 可用常量定义 `math.MaxFloat32/64` 

**64位为例：** **1** 位 **sign** 表正负，**11**位 **exponent** 表 **-1023~1024** ，**52** 位 表小数

##### **精度问题**

浮点存在 **小数 \* 2 = 1** 精度不准问题，可用 **decimal** 解决

```shell
# 下载
$ go get github.com/shopspring/decimal
```

使用

```go
var v1 = decimal.NewFromFloat(0.00000018)
var v2 = decimal.NewFromFloat(0.29)

// 加减乘除
var ret = v1.Add(v2)	// .Sub(v2)  .Mul(v2)  .Div(v2)

// 保留
var v3 = v2.Round(1)		// 四舍五入
var v4 = v2.Truncate(1)		// 直接保留
```

### 布尔

分 `ture/flase` ，**不允许 整型 强转 布尔** ，无法参加数值运算

### 字符串

**Go** 中为原生类型

常见转义

| 符号 |       含义       |
| :--: | :--------------: |
| `\r` | 回车（返回行首） |
| `\n` | 回车（返回对齐） |
| `\t` |       tab        |
| `\'` |      单引号      |
| `\"` |      双引号      |
| `\\` |      反斜杠      |

- 多行字符串，用于内嵌配置等

  ```go
  `[gloabl]
  xxx={}
  xxx2={}
  `
  ```

- 字符，有两种类型
  - `uint8` 类型，实际是 `byte` 型 代表 **ASCII** 码
  - `rune` 类型，实际是 `int32`，代表一个 **UTF-8** 字符，处理复合字符，都对应了 **Unicode** 码

##### 方法API

```go
str := "igarashi"

// 获取字符串长度
len(str)						//  - ASCII 字符串用 len
utf8.RuneCountInString(str)		//  - Unicode 字符串用 utf8

// 查找字符串下标
strings.Index(str, "ra")		// 返回下标 index

// 去空格
strings.TrimSpace(str)			// 去掉字符串两边空格

// 拼接字符串
first_name := "igarashi"
name := "-G"
first_name + name						// + 号 直接拼接，

var stringBuilder bytes.Buffer			// 声明字节缓冲
stringBuilder.WriteString(first_name)	// 把字符串写入缓冲
stringBuilder.WriteString(name)
stringBuilder.String()					// 将缓冲以字符串形式输出

// 修改字符串（不可变），Go中不能直接修改，只能重新赋值
str := "igarashi"
str_bytes := []byte(str)				// 将字符串转为 字符串数组（字节数组）

for i := 4; i <= 6; i++ {
    str_bytes[i] = 'w'					// 替换 4 ~ 6 字符为 i
}
fmt.Println(string(str_bytes))			// 转换回去
```

格式化样式，**C** 风格

```go
ret := fmt.Sprintf("%d", 3)				// 通过 下表 动词 格式化
fmt.Println(ret)
```

| 动  词 | 功  能                                   |
| :----: | ---------------------------------------- |
|   %v   | 按值的本来值输出                         |
|  %+v   | 在 %v 基础上，对结构体字段名和值进行展开 |
|  %#v   | 输出 Go 语言语法格式的值                 |
|   %T   | 输出 Go 语言语法格式的类型和值           |
|   %%   | 输出 % 本体                              |
|   %b   | 整型以二进制方式显示                     |
|   %o   | 整型以八进制方式显示                     |
|   %d   | 整型以十进制方式显示                     |
|   %x   | 整型以十六进制方式显示                   |
|   %X   | 整型以十六进制、字母大写方式显示         |
|   %U   | Unicode 字符                             |
|   %f   | 浮点数                                   |
|   %p   | 指针，十六进制方式显示                   |

**Base64** 转码

```go
message := "igarashi"
encode64 := base64.StdEncoding.EncodeToString([]byte (message))
fmt.Println(encode64)
decode64, err := base64.StdEncoding.DecodeString(encode64)
fmt.Println(string(decode64), err)
```

读 **INI** 配置文件示例

```go
// 此时有 example.ini 文件要读
func getValue(filename, expectSection, expectKey string) string {
	file, err := os.Open(filename)

	if err != nil {
		fmt.Println(err)
		return ""
	}

	reader := bufio.NewReader(file)

	var sectionName string
	for {
		// 读取文件的一行
		linestr, err := reader.ReadString('\n')
		if err != nil {
			fmt.Println("err", err)
			break
		}
		linestr = strings.TrimSpace(linestr)

		if linestr == "" {
			continue
		}

		if linestr[0] == ';' {
			continue
		}

		if linestr[0] == '[' && linestr[len(linestr) - 1] == ']' {
			sectionName = linestr[1 : len(linestr) - 1]
		} else if sectionName == expectSection {
			pair := strings.Split(linestr, "=")
			if len(pair) == 2 {
				key := strings.TrimSpace(pair[0])
				if key == expectKey {
					return strings.TrimSpace(pair[1])
				}
			}
		}
	}

	defer file.Close()
	return ""
}

func main() {
	fmt.Println(getValue("D:\\Program\\GoProjects\\src\\day02\\1.输出\\example.ini", "global", "name"))
}
```

### 指针

指针被拆分为如下两个

- **类型指针：** 可以改数据，传递数据用指针，**不用拷贝省内存**，但不能进行偏移和运算
  -  **Go** 指针不会发生指针偏移，包括垃圾回收
- **切片：** 由指向其实元素的原始指针、元素数量 和 容量组成

**&：** 取地址操作符

**\*：** 取值操作符，与 **&** 互补

##### **声明：** 

```go
var ptr *int
str := new(string)			// new 创建的 会有个初始的默认值 如 int 是 0， string 是 ""
fmt.Println(ptr, *str)
// <nil> "" 未显示引号
```

自动推导出：整型指针 **a** 指向 **b** 的地址，***a** 是取 **b** 的值，**a** 是 **b** 的地址，**&a** 是 **a** 的地址

```go
var b = 1
a := &b
fmt.Println("b:",b, &b, "a:", *a, a, &a)
// b: 1 0xc00000e0d0 a: 1 0xc00000e0d0 0xc00000a038
```

### 数据类型转换

```go
T(表达式)					// 通常情况下， 转换的类型(被转换的变量) 这种形式即可

var a int 32 = 1047483647
b := int16(a) 				// 发生数值截断，32位int 转为 16位int

var c float32 = math.Pi
d = int(c)					// 发生精度丢失，小数后的被自动舍弃

// 数字转字符串

// 字符串转数字

// 字符串 转 字符数组，直接转
[]byte(string)
string([]byte)

// 字符串 转 布尔
ret, err := strconv.ParseBool("True")
```

---

## 2. 容器

### 数组

### 切片

```go

```

变量逃逸

### 
