import{_ as r}from"./plugin-vueexport-helper.2444895f.js";import{o,c,e as u,d,w as s,a as n,b as e,f as m,r as p}from"./app.f40088b9.js";const b={},v=n("p",null,[n("strong",null,"MySQL"),e("\uFF0C\u70C2\u5927\u8857\u7684\u5173\u7CFB\u578B\u6570\u636E\u5E93\uFF0C\u4F46\u6211\u4F9D\u7136\u6CA1\u6709\u5B66\u597D")],-1),h=n("h2",{id:"_1-\u5B89\u88C5",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-\u5B89\u88C5","aria-hidden":"true"},"#"),e(" 1. \u5B89\u88C5")],-1),k=n("div",{class:"language-bash ext-sh line-numbers-mode"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token comment"},"# \u5B89\u88C5"),e(`
yum `),n("span",{class:"token function"},"install"),e(" mysql-server "),n("span",{class:"token parameter variable"},"-y"),e(`

`),n("span",{class:"token comment"},"# \u542F\u52A8"),e(`
systemctl start mysqld

`),n("span",{class:"token comment"},"# \u8FDE\u63A5 mysql -h host -u user -p password"),e(`
mysql `),n("span",{class:"token parameter variable"},"-h"),e(),n("span",{class:"token number"},"127.0"),e(".0.1 "),n("span",{class:"token parameter variable"},"-u"),e(" root "),n("span",{class:"token parameter variable"},"-p"),e(`

`),n("span",{class:"token comment"},"# \u5E38\u89C1\u9519\u8BEF"),e(`
ERROR `),n("span",{class:"token number"},"2002"),e(),n("span",{class:"token punctuation"},"("),e("HY000"),n("span",{class:"token punctuation"},")"),e(": Can"),n("span",{class:"token string"},"'t connect to local MySQL server through socket '"),e("/tmp/mysql.sock' "),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"2"),n("span",{class:"token punctuation"},")"),e(`, it means that
the MySQL server daemon `),n("span",{class:"token punctuation"},"("),e("Unix"),n("span",{class:"token punctuation"},")"),e(" or "),n("span",{class:"token function"},"service"),e(),n("span",{class:"token punctuation"},"("),e("Windows"),n("span",{class:"token punctuation"},")"),e(` is not running.

`),n("span",{class:"token comment"},"# QUIT \u6216\u8005 Control + D"),e(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),f=n("ul",null,[n("li",null,[n("p",null,"\u5728 MYSQL \u6570\u636E\u5E93\u4E0B\u7684 bin \u76EE\u5F55\u91CC\u9762\u7684\u4FBF\u662F MYSQL \u7684\u53EF\u6267\u884C\u7A0B\u5E8F\u3002")]),n("li",null,[n("p",null,"\u5728 bin \u76EE\u5F55\u4E0B\u8FD0\u884C mysqld\uFF1A\u5F00\u542F mysql \u7684 socket\u3002\u56E0\u6B64\u591A\u79CD\u8BED\u8A00\uFF08\u4F8B\u5982:JAVA\u3001Python\u3001C#\u3001Ruby\u3001PHP \u7B49\u7B49\uFF09\u53EF\u4EE5\u5199\u5BF9\u5E94\u7684 socket \u8FDB\u884C\u6570\u636E\u5E93 \u7684\u8FDE\u63A5\u3002")]),n("li",null,[n("p",null,"\u56E0\u6B64\uFF1A\u6570\u636E\u5E93\u7684\u670D\u52A1\u5668\u7AEF\u8FD0\u884C\u8D77\u6765\u5C31\u662F\u4E00\u4E2A socket server\u3002\u4E4B\u540E\u5C31\u662F\u542F\u52A8\u5BA2\u6237\u7AEF\u53BB\u8FDE\u63A5\u670D\u52A1\u7AEF\u3002")]),n("li",null,[n("p",null,"\u8BA4\u8BC1\u8FDE\u63A5\u540E\u53D1\u9001\u547D\u4EE4\uFF0C\u6570\u636E\u5E93\u4FBF\u53EF\u6267\u884C\u5BF9\u5E94\u7684\u547D\u4EE4\u3002MySql \u4E5F\u63D0\u4F9B\u4E86\u81EA\u5DF1\u7684\u4E00\u4E2A\u8FDE\u63A5 socket\uFF0C\u5728 bin \u4E0B\u8FD0\u884C mysql \u4FBF\u53EF\u5F00\u542F\u3002")]),n("li",null,[n("p",null,"mysql -u root -p\uFF1Au \u8868\u793A\u7528\u6237\u540D\uFF0Cp \u8868\u793A\u51FA password\uFF0Croot \u521D\u59CB\u5316\u4E0D\u8BBE\u7F6E\u5BC6\u7801\uFF0C\u76F4\u63A5\u56DE\u8F66\u5373\u53EF\u3002")])],-1),y=n("h4",{id:"",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#","aria-hidden":"true"},"#")],-1),g=n("p",null,"\u4EFB\u52A1\u7BA1\u7406\u5668\u6709\u4E2A Windows \u670D\u52A1\u3002\u82E5\u628A mysqld \u641E\u6210\u4E00\u4E2A Windows \u670D\u52A1\uFF0C\u6BCF\u6B21\u542F\u52A8\u5219\u4F1A\u81EA\u52A8\u542F\u52A8",-1),A=n("ul",null,[n("li",null,[n("p",null,"\u5229\u7528 mysqld --install \u547D\u4EE4\u8FD0\u884C Install/Remove of the Service Denied!")]),n("li",null,[n("p",null,"\u4E4B\u540E\u5229\u7528 net start/stop mysql \u5373\u53EF\u542F\u52A8/\u5173\u95ED")])],-1),E=m(`<h2 id="_2-\u4F7F\u7528\u8BF4\u660E" tabindex="-1"><a class="header-anchor" href="#_2-\u4F7F\u7528\u8BF4\u660E" aria-hidden="true">#</a> 2. \u4F7F\u7528\u8BF4\u660E</h2><h5 id="\u9ED8\u8BA4\u6570\u636E\u5E93\u5982\u4E0B" tabindex="-1"><a class="header-anchor" href="#\u9ED8\u8BA4\u6570\u636E\u5E93\u5982\u4E0B" aria-hidden="true">#</a> <strong>\u9ED8\u8BA4\u6570\u636E\u5E93\u5982\u4E0B</strong></h5><ul><li><strong>mysql\uFF1A</strong> \u6237\u6743\u9650\u76F8\u5173\u6570\u636E</li><li><strong>test\uFF1A</strong> \u7528\u4E8E\u7528\u6237\u6D4B\u8BD5\u6570\u636E</li><li><strong>information_schema\uFF1A</strong> <strong>MySQL</strong> \u672C\u8EAB\u67B6\u6784\u76F8\u5173\u6570\u636E</li></ul><h5 id="\u6570\u636E\u5E93\u7B80\u5355\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#\u6570\u636E\u5E93\u7B80\u5355\u4F7F\u7528" aria-hidden="true">#</a> <strong>\u6570\u636E\u5E93\u7B80\u5355\u4F7F\u7528</strong></h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u67E5\u770B MySQL \u6709\u90A3\u4E9B\u6570\u636E\u5E93</span>
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
<span class="token variable"><span class="token variable">\`</span>\u5BF9\u4E8E\u81EA\u589E\u6765\u8BF4\uFF0C\u5373\u4F7F\u6E05\u7A7A\uFF0C\u4E5F\u4FDD\u7559\u4E86\u4E4B\u524D\u7684\u81EA\u589E\u53F7\uFF0C\u4ECE\u4E0B\u4E00\u81EA\u589E\u53F7\u5F00\u59CB<span class="token variable">\`</span></span>
delete from user

<span class="token comment"># \u6E05\u7A7A user \u8868\u5185\u5BB9</span>
<span class="token variable"><span class="token variable">\`</span>\u5BF9\u4E8E\u81EA\u589E\uFF0C\u4E5F\u5F7B\u5E95\u6E05\u7A7A\uFF0C\u4E0B\u6B21\u63D2\u5165\u6570\u636E\u4ECE <span class="token number">1</span> \u5F00\u59CB<span class="token variable">\`</span></span>
truncate table user<span class="token punctuation">;</span>            

<span class="token comment"># \u5220\u9664 user \u8868</span>
drop table user<span class="token punctuation">;</span>

<span class="token comment"># \u67E5\u8BE2\u6570\u636E\u5E93\u7684\u6700\u5927\u8FDE\u63A5\u6570</span>
show variables like <span class="token string">&#39;max_connections&#39;</span><span class="token punctuation">;</span>    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>\u7528\u6237&amp;\u6388\u6743\uFF1A
    MySql\u6570\u636E\u5E93\u4E0B\u6709\u4E00\u4E2A\u9ED8\u8BA4\u521B\u5EFA\u597D\u7684\u7528\u6237\u8868user
    \u53EF\u4EE5\u5229\u7528select * from user;\u67E5\u770Buser\u8868\u7684\u6240\u6709\u6570\u636E\uFF08\u4E71\u7801\uFF09\u3002\u7528desc user;\u67E5\u770Buser\u8868\u4E2D\u7684\u5404\u4E2A\u5B57\u6BB5\u3002
    \u5229\u7528select host,user from user;\u67E5\u770Buser\u8868\u4E2D\u7684host\u5B57\u6BB5\u6570\u636E\u548Cuser\u5B57\u6BB5\u6570\u636E\u3002
    \u6570\u636E\u5E93\u7684user\u867D\u7136\u53EF\u4EE5\u7528insert \u6765\u521B\u5EFA\u7528\u6237\uFF0C\u4F46\u662F\u4E0D\u63A8\u8350\u3002\u7528\u6237\u7BA1\u7406\u6709\u4E00\u4E9B\u7279\u6B8A\u7684\u547D\u4EE4\u3002

    \u7528\u6237\u7BA1\u7406\uFF1A
        \u521B\u5EFA\u7528\u6237
            create user &#39;\u7528\u6237\u540D&#39;@&#39;IP\u5730\u5740&#39; identified by &#39;\u5BC6\u7801&#39;;    \u5982\uFF08create user &quot;igarashi&quot;@&quot;localhost&quot; identified by &quot;123&quot;\uFF09\u4E0B\u7565
        \u5220\u9664\u7528\u6237
            drop user &#39;\u7528\u6237\u540D&#39;@&#39;IP\u5730\u5740&#39;;
        \u4FEE\u6539\u7528\u6237
            rename user &#39;\u7528\u6237\u540D&#39;@&#39;IP\u5730\u5740&#39;; to &#39;\u65B0\u7528\u6237\u540D&#39;@&#39;IP\u5730\u5740&#39;;;
        \u4FEE\u6539\u5BC6\u7801
            set password for &#39;\u7528\u6237\u540D&#39;@&#39;IP\u5730\u5740&#39; = Password(&#39;\u65B0\u5BC6\u7801&#39;)
        -h :\u767B\u5F55\u65F6\u8BBE\u7F6E\u8F93\u5165ip\u5730\u5740

    \u6743\u9650\u7BA1\u7406\uFF1A
        grant  \u6743\u9650 on \u6570\u636E\u5E93.\u8868 to  &#39;\u7528\u6237&#39;@&#39;IP\u5730\u5740&#39;      -- \u6388\u6743   \u5982grant select on test.tb1 to &quot;igarashi&quot;@&quot;localhost&quot;;
        \u82E5\u8FDC\u7A0B\u7BA1\u7406\u8FDE\u63A5\u53EA\u9700\u8981\uFF0C\u521B\u5EFA\u5BF9\u5E94ip\u5730\u5740\u7684\u7528\u6237\uFF0C\u5E76\u8FDB\u884C\u6388\u6743\uFF0C\u7528\u6237\u4FBF\u53EF\u4EE5\u5728\u8FDC\u7A0B\u8FDB\u884C\u8FDE\u63A5 fuuka@192.168.1.12 \u5373\u53EF\u5728\u5BF9\u5E94ip\u4E0B\u767B\u5F55

        MySql\u6709\u901A\u914D\u7B26\uFF1A
            \u7528\u6237\u540D@IP\u5730\u5740         \u7528\u6237\u53EA\u80FD\u5728\u8BE5IP\u4E0B\u624D\u80FD\u8BBF\u95EE
            \u7528\u6237\u540D@192.168.1.%   \u7528\u6237\u53EA\u80FD\u5728\u8BE5IP\u6BB5\u4E0B\u624D\u80FD\u8BBF\u95EE(\u901A\u914D\u7B26%\u8868\u793A\u4EFB\u610F)\uFF08\u6CE8\u610F\u521B\u5EFA\u7528\u6237\u65F6\u8BB0\u5F97\u52A0\u201C\u201D\u56E0\u4E3A%\u4E0D\u80FD\u7279\u6B8A\u5B58\u5728\uFF09
            \u7528\u6237\u540D@%             \u7528\u6237\u53EF\u4EE5\u518D\u4EFB\u610FIP\u4E0B\u8BBF\u95EE(\u9ED8\u8BA4IP\u5730\u5740\u4E3A%)
            \u6CE8\uFF1A\u8FDC\u7A0B\u5BA2\u6237\u7AEF\u8FDE\u63A5\u767B\u5F55\u65F6 mysql -u \u7528\u6237\u540D -h ip\u5730\u5740 -P 3306\uFF08\u9ED8\u8BA4\u7AEF\u53E3\uFF0C\u4E0D\u5199\u4E5F\u6709\uFF09 -p \u8F93\u5165\u5BC6\u7801

        \u67E5\u8BE2\u6743\u9650\uFF1A
            select * from mysql.user  \uFF08\u5373\u53EF\u770B\u5230\u6539\u6570\u636E\u5E93\u4E2D\u7684\u6240\u6709\u6743\u9650\u76F8\u5173\u4FE1\u606F\uFF09

    \u76F8\u5173\u6743\u9650\uFF1A
        \u53C2\u8003\u535A\u5BA2

    \u7279\u6B8A\u7684\uFF1A
        flush privileges\uFF0C\u5C06\u6570\u636E\u8BFB\u53D6\u5230\u5185\u5B58\u4E2D\uFF0C\u4ECE\u800C\u7ACB\u5373\u751F\u6548\u3002\uFF08\u5237\u65B0\u6743\u9650\uFF09

    \u5FD8\u8BB0\u5BC6\u7801\uFF1A
        # \u542F\u52A8\u514D\u6388\u6743\u670D\u52A1\u7AEF
            mysqld --skip-grant-tables

        # \u5BA2\u6237\u7AEF
            mysql -u root -p

        # \u4FEE\u6539\u7528\u6237\u540D\u5BC6\u7801
            update mysql.user set authentication_string=password(&#39;666&#39;) where user=&#39;root&#39;;
            flush privileges;
</code></pre><h2 id="\u4E8C\u3001\u6570\u636E\u8868\u57FA\u672C\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#\u4E8C\u3001\u6570\u636E\u8868\u57FA\u672C\u64CD\u4F5C" aria-hidden="true">#</a> \u4E8C\u3001\u6570\u636E\u8868\u57FA\u672C\u64CD\u4F5C\uFF1A</h2><pre><code>1\u3001\u521B\u5EFA\u8868\uFF1A
    create table \u8868\u540D(
        \u5217\u540D  \u7C7B\u578B  \u662F\u5426\u53EF\u4EE5\u4E3A\u7A7A\uFF0C
        \u5217\u540D  \u7C7B\u578B  \u662F\u5426\u53EF\u4EE5\u4E3A\u7A7A
    )ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8

    ENGINE\uFF1A\u662F\u7528InnoDB \u8FD8\u662F MyISAM\uFF1A
    MyISAM\uFF1A\u652F\u6301\u5168\u6587\u7D22\u5F15\uFF0C\u5373\u901F\u5EA6\u975E\u5E38\u5FEB\u3002
    InnoDB\uFF1AInnoDB\u867D\u7136\u6162\u4E00\u70B9\uFF0C\u4F46\u662F\u5B83\u652F\u6301\u4E8B\u52A1\u3002
    \u4EC0\u4E48\u662F\u4E8B\u52A1\u3001\u539F\u5B50\u64CD\u4F5C\uFF1A\u539F\u5B50\u64CD\u4F5C\u5373\u4E0D\u80FD\u5206\u5272\u7684\u64CD\u4F5C\u3002\u4F8B\u5982\u8F6C\u8D26\uFF08\u51CF\u94B1\u3001\u52A0\u94B1\u4E24\u4E2A\u52A8\u4F5C\uFF09\uFF0C\u4E0D\u80FD\u8BA9\u5B83\u8F6C\u4E00\u534A\u65AD\u7535\u6570\u636E\u4E22\u5931\uFF0C\u56E0\u6B64\u628A\u5B83\u4F5C\u4E3A\u539F\u5B50\u64CD\u4F5C\uFF0C
        \u65AD\u7535\u5C31\u56DE\u9000\u539F\u6765\u72B6\u6001\u3002\u628A\u4E24\u4E2A\u52A8\u4F5C\u53E0\u52A0\u5728\u4E00\u8D77\uFF0C\u79F0\u4E4B\u4E3A\u4E00\u4E2A\u4E8B\u52A1\uFF0C\u5E76\u4E14\u8BA4\u4E3A\u662F\u539F\u5B50\u6027\u64CD\u4F5C\u3002\u56DE\u6EDA\u3002

    \u662F\u5426\u53EF\u7A7A\uFF0Cnull\u8868\u793A\u7A7A\uFF0C\u975E\u5B57\u7B26\u4E32
        not null    - \u4E0D\u53EF\u7A7A
        null        - \u53EF\u7A7A

    \u9ED8\u8BA4\u503C\uFF0C\u521B\u5EFA\u5217\u65F6\u53EF\u4EE5\u6307\u5B9A\u9ED8\u8BA4\u503C\uFF0C\u5F53\u63D2\u5165\u6570\u636E\u65F6\u5982\u679C\u672A\u4E3B\u52A8\u8BBE\u7F6E\uFF0C\u5219\u81EA\u52A8\u6DFB\u52A0\u9ED8\u8BA4\u503C
        create table tb1(
            nid int not null defalut 2,
            num int not null
        )

    \u81EA\u589E\uFF0C\u5982\u679C\u4E3A\u67D0\u5217\u8BBE\u7F6E\u81EA\u589E\u5217\uFF0C\u63D2\u5165\u6570\u636E\u65F6\u65E0\u9700\u8BBE\u7F6E\u6B64\u5217\uFF0C\u9ED8\u8BA4\u5C06\u81EA\u589E\uFF08\u8868\u4E2D\u53EA\u80FD\u6709\u4E00\u4E2A\u81EA\u589E\u5217\uFF09
        create table tb1(
            nid int not null auto_increment primary key,
            num int null
        )

    \u6CE8\u610F\uFF1A1\u3001\u5BF9\u4E8E\u81EA\u589E\u5217\uFF0C\u5FC5\u987B\u662F\u7D22\u5F15\uFF08\u542B\u4E3B\u952E\uFF09\u3002
          2\u3001\u5BF9\u4E8E\u81EA\u589E\u53EF\u4EE5\u8BBE\u7F6E\u6B65\u957F\u548C\u8D77\u59CB\u503C

    \u4FEE\u6539\u81EA\u589E\u5217\uFF1A\u5982\u4FEE\u6539users\u8868\u7684\u81EA\u589Eid\u4E3A123456
        alter table users AUTO_INCREMENT=123456;

    \u4E3B\u952E\uFF0Cprimary key\u4E00\u79CD\u7279\u6B8A\u7684\u552F\u4E00\u7D22\u5F15\uFF0C\u4E0D\u5141\u8BB8\u6709\u7A7A\u503C\uFF0C\u5982\u679C\u4E3B\u952E\u4F7F\u7528\u5355\u4E2A\u5217\uFF0C\u5219\u5B83\u7684\u503C\u5FC5\u987B\u552F\u4E00\uFF0C\u5982\u679C\u662F\u591A\u5217\uFF0C\u5219\u5176\u7EC4\u5408\u5FC5\u987B\u552F\u4E00\u3002
        nid int not null auto_increment primary key    \u6216   primary key(nid,num)

    \u5916\u952E\uFF0Cforeign key\u4E00\u4E2A\u7279\u6B8A\u7684\u7D22\u5F15\uFF0C\u53EA\u80FD\u662F\u6307\u5B9A\u5185\u5BB9\uFF08\u4E00\u822C\u5BF9\u4E24\u4E2A\u8868\u6709\u5173\u7CFB\u7684\u5217\u8FDB\u884C\u7EA6\u675F\uFF0C\u4E00\u4E2A\u8868\u7684\u5916\u952E\u901A\u5E38\u662F\u53E6\u4E00\u8868\u7684\u4E3B\u952E\uFF09
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
</code></pre>`,12);function _(T,q){const a=p("Tabs");return o(),c("div",null,[v,u(" more "),h,d(a,{data:[{title:"CentOS"},{title:"Window"}]},{tab0:s(({title:t,value:l,isActive:i})=>[k]),tab1:s(({title:t,value:l,isActive:i})=>[f,y,g,A]),_:1}),E])}const L=r(b,[["render",_],["__file","MySQL.html.vue"]]);export{L as default};
