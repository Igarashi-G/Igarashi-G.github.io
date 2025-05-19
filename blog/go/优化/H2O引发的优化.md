---
title: H2O引出的优化
date: 2025-05-10
category:
  - Go
tag:
  - GO
  - 优化
star: true
---

一氧化二氢引出的业务优化

<!-- more -->

## 1. 水工厂问题

### 1.1 问题如下

有一个名叫大自然的搬运工的工厂，生产一种叫做一氧化二氢的神秘液体。这种液体的分子是由一个氧原子和两个氢原子组成的，也就是水（H~2~O）。

这个工厂有多条生产线，每条生产线负责生产氧原子或者是氢原子，每条生产线由一个 **goroutine** 负责。
这些生产线会通过一个栅栏，只有一个氧原子生产线和两个氢原子生产线都准备好，才能生成出一个水分子， 否则所有的生产线都会处于 **等待状态**。

也就是说，一个水分子必须由三个不同的生产线提供原子，而且水分子是一个一个按照顺序产生的， 每生产一个水分子，就会打印出 <span style="color:blue"><b>`HHO、HOH、OHH`  </b></span>三种形式的其中一种。<span style="color:red"><b>`HHH、OOH、OHO、HOO、OOO` </b> </span> 都是不被允许的。
生产线中氢原子的生产线为 **2N** 条，氧原子的生产线为 **N** 条。

**思路：**  

如果使用 **WaitGroup**，则非常复杂，而且重用和 **Done** 方法的调用有并发的问题，程序可能 **panic**，此时应考虑 **循环栅栏**

```go
package main

import (
	"context"
	"fmt"
	"math/rand"
	"sync"
	"time"

	"github.com/marusama/cyclicbarrier"
	"golang.org/x/sync/semaphore"
)

// 定义水分子的组成
type H2O struct {
  semaH *semaphore.Weighted // 氢原子的信号量
  semaO *semaphore.Weighted // 氧原子的信号量
  b     cyclicbarrier.CyclicBarrier // 循环栅栏，用来控制合成
}

func New() *H2O {
  return &H2O{
    semaH: semaphore.NewWeighted(2), //氢原子需要两个
    semaO: semaphore.NewWeighted(1), // 氧原子需要一个
    b:     cyclicbarrier.New(3),  // 需要三个原子才能合成
  }
}


func (h2o *H2O) hydrogen(releaseHydrogen func()) {
  h2o.semaH.Acquire(context.Background(), 1)

  releaseHydrogen() // 输出H
  h2o.b.Await(context.Background()) //等待栅栏放行
  h2o.semaH.Release(1) // 释放氢原子空槽
}


func (h2o *H2O) oxygen(releaseOxygen func()) {
  h2o.semaO.Acquire(context.Background(), 1)

  releaseOxygen() // 输出O
  h2o.b.Await(context.Background()) //等待栅栏放行
  h2o.semaO.Release(1) // 释放氢原子空槽
}

func main() {
	 //用来存放水分子结果的channel
    var ch chan string
    releaseHydrogen := func() {
        ch <- "H"
    }
    releaseOxygen := func() {
        ch <- "O"
    }

    // 300个原子，300个goroutine,每个goroutine并发的产生一个原子
    var N = 100
    ch = make(chan string, N*3)
    
    h2o := New()
    
    // 用来等待所有的goroutine完成
	var wg sync.WaitGroup
    wg.Add(N * 3)
	
     // 200个氢原子goroutine
    for i := 0; i < 2*N; i++ {
        go func() {
            time.Sleep(time.Duration(rand.Intn(100)) * time.Millisecond)
            h2o.hydrogen(releaseHydrogen)
            wg.Done()
        }()
    }
    // 100个氧原子goroutine
    for i := 0; i < N; i++ {
        go func() {
            time.Sleep(time.Duration(rand.Intn(100)) * time.Millisecond)
            h2o.oxygen(releaseOxygen)
            wg.Done()
        }()
    }
	//等待所有的goroutine执行完
    wg.Wait()

    // 结果中肯定是300个原子
    if len(ch) != N*3 {
        t.Fatalf("❌ expect %d atom but got %d", N*3, len(ch))
    }
	// 每三个原子一组，分别进行检查。要求这一组原子中必须包含两个氢原子和一个氧原子，这样才能正确组成一个水分子。
    var s = make([]string, 3)
    for i := 0; i < N; i++ {
        s[0] = <-ch
        s[1] = <-ch
        s[2] = <-ch
        sort.Strings(s)


        water := s[0] + s[1] + s[2]
        if water != "HHO" {
            t.Fatalf("错误 ❌: expect a water molecule but got %s", water)
        }
        fmt.Println("正确 ✅:", water)
    }
}
```

