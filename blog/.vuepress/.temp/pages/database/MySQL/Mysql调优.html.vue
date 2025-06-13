<template><div><h1 id="mysql-机制详解" tabindex="-1"><a class="header-anchor" href="#mysql-机制详解"><span>MYSQL 机制详解</span></a></h1>
<h4 id="mysql-执行查询的过程" tabindex="-1"><a class="header-anchor" href="#mysql-执行查询的过程"><span>MySQL 执行查询的过程</span></a></h4>
<ol>
<li>客户端通过 TCP 连接发送连接请求到 MySQL 连接器，连接器会对该请求进行权限验证及连接资源分配</li>
<li>查缓存。（当判断缓存是否命中时，MySQL 不会进行解析查询语句，而是直接使用 SQL 语句和客户端发送过来的其他原始信息。所以，任何字符上的不同，例如空格、注解等都会导致缓存的不命中。）</li>
<li>语法分析（SQL 语法是否写错了）。 如何把语句给到预处理器，检查数据表和数据列是否存在，解析别名看是否存在歧义。</li>
<li>优化。是否使用索引，生成执行计划。</li>
<li>交给执行器，将数据保存到结果集中，同时会逐步将数据缓存到查询缓存中，最终将结果集返回给客户端。</li>
</ol>
<p><img src="@source/database/MySQL/img/image-20250611115432780.png" alt="image-20250611115432780"></p>
<p>引擎：</p>
<ul>
<li><strong>InnoDB：</strong> 插入时按主键排序插入（最常用） -- 聚集</li>
<li><strong>MYISAM：</strong> 按照插入时顺序插入 -- 堆表（数据堆在一起）</li>
</ul>
<h2 id="一、innodb-存储结构" tabindex="-1"><a class="header-anchor" href="#一、innodb-存储结构"><span>一、InnoDB 存储结构</span></a></h2>
<h3 id="_1-页存储机制" tabindex="-1"><a class="header-anchor" href="#_1-页存储机制"><span>1. 页存储机制</span></a></h3>
<ul>
<li><strong>操作系统内存页</strong>：4KB</li>
<li><strong>InnoDB页大小</strong>：默认16KB (<code v-pre>innodb_page_size = 16384</code>)</li>
</ul>
<h4 id="页结构组成" tabindex="-1"><a class="header-anchor" href="#页结构组成"><span>页结构组成：</span></a></h4>
<div class="language-markdown line-numbers-mode" data-highlighter="shiki" data-ext="markdown" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">File Header</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">Page Header</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">Infimum + Supremum Records</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">User Records</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">Free Space</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">Page Directory</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">File Trailer</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-innodb行格式" tabindex="-1"><a class="header-anchor" href="#_2-innodb行格式"><span>2. InnoDB行格式</span></a></h3>
<table>
<thead>
<tr>
<th style="text-align:center">行格式</th>
<th style="text-align:center">特点</th>
<th style="text-align:center">适用场景</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Compact</td>
<td style="text-align:center">变长字段长度列表 + NULL标志位 + 记录头信息 + 列数据</td>
<td style="text-align:center">常规使用</td>
</tr>
<tr>
<td style="text-align:center">Redundant</td>
<td style="text-align:center">兼容老版本</td>
<td style="text-align:center">历史遗留系统</td>
</tr>
<tr>
<td style="text-align:center">Dynamic</td>
<td style="text-align:center">行溢出数据全部存储到其他页面，只保留地址</td>
<td style="text-align:center">大字段数据</td>
</tr>
<tr>
<td style="text-align:center">Compressed</td>
<td style="text-align:center">在Dynamic基础上增加页面压缩</td>
<td style="text-align:center">存储敏感场景</td>
</tr>
</tbody>
</table>
<p><strong>设置语法</strong>：</p>
<div class="language-sql line-numbers-mode" data-highlighter="shiki" data-ext="sql" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">CREATE</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> TABLE</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> 表名</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (列信息) ROW_FORMAT</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">行格式名称;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">ALTER</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> TABLE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 表名 ROW_FORMAT</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">行格式名称;</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-行存储特性" tabindex="-1"><a class="header-anchor" href="#_3-行存储特性"><span>3. 行存储特性</span></a></h3>
<ul>
<li><strong>行大小限制</strong>：非BLOB字段最大65535字节</li>
<li><strong>隐藏列</strong>：
<ul>
<li><code v-pre>DB_ROW_ID</code>(6B)：无主键时自动生成</li>
<li><code v-pre>DB_TRX_ID</code>(7B)：事务ID</li>
<li><code v-pre>DB_ROLL_PTR</code>(7B)：回滚指针</li>
</ul>
</li>
<li><strong>行溢出处理</strong>：
<ul>
<li>方式1：当前页存部分数据+下一页地址</li>
<li>方式2：只存起始页和末尾页地址（与索引相关）</li>
</ul>
</li>
</ul>
<h2 id="二、索引机制" tabindex="-1"><a class="header-anchor" href="#二、索引机制"><span>二、索引机制</span></a></h2>
<h3 id="_1-b-树索引结构" tabindex="-1"><a class="header-anchor" href="#_1-b-树索引结构"><span>1. B+树索引结构</span></a></h3>
<div class="language-markdown line-numbers-mode" data-highlighter="shiki" data-ext="markdown" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">根节点(非叶子节点)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  ↓</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">中间节点(非叶子节点，存储主键+指针)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  ↓</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">叶子节点(存储实际数据)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>特点</strong>：</p>
<ul>
<li>非叶子节点仅存储键值和指针</li>
<li>叶子节点形成有序链表，支持高效范围查询</li>
<li>每个节点可存储多个元素（相比二叉树高度更低）</li>
</ul>
<h3 id="_2-索引存储计算" tabindex="-1"><a class="header-anchor" href="#_2-索引存储计算"><span>2. 索引存储计算</span></a></h3>
<ul>
<li>假设主键为BIGINT(8B)，指针6B</li>
<li>单页可存储键值对：16KB/(8+6) ≈ 1170</li>
<li>高度为3的B+树可存储：1170×1170×16 ≈ 2千万条记录</li>
</ul>
<h3 id="_3-索引使用原则" tabindex="-1"><a class="header-anchor" href="#_3-索引使用原则"><span>3. 索引使用原则</span></a></h3>
<h4 id="辅助索引-二级索引" tabindex="-1"><a class="header-anchor" href="#辅助索引-二级索引"><span>辅助索引（二级索引）</span></a></h4>
<ul>
<li>额外构建B+树，叶子节点存储主键值</li>
<li>查询流程：辅助索引→主键索引→数据（回表）</li>
</ul>
<h4 id="最左前缀原则" tabindex="-1"><a class="header-anchor" href="#最左前缀原则"><span>最左前缀原则</span></a></h4>
<ul>
<li>
<p>联合索引(b,c,d)只能匹配：</p>
<ul>
<li><code v-pre>WHERE b=1 AND c=1 AND d=1</code>（完全匹配）</li>
<li><code v-pre>WHERE b=1 AND c=1</code>（部分匹配）</li>
<li><code v-pre>WHERE b LIKE '101%'</code>（前缀匹配）</li>
</ul>
<p>不匹配：</p>
<ul>
<li><code v-pre>WHERE c=1 AND d=1</code></li>
<li><code v-pre>WHERE b LIKE '%101%'</code></li>
</ul>
</li>
</ul>
<h4 id="索引优化技巧" tabindex="-1"><a class="header-anchor" href="#索引优化技巧"><span>索引优化技巧</span></a></h4>
<ul>
<li>后缀匹配优化：<code v-pre>LIKE '%com'</code> → 存储逆序<code v-pre>moc%</code></li>
<li>NULL值在索引中视为最小值</li>
<li>相同值的非唯一索引会附加主键值</li>
</ul>
<h3 id="" tabindex="-1"><a class="header-anchor" href="#"><span></span></a></h3>
<p><strong>页目录：</strong> 本质是树，即用一个页 利用二分法进行来记录各数据的地址，每一页会有主键，并把主键提出来作为索引部分</p>
<div class="language-text line-numbers-mode" data-highlighter="shiki" data-ext="text" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>              页号100                       页号200</span></span>
<span class="line"><span>            1 ->  1111a                   5 -> 5555e</span></span>
<span class="line"><span>                  2222b       ->               6666f</span></span>
<span class="line"><span>            3 ->  3333c...                7 -> 7777g ...</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>目录页:</strong><br>
额外提出一个页，用来存储页号，但每一页的页号可不是相邻的，反而会再用一个 key-value 去存储页号</p>
<pre><code>                1                          5            --  主键
               100                        200           --  指针
                |                          |
             页号100                    页号200          --  指针指向的行数据
