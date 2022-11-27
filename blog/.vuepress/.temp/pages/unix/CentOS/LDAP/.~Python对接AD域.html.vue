<template><div><p><strong>UFS</strong> 管理平台 通过 <strong>ldap3</strong> 等 <strong>Python</strong> 工具，对接域相关的认证</p>
<!-- more -->
<h1 id="python-对接域认证" tabindex="-1"><a class="header-anchor" href="#python-对接域认证" aria-hidden="true">#</a> Python 对接域认证</h1>
<h2 id="_1-需求分析" tabindex="-1"><a class="header-anchor" href="#_1-需求分析" aria-hidden="true">#</a> 1. 需求分析</h2>
<blockquote>
<p>支持所有存储节点加入到 <strong>AD域 / LDAP</strong></p>
<p><strong>CIFS</strong> 服务（<em>NAS节点</em>）支持 <strong>AD</strong>域 | 本地认证</p>
</blockquote>
<h3 id="_1-1-加入-退出域" tabindex="-1"><a class="header-anchor" href="#_1-1-加入-退出域" aria-hidden="true">#</a> 1.1 加入/退出域</h3>
<h5 id="加入域的场景" tabindex="-1"><a class="header-anchor" href="#加入域的场景" aria-hidden="true">#</a> <strong>加入域的场景</strong></h5>
<ul>
<li><strong>添加/扩容节点后：</strong> 提示 <code v-pre>&quot;当前节点尚未加入域&quot;</code>  <strong>手动执行单节点加入域</strong></li>
<li><strong>加入失败时：</strong> 提示 <code v-pre>&quot;当前节点加入域失败，请检查环境&quot;</code>  <strong>手动执行单节点加入域</strong></li>
</ul>
<h5 id="修改域的场景" tabindex="-1"><a class="header-anchor" href="#修改域的场景" aria-hidden="true">#</a> <strong>修改域的场景</strong></h5>
<ul>
<li>暂不支持</li>
</ul>
<h5 id="退出域的场景" tabindex="-1"><a class="header-anchor" href="#退出域的场景" aria-hidden="true">#</a> <strong>退出域的场景</strong></h5>
<ul>
<li><strong>删除节点前：</strong> 删除节点时校验，若该节点依然在域中，提示 &quot;<code v-pre>请先退出AD/LDAP域，再重试删除</code>&quot;
<ul>
<li>是否支持强制退出域？ 【支持/不支持】</li>
</ul>
</li>
</ul>
<h3 id="_1-2-ad-ldap的配置" tabindex="-1"><a class="header-anchor" href="#_1-2-ad-ldap的配置" aria-hidden="true">#</a> 1.2 AD/LDAP的配置</h3>
<h5 id="ad域配置参数" tabindex="-1"><a class="header-anchor" href="#ad域配置参数" aria-hidden="true">#</a> <strong>AD域配置参数</strong></h5>
<ul>
<li><strong>AD域名：</strong> 如 <code v-pre>uit.devops.local</code></li>
<li><strong>AD DNS IP：</strong> 如 <code v-pre>172.16.70.124</code></li>
<li><strong>管理员账号</strong></li>
<li><strong>管理员密码：</strong>
<ul>
<li>考虑加密</li>
</ul>
</li>
<li>【待定】<strong>过滤器：</strong> 例如 OU、CN 等或自定义的结构，暂不考虑，直接获取所有数据</li>
<li>【待定】<strong>认证方式选择：</strong> 当前基于 <strong>kerberos</strong> 的 <code v-pre>GSS-API SASL</code> 认证
<ul>
<li>其他方式还有 <strong>Simple authentication</strong> 的 <code v-pre>SSL/TLS</code> 认证</li>
</ul>
</li>
<li>【默认内置】<strong>version：</strong> 仅支持 <strong>v3</strong></li>
<li><strong>测试按钮：</strong> 测试当前 <strong>AD</strong> 域是否连通，未测试通过前无法执行 <strong>“加入域”</strong> 操作
<ul>
<li><strong>成功：</strong> 提示 &quot;<code v-pre>连接成功</code>&quot;</li>
<li><strong>失败：</strong>
<ul>
<li><strong>超时 10s 后：</strong> 提示 &quot;<code v-pre>服务器不在工作</code>&quot;</li>
<li><strong>相同 hostname：</strong> 提示 &quot;<code v-pre>存在相同主机名，无法加入</code>&quot;</li>
</ul>
</li>
</ul>
</li>
</ul>
<h5 id="ldap配置参数" tabindex="-1"><a class="header-anchor" href="#ldap配置参数" aria-hidden="true">#</a> <strong>LDAP配置参数</strong></h5>
<ul>
<li>
<p><strong>LDAP基准DN：</strong> 如 <code v-pre>DC=uit,DC=ldevops,DC=local</code></p>
</li>
<li>
<p><strong>LDAP主服务器IP：</strong> 如 <code v-pre>172.16.70.124</code></p>
<ul>
<li>【待定】<strong>LDAP从服务器IP：</strong></li>
</ul>
</li>
<li>
<p><strong>LDAP 端口：</strong> 默认 <code v-pre>389</code></p>
</li>
<li>
<p>【待定】<strong>LDAP协议：</strong> <code v-pre>LDAP/LDAPS</code></p>
</li>
<li>
<p><strong>管理员账号</strong></p>
</li>
<li>
<p><strong>管理员密码</strong></p>
</li>
<li>
<p><strong>测试按钮：</strong> 同上</p>
</li>
<li>
<p><strong>高级参数：</strong> 对象 <code v-pre>Objectclass=*</code></p>
</li>
</ul>
<h3 id="_1-3-集成到cifs、文件设置、posix" tabindex="-1"><a class="header-anchor" href="#_1-3-集成到cifs、文件设置、posix" aria-hidden="true">#</a> 1.3 集成到CIFS、文件设置、POSIX</h3>
<p><strong>认证模式：</strong> 支持 <strong>本地认证</strong> 或者 <strong>域认证</strong> （<em>需要增加全局配置文件</em>）</p>
<ul>
<li><strong>Samba共享导出：</strong> 增加指定认证模式</li>
<li><strong>文件高级设置：</strong> 同上</li>
<li><strong>POSIX共享：</strong> 同上</li>
</ul>
<p><a href="https://access.redhat.com/documentation/zh-cn/red_hat_enterprise_linux/7/html/system_administrators_guide/ch-file_and_print_servers#understanding_id_mapping" target="_blank" rel="noopener noreferrer">RedHat 参考<ExternalLinkIcon/></a></p>
<h2 id="_2-加域、退域实现" tabindex="-1"><a class="header-anchor" href="#_2-加域、退域实现" aria-hidden="true">#</a> 2. 加域、退域实现</h2>
<h3 id="_2-1-加域流程" tabindex="-1"><a class="header-anchor" href="#_2-1-加域流程" aria-hidden="true">#</a> 2.1 加域流程</h3>
<img src="@source/unix/CentOS/LDAP/img/加域流程.png">
<h4 id="ad域加入流程" tabindex="-1"><a class="header-anchor" href="#ad域加入流程" aria-hidden="true">#</a> AD域加入流程</h4>
<p>简单认证 <strong>winbind + kerberos</strong> ，需安装如下软件</p>
<ul>
<li><strong>winbind ：</strong> 允许 <strong>Unix</strong> 系统利用 <strong>Windows NT</strong> 的用户帐号信息来解析 <strong>AD</strong> 域 的程序</li>
<li><strong>kerberos：</strong> 加密 <strong>Ticket</strong> 的网络身份认证协议，由 <strong>Key Distribution Center</strong> (<em>即KDC)</em>、<strong>Client</strong> 和 <strong>Service</strong> 组成，访问<strong>KDC</strong> 两次，拿到 <strong>TGT</strong>，再访问服务器</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ yum <span class="token function">install</span> realmd oddjob-mkhomedir oddjob samba-winbind-clients samba-winbind samba-common-tools samba-winbind-krb5-locator krb5-devel krb5-workstation <span class="token parameter variable">-y</span>

