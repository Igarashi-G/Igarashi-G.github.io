# __author:  Igarashi
# date:  2018/4/23

import pika
import time

credentials = pika.PlainCredentials("fuuka", "123456")

connection = pika.BlockingConnection(
    pika.ConnectionParameters("192.168.80.133", credentials=credentials))  # 连远程

channel = connection.channel()

channel.queue_declare(queue='rpc_queue')  # 声明了，因此要求server端先启动。


def fib(n):
    if n == 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fib(n - 1) + fib(n - 2)


def on_request(ch, method, props, body):
    n = int(body)

    print(" [.] fib(%s)" % n)
    response = fib(n)  # 计算结果

    ch.basic_publish(exchange='',  # 此时和之前不同，因为是双向队列，server端要返回结果给client端指定的队列
                     routing_key=props.reply_to,  # 拿到指定的随机队列，即随机q
                     properties=pika.BasicProperties(
                         correlation_id=props.correlation_id
                     ),
                     body=str(response))

    ch.basic_ack(delivery_tag=method.delivery_tag)


channel.basic_qos(prefetch_count=1)  # 公平分发
channel.basic_consume(on_request, queue='rpc_queue')

print(" [x] Awaiting RPC requests")
channel.start_consuming()
