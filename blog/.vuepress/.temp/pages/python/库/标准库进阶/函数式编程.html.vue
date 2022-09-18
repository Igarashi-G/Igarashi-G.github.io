<template><div><h1 id="函数式编程模块" tabindex="-1"><a class="header-anchor" href="#函数式编程模块" aria-hidden="true">#</a> 函数式编程模块</h1>
<h2 id="_1-functools" tabindex="-1"><a class="header-anchor" href="#_1-functools" aria-hidden="true">#</a> 1. functools</h2>
<Alert type="info">**高阶函数** 和 **可调用对象** 上的操作 </Alert><h3 id="_1-1-partial" tabindex="-1"><a class="header-anchor" href="#_1-1-partial" aria-hidden="true">#</a> 1.1 partial</h3>
<p><strong>偏函数:</strong><code v-pre>即柯里化</code></p>
<pre><code>    当函数的参数个数太多的时候，可以通过使用functools.partial来创建一个新的函数来简化逻辑从而增强代码的可读性
    实现原理：（内部的简单闭包）
        def partial(func, *args, **kwargs):
            def newfunc(*f_args, **f_kwargs):
                newkwargs = kwargs.copy()
                newkwargs.update(f_kwargs)
                return func(*(args + f_args), **newkwargs)

            newfunc.func = func
            newfunc.args = args
            newfunc.kwargs = kwargs
            return newfunc
        接受传入的函数和其他参数，对函数的参数进行重新的整合（可以预先绑定变量，之后再传入待传入的变量）
        def add(a, *b):
            for i in b:
                a += i
            return a
        add_many = functools.partial(add, 1)
        add_many(2,3) -- 6
        用于冻结函数的某些参数和/或关键字参数，生成一个简化的签名对象。（简单来说可去参 + 重命名）
        类似C++的bind函数，是使用C实现的
</code></pre>
<h3 id="_1-2-partialmethod" tabindex="-1"><a class="header-anchor" href="#_1-2-partialmethod" aria-hidden="true">#</a> 1.2 partialmethod</h3>
<pre><code>    类似partial，貌似是在类内部根据现有的方法进行简化
    class Cell(object):
        def __init__(self):
            self._alive = False

        def alive(self):
            return self._alive

        def set_state(self, state):
            self._alive = bool(state)

        set_alive = functools.partialmethod(set_state, True)
        set_dead = functools.partialmethod(set_state, False)
    之后即可实例创建类，并调用set_alive 和 set_dead 方法
