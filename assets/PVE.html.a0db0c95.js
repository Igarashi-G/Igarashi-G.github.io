import{_ as l}from"./plugin-vueexport-helper.2444895f.js";import{o as d,c as o,e as r,a as n,b as s,d as i,f as e,r as t}from"./app.0bb9a34e.js";const c={},p=n("p",null,[n("strong",null,"PVE"),s(" \u865A\u62DF\u673A\u642D\u5EFA\u7684\u4E00\u4E9B\u8BB0\u5F55")],-1),u=n("h1",{id:"proxmox",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#proxmox","aria-hidden":"true"},"#"),s(" Proxmox")],-1),v={href:"https://www.proxmox.com/en",target:"_blank",rel:"noopener noreferrer"},m=n("strong",null,"PVE",-1),b=n("strong",null,"Debian Linux",-1),h=n("strong",null,"KVM",-1),g=e('<h5 id="\u4F18\u52BF" tabindex="-1"><a class="header-anchor" href="#\u4F18\u52BF" aria-hidden="true">#</a> <strong>\u4F18\u52BF</strong></h5><ul><li>\u51E0\u4E4E\u53EF\u4EE5\u5728 <strong>\u6240\u6709 x86 \u786C\u4EF6</strong> \u4E0A\u8FD0\u884C</li><li>\u6BCF\u53F0\u4E3B\u673A <strong>\u4E0D\u5230 5 \u5206\u949F\u5373\u53EF</strong> \u5B8C\u6210\u5B89\u88C5</li><li><strong>\u9AD8\u53EF\u7528</strong></li><li><strong>\u5F00\u6E90</strong></li></ul><h5 id="\u7F3A\u9677" tabindex="-1"><a class="header-anchor" href="#\u7F3A\u9677" aria-hidden="true">#</a> <strong>\u7F3A\u9677</strong></h5>',3),k={href:"http://corosync.github.io/corosync/",target:"_blank",rel:"noopener noreferrer"},_=n("strong",null,"\u6700\u591A\u53EF\u4EE5\u7BA1\u7406\u6216\u63A7\u5236 32 \u4E2A\u8282\u70B9",-1),x=n("code",null,"Proxmox",-1),f=n("strong",null,"32 \u53F0\u7269\u7406\u670D\u52A1\u5668",-1),$=n("h3",{id:"_1-\u5B89\u88C5",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-\u5B89\u88C5","aria-hidden":"true"},"#"),s(" 1. \u5B89\u88C5")],-1),V={href:"https://pve.proxmox.com/wiki/Installation",target:"_blank",rel:"noopener noreferrer"},I=n("h3",{id:"_2-\u663E\u5361\u9A71\u52A8\u8E29\u5927\u5751",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_2-\u663E\u5361\u9A71\u52A8\u8E29\u5927\u5751","aria-hidden":"true"},"#"),s(" 2. \u663E\u5361\u9A71\u52A8\u8E29\u5927\u5751")],-1),N=n("h5",{id:"\u4E0B\u8F7D\u9A71\u52A8",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u4E0B\u8F7D\u9A71\u52A8","aria-hidden":"true"},"#"),s(),n("strong",null,"\u4E0B\u8F7D\u9A71\u52A8")],-1),L=e(`<li><p>\u5148\u641C\u7D22\u663E\u5361\u578B\u53F7</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ lspci <span class="token operator">|</span> <span class="token function">grep</span> VGA
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>`,1),E={href:"https://www.nvidia.com/Download/index.aspx?lang=zh-cn",target:"_blank",rel:"noopener noreferrer"},D=n("code",null,"deb",-1),w=e(`<h5 id="\u5173\u95ED\u56FE\u5F62\u5316\u754C\u9762" tabindex="-1"><a class="header-anchor" href="#\u5173\u95ED\u56FE\u5F62\u5316\u754C\u9762" aria-hidden="true">#</a> <strong>\u5173\u95ED\u56FE\u5F62\u5316\u754C\u9762</strong></h5><ul><li><p>\u82E5\u6709\u56FE\u5F62\u5316\u754C\u9762\uFF0C\u6BD4\u5982 <code>X server</code> \u6267\u884C\u5982\u4E0B\u547D\u4EE4\u67E5\u770B</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">ps</span> aux <span class="token operator">|</span> <span class="token function">grep</span> X	<span class="token comment"># \u82E5\u6709\u670D\u52A1\u5219 kill \u6389</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u5207\u6362\u56DE\u591A\u7528\u6237\u547D\u4EE4\u884C\u767B\u5F55\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ init <span class="token number">3</span>

<span class="token comment"># \u82E5\u663E\u793A Q_Q_Q@_ \u4E4B\u7C7B\u7684\u4E71\u7801\uFF0C\u6216\u5149\u6807\u65E0\u54CD\u5E94\uFF0C\u9700\u8981\u66F4\u6539\u5982\u4E0B</span>
$ <span class="token function">vim</span> /etc/systemd/logind.conf

<span class="token punctuation">[</span>Login<span class="token punctuation">]</span>
<span class="token assign-left variable">NAutoVTs</span><span class="token operator">=</span><span class="token number">6</span> <span class="token comment"># \u6539\u4E3A 7</span>

<span class="token comment"># \u4FEE\u6539grub</span>
$ <span class="token function">vim</span> /etc/default/grub
<span class="token comment"># \u6DFB\u52A0 \u5982\u4E0B\u4E00\u884C \u6CE8\u91CA</span>
<span class="token comment">#GRUB_CMDLINE_LINUX_DEFAULT=&quot;quiet&quot;</span>
<span class="token comment"># \u5C06 \u5982\u4E0B\u4E00\u884C \u8D4B\u503C\u4E3A &quot;text&quot;</span>
<span class="token assign-left variable">GRUB_CMDLINE_LINUX</span><span class="token operator">=</span><span class="token string">&quot;text&quot;</span>
<span class="token comment"># \u53D6\u6D88 \u5982\u4E0B\u4E00\u884C \u6CE8\u91CA</span>
<span class="token assign-left variable">GRUB_TERMINAL</span><span class="token operator">=</span>console

<span class="token comment"># \u66F4\u65B0\u4E0A\u6587\u4FEE\u6539</span>
$ <span class="token function">update-grub</span>

<span class="token comment"># \u8BBE\u7F6E\u4E0B\u6B21\u5F00\u673A\u7CFB\u7EDF\u9ED8\u8BA4 multi-user \u6A21\u5F0F</span>
$ systemctl set-default multi-user.target

<span class="token comment"># \u518D \u6267\u884C init3 \u6216 reboot</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h5 id="\u5378\u8F7D\u65E7\u9A71\u52A8" tabindex="-1"><a class="header-anchor" href="#\u5378\u8F7D\u65E7\u9A71\u52A8" aria-hidden="true">#</a> <strong>\u5378\u8F7D\u65E7\u9A71\u52A8</strong></h5><ul><li><p>\u6DFB\u52A0\u5982\u4E0B<strong>\u9ED1\u540D\u5355</strong>\uFF0C\u7981\u7528\u6838\u663E</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">vim</span> /etc/modprobe.d/blacklist.conf

<span class="token comment"># copy\u5982\u4E0B\u5185\u5BB9</span>
blacklist nouveau
blacklist lbm-nouveau
options nouveau <span class="token assign-left variable">modeset</span><span class="token operator">=</span><span class="token number">0</span>
<span class="token builtin class-name">alias</span> nouveau off
<span class="token builtin class-name">alias</span> lbm-nouveau off
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u4FEE\u6539 <code>pve</code> \u7684\u9ED1\u540D\u5355</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">vim</span> /etc/modprobe.d/pve-blacklist.conf

<span class="token comment"># copy\u5982\u4E0B\u5185\u5BB9</span>
<span class="token comment"># blacklist nvidiafb</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u6267\u884C\u547D\u4EE4\u66F4\u6539</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ update-initramfs <span class="token parameter variable">-u</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u9A8C\u8BC1\u662F\u5426\u5DF2\u7981\u7528</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ lspci<span class="token operator">|</span><span class="token function">grep</span> nouveau

<span class="token comment"># \u6216\u662F\u5982\u4E0B, \u65E0\u8FD4\u56DE\u4FE1\u606F\u5C31\u662F\u7981\u7528\u4E86</span>

$ lsmod<span class="token operator">|</span><span class="token function">grep</span> nouveau
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u5378\u8F7D\u6838\u663E\u6216\u65E7\u9A71\u52A8</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">apt-get</span> remove nvidia* <span class="token operator">&amp;&amp;</span> <span class="token function">sudo</span> <span class="token function">apt</span> autoremove
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h5 id="\u4E0B\u8F7D\u4F9D\u8D56" tabindex="-1"><a class="header-anchor" href="#\u4E0B\u8F7D\u4F9D\u8D56" aria-hidden="true">#</a> <strong>\u4E0B\u8F7D\u4F9D\u8D56</strong></h5>`,5),y=e(`<li><p>\u5148\u66FF\u6362 <strong>Debian</strong> \u901A\u7528\u6E90\uFF0C\u89C1 <strong>Linux</strong> \u7CFB\u7EDF\u6362\u6E90\u90E8\u5206</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># Debian \u7684\u8F6F\u4EF6\u6E90\u914D\u7F6E\u6587\u4EF6\u662F</span>
$ <span class="token function">vim</span> /etc/apt/sources.list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u66FF\u6362 <strong>pve</strong> \u6E90\uFF0C\u4E0D\u786E\u5B9A\u7248\u672C\u5C3D\u91CF\u7528\u5B98\u65B9\u6E90</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># pve \u955C\u50CF\u9ED8\u8BA4\u7684 pve \u8F6F\u4EF6\u6E90\u914D\u7F6E\u6587\u4EF6\u5982\u4E0B\uFF1A</span>
$ <span class="token function">vim</span> /etc/apt/sources.list.d/pve-enterprise.list

<span class="token comment"># \u5907\u4EFD\u540E\u5C06\u5176\u4E2D\u5185\u5BB9\u66FF\u6362\u4E3A\u4EE5\u4E0B\u5373\u53EF\uFF1A</span>
$ deb https://mirrors.tuna.tsinghua.edu.cn/proxmox/debian bullseye pve-no-subscription

<span class="token comment"># \u66F4\u65B0\u8F6F\u4EF6\u5305</span>

$ <span class="token function">apt-get</span> update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u4E0B\u8F7D\u4E00\u7CFB\u5217\u4F9D\u8D56</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">apt-get</span> <span class="token function">install</span> dkms build-essential pve-headers pve-headers-x.x.x-x-pve
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>`,3),A=n("p",null,[s("\u5982\u6709\u5F02\u5E38\uFF0C\u9700\u5355\u72EC\u4E0B\u8F7D "),n("code",null,"linux-header"),s("\uFF0C\u53C2\u8003\u5982\u4E0B\uFF1A")],-1),P=n("strong",null,"deb",-1),q={href:"http://download.proxmox.com/debian/pve/dists/bullseye/pve-no-subscription/binary-amd64/",target:"_blank",rel:"noopener noreferrer"},B=e(`<div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u67E5\u770Bheader\u7248\u672C</span>
$ pveversion <span class="token parameter variable">-v</span>

<span class="token comment"># \u5982\u4E0B\u8868\u793A\u7248\u672C\u4E3A -5.13.19-1-pve</span>
pve-kernel-5.13: <span class="token number">7.1</span>-4
pve-kernel-5.13.19-1-pve: <span class="token number">5.13</span>.19-2

<span class="token comment"># \u67E5\u770B\u8F6F\u4EF6\u5305\u4E2D\u662F\u5426\u6709\u5BF9\u5E94\u7248\u672C</span>
$ <span class="token function">apt-cache</span> search pve-headers*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),U=e(`<li><p>\u6216\u76F4\u63A5\u66F4\u65B0\u4E3A\u5B98\u65B9\u6E90\uFF0C\u5148\u9ED8\u8BA4\u4E0B\u8F7D\uFF0C\u7136\u540E\u518D\u6307\u5B9A\u7248\u672C\u53F7</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">apt-get</span> <span class="token function">install</span> pve-headers-5.13.19-1-pve
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>`,1),G=e(`<h5 id="_4-\u5B89\u88C5-nvdia-\u9A71\u52A8" tabindex="-1"><a class="header-anchor" href="#_4-\u5B89\u88C5-nvdia-\u9A71\u52A8" aria-hidden="true">#</a> 4. \u5B89\u88C5 NVDIA \u9A71\u52A8</h5><ul><li><p>\u4FEE\u6539\u53EF\u6267\u884C\u6743\u9650</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">chmod</span> <span class="token number">777</span> NVIDIA-Linux-x86_64-390.147.run
<span class="token function">chown</span> root.root NVIDIA-Linux-x86_64-390.147.run
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u8FD0\u884C <code>.run</code> \u7A0B\u5E8F</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>/NVIDIA-Linux-x86_64-390.147.run
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>check</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># nvidia YES!</span>
modprobe nvidia

<span class="token comment"># \u68C0\u67E5\u662F\u5426\u5B89\u88C5\u6210\u529F</span>
nvidia-smi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u6536\u5C3E</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u5F00\u542F\u56FE\u5F62\u5316\u754C\u9762\uFF0C\u53C2\u8003 \u6B65\u9AA41 \u9006\u7740\u6765</span>

<span class="token comment"># \u6062\u590D\u9ED8\u8BA4\u542F\u52A8\u7684\u56FE\u5F62\u5316</span>
$ <span class="token function">sudo</span> systemctl set-default graphical.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="_3-\u6307\u5357" tabindex="-1"><a class="header-anchor" href="#_3-\u6307\u5357" aria-hidden="true">#</a> 3. \u6307\u5357</h3>`,3),C={href:"https://pve.proxmox.com/pve-docs/pve-admin-guide.html",target:"_blank",rel:"noopener noreferrer"};function M(R,T){const a=t("ExternalLinkIcon");return d(),o("div",null,[p,r(" more "),u,n("p",null,[n("a",v,[s("Proxmox"),i(a)]),s(" \u865A\u62DF\u73AF\u5883\uFF08\u7B80\u79F0"),m,s("\uFF09\u662F\u7528\u4E8E\u64CD\u4F5C\u6765\u5BBE\u64CD\u4F5C\u7CFB\u7EDF\u7684\u57FA\u4E8E "),b,s(" \u548C "),h,s(" \u7684\u865A\u62DF\u5316\u5E73\u53F0\uFF0C\u514D\u8D39\u63D0\u4F9B\uFF0C\u4E5F\u53EF\u8D2D\u4E70\u5546\u4E1A\u652F\u6301\u3002")]),g,n("ul",null,[n("li",null,[s("\u4F7F\u7528 "),n("a",k,[s("corosync"),i(a)]),s(" \u6765\u7BA1\u7406\u96C6\u7FA4\u3002"),_,s("\u3002"),x,s(" \u96C6\u7FA4\u7684\u865A\u62DF\u5316\u548C\u5B58\u50A8\u4E3B\u673A\u7684\u6700\u5927\u6570\u91CF\u4E3A"),f,s("\u3002")])]),$,n("p",null,[n("a",V,[s("\u5B89\u88C5 wiki"),i(a)])]),I,N,n("ul",null,[L,n("li",null,[n("p",null,[s("\u53BB "),n("a",E,[s("NVDIA \u5B98\u7F51"),i(a)]),s(" \u4E0B\u8F7D\u5BF9\u5E94\u7684\u663E\u5361\u9A71\u52A8 "),D,s(" \u5305")])])]),w,n("ul",null,[y,n("li",null,[A,n("ul",null,[n("li",null,[n("p",null,[s("\u4ECE\u7F51\u7AD9\u4E0A\u4E0B"),P,s("\u5305\uFF0C\u5373 "),n("a",q,[s("pve-header"),i(a)]),s(" \u4E2D\u5BFB\u627E\u5BF9\u5E94\u7248\u672C\u53F7")]),B]),U])])]),G,n("p",null,[n("a",C,[s("Proxmox VE Administration Guide"),i(a)])])])}const S=l(c,[["render",M],["__file","PVE.html.vue"]]);export{S as default};