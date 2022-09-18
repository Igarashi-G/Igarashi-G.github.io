<template><div><h1 id="异步任务雏形" tabindex="-1"><a class="header-anchor" href="#异步任务雏形" aria-hidden="true">#</a> 异步任务雏形</h1>
<Alert type="info"> **造轮子：** 使用 `etcd` 作为中间件，自行构建一套异步任务 </Alert><p>参考：</p>
<ul>
<li>
<ol>
<li><a href="/back_end/python/base/%E8%B5%84%E6%BA%90%E8%B0%83%E5%BA%A6/%E5%BC%82%E6%AD%A5%E6%A6%82%E8%BF%B0" target="_blank" rel="noopener noreferrer">异步概述<ExternalLinkIcon/></a></li>
</ol>
</li>
<li>
<ol start="2">
<li><a href="/back_end/python/base/%E5%BC%82%E6%AD%A5%E7%BC%96%E7%A8%8B/%E5%BC%82%E6%AD%A5%E5%B9%B6%E5%8F%91%E5%BA%93asyncio" target="_blank" rel="noopener noreferrer">异步编程<ExternalLinkIcon/></a></li>
</ol>
</li>
</ul>
<h2 id="手动实现异步任务-仿-celery-模型" tabindex="-1"><a class="header-anchor" href="#手动实现异步任务-仿-celery-模型" aria-hidden="true">#</a> 手动实现异步任务（仿 Celery 模型）</h2>
<p>刚好最近项目需求：实现一个基于 <code v-pre>etcd</code> 的 <code v-pre>aio_task</code> 便从零开始造个轮子</p>
<h4 id="异步任务队列" tabindex="-1"><a class="header-anchor" href="#异步任务队列" aria-hidden="true">#</a> 异步任务队列：</h4>
<p>用来减缓高并发，将任务写入队列，通过一定顺序异步执行，因此需要任务队列作为管道</p>
<blockquote>
<p>目的是为了：</p>
<ol>
<li>有空余资源时执行</li>
<li>指定时间执行</li>
<li>使用后台任务进程执行</li>
</ol>
</blockquote>
<h4 id="celery-模型概念" tabindex="-1"><a class="header-anchor" href="#celery-模型概念" aria-hidden="true">#</a> celery 模型概念：</h4>
<h5 id="_1-task-生产者" tabindex="-1"><a class="header-anchor" href="#_1-task-生产者" aria-hidden="true">#</a> 1.Task(<code v-pre>生产者</code>)</h5>
<p>耗时任务，比如格盘、重启、大批量发短信等。web 不可能立即收到请求，<code v-pre>同步</code>会卡死 web 死等，<code v-pre>异步</code>会占用浏览器请求资源卡死/丢失响应，因此需要异步任务，立即返回 task_id 和成功</p>
<h5 id="_2-worker-消费者" tabindex="-1"><a class="header-anchor" href="#_2-worker-消费者" aria-hidden="true">#</a> 2.Worker(<code v-pre>消费者</code>)</h5>
<p>在后台处理 Task 的对象</p>
<h5 id="_3-broker-消息中间件" tabindex="-1"><a class="header-anchor" href="#_3-broker-消息中间件" aria-hidden="true">#</a> 3.Broker（<code v-pre>消息中间件</code>）</h5>
<p>本质是<code v-pre>队列</code>，Task 会把任务交给 Broker 排队，Broker 来定执行序列，Worker 再从队列里面取任务执行</p>
<h5 id="_4-beat-调度者" tabindex="-1"><a class="header-anchor" href="#_4-beat-调度者" aria-hidden="true">#</a> 4.Beat(<code v-pre>调度者</code>)</h5>
<p>定时任务调度器，根据指定的时间，向 Broker 中添加数据，然后等待 Worker 去处理</p>
<h5 id="_5-backend" tabindex="-1"><a class="header-anchor" href="#_5-backend" aria-hidden="true">#</a> 5.Backend</h5>
<p>保存 Worker 执行结果的对象，每个 Task 都会有返回值，这些返回值就在 Backend 中 比如<Badge type="success">success</Badge><Badge type="warning">pedding</Badge><Badge type="error">failed</Badge> 这类状态</p>
<img src="@source/python/生态/异步任务/img/仿celery模型.png">
<Alert type="info">其实就是一个任务**序列化存储**与**反序列化获取**的过程</Alert><h4 id="_1-broker-类" tabindex="-1"><a class="header-anchor" href="#_1-broker-类" aria-hidden="true">#</a> 1.Broker 类</h4>
<p>消息中间件，即：<Badge>队列(Queue)</Badge> ，应在此类存 <code v-pre>任务</code> 并定义队列 <code v-pre>优先级</code> 等规则.</p>
<p>这里使用了 <a href="/data-base/etcd/etcd" target="_blank" rel="noopener noreferrer">etcd<ExternalLinkIcon/></a> 构建：<a href="/data-base/etcd/aioetcd3#%E7%AE%80%E5%8D%95%E5%B0%81%E8%A3%85" target="_blank" rel="noopener noreferrer">db 源码<ExternalLinkIcon/></a></p>
<p><strong><a href="http://borker.py" target="_blank" rel="noopener noreferrer">borker.py<ExternalLinkIcon/></a></strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> json
<span class="token keyword">from</span> typing <span class="token keyword">import</span> List<span class="token punctuation">,</span> Optional

