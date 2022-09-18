<template><div><h1 id="分布式远程调用-pyro" tabindex="-1"><a class="header-anchor" href="#分布式远程调用-pyro" aria-hidden="true">#</a> 分布式远程调用 PYRO</h1>
<Alert type="error">可惜非异步</Alert><h2 id="一、概述" tabindex="-1"><a class="header-anchor" href="#一、概述" aria-hidden="true">#</a> 一、概述</h2>
<h3 id="_1-是啥" tabindex="-1"><a class="header-anchor" href="#_1-是啥" aria-hidden="true">#</a> 1.是啥</h3>
<p>使对象通过网络以最小的编程工作量，实现只用普通的 Python 方法调用来调 分布式计算机上运行对象的 纯 Python 库</p>
<h3 id="_2-用途" tabindex="-1"><a class="header-anchor" href="#_2-用途" aria-hidden="true">#</a> 2.用途</h3>
<ul>
<li>
<p>分发和集成各种资源或职责：计算（硬件）资源（cpu，存储，打印机），信息资源（数据，特权信息）和业务逻辑（部门，域）。</p>
</li>
<li>
<p>将群集上的可用资源公开给其他计算机。</p>
</li>
<li>
<p>您可以为媒体服务器编写一个简单的遥控器，该遥控器在壁橱中某处的计算机上运行。一个简单的远程控制客户端程序可用于指示媒体服务器播放音乐，切换播放列表等。</p>
</li>
</ul>
<h2 id="二、简单使用" tabindex="-1"><a class="header-anchor" href="#二、简单使用" aria-hidden="true">#</a> 二、简单使用</h2>
<h3 id="_1-简单例子" tabindex="-1"><a class="header-anchor" href="#_1-简单例子" aria-hidden="true">#</a> 1.简单例子：</h3>
<p>下面给出个最简单的通信例子，起一个服务 server 起一个 client，通过输入 一开始设定好的 uri 进行通信</p>
<ul>
<li>
<p>最简单的 server</p>
<p>import Pyro5.api</p>
<p>@Pyro5.api.expose
class GreetingMaker(object):
def get_fortune(self, name):
return f&quot;Hello, {name}. Here is your fortune message: \n Behold the warranty -- the bold print giveth&quot;</p>
<p>daemon = Pyro5.api.Daemon()
uri = daemon.register(GreetingMaker)</p>
<p>print(&quot;Ready. Object uri = &quot;, uri)
daemon.requestLoop()</p>
</li>
</ul>
<p>运行时会打印出当前生成的 uri</p>
<ul>
<li>最简单的 client
import Pyro5.api
uri = input(&quot;What is the Pyro uri of the greeting object?&quot;).strip() # 这里输入复制的 api
name = input(&quot;What is your name?&quot;).strip()
greeting_maker = Pyro5.api.Proxy(uri)
print(greeting_maker.get_fortune(name))</li>
</ul>
<p>输入 server 端生成的 uri 再输入名字就相互通信了</p>
<h3 id="_2-借助于-nameserver-的简单例子" tabindex="-1"><a class="header-anchor" href="#_2-借助于-nameserver-的简单例子" aria-hidden="true">#</a> 2.借助于 nameserver 的简单例子：</h3>
<ul>
<li>
<p>使用第三方 nameserver 的 server</p>
<pre><code>import Pyro5.api

@Pyro5.api.expose
class GreetingMaker(object):
    def get_fortune(self, name):
        return f&quot;Hello, {name}. Here is your fortune message: Tomorrow's lucky number is 12345678.&quot;


daemon = Pyro5.api.Daemon()
ns = Pyro5.api.locate_ns()  # 找名称服务器
uri = daemon.register(GreetingMaker)
ns.register(&quot;example.greeting&quot;, uri)

print(&quot;Ready.&quot;)
daemon.requestLoop()
</code></pre>
<p><a href="%E8%BF%99%E4%BA%9B%E9%83%BD%E6%B2%A1%E5%B1%81%E7%94%A8%EF%BC%8C%E8%AE%B0%E5%BE%97%E8%BF%99%E7%8E%A9%E6%84%8F%E7%A8%B3%E5%AE%9A%E8%B7%91%E4%BA%8610%E5%A4%9A%E5%B9%B4%EF%BC%8C%E8%83%BD%E7%94%A8%EF%BC%8C%E5%A5%BD%E7%94%A8%EF%BC%8C%E7%94%A8%E5%B0%B1%E5%AE%8C%E4%BA%8B%E5%84%BF%E4%BA%86">注意</a>: 需要在一个单独的控制台窗口中运行 python -m Pyro5.nameserver 然后再启动 server</p>
</li>
<li>
<p>使用第三方 nameserver 的 client</p>
<pre><code>import Pyro5.api

