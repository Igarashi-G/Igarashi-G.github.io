import{_ as r}from"./plugin-vueexport-helper.2444895f.js";import{o,c,e as d,d as u,w as e,a as n,b as s,f as p,r as m}from"./app.a2a4f0ed.js";const v={},b=n("p",null,[n("strong",null,"MySQL"),s("\uFF0C\u70C2\u5927\u8857\u7684\u5173\u7CFB\u578B\u6570\u636E\u5E93\uFF0C\u4F46\u6211\u4F9D\u7136\u6CA1\u6709\u5B66\u597D")],-1),g=n("h2",{id:"_1-\u5B89\u88C5",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-\u5B89\u88C5","aria-hidden":"true"},"#"),s(" 1. \u5B89\u88C5")],-1),k=n("div",{class:"language-bash ext-sh line-numbers-mode"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token comment"},"# \u5B89\u88C5"),s(`
yum `),n("span",{class:"token function"},"install"),s(" mysql-server "),n("span",{class:"token parameter variable"},"-y"),s(`

`),n("span",{class:"token comment"},"# \u542F\u52A8"),s(`
systemctl start mysqld

`),n("span",{class:"token comment"},"# \u8FDE\u63A5 mysql -h host -u user -p password"),s(`
mysql `),n("span",{class:"token parameter variable"},"-h"),s(),n("span",{class:"token number"},"127.0"),s(".0.1 "),n("span",{class:"token parameter variable"},"-u"),s(" root "),n("span",{class:"token parameter variable"},"-p"),s(`

`),n("span",{class:"token comment"},"# \u5E38\u89C1\u9519\u8BEF"),s(`
ERROR `),n("span",{class:"token number"},"2002"),s(),n("span",{class:"token punctuation"},"("),s("HY000"),n("span",{class:"token punctuation"},")"),s(": Can"),n("span",{class:"token string"},"'t connect to local MySQL server through socket '"),s("/tmp/mysql.sock' "),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"2"),n("span",{class:"token punctuation"},")"),s(`, it means that
the MySQL server daemon `),n("span",{class:"token punctuation"},"("),s("Unix"),n("span",{class:"token punctuation"},")"),s(" or "),n("span",{class:"token function"},"service"),s(),n("span",{class:"token punctuation"},"("),s("Windows"),n("span",{class:"token punctuation"},")"),s(` is not running.

`),n("span",{class:"token comment"},"# QUIT \u6216\u8005 Control + D"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),h=n("p",null,[n("strong",null,"bin\u76EE\u5F55\uFF1A"),s(),n("strong",null,"MYSQL"),s(" \u6570\u636E\u5E93\u4E0B "),n("strong",null,"bin"),s(" \u76EE\u5F55\u662F "),n("strong",null,"MYSQL"),s(" \u7684\u53EF\u6267\u884C\u7A0B\u5E8F")],-1),y=n("ul",null,[n("li",null,[n("p",null,[s("\u5728 "),n("strong",null,"bin"),s(" \u76EE\u5F55\u4E0B\u8FD0\u884C "),n("code",null,"mysqld"),s(" \u5F00\u542F "),n("strong",null,"mysql"),s(" \u7684 "),n("strong",null,"socket"),s("\uFF0C\u56E0\u6B64\u591A\u79CD\u8BED\u8A00\uFF08"),n("em",null,[s("\u5982 "),n("strong",null,"JAVA"),s("\u3001"),n("strong",null,"Python"),s("\u3001"),n("strong",null,"C#"),s("\u3001"),n("strong",null,"Ruby"),s("\u3001"),n("strong",null,"PHP"),s(" \u7B49\u7B49")]),s("\uFF09\u53EF\u4EE5\u5199\u5BF9\u5E94\u7684 "),n("strong",null,"socket"),s(" \u8FDB\u884C\u6570\u636E\u5E93\u7684\u8FDE\u63A5")])]),n("li",null,[n("p",null,[s("\u6570\u636E\u5E93\u7684\u670D\u52A1\u5668\u7AEF\u8FD0\u884C\u8D77\u6765\u5C31\u662F\u4E00\u4E2A "),n("strong",null,"socket server"),s(" \uFF0C\u4E4B\u540E\u542F\u52A8\u5BA2\u6237\u7AEF\u53BB\u8FDE\u63A5\u670D\u52A1\u7AEF")])]),n("li",null,[n("p",null,[s("\u8BA4\u8BC1\u8FDE\u63A5\u540E\u53D1\u9001\u547D\u4EE4\uFF0C\u6570\u636E\u5E93\u4FBF\u53EF\u6267\u884C\u5BF9\u5E94\u7684\u547D\u4EE4\u3002"),n("strong",null,"MySql"),s(" \u4E5F\u63D0\u4F9B\u4E86\u81EA\u5DF1\u7684\u4E00\u4E2A\u8FDE\u63A5 "),n("strong",null,"socket"),s("\uFF0C\u5728 "),n("strong",null,"bin"),s(" \u4E0B\u8FD0\u884C "),n("strong",null,"mysql"),s(" \u4FBF\u53EF\u5F00\u542F\u3002")])])],-1),f=n("p",null,[n("strong",null,"\u8FDE\u63A5\uFF1A")],-1),E=n("div",{class:"language-powershell ext-powershell line-numbers-mode"},[n("pre",{class:"language-powershell"},[n("code",null,[s("$ mysql "),n("span",{class:"token operator"},"-"),s("u root "),n("span",{class:"token operator"},"-"),s(`p
`),n("span",{class:"token comment"},"#  -u: \u7528\u6237\u540D"),s(`
`),n("span",{class:"token comment"},"#  -p: password"),s(`
`),n("span",{class:"token comment"},"# root \u521D\u59CB\u5316\u4E0D\u8BBE\u7F6E\u5BC6\u7801\uFF0C\u76F4\u63A5\u56DE\u8F66\u5373\u53EF"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),q=n("p",null,[s("\u628A "),n("strong",null,"mysqld"),s(" \u641E\u6210\u4E00\u4E2A "),n("strong",null,"windows"),s(" \u670D\u52A1\uFF08"),n("em",null,"\u4EFB\u52A1\u7BA1\u7406\u5668 - \u670D\u52A1"),s("\uFF09\u6BCF\u6B21\u5F00\u673A\u4F1A\u81EA\u52A8\u542F\u52A8")],-1),A=n("ul",null,[n("li",null,[n("p",null,[n("code",null,"mysqld --install"),s(" \u547D\u4EE4\u8FD0\u884C "),n("code",null,"Install/Remove of the Service Denied!")])]),n("li",null,[n("p",null,[s("\u7528 "),n("code",null,"net start/stop mysql"),s(" \u5373\u53EF\u542F\u52A8/\u5173\u95ED")])])],-1),_=p(`<h2 id="_2-\u7528\u6237\u6743\u9650" tabindex="-1"><a class="header-anchor" href="#_2-\u7528\u6237\u6743\u9650" aria-hidden="true">#</a> 2. \u7528\u6237\u6743\u9650</h2><h5 id="\u9ED8\u8BA4\u6570\u636E\u5E93\u5982\u4E0B" tabindex="-1"><a class="header-anchor" href="#\u9ED8\u8BA4\u6570\u636E\u5E93\u5982\u4E0B" aria-hidden="true">#</a> <strong>\u9ED8\u8BA4\u6570\u636E\u5E93\u5982\u4E0B</strong></h5><ul><li><strong>mysql\uFF1A</strong> \u7528\u6237\u6743\u9650\u76F8\u5173\u6570\u636E</li><li><strong>test\uFF1A</strong> \u7528\u4E8E\u7528\u6237\u6D4B\u8BD5\u6570\u636E</li><li><strong>information_schema\uFF1A</strong> <strong>MySQL</strong> \u672C\u8EAB\u67B6\u6784\u76F8\u5173\u6570\u636E</li></ul><h5 id="\u6570\u636E\u5E93\u7B80\u5355\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#\u6570\u636E\u5E93\u7B80\u5355\u4F7F\u7528" aria-hidden="true">#</a> <strong>\u6570\u636E\u5E93\u7B80\u5355\u4F7F\u7528</strong></h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u67E5\u770B MySQL \u6709\u90A3\u4E9B\u6570\u636E\u5E93</span>
$ show databases<span class="token punctuation">;</span>

<span class="token comment"># #\u521B\u5EFA\u6570\u636E\u5E93 order \uFF08\u901A\u5E38\u521B\u5EFA utf-8 \u7684\uFF09</span>
$ create database order<span class="token punctuation">;</span>

<span class="token comment"># \u9009\u5219\u8FDB\u5165 order \u6570\u636E\u5E93</span>
$ use order<span class="token punctuation">;</span>

<span class="token comment"># \u521B\u5EFA order \u6570\u636E\u5E93\u4E2D \u7684 user \u8868</span>
$ create table user<span class="token punctuation">(</span>nid int, name varchar<span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span>, <span class="token builtin class-name">pwd</span> varchar<span class="token punctuation">(</span><span class="token number">64</span><span class="token punctuation">))</span><span class="token punctuation">;</span>
	- <span class="token variable"><span class="token variable">\`</span>varchar<span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span>:<span class="token variable">\`</span></span> <span class="token string">&quot;\u8868\u793A\u6700\u957F\u4E3A20\u7684\u5B57\u7B26\u4E32\uFF0C\u8D85\u8FC7\u5219\u622A\u53D6\u524D20\u4E2A&quot;</span>

<span class="token comment"># \u67E5\u770B order \u6570\u636E\u5E93\u4E0B\uFF0C\u6709\u90A3\u4E9B\u8868</span>
$ show tables<span class="token punctuation">;</span>


<span class="token comment"># \u67E5\u770B user \u8868\u4E2D\u6240\u6709\u6570\u636E</span>
<span class="token keyword">select</span> * from user<span class="token punctuation">;</span>

<span class="token comment"># \u5411 user \u8868\u63D2\u5165\u4E00\u6761\u6570\u636E</span>
insert into user<span class="token punctuation">(</span>nid, name, <span class="token builtin class-name">pwd</span><span class="token punctuation">)</span> values<span class="token punctuation">(</span><span class="token number">1</span>, <span class="token string">&quot;zz&quot;</span>, <span class="token string">&quot;123&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment"># \u6E05\u7A7A user \u8868\u5185\u5BB9</span>
delete from user<span class="token punctuation">;</span>
<span class="token variable"><span class="token variable">\`</span>\u5BF9\u4E8E\u81EA\u589E\u6765\u8BF4\uFF0C\u5373\u4F7F\u6E05\u7A7A\uFF0C\u4E5F\u4FDD\u7559\u4E86\u4E4B\u524D\u7684\u81EA\u589E\u53F7\uFF0C\u4ECE\u4E0B\u4E00\u81EA\u589E\u53F7\u5F00\u59CB<span class="token variable">\`</span></span>

<span class="token comment"># \u6E05\u7A7A user \u8868\u5185\u5BB9</span>
truncate table user<span class="token punctuation">;</span>
<span class="token variable"><span class="token variable">\`</span>\u5BF9\u4E8E\u81EA\u589E\uFF0C\u4E5F\u5F7B\u5E95\u6E05\u7A7A\uFF0C\u4E0B\u6B21\u63D2\u5165\u6570\u636E\u4ECE <span class="token number">1</span> \u5F00\u59CB<span class="token variable">\`</span></span>

<span class="token comment"># \u5220\u9664 user \u8868</span>
drop table user<span class="token punctuation">;</span>

<span class="token comment"># \u67E5\u8BE2\u6570\u636E\u5E93\u7684\u6700\u5927\u8FDE\u63A5\u6570</span>
show variables like <span class="token string">&#39;max_connections&#39;</span><span class="token punctuation">;</span>    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="\u7528\u6237-\u6388\u6743" tabindex="-1"><a class="header-anchor" href="#\u7528\u6237-\u6388\u6743" aria-hidden="true">#</a> \u7528\u6237&amp;\u6388\u6743:</h5><p><strong>MySQL</strong> \u6709\u9ED8\u8BA4\u521B\u5EFA\u597D\u7684\u7528\u6237\u8868 <strong>user</strong>\uFF0C \u867D\u7136\u53EF\u4EE5\u7528 <code>insert</code> \u6765\u521B\u5EFA\u7528\u6237\uFF0C\u4F46\u4E0D\u63A8\u8350</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u67E5\u770Buser\u8868\u7684\u6240\u6709\u6570\u636E\uFF08\u4E71\u7801\uFF09</span>
$ <span class="token keyword">select</span> * from user<span class="token punctuation">;</span>

<span class="token comment"># \u67E5\u770Buser\u8868\u4E2D\u7684\u5404\u4E2A\u5B57\u6BB5\u8BE6\u60C5</span>
$ desc user<span class="token punctuation">;</span>

<span class="token comment"># \u67E5\u770Buser\u8868\u4E2D\u7684host\u5B57\u6BB5\u6570\u636E\u548Cuser\u5B57\u6BB5\u6570\u636E</span>
$ <span class="token keyword">select</span> host,user from user<span class="token punctuation">;</span>

<span class="token comment"># \u67E5\u8BE2\u6743\u9650\uFF0C\u53EF\u770B\u5230\u6570\u636E\u5E93\u4E2D\u6240\u6709\u6743\u9650\u76F8\u5173\u4FE1\u606F</span>
$ <span class="token keyword">select</span> * from mysql.user<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="\u7528\u6237\u7BA1\u7406" tabindex="-1"><a class="header-anchor" href="#\u7528\u6237\u7BA1\u7406" aria-hidden="true">#</a> \u7528\u6237\u7BA1\u7406\uFF1A</h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u521B\u5EFA\u7528\u6237</span>
$ create user <span class="token string">&#39;\u7528\u6237\u540D&#39;</span>@<span class="token string">&#39;IP\u5730\u5740&#39;</span> identified by <span class="token string">&#39;\u5BC6\u7801&#39;</span><span class="token punctuation">;</span>    
<span class="token variable"><span class="token variable">\`</span>\u5982\uFF08create user <span class="token string">&quot;igarashi&quot;</span>@<span class="token string">&quot;localhost&quot;</span> identified by <span class="token string">&quot;123&quot;</span>\uFF09\u4E0B\u7565<span class="token variable">\`</span></span>

<span class="token comment"># \u5220\u9664\u7528\u6237</span>
$ drop user <span class="token string">&#39;\u7528\u6237\u540D&#39;</span>@<span class="token string">&#39;IP\u5730\u5740&#39;</span><span class="token punctuation">;</span>

<span class="token comment">#\u4FEE\u6539\u7528\u6237</span>
$ <span class="token function">rename</span> user <span class="token string">&#39;\u7528\u6237\u540D&#39;</span>@<span class="token string">&#39;IP\u5730\u5740&#39;</span><span class="token punctuation">;</span> to <span class="token string">&#39;\u65B0\u7528\u6237\u540D&#39;</span>@<span class="token string">&#39;IP\u5730\u5740&#39;</span><span class="token punctuation">;</span>

<span class="token comment"># \u4FEE\u6539\u5BC6\u7801</span>
$ <span class="token builtin class-name">set</span> password <span class="token keyword">for</span> <span class="token string">&#39;\u7528\u6237\u540D&#39;</span>@<span class="token string">&#39;IP\u5730\u5740&#39;</span> <span class="token operator">=</span> Password<span class="token punctuation">(</span><span class="token string">&#39;\u65B0\u5BC6\u7801&#39;</span><span class="token punctuation">)</span>
	<span class="token parameter variable">-h</span> <span class="token builtin class-name">:</span> <span class="token comment"># \u767B\u5F55\u65F6\u8BBE\u7F6E\u8F93\u5165 IP \u5730\u5740</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="\u6743\u9650\u7BA1\u7406" tabindex="-1"><a class="header-anchor" href="#\u6743\u9650\u7BA1\u7406" aria-hidden="true">#</a> \u6743\u9650\u7BA1\u7406:</h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u6388\u6743</span>
$ grant \u6743\u9650 on \u6570\u636E\u5E93.\u8868 to  <span class="token string">&#39;\u7528\u6237&#39;</span>@<span class="token string">&#39;IP\u5730\u5740&#39;</span>

\u5982 grant <span class="token keyword">select</span> on test.tb1 to <span class="token string">&quot;igarashi&quot;</span>@<span class="token string">&quot;localhost&quot;</span><span class="token punctuation">;</span>

<span class="token comment"># \u82E5\u8FDC\u7A0B\u7BA1\u7406\u8FDE\u63A5, \u53EA\u9700\u8981\u521B\u5EFA \u5BF9\u5E94IP\u5730\u5740 \u7684\u7528\u6237\uFF0C\u5E76\u8FDB\u884C\u6388\u6743</span>
$ grant <span class="token keyword">select</span> on test.tb1 to <span class="token string">&quot;igarashi&quot;</span>@<span class="token string">&quot;192.168.1.12&quot;</span><span class="token punctuation">;</span>
<span class="token variable"><span class="token variable">\`</span> \u5373\u53EF\u8BA9\u7528\u6237 fuuka \u8FDC\u7A0B\u5728 <span class="token number">192.168</span>.1.12 \u4E0A\u767B\u5F55 <span class="token variable">\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u901A\u914D\u7B26</strong></p><ul><li><p><strong>\u7528\u6237\u540D@IP\u5730\u5740 :</strong> \u7528\u6237\u53EA\u80FD\u5728 \u8BE5 <strong>IP</strong> \u4E0B \u8BBF\u95EE</p></li><li><p><strong>\u7528\u6237\u540D@192.168.1.% :</strong> \u7528\u6237\u53EA\u80FD\u5728 \u8BE5 <strong>IP</strong> \u6BB5 \u4E0B\u8BBF\u95EE\uFF08<em><strong>%</strong> \u8868\u793A\u4EFB\u610F\uFF0C\u521B\u5EFA\u65F6\u9700\u7528 &quot;&quot; \u53F7\uFF0C</em><em>%</em>* \u662F\u7279\u6B8A\u5B57\u7B26*\uFF09</p></li><li><p><strong>\u7528\u6237\u540D@% :</strong> \u7528\u6237\u53EF\u5728 \u4EFB\u610F <strong>IP</strong> \u4E0B\u8BBF\u95EE \uFF08<em>\u9ED8\u8BA4\u503C</em>\uFF09</p></li><li><p>\u8FDC\u7A0B\u5BA2\u6237\u7AEF\u8FDE\u63A5\u767B\u5F55\u547D\u4EE4\u5982\u4E0B</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ mysql <span class="token parameter variable">-u</span> <span class="token string">&quot;username&quot;</span> <span class="token parameter variable">-h</span> <span class="token string">&quot;ip addr&quot;</span> <span class="token parameter variable">-P</span> <span class="token number">3306</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;passwd&quot;</span>
<span class="token comment"># 3306 \u9ED8\u8BA4\u503C\uFF0C\u4FEE\u6539\u81EA\u914D\u7684\u7AEF\u53E3\u53F7</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h5 id="\u5176\u4ED6" tabindex="-1"><a class="header-anchor" href="#\u5176\u4ED6" aria-hidden="true">#</a> \u5176\u4ED6\uFF1A</h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u5237\u65B0\u6743\u9650\uFF0C\u5C06\u6570\u636E\u8BFB\u53D6\u5230\u5185\u5B58\u4E2D\uFF0C\u4F7F\u5176\u7ACB\u5373\u751F\u6548</span>
$ flush privileges<span class="token punctuation">;</span>

<span class="token comment"># \u82E5\u5FD8\u8BB0\u5BC6\u7801\uFF1A \u542F\u52A8\u514D\u6388\u6743\u670D\u52A1\u7AEF\uFF0C\u8DF3\u8FC7\u6570\u636E\u5E93\u6743\u9650\u9A8C\u8BC1, \u6216\u662F\u53BB\u4FEE\u6539 my.ini</span>
$ mysqld --skip-grant-tables

<span class="token comment"># \u7EE7\u7EED\u5BA2\u6237\u7AEF\u8F93\u5165</span>
$ mysql <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span> <span class="token string">&quot;\u4EFB\u610F&quot;</span>

<span class="token comment"># \u4FEE\u6539\u7528\u6237\u540D\u5BC6\u7801</span>
$ use mysql
$ update mysql.user <span class="token builtin class-name">set</span> <span class="token assign-left variable">authentication_string</span><span class="token operator">=</span>password<span class="token punctuation">(</span><span class="token string">&#39;user@dev&#39;</span><span class="token punctuation">)</span> where <span class="token assign-left variable">user</span><span class="token operator">=</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">;</span>

$ flush privileges<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-\u5E38\u7528\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#_3-\u5E38\u7528\u64CD\u4F5C" aria-hidden="true">#</a> 3. \u5E38\u7528\u64CD\u4F5C</h2><h4 id="\u521B\u5EFA\u8868" tabindex="-1"><a class="header-anchor" href="#\u521B\u5EFA\u8868" aria-hidden="true">#</a> \u521B\u5EFA\u8868</h4><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>create table \u8868\u540D(
    \u5217\u540D  \u7C7B\u578B  \u662F\u5426\u53EF\u4EE5\u4E3A\u7A7A\uFF0C
    \u5217\u540D  \u7C7B\u578B  \u662F\u5426\u53EF\u4EE5\u4E3A\u7A7A
)ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>ENGINE\uFF1A</strong> \u6570\u636E\u5E93\u5F15\u64CE\uFF0C <strong>InnoDB</strong> \u8FD8\u662F <strong>MyISAM</strong><ul><li><strong>MyISAM:</strong> \u652F\u6301 <strong>\u5168\u6587\u7D22\u5F15</strong>\uFF0C\u901F\u5EA6\u5FEB</li><li>**InnoDB: ** \u652F\u6301 <strong>\u4E8B\u52A1</strong>, \u901F\u5EA6\u6162</li></ul></li><li><strong>\u4E8B\u52A1\uFF1A</strong> \u539F\u5B50\u64CD\u4F5C\uFF0C\u5373 <strong>\u4E0D\u80FD\u5206\u5272</strong> \u7684\u64CD\u4F5C\uFF0C\u5982\uFF1A<strong>\u8F6C\u8D26</strong>\uFF08<em>\u51CF\u94B1\u3001\u52A0\u94B1</em>\uFF09\u4E0D\u80FD\u8F6C\u4E00\u534A\u65AD\u7535\u6570\u636E\u4E22\u5931\uFF0C\u56E0\u6B64\u65AD\u7535\u8981\u56DE\u9000\u539F\u6765\u72B6\u6001\uFF0C<strong>\u628A\u591A\u4E2A\u52A8\u4F5C\u53E0\u52A0\u5728\u4E00\u8D77\uFF0C\u79F0\u4E4B\u4E3A\u4E00\u4E2A\u4E8B\u52A1</strong></li><li><strong>\u662F\u5426\u53EF\u7A7A\uFF1A</strong><ul><li><strong>not null\uFF1A</strong> \u4E0D\u53EF\u7A7A</li><li><strong>null\uFF1A</strong> \u53EF\u7A7A</li></ul></li></ul><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>create table tb1(
    nid int not null defalut 2,
    num int not null
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>default\uFF1A</strong> \u9ED8\u8BA4\u503C\uFF0C\u521B\u5EFA\u53EF\u6307\u5B9A\uFF0C\u63D2\u5165\u6570\u636E\u82E5\u672A\u8BBE\u7F6E\uFF0C\u5219\u81EA\u52A8\u4F7F\u7528\u9ED8\u8BA4\u503C</li></ul><h5 id="\u4E3B\u952E\u81EA\u589E" tabindex="-1"><a class="header-anchor" href="#\u4E3B\u952E\u81EA\u589E" aria-hidden="true">#</a> <strong>\u4E3B\u952E\u81EA\u589E\uFF1A</strong></h5><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>create table tb1(
    nid int not null auto_increment primary key,
	num int null
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p><strong>auto_increment\uFF1A</strong> \u81EA\u589E\uFF0C\u82E5\u67D0\u5217\u8BBE\u4E3A\u81EA\u589E\u5217\uFF0C\u63D2\u5165\u65E0\u9700\u518D\u6B21\u6307\u5B9A\uFF0C\u6B64\u5217\u4F1A\u81EA\u589E\uFF08<em>\u8868\u4E2D\u53EA\u80FD\u6709\u4E00\u4E2A\u81EA\u589E\u5217</em> \uFF09\u5BF9\u4E8E\u81EA\u589E\u5217\uFF1A</p><ul><li><strong>\u5FC5\u987B\u662F\u7D22\u5F15</strong>\uFF08<em>\u542B\u4E3B\u952E</em>\uFF09</li><li>\u53EF\u4EE5\u8BBE\u7F6E <strong>\u6B65\u957F</strong> \u548C <strong>\u8D77\u59CB\u503C</strong></li></ul></li><li><p>\u4FEE\u6539\u81EA\u589E\u5217</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>-- \u4FEE\u6539 users \u8868 \u81EA\u589E id \u4E3A 123456
alter table users AUTO_INCREMENT=123456;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>primary key\uFF1A</strong> \u4E3B\u952E\uFF0C\u7279\u6B8A\u7684 <strong>\u552F\u4E00\u7D22\u5F15</strong>\uFF0C<strong>\u4E0D\u5141\u8BB8\u6709\u7A7A\u503C</strong>\uFF0C\u82E5\u4E3B\u952E\u4F7F\u7528\uFF1A</p><ul><li><strong>\u5355\u4E2A\u5217\uFF1A</strong> \u5219\u5B83\u7684 <strong>\u503C \u5FC5\u987B\u552F\u4E00</strong></li><li><strong>\u591A\u5217\uFF1A</strong> \u5219\u5176 <strong>\u7EC4\u5408 \u5FC5\u987B\u552F\u4E00</strong></li></ul><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>create table tb1(
    nid int not null auto_increment primary key, -- or primary key(nid,num) 
	...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h5 id="\u7EA6\u675F-\u8054\u5408-\u552F\u4E00" tabindex="-1"><a class="header-anchor" href="#\u7EA6\u675F-\u8054\u5408-\u552F\u4E00" aria-hidden="true">#</a> <strong>\u7EA6\u675F\uFF08\u8054\u5408\uFF09\u552F\u4E00\uFF1A</strong></h5><p><strong>\u4E0E\u4E3B\u952E\u7EA6\u675F\u76F8\u4F3C</strong> \uFF0C\u90FD\u53EF\u4EE5 <strong>\u786E\u4FDD\u5217\u7684\u552F\u4E00\u6027</strong>\uFF0C\u4E0D\u540C\u7684\u662F\uFF0C\u552F\u4E00\u7EA6\u675F\u5728\u4E00\u4E2A\u8868\u4E2D <strong>\u53EF\u6709\u591A\u4E2A</strong> \uFF0C\u8BBE\u7F6E\u552F\u4E00\u7EA6\u675F\u7684\u5217\u5141\u8BB8\u6709\u7A7A\u503C\uFF0C\u4F46\u4E5F <strong>\u4EC5\u6709\u4E00\u4E2A\u7A7A\u503C</strong></p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>CREATE TABLE \`textbook_edition\` (
    \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT &#39; \u9ED8\u8BA4 id&#39;,
    \u5217\u540D \u7C7B\u578B unsigned NOT NULL DEFAULT &#39;1&#39; COMMENT &#39;XX&#39;,
    PRIMARY KEY (\`id\`), 										-- \u8BBE\u7F6E\u4E3B\u952E
    UNIQUE KEY \`idx_grade_subject\` (\`grade_type\`,\`subject\`) 	-- \u8BBE\u7F6E\u8054\u5408\u552F\u4E00
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT=&#39;XX\u8868&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>UNIQUE KEY</li></ul><h5 id="\u7D22\u5F15" tabindex="-1"><a class="header-anchor" href="#\u7D22\u5F15" aria-hidden="true">#</a> <strong>\u7D22\u5F15\uFF1A</strong></h5><p>\u7528\u6765 <strong>\u5FEB\u901F\u67E5\u627E</strong> \u51FA\u5728\u4E00\u4E2A\u5217\u4E0A <strong>\u7528\u4E00\u7279\u5B9A\u503C</strong> \u7684\u884C\uFF0C\u65E0\u7D22\u5F15\u5219\u4F1A\u987A\u5E8F\u904D\u5386\uFF08<em>\u8868\u8D8A\u957F\u8D8A\u8017\u65F6</em> \uFF09</p><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><p>\u6240\u6709\u7684 <strong>MySQL \u7D22\u5F15</strong> \uFF08<em><strong>PRIMARY</strong>\u3001<strong>UNIQUE</strong> \u548C <strong>INDEX</strong></em> \uFF09\u662F\u5728 <strong>B\u6811</strong> \u4E2D\u5B58\u50A8</p></div><pre><code>    \u5916\u952E\uFF0Cforeign key\u4E00\u4E2A\u7279\u6B8A\u7684\u7D22\u5F15\uFF0C\u53EA\u80FD\u662F\u6307\u5B9A\u5185\u5BB9\uFF08\u4E00\u822C\u5BF9\u4E24\u4E2A\u8868\u6709\u5173\u7CFB\u7684\u5217\u8FDB\u884C\u7EA6\u675F\uFF0C\u4E00\u4E2A\u8868\u7684\u5916\u952E\u901A\u5E38\u662F\u53E6\u4E00\u8868\u7684\u4E3B\u952E\uFF09
        constraint fk_cc foreign key (color_id) references color(nid) \uFF08constraint\u540E\u9762\u63A5\u7684\u662F \u5916\u952E\u7684\u6807\u7B7E\uFF09

    \u4F8B\uFF1A\u5EFA\u8868\u65F6\u521B\u5EFA\u8054\u5408\u552F\u4E00\uFF1A
        CREATE TABLE \`textbook_edition\` (
          \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT &#39; \u9ED8\u8BA4 id&#39;,
          \u5217\u540D \u7C7B\u578B unsigned NOT NULL DEFAULT &#39;1&#39; COMMENT &#39;XX&#39;,
          PRIMARY KEY (\`id\`), -- \u8BBE\u7F6E\u4E3B\u952E
          UNIQUE KEY \`idx_grade_subject\` (\`grade_type\`,\`subject\`) -- \u8BBE\u7F6E\u8054\u5408\u552F\u4E00
        ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT=&#39;XX\u8868&#39;;

    \u4FEE\u6539\u8868\u540D\uFF1A
        ALTER TABLE \u8868\u540D RENAME [TO|AS] \u65B0\u8868\u540D

2.\u4FEE\u6539\u8868\uFF1A
    \u6DFB\u52A0\u5217\uFF1Aalter table \u8868\u540D add \u5217\u540D \u7C7B\u578B
    \u5220\u9664\u5217\uFF1Aalter table \u8868\u540D drop column \u5217\u540D
    \u4FEE\u6539\u5217\uFF1A
            alter table \u8868\u540D modify column \u5217\u540D \u7C7B\u578B;  -- \u7C7B\u578B
            alter table \u8868\u540D change \u539F\u5217\u540D \u65B0\u5217\u540D \u7C7B\u578B; -- \u5217\u540D\uFF0C\u7C7B\u578B

    \u6DFB\u52A0\u4E3B\u952E\uFF1A
            alter table \u8868\u540D add primary key(\u5217\u540D);
    \u5220\u9664\u4E3B\u952E\uFF1A
            alter table \u8868\u540D drop primary key;
            alter table \u8868\u540D  modify  \u5217\u540D int, drop primary key;

    \u6DFB\u52A0\u5916\u952E\uFF1Aalter table \u4E3B\u8868 add constraint \u5916\u952E\u540D\u79F0\uFF08\u5F62\u5982\uFF1AFK_\u4E3B\u8868_\u4ECE\u8868\uFF09 foreign key \u4E3B\u8868(\u5916\u952E\u5B57\u6BB5) references \u4ECE\u8868(\u4E3B\u952E\u5B57\u6BB5);
    \u5220\u9664\u5916\u952E\uFF1Aalter table \u8868\u540D drop foreign key \u5916\u952E\u540D\u79F0
    \uFF08\u6DFB\u52A0\u5916\u952E\u4E4B\u540E\u4E24\u5F20\u8868\u4FBF\u6709\u4E86\u7EA6\u675F\uFF0C\u591A\u4E3A\u4E00\u5BF9\u591A\u5173\u7CFB\uFF09
    \u8FD9\u4E5F\u662F\u4E3A\u4E86\u6EE1\u8DB3\u7B2C\u4E09\u8303\u5F0F\uFF0C\u5E76\u4E14\u9632\u6B62\u810F\u6570\u636E\u7684\u4EA7\u751F\uFF0C\u4F46\u4EBA\u4E3A\u7684\u8BDD\u82E5\u4F9D\u51FA\u9519\uFF0C\u5E72\u8106\u52A0\u4E2A\u5916\u952E\u7EA6\u675F\uFF0C\u5219\u6BCF\u6B21\u63D2\u5165\u5C31\u4E0D\u7528\u62C5\u5FC3

    \u6DFB\u52A0\u8054\u5408\u552F\u4E00\uFF1AALTER TABLE \u8868\u540D ADD UNIQUE INDEX(\u5217\u540D1,\u5217\u540D2...);
    \u5220\u9664\u7D22\u5F15\uFF1AALTER TABLE \`table_name\` DROP INDEX \`column\`;

    \u4FEE\u6539\u9ED8\u8BA4\u503C\uFF1AALTER TABLE testalter_tbl ALTER i SET DEFAULT 1000;
    \u5220\u9664\u9ED8\u8BA4\u503C\uFF1AALTER TABLE testalter_tbl ALTER i DROP DEFAULT;

3.\u67E5\u770B\u8868\u7ED3\u6784
    desc \u8868\u540D;  \u67E5\u770B\u67D0\u4E2A\u8868\u7684\u5B8C\u6574\u7684\u8868\u7ED3\u6784
</code></pre><h2 id="\u4E09\u3001\u6570\u636E\u7C7B\u578B-\u6570\u503C\u3001\u65F6\u95F4\u3001\u5B57\u7B26\u4E32" tabindex="-1"><a class="header-anchor" href="#\u4E09\u3001\u6570\u636E\u7C7B\u578B-\u6570\u503C\u3001\u65F6\u95F4\u3001\u5B57\u7B26\u4E32" aria-hidden="true">#</a> \u4E09\u3001\u6570\u636E\u7C7B\u578B\uFF1A\uFF08\u6570\u503C\u3001\u65F6\u95F4\u3001\u5B57\u7B26\u4E32\uFF09</h2><pre><code>    [M]:\u8868\u793A\u603B\u957F\u5EA6\uFF08\u4F8B\u5982\uFF1A\u4E8C\u8FDB\u5236\u4F4D\u6709\u591A\u957F\uFF09\u8D85\u51FA\u957F\u5EA6\u5C31\u62A5\u9519
    [D]:\u8868\u793A\u5C0F\u6570\u4F4D\u603B\u957F\u5EA6\uFF08\u5982decimal\u7684m\u4E3A50\uFF0Cd\u4E3A30\uFF09
    char\uFF1A\u5B9A\u957F\u67E5\u627E\u901F\u5EA6\u5FEB\uFF0C\u4F46\u6D6A\u8D39\u7A7A\u95F4
    \u4E8C\u8FDB\u5236\u6570\u636E\uFF1A
        TinyBlob\u3001Blob\u3001MediumBlob\u3001LongBlob\uFF08\u4E13\u95E8\u5B58\u4E8C\u8FDB\u5236\u6570\u636E\u7684\uFF0C\u6BD4\u5982\u56FE\u7247\u3001\u89C6\u9891\uFF0C\u82E5\u975E\u8981\u4FDD\u5B58\u5728\u6570\u636E\u5E93\u4E2D\uFF0C\u7528read rb\u4EE5\u4E8C\u8FDB\u5236\u65B9\u5F0F\u8BFB\u53D6\u5B83\uFF09
        \u4F46\u4E00\u822C\u6CA1\u4EBA\u8FD9\u4E48\u5E72\uFF0C\u901A\u5E38\u4E0A\u4F20\u56FE\u7247\u3001\u89C6\u9891\uFF0C\u90FD\u662F\u628A\u4E0A\u4F20\u7684\u4E1C\u897F\u4EE5\u6587\u4EF6\u7684\u5F62\u5F0F\u4FDD\u5B58\u5230\u672C\u5730\u76EE\u5F55\uFF08\u786C\u76D8\u4E2D\uFF09\uFF0C\u800C\u6570\u636E\u5E93\u4E2D\u53EA\u4FDD\u5B58\u4E00\u4E2A\u8DEF\u5F84\u3002
        \u56E0\u6B64\u4E00\u822C\u7528varchar(65)\u8FD9\u79CD\u65B9\u5F0F\uFF0C\u628A\u6587\u4EF6\u5B58\u5728\u67D0\u4E2A\u786C\u76D8\uFF08D:\\1.avi\uFF09\u56E0\u6B64\u4EE5\u540E\u8981\u7684\u8BDD\u5C31\u901A\u8FC7\u6570\u636E\u5E93\u628A\u6587\u4EF6\u8DEF\u5F84\u62FF\u8D70\u518Dopen\u6253\u5F00\u5373\u53EF\u3002

    enum:\uFF08\u679A\u4E3E\uFF09
        \u82E5\u60F3\u77E5\u9053\u661F\u671F\u51E0\uFF0C\u5148\u53EF\u4EE5\u5EFA\u7ACB\u4E00\u4E2A\u5BF9\u5E94\u5173\u7CFB\uFF1A\u6BD4\u5982x\u5BF9\u5E94\u661F\u671F\u4E00\uFF0Cy\u5BF9\u5E94\u661F\u671F\u4E8C\u3002\u3002\u3002\uFF08\u7C7B\u4F3C\u5B57\u5178\uFF09
        Enum week:
            x = &quot;\u661F\u671F\u4E00&quot;
            y = &quot;\u661F\u671F\u4E8C&quot;
            z = &quot;\u661F\u671F\u4E09&quot;
        print week.x \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u56E0\u6B64\u4EE5\u540E\u60F3\u5F15\u7528\u76F4\u63A5\u901A\u8FC7\u8FD9\u79CD\u65B9\u5F0F
        \u5728\u4F8B\u5982FTP\u4E2D\u7684\u5BF9\u5E94\u6570\u5B571003\uFF1A\u672A\u6388\u6743\u4E4B\u7C7B\u7684 \u2014\u2014\u2014\u2014unauth = 2003
        \u793A\u4F8B\uFF1A
            CREATE TABLE shirts (
                name VARCHAR(40),
                size ENUM(&#39;x-small&#39;, &#39;small&#39;, &#39;medium&#39;, &#39;large&#39;, &#39;x-large&#39;)
            );\uFF08\u8868\u793A\u4EE5\u540E\u63D2\u5165\u6570\u636E\u53EA\u80FD\u662F\u679A\u4E3E\u4E2D\u7684\u67D0\u4E00\u4E2A\uFF0C\u4E0D\u7136\u62A5\u9519\uFF09
            INSERT INTO shirts (name, size) VALUES (&#39;dress shirt&#39;,&#39;large&#39;), (&#39;t-shirt&#39;,&#39;medium&#39;),(&#39;polo shirt&#39;,&#39;small&#39;);

    set:\uFF08\u96C6\u5408\uFF09
        \u793A\u4F8B\uFF1A
            CREATE TABLE myset (col SET(&#39;a&#39;, &#39;b&#39;, &#39;c&#39;, &#39;d&#39;));\uFF08\u4E0E\u679A\u4E3E\u4E0D\u540C\u7684\u662F\uFF0Cset\u53EF\u4EE5\u63D2\u5165\u591A\u4E2A\u96C6\u5408\u5185\u7684\u6570\u636E\uFF09
            INSERT INTO myset (col) VALUES (&#39;a,d&#39;), (&#39;d,a&#39;), (&#39;a,d,a&#39;), (&#39;a,d,d&#39;), (&#39;d,a,d&#39;);


    \u5176\u4ED6\u8BE6\u7EC6\u53C2\u8003\u535A\u5BA2
</code></pre><h2 id="\u56DB\u3001\u6570\u636E\u8868\u5185\u5BB9\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#\u56DB\u3001\u6570\u636E\u8868\u5185\u5BB9\u64CD\u4F5C" aria-hidden="true">#</a> \u56DB\u3001\u6570\u636E\u8868\u5185\u5BB9\u64CD\u4F5C</h2><pre><code>1\u3001\u589E\uFF1A
    insert into \u8868 (\u5217\u540D,\u5217\u540D...) values (\u503C,\u503C,\u503C...)
    insert into \u8868 (\u5217\u540D,\u5217\u540D...) values (\u503C,\u503C,\u503C...),(\u503C,\u503C,\u503C...)\uFF08\u63D2\u5165\u591A\u6761\u6570\u636E\uFF09
    insert into \u76EE\u6807\u8868 (\u5217\u540D,\u5217\u540D...) select \u5217\u540D,\u5217\u540D... from \u53E6\u4E00\u5F20\u8868 \uFF08\u628A\u53E6\u5916\u4E00\u5F20\u8868\u7684\u6570\u636E\uFF08\u53EF\u9009\u5217\uFF09\u5168\u90E8\u5BFC\u5165\u76EE\u6807\u8868\u91CC\uFF09
        \u82E5\u4E24\u8868\u4E2D\u7684\u6570\u636E\u7C7B\u578B\u4E0D\u540C\uFF08\u80FD\u591F\u7C7B\u578B\u8F6C\u6362\u7684\uFF09\u5219\u4F1A\u8F6C\u6362\uFF0C\u4E0D\u7136\u62A5\u9519 \u5F53\u7136\u540E\u9762\u8FD8\u53EF\u4EE5\u63A5where nid&gt;2 and..\u4E4B\u7C7B\u7684

2\u3001\u5220\uFF1A
    delete from \u8868
    delete from \u8868 where id\uFF1D1 and name\uFF1D&#39;alex&#39;

3\u3001\u6539\uFF1A
    update \u8868 set name \uFF1D &#39;igarashi&#39; where id&gt;1 and 1=1 ...
    UPDATE \u8868 set \`init_service_num\` = \`service_num\`;    --\u4EE4\u8868\u4E2D\u7684\u4E00\u5217\u7B49\u4E8E\u8868\u4E2D\u7684\u53E6\u4E00\u5217

4\u3001\u67E5\uFF1A
    select * from \u8868
    select * from \u8868 where id &gt; 1
    select nid,name,gender as gg from \u8868 where id &gt; 1
    \u6CE8\uFF1A\u5C3D\u91CF\u4E0D\u8981\u7528select *\uFF0C\u56E0\u4E3Aselect *\u7684\u6548\u7387\u4F4E\uFF0C\u6700\u597D\u662F\u628A\u8981\u67E5\u627E\u7684\u6570\u636E\u90FD\u5199\u4E00\u904D\u3002

5\u3001\u5176\u4ED6\uFF1A\uFF08\u5FC5\u987B\u719F\uFF09
    a\u3001\u6761\u4EF6\uFF1A
        select * from \u8868 where id &gt; 1 and name != &#39;alex&#39; and num = 12;

        select * from \u8868 where id between 5 and 16;

        select * from \u8868 where id in (11,22,33)
        select * from \u8868 where id not in (11,22,33)
        select * from \u8868 where id in (select nid from \u8868)

    b\u3001\u901A\u914D\u7B26\uFF1A
        select * from \u8868 where name like &#39;ale%&#39;  - ale\u5F00\u5934\u7684\u6240\u6709\uFF08\u591A\u4E2A\u5B57\u7B26\u4E32\uFF09
        select * from \u8868 where name like &#39;ale_&#39;  - ale\u5F00\u5934\u7684\u6240\u6709\uFF08\u4E00\u4E2A\u5B57\u7B26\uFF09

    c\u3001\u9650\u5236\uFF1A\u5206\u9875\uFF08\u6BD4\u5982\u6253\u5370\u591A\u5C11\u4E2A\u6570\u636E\uFF09
        select * from \u8868 limit 5;            - \u524D5\u884C
        select * from \u8868 limit 4,5;          - \u4ECE\u7B2C4\u884C\u4E4B\u540E\u76845\u884C
        select * from \u8868 limit 5 offset 4    - \u4ECE\u7B2C4\u884C\u4E4B\u540E\u76845\u884C\u2014\u2014\u2014\u2014\u63A8\u8350\u4F7F\u7528\uFF08\u4E0E\u4E0A\u5199\u6CD5\u76F8\u53CD\uFF0C\u4F46\u529F\u80FD\u4E00\u6837\uFF09

    d\u3001\u6392\u5E8F\uFF1A
        select * from \u8868 order by \u5217 asc              - \u6839\u636E \u201C\u5217\u201D \u4ECE\u5C0F\u5230\u5927\u6392\u5217\uFF08a,b,c,d\u4ECE\u5C0F\u5230\u5927\uFF09
        select * from \u8868 order by \u5217 desc             - \u6839\u636E \u201C\u5217\u201D \u4ECE\u5927\u5230\u5C0F\u6392\u5217\uFF08d,c,b,a\u4ECE\u5927\u5230\u5C0F\uFF09
        select * from \u8868 order by \u52171 desc,\u52172 asc    - \u6839\u636E \u201C\u52171\u201D \u4ECE\u5927\u5230\u5C0F\u6392\u5217\uFF0C\u5982\u679C\u76F8\u540C\u5219\u6309\u52172\u4ECE\u5C0F\u5230\u5927\u6392\u5E8F
            \uFF08\u524D\u4E00\u6B21\u6392\u5E8F\u51FA\u73B0\u5217\u76F8\u540C\u5219\u6309\u7B2C\u4E8C\u6B21\u987A\u5E8F\u518D\u6392\uFF09

    e\u3001\u5206\u7EC4\uFF1A\uFF08\u91CD\u70B9\uFF0C\u60F3\u8BA9\u6570\u636E\u6839\u636E\u67D0\u5217\u8FDB\u884C\u5206\u7EC4\uFF09
        select num from \u8868 group by num\uFF08\u901A\u8FC7\u5206\u7EC4\u6765\u6309\u7EC4\u53D6\u51FAnum\uFF0C\u628A\u91CD\u590D\u7684\u6570\u636E\u6574\u5408\uFF09
        select num,nid from \u8868 group by num,nid\uFF08\u5927\u81F4\u540C\u4E0A\uFF09
        select num,nid from \u8868  where nid &gt; 10 group by num,nid order by nid desc
        select num,nid,count(*),sum(score),max(score),min(score) from \u8868 group by num,nid\uFF08\u5229\u7528\u805A\u5408\u51FD\u6570\u8FDB\u884C\u5206\u7EC4\u53D6\u503C\uFF09
        max\uFF1A\u8868\u793A\u53D6\u6700\u5927\u503C
        min\uFF1A\u6700\u5C0F\u503C
        sum\uFF1A\u53D6\u548C\uFF0C\u6BD4\u5982\u518D\u53D6\u6210\u7EE9\u4E4B\u548C\u65F6
        count\uFF1A\u8BA1\u6570\uFF0C\u8BA1\u7B97\u51FA\u73B0\u7684\u6B21\u6570
        avg\uFF1A\u5E73\u5747\u6570
        \uFF08\u6CE8\u610F\u8FD9\u4E9B\u805A\u5408\u51FD\u6570\u662F\u5728\u67E5\u8BE2\u5217\u65F6\u8FD0\u7528\u7684\uFF09

        \u5F53\u5199select count(nid),part from userinfo where count(nid)&gt;2 group by part;\u4F1A\u62A5\u9519\uFF0C\u8FD9\u662F\u56E0\u4E3Agroup by\u662F\u540E\u6267\u884C\u3002\u6B64\u65F6part\u8FD8
        \u5C1A\u672A\u5206\u7EC4\uFF0C\u56E0\u6B64count\uFF08nid\uFF09\u65E0\u6CD5\u83B7\u53D6\u3002\u6240\u4EE5\u5982\u4E0B\uFF1A\uFF08\u82E5\u60F3\u5BF9\u805A\u5408\u540E\u7684\u5217\u8FDB\u884C\u64CD\u4F5C\uFF09

        select num from \u8868 group by num having max(id) &gt; 10\uFF08\u5728\u6839\u636E\u805A\u5408\u51FD\u6570\u7684\u7ED3\u679C\u8FDB\u884C\u7B5B\u9009\u65F6\uFF0Cwhere\u6761\u4EF6\u65E0\u6CD5\u4F7F\u7528\uFF0C\u56E0\u6B64\u7528having\uFF09

        \u7279\u522B\u7684\uFF1Agroup by \u5FC5\u987B\u5728where\u4E4B\u540E\uFF0Corder by\u4E4B\u524D

    f\u3001\u8FDE\u8868\uFF1A\uFF08\u975E\u5E38\u91CD\u8981\uFF0C\u67E5\u627E\u4E24\u8868\u6709\u5BF9\u5E94\u5173\u7CFB[\u4F8B\u5982\uFF1A\u5916\u952E]\u6570\u636E\u5219\u53EF\u4EE5\u8FDB\u884C\u8FDE\u8868\uFF09
        1.\u65E0\u5BF9\u5E94\u5173\u7CFB\u5219\u4E0D\u663E\u793A\uFF1A(\u6761\u4EF6\u8FDE\u8868\u4E00)
        select A.num, A.name, B.name
        from A,B
        \u7528\u8FD9\u79CD\u65B9\u5F0F\u53BB\u666E\u901A\u67E5\u8BE2\u4E24\u8868\u6570\u636E\uFF0C\u4F1A\u663E\u793A\u4E3A\u7B1B\u5361\u5C14\u79EF\uFF0C\u5355\u7EAF\u7684\u5427\u4E24\u8868\u7684\u6570\u636E\u8FDB\u884C\u76F8\u4E58\uFF0C\u5927\u91CF\u5783\u573E\u6570\u636E\u51FA\u73B0\u3002
        #Where A.nid = B.nid\uFF08\u52A0\u4E0A\u5BF9\u5E94\u5173\u7CFB\u5219\u4F1A\u6B63\u5E38\u663E\u793A\uFF09

        2.\u65E0\u5BF9\u5E94\u5173\u7CFB\u5219\u4E0D\u663E\u793A:(\u6761\u4EF6\u8FDE\u8868\u4E8C)\u2014\u2014\u2014\u2014\u4E0E\u4E0A\u52A0\u6761\u4EF6\u76F8\u540C\u53EA\u662F\u5199\u6CD5\u4E0D\u4E00\u6837
        select A.num, A.name, B.name
        from A inner join B\uFF08inner\uFF1A\u8868\u793A\u4E92\u76F8\u8FC1\u5C31\uFF0C\u5BF9left\u7684\u6570\u636E\u8FDB\u884C\u8FC7\u6EE4\uFF0C\u6709\u4E3Anull\u7684\u6570\u636E\u8FDB\u884C\u6E05\u7A7A\uFF0C\u6C38\u8FDC\u4E0D\u4F1A\u51FA\u73B0null\uFF09
        on A.nid = B.nid\uFF08\u8FD9\u91CC\u6761\u4EF6\u7528on\uFF0C\u7C7B\u4F3Cwhere\uFF09

        3.A\u8868\u6240\u6709\u663E\u793A\uFF0C\u5982\u679CB\u4E2D\u65E0\u5BF9\u5E94\u5173\u7CFB\uFF0C\u5219\u503C\u4E3Anull\uFF1A\uFF08\u7528join\u8FDB\u884C\u8FDE\u8868\u64CD\u4F5C\uFF0C\u53EF\u4EE5left join\u3001right join\uFF09
        select A.num, A.name, B.name
        from A left join B
        on A.nid = B.nid\uFF08A\u8868\u6709\u7684\u6570\u636EB\u8868\u6CA1\u6709\u5BF9\u5E94\u6570\u636E\u5219\u663E\u793ANULL\uFF09

        4.B\u8868\u6240\u6709\u663E\u793A\uFF0C\u5982\u679CB\u4E2D\u65E0\u5BF9\u5E94\u5173\u7CFB\uFF0C\u5219\u503C\u4E3Anull\uFF1A\uFF08\u4EE5\u540E\u7528\u8FDE\u8868\u64CD\u4F5C\u4F18\u5148\u7528left outer join,\u56E0\u4E3A\u6548\u7387\u9AD8\uFF09
        select A.num, A.name, B.name
        from A right join B
        on A.nid = B.nid

    g\u3001\u7EC4\u5408\uFF1A\uFF08\u60F3\u8BA9\u591A\u4E2A\u8868\u7684\u67D0\u5217\u6570\u636E\u8FDB\u884C\u7EC4\u5408\uFF09
        \u7EC4\u5408\uFF0C\u81EA\u52A8\u5904\u7406\u91CD\u5408
        select nickname
        from A
        union
        select name
        from B

        \u7EC4\u5408\uFF0C\u4E0D\u5904\u7406\u91CD\u5408
        select nickname
        from A
        union all\uFF08\u52A0all\u5219\u67E5\u627E\u4E24\u8868\u7684\u5168\u90E8\u6570\u636E\uFF09
        select name
        from B
</code></pre>`,37);function T(N,x){const a=m("Tabs");return o(),c("div",null,[b,d(" more "),g,u(a,{data:[{title:"CentOS"},{title:"Window"}]},{tab0:e(({title:l,value:t,isActive:i})=>[k]),tab1:e(({title:l,value:t,isActive:i})=>[h,y,f,E,q,A]),_:1}),_])}const I=r(v,[["render",T],["__file","MySQL.html.vue"]]);export{I as default};
