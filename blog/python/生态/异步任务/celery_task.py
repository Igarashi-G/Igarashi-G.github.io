# __author:  Igarashi
# date:  2018/5/6

from celery import Celery
import time

app = Celery("tasks",  # 给app起的名字
             broker="redis://:igarashi@192.168.80.133",  # 写法如此
             backend="redis://:igarashi@192.168.80.133",  # 这个结果可以用不同的接收，redis、rabbitmq都可以，但要配置
             )  # worker，负责执行任务，要提前定义好任务


@app.task
def add(x, y):  # 即定义好worker可以执行的一个任务
    print("running ...", x, y)
    return x + y


@app.task  # 可以利用app写n个任务
def cmd(cmd_str):
    time.sleep(10)
    print("running cmd", cmd_str)
    return time.time()
