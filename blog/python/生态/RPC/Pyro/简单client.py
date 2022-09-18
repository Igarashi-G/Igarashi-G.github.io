import Pyro5.api

# 最简单的通信
# uri = input("What is the Pyro uri of the greeting object?").strip()  # 这里输入复制的api
# name = input("What is your name?").strip()
#
# greeting_maker = Pyro5.api.Proxy(uri)
# print(greeting_maker.get_fortune(name))

name = input("input your name").strip()

greeting_maker = Pyro5.api.Proxy("PYRONAME:example.greeting")
print(greeting_maker.get_fortune(name, "18"))
