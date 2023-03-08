<template><div><p><strong>Python Django Web</strong> 框架的简要概述</p>
<!--more-->
<p><a href="https://docs.djangoproject.com/zh-hans" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a> | <a href="https://docs.djangoproject.com/zh-hans/4.1/howto/" target="_blank" rel="noopener noreferrer">操作指南<ExternalLinkIcon/></a> | <a href="https://github.com/django/django" target="_blank" rel="noopener noreferrer">Github<ExternalLinkIcon/></a></p>
<h2 id="_1-初始化" tabindex="-1"><a class="header-anchor" href="#_1-初始化" aria-hidden="true">#</a> 1. 初始化</h2>
<h3 id="_1-1-安装" tabindex="-1"><a class="header-anchor" href="#_1-1-安装" aria-hidden="true">#</a> 1.1 安装</h3>
<p>安装 <strong>Django</strong> 框架</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ pip <span class="token function">install</span> Django
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1-2-创建项目" tabindex="-1"><a class="header-anchor" href="#_1-2-创建项目" aria-hidden="true">#</a> 1.2 创建项目</h3>
<blockquote>
<p>一个网站 <strong>配置</strong> 和 <strong>应用</strong> 的集合</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># cd 到 uci-dashboard 项目文件夹</span>
$ <span class="token builtin class-name">cd</span> uci-dashboard

<span class="token comment"># 创建 Django 项目 uci</span>
$ django-admin startproject uci <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><span style="color: blue"><a href="http://django-admin.py" target="_blank" rel="noopener noreferrer">django-admin.py<ExternalLinkIcon/></a>：</span>用于管理任务的 <strong>CLI</strong> 工具</li>
</ul>
<p>其目录结构如下</p>
  <ul>
      <li>
          uci
          <small>项目工程目录</small>
          <ul>
              <li>
                  <code>__init__.py</code>
              </li>
              <li>
                  <code>asgi.py</code>
                  <small>兼容 <code>ASGI</code> 服务器的入口</small>
              </li>
              <li>
                  <code>settings.py</code>
                  <small><code>Django</code>的配置文件</small>
              </li>
              <li>
                  <code>urls.py</code>
                  <small><code>URL</code>声明，配置路由</small>
              </li>
              <li>
                  <code>wsgi.py</code>
                  <small>兼容 <code>WSGI</code> 服务器的入口</small>
              </li>
          </ul>
      </li>
      <li>
          <code>manage.py</code>
          <small>管理 <code>Django</code> 项目的命令行工具</small>
      </li>
  </ul>
<p>启动项目</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ python manage.py runserver <span class="token comment"># 0.0.0.0:8088</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><span style="color: blue"><a href="http://manage.py" target="_blank" rel="noopener noreferrer">manage.py<ExternalLinkIcon/></a>：</span>管理 <strong>Django</strong> 项目的 <strong>CLI</strong> 工具，是 <code v-pre>django-admin.py</code> 的简单包装</li>
</ul>
<h3 id="_1-3-创建应用" tabindex="-1"><a class="header-anchor" href="#_1-3-创建应用" aria-hidden="true">#</a> 1.3 创建应用</h3>
<blockquote>
<p>应用是 <strong>专做某件事</strong> 的 网络应用程序，项目可以包含 <strong>多个应用</strong></p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ python manage.py startapp account
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此时目录为</p>
  <ul>
      <li>
          account
          <small>认证应用</small>
          <ul>
              <li>
                  migrations
                  <small>数据库初始化相关</small>
                  <ul>
                      <li>
                          <code>__init__.py</code>
                      </li>
                  </ul>
              </li>
              <li>
                  <code>__init__.py</code>
              </li>
              <li>
                  <code>admin.py</code>
                  <small></small>
              </li>
              <li>
                  <code>apps.py</code>
                  <small></small>
              </li>
              <li>
                  <code>models.py</code>
                  <small>编写 <strong>模型</strong> 文件</small>
              </li>
              <li>
                  <code>tests.py</code>
                  <small>用来测试</small>
              </li>
              <li>
                  <code>views.py</code>
                  <small>编写 <strong>视图</strong> 文件</small>
              </li>
          </ul>
      </li>
      <li>
          uci
      </li>
      <li>
          <code>manage.py</code>
      </li>
  </ul>
