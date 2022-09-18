<template><div><h1 id="python-设计模式" tabindex="-1"><a class="header-anchor" href="#python-设计模式" aria-hidden="true">#</a> Python 设计模式</h1>
<h2 id="一、单例模式" tabindex="-1"><a class="header-anchor" href="#一、单例模式" aria-hidden="true">#</a> 一、单例模式</h2>
<Alert type="info">确保整个系统中，某个类，只有**唯一一个**实例存在</Alert><h3 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景" aria-hidden="true">#</a> 使用场景</h3>
<ol>
<li>
<p><strong>配置信息</strong>：</p>
<blockquote>
<p>服务端配置信息存在一个文件中，通过一个<code v-pre>Config</code> 类来读取时，频繁 <code v-pre>new Config</code> 类会严重占内存，整个系统中只存了一份 <code v-pre>Config</code> 的实例即可反复读取</p>
</blockquote>
</li>
<li>
<p><strong>数据库连接:</strong></p>
<blockquote>
<p>若未使用连接池来复用连接， 全局仅创建一个数据库连接实例，反复复用即可，起码比创建一堆无用连接实例强，但依然建议构建连接池复用</p>
</blockquote>
</li>
<li>
<p><strong><code v-pre>WebSocket</code>等其他线程轮询数据</strong>：</p>
<blockquote>
<p>当需要另开辟线程并写个类去轮询取数据时（比如控制固定秒数去数据库更新数据，并只读内存中的一份数据时）每次请求都拿到 <strong>同一个实例</strong> 并在实例内存取数据即可</p>
</blockquote>
</li>
</ol>
<h3 id="_1-模块的形式" tabindex="-1"><a class="header-anchor" href="#_1-模块的形式" aria-hidden="true">#</a> 1.模块的形式</h3>
<blockquote>
<p><code v-pre>python</code> 的模块在<strong>第一次</strong>导入时，<strong>会生成 <code v-pre>.pyc</code> 文件</strong>，当<strong>第二次</strong>导入时，就会<strong>直接加载 <code v-pre>.pyc</code> 文件</strong>，不会再次执行模块代码创建实例，因此，把相关的函数和数据定义在模块中，即可获得 <strong>单例对象</strong></p>
</blockquote>
<ul>
<li>
<p>假设建个文件：<code v-pre>mysingleton.py</code></p>
</li>
<li>
<p>创建所需类并实例化对象：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>  <span class="token keyword">class</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
      <span class="token keyword">def</span> <span class="token function">foo</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
          <span class="token keyword">pass</span>


  singleton <span class="token operator">=</span> Singleton<span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"singleton"</span><span class="token punctuation">,</span> singleton<span class="token punctuation">,</span> <span class="token builtin">id</span><span class="token punctuation">(</span>singleton<span class="token punctuation">)</span><span class="token punctuation">)</span>

  <span class="token comment">### 输出结果</span>
  <span class="token comment"># singleton &lt;__main__.Singleton object at 0x0000015E06AEE910> 1503350679824</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>使用时，在其他文件中导入该对象，即为单例对象（同样的 id）</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> huan<span class="token punctuation">.</span>utils<span class="token punctuation">.</span>tests<span class="token punctuation">.</span>mysingleton <span class="token keyword">import</span> singleton

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"import singleton"</span><span class="token punctuation">,</span> singleton<span class="token punctuation">,</span> <span class="token builtin">id</span><span class="token punctuation">(</span>singleton<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果</span>
<span class="token comment"># singleton &lt;huan.utils.tests.mysingleton.Singleton object at 0x00000298B09242B0> 2854820659888</span>
<span class="token comment"># import singleton &lt;huan.utils.tests.mysingleton.Singleton object at 0x00000298B09242B0> 2854820659888</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_2-装饰器形式" tabindex="-1"><a class="header-anchor" href="#_2-装饰器形式" aria-hidden="true">#</a> 2.装饰器形式</h3>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">Singleton</span><span class="token punctuation">(</span>cls<span class="token punctuation">)</span><span class="token punctuation">:</span>
    _instance <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token keyword">def</span> <span class="token function">_singleton</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> cls <span class="token keyword">not</span> <span class="token keyword">in</span> _instance<span class="token punctuation">:</span>
            _instance<span class="token punctuation">[</span>cls<span class="token punctuation">]</span> <span class="token operator">=</span> cls<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kargs<span class="token punctuation">)</span>
        <span class="token keyword">return</span> _instance<span class="token punctuation">[</span>cls<span class="token punctuation">]</span>

     <span class="token keyword">return</span> _singleton

