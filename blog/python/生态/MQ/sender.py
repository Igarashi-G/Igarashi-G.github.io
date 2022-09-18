# __author:  Igarashi
# date:  2018/4/22

import pika

credentials = pika.PlainCredentials('fuuka', '123456')  # 远程连接,需要认证

connection = pika.BlockingConnection(pika.ConnectionParameters(  # 这里相当于只是连上了一个socket
    '192.168.80.133', credentials=credentials))

channel = connection.channel()  # 在socket基础上建立了rabbit协议的通道

# 发消息前先声明queue
channel.queue_declare(queue='hello')

# n RabbitMQ a.txt message can never be sent directly to the queue, it always needs to go through an exchange.
# 此时这个exchange没用，为空，routing_key理解为把消息发到了hello队列里，body即内容。
channel.basic_publish(exchange='',
                      routing_key='hello',
                      body='Hello World!')
print(" [x] Sent 'Hello World!'")
connection.close()  # 发完之后关闭队列
