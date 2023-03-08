---
title: asyncio基础
order: 2
---

# asyncio —— 异步 I/O 基础

[asyncio API 文档](https://docs.python.org/zh-cn/3/library/asyncio.html)

## 1. 概述

**asyncio** 是用来编写 **并发代码** 的库，使用 `async/await` 语法。

**场景**：被用作多个提供高性能 Python 异步框架的基础，包括网络和网站服务，数据库连接库，分布式任务队列等等。往往是构建 IO 密集型和高层级 结构化 网络代码的最佳选择。

`asyncio` 提供一组 高层级 API 用于：

- **并发地 运行 Python 协程** 并对其执行过程实现**完全控制**
- 执行 网络 IO 和 IPC
- 控制 子进程
- 通过 [队列]() 实现 **分布式任务**
- 同步 并发代码

此外，还有一些 **低层级 API** 以支持 **库** 和 **框架级别** 的开发者实现：

- 创建和管理事件循环，以提供异步 API 用于网络化， 运行子进程，处理 OS 信号 等等
- 使用 `transports` 实现高效率协议
- 通过 `async/await` 语法 桥接 基于回调的库和代码

## 2. 基础使用

<Alert type="error">虽然协程**底层就是用生成器实现**的，但不要将 协程 和 生成器 **混淆**</Alert>

### 2.1 事件循环

<Alert type="warning"> 先理解成一个用来`检测`并`执行`某些代码的 **死循环**</Alert>

```markdown
# 以下是伪代码：

task_list = [task1, task2, task3, ...]

while True:
pending_tasks, success_tasks = task_list
for pending_task in pending_tasks:
exec pending_task...
for success_task in success_tasks:
task_list.remove(success_task)
if len(task_list) == 0:
break
```

获取事件循环并执行：

```python
import asyncio

# 生成 | 获取 一个事件循环
loop = asyncio.get_event_loop()

# 让事件循环检测任务并执行，直到被执行完
loop.run_until_complete()
```

- `asyncio.get_event_loop():` 可以创建一个事件循环（即创建一个`event_loop`）每个线程有一个事件循环，主线程调用`get_event_loop`时会创建事件循环

- `run_until_complete(future/coroutine)` 的特点就像该函数的名字，直到循环事件的 **所有事件都处理完** 才能完整结束，可以将协程注册到事件循环，并启动事件循环
  内部会将协程包装成为了一个任务（task）对象。（见下）

  ```python
  new_task = not futures.isfuture(future)     # 判断传入的是future还是coroutine

  future = tasks.ensure_future(future, loop=self) # 将传入值 future 用 ensure_future 进行转换为task对象
  ```

​

### 2.2 快速上手

##### **什么是协程函数？**

`async` + `def` + 函数名

```python
async def foo():
	pass
```

##### **什么是协程对象？**

- 执行 `协成函数()` 得到的即是 `协成对象`, 一个协程对象就是一个原生可被挂起的函数
- 属于 [_awaitable_](/back_end/python/base/异步编程/asyncio基础#23-await) 对象，**协程的执行** 可通过调用 `__await__()` 并迭代其结果来控制
  - 迭代结束会引发 [`StopIteration`](https://docs.python.org/zh-cn/3/library/exceptions.html#StopIteration)，该异常的 `value` 属性将存放返回值
- 协程也具有生成器的 `send`、`throw`、`close` 方法，可参考 [生成器](/back_end/python/base/基本概念/生成器)，但区别是 **协程不直接支持迭代**（`for` 循环需使用 [异步迭代器](/back_end/python/base/异步编程/asyncio基础#51-异步迭代器)）

```python
ret = foo()
print(ret)

### 输出结果:
# <coroutine object foo at 0x0000024D1B444848>
# sys:1: RuntimeWarning: coroutine 'foo' was never awaited
```

> **注：** 执行`协成函数`创建的`协成对象`，函数内部代码**不会执行**

把`协成对象`当成一个`任务`，即添加 **Task** 到`事件循环`中，即可执行

```python
import asyncio


async def foo():
    print("Fuck me on github")
    pass


ret = foo()

loop = asyncio.get_event_loop()
loop.run_until_complete(ret)

### 输出结果:
# Fuck me on github
```

<Font type="info" fsize="m">py3.7 之后，有了更简便的写法</Font>

```python
asyncio.run(ret) # 即可
```

- 管理 `asyncio` 事件循环，**终结异步生成器，并关闭线程池**
- 总会创建一个新的事件循环，并在结束时关闭，用于 `asyncio` 程序的**入口**
- 本质还是调用了 `loop.run_until_complete(main)`，直到 [Future](/back_end/python/base/异步编程/asyncio基础#4-future对象) 对象执行完成

> 注：`asyncio.run()` 本质上和声明 **loop** 再执行相同，只是`简化写法`而已，理想情况应该只被调用一次

### 2.3 await

#### **可等待对象(`awaitable`)**

<Alert type="info">_可等待_ 对象有**三种:** <Badge>**协程**</Badge><Badge>**任务** </Badge><Badge>**Future**</Badge></Alert>

- 能在 [await](/back_end/python/base/异步编程/asyncio基础#23-await) 表达式中使用的对象

- 可等待对象 主要实现了 `__await__()`方法

  > **注：** 带有 [`types.coroutine()`](https://docs.python.org/zh-cn/3/library/types.html#types.coroutine) 或 [`asyncio.coroutine()`](https://docs.python.org/zh-cn/3/library/asyncio-task.html#asyncio.coroutine) 装饰器的生成器返回的 [generator iterator](https://docs.python.org/zh-cn/3/glossary.html#term-generator-iterator) 对象也属于可等待对象，但它们并未实现 [`__await__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__await__)。

- 从 `async def ` 函数返回的 [协程对象]() 即属于可等待对象，因此可以在其他协程中被等待

**`object.__await__(self)`**

> 用来实现可迭代对象，如：[asyncio.Future](/back_end/python/base/资源调度/协程#35-future对象) 对象实现了此方法，从而可以和 `await` 表达式兼容

- 返回值：

  - `迭代器: iterator`:

- 示例：

  ```python
  def __await__(self):
      if not self.done():
          self._asyncio_future_blocking = True
          yield self  # This tells Task to wait for completion.
      if not self.done():
          raise RuntimeError("await wasn't used with future")
      return self.result()  # May raise too.
  ```

使用 **await** 等待协程返回值：

```python
import asyncio


async def io_func():
    print("start io block")
    await asyncio.sleep(2)
    print("end io block")


async def foo():
    print("Fuck me on github")

    ret1 = await io_func()
    print(ret1)

    ret2 = await io_func()
    print(ret2)

ret = foo()
asyncio.run(ret)

### 输出结果:
# Fuck me on github
# start io block
# end io block
# None
# start io block
# end io block
# None
```

- 等到协程返回结果之后，再继续执行，变为 `同步阻塞` 式，但会 `挂起` 当前阻塞协程

> 当遇到 `IO操作` 时挂起当前协程，等 IO 操作完之后 `再继续` 往下执行，此时 `事件循环` 可以去执行 `其他协程任务`

## 3. Task 对象

##### <Font type="dark">class asyncio.Task(_coro_, \*, loop=None, name=None)</Font><Badge>py3.9</Badge>

`Task` 任务，是 `Future` 类的子类，对 `coroutine` 的进一步封装，相比 [协程](/back_end/python/base/资源调度/协程)，保存了协程运行后的状态，用于来获取协程的结果

- `Pending`: 创建时
- `Running`: 调用执行时
- `Done`: 调用完毕
- `Cancelled`: 调用停止，task 取消

> 通常被用于运行协程，**非线程安全**的对象。**强烈不推荐** 手动实例化 `Task` 对象来创建 `task`，即使可以工作，但没必要

#

_3.10 版后已移除:_ 如果未指定 _loop_ 并且没有正在运行的事件循环则会发出弃用警告。

### 3.1 创建任务

##### <Font type="dark">asyncio.ensure_future(obj, \*, loop=None)</Font>

> 将 `coroutine `封装成一个 `task任务` 对象，<Font type="info" size="ss">低版本的创建方式，在所有版本有效，但可读性差</Font>，推荐使用下文 [asyncio.create_task](/back_end/python/base/异步编程/asyncio基础#-1)

- 参数：

  - `obj: <coroutine object>`： 若是 ` isfuture()` 对象，则保持原样，若是 `iscoroutine()` 则会加入`loop` 执行，若是可等待对象，则等待结果，其他对象则引发 `TypeError` 异常
  - `loop: = None`：事件循环

- 返回值：

  - `task对象: <class '_asyncio.Task'>`：返回一个作为 `asyncio任务` 可并发执行的 `task对象`

- 示例：

  ```python
  import asyncio
  import time


  async def do_some_work(x):
      print('Waiting: ', x)
      await asyncio.sleep(x)
      return 'Done after {}s'.format(x)


  async def main():
      coroutine1 = do_some_work(1)
      coroutine2 = do_some_work(2)
      coroutine3 = do_some_work(2)

      tasks = [
          asyncio.ensure_future(coroutine1),
          asyncio.ensure_future(coroutine2),
          asyncio.ensure_future(coroutine3)
      ]

      start = time.time()
      await asyncio.wait(tasks)

      print('TIME: ', time.time() - start)


  asyncio.run(main())

  ### 输出结果
  # Waiting:  1
  # Waiting:  2
  # Waiting:  2
  # TIME:  2.0020179748535156
  ```

##### <Font type="dark">asyncio.create_task(coro, \*, name=None)</Font><Badge>py3.7</Badge>

> 将协程封装成一个 `task任务` 对象，在 `事件循环` 中**添加多个任务**，并能够 **并发调度地执行**，该任务会在 `get_running_loop`返回的 loop 中执行，若当前线程没有 loop，则会引发 `RuntimeError`

- 参数：

  - `coro: <coroutine object>`： 传入协程对象
  - `name: str = None`：3.8 中添加 _name 形参_，调用 `Task.set_name()` 创建任务名

- 返回值：

  - `task对象: <class '_asyncio.Task'>`：返回一个作为 `asyncio任务` 可并发执行的 `task对象`

- 示例：

  ```python
  import asyncio


  async def foo(a, *, b, c):
      await asyncio.sleep(1)
      return a + b + c


  async def main():
      # 会将当前执行的 foo(...)函数任务 立即添加到事件循环当中
      task = asyncio.create_task(foo(1, b=2, c=3), name="task1")
      print(task, type(task))
      ret = await task
      print(ret)


  asyncio.run(main())

  ### 输出结果:
  # <Task pending name='task1' coro=<foo() running at task_file_path> <class '_asyncio.Task'>
  # 6
  ```

  1. 当调用`asyncio.run()`后，执行到`create_task`时，当前主线程里面有一个`main`任务，一个`foo`任务
  2. 此时并不会执行`foo`任务，因为此时异步任务`main`并没有遇到阻塞
  3. 直到执行到 `await task` 时，主线程 `main` 遇到阻塞，才回切换到 `foo` 去执行

- 其他方式：

  ```python
  loop.create_task(coro, *, name=None)	# asyncio.create_task 就是调用该方法创建的(快捷方式)
  ```

  ```python
  asyncio.ensure_future(coro())	# 低版本的创建方式，在所有版本有效，但可读性差
  ```

### 3.2 执行任务

##### <Font type="dark">asyncio.wait(aws, \*, loop=None, timeout=None, return_when=ALL_COMPLETED)</Font>

> 并发地运行 _fs_ 可迭代对象中的 [可等待对象](/back_end/python/base/资源调度/协程#33-await) 并进入阻塞状态直到满足 _return_when_ 所指定的条件。

- 参数：

  - `aws: List[<coroutine object>]`： 必须是可迭代的 `协程对象 | Tasks | Futures`，不能为空
  - `loop: str = None`：事件循环
  - `timeout: int = None`: 超时时间
  - `return_when: str = ALL_COMPLETED`: 返回条件，默认值为 **ALL_COMPLETED** 全部完成，还有第一个完成 **FIRST_COMPLETED** 和第一个异常 **FIRST_EXCEPTION**

- 返回值：

  - `两个Task/Future集合：(done, pending) `:
    - `done: Set`: 包含所有任务的返回值的集合
    - `pending`：只有传入 _timeout_ 超时参数时，才有可能产生 `pending` 列表

- 示例：

  ```python
  async def main():
      task_list = [
          asyncio.create_task(foo(1, b=2, c=3), name="task1"),
          asyncio.create_task(foo(4, b=5, c=6), name="task2")
      ]
      done, pending = await asyncio.wait(task_list, timeout=2)  # 修改超时，得到不同结果
      print(done, pending)

  ### 输出结果
  # 未超时正常输出结果：
  # {<Task finished name='task1' coro=<foo() done, defined at file_path> result=6>,
  # <Task finished name='task2' coro=<foo() done, defined at file_path> result=15>}

  # 超时状态，pending结果：
  # {<Task pending name='task1' coro=<foo() running at file_path> wait_for=<Future pending cb=[<TaskWakeupMethWrapper object at 0x0000019F8D6F52E0>()]>>,
  # <Task pending name='task2' coro=<foo() running at file_path> wait_for=<Future pending cb=[<TaskWakeupMethWrapper object at 0x0000019F8D6F52B0>()]>>}
  ```

<Alert type="info">返回的 **结果集** 是按照事件循环中的 **任务完成顺序** 排列的，所以和原始任务顺序可能不同 </Alert>

##### <Font type="dark">asyncio.gather(\*aws, loop=None, return_exceptions=False)</Font>

> _并发_ 运行 <Font fsize="ss">\*aws</Font> 序列中的 [可等待对象](/back_end/python/base/资源调度/协程#33-await)，协程并发运行后会顺序返回，**适合有序结果集**

- 参数：

  - `*aws:*list`：若序列中某个可等待对象为协程，它将自动被作为一个任务调度（传协程也变任务）
  - `loop`: 可传入事件循环
  - `return_exceptions = False`: 为 **True** 时，异常会和成功的结果一样处理，并聚合至结果列表。若序列中的任一对象被取消，等同于触发 `CancelledError`，但 `gather()` **不会被取消**

- 返回值：

  - `result:List`: 返回一个 **聚合所有可等待对象的返回值** 的列表

- 示例：

  ```python
  import time
  import asyncio


  async def taskIO_1():
      print('开始运行IO任务1...')
      await asyncio.sleep(3)
      print('IO任务1已完成，耗时3s')
      return taskIO_1.__name__


  async def taskIO_2():
      print('开始运行IO任务2...')
      await asyncio.sleep(2)
      print('IO任务2已完成，耗时2s')
      return taskIO_2.__name__


  async def main():
      resualts = await asyncio.gather(taskIO_1(), taskIO_2())  # 子生成器
      print(resualts)


  start = time.time()
  asyncio.run(main())
  print('所有IO任务总耗时%.5f秒' % float(time.time() - start))

  ### 输出结果：
  # 开始运行IO任务1...
  # 开始运行IO任务2...
  # IO任务2已完成，耗时2s
  # IO任务1已完成，耗时3s
  # ['taskIO_1', 'taskIO_2']
  # 所有IO任务总耗时3.00378秒
  ```

<Alert type="info">不仅通过 `await` 返回仅一个 **结果集**，且顺序是 **传入任务的原始顺序** </Alert>

##### <Font type="dark">asyncio.as*completed`(\_aws*, *, *loop=None*, *timeout=None\*)</Font>

> _并发_ 运行 <Font fsize="ss">aws</Font> 可迭代对象中的 [可等待对象](/back_end/python/base/资源调度/协程#33-await)，返回一个协程的 **迭代器**，会优先 **得到最快执行完的任务结果**

- 参数：

  - `aws: List[<coroutine object>]`： 必须是可迭代的 `协程对象 | Tasks | Futures`，不能为空
  - `loop: str = None`：事件循环
  - `timeout: int = None`: 超时时间，发生超时则引发 [`asyncio.TimeoutError`](https://docs.python.org/zh-cn/3/library/asyncio-exceptions.html#asyncio.TimeoutError)。

- 返回值：

  - `result:generator`: 返回一个生成器对象，可迭代获取结果

- 示例：

  ```python
  async def main():
      task_list = [
          asyncio.create_task(foo(1, b=2, c=3), name="task1"),
          asyncio.create_task(foo(4, b=5, c=6), name="task2")
      ]
      for task in asyncio.as_completed(task_list, timeout=2):
          ret = await task
          print(ret)

  ### 输出结果：
  # 6
  # 15

  ### or
  # asyncio.exceptions.TimeoutError
  ```

<Alert type="info">和 `wait()` 一样，是按照 **任务完成顺序** 排列的，不同之处是 `as_completed(tasks)` 可实时返回当前完成的结果，而 `wait(tasks)` 要等待所有协程结束后，去返回的 `done` 中获得结果</Alert>

### 3.3 获取结果

##### <Font type="dark">task.add*done_callback(\_callback*, *, *context=None\*)</Font>

> 添加一个回调，将在 `Task` 对象 **完成** 时被运行，此方法应仅在低层级、基于回调的代码中使用

##### <Font type="dark">task.result()</Font>

> 返回 `Task` 的结果

- 返回值：

  - 如果 `task` 状态为 `Done`，其封包的协程的结果会被返回 (或者当协程引发异常时，该异常会被重新引发)
  - 如果 `task` 状态为 `Cancelled`，会引发一个 [`CancelledError`](https://docs.python.org/zh-cn/3/library/asyncio-exceptions.html#asyncio.CancelledError) 异常。
  - 如果 `task` 状态为 `Pending` or `Running` ，会引发一个 [`InvalidStateError`](https://docs.python.org/zh-cn/3/library/asyncio-exceptions.html#asyncio.InvalidStateError) 异常。

- 示例：

  ```python
  async def foo(num):
      print(f'Run foo() num is {num}')
      return f"return num is {num}"


  def callback(task):
      print(f"callback: {task.result()}")


  if __name__ == "__main__":
      start = time.time()

      coroutine = foo(1)
      loop = asyncio.get_event_loop()

      task = asyncio.ensure_future(coroutine)
      task.add_done_callback(callback)  # 添加执行完之后的回调

      loop.run_until_complete(task)
      loop.close()

      end = time.time()
      print(end - start)

  # or

  async def main():
      start = time.time()

      coroutine = foo(1)

      task = asyncio.create_task(coroutine)
      await task
      print(f"callback: {task.result()}")

      end = time.time()
      print(end - start)


  asyncio.run(main())

  ### 输出结果：
  # Run foo() num is 1
  # callback: return num is 1
  # 0.0009970664978027344
  ```

- `task.add_done_callback(callback):` 绑定回调，当 `coroutine` 执行结束时调用回调函数的 `task.result()` 打印任务结果

### 3.4 取消任务

如果需要停止事件循环，就需要先把 task 取消。可以使用 asyncio.Task 获取事件循环的 task

```python
import asyncio
import time


async def do_some_work(x):
    print('Waiting: ', x)
    await asyncio.sleep(x)
    return 'Done after {}s'.format(x)


def main():
    coroutine1 = do_some_work(1)
    coroutine2 = do_some_work(2)
    coroutine3 = do_some_work(2)

    tasks = [
        asyncio.ensure_future(coroutine1),
        asyncio.ensure_future(coroutine2),
        asyncio.ensure_future(coroutine3)
    ]

    now = lambda: time.time()
    start = now()

    loop = asyncio.get_event_loop()
    try:
        loop.run_until_complete(asyncio.wait(tasks))
    except KeyboardInterrupt as e:
        print("all_tasks", asyncio.all_tasks(loop))
        for task in asyncio.all_tasks(loop):
            print(task.cancel())

        # print("gather", asyncio.gather(*asyncio.all_tasks(loop)).cancel())  # 或使用这种方式cancel也一样
        loop.stop()
        loop.run_forever()
    finally:
        loop.close()

    print('TIME: ', now() - start)


main()

### 输出结果
# Waiting:  1
# Waiting:  2
# Waiting:  2
# all_tasks {<Task pending name='Task-4' coro=<wait() running at D:\Miniconda3\lib\asyncio\tasks.py:413> wait_for=<Future pending cb=[<TaskWakeupMethWrapper object at 0x0000016826BFCAC0>()]>>, <Task pending name='Task-2' coro=<do_some_work() running at path> wait_for=<Future pending cb=[<TaskWakeupMethWrapper object at 0x0000016826BFC970>()]> cb=[_wait.<locals>._on_completion() at D:\Minicond
# a3\lib\asyncio\tasks.py:513]>, <Task pending name='Task-3' coro=<do_some_work() running at D:\Python Program\huan-plan\backend\huan\utils\tests\test_zz.py:365> wait_for=<Future pending cb=[<TaskWakeupMethWrapper object at 0x0000
# 016826BFC9A0>()]> cb=[_wait.<locals>._on_completion() at path]>, <Task pending name='Task-1' coro=<do_some_work() running at path>
# wait_for=<Future pending cb=[<TaskWakeupMethWrapper object at 0x0000016826BFC940>()]> cb=[_wait.<locals>._on_completion() at poath]>}
# True
# True
# True
# True
# TIME:  0.6261041164398193
```

- asyncio.Task.all_tasks():取到所有 task

- task.cancel(): 关于停止协程：
  - 需要先取消 task，利用 for task in asyncio.Task.all_tasks(): task.cancel()
  - 停止 loop 事件循环。利用 loop.stop()

注：
启动事件循环之后，马上 ctrl+c，会触发 run_until_complete 的执行异常 KeyBorardInterrupt。然后通过循环 asyncio.Task 取消 future。

## 4. Future 对象

[Futures](https://docs.python.org/zh-cn/3/library/asyncio-future.html#asyncio-futures)

1. `Task` 对象的基类，用来链接**底层回调式代码** 和 高层`异步|等待式`代码，是更底层接口，帮助等待异步的结果

2. 一个`Future`代表一个异步运算的最终结果，线程不安全

3. 代表**将来执行** 或 **没有执行** 的任务的结果，它和 `task` 没有本质的区别

   > 可以说：future 就是存放着众多 task 或 future 的容器，或是包含众多协程的一个大协程

### 4.1 创建 Future

**loop.create_future()**

> 创建一个 **附加到事件循环中** 的 [asyncio.Future](/back_end/python/base/资源调度/协程#35-future对象) 对象，创建 Futures 的**首选方式**。

示例：

```python
async def main():
    # 获取当前的事件循环
    loop = asyncio.get_running_loop()

    # 创建了一个 future对象，不执行任务，什么也没干
    future = loop.create_future()

    # 等待执行任务 (future对象)的结果，没有结果会一直阻塞
    ret = await future
    print(ret)


asyncio.run(main())

### 输出结果： 卡死，无
```

- 协程会等待 Future 对象<Font>直到它有结果、或有异常、或被取消</Font>，因此示例程序会阻塞

<Alert type="warning">经验：面向用户的接口（造出的轮子）不要暴露 Future 对象，使用[loop.create_future()](/back_end/python/base/资源调度/协程#351-创建future)创建 Future，可以让 Future 对象使用其他事件循环实现，可以注入自己的优化实现</Alert>

### 4.2 设置 Future 结果

<Font type="dark">set_result(self, \*args, \*\*kwargs)</Font>

> 将 Future 标记为 **完成** 并设置结果，若 _在标记前就已完成_ 则抛出一个 `InvalidStateError` 异常。

示例：

```python
async def set_future(future):
    print("执行任务前的Future对象:", future)
    ret = await asyncio.sleep(1, 100)
    future.set_result(1)
    print("设置返回值后的Future对象:", future)
    return ret


async def main():
    loop = asyncio.get_running_loop()

    fut = loop.create_future()

    task_result = asyncio.create_task(set_future(fut))
    print("获取任务对象（未执行）:", task_result)

    # 此时主线程阻塞，事件循环自动切换到task任务并执行，直到等到了future的返回结果
    future_result = await fut
    print("获取Future返回值:", future_result)


asyncio.run(main())

### 输出结果：
# 获取任务对象（未执行）: <Task pending name='Task-2' coro=<set_future() running at path>>
# 执行任务前的Future对象: <Future pending cb=[<TaskWakeupMethWrapper object at 0x000001F20E5B5430>()]>
# 设置返回值后的Future对象: <Future finished result=1>
# 获取Future返回值: 1
```

- `future`对象用于等待结果，然后让`task`来处理过程，`task`内部会自动执行 `set_result` 来使任务完成

### 4.3 进线程、协程混用

<Alert type="info"> 实际开发过程中，经常会遇到第三方库无 asyncio，已同步的形式存在，因此需要改写为异步协程来提高并发</Alert>

#### 同步变 Future

<Font type="dark">loop.run_in_executor(executor, func, \*args)</Font>

> 使用`concurrent.futures.Executor`的执行器 调度 _func_，并返回 **协程的 Future 对象**

- 参数：

  - `executor = None`：必须是 [`concurrent.futures.Executor`]() 实例, 如果为 None，则使用默认的 `Executor` 即 `ThreadPoolExecutor`
  - `func|*args`: 本质是作为 调用 Executor 中 [`submit(fn, /, *args, **kwargs)`]() 所需的参数

- 返回值：

  - `协程对象: <class '_asyncio.Future'>`: 返回了 [_awaitable_](/back_end/python/base/资源调度/协程#可等待对象awaitable) 的 Future 对象

- 示例:

  ```python
  import time
  import asyncio


  def func1():
      # 某个耗时操作
      time.sleep(2)
      return "over"


  async def main():
      loop = asyncio.get_running_loop()

      # 使用.run_in_executor() 返回一个 asyncio.Future对象，将普通function 变为 Future对象
      future = loop.run_in_executor(None, func1)
      print("future", future, type(future))

      ret = await future
      print("result:", ret, future)


  asyncio.run(main())

  ### 输出结果
  # future <Future pending cb=[_chain_future.<locals>._call_check_cancel() at path> <class '_asyncio.Future'>
  # result: over <Future finished result='over'>
  ```

  - step1：内部会先默认使用`ThreadPoolExecutor` 的实例，通过`submit()`去线程池申请一个线程执行`func1` ，并返回一个 `concurrent.futures.Future` 对象
  - setp2：调用 <Font fsize="ss">asyncio.wrap_future</Font> 将 `concurrent.futures.Future` 对象包装为`asyncio.Future` 对象并返回

- 含实例示例：

  ```python
  async def main():
      loop = asyncio.get_running_loop()

      # 2. Run in a custom thread pool:
      with concurrent.futures.ThreadPoolExecutor() as pool:
          future = loop.run_in_executor(
              pool, func1)
          print('custom thread pool', future, type(future))
          ret = await future
          print(ret)

      # 3. Run in a custom process pool:
      with concurrent.futures.ProcessPoolExecutor(max_workers=5) as pool:
          future = loop.run_in_executor(
              pool, func1)
          print('custom process pool', future, type(future))
          ret = await future
          print(ret)

  asyncio.run(main())

  ### 输出结果
  # custom thread pool <Future pending cb=[_chain_future.<locals>._call_check_cancel() at path]> <class '_asyncio.Future'>
  # over
  # custom process pool <Future pending cb=[_chain_future.<locals>._call_check_cancel() at path]> <class '_asyncio.Future'>
  # over
  ```

  > 注：windows 环境下，进程池执行也许会出现异常，但 linux 下运行正常

#### 3.6.2 混用示例

写一个同步 `request` 变异步的例子

- 示例:

  ```python
  import asyncio
  import time
  import concurrent.futures
  import requests


  async def download(url: str):
      print("start download:", url)
      loop = asyncio.get_running_loop()

      # requests模块默认不支持异步操作，此处使用线程池改为协程Future
      data = await loop.run_in_executor(None, requests.get, url)

      file_name = data.url.split("/")[-1]
      with open(file_name, "wb") as f:
          f.write(data.content)
      await asyncio.sleep(2)
      return f"end download: {file_name}"


  async def main():
      start = time.time()
      url_list = [
          "http://www.igarashi.fun:8999/img/Django.png",
          "http://www.igarashi.fun:8999/img/antd.png",
          "http://www.igarashi.fun:8999/img/etcd.png",
      ]

      # 创建多个协程
      tasks = [asyncio.create_task(download(url)) for url in url_list]

      async def except_foo():
          raise RuntimeError

      tasks.append(asyncio.create_task(except_foo()))

      ret = await asyncio.gather(*tasks, return_exceptions=True)
      print("ret", ret)

      print(time.time() - start)


  asyncio.run(main())

  ### 输出结果
  # start download: http://www.igarashi.fun:8999/img/Django.png
  # start download: http://www.igarashi.fun:8999/img/antd.png
  # start download: http://www.igarashi.fun:8999/img/etcd.png
  # ret ['end download: Django.png', 'end download: antd.png', 'end download: etcd.png', RuntimeError()]
  # 2.351871967315674
  ```

<Alert type="info">如果 `gather()` _被取消_，所有被提交 (尚未完成) 的可等待对象也会 _被取消_</Alert>

## 5. 异步迭代器

### 5.1 异步迭代器

**回顾**：什么是 [迭代器](/back_end/python/base/基本概念/迭代器)

##### **什么是异步迭代器**

- 实现了`__aiter__()` 和 `__anext__()` 方法的对象
  - `__aiter__()` 必须返回一个 _异步迭代器_ 对象
  - `__anext__()` 必须返回一个 [_awaitable_](/back_end/python/base/资源调度/协程#可等待对象awaitable) 对象输出迭代器下一结果的值，迭代结束会引发 `StopAsyncIteration` 异常
- `async_for` 会处理异步迭代器的 `__anext__()` 方法所返回的可等待对象，直到其引发一个 `StopAsyncIteration` 异常

##### **什么是异步可迭代对象**

- 可在 `async_for` 语句中被使用的对象
- 必须通过它的 `__aiter__()` 方法返回一个 `asynchronous iterator`

## 6. 异步上下文管理器

### 6.1 async with

异步上下文管理器指的是在 enter 和 exit 方法处能够暂停执行的上下文管理器。
为了实现这样的功能，需要加入两个新的方法：**aenter** 和**aexit**。这两个方法都要返回一个 awaitable 类型的值。

异步上下文管理器的一种使用方法是:

    class AsyncContextManager:
        async def __aenter__(self):
            await log('entering context')

        async def __aexit__(self, exc_type, exc, tb):
            await log('exiting context')

【新语法】：
异步上下文管理器使用一种新的语法:

    async with EXPR as VAR:
        BLOCK

这段代码在语义上等同于：

    mgr = (EXPR)
    aexit = type(mgr).__aexit__
    aenter = type(mgr).__aenter__(mgr)
    exc = True

    VAR = await aenter
    try:
        BLOCK
    except:
        if not await aexit(mgr, *sys.exc_info()):
            raise
    else:
        await aexit(mgr, None, None, None)

- 和常规的 with 表达式一样，可以在一个 async with 表达式中指定多个上下文管理器。
- 如果向 async with 表达式传入的上下文管理器中没有**aenter** 和**aexit**方法，这将引起一个错误 。
- 如果在 async def 函数外面使用 async with，将引起一个 SyntaxError（语法错误）。

例子：
使用 async with 能够很容易地实现一个数据库事务管理器。

    async def commit(session, data):
        ...

        async with session.transaction():
            ...
            await session.update(data)
            ...

需要使用锁的代码也很简单：

    async with lock:
        ...

而不是：

    with (yield from lock):
        ...

#### 协程嵌套 2

将多个协程封装到一个主协程中（更详细见 aiohttp）

    import asyncio,aiohttp

    async def fetch_async(url):
        print(url)
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as resp:
                print(resp.status)
                print(await resp.text())

    tasks = [fetch_async('http://www.baidu.com/'), fetch_async('http://www.cnblogs.com/ssyfj/')]

    event_loop = asyncio.get_event_loop()
    results = event_loop.run_until_complete(asyncio.gather(*tasks))
    event_loop.close()

关于 aiohttp 模块的协程嵌套，嵌套更加明显

### 6. 异常处理

**回顾**：[异常与捕获]()

<Alert type="error"> 异步的异常若捕获不当，会造成难以发现的 **bug！！**</Alert>

> **背景描述：**
>
> - 协程可通过 `asyncio.Task` 作为独立单元启动，其中的 `cancel()` 可以使任务中途强制停止。
> - 类似的异步生成器也可以通过 `aclose()` 强制结束。
> - 当一个 `任务` 或 `异步生成器` 被外部强制终止的时候，会从当前的 `await` 或 `yield` 语句抛出 `asyncio.CancelledError`，接下来从这个错误说起...

**asyncio.CancelledError**

<Alert type="queen">该错误基类已在<Badge>py3.8</Badge> 中更改为 `BaseException`</Alert>

> 取消 `asyncio` 任务时，可以捕获此异常以执行自定义操作。

在<Badge>py3.8</Badge> 以下的版本，和 `concurrent.futures.CancelledError` 一致，基类为 `Exception`
