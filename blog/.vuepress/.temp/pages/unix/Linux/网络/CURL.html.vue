<template><div><h1 id="curl-用法指北" tabindex="-1"><a class="header-anchor" href="#curl-用法指北"><span>CURL 用法指北</span></a></h1>
<p><a href="http://www.ruanyifeng.com/blog/2019/09/curl-reference.html" target="_blank" rel="noopener noreferrer">curl-reference</a>  <strong>curl</strong> 是常用的命令行工具，主要是用去请求 <strong>web</strong> 服务器接口</p>
<!-- more --> 
<h2 id="curl-用法指北-1" tabindex="-1"><a class="header-anchor" href="#curl-用法指北-1"><span>curl 用法指北</span></a></h2>
<p>它的名字就是客户端（<em>client</em>）的 <strong>URL</strong> 工具的意思。功能非常强大，命令行参数多达几十种。如果熟练的话，完全可以取代 <strong>Postman</strong> 这一类的图形<br>
界面工具</p>
<h3 id="_1-各种命令集合" tabindex="-1"><a class="header-anchor" href="#_1-各种命令集合"><span>1. 各种命令集合</span></a></h3>
<h4 id="a" tabindex="-1"><a class="header-anchor" href="#a"><span>-A</span></a></h4>
<p>该参数指定客户端的用户代理标头，即 <strong>User-Agent</strong></p>
<p><strong>curl</strong> 的默认用户代理字符串是 <code v-pre>curl/[version]</code></p>
<p>如下命令将 <strong>User-Agent</strong> 改成 <strong>Chrome</strong> 浏览器</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">curl</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -A</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> https://google.com</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 移除标头</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">curl</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -A</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ''</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> https://google.com</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># -H 参数直接指定标头，更改 User-Agent</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">curl</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -H</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'User-Agent: php/1.0'</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> https://google.com</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="b" tabindex="-1"><a class="header-anchor" href="#b"><span>-b</span></a></h3>
<p>-b 参数用来向服务器发送 Cookie。</p>
<pre><code>curl -b 'foo=bar' https://google.com
</code></pre>
<p>上面命令会生成一个标头 Cookie: foo=bar，向服务器发送一个名为 foo、值为 bar 的 Cookie。</p>
<pre><code>curl -b 'foo1=bar;foo2=bar2' https://google.com
</code></pre>
<p>上面命令发送两个 Cookie。</p>
<pre><code>curl -b cookies.txt https://www.google.com
</code></pre>
<p>上面命令读取本地文件 cookies.txt，里面是服务器设置的 Cookie（参见-c 参数），将其发送到服务器。</p>
<h3 id="c" tabindex="-1"><a class="header-anchor" href="#c"><span>-c</span></a></h3>
<p>-c 参数将服务器设置的 Cookie 写入一个文件。</p>
<pre><code>curl -c cookies.txt https://www.google.com
</code></pre>
<p>上面命令将服务器的 HTTP 回应所设置 Cookie 写入文本文件 cookies.txt。</p>
<h3 id="d" tabindex="-1"><a class="header-anchor" href="#d"><span>-d</span></a></h3>
<p>-d 参数用于发送 POST 请求的数据体。</p>
<pre><code>curl -d'login=emma＆password=123'-X POST https://google.com/login
# 或者
curl -d 'login=emma' -d 'password=123' -X POST  https://google.com/login
</code></pre>
<p>使用-d 参数以后，HTTP 请求会自动加上标头 Content-Type : application/x-www-form-urlencoded。并且会自动将请求转为 POST 方法，因此<br>
可以省略-X POST。</p>
<p>-d 参数可以读取本地文本文件的数据，向服务器发送。</p>
<pre><code>curl -d '@data.txt' https://google.com/login
</code></pre>
<p>上面命令读取 data.txt 文件的内容，作为数据体向服务器发送。</p>
<h3 id="data-urlencode" tabindex="-1"><a class="header-anchor" href="#data-urlencode"><span>--data-urlencode</span></a></h3>
<p>--data-urlencode 参数等同于-d，发送 POST 请求的数据体，区别在于会自动将发送的数据进行 URL 编码。</p>
<pre><code>curl --data-urlencode 'comment=hello world' https://google.com/login
</code></pre>
<p>上面代码中，发送的数据 hello world 之间有一个空格，需要进行 URL 编码。</p>
<h3 id="e" tabindex="-1"><a class="header-anchor" href="#e"><span>-e</span></a></h3>
<p>-e 参数用来设置 HTTP 的标头 Referer，表示请求的来源。</p>
<pre><code>curl -e 'https://google.com?q=example' https://www.example.com
</code></pre>
<p>上面命令将 Referer 标头设为<a href="https://google.com?q=example%E3%80%82" target="_blank" rel="noopener noreferrer">https://google.com?q=example。</a></p>
<h3 id="h-参数可以通过直接添加标头-referer-达到同样效果。" tabindex="-1"><a class="header-anchor" href="#h-参数可以通过直接添加标头-referer-达到同样效果。"><span>-H 参数可以通过直接添加标头 Referer，达到同样效果。</span></a></h3>
<pre><code>curl -H 'Referer: https://google.com?q=example' https://www.example.com
</code></pre>
<h3 id="f" tabindex="-1"><a class="header-anchor" href="#f"><span>-F</span></a></h3>
<p>-F 参数用来向服务器上传二进制文件。</p>
<pre><code>curl -F 'file=@photo.png' https://google.com/profile
</code></pre>
<p>上面命令会给 HTTP 请求加上标头 Content-Type: multipart/form-data，然后将文件 photo.png 作为 file 字段上传。</p>
<p>-F 参数可以指定 MIME 类型。</p>
<pre><code>curl -F 'file=@photo.png;type=image/png' https://google.com/profile
</code></pre>
<p>上面命令指定 MIME 类型为 image/png，否则 curl 会把 MIME 类型设为 application/octet-stream。</p>
<p>-F 参数也可以指定文件名。</p>
<pre><code>curl -F 'file=@photo.png;filename=me.png' https://google.com/profile
</code></pre>
<p>上面命令中，原始文件名为 photo.png，但是服务器接收到的文件名为 me.png。</p>
<h3 id="g" tabindex="-1"><a class="header-anchor" href="#g"><span>-G</span></a></h3>
<p>-G 参数用来构造 URL 的查询字符串。</p>
<pre><code>curl -G -d 'q=kitties' -d 'count=20' https://google.com/search
</code></pre>
<p>上面命令会发出一个 GET 请求，实际请求的 URL 为<a href="https://google.com/search?q=kitties&amp;count=20%E3%80%82%E5%A6%82%E6%9E%9C%E7%9C%81%E7%95%A5--G%EF%BC%8C%E4%BC%9A%E5%8F%91%E5%87%BA%E4%B8%80%E4%B8%AA" target="_blank" rel="noopener noreferrer">https://google.com/search?q=kitties&amp;count=20。如果省略--G，会发出一个</a> POST 请求。</p>
<p>如果数据需要 URL 编码，可以结合--data--urlencode 参数。</p>
<pre><code>curl -G --data-urlencode 'comment=hello world' https://www.example.com
</code></pre>
<h3 id="h" tabindex="-1"><a class="header-anchor" href="#h"><span>-H</span></a></h3>
<p>-H 参数添加 HTTP 请求的标头。</p>
<pre><code>curl -H 'Accept-Language: en-US' https://google.com
</code></pre>
<p>上面命令添加 HTTP 标头 Accept-Language: en-US。</p>
<pre><code>curl -H 'Accept-Language: en-US' -H 'Secret-Message: xyzzy' https://google.com
</code></pre>
<p>上面命令添加两个 HTTP 标头。</p>
<pre><code>curl -d '{&quot;login&quot;: &quot;emma&quot;, &quot;pass&quot;: &quot;123&quot;}' -H 'Content-Type: application/json' https://google.com/login
</code></pre>
<p>上面命令添加 HTTP 请求的标头是 Content-Type: application/json，然后用-d 参数发送 JSON 数据。</p>
<h3 id="i" tabindex="-1"><a class="header-anchor" href="#i"><span>-i</span></a></h3>
<p>-i 参数打印出服务器回应的 HTTP 标头。</p>
<pre><code>curl -i https://www.example.com
</code></pre>
<p>上面命令收到服务器回应后，先输出服务器回应的标头，然后空一行，再输出网页的源码。</p>
<h3 id="i-1" tabindex="-1"><a class="header-anchor" href="#i-1"><span>-I</span></a></h3>
<p>-I 参数向服务器发出 HEAD 请求，然会将服务器返回的 HTTP 标头打印出来。</p>
<pre><code>curl -I https://www.example.com
</code></pre>
<p>上面命令输出服务器对 HEAD 请求的回应。</p>
<p>--head 参数等同于-I。</p>
<p>$ curl --head <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">https://www.example.com</a></p>
<h3 id="k" tabindex="-1"><a class="header-anchor" href="#k"><span>-k</span></a></h3>
<p>-k 参数指定跳过 SSL 检测。</p>
<pre><code>curl -k https://www.example.com
</code></pre>
<p>上面命令不会检查服务器的 SSL 证书是否正确。</p>
<h3 id="l" tabindex="-1"><a class="header-anchor" href="#l"><span>-L</span></a></h3>
<p>-L 参数会让 HTTP 请求跟随服务器的重定向。curl 默认不跟随重定向。</p>
<pre><code>curl -L -d 'tweet=hi' https://api.twitter.com/tweet
</code></pre>
<h3 id="limit-rate" tabindex="-1"><a class="header-anchor" href="#limit-rate"><span>--limit-rate</span></a></h3>
<p>--limit-rate 用来限制 HTTP 请求和回应的带宽，模拟慢网速的环境。</p>
<pre><code>curl --limit-rate 200k https://google.com
</code></pre>
<p>上面命令将带宽限制在每秒 200K 字节。</p>
<h3 id="o" tabindex="-1"><a class="header-anchor" href="#o"><span>-o</span></a></h3>
<p>-o 参数将服务器的回应保存成文件，等同于 wget 命令。</p>
<pre><code>curl -o example.html https://www.example.com
</code></pre>
<p>上面命令将www.example.com保存成example.html。</p>
<h3 id="o-1" tabindex="-1"><a class="header-anchor" href="#o-1"><span>-O</span></a></h3>
<p>-O 参数将服务器回应保存成文件，并将 URL 的最后部分当作文件名。</p>
<pre><code>curl -O https://www.example.com/foo/bar.html
</code></pre>
<p>上面命令将服务器回应保存成文件，文件名为 bar.html。</p>
<p>###-s<br>
-s 参数将不输出错误和进度信息。</p>
<pre><code>curl -s https://www.example.com
</code></pre>
<p>上面命令一旦发生错误，不会显示错误信息。不发生错误的话，会正常显示运行结果。</p>
<p>如果想让 curl 不产生任何输出，可以使用下面的命令。</p>
<pre><code>curl -s -o /dev/null https://google.com
</code></pre>
<h3 id="s" tabindex="-1"><a class="header-anchor" href="#s"><span>-S</span></a></h3>
<p>-S 参数指定只输出错误信息，通常与-s 一起使用。</p>
<pre><code>curl -s -o /dev/null https://google.com
</code></pre>
<p>上面命令没有任何输出，除非发生错误。</p>
<h3 id="u" tabindex="-1"><a class="header-anchor" href="#u"><span>-u</span></a></h3>
<p>-u 参数用来设置服务器认证的用户名和密码。</p>
<pre><code>curl -u 'bob:12345' https://google.com/login
</code></pre>
<p>上面命令设置用户名为 bob，密码为 12345，然后将其转为 HTTP 标头 Authorization: Basic Ym9iOjEyMzQ1。</p>
<p>curl 能够识别 URL 里面的用户名和密码。</p>
<pre><code>curl https://bob:12345@google.com/login
</code></pre>
<p>上面命令能够识别 URL 里面的用户名和密码，将其转为上个例子里面的 HTTP 标头。</p>
<pre><code>curl -u 'bob' https://google.com/login
</code></pre>
<p>上面命令只设置了用户名，执行后，curl 会提示用户输入密码。</p>
<h3 id="v" tabindex="-1"><a class="header-anchor" href="#v"><span>-v</span></a></h3>
<p>-v 参数输出通信的整个过程，用于调试。</p>
<pre><code>curl -v https://www.example.com
</code></pre>
<p>--trace 参数也可以用于调试，还会输出原始的二进制数据。</p>
<pre><code>curl --trace - https://www.example.com
</code></pre>
<h3 id="x" tabindex="-1"><a class="header-anchor" href="#x"><span>-x</span></a></h3>
<p>-x 参数指定 HTTP 请求的代理。</p>
<pre><code>curl -x socks5://james:cats@myproxy.com:8080 https://www.example.com
</code></pre>
<p>上面命令指定 HTTP 请求通过 <a href="http://myproxy.com:8080" target="_blank" rel="noopener noreferrer">myproxy.com:8080</a> 的 socks5 代理发出。</p>
<p>如果没有指定代理协议，默认为 HTTP。</p>
<pre><code>curl -x james:cats@myproxy.com:8080 https://www.example.com
</code></pre>
<p>上面命令中，请求的代理使用 HTTP 协议。</p>
<h3 id="x-1" tabindex="-1"><a class="header-anchor" href="#x-1"><span>-X</span></a></h3>
<p>-X 参数指定 HTTP 请求的方法。</p>
<pre><code>curl -X POST https://www.example.com
</code></pre>
<p>上面命令对 <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">https://www.example.com</a> 发出 <strong>POST</strong> 请求</p>
<h3 id="补充-telnet" tabindex="-1"><a class="header-anchor" href="#补充-telnet"><span>补充 telnet</span></a></h3>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">windows下</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 控制面板</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> -> </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">程序和功能</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> -> </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">打开或关闭Windows功能</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> -> </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">勾选</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> telnet客户端/服务端</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> -> </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">等一会</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">yum</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -y</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> telnet</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">telnet</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> port</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">  若提示失败则未连通</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 若全黑框则连通</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