</code></pre>
<ul>
<li>**key：**每页中最小的值， 利用主键都是递增顺序排列</li>
<li>**value：**对应的页号</li>
</ul>
<p>因此就是一个B+树结构(根节点的元素总会留一个在叶子节点上) 一个节点也可以存多个元素</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>                                 0003 0005</span></span>
<span class="line"><span>             |                       |                         |</span></span>
<span class="line"><span>           0002                    0004                       0005</span></span>
<span class="line"><span>        |         |           |            |              |            |</span></span>
<span class="line"><span>    0001   ->    0002   ->   0003    ->   0004   ->    0005    ->    0006 0007</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>叶子节点：存数据</span></span>
<span class="line"><span>    非叶子节点：存主键 + 指针</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    所以插入索引的过程中是生成B+树的过程，这就是为什么有序的原因，是存在了B+树的叶子节点里</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    注：</span></span>
<span class="line"><span>        1.主键ID不适合太长，若过于长的话一页放不下，再会将树的高度拉长，树的高度越高，查找速度就会下降</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        2.mysql 创建过程略微不同，他是当执行创建表命令时，就会创建一个页，当一个页装不下后，不是在创建第二个页，</span></span>
<span class="line"><span>          而是将第一个页copy一份，创建第二个页，再将之前的第一页改为目录页</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        3.B+树的优势，相比于AVL树（二叉） B+树的优势在于一个节点可以存多个元素，因此会比AVL树高度要低，因此查找</span></span>
<span class="line"><span>          时的执行效率要低。虽然数据冗余了，查找 = 等于的条件不明显，但查找> &#x3C; 条件时则不同</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          例如： 查 > 0002 的数据，可以直接利用索引（0002后的链表指针）提取所有数据，而AVL树要先找出右子树</span></span>
<span class="line"><span>                的节点，之后还要回归父节点，层层遍历  （SQL范围查询）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          据说 B+树高度等于2 的时候，大约可存 20000多条数据， B+树高度等于3 的时候， 可以存 2千万多条数据</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          假设推算：主键用bigint类型 占8字节 指针占6个字节 因此在一页中，可以存多少个非叶子节点</span></span>
<span class="line"><span>                   16kb/(8+6)=1170.28... 可以存1170对 键值对（代表下面有多少个叶子节点）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                   此时假设一行数据为1KB，一页存16条数据，那么高度为2的情况下 可存 1170 * 16 = 18724 条数据</span></span>
<span class="line"><span>                   因此用B+树找最多找两次就能在2千多万条数据中找到那个页</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="基本结构" tabindex="-1"><a class="header-anchor" href="#基本结构"><span>基本结构</span></a></h4>
<ul>
<li><strong>本质</strong>：一种优化页内数据查找的二分搜索结构</li>
<li><strong>位置</strong>：位于每个数据页的尾部（Page Directory区域）</li>
<li><strong>组成：</strong>
<ul>
<li>槽位（Slots）：存储每组记录的最大主键值</li>
<li>指针：指向对应记录组的起始位置</li>
</ul>
</li>
</ul>
<h4 id="工作流程" tabindex="-1"><a class="header-anchor" href="#工作流程"><span>工作流程</span></a></h4>
<div class="language-markdown line-numbers-mode" data-highlighter="shiki" data-ext="markdown" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">数据页内部结构：</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">+---------------------+</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| 记录1 (ID=1)        |</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| 记录2 (ID=3)        |</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| 记录3 (ID=5)        |</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| ...                 |</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">+---------------------+</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| 页目录              |</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| Slot1: ID=5 -> 记录3 |</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| Slot2: ID=3 -> 记录2 |</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| Slot3: ID=1 -> 记录1 |</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">+---------------------+</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查找过程-以查找id-4为例" tabindex="-1"><a class="header-anchor" href="#查找过程-以查找id-4为例"><span>查找过程（以查找ID=4为例）：</span></a></h4>
<ol>
<li>通过二分查找确定ID=4位于Slot1(ID=5)和Slot2(ID=3)之间</li>
<li>根据指针定位到记录组（记录2到记录3之间）</li>
<li>在组内线性查找目标记录</li>
</ol>
<h3 id="_2-b-树索引的完整结构" tabindex="-1"><a class="header-anchor" href="#_2-b-树索引的完整结构"><span>2. B+树索引的完整结构</span></a></h3>
<h4 id="层级关系示例" tabindex="-1"><a class="header-anchor" href="#层级关系示例"><span>层级关系示例</span></a></h4>
<div class="language-markdown line-numbers-mode" data-highlighter="shiki" data-ext="markdown" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">根节点（页号300）</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">+---------------+</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| 键值: 5       | → 指向页200</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| 键值: 10      | → 指向页250</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">+---------------+</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">       ↓</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">中间节点（页200）        中间节点（页250）</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">+---------------+       +---------------+</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| 键值: 3       | →     | 键值: 7      | →</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| 键值: 5       | →     | 键值: 10     | →</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">+---------------+       +---------------+</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">       ↓                       ↓</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">叶子节点（页100）      叶子节点（页150）      叶子节点（页300）</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">+---------------+       +---------------+       +---------------+</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| 1 → 记录A     |       | 5 → 记录E     |       | 10 → 记录J    |</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| 2 → 记录B     |       | 6 → 记录F     |       | 11 → 记录K    |</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| 3 → 记录C     |       | 7 → 记录G     |       | ...           |</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">+---------------+       +---------------+       +---------------+</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="关键特性" tabindex="-1"><a class="header-anchor" href="#关键特性"><span>关键特性</span></a></h4>
<ol>
<li>
<p><strong>双向链表连接</strong>：所有叶子节点通过指针形成双向链表，支持高效范围查询</p>
<div class="language-markdown line-numbers-mode" data-highlighter="shiki" data-ext="markdown" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">页100 → 页150 → 页300 → ...</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p><strong>填充因子</strong>：每个节点通常填充15/16的空间（约93.75%）</p>
</li>
<li>
<p><strong>分裂规则</strong>：</p>
<ul>
<li>当页满时发生分裂</li>
<li>中间键值会上提到父节点</li>
<li>示例：页150满时分裂为页150和页155，键值7上提到父节点</li>
</ul>
</li>
</ol>
<h3 id="_3-索引操作示例" tabindex="-1"><a class="header-anchor" href="#_3-索引操作示例"><span>3. 索引操作示例</span></a></h3>
<h4 id="查找id-6的记录" tabindex="-1"><a class="header-anchor" href="#查找id-6的记录"><span>查找ID=6的记录</span></a></h4>
<ol>
<li>从根节点（页300）开始：
<ul>
<li>6 &lt; 10 → 选择左分支（页200）</li>
</ul>
</li>
<li>在页200中：
<ul>
<li>3 &lt; 6 ≤ 5 → 选择页150</li>
</ul>
</li>
<li>在页150中线性查找找到ID=6的记录F</li>
</ol>
<h4 id="范围查询id-between-4-and-8" tabindex="-1"><a class="header-anchor" href="#范围查询id-between-4-and-8"><span>范围查询ID BETWEEN 4 AND 8</span></a></h4>
<ol>
<li>定位到ID=4的起始位置（页150）</li>
<li>沿叶子节点链表扫描：
<ul>
<li>页150：5(E), 6(F), 7(G)</li>
<li>页300：...（直到ID&gt;8停止）</li>
</ul>
</li>
</ol>
<h3 id="_4-与哈希索引的区别" tabindex="-1"><a class="header-anchor" href="#_4-与哈希索引的区别"><span>4. 与哈希索引的区别</span></a></h3>
<table>
<thead>
<tr>
<th style="text-align:center">特性</th>
<th style="text-align:center">B+树索引</th>
<th style="text-align:center">哈希索引</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">查询类型支持</td>
<td style="text-align:center">等值、范围、排序</td>
<td style="text-align:center">仅等值查询</td>
</tr>
<tr>
<td style="text-align:center">磁盘I/O效率</td>
<td style="text-align:center">高（顺序访问）</td>
<td style="text-align:center">随机访问</td>
</tr>
<tr>
<td style="text-align:center">内存利用率</td>
<td style="text-align:center">高（节点可缓存）</td>
<td style="text-align:center">依赖哈希表大小</td>
</tr>
<tr>
<td style="text-align:center">适合场景</td>
<td style="text-align:center">OLTP/OLAP</td>
<td style="text-align:center">内存表/缓存</td>
</tr>
</tbody>
</table>
<h3 id="_5-实际优化案例" tabindex="-1"><a class="header-anchor" href="#_5-实际优化案例"><span>5. 实际优化案例</span></a></h3>
<p><strong>问题</strong>：某电商平台商品表查询缓慢</p>
<p><strong>解决方案</strong>：</p>
<div class="language-sql line-numbers-mode" data-highlighter="shiki" data-ext="sql" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">-- 原结构</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">CREATE</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> TABLE</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> products</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    id </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">BIGINT</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> PRIMARY KEY</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    name</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> VARCHAR</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">100</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    category_id </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">INT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    price </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">DECIMAL</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">10</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">-- 优化方案</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">ALTER</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> TABLE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> products </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">ADD</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> INDEX</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> idx_category_price (category_id, price),</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">ADD</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> INDEX</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> idx_name (</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">-- 查询优化</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">SELECT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> * </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">FROM</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> products </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">WHERE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> category_id </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 5</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">ORDER BY</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> price </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">DESC</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">LIMIT</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 20</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">-- 现在可以利用联合索引直接定位</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>效果</strong>：</p>
<ul>
<li>查询时间从1200ms降至15ms</li>
<li>磁盘I/O减少80%</li>
<li>内存缓存命中率提升至95%</li>
</ul>
<h2 id="三、事务机制" tabindex="-1"><a class="header-anchor" href="#三、事务机制"><span>三、事务机制</span></a></h2>
<h3 id="_1-acid特性" tabindex="-1"><a class="header-anchor" href="#_1-acid特性"><span>1. ACID特性</span></a></h3>
<table>
<thead>
<tr>
<th style="text-align:center">特性</th>
<th style="text-align:center">保证机制</th>
<th style="text-align:center">实现原理</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">原子性</td>
<td style="text-align:center">Undo Log</td>
<td style="text-align:center">回滚未提交事务</td>
</tr>
<tr>
<td style="text-align:center">隔离性</td>
<td style="text-align:center">锁/MVCC</td>
<td style="text-align:center">控制并发访问</td>
</tr>
<tr>
<td style="text-align:center">持久性</td>
<td style="text-align:center">Redo Log</td>
<td style="text-align:center">故障恢复</td>
</tr>
<tr>
<td style="text-align:center">一致性</td>
<td style="text-align:center">以上三者共同保证</td>
<td style="text-align:center">业务规则约束</td>
</tr>
</tbody>
</table>
<h3 id="_2-事务控制语句" tabindex="-1"><a class="header-anchor" href="#_2-事务控制语句"><span>2. 事务控制语句</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="shiki" data-ext="sql" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">BEGIN</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">/</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">START TRANSACTION</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">-- 开启事务</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">COMMIT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;                   </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">-- 提交事务</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">ROLLBACK</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;                 </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">-- 回滚事务</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">SAVEPOINT 名称;           </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">-- 创建保存点</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">ROLLBACK</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> TO</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 名称;         </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">-- 回滚到保存点</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">RELEASE SAVEPOINT 名称;   </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">-- 释放保存点</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-隔离级别对比" tabindex="-1"><a class="header-anchor" href="#_3-隔离级别对比"><span>3. 隔离级别对比</span></a></h3>
<table>
<thead>
<tr>
<th style="text-align:center">隔离级别</th>
<th style="text-align:center">脏读</th>
<th style="text-align:center">不可重复读</th>
<th style="text-align:center">幻读</th>
<th style="text-align:center">实现机制</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">READ UNCOMMITTED</td>
<td style="text-align:center">可能</td>
<td style="text-align:center">可能</td>
<td style="text-align:center">可能</td>
<td style="text-align:center">无防护</td>
</tr>
<tr>
<td style="text-align:center">READ COMMITTED</td>
<td style="text-align:center">不可能</td>
<td style="text-align:center">可能</td>
<td style="text-align:center">可能</td>
<td style="text-align:center">MVCC快照读</td>
</tr>
<tr>
<td style="text-align:center">REPEATABLE READ</td>
<td style="text-align:center">不可能</td>
<td style="text-align:center">不可能</td>
<td style="text-align:center">可能*</td>
<td style="text-align:center">MVCC+间隙锁</td>
</tr>
<tr>
<td style="text-align:center">SERIALIZABLE</td>
<td style="text-align:center">不可能</td>
<td style="text-align:center">不可能</td>
<td style="text-align:center">不可能</td>
<td style="text-align:center">完全串行化</td>
</tr>
</tbody>
</table>
<div class="hint-container tip">
<p class="hint-container-title">关于 <strong>REPEATABLE READ</strong> 和幻读</p>
<p><strong>MySQL</strong> 的 <strong>InnoDB</strong> 在 <strong>REPEATABLE READ</strong> 隔离级别下，通过 <strong>间隙锁</strong> 解决了部分幻读，但没有完全解决快照读下的幻读问题</p>
<p>可以做这个实验：</p>
<ol>
<li>当前DB已有id 5, 10, 15三条数据。</li>
<li>事务A查询id &lt; 10的数据，可以查出一行记录id = 5</li>
<li>事务B插入id = 6的数据</li>
<li>事务A再查询id &lt; 10的数据，可以查出一行记录id = 5，查不出id = 6的数据（读场景，解决了幻读）</li>
<li>事务A可以更新/删除id = 6的数据，不能插入id = 6的数据（写场景，幻读不彻底）</li>
</ol>
<h4 id="实验场景复现" tabindex="-1"><a class="header-anchor" href="#实验场景复现"><span>实验场景复现</span></a></h4>
<div class="language-sql line-numbers-mode" data-highlighter="shiki" data-ext="sql" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">-- 初始数据</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">INSERT INTO</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> test </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">VALUES</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">5</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">), (</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">10</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">), (</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">15</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">-- 事务A</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">BEGIN</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">SELECT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> * </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">FROM</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> test </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">WHERE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> id </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x3C;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 10</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">; </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">-- 看到id=5</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">                -- 事务B</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">                BEGIN</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">                INSERT INTO</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> test </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">VALUES</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">6</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">                COMMIT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">SELECT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> * </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">FROM</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> test </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">WHERE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> id </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x3C;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 10</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">; </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">-- 仍只看到id=5（快照读防幻读）</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">-- 但可以执行以下操作：</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">UPDATE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> test </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">SET</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> val</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> WHERE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> id</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">6</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">; </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">-- 能更新"幻影行"！</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">DELETE</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> FROM</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> test </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">WHERE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> id</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">6</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;       </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">-- 能删除"幻影行"！</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个很好理解，**MySQL **虽然通过 <strong>MVCC</strong> 的版本号来解决了读场景下的幻读，但对于上面 <strong>第5步</strong> 那种写场景的情况，其实是无能为力的，因为 <strong>MVCC</strong> 毕竟是无锁实现。</p>
<h5 id="mysql防幻读机制的两面性" tabindex="-1"><a class="header-anchor" href="#mysql防幻读机制的两面性"><span>MySQL防幻读机制的两面性</span></a></h5>
<table>
<thead>
<tr>
<th style="text-align:center">防护类型</th>
<th style="text-align:center">机制</th>
<th style="text-align:center">效果</th>
<th style="text-align:center">局限性</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><strong>读防护</strong></td>
<td style="text-align:center">MVCC快照</td>
<td style="text-align:center">同一事务内相同查询返回一致结果</td>
<td style="text-align:center">仅适用于SELECT查询</td>
</tr>
<tr>
<td style="text-align:center"><strong>写防护</strong></td>
<td style="text-align:center">间隙锁</td>
<td style="text-align:center">阻止其他事务插入间隙数据</td>
<td style="text-align:center">只在使用锁操作时生效</td>
</tr>
</tbody>
</table>
<h5 id="为什么会出现这种-半解决-状态" tabindex="-1"><a class="header-anchor" href="#为什么会出现这种-半解决-状态"><span>为什么会出现这种&quot;半解决&quot;状态？</span></a></h5>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 技术根源： MVCC简化实现原理</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> InnoDB</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    def</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> __init__</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E5C07B;--shiki-dark-font-style:italic">self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">):</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.version_chain </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {}  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 存储所有版本数据</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> read</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E5C07B;--shiki-dark-font-style:italic">self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic"> transaction_id</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">):</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # 只读取版本号&#x3C;=事务ID且已提交的数据</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [v </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> v </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.version_chain </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">               if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> v.version </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x3C;=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> transaction_id </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">               and</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> v.committed]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> write</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E5C07B;--shiki-dark-font-style:italic">self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic"> transaction_id</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">):</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # 写入时不检查其他事务的快照视图</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.version_chain.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">append</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">NewVersion</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(transaction_id))</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>关键点</strong>：</p>
<ol>
<li>读操作基于事务开始时的 <strong>ReadView</strong></li>
<li>写操作基于当前最新数据</li>
<li>这种读写分离的设计导致了现象不一致</li>
</ol>
<h5 id="生产环境解决方案" tabindex="-1"><a class="header-anchor" href="#生产环境解决方案"><span>生产环境解决方案</span></a></h5>
<ul>
<li>
<p><strong>方案1：</strong> 后续要对数据进行写操作，强制使用锁查询</p>
<div class="language-sql line-numbers-mode" data-highlighter="shiki" data-ext="sql" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">-- 安全写法（彻底防幻读）</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">SELECT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> * </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">FROM</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> table</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> WHERE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> condition </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">FOR</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> UPDATE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>方案2：</strong> 乐观锁控制</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># Python示例（使用版本号）</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">row </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> session.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">execute</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"SELECT id, version FROM table WHERE id=1"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">).</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">fetchone</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 业务处理...</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">affected </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> session.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">execute</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    "UPDATE table SET value=?, version=version+1 WHERE id=? AND version=?"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    [new_value, row.id, row.version]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> affected.rowcount </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">==</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    raise</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF"> Exception</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"并发修改冲突"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>方案3：</strong> 合理设计事务</p>
<div class="language-sql line-numbers-mode" data-highlighter="shiki" data-ext="sql" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">/* 好的实践 */</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">BEGIN</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">-- 所有查询都加锁</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">SELECT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> * </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">FROM</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ... </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">FOR</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> UPDATE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">UPDATE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ...;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">COMMIT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">/* 危险实践 */</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">BEGIN</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">SELECT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> * </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">FROM</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ...; </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">-- 不加锁的快照读</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">UPDATE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ...;        </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">-- 可能操作幻影行</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">COMMIT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="为什么敢用read-committed" tabindex="-1"><a class="header-anchor" href="#为什么敢用read-committed"><span>为什么敢用READ COMMITTED？</span></a></h3>
<ol>
<li>
<p><strong>有补偿措施</strong>：</p>
<p>监控系统实时检测异常数据</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 伪代码：定期校验数据一致性</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> consistency_check</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">():</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    with</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> db.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">transaction</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">isolation</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'READ COMMITTED'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">as</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> tx:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        data1 </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> tx.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">execute</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"SELECT COUNT(*) FROM orders"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # 业务处理...</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        data2 </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> tx.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">execute</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"SELECT COUNT(*) FROM orders"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> data1 </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">!=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> data2:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">            alert</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"发现不可重复读现象"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>关键操作使用显式锁</li>
<li>通过业务逻辑设计规避问题</li>
</ul>
</li>
<li>
<p><strong>理解本质：</strong></p>
<p><strong>MySQL</strong> 的 <strong>RR</strong> 是&quot;80分解决方案&quot;，<strong>不是100% 防幻读</strong></p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 好的代码注释示例</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> update_inventory</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic">item_id</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">):</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    """库存更新方法</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    注意：使用SELECT FOR UPDATE确保防幻读</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    """</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    with</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> transaction</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">isolation</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'REPEATABLE READ'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">):</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        row </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> session.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">execute</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">            "SELECT * FROM inventory WHERE item_id=? FOR UPDATE"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            [item_id]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        )</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # ...业务逻辑</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<p>这种设计其实是工程上的权衡——在保证大部分场景可用的前提下，把复杂情况交给开发者显式处理，既获得了性能提升，又把控制权交给了最了解业务的人。</p>
<h3 id="_4-mvcc机制" tabindex="-1"><a class="header-anchor" href="#_4-mvcc机制"><span>4. MVCC机制</span></a></h3>
<ul>
<li><strong>版本链</strong>：通过<code v-pre>DB_TRX_ID</code>和<code v-pre>DB_ROLL_PTR</code>构建</li>
<li>ReadView：包含：
<ul>
<li><code v-pre>m_ids</code>：活跃事务列表</li>
<li><code v-pre>min_trx_id</code>：最小活跃事务ID</li>
<li><code v-pre>max_trx_id</code>：预分配最大事务ID</li>
<li><code v-pre>creator_trx_id</code>：创建该ReadView的事务ID</li>
</ul>
</li>
</ul>
<p><strong>不同隔离级别的ReadView生成策略</strong>：</p>
<ul>
<li>READ COMMITTED：每次SELECT生成新ReadView</li>
<li>REPEATABLE READ：第一次SELECT生成ReadView后复用</li>
</ul>
<h2 id="四、锁机制" tabindex="-1"><a class="header-anchor" href="#四、锁机制"><span>四、锁机制</span></a></h2>
<h3 id="_1-锁类型矩阵" tabindex="-1"><a class="header-anchor" href="#_1-锁类型矩阵"><span>1. 锁类型矩阵</span></a></h3>
<table>
<thead>
<tr>
<th style="text-align:center">锁类型</th>
<th style="text-align:center">X锁(排他)</th>
<th style="text-align:center">S锁(共享)</th>
<th style="text-align:center">IS锁(意向共享)</th>
<th style="text-align:center">IX锁(意向排他)</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">X锁</td>
<td style="text-align:center">冲突</td>
<td style="text-align:center">冲突</td>
<td style="text-align:center">冲突</td>
<td style="text-align:center">冲突</td>
</tr>
<tr>
<td style="text-align:center">S锁</td>
<td style="text-align:center">冲突</td>
<td style="text-align:center">兼容</td>
<td style="text-align:center">兼容</td>
<td style="text-align:center">冲突</td>
</tr>
<tr>
<td style="text-align:center">IS锁</td>
<td style="text-align:center">冲突</td>
<td style="text-align:center">兼容</td>
<td style="text-align:center">兼容</td>
<td style="text-align:center">兼容</td>
</tr>
<tr>
<td style="text-align:center">IX锁</td>
<td style="text-align:center">冲突</td>
<td style="text-align:center">冲突</td>
<td style="text-align:center">兼容</td>
<td style="text-align:center">兼容</td>
</tr>
</tbody>
</table>
<h3 id="_2-innodb锁算法" tabindex="-1"><a class="header-anchor" href="#_2-innodb锁算法"><span>2. InnoDB锁算法</span></a></h3>
<table>
<thead>
<tr>
<th style="text-align:center">锁算法</th>
<th style="text-align:center">锁定范围</th>
<th style="text-align:center">解决什么问题</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Record Lock</td>
<td style="text-align:center">单个行记录</td>
<td style="text-align:center">保证行更新安全</td>
</tr>
<tr>
<td style="text-align:center">Gap Lock</td>
<td style="text-align:center">记录之间的间隙</td>
<td style="text-align:center">防止幻读</td>
</tr>
<tr>
<td style="text-align:center">Next-Key Lock</td>
<td style="text-align:center">记录+前间隙</td>
<td style="text-align:center">防止幻读(默认)</td>
</tr>
</tbody>
</table>
<h3 id="_3-不同隔离级别的锁行为" tabindex="-1"><a class="header-anchor" href="#_3-不同隔离级别的锁行为"><span>3. 不同隔离级别的锁行为</span></a></h3>
<h4 id="read-committed" tabindex="-1"><a class="header-anchor" href="#read-committed"><span>READ COMMITTED：</span></a></h4>
<ul>
<li>仅使用Record Lock</li>
<li>可能出现幻读</li>
</ul>
<h4 id="repeatable-read" tabindex="-1"><a class="header-anchor" href="#repeatable-read"><span>REPEATABLE READ：</span></a></h4>
<ul>
<li>默认使用Next-Key Lock</li>
<li>基本解决幻读问题</li>
<li>全表扫描会锁全表</li>
</ul>
<h3 id="_4-乐观锁与悲观锁对比" tabindex="-1"><a class="header-anchor" href="#_4-乐观锁与悲观锁对比"><span>4. 乐观锁与悲观锁对比</span></a></h3>
<table>
<thead>
<tr>
<th style="text-align:center">特性</th>
<th style="text-align:center">悲观锁</th>
<th style="text-align:center">乐观锁</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">原理</td>
<td style="text-align:center">先加锁后访问</td>
<td style="text-align:center">版本号/时间戳校验</td>
</tr>
<tr>
<td style="text-align:center">实现</td>
<td style="text-align:center"><code v-pre>SELECT...FOR UPDATE</code></td>
<td style="text-align:center">应用层实现</td>
</tr>
<tr>
<td style="text-align:center">优点</td>
<td style="text-align:center">保证强一致性</td>
<td style="text-align:center">高并发性能</td>
</tr>
<tr>
<td style="text-align:center">缺点</td>
<td style="text-align:center">锁开销大</td>
<td style="text-align:center">重试成本高</td>
</tr>
<tr>
<td style="text-align:center">适用</td>
<td style="text-align:center">写多读少</td>
<td style="text-align:center">读多写少</td>
</tr>
</tbody>
</table>
<p><strong>乐观锁实现示例</strong>：</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 需要设置隔离级别为READ COMMITTED</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">@transaction</span><span style="--shiki-light:#4078F2;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">atomic</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> update_inventory</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">():</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> range</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">5</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">):  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 最大重试5次</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        product </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> Product.objects.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">get</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">id</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        old_stock </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> product.stock</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        new_stock </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> old_stock </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        affected </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> Product.objects.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">filter</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            id</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">stock</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">old_stock</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        ).</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">update</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">stock</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">new_stock)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> affected: </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            break</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  # 更新成功</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    else</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        raise</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF"> Exception</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"更新失败"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、sql优化建议" tabindex="-1"><a class="header-anchor" href="#五、sql优化建议"><span>五、SQL优化建议</span></a></h2>
<ol>
<li>
<p><strong>字段设计</strong>：</p>
<ul>
<li>使用合适的数据类型</li>
<li>尽量设置NOT NULL</li>
<li>枚举类型使用ENUM</li>
</ul>
</li>
<li>
<p><strong>查询优化</strong>：</p>
<ul>
<li>用JOIN代替子查询</li>
<li>用UNION代替临时表</li>
<li>合理使用索引</li>
</ul>
</li>
<li>
<p><strong>事务优化</strong>：</p>
<ul>
<li>缩短事务执行时间</li>
<li>避免长事务</li>
<li>合理设置隔离级别</li>
</ul>
</li>
<li>
<p><strong>锁优化</strong>：</p>
<ul>
<li>尽量使用行锁而非表锁</li>
<li>访问量大的系统考虑READ COMMITTED</li>
<li>关键业务使用SERIALIZABLE</li>
</ul>
<p>三、索引：<br>
页目录：<br>
本质是树，即用一个页 利用二分法进行来记录各数据的地址，每一页会有主键，并把主键提出来作为索引部分</p>
<pre><code>           页号100                       页号200
         1 -&gt;  1111a                   5 -&gt; 5555e
               2222b       -&gt;               6666f
         3 -&gt;  3333c...                7 -&gt; 7777g ...

 目录页:
     额外提出一个页，用来存储页号，但每一页的页号可不是相邻的，反而会再用一个 key-value 去存储页号
                 1                          5            --  主键
                100                        200           --  指针
                 |                          |
              页号100                    页号200          --  指针指向的行数据

     key：每页中最小的值， 利用主键都是递增顺序排列
     value：对应的页号

 因此就是一个B+树结构(根节点的元素总会留一个在叶子节点上) 一个节点也可以存多个元素
                              0003 0005
          |                       |                         |
        0002                    0004                       0005
     |         |           |            |              |            |
 0001   -&gt;    0002   -&gt;   0003    -&gt;   0004   -&gt;    0005    -&gt;    0006 0007

 叶子节点：存数据
 非叶子节点：存主键 + 指针

 所以插入索引的过程中是生成B+树的过程，这就是为什么有序的原因，是存在了B+树的叶子节点里

 注：
     1.主键ID不适合太长，若过于长的话一页放不下，再会将树的高度拉长，树的高度越高，查找速度就会下降

     2.mysql 创建过程略微不同，他是当执行创建表命令时，就会创建一个页，当一个页装不下后，不是在创建第二个页，
       而是将第一个页copy一份，创建第二个页，再将之前的第一页改为目录页

     3.B+树的优势，相比于AVL树（二叉） B+树的优势在于一个节点可以存多个元素，因此会比AVL树高度要低，因此查找
       时的执行效率要低。虽然数据冗余了，查找 = 等于的条件不明显，但查找&gt; &lt; 条件时则不同

       例如： 查 &gt; 0002 的数据，可以直接利用索引（0002后的链表指针）提取所有数据，而AVL树要先找出右子树
             的节点，之后还要回归父节点，层层遍历  （SQL范围查询）

       据说 B+树高度等于2 的时候，大约可存 20000多条数据， B+树高度等于3 的时候， 可以存 2千万多条数据

       假设推算：主键用bigint类型 占8字节 指针占6个字节 因此在一页中，可以存多少个非叶子节点
                16kb/(8+6)=1170.28... 可以存1170对 键值对（代表下面有多少个叶子节点）

                此时假设一行数据为1KB，一页存16条数据，那么高度为2的情况下 可存 1170 * 16 = 18724 条数据
                因此用B+树找最多找两次就能在2千多万条数据中找到那个页


 辅助索引：
     出了主键索引之外，创建的普通索引。好处在于更方便查找，但走辅助索引会走两次，因为建立辅助索引意味着全表
     又重新构建了一颗B+树，子节点存的是主键，走辅助索引会先找到主键在去主键表中找数据。
     例：
         create index idx_t1_bcd on t1(b,c,d);
         创建名为idx_t1_bcd的索引，bcd三列必须唯一且会进行排序，并再次生成一个已bcd为 键的B+树

     查找方式：
     1.辅助索引+ 回表
     2.全表扫描

     但当一个比较极端的情况，走辅助索引吧全表的主键都找了一遍，此时还不如走全表索引来得快：
     create index idx_t1_b on t1(b);   -- 此时只建立一个b的索引（上文索引无）
     explain select * from t1 where b &gt; 0; 此时 若走辅助索引还不如走主键全表扫描来的快
     因为 b &gt; 0 这个条件吧主键索引都找了出来，又去全表索引再找一遍，这就很慢。

     最左前缀原则：
         当建立 bcd 三列的索引时，
         explain select * from t1 where b = 1 and c = 1 and d = 1; -- 命中索引
         explain select * from t1 where c = 1 and d = 1; -- 未命中

         若数据从 111 到 644  *11 是没有办法进行比较的，第一个值不知道因此未走索引
                                 111     644
                                 页号    页号
                         |                           |
                  111    235                     322     644

         explain select * from t1 where b like '%101%';  -- 未命中索引
         同上 % 在开头也意味着 第一个值是模糊的,开头可以是多个,而 '101%' 则可以

     注：
         1.用上文的道理，若要查找已.com 为后缀结尾的 用 %com，则会全表扫描，
             可以将 www.baidu.com 、www.google.com 这样的网站逆序存储，然后利用 %moc 进行查找
             则可直接命中索引

             select * from t1 order by b,c,d;  -- 走全表
             select b from t1 order by b,c,d;  -- 命中索引
             这是因为 只找一个b字段，b字段本身有索引，因此就无须再走一次全表了


         2.NULL 值在MYSQL中小于任何值

         3.若其他索引有相同的数据（不是唯一索引），则系统会默认将主键索引也加入B+树的构成中，便于区分
