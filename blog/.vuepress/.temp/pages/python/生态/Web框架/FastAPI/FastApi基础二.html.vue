<template><div><p><strong>Python FastAPI Web 框架</strong> 的基础使用</p>
<!--more-->
<h2 id="_1-depend-依赖注入系统" tabindex="-1"><a class="header-anchor" href="#_1-depend-依赖注入系统" aria-hidden="true">#</a> 1. Depend（<em>依赖注入系统</em>）</h2>
<h3 id="_1-1-什么是依赖注入" tabindex="-1"><a class="header-anchor" href="#_1-1-什么是依赖注入" aria-hidden="true">#</a> 1.1 什么是依赖注入</h3>
<p>即是在你编程的代码前（路径函数），有一种方法，可以声明它执行前或是工作中需要使用的东西，比如：</p>
<ul>
<li>有共享逻辑（一次又一次地使用相同的代码逻辑）。</li>
<li>共享数据库连接。</li>
<li>强制执行安全性，身份验证，角色要求</li>
<li>等等很多其他事情</li>
</ul>
<p>所有注入依赖项，可以最大程度地减少了代码重复。</p>
<h3 id="_2-最基本的依赖形式" tabindex="-1"><a class="header-anchor" href="#_2-最基本的依赖形式" aria-hidden="true">#</a> 2. 最基本的依赖形式</h3>
<h3 id="_2-1-参数依赖" tabindex="-1"><a class="header-anchor" href="#_2-1-参数依赖" aria-hidden="true">#</a> 2.1 参数依赖</h3>
<p>如创建一个最简单的依赖注入 <strong>Depends</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> fastapi <span class="token keyword">import</span> Depends

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">common_parameters</span><span class="token punctuation">(</span>q<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> <span class="token boolean">None</span><span class="token punctuation">,</span> skip<span class="token punctuation">:</span> <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> limit<span class="token punctuation">:</span> <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    limit <span class="token operator">+=</span> <span class="token number">66</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token string">"q"</span><span class="token punctuation">:</span> q<span class="token punctuation">,</span> <span class="token string">"skip"</span><span class="token punctuation">:</span> skip<span class="token punctuation">,</span> <span class="token string">"limit"</span><span class="token punctuation">:</span> limit<span class="token punctuation">}</span>

<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>get</span><span class="token punctuation">(</span><span class="token string">"/items/"</span><span class="token punctuation">)</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">read_items</span><span class="token punctuation">(</span>commons<span class="token punctuation">:</span> <span class="token builtin">dict</span> <span class="token operator">=</span> Depends<span class="token punctuation">(</span>common_parameters<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    commons<span class="token punctuation">[</span><span class="token string">'skip'</span><span class="token punctuation">]</span> <span class="token operator">+=</span> <span class="token number">10</span>
    <span class="token keyword">return</span> commons
    
<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>get</span><span class="token punctuation">(</span><span class="token string">"/users/"</span><span class="token punctuation">)</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">read_users</span><span class="token punctuation">(</span>commons<span class="token punctuation">:</span> <span class="token builtin">dict</span> <span class="token operator">=</span> Depends<span class="token punctuation">(</span>common_parameters<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> commons

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>Depends：</strong> 创建一个依赖注入，传入需要注入的依赖函数 <strong>func</strong>，在获取对应的某个参数前，会先执行注入的 <strong>func()</strong>，并 <strong>获取执行后的返回值作为参数</strong></li>
</ul>
<div class="custom-container tip">
<p class="custom-container-title">和装饰器的区别</p>
<ul>
<li>装饰器是 <strong>包裹</strong>，可以在函数前后 执行装饰动作</li>
<li>而依赖则仅能作为参数获取前，注入函数执行</li>
<li>传入的被依赖项，必须是可调用的，若传入的非异步，则会同步执行</li>
</ul>
</div>
<p>如下，一个实际的案例</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">generate_request_id</span><span class="token punctuation">(</span>request<span class="token punctuation">:</span> Request<span class="token punctuation">,</span> response<span class="token punctuation">:</span> Response<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">str</span><span class="token punctuation">:</span>
    request_id <span class="token operator">=</span> uuid<span class="token punctuation">.</span>uuid4<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token builtin">hex</span>
    response<span class="token punctuation">.</span>headers<span class="token punctuation">[</span><span class="token string">"x_request_id"</span><span class="token punctuation">]</span> <span class="token operator">=</span> request_id
    <span class="token comment"># 记录http请求日志</span>
    LogService<span class="token punctuation">.</span>save_request_log<span class="token punctuation">(</span>
        request_id<span class="token operator">=</span>request_id<span class="token punctuation">,</span>
        log_ip<span class="token operator">=</span>request<span class="token punctuation">.</span>headers<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">"x-real-ip"</span><span class="token punctuation">,</span> request<span class="token punctuation">.</span>client<span class="token punctuation">.</span>host<span class="token punctuation">)</span><span class="token punctuation">,</span>
        log_info<span class="token operator">=</span><span class="token keyword">await</span> RequestLog<span class="token punctuation">.</span>request_params<span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">,</span>
        method<span class="token operator">=</span>request<span class="token punctuation">.</span>method<span class="token punctuation">,</span>
    <span class="token punctuation">)</span>
    <span class="token keyword">return</span> request_id

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">get_client_ip</span><span class="token punctuation">(</span>request<span class="token punctuation">:</span> Request<span class="token punctuation">,</span> response<span class="token punctuation">:</span> Response<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">str</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> request<span class="token punctuation">.</span>headers<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">"x-real-ip"</span><span class="token punctuation">,</span> request<span class="token punctuation">.</span>client<span class="token punctuation">.</span>host<span class="token punctuation">)</span>

