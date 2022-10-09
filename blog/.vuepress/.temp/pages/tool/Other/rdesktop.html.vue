<template><div><p><a href="https://github.com/rdesktop" target="_blank" rel="noopener noreferrer">rdesktop<ExternalLinkIcon/></a> 是微软 <strong>RDP</strong> 协议的开源客户端</p>
<!-- more -->
<h1 id="rdesktop远程工具" tabindex="-1"><a class="header-anchor" href="#rdesktop远程工具" aria-hidden="true">#</a> rdesktop远程工具</h1>
<h3 id="_1-安装" tabindex="-1"><a class="header-anchor" href="#_1-安装" aria-hidden="true">#</a> 1. 安装</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">apt-get</span> <span class="token function">install</span> rdesktop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-使用命令" tabindex="-1"><a class="header-anchor" href="#_2-使用命令" aria-hidden="true">#</a> 2. 使用命令</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>-d: 域
-s: shell命令 <span class="token punctuation">(</span>登录运行命令之后就退出<span class="token punctuation">)</span>
-c: 工作目录（应该是-s的子命令），-s shell命令的一个参数
-p: password <span class="token punctuation">(</span>- to prompt<span class="token punctuation">)</span>
-n: 客户端（本地）主机名，默认为本地主机名
-k: 服务器上的键盘布局选择 <span class="token punctuation">(</span>en-us, de, sv, etc.<span class="token punctuation">)</span>
-g: 桌面分辨率（宽x高）
-i: enables smartcard authentication, password is used as pin
-f: 全屏模式（Ctrl + Alt + Enter 退出全屏模式）
-b: 强制位图刷新（没发现什么用）
-L: 本地编码
-A: 无缝虚拟应用程序到本地
-B: use BackingStore of X-server <span class="token punctuation">(</span>if available<span class="token punctuation">)</span>
-e: disable encryption <span class="token punctuation">(</span>French TS<span class="token punctuation">)</span> 禁用加密
-E: disable encryption from client to server 从客户端到服务器，禁用加密。
-m: 不允许拖动（不传递鼠标的拖动事件）
-C: use private colour map
-D: 不显示窗口标题栏（只有远程桌面窗口，没有关闭和最小化按钮）
-K: 窗口切换快捷热键（Alt+Tab）不传递到远程桌面
-S: 标题按钮的大小，个人觉得这个参数很无用，或者我还没弄明白到底什么意思。
-T: 窗口标题
-t: disable use of remote ctrl
-N: 数字键盘同步
-X: 给定另一个窗口的标识，嵌入到另一个窗口
-a: connection colour depth 选择颜色深度
-z: 启用rdp压缩
-x: RDP5 experience <span class="token punctuation">(</span>m<span class="token punctuation">[</span>odem <span class="token number">28.8</span><span class="token punctuation">]</span>, b<span class="token punctuation">[</span>roadband<span class="token punctuation">]</span>, l<span class="token punctuation">[</span>an<span class="token punctuation">]</span> or hex nr.<span class="token punctuation">)</span>
-P: 持久位图缓存
-r: 设备重定向（参数可以重复使用）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>示例：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 尽可能快速输出的将剪贴板和声音映射过去</span>
rdesktop <span class="token parameter variable">-P</span> <span class="token parameter variable">-r</span> clipboard:PROMARYCLIPBOARD <span class="token parameter variable">-r</span> sound:local <span class="token number">192.168</span>.3.75
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_3-问题" tabindex="-1"><a class="header-anchor" href="#_3-问题" aria-hidden="true">#</a> 3. 问题</h3>
<ul>
<li>
<p>解决声音失效的办法</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 要找出哪些进程正在访问声音设备</span>
<span class="token function">lsof</span> /dev/snd/*

<span class="token comment"># 干掉它</span>
<span class="token function">fuser</span> /dev/snd/*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</div></template>