</code></pre>
</li>
</ol>
<p>MYSQL 事务：</p>
<pre><code>一、事务（ACID）
    场景：小明向小胖转账10块钱

    原子性：转账操作是一个不可分割的操作，要么转账失败，要么转账成功，不可能存在中间状态，也就是转了一半的这种情况
        我们把要么全做要么不做这种的规则成为原子性规则

    隔离性：
        另一个场景：小明向小白转账10元钱
                   小明向小胖转账10元钱
        隔离性表示上面的两个操作是不能相互影响的

    一致性：
        每一次转账完成后，都需要保证整个系统余额等于所有账户的收入减去所有账户的支出。
        若不遵循原子性，也就是如果小明向小胖转账10元，但是只转了一半，小明账户上少了10元，小胖账户上没有增加，
        这就是不满足一致性原则。
        同样不满足隔离性，也有可能破坏一致性。因此原子性和隔离性都是保证满足一致性的手段。

        实际上，我们可以对表建立约束来保证一致性。

    持久性：
        对于转账的交易记录，需要永久保存。

    事务的概念：
        把需要保证原子性、隔离性、一致性、和持久性的一个或多个数据库操作称之为一个事务。


二、自动提交：
    mysql&gt; SHOW VARIABLES LIKE 'autocommit';   -- 正常情况下，MYSQL默认事务是ON 自动提交的

    自动提交意味着： 当写一个update之类的语句时，
     - 它会先帮我开启一个事务，
     - 再去执行我写的SQL
     - 再去把这个事务提交上去

    1、开启事务
        mysql&gt; BEGIN;  -- 手动开启一个事务

        mysql&gt; START TRANSACTION;   -- 和BEGIN功效相同，都是开启一个事务

        1.当开启两个MYSQL客户端是，客户端1 执行语句
        update t1 set c = 2 where  a = 1 ;  -- 目的是把a = 1 这行数据的c字段的值改为 2

        2.此时在客户端2 上执行
        select * from t1 where a = 1; -- 发现客户端2 中查询到的数据并没有改变

        3.这时在 客户端1 执行 commit; 提交一下，客户端2 中才能真正查到改动后的数据。
          但客户端1 则自己改的自己可以查到。

        4.若此时客户端1 上执行rollback 则会进行回滚，之前改动的数据则会改回。
            注：rollback 是我们程序员手动去回滚事务时才去使用的，若事务在执行过程中遇到了某些错误而无法继续执行的
                话，事务自身会回滚。

