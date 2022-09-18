---
title: psutil
order: 2
---

# psutil

日常处理运维相关，psutil = process and system utilities 不仅可以通过一两行代码实现系统监控，还可以跨平台使用

https://psutil.readthedocs.io/

## 安装 psutil

    pip install psutil

    import psutil

## 一、CPU 相关：

### 1. 获取 CPU 信息：

#### CPU 逻辑数量

    psutil.cpu_count()      # 4则是4核非超线程

#### CPU 物理核心

    psutil.cpu_count(logical=False)     # 2说明是双核超线程

## 二、内存相关：

### 1.获取内存信息：

#### 获取物理内存信息

    psutil.virtual_memory()

    svmem(total=8589934592, available=2866520064, percent=66.6, used=7201386496, free=216178688, active=3342192640, inactive=2650341376, wired=1208852480)

#### 获取交换内存信息

    psutil.swap_memory()

    sswap(total=1073741824, used=150732800, free=923009024, percent=14.0, sin=10705981440, sout=40353792)

## 三、磁盘相关：

### 1.获取磁盘信息

可以通过 psutil 获取磁盘分区、磁盘使用率和磁盘 IO 信息：

#### 磁盘分区信息

    psutil.disk_partitions()

#### 磁盘使用情况

    psutil.disk_usage('/')

#### 磁盘 IO

    psutil.disk_io_counters()

## 四、网络相关：

psutil 可以获取网络接口和网络连接信息：

### 1.获取网络信息

#### 获取网络读写字节／包的个数

    psutil.net_io_counters()

#### 获取网络接口信息

    psutil.net_if_addrs()

#### 获取网络接口状态

    psutil.net_if_stats()

#### 获取当前网络连接信息

    psutil.net_connections()

【注意】：

当提示得到一个 AccessDenied 错误，原因是 psutil 获取信息也是要走系统接口，而获取网络连接信息需要 root 权限，这种情况下，
可以退出 Python 交互环境，用 sudo 重新启动：

## 五、进程相关：

通过 psutil 可以获取到所有进程的详细信息：

### 1.获取进程信息

#### 获取所有进程 ID

    psutil.pids()

#### 获取指定进程信息：

    p = psutil.Process(3776) # 获取指定进程ID=3776，其实就是当前Python交互环境

    p.name() # 进程名称

    p.exe() # 进程exe路径

    p.cwd() # 进程工作目录

    p.cmdline() # 进程启动的命令行

    p.ppid() # 父进程ID

    p.parent() # 父进程

    p.children() # 子进程列表

    p.status() # 进程状态

    p.username() # 进程用户名

    p.create_time() # 进程创建时间

    p.terminal() # 进程终端

    p.cpu_times() # 进程使用的CPU时间

    p.memory_info() # 进程使用的内存

    p.open_files() # 进程打开的文件

    p.connections() # 进程相关网络连接

    p.num_threads() # 进程的线程数量

    p.threads() # 所有线程信息

    p.environ() # 进程环境变量

    p.terminate() # 结束进程

【注意】：

和获取网络连接类似，获取一个 root 用户的进程需要 root 权限，启动 Python 交互环境或者.py 文件时，需要 sudo 权限。

## 六、使用 Popen 类：

### popen 类可以获取用户启动的应用程序进程信息。

    p = putil.Popen(["/usr/bin/python","-c","print('Hello')"],stdout=subprocess.PIPE)
    p.name()
    p.username() # 创建进程的用户
    p.communicate() # ('hellon',None)
    p.cpu_times() # 得到进程运行的CPU时间

## 、测试

psutil 还提供了一个 test()函数，可以模拟出 ps 命令的效果：

### 1. test()函数

     psutil.test()