<span class="token decorator annotation punctuation">@api<span class="token punctuation">.</span>get</span><span class="token punctuation">(</span>
    path<span class="token operator">=</span><span class="token string">"/nodes"</span><span class="token punctuation">,</span>
    response_model<span class="token operator">=</span>List<span class="token punctuation">[</span>NodeInResponse<span class="token punctuation">]</span><span class="token punctuation">,</span>
    name<span class="token operator">=</span><span class="token string">"查询节点列表"</span><span class="token punctuation">,</span>
    summary<span class="token operator">=</span><span class="token string">"查询节点列表"</span><span class="token punctuation">,</span>
    operation_id<span class="token operator">=</span><span class="token string">"node::list"</span><span class="token punctuation">,</span>
    dependencies<span class="token operator">=</span><span class="token punctuation">[</span>Depends<span class="token punctuation">(</span>require_permission<span class="token punctuation">(</span><span class="token string">"node::list"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">nodes_list</span><span class="token punctuation">(</span>
        request<span class="token punctuation">:</span> Request<span class="token punctuation">,</span>
        response<span class="token punctuation">:</span> Response<span class="token punctuation">,</span>
        request_id<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> Depends<span class="token punctuation">(</span>generate_request_id<span class="token punctuation">)</span><span class="token punctuation">,</span>
        client_ip<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> Depends<span class="token punctuation">(</span>get_client_ip<span class="token punctuation">)</span><span class="token punctuation">,</span>
        current_user<span class="token punctuation">:</span> UserInResponse <span class="token operator">=</span> Depends<span class="token punctuation">(</span>get_current_user<span class="token punctuation">)</span><span class="token punctuation">,</span>
        offset<span class="token punctuation">:</span> <span class="token builtin">int</span> <span class="token operator">=</span> Query<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> title<span class="token operator">=</span><span class="token string">"offset"</span><span class="token punctuation">,</span> ge<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        limit<span class="token punctuation">:</span> <span class="token builtin">int</span> <span class="token operator">=</span> Query<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> title<span class="token operator">=</span><span class="token string">"limit"</span><span class="token punctuation">,</span> ge<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span> le<span class="token operator">=</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        sort_key<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> Query<span class="token punctuation">(</span><span class="token boolean">None</span><span class="token punctuation">,</span> description<span class="token operator">=</span><span class="token string">"排序字段"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        sort_oder<span class="token punctuation">:</span> SortOderEnum <span class="token operator">=</span> Query<span class="token punctuation">(</span>SortOderEnum<span class="token punctuation">.</span>DESC<span class="token punctuation">,</span> description<span class="token operator">=</span><span class="token string">"排序规则"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">pass</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分别对 <strong>权限、请求ID、客户端IP</strong> 进行了依赖注入，方便的进行了用户请求的权限校验、请求 <strong>ID</strong> 的日志记录，和客户端 <strong>IP</strong> 的获取</p>
<h3 id="_2-2-类作为依赖" tabindex="-1"><a class="header-anchor" href="#_2-2-类作为依赖" aria-hidden="true">#</a> 2.2 类作为依赖</h3>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>fake_items_db <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token string">"item_name"</span><span class="token punctuation">:</span> <span class="token string">"Foo"</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token string">"item_name"</span><span class="token punctuation">:</span> <span class="token string">"Bar"</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token string">"item_name"</span><span class="token punctuation">:</span> <span class="token string">"Baz"</span><span class="token punctuation">}</span><span class="token punctuation">]</span>

<span class="token keyword">class</span> <span class="token class-name">CommonQueryParams</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> q<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> <span class="token boolean">None</span><span class="token punctuation">,</span> skip<span class="token punctuation">:</span> <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> limit<span class="token punctuation">:</span> <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>q <span class="token operator">=</span> q
        self<span class="token punctuation">.</span>skip <span class="token operator">=</span> skip
        self<span class="token punctuation">.</span>limit <span class="token operator">=</span> limit

<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>get</span><span class="token punctuation">(</span><span class="token string">"/items/"</span><span class="token punctuation">)</span>
<span class="token comment"># async def read_items(commons: CommonQueryParams = Depends(CommonQueryParams)):</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">read_items</span><span class="token punctuation">(</span>commons<span class="token punctuation">:</span> CommonQueryParams <span class="token operator">=</span> Depends<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    response <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">if</span> commons<span class="token punctuation">.</span>q<span class="token punctuation">:</span>
        response<span class="token punctuation">.</span>update<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">"q"</span><span class="token punctuation">:</span> commons<span class="token punctuation">.</span>q<span class="token punctuation">}</span><span class="token punctuation">)</span>
    items <span class="token operator">=</span> fake_items_db<span class="token punctuation">[</span>commons<span class="token punctuation">.</span>skip<span class="token punctuation">:</span> commons<span class="token punctuation">.</span>skip <span class="token operator">+</span> commons<span class="token punctuation">.</span>limit<span class="token punctuation">]</span>
    response<span class="token punctuation">.</span>update<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">"items"</span><span class="token punctuation">:</span> items<span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> response
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p><strong>commons: CommonQueryParams = Depends()：</strong> 若指定了类型 ，可无需传参，会默认调取此类</p>
</li>
<li>
<p>在获取请求传入的参数前，通过 <strong>CommonQueryParams</strong> 进行了实例的初始化</p>
</li>
</ul>
<h3 id="_2-3-其他情况" tabindex="-1"><a class="header-anchor" href="#_2-3-其他情况" aria-hidden="true">#</a> 2.3 其他情况</h3>
<h4 id="依赖嵌套" tabindex="-1"><a class="header-anchor" href="#依赖嵌套" aria-hidden="true">#</a> <strong>依赖嵌套</strong></h4>
<p>若不止一个依赖的情况下，可进行依赖嵌套</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">query_extractor</span><span class="token punctuation">(</span>q<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> <span class="token boolean">None</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
	<span class="token keyword">return</span> q

<span class="token keyword">def</span> <span class="token function">query_or_cookie_extractor</span><span class="token punctuation">(</span>
    q<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> Depends<span class="token punctuation">(</span>query_extractor<span class="token punctuation">)</span><span class="token punctuation">,</span> last_query<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> Cookie<span class="token punctuation">(</span><span class="token boolean">None</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> q<span class="token punctuation">:</span>
        <span class="token keyword">return</span> last_query
    <span class="token keyword">return</span> q

<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>get</span><span class="token punctuation">(</span><span class="token string">"/items/"</span><span class="token punctuation">)</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">read_query</span><span class="token punctuation">(</span>query_or_default<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> Depends<span class="token punctuation">(</span>query_or_cookie_extractor<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token string">"q_or_cookie"</span><span class="token punctuation">:</span> query_or_default<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>依赖可以嵌套依赖， 嵌套的依赖若也带有参数，则一并是需要请求中携带的</p>
<h4 id="多次使用相同依赖" tabindex="-1"><a class="header-anchor" href="#多次使用相同依赖" aria-hidden="true">#</a> <strong>多次使用相同依赖</strong></h4>
<p>如果在同一个路径操作，多次声明一个依赖项（大概指 /item 的 get、post、put...请求都指定了不同依赖项 Foo、Bar、Baz...，但是这写依赖项有
一个相同的子依赖 get_value） 那么此时 FastApi 默认每次请求仅调用一次子依赖项，并把自依赖项 get_value 缓存，并传给特定请求中的需要它
的所有依赖项 （如 Foo、Bar、Baz、needy_dependency...）</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">needy_dependency</span><span class="token punctuation">(</span>fresh_value<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> Depends<span class="token punctuation">(</span>get_value<span class="token punctuation">,</span> use_cache<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token string">"fresh_value"</span><span class="token punctuation">:</span> fresh_value<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>use_cache=False 若要不使用缓存，而每次都调用依赖，可以通过 use_cache 关闭</li>
</ul>
<h4 id="请求多个依赖-dependencies" tabindex="-1"><a class="header-anchor" href="#请求多个依赖-dependencies" aria-hidden="true">#</a> 请求多个依赖 dependencies</h4>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">verify_token</span><span class="token punctuation">(</span>x_token<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> Header<span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
<span class="token keyword">if</span> x_token <span class="token operator">!=</span> <span class="token string">"fake-super-secret-token"</span><span class="token punctuation">:</span>
    <span class="token keyword">raise</span> HTTPException<span class="token punctuation">(</span>status_code<span class="token operator">=</span><span class="token number">400</span><span class="token punctuation">,</span> detail<span class="token operator">=</span><span class="token string">"X-Token header invalid"</span><span class="token punctuation">)</span>

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">verify_key</span><span class="token punctuation">(</span>x_key<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> Header<span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> x_key <span class="token operator">!=</span> <span class="token string">"fake-super-secret-key"</span><span class="token punctuation">:</span>
        <span class="token keyword">raise</span> HTTPException<span class="token punctuation">(</span>status_code<span class="token operator">=</span><span class="token number">400</span><span class="token punctuation">,</span> detail<span class="token operator">=</span><span class="token string">"X-Key header invalid"</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> x_key

<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>get</span><span class="token punctuation">(</span>
    <span class="token string">"/items/"</span><span class="token punctuation">,</span>
    dependencies<span class="token operator">=</span><span class="token punctuation">[</span>Depends<span class="token punctuation">(</span>verify_token<span class="token punctuation">)</span><span class="token punctuation">,</span> Depends<span class="token punctuation">(</span>verify_key<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">read_items</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token string">"item"</span><span class="token punctuation">:</span> <span class="token string">"Foo"</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token string">"item"</span><span class="token punctuation">:</span> <span class="token string">"Bar"</span><span class="token punctuation">}</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>dependencies：</strong> 可在请求中添加多个依赖到路径操作的装饰器里面</li>
</ul>
<p><a href="https://www.pythonf.cn/read/56921" target="_blank" rel="noopener noreferrer">其他进阶操作<ExternalLinkIcon/></a></p>
<h2 id="_2-安全认证" tabindex="-1"><a class="header-anchor" href="#_2-安全认证" aria-hidden="true">#</a> 2. 安全认证</h2>
<p>是为了处理安全性、身份验证和授权，其实在很多其他框架和系统中是很复杂困难的话题，但 <strong>FastAPI</strong> 中提供了多种工具，可以轻松快速实现</p>
<h3 id="_2-1-oauth2-规范" tabindex="-1"><a class="header-anchor" href="#_2-1-oauth2-规范" aria-hidden="true">#</a> 2.1 OAuth2 规范</h3>
<p><strong>OAuth2</strong> 是一个规范国际、一个通用的授权标准，定义了几种处理身份验证和授权的方式，相当广泛的规范，涵盖了几个复杂的用例，包括使用 <strong>&quot;第三方&quot;</strong> 进行身份验证的方法</p>
<p>是所有带有使用 <strong>Facebook，Google，Twitter，GitHub</strong> 登录的系统的基础，流程如下：</p>
<ol>
<li>
<p>前端从浏览器发送 <strong>url</strong> 包含 <strong>username</strong> 、<strong>password</strong> 的请求</p>
</li>
<li>
<p>服务器有一套 <strong>完整授权机制</strong>，它会返回前端一个 <strong>token</strong>（<em>字符串的令牌</em> ）</p>
</li>
<li>
<p>前端找地方给 <strong>token</strong> 存起来（<em>通常是放 <strong>Cookie 、Local Storage、Session</strong> 等</em> ）</p>
</li>
<li>
<p>然后下次访问网页，前端发送请求要携带标头 <strong>Authorization：bearer + 令牌 token</strong> 作为标识认证，如</p>
<div class="language-http ext-http line-numbers-mode"><pre v-pre class="language-http"><code><span class="token header"><span class="token header-name keyword">Authorization</span><span class="token punctuation">:</span> <span class="token header-value">bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJzY29wZXMiOltdLCJleHAiOjE2Nzg3ODMyMzF9.xuouTmDkxVBgTNF1lEsBT-IDP2KJQpx0zrqzlibjtVc</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>服务器收到标识，会判断 <strong>token</strong> 有无认证权限，若有，再将拿到的该用户的特有信息，一并返回给前端</p>
</li>
</ol>
<blockquote>
<p><strong>token 过期：</strong>  一旦过期，会逼迫用户再次登录，因此即使令牌被盗，风险也相对会降低</p>
</blockquote>
<h4 id="oauth-1-和-2-的区别" tabindex="-1"><a class="header-anchor" href="#oauth-1-和-2-的区别" aria-hidden="true">#</a> <strong>OAuth 1 和 2 的区别</strong></h4>
<p>与 <strong>OAuth2</strong> 完全不同，并且更为复杂，因为它直接包含有关如何加密通信的规范，目前也不流行</p>
<p><strong>OAuth2</strong> 没有指定如何加密通信，它希望用户默认使用 <strong>HTTPS</strong> 为应用程序提供服务</p>
<h3 id="_2-2-oauth2-基本使用" tabindex="-1"><a class="header-anchor" href="#_2-2-oauth2-基本使用" aria-hidden="true">#</a> 2.2 OAuth2 基本使用</h3>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> fastapi<span class="token punctuation">.</span>security <span class="token keyword">import</span> OAuth2PasswordBearer

oauth2_scheme <span class="token operator">=</span> OAuth2PasswordBearer<span class="token punctuation">(</span>tokenUrl<span class="token operator">=</span><span class="token string">"/token"</span><span class="token punctuation">)</span>

<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>get</span><span class="token punctuation">(</span><span class="token string">"/items/"</span><span class="token punctuation">)</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">read_items</span><span class="token punctuation">(</span>
    token<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> Depends<span class="token punctuation">(</span>oauth2_scheme<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token string">"token"</span><span class="token punctuation">:</span> token<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p><strong>OAuth2PasswordBearer：</strong> 导入并实例化</p>
</li>
<li>
<p><strong>tokenUrl：</strong> 需要引入一个路径，该路径意思是把含有用户名密码的认证请求发，送到 <code v-pre>/token</code> 下</p>
<ul>
<li>还有个好处是将账号密码的服务器分离</li>
</ul>
</li>
<li>
<p>后续加上 <strong>token</strong> 函数进行路径认证即可</p>
</li>
</ul>
<h4 id="获取当前用户" tabindex="-1"><a class="header-anchor" href="#获取当前用户" aria-hidden="true">#</a> <strong>获取当前用户</strong></h4>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>oauth2_scheme <span class="token operator">=</span> OAuth2PasswordBearer<span class="token punctuation">(</span>tokenUrl<span class="token operator">=</span><span class="token string">"/token"</span><span class="token punctuation">)</span>

<span class="token keyword">class</span> <span class="token class-name">User</span><span class="token punctuation">(</span>BaseModel<span class="token punctuation">)</span><span class="token punctuation">:</span>
    username<span class="token punctuation">:</span> <span class="token builtin">str</span>
    email<span class="token punctuation">:</span> Optional<span class="token punctuation">[</span><span class="token builtin">str</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">None</span>
    full_name<span class="token punctuation">:</span> Optional<span class="token punctuation">[</span><span class="token builtin">str</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">None</span>
    disabled<span class="token punctuation">:</span> Optional<span class="token punctuation">[</span><span class="token builtin">bool</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">None</span>

<span class="token keyword">def</span> <span class="token function">fake_decode_token</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> User<span class="token punctuation">(</span>
        username<span class="token operator">=</span>token <span class="token operator">+</span> <span class="token string">"fakedecoded"</span><span class="token punctuation">,</span> email<span class="token operator">=</span><span class="token string">"john@example.com"</span><span class="token punctuation">,</span> full_name<span class="token operator">=</span><span class="token string">"John Doe"</span>
    <span class="token punctuation">)</span>

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">get_current_user</span><span class="token punctuation">(</span>token<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> Depends<span class="token punctuation">(</span>oauth2_scheme<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    user <span class="token operator">=</span> fake_decode_token<span class="token punctuation">(</span>token<span class="token punctuation">)</span>
    <span class="token keyword">return</span> user
    
<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>get</span><span class="token punctuation">(</span><span class="token string">"/users/me"</span><span class="token punctuation">)</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">read_users_me</span><span class="token punctuation">(</span>current_user<span class="token punctuation">:</span> User <span class="token operator">=</span> Depends<span class="token punctuation">(</span>get_current_user<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> current_user
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="具有密码和承载的简单-oauth2" tabindex="-1"><a class="header-anchor" href="#具有密码和承载的简单-oauth2" aria-hidden="true">#</a> <strong>具有密码和承载的简单 OAuth2</strong></h4>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> fastapi<span class="token punctuation">.</span>security <span class="token keyword">import</span> OAuth2PasswordBearer<span class="token punctuation">,</span> OAuth2PasswordRequestForm

fake_users_db <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">"admin"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
        <span class="token string">"username"</span><span class="token punctuation">:</span> <span class="token string">"admin"</span><span class="token punctuation">,</span>
        <span class="token string">"full_name"</span><span class="token punctuation">:</span> <span class="token string">"root"</span><span class="token punctuation">,</span>
        <span class="token string">"email"</span><span class="token punctuation">:</span> <span class="token string">"admin@example.com"</span><span class="token punctuation">,</span>
        <span class="token string">"hashed_password"</span><span class="token punctuation">:</span> <span class="token string">"fakehashed123456"</span><span class="token punctuation">,</span>
        <span class="token string">"disabled"</span><span class="token punctuation">:</span> <span class="token boolean">False</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token string">"alice"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
        <span class="token string">"username"</span><span class="token punctuation">:</span> <span class="token string">"alice"</span><span class="token punctuation">,</span>
        <span class="token string">"full_name"</span><span class="token punctuation">:</span> <span class="token string">"Alice Wonderson"</span><span class="token punctuation">,</span>
        <span class="token string">"email"</span><span class="token punctuation">:</span> <span class="token string">"alice@example.com"</span><span class="token punctuation">,</span>
        <span class="token string">"hashed_password"</span><span class="token punctuation">:</span> <span class="token string">"fakehashedsecret2"</span><span class="token punctuation">,</span>
        <span class="token string">"disabled"</span><span class="token punctuation">:</span> <span class="token boolean">True</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">def</span> <span class="token function">fake_hash_password</span><span class="token punctuation">(</span>password<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> <span class="token string">"fakehashed"</span> <span class="token operator">+</span> password

oauth2_scheme <span class="token operator">=</span> OAuth2PasswordBearer<span class="token punctuation">(</span>tokenUrl<span class="token operator">=</span><span class="token string">"/token"</span><span class="token punctuation">)</span>

<span class="token keyword">class</span> <span class="token class-name">User</span><span class="token punctuation">(</span>BaseModel<span class="token punctuation">)</span><span class="token punctuation">:</span>  <span class="token comment"># 用户信息模型</span>
    username<span class="token punctuation">:</span> <span class="token builtin">str</span>
    email<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> <span class="token boolean">None</span>
    full_name<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> <span class="token boolean">None</span>
    disabled<span class="token punctuation">:</span> <span class="token builtin">bool</span> <span class="token operator">=</span> <span class="token boolean">None</span>   <span class="token comment"># True： 表示用户被拉进了黑名单啊之类的，禁止使用</span>
    
<span class="token keyword">class</span> <span class="token class-name">UserInDB</span><span class="token punctuation">(</span>User<span class="token punctuation">)</span><span class="token punctuation">:</span>
    hashed_password<span class="token punctuation">:</span> <span class="token builtin">str</span>    <span class="token comment"># 这里理解为哈希加密后的密码</span>

<span class="token keyword">def</span> <span class="token function">get_user</span><span class="token punctuation">(</span>db<span class="token punctuation">,</span> username<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">)</span><span class="token punctuation">:</span>    <span class="token comment"># 获取用户</span>
    <span class="token keyword">if</span> username <span class="token keyword">in</span> db<span class="token punctuation">:</span>
        user_dict <span class="token operator">=</span> db<span class="token punctuation">[</span>username<span class="token punctuation">]</span>
        <span class="token keyword">return</span> UserInDB<span class="token punctuation">(</span><span class="token operator">**</span>user_dict<span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">fake_decode_token</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">:</span>   <span class="token comment"># 解码令牌</span>
    <span class="token comment"># This doesn't provide any security at all</span>
    <span class="token comment"># Check the next version</span>
    user <span class="token operator">=</span> get_user<span class="token punctuation">(</span>fake_users_db<span class="token punctuation">,</span> token<span class="token punctuation">)</span>
    <span class="token keyword">return</span> user

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">get_current_user</span><span class="token punctuation">(</span>token<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> Depends<span class="token punctuation">(</span>oauth2_scheme<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    user <span class="token operator">=</span> fake_decode_token<span class="token punctuation">(</span>token<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> user<span class="token punctuation">:</span>
        <span class="token keyword">raise</span> HTTPException<span class="token punctuation">(</span>
            status_code<span class="token operator">=</span>status<span class="token punctuation">.</span>HTTP_401_UNAUTHORIZED<span class="token punctuation">,</span>
            detail<span class="token operator">=</span><span class="token string">"Invalid authentication credentials"</span><span class="token punctuation">,</span>
            headers<span class="token operator">=</span><span class="token punctuation">{</span><span class="token string">"WWW-Authenticate"</span><span class="token punctuation">:</span> <span class="token string">"Bearer"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">)</span>
    <span class="token keyword">return</span> user

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">get_current_active_user</span><span class="token punctuation">(</span>current_user<span class="token punctuation">:</span> User <span class="token operator">=</span> Depends<span class="token punctuation">(</span>get_current_user<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> current_user<span class="token punctuation">.</span>disabled<span class="token punctuation">:</span>
        <span class="token keyword">raise</span> HTTPException<span class="token punctuation">(</span>status_code<span class="token operator">=</span><span class="token number">400</span><span class="token punctuation">,</span> detail<span class="token operator">=</span><span class="token string">"Inactive user"</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> current_user

<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>post</span><span class="token punctuation">(</span><span class="token string">"/token"</span><span class="token punctuation">)</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">login</span><span class="token punctuation">(</span>form_data<span class="token punctuation">:</span> OAuth2PasswordRequestForm <span class="token operator">=</span> Depends<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    user_dict <span class="token operator">=</span> fake_users_db<span class="token punctuation">.</span>get<span class="token punctuation">(</span>form_data<span class="token punctuation">.</span>username<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> user_dict<span class="token punctuation">:</span>
        <span class="token keyword">raise</span> HTTPException<span class="token punctuation">(</span>status_code<span class="token operator">=</span><span class="token number">400</span><span class="token punctuation">,</span> detail<span class="token operator">=</span><span class="token string">"Incorrect username or password"</span><span class="token punctuation">)</span>
    user <span class="token operator">=</span> UserInDB<span class="token punctuation">(</span><span class="token operator">**</span>user_dict<span class="token punctuation">)</span>
    hashed_password <span class="token operator">=</span> fake_hash_password<span class="token punctuation">(</span>form_data<span class="token punctuation">.</span>password<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> hashed_password <span class="token operator">==</span> user<span class="token punctuation">.</span>hashed_password<span class="token punctuation">:</span>
        <span class="token keyword">raise</span> HTTPException<span class="token punctuation">(</span>status_code<span class="token operator">=</span><span class="token number">400</span><span class="token punctuation">,</span> detail<span class="token operator">=</span><span class="token string">"Incorrect username or password"</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token string">"access_token"</span><span class="token punctuation">:</span> user<span class="token punctuation">.</span>username<span class="token punctuation">,</span> <span class="token string">"token_type"</span><span class="token punctuation">:</span> <span class="token string">"bearer"</span><span class="token punctuation">}</span>

<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>get</span><span class="token punctuation">(</span><span class="token string">"/users/me"</span><span class="token punctuation">)</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">read_users_me</span><span class="token punctuation">(</span>current_user<span class="token punctuation">:</span> User <span class="token operator">=</span> Depends<span class="token punctuation">(</span>get_current_active_user<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> current_user
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>OAuth2PasswordBearer：</strong> 可以先简单理解为是密码服务器的作用（<em>有一条消息过来，密码服务器会响应这个密码是对是错</em>）</li>
<li><strong>OAuth2PasswordRequestForm:</strong> 是页面的 <strong>Form</strong> 表单，抓了 <strong>username</strong> 和 <strong>password</strong> 过来（<em>怎么抓，有没有加密无需操心</em>）</li>
<li><strong><code v-pre>/token：</code></strong> <strong>OAuth2PasswordBearer</strong> 转向该路由登录 ，会先去数据库查用户，然后比较其密码的哈希值是否一致</li>
</ul>
<h4 id="具有-jwt-令牌和哈希加密的-oauth2" tabindex="-1"><a class="header-anchor" href="#具有-jwt-令牌和哈希加密的-oauth2" aria-hidden="true">#</a> 具有 jwt 令牌和哈希加密的 OAuth2</h4>
<p><strong>JWT</strong> 是一个加密令牌，通常用于产生 <strong>token</strong> 令牌</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> passlib<span class="token punctuation">.</span>context <span class="token keyword">import</span> CryptContext

pwd_context <span class="token operator">=</span> CryptContext<span class="token punctuation">(</span>schemes<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">"bcrypt"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> deprecated<span class="token operator">=</span><span class="token string">"auto"</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">verify_password</span><span class="token punctuation">(</span>plain_password<span class="token punctuation">,</span> hashed_password<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> pwd_context<span class="token punctuation">.</span>verify<span class="token punctuation">(</span>plain_password<span class="token punctuation">,</span> hashed_password<span class="token punctuation">)</span>
    

<span class="token keyword">def</span> <span class="token function">get_password_hash</span><span class="token punctuation">(</span>password<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> pwd_context<span class="token punctuation">.</span><span class="token builtin">hash</span><span class="token punctuation">(</span>password<span class="token punctuation">)</span>

<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">'__main__'</span><span class="token punctuation">:</span>
    xxx <span class="token operator">=</span> get_password_hash<span class="token punctuation">(</span><span class="token string">"123456"</span><span class="token punctuation">)</span>
    yyy <span class="token operator">=</span> get_password_hash<span class="token punctuation">(</span><span class="token string">"123456"</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>xxx<span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>yyy<span class="token punctuation">)</span>

    <span class="token keyword">print</span><span class="token punctuation">(</span>verify_password<span class="token punctuation">(</span><span class="token string">"123456"</span><span class="token punctuation">,</span> xxx<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>verify_password<span class="token punctuation">(</span><span class="token string">"123456"</span><span class="token punctuation">,</span> yyy<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>verify_password<span class="token punctuation">(</span><span class="token string">"123456"</span><span class="token punctuation">,</span> <span class="token string">"$2b$12$IqBuIjvgZgj/sYY0DrRbuOyrlDg8tgSKbGgO6YNfgrOFIoDJwUb3i"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p><strong>passlib：</strong> 用于生成和处理哈希密码的库，<strong>FastAPI</strong> 官方推荐，并不是太好用</p>
</li>
<li>
<p><strong>CryptContext：</strong> 通过该类进行实例化</p>
</li>
<li>
<p><strong>.verify(原密码，hash 密码)：</strong> 可以进行哈希校验，校验原密码后哈希后的值是否一致</p>
</li>
<li>
<p><strong>.hash()：</strong> 获取哈希密码，将明文密码进行哈希，获得一个加密后的哈希密码</p>
</li>
</ul>
<blockquote>
<p>即使是相同的密码经过哈希，每次的结果都是不同的，因此不同哈希值对应解码后的明文确可能会一致</p>
</blockquote>
<h4 id="生产实例" tabindex="-1"><a class="header-anchor" href="#生产实例" aria-hidden="true">#</a> <strong>生产实例</strong></h4>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># /src/dashboard/scheme.py</span>
<span class="token keyword">from</span> fastapi<span class="token punctuation">.</span>security <span class="token keyword">import</span> OAuth2PasswordBearer

PROJECT_URL_TOKEN <span class="token operator">=</span> <span class="token string">"/api/v1/auth/access_token"</span>

OAuth2Scheme <span class="token operator">=</span> OAuth2PasswordBearer<span class="token punctuation">(</span>
    tokenUrl<span class="token operator">=</span>PROJECT_URL_TOKEN<span class="token punctuation">,</span>
    scopes<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再每次请求中注入依赖 <strong>OAuth2Scheme</strong> 来获取 <strong>token</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> typing <span class="token keyword">import</span> Callable

<span class="token keyword">from</span> fastapi <span class="token keyword">import</span> Depends
<span class="token keyword">from</span> fastapi <span class="token keyword">import</span> HTTPException
<span class="token keyword">from</span> fastapi<span class="token punctuation">.</span>security <span class="token keyword">import</span> SecurityScopes
<span class="token keyword">from</span> starlette <span class="token keyword">import</span> status

<span class="token keyword">from</span> dashboard <span class="token keyword">import</span> scheme
<span class="token keyword">from</span> dashboard<span class="token punctuation">.</span>core <span class="token keyword">import</span> security
<span class="token keyword">from</span> dashboard<span class="token punctuation">.</span>model<span class="token punctuation">.</span>access_token <span class="token keyword">import</span> AccessTokenPayload
<span class="token keyword">from</span> dashboard<span class="token punctuation">.</span>model<span class="token punctuation">.</span>user <span class="token keyword">import</span> UserInResponse
<span class="token keyword">from</span> dashboard<span class="token punctuation">.</span>services<span class="token punctuation">.</span>user <span class="token keyword">import</span> UserService

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">get_current_user</span><span class="token punctuation">(</span>
        security_scopes<span class="token punctuation">:</span> SecurityScopes<span class="token punctuation">,</span>
        token<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> Depends<span class="token punctuation">(</span>scheme<span class="token punctuation">.</span>OAuth2Scheme<span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> UserInResponse<span class="token punctuation">:</span>
    <span class="token keyword">if</span> security_scopes<span class="token punctuation">.</span>scopes<span class="token punctuation">:</span>
        authenticate_value <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f'Bearer scope="</span><span class="token interpolation"><span class="token punctuation">{</span>security_scopes<span class="token punctuation">.</span>scope_str<span class="token punctuation">}</span></span><span class="token string">"'</span></span>
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        authenticate_value <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f"Bearer"</span></span>
    credentials_exception <span class="token operator">=</span> HTTPException<span class="token punctuation">(</span>
        status_code<span class="token operator">=</span>status<span class="token punctuation">.</span>HTTP_401_UNAUTHORIZED<span class="token punctuation">,</span>
        detail<span class="token operator">=</span><span class="token string">"UNAUTHORIZED"</span><span class="token punctuation">,</span>
        headers<span class="token operator">=</span><span class="token punctuation">{</span><span class="token string">"WWW-Authenticate"</span><span class="token punctuation">:</span> authenticate_value<span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span>

    payload <span class="token operator">=</span> security<span class="token punctuation">.</span>decode_access_token<span class="token punctuation">(</span>token<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> payload<span class="token punctuation">:</span>
        <span class="token keyword">raise</span> credentials_exception
    username <span class="token operator">=</span> payload<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">"username"</span><span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> username <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token keyword">raise</span> credentials_exception
    token_scopes <span class="token operator">=</span> payload<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">"scopes"</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    created_at <span class="token operator">=</span> payload<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">"created_at"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
    token_payload <span class="token operator">=</span> AccessTokenPayload<span class="token punctuation">(</span>scopes<span class="token operator">=</span>token_scopes<span class="token punctuation">,</span> username<span class="token operator">=</span>username<span class="token punctuation">,</span> created_at<span class="token operator">=</span>created_at<span class="token punctuation">)</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        user <span class="token operator">=</span> <span class="token keyword">await</span> UserService<span class="token punctuation">.</span>get_user<span class="token punctuation">(</span>name<span class="token operator">=</span>username<span class="token punctuation">)</span>
    <span class="token keyword">except</span> Exception <span class="token keyword">as</span> exception<span class="token punctuation">:</span>
        <span class="token keyword">raise</span> exception
    <span class="token keyword">if</span> user <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token keyword">raise</span> credentials_exception
    <span class="token keyword">if</span> <span class="token keyword">not</span> user<span class="token punctuation">.</span>is_active<span class="token punctuation">:</span>
        <span class="token keyword">raise</span> credentials_exception
    <span class="token comment"># for scope in security_scopes.scopes:</span>
    <span class="token comment">#     if scope not in token_payload.scopes:</span>
    <span class="token comment">#         raise HTTPException(</span>
    <span class="token comment">#             status_code=status.HTTP_401_UNAUTHORIZED,</span>
    <span class="token comment">#             detail="Not enough permissions",</span>
    <span class="token comment">#             headers={"WWW-Authenticate": authenticate_value},</span>
    <span class="token comment">#         )</span>
    <span class="token keyword">return</span> user
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>若 <strong>decode_access_token（<em>使用了 jwt.decode</em> ）</strong> 失败，则抛出 <strong>401</strong> 认证异常</li>
<li><strong>get_current_user：</strong> 则可作为每次请求认证与权限的依赖注入</li>
</ul>
</div></template>


