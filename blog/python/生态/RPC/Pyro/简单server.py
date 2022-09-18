import Pyro5.api
from xmlrpc.server import SimpleXMLRPCServer

# 最简单的通信
# @Pyro5.api.expose
# class GreetingMaker(object):
#     def get_fortune(self, name):
#         return f"Hello, {name}. Here is your fortune message: \n Behold the warranty -- the bold print giveth"
#
#
# daemon = Pyro5.api.Daemon()
# uri = daemon.register(GreetingMaker)
#
# print("Ready. Object uri = ", uri)
# daemon.requestLoop()

@Pyro5.api.expose
class GreetingMaker(object):
    def get_fortune(self, name, age):
        return f"Hello, {name}. {age} Here is your fortune message: Tomorrow's lucky number is 12345678."


daemon = Pyro5.api.Daemon()
ns = Pyro5.api.locate_ns()  # 找名称服务器
uri = daemon.register(GreetingMaker)
ns.register("example.greeting", uri)

print("Ready.")
daemon.requestLoop()
