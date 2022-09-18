# __author:  Igarashi
# date:  2018/4/23

import time, pika, sys

credentials = pika.PlainCredentials("fuuka", "123456")

connection = pika.BlockingConnection(pika.ConnectionParameters("192.168.80.133", credentials=credentials))

channel = connection.channel()

# channel.queue_declare("pubandsub")
channel.exchange_declare(exchange="pubandsub",
                         exchange_type="fanout")

message = "".join(sys.argv[1:]) or "info: pub and sub"
channel.basic_publish(exchange="pubandsub",
                      routing_key="",
                      body=message,
                      # properties=pika.BasicProperties(
                      #     delivery_mode=2
                      # )
                      )

channel.close()

connection.close()