三、隐式提交：
    当使用 begin 或 start transaction 开启一个事务，或者把系统变量autocommit 的值设置为OFF 时，事务就不会进行自动
    提交，但是我们输入了某些语句之后会悄悄的提交掉，就像我们输入了commit 语句一样，这是因为某些特殊的语句而导致事务
    提交的情况称为隐式提交。

    导致隐式提交的语句包括：
    - 定义或修改数据库对象的数据定义语言（Data definition language 缩写：DDL）数据库对象 —— 是指数据库、表、
      视图、存储过程、等等这些东西。当我们使用 create、alter、drop等语句去修改这些所谓的数据库对象时，就会隐式的
      提交前边语句所属于的事务。

    - 隐式使用或修改mysql 数据库中的表; 当我们使用 alter user 、create user、drop user、grant、 rename user、
      set password 等语句时也会隐式的提交前边语句所属于的事务。

    - 事务控制或关于锁定的语句：当我们在一个事务还没提交或者回滚时就又使用start transaction 或者begin 开启了
      另一个事务时，会隐式的提交上一个事务，或者当前的autocommit 系统变量为OFF，我们手动把它调为ON时，也会隐式
      的提交前边语句所属的事务，或者用LOCK TABLES、 UNLOCK TABLES 等关于锁定的语句也会隐式的提交前边的语句所属
      的事务。

    - 加载数据的语句：比如我们使用LOAD DATA 语句来批量往数据库中导入数据时，也会隐式的提交前边语句所属的事务。

    - 其他的一些语句：使用analyze table、 cache index、 check table、flush、 load index into cache、
      optimize table、 repair table、 reset 等语句也会隐式的提交前边语句所属的事务。
      （更新查询优化器的统计数据的命令）

