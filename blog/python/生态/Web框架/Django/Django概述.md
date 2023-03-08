---
title: Django概述
date: 2020-03-1
category:
  - WEB框架
  - Django
tag:
  - WEB框架
  - Django
---

**Python Django Web** 框架的简要概述  

<!--more-->

[文档](https://docs.djangoproject.com/zh-hans) | [操作指南](https://docs.djangoproject.com/zh-hans/4.1/howto/) | [Github](https://github.com/django/django)

## 1. 初始化

### 1.1 安装

安装 **Django** 框架

```shell
$ pip install Django
```

### 1.2 创建项目

> 一个网站 **配置** 和 **应用** 的集合

```shell
# cd 到 uci-dashboard 项目文件夹
$ cd uci-dashboard

# 创建 Django 项目 uci
$ django-admin startproject uci .
```

- <span style="color: blue">django-admin.py：</span>用于管理任务的 **CLI** 工具

其目录结构如下

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



启动项目

```shell
$ python manage.py runserver # 0.0.0.0:8088
```

- <span style="color: blue">manage.py：</span>管理 **Django** 项目的 **CLI** 工具，是 `django-admin.py` 的简单包装

### 1.3 创建应用

> 应用是 **专做某件事** 的 网络应用程序，项目可以包含 **多个应用**

```shell
$ python manage.py startapp account
```

此时目录为

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

**MVC 模式：** 将 **Web** 应用 分为三层

- **视图**（_`View`层_）：页面交互
- **模型**（_`Model`层_）：构建数据模型
- **控制器**（_`Controller`层_）：处理业务逻辑

**MTV 模式：**

- 就是把 **View 层** 改为 **模板**（_`Template`层_） 上古时期用 `Jinjia` 模板搞 **SSR 渲染** ，后面前端崛起演变为前后端分离应用
- 把 **Controller 层** 改为 **View 层** 来处理业务逻辑
- 多了个 **url 映射器**（_路由_），用来分发请求给 **View 层** 处理

<img src="./img/MTV.png">

## 2. 应用指北

### 2.1 views

[views.py 文档](https://docs.djangoproject.com/zh-hans/4.1/topics/http/views/) | [异步视图](https://docs.djangoproject.com/zh-hans/4.1/topics/async/#async-views)

处理逻辑，类比 **MVC** 的 **Controller**（_控制层_），有两个核心对象，**请求** 与 **响应**

- **HttpRequest：** 请求对象，**Django 自动创建** ，**view 层** 默认接收的第一个参数

  - ` request``isinstance(request,HttpRequest) ` 可检测
  - `QueryDict` 对象，`GET/POST` 请求的实例化对象，处理 **URL** 的多个 `kv` 值

- **HttpResponse：** 响应对象，**view 层** 需要 **手动创建** 返回

[属性 & 方法](https://docs.djangoproject.com/zh-hans/4.1/ref/request-response/) | `django.shortcuts`：[便捷函数](https://docs.djangoproject.com/zh-hans/4.1/topics/http/shortcuts/) 快捷方式

**FBV** 与 **CBV**

### 2.2 urls

[urls.py 文档](https://docs.djangoproject.com/zh-hans/4.1/topics/http/urls/)

将 **路由** 和 **视图** 做映射绑定

- 支持 **函数** 映射

  ```python
  from account import views

  urlpatterns = [
      # path(正则表达式, views视图函数，参数，别名)
      path('admin/', admin.site.urls),
  +    path('account/', views.login, name='account')
  ]
  ```

- 支持 **类** 映射

  ```python
  from account.views import Account

  +    path('account/', Account.as_view(), name='account')
  ```

- 支持 **子路由** 分发

  - 在 `account` 应用下创建 `urls.py` 文件，并写入路由

    ```python
    from django.urls import path

    from . import views

    urlpatterns = [
        path('', views.index, name='index'), # name 起别名
    ]
    ```

  - 项目的 `urls.py` 下引入

    ```python
    # 在应用下创建 urls.py 文件
    from django.urls import include, path
  
    +	path('account/', include('account.urls'))
    ```

- 路径 `path` 支持 **正则**、**无/命名分组**

- 支持 **额外字典参数** ，在 **view 层** 可利用参数 `key值` 接收

### 2.3 models

[models.py 文档](https://docs.djangoproject.com/zh-hans/4.1/topics/db/models/) | [ORM 映射]()

定义应用的 **数据模型**

- 自动创建数据库

  ```shell
  $ python manage.py makemigrations
  $ python manage.py migrate
  ```

- 异常时简单粗暴处理方式

  - `migrations` 目录下除`__init__.py` 外，全删掉

  - 删库，之后再建个新库

  - 再重复上述，自动创建数据库命令

    > 若出现 `expected str, bytes or os.PathLike object, not NoneType`
    >
    > - 删除 `migrations` 文件夹
    > - 运行`python manage.py makemigrations` + `app_name`

- 清空数据库

  ```shell
  $ python manage.py flush
  ```

- 创建管理后台超级用户

  ```shell
  $ python manage.py createsuperuser
  ## Username (leave blank to use 'igarashi'): igarashi
  ## Email address: igarashi@github.com
  ## Password:
  ## Password (again):
  ## The password is too similar to the username.
  ## Bypass password validation and create user anyway? [y/N]: y
  ## Superuser created successfully.
  ```

### 2.4 settings

[settings.py 文档](https://docs.djangoproject.com/zh-hans/4.1/ref/settings/)

定义项目配置

增加 **APP** 应用

```python
INSTALLED_APPS = [										# 添加 APP 应用
	"django.contrib.staticfiles",						# 开发支持静态，见下文
    # ...
    "uci.account",
]
```

[静态文件](https://docs.djangoproject.com/zh-hans/4.1/howto/static-files/) 相关

```python
TEMPLATES = []										# 配置模板

PROJECT_ROOT = "项目绝对路径"

MEDIA_ROOT = os.path.join(PROJECT_ROOT, "media")		# 上传文件 - 绝对路径
MEDIA_URL = os.environ.get("MEDIA_URL", "/media/")		# 上传应用的 - URL路径

STATIC_ROOT = os.path.join(PROJECT_ROOT, "static")		# 静态文件 [部署] 的 - 绝对路径
STATIC_URL = os.environ.get("STATIC_URL", "/static/")	# 静态文件应用的 - URL路径
STATICFILES_DIRS = [									# 静态文件的 目录列表
    ("images", os.path.join(PROJECT_ROOT, "app_name", "static", "images")),
    # ...
]
# template can find file to "images/静态图片.png"
```

**开发环境** 支持静态文件

- 在 `urls.py` 下的 `urlpatterns` 增加应用

  ```python
  from django.contrib.staticfiles.views import serve
  
  if settings.DEBUG:
      urlpatterns += static("/media/", document_root=settings.MEDIA_ROOT) + [
              url(r"^static/(?P<path>.*)$", serve),
          ]
  ```

部署时使用命令，将静态目录下所有文件拷贝到 `STATIC_ROOT` 目录

```shell
$ python manage.py collectstatic
```

### 2.5 数据库

[PostgreSQL](/data-base/postgre-sql/postgresql基础) 为例

[PostgreSQL - Django 文档](https://docs.djangoproject.com/zh-hans/4.1/ref/databases/#postgresql-notes) | [适配器 psycopg2](https://www.psycopg.org/docs/install.html#quick-install)

目前 **Django v4.1** 配套使用的还是 `psycopg2` ， 源码 `\django\db\backends\postgresql\base.py`

```shell
pip install psycopg2-binary
```

未来或许会使用 [适配器 psycopg3](https://www.psycopg.org/psycopg3/docs/index.html)

- 安装 `psycopg3`

  ```shell
  pip install --upgrade pip           # upgrade pip to at least 20.3
  pip install psycopg
  ```

  若在 **Debian** 上需要

  ```shell
  apt install libpq5
  ```

- 安装连接池

  ```shell
  pip install psycopg_pool
  ```

[配置项 文档](https://docs.djangoproject.com/zh-hans/4.1/ref/settings/#std-setting-HOST)

更为便利的库 `dj-database-url`

```shell
pip install dj-database-url
```

- 配置则更换为如下方式

  ```python
  import dj_database_url
  
  DATABASE_CONNECTION_DEFAULT_NAME = "default"
  
  DATABASES = {
      DATABASE_CONNECTION_DEFAULT_NAME: dj_database_url.config(
          default="postgres://uci:uci@localhost:5432/uci", conn_max_age=600
      ),
  }
  ```

### ~~2.6 模板系统~~

将 **HTML** 作为字符串，利用模板引擎，硬编码到 **Django** 视图，进行前后不分离的 **SSR** 渲染，如 **Jinja**

[模板概述](https://docs.djangoproject.com/zh-hans/4.1/topics/templates/) | [使用 & 语法](https://docs.djangoproject.com/zh-hans/4.1/ref/templates/language/)