<span class="token keyword">from</span> aioetcd3<span class="token punctuation">.</span><span class="token builtin">help</span> <span class="token keyword">import</span> range_prefix

<span class="token keyword">from</span> dashboard <span class="token keyword">import</span> database
<span class="token keyword">from</span> dashboard<span class="token punctuation">.</span>db_model<span class="token punctuation">.</span>task <span class="token keyword">import</span> TaskInDB
<span class="token keyword">from</span> rook<span class="token punctuation">.</span>util <span class="token keyword">import</span> get_now_time


<span class="token keyword">class</span> <span class="token class-name">Broker</span><span class="token punctuation">:</span>
    DB_CONFIG_KEY <span class="token operator">=</span> <span class="token string">"/ufs/monitor/task"</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>db_connection <span class="token operator">=</span> database<span class="token punctuation">.</span>get_db<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">enqueue</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> task_id<span class="token punctuation">,</span> task_in_db<span class="token punctuation">:</span> TaskInDB<span class="token punctuation">,</span> ttl<span class="token operator">=</span><span class="token number">5000</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">"""
        将任务写入队列中
        :param task_id:
        :param task_in_db:
        :param ttl:
        :return:
        """</span>
        <span class="token comment"># TODO: 定义队列优先级</span>
        task_key <span class="token operator">=</span> <span class="token string">"{}/{}"</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>DB_CONFIG_KEY<span class="token punctuation">,</span> task_id<span class="token punctuation">)</span>
        db_value <span class="token operator">=</span> task_in_db<span class="token punctuation">.</span>json<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">await</span> self<span class="token punctuation">.</span>db_connection<span class="token punctuation">.</span>put<span class="token punctuation">(</span>task_key<span class="token punctuation">,</span> db_value<span class="token punctuation">,</span> timeout<span class="token operator">=</span>ttl<span class="token punctuation">)</span>
        <span class="token keyword">return</span> task_in_db

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">dequeue</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> task_id<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> Optional<span class="token punctuation">[</span>TaskInDB<span class="token punctuation">]</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">"""
        去任务队列中取任务
        :param task_id:
        :return:
        """</span>
        task_key <span class="token operator">=</span> <span class="token string">"{}/{}"</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>DB_CONFIG_KEY<span class="token punctuation">,</span> task_id<span class="token punctuation">)</span>
        task_info <span class="token operator">=</span> <span class="token keyword">await</span> self<span class="token punctuation">.</span>db_connection<span class="token punctuation">.</span>get<span class="token punctuation">(</span>task_key<span class="token punctuation">)</span>
        <span class="token keyword">if</span> task_info<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
            task_in_db <span class="token operator">=</span> TaskInDB<span class="token punctuation">(</span><span class="token operator">**</span>json<span class="token punctuation">.</span>loads<span class="token punctuation">(</span>task_info<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> task_in_db
        <span class="token keyword">return</span> <span class="token boolean">None</span>

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">update</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> task_id<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">"""
        更新队列中指定的任务
        :param task_id:
        :param kwargs:
        :return:
        """</span>
        task_in_db <span class="token operator">=</span> <span class="token keyword">await</span> self<span class="token punctuation">.</span>dequeue<span class="token punctuation">(</span>task_id<span class="token punctuation">)</span>
        <span class="token keyword">if</span> task_in_db<span class="token punctuation">:</span>
            db_key <span class="token operator">=</span> <span class="token string">"{}/{}"</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>DB_CONFIG_KEY<span class="token punctuation">,</span> task_id<span class="token punctuation">)</span>
            db_value <span class="token operator">=</span> task_in_db<span class="token punctuation">.</span><span class="token builtin">dict</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            db_value<span class="token punctuation">.</span>update<span class="token punctuation">(</span><span class="token builtin">dict</span><span class="token punctuation">(</span><span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">)</span>
            db_value<span class="token punctuation">[</span><span class="token string">"updated_at"</span><span class="token punctuation">]</span> <span class="token operator">=</span> get_now_time<span class="token punctuation">(</span><span class="token punctuation">)</span>
            db_value <span class="token operator">=</span> TaskInDB<span class="token punctuation">(</span><span class="token operator">**</span>db_value<span class="token punctuation">)</span><span class="token punctuation">.</span>json<span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token comment"># db_value = task_in_db.json()</span>

            <span class="token keyword">await</span> self<span class="token punctuation">.</span>db_connection<span class="token punctuation">.</span>put<span class="token punctuation">(</span>db_key<span class="token punctuation">,</span> db_value<span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token boolean">True</span>
        <span class="token keyword">return</span> <span class="token boolean">False</span>

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">remove</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> task_id<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">"""
        将任务从队列中移除
        :param task_id:
        :return:
        """</span>
        db_key <span class="token operator">=</span> <span class="token string">"{}/{}"</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>DB_CONFIG_KEY<span class="token punctuation">,</span> task_id<span class="token punctuation">)</span>
        <span class="token keyword">await</span> self<span class="token punctuation">.</span>db_connection<span class="token punctuation">.</span>delete<span class="token punctuation">(</span>db_key<span class="token punctuation">)</span>

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">list</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> List<span class="token punctuation">[</span>TaskInDB<span class="token punctuation">]</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">""" 获取队列中所有任务 """</span>
        db_key <span class="token operator">=</span> <span class="token string">"{}"</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>DB_CONFIG_KEY<span class="token punctuation">)</span>
        db_value <span class="token operator">=</span> <span class="token keyword">await</span> self<span class="token punctuation">.</span>db_connection<span class="token punctuation">.</span><span class="token builtin">range</span><span class="token punctuation">(</span>range_prefix<span class="token punctuation">(</span>db_key<span class="token punctuation">)</span><span class="token punctuation">)</span>
        task_list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token keyword">for</span> v <span class="token keyword">in</span> db_value<span class="token punctuation">:</span>
            <span class="token keyword">if</span> v<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
                user_info <span class="token operator">=</span> json<span class="token punctuation">.</span>loads<span class="token punctuation">(</span>v<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
                task_list<span class="token punctuation">.</span>append<span class="token punctuation">(</span>TaskInDB<span class="token punctuation">(</span><span class="token operator">**</span>user_info<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> task_list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-task-类" tabindex="-1"><a class="header-anchor" href="#_2-task-类" aria-hidden="true">#</a> 2.Task 类</h4>
<p><strong>生产者</strong>，定义一个任务类来表示要执行的任务，定义任务相关的逻辑</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> abc

<span class="token keyword">from</span> monitor<span class="token punctuation">.</span>async_task<span class="token punctuation">.</span>backend <span class="token keyword">import</span> Backend
<span class="token keyword">from</span> monitor<span class="token punctuation">.</span>async_task<span class="token punctuation">.</span>broker <span class="token keyword">import</span> Broker
<span class="token keyword">from</span> dashboard<span class="token punctuation">.</span>model<span class="token punctuation">.</span>task <span class="token keyword">import</span> StatusEnum


<span class="token keyword">class</span> <span class="token class-name">BaseTask</span><span class="token punctuation">(</span>abc<span class="token punctuation">.</span>ABC<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">"""
    Example Usage:
    class FooTask(BaseTask):

        async def run(self, *args, **kwargs):
            任务执行逻辑
            pass
        async def delay(self, *args, **kwargs):
            创建任务逻辑
            pass
    """</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>broker <span class="token operator">=</span> Broker<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>backend <span class="token operator">=</span> Backend<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>task_id <span class="token operator">=</span> <span class="token boolean">None</span>
        self<span class="token punctuation">.</span>task_name <span class="token operator">=</span> <span class="token string">""</span>

    <span class="token decorator annotation punctuation">@abc<span class="token punctuation">.</span>abstractmethod</span>
    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">run</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> <span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">raise</span> NotImplementedError<span class="token punctuation">(</span><span class="token string">"task `run` method must be implemented"</span><span class="token punctuation">)</span>

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">update_state</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> <span class="token operator">*</span><span class="token punctuation">,</span> task_id<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span> state<span class="token punctuation">:</span> StatusEnum<span class="token punctuation">,</span> progress<span class="token punctuation">:</span> <span class="token builtin">float</span> <span class="token operator">=</span> <span class="token number">0.0</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">""" 更新任务状态 """</span>
        task_in_db <span class="token operator">=</span> <span class="token keyword">await</span> self<span class="token punctuation">.</span>broker<span class="token punctuation">.</span>dequeue<span class="token punctuation">(</span>task_id<span class="token punctuation">)</span>
        <span class="token keyword">if</span> task_in_db<span class="token punctuation">:</span>
            <span class="token keyword">if</span> <span class="token builtin">all</span><span class="token punctuation">(</span><span class="token punctuation">[</span>task_in_db<span class="token punctuation">.</span>state <span class="token operator">==</span> state <span class="token operator">==</span> StatusEnum<span class="token punctuation">.</span>RUNNING<span class="token punctuation">,</span> progress <span class="token operator">==</span> <span class="token number">0.0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
                <span class="token keyword">return</span>
            task_in_db<span class="token punctuation">.</span>state <span class="token operator">=</span> state
            current_progress <span class="token operator">=</span> <span class="token builtin">round</span><span class="token punctuation">(</span>task_in_db<span class="token punctuation">.</span>progress <span class="token operator">+</span> progress<span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> current_progress <span class="token operator">>=</span> <span class="token number">100</span><span class="token punctuation">:</span>
                task_in_db<span class="token punctuation">.</span>progress <span class="token operator">=</span> <span class="token number">100</span>
            <span class="token keyword">else</span><span class="token punctuation">:</span>
                task_in_db<span class="token punctuation">.</span>progress <span class="token operator">=</span> current_progress
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"update_state"</span><span class="token punctuation">,</span> state<span class="token punctuation">,</span> <span class="token string">"progress"</span><span class="token punctuation">,</span> task_in_db<span class="token punctuation">.</span>progress<span class="token punctuation">)</span>
            <span class="token keyword">await</span> self<span class="token punctuation">.</span>backend<span class="token punctuation">.</span>update<span class="token punctuation">(</span>task_id<span class="token punctuation">,</span> <span class="token operator">**</span>task_in_db<span class="token punctuation">.</span><span class="token builtin">dict</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            <span class="token keyword">raise</span> Exception

    <span class="token decorator annotation punctuation">@abc<span class="token punctuation">.</span>abstractmethod</span>
    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">delay</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> <span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">raise</span> NotImplementedError<span class="token punctuation">(</span><span class="token string">"task `delay` method must be implemented"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-worker-类" tabindex="-1"><a class="header-anchor" href="#_3-worker-类" aria-hidden="true">#</a> 3.Worker 类</h4>
<p><strong>消费者</strong>，后台执行任务进程，监控并从<code v-pre>Broker</code>中获取任务，并执行</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> asyncio
<span class="token keyword">import</span> logging
<span class="token keyword">import</span> sys
<span class="token keyword">import</span> time
<span class="token keyword">from</span> pathlib <span class="token keyword">import</span> Path

root_path <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">(</span>Path<span class="token punctuation">(</span>Path<span class="token punctuation">(</span>__file__<span class="token punctuation">)</span><span class="token punctuation">.</span>joinpath<span class="token punctuation">(</span><span class="token string">"../../.."</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>resolve<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
agent_path <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">(</span>Path<span class="token punctuation">(</span>Path<span class="token punctuation">(</span>__file__<span class="token punctuation">)</span><span class="token punctuation">.</span>joinpath<span class="token punctuation">(</span><span class="token string">"../../.."</span><span class="token punctuation">)</span><span class="token punctuation">.</span>joinpath<span class="token punctuation">(</span><span class="token string">"agent/proto"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>resolve<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
sys<span class="token punctuation">.</span>path<span class="token punctuation">.</span>insert<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> root_path<span class="token punctuation">)</span>
sys<span class="token punctuation">.</span>path<span class="token punctuation">.</span>insert<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> agent_path<span class="token punctuation">)</span>

<span class="token keyword">from</span> monitor<span class="token punctuation">.</span>async_task<span class="token punctuation">.</span>rpc_task <span class="token keyword">import</span> RpcTask
<span class="token keyword">from</span> dashboard<span class="token punctuation">.</span>db_model<span class="token punctuation">.</span>task <span class="token keyword">import</span> TaskInDB

logger <span class="token operator">=</span> logging<span class="token punctuation">.</span>getLogger<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">class</span> <span class="token class-name">Worker</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> task<span class="token punctuation">:</span> RpcTask<span class="token punctuation">,</span> max_workers<span class="token punctuation">:</span> <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>task <span class="token operator">=</span> task
        self<span class="token punctuation">.</span>task_queue <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>Queue<span class="token punctuation">(</span>maxsize<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span> loop<span class="token operator">=</span>asyncio<span class="token punctuation">.</span>get_event_loop<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment"># 异步队列</span>
        self<span class="token punctuation">.</span>pending_tasks <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        self<span class="token punctuation">.</span>max_workers <span class="token operator">=</span> max_workers  <span class="token comment"># 设置工作数量，默认起3个</span>

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">queue</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> task<span class="token punctuation">:</span> TaskInDB<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">await</span> self<span class="token punctuation">.</span>task_queue<span class="token punctuation">.</span>put<span class="token punctuation">(</span>task<span class="token punctuation">)</span>

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">dequeue</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token keyword">await</span> self<span class="token punctuation">.</span>task_queue<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">worker</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">""" 消费者：从队列中消费待执行任务，并将执行结果存入Backend中 """</span>
        <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
            <span class="token keyword">try</span><span class="token punctuation">:</span>
                task <span class="token operator">=</span> <span class="token keyword">await</span> self<span class="token punctuation">.</span>dequeue<span class="token punctuation">(</span><span class="token punctuation">)</span>
                task_id <span class="token operator">=</span> task<span class="token punctuation">.</span><span class="token builtin">id</span>
                task_args <span class="token operator">=</span> task<span class="token punctuation">.</span>task_params<span class="token punctuation">.</span><span class="token builtin">dict</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">"args"</span><span class="token punctuation">)</span>
                task_kwargs <span class="token operator">=</span> task<span class="token punctuation">.</span>task_params<span class="token punctuation">.</span><span class="token builtin">dict</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">"kwargs"</span><span class="token punctuation">)</span>
                <span class="token keyword">await</span> self<span class="token punctuation">.</span>task<span class="token punctuation">.</span>run<span class="token punctuation">(</span>task_id<span class="token punctuation">,</span> <span class="token operator">*</span>task_args<span class="token punctuation">,</span> <span class="token operator">**</span>task_kwargs<span class="token punctuation">)</span>
                self<span class="token punctuation">.</span>task_queue<span class="token punctuation">.</span>task_done<span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">except</span> Exception <span class="token keyword">as</span> why<span class="token punctuation">:</span>
                logger<span class="token punctuation">.</span>debug<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"Exception occurred during task execution: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">str</span><span class="token punctuation">(</span>why<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
                <span class="token keyword">raise</span>

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">start</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">""" 创建至少一个消费者去异步队列中获取任务并执行 """</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            <span class="token keyword">if</span> self<span class="token punctuation">.</span>max_workers <span class="token operator">&lt;=</span> <span class="token number">1</span><span class="token punctuation">:</span>
                self<span class="token punctuation">.</span>max_workers <span class="token operator">=</span> <span class="token number">1</span>

            <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>max_workers<span class="token punctuation">)</span><span class="token punctuation">:</span>
                self<span class="token punctuation">.</span>pending_tasks<span class="token punctuation">.</span>append<span class="token punctuation">(</span>asyncio<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>self<span class="token punctuation">.</span>worker<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f'worker-</span><span class="token interpolation"><span class="token punctuation">{</span>i<span class="token punctuation">}</span></span><span class="token string">'</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

            <span class="token comment"># Wait until the queue is fully processed.</span>
            <span class="token keyword">await</span> self<span class="token punctuation">.</span>task_queue<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>

            <span class="token comment"># Wait until all worker tasks are cancelled.</span>
            <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>gather<span class="token punctuation">(</span><span class="token operator">*</span>self<span class="token punctuation">.</span>pending_tasks<span class="token punctuation">,</span> return_exceptions<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
        <span class="token keyword">except</span> Exception <span class="token keyword">as</span> why<span class="token punctuation">:</span>
            logger<span class="token punctuation">.</span>debug<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"Exception occurred during task execution: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">str</span><span class="token punctuation">(</span>why<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>

            <span class="token comment"># Cancel our worker tasks.</span>
            <span class="token keyword">for</span> task <span class="token keyword">in</span> self<span class="token punctuation">.</span>pending_tasks<span class="token punctuation">:</span>
                task<span class="token punctuation">.</span>cancel<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    rpc_task <span class="token operator">=</span> RpcTask<span class="token punctuation">(</span><span class="token punctuation">)</span>
    worker <span class="token operator">=</span> Worker<span class="token punctuation">(</span>rpc_task<span class="token punctuation">)</span>
    <span class="token keyword">await</span> worker<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">'__main__'</span><span class="token punctuation">:</span>
    asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-backend-类" tabindex="-1"><a class="header-anchor" href="#_4-backend-类" aria-hidden="true">#</a> 4. Backend 类</h4>
<p>用来存任务执行的结果，同<code v-pre>Broker</code> 使用 <code v-pre>etcd</code> ，换成其他数据库也大同小异</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> asyncio
<span class="token keyword">import</span> json
<span class="token keyword">from</span> typing <span class="token keyword">import</span> List<span class="token punctuation">,</span> Optional

<span class="token keyword">from</span> aioetcd3<span class="token punctuation">.</span><span class="token builtin">help</span> <span class="token keyword">import</span> range_prefix

<span class="token keyword">from</span> dashboard <span class="token keyword">import</span> database
<span class="token keyword">from</span> dashboard<span class="token punctuation">.</span>db_model<span class="token punctuation">.</span>task <span class="token keyword">import</span> TaskInDB
<span class="token keyword">from</span> rook<span class="token punctuation">.</span>util <span class="token keyword">import</span> get_now_time


<span class="token keyword">class</span> <span class="token class-name">WatchScope</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> _iter<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>_iter <span class="token operator">=</span> _iter

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">__aenter__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            <span class="token keyword">await</span> self<span class="token punctuation">.</span>_iter<span class="token punctuation">.</span>__anext__<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">except</span> asyncio<span class="token punctuation">.</span>CancelledError<span class="token punctuation">:</span>
            <span class="token keyword">pass</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>_iter

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">__aexit__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> exc_type<span class="token punctuation">,</span> exc_val<span class="token punctuation">,</span> exc_tb<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            <span class="token keyword">await</span> self<span class="token punctuation">.</span>_iter<span class="token punctuation">.</span>aclose<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">except</span> GeneratorExit<span class="token punctuation">:</span>
            <span class="token keyword">pass</span>


<span class="token keyword">class</span> <span class="token class-name">Backend</span><span class="token punctuation">:</span>
    DB_CONFIG_KEY <span class="token operator">=</span> <span class="token string">"/ufs/monitor/task"</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>db_connection <span class="token operator">=</span> database<span class="token punctuation">.</span>get_db<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">get_task_by_id</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> task_id<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> Optional<span class="token punctuation">[</span>TaskInDB<span class="token punctuation">]</span><span class="token punctuation">:</span>
        task_key <span class="token operator">=</span> <span class="token string">"{}/{}"</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>DB_CONFIG_KEY<span class="token punctuation">,</span> task_id<span class="token punctuation">)</span>
        task_info <span class="token operator">=</span> <span class="token keyword">await</span> self<span class="token punctuation">.</span>db_connection<span class="token punctuation">.</span>get<span class="token punctuation">(</span>task_key<span class="token punctuation">)</span>
        <span class="token keyword">if</span> task_info<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
            task_in_db <span class="token operator">=</span> TaskInDB<span class="token punctuation">(</span><span class="token operator">**</span>json<span class="token punctuation">.</span>loads<span class="token punctuation">(</span>task_info<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> task_in_db
        <span class="token keyword">return</span> <span class="token boolean">None</span>

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">update</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> task_id<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        task_in_db <span class="token operator">=</span> <span class="token keyword">await</span> self<span class="token punctuation">.</span>get_task_by_id<span class="token punctuation">(</span>task_id<span class="token punctuation">)</span>
        <span class="token keyword">if</span> task_in_db<span class="token punctuation">:</span>
            db_key <span class="token operator">=</span> <span class="token string">"{}/{}"</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>DB_CONFIG_KEY<span class="token punctuation">,</span> task_id<span class="token punctuation">)</span>
            db_value <span class="token operator">=</span> task_in_db<span class="token punctuation">.</span><span class="token builtin">dict</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            db_value<span class="token punctuation">.</span>update<span class="token punctuation">(</span><span class="token builtin">dict</span><span class="token punctuation">(</span><span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">)</span>
            db_value<span class="token punctuation">[</span><span class="token string">"updated_at"</span><span class="token punctuation">]</span> <span class="token operator">=</span> get_now_time<span class="token punctuation">(</span><span class="token punctuation">)</span>
            db_value <span class="token operator">=</span> TaskInDB<span class="token punctuation">(</span><span class="token operator">**</span>db_value<span class="token punctuation">)</span><span class="token punctuation">.</span>json<span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">await</span> self<span class="token punctuation">.</span>db_connection<span class="token punctuation">.</span>put<span class="token punctuation">(</span>db_key<span class="token punctuation">,</span> db_value<span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token boolean">True</span>
        <span class="token keyword">return</span> <span class="token boolean">False</span>

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">remove</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> task_id<span class="token punctuation">)</span><span class="token punctuation">:</span>
        db_key <span class="token operator">=</span> <span class="token string">"{}/{}"</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>DB_CONFIG_KEY<span class="token punctuation">,</span> task_id<span class="token punctuation">)</span>
        <span class="token keyword">await</span> self<span class="token punctuation">.</span>db_connection<span class="token punctuation">.</span>delete<span class="token punctuation">(</span>db_key<span class="token punctuation">)</span>

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">get_tasks</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> List<span class="token punctuation">[</span>TaskInDB<span class="token punctuation">]</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">""" 获取所有异步任务 """</span>
        db_key <span class="token operator">=</span> <span class="token string">"{}"</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>DB_CONFIG_KEY<span class="token punctuation">)</span>
        db_value <span class="token operator">=</span> <span class="token keyword">await</span> self<span class="token punctuation">.</span>db_connection<span class="token punctuation">.</span><span class="token builtin">range</span><span class="token punctuation">(</span>range_prefix<span class="token punctuation">(</span>db_key<span class="token punctuation">)</span><span class="token punctuation">)</span>
        task_list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token keyword">for</span> v <span class="token keyword">in</span> db_value<span class="token punctuation">:</span>
            <span class="token keyword">if</span> v<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
                user_info <span class="token operator">=</span> json<span class="token punctuation">.</span>loads<span class="token punctuation">(</span>v<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
                task_list<span class="token punctuation">.</span>append<span class="token punctuation">(</span>TaskInDB<span class="token punctuation">(</span><span class="token operator">**</span>user_info<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> task_list

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">get_tasks_by_prefix</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> prefix<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> List<span class="token punctuation">[</span>TaskInDB<span class="token punctuation">]</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">""" 获取目标前缀的异步任务 """</span>
        db_key <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f"</span><span class="token interpolation"><span class="token punctuation">{</span>self<span class="token punctuation">.</span>DB_CONFIG_KEY<span class="token punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token punctuation">{</span>prefix<span class="token punctuation">}</span></span><span class="token string">"</span></span>
        db_value <span class="token operator">=</span> <span class="token keyword">await</span> self<span class="token punctuation">.</span>db_connection<span class="token punctuation">.</span><span class="token builtin">range</span><span class="token punctuation">(</span>range_prefix<span class="token punctuation">(</span>db_key<span class="token punctuation">)</span><span class="token punctuation">)</span>
        task_list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token keyword">for</span> v <span class="token keyword">in</span> db_value<span class="token punctuation">:</span>
            <span class="token keyword">if</span> v<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
                user_info <span class="token operator">=</span> json<span class="token punctuation">.</span>loads<span class="token punctuation">(</span>v<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
                task_list<span class="token punctuation">.</span>append<span class="token punctuation">(</span>TaskInDB<span class="token punctuation">(</span><span class="token operator">**</span>user_info<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> task_list

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">watch_tasks_by_prefix</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> prefix<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">""" 获取目标前缀的异步任务 """</span>
        db_key <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f"</span><span class="token interpolation"><span class="token punctuation">{</span>self<span class="token punctuation">.</span>DB_CONFIG_KEY<span class="token punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token punctuation">{</span>prefix<span class="token punctuation">}</span></span><span class="token string">"</span></span>

        <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">watch_scope</span><span class="token punctuation">(</span>watch<span class="token punctuation">,</span> key_range<span class="token punctuation">,</span> start_revision<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> noput<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">,</span> nodelete<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">,</span> prev_kv<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">,</span>
                              always_reconnect<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">,</span> ignore_compact<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">,</span> batch_events<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">return</span> WatchScope<span class="token punctuation">(</span>watch<span class="token punctuation">(</span>key_range<span class="token punctuation">,</span> start_revision<span class="token operator">=</span>start_revision<span class="token punctuation">,</span>
                                    noput<span class="token operator">=</span>noput<span class="token punctuation">,</span> nodelete<span class="token operator">=</span>nodelete<span class="token punctuation">,</span> prev_kv<span class="token operator">=</span>prev_kv<span class="token punctuation">,</span> create_event<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span>
                                    always_reconnect<span class="token operator">=</span>always_reconnect<span class="token punctuation">,</span> ignore_compact<span class="token operator">=</span>ignore_compact<span class="token punctuation">,</span>
                                    batch_events<span class="token operator">=</span>batch_events<span class="token punctuation">)</span><span class="token punctuation">)</span>

        <span class="token keyword">return</span> <span class="token keyword">await</span> watch_scope<span class="token punctuation">(</span>self<span class="token punctuation">.</span>db_connection<span class="token punctuation">.</span>watch<span class="token punctuation">,</span> range_prefix<span class="token punctuation">(</span>db_key<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-派生任务" tabindex="-1"><a class="header-anchor" href="#_5-派生任务" aria-hidden="true">#</a> 5.派生任务</h4>
<p>异步派生任务通过继承 <code v-pre>BaseTask</code> 并重写其 <code v-pre>run()</code> 方法来</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_6-beat-类" tabindex="-1"><a class="header-anchor" href="#_6-beat-类" aria-hidden="true">#</a> 6.Beat 类</h4>
<p><strong>定时调度器</strong>，由于定时规则、调度规则等未定，因此最后实现</p>
</div></template>


