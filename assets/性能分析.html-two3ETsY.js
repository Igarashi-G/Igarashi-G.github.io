import{_ as t}from"./plugin-vueexport-helper-DlAUqK2U.js";import{c as n,d as r,o as i}from"./app-C_J498dg.js";const a={};function s(d,e){return i(),n("div",null,e[0]||(e[0]=[r(`<h1 id="redis-性能分析-一文揭秘单线程的-redis-为什么这么快" tabindex="-1"><a class="header-anchor" href="#redis-性能分析-一文揭秘单线程的-redis-为什么这么快"><span>Redis 性能分析：（一文揭秘单线程的 Redis 为什么这么快）</span></a></h1><p>一、Redis 为啥快 1.纯内存操作 2.单线程 3.高效的数据结构 4.合理的数据编码 5.其他方面的优化</p><pre><code>在 Redis 中，常用的 5 种数据结构和应用场景如下：
    - String：缓存、计数器、分布式锁等。
    - List：链表、队列、微博关注人时间轴列表等。
    - Hash：用户信息、Hash 表等。
    - Set：去重、赞、踩、共同好友等。
    - Zset：访问量排行榜、点击量排行榜等。
</code></pre><p>二、SDS:<br> Redis 是 C 语言开发的，但在 Redis 的 String 结构中，并没有使用 C 语言中的字符，而是用一种称为 SDS（Simple Dynamic String）的结构体来<br> 保存字符串。<br> struct sdshdr {<br> int len; //用于记录 buf 中已使用空间的长度。<br> int free; //buf 中空闲空间的长度。<br> char buf[]; //存储实际内容。<br> }</p><pre><code>执行命令 set key value，key 和 value 都是一个 SDS 类型的结构存储在内存中。

优点：
    1.速度：
        C 字符串本身不记录长度信息，每次获取长度信息都需要遍历整个字符串，复杂度为 O(n)；
        SDS 中 len 字段保存着字符串的长度，所以总能在常数时间内获取字符串长度，复杂度是 O(1)。

    2.避免缓冲区溢出：
        若字符串进行扩容，没有进行相应的内存分配，就可能出现字符串被覆盖或修改等问题发生。
        但 SDS 的 API 对 zfc 修改时首先会检查空间是否足够，若不充足则会分配新空间，避免了缓冲区溢出问题。

    3.减少字符串修改时带来的内存重新分配的次数：
        在 C 中，当我们频繁的对一个字符串进行修改（append 或 trim）操作的时候，需要频繁的进行内存重新分配的操作，十分影响性能。
        当 SDS 的 API 对一个 SDS 修改后，并且对 SDS 空间扩充时，程序不仅会为 SDS 分配所需要的必须空间，还会分配额外的未使用空间。
        若之前的空间为1M，那么再次分配也会分配1M（类似Py的列表分配） -- 空间预分配

        当对 SDS 进行缩短操作时，程序并不会回收多余的内存空间，而是使用 free 字段将这些字节数量记录下来不释放，后面如果需要
         append 操作，则直接使用 free 中未使用的空间，减少了内存的分配。 -- 惰性空间释放

    4.二进制安全：
        Redis 中不仅可以存储 String 类型的数据，也可能存储一些二进制数据。二进制数据并不是规则的字符串格式，其中会包含一些特殊
        的字符如 &#39;\\0&#39;，在 C 中遇到 &#39;\\0&#39; 则表示字符串的结束，但在 SDS 中，标志字符串结束的是 len 属性。
</code></pre>`,5)]))}const c=t(a,[["render",s]]),S=JSON.parse('{"path":"/database/Redis/%E6%80%A7%E8%83%BD%E5%88%86%E6%9E%90.html","title":"性能分析","lang":"zh-CN","frontmatter":{"title":"性能分析","order":2,"description":"Redis 性能分析：（一文揭秘单线程的 Redis 为什么这么快） 一、Redis 为啥快 1.纯内存操作 2.单线程 3.高效的数据结构 4.合理的数据编码 5.其他方面的优化 二、SDS: Redis 是 C 语言开发的，但在 Redis 的 String 结构中，并没有使用 C 语言中的字符，而是用一种称为 SDS（Simple Dynamic...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"性能分析\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-10-12T14:58:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"悦·宝宝\\",\\"url\\":\\"https://github.com/Igarashi-G\\"}]}"],["meta",{"property":"og:url","content":"https://igarashi-g.github.io/database/Redis/%E6%80%A7%E8%83%BD%E5%88%86%E6%9E%90.html"}],["meta",{"property":"og:site_name","content":"悦 ▪ 宝宝"}],["meta",{"property":"og:title","content":"性能分析"}],["meta",{"property":"og:description","content":"Redis 性能分析：（一文揭秘单线程的 Redis 为什么这么快） 一、Redis 为啥快 1.纯内存操作 2.单线程 3.高效的数据结构 4.合理的数据编码 5.其他方面的优化 二、SDS: Redis 是 C 语言开发的，但在 Redis 的 String 结构中，并没有使用 C 语言中的字符，而是用一种称为 SDS（Simple Dynamic..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-10-12T14:58:07.000Z"}],["meta",{"property":"article:modified_time","content":"2022-10-12T14:58:07.000Z"}]]},"git":{"createdTime":1665586687000,"updatedTime":1665586687000,"contributors":[{"name":"Igarashi","username":"Igarashi","email":"2545369032@qq.com","commits":1,"url":"https://github.com/Igarashi"}]},"readingTime":{"minutes":2.5,"words":751},"filePathRelative":"database/Redis/性能分析.md","excerpt":"\\n<p>一、Redis 为啥快 1.纯内存操作 2.单线程 3.高效的数据结构 4.合理的数据编码 5.其他方面的优化</p>\\n<pre><code>在 Redis 中，常用的 5 种数据结构和应用场景如下：\\n    - String：缓存、计数器、分布式锁等。\\n    - List：链表、队列、微博关注人时间轴列表等。\\n    - Hash：用户信息、Hash 表等。\\n    - Set：去重、赞、踩、共同好友等。\\n    - Zset：访问量排行榜、点击量排行榜等。\\n</code></pre>\\n<p>二、SDS:<br>\\nRedis 是 C 语言开发的，但在 Redis 的 String 结构中，并没有使用 C 语言中的字符，而是用一种称为 SDS（Simple Dynamic String）的结构体来<br>\\n保存字符串。<br>\\nstruct sdshdr {<br>\\nint len; //用于记录 buf 中已使用空间的长度。<br>\\nint free; //buf 中空闲空间的长度。<br>\\nchar buf[]; //存储实际内容。<br>\\n}</p>","autoDesc":true}');export{c as comp,S as data};