### 1.2 CyclicBarrier 与 WaitGroup

[CyclicBarrier](https://github.com/marusama/cyclicbarrier) 是一个可重用的栅栏并发原语，常常应用于重复进行一组 **goroutine** 同时执行的场景中。其允许一组 **goroutine** 彼此等待，到达一个共同的执行点，同时，由于可以被重复使用，也叫 **循环栅栏**。具体的机制是，大家都在栅栏前等待，等全部都到齐了，就抬起栅栏放行。

与 **WaitGroup** 的区别如下:

1. **CyclicBarrier** 适合用于 *“固定数量的 **goroutine** 等待同一个执行点 “*  的场景中；
2. 放行 **goroutine** 之后，**CyclicBarrier** 可以重复利用；
3. 不像 **WaitGroup** 重用的时候，必须小心翼翼避免 **panic**；

处理可重用的多 **goroutine** 等待同一个执行点的场景的时候，**CyclicBarrier** 和 **WaitGroup** 方法调用的对应关系如下：

<img src="./img/CyclicBarrier.jpg" style="width:600px"/>  

如果使用 **WaitGroup** 实现的话，调用比较复杂，不像 **CyclicBarrier** 那么清爽。更重要的是，如果想重用 **WaitGroup**，你还要保证，将 **WaitGroup** 的计数值重置到 **n** 的时候不会出现并发问题。

::: tip 贴士：

**WaitGroup** 更适合用在 *“一个 **goroutine** 等待一组 **goroutine** 到达 **同一个** 执行点 ”* 的场景中（非 **goroutine** 内部），或者是不需要重用的场景中。

:::

### 1.3 CyclicBarrier 说明

**CyclicBarrier** 有两个初始化方法：

1. 第一个是 **New** 方法，它只需要一个参数，来指定循环栅栏参与者的数量；
2. 第二个方法是 **NewWithAction：**  
   - 它额外提供一个函数，可以在每一次到达执行点的时候执行一次
   - 执行具体的时间点是在 **最后一个参与者到达之后，但是其它的参与者还未被放行之前** 。故能利用它，做放行之前的一些共享状态的更新等操作。

```go
func New(parties int) CyclicBarrier
func NewWithAction(parties int, barrierAction func() error) CyclicBarrier
```

**CyclicBarrier** 是一个接口，定义的方法如下：

```go
type CyclicBarrier interface {
    // 等待所有的参与者到达，如果被ctx.Done()中断，会返回ErrBrokenBarrier
    Await(ctx context.Context) error

    // 重置循环栅栏到初始化状态。如果当前有等待者，那么它们会返回ErrBrokenBarrier
    Reset() 

    // 返回当前等待者的数量
    GetNumberWaiting() int

    // 参与者的数量
    GetParties() int

    // 循环栅栏是否处于中断状态
    IsBroken() bool
}
```

循环栅栏的使用也很简单，参与者只需调用 **Await(ctx)** 等待，等所有的参与者都到达后，再执行下一步。

当执行下一步的时候，循环栅栏的状态又恢复到初始的状态了，可以迎接下一轮同样多的参与者。

## 2. 业务中的思考

既然 **H2O** 可以通过 **CyclicBarrier** 控制并发 - 同步点，那么 **“H” - “O”** 也可以。这不正好对应的业务中的类似场景：

- 视频录制地址是 **预制的地址** ，可能 **先、后** 于录制视频回调触发的路径移动，此时要控制 **A协程 地址生成后 **， **B协程再进行录制视频文件的移动**； 
- 推送时机同步；

### 2.1 单机屏障

```go
package main

import (
	"context"
	"fmt"
	"github.com/marusama/cyclicbarrier"
	"math/rand"
	"sync"
	"time"
)

// SyncPoint 表示一个同步点，用于H和O原子的配对
type SyncPoint struct {
	barrier cyclicbarrier.CyclicBarrier
	mu      sync.Mutex
	done    bool // 标记是否已经完成配对
}

// H2OManager 管理所有的H2O配对
type H2OManager struct {
	syncMap sync.Map // key: requestID, value: *SyncPoint
}

// NewH2OManager 创建一个新的H2O管理器
func NewH2OManager() *H2OManager {
	return &H2OManager{}
}

// getOrCreateSyncPoint 获取或创建一个同步点
func (m *H2OManager) getOrCreateSyncPoint(requestID int, elem string) *SyncPoint {
	val, loaded := m.syncMap.LoadOrStore(requestID, &SyncPoint{
		barrier: cyclicbarrier.New(2), // 2个原子配对
	})
	fmt.Printf("%s 原子创建了屏障 %d， %v\n", elem, requestID, loaded)
	return val.(*SyncPoint)
}

// ProcessHydrogen 处理H原子
func (m *H2OManager) ProcessHydrogen(requestID int, doSomething func()) {
	sp := m.getOrCreateSyncPoint(requestID, "H")

	// 执行H原子的操作
	doSomething()

	// 等待配对
	sp.barrier.Await(context.Background())

	// 检查是否已经完成配对
	sp.mu.Lock()
	if !sp.done {
		sp.done = true
		sp.mu.Unlock()
		// 等待一小段时间确保O原子也完成了操作
		//time.Sleep(100 * time.Millisecond)
		// 清理资源
		m.syncMap.Delete(requestID)
	} else {
		sp.mu.Unlock()
	}
}

// ProcessOxygen 处理O原子
func (m *H2OManager) ProcessOxygen(requestID int, doSomething func()) {
	sp := m.getOrCreateSyncPoint(requestID, "O")

	// 执行O原子的操作
	doSomething()

	// 等待配对
	sp.barrier.Await(context.Background())

	// 检查是否已经完成配对
	sp.mu.Lock()
	if !sp.done {
		sp.done = true
		sp.mu.Unlock()
		// 等待一小段时间确保H原子也完成了操作
		//time.Sleep(100 * time.Millisecond)
		// 清理资源
		m.syncMap.Delete(requestID)
	} else {
		sp.mu.Unlock()
	}
}

// 模拟随机延迟
func randomPause2(max int) {
	time.Sleep(time.Millisecond * time.Duration(rand.Intn(max)))
}

func main() {
	// 创建H2O管理器
	manager := NewH2OManager()

	// 模拟多个请求
	numRequests := 65530
	var wg sync.WaitGroup
	wg.Add(10 * 2) // 每个请求有H和O两个原子

	// 启动多个worker处理请求
	for i := 65520; i < numRequests; i++ {
		requestID := i

		// 启动H原子处理
		go func(id int) {
			defer wg.Done()
			manager.ProcessHydrogen(id, func() {
				fmt.Printf("H原子处理请求 %d\n", id)
			})
		}(requestID)

		// 启动O原子处理
		go func(id int) {
			defer wg.Done()
			manager.ProcessOxygen(id, func() {
				fmt.Printf("O原子处理请求 %d\n", id)
			})
		}(requestID)
	}

	// 等待所有请求处理完成
	wg.Wait()
	fmt.Println("所有请求处理完成")

	// 验证所有资源是否已清理
	count := 0
	manager.syncMap.Range(func(key, value interface{}) bool {
		count++
		return true
	})
	fmt.Printf("剩余未清理的资源数量: %d\n", count)
}
```

通过一个全局 `syncMap sync.Map // key: requestID, value: *SyncPoint`  即可以控制任意两类 **goroutine** 的同步栅栏，其中：

- **requestID：** 即两类 **goroutine** 中的每组标志位；
- **value:** 即 **CyclicBarrier** 的同步点，可等待对方的协程到达；

::: warning 注意：

此种场景适合同一进程下的多类 **goroutine** 同步

:::

### 2.2 分布式屏障

单机如上，可以不引入外部中间件来进行进程内的多协程同步，那么分布式下呢？



