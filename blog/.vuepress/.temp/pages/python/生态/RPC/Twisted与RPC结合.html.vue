<template><div><h1 id="twisted-框架" tabindex="-1"><a class="header-anchor" href="#twisted-框架" aria-hidden="true">#</a> Twisted 框架</h1>
<p>Twisted 是用 Python 实现的基于事件驱动的网络引擎框架，是 python 中一个强大的异步 IO 库。</p>
<h2 id="一、安装" tabindex="-1"><a class="header-anchor" href="#一、安装" aria-hidden="true">#</a> 一、安装：</h2>
<pre><code>pip3 install twisted    # window 下会安装失败
</code></pre>
<p>win 下转到该网站下载：</p>
<pre><code>https://www.lfd.uci.edu/~gohlke/pythonlibs/#twisted

Twisted‑20.3.0‑cp38‑cp38‑win_amd64.whl  # 选择该文件，cp38 代表python3.8  amd64  表示电脑为64位的

Twisted-20.3.0-cp38-cp38-win32.whl  # 选择该文件，cp38 代表python3.8  win32  表示电脑为windows 32位的

然后执行 pip install 目标目录+目标文件即可
</code></pre>
<h2 id="二、核心概念" tabindex="-1"><a class="header-anchor" href="#二、核心概念" aria-hidden="true">#</a> 二、核心概念</h2>
<p>理解 twisted 的一个前提是弄清楚 twisted 中几个核心的概念: reactor, Protocl, ProtocolFactory, Deffered</p>
<h3 id="_1-reactor" tabindex="-1"><a class="header-anchor" href="#_1-reactor" aria-hidden="true">#</a> 1.reactor</h3>
<p>reactor 是 twisted 异步框架中的核心组件，是一个基于 select，poll 或 epoll 的事件循环，其监听 socket 的状态，当 socket 状态有变化时
（有新的连接请求，或接受到数据等）时，调用相应的组件来进行处理。</p>
<p>twisted.internet.reactor</p>
<pre><code>outer Code  ————————&gt;  Twisted Code ——————————
                   ReactorCode                |
          &lt;——————————  callback ______________|
</code></pre>
<p>reactor loop：不断的循环扫描 socket 列表中监听对象的状态，当有特定事件发生时（socket 状态变化）调用回调函数 callback，来处理事件，
这时候执行权限交给回调函数，当我们的代码处理完事件后，将执行权返回给 reactor，继续进行循环监听。</p>
<p>（1） reactor 监听其 socket 的状态，当有连接请求时，reactor 调用 Factory 来设置相关配置（见下）</p>
<h3 id="_2-factory" tabindex="-1"><a class="header-anchor" href="#_2-factory" aria-hidden="true">#</a> 2.Factory</h3>
<p>主要用来创建 protocol，也可以定义其他操作,Factory 设置持久的，多个 socket 可共享的通用配置。</p>
<p>twisted.internet.protocol.Factory</p>
<ul>
<li>
<p>属性 protocol ：指向需要创建的 Protocol 类</p>
</li>
<li>
<p>buildProtocol()：创建了 Protocol 实例</p>
</li>
<li>
<p>startFactory()和 stopFactory()相当于钩子函数，在 factory 和端口连接和断开时调用。</p>
</li>
</ul>
<p>在实际应用时，一般选择继承 Factory 的子类，并实现相应的方法，如 ClientFactory，SeverFactory。</p>
<p>继承 Factory 类，创建 protocol 实例，有两种方式，一是设置其属性 protocol，不覆盖 buildProtocol()方法；二是不设置属性 protocol，
覆盖 buildProtocol()方法，在方法内部创建 protocol 实例，并返回。</p>
<h4 id="设置-protocol-属性" tabindex="-1"><a class="header-anchor" href="#设置-protocol-属性" aria-hidden="true">#</a> 设置 protocol 属性</h4>
<pre><code>from twisted.internet.protocol import Factory, Protocol
from twisted.internet.endpoints import TCP4ServerEndpoint
from twisted.internet import reactor

