<template><div><p>接口的调用通常分为三类： 1.同步调用：<br>
是一种阻塞式调用，调用方要等待对方执行完毕才返回，它是一种单向调用</p>
<pre><code>2.回调：
    回调是一种双向调用模式，也就是说，被调用方在接口被调用时也会调用对方的接口。你把函数作为参数传过去，传过去的回调函数同时也
    需要接收执行一方的参数。（我有肉你有刀，我要调用你的刀再传入我的肉）

    定义：把函数的指针（地址）作为参数传递给另一个函数，当这个指针被用来调用其所指向的函数时，我们就说这是回调函数。

3.异步调用：
    异步调用是一种类似消息或事件的机制，不过它的调用方向刚好相反，接口的服务在收到某种讯息或发生某种事件时，会主动通知客户方
    （即调用客户方的接口）见6.4

下面进入正题：
</code></pre>
<p>回调思想:<br>
假设爱丽丝（Arisu）想让薇尔莉特（Violet）去帮自己写并寄几封信，便把信的内容和自己的身份信息告诉了薇尔莉特（假设寄信要用身份信息才能<br>
寄），薇尔莉特明白了传达的内容。并获取了爱丽丝（对象）的身份，然后调用了（爱丽丝）的代笔服务按照内容把爱丽丝传达的消息写好，又用自己的寄<br>
信功能帮爱丽丝完成任务</p>
<pre><code>class Arisu:
    id = &quot;Arisu&quot;
    def __init__(self):
        pass

    def write_letter(self,msg,obj): #回调函数，通常用于处理事件
        print(&quot;写信:&quot;,msg,&quot;\n署名：&quot;,obj.id)
        # return &quot;写信: {0}\n署名：{1}&quot;.format(msg, obj.id)


class Baioretto:
    def __init__(self):
        pass

    def ghostwriting(self,msg,Arisu):   # msg要传入回调函数，才形成回调
        Arisu.write_letter(msg,Arisu)   # 调用回调函数，正常应该拿到回调函数的返回值，执行下一步动作
        print(&quot;&quot;.join([&quot;以&quot;, Arisu.id, &quot;的名义送信&quot;]))


Baioretto = Baioretto()
str = &quot;Ai ga nandearu ka o shiritai&quot;
Baioretto.ghostwriting(str,Arisu())

薇尔莉特在执行代写方法时传入了要写的信，并（通过爱丽丝的引用）调用了爱丽丝的写信方法，最后帮爱丽丝写好了信。那么写信方法即为（callback）

但只调用爱丽丝的写信方法也不用把爱丽丝全部暴露出去，因此若在JAVA中实现可以定义一个接口类来规定写信方法。然而python中就不需要了，
因为无类型所以默认了多态，只要拿到了对象的引用即可执行回调方法。
（另：而在js中则先理解为某一事件执行完毕之后接下去要触发的函数）
</code></pre>
</div></template>