1.4 MTV 模式
<p><strong>MVC 模式：</strong> 将 <strong>Web</strong> 应用 分为三层</p>
<ul>
<li><strong>视图</strong>（<em><code v-pre>View</code>层</em>）：页面交互</li>
<li><strong>模型</strong>（<em><code v-pre>Model</code>层</em>）：构建数据模型</li>
<li><strong>控制器</strong>（<em><code v-pre>Controller</code>层</em>）：处理业务逻辑</li>
</ul>
<p><strong>MTV 模式：</strong></p>
<ul>
<li>就是把 <strong>View 层</strong> 改为 <strong>模板</strong>（<em><code v-pre>Template</code>层</em>） 上古时期用 <code v-pre>Jinjia</code> 模板搞 <strong>SSR 渲染</strong> ，后面前端崛起演变为前后端分离应用</li>
<li>把 <strong>Controller 层</strong> 改为 <strong>View 层</strong> 来处理业务逻辑</li>
<li>多了个 <strong>url 映射器</strong>（<em>路由</em>），用来分发请求给 <strong>View 层</strong> 处理</li>
</ul>
<img src="@source/python/生态/Web框架/Django/img/MTV.png">
<h2 id="_2-应用指北" tabindex="-1"><a class="header-anchor" href="#_2-应用指北" aria-hidden="true">#</a> 2. 应用指北</h2>
<h3 id="_2-1-views" tabindex="-1"><a class="header-anchor" href="#_2-1-views" aria-hidden="true">#</a> 2.1 views</h3>
<p><a href="https://docs.djangoproject.com/zh-hans/4.1/topics/http/views/" target="_blank" rel="noopener noreferrer">views.py 文档<ExternalLinkIcon/></a> | <a href="https://docs.djangoproject.com/zh-hans/4.1/topics/async/#async-views" target="_blank" rel="noopener noreferrer">异步视图<ExternalLinkIcon/></a></p>
<p>处理逻辑，类比 <strong>MVC</strong> 的 <strong>Controller</strong>（<em>控制层</em>），有两个核心对象，<strong>请求</strong> 与 <strong>响应</strong></p>
<ul>
<li>
<p><strong>HttpRequest：</strong> 请求对象，<strong>Django 自动创建</strong> ，<strong>view 层</strong> 默认接收的第一个参数</p>
<ul>
<li><code v-pre>request``isinstance(request,HttpRequest)</code> 可检测</li>
<li><code v-pre>QueryDict</code> 对象，<code v-pre>GET/POST</code> 请求的实例化对象，处理 <strong>URL</strong> 的多个 <code v-pre>kv</code> 值</li>
</ul>
</li>
<li>
<p><strong>HttpResponse：</strong> 响应对象，<strong>view 层</strong> 需要 <strong>手动创建</strong> 返回</p>
</li>
</ul>
<p><a href="https://docs.djangoproject.com/zh-hans/4.1/ref/request-response/" target="_blank" rel="noopener noreferrer">属性 &amp; 方法<ExternalLinkIcon/></a> | <code v-pre>django.shortcuts</code>：<a href="https://docs.djangoproject.com/zh-hans/4.1/topics/http/shortcuts/" target="_blank" rel="noopener noreferrer">便捷函数<ExternalLinkIcon/></a> 快捷方式</p>
<p><strong>FBV</strong> 与 <strong>CBV</strong></p>
<h3 id="_2-2-urls" tabindex="-1"><a class="header-anchor" href="#_2-2-urls" aria-hidden="true">#</a> 2.2 urls</h3>
<p><a href="https://docs.djangoproject.com/zh-hans/4.1/topics/http/urls/" target="_blank" rel="noopener noreferrer">urls.py 文档<ExternalLinkIcon/></a></p>
<p>将 <strong>路由</strong> 和 <strong>视图</strong> 做映射绑定</p>
<ul>
<li>
<p>支持 <strong>函数</strong> 映射</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> account <span class="token keyword">import</span> views