四、保存点：
    mysql&gt; savepoint 保存点名称：

    - 首先，开启一个事务：
      begin

    - 然后执行更改命令：
      update t1 set c = 6 where a = 1;

    - 再执行保存点命令：
      savepoint t123

    - 再改
      update t1 set c = 7 where a = 1;

    - 执行回滚
      rollback to t123;  -- rollback [WORK] to [savepoint] 保存点名称；
      若rollback 后面不跟随保存点名称的话，会直接回滚到事务执行之前的状态。

    - 删除保存点:
      release savepoint 保存点名称;


五、隔离性详解 ！！
    一共有四种隔离级别：
    mysql&gt; set session transaction isolation level read uncommitted; -- 修改隔离级别为（读未提交）

    mysql&gt; select @@tx_isolation;

    1.读未提交（read uncommitted）
        一个事务可以读到其他事务还未提交的数据，会出现脏读。
        &gt; 一个事务读到了另一个事务修改过但未提交的数据，即为脏读。

        用的少，违背事务的特性，不严谨

    2.读已提交（read committed）
        一个事务只能读到另一个事务修改过并已提交的数据，并且其他事务每对改数据进行一次修改并提交后，该事务都能查询到
        最新值，会出现不可重复读、幻读。
        &gt; 如果一个事务先根据某些条件查询出一些记录，之后另一个事务又向表中插入了符合这些条件的记录（并提交），原先的
        事务再次按照该条件查询时，能把另一个事务插入的记录也读出来，这就是幻读。

    3.可重复读（repeatable read）
        一个事务第一次读过某条记录后，即使其他事务修改了该记录的值并且提交，该事务之后再读该条记录时，读到的仍是第一次
        读到的值，而不是每次都读到不同的数据，这就是可重复读，这种隔离级别解决了不可重复，但是还是会出现幻读。

        也就是客户端1 尽管commit 客户端2 也读不到客户端1 commit 后的值 （其实按理说不会出现幻读了，但也可能发生）
        （MYSQL默认的隔离级别 就是可重复读）

    4.串行化（serializable）
        以上三种隔离级别都允许对同一条记录同时进行读-读、 读-写、 写-读、的并发操作，如果我们不允许读-写、 写-读
        的并发操作，可以使用serializable 隔离级别，这种隔离级别因为对同一条记录都是串行的，所以不会出现脏读、幻读
        等现象

        这中隔离方式，用的也不多，它会在一个客户端 的事务尚未操作commit 时阻塞其他的事务进行查找

    注：
        1.这四种隔离级别是SQL定义的标准，不同数据库会有不同的实现，特别需要注意的是 [MYSQL 在 repeatable read 隔离
            级别下，是可以禁止幻读问题的发生]

        2.幻读：本质和不可重复度差不多，幻读只的是多读出了另一个事务生成的一行记录，而不可重复读，指的是读某个记录的
            原本字段发生变化

