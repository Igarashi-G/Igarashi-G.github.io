import{_ as m}from"./plugin-vueexport-helper.2444895f.js";import{o as p,c as u,a as n,b as s,d as e,e as v,w as l,f as a,r as t}from"./app.bde43de3.js";const b={},g={href:"http://nginx.org/",target:"_blank",rel:"noopener noreferrer"},h=n("strong",null,"WEB Server",-1),_=n("em",null,[s("\u653E\u7F6E "),n("strong",null,"Web"),s(" \u670D\u52A1\u7684")],-1),k=n("strong",null,"C",-1),x=n("strong",null,"windows",-1),f=n("h1",{id:"nginx",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#nginx","aria-hidden":"true"},"#"),s(" Nginx")],-1),w=n("h2",{id:"_1-web-server",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-web-server","aria-hidden":"true"},"#"),s(" 1. WEB Server")],-1),y=a('<li><strong><a href="">WSGI</a></strong>\uFF1A<strong>Python</strong> \u81EA\u5E26\u7F51\u5173\uFF0C\u529F\u80FD\u6D4B\u8BD5\u7528\uFF0C\u65E0\u6CD5\u5904\u7406\u5E76\u53D1\uFF0C<strong>30 MAX</strong> \u670D\u52A1\u5668\u5D29\u6E83</li><li><strong><a href="">Apache</a></strong>\uFF1A\u8FC7\u53BB\u5E02\u9762\u4E3B\u6D41\uFF0C\u73B0\u5360\u6709\u7387\u4E0B\u964D\uFF0C\u591A\u4E3A\u94F6\u884C\u8BC1\u5238\uFF0C\u8FFD\u6C42\u7A33\u5B9A\u6027\uFF0C<strong>\u6BCF\u4E2A\u8FDE\u63A5\u90FD\u4F1A\u5F00\u8F9F1\u4E2A\u7EBF\u7A0B</strong>\uFF0C<strong>MAX 1k+</strong> \u7EBF\u7A0B</li><li><strong><a href="">iis</a></strong>\uFF1A<strong>Windows</strong> \u4E0B\u662F\u6700\u8457\u540D\u7684 <strong>Web</strong> \u670D\u52A1\u5668</li>',3),$={href:"http://tengine.taobao.org/",target:"_blank",rel:"noopener noreferrer"},q=n("strong",null,"Tengine",-1),N=n("strong",null,"Nginx",-1),S=n("em",null,"\u6CA1\u5565\u533A\u522B",-1),T=a('<li><strong><a href="">F5</a></strong>\uFF1A\u786C\u4EF6\u8D1F\u8F7D\uFF0C\u6536\u8D2D\u4E86 <strong>Nginx</strong></li><li><strong><a href="">A10</a></strong>\uFF1A\u5BF9\u5E94 <strong>F5</strong> \u7684\uFF0C\u4E5F\u662F\u786C\u4EF6\u8D1F\u8F7D</li><li><strong><a href="">LVS</a></strong>\uFF1A<strong>Linux</strong> \u4E0B\u8457\u540D\u7684 <strong>\u8D1F\u8F7D\u5747\u8861\u8F6F\u4EF6</strong> \uFF0C\u544A\u8BC9\u7528\u6237\u5728\u591A\u53F0\u670D\u52A1\u5668\u7684\u60C5\u51B5\u4E0B\uFF0C\u8BE5\u8BBF\u95EE\u90A3\u53F0\u673A\u5668\uFF08<em>\u56FD\u4EBA\u5F00\u53D1\u8005\uFF1A\u7AE0\u6587\u5D69\uFF0C\u963F\u91CC -&gt; \u6EF4\u6EF4</em>\uFF0C<em>\u53E6\u4E00\u4E2A\u51FA\u540D\u7684\u56FD\u4EBA\u5F00\u53D1\u8005\u662F\uFF1A\u5C24\u96E8\u6EAA\uFF0C\u524D\u7AEF <strong>Vue</strong> \u6846\u67B6</em>\uFF09</li><li><strong><a href="">Nginx</a></strong>\uFF1A\u5F53\u4E0B\u6700\u4E3B\u6D41\uFF0C\u6BD4 <strong>Apache</strong> \u8F7B\u91CF\uFF0C\u4E14\u5904\u7406\u5E76\u53D1\u7684\u80FD\u529B\u8FD8\u5F3A\u5F88\u591A\uFF08<em>\u66F4\u80FD\u627F\u8F7D\u9AD8\u5E76\u53D1</em>\uFF09\u5E95\u5C42\u7528 <strong>epoll</strong>\uFF08<em>IO \u591A\u8DEF\u590D\u7528</em>\uFF09\u6545\u80FD\u5904\u7406\u4E0A\u4E07\u4E2A\u5E76\u53D1</li>',4),A=a('<div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><ul><li><p><strong>Nginx</strong> \u53EF\u4F5C\u4E3A\u9759\u6001\u9875\u9762\u7684 <strong>Web</strong> \u670D\u52A1\u5668\uFF0C\u652F\u6301 <strong>CGI</strong> \u534F\u8BAE\u7684\u52A8\u6001\u8BED\u8A00\uFF08<em>perl\uFF0Cphp\u7B49</em>\uFF09\u4F46\u4E0D\u652F\u6301 <strong>Java</strong>\uFF0C<strong>Java</strong> \u7A0B\u5E8F\u53EA\u80FD\u901A\u8FC7\u4E0E <strong>tomcat</strong> \u914D\u5408\u5B8C\u6210</p></li><li><p><strong>Nginx</strong> \u4E13\u4E3A\u6027\u80FD\u4F18\u5316\u800C\u5F00\u53D1\uFF0C\u5B9E\u73B0\u4E0A\u975E\u5E38\u6CE8\u91CD\u6548\u7387\uFF0C\u80FD\u7ECF\u53D7\u9AD8\u8D1F\u8F7D\u7684\u8003\u9A8C\uFF0C\u6709\u62A5\u544A\u8868\u660E\u80FD\u652F\u6301\u9AD8\u8FBE <strong>50000</strong> \u4E2A\u5E76\u53D1\u8FDE\u63A5\u6570</p></li></ul><p><strong>Nginx \u7684\u5FC5\u8981\u6027\uFF1A</strong> \u7528\u4E13\u95E8\u7684 <strong>HTTP Server</strong> \u505A\u4E00\u5C42\u7F13\u51B2\uFF0C\u907F\u514D <strong>\u5E76\u53D1\u91CF\u8FC7\u5927</strong> \u5BFC\u81F4\u670D\u52A1\u5B95\u6389</p></div><h2 id="_2-\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#_2-\u5B89\u88C5" aria-hidden="true">#</a> 2. \u5B89\u88C5</h2><h3 id="_2-1-\u6D41\u7A0B" tabindex="-1"><a class="header-anchor" href="#_2-1-\u6D41\u7A0B" aria-hidden="true">#</a> 2.1 \u6D41\u7A0B</h3>',3),P={id:"\u6E90\u7801\u5305\u5B89\u88C5",tabindex:"-1"},I=n("a",{class:"header-anchor",href:"#\u6E90\u7801\u5305\u5B89\u88C5","aria-hidden":"true"},"#",-1),L={href:"http://blog.sikacode.com/article/97",target:"_blank",rel:"noopener noreferrer"},C=n("p",null,"\u5B89\u88C5\u4F9D\u8D56\u5305",-1),E=n("div",{class:"language-bash ext-sh line-numbers-mode"},[n("pre",{class:"language-bash"},[n("code",null,[s("$ yum "),n("span",{class:"token function"},"install"),s(),n("span",{class:"token parameter variable"},"-y"),s(" gcc gcc-c++ "),n("span",{class:"token function"},"make"),s(" libtool "),n("span",{class:"token function"},"wget"),s(` pcre pcre-devel zlib zlib-devel openssl openssl-devel
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"})])],-1),H=n("p",null,"\u4E0B\u8F7D\u6E90\u7801\u5305",-1),V=n("div",{class:"language-bash ext-sh line-numbers-mode"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token function"},"wget"),s(` http://nginx.org/download/nginx-1.18.0.tar.gz
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"})])],-1),F=n("p",null,"\u89E3\u538B",-1),W=n("div",{class:"language-bash ext-sh line-numbers-mode"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token function"},"tar"),s(),n("span",{class:"token parameter variable"},"-zxvf"),s(` nginx-1.18.0.tar.gz
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"})])],-1),j=n("p",null,"\u5B89\u88C5",-1),z=n("div",{class:"language-bash ext-sh line-numbers-mode"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token builtin class-name"},"cd"),s(` nginx-1.18.0

./configure
`),n("span",{class:"token function"},"make"),s(),n("span",{class:"token operator"},"&&"),s(),n("span",{class:"token function"},"make"),s(),n("span",{class:"token function"},"install"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),B=n("p",null,[s("\u7F16\u8BD1\u524D\uFF0C\u53EF\u5148 "),n("code",null,"cat README")],-1),D=n("div",{class:"language-bash ext-sh line-numbers-mode"},[n("pre",{class:"language-bash"},[n("code",null,[s("./configure "),n("span",{class:"token parameter variable"},"--help"),s(`

- \u627E\u5230\u5B89\u88C5\u8DEF\u5F84\u6307\u4EE4\uFF1A `),n("span",{class:"token parameter variable"},"--prefix"),n("span",{class:"token operator"},"="),n("span",{class:"token environment constant"},"PATH"),s(`
- \u627E\u5230\u652F\u6301https\u534F\u8BAE\u6307\u4EE4\uFF1A --with-http_ssl_module
- \u627E\u5230\u67E5\u770Bnginx\u72B6\u6001\u7684\u6307\u4EE4\uFF1A--with-http_stub_status_module

./configure `),n("span",{class:"token parameter variable"},"--prefix"),n("span",{class:"token operator"},"="),n("span",{class:"token environment constant"},"PATH"),s(` --with-http_ssl_module --with-http_stub_status_module
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),M=n("p",null,[s("\u5B89\u88C5\u540E\u7684\u8DEF\u5F84\u4E3A "),n("code",null,"/usr/local/nginx")],-1),G=n("p",null,"\u66F4\u65B0\u5E76\u5B89\u88C5\u57FA\u7840\u5305",-1),O=n("div",{class:"language-bash ext-sh line-numbers-mode"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token function"},"sudo"),s(),n("span",{class:"token function"},"apt"),s(` update

`),n("span",{class:"token function"},"sudo"),s(),n("span",{class:"token function"},"apt"),s(),n("span",{class:"token function"},"install"),s(),n("span",{class:"token function"},"curl"),s(` gnupg2 ca-certificates lsb-release
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),U=n("p",null,[s("\u5B89\u88C5 "),n("strong",null,"Nginx")],-1),J=n("div",{class:"language-bash ext-sh line-numbers-mode"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token function"},"sudo"),s(),n("span",{class:"token function"},"apt"),s(),n("span",{class:"token function"},"install"),s(` nginx
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"})])],-1),R=n("p",null,"\u91CD\u542F\u5E76\u6DFB\u52A0\u5F00\u673A\u542F\u52A8",-1),X=n("div",{class:"language-bash ext-sh line-numbers-mode"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token function"},"sudo"),s(` systemctl restart nginx
`),n("span",{class:"token function"},"sudo"),s(" systemctl "),n("span",{class:"token builtin class-name"},"enable"),s(` nginx
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),K=n("p",null,"\u67E5\u770B\u7248\u672C",-1),Q=n("div",{class:"language-bash ext-sh line-numbers-mode"},[n("pre",{class:"language-bash"},[n("code",null,[s("nginx "),n("span",{class:"token parameter variable"},"-v"),s(`
`),n("span",{class:"token comment"},"## nginx version: nginx/1.18.0"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),Y=n("p",null,"\u914D\u7F6E\u6587\u4EF6\u8DEF\u5F84",-1),Z=n("div",{class:"language-bash ext-sh line-numbers-mode"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token function"},"vim"),s(` /etc/nginx/sites-available/default
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"})])],-1),nn=n("p",null,"\u67E5\u770B\u662F\u5426\u5DF2\u5EFA\u7ACB\u8F6F\u8FDE\u63A5\uFF0C\u82E5\u65E0\u624B\u52A8\u521B\u5EFA",-1),sn=n("div",{class:"language-bash ext-sh line-numbers-mode"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token function"},"ls"),s(),n("span",{class:"token parameter variable"},"-ahl"),s(` /etc/nginx/sites-enabled
`),n("span",{class:"token function"},"sudo"),s(),n("span",{class:"token function"},"ln"),s(),n("span",{class:"token parameter variable"},"-s"),s(` /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),en=n("p",null,[n("code",null,"reload"),s(" \u751F\u6548")],-1),an=n("div",{class:"language-bash ext-sh line-numbers-mode"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token function"},"sudo"),s(" nginx "),n("span",{class:"token parameter variable"},"-s"),s(` reload
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"})])],-1),ln=a(`<h3 id="_2-2-\u7B80\u5355\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#_2-2-\u7B80\u5355\u914D\u7F6E" aria-hidden="true">#</a> 2.2 \u7B80\u5355\u914D\u7F6E</h3><p><strong>Debain</strong> \u4E0B\u7684 <strong>Blog</strong> \u56FE\u7247\u670D\u52A1\u5668</p><ul><li><p>\u5907\u4EFD\u914D\u7F6E\u6587\u4EF6</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">cp</span> /etc/nginx/sites-available/default /etc/nginx/sites-available/default_bak
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u4FEE\u6539\u914D\u7F6E\u9879</p><div class="language-ini ext-ini line-numbers-mode"><pre class="language-ini"><code>server {
	listen 8999;		# \u6539\u4E3A\u76D1\u542C 8999 \u7AEF\u53E3
	listen [::]:8999;
	
	server_name _;
	...

	location / {
		<span class="token comment"># First attempt to serve request as file, then</span>
		<span class="token comment"># as directory, then fall back to displaying a 404.</span>
		root /home/igarashi/images/;	# \u5B58\u653E\u56FE\u7247\u8DEF\u5F84
        autoindex on;					# \u6253\u5F00\u6D4F\u89C8\u529F\u80FD
	}
	
<span class="token comment"># \u76D1\u542C\u591A\u4E2A</span>
server {
	listen 443 ssl;		# ssl\u8BA4\u8BC1
	listen [::]:443 ssl;
	
    <span class="token comment"># \u6307\u5B9A\u52A0\u5BC6\u8BC1\u4E66\u8DEF\u5F84</span>
	ssl_certificate /home/igarashi/web/ssl/8500011_www.deadly-exception.icu.pem;
	ssl_certificate_key /home/igarashi/web/ssl/8500011_www.deadly-exception.icu.key;
	...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u91CD\u8F7D\u670D\u52A1</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">sudo</span> nginx <span class="token parameter variable">-s</span> reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h2 id="_3-\u4F7F\u7528\u57FA\u7840" tabindex="-1"><a class="header-anchor" href="#_3-\u4F7F\u7528\u57FA\u7840" aria-hidden="true">#</a> 3. \u4F7F\u7528\u57FA\u7840</h2><h3 id="_3-1-\u76EE\u5F55\u7ED3\u6784" tabindex="-1"><a class="header-anchor" href="#_3-1-\u76EE\u5F55\u7ED3\u6784" aria-hidden="true">#</a> 3.1 \u76EE\u5F55\u7ED3\u6784</h3><ul><li><p><strong>conf</strong>\uFF1A\u914D\u7F6E\u6587\u4EF6</p></li><li><p><strong>html</strong>\uFF1A\u5B58\u653E\u9759\u6001\u6587\u4EF6 <code>index.html</code> \u662F\u9ED8\u8BA4\u7684\u6B22\u8FCE\u9875\u9762</p></li><li><p><strong>logs</strong>\uFF1A\u65E5\u5FD7\u76EE\u5F55</p></li><li><p><strong>sbin</strong>\uFF1A\u4E8C\u8FDB\u5236\u6587\u4EF6</p></li></ul><p><strong>Nginx</strong> \u542F\u52A8\u540E\u4F1A\u8FD0\u884C\u4E00\u4E2A\u4E3B\u8FDB\u7A0B\uFF0C\u8DDF\u636E\u914D\u7F6E\u6587\u4EF6\u7684\u8BBE\u7F6E <code>worker_processes : 1</code> \u751F\u6210\u5B50\u8FDB\u7A0B\uFF08<em>\u5DE5\u4F5C\u8FDB\u7A0B</em>\uFF09</p><p>\u4E3B\u8FDB\u7A0B\u4E0D\u8D1F\u8D23\u5904\u7406\u7528\u6237\u7684\u8BF7\u6C42\uFF0C\u53EA\u7528\u6765\u8F6C\u53D1\u7ED9\u5B50\u8FDB\u7A0B\uFF0C\u771F\u6B63\u8D1F\u8D23\u5904\u7406\u7528\u6237\u8BF7\u6C42\u7684\u662F\u5B50\u8FDB\u7A0B</p><h3 id="_3-2-\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#_3-2-\u547D\u4EE4" aria-hidden="true">#</a> 3.2 \u547D\u4EE4</h3><ul><li>\u666E\u901A\u542F\u52A8\u670D\u52A1\uFF1A<code>/usr/local/nginx/sbin/nginx</code></li><li>\u914D\u7F6E\u6587\u4EF6\u542F\u52A8\uFF1A<code>/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf</code></li><li>\u66B4\u529B\u505C\u6B62\u670D\u52A1\uFF1A<code>/usr/local/nginx/sbin/nginx -s stop</code></li><li>\u4F18\u96C5\u505C\u6B62\u670D\u52A1\uFF1A<code>/usr/local/nginx/sbin/nginx -s quit</code></li><li>\u68C0\u67E5\u914D\u7F6E\u6587\u4EF6\uFF1A<code>/usr/local/nginx/sbin/nginx -t</code></li><li>\u91CD\u65B0\u52A0\u8F7D\u914D\u7F6E\uFF1A<code>/usr/local/nginx/sbin/nginx -s reload</code></li><li>\u67E5\u770B\u76F8\u5173\u8FDB\u7A0B\uFF1A<code>ps -ef | grep nginx</code></li></ul><h5 id="\u5E2E\u52A9" tabindex="-1"><a class="header-anchor" href="#\u5E2E\u52A9" aria-hidden="true">#</a> \u5E2E\u52A9</h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>-?,-h         <span class="token builtin class-name">:</span> this <span class="token builtin class-name">help</span>
<span class="token parameter variable">-v</span>            <span class="token builtin class-name">:</span> show version and <span class="token builtin class-name">exit</span>                                               \u663E\u793A\u7248\u672C\u53F7
<span class="token parameter variable">-V</span>            <span class="token builtin class-name">:</span> show version and configure options <span class="token keyword">then</span> <span class="token builtin class-name">exit</span>
<span class="token parameter variable">-t</span>            <span class="token builtin class-name">:</span> <span class="token builtin class-name">test</span> configuration and <span class="token builtin class-name">exit</span>                                         \u6D4B\u8BD5\u914D\u7F6E\u6587\u4EF6
<span class="token parameter variable">-T</span>            <span class="token builtin class-name">:</span> <span class="token builtin class-name">test</span> configuration, dump it and <span class="token builtin class-name">exit</span>
<span class="token parameter variable">-q</span>            <span class="token builtin class-name">:</span> suppress non-error messages during configuration testing
<span class="token parameter variable">-s</span> signal     <span class="token builtin class-name">:</span> send signal to a master process: stop, quit, reopen, reload         \u505C\u6B62\u9000\u51FA\uFF0C\u91CD\u542F\u7B49
<span class="token parameter variable">-p</span> prefix     <span class="token builtin class-name">:</span> <span class="token builtin class-name">set</span> prefix path <span class="token punctuation">(</span>default: /usr/share/nginx/<span class="token punctuation">)</span>
<span class="token parameter variable">-c</span> filename   <span class="token builtin class-name">:</span> <span class="token builtin class-name">set</span> configuration <span class="token function">file</span> <span class="token punctuation">(</span>default: /etc/nginx/nginx.conf<span class="token punctuation">)</span>
<span class="token parameter variable">-g</span> directives <span class="token builtin class-name">:</span> <span class="token builtin class-name">set</span> global directives out of configuration <span class="token function">file</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="\u5F00\u653E\u9632\u706B\u5899" tabindex="-1"><a class="header-anchor" href="#\u5F00\u653E\u9632\u706B\u5899" aria-hidden="true">#</a> \u5F00\u653E\u9632\u706B\u5899</h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>/sbin/iptables <span class="token parameter variable">-I</span> INPUT <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">--dport</span> <span class="token number">80</span> <span class="token parameter variable">-j</span> ACCEPT
/etc/rc.d/init.d/iptables save
<span class="token comment"># iptables\uFF1A\u5C06\u9632\u706B\u5899\u89C4\u5219\u4FDD\u5B58\u5230 /etc/sysconfig/iptables\uFF1A[\u786E\u5B9A]</span>

<span class="token comment"># or \u66B4\u529B\u5173\u95ED\u9632\u706B\u5899\uFF08\u6CE8\uFF1A\u5371\u9669\u64CD\u4F5C\uFF0C\u6E05\u9664\u9632\u706B\u5899\u89C4\u5219\uFF0C\u4F46\u53EA\u8981\u6CA1\u6709save\u8FD8\u884C\uFF09</span>
$ iptables <span class="token parameter variable">-F</span>
$ setenforce <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-\u914D\u7F6E\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#_3-3-\u914D\u7F6E\u6587\u4EF6" aria-hidden="true">#</a> 3.3 \u914D\u7F6E\u6587\u4EF6</h3><details class="custom-container details"><summary>\u793A\u4F8B</summary><div class="language-ini ext-ini line-numbers-mode"><pre class="language-ini"><code><span class="token comment">#user  nobody;              # \u4F7F\u7528\u54EA\u4E2A\u7528\u6237\u6765\u542F\u52A8\u5B50\u8FDB\u7A0B</span>
    worker_processes  1;        # \u5DE5\u4F5C\u8FDB\u7A0B\u7684\u4E2A\u6570\uFF0C\u914D\u7F6Ecpu\u7684\u6838\u5FC3\u6570-1\u6216-2\uFF0Ccpu\u7684\u4EB2\u7F18\u6027\u7ED1\u5B9A\uFF0C\u8BA9nginx\u7684\u5B50\u8FDB\u7A0B\u5DE5\u4F5C\u518D\u54EA\u4E2A\u6838\u5FC3\u4E0A

    <span class="token comment">#error_log  logs/error.log;              # \u9519\u8BEF\u65E5\u5FD7\u7684\u5B58\u653E\u4F4D\u7F6E</span>
    <span class="token comment">#error_log  logs/error.log  notice;</span>
    <span class="token comment">#error_log  logs/error.log  info;</span>

    <span class="token comment">#pid        logs/nginx.pid;              # \u542F\u52A8\u4E4B\u540E\u4F1A\u751F\u6210\u4E00\u4E2Apid\u6587\u4EF6\uFF08socket\u6587\u4EF6\uFF09</span>
    events {
        worker_connections  1024;           # \u6BCF\u4E00\u4E2A\u5B50\u8FDB\u7A0B\u5DE5\u4F5C\u53EF\u4EE5\u5904\u7406\u7684\u6700\u5927\u8FDE\u63A5\u6570\uFF0C\u9ED8\u8BA41024
                                            <span class="token comment"># \u8FD8\u53EF\u4EE5\u8BBE\u7F6E use [epoll|select|poll] \u9ED8\u8BA4\u5219\u662F\u81EA\u5DF1\u9009\u62E9</span>
    }
    http {
        include       mime.types;                   # \u5BFC\u5165
        default_type  application/octet-stream;     # \u9ED8\u8BA4\u7684\u8BF7\u6C42\u65B9\u5F0F

        <span class="token comment">#log_format  main  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span>
        <span class="token comment">#                  &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span>
        <span class="token comment">#                  &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;;</span>

                                                    <span class="token comment"># log_format main \u53EF\u4EE5\u5B9A\u4E49\u65E5\u5FD7\u683C\u5F0F</span>

        <span class="token comment">#access_log  logs/access.log  main;         # \u65E5\u5FD7\u7528\u4EC0\u4E48\u683C\u5F0F\u8F93\u51FA</span>

        sendfile        on;
        <span class="token comment">#tcp_nopush     on;</span>

        <span class="token comment">#keepalive_timeout  0;</span>
        keepalive_timeout  65;                      # \u4FDD\u6301\u957F\u8FDE\u63A5\u7684\u8D85\u65F6\u65F6\u95F4 65\u79D2

        <span class="token comment">#gzip  on;</span>

        server {
            listen       80;                        # \u76D1\u542C\u7AEF\u53E3
            server_name  localhost;                 # \u8BBE\u7F6E\u57DF\u540D \u6B64\u5904\u4E3A\u57DF\u540D\uFF0C\u76F4\u63A5\u5199\u662F\u80AF\u5B9A\u4E0D\u4F1A\u6709\u4E2A\uFF0C\u9664\u975E\u672C\u5730HOSTS\u8BBE\u7F6E\u5BF9\u5E94\u7684

            <span class="token comment">#charset koi8-r;</span>

            <span class="token comment">#access_log  logs/host.access.log  main;</span>

            location / {
                root   html;                        # \u6307\u5B9A\u9759\u6001\u6587\u4EF6\u5730\u5740
                index  index.html index.htm;        # \u6307\u5B9A\u9ED8\u8BA4\u7684index\u9875\u9762
            }

            <span class="token comment">#error_page  404              /404.html;    # \u9519\u8BEF\u9875\u9762 \u627E\u4E0D\u5230\u9875\u9762</span>

            <span class="token comment"># redirect server error pages to the static page /50x.html</span>
            <span class="token comment">#</span>
            error_page   500 502 503 504  /50x.html;    # \u9519\u8BEF\u9875\u9762 \u670D\u52A1\u7AEF\u9519\u8BEF\uFF08\u540E\u7AEF\u4EE3\u7801\u903B\u8F91\u6027\u9519\u8BEF\u7B49\uFF09
            <span class="token key attr-name">location</span> <span class="token punctuation">=</span> <span class="token value attr-value">/50x.html {</span>
                root   html;
            }

            location /img {
                root /data/img;         # \u82E5\u4E3Aroot\uFF0C\u90A3\u4E48\u8868\u793A/data/img \u8FD9\u4E2A\u5730\u5740\u4E3A\u6839\uFF0C\u8FD8\u8981\u6709\u4E2A/img\u76EE\u5F55\u624D\u884C
                alias /data/img;        # \u82E5\u4E3Aalias\uFF0C \u90A3\u4E48\u8868\u793A/data/img \u8FD9\u4E2A\u5730\u5740\u5C31\u662F/img\u7684\u6240\u5728\u76EE\u5F55
            }

            <span class="token comment"># proxy the PHP scripts to Apache listening on 127.0.0.1:80</span>
            <span class="token comment">#</span>
            <span class="token comment">#location ~ \\.php$ {</span>
            <span class="token comment">#    proxy_pass   http://127.0.0.1;</span>
            <span class="token comment">#}</span>

            <span class="token comment"># pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000</span>
            <span class="token comment">#</span>
            <span class="token comment">#location ~ \\.php$ {</span>
            <span class="token comment">#    root           html;</span>
            <span class="token comment">#    fastcgi_pass   127.0.0.1:9000;</span>
            <span class="token comment">#    fastcgi_index  index.php;</span>
            <span class="token comment">#    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;</span>
            <span class="token comment">#    include        fastcgi_params;</span>
            <span class="token comment">#}</span>

            <span class="token comment"># deny access to .htaccess files, if Apache&#39;s document root</span>
            <span class="token comment"># concurs with nginx&#39;s one</span>
            <span class="token comment">#</span>
            <span class="token comment">#location ~ /\\.ht {</span>
            <span class="token comment">#    deny  all;</span>
            <span class="token comment">#}</span>
        }
        <span class="token comment"># another virtual host using mix of IP-, name-, and port-based configuration</span>
        <span class="token comment">#</span>
        <span class="token comment">#server {</span>
        <span class="token comment">#    listen       8000;</span>
        <span class="token comment">#    listen       somename:8080;</span>
        <span class="token comment">#    server_name  somename  alias  another.alias;</span>

        <span class="token comment">#    location / {</span>
        <span class="token comment">#        root   html;</span>
        <span class="token comment">#        index  index.html index.htm;</span>
        <span class="token comment">#    }</span>
        <span class="token comment">#}</span>
        <span class="token comment"># HTTPS server</span>
        <span class="token comment">#</span>
        <span class="token comment">#server {</span>
        <span class="token comment">#    listen       443 ssl;</span>
        <span class="token comment">#    server_name  localhost;</span>

        <span class="token comment">#    ssl_certificate      cert.pem;</span>
        <span class="token comment">#    ssl_certificate_key  cert.key;</span>

        <span class="token comment">#    ssl_session_cache    shared:SSL:1m;</span>
        <span class="token comment">#    ssl_session_timeout  5m;</span>

        <span class="token comment">#    ssl_ciphers  HIGH:!aNULL:!MD5;</span>
        <span class="token comment">#    ssl_prefer_server_ciphers  on;</span>

        <span class="token comment">#    location / {</span>
        <span class="token comment">#        root   html;</span>
        <span class="token comment">#        index  index.html index.htm;</span>
        <span class="token comment">#    }</span>
        <span class="token comment">#}</span>

    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="_4-\u5176\u4ED6\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#_4-\u5176\u4ED6\u64CD\u4F5C" aria-hidden="true">#</a> 4. \u5176\u4ED6\u64CD\u4F5C</h2><h3 id="_4-1-\u57DF\u540D\u8BBE\u7F6E" tabindex="-1"><a class="header-anchor" href="#_4-1-\u57DF\u540D\u8BBE\u7F6E" aria-hidden="true">#</a> 4.1 \u57DF\u540D\u8BBE\u7F6E</h3><p><strong>server_name</strong>: <code>server</code> \u4E0B\u7684 <code>server_name</code> \u8FDB\u884C\u8BBE\u7F6E\uFF0C\u7531\u4E8E\u6CA1\u6709\u5907\u6848\u9700\u8981\u66F4\u6539\u672C\u5730 <code>HOSTS</code> \u624D\u80FD\u6210\u529F\u89E3\u6790\u3002</p><div class="language-ini ext-ini line-numbers-mode"><pre class="language-ini"><code>server_name www.yukiball.com www.mmmmohime.com mmmmohime.com;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u591A\u57DF\u540D\u8BBF\u95EE\uFF08\u865A\u62DF\u4E3B\u673A\uFF09</strong>\uFF1A \u5728 <strong>Nginx</strong> \u7684\u8BBE\u7F6E\u91CC\u9762\u8BBE\u7F6E\u591A\u4E2A <code>server</code></p><ul><li><p>\u57FA\u4E8E <code>ip</code> \u5730\u5740\u7684</p></li><li><p>\u57FA\u4E8E\u7AEF\u53E3\u7684</p></li><li><p>\u57FA\u4E8E\u57DF\u540D\u7684\uFF1A\u6700\u7B80\u5355\u7684\u65B9\u5F0F</p><pre><code>server {
    listen 80 default_server; # \u8BBE\u7F6E default \u5F53\u4F7F\u7528 ip \u5730\u5740\u8BBF\u95EE\uFF0C\u9ED8\u8BA4\u8FDB\u5165 server \u8BBE\u7F6E\u7684\u9875\u9762
    server_name www.taobao.dom taobao.com;
  location / {
      root /data/taobao;
      index index.html;
  }
  }
</code></pre></li></ul><h1 id="_6-nginx-\u65E5\u5FD7" tabindex="-1"><a class="header-anchor" href="#_6-nginx-\u65E5\u5FD7" aria-hidden="true">#</a> 6.Nginx \u65E5\u5FD7</h1><pre><code>#log_format  main  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;
        #                  &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;
        #                  &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;;

                                                    # log_format main \u53EF\u4EE5\u5B9A\u4E49\u65E5\u5FD7\u683C\u5F0F
        #access_log  logs/access.log  main;         # \u65E5\u5FD7\u7528\u4EC0\u4E48\u683C\u5F0F\u8F93\u51FA

\u628A\u6CE8\u91CA\u53BB\u6389\u5373\u53EF\u6253\u5F00\u65E5\u5FD7
</code></pre><p><strong>\u67E5\u770B\u65E5\u5FD7</strong></p><pre><code>tail -f logs/access.log
remote_addr: \u8BBF\u95EEip\u5730\u5740
remote_user: \u8BBF\u95EE\u7684\u7528\u6237
[$time_local]: \u8BBF\u95EE\u7684\u672C\u5730\u65F6\u95F4
request: \u5305\u62EC\u8BF7\u6C42\u65B9\u5F0F\u3001\u8BF7\u6C42\u5730\u5740\u3001\u8BF7\u6C42\u534F\u8BAE\u7248\u672C
status\uFF1A \u72B6\u6001\u7801
body_bytes_sent \u53D1\u9001\u7684\u5927\u5C0F
http_user_agent \u7528\u6237\u8BF7\u6C42\u7684\u6D4F\u89C8\u5668
http_x_forwarded_for
</code></pre><p><strong>\u8BBE\u7F6E\u7F51\u6BB5\u7981\u6B62\u8BBF\u95EE</strong></p><pre><code>deny 192.168.21.0/255.255.255.0;    \u8BBE\u7F6E\u8FD9\u4E2A\u7F51\u6BB5\u90FD\u4E0D\u80FD\u8BBF\u95EE\uFF0C\u4E0D\u52A0\u5B50\u7F51\u63A9\u7801\u53EF\u4EE5\u5355\u72EC\u8BBE\u7F6Eip
deny 192.168.21.0/24;  \u540C\u4E0A
</code></pre><p><strong>\u8BBE\u7F6E\u767D\u540D\u5355</strong></p><pre><code>allow 192.168.21.131;
\u4EE5\u4E0A\u5747\u53EF\u5199\u5728server\u6216location\u91CC\u9762
</code></pre><h1 id="_7-\u53CD\u5411\u4EE3\u7406" tabindex="-1"><a class="header-anchor" href="#_7-\u53CD\u5411\u4EE3\u7406" aria-hidden="true">#</a> 7.\u53CD\u5411\u4EE3\u7406</h1><ul><li><p><strong>\u4F5C\u7528</strong>\uFF1A\u8D77\u5230\u4FDD\u62A4\u7F51\u7AD9\u5B89\u5168\u7684\u4F5C\u7528\uFF0C\u7528\u6237\u8BBF\u95EE\u7684\u6C38\u8FDC\u662F\u8FD9\u53F0\u53CD\u5411\u4EE3\u7406\u7684 nginx \u673A\u5668\uFF0C\u56E0\u6B64\u53EA\u7528\u7EF4\u62A4 nginx \u8FD9\u53F0\u673A\u5668\u7684\u5B89\u5168\u9632\u62A4\u5373\u53EF\u3002</p></li><li><p><strong>\u52A8\u9759\u5206\u79BB</strong>\uFF1A\u52A8\u6001\u7F51\u7AD9\u548C\u9759\u6001\u7F51\u7AD9\u5206\u79BB\uFF0Cnginx \u53EF\u4EE5\u76F4\u63A5\u8BF7\u6C42\u9759\u6001\u6587\u4EF6\uFF0C\u800C\u907F\u514D\u8BF7\u6C42 Django \u548C\u540E\u7AEF\u4EA4\u4E92\u3002\u76F4\u63A5\u7F13\u5B58\u9759\u6001\u6587\u4EF6\u5373\u53EF\u3002</p></li><li><p><strong>\u8D1F\u8F7D\u5747\u8861</strong>\uFF1AF5\u3001V10\u3001LVS\u3001haproxy\uFF08\u652F\u6301 4 \u5C42\u8FD8\u652F\u6301 7 \u5C42\uFF09nginx \u6700\u65E9\u51FA\u6765\u4E4B\u524D\u53EA\u652F\u6301 7 \u5C42\uFF0C\u65B0\u7248\u652F\u6301 4 \u5C42\u8FD8\u652F\u6301 UDP \u7684\u8D1F\u8F7D\u5747\u8861\u3002\u7F13\u89E3\u4E00\u53F0\u670D\u52A1\u5668\u538B\u529B\uFF0C\u53EF\u4EE5\u627F\u53D7\u66F4\u591A\u8BF7\u6C42\u3002</p><p>\u5047\u8BBE\u76EE\u524D\u5728 ip \u4E3A 192.168.21.131 \u7684\u4E00\u53F0\u4E3B\u673A\u4E0B \u914D\u7F6E\u6587\u4EF6\u4E2D\u6DFB\u52A0 upstream django { server 192.168.21.128:81; server 192.168.21.131L81; # \u82E5\u6B64\u65F6\u518D\u52A0\u4E0A\u4E00\u4E2A 131 \u7684 81 \u7AEF\u53E3\uFF0C\u5F53\u8BBF\u95EE 131 \u7684 81 \u7AEF\u53E3\uFF0C\u4F1A\u53D1\u73B0\u5728 128 \u548C 131 \u4E4B\u524D\u8F6E\u8BE2 }</p><p>server{ listen 81; location / { root /data/html; index index.html; } }</p></li></ul><h3 id="\u6743\u91CD" tabindex="-1"><a class="header-anchor" href="#\u6743\u91CD" aria-hidden="true">#</a> \u6743\u91CD</h3><pre><code>upstream django {
    server 192.168.21.128:81 weight=3; # \u8868\u793A\u6743\u91CD\u8BBF\u95EE3\u6B21128\u624D\u8BBF\u95EE\u4E00\u6B21131
    server 192.168.21.131L81;
}

server{
    listen 80 default_server;
    listem [::]:80 default_server;
    server_name _;

    location {
        proxy_pass http://django; #\u6CE8\u610F\u8FD9\u91CC\u4E00\u5B9A\u8981\u52A0http:// + upstream\u522B\u540D
    }
}
</code></pre><h3 id="ip-hash" tabindex="-1"><a class="header-anchor" href="#ip-hash" aria-hidden="true">#</a> ip_hash</h3><p>\u6BCF\u4E2A\u8BF7\u6C42\u505A hash \u8FD0\u7B97\uFF0C\u8FD9\u6837\u6BCF\u4E2A\u56FA\u5B9A\u7684\u8BBF\u5BA2\u90FD\u4F1A\u88AB\u8D1F\u8F7D\u5230\u540E\u7AEF\u56FA\u5B9A\u7684\u673A\u5668</p><pre><code>upstream django {
    ip_hash;
    server 192.168.21.128:81;
    server 191.168.21.131:81;
}
</code></pre><h3 id="backup" tabindex="-1"><a class="header-anchor" href="#backup" aria-hidden="true">#</a> backup</h3><p>\u5907\u4EFD\uFF1A</p>`,39);function tn(on,rn){const i=t("ExternalLinkIcon"),o=t("Tabs");return p(),u("div",null,[n("p",null,[n("a",g,[s("Nginx"),e(i)]),s(" \u662F "),h,s("\uFF08"),_,s("\uFF09\uFF0C"),k,s(" \u8BED\u8A00\u5199\u7684\uFF0C\u53F7\u79F0\u652F\u6301\u767E\u4E07\u5E76\u53D1\uFF0C\u5BF9 "),x,s(" \u652F\u6301\u8F83\u5DEE")]),v(" more "),f,w,n("ul",null,[y,n("li",null,[n("a",$,[q,e(i)]),s("\uFF1A\u6DD8\u5B9D\u5728 "),N,s(" \u7684\u57FA\u7840\u4E0A\u8FDB\u884C\u4E86\u4E8C\u6B21\u5C01\u88C5\uFF0C\u5F00\u6E90\u7684\uFF0C\u9488\u5BF9\u5927\u8BBF\u95EE\u91CF\u7F51\u7AD9\u7684\u9700\u6C42\uFF08"),S,s("\uFF09")]),T]),A,e(o,{data:[{title:"CentOS"},{title:"Debain"}]},{tab0:l(({title:r,value:c,isActive:d})=>[n("h5",P,[I,s(),n("strong",null,[n("a",L,[s("\u6E90\u7801\u5305\u5B89\u88C5"),e(i)])])]),C,E,H,V,F,W,j,z,B,D,M]),tab1:l(({title:r,value:c,isActive:d})=>[G,O,U,J,R,X,K,Q,Y,Z,nn,sn,en,an]),_:1}),ln])}const mn=m(b,[["render",tn],["__file","Nginx\u57FA\u7840.html.vue"]]);export{mn as default};