<span class="token comment"># 安装后，客户端会生成 Kerberos 的配置文件</span>
<span class="token string">"/etc/krb5.conf"</span>

<span class="token comment"># 检查</span>
$ systemctl status winbind
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以域 <strong>UIT.DEVOPS.LOCAL</strong> （<em>172.16.70.104</em>）示例：</p>
<p>使用 <strong>Jinjia</strong> 模板</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> jinja2 <span class="token keyword">import</span> Environment<span class="token punctuation">,</span> FileSystemLoader<span class="token punctuation">,</span> Template
<span class="token keyword">from</span> pathlib <span class="token keyword">import</span> Path


<span class="token keyword">class</span> <span class="token class-name">JinJaConfig</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> path<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>env_path <span class="token operator">=</span> Path<span class="token punctuation">.</span>joinpath<span class="token punctuation">(</span>Path<span class="token punctuation">(</span>__file__<span class="token punctuation">)</span><span class="token punctuation">.</span>parent<span class="token punctuation">.</span>parent<span class="token punctuation">.</span>parent<span class="token punctuation">,</span> <span class="token string">"etc"</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>_config_file <span class="token operator">=</span> path
        self<span class="token punctuation">.</span>template <span class="token operator">=</span> <span class="token string">""</span>
        self<span class="token punctuation">.</span>_parse_data<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">_parse_data</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        env <span class="token operator">=</span> Environment<span class="token punctuation">(</span>loader<span class="token operator">=</span>FileSystemLoader<span class="token punctuation">(</span>self<span class="token punctuation">.</span>env_path<span class="token punctuation">)</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>template <span class="token operator">=</span> env<span class="token punctuation">.</span>get_template<span class="token punctuation">(</span>self<span class="token punctuation">.</span>_config_file<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">reload</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>_parse_data<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">render_str</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">str</span><span class="token punctuation">:</span>
        data <span class="token operator">=</span> <span class="token string">""</span>
        <span class="token keyword">if</span> <span class="token builtin">isinstance</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>template<span class="token punctuation">,</span> Template<span class="token punctuation">)</span><span class="token punctuation">:</span>
            data <span class="token operator">=</span> self<span class="token punctuation">.</span>template<span class="token punctuation">.</span>render<span class="token punctuation">(</span><span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
        <span class="token keyword">return</span> data

    
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">render_action</span><span class="token punctuation">(</span>path<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">str</span><span class="token punctuation">:</span>
    conf <span class="token operator">=</span> jinja_config<span class="token punctuation">.</span>JinJaConfig<span class="token punctuation">(</span>path<span class="token punctuation">)</span>
    render_data <span class="token operator">=</span> conf<span class="token punctuation">.</span>render_str<span class="token punctuation">(</span><span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
    <span class="token keyword">return</span> render_data


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">gen_krb5_config</span><span class="token punctuation">(</span>
        realm<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span>
        server_ip<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">str</span><span class="token punctuation">:</span>
    upper_realm <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">(</span>realm<span class="token punctuation">)</span><span class="token punctuation">.</span>upper<span class="token punctuation">(</span><span class="token punctuation">)</span>

    path <span class="token operator">=</span> <span class="token string">"krb5/krb5.cfg"</span>
    data <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token string">"realm"</span><span class="token punctuation">:</span> realm<span class="token punctuation">,</span>
        <span class="token string">"server_ip"</span><span class="token punctuation">:</span> server_ip<span class="token punctuation">,</span>
        <span class="token string">"upper_realm"</span><span class="token punctuation">:</span> upper_realm<span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">await</span> render_action<span class="token punctuation">(</span>path<span class="token punctuation">,</span> <span class="token operator">**</span>data<span class="token punctuation">)</span>


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">gen_local_smb_config</span><span class="token punctuation">(</span>
        smb_path<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span>
        smb_shares_file<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span><span class="token punctuation">:</span>
    path <span class="token operator">=</span> <span class="token string">"smb/smb.cfg"</span>
    data <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token string">"smb_shares_file"</span><span class="token punctuation">:</span> smb_shares_file<span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
    smb_local_share <span class="token operator">=</span> <span class="token keyword">await</span> render_action<span class="token punctuation">(</span>path<span class="token punctuation">,</span> <span class="token operator">**</span>data<span class="token punctuation">)</span>

    <span class="token keyword">await</span> write_action<span class="token punctuation">(</span>smb_path<span class="token punctuation">,</span> smb_local_share<span class="token punctuation">)</span>
    <span class="token keyword">await</span> aiofiles<span class="token punctuation">.</span><span class="token builtin">open</span><span class="token punctuation">(</span>smb_shares_file<span class="token punctuation">,</span> <span class="token string">"w"</span><span class="token punctuation">)</span>


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">gen_ad_smb_config</span><span class="token punctuation">(</span>
        host_name<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span>
        realm<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span>
        server_ip<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span>
        workgroup<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span>
        id_map_range<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span>
        id_map_ad_range<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span>
        smb_shares_file<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">str</span><span class="token punctuation">:</span>
    upper_realm <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">(</span>realm<span class="token punctuation">)</span><span class="token punctuation">.</span>upper<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment"># FIXME: smb_domain.cfg 中，将 security = domain 暂时替换为 ads</span>
    path <span class="token operator">=</span> <span class="token string">"smb/smb_ad.cfg"</span>
    data <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token string">"host_name"</span><span class="token punctuation">:</span> host_name<span class="token punctuation">,</span>
        <span class="token string">"realm"</span><span class="token punctuation">:</span> realm<span class="token punctuation">,</span>
        <span class="token string">"server_ip"</span><span class="token punctuation">:</span> server_ip<span class="token punctuation">,</span>
        <span class="token string">"workgroup"</span><span class="token punctuation">:</span> workgroup<span class="token punctuation">,</span>
        <span class="token string">"id_map_range"</span><span class="token punctuation">:</span> id_map_range<span class="token punctuation">,</span>
        <span class="token string">"id_map_ad_range"</span><span class="token punctuation">:</span> id_map_ad_range<span class="token punctuation">,</span>
        <span class="token string">"upper_realm"</span><span class="token punctuation">:</span> upper_realm<span class="token punctuation">,</span>
        <span class="token string">"smb_shares_file"</span><span class="token punctuation">:</span> smb_shares_file<span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">await</span> render_action<span class="token punctuation">(</span>path<span class="token punctuation">,</span> <span class="token operator">**</span>data<span class="token punctuation">)</span>


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">gen_ldap_smb_config</span><span class="token punctuation">(</span>
        host_name<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span>
        server_ip<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span>
        workgroup<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span>
        base_dn<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span>
        bind_dn<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span>
        smb_shares_file<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">str</span><span class="token punctuation">:</span>
    path <span class="token operator">=</span> <span class="token string">"smb/smb_ldap.cfg"</span>
    data <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token string">"host_name"</span><span class="token punctuation">:</span> host_name<span class="token punctuation">,</span>
        <span class="token string">"server_ip"</span><span class="token punctuation">:</span> server_ip<span class="token punctuation">,</span>
        <span class="token string">"workgroup"</span><span class="token punctuation">:</span> workgroup<span class="token punctuation">,</span>
        <span class="token string">"base_dn"</span><span class="token punctuation">:</span> base_dn<span class="token punctuation">,</span>
        <span class="token string">"bind_dn"</span><span class="token punctuation">:</span> bind_dn<span class="token punctuation">,</span>
        <span class="token string">"smb_shares_file"</span><span class="token punctuation">:</span> smb_shares_file<span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">await</span> render_action<span class="token punctuation">(</span>path<span class="token punctuation">,</span> <span class="token operator">**</span>data<span class="token punctuation">)</span>


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">gen_ad_nsswitch_config</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">str</span><span class="token punctuation">:</span>
    path <span class="token operator">=</span> <span class="token string">"nsswitch/nsswitch_ad.cfg"</span>
    <span class="token keyword">return</span> <span class="token keyword">await</span> render_action<span class="token punctuation">(</span>path<span class="token punctuation">,</span> <span class="token operator">**</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">gen_ldap_nsswitch_config</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">str</span><span class="token punctuation">:</span>
    path <span class="token operator">=</span> <span class="token string">"nsswitch/nsswitch_ldap.cfg"</span>
    <span class="token keyword">return</span> <span class="token keyword">await</span> render_action<span class="token punctuation">(</span>path<span class="token punctuation">,</span> <span class="token operator">**</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">gen_ldap_nslcd_config</span><span class="token punctuation">(</span>
        server_ip<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span>
        base_dn<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span>
        bind_dn<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span>
        admin_pwd<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span>
        userObjclass<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span>
        groupObjclass<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">str</span><span class="token punctuation">:</span>
    path <span class="token operator">=</span> <span class="token string">"nslcd/nslcd.cfg"</span>
    data <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token string">"server_ip"</span><span class="token punctuation">:</span> server_ip<span class="token punctuation">,</span>
        <span class="token string">"base_dn"</span><span class="token punctuation">:</span> base_dn<span class="token punctuation">,</span>
        <span class="token string">"bind_dn"</span><span class="token punctuation">:</span> bind_dn<span class="token punctuation">,</span>
        <span class="token string">"admin_pwd"</span><span class="token punctuation">:</span> admin_pwd<span class="token punctuation">,</span>
        <span class="token string">"userObjclass"</span><span class="token punctuation">:</span> userObjclass<span class="token punctuation">,</span>
        <span class="token string">"groupObjclass"</span><span class="token punctuation">:</span> groupObjclass<span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">await</span> render_action<span class="token punctuation">(</span>path<span class="token punctuation">,</span> <span class="token operator">**</span>data<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>备份并修改 <code v-pre>/etc/krb5.conf</code> 配置文件为如下</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">logging</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">default</span> <span class="token punctuation">=</span> <span class="token value attr-value">FILE:/var/log/krb5libs.log</span>
<span class="token key attr-name">kdc</span> <span class="token punctuation">=</span> <span class="token value attr-value">FILE:/var/log/krb5kdc.log</span>
<span class="token key attr-name">admin_server</span> <span class="token punctuation">=</span> <span class="token value attr-value">FILE:/var/log/kadmind.log</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">libdefaults</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">default_realm</span> <span class="token punctuation">=</span> <span class="token value attr-value">{{upper_realm}}</span>
<span class="token key attr-name">dns_lookup_realm</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span>
<span class="token key attr-name">dns_lookup_kdc</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">realms</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">{{upper_realm}}</span> <span class="token punctuation">=</span> <span class="token value attr-value">{</span>
    <span class="token key attr-name">kdc</span> <span class="token punctuation">=</span> <span class="token value attr-value">{{server_ip}}</span>
    <span class="token key attr-name">default_ad</span> <span class="token punctuation">=</span> <span class="token value attr-value">{{upper_realm}}</span>
}

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">ad_realm</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">.{{upper_realm}}</span> <span class="token punctuation">=</span> <span class="token value attr-value">{{upper_realm}}</span>
<span class="token key attr-name">{{upper_realm}}</span> <span class="token punctuation">=</span> <span class="token value attr-value">{{upper_realm}}</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">kdc</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">profile</span> <span class="token punctuation">=</span> <span class="token value attr-value">/var/kerberos/krb5kdc/kdc.conf</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">appdefaults</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">pam</span> <span class="token punctuation">=</span> <span class="token value attr-value">{</span>
    <span class="token key attr-name">debug</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span>
    <span class="token key attr-name">ticket_lifetime</span> <span class="token punctuation">=</span> <span class="token value attr-value">36000</span>
    <span class="token key attr-name">renew_lifetime</span> <span class="token punctuation">=</span> <span class="token value attr-value">36000</span>
    <span class="token key attr-name">forwardable</span> <span class="token punctuation">=</span> <span class="token value attr-value">true</span>
    <span class="token key attr-name">krb4_convert</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span>
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>[logging]：</strong> 表示 <strong>Server</strong> 端的日志的打印位置</li>
<li><strong>[libdefaults]：</strong> 连接默认配置
<ul>
<li><code v-pre>default_realm = UIT.DEVOPS.LOCAL</code> 大写，与下文 <strong>realms</strong> 的一致</li>
</ul>
</li>
<li><strong>[realms]：</strong> 列举使用的 <strong>realm</strong></li>
<li><code v-pre>kdc</code> 机器的 <strong>hostname</strong> 或 <strong>IP</strong> 地址</li>
<li><code v-pre>admin_server</code> 机器的 <strong>hostname</strong> 或 <strong>IP</strong> 地址</li>
<li><code v-pre>default_domain</code> 默认的域名</li>
<li><strong>[appdefaults]：</strong> 设定一些针对特定应用的配置，覆盖默认配置</li>
</ul>
<p>备份并修改 <code v-pre>/etc/hosts</code> 文件，加入</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code>172.16.70.124	server124.uit.devops.local
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>备份并修改 <code v-pre>/etc/samba/smb.conf</code> 如下</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">global</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">workgroup</span> <span class="token punctuation">=</span> <span class="token value attr-value">{{workgroup}}</span>
<span class="token key attr-name">netbios name</span> <span class="token punctuation">=</span> <span class="token value attr-value">{{host_name}}</span>
<span class="token key attr-name">server string</span> <span class="token punctuation">=</span>
<span class="token key attr-name">security</span> <span class="token punctuation">=</span> <span class="token value attr-value">ads</span>
<span class="token key attr-name">realm</span> <span class="token punctuation">=</span> <span class="token value attr-value">{{upper_realm}}</span>
<span class="token key attr-name">password server</span> <span class="token punctuation">=</span> <span class="token value attr-value">{{upper_realm}}</span>
<span class="token key attr-name">encrypt passwords</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
<span class="token key attr-name">local master</span> <span class="token punctuation">=</span> <span class="token value attr-value">no</span>
<span class="token key attr-name">domain master</span> <span class="token punctuation">=</span> <span class="token value attr-value">no</span>
<span class="token key attr-name">preferred master</span> <span class="token punctuation">=</span> <span class="token value attr-value">no</span>
<span class="token key attr-name">idmap config * : backend</span> <span class="token punctuation">=</span> <span class="token value attr-value">tdb</span>
<span class="token key attr-name">idmap config * : range</span> <span class="token punctuation">=</span> <span class="token value attr-value">{{id_map_range}}</span>
<span class="token key attr-name">idmap config {{workgroup}} : backend</span> <span class="token punctuation">=</span> <span class="token value attr-value">rid</span>
<span class="token key attr-name">idmap config {{workgroup}} : range</span> <span class="token punctuation">=</span> <span class="token value attr-value">{{id_map_ad_range}}</span>
<span class="token key attr-name">winbind use default domain</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
<span class="token key attr-name">winbind enum users</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
<span class="token key attr-name">winbind enum groups</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
<span class="token key attr-name">winbind separator</span> <span class="token punctuation">=</span> <span class="token value attr-value">+</span>

<span class="token comment"># optimization</span>
<span class="token key attr-name">sync always</span> <span class="token punctuation">=</span> <span class="token value attr-value">no</span>
<span class="token key attr-name">write cache size</span> <span class="token punctuation">=</span> <span class="token value attr-value">10485760</span>
<span class="token key attr-name">socket options</span> <span class="token punctuation">=</span> <span class="token value attr-value">TCP_NODELAY IPTOS_LOWDELAY SO_RCVBUF=131072 SO_SNDBUF=131072</span>
<span class="token key attr-name">use sendfile</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
<span class="token key attr-name">min receivefile size</span> <span class="token punctuation">=</span> <span class="token value attr-value">131072</span>

<span class="token comment"># ad common params</span>
<span class="token key attr-name">log file</span> <span class="token punctuation">=</span> <span class="token value attr-value">/var/log/samba/%m.log</span>
<span class="token key attr-name">max log size</span> <span class="token punctuation">=</span> <span class="token value attr-value">50</span>
<span class="token key attr-name">printcap name</span> <span class="token punctuation">=</span> <span class="token value attr-value">/etc/printcap</span>
<span class="token key attr-name">load printers</span> <span class="token punctuation">=</span> <span class="token value attr-value">no</span>
<span class="token key attr-name">wins server</span> <span class="token punctuation">=</span>
<span class="token key attr-name">unix charset</span> <span class="token punctuation">=</span> <span class="token value attr-value">utf-8</span>
<span class="token key attr-name">dos charset</span> <span class="token punctuation">=</span> <span class="token value attr-value">cp936</span>
<span class="token key attr-name">dns proxy</span> <span class="token punctuation">=</span> <span class="token value attr-value">no</span>
<span class="token key attr-name">delete readonly</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
<span class="token key attr-name">create mask</span> <span class="token punctuation">=</span> <span class="token value attr-value">0777</span>
<span class="token key attr-name">directory mask</span> <span class="token punctuation">=</span> <span class="token value attr-value">0777</span>
<span class="token key attr-name">force create mode</span> <span class="token punctuation">=</span> <span class="token value attr-value">0777</span>
<span class="token key attr-name">force directory mode</span> <span class="token punctuation">=</span> <span class="token value attr-value">0777</span>
<span class="token key attr-name">template shell</span> <span class="token punctuation">=</span> <span class="token value attr-value">/bin/false</span>
<span class="token key attr-name">map to guest</span> <span class="token punctuation">=</span> <span class="token value attr-value">bad user</span>
<span class="token key attr-name">null passwords</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
<span class="token key attr-name">usershare allow guests</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
<span class="token key attr-name">include</span> <span class="token punctuation">=</span> <span class="token value attr-value">{{smb_shares_file}}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>备份并修改 <code v-pre>/etc/nsswitch.conf</code> 如下</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code>passwd:        files winbind
shadow:        files winbind
group:         files winbind
hosts:         files dns winbind
bootparams:    files
ethers:        files
networks:      files
protocols:     files
rpc:           files
services:      files
netgroup:      files
publickey:     files
automount:     files
aliases:       files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行加域命令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ net ads <span class="token function">join</span> <span class="token parameter variable">-U</span> administrator%user@dev <span class="token parameter variable">-S</span> server124.uit.devops.local
$ net ads testjoin

<span class="token comment"># 重启相关服务</span>
systemctl <span class="token builtin class-name">enable</span> winbind
systemctl restart winbind
systemctl restart nmb
systemctl restart smb

<span class="token comment"># 此时通过判断 uid > 100000 获取到对应 域用户 / 组 </span>
getent <span class="token function">passwd</span>

<span class="token comment"># 类似如下</span>
local_zz:x:1000:0::/home/local_zz:/usr/sbin/nologin
xingang:x:1001:1001::/home/xingang:/bin/bash
administrator:*:10000500:10000513::/home/UIT/administrator:/bin/false
guest:*:10000501:10000513::/home/UIT/guest:/bin/false
zhengze:*:10001002:10000513::/home/UIT/zhengze:/bin/false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip">
<p class="custom-container-title">提示</p>
<p><strong>Python</strong> 通过引入 <strong>pwd</strong> 、 <strong>grp</strong> 库，直接本地获取，效率比 <strong>ldap3</strong> 高，但会有缓存，重启服务或改 <strong>C</strong> 源码，或直接调用命令行解析</p>
</div>
<h4 id="ldap加入流程" tabindex="-1"><a class="header-anchor" href="#ldap加入流程" aria-hidden="true">#</a> LDAP加入流程</h4>
<p>使用 <strong>nslcd</strong> 进行认证 ，与 <strong>AD</strong> 域大致流程差不多，不需要命令，直接改配置文件启动即可</p>
<ul>
<li><strong>nslcd：</strong> 加入 <strong>LDAP</strong> 的程序</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 安装加入 ldap 所需工具</span>
$ yum <span class="token parameter variable">-y</span> <span class="token function">install</span> nss-pam-ldapd pam_ldap openldap-clients oddjob oddjob-mkhomedir
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>备份并修改 <code v-pre>/etc/nslcd.conf</code> 如下</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code>uid nslcd
gid ldap
uri ldap://{{server_ip}}/
base {{base_dn}}
ssl no
binddn {{bind_dn}}
bindpw {{admin_pwd}}
filter passwd {{userObjclass}}
filter shadow {{userObjclass}}
filter group  {{groupObjclass}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要修改该配置文件权限，否则无法启动服务</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">chmod</span> <span class="token number">600</span> /etc/nslcd.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>备份并修改 <code v-pre>/etc/hosts</code> 文件，加入</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code>172.16.120.145	uit.ldevops.local
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>备份并修改 <code v-pre>/etc/samba/smb.conf</code> 如下</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">global</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">workgroup</span> <span class="token punctuation">=</span> <span class="token value attr-value">{{workgroup}}</span>
<span class="token key attr-name">netbios name</span> <span class="token punctuation">=</span> <span class="token value attr-value">{{host_name}}</span>
<span class="token key attr-name">security</span> <span class="token punctuation">=</span> <span class="token value attr-value">user</span>
<span class="token key attr-name">passdb backend</span> <span class="token punctuation">=</span> <span class="token value attr-value">ldapsam:ldap://{{server_ip}}</span>
<span class="token key attr-name">ldap suffix</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">{{base_dn}}</span>"</span>
<span class="token key attr-name">ldap group suffix</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">cn=group</span>"</span>
<span class="token key attr-name">ldap user suffix</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">ou=people</span>"</span>
<span class="token key attr-name">ldap admin dn</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">{{bind_dn}}</span>"</span>
<span class="token key attr-name">ldap delete dn</span> <span class="token punctuation">=</span> <span class="token value attr-value">no</span>
<span class="token key attr-name">pam password change</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
<span class="token key attr-name">ldap passwd sync</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
<span class="token key attr-name">ldap ssl</span> <span class="token punctuation">=</span> <span class="token value attr-value">no</span>

<span class="token comment"># optimization</span>
<span class="token key attr-name">sync always</span> <span class="token punctuation">=</span> <span class="token value attr-value">no</span>
<span class="token key attr-name">write cache size</span> <span class="token punctuation">=</span> <span class="token value attr-value">10485760</span>
<span class="token key attr-name">socket options</span> <span class="token punctuation">=</span> <span class="token value attr-value">TCP_NODELAY IPTOS_LOWDELAY SO_RCVBUF=131072 SO_SNDBUF=131072</span>
<span class="token key attr-name">use sendfile</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
<span class="token key attr-name">min receivefile size</span> <span class="token punctuation">=</span> <span class="token value attr-value">131072</span>

<span class="token comment"># ldap common params</span>
<span class="token key attr-name">log file</span> <span class="token punctuation">=</span> <span class="token value attr-value">/var/log/samba/%m.log</span>
<span class="token key attr-name">max log size</span> <span class="token punctuation">=</span> <span class="token value attr-value">50</span>
<span class="token key attr-name">printcap name</span> <span class="token punctuation">=</span> <span class="token value attr-value">/etc/printcap</span>
<span class="token key attr-name">load printers</span> <span class="token punctuation">=</span> <span class="token value attr-value">no</span>
<span class="token key attr-name">wins server</span> <span class="token punctuation">=</span>
<span class="token key attr-name">unix charset</span> <span class="token punctuation">=</span> <span class="token value attr-value">utf-8</span>
<span class="token key attr-name">dos charset</span> <span class="token punctuation">=</span> <span class="token value attr-value">cp936</span>
<span class="token key attr-name">dns proxy</span> <span class="token punctuation">=</span> <span class="token value attr-value">no</span>
<span class="token key attr-name">delete readonly</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
<span class="token key attr-name">create mask</span> <span class="token punctuation">=</span> <span class="token value attr-value">0777</span>
<span class="token key attr-name">directory mask</span> <span class="token punctuation">=</span> <span class="token value attr-value">0777</span>
<span class="token key attr-name">force create mode</span> <span class="token punctuation">=</span> <span class="token value attr-value">0777</span>
<span class="token key attr-name">force directory mode</span> <span class="token punctuation">=</span> <span class="token value attr-value">0777</span>
<span class="token key attr-name">template shell</span> <span class="token punctuation">=</span> <span class="token value attr-value">/bin/false</span>
<span class="token key attr-name">map to guest</span> <span class="token punctuation">=</span> <span class="token value attr-value">bad user</span>
<span class="token key attr-name">null passwords</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
<span class="token key attr-name">usershare allow guests</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
<span class="token key attr-name">include</span> <span class="token punctuation">=</span> <span class="token value attr-value">{{smb_shares_file}}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>备份并修改 <code v-pre>/etc/nsswitch.conf</code> 如下</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code>passwd:        files ldap
shadow:        files ldap
group:         files ldap
hosts:         files dns ldap
bootparams:    files
ethers:        files
networks:      files
protocols:     files
rpc:           files
services:      files
netgroup:      files
publickey:     files
automount:     files
aliases:       files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行加域命令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 重启相关服务，正常启动即可</span>
systemctl restart nmb
systemctl <span class="token builtin class-name">enable</span> nslcd
systemctl restart nslcd
systemctl restart smb

<span class="token comment"># 与 AD 域不同，没有映射ID，此时获取的用户、组存在 uid、gid 冲突</span>
getent <span class="token function">passwd</span>

<span class="token comment"># 类似如下，且有些非能加域的用户</span>
ldapuser1:x:1002:1002:ldapuser1:/home/ldapuser1:/bin/bash
ldapuser2:x:1003:1003:ldapuser2:/home/ldapuser2:/bin/bash
root:x:0:0:Netbios Domain Administrator:/home/root:/bin/false
nobody:x:999:514:nobody:/nonexistent:/bin/false
User1:x:1005:513:System User:/home/User1:/bin/bash
igarashi:x:1000001:513:System User:/home/igarashi:/bin/bash
jackson:x:150001:513:System User:/home/jackson:/bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning">
<p class="custom-container-title">注意</p>
<p>通常需含有 <code v-pre>(objectclass=sambaSamAccount)</code> 、<code v-pre>(objectclass=sambaGroupMapping)</code> 等一系列 <strong>samba</strong> 相关的类，才具有访问 <strong>CIFS</strong> 的能力，建议使用 <strong>sabldap</strong> 工具（<em>详见 LDAP</em> ）来添加用户，示例如下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>smbldap-useradd <span class="token parameter variable">-a</span> <span class="token parameter variable">-m</span> jackson <span class="token parameter variable">-u</span> <span class="token number">150000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div>
<h3 id="_2-2-退域流程" tabindex="-1"><a class="header-anchor" href="#_2-2-退域流程" aria-hidden="true">#</a> 2.2 退域流程</h3>
<img src="@source/unix/CentOS/LDAP/img/退域流程.png">
<p>离开 <strong>AD</strong> 域，执行如下命令，<strong>LDAP</strong> 只需还原配置文件重启即可</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ net ads leave <span class="token parameter variable">-U</span> administrator%管理员密码 <span class="token parameter variable">-S</span> server124.uit.devops.local

<span class="token comment"># 重启相关服务</span>
systemctl restart winbind
systemctl restart nmb
systemctl restart smb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<ul>
<li>还原之前修改的配置文件</li>
<li>清空缓存</li>
<li><strong>etcd</strong> 中清空记录的配置信息</li>
</ul>
</blockquote>
<h4 id="补充-针对-samba" tabindex="-1"><a class="header-anchor" href="#补充-针对-samba" aria-hidden="true">#</a> 补充（<em>针对 Samba</em> ）</h4>
<ol>
<li>
<p>对于特殊用户，提供了如下简单的映射机制</p>
<ul>
<li>
<p>将 Windows 管理员，如：administrator 映射为本地用户 root</p>
</li>
<li>
<p>将 everyone 这种特殊用户 映射为 nobody</p>
</li>
</ul>
</li>
<li>
<p>对于重名限制，界面上开关控制，并显示全称</p>
<ul>
<li>
<p>重名：指存在 <code v-pre>【ad域】张三 &amp; 【本地】：张三</code> 的情况，虽然名称相同，但 id 号不同</p>
</li>
<li>
<p>此时设置访问前，通过开关控制 仅本地 | 所有用户，若所有，则显示前缀</p>
</li>
</ul>
</li>
</ol>
<h2 id="_3-ldap3" tabindex="-1"><a class="header-anchor" href="#_3-ldap3" aria-hidden="true">#</a> 3. ldap3</h2>
<p><strong>pip</strong> 安装 <a href="https://ldap3.readthedocs.io/en/latest/welcome.html" target="_blank" rel="noopener noreferrer">ldap3<ExternalLinkIcon/></a> 库</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ pip <span class="token function">install</span> ldap3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>简单建立同步连接</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> ldap3 <span class="token keyword">import</span> Server<span class="token punctuation">,</span> Connection<span class="token punctuation">,</span> ALL

server <span class="token operator">=</span> Server<span class="token punctuation">(</span><span class="token string">"uit.devops.local"</span><span class="token punctuation">,</span> get_info<span class="token operator">=</span>ALL<span class="token punctuation">)</span>	<span class="token comment"># Windows 搭建的AD Server 域名</span>
conn <span class="token operator">=</span> Connection<span class="token punctuation">(</span>server<span class="token punctuation">,</span> auto_bind<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">repr</span><span class="token punctuation">(</span>server<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">repr</span><span class="token punctuation">(</span>server<span class="token punctuation">.</span>info<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">repr</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span><span class="token punctuation">)</span>

ret <span class="token operator">=</span> conn<span class="token punctuation">.</span>extend<span class="token punctuation">.</span>standard<span class="token punctuation">.</span>who_am_i<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"who_am_i"</span><span class="token punctuation">,</span> ret<span class="token punctuation">)</span>

<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token comment"># who_am_i None</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>LDAP</strong> 允许无需认证的匿名登入，因为 <strong>DAP</strong> 协议最早是读取电话簿的，任何人都可以阅读（<em>但内容上会部分受限</em>），但若建立身份认证的会话，就需要 <strong>DN</strong> 和 <strong>密码</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> ldap3 <span class="token keyword">import</span> Server<span class="token punctuation">,</span> Connection<span class="token punctuation">,</span> ALL

server <span class="token operator">=</span> Server<span class="token punctuation">(</span><span class="token string">"uit.devops.local"</span><span class="token punctuation">,</span> get_info<span class="token operator">=</span>ALL<span class="token punctuation">)</span>
<span class="token comment"># conn = Connection(server, user="zhengze", password="user@dev", auto_bind=True) # 或使用 DN</span>
conn <span class="token operator">=</span> Connection<span class="token punctuation">(</span>server<span class="token punctuation">,</span> user<span class="token operator">=</span><span class="token string">'cn=zhengze,cn=Users,dc=uit,dc=devops,dc=local'</span><span class="token punctuation">,</span> password<span class="token operator">=</span><span class="token string">'user@dev'</span><span class="token punctuation">,</span> auto_bind<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>

ret <span class="token operator">=</span> conn<span class="token punctuation">.</span>extend<span class="token punctuation">.</span>standard<span class="token punctuation">.</span>who_am_i<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>ret<span class="token punctuation">)</span>

<span class="token comment"># u:UIT\zhengze</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-1-查询" tabindex="-1"><a class="header-anchor" href="#_2-1-查询" aria-hidden="true">#</a> 2.1 查询</h3>
<p>可使用 <strong>上下文管理器</strong> 自动绑定，查询操作如下</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">with</span> Connection<span class="token punctuation">(</span>server<span class="token punctuation">,</span> user<span class="token operator">=</span><span class="token string">'cn=zhengze,cn=Users,dc=uit,dc=devops,dc=local'</span><span class="token punctuation">,</span> password<span class="token operator">=</span><span class="token string">'user@dev'</span><span class="token punctuation">)</span> <span class="token keyword">as</span> conn<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>conn<span class="token punctuation">.</span>extend<span class="token punctuation">.</span>standard<span class="token punctuation">.</span>who_am_i<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    conn<span class="token punctuation">.</span>search<span class="token punctuation">(</span><span class="token string">'dc=uit,dc=devops,dc=local'</span><span class="token punctuation">,</span> <span class="token string">'(objectclass=user)'</span><span class="token punctuation">,</span>
                attributes<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">'name'</span><span class="token punctuation">,</span> <span class="token string">'cn'</span><span class="token punctuation">,</span> <span class="token string">'mail'</span><span class="token punctuation">,</span> <span class="token string">"description"</span><span class="token punctuation">,</span> <span class="token string">"UserAccountControl"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>conn<span class="token punctuation">.</span>entries<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>conn<span class="token punctuation">.</span>entries<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span>entry_to_json<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>AD</strong> 域 &amp; <strong>LDAP</strong> 查询器，使用 <strong>search()</strong> 查询，支持生成器方式如下</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> pprint

<span class="token comment"># 注释部分为 AD 域</span>
<span class="token keyword">def</span> <span class="token function">search_generator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># server = Server(host="172.16.70.124", port=389)</span>
    <span class="token comment"># with Connection(server, user="uit.devops.local\\administrator", password="xxxxxx", authentication=NTLM) as conn:</span>
    server <span class="token operator">=</span> Server<span class="token punctuation">(</span>host<span class="token operator">=</span><span class="token string">"172.16.120.145"</span><span class="token punctuation">,</span> port<span class="token operator">=</span><span class="token number">389</span><span class="token punctuation">)</span>
    <span class="token keyword">with</span> Connection<span class="token punctuation">(</span>server<span class="token punctuation">,</span> user<span class="token operator">=</span><span class="token string">'cn=cloud,dc=uit,dc=ldevops,dc=local'</span><span class="token punctuation">,</span> password<span class="token operator">=</span><span class="token string">'xxxxxx'</span><span class="token punctuation">)</span> <span class="token keyword">as</span> conn<span class="token punctuation">:</span>
        conn<span class="token punctuation">.</span><span class="token builtin">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        conn<span class="token punctuation">.</span>bind<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"bound result"</span><span class="token punctuation">,</span> conn<span class="token punctuation">.</span>bound<span class="token punctuation">)</span>
        entry_generator <span class="token operator">=</span> conn<span class="token punctuation">.</span>extend<span class="token punctuation">.</span>standard<span class="token punctuation">.</span>paged_search<span class="token punctuation">(</span>
            <span class="token comment"># search_base="dc=uit,dc=devops,dc=local",</span>
            <span class="token comment"># attributes=['cn', 'name', 'mail', "description", "UserAccountControl", "uid", "sn", "gidNumber"],</span>
            search_base<span class="token operator">=</span><span class="token string">"dc=uit,dc=ldevops,dc=local"</span><span class="token punctuation">,</span>
            attributes<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">'cn'</span><span class="token punctuation">,</span> <span class="token string">'name'</span><span class="token punctuation">,</span> <span class="token string">'mail'</span><span class="token punctuation">,</span> <span class="token string">"description"</span><span class="token punctuation">,</span> <span class="token string">"uid"</span><span class="token punctuation">,</span> <span class="token string">"sn"</span><span class="token punctuation">,</span> <span class="token string">"gidNumber"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>  <span class="token comment"># "UserAccountControl",</span>
            search_filter<span class="token operator">=</span><span class="token string">'(objectclass=organizationalPerson)'</span><span class="token punctuation">,</span>
            search_scope<span class="token operator">=</span>SUBTREE<span class="token punctuation">,</span>
            paged_size<span class="token operator">=</span><span class="token number">100</span><span class="token punctuation">,</span>
            generator<span class="token operator">=</span><span class="token boolean">True</span>
        <span class="token punctuation">)</span>
        <span class="token keyword">for</span> entry <span class="token keyword">in</span> entry_generator<span class="token punctuation">:</span>
            <span class="token keyword">if</span> <span class="token keyword">not</span> entry<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">"attributes"</span><span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
                <span class="token keyword">continue</span>
            <span class="token keyword">yield</span> entry<span class="token punctuation">[</span><span class="token string">'attributes'</span><span class="token punctuation">]</span>


users <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
entry <span class="token operator">=</span> search_generator<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> item <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        users<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token builtin">next</span><span class="token punctuation">(</span>entry<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">except</span> StopIteration<span class="token punctuation">:</span>
        <span class="token keyword">break</span>

        
pprint<span class="token punctuation">.</span>pprint<span class="token punctuation">(</span>users<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


