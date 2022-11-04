<template><div><h1 id="快速指引" tabindex="-1"><a class="header-anchor" href="#快速指引" aria-hidden="true">#</a> 快速指引</h1>
<p><a href="http://cn.linux.vbird.org/linux_basic/linux_basic.php" target="_blank" rel="noopener noreferrer">鸟哥私房菜<ExternalLinkIcon/></a></p>
<h3 id="_1-认识计算机" tabindex="-1"><a class="header-anchor" href="#_1-认识计算机" aria-hidden="true">#</a> 1. 认识计算机</h3>
<p><a href="/unix-like/%E7%A1%AC%E4%BB%B6%E5%9F%BA%E7%A1%80/cpu/cpu">计算机硬件基础</a></p>
<h3 id="_2-数据表示方式" tabindex="-1"><a class="header-anchor" href="#_2-数据表示方式" aria-hidden="true">#</a> 2. 数据表示方式</h3>
<p><a href="/back_end/python/base/%E5%88%9D%E8%AF%86/%E5%AD%97%E7%AC%A6%E7%BC%96%E7%A0%81">字符编码 (Python)</a></p>
<p><a href="/soul/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BB%84%E6%88%90%E5%8E%9F%E7%90%86/%E8%A7%A3%E6%9E%84cpu">进制&amp;编码与通信 (CPU 解构)</a></p>
<h3 id="_3-计算机上面常用的计算单位" tabindex="-1"><a class="header-anchor" href="#_3-计算机上面常用的计算单位" aria-hidden="true">#</a> 3. 计算机上面常用的计算单位</h3>
<h5 id="容量单位" tabindex="-1"><a class="header-anchor" href="#容量单位" aria-hidden="true">#</a> <strong>容量单位：</strong></h5>
<p>计算机用高低电平来模拟 0/1，使用的最小单位是 <strong>位(bit)</strong></p>
<blockquote>
<p><code v-pre>1 Byte = 8 bits</code> 即：1 字节 等于 8 位</p>
</blockquote>
<table>
<thead>
<tr>
<th style="text-align:center">进位制</th>
<th style="text-align:center">K</th>
<th style="text-align:center">M</th>
<th style="text-align:center">G</th>
<th style="text-align:center">T</th>
<th style="text-align:center">P</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">二进位</td>
<td style="text-align:center">1024</td>
<td style="text-align:center">1024K</td>
<td style="text-align:center">1024M</td>
<td style="text-align:center">1024G</td>
<td style="text-align:center">1024T</td>
</tr>
<tr>
<td style="text-align:center">十进位</td>
<td style="text-align:center">1000</td>
<td style="text-align:center">1000K</td>
<td style="text-align:center">1000M</td>
<td style="text-align:center">1000G</td>
<td style="text-align:center">1000T</td>
</tr>
</tbody>
</table>
<h5 id="速度单位" tabindex="-1"><a class="header-anchor" href="#速度单位" aria-hidden="true">#</a> <strong>速度单位：</strong></h5>
<p><code v-pre>CPU</code> 的运算速度常使用 <strong>MHz</strong> 或者是 <strong>GHz</strong> 之类的单位，这个 <strong>Hz</strong> 其实就是秒分之一。</p>
<p>由於网络也使用 <strong>bit</strong> 为单位，因此网络常使用的单位为 <strong>Mbps</strong> 是 <em>Mbits per second</em> 指每秒多少 <strong>Mbit</strong></p>
<Alert type="error">常听到的 **100M** 百兆宽带，其实理论最大传输值为：**12.5Mbyte/s** 的下载容量（除 8 位）</Alert><h3 id="_4-软件程序运行" tabindex="-1"><a class="header-anchor" href="#_4-软件程序运行" aria-hidden="true">#</a> 4. 软件程序运行</h3>
<p>电脑系统将软件分为两大类：一类是 <code v-pre>系统软件</code>，另一类是 <code v-pre>应用程序</code></p>
<h4 id="_4-1-机器语言程序和编译性程序" tabindex="-1"><a class="header-anchor" href="#_4-1-机器语言程序和编译性程序" aria-hidden="true">#</a> 4.1 机器语言程序和编译性程序</h4>
<h5 id="_4-1-1-机器语言程序" tabindex="-1"><a class="header-anchor" href="#_4-1-1-机器语言程序" aria-hidden="true">#</a> 4.1.1 机器语言程序</h5>
<ul>
<li><strong>需要了解机器语言</strong>：因为机器只认识 0 和 1</li>
<li><strong>需要了解所有硬件的相关功能函数</strong>：针对不同硬件提供的函数去开发调用</li>
<li><strong>程序不具有可移植性</strong>：每个 CPU 都有指令集，因此针对 A/B 两个电脑 的程序，无法移植运行</li>
<li><strong>程序具有专一性</strong>：针对硬件编写，开发新功能都要重头再来</li>
</ul>
<blockquote>
<p>因此为了解决重复编写句柄的问题，就诞生了编译器</p>
</blockquote>
<h5 id="_4-1-2-编译性程序" tabindex="-1"><a class="header-anchor" href="#_4-1-2-编译性程序" aria-hidden="true">#</a> 4.1.2 编译性程序</h5>
<p>常见的编译器有<code v-pre>C</code>、<code v-pre>C++</code>、<code v-pre>JAVA</code> 等，它们通过一定的语法规则，将高级语言编写的程序，转为机器语言给机器理解</p>
<p>详情谷歌： <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">编译原理<ExternalLinkIcon/></a></p>
<h4 id="_4-2-操作系统" tabindex="-1"><a class="header-anchor" href="#_4-2-操作系统" aria-hidden="true">#</a> 4.2 操作系统</h4>
<Alert type="info">为了解决硬件方面每次重复编写句柄问题，所以诞生了 **操作系统（Operating System， OS）**</Alert><p>操作系统也是程序，该程序重点用于 <strong>管理电脑所有活动</strong> 以及 <strong>驱动系统中的所有硬件</strong></p>
<h5 id="_4-2-1-内核-kernel" tabindex="-1"><a class="header-anchor" href="#_4-2-1-内核-kernel" aria-hidden="true">#</a> <strong>4.2.1 内核（Kernel）</strong></h5>
<p>让 CPU 计算、内存能加载程序、硬盘可存取、网卡传数据、外置设备运作等，这些功能就需要 <strong>内核</strong> 来完成（管理硬件的）。</p>
<blockquote>
<p>内核管理的操作都很重要，若用户直接和内核打交道，一旦内核被停止、破坏，整个系统就会崩溃。因此 <strong>内核程序一启动就会常驻内存，且在内存中的区块会受到保护</strong>。</p>
</blockquote>
<p><strong>4.2.2 系统调用（System Call）</strong></p>
<p>若系统只有内核的话，用户此时无法操作，此时则需要开发软件让用户使用。开发软件又需要参考内核相关功能，很麻烦，因此操作系统会提供 <strong>接口(Application Programming Interface，API）</strong> 给程序员使用。这就是 <strong>系统调用层</strong> 。程序员只要遵循公认的系统调用参数，软件就能在内核上运行。</p>
<p><strong>因此</strong>：<Badge type="orange">操作系统</Badge> = <Badge type="error">内核</Badge> + <Badge type="queen">提供的 API </Badge></p>
<p><strong>4.2.3 内核功能</strong></p>
<ul>
<li><a href="">系统调用接口（System call）</a></li>
<li><a href="">进程管理（Process control）</a></li>
<li><a href="">内存管理（Memory management）</a></li>
<li><a href="">文件系统（Filesystem management）</a></li>
<li><a href="">设备驱动（Device drivers）</a></li>
</ul>
<p><strong>4.2.4 驱动</strong></p>
<blockquote>
<p>驱动程序应该由 <strong>硬件厂商提供</strong>，厂商去参考操作系统上驱动程序的 <strong>API</strong> 开发，并将驱动程序和硬件一起销售给用户</p>
</blockquote>
<p>硬件是可持续进步的，那么操作系统要支持未来的显卡，则会提供 API 给厂商参考，厂商去适配后开发适当的驱动程序，提供给用户安装</p>
<h4 id="_4-3-应用程序" tabindex="-1"><a class="header-anchor" href="#_4-3-应用程序" aria-hidden="true">#</a> 4.3 应用程序</h4>
<p>是指参考操作系统提供的 API 所开发出来的软件，这些软件可以让用户操作，以实现某些功能。</p>
<ul>
<li>如浏览器是给用户浏览网页的</li>
<li>PS 是给用户处理图像的</li>
<li>应用程序与操作系统有关，故程序需要适配不同的主流系统</li>
</ul>
</div></template>