name = input(&quot;input your name&quot;).strip()

greeting_maker = Pyro5.api.Proxy(&quot;PYRONAME:example.greeting&quot;)
print(greeting_maker.get_fortune(name))
</code></pre>
<p><a href="%E8%BF%99%E4%BA%9B%E9%83%BD%E6%B2%A1%E5%B1%81%E7%94%A8%EF%BC%8C%E8%AE%B0%E5%BE%97%E8%BF%99%E7%8E%A9%E6%84%8F%E7%A8%B3%E5%AE%9A%E8%B7%91%E4%BA%8610%E5%A4%9A%E5%B9%B4%EF%BC%8C%E8%83%BD%E7%94%A8%EF%BC%8C%E5%A5%BD%E7%94%A8%EF%BC%8C%E7%94%A8%E5%B0%B1%E5%AE%8C%E4%BA%8B%E5%84%BF%E4%BA%86">注意</a>: 此时客户端就无需再输入 uri 了，会根据对象名称（example.greeting）自动“发现”服务器。
如果需要，可以通过键入命令 python -m Pyro5.nsc list（或简单地：pyro5-nsc list）来检查名称服务器中确实知道该名称</p>
<pre><code>python -m Pyro5.nsc list

--------START LIST
Pyro.NameServer --&gt; PYRO:Pyro.NameServer@localhost:9090
    metadata: {'class:Pyro5.nameserver.NameServer'}
example.greeting --&gt; PYRO:obj_198af10aa51f4fa8ab54062e65fad96a@localhost:44687
--------END LIST
</code></pre>
</li>
</ul>
<h3 id="_3-基本概念" tabindex="-1"><a class="header-anchor" href="#_3-基本概念" aria-hidden="true">#</a> 3.基本概念</h3>
<p>1.Proxy：代理</p>
<pre><code>就是影分身，用来替代真正的对象来执行方法的，可以在A机器上调到B机器自身的方法，然后将结果再返回给A机器，所以就无需知道调用的是普通对象还是远程对象，
因为代码是相同的，实现代理的类是：Pyro5.client.Proxy
</code></pre>
<p>2.uri</p>
<pre><code>Pyro识别每个对象的方式（类似于URL指向具体文档），字符串形式：&quot;PYRO:&quot; +对象名 + &quot;@&quot; + 服务器名 + 端口号。(PYRO可小写pyro，协议内部会自动
转大写)，类：Pyro5.core.URI
</code></pre>
<p>3.Pyro object</p>
<pre><code>在Pyro注册的、普通的、编写方式和其他对象一样的、Python对象。可以远程访问，但必须告诉Pyro在处理远程调用时应如何从该类创建实际对象
</code></pre>
<p>4.Pyro daemon (server)守护程序（服务器）</p>
<pre><code>Pyro的一部分，它侦听远程方法调用，并分配到合适的对象，然后将结果返回给调用者。所有Pyro对象都在一个或多个守护程序中注册
</code></pre>
<p>5.Pyro name server（名称服务器）</p>
<pre><code>是为Pyro应用程序提供电话簿的实用程序：可以用它来查电话号码（大概就是找路由）。name 就是远程对象名，数字就是确切的电话号码。
</code></pre>
<p>6.Serialization（序列化）</p>
<pre><code>将对象信息转化为字节流，接收器会将他们反序列化为实际对象。并非所有对象都可以序列化！
</code></pre>
<p>7.Configuration（配置）</p>
<pre><code>Pyro可以通过多种方式进行配置。使用环境变量（以开头PYRO_）或通过在代码中设置配置项,在大多数情况下，默认配置都可以，因此不用操心！
</code></pre>
<h2 id="_4-名称服务器相关使用" tabindex="-1"><a class="header-anchor" href="#_4-名称服务器相关使用" aria-hidden="true">#</a> 4.名称服务器相关使用</h2>
<h3 id="_1-启动名称服务器" tabindex="-1"><a class="header-anchor" href="#_1-启动名称服务器" aria-hidden="true">#</a> 1.启动名称服务器</h3>
<p>执行命令：</p>
<pre><code>python -m Pyro5.nameserver（或简单地：pyro5-ns）
</code></pre>
<p>名称服务器将启动，并显示以下内容：（系统支持的话，可以使用 IPv6）</p>
<pre><code>Not starting broadcast server for IPv6.
NS running on localhost:9090 (::1)
URI = PYRO:Pyro.NameServer@localhost:9090
</code></pre>
<p><a href="%E8%BF%99%E4%BA%9B%E9%83%BD%E6%B2%A1%E5%B1%81%E7%94%A8%EF%BC%8C%E8%AE%B0%E5%BE%97%E8%BF%99%E7%8E%A9%E6%84%8F%E7%A8%B3%E5%AE%9A%E8%B7%91%E4%BA%8610%E5%A4%9A%E5%B9%B4%EF%BC%8C%E8%83%BD%E7%94%A8%EF%BC%8C%E5%A5%BD%E7%94%A8%EF%BC%8C%E7%94%A8%E5%B0%B1%E5%AE%8C%E4%BA%8B%E5%84%BF%E4%BA%86">注意</a>: PYRO:Pyro.NameServer@localhost:9090 就是 Pyro 用来识别每个对象的方式。nameserver 本身也只是个 Pyro 对象！</p>
<h3 id="_2-与名称服务器交互" tabindex="-1"><a class="header-anchor" href="#_2-与名称服务器交互" aria-hidden="true">#</a> 2.与名称服务器交互</h3>
<p>还有一个命令行工具可以和 nameserver 交互 &quot;nsc&quot; (名称服务器控制工具)。可以用它来查看命名服务器中所有已知的注册对象。</p>
<pre><code>python -m Pyro5.nsc list (或是简写: pyro5-nsc list)
</code></pre>
<p>会打印如下内容：</p>
<pre><code>--------START LIST
Pyro.NameServer --&gt; PYRO:Pyro.NameServer@localhost:9090
    metadata: {'class:Pyro5.nameserver.NameServer'}