class QOTD(Protocol):

    def connectionMade(self):
        # self.factory was set by the factory's default buildProtocol:
        self.transport.write(self.factory.quote + '\r\n')
        self.transport.loseConnection()


class QOTDFactory(Factory):

    # This will be used by the default buildProtocol to create new protocols:
    protocol = QOTD

    def __init__(self, quote=None):
        self.quote = quote or 'An apple a day keeps the doctor away'

endpoint = TCP4ServerEndpoint(reactor, 8007)
endpoint.listen(QOTDFactory(&quot;configurable quote&quot;))
reactor.run()
</code></pre>
<h4 id="实现-buildprotocol-方法" tabindex="-1"><a class="header-anchor" href="#实现-buildprotocol-方法" aria-hidden="true">#</a> 实现 buildProtocol 方法</h4>
<pre><code>from twisted.internet.protocol import Factory
from twisted.internet.endpoints import TCP4ServerEndpoint
from twisted.internet import reactor

class QOTD(Protocol):

    def connectionMade(self):
        # self.factory was set by the factory's default buildProtocol:
        self.transport.write(self.factory.quote + '\r\n')
        self.transport.loseConnection()

class QOTDFactory(Factory):
    def buildProtocol(self, addr):
        return QOTD()

# 8007 is the port you want to run under. Choose something &gt;1024
endpoint = TCP4ServerEndpoint(reactor, 8007)
endpoint.listen(QOTDFactory())
reactor.run()
</code></pre>
<h4 id="startfactory-和-stopfactory-示例" tabindex="-1"><a class="header-anchor" href="#startfactory-和-stopfactory-示例" aria-hidden="true">#</a> startFactory()和 stopFactory()示例</h4>
<pre><code>from twisted.internet.protocol import Factory
from twisted.protocols.basic import LineReceiver

#LineReceiver为一种protocol
class LoggingProtocol(LineReceiver):

    def lineReceived(self, line):
        self.factory.fp.write(line + '\n')


class LogfileFactory(Factory):

    protocol = LoggingProtocol

    def __init__(self, fileName):
        self.file = fileName

    def startFactory(self):
        self.fp = open(self.file, 'a')

    def stopFactory(self):
        self.fp.close()
</code></pre>
<p>（2）当有一个 socket 连接请求时，reactor 调用 Factory 来设置相关配置，Factory 创建一个 Protocol 实例（buildProtocol），并将该实例的
factory 属性指向自己，请求断开时，protocol 即被销毁。</p>
<h3 id="_3-protocol" tabindex="-1"><a class="header-anchor" href="#_3-protocol" aria-hidden="true">#</a> 3.Protocol</h3>
<p>Protocol 继承了 BaseProtocol，主要用来处理连接建立和断开时的操作，以及数据的接受和发送操作</p>
<p>twisted.internet.protocol.Protocol</p>
<p>BaseProtocol 有两个属性(connected 和 transport)，从其 makeConnection()中可以看到，每创建一个连接，conencted 值加一，为 transport 赋值，并调用钩子函数 connectionMade().</p>
<p>Protocol 有两个钩子函数 dataReceived()和 connectionLost()， 分别在接受到客户端数据和断开连接时调用，自定义相应的代码来处理数据和断开连接时的清理工作。</p>
<p>（3）Protocol 实例的 Transport 属性会处理客户端 socket 的请求，并执行相应的回调函数。</p>
<p>（4）假如 reactor 监听了四个 socket，一个是服务端 listening socket（其绑定的 ip 和 port），和三个客户端 socket，那么每个客户端 socket 都有
自己的 Protocol 来处理相应的数据交互请求，这些 Protocol 都由 Factory 创建。（也可以有多个 Factory，每个 Factory 创建多个 Protocol）</p>
</div></template>


