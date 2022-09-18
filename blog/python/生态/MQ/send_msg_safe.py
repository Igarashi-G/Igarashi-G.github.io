# __author:  Igarashi
# date:  2018/4/22

import pika, time

credentials = pika.PlainCredentials("fuuka", "123456")

connection = pika.BlockingConnection(pika.ConnectionParameters("192.168.80.133", credentials=credentials))

channel = connection.channel()

channel.queue_declare(queue="baozi", durable=True)

import sys

message = "".join(sys.argv[1:]) or "Bao Zi %s" % time.time()  # 把这个脚本收到的参数合并起来，赋值给message、即脚本可以跟参数作为消息或发baozi

channel.basic_publish(exchange="",
                      routing_key="baozi",
                      body=message,
                      properties=pika.BasicProperties(
                          delivery_mode=2,  # make message persistent使消息持久化
                      )
                      )

print("包子加入队列")

connection.close()
