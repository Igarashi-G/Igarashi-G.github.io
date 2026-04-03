<template><div><h1 id="mysql调优" tabindex="-1"><a class="header-anchor" href="#mysql调优"><span>Mysql调优</span></a></h1>
<h3 id="_1-执行计划分析" tabindex="-1"><a class="header-anchor" href="#_1-执行计划分析"><span>1. 执行计划分析</span></a></h3>
<h4 id="_1-1-什么是执行计划" tabindex="-1"><a class="header-anchor" href="#_1-1-什么是执行计划"><span>1.1 什么是执行计划</span></a></h4>
<p><strong>执行计划:</strong>  指一条 SQL 语句在经过 <strong>MySQL 查询优化器</strong> 的优化后，具体的执行方式，常用于 <strong>SQL 性能分析、优化</strong> 等场景。</p>
<div class="language-sql line-numbers-mode" data-highlighter="shiki" data-ext="sql" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">EXPLAIN + </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">SELECT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> / </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">UPDATE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> / </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">DELETE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">... 查询语句；</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>通过 <code v-pre>EXPLAIN</code> 的结果，能看到目标SQL 可 <strong>命中那些 索引、是什么 type、多少行记录被查询</strong> 等</p>
<p>支持 <code v-pre>SELECT</code>、<code v-pre>DELETE</code>、<code v-pre>INSERT</code>、<code v-pre>REPLACE</code> 以及 <code v-pre>UPDATE</code> 语句</p>
<h4 id="_1-2-执行计划示例" tabindex="-1"><a class="header-anchor" href="#_1-2-执行计划示例"><span>1.2 执行计划示例</span></a></h4>
<div class="language-sql line-numbers-mode" data-highlighter="shiki" data-ext="sql" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">mysql</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">></span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> EXPLAIN </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">SELECT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> * </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">FROM</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> employee_department </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">WHERE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> employee_id </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">IN</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    SELECT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> employee_id </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    FROM</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> employee_department </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    GROUP BY</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> employee_id </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    HAVING</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> COUNT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(*) </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">></span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">+</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">----+-------------+----------------------+------------+-------+---------------------------+---------------+---------+------+--------+----------+-------------+</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| id | select_type | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">table</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                | partitions | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">type</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  | possible_keys             | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">key</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">           | key_len | ref  | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">rows</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">   | filtered | Extra       |</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">+</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">----+-------------+----------------------+------------+-------+---------------------------+---------------+---------+------+--------+----------+-------------+</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">|  </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">PRIMARY</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">     | employee_department  | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">NULL</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">       | ALL   | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">NULL</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                      | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">NULL</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">          | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">NULL</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">NULL</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">331143</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> |   </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">100</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">00</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">Using</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> where</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> |</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">|  </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | SUBQUERY    | employee_department  | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">NULL</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">       | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">index</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">PRIMARY</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,department_id_idx | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">PRIMARY</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">       | </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">16</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">      | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">NULL</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">331143</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> |   </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">100</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">00</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">Using</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> index</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> |</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">+</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">----+-------------+----------------------+------------+-------+---------------------------+---------------+---------+------+--------+----------+-------------+</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行计划结果中共有 12 列，各列代表的含义总结如下表：</p>
<table>
<thead>
<tr>
<th><strong>列名</strong></th>
<th><strong>含义</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>id</td>
<td>SELECT 查询的序列标识符</td>
</tr>
<tr>
<td>select_type</td>
<td>SELECT 关键字对应的查询类型</td>
</tr>
<tr>
<td>table</td>
<td>用到的表名</td>
</tr>
<tr>
<td>partitions</td>
<td>匹配的分区，对于未分区的表，值为 NULL</td>
</tr>
<tr>
<td>type</td>
<td>表的访问方法</td>
</tr>
<tr>
<td>possible_keys</td>
<td>可能用到的索引</td>
</tr>
<tr>
<td>key</td>
<td>实际用到的索引</td>
</tr>
<tr>
<td>key_len</td>
<td>所选索引的长度</td>
</tr>
<tr>
<td>ref</td>
<td>当使用索引等值查询时，与索引作比较的列或常量</td>
</tr>
<tr>
<td>rows</td>
<td>预计要读取的行数</td>
</tr>
<tr>
<td>filtered</td>
<td>按表条件过滤后，留存的记录数的百分比</td>
</tr>
<tr>
<td>Extra</td>
<td>附加信息</td>
</tr>
</tbody>
</table>
<h3 id="_2-如何分析explain结果" tabindex="-1"><a class="header-anchor" href="#_2-如何分析explain结果"><span>2. 如何分析EXPLAIN结果</span></a></h3>
<p>首先需要明确执行计划中的每个字段含义：</p>
<h4 id="id" tabindex="-1"><a class="header-anchor" href="#id"><span>id</span></a></h4>
<p><code v-pre>SELECT</code> 标识符，用于标识每个 <code v-pre>SELECT</code> 语句的执行顺序。</p>
<p><strong>id</strong> 就像 SQL 查询的 <strong>执行顺序编号</strong>，告诉你哪个部分先执行、哪个后执行</p>
<ul>
<li>
<p><strong>id 相同</strong>，看类型 <strong>SUBQUERY → PRIMARY → UNION</strong></p>
<div class="language-sql line-numbers-mode" data-highlighter="shiki" data-ext="sql" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| id | select_type | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">table</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">          |</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">|</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">----|-------------|----------------|</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">PRIMARY</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">     | 主查询         |</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  | SUBQUERY    | 子查询         |</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>id 不同</strong>，值越大，执行优先级越高</p>
<div class="language-sql line-numbers-mode" data-highlighter="shiki" data-ext="sql" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| id | select_type | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">table</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">          |</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">|</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">----|-------------|----------------|</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">PRIMARY</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">     | 主查询         |</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  | SUBQUERY    | 子查询         |</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>id值为NULL</strong>，永远最后执行的合并操作（比如 <code v-pre>UNION</code> 的结果）</p>
<div class="language-sql line-numbers-mode" data-highlighter="shiki" data-ext="sql" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| id   | select_type | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">table</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        |</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">|</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">------|-------------|--------------|</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">NULL</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">UNION</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">       | 合并结果集     |</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="select-type-查询类型" tabindex="-1"><a class="header-anchor" href="#select-type-查询类型"><span>select_type 查询类型</span></a></h4>
<p>查询的类型，主要用于区分普通查询、联合查询、子查询等复杂的查询，常见的值有：</p>
<ul>
<li><strong>SIMPLE</strong>：<strong>简单查询</strong>，最基础的 <code v-pre>SELECT</code> 查询，没有嵌套或联合。</li>
<li><strong>PRIMARY</strong>：<strong>主查询</strong>，若包含子查询或其他部分，外层的 SELECT 将被标记为 PRIMARY。</li>
<li><strong>SUBQUERY</strong>：<strong>子查询</strong>，被嵌套在主查询内部的独立查询。</li>
<li><strong>UNION</strong>：<strong>联合查询</strong>，在UNION操作中，第二个及以后的查询语句。</li>
<li><strong>DERIVED</strong>：<strong>派生表</strong>，FROM子句中的子查询，会生成临时表。</li>
<li><strong>UNION RESULT</strong>：<strong>联合结果</strong>，UNION操作的最终合并结果。</li>
</ul>
<h4 id="table" tabindex="-1"><a class="header-anchor" href="#table"><span>table</span></a></h4>
<p>当前查询执行的数据表</p>
<p>每行都有对应的表名，表名除了正常的表之外，也可能是以下列出的值：</p>
<ul>
<li><strong><code v-pre>&lt;unionM,N&gt;</code></strong> : 本行引用了 id 为 M 和 N 的行的 UNION 结果；</li>
<li><strong><code v-pre>&lt;derivedN&gt;</code></strong> : 本行引用了 id 为 N 的表所产生的的派生表结果。派生表有可能产生自 FROM 语句中的子查询。</li>
<li><strong><code v-pre>&lt;subqueryN&gt;</code></strong> : 本行引用了 id 为 N 的表所产生的的物化子查询结果。</li>
</ul>
<h4 id="partitions" tabindex="-1"><a class="header-anchor" href="#partitions"><span>partitions</span></a></h4>
<p>查询所匹配记录所在的分区，对于未分区的表，值为 <code v-pre>NULL</code>。</p>
<h4 id="type-重要" tabindex="-1"><a class="header-anchor" href="#type-重要"><span>type(重要)</span></a></h4>
<p>查询执行的类型，描述了查询是如何执行的。所有值的顺序从最优到最差排序为：</p>
<Mermaid id="mermaid-247" code="eJxLL0osyFDwCeJSAALH6OLK4pLU3FgFXV07Bafo5Py84pJYsJQTWMg5OrUwvig1DSLmDBZziYYLuIAFXKOLEvPSUyFCrmAht+jMvJTUCoiQG1jIPdrRxyeWCwCrAiDY"></Mermaid><h5 id="常见的几种类型含义如下" tabindex="-1"><a class="header-anchor" href="#常见的几种类型含义如下"><span><strong>常见的几种类型含义如下：</strong></span></a></h5>
<table>
<thead>
<tr>
<th>访问类型</th>
<th>通俗解释</th>
<th>性能等级</th>
<th>示例场景</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>system</strong></td>
<td>表只有一行数据（系统表特例）</td>
<td>🚀 最优</td>
<td><code v-pre>SELECT * FROM system_table WHERE id=1</code> (<em><strong>MyISAM引擎</strong></em>)</td>
</tr>
<tr>
<td><strong>const</strong></td>
<td>用主键/唯一索引直接定位单条数据</td>
<td>🚀 最优</td>
<td><code v-pre>SELECT * FROM users WHERE user_id = 1</code></td>
</tr>
<tr>
<td><strong>eq_ref</strong></td>
<td>联表时，前表的每行在后表 <strong>唯一匹配一条</strong> （主键/唯一索引联表）</td>
<td>⭐️ 极优</td>
<td><code v-pre>SELECT * FROM users JOIN orders ON users.id = orders.user_id</code></td>
</tr>
<tr>
<td><strong>ref</strong></td>
<td>用普通索引找到 <strong>多条匹配数据</strong></td>
<td>👍 良好</td>
<td><code v-pre>SELECT * FROM users WHERE age = 25</code> (age有普通索引)</td>
</tr>
<tr>
<td><strong>index_merge</strong></td>
<td>同时使用多个索引，然后合并结果</td>
<td>⚡️ 较优</td>
<td><code v-pre>SELECT * FROM users WHERE user_id = 1 OR username = 'admin'</code></td>
</tr>
<tr>
<td><strong>range</strong></td>
<td>用索引检索 <strong>范围数据</strong>，执行计划中的 <strong>key</strong> 列表示使用了哪个索引</td>
<td>✅ 不错</td>
<td><code v-pre>SELECT * FROM users WHERE age BETWEEN 20 AND 30</code></td>
</tr>
<tr>
<td><strong>index</strong></td>
<td>全索引扫描，查询遍历了整棵索引树（<em><strong>比 ALL 快因为只扫描索引，而索引一般在内存</strong></em>）</td>
<td>⚠️ 较差</td>
<td><code v-pre>SELECT COUNT(*) FROM users</code> (使用了覆盖索引)</td>
</tr>
<tr>
<td><strong>ALL</strong></td>
<td>全表扫描（<em><strong>需要优化</strong></em>）</td>
<td>🐢 最差</td>
<td><code v-pre>SELECT * FROM users WHERE phone LIKE '%123%'</code></td>
</tr>
</tbody>
</table>
<h5 id="eq-ref-与-ref-的区别" tabindex="-1"><a class="header-anchor" href="#eq-ref-与-ref-的区别"><span><strong><code v-pre>eq_ref</code> 与 <code v-pre>ref</code> 的区别</strong></span></a></h5>
<table>
<thead>
<tr>
<th style="text-align:center">类型</th>
<th style="text-align:center">匹配行数</th>
<th style="text-align:center">索引类型</th>
<th style="text-align:center">示例</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><strong>eq_ref</strong></td>
<td style="text-align:center">唯一1条</td>
<td style="text-align:center">主键/唯一索引</td>
<td style="text-align:center"><code v-pre>ON users.id = orders.user_id</code></td>
</tr>
<tr>
<td style="text-align:center"><strong>ref</strong></td>
<td style="text-align:center">可能多条</td>
<td style="text-align:center">普通索引</td>
<td style="text-align:center"><code v-pre>WHERE department_id = 3</code></td>
</tr>
</tbody>
</table>
<h5 id="性能优化建议" tabindex="-1"><a class="header-anchor" href="#性能优化建议"><span><strong>性能优化建议</strong></span></a></h5>
<ol>
<li>
<p><strong>避免 <code v-pre>ALL</code></strong>：</p>
<ul>
<li>为查询条件添加索引</li>
<li>•避免在索引列上使用函数或通配符<code v-pre>%</code>开头</li>
</ul>
</li>
<li>
<p><strong>提升 <code v-pre>range</code> 到 <code v-pre>ref</code></strong>：</p>
<div class="language-sql line-numbers-mode" data-highlighter="shiki" data-ext="sql" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">-- 优化前：type=range</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">SELECT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> * </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">FROM</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> orders </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">WHERE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> order_date </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '2023-01-01'</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">-- 优化后：type=ref (如果status有索引)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">SELECT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> * </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">FROM</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> orders </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">WHERE</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> status</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'paid'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">  AND</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> order_date </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '2023-01-01'</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong><code v-pre>index</code> 特殊情况</strong>：</p>
<p>当查询只需要索引列时（覆盖索引），<strong>index</strong> 比 <strong>ALL</strong> 快很多：</p>
<div class="language-sql line-numbers-mode" data-highlighter="shiki" data-ext="sql" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">-- 虽然扫描整个索引，但不需要回表</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">SELECT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> user_id </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">FROM</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> users </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">WHERE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> last_login_time </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '2023-01-01'</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h4 id="possible-keys" tabindex="-1"><a class="header-anchor" href="#possible-keys"><span>possible_keys</span></a></h4>
<p><strong>possible_keys</strong> 列表示 <strong>MySQL</strong> 执行查询时<strong>可能用到的索引</strong>。</p>
<p>如果这一列为 <strong>NULL</strong> ，则表示 <strong>没有可能用到的索引</strong>，这种情况下，需要检查 <code v-pre>WHERE</code> 语句中所使用的的列，看是否可以通过给这些列中某个或多个添加索引的方法来提高查询性能。</p>
<h4 id="key-重要" tabindex="-1"><a class="header-anchor" href="#key-重要"><span>key(重要)</span></a></h4>
<p><strong>key</strong> 列表示 <strong>MySQL</strong> 实际使用到的索引，如果为 <strong>NULL</strong>，则表示未用到索引。</p>
<h4 id="key-len" tabindex="-1"><a class="header-anchor" href="#key-len"><span>key_len</span></a></h4>
<p>表示 <strong>MySQL</strong> 实际使用的索引的最大长度（<em><strong>字节</strong></em> ），例如：</p>
<ul>
<li><strong>smallint :</strong> <strong>2</strong> 个字节</li>
<li><strong>varchar(255) :</strong> <strong>1022</strong> 个字节
<ul>
<li><code v-pre>255×4=1020（字符数据）+2（长度前缀）+0（如果字段是NOTNULL）=1022字节</code></li>
</ul>
</li>
<li><strong>datetime:</strong> <strong>5</strong> 个字节</li>
</ul>
<p>当使用到联合索引时，有可能是多个列的长度和，在满足需求的前提下 <strong>越短越好</strong>。</p>
<p>如果 key 列显示 NULL ，则 key_len 列也显示 NULL 。</p>
<h4 id="ref" tabindex="-1"><a class="header-anchor" href="#ref"><span>ref</span></a></h4>
<p>表示在查询索引时，哪些列或者常量被用来与索引的值进行比较:</p>
<ul>
<li><strong>const :</strong> 表示使用了常量值（如 <code v-pre>WHERE id = 5</code>）</li>
<li><strong>func :</strong> 表示使用了函数（如 <code v-pre>WHERE UPPER(name) = 'JOHN'</code>）</li>
<li><strong>NULL :</strong> 表示没有使用索引匹配（可能是全表扫描或索引失效），或查询使用了 <strong>范围查询</strong>（<code v-pre>create_at BETWEEN ...</code>），而不是精确匹配（<code v-pre>=</code>），因为它不是直接通过  <code v-pre>=</code> 或  <code v-pre>IN</code> 匹配索引</li>
</ul>
<h4 id="rows" tabindex="-1"><a class="header-anchor" href="#rows"><span>rows</span></a></h4>
<p>表示 <strong>预估扫描行数</strong>， 根据表统计信息及选用情况，大致估算出找到所需的记录或所需读取的行数，数值越小越好。</p>
<h4 id="filtered" tabindex="-1"><a class="header-anchor" href="#filtered"><span>filtered</span></a></h4>
<p>表示估算的经过查询条件删选出的列数的百分比。例如 <code v-pre>rows</code> 是 1000，<code v-pre>filtered</code> 是 50（50%），则实际筛选出的列数为 1000 * 50% = 500。</p>
<h4 id="extra-重要" tabindex="-1"><a class="header-anchor" href="#extra-重要"><span>Extra(重要)</span></a></h4>
<p>包含了 <strong>MySQL</strong> 解析查询的额外信息，通过这些信息，可以更准确的理解 MySQL 到底是如何执行查询的。常见的值如下：</p>
<table>
<thead>
<tr>
<th>Extra 值</th>
<th>通俗解释</th>
<th>性能影响</th>
<th>优化建议</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Using index</strong></td>
<td>查询只通过索引就完成了（<em><strong>覆盖索引</strong></em> ），无需回表查数据</td>
<td>✅ 极优</td>
<td>保持当前索引策略</td>
</tr>
<tr>
<td><strong>Using index condition</strong></td>
<td>表示查询优化器使用了<strong>索引条件下推（<em>ICP</em>）</strong>，在存储引擎层提前过滤数据</td>
<td>✅ 较优</td>
<td>MySQL 5.6+默认开启，无需特别优化</td>
</tr>
<tr>
<td><strong>Using where</strong></td>
<td>表明 <strong>查询使用了 WHERE 子句</strong> 进行条件过滤，需要在Server层对存储引擎返回的数据进行过滤（<em><strong>比如 create_at 范围</strong></em> ）</td>
<td>⚠️ 中</td>
<td>检查WHERE条件是否可以利用索引</td>
</tr>
<tr>
<td><strong>Using filesort</strong></td>
<td>需要额外内存排序（<em><strong>未用索引排序</strong></em> ）</td>
<td>❌ 差</td>
<td>为ORDER BY字段添加索引</td>
</tr>
<tr>
<td><strong>Using temporary</strong></td>
<td>需要创建临时表存储查询结果（<em><strong>常见于 ORDER BY / GROUP BY</strong></em> ）</td>
<td>❌ 差</td>
<td>优化GROUP BY字段顺序或添加索引</td>
</tr>
<tr>
<td><strong>Using join buffer (Block Nested Loop)</strong></td>
<td>连表查询时使用了缓存块，通常因为 <strong>被驱动表无索引</strong> 时，MySQL先将驱动表读出放到 <strong>join buffer</strong> 中，<strong>再遍历</strong>被驱动表与驱动表进行查询</td>
<td>⚠️ 中</td>
<td>为关联字段添加索引</td>
</tr>
<tr>
<td><strong>Select tables optimized away</strong></td>
<td>查询已被优化到只需读取索引（如MIN/MAX使用索引）</td>
<td>✅ 极优</td>
<td>保持即可</td>
</tr>
</tbody>
</table>
<p>这里提醒下，当 Extra 列包含 <span style="color: red"><b>Using filesort </b></span>或 <span style="color: red"><b>Using temporary</b></span> 时，MySQL 的性能可能会存在问题，需要尽可能避免。</p>
<h3 id="_3-案例" tabindex="-1"><a class="header-anchor" href="#_3-案例"><span>3. 案例</span></a></h3>
<h5 id="索引对比说明" tabindex="-1"><a class="header-anchor" href="#索引对比说明"><span><strong>索引对比说明</strong></span></a></h5>
<p>创建如下两个不同顺序的索引</p>
<div class="language-sql line-numbers-mode" data-highlighter="shiki" data-ext="sql" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">CREATE</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> INDEX</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> idx_logrecord_query</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> ON</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> SyncLogRecord(log_type, analysis_job_id, flow_hidden,create_at);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">CREATE</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> INDEX</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> idx_logrecord_query5</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> ON</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> SyncLogRecord(create_at, analysis_job_id, log_type, flow_hidden);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是使用两个索引的执行计划对比</p>
<div class="language-sql line-numbers-mode" data-highlighter="shiki" data-ext="sql" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">EXPLAIN </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">SELECT</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> COUNT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(*) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">FROM</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> `SyncLogRecord`</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> force</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> index</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(idx_logrecord_query)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">WHERE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> create_at </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">>=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '2025-07-10 12:34:43'</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">AND</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> create_at </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x3C;=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '2025-08-18 09:10:27'</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">AND</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> log_type </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'video'</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">AND</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> analysis_job_id</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'87f15d0a5b7642eda557758905c68d90'</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">AND</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> flow_hidden</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">+</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">---------------------------------------------------------------------------------------------------------------------------------------------------------------------+</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| id | select_type | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">table</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">          | partitions | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">type</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  | possible_keys       | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">key</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                 | key_len | ref  | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">rows</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  | filtered | Extra                      |</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">|</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">----|-------------|----------------|------------|-------|---------------------|---------------------|---------|------|-------|----------|----------------------------|</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  | </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">`SIMPLE`</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    | SyncLogRecord  | </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">`NULL`</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">     | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">range</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | idx_logrecord_query | idx_logrecord_query | </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2051</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">NULL</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">44909</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">100</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">00</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">   | </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">`Using where; Using index`</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> |</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">EXPLAIN </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">SELECT</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> COUNT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(*) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">FROM</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> `SyncLogRecord`</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> force</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> index</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(idx_logrecord_query5)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">WHERE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> create_at </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">>=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '2025-07-10 12:34:43'</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">AND</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> create_at </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x3C;=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '2025-08-18 09:10:27'</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">AND</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> log_type </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'video'</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">AND</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> analysis_job_id</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'87f15d0a5b7642eda557758905c68d90'</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">AND</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> flow_hidden</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">+</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">---------------------------------------------------------------------------------------------------------------------------------------------------------------------+</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| id | select_type | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">table</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">          | partitions | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">type</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  | possible_keys       | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">key</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                 | key_len | ref  | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">rows</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  | filtered | Extra                      |</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">|</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">----|-------------|----------------|------------|-------|---------------------|---------------------|---------|------|-------|----------|----------------------------|</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  | </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">`SIMPLE`</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    | SyncLogRecord  | </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">`NULL`</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">     | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">range</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | idx_logrecord_query5| idx_logrecord_query5| </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2051</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">NULL</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">44909</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">00</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">     | </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">`Using where; Using index`</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> |</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">+</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">---------------------------------------------------------------------------------------------------------------------------------------------------------------------+</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如下实际索引和索引示意图</p>
<Mermaid id="mermaid-701" code="eJyFVE1PGkEYvvsrJiQGTRcyM7AukGBC7cW0B9L0ZprNwq66jXUN0g8TD6YqYoL1o9oaPw42pvUC6aEaW5AfYxxkT/yFvrO77I4UYsJhZ55nnvd5n5mX6TnrQ35WKxTRq2dDCA0PI3ul3m7utn+W2HGz0zhqVTbZ+RbbKdv7NTQyZ82oxaUFQ0LavDa3tGguqm+snGrqEuJK6qyp68a8hPIFQysaqlYcRfdHa6z6ja1fs7/b9/W1+/qGW4eV1u3VC/vs8u76M9u+YtUd+LZXb25XTlj1kJ0ftU7P2rVf7ObgduW00zj2+e4mu/nOfnwCgyOwy8olsDeKIuPI1WlVNuy9Mj/VVe45xWqV1sFv3tMTdHddh48hsLX4LjdT0BZmURZPhV5aVjFw2WmURU+dxmboNZxAQDXJVGgkbL7VZoyw4yFLAoxy7L2pG5aH0QCLOZhl5rvnYg5mzOvcTBajSGR8uRt52quwDPL9ULcGoLQv6lQBNAbokNAonZwKiU3CffO7hStFrLwHwQqdUi1oRgonlGki69FotNtYxuflRJ6WyxMaE3hPfV5e5E0njYSuCLyJB2lQ3hH36ywmnf56HmHa84Q1OaeMxamha7KsKHIiieX8WEJPYiefTKDA3TxYTTjxiPlk1J6EWGmLh+S892j0/5Ay8Hb6pSRhp68XFAdU5+X0oRKP6j4kP4KM5xI8uWvVzUGYvTRe5iUGwoTDhMvxGexOB5+I6mFrv+nOhT/xMJvudHQaFfbnqnWyCVPMtitsZ9f+0myfXYhZQVlIqisp8ZD8/wHkHvU6B2ZhUOtYClNM5QhWIgQjQlOxeCoeC0so+zwNhFFBQpitgRIEYZxyfn0lYARhR9iIP6aZiJAEwskUwSmq9Gh6FyUkAl0+SIStX93Vv4q51C796uRj4IZL/QPjJhE/"></Mermaid><p><strong>1. 高效索引：</strong> <code v-pre>(log_type, analysis_job_id, flow_hidden, create_at)</code></p>
<Mermaid id="mermaid-705" code="eJyVkk9LwmAcx++9igdEvDjZnlBDWBBop9ghOghDxqN7pqvlI+4hEzyE4aEw6lLRrW5dtD+EJFGvxs31Lhp7RtsMRz638f18vs9vz/PU26jVAHvFNeCuXUKobN9PnfP+vD+tAI7b7BmkrtBuC4upI13FJNUDElGxIM/eR9+3b4wUKr/6gqMfojr2HRhxIHO8Mk9CRtfUTWWfVBVdFVMbeU3IqplMxrV3MNIE2bqcWKOryI4hu7ngo2pNgOuBDyO+v7tX7PmaQTpKQ1dV3BT5NKi1MaJYQVSEPMxyfJ4T+B4oIooE2b5+ti/GzsPQH2KVEoGVwKDkzyTuyAySAkgKIBiFyrI1mMw+bhjKMJN2Dew3mrRNDnAhwbtL09Lsk+voKm0UYOs4xHs/tyIPV+Slf/EAJJPAGjxaLyfstpzToX335Jy9OuOv+ec4VOo9OU03jEKilCvltrdCGXscMSFcFrKjiwmXmuwQY8JYU4oLy9HwB3ZsTUA="></Mermaid><p><strong>检索路径</strong>（蓝色标注部分）</p>
<ol>
<li>从根节点定位 <code v-pre>log_type='video'</code> 的子树</li>
<li>在中间节点定位 <code v-pre>analysis_job_id='87f15d...'</code></li>
<li>在叶子节点过滤 <code v-pre>flow_hidden=0</code>并扫描 <code v-pre>create_at</code>范围</li>
<li>直接返回匹配的连续数据块</li>
</ol>
<p><strong>2. 低效索引：</strong> <code v-pre>(create_at, analysis_job_id, log_type, flow_hidden)</code></p>
<Mermaid id="mermaid-734" code="eJxLL0osyFAIceFSAIKg/PyS6GcLdr7oanretDNWQVfXria5KDWxJDU+scTWyMDIVNfAEIhqFPzyU1INo5/sWPty+haIasNYuBFY9ZnA9Rmh6DMioM9c19AAos8YRZ8xRB9YAlXji57mp7O31Cj4pCamGUY/7d/2dO0EFDcS0GOEogfqPrBhYD2JeYk5lcWZxfFZ+UnxmSm26oZGxolJyXp6euo6Cjn56fEllQWptuolqRUl6jUKLokliaCA6n3as/Nlay9BwyzM0wxNU9ANK8tMSc2HmmYU/XJOw8uGCc/mLny2uOHZ/KUIM43INdMYu5nFJZU5qVDXFpcU5WenWimnpRkAgQ6Eq1uemVKSYWVUUIGm3ogE9WBPkajemCj1CqqqCk9bVzzd2ACJyxfNPc9mrn/RuenFun3P965DMhOc/NIyc3KslF3NXM3cHJHkwGkdn6QRPkljXJKQYMUjidNYcJrCJ4lXJ5qDABZ6bhw="></Mermaid><p><strong>检索路径</strong>（红色标注部分）：</p>
<ol>
<li>从根节点扫描 <code v-pre>create_at</code> 范围（<em>2025-07-10 到 2025-08-18</em>）</li>
<li>加载所有匹配的叶子节点（<em>44,909 行</em>）</li>
<li>对每行数据逐条检查：
<ul>
<li><code v-pre>if analysis_job_id='87f15d...'?</code></li>
<li><code v-pre>if log_type='video' ?</code></li>
<li><code v-pre>if flow_hidden=0 ?</code></li>
</ul>
</li>
<li>最终返回匹配数据</li>
</ol>
<h5 id="关键差异对比及总结" tabindex="-1"><a class="header-anchor" href="#关键差异对比及总结"><span><strong>关键差异对比及总结</strong></span></a></h5>
<table>
<thead>
<tr>
<th style="text-align:center">特性</th>
<th style="text-align:center">高效索引</th>
<th style="text-align:center">低效索引</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><strong>B+树组织方式</strong></td>
<td style="text-align:center">按等值列分组后范围扫描</td>
<td style="text-align:center">按范围列分组后逐条过滤</td>
</tr>
<tr>
<td style="text-align:center"><strong>叶子节点访问模式</strong></td>
<td style="text-align:center">顺序访问连续区块</td>
<td style="text-align:center">随机访问分散节点</td>
</tr>
<tr>
<td style="text-align:center"><strong>存储引擎过滤</strong></td>
<td style="text-align:center">完全在索引层完成</td>
<td style="text-align:center">仅能过滤 <code v-pre>create_at</code>，其他条件回 <strong>Server</strong> 层</td>
</tr>
<tr>
<td style="text-align:center"><strong>I/O次数</strong></td>
<td style="text-align:center">3-4次树高访问 + 少量顺序读</td>
<td style="text-align:center">3-4次树高访问 + 大量随机读</td>
</tr>
</tbody>
</table>
<ol>
<li><strong>高效索引</strong>
<ul>
<li>等值条件（<code v-pre>log_type</code>等）快速收敛到子树，<strong>大幅减少扫描范围</strong></li>
<li>范围查询（<code v-pre>create_at</code>）仅在最终的小数据集上执行</li>
</ul>
</li>
<li><strong>低效索引</strong>
<ul>
<li>范围查询前置导致<strong>必须加载所有日期匹配的叶子节点</strong></li>
<li>后续等值条件无法利用索引有序性，变成<strong>暴力扫描</strong></li>
</ul>
</li>
<li><strong>B+树特性</strong>
<ul>
<li>非叶子节点仅存储导航键值，叶子节点通过链表连接</li>
<li><strong>索引列顺序决定数据的物理排序方式</strong>，影响检索路径</li>
</ul>
</li>
</ol>
<p><strong>为啥有 Using Where ？</strong></p>
<p><strong>Using where 显示 ≠ 性能问题</strong> ，这里仅表示<strong>最终校验</strong>，即使索引全覆盖且时间精确到秒级，MySQL 依然要对时间边界和条件组合做最终校验，在 <code v-pre>Using index</code>+ <code v-pre>filtered=100%</code> 时，<code v-pre>Using where </code>的损耗通常小于 <strong>0.1%</strong> 的查询总耗时</p>
<p>✅ <code v-pre>type=range</code>（已优化）</p>
<p>✅ <code v-pre>key_len</code>（完全覆盖）</p>
<p>✅ <code v-pre>filtered=100%</code></p>
</div></template>