六、事务ID及回滚指针
    1.事务id：
        如上文提到，mysql除自定义数据外，还有三个隐藏列，行id、事务id、回滚指针
        每一次数据进行改动时，都要开启一个事务，因此这行的其中一个隐藏列会记录当时修改的事务id

    2.回滚指针：
        当修改了一次数据，不仅会修改事务id，还有回滚指针记录上个版本的数据（像链表，存在日志中）
        如：
                     数据      事务id       回滚指针
                1 5 1 1 a2 a3   300    trx_id_roll_pointer  ____
            ____________________________________________________|
            |   1 4 1 1 a2 a3   200    trx_id_roll_pointer  ____
            ____________________________________________________|
            |——&gt;1 3 1 1 a2 a3   82     trx_id_roll_pointer  ____
            ____________________________________________________|
            |——&gt;1 2 1 1 a2 a3   81     trx_id_roll_pointer....


    3.版本链：
        以上为某一行数据的版本链，对于innodb来说，聚簇索引记录中都包含两个必要的隐藏列，（row_id 并不是必要的，我们
        创建的表中有主键或者非NULL唯一键时都不会包含row_id列）
        trx_id:每次对某条记录进行改动时，都会把对应的事务id赋值给trx_id 隐藏列
        roll_pointer:每次对某条记录进行改动时，这个隐藏列会存一个指针，可以通过这个指针找到记录修改前的信息

        注：事务回滚的依据是 undolog （后面提）

    4.read view:
        场景：A事务（id 300） 读取某一列值为 1   B事务（id 200） 修改某一列值为 2
        对于A事务在 select 读的时候会生成一个read view (里面会有一个重要属性 m_ids)
            m_ids:[]   -- 里面保存了活跃的事务id （还未提交的） [82, 200, 300]

            - 当A事务未提交时：
                会用事务id列表去版本链比对，判断对应事务是否是活跃的，若是，则不去里面找，直到找到不活跃的（已经
                提交了的事务，因此会把之前提交过的事务 81 对应的数据给找出来）[82, 200, 300]

            - 当A事务已经提交：（读已提交下）
                和上述类似，但由于A已经提交，则会根据A事务id 300把对应数据读出[82, 300]

            - 当A事务已提交：（可重复读）
                m_ids = [82, 200, 300]  此时与上面不同，不会把200 去掉，会直接用第一次select 事，算出来的
                read view 会直接去复用read view 即A事务未提交前的read view 。所以最后还是把81 找出的来。

            区别：在于生成read view 的时机不同，读已提交，是每次select 都会生成新的read view，
                  可重复读则是，只在第一次生成read view 之后都沿用这个 read view


    5.MVCC总结：
        MVCC（multi-version concurrency control，多版本并发控制）指的是 读已提交、可重复读这两中隔离级别
        的事务在执行普通的select 访问版本链的过程，可以使不同事务的读-写、写-读操作并发执行，从而提升系统性能。
        （避免使用锁，等释放的低效率行为）



