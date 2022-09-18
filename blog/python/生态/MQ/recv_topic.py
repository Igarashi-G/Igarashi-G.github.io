# __author:  Igarashi
# date:  2018/4/23

import time, pika, sys

credentials = pika.PlainCredentials("fuuka", "123456")

connection = pika.BlockingConnection(pika.ConnectionParameters("192.168.80.133", credentials=credentials))

channel = connection.channel()

channel.exchange_declare(exchange="topic_logs", exchange_type="topic")  # 与之前相同，若没有启动则先定义一个

result = channel.queue_declare(exclusive=True)  # 消费者声明队列信息，若没有名字则让rabbitmq自动帮其分配一个名字，之后在队列中消除

queue_name = result.method.queue

severities = sys.argv[1:]  # 拿到的是一个列表，跟几个level就绑定几个severities
if not severities:
    sys.stderr.write("Usage:%s [info] [warning] [error]\n" % sys.argv[0])
    sys.exit(1)

for severity in severities:  # 循环绑定，有几个绑定几个
    channel.queue_bind(exchange="topic_logs",
                       queue=queue_name,
                       routing_key=severity)  # 之后它就会监听，所有发到绑定的info、error...的就会被监听

print("[*] Waiting for logs .To exit press CTRL+C")


def callback(ch, method, properties, body):
    print("[x] %s sub is start " % body)
    time.sleep(10)
    print("[x] sub msg done")
    channel.basic_qos(prefetch_count=1)
    ch.basic_ack(delivery_tag=method.delivery_tag)


channel.basic_consume(callback,
                      queue=queue_name,
                      # no_ack=True注释这里
                      )

channel.start_consuming()
