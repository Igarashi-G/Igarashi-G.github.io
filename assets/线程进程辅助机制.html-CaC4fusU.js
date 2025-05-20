import{_ as s}from"./plugin-vueexport-helper-DlAUqK2U.js";import{c as a,d as n,o as e}from"./app-BhZNNS61.js";const t={};function l(h,i){return e(),a("div",null,i[0]||(i[0]=[n(`<h1 id="一、线程辅助" tabindex="-1"><a class="header-anchor" href="#一、线程辅助"><span>一、线程辅助</span></a></h1><h2 id="一-信号量-semaphore" tabindex="-1"><a class="header-anchor" href="#一-信号量-semaphore"><span>一.信号量(Semaphore)：</span></a></h2><p>首先，它也是一把锁。和 RLock()类似的是它内部也是维护这多把锁，但区别在于它是并行的锁，而不是像递归锁那样嵌套的。假设现在的锁的数量<br> count = 4 那么此时开辟一百个线程只有 4 个线程可以进来。（这不是真正的并行，也有先后进入，就好似 CPU 只让它在先进入的四个线程中切换执行，<br> 因此达到控制 100 个线程中的 4 个线程进行并发执行）一旦 count 变为 0，此时其他的线程不能在进去（CPU 只执行这四个线程的切换）。</p><p>线程不是越多越好，撑死开到一千多个了，再开下去效率反而会大打折扣<br> 信号量用来控制线程并发数的，BoundedSemaphore 或 Semaphore 管理一个内置的计数 器，每当调用 acquire()时-1，调用 release()时+1。</p><p>计数器不能小于 0，当计数器为 0 时，acquire()将阻塞线程至同步锁定状态，直到其他线程调用 release()。(类似于停车位的概念)</p><p>（同步锁： 同时只允许一个线程更改数据，而 Semaphore 是同时允许一定数量的线程更改数据）</p><p>BoundedSemaphore 与 Semaphore 的唯一区别在于前者将在调用 release()时检查计数器的值是否超过了计数器的初始值，如果超过了将抛出一个异常。</p><p>数据库的连接问题:（线程池&amp;数据库连接池）</p><h4 id="_1-传统的数据库连接" tabindex="-1"><a class="header-anchor" href="#_1-传统的数据库连接"><span>1.传统的数据库连接：</span></a></h4><pre><code>用户访问---&gt; 申请连接---&gt; 查询并返回结果---&gt; 断开连接          的这种形式。
</code></pre><h4 id="_2-利用信号量机制限制多线程-线程池" tabindex="-1"><a class="header-anchor" href="#_2-利用信号量机制限制多线程-线程池"><span>2.利用信号量机制限制多线程（线程池）</span></a></h4><pre><code>若同时有一百个线程（即一百个访问者）进行连接数据库的请求，此时的开销对于数据库来说较大，承受不了。此时设置信号量，允许5个线程
的同时访问。此时即可缓解多线程同时访问造成的开销。
</code></pre><h4 id="_3-创建连接池再优化" tabindex="-1"><a class="header-anchor" href="#_3-创建连接池再优化"><span>3.创建连接池再优化：</span></a></h4><pre><code>虽然利用了信号量控制了多线程的并发数。但传统的访问模式需要创建连接。假设一天10万的访问量，那么数据库服务器就要创建10万次的连接。
这极大的浪费了数据库的资源。并且容易使数据库内存溢出&amp;宕机。
N用户---&gt;访问数据库----&gt;向数据库请求---&gt;开辟N次连接

数据库连接是一种关键的有限的昂贵的资源。建立一个数据库连接池（如JAVA中用LinkedList&lt;Connection&gt;来存放数据库连接构成连接池）。
先向数据库开辟10个连接在连接池中存储起来，此后便一直维护这是个连接，而不是传统的向数据库申请连接、断开。
用户每次请求都向连接池发起请求集合取连接get()。每次访问完再释放回连接池中集合再put()，即可极大的减少开销。
N用户----&gt;访问数据库-----&gt;向数据库连接池请求----&gt;线程池中获取连接
</code></pre><p>4.数据库连接池：<br> 负责分配、管理和释放数据库连接，它允许应用程序重复使用一个现有的数据库连接，而不是重新建立一个。</p><pre><code>&lt;1&gt;数据库连接池在初始化时将创建一定数量的数据库连接放到连接池中，这些数据库连接的数量是由最小数据库连接数来设定的。
&lt;2&gt;无论这些数据库连接是否被使用，连接池都将一直保证至少拥有这么多的连接数量。
&lt;3&gt;连接池的最大数据库连接数量限定了这个连接池能占有的最大连接数，当应用程序向连接池请求的连接数超过最大连接数量时，这些请求
    将被加入到等待队列中。

数据库连接池的最小连接数和最大连接数的设置要考虑到以下几个因素:
    1.最小连接数:是连接池一直保持的数据库连接，若创建过多则系统启动较慢，但创建后的响应速度就很快，反之。
    2.最大连接数:是连接池能申请的最大连接数，如果数据库连接请求超过次数，后面的数据库连接请求将被加入到等待队列中，这会影响以后
        的数据库操作
    3.如何确保连接池中的最小连接数呢？有动态和静态两种策略。动态即每隔一定时间就对连接池进行检测，如果发现连接数量小于最小连接数，
    则补充相应数量的新连接,以保证连接池的正常运转。静态是发现空闲连接不够时再去检查。
</code></pre><p>条件变量同步(Condition)：<br> 条件变量是什么呢，还是一把锁，也是最复杂的一把锁，除了是最后一把锁以外，还能实现线程间的通信，因此是条件变量。<br> 场景：比如一个线程要继续走，需要等待其他线程给出一个通知。（通过标识符进行一个通信）<br> 有一类线程需要满足条件之后才能够继续执行，Python 提供了 threading.Condition 对象用于条件变量线程的支持，它除了能提供 RLock()或 Lock()的方<br> 法外，还提供了 wait()、notify()、notifyAll()方法。</p><pre><code>lock_con=threading.Condition([Lock/Rlock])： 锁是可选选项，不传入锁，对象自动创建一个RLock()。

wait()：条件不满足时调用，线程会释放锁并进入等待阻塞；（进入等待池时，注意wait是有一个锁的释放的过程）
notify()：条件创造后调用，通知等待池激活一个线程；（而notify不会释放锁，要配合release才行）
notifyAll()：条件创造后调用，通知等待池激活所有线程。

生产者和消费者问题：
    假设现在是五个生产者一个消费者，当消费者拿到锁时，判断是否还有包子，若是没包子则wait进入等待池等待并释放锁给五个生产者去做，生产者做
    包子时第一个生产者做好了会告诉消费者我做好了，激活了消费者，此后释放了锁又回到了抢占的状态，其他生产者和消费者抢锁，若是消费者抢到了锁
    则开始吃包子，中途判断是否有包子，没有再进入等待池，有则吃了一个便再次释放锁，每次抢锁都是五个生产者和一个消费者抢锁，然而只要消费者的
    吃包子速度快于五个生产者的做包子速度，则包子数永远不对多于生产者的数量。

因此条件同步变量良好的保持了生产和消费的线程不会混乱，合理进行。
</code></pre><p>同步条件对象(Event)：<br> 先说说同步：<br> 当你进程处于一个 io 操作的情况下，你的进程只能乖乖的等着，不能进行任何其他的操作。而异步则是我跑我的，你什么时候数据过来了，我再返回来<br> 处理即可。两个线程按理说是同步的吗？当然不是，你走你的我走我的，互不影响。而同步则是为了让两个线程之间处于一个同步状态。</p><pre><code>这回不是一把锁了，它的功能类似于Condition，他也可以进行线程之间的信息交换，只不过不需要锁了（用锁其实是为了保证公共数据的）若没有锁也想相
互通信，此时就需要Event，Event比Condition用的更广。
条件同步和条件变量同步差不多意思，只是少了锁功能，因为条件同步设计于不访问共享资源的条件环境。Event里面有一个标志位（变量Flag）
event=threading.Event()：条件环境对象，初始值 为False；

event.isSet()：返回event的状态值；（返回标志位）

event.wait()：如果 event.isSet()==False将阻塞线程；（就是若标志位为Flase则阻塞线程）

event.set()： 设置event的状态值为True，所有阻塞池的线程激活进入就绪状态， 等待操作系统调度；（把标志位改为True）

event.clear()：恢复event的状态值为False。（把标志位改为Flase）
我在一个线程里通过一定的控制，让另一个线程走或是阻塞

加班示例：（很简单，看代码）
    老板说加班，工人喊命苦，但老板要先说加班后才会触发工人命苦
</code></pre><h2 id="线程变量利器-threadlocal" tabindex="-1"><a class="header-anchor" href="#线程变量利器-threadlocal"><span>线程变量利器----ThreadLocal：</span></a></h2><p>在多线程环境下，每个线程都有自己的数据。一个线程使用自己的局部变量比使用全局变量好，因为局部变量只有线程自己能看见，不会影响其他线程，<br> 而全局变量的修改必须加锁。<br> 但是局部变量也有问题，就是在函数调用的时候，传递起来很麻烦。<br> 用全局变量也不行，因为每个线程处理不同的对象，不能共享。<br> 如果用一个全局 dict 存放所有的对象，然后以 thread 自身作为 key 获得线程对应的对象如何？<br> 这种方式理论上是可行的，它最大的优点是消除了对象在每层函数中的传递问题，但是，每个函数获取对象的代码有点丑。<br> 有没有更简单的方式？</p><p>ThreadLocal 应运而生，不用查找 dict，ThreadLocal 帮你自动做这件事：</p><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> threading</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 创建全局ThreadLocal对象:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">local_school </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> threading.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">local</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> process_student</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">():</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    # 获取当前线程关联的student:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    std </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> local_school.student</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">    print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;Hello, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">%s</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> (in </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">%s</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">)&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> %</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (std, threading.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">current_thread</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">().name))</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> process_thread</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic;">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">):</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    # 绑定ThreadLocal的student:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    local_school.student </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> name</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">    process_student</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">t1 </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> threading.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">Thread</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">target</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> process_thread, </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">args</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;Alice&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,), </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">name</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;Thread-A&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">t2 </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> threading.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">Thread</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">target</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> process_thread, </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">args</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;Bob&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,), </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">name</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;Thread-B&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">t1.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">start</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">t2.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">start</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">t1.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">join</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">t2.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">join</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果：</p><pre><code>Hello, Alice (in Thread-A)
Hello, Bob (in Thread-B)
</code></pre><p>全局变量 local_school 就是一个 ThreadLocal 对象，每个 Thread 对它都可以读写 student 属性，但互不影响。你可以把 local_school 看成全局变量，<br> 但每个属性如 local_school.student 都是线程的局部变量，可以任意读写而互不干扰，也不用管理锁的问题，ThreadLocal 内部会处理。<br> ThreadLocal 最常用的地方就是为每个线程绑定一个数据库连接，HTTP 请求，用户身份信息等，这样一个线程的所有调用到的处理函数都可以非常方便<br> 地访问这些资源。</p><p>多线程利器----队列(queue)：（非常重要！！！）<br> 其实和数据结构的队列差不多。与栈不同 FIFO：先进先出。这就像一个管道<br> 队列只在多线程的情况下才有用，因为单线程时队列若是 get 不到或是 put 超了都会阻塞，而没救了。列表则是一个线程不安全的，因为任何线程都可以对列表<br> 进行更改，对于多线程来说不好控制（主要就是不安全）</p><pre><code>而队列就和列表不同，无论是几个线程，当并发get()时绝对不会像list那样获取到同一个值，这是因为队列的数据结构内部自带一把锁


import queue（这里是线程队列，还有进程队列）


q = queue.Queue(maxsize = 10)  #    创建一个“队列”对象

queue.Queue
    类即是一个队列的同步实现。队列长度可为无限或者有限。可通过Queue的构造函数的可选参数maxsize来设定队列长度。如果maxsize小于1就表示
    队列长度无限。


q.put(item, block=True, timeout=None)   #   将一个值放入队列中，超出队列长度阻塞

    调用队列对象的put()方法在队尾插入一个项目。
    item：为必需传入参的，插入队列的值。
    block：为可选参数，默认为True。如果队列当前为空，且block为True，put()方法就使调用线程暂停,直到空出一个数据单元。
        如果block为Flase，put方法将打印Full异常。
    timeout：可选参数，阻塞时间

q.get(block=True, timeout=None)   #   将一个值从队列中取出，超出获取范围阻塞

    调用队列对象的get()方法从队头删除并返回一个项目。
    block:默认为True。如果队列为空且block为True，get()就使调用线程暂停，直至有项目可用。如果队列为空且block为False，队列将引发Empty异常。
    timeout:可选参数，等待时间

Python queue模块有三种队列及构造函数:
    1、FIFO队列先进先出。                    class queue.Queue(maxsize)
    2、LIFO类似于栈，即先进后出。             class queue.LifoQueue(maxsize)
    3、还有一种是优先级队列级别越低越先出来。   class queue.PriorityQueue(maxsize)

此包中的常用方法(q = Queue.Queue()):
q.qsize() 返回队列的大小

q.empty() 如果队列为空，返回True,反之False

q.full() 如果队列满了，返回True,反之False。 q.full 与 maxsize 大小对应

q.get_nowait() 相当q.get(False)，即get时为空则报错

q.put_nowait(item) 相当q.put(item, False)，即put时为满则报错

q.task_done() 在完成一项工作之后，q.task_done() 函数向任务已经完成的队列发送一个信号

q.join() 实际上意味着等到队列为空，再执行别的操作。接收task_done()发送来的信号，后面的才会继续执行
</code></pre><p>生产者消费者-队列模型：<br> 此时则无需 condition 条件同步变量来控制资源为空时的线程挂起。而是 get 空、put 满时自动挂起。</p><h4 id="concurrent-futures-启动并行任务" tabindex="-1"><a class="header-anchor" href="#concurrent-futures-启动并行任务"><span>concurrent.futures -- 启动并行任务</span></a></h4><hr><p><a href="https://docs.python.org/zh-cn/3/library/concurrent.futures.html#module-concurrent.futures" target="_blank" rel="noopener noreferrer"><code>concurrent.futures</code></a> 模块提供异步执行回调高层接口。</p><p>使用 <strong>线程池</strong><a href=""><code>ThreadPoolExecutor</code></a> ，<strong>进程池</strong><a href=""><code>ProcessPoolExecutor</code></a> 来实现异步操作，两者都是抽像类 <a href=""><code>Executor</code></a> 的实现。</p><p>创建线程池</p><p>ThreadPoolExecutor</p><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> func</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic;">value</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">):</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    time.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">sleep</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">    print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;value:&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, value)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    return</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 111</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">():</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    pool </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;"> ThreadPoolExecutor</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">max_workers</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">5</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">in</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> range</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">10</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">):</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">		# 将函数放在池里面并返回一个future对象</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        fut </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> pool.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">submit</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(func, i)</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">        print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;future:&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, fut, </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">type</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(fut))</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,37)]))}const r=s(t,[["render",l]]),d=JSON.parse('{"path":"/python/%E8%AF%AD%E8%A8%80/%E5%A4%9A%E4%BB%BB%E5%8A%A1%E7%BC%96%E7%A8%8B/%E7%BA%BF%E7%A8%8B%E8%BF%9B%E7%A8%8B%E8%BE%85%E5%8A%A9%E6%9C%BA%E5%88%B6.html","title":"辅助机制","lang":"zh-CN","frontmatter":{"title":"辅助机制","order":3,"description":"一、线程辅助 一.信号量(Semaphore)： 首先，它也是一把锁。和 RLock()类似的是它内部也是维护这多把锁，但区别在于它是并行的锁，而不是像递归锁那样嵌套的。假设现在的锁的数量 count = 4 那么此时开辟一百个线程只有 4 个线程可以进来。（这不是真正的并行，也有先后进入，就好似 CPU 只让它在先进入的四个线程中切换执行， 因此达到...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"辅助机制\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-10-08T01:58:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"悦·宝宝\\",\\"url\\":\\"https://github.com/Igarashi-G\\"}]}"],["meta",{"property":"og:url","content":"https://igarashi-g.github.io/python/%E8%AF%AD%E8%A8%80/%E5%A4%9A%E4%BB%BB%E5%8A%A1%E7%BC%96%E7%A8%8B/%E7%BA%BF%E7%A8%8B%E8%BF%9B%E7%A8%8B%E8%BE%85%E5%8A%A9%E6%9C%BA%E5%88%B6.html"}],["meta",{"property":"og:site_name","content":"悦 ▪ 宝宝"}],["meta",{"property":"og:title","content":"辅助机制"}],["meta",{"property":"og:description","content":"一、线程辅助 一.信号量(Semaphore)： 首先，它也是一把锁。和 RLock()类似的是它内部也是维护这多把锁，但区别在于它是并行的锁，而不是像递归锁那样嵌套的。假设现在的锁的数量 count = 4 那么此时开辟一百个线程只有 4 个线程可以进来。（这不是真正的并行，也有先后进入，就好似 CPU 只让它在先进入的四个线程中切换执行， 因此达到..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-10-08T01:58:06.000Z"}],["meta",{"property":"article:modified_time","content":"2022-10-08T01:58:06.000Z"}]]},"git":{"createdTime":1665194286000,"updatedTime":1665194286000,"contributors":[{"name":"Igarashi","username":"Igarashi","email":"2545369032@qq.com","commits":1,"url":"https://github.com/Igarashi"}]},"readingTime":{"minutes":11.82,"words":3547},"filePathRelative":"python/语言/多任务编程/线程进程辅助机制.md","excerpt":"\\n<h2>一.信号量(Semaphore)：</h2>\\n<p>首先，它也是一把锁。和 RLock()类似的是它内部也是维护这多把锁，但区别在于它是并行的锁，而不是像递归锁那样嵌套的。假设现在的锁的数量<br>\\ncount = 4 那么此时开辟一百个线程只有 4 个线程可以进来。（这不是真正的并行，也有先后进入，就好似 CPU 只让它在先进入的四个线程中切换执行，<br>\\n因此达到控制 100 个线程中的 4 个线程进行并发执行）一旦 count 变为 0，此时其他的线程不能在进去（CPU 只执行这四个线程的切换）。</p>\\n<p>线程不是越多越好，撑死开到一千多个了，再开下去效率反而会大打折扣<br>\\n信号量用来控制线程并发数的，BoundedSemaphore 或 Semaphore 管理一个内置的计数 器，每当调用 acquire()时-1，调用 release()时+1。</p>","autoDesc":true}');export{r as comp,d as data};