--------END LIST
</code></pre>
<p>表示当前注册的唯一对象是名称服务器本身（名称服务器本身就是一个 Pyro 对象）与正常的 Pyro 服务器的不同之处在于它多了个广播响应程序，能找到某处是否有
这个服务器</p>
<h3 id="_3-其他-cli" tabindex="-1"><a class="header-anchor" href="#_3-其他-cli" aria-hidden="true">#</a> 3.其他 cli：</h3>
<pre><code>pyro5-ns（名称服务器）
pyro5-nsc（名称服务器客户端工具）
pyro5-echoserver（测试回显服务器）
pyro5-check-config（打印配置）
pyro5-httpgateway（http网关服务器）
具体看文档： https://pyro5.readthedocs.io/en/latest/commandline.html
</code></pre>
<h2 id="_5-客户端-远程调用对象" tabindex="-1"><a class="header-anchor" href="#_5-客户端-远程调用对象" aria-hidden="true">#</a> 5.客户端：远程调用对象</h2>
<p>为了能远程调用服务端接口， 首先你要知道调那个客户端，就是要知道访问地址</p>
<h3 id="一、对象发现" tabindex="-1"><a class="header-anchor" href="#一、对象发现" aria-hidden="true">#</a> 一、对象发现</h3>
<h4 id="_1-直接使用地址" tabindex="-1"><a class="header-anchor" href="#_1-直接使用地址" aria-hidden="true">#</a> 1.直接使用地址：</h4>
<p>即直接声明 URI：</p>
<pre><code>PYRO:someobjectid@servername:9999
</code></pre>
<p>把 URI 给写死，但这种不实际，虽然可以将这个信息写入配置文件，然后从文件中共享这个地址，但是没人这么干</p>
<h4 id="_2-用电话簿-找路由" tabindex="-1"><a class="header-anchor" href="#_2-用电话簿-找路由" aria-hidden="true">#</a> 2.用电话簿（找路由）</h4>
<p>这种就比较灵活，new 个服务器，起个名字存到 Pyro 的名称服务器中，比如名字叫 ybkserver，那么 uri 如下：</p>
<pre><code>import Pyro5.api
nameserver = Pyro5.api.locate_ns()
uri = nameserver.lookup(&quot;ybkserver&quot;)
</code></pre>
<p>那么这个服务器怎么找呢，看下文</p>
<h4 id="_3-用电话簿-meta-标识符并让-pyro-给你找" tabindex="-1"><a class="header-anchor" href="#_3-用电话簿-meta-标识符并让-pyro-给你找" aria-hidden="true">#</a> 3.用电话簿 + meta 标识符并让 Pyro 给你找</h4>
<p>更方便的是在 URI 字符串中使用 meta -protocol 标识符 PYRONAME</p>
<pre><code>uri_string = &quot;PYRONAME:musicserver&quot;
# or Pyro5.api.URI(&quot;PYRONAME:musicserver&quot;) for an URI object 或写成这种形式
</code></pre>
<p>这样 Pyro 就知道应该在 nameservers 中查找 PYRONAME 后面 名字叫 musicserver 的服务器</p>
<h4 id="_4-用-meta-元数据标记进行查找-黄页查找" tabindex="-1"><a class="header-anchor" href="#_4-用-meta-元数据标记进行查找-黄页查找" aria-hidden="true">#</a> 4.用 meta 元数据标记进行查找（黄页查找）</h4>
<p>就是在 3 的基础上，打 tag 加标签</p>
<pre><code>uri_string = &quot;PYROMETA:metatag1,metatag2&quot;
# or Pyro5.api.URI(&quot;PYROMETA:metatag1,metatag2&quot;) for an URI object 或写成这种形式
</code></pre>
<p>每次 Pyro 遇到 PYROMETAuri 时，它将使用名称服务器自动使用给定的元数据标签为您查找随机对象</p>
<h3 id="二、调用方式" tabindex="-1"><a class="header-anchor" href="#二、调用方式" aria-hidden="true">#</a> 二、调用方式</h3>
<p>经过上文第一步找到了 Pyro 对象之后，就要开始这一步的调用了。</p>
<pre><code># 继续我们虚构的音乐服务器示例
# 假设uri包含music server对象的uri.