<span class="token decorator annotation punctuation">@Singleton</span>
<span class="token keyword">class</span> <span class="token class-name">A</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    a <span class="token operator">=</span> <span class="token number">1</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> x<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>x <span class="token operator">=</span> x

a1 <span class="token operator">=</span> A<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
a2 <span class="token operator">=</span> A<span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">id</span><span class="token punctuation">(</span>a1<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token builtin">id</span><span class="token punctuation">(</span>a2<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>利用 python 的类装饰器特性来装饰目标类，从而再类初始化之前走装饰器进行加载</p>
<ul>
<li>
<p>cls:就是类 A，类型即是 type（由于类 A 继承了 object）因此 cls 就相当于 类 A 的引用</p>
</li>
<li>
<p>*args, **kargs：是类初始化传入的参数，因此当实例化 A(1) =&gt; cls(1)</p>
</li>
<li>
<p>A 其实等同于装饰器的返回值 A == _singleton ,当类 A 执行时，意味着加载了_singleton 函数 即 =&gt;
A(args, kwargs) == _simgleton(args, kwargs)</p>
</li>
</ul>
<h3 id="_3-使用类方法定义" tabindex="-1"><a class="header-anchor" href="#_3-使用类方法定义" aria-hidden="true">#</a> 3.使用类方法定义</h3>
<pre><code>class Singleton(object):

def __init__(self):
    pass

@classmethod
def get_instance(cls, *args, **kwargs):
    if not hasattr(Singleton, &quot;_instance&quot;): # 注意: 必须只能使用_instance，hasattr 无法获取到 __instance
        Singleton._instance = Singleton(*args, **kwargs)
    return Singleton._instance

or 注（这里的Singleton 就是 cls，如下另一种形式替换，未替换只为了可读性提高）

__instance = None

@classmethod
def get_instance(cls, *args, **kwargs):
    if cls.__instance:
        return cls.__instance
    else:
        cls.__instance = cls(*args, **kwargs)
        return cls.__instance
</code></pre>
<p>一般情况，大家以为这样就完成了单例模式，但其实这样当使用多线程时会存在问题</p>
<pre><code>import threading

def task(arg):
    obj = Singleton.get_instance()
    print(obj)

for i in range(10):
    t = threading.Thread(target=task,args=[i,])
    t.start()
</code></pre>
<p>程序执行后，打印结果如下：</p>
<pre><code>&lt;__main__.Singleton object at 0x0303BF88&gt;
&lt;__main__.Singleton object at 0x0303BF88&gt;
&lt;__main__.Singleton object at 0x0303BF88&gt;
&lt;__main__.Singleton object at 0x0303BF88&gt;
&lt;__main__.Singleton object at 0x0303BF88&gt;
&lt;__main__.Singleton object at 0x0303BF88&gt;
&lt;__main__.Singleton object at 0x0303BF88&gt;
&lt;__main__.Singleton object at 0x0303BF88&gt;
&lt;__main__.Singleton object at 0x0303BF88&gt;
&lt;__main__.Singleton object at 0x0303BF88&gt;
</code></pre>
<p>看起来也没有问题，那是因为执行速度过快，如果在 init 方法中有一些 IO 操作，就会发现问题了，下面我们通过 time.sleep 模拟，改写 <strong>init</strong></p>
<pre><code>def __init__(self):
    import time
    time.sleep(1)
</code></pre>
<p>重新执行程序后，结果如下</p>
<pre><code>&lt;__main__.Singleton object at 0x0304C6E8&gt;
&lt;__main__.Singleton object at 0x0304C838&gt;
&lt;__main__.Singleton object at 0x0303BF70&gt;
&lt;__main__.Singleton object at 0x0304C340&gt;
&lt;__main__.Singleton object at 0x0304CAD8&gt;
&lt;__main__.Singleton object at 0x0304C988&gt;
&lt;__main__.Singleton object at 0x0304CC28&gt;&lt;__main__.Singleton object at 0x0304CD78&gt;

&lt;__main__.Singleton object at 0x0304CEC8&gt;
&lt;__main__.Singleton object at 0x03062040&gt;
</code></pre>
<p>【说明】：</p>
<ul>
<li>
<p>其实这种情况可以想象的到，因为开启多线程时，每个线程独立执行</p>
</li>
<li>
<p>当 线程 1 进来判断时，有 IO 的的情况，该类还尚未来得及实例化，线程 2 几乎和 线程 1 同时来判断，因此 线程 2 也任务该类没有实例化</p>
</li>
<li>
<p>因此在初始化有 IO 阻塞的情况下，多线程时会疯狂创建自己的实例，因为他们都判断该类还尚未实例化</p>
</li>
</ul>
<p>按照以上方式创建的单例，无法支持多线程！！！</p>
<p>【解决办法】：加锁！未加锁部分并发执行,加锁部分串行执行,速度降低（当创建第一个实例时阻塞）,但是保证了数据安全</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> threading
<span class="token keyword">import</span> time


<span class="token keyword">class</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    __instance_lock <span class="token operator">=</span> threading<span class="token punctuation">.</span>Lock<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

    <span class="token decorator annotation punctuation">@classmethod</span>
    <span class="token keyword">def</span> <span class="token function">get_instance</span><span class="token punctuation">(</span>cls<span class="token punctuation">,</span> <span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">with</span> Singleton<span class="token punctuation">.</span>__instance_lock<span class="token punctuation">:</span>
            <span class="token keyword">if</span> <span class="token keyword">not</span> <span class="token builtin">hasattr</span><span class="token punctuation">(</span>cls<span class="token punctuation">,</span> <span class="token string">"_instance"</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
                cls<span class="token punctuation">.</span>_instance <span class="token operator">=</span> cls<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">*</span>kwargs<span class="token punctuation">)</span>
            <span class="token keyword">return</span> cls<span class="token punctuation">.</span>_instance


<span class="token keyword">def</span> <span class="token function">task</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span><span class="token punctuation">:</span>
    obj <span class="token operator">=</span> Singleton<span class="token punctuation">.</span>get_instance<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>


<span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    t <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>task<span class="token punctuation">,</span> args<span class="token operator">=</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> <span class="token punctuation">)</span><span class="token punctuation">)</span>
    t<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>

time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
obj <span class="token operator">=</span> Singleton<span class="token punctuation">.</span>get_instance<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是还是有一点小问题，就是当程序执行时，执行了 time.sleep(20)后，下面实例化对象时，此时已经是单例模式了，但我们还是加了锁，这样
不太好（大概是指非多线程还加锁可能不太合理叭），再进行一些优化，把 intance 方法，改成下面的这样就行：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token decorator annotation punctuation">@classmethod</span>
<span class="token keyword">def</span> <span class="token function">instance</span><span class="token punctuation">(</span>cls<span class="token punctuation">,</span> <span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> <span class="token builtin">hasattr</span><span class="token punctuation">(</span>Singleton<span class="token punctuation">,</span> <span class="token string">"_instance"</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">with</span> Singleton<span class="token punctuation">.</span>_instance_lock<span class="token punctuation">:</span>
            <span class="token keyword">if</span> <span class="token keyword">not</span> <span class="token builtin">hasattr</span><span class="token punctuation">(</span>Singleton<span class="token punctuation">,</span> <span class="token string">"_instance"</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
                Singleton<span class="token punctuation">.</span>_instance <span class="token operator">=</span> Singleton<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
    <span class="token keyword">return</span> Singleton<span class="token punctuation">.</span>_instance
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>就是每次先判断该类中有无实例化的唯一对象了，若有了则直接返回，没有才考虑加锁并创建单例（即避免了每次加锁，有避免了多线程无锁疯狂创建）</p>
<p>这样，一个可以支持多线程的单例模式就完成了，但这种方式实现，使用时会有限制，以后实例化必须通过 obj = Singleton.get_instance()
如果用 obj=Singleton() ,这种方式得到的不是单例</p>
<h3 id="_4-基于-new-方法实现-推荐使用-方便" tabindex="-1"><a class="header-anchor" href="#_4-基于-new-方法实现-推荐使用-方便" aria-hidden="true">#</a> 4.基于 new 方法实现（推荐使用，方便）</h3>
<p>通过上面例子，我们可以知道，当我们实现单例时，为了保证线程安全需要在内部加入锁，然而又要解决初始化避免用 get_instance 的这种写法</p>
<p>因此可以使用 <strong>new</strong> 方法（python 默认调用 <strong>new</strong> 方法实例化对象，然后再执行类的<strong>init</strong>方法，对这个对象进行初始化）
def <strong>init</strong>(self):
pass</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">__new__</span><span class="token punctuation">(</span>cls<span class="token punctuation">,</span> <span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> <span class="token builtin">hasattr</span><span class="token punctuation">(</span>Singleton<span class="token punctuation">,</span> <span class="token string">"_instance"</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">with</span> Singleton<span class="token punctuation">.</span>_instance_lock<span class="token punctuation">:</span>
            <span class="token keyword">if</span> <span class="token keyword">not</span> <span class="token builtin">hasattr</span><span class="token punctuation">(</span>Singleton<span class="token punctuation">,</span> <span class="token string">"_instance"</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
                Singleton<span class="token punctuation">.</span>_instance <span class="token operator">=</span> <span class="token builtin">object</span><span class="token punctuation">.</span>__new__<span class="token punctuation">(</span>cls<span class="token punctuation">)</span>
    <span class="token keyword">return</span> Singleton<span class="token punctuation">.</span>_instance
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>
采用这种方式的单例模式，以后实例化对象时，和平时实例化对象的方法一样 obj = Singleton()

- 弊端：这种方式实现每次实例化都会触发 __init__ 方法，因此可以不实现__init__方法，初始化的操作可以放在实例完成以后，再以
obj.x=xx的方式去进行初始化操作


### 5.基于metaclass方式实现

- 0.所有类创建的实质，都等同于 Foo = type() -> Foo() = type()()，Foo 其实是 type 的实例化对象，因此可继承上帝类来改写实例化形式
- 1.类由 type 创建，创建类时，type 的 __init__ 方法自动执行，类() 执行 type 的 __call__ 方法(类的__new__方法,类的__init__方法)
- 2.对象由类创建，创建对象时，类的 __init__ 方法自动执行，对象()执行类的 __call__ 方法


    class SingletonType(type):
        __instance = None

        def __init__(cls, *args, **kwargs):
            super(SingletonType, cls).__init__(*args, **kwargs)

        def __call__(cls, *args, **kwargs):  # 这里的 cls，即Foo类
            print("cls", cls)
            single_obj = cls.__new__(cls, *args, **kwargs)
            cls.__init__(single_obj, *args, **kwargs)  # Foo.__init__(obj)
            return single_obj


    class Foo(metaclass=SingletonType):  # 指定创建 Foo 的 type 为 SingletonType
        def __init__(self, name):
            self.name = name

        def __new__(cls, *args, **kwargs):
            return object.__new__(cls)
以上为利用继承 type类 以及利用 metaclass 创建改写的通用形式。

那么实现metaclass单例模式，即可如下：

    import threading

    class SingletonType(type):
        _instance_lock = threading.Lock()

        def __call__(cls, *args, **kwargs):
            if not hasattr(cls, "_instance"):
                with SingletonType._instance_lock:
                    if not hasattr(cls, "_instance"):
                        cls._instance = super(SingletonType,cls).__call__(*args, **kwargs)
            return cls._instance

    class Foo(metaclass=SingletonType):
        def __init__(self,name):
            self.name = name


​
​    obj1 = Foo('name1')
​    obj2 = Foo('name2')
​    print(obj1, obj2)


​
## 二、工厂模式


​
​
​
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