七、锁
    0.概念图：
                                                                                ———————————————————————  表锁
            乐观锁 ——————————————                                               |
                                 ———— 加锁机制                      锁粒度 —————————————————————————————— 行锁
            悲观锁 ——————————————             |                    |            |
                                                                                ———————————————————————— 页锁
                                              ———————— 锁  ————————

            共享锁 ————————————                                               ———Record Lock（单个记录上锁）
                               |           |                       |         |
            排他锁 ————————————  ———— 兼容性                         锁算法 ———————Gap Lock（间隙锁，解决幻读）
                               |                                             |
            意向锁 ————————————                                               ———Next-Key Lock：Gap Lock+Record Lock


    1.读锁和写锁
        读锁：共享锁，shared locks S锁。
        写锁：排他锁，exclusive locks X锁。（一个资源上加了写锁，其他若需要加锁则需要排队）
        select：不加锁（可以跳过锁去访问）

        读操作：对于普通的select 语句，InnoDB不会加任何锁

    2.select ...lock in share mode
        将查找到的数据加上一个S锁，允许其他事务继续获取这些记录的S锁，不能获取这些记录的X锁（会阻塞）

        场景：读出数据后，其他事务不能修改，但是自己也不一定能修改，因为其他事务也可以使用&quot; select ...lock
         in share mode&quot; 继续加读锁。

    3.select ...for update
        将查找到的数据加上一个X锁，不允许其他事务获取这些记录的S锁和X锁。

        使用场景：读出数据后，其他事务既不能写，也不能加读锁，那么就导致只有自己可以修改数据。


    4.写操作：
        DELETE：删除一条记录，会先对记录加X锁，再执行
        INSERT：插入一条记录，会先加&quot;隐式锁&quot;来保护这条新记录在本事务提交前不被其他事务访问到。
        UPDATE：
            - 如果被更新的列，修改前后没有导致存储空间的变化，那么会先给记录加X锁，再直接对记录进行修改。
            - 如果被更新的列，修改前后导致存储空间发生了变化，那么后先给记录加X锁，然后再将记录删掉，再
              insert一条新纪录。

        隐式锁：一个事务插入一条记录后，还未提交，这条记录会保存本次事务id，而其他事务如果想来对这个记录加锁
            时会发现事务id 不对应，这时会产生X锁，所以相当于在插入一条记录时，隐式的给这条记录加了一把隐式的X锁。

        注：
            &gt; 事务提交或结束后，锁才会自动进行释放。
            &gt; 锁必须是在事务里面才用的。 因为平时开启是个事务不会手写begin、commit ，而是直接写sql，
              如：select * from t1 where a = 1 for update ;
              但要下意识知道，写这些sql的时候，会默认的先开启一个事务，而再来执行这个sql，然后再提交这个sql。

    5.行锁（锁算法）
        LOCK_REC_NOT_GAP: 单个行记录上的锁
        LOCK_GAP: 间隙锁，锁定一个范围，但不包括记录本身，GAP锁的目的，是为了防止同一事务的两次当前读，出现幻读
                    的情况
        LOCK_ORDINARY: 锁定一个范围，并且锁定记录本身对于行的查询，都是采用该方法，主要目的是解决幻读的问题。


    6.read committed 级别下的锁：
        - 当用主键查询时
            select * from t1 where a = 1 for update;
            再开启事务2，进行与上同样对 a = 1 的查询，此时会发现会阻塞。可若进行 a = 2 的主键查询则不会阻塞。
            这说明，事务1 利用主键查询，只会锁住查出来的这一行数据

        - 当用唯一索引查询时：
            与上文其实是一致的，

        - 当查询使用普通索引时：
            select * from t1 where e = &quot;b&quot; for update; -- 此时查出多条e = &quot;b&quot;的数据
            再开启事务2，但执行 a = 1 的主键查询（a = 1 的那条数据 e也等于&quot;b&quot;）发现事务2也会阻塞，但若找一个
            a = 6 这种（e 不等于 &quot;b&quot;）的数据，发现没有阻塞。
            这说明，普通索引，会对他查询出来的结果加锁。

            此时执行 insert t1(b, c, d, e) values(30, 1, 1, &quot;b&quot;); 插入数据，是可以进行插入e = &quot;b&quot;相关数据的。

        - 当全表扫描时：（未使用索引）
            其实同上，并不会锁住全表，也只会将事务1查询出来的数据锁住。


    7.repeatable read 级别下的锁：（mysql 默认的隔离级别 -- 可重复读）
        - 当使用主键、唯一索引查询时：
            和RC隔离级别一样，当执行主键 a &gt; 1 for update 条件时，会锁住全表，同样事务2 无法插入任何记录。

        - 当使用普通索引查询时:
            条件与上文一致，还是e = &quot;b&quot; 之后用事务2 查询事务1 之外的数据，发现还是可以查询到，但若此时执行插入
            insert t1(b, c, d, e) values(30, 1, 1, &quot;b&quot;);    此时会发现这条记录是插不进去的。

            但好理解的是，这样的目的本质就是为了防止 &quot;幻读&quot; 的发生

        - 当使用全表扫描时：
            同上，会将全表锁住，哪怕查询条件时 c = 1 for update，也不能更改 c = 10 的记录，因为可能会出现
            你想把 c = 10 改为 c = 1 的情况，因此锁住，防止幻读现象。

            注：
                对于可重复读的隔离级别下， 通常会将全表、所有的行、甚至包括间隙都全部锁住。


    8.乐观锁和悲观锁：
                    悲观锁                                         乐观锁
    概念：查询时直接锁住记录使得其他事务不能查询          提交更新时检查版本或时间戳是否符合
    语法：select * for update                          使用version 或者 timestamp进行比较
    实现者：数据库本身                                  开发者
    适用场景：并发量大                                  并发量小

    悲观锁：
        悲观的认为数据处理中，肯定会有其他事务进行修改数据，因此就将数据加锁，通常依靠关系型数据库的锁机制。
        不论是行锁、表锁、读写锁、都是悲观锁

    乐观锁：
        认为每次自己操作数据，都不会有其他事务来修改它，因此不加锁，但在更新的时候会判断此期间的数据有没有进行修改。需要
        自己实现，不会发生并发抢占资源，只有在提交的时候检查，是否违反数据完整性。
        原理出差CAS算法（不懂）但大概就像git一样。

    场景：
        读操作  远&gt;  写操作 时，此时一个更新操作加锁就会阻塞所有的读操作，降低吞吐量，最后还要释放锁，锁还要开销，因此用乐观锁

        读操作  ==  写操作 都差不多时，或者系统没有响应不及时（阻塞住的情况、吞吐量瓶颈等问题）那就不要使用乐观锁，它增加了
        复杂度，还带来了额外的业务风险，此时用悲观锁即可。

    python中使用悲乐锁：
        1.悲观锁的使用：
            必须关闭mysql的自动提交属性，即执行更改操作时会立即将结果提交。set autocommit = 0
            由select * from 表名 where id = 1 for update  加X锁这类型的语句衍生
            ORM中：
                # 开启事务装饰器 在指定函数前加上
                @transaction.atomic
                obj = 模型类名.objects.select_for_update.get(id = 1) # 即可实现悲观锁，若加锁失败则说明记录正在被修改，
                                                                    # 需要等待或是抛出异常

        2.乐观锁的使用：
            乐观锁其实并不是锁。通过SQL的where子句中的条件是否满足来判断是否满足更新条件来更新数据库，通过受影响行数判断
            是否更新成功，如果更新失败可以再次进行尝试，如果多次尝试失败就返回更新失败的结果。

            使用乐观锁时，必须设置数据库的隔离级别是Read Committed(可以读到其他线程已提交的数据)。如果隔离级别是
            Repeatable Read(可重复读，读到的数据都是开启事务时刻的数据，即使其他线程提交更新数据，该线程读取的数据
            也是之前读到的数据)，乐观锁如果第一次尝试失败,那么不管尝试多少次都会失败。 (Mysql数据库的默认隔离级别是
            Repeatable Read，需要修改成Read Committed)。

            # 首先引入
            from django.db import transaction

            # 以下为乐观锁视图层示例
            class MyView(View):

                @transaction.atomic
                def post(self, request):
                    '''订单创建'''
                    count = 3   # 订购3件商品

                    # 设置事务保存点
                    s1 = transaction.savepoint()

                    # 乐观锁，最多尝试5次
                    for i in range(5):
                        # 查询商品的信息(库存)
                        try:
                            sku = GoodsSKU.objects.get(id=1)
                        except:
                            # 商品不存在
                            transaction.savepoint_rollback(s1)
                            return JsonResponse({'res': 1, 'errmsg': '商品不存在'})

                        # 判断商品的库存
                        if count &gt; sku.stock:
                            transaction.savepoint_rollback(s1)
                            return JsonResponse({'res': 2, 'errmsg': '商品库存不足'})

                        # 更新商品的库存和销量
                        orgin_stock = sku.stock   # 原库存 (数据库隔离级别必须是Read Committed；如果是Repeatable Read,
                                                  #  那么多次尝试读取的原库存都是一样的,读不到其他线程提交更新后的数据。)
                        new_stock = orgin_stock - count   # 更新后的库存
                        new_sales = sku.sales + count   # 更新后的销量

                        # update 商品表 set stock=new_stock, sales=new_sales where id=1 and stock = orgin_stock
                        # 通过where子句中的条件判断库存是否进行了修改。(并发，乐观锁)
                        # 返回受影响的行数
                        res = GoodsSKU.objects.filter(id=1, stock=orgin_stock).update(stock=new_stock, sales=new_sales)
                        if res == 0:  # 如果修改失败
                            if i == 4:
                                # 如果尝试5次都失败
                                transaction.savepoint_rollback(s1)
                                return JsonResponse({'res': 3, 'errmsg': '下单失败'})
                            continue  # 再次尝试

                        # 否则更新成功
                        # 跳出尝试循环
                        break


                    # 提交事务
                    transaction.savepoint_commit(s1)

                    # 返回应答
                    return JsonResponse({'res': 4, 'message': '创建成功'})


        注：
            在并发比较少时建议使用乐观锁,减少加锁、释放锁的开销。在并发比较高的时候，建议使用悲观锁。

            如果乐观锁多次尝试的代价比较大，也建议使用悲观锁。

            乐观锁的处理方式可以理解为在进行数据操作时不加锁，在进行数据更新时进行判断，判断更新时的数据和之前的数据是否一致，
            如果不一致说明已被其他进程先进行操作


    9.优化SQL的方法：
        1.选取最适用的字段属性，尽可能减少定义字段宽度，尽量把字段设置NOTNULL，例如’省份’、'性别’最好适用ENUM
        2.使用连接(JOIN)来代替子查询（使用多次查询来代替 JOIN）
        3.适用联合(UNION)来代替手动创建的临时表
        4.事务处理
        5.锁定表、优化事务处理
        6.适用外键，优化锁定表
        7.建立索引
</code></pre>
<h2 id="快照读没有完全解决幻读" tabindex="-1"><a class="header-anchor" href="#快照读没有完全解决幻读"><span>快照读没有完全解决幻读？</span></a></h2>
<p>是的，MySQL没有完全解决快照读下的幻读问题。</p>
<p>可以做这个实验：</p>
<ol>
<li>当前DB已有id 5, 10, 15三条数据。</li>
<li>事务A查询id &lt; 10的数据，可以查出一行记录id = 5</li>
<li>事务B插入id = 6的数据</li>
<li>事务A再查询id &lt; 10的数据，可以查出一行记录id = 5，查不出id = 6的数据（读场景，解决了幻读）</li>
<li>事务A可以更新/删除id = 6的数据，不能插入id = 6的数据（写场景，幻读不彻底）</li>
</ol>
<p>这个很好理解，MySQL虽然通过MVCC的版本号来解决了读场景下的幻读，但对于上面第5步那种写场景的情况，其实是无能为力的，因为MVCC毕竟是无锁实现。</p>
<p>所以如果后续要对数据进行写操作，还是<strong>通过for update语句上锁</strong>比较稳妥，不然就可能会出现上面第5步那样的问题。</p>
</div>
</div></template>


