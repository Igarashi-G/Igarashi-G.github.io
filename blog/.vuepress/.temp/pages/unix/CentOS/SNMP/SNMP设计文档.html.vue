<template><div><p><strong>SNMP</strong> 的研发详细设计</p>
<!-- more -->
<h2 id="_1-snmp-详细设计" tabindex="-1"><a class="header-anchor" href="#_1-snmp-详细设计"><span>1. SNMP 详细设计</span></a></h2>
<p><strong>需求：</strong> <strong>UDS</strong> 支持 <strong>SNMPv2c、SNMPv3</strong> 协议</p>
<ul>
<li><strong>SNMPv2c：</strong> 仅需支持一个 <strong>Trap ip</strong> 和 团体名</li>
<li><strong>SNMPv3：</strong> 仅需支持一个<strong>Trap ip</strong>，一个 <strong>USM</strong> 用户，安全级别 <strong>只支持既 认证 又 加密</strong></li>
</ul>
<p><a href="https://so.csdn.net/so/search?q=snmp&amp;spm=1001.2101.3001.7020" target="_blank" rel="noopener noreferrer">SNMPv3</a> 安全级别有三种</p>
<ul>
<li><strong>noAuthNoPriv：</strong> 不认证也不加密</li>
<li><strong>authNoPriv：</strong> 认证但是不加密</li>
<li><strong>authPriv：</strong> 既认证又加密</li>
</ul>
<p><strong>功能影响范围：</strong> 监控告警模块，警告发生时，给出 <strong>snmptrap</strong> 接口调用</p>
<h3 id="_1-2-snmpv2c" tabindex="-1"><a class="header-anchor" href="#_1-2-snmpv2c"><span>1.2 SNMPv2c</span></a></h3>
<p>支持设置下列配置项</p>
<ol>
<li>
<p><strong>Trap IP地址：</strong> 接收 <strong>SNMP Trap</strong> 信息的 <strong>SNMP</strong> 服务器的 <strong>IP</strong> 地址</p>
<blockquote>
<p>提示要求：请填写正确 <strong>IP</strong>，并执行 <strong>IP</strong> 地址判定，支持 <strong>IPv4</strong> 或 <strong>IPv6</strong> 地址</p>
</blockquote>
</li>
<li>
<p><strong>Trap端口号：</strong> 使用 <strong>Trap</strong> 时，一般端口为<strong>162</strong></p>
<blockquote>
<p>提示要求：设置 <strong>162</strong> 为端口号默认值，端口取值范围为 <strong>1～65535</strong></p>
</blockquote>
</li>
<li>
<p><strong>团体字:</strong> <strong>SNMP</strong> 服务器使用的团体字，<strong>Trap</strong> 信息中的一种差异性标识，类似于 <strong>密码</strong>，用于限制 <strong>SNMP</strong> 网络管理系统 与 <strong>SNMP</strong> 管理代理之间的通信，缺省为 <strong>public</strong></p>
<blockquote>
<p>提示要求：字符串形式，不支持空格，区分大小写，长度范围是 <strong>4～32</strong></p>
</blockquote>
</li>
</ol>
<h3 id="_1-3-snmpv3" tabindex="-1"><a class="header-anchor" href="#_1-3-snmpv3"><span>1.3 SNMPv3</span></a></h3>
<p>支持设置下列配置项：</p>
<ol>
<li>
<p><strong>Trap IP地址：</strong> 接收 <strong>SNMP Trap</strong> 信息的 <strong>SNMP</strong> 服务器的 <strong>IP</strong> 地址</p>
<blockquote>
<p>提示要求：请填写正确 <strong>IP</strong>，并执行 <strong>IP</strong> 地址判定，支持 <strong>IPv4</strong> 或 <strong>IPv6</strong> 地址</p>
</blockquote>
</li>
<li>
<p><strong>Trap端口号：</strong> 使用 <strong>Trap</strong> 时，一般端口为<strong>162</strong></p>
<blockquote>
<p>提示要求：设置 <strong>162</strong> 为端口号默认值，端口取值范围为 <strong>1～65535</strong></p>
</blockquote>
</li>
<li>
<p><strong>USM用户：</strong></p>
<blockquote>
<p>提示要求：用户不能重复，由字母、数字、<code v-pre>“_”</code> 和 <code v-pre>“-”</code> 组成，且首字符只能是字母，长度范围是 <strong>4～32</strong></p>
</blockquote>
</li>
<li>
<p><strong>认证算法（<em>可选</em>）：</strong> <strong>MD5、SHA</strong> ，认证鉴权算法</p>
</li>
<li>
<p><strong>认证密码：</strong> 长度范围根据 <strong>SNMP</strong> 安全策略变化而变化</p>
<blockquote>
<p>提示要求：取值范围按需变化，必须包含大写字母、小写字母、数字和特殊字符中任意三种</p>
</blockquote>
</li>
<li>
<p><strong>加密协议（<em>可选</em>）：</strong> <strong>DES、AES</strong>，传输加密算法</p>
</li>
<li>
<p><strong>加密密码：</strong> 长度范围根据 <strong>SNMP</strong> 安全策略变化而变化</p>
<blockquote>
<p>提示要求：取值范围按需变化，必须包含大写字母、小写字母、数字和特殊字符中任意三种，<strong>数据加密密码不能和鉴权密码一样</strong></p>
</blockquote>
</li>
</ol>
<p><strong>限制 1</strong>：增加用户的时候，<strong>SNMP</strong> 必须关闭，否则有如下报错</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># Apparently at least one snmpd demon is already running.</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">#  You must stop them in order to use this command.</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>限制 2</strong>：设置 <strong>SNMP Trap v3</strong>，添加 <strong>USM</strong> 用户时，需要同时操作所有节点添加</p>
<h3 id="_1-4-服务高可用" tabindex="-1"><a class="header-anchor" href="#_1-4-服务高可用"><span>1.4 服务高可用</span></a></h3>
<p>目前告警由 <strong>ufs-alarm.service</strong> 的集群 <strong>leader</strong> 发送，所有节点都存在此服务</p>
<h3 id="_1-5-mib-管理对象" tabindex="-1"><a class="header-anchor" href="#_1-5-mib-管理对象"><span>1.5 MIB 管理对象</span></a></h3>
<p><strong>固定前导：1.3.6.1.4.1.</strong></p>
<p><strong>UIT企业节点：30901.</strong></p>
<p><strong>UDS子节点（产品线自定义）：9.10.</strong></p>
<p><strong>UDS OID前导：</strong></p>
<p><strong>1.3.6.1.4.1.30901.9.10.X</strong></p>
<table>
<thead>
<tr>
<th><strong>OID</strong></th>
<th><strong>数据类型</strong></th>
<th><strong>含义</strong></th>
<th><strong>实现规格</strong></th>
<th><strong>状态</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>idOID:1.3.6.1.4.1.xxxx.x.x.1</td>
<td>DisplayString</td>
<td>告警 <strong>ID</strong></td>
<td>read-only</td>
<td>current</td>
</tr>
<tr>
<td>codeOID:1.3.6.1.4.1.xxxx.x.x.2</td>
<td>INTEGER</td>
<td>告警规则编号</td>
<td>read-only</td>
<td>current</td>
</tr>
<tr>
<td>resourceOID:1.3.6.1.4.1.xxxx.x.x.3</td>
<td>DisplayString</td>
<td>告警类型： <strong>SYSTEM、NODE、USER、PROCESS、FS</strong></td>
<td>read-only</td>
<td>current</td>
</tr>
<tr>
<td>istanceOID:1.3.6.1.4.1.xxxx.x.x.4</td>
<td>DisplayString</td>
<td>实例实例: <strong>CLUSTER、NODE、DISK、SERVICE</strong></td>
<td>read-only</td>
<td>current</td>
</tr>
<tr>
<td>levelOID:1.3.6.1.4.1.xxxx.x.x.5</td>
<td>DisplayString</td>
<td>告警级别: <strong>CRITICAL、MAJOR、WARNING、INFO</strong></td>
<td>read-only</td>
<td>current</td>
</tr>
<tr>
<td>descriptionOID:1.3.6.1.4.1.xxxx.x.x.6</td>
<td>DisplayString</td>
<td>告警描述</td>
<td>read-only</td>
<td>current</td>
</tr>
<tr>
<td>conditionOID:1.3.6.1.4.1.xxxx.x.x.7</td>
<td>DisplayString</td>
<td>判定条件：**&quot;!=&quot;、&quot;&gt;&quot;、&quot;==&quot;、&quot;&lt;&quot;、&quot;&amp;&quot;、&quot;|&quot; **</td>
<td>read-only</td>
<td>current</td>
</tr>
<tr>
<td>thresholdOID:1.3.6.1.4.1.xxxx.x.x.8</td>
<td>INTEGER32</td>
<td>阈值</td>
<td>read-only</td>
<td>current</td>
</tr>
<tr>
<td>unitOID:1.3.6.1.4.1.xxxx.x.x.9</td>
<td>DisplayString</td>
<td>单位：<strong>&quot;null&quot;、&quot;%&quot;、&quot;B&quot;、&quot;Kib&quot;、&quot;Mib&quot;、&quot;Gib&quot;、&quot;Tib&quot;、&quot;Pib&quot;、&quot;Eib&quot;、&quot;s&quot;、&quot;min&quot;、&quot;hour&quot;、&quot;day&quot;、&quot;month&quot;、&quot;year&quot;</strong></td>
<td>read-only</td>
<td>current</td>
</tr>
<tr>
<td>createdAtOID:1.3.6.1.4.1.xxxx.x.x.10</td>
<td>DisplayString</td>
<td>发生时间</td>
<td>read-only</td>
<td>current</td>
</tr>
<tr>
<td>is_resolveOID:1.3.6.1.4.1.xxxx.x.x.11</td>
<td>DisplayString</td>
<td>是否解决</td>
<td>read-only</td>
<td>current</td>
</tr>
<tr>
<td>resolveAtOID:1.3.6.1.4.1.xxxx.x.x.12</td>
<td>DisplayString</td>
<td>告警解决时间</td>
<td>read-only</td>
<td>current</td>
</tr>
<tr>
<td>isMultipleInstanceOID:1.3.6.1.4.1.xxxx.x.x.13</td>
<td>DisplayString</td>
<td>多个告警实例</td>
<td>read-only</td>
<td>current</td>
</tr>
<tr>
<td>reasonOID:1.3.6.1.4.1.xxxx.x.x.14</td>
<td>DisplayString</td>
<td>触发原因</td>
<td>read-only</td>
<td>current</td>
</tr>
<tr>
<td>effectOID:1.3.6.1.4.1.xxxx.x.x.15</td>
<td>DisplayString</td>
<td>影响</td>
<td>read-only</td>
<td>current</td>
</tr>
<tr>
<td>solutionOID:1.3.6.1.4.1.xxxx.x.x.16</td>
<td>DisplayString</td>
<td>解决方法</td>
<td>read-only</td>
<td>current</td>
</tr>
<tr>
<td>isClearOID:1.3.6.1.4.1.xxxx.x.x.17</td>
<td>DisplayString</td>
<td>是下清除</td>
<td>read-only</td>
<td>current</td>
</tr>
</tbody>
</table>
<h2 id="_2-snmp-接收端配置" tabindex="-1"><a class="header-anchor" href="#_2-snmp-接收端配置"><span>2. SNMP 接收端配置</span></a></h2>
<p><strong>UFS 页面配置：</strong> 页面 <strong>SNMP</strong> 配置参数如下图所示（<em>仅供参考</em> ）</p>
<img src="@source/unix/CentOS/SNMP/img/snmp配置.jpg" /> 
<h4 id="snmp-接收端配置" tabindex="-1"><a class="header-anchor" href="#snmp-接收端配置"><span><strong>SNMP 接收端配置</strong></span></a></h4>
<p>创建 <code v-pre>/opt/snmp/log.sh</code> 脚本，键入如下：</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">read</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> host</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">read</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ip</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">read</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> test</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">vars</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">while</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> read</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> oid</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> val</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">do</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">  if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [ </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$vars</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ""</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ]</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">  then</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    vars</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$oid</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> = </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$val</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">  else</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    vars</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$vars</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$oid</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> = </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$val</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">  fi</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">done</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> trap:</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic"> $1</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $host</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $ip</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $vars</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> >></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">/tmp/checkfile</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "xxx.end  "</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> >></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">/tmp/checkfile</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>该脚本会将接收的 <strong>snmptrap</strong> 信息写到文件 <code v-pre>/tmp/checkfile</code> 下</li>
</ul>
<p><strong>获取 EngineID：</strong> 类似 <code v-pre>0x80001f8880c317952bdbdb8a6300000000</code> 的 <strong>ID</strong> ，需要先去对应的 <strong>UFS</strong> 节点执行 如下命令</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 每台机器应该唯一</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> grep</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> old</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /var/lib/net-snmp/snmpd.conf</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># oldEngineID 0x80001f8880c317952bdbdb8a6300000000</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后修改  <code v-pre>/etc/snmp/snmptrapd.conf</code> 配置文件，<strong>createUser</strong> 键入如上 <strong>ID</strong></p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># Example configuration file for snmptrapd</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">#</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># No traps are handled by default, you must edit this file!</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">#</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># authCommunity   log,execute,net public</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># traphandle SNMPv2-MIB::coldStart    /usr/bin/bin/my_great_script cold</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">#</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">createUser</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -e</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0x80001f88801196ae461af31b6400000000</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> abcm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> SHA</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "Aa1234567*$"</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> AES</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "Bb1234567#"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">createUser</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -e</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0x80001f88801e48667a1af31b6400000000</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> abcm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> SHA</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "Aa1234567*$"</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> AES</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "Bb1234567#"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">createUser</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -e</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0x80001f8880278f8d411af31b6400000000</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> abcm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> SHA</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "Aa1234567*$"</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> AES</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "Bb1234567#"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 调用 log.sh 脚本 igarashi 为消息前缀可任意填写</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">traphandle</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> default</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /opt/snmp/log.sh</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> igarashi</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">#</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">##团体字public</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">authCommunity</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> log,execute,net</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> public</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">#</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">##用户abcm</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">authUser</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> log,execute</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> abcm</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">#disableAuthorization yes</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>该配置会接收用户 <strong>abcm</strong> 的 <strong>snmptrap</strong> 信息，并调用 <code v-pre>/opt/snmp/log.sh</code> 脚本存储记录下来</li>
</ul>
<p>重启 <strong>snmptrapd</strong> 服务，使上文配置生效</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> restart</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> snmptrapd</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>之后，在 <strong>snmp</strong> 接收节点执行如下命令查询，并人为制造异常来触发告警进行测试</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> tailf</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /tmp/checkfile</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>此时会看到 <strong>snmp</strong> 结果输出</p>
<img src="@source/unix/CentOS/SNMP/img/snmp接收消息.jpg" />  
<p>日志也会有如下输出**（<em>DEBUG</em> 模式下）**</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> tailf</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /var/log/ufs/ufsdashboard.log</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><img src="@source/unix/CentOS/SNMP/img/SNMP日志.jpg" />
</div></template>


