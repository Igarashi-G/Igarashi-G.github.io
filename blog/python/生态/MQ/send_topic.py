# __author:  Igarashi
# date:  2018/4/23

import time, pika, sys

credentials = pika.PlainCredentials("fuuka", "123456")

connection = pika.BlockingConnection(pika.ConnectionParameters("192.168.80.133", credentials=credentials))

channel = connection.channel()

# channel.queue_declare("pubandsub")
channel.exchange_declare(exchange="topic_logs",
                         exchange_type="topic")

routing_key = sys.argv[1] if len(sys.argv) > 1 else 'anonymous.info'  # 严重级别、程度 ,recv端根据级别来接收
message = "".join(sys.argv[2:]) or "info: direct_logs"

channel.basic_publish(exchange="topic_logs",
                      routing_key=routing_key,
                      body=message,
                      # properties=pika.BasicProperties(
                      #     delivery_mode=2
                      # )
                      )

print("[x] Sent: %s %s " % (routing_key, message))

channel.close()

connection.close()

