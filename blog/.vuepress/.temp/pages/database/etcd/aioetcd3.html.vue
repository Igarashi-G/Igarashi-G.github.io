<template><div><p><strong>Python</strong> 开源的异步 <strong>etcd v3</strong> 库，依然不够完善好用</p>
<!-- more -->
<h1 id="aioetcd3" tabindex="-1"><a class="header-anchor" href="#aioetcd3" aria-hidden="true">#</a> aioetcd3</h1>
<p>异步 <strong>etcd v3</strong> 版本的库，借助于 <a href="https://github.com/hubo1016/aiogrpc" target="_blank" rel="noopener noreferrer">aiogrpc<ExternalLinkIcon/></a> 开源库实现（<em>模拟的异步</em>）因此存在些许局限</p>
<ul>
<li>地址: <a href="https://github.com/gaopeiliang/aioetcd3" target="_blank" rel="noopener noreferrer">github|aioetcd3<ExternalLinkIcon/></a></li>
<li>引用库 <a href="https://github.com/hubo1016/aiogrpc" target="_blank" rel="noopener noreferrer">aiogrpc<ExternalLinkIcon/></a> 使用 <code v-pre>__anext__</code>、<code v-pre>loop.call_soon_threadsafe</code> 、<code v-pre>run_in_executor</code> 等实现</li>
<li>新版本官方已推出异步 <strong>gRPC</strong> <a href="/back_end/python/%E7%94%9F%E6%80%81/rpc/grpc" target="_blank" rel="noopener noreferrer">grpc.aio<ExternalLinkIcon/></a></li>
</ul>
<h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ pip <span class="token function">install</span> aioetcd3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_1-使用说明" tabindex="-1"><a class="header-anchor" href="#_1-使用说明" aria-hidden="true">#</a> 1. 使用说明</h2>
<h4 id="_1-1-开源参考" tabindex="-1"><a class="header-anchor" href="#_1-1-开源参考" aria-hidden="true">#</a> 1.1 开源参考</h4>
<p><a href="https://github.com/matrixji/eha/blob/master/eha/agent/server.py" target="_blank" rel="noopener noreferrer">server<ExternalLinkIcon/></a></p>
<h5 id="缺陷" tabindex="-1"><a class="header-anchor" href="#缺陷" aria-hidden="true">#</a> 缺陷:</h5>
<p>当多个 <code v-pre>endpoints</code> 时，如下：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"etcd_endpoints"</span><span class="token operator">:</span> <span class="token string">"ipv4:///172.16.120.141:22379,172.16.120.142:22379,172.16.120.143:22379"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>若 <strong>172.16.120.141</strong> 离线，该库依然有概率生成 <strong>141</strong> 的错误连接，导致不可用</li>
<li>需手动捕获异常且 <code v-pre>update_server_list</code> 容错处理</li>
</ul>
<h4 id="_1-2-简单封装" tabindex="-1"><a class="header-anchor" href="#_1-2-简单封装" aria-hidden="true">#</a> 1.2 简单封装</h4>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> pathlib <span class="token keyword">import</span> Path

<span class="token keyword">from</span> aioetcd3<span class="token punctuation">.</span>client <span class="token keyword">import</span> Client

<span class="token keyword">from</span> dashboard <span class="token keyword">import</span> settings
<span class="token keyword">from</span> rook<span class="token punctuation">.</span>parser <span class="token keyword">import</span> json_config

__all__ <span class="token operator">=</span> <span class="token punctuation">(</span>
    <span class="token string">"EtcdProxy"</span><span class="token punctuation">,</span>
    <span class="token string">"get_db"</span>
<span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">load_endpoints</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token comment"># 通过读json文件获取endpoints</span>
    endpoints <span class="token operator">=</span> <span class="token boolean">None</span>
    <span class="token keyword">if</span> Path<span class="token punctuation">(</span>settings<span class="token punctuation">.</span>ETCD_CONFIG<span class="token punctuation">)</span><span class="token punctuation">.</span>exists<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        conf <span class="token operator">=</span> json_config<span class="token punctuation">.</span>JsonConfig<span class="token punctuation">(</span>settings<span class="token punctuation">.</span>ETCD_CONFIG<span class="token punctuation">)</span>
        endpoints <span class="token operator">=</span> conf<span class="token punctuation">.</span>get_key<span class="token punctuation">(</span><span class="token string">"etcd_endpoints"</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> endpoints


DEFAULT_ETCD_ENDPOINTS <span class="token operator">=</span> load_endpoints<span class="token punctuation">(</span><span class="token punctuation">)</span>
DEFAULT_ETCD_TIMEOUT <span class="token operator">=</span> <span class="token number">5</span>


<span class="token keyword">class</span> <span class="token class-name">EtcdProxy</span><span class="token punctuation">(</span>Client<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> endpoints<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> <span class="token boolean">None</span><span class="token punctuation">,</span> timeout<span class="token operator">=</span>DEFAULT_ETCD_TIMEOUT<span class="token punctuation">,</span> <span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> endpoints<span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>endpoints <span class="token operator">=</span> endpoints
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>endpoints <span class="token operator">=</span> DEFAULT_ETCD_ENDPOINTS
        <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span>self<span class="token punctuation">.</span>endpoints<span class="token punctuation">,</span> timeout<span class="token operator">=</span>timeout<span class="token punctuation">,</span> <span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__new__</span><span class="token punctuation">(</span>cls<span class="token punctuation">,</span> <span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> <span class="token builtin">hasattr</span><span class="token punctuation">(</span>cls<span class="token punctuation">,</span> <span class="token string">'_instance'</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            cls<span class="token punctuation">.</span>_instance <span class="token operator">=</span> <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__new__<span class="token punctuation">(</span>cls<span class="token punctuation">)</span>
        <span class="token keyword">return</span> cls<span class="token punctuation">.</span>_instance

    <span class="token keyword">def</span> <span class="token function">reset_endpoints</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> endpoints<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> <span class="token boolean">None</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">"""动态设置etcd地址  endpoints: "ipv4://host:port
        """</span>
        <span class="token keyword">global</span> DEFAULT_ETCD_ENDPOINTS
        <span class="token keyword">if</span> endpoints<span class="token punctuation">:</span>
            DEFAULT_ETCD_ENDPOINTS <span class="token operator">=</span> endpoints
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            DEFAULT_ETCD_ENDPOINTS <span class="token operator">=</span> load_endpoints<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">get_db</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> EtcdProxy<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-分布式锁" tabindex="-1"><a class="header-anchor" href="#_2-分布式锁" aria-hidden="true">#</a> 2. 分布式锁</h3>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


