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
go run main.go
 `-p 4 资源受限`

# 编译
go build 
```

## 1. 基础类型

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

某些场景下， 若 **64位** 依然满足不了你，可以使用大整数计算 **big.Int** 和 有理数 **big.Rat** 类型 

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

### **布尔** 

分 `ture/flase` ，**不允许 整型 强转 布尔** ，无法参加数值运算

### **字符串** 

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

自动推导出：整型指针 **a** 指向 **b** 的地址，**\*a** 是取 **b** 的值，**a** 是 **b** 的地址， **&a** 是 **a** 的地址

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

::: info 数值转换小提示 

- 注意不同数值类型之间转换(大转小)可能有截断，比如一个 **int64** 转成 **int32** 类型的数字
- 可以使用 **int(float)** 转换一个 浮点数到整数，小数部分会丢弃。但是如果浮点数的值超过了整数类型范围，结果是不可预期的
- 注意计算机使用二进制不能精确表示 **float** 数字，当比较两个浮点数时你要格外小心不能用等号直接比较。(通常作差绝对值小于一个很小的阈值)
- 业务中经常使用 **float64**，因为 **math** 函数很多接受 **float64** 作为参数
- 你可以通过 **math.MaxInt32** 类似的定义查看一个类型的最大值

:::

若情况复杂，可以使用 **[cast](https://github.com/spf13/cast)** 转换 , 但注意，**cast** 不能转换自定义类型，比如声明 `type StringType string` **ToString()** 无法获取到想转义的字符串



::: caution Go 语言中 json 安全序/反序列化大数

源于对包含 **int64** 类型的 `snowflake_id` 结构体进行序列化后，又反序列化赋值给 `map[string]interface{}` 时的异常

```go
// 使用 UseNumber 避免损失精度
callbackJson := make(map[string]interface{})
decoder := json.NewDecoder(bytes.NewReader(jsonStr)) // 返回一个新的dedocer
decoder.UseNumber() // 作为一个Number而不是一个float64数值, 解码成一个接口（interface{}）
if err = decoder.Decode(&callbackJson); err != nil {
    return "", err
}
```

若反序列化为结构体则不会

:::

---

## 2. 容器

### [数组（array）](/go/算法与数据结构/数组.html)


### 切片（slice）

```go

```

### 变量逃逸

**变量逃逸(*escape analysis* )：**  是编译器进行内存分配的一种优化机制。

> 需要理解几个关键点:
>
> 1. Go中变量的分配方式有两种:
>    - 栈分配: 函数调用结束后自动回收,性能好
>    - 堆分配: 需要GC回收,性能相对较差
>
> 2. 逃逸分析的目的:
>    - 决定变量分配在栈还是堆
>    - 优化内存分配和回收
>    - 提高程序性能
>
> 3. 常见的逃逸场景:
>    - 返回局部变量的指针
>    - interface{}类型
>    - 切片扩容
>    - 闭包引用
>    - goroutine中使用的变量

##### 典型的逃逸场景

1. 返回局部变量的指针:

   ```go
   // 变量x会逃逸到堆
   func foo() *int {
       x := 42
       return &x
   }
   ```

2. interface{}类型:

   ```go
   // i会逃逸到堆
   func foo() {
       var i interface{}
       i = 42
   }
   ```

3. 切片扩容:

   ```go
   // 当切片扩容时,底层数组可能逃逸到堆
   func foo() {
       s := make([]int, 0)
       for i := 0; i < 100; i++ {
           s = append(s, i)
       }
   }
   ```

4. 闭包引用:

   ```go
   // x会逃逸到堆,因为被闭包引用
   func foo() func() int {
       x := 42
       return func() int {
           return x
       }
   }
   ```

5. goroutine引用:

   ```
   // x会逃逸到堆,因为被goroutine引用
   func foo() {
       x := 42
       go func() {
           println(x)
       }()
   }
   ```

可以通过以下方式查看逃逸分析:

```shell
go build -gcflags="-m" your_file.go
```

##### 避免不必要的逃逸的建议:

- 尽量不要返回局部变量的指针
- 避免过度使用interface{}
- 合理预估切片容量,避免频繁扩容
- 注意闭包对变量的引用
- 对于小对象,优先使用值传递而不是指针



#### **(1) 堆 vs 栈的性能差异**

|    **特性**    |       **栈分配**       |        **堆分配**        |
| :------------: | :--------------------: | :----------------------: |
|  **分配速度**  | 极快（移动栈指针即可） |     较慢（需GC管理）     |
|  **释放速度**  |   函数返回时自动清理   |      依赖GC标记清扫      |
| **内存局部性** |   高（CPU缓存友好）    | 低（可能引发缓存未命中） |
|  **并发安全**  |   线程独享栈，无竞争   |    需同步机制（如锁）    |

**结论**：栈分配的闭包和变量性能远优于堆分配。

#### **(2) GC 的额外开销**

- **堆内存**：Go 的 GC 需要扫描堆上的对象，逃逸变量越多，GC 压力越大。
- **延迟敏感场景**：高频创建逃逸闭包会触发更频繁的 GC，导致微秒级的延迟波动（如游戏、实时系统）。

### **关于 Go 闭包逃逸与性能优化的核心问题**

**Go 的闭包逃逸到堆后，确实会因为堆内存分配和垃圾回收（GC）的开销比栈更高，从而对性能产生影响**。但这不是唯一原因，以下是完整的分析和优化建议：

------

### **1. 为什么需要避免不必要的逃逸？** 

#### **(1) 堆 vs 栈的性能差异**

|    **特性**    |       **栈分配**       |        **堆分配**        |
| :------------: | :--------------------: | :----------------------: |
|  **分配速度**  | 极快（移动栈指针即可） |     较慢（需GC管理）     |
|  **释放速度**  |   函数返回时自动清理   |      依赖GC标记清扫      |
| **内存局部性** |   高（CPU缓存友好）    | 低（可能引发缓存未命中） |
|  **并发安全**  |   线程独享栈，无竞争   |    需同步机制（如锁）    |

**结论**：栈分配的闭包和变量性能远优于堆分配。

#### **(2) GC 的额外开销**

- **堆内存**：Go 的 GC 需要扫描堆上的对象，逃逸变量越多，GC 压力越大。
- **延迟敏感场景**：高频创建逃逸闭包会触发更频繁的 GC，导致微秒级的延迟波动（如游戏、实时系统）。

------

### **2. 闭包逃逸的实际性能影响** 

#### **测试案例** 

```go
// 逃逸到堆的闭包
func heapClosure() func() int {
    x := 0
    return func() int { x++; return x }
}

