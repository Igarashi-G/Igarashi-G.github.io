<template><div><p><strong>Golang</strong> 数据结构，栈与队列相关</p>
<!-- more -->
<h1 id="_1-栈" tabindex="-1"><a class="header-anchor" href="#_1-栈" aria-hidden="true">#</a> 1. 栈</h1>
<p><strong>栈</strong>（<em>stack</em>）：一种 <strong>后进先出</strong>（<em>LIFO</em>）的有序集合，是在操作上受限的线性表，新添加的或者待删除的元素都保存在栈顶，在栈里，新元素靠近栈顶，旧元素都接近栈底</p>
<blockquote>
<p>注意：任何不在栈顶的元素都无法访问，为了得到栈底的元素，必须先拿掉上面的元素</p>
</blockquote>
<p>栈内部的线性 <strong>表尾端叫做栈顶</strong> （<em>top</em>），<strong>表头称为栈底</strong>（<em>bottom</em>），不含元素的栈称为空栈
栈的插入操作，常称为压栈或者入栈，栈的删除操作常称为出栈或者弹栈</p>
<p>栈和线性表一样，具备两种存储方式：</p>
<ul>
<li><strong>顺序栈</strong>：顺序方式存储</li>
<li><strong>链式栈</strong>：链式存储</li>
</ul>
<h2 id="_1-1-栈的存储结构" tabindex="-1"><a class="header-anchor" href="#_1-1-栈的存储结构" aria-hidden="true">#</a> 1.1 栈的存储结构</h2>
<h3 id="顺序栈" tabindex="-1"><a class="header-anchor" href="#顺序栈" aria-hidden="true">#</a> 顺序栈</h3>
<p>利用一组 <strong>地址连续的存储单元</strong> 依次存放自栈底到栈顶的数据元素，同时指定 <strong>top</strong> 指针指向栈顶元素位置</p>
<p>如图所示：</p>
<img src="@source/go/算法与数据结构/img/顺序栈.svg">
<p>通常做法是 <code v-pre>top = 0</code> 表示空栈，下标从 <code v-pre>0</code> 开始。如果设定了栈底指针 <code v-pre>base</code> ，那么 <code v-pre>top = base</code> 则记为空栈</p>
<p>初始化时不推荐限定栈的最大容量，应该先分配基本容量，在使用过程中，如果栈的空间不够大，再逐渐扩大，但为简单起见，不做扩大容量的设计</p>
<p>插入新元素时，<strong>top</strong> 指针 <strong>+1</strong>，删除时 <strong>-1</strong></p>
<h3 id="链式栈" tabindex="-1"><a class="header-anchor" href="#链式栈" aria-hidden="true">#</a> 链式栈</h3>
<p><strong>使用链表来实现的栈</strong>，由于是链式存储，链栈基本不存在栈满的情况，除非内存不足！链栈为空其实就是 <code v-pre>top</code> 为空的时候</p>
<p>我们一般认为向链表中添加元素的操作直接往末尾添加即可，但是在栈中其实有更巧妙的操作，如下所示：<br>
<img src="@source/go/算法与数据结构/img/链式栈.svg"></p>
<h2 id="_1-2-共享空间栈" tabindex="-1"><a class="header-anchor" href="#_1-2-共享空间栈" aria-hidden="true">#</a> 1.2 共享空间栈</h2>
<p>栈的顺序存储结构只允许栈顶进出元素，不存在线性表中插入、删除数据时需要移动数据的问题，但是 <strong>必须预设一个数组的存储空间</strong></p>
<p>虽然 <strong>Golang</strong> 的切片的容量是动态的，但是变更容量带来的内存拷贝消耗也是可观的，如果数组容量过大，又容易出现利用率不足问题</p>
<p>对于两个相同类型的栈，可以通过一个数组来最大限度的利用已经开辟好的空间来进行操作</p>
<p><strong>设计思路</strong>：数组有两个端点， 两个栈有两个栈底， 让一个栈的栈底为数组的始端， 即下标为 <strong>0</strong> 处，另一个栈为数组的末端，即下标为 数组容量 <strong>cap - 1</strong> 处，这样， 两个栈如果增加元素， 就是两端点向中间延伸，（<em>即两个栈在数组的两端，向中间靠拢</em>），<strong>top1</strong> 和 <strong>top2</strong> 是栈顶指针，只要他们不见面，两个栈就可以一直使用</p>
<p>一些边界情况:</p>
<ul>
<li>栈 <strong>1</strong> 为空，即 <code v-pre>top1 = -1</code></li>
<li>栈 <strong>2</strong> 为空，即 <code v-pre>top2 = cap</code></li>
<li>栈 <strong>1</strong> 满，即 <code v-pre>top1 = cap-1</code>，且 栈 <strong>2</strong> 为空</li>
<li>栈 <strong>2</strong> 满，即 <code v-pre>top2 = 0</code>，且栈 <strong>1</strong> 为空</li>
<li>栈满，即 <code v-pre>top+1 == top2</code>，也即两个栈见面，两个指针之间相差 <strong>1</strong></li>
</ul>
<blockquote>
<p>注意：两栈共享空间的数据结构，通常用于两栈空间需求相反（<em>此消彼长</em>），且数据类型一致！！！</p>
</blockquote>
<p>数据结构如图所示：
<img src="@source/go/算法与数据结构/img/共享空间栈.svg"></p>
</div></template>


