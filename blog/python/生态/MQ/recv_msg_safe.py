# __author:  Igarashi
# date:  2018/4/22

import time, pika

credentials = pika.PlainCredentials("fuuka", "123456")

connection = pika.BlockingConnection(pika.ConnectionParameters(
    "192.168.80.133", credentials=credentials))

channel = connection.channel()

# channel.queue_declare(queue="baozi") # 为了消息持久不再声明


def callback(ch, method, properties, body):
    print("[x] 接收消息%s" % body)
    time.sleep(20)
    print("[x] 接收完毕！")
    print("method.delivery_tag", method.delivery_tag)

    channel.basic_qos(prefetch_count=1)#消息的公平分发

    ch.basic_ack(delivery_tag=method.delivery_tag)  # delivery_tag rabbitmq自己生成的值，唯一标识符
    # ackownledgement 确认的意思


channel.basic_consume(callback,
                      queue="baozi",
                      # no_ack=True注释这里
                      )

channel.start_consuming()