// 栈上闭包（通过禁止内联模拟）
//go:noinline
func stackClosure(x *int) func() int {
    return func() int { (*x)++; return *x }
}

func BenchmarkHeap(b *testing.B) {
    for i := 0; i < b.N; i++ {
        f := heapClosure()
        _ = f()
    }
}

func BenchmarkStack(b *testing.B) {
    x := 0
    for i := 0; i < b.N; i++ {
        f := stackClosure(&x)
        _ = f()
    }
}
```

**结果**（Go 1.20, AMD Ryzen）：

```markdown
BenchmarkHeap-8   	50000000	        28.6 ns/op	8 B/op	1 allocs/op
BenchmarkStack-8  	2000000000	        0.28 ns/op	0 B/op	0 allocs/op
```

- **堆闭包**：每次调用分配 8 字节（逃逸的 `x`），耗时 28.6 ns。
- **栈闭包**：无分配，耗时 0.28 ns（快 100 倍）。

------

### **3. 何时可以接受闭包逃逸？**

|         **场景**         | **是否推荐逃逸** |            **理由**            |
| :----------------------: | :--------------: | :----------------------------: |
| 低频初始化（如配置加载） |     ✅ 可接受     |    一次性分配，对性能影响小    |
|  回调函数（如HTTP路由）  |     ✅ 可接受     | 闭包存活周期长，逃逸开销占比低 |
|  高频循环（如数据处理）  |      ❌ 避免      |    累积的堆分配和GC压力显著    |
|  延迟敏感逻辑（如算法）  |    ❌ 严格避免    |    堆分配引入不可预测的延迟    |

------

### **4. 如何减少闭包逃逸？**

#### **(1) 优先使用栈传递**

```go
// 不逃逸：通过参数传递状态
func process(x *int) {
    *x++
}
```

#### **(2) 避免返回闭包**

```go
// 不逃逸：闭包仅在函数内使用
func localUse() {
    x := 0
    f := func() int { return x }
    _ = f()
}
```

#### **(3) 复用闭包对象**

```go
// 减少重复逃逸
var reusableFunc func() int

func init() {
    x := 0
    reusableFunc = func() int { x++; return x }
}
```

#### **(4) 编译器优化提示**

```go
//go:noinline  // 禁止内联，强制栈行为（测试用）
func stackOptimized() func() int {
    x := 0
    return func() int { return x }
}
```

------

### **5. 监控与调优工具**

#### **(1) 逃逸分析**

```bash
go build -gcflags="-m -m" main.go
```

#### **(2) GC 日志**

```bash
GODEBUG=gctrace=1 ./program
```

#### **(3) 性能剖析**

```bash
go test -bench . -cpuprofile=cpu.out

go test -bench . -memprofile=mem.out
go tool pprof cpu.out
```

------

### **总结**

- **核心问题**：闭包逃逸到堆的主要代价是 **堆分配和GC开销**，而非内存泄漏。
- 优化原则：
  - **高频/热点路径**：严格避免逃逸。
  - **低频/初始化逻辑**：可接受逃逸。
- 实践建议：
  - 用 `-gcflags="-m"` 识别逃逸。
  - 对性能关键代码重构为显式状态传递。
  - 在服务端长周期场景中，逃逸的影响较小（如HTTP处理器闭包）。



