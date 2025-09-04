<template><div><h1 id="mysql调优" tabindex="-1"><a class="header-anchor" href="#mysql调优"><span>Mysql调优</span></a></h1>
<h3 id="_1-执行计划分析" tabindex="-1"><a class="header-anchor" href="#_1-执行计划分析"><span>1. 执行计划分析</span></a></h3>
<h4 id="_1-1-什么是执行计划" tabindex="-1"><a class="header-anchor" href="#_1-1-什么是执行计划"><span>1.1 什么是执行计划</span></a></h4>
<p><strong>执行计划:</strong>  指一条 SQL 语句在经过 <strong>MySQL 查询优化器</strong> 的优化后，具体的执行方式，常用于 <strong>SQL 性能分析、优化</strong> 等场景。</p>
<div class="language-sql line-numbers-mode" data-highlighter="shiki" data-ext="sql" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">EXPLAIN + </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">SELECT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> / </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">UPDATE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> / </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">DELETE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">... 查询语句；</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>通过 <code v-pre>EXPLAIN</code> 的结果，能看到目标SQL 可 <strong>命中那些 索引、是什么 type、多少行记录被查询</strong> 等</p>
<p>支持 <code v-pre>SELECT</code>、<code v-pre>DELETE</code>、<code v-pre>INSERT</code>、<code v-pre>REPLACE</code> 以及 <code v-pre>UPDATE</code> 语句</p>
<h4 id="_1-2-执行计划示例" tabindex="-1"><a class="header-anchor" href="#_1-2-执行计划示例"><span>1.2 执行计划示例</span></a></h4>
<div class="language-sql line-numbers-mode" data-highlighter="shiki" data-ext="sql" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">EXPLAIN </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">SELECT</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> COUNT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(*) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">FROM</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> `SyncLogRecord`</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> force</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> index</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(idx_logrecord_query)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">WHERE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> create_at </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">>=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '2025-07-01 00:00:00'</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">AND</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> create_at </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x3C;=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '2025-08-18 00:00:00'</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">AND</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> log_type </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'video'</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">AND</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> analysis_job_id</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'87f15d0a5b7642eda557758905c68d90'</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">AND</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> flow_hidden</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">+</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">----+-------------+----------+------------+-------+-----------------+---------+---------+------+--------+----------+-------------+</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| id | select_type | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">table</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    | partitions | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">type</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  | possible_keys   | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">key</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">     | key_len | ref  | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">rows</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">   | filtered | Extra       |</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">+</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">----+-------------+----------+------------+-------+-----------------+---------+---------+------+--------+----------+-------------+</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">|  </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">PRIMARY</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">     | dept_emp | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">NULL</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">       | ALL   | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">NULL</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">NULL</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">NULL</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">NULL</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">331143</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> |   </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">100</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">00</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">Using</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> where</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> |</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">|  </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | SUBQUERY    | dept_emp | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">NULL</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">       | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">index</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">PRIMARY</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,dept_no | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">PRIMARY</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">16</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">      | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">NULL</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">331143</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> |   </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">100</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">00</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">Using</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> index</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> |</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">+</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">----+-------------+----------+------------+-------+-----------------+---------+---------+------+--------+----------+-------------+</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行计划结果中共有 12 列，各列代表的含义总结如下表：</p>
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
</div></template>


