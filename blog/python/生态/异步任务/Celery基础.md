---
title: Celery基础
order: 2
---

# Celery Task

Celery 是一个简单、灵活且可靠的，处理大量消息的分布式系统，

- 专注于实时处理的异步任务队列
- 支持任务调度等定时任务

## 一、celery 概述：

### 1.celery 组成：

Celery 的架构由三部分组成，消息中间件（message broker），任务执行单元（worker）和任务执行结果存储（task result store）组成。

- 消息中间件
  - Celery 本身不提供消息服务，但是可以方便的和第三方提供的消息中间件集成。包括，RabbitMQ, Redis 等等
- 任务执行单元
  - Worker 是 Celery 提供的任务执行的单元，worker 并发的运行在分布式的系统节点中。
- 任务结果存储
  - Task result store 用来存储 Worker 执行的任务的结果，Celery 支持以不同方式存储任务的结果，包括 AMQP、redis、rbmq 等

【另外】： Celery 还支持不同的并发和序列化的手段

并发：Prefork, Eventlet, gevent, threads/single threaded
序列化：pickle, json, yaml, msgpack. zlib, bzip2 compression， Cryptographic message signing 等等

### 2.使用场景：

celery 是一个强大的 分布式任务队列的异步处理框架，它可以让任务的执行完全脱离主程序，甚至可以被分配到其他主机上运行。我们通常使用它来实现异步任务（async task）和定时任务（crontab)。

- 异步任务：将耗时操作任务提交给 Celery 去异步执行，比如发送短信/邮件、消息推送、音视频处理等等

- 定时任务：定时执行某件事情，比如每天数据统计

### 3. 安装：

    pip install -U Celery   or  sudo easy_install Celery

### 4.执行流程：

    user -> 初始化celery 定好borker（消息中间件，队列/redis）、定好 backend（存储位置） -> 执行任务（celery执行并将结果写入中间件）

## 二、celery 创建任务：

### 1.创建简单任务

    import celery
    import time

    backend = 'redis://172.16.128.29:6379/0'
    broker = 'redis://172.16.128.29:6379/1'
    cel = celery.Celery('test', broker=broker, backend=backend)

    @cel.task
    def send_email(name):
        print("向%s发送邮件..." % name)
        time.sleep(1)
        print("向%s发送邮件完成" % name)
        return "ok"

### 2. 通过引入单独配置文件，创建任务

将上文简单任务部分改为如下：

    cel = celery.Celery('test')
    cel.config_from_object('celery_test.celery_config')

将配置文件 celery_config.py 引入，路径应该为项目根目录后的绝对路径

#### 配置项：

celery 4.0 以上支持小写的简化配置项：（通常如下）

    broker_url = "redis://172.16.128.29:6379/0"
    result_backend = "redis://172.16.128.29:6379/1"

    timezone = 'Asia/Shanghai'  # 指定时区，默认是 UTC

    task_serializer = 'json'  # 任务序列化和反序列化使用pickle方案
    result_serializer = 'json'  # 读取任务结果一般性能要求不高，所以使用了可读性更好的JSON
    result_expires = 60 * 60 * 24  # 任务过期时间，不建议直接写86400，应该让这样的magic数字表述更明显
    accept_content = ['json']  # 指定接受的内容类型

    imoprt = (
        # 指定导入的任务模块
        'celery_test.celery_task'
    )

## 三、celery 启动任务

### 1. 直接终端执行命令：

    celery -A tasks worker --loglevel=info
    or
    celery worker -A tasks -l info

执行以上命令，将任务启动

【注意】：

windows 下 celery 若命令行执行报错如下：

    ERROR/MainProcess] Task handler raised error: ValueError('not enough values to unpack (expected 3, got 0)')

需要安装 eventlet 才行（原因不明）

    pip3 install eventlet

然后运行命令需携带参数 -P eventlet：

    celery worker -A celery_task -l info -P eventlet

### 2.写脚本执行：

建立一个 task_worker.py 文件来启动任务

    import sys
    import os
    from celery_test.celery_task import cel

    root_path = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    sys.path.insert(0, os.path.dirname(__file__))

    sys.argv.extend(["-l", "INFO", "-P", "solo"])
    cel.worker_main()

- 需要配置对应的正确路径，来引入相关的 celery_app

## 四、创建 celery 生产者

    from celery_task import send_email
    result = send_email.delay("yuan")
    print(result.id)
    result2 = send_email.delay("alex")
    print(result2.id)　

## 五、获取任务执行结果

### 1.通过 AsyncResult 进行简单判断：

    from celery.result import AsyncResult
    from celery_task import cel

    async_result=AsyncResult(id="c6ddd5b7-a662-4f0e-93d4-ab69ec2aea5d", app=cel)

    if async_result.successful():
        result = async_result.get()
        print(result)
        # result.forget() # 将结果删除
    elif async_result.failed():
        print('执行失败')
    elif async_result.status == 'PENDING':
        print('任务等待中被执行')
    elif async_result.status == 'RETRY':
        print('任务异常后正在重试')
    elif async_result.status == 'STARTED':
        print('任务已经开始被执行')
