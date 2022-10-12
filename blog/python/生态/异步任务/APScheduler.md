---
title: APScheduler
order: 1
group:
  title: 定时任务
  order: 32
---

# APScheduler

http://apscheduler.readthedocs.io/en/latest/

## 一、APScheduler 简介：

APScheduler 基于 Quartz （开源作业调度框架）的一个 Python 定时任务框架，实现了 Quartz 的所有功能，使用起来十分方便。提供了基于日期、
固定时间间隔以及 crontab 类型的任务，并且可以持久化任务。基于这些功能，我们可以很方便的实现一个 python 定时任务系统。

    除此之外，建立高效能的定时任务可参考celery

## 二、安装&示例：

    pip install apscheduler

注意：
若出现由于安装问题导致的出错，先确认是否安装版本正确，若安装和配置文件中的版本一致，运行 pip install setuptools --upgrade
之后再运行试试。

    例：
    from apscheduler.schedulers.blocking import BlockingScheduler   # 导入，调度程序是您的进程中唯一运行的时候使用
    import datetime


    def my_job():
        print(datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'), "hello world")


    scheduler = BlockingScheduler()     # 先实例化一个阻塞调度程序对象
    scheduler.add_job(func=my_job, trigger='cron', second='*/5')  # 通过 add_job 来添加作业
    scheduler.start()

    上面的例子表示每隔5s执行一次 my_job 函数，输出当前时间信息和"hello world"

    其中BlockingScheduler()实例化的对象 可以通过设置如下的一个字典 指定默认值：（参考文档）
       scheduler = BlockingScheduler({
            'apscheduler.executors.default': {
                'class': 'apscheduler.executors.pool:ThreadPoolExecutor',   # 一个名为'default'的ThreadPoolExecutor线程池
                '装饰_workers': '20'                                         # 其worker值为20
            },
            'apscheduler.timezone': 'Asia/Shanghai'     # Shanghai作为调度程序的时区
        })

## 三、APScheduler 的四种组成部分：

### 1.触发器(trigger)：

包含调度逻辑，每一个作业有它自己的触发器，用于决定接下来哪一个作业会运行。除了他们自己初始配置意外，触发器完全是无状态的。
上面代码中用了 cron，共有 date, interval, cron 可供选择。

- date：表示具体的一次性任务
- interval：表示循环任务
- cron：表示定时任务

可参照文档查看 不同触发器的任务 传入的时间类型

### 2.作业存储(job store)：

存储被调度的作业，默认的作业存储是简单地把作业保存在内存中，其他的作业存储是将作业保存在数据库中。

一个作业的数据保存在持久化作业存储时被序列化，并在加载时被反序列化。调度器不能分享同一个作业存储。

### 3.执行器(executor)：

处理作业的运行，他们通常通过在作业中提交制定的可调用对象到一个线程或者进程池来进行。当作业完成时，执行器将会通知调度器。

### 4.调度器(scheduler)：

是其他的组成部分。你通常在应用只有一个调度器，应用的开发者通常不会直接处理作业存储、调度器和触发器，相反，调度器提供了处理这些的合适
的接口。配置作业存储和执行器可以在调度器中完成，例如添加、修改和移除作业。

[配置调度器的 3 种方式]：
[方式一]：

    from pytz import utc
    from apscheduler.schedulers.background import BackgroundScheduler
    from apscheduler.jobstores.mongodb import MongoDBJobStore
    from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore
    from apscheduler.executors.pool import ThreadPoolExecutor, ProcessPoolExec    utor

    jobstores = {
        'mongo': MongoDBJobStore(),
        'default': SQLAlchemyJobStore(url='sqlite:///jobs.sqlite')
    }
    executors = {
        'default': ThreadPoolExecutor(20),
        'processpool': ProcessPoolExecutor（5）
    }
    job_defaults = {
        'coalesce': False,
        'max_instances': 3
    }
    scheduler = BackgroundScheduler(jobstores=jobstores, executors=executors,    job_defaults=job_defaults, timezone=utc)

[方式二]：

    from apscheduler.schedulers.background import BackgroundScheduler
    scheduler = BackgroundScheduler({
        'apscheduler.jobstores.mongo': {
        'type': 'mongodb'
    },
    'apscheduler.jobstores.default': {
        'type': 'sqlalchemy',
        'url': 'sqlite:///jobs.sqlite'
    },
    'apscheduler.executors.default': {
        'class': 'apscheduler.executors.pool:ThreadPoolExecutor',
        'max_workers': '20'
    },
    'apscheduler.executors.processpool': {
        'type': 'processpool',
        'max_workers': '5'
    },
    'apscheduler.job_defaults.coalesce': 'false',
    'apscheduler.job_defaults.max_instances': '3',
    })

[方式三]：

    init_scheduler_options = {
        "jobstores": {
            "default": MemoryJobStore() # 默认使用内存来存储
        },
        "executors": {
            'default': {'type': 'threadpool', 'max_workers': 20},  # 最大工作线程数20
            'processpool': ProcessPoolExecutor(max_workers=5),  # 最大工作进程数为5
        },
        "job_defaults": {
            'coalesce': False,
            'max_instances': 100
        }
    }
    scheduler = BackgroundScheduler(**init_scheduler_options)

## 四、操作作业

### 1.添加作业：

通常除了示例之外，常用的方式是通过@ .scheduled_job()装饰器装饰 my_job 进行添加作业

        scheduler = BlockingScheduler()

        @scheduler.scheduled_job('interval', seconds=3, args=("循环任务",)) # 注意这里的传参形式为元组，貌似是规定死的
        @scheduler.scheduled_job('cron', second='*/5', args=("定时任务",)) # 这里装饰器可以进行嵌套
        def my_job(x):  # 可以在添加作业时进行传参
            print(datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'), x)

        scheduler.add_job(func=my_job, args=("一次性任务",),
                        next_run_time=datetime.datetime.now() + datetime.timedelta(seconds=2))

        注意：
            1.只有一次性任务的 trigger 可以不用写，源码中判断若trigger is None 则直接定义为'date'类型
            2.如果实现web的异步任务。假设接到一个移动端任务，任务完成后，发送一个推送到移动端，用date类型的trigger完成可以做的很好。

### 2.移除作业：

当要求执行一定阶段任务以后，删除某一个循环任务，其他任务照常进行时考虑使用。

    job = scheduler.add_job(aps_date, 'interval', minutes=2)
    job.remove()    # 若存在两个任务，默认的应该是移除第一个任务，因此不要写在执行体中，写到要移除的函数中更好

    def aps_date():
        job.remove()
        print(datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'), "循环任务执行后移除")

如果有多个任务序列的话可以给每个任务设置 ID 号，可以根据 ID 号选择清除对象，且 remove 放到 start 前才有效

    scheduler.add_job(myfunc, 'interval', minutes=2, id='my_job_id')
    scheduler.remove_job('my_job_id')   # 若没有找到任务id则报错

### 3. 暂停和恢复作业：

和上的删除任务用法基本一致

    job.pause()
    job.resume()
    scheduler.pause_job('interval_task') # 需要id
    scheduler.resume_job('interval_task')

### 4. 获得 job 列表：

获得调度作业的列表，可以使用 get_jobs()来完成，它会返回所有的 job 实例。
则会返回每个 job 的 id（没有设置系统默认）和 name 的列表 如：

    [<Job (id=f9f29b9c3a594e21a7fae10c92e5fcb2 name=my_job)>, <Job (id=23 name=aps_date)>]形式

或者使用 print_jobs()来输出所有格式化的作业列表。如：

    Jobstore default:
        aps_date (trigger: interval[0:00:03], paused) 的形式

也可以利用 get_job(任务 ID)获取指定任务的作业列表
返回类似 aps_date (trigger: interval[0:00:03], pending)的形式

### 5. 关闭调度器：

默认情况下调度器会等待所有正在运行的作业完成后，关闭所有的调度器和作业存储。如果你不想等待，可以将 wait 选项设置为 False。

        scheduler.shutdown()

加入到某个任务触发后可能会触发异常：RuntimeError: cannot join current thread

        scheduler.shutdown(wait=False)

当设置 wait 为 False 时则不会直接触发异常，而是正常关闭。

## 五、日志：

当某个循环执行的脚本出现异常时，需要通过日志进行记录，否则任务依旧不断的执行，控制台不断报错（或在老版本中看不到报错详细）
因此需要日志记录。

    引入logging，参考3.5 中7.logging模块

    scheduler._logger = logging  # 让其日志记录为已添加的日志文件，即可把错误存放到日志中。免的在控制台打印

## 六、异常：

任何代码都可能发生意外，关键是，发生意外了，如何第一时间知道。因此 apscheduler 提供了监听，将事件侦听器附加到调度程序。
部分事件代码：（其他参阅文档）

        EVENT_JOB_MISSED：工作的执行被遗漏了
        EVENT_JOB_ERROR：一项工作在执行期间引发了异常
        EVENT_JOB_EXECUTED：作业已成功执行
        EVENT_SCHEDULER_START：调度程序已启动
        EVENT_SCHEDULER_SHUTDOWN：调度程序已关闭

导入 from apscheduler.events import EVENT_JOB_EXECUTED, EVENT_JOB_ERROR

    def my_listener(event)  # 设置一个监听任务，用于监听是否有任务异常
        if event.exception:
            print("任务出错了！！！")
        else:
            print("任务照常运行...")

    scheduler.add_listener(my_listener, EVENT_JOB_EXECUTED | EVENT_JOB_ERROR)

[注]：
在生产环境中，可以把出错信息换成发送一封邮件或者发送一个短信，这样定时任务出错就可以立马就知道了。