</code></pre>
<h3 id="_1-3-update-wrapper" tabindex="-1"><a class="header-anchor" href="#_1-3-update-wrapper" aria-hidden="true">#</a> 1.3 update_wrapper</h3>
<p>更新包装器函数
看源码可知，这个函数是从 被装饰的函数(wrapped) 中取出一些属性值来，赋值给 装饰器函数(wrapper)</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>WRAPPER_ASSIGNMENTS <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token string">'**module**'</span><span class="token punctuation">,</span> <span class="token string">'**name**'</span><span class="token punctuation">,</span> <span class="token string">'**qualname**'</span><span class="token punctuation">,</span> <span class="token string">'**doc**'</span><span class="token punctuation">,</span>
<span class="token string">'**annotations**'</span><span class="token punctuation">)</span>
WRAPPER_UPDATES <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token string">'**dict**'</span><span class="token punctuation">,</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">update_wrapper</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">,</span>
	wrapped<span class="token punctuation">,</span>
	assigned <span class="token operator">=</span> WRAPPER_ASSIGNMENTS<span class="token punctuation">,</span>
	updated <span class="token operator">=</span> WRAPPER_UPDATES<span class="token punctuation">)</span><span class="token punctuation">:</span>
	<span class="token keyword">for</span> attr <span class="token keyword">in</span> assigned<span class="token punctuation">:</span> <span class="token comment"># 遍历上文定义属性</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            value <span class="token operator">=</span> <span class="token builtin">getattr</span><span class="token punctuation">(</span>wrapped<span class="token punctuation">,</span> attr<span class="token punctuation">)</span> <span class="token comment">#把被装饰的函数的属性进行反射取值</span>
        <span class="token keyword">except</span> AttributeError<span class="token punctuation">:</span>
            <span class="token keyword">pass</span>
	<span class="token keyword">else</span><span class="token punctuation">:</span>
		<span class="token builtin">setattr</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">,</span> attr<span class="token punctuation">,</span> value<span class="token punctuation">)</span> <span class="token comment">#把取到的值再通过反射赋值给装饰器函数</span>
	<span class="token keyword">for</span> attr <span class="token keyword">in</span> updated<span class="token punctuation">:</span>
		<span class="token builtin">getattr</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">,</span> attr<span class="token punctuation">)</span><span class="token punctuation">.</span>update<span class="token punctuation">(</span><span class="token builtin">getattr</span><span class="token punctuation">(</span>wrapped<span class="token punctuation">,</span> attr<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">#再获取到装饰器字典更新为被装饰字典</span>
		wrapper<span class="token punctuation">.</span><span class="token operator">**</span>wrapped<span class="token operator">**</span> <span class="token operator">=</span> wrapped
	<span class="token keyword">return</span> wrapper
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为啥要这么做?
def wrapper(f): # 自定义装饰器
def wrapper_function(*args, **kwargs):
&quot;&quot;&quot;这个是修饰函数&quot;&quot;&quot;
return f(*args, **kwargs)
return wrapper_function
当自定义一个装饰器装给被装饰的函数，打印被装饰函数的<strong>doc</strong>和<strong>name</strong>会发现打印的是修饰函数里的属性</p>
<pre><code>    因此在原装饰器的装饰函数外添加update_wrapper(wrapper_function, f) 即可实现对被装饰函数属性的更改
</code></pre>
<h3 id="_1-4-wraps" tabindex="-1"><a class="header-anchor" href="#_1-4-wraps" aria-hidden="true">#</a> 1.4 wraps</h3>
<pre><code>    Python装饰器（decorator）在实现的时候，被装饰后的函数其实已经是另外一个函数了（函数名等函数属性会发生改变），为了不影响，
    Python的functools包中提供了一个叫wraps的decorator来消除这样的副作用。写一个decorator的时候，最好在实现之前加上functools
    的wrap，它能保留原有函数的名称和docstring。

    wraps函数其实就是一个装饰器版的update_wrapper函数，它的功能和update_wrapper是一模一样的。源码如下：
    WRAPPER_ASSIGNMENTS = ('__module__', '__name__', '__qualname__', '__doc__',
                            '__annotations__')
    WRAPPER_UPDATES = ('__dict__',)
    def wraps(wrapped,
              assigned = WRAPPER_ASSIGNMENTS,
              updated = WRAPPER_UPDATES):
        return partial(update_wrapper, wrapped=wrapped,
                       assigned=assigned, updated=updated)
    就只是单纯的接收被装饰的函数，和要修改的属性，传入partial函数中，再调用update_wrapper进行更新

    注：partial接收的第一个函数是update_wrapper,因此经过partial进行wraps的重命名。重命名后把需要更新的参数传入
        update_wrapper，之后把更新属性后的函数返回。

    def wrapper(f):
        @wraps(f)
        def wrapper_function(*args, **kwargs):
            &quot;&quot;&quot;这个是修饰函数&quot;&quot;&quot;
            return f(*args, **kwargs)
        return wrapper_function

    @wrapper
    def wrapped():
        &quot;&quot;&quot;这个是被修饰的函数&quot;&quot;&quot;
        print('wrapped')
    wraps的作用：在装饰器中利用wraps 把被装饰的函数 属性进行更新（否则再装饰器中走了一遍的被装饰函数，属性会改为装饰器
        函数的属性）因此以后再自定义的装饰器后加上@wrap就没错了