urlpatterns <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token comment"># path(正则表达式, views视图函数，参数，别名)</span>
    path<span class="token punctuation">(</span><span class="token string">'admin/'</span><span class="token punctuation">,</span> admin<span class="token punctuation">.</span>site<span class="token punctuation">.</span>urls<span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token operator">+</span>    path<span class="token punctuation">(</span><span class="token string">'account/'</span><span class="token punctuation">,</span> views<span class="token punctuation">.</span>login<span class="token punctuation">,</span> name<span class="token operator">=</span><span class="token string">'account'</span><span class="token punctuation">)</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>支持 <strong>类</strong> 映射</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> account<span class="token punctuation">.</span>views <span class="token keyword">import</span> Account

<span class="token operator">+</span>    path<span class="token punctuation">(</span><span class="token string">'account/'</span><span class="token punctuation">,</span> Account<span class="token punctuation">.</span>as_view<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> name<span class="token operator">=</span><span class="token string">'account'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>支持 <strong>子路由</strong> 分发</p>
<ul>
<li>
<p>在 <code v-pre>account</code> 应用下创建 <code v-pre>urls.py</code> 文件，并写入路由</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> django<span class="token punctuation">.</span>urls <span class="token keyword">import</span> path

<span class="token keyword">from</span> <span class="token punctuation">.</span> <span class="token keyword">import</span> views

urlpatterns <span class="token operator">=</span> <span class="token punctuation">[</span>
    path<span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">,</span> views<span class="token punctuation">.</span>index<span class="token punctuation">,</span> name<span class="token operator">=</span><span class="token string">'index'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment"># name 起别名</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>项目的 <code v-pre>urls.py</code> 下引入</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 在应用下创建 urls.py 文件</span>
<span class="token keyword">from</span> django<span class="token punctuation">.</span>urls <span class="token keyword">import</span> include<span class="token punctuation">,</span> path

<span class="token operator">+</span>	path<span class="token punctuation">(</span><span class="token string">'account/'</span><span class="token punctuation">,</span> include<span class="token punctuation">(</span><span class="token string">'account.urls'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>路径 <code v-pre>path</code> 支持 <strong>正则</strong>、<strong>无/命名分组</strong></p>
</li>
<li>
<p>支持 <strong>额外字典参数</strong> ，在 <strong>view 层</strong> 可利用参数 <code v-pre>key值</code> 接收</p>
</li>
</ul>
<h3 id="_2-3-models" tabindex="-1"><a class="header-anchor" href="#_2-3-models" aria-hidden="true">#</a> 2.3 models</h3>
<p><a href="https://docs.djangoproject.com/zh-hans/4.1/topics/db/models/" target="_blank" rel="noopener noreferrer">models.py 文档<ExternalLinkIcon/></a> | <a href="">ORM 映射</a></p>
<p>定义应用的 <strong>数据模型</strong></p>
<ul>
<li>
<p>自动创建数据库</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ python manage.py makemigrations
$ python manage.py migrate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>异常时简单粗暴处理方式</p>
<ul>
<li>
<p><code v-pre>migrations</code> 目录下除<code v-pre>__init__.py</code> 外，全删掉</p>
</li>
<li>
<p>删库，之后再建个新库</p>
</li>
<li>
<p>再重复上述，自动创建数据库命令</p>
<blockquote>
<p>若出现 <code v-pre>expected str, bytes or os.PathLike object, not NoneType</code></p>
<ul>
<li>删除 <code v-pre>migrations</code> 文件夹</li>
<li>运行<code v-pre>python manage.py makemigrations</code> + <code v-pre>app_name</code></li>
</ul>
</blockquote>
</li>
</ul>
</li>
<li>
<p>清空数据库</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ python manage.py flush
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>创建管理后台超级用户</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ python manage.py createsuperuser
<span class="token comment">## Username (leave blank to use 'igarashi'): igarashi</span>
<span class="token comment">## Email address: igarashi@github.com</span>
<span class="token comment">## Password:</span>
<span class="token comment">## Password (again):</span>
<span class="token comment">## The password is too similar to the username.</span>
<span class="token comment">## Bypass password validation and create user anyway? [y/N]: y</span>
<span class="token comment">## Superuser created successfully.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_2-4-settings" tabindex="-1"><a class="header-anchor" href="#_2-4-settings" aria-hidden="true">#</a> 2.4 settings</h3>
<p><a href="https://docs.djangoproject.com/zh-hans/4.1/ref/settings/" target="_blank" rel="noopener noreferrer">settings.py 文档<ExternalLinkIcon/></a></p>
<p>定义项目配置</p>
<p>增加 <strong>APP</strong> 应用</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>INSTALLED_APPS <span class="token operator">=</span> <span class="token punctuation">[</span>										<span class="token comment"># 添加 APP 应用</span>
	<span class="token string">"django.contrib.staticfiles"</span><span class="token punctuation">,</span>						<span class="token comment"># 开发支持静态，见下文</span>
    <span class="token comment"># ...</span>
    <span class="token string">"uci.account"</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://docs.djangoproject.com/zh-hans/4.1/howto/static-files/" target="_blank" rel="noopener noreferrer">静态文件<ExternalLinkIcon/></a> 相关</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>TEMPLATES <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>										<span class="token comment"># 配置模板</span>

PROJECT_ROOT <span class="token operator">=</span> <span class="token string">"项目绝对路径"</span>

MEDIA_ROOT <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>PROJECT_ROOT<span class="token punctuation">,</span> <span class="token string">"media"</span><span class="token punctuation">)</span>		<span class="token comment"># 上传文件 - 绝对路径</span>
MEDIA_URL <span class="token operator">=</span> os<span class="token punctuation">.</span>environ<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">"MEDIA_URL"</span><span class="token punctuation">,</span> <span class="token string">"/media/"</span><span class="token punctuation">)</span>		<span class="token comment"># 上传应用的 - URL路径</span>

STATIC_ROOT <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>PROJECT_ROOT<span class="token punctuation">,</span> <span class="token string">"static"</span><span class="token punctuation">)</span>		<span class="token comment"># 静态文件 [部署] 的 - 绝对路径</span>
STATIC_URL <span class="token operator">=</span> os<span class="token punctuation">.</span>environ<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">"STATIC_URL"</span><span class="token punctuation">,</span> <span class="token string">"/static/"</span><span class="token punctuation">)</span>	<span class="token comment"># 静态文件应用的 - URL路径</span>
STATICFILES_DIRS <span class="token operator">=</span> <span class="token punctuation">[</span>									<span class="token comment"># 静态文件的 目录列表</span>
    <span class="token punctuation">(</span><span class="token string">"images"</span><span class="token punctuation">,</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>PROJECT_ROOT<span class="token punctuation">,</span> <span class="token string">"app_name"</span><span class="token punctuation">,</span> <span class="token string">"static"</span><span class="token punctuation">,</span> <span class="token string">"images"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token comment"># ...</span>
<span class="token punctuation">]</span>
<span class="token comment"># template can find file to "images/静态图片.png"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>开发环境</strong> 支持静态文件</p>
<ul>
<li>
<p>在 <code v-pre>urls.py</code> 下的 <code v-pre>urlpatterns</code> 增加应用</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> django<span class="token punctuation">.</span>contrib<span class="token punctuation">.</span>staticfiles<span class="token punctuation">.</span>views <span class="token keyword">import</span> serve

<span class="token keyword">if</span> settings<span class="token punctuation">.</span>DEBUG<span class="token punctuation">:</span>
    urlpatterns <span class="token operator">+=</span> static<span class="token punctuation">(</span><span class="token string">"/media/"</span><span class="token punctuation">,</span> document_root<span class="token operator">=</span>settings<span class="token punctuation">.</span>MEDIA_ROOT<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token punctuation">[</span>
            url<span class="token punctuation">(</span><span class="token string">r"^static/(?P&lt;path>.*)$"</span><span class="token punctuation">,</span> serve<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<p>部署时使用命令，将静态目录下所有文件拷贝到 <code v-pre>STATIC_ROOT</code> 目录</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ python manage.py collectstatic
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-5-数据库" tabindex="-1"><a class="header-anchor" href="#_2-5-数据库" aria-hidden="true">#</a> 2.5 数据库</h3>
<p><a href="/data-base/postgre-sql/postgresql%E5%9F%BA%E7%A1%80">PostgreSQL</a> 为例</p>
<p><a href="https://docs.djangoproject.com/zh-hans/4.1/ref/databases/#postgresql-notes" target="_blank" rel="noopener noreferrer">PostgreSQL - Django 文档<ExternalLinkIcon/></a> | <a href="https://www.psycopg.org/docs/install.html#quick-install" target="_blank" rel="noopener noreferrer">适配器 psycopg2<ExternalLinkIcon/></a></p>
<p>目前 <strong>Django v4.1</strong> 配套使用的还是 <code v-pre>psycopg2</code> ， 源码 <code v-pre>\django\db\backends\postgresql\base.py</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>pip <span class="token function">install</span> psycopg2-binary
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>未来或许会使用 <a href="https://www.psycopg.org/psycopg3/docs/index.html" target="_blank" rel="noopener noreferrer">适配器 psycopg3<ExternalLinkIcon/></a></p>
<ul>
<li>
<p>安装 <code v-pre>psycopg3</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>pip <span class="token function">install</span> <span class="token parameter variable">--upgrade</span> pip           <span class="token comment"># upgrade pip to at least 20.3</span>
pip <span class="token function">install</span> psycopg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>若在 <strong>Debian</strong> 上需要</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">apt</span> <span class="token function">install</span> libpq5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>安装连接池</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>pip <span class="token function">install</span> psycopg_pool
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<p><a href="https://docs.djangoproject.com/zh-hans/4.1/ref/settings/#std-setting-HOST" target="_blank" rel="noopener noreferrer">配置项 文档<ExternalLinkIcon/></a></p>
<p>更为便利的库 <code v-pre>dj-database-url</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>pip <span class="token function">install</span> dj-database-url
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>配置则更换为如下方式</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> dj_database_url

DATABASE_CONNECTION_DEFAULT_NAME <span class="token operator">=</span> <span class="token string">"default"</span>

DATABASES <span class="token operator">=</span> <span class="token punctuation">{</span>
    DATABASE_CONNECTION_DEFAULT_NAME<span class="token punctuation">:</span> dj_database_url<span class="token punctuation">.</span>config<span class="token punctuation">(</span>
        default<span class="token operator">=</span><span class="token string">"postgres://uci:uci@localhost:5432/uci"</span><span class="token punctuation">,</span> conn_max_age<span class="token operator">=</span><span class="token number">600</span>
    <span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_2-6-模板系统" tabindex="-1"><a class="header-anchor" href="#_2-6-模板系统" aria-hidden="true">#</a> <s>2.6 模板系统</s></h3>
<p>将 <strong>HTML</strong> 作为字符串，利用模板引擎，硬编码到 <strong>Django</strong> 视图，进行前后不分离的 <strong>SSR</strong> 渲染，如 <strong>Jinja</strong></p>
<p><a href="https://docs.djangoproject.com/zh-hans/4.1/topics/templates/" target="_blank" rel="noopener noreferrer">模板概述<ExternalLinkIcon/></a> | <a href="https://docs.djangoproject.com/zh-hans/4.1/ref/templates/language/" target="_blank" rel="noopener noreferrer">使用 &amp; 语法<ExternalLinkIcon/></a></p>
</div></template>


