# __author:  Igarashi
# date:  2018/4/23

import pika
import uuid


class FibonacciRpcClient(object):
    def __init__(self):  # 做了连接
        credentials = pika.PlainCredentials("fuuka", "123456")

        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters("192.168.80.133", credentials=credentials))  # 连远程

        self.channel = self.connection.channel()

        result = self.channel.queue_declare(exclusive=True)
        self.callback_queue = result.method.queue  # 声明了一个callback_q随机变量

        self.channel.basic_consume(self.on_response, no_ack=True,
                                   queue=self.callback_queue)  # 这里是准备接服务端返回结果，第一个参回调，从刚刚生成的随机q接

    def on_response(self, ch, method, props, body):
        if self.corr_id == props.correlation_id:  # 此处回调判断，若当前id和服务器返回id一致，则赋值body为斐波那契结果
            self.response = body

    def call(self, n):
        self.response = None  # 在此处定义
        self.corr_id = str(uuid.uuid4())  # 唯一标识符
        self.channel.basic_publish(exchange='',
                                   routing_key='rpc_queue',
                                   properties=pika.BasicProperties(
                                       reply_to=self.callback_queue,  # 让server端发送结果到随机生成的队列
                                       correlation_id=self.corr_id,  # 在属性中定义，把唯一标识符也发送过去
                                   ),
                                   body=str(n))
        while self.response is None:  # 发送过去之后即开始收结果，但start_consuming不太对，它会一直阻塞。因此应该是异步的用以下死循环，
            # 检查队列里有没有消息，但不会阻塞。
            self.connection.process_data_events()
        return int(self.response)


fibonacci_rpc = FibonacciRpcClient()

print(" [x] Requesting fib(30)")
response = fibonacci_rpc.call(30)  # 客户端发一个值过去，拿到30位返回的斐波那契数
print(" [.] Got %r" % response)