</code></pre>
<h3 id="_1-5-lru-cache" tabindex="-1"><a class="header-anchor" href="#_1-5-lru-cache" aria-hidden="true">#</a> 1.5 lru_cache</h3>
<p>非常实用的装饰器，<strong>LRU</strong>（<em>Least Recently Used</em>）<strong>加速缓存</strong> 优化技术，可以将耗时函数的结果缓存，避免重复计算</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> time
<span class="token keyword">import</span> functools


<span class="token keyword">def</span> <span class="token function">clock</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token decorator annotation punctuation">@functools<span class="token punctuation">.</span>wraps</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span>
    <span class="token keyword">def</span> <span class="token function">clocked</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        start_time <span class="token operator">=</span> time<span class="token punctuation">.</span>perf_counter<span class="token punctuation">(</span><span class="token punctuation">)</span>
        ret <span class="token operator">=</span> func<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
        end_time <span class="token operator">=</span> time<span class="token punctuation">.</span>perf_counter<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> start_time
        arg_lst <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token keyword">if</span> args<span class="token punctuation">:</span>
            arg_lst<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token string">","</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token builtin">repr</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span> <span class="token keyword">for</span> arg <span class="token keyword">in</span> args<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> kwargs<span class="token punctuation">:</span>
            pairs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-interpolation"><span class="token string">f"</span><span class="token interpolation"><span class="token punctuation">{</span>k<span class="token punctuation">}</span></span><span class="token string">=</span><span class="token interpolation"><span class="token punctuation">{</span>v<span class="token punctuation">}</span></span><span class="token string">"</span></span> <span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token keyword">in</span> <span class="token builtin">sorted</span><span class="token punctuation">(</span>kwargs<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
            arg_lst<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token string">", "</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span>pairs<span class="token punctuation">)</span><span class="token punctuation">)</span>
        arg_str <span class="token operator">=</span> <span class="token string">", "</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span>arg_lst<span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"[</span><span class="token interpolation"><span class="token punctuation">{</span>end_time<span class="token punctuation">:</span><span class="token format-spec">.8f</span><span class="token punctuation">}</span></span><span class="token string">μs], </span><span class="token interpolation"><span class="token punctuation">{</span>func<span class="token punctuation">.</span>__name__<span class="token punctuation">}</span></span><span class="token string">(</span><span class="token interpolation"><span class="token punctuation">{</span>arg_str<span class="token punctuation">}</span></span><span class="token string">) -> </span><span class="token interpolation"><span class="token punctuation">{</span>ret<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> ret

    <span class="token keyword">return</span> clocked


<span class="token decorator annotation punctuation">@functools<span class="token punctuation">.</span>lru_cache</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token decorator annotation punctuation">@clock</span>
<span class="token keyword">def</span> <span class="token function">fibonacci</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> n <span class="token operator">&lt;</span> <span class="token number">2</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> n
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> fibonacci<span class="token punctuation">(</span>n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> fibonacci<span class="token punctuation">(</span>n <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">'__main__'</span><span class="token punctuation">:</span>
    fibonacci<span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>会发现和传统调用不同，递归并没有频繁调用，仅执行了 <strong>7</strong> 次，且大量节省计算资源</li>
<li>若计算 <code v-pre>fibonacci(30)</code> 优化后仅需 <strong>0.0005s</strong>，不优化甚至会 <strong>20s+</strong></li>
<li>除了优化递归外，在 <strong>Web</strong> 中获取信息的应用也能发挥巨大作用</li>
</ul>
<h5 id="functools-lru-cache-maxsize-128-typed-false" tabindex="-1"><a class="header-anchor" href="#functools-lru-cache-maxsize-128-typed-false" aria-hidden="true">#</a> <strong>@functools.lru_cache(maxsize=128, typed=False)</strong></h5>
<ul>
<li><code v-pre>maxsize</code> 指定存储多少个调用结果，应为 <strong>2</strong> 的幂次方</li>
<li><code v-pre>typed</code> 若为 <code v-pre>True</code>，把不同参数类型得到的结果分开保存，把通常认为相等的浮点数和整型区分开</li>
<li><code v-pre>lru_cache</code> 使用字典存储结果，键根据调用时传入的位置参数和关键字参数创建，因此被其装饰的函数，所有的参数 <strong>必须是可哈希</strong> 的</li>
</ul>
<h3 id="_1-6-singledispatch" tabindex="-1"><a class="header-anchor" href="#_1-6-singledispatch" aria-hidden="true">#</a> 1.6 singledispatch</h3>
<p><strong>Python 3.4</strong> 新增，会将被装饰的函数变为 <strong>单分派泛函数</strong> ，用于拆分模块，省去大量的 <code v-pre>if - eilf - else</code> 判断，增强代码扩展性</p>
<ul>
<li><strong>泛函数</strong>（<em>generic function</em>）：根据 <strong>第一个参数</strong>（<em>单分派</em>）的类型，以 <strong>不同方式执行相同操作</strong>的一组函数</li>
<li><strong>多分派：</strong> 与单分派相反，是根据 <strong>多个参数</strong> 选择对应的函数</li>
</ul>
<p><a href="https://docs.python.org/zh-cn/3.10/library/functools.html?highlight=singledispatch#functools.singledispatch" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a></p>
<h2 id="_2-itertools" tabindex="-1"><a class="header-anchor" href="#_2-itertools" aria-hidden="true">#</a> 2. itertools</h2>
<Alert type="info">为高效循环而创建**迭代器**的函数 </Alert><pre><code>1.chain：
    itertools.chain(*iterables)可以将多个iterable组合成一个iterator。
    list(chain([1, 2, 3], ['a', 'b', 'c']))     &gt;&gt;&gt;     [1, 2, 3, 'a', 'b', 'c']
    原理：
        def chain(*iterables):
            # chain('ABC', 'DEF') --&gt; A B C D E F
            for it in iterables:
                for element in it:
                    yield element

    通过yield进行暂存，把两个可迭代对象的元素生成新的迭代器

2.chain.from_iterable：
    类似chain，只是接收 单个iterable，然后将这个iterable中的元素组合成一个iterator。
    list(chain.from_iterable(['ABC', 'DEF']))       &gt;&gt;&gt;     ['A', 'B', 'C', 'D', 'E', 'F']

3.compress:
    compress(data, selectors)接收两个iterable作为参数，只返回selectors中对应的元素为True的data，当data/selectors之一
    用尽时停止。
    list(compress([&quot;a&quot;, 2, 3, 4, [5, 6]], [True, True, False, False, True]))   &gt;&gt;&gt;     [&quot;a&quot;, 2, [5, 6]]

4.zip_longest:
    zip_longest(*iterables, fillvalue=None)和zip类似，算是扩展，zip的缺陷是iterable中的某一元素被遍历完，整个遍历都会停止
    r1 = range(3)
    r2 = range(2)
    list(zip(r1, r2))           &gt;&gt;&gt;     [(0, 0), (1, 1)]
    list(zip_longest(r1, r2))   &gt;&gt;&gt;     [(0, 0), (1, 1), (2, None)]

5.starmap：
    starmap(func, iterable)假设iterable将返回一个元组流，并使用这些元组作为参数调用func：
    场景：starmap(os.path.join, [('/bin', 'python'), ('/usr', 'bin', 'java'),
                                ('/usr', 'bin', 'perl'), ('/usr', 'bin', 'ruby')])
    之后转为list生成合成的地址列表

6.groupby：
    groupby(iterable, key=None) 把iterator中相邻的重复元素挑出来放在一起。
    for key, group in itertools.groupby('AAAABBBCCDAABBB'):
        print(key, list(group))
    =&gt;        A ['A', 'A', 'A', 'A']...

    实际上挑选规则是通过函数完成的，只要作用于函数的两个元素返回的值相等，这两个元素就被认为是在一组的，而函数返回值作为组的key。
    因此groupby()出来的迭代器的key值可以通过函数来设置，比如
        def get_state(state):
            return state[1]
</code></pre>
<h2 id="_3-operator" tabindex="-1"><a class="header-anchor" href="#_3-operator" aria-hidden="true">#</a> 3. Operator</h2>
<Alert type="info">标准 `运算符` 替代函数</Alert><pre><code>1.itemgetter、attrgetter
    列表自带的排序方法，list.sort() 和sorted()，其中还包含一个key的参数来指定一个函数，函数将在每个元素比较前被调用。
    因此通常有如下 sorted(stu,key=lambda stu: stu.name) 第一个参数为待排序的列表（见1.1）后面的即为指定的匿名函数

    但若对某些复杂的对象排序，则通过operator模块提供的itemgetter、attrgetter方法简化操作（通常和排序方法结合）

    itemgetter:（返回一个可调用的对象 - 通常用于元组、字典）(详情参考源码，就是初始化绑定了一个通过键返回字典值的方法)
        该对象通过运算符的 __getitem__()的方法 从运算中获取 item

    浅析排序：
        1.当该对象为dict/tuple，itemgetter(1) 等价于 lambda x: x[1]
            如：
                r = sorted(v.items(), key=itemgetter(1), reverse=True)  # 返回排序后的值赋给r
            表示对dict_items([(9, 1), (7, 3)]) 元组列表的第一项进行排序，由大到小输出 -&gt; [(7, 3), (9, 1)]
            itemgetter(0)：表示按键排序    itemgetter(1)：表示按值排序

        2.当该对象为dict，itemgetter(&quot;name&quot;) 则是根据字典的键&quot;name&quot; 来获取值

        3.Python中的多条件排序：
            参数key指定的函数返回一个元组，多条件排序的顺序将按照元组的顺序。

            teamitems = [{'team':'France'   , 'P':1 , 'GD':-3 , 'GS':1 , 'GA':4},
                        {'team':'Uruguay'   , 'P':7 , 'GD':4 , 'GS':4 , 'GA':0},
                        {'team':'SouthAfrica' , 'P':4 , 'GD':-2 , 'GS':3 , 'GA':5},
                        {'team':'Mexico'   , 'P':4 , 'GD':1 , 'GS':3 , 'GA':2}]

            sorted(teamitems ,key = lambda x:(x['P'],x['GD'],x['GS'],x['GA']),reverse=True)
            # 表示先按键为P的排序再，依次再按GD/GS/GA排序

            sorted(teamitems ,key = itemgetter('P','GD','GS','GA'),reverse=True)
            # 同理，见注意事项

            有的升序有的降序的情况下怎么多条件排序：（如dict{消费: 区服}先按消费排序，再按区服逆序）
                方法1：先排消费 ，再排区服逆序。
                方法2：
                    sorted(items,key=lambda x:(-int(x[1]), int(x[0]))) # 负号即表示逆序。
                    注意：利用lambda 不是按顺序来的，而是优先级，优先级高的置于()最前，因此把最后决定的区服置于前

        注意：运算符的 __getitem__()方法可接受任意类型的项目。同时可以指定多个排序规则如：(1,2)、('name','age')则是先按照
            角标是1的排，再按照2的排，或是先按名字排，再根据年龄排


    attrgetter:（返回一个可调用的对象 - 通常用于对象）
        该对象从运算中获取 'attr' 。如果请求的属性不止一个的话， 返回属性的元组。
        就是可以通过对象的属性名 来获取对象的属性，多个返回属性元组

    注：与max、min的区别
        max(iterable, key, default)可以求迭代器的最大值。
            iterable为迭代器，max会for i in … 遍历一遍这个迭代器，然后将迭代器的每一个返回值当做参数传给key=func。然后将func的
            执行结果传给key=func（通常用lambda），以key为标准进行大小的判断。
            如：ret = max(li, key=lambda x: x['name'])
</code></pre>
<hr>
</div></template>


