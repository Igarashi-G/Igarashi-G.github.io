<template><div><h1 id="asyncio-recipes" tabindex="-1"><a class="header-anchor" href="#asyncio-recipes" aria-hidden="true">#</a> asyncio Recipes</h1>
<pre><code>————————A Problem-Solution Approach
</code></pre>
<h2 id="working-with-event-loops" tabindex="-1"><a class="header-anchor" href="#working-with-event-loops" aria-hidden="true">#</a> Working with Event Loops</h2>
<h3 id="一、处理事件循环" tabindex="-1"><a class="header-anchor" href="#一、处理事件循环" aria-hidden="true">#</a> 一、处理事件循环</h3>
<h4 id="_1-定位事件循环问题" tabindex="-1"><a class="header-anchor" href="#_1-定位事件循环问题" aria-hidden="true">#</a> 1.定位事件循环问题</h4>
<p>并发框架必须能够告诉您事件循环当前是否正在运行，以及它是哪个是。</p>
<p>例如：你写的代码中应该断言只有一个循环在执行任务。因此只有一项任务可以更改某些共享资源或确保回调派遣。</p>
<h4 id="_2-创建新循环实例问题" tabindex="-1"><a class="header-anchor" href="#_2-创建新循环实例问题" aria-hidden="true">#</a> 2.创建新循环实例问题：</h4>
<p>get_event_loop API 只实例化从主线程调用的循环。 不要使用任何方便包装来创建循环并自己存储它，如所示。 这肯定是 在任何线程上 ORK，并使循环的创建无副作用（除了异步的全局创建之外）。 默认循环策略</p>
</div></template>


