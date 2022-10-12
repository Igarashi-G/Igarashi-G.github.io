<template><div><h1 id="etcd-v3-基础使用" tabindex="-1"><a class="header-anchor" href="#etcd-v3-基础使用" aria-hidden="true">#</a> ETCD V3 基础使用</h1>
<h2 id="一、区别" tabindex="-1"><a class="header-anchor" href="#一、区别" aria-hidden="true">#</a> 一、区别</h2>
<h5 id="_1-兼容性" tabindex="-1"><a class="header-anchor" href="#_1-兼容性" aria-hidden="true">#</a> 1.兼容性：</h5>
<p>etcd2 和 etcd3 是不兼容的，两者的 api 参数也不一样，详细请查看 etcdctl -h</p>
<h5 id="_2-写入" tabindex="-1"><a class="header-anchor" href="#_2-写入" aria-hidden="true">#</a> 2.写入：</h5>
<p>可以使用 api2 和 api3 写入 etcd3 数据，但是需要注意，使用不同的 api 版本写入数据需要使用相应的 api 版本读取数据</p>
<h5 id="_3-列目录" tabindex="-1"><a class="header-anchor" href="#_3-列目录" aria-hidden="true">#</a> 3.列目录：</h5>
<p>etcd3 没有 ls 使用 get 替代</p>
<ul>
<li>
<p>api 2 使用方法</p>
<pre><code>  ETCDCTL_API=2 etcdctl ls /
</code></pre>
</li>
<li>
<p>api 3 使用方法</p>
<pre><code>  ETCDCTL_API=3 etcdctl get /
</code></pre>
</li>
</ul>
<p>例如：</p>
<ul>
<li>
<p>查询所有 key 或 value :</p>
<pre><code>  $ export ETCDCTL_API=3
  $ export ETCD_ENDPOINTS=&quot;https://172.16.120.31:2379,https://172.16.120.32:2379,https://172.16.120.33:2379&quot;
  $ etcdctl --endpoints=${ETCD_ENDPOINTS} get / --prefix --keys-only
  $ etcdctl --endpoints=${ETCD_ENDPOINTS} get / --prefix --print-value-only |jq [.]
</code></pre>
</li>
<li>
<p>使用证书查询：</p>
<pre><code>  $ export ETCDCTL_API=3
  $ etcdctl --endpoints=${ETCD_ENDPOINTS} --cacert=/etc/kubernetes/ssl/ca.pem --cert=/etc/kubernetes/ssl/admin.pem --key=/etc/kubernetes/ssl/admin-key.pem --prefix --keys-only=true get /
</code></pre>
</li>
</ul>
<h5 id="_4-修改键值对" tabindex="-1"><a class="header-anchor" href="#_4-修改键值对" aria-hidden="true">#</a> 4.修改键值对:</h5>
<ul>
<li>
<p>api v2 版本：</p>
<pre><code>  $ etcdctl set test hello
</code></pre>
</li>
<li>
<p>api v3 版本：</p>
<pre><code>  $ etcdctl put test hello
</code></pre>
</li>
</ul>
<p>参考：<a href="https://github.com/coreos/etcd/issues/6904" target="_blank" rel="noopener noreferrer">https://github.com/coreos/etcd/issues/6904<ExternalLinkIcon/></a></p>
<h4 id="环境变量" tabindex="-1"><a class="header-anchor" href="#环境变量" aria-hidden="true">#</a> 环境变量：</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># etcd v3 环境变量</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">ETCDCTL_WRITE_OUT</span><span class="token operator">=</span><span class="token string">"table"</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">ETCDCTL_API</span><span class="token operator">=</span><span class="token number">3</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">ETCDCTL_ENDPOINTS</span><span class="token operator">=</span><span class="token string">"172.16.120.141:22379,172.16.120.142:22379,172.16.120.143:22379"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