musicserver = Pyro5.api.Proxy(uri)  # 这一步就是创建代理，即创建一个类的实例
try:
    musicserver.load_playlist(&quot;90s rock&quot;)   # 然后在该对象上调用方法。
    musicserver.play()
    print(&quot;Currently playing:&quot;, musicserver.current_song())
except MediaServerException:
    print(&quot;Couldn't select playlist or start playing&quot;)
</code></pre>
<p>使用 Pyro，对 Pyro 对象的远程方法调用将通过代理，可以将代理视为实际对象，所以可以编写普通的 python 代码来调用远程方法并处理返回值甚至异常</p>
<h3 id="三、访问远程属性" tabindex="-1"><a class="header-anchor" href="#三、访问远程属性" aria-hidden="true">#</a> 三、访问远程属性</h3>
<p>可以直接通过代理访问远程对象的公开属性。</p>
<p>如果您尝试访问未定义或未公开的属性，则代理将报 AttributeError 的提示。</p>
<pre><code>import Pyro5.api

p = Pyro5.api.Proxy(&quot;...&quot;)
velo = p.velocity    # attribute access, no method call
print(&quot;velocity = &quot;, velo)
</code></pre>
<h3 id="四、序列化-自定义序列化" tabindex="-1"><a class="header-anchor" href="#四、序列化-自定义序列化" aria-hidden="true">#</a> 四、序列化/自定义序列化</h3>
<p>有 serpent、json、marshal、msgpack（使用 C 模块扩展，很快啊），可以通过设置 &quot;SERIALIZER&quot; 配置项来选择要使用的串行器</p>
<p>可以覆盖特定代理上的序列化器。</p>
<p>例如:</p>
<pre><code>使用默认的 serpent 序列化程序连接到一台服务器，并使用 json 序列化程序使用另一台代理连接到另一台服务器。
设置所需的序列化器名称proxy._pyroSerializer以覆盖。
</code></pre>
<p>自定义：（最好不）</p>
<p>挂钩是通过几种方法提供的：</p>
<pre><code>yro5.api.register_class_to_dict() 和 Pyro5.api.register_dict_to_class()
</code></pre>
<p>及其注销对象：</p>
<pre><code>Pyro5.api.unregister_class_to_dict() 和 Pyro5.api.unregister_dict_to_class()
</code></pre>
<p>建议尽可能避免使用这些挂钩，否则存在安全隐患，即从不可信来源接收的序列化数据创建任意对象。</p>
<h3 id="五、代理-连接-线程和清理" tabindex="-1"><a class="header-anchor" href="#五、代理-连接-线程和清理" aria-hidden="true">#</a> 五、代理，连接，线程和清理</h3>
<h4 id="_1-规则" tabindex="-1"><a class="header-anchor" href="#_1-规则" aria-hidden="true">#</a> 1.规则</h4>
<ul>
<li>
<p>1.每个单独的代理对象都将具有自己的与守护程序的套接字连接。</p>
</li>
<li>
<p>2.不能在线程之间共享代理对象。一个线程“拥有”一个代理。可以将所有权显式转移到另一个线程。</p>
</li>
<li>
<p>3.通常，守护程序中的每个连接在那里都有其自己的处理线程</p>
</li>
<li>
<p>4.如果事先知道一段时间后不再使用它，请考虑显式清理代理对象。这将释放资源和套接字连接。您以通过两种方式执行此操作：</p>
<ul>
<li>
<p>调用_pyroRelease()代理。</p>
</li>
<li>
<p>在 with 语句中使用代理作为上下文管理器。
with Pyro5.api.Proxy(&quot;.....&quot;) as obj:
obj.method()</p>
<pre><code>  这是创建和使用Pyro代理的首选方法。 这样可以确保当您完成操作或发生错误（在with-block内）时，连接将被释放
</code></pre>
<p><a href="%E8%BF%99%E4%BA%9B%E9%83%BD%E6%B2%A1%E5%B1%81%E7%94%A8%EF%BC%8C%E8%AE%B0%E5%BE%97%E8%BF%99%E7%8E%A9%E6%84%8F%E7%A8%B3%E5%AE%9A%E8%B7%91%E4%BA%8610%E5%A4%9A%E5%B9%B4%EF%BC%8C%E8%83%BD%E7%94%A8%EF%BC%8C%E5%A5%BD%E7%94%A8%EF%BC%8C%E7%94%A8%E5%B0%B1%E5%AE%8C%E4%BA%8B%E5%84%BF%E4%BA%86">注意</a>: 断开连接后 仍然可以使用代理对象：Pyro 会在再次需要它时为您重新连接它。</p>
</li>
</ul>
</li>
<li>
<p>5.创建代理时，不进行任何实际连接。仅在首次使用时或在使用_pyroReconnect()或_pyroBind()方法手动连接代理时才实际连接该代理。</p>
</li>
</ul>
<h3 id="六、单向通话-批量通话" tabindex="-1"><a class="header-anchor" href="#六、单向通话-批量通话" aria-hidden="true">#</a> 六、单向通话 &amp; 批量通话</h3>
<h4 id="_1-单向" tabindex="-1"><a class="header-anchor" href="#_1-单向" aria-hidden="true">#</a> 1.单向</h4>
<p>普通方法调用始终阻塞，直到返回响应。这可以是任何正常的返回值，也可以是 None 引发异常的错误。</p>
<p>客户端代码的执行将被挂起，直到方法调用完成并产生其结果为止。</p>
<p>某些方法永远不会返回任何响应，或者您根本不对它感兴趣（包括错误和异常！），或者您不想等到结果可用后立即继续。您可以告诉 Pyro，对这些方法的调用应作为单向调用完成。对于此类方法的调用，Pyro 不会等待远程对象的响应。这些调用的返回值始终为 None，将立即返回将方法调用提交给服务器之后。当您的客户端继续执行时，服务器将处理该调用。客户端无法知道方法调用是否成功，因为没有返回值，没有错误并且没有异常将被返回！如果您想稍后找出发生了什么（如果有的话），则必须调用另一个返回值的（非单向）方法。</p>
<p>如何单向制作方法：使用特殊的装饰器将服务器中 类的方法标记为单向。有关如何执行此操作的详细信息，请参见创建 Pyro 类并公开其方法和属性。有关示例说明单向方法用法的代码，请参见示例。oneway</p>
<pre><code>batch = Pyro5.api.BatchProxy(proxy)
</code></pre>
</div></template>


