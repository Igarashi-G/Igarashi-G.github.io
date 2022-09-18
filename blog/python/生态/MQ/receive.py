# __author:  Igarashi
# date:  2018/4/22

import pika

credentials = pika.PlainCredentials('fuuka', '123456')

connection = pika.BlockingConnection(pika.ConnectionParameters(
    '192.168.80.133', credentials=credentials))
channel = connection.channel()

# You may ask why we declare the queue again ‒ we have already declared it in our previous code.
# We could avoid that if we were sure that the queue already exists. For example if send.py program
# was run before. But we're not yet sure which program to run first. In such cases it's a.txt good
# practice to repeat declaring the queue in both programs.
channel.queue_declare(queue='hello')


def callback(ch, method, properties, body):
    print(" [x] Received %r" % body, ch, method, properties)


# callback一收到消息，调用上面的callback方法
channel.basic_consume(callback,
                      queue='hello',
                      no_ack=True)

print(' [*] Waiting for messages. To exit press CTRL+C')
channel.start_consuming()
