import{_ as l}from"./plugin-vueexport-helper.2444895f.js";import{o,c,e as r,a as n,d as e,w as i,b as s,f as t,r as p}from"./app.dd012aa6.js";const d="/assets/uwsgi\u534F\u8BAE\u6027\u80FD.2cc74dd2.png",u={},m=n("h1",{id:"django\u90E8\u7F72",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#django\u90E8\u7F72","aria-hidden":"true"},"#"),s(" Django\u90E8\u7F72")],-1),v=n("p",null,[n("strong",null,"Django"),s(" \u548C "),n("strong",null,"Flask"),s(" \u9879\u76EE\u90E8\u7F72\u65B9\u5F0F\u5F88\u591A\uFF0C\u91C7\u7528 "),n("strong",null,"Nginx + uwsgi + Django"),s(" \u8F83\u5E38\u89C1")],-1),g=t('<h2 id="_1-\u90E8\u7F72\u8BF4\u660E" tabindex="-1"><a class="header-anchor" href="#_1-\u90E8\u7F72\u8BF4\u660E" aria-hidden="true">#</a> 1. \u90E8\u7F72\u8BF4\u660E</h2><h3 id="_1-1-uwsgi-\u670D\u52A1\u5668" tabindex="-1"><a class="header-anchor" href="#_1-1-uwsgi-\u670D\u52A1\u5668" aria-hidden="true">#</a> 1.1 uWSGI \u670D\u52A1\u5668</h3><p>\u5B83\u5B9E\u73B0\u4E86 <strong>WSGI</strong> \u3001<strong>uwsgi</strong>\u3001<strong>HTTP</strong> \u7B49\u534F\u8BAE\uFF0C\u672C\u8EAB\u4E5F\u662F <strong>WEB Server</strong>\uFF0C\u53EF\u4E0D\u4E0E <strong>Nginx</strong> \u642D\u914D\uFF0C\u5C31\u80FD\u627F\u8F7D\u9AD8\u5E76\u53D1\uFF0C\u4F46\u901A\u5E38\u642D\u914D <strong>Nginx</strong> \u6765\u8D1F\u8F7D\u5747\u8861\u3001\u53CD\u5411\u4EE3\u7406\u3001\u627F\u8F7D\u524D\u7AEF\u9759\u6001\u6587\u4EF6\u7B49</p>',3),b=n("li",null,[n("strong",null,"Nginx"),s(" \u4E2D "),n("code",null,"HttpUwsgiModule"),s(" \u6A21\u5757\u7684\u4F5C\u7528\uFF0C\u662F\u4E0E "),n("code",null,"uWSGI"),s(" \u670D\u52A1\u5668\u4EA4\u4E92")],-1),h=n("strong",null,"Web",-1),k=n("strong",null,"uwsgi",-1),_=n("strong",null,"\u7EBF\u8DEF\u534F\u8BAE",-1),w=n("ul",null,[n("li",null,[s("\u5B9A\u4E49\u4E86\u4F20\u8F93\u4FE1\u606F\u7684\u7C7B\u578B\uFF0C\u6BCF\u4E2A"),n("code",null,"uwsgi packet"),s(" \u524D "),n("strong",null,"4byte"),s(" \u4E3A\u4F20\u8F93\u4FE1\u606F\u7C7B\u578B\u63CF\u8FF0")])],-1),x=t('<div class="custom-container tip"><p class="custom-container-title">\u751F\u4EA7\u73AF\u5883\uFF0C\u5C31\u7528 uWSGI</p></div><h3 id="_1-2-uwsgi-\u7279\u70B9" tabindex="-1"><a class="header-anchor" href="#_1-2-uwsgi-\u7279\u70B9" aria-hidden="true">#</a> 1.2 uWSGI \u7279\u70B9</h3><ul><li>\u8D85\u5FEB\u7684\u6027\u80FD</li><li>\u4F4E\u5185\u5B58\u5360\u7528\uFF0C\u5B9E\u6D4B\u5927\u6982 <strong>apache2</strong> \u7684 <code>mod_wsgi</code>\uFF08\u6A21\u5757\uFF09\u4E00\u534A\u5DE6\u53F3</li><li>\u591A <strong>app</strong> \u7BA1\u7406\uFF0C\u7701\u53BB\u51A5\u601D\u82E6\u60F3\u5E94\u7528\u7684\u7AEF\u53E3\u53F7</li><li>\u8BE6\u5C3D\u7684\u65E5\u5FD7\u529F\u80FD\uFF0C\u5206\u6790\u6027\u80FD\u74F6\u9888</li><li>\u9AD8\u5EA6\u53EF\u5B9A\u5236\uFF08<em>\u5185\u5B58\u5927\u5C0F\u9650\u5236\uFF0C\u670D\u52A1\u4E00\u5B9A\u6B21\u6570\u540E\u91CD\u542F\u7B49</em>\uFF09</li></ul><img src="'+d+`"><div class="custom-container tip"><p class="custom-container-title">\u7528\u6237\u8BF7\u6C42\u5230 Django \u5E94\u7528\u7684\u6D41\u7A0B</p><ol><li>\u6D4F\u89C8\u5668 \u5C06\u8BF7\u6C42\u53D1\u7ED9 <strong>Nginx</strong> [<code>user -&gt; Nginx</code>]</li><li><strong>Nginx</strong> \u901A\u8FC7 <strong>uwsgi</strong> \u534F\u8BAE\uFF0C\u8F6C\u53D1\u7ED9 <strong>uWSGI</strong> [<code>Nginx -&gt; uwsgi -&gt; uWSGI</code>]</li><li><strong>uWSGI</strong> \u518D\u8F6C\u53D1\u7ED9 <strong>Django</strong> \u5E94\u7528 [<code>uWSGI -&gt; Django</code>]</li></ol></div><div class="custom-container note"><p class="custom-container-title">\u6CE8</p><p><strong>Nginx</strong> \u548C <strong>uWSGI</strong>\u4E4B\u95F4\u662F\u901A\u8FC7 <code>unix socket</code>\uFF0C\u628A\u8BF7\u6C42\u8F6C\u5230 <code>socket</code> \u4E0A\u7684</p></div><h3 id="_1-3-uwsgi-\u5B89\u88C5\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#_1-3-uwsgi-\u5B89\u88C5\u4F7F\u7528" aria-hidden="true">#</a> 1.3 uWSGI \u5B89\u88C5\u4F7F\u7528</h3><ul><li><p>\u5B89\u88C5</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ pip <span class="token function">install</span> uwsgi

<span class="token comment"># ... or if you want to install the latest LTS (long term support) release</span>
$ pip <span class="token function">install</span> https://projects.unbit.it/downloads/uwsgi-lts.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u57FA\u672C\u6D4B\u8BD5</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token comment"># mkdir uWSGI_test dir and Create a file called test.py:</span>

<span class="token comment"># test.py</span>
<span class="token keyword">def</span> <span class="token function">application</span><span class="token punctuation">(</span>env<span class="token punctuation">,</span> start_response<span class="token punctuation">)</span><span class="token punctuation">:</span>
    start_response<span class="token punctuation">(</span><span class="token string">&#39;200 OK&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token string">&#39;Content-Type&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;text/html&#39;</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token string">b&quot;Hello World&quot;</span><span class="token punctuation">]</span> <span class="token comment"># python3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>\u8FD0\u884C:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ uwsgi <span class="token parameter variable">--http</span> :8000 <span class="token parameter variable">--plugin</span> python --wsgi-file test.py
<span class="token comment">##  --plugin python \u544A\u8BC9uWSGI \u7528python\u63D2\u4EF6\uFF0C\u9632\u6B62\u51FA\u9519</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>\u7528 <code>uwsgi</code> \u542F\u52A8 <strong>Django</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u9879\u76EE\u540D.wsgi \u662F Django \u5DE5\u7A0B\u7684\u9879\u76EE\u540D</span>
$ uwsgi <span class="token parameter variable">--http</span> :8000 <span class="token parameter variable">--module</span> <span class="token parameter variable">--plugin</span> python \u9879\u76EE\u540D.wsgi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u521B\u5EFA\uFF0C\u914D\u7F6E <code>uwsgi</code></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># touch application-uwsgi.ini</span>
$ <span class="token function">cat</span> application-uwsgi.ini

<span class="token punctuation">[</span>uwsgi<span class="token punctuation">]</span>

http <span class="token operator">=</span> :9000 								<span class="token comment"># \u4E0E Nginx \u7684 socket\u901A\u4FE1\u7684\u8FDB\u7A0B</span>
socket <span class="token operator">=</span> <span class="token number">127.0</span>.0.1:8001 					<span class="token comment"># \u544A\u8BC9 uWSGI \u9879\u76EE BASE_DIR</span>

chdir <span class="token operator">=</span> /home/igarashi/CODE/Application		<span class="token comment"># \u4E0A\u9762\u5199\u4E86\u7EDD\u5BF9\u8DEF\u5F84\uFF0C\u6B64\u65F6\u76F4\u63A5\u5199\u8DEF\u5F84\u5373\u53EF</span>

wsgi-file <span class="token operator">=</span> Application/wsgi.py

processes <span class="token operator">=</span> <span class="token number">4</span> 								<span class="token comment"># \u542F 4\u4E2A \u8FDB\u7A0B</span>
threads <span class="token operator">=</span> <span class="token number">2</span>									<span class="token comment"># \u6BCF\u4E2A\u8FDB\u7A0B \u542F \u4FE9 \u7EBF\u7A0B</span>

stats <span class="token operator">=</span> <span class="token number">127.0</span>.0.1:9191						<span class="token comment"># \u76D1\u63A7\u547D\u4EE4\uFF0C\u76D1\u63A7\u540E\u53F0\uFF0C\u542F\u52A8\u540E\u4F1A\u591A\u5360\u4E2A\u8FDB\u7A0B</span>
vacuum          <span class="token operator">=</span> <span class="token boolean">true</span>						<span class="token comment"># \u9000\u51FA\u65F6\u628A\u76F8\u5173\u7684\u73AF\u5883\u3001\u73AF\u5883\u53D8\u91CF\u6E05\u9664\u6389</span>

daemonize      <span class="token operator">=</span> /var/log/\u65E5\u5FD7.log		<span class="token comment"># \u65E5\u5FD7</span>

<span class="token comment"># \u542F\u52A8\uFF1A</span>
$ /usr/local/bin/uwsgi <span class="token parameter variable">--ini</span> application-uwsgi.ini

<span class="token comment">## \u67E5\u770Buwsgi\u542F\u52A8\u7684\u8FDB\u7A0B</span>
<span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span><span class="token function">grep</span> uwsgi

<span class="token comment">## \u5168\u5E93\u641C\u7D22\u548Cuwsgi\u76F8\u5173\u7684\u5305\u7B49\u7B49</span>
<span class="token function">sudo</span> <span class="token function">apt-cache</span> search uwsgi <span class="token operator">|</span><span class="token function">grep</span> uwsgi

<span class="token comment">## \u5B89\u88C5uwsgi\u7684\u76D1\u63A7</span>
pip3 <span class="token function">install</span> uwsgitop  <span class="token comment"># uwsgitop:9191 \u7AEF\u53E3 \u8FDB\u884C\u76D1\u63A7</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="_1-4-\u914D\u7F6E-nginx" tabindex="-1"><a class="header-anchor" href="#_1-4-\u914D\u7F6E-nginx" aria-hidden="true">#</a> 1.4 \u914D\u7F6E Nginx</h3>`,9),f=t(`<ul><li><p>\u9ED8\u8BA4\u4E3A <code>/etc/nginx/sites-enabled/default</code> \u6587\u4EF6\u7684\u914D\u7F6E</p><div class="language-ini ext-ini line-numbers-mode"><pre class="language-ini"><code>server {
    <span class="token comment"># the port your site will be served on</span>
    listen      80;
    <span class="token comment"># the domain name it will serve for</span>
    server_name 127.0.0.1; # substitute your machine&#39;s IP address or FQDN
    charset     utf-8;

    <span class="token comment"># max upload size</span>
    client_max_body_size 75M;   # adjust to taste

    <span class="token comment"># Django media</span>
    location /media  {
        alias /home/ubuntu/blog/media;  # your Django project&#39;s media files - amend as required
    }

    location /static {
        alias /home/ubuntu/blog/static; # your Django project&#39;s static files - amend as required
    }

    <span class="token comment"># Finally, send all non-media requests to the Django server.</span>
    location / {
        include     uwsgi_params; # the uwsgi_params file you installed
        uwsgi_pass 127.0.0.1:8001;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u6536\u96C6 <strong>Django</strong> \u9759\u6001\u6587\u4EF6</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># Django setting.py</span>
STATIC_ROOT <span class="token operator">=</span> os.path.join<span class="token punctuation">(</span>BASE_DIR, <span class="token string">&quot;static/&quot;</span><span class="token punctuation">)</span>
DEBUG <span class="token operator">=</span> False
ALLOWED_HOSTS <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;*&#39;</span><span class="token punctuation">]</span>

<span class="token comment"># \u6536\u96C6</span>
$ python manage.py collectstatic
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul>`,1);function y(N,S){const a=p("RouterLink");return o(),c("div",null,[m,v,r(" more "),g,n("ul",null,[b,n("li",null,[n("strong",null,[e(a,{to:"/tool/Nginx/Nginx%E5%9F%BA%E7%A1%80.html#nginx"},{default:i(()=>[s("WSGI")]),_:1})]),s("\uFF1A\u662F "),h,s(" \u670D\u52A1\u5668\u7F51\u5173\u63A5\u53E3\uFF0C\u4E0D\u662F\u670D\u52A1\u5668\uFF0C\u662F\u79CD\u901A\u4FE1\u89C4\u8303")]),n("li",null,[k,s(" \u662F "),e(a,{to:"/tool/Nginx/Nginx%E5%9F%BA%E7%A1%80.html#nginx"},{default:i(()=>[s("uWSGI \u670D\u52A1\u5668")]),_:1}),s(" \u72EC\u5360\u7684\u4E00\u79CD"),_,s("\uFF0C\u4E0D\u662F\u901A\u4FE1\u534F\u8BAE\uFF0C\u5E38\u7528\u4E8E\u5176\u4ED6\u7F51\u7EDC\u670D\u52A1\u5668\u7684\u6570\u636E\u901A\u4FE1 "),w])]),x,n("p",null,[s("\u5B89\u88C5\u914D\u7F6E\u89C1\uFF1A"),e(a,{to:"/tool/Nginx/Nginx%E5%9F%BA%E7%A1%80.html#_2-%E5%AE%89%E8%A3%85"},{default:i(()=>[s("Nginx \u57FA\u7840")]),_:1})]),f])}const I=l(u,[["render",y],["__file","\u5E94\u7528\u90E8\u7F72.html.vue"]]);export{I as default};
