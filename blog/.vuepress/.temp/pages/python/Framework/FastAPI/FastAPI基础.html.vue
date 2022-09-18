<template><div><h1 id="fastapi" tabindex="-1"><a class="header-anchor" href="#fastapi" aria-hidden="true">#</a> FastAPI</h1>
<p><a href="https://fastapi.tiangolo.com/" target="_blank" rel="noopener noreferrer">FastAPI 文档<ExternalLinkIcon/></a>| <a href="https://github.com/tiangolo/fastapi" target="_blank" rel="noopener noreferrer">GitHub<ExternalLinkIcon/></a></p>
<h2 id="fastapi-简介" tabindex="-1"><a class="header-anchor" href="#fastapi-简介" aria-hidden="true">#</a> FastAPI 简介</h2>
<h3 id="_1-特性" tabindex="-1"><a class="header-anchor" href="#_1-特性" aria-hidden="true">#</a> 1.特性：</h3>
<ul>
<li>快速：理论上媲美 nodeJS 和 GO</li>
<li>快速编码：效率提升 2~3 倍</li>
<li>更少错误：理论减少 40%</li>
<li>直观、简易、短、健壮</li>
<li>基于标准：完全兼容 API 的开放标准 openAPI &amp; JSON Schema</li>
</ul>
<h3 id="_2-层次结构" tabindex="-1"><a class="header-anchor" href="#_2-层次结构" aria-hidden="true">#</a> 2.层次结构</h3>
<p>FastAPI 是基于 Starlette 和 Uvicorn 的进一步封装</p>
<ul>
<li>
<p>Uvicorn: ASGI 服务器</p>
<ul>
<li>Starlette:（使用 Uvicorn）网络微框架
<ul>
<li>FastAPI:（使用 Starlette）具有多个附加功能的 API 微框架，用于构建 API 进行数据验证。</li>
</ul>
</li>
</ul>
</li>
<li>
<p>Uvicorn：</p>
<ul>
<li>将具有最佳性能，不会直接再 Uvicorn 中编写应用程序，Uvicorn 作为后台服务器，请与
Daphne、Hypercorn，uWSGI 类比</li>
</ul>
</li>
<li>
<p>Starlette：</p>
<ul>
<li>需要 Uvicorn 来运行，比它慢，但可以简单构建 web 应用，请与 Sanic、Flask、Django 类比</li>
</ul>
</li>
<li>
<p>FastAPI：</p>
<ul>
<li>与 Starlette 使用 Uvicorn 一样，需依赖 git，比它慢，但在 Starlette 上提供了更多功能，如
文档（方便数据验证和序列化），要是单用 Starlette 的话，开销和 FastAPI 无差。</li>
</ul>
</li>
</ul>
<h3 id="_3-可选依赖" tabindex="-1"><a class="header-anchor" href="#_3-可选依赖" aria-hidden="true">#</a> 3.可选依赖</h3>
<p>Pydantic：</p>
<ul>
<li>ujson：用于更快的 json 解析</li>
<li>email_validator：用于电子邮件验证</li>
</ul>
<h2 id="一、request-请求相关部分" tabindex="-1"><a class="header-anchor" href="#一、request-请求相关部分" aria-hidden="true">#</a> 一、Request 请求相关部分</h2>
<h3 id="_1-url-和-参数获取" tabindex="-1"><a class="header-anchor" href="#_1-url-和-参数获取" aria-hidden="true">#</a> 1.url 和 参数获取</h3>
<h4 id="_1-路径参数" tabindex="-1"><a class="header-anchor" href="#_1-路径参数" aria-hidden="true">#</a> （1）路径参数</h4>
<p>顾名思义，路径参数是传在路径上的参数，FastAPI 中接受一个路径参数如下：</p>
<pre><code>@app.get(&quot;/{item}&quot;)
async def foo(item: str):
    return {&quot;item&quot;: item}
</code></pre>
<ul>
<li>此时的 item 即可以直接获取到浏览器 / 后面的值，若 item 不是 str 类型的，则会报错</li>
</ul>
<h4 id="_2-get-请求参数" tabindex="-1"><a class="header-anchor" href="#_2-get-请求参数" aria-hidden="true">#</a> （2）get 请求参数：</h4>
<pre><code>@app.get(&quot;/items&quot;)
async def read_item(skip: int = 0, limit: int = 10):
    fake_data = [1, 2, 3, 4, 5]
    return fake_data[skip: limit]
</code></pre>
<ul>
<li>此时输入 get 请求：/items?skip=2&amp;limit=4 则会输出 fake_data 的 [3, 4]</li>
</ul>
<h4 id="_3-多路径参数与多查询参数混合" tabindex="-1"><a class="header-anchor" href="#_3-多路径参数与多查询参数混合" aria-hidden="true">#</a> （3）多路径参数与多查询参数混合：</h4>
<pre><code>@app.get(&quot;/usr/{user_id}/item/{item_id}&quot;)
async def foo(
        user_id: int, item_id: int, name: str, role: str
):
    return {&quot;user_id&quot;: user_id, &quot;item_id&quot;: item_id, &quot;name&quot;: name, &quot;role&quot;: role}
</code></pre>
<ul>
<li>
<p>此时输入 get 请求：/usr/100/item/233?name=ykb&amp;role=kr</p>
</li>
<li user_id:100,item_id:233,name:ykb,role:kr="">
<p>返回结果：</p>
</li>
</ul>
<h4 id="_4-request-类" tabindex="-1"><a class="header-anchor" href="#_4-request-类" aria-hidden="true">#</a> （4）Request 类：</h4>
<pre><code>from fastapi import Request

见Request 源码，即可获取对应方法
</code></pre>
<h3 id="_2-pydantic-fastapi-的-各种参数数据验证及数据模型" tabindex="-1"><a class="header-anchor" href="#_2-pydantic-fastapi-的-各种参数数据验证及数据模型" aria-hidden="true">#</a> 2.Pydantic &amp; FastAPI 的 各种参数数据验证及数据模型</h3>
<p>发送请求不能使用 GET 操作发送请求正文，要发送的数据通常都是以 POST、PUT、DELETE 或 PATCH 来发送</p>
<p>既然 API 会发送请求，那么后端则会对前端发来的请求进行校验，因此 FastAPi 用 Pydantic 作为一个校验数据的工具</p>
<h4 id="_1-继承-basemodal-构建数据模型" tabindex="-1"><a class="header-anchor" href="#_1-继承-basemodal-构建数据模型" aria-hidden="true">#</a> （1）继承 BaseModal 构建数据模型：</h4>
<p>通过继承 BaseModal 来创建你的校验数据模型：（它是个 Json 的格式类型）</p>
<pre><code>from pydantic import BaseModel

class Item(BaseModel):scheduler
    name: str
    description: str = None          # 带默认值，无默认值则为必填项
    price: float
    tax: float = None

@app.post(&quot;/{item_id}&quot;)
async def foo(item: Item):
    print(item.dict())
    return {&quot;item&quot;: item.dict()}
</code></pre>
<p>它会自动的去校验数据是否符合要求（这里只是简单的类型验证，生产环境中可以加更多规则）</p>
<ul>
<li>BaseModel 是 pydantic 的数据验证 model，而下文的数值验证则是 fastapi 的</li>
<li name:="" ykb,="" description:="" qweqweqw,="" price:="" 1.2,="" tax:="" 0.3="">返回结果：</li>
</ul>
<h4 id="_2-查询参数的数值验证" tabindex="-1"><a class="header-anchor" href="#_2-查询参数的数值验证" aria-hidden="true">#</a> （2）查询参数的数值验证：</h4>
<p>【好处】：以下所有数值验证的好处是为了更准确的数据验证而服务的、简化手写验证、方便、提高效率，参数基本上都是一套的</p>
<pre><code>from fastapi import Query

@app.get(&quot;/items&quot;)
# async def foo(q: str = Query(None, min_length=3, max_length=10)):
async def foo(q: str = Query(..., min_length=3, max_length=10)):
    return {&quot;param&quot;: q}
</code></pre>
<ul>
<li>
<p>Query 仅适用于 GET 请求上的参数验证，因为其他请求有 Body,<strong>并且 Query 和 Body 不同仅适用于校验单个参数，不能校验 BaseModel</strong></p>
</li>
<li>
<p>... 则表示此参数为必填项，若给值，则值为该参数的默认值</p>
</li>
<li>
<p>输入请求： /items?q=qwe 成功符合条件, 若不符合结果则会直接检测出并提示报错</p>
</li>
<li param:qwe="">
<p>则返回结果</p>
</li>
</ul>
<p>【其他参数】：</p>
<ul>
<li>alias=: str = &quot;&quot;: 起别名</li>
<li>title: str = &quot;&quot;: 起标题</li>
<li>description: str = &quot;&quot;: 写描述</li>
<li>gt: float = None, 仅用于数字，大于</li>
<li>ge: float = None, 仅用于数字，大于或等于</li>
<li>lt: float = None, 仅用于数字，大于</li>
<li>le: float = None, 仅用于数字，大于或等于</li>
<li>min_length: int = None, 仅用于字符串，最小长度</li>
<li>max_length: int = None, 仅用于字符串，最大长度</li>
<li>regex: str =&quot;^query$&quot;: 使用正则表达式</li>
<li>deprecated: bool =True: 当为 True 时表示已经弃用（为了在 OpenAPI 文档上给前端测试看）</li>
</ul>
<h4 id="_3-路径参数的数值验证" tabindex="-1"><a class="header-anchor" href="#_3-路径参数的数值验证" aria-hidden="true">#</a> （3）路径参数的数值验证：</h4>
<p>用于对路径参数的数据验证而服务，用法基本同上：</p>
<pre><code>from fastapi import Path

@app.get(&quot;/items/{item_id}&quot;)
async def foo(item_id: str = Path(..., min_length=3, max_length=10)):
    return {&quot;item_id&quot;: item_id}
</code></pre>
<h4 id="_4-请求体参数的数值验证" tabindex="-1"><a class="header-anchor" href="#_4-请求体参数的数值验证" aria-hidden="true">#</a> （4）请求体参数的数值验证</h4>
<p>用于对请求体的验证，包括但不限于 POST、PUT、DELETE 请求的请求体，用法同上差不多</p>
<pre><code>from fastapi import Body

@app.put(&quot;/items/{item_id}&quot;)
async def foo(
        item_id: int,
        name: str = Body(..., min_length=2, max_length=10),
        age: int = Body(..., gt=0, lt=140)
):
    return {&quot;item_id&quot;: item_id, &quot;name&quot;: name, &quot;age&quot;: age}
</code></pre>
<ul>
<li>若不用 Body 进行验证，赋值，则默认会当做查询参数（即 get 请求中 url 键值对）去处理</li>
</ul>
<p>【Body 的其他参数】</p>
<ul>
<li>
<p>embed: bool = False 默认值为 False，表示前端传入该 Body 结构不用传 key，直接传 value 即可
class Item(BaseModel):
name: str
description: str = None
price: float
tax: float = None</p>
<pre><code>  @app.put(&quot;/items&quot;)
  async def foo(
          item_id: int,
          item: Item = Body(..., embed=True),
  ):
      return {&quot;item&quot;: item}
</code></pre>
<p>当为 False，前端无需传 Body 的 key，直接传 value 即可被识别：
{
&quot;name&quot;: &quot;string&quot;,
&quot;description&quot;: &quot;string&quot;,
&quot;price&quot;: 0,
&quot;tax&quot;: 0
}</p>
<p>若 embed=True，此时 item 作为单独的键， 前端必须传 key，即传参写入 item 这个键，传入结构如下：
{
&quot;item&quot;: {
&quot;name&quot;: &quot;string&quot;,
&quot;age&quot;: 0,
&quot;description&quot;: &quot;string&quot;,
&quot;tax&quot;: 0
}
}
该参数在识别单个参数时常常有效（前端传入多个{key: value} 形式参数，后端却只要唯一的那个参数时，使用 True 可以有效识别）</p>
</li>
<li>
<p>media_type: str = &quot;application/json&quot;</p>
</li>
</ul>
<h4 id="_5-body-内字段-field-校验" tabindex="-1"><a class="header-anchor" href="#_5-body-内字段-field-校验" aria-hidden="true">#</a> （5）Body 内字段 Field 校验</h4>
<pre><code>from pydantic import Field

class Item(BaseModel):
    name: str = Field(..., title=&quot;名字&quot;, min_length=1)
    age: int = Field(..., multiple_of=12)
    description: str = Field(None, description=&quot;描述&quot;, max_length=10)
    tax: float = Field(None, lt=40.02, ge=10)


@app.put(&quot;/items/{item_id}&quot;)
async def foo(
        item_id: int,
        item: Item = Body(...,
                          embed=True,
                          example={
                              &quot;name&quot;: &quot;zz&quot;,
                              &quot;age&quot;: 24,
                              &quot;description&quot;: &quot;qwerty&quot;,
                              &quot;tax&quot;: 20.2
                          }),
):
    return {&quot;item_id&quot;: item_id, &quot;item&quot;: item}
</code></pre>
<p>Body 中若指定 example 参数并附带 与其校验类型键一致的字典时，会在 OpenAPI 文档的 Swagger 中初始化该值</p>
<p>从 pydantic 里面导入，额外字段有：</p>
<ul>
<li>multiple_of: float = None 仅用于数字，倍数</li>
<li>min_items: int = None 仅用于数字</li>
<li>max_items: int = None 仅用于数字</li>
</ul>
<h3 id="_6-嵌套数据模型" tabindex="-1"><a class="header-anchor" href="#_6-嵌套数据模型" aria-hidden="true">#</a> （6）嵌套数据模型：</h3>
<pre><code>from typing import List, Set, Dict
from pydantic import HttpUrl

class GameFile(BaseModel):
    path: HttpUrl
    name: str


class GameInfo(BaseModel):
    game_name: Set[str] = set()
    type2game: Dict[float, str] = dict()
    file_set: List[GameFile] = []


class Page(BaseModel):
    page: str
    game_info: GameInfo = None


@app.post(&quot;/game/{uuid}&quot;)
async def foo(
        uuid: HttpUrl,
        page: Page
):
    return {&quot;uuid&quot;: uuid, &quot;page&quot;: page}
</code></pre>
<ul>
<li>
<p>typing 是从 python3 的标准库中引入的</p>
</li>
<li>
<p>继承 BaseModel 的数据模型是可以进行套娃的，在上文 List 中同理</p>
</li>
<li>
<p>但不能再集合中指定： Set[GameFile] 则会报错 unhashable type 因为其不可哈希，且 FrozenSet 也不行，集合的要求值为不可变类型</p>
</li>
<li>
<p>集合的格式在 json 中也会被转成类数组的 [] 形式</p>
</li>
<li>
<p>HttpUrl: pydantic 自带的校验类型，pydantic 提供的校验类型很多，还涵盖了如 redis、postgres、email、ipv46 等等等</p>
</li>
</ul>
<p>【附录】：</p>
<ul>
<li>pydantic 的各种类型以及特殊类型 ：<a href="https://pydantic-docs.helpmanual.io/usage/types/" target="_blank" rel="noopener noreferrer">https://pydantic-docs.helpmanual.io/usage/types/<ExternalLinkIcon/></a></li>
</ul>
<h3 id="_7-额外的数据校验类型" tabindex="-1"><a class="header-anchor" href="#_7-额外的数据校验类型" aria-hidden="true">#</a> （7） 额外的数据校验类型</h3>
<p><a href="https://fastapi.tiangolo.com/tutorial/extra-data-types/" target="_blank" rel="noopener noreferrer">https://fastapi.tiangolo.com/tutorial/extra-data-types/<ExternalLinkIcon/></a></p>
<p>除了上文的校验类型，FastAPI 还提供如 UUID、datetime 等等类型</p>
<pre><code>from uuid import UUID
from uuid import uuid1
from datetime import datetime, time, timedelta

@app.put(&quot;/pd_node/{uuid}&quot;)
async def foo(
        uuid: UUID,
        start_datetime: datetime = Body(None),
        end_datetime: datetime = Body(None),
        repeat_at: time = Body(None),
        process_after: timedelta = Body(None),


):
    start_process = start_datetime + process_after
    duration = end_datetime - start_process
    return {
        &quot;uuid&quot;: uuid,
        &quot;start_datetime&quot;: start_datetime,
        &quot;end_datetime&quot;: end_datetime,
        &quot;repeat_at&quot;: repeat_at,
        &quot;process_after&quot;: process_after,
        &quot;duration&quot;: duration,
    }

print(f'uuid: {uuid1()}')
</code></pre>
<p>貌似 uuid 这里是提供了 5 种类型，输入参数时可以先用 uuid1()来构造一个 uuid 打印出来</p>
<ul>
<li>
<p>但建议选择 uuid.uuid4().hex 形式，这样可以拿到字符串类型的 uuid</p>
</li>
<li>
<p>可输入参数：
68a4bb24-9dc3-11ea-bf01-701ce72d7e03</p>
<pre><code>  {
    &quot;start_datetime&quot;: &quot;2020-05-24T13:35:24.999Z&quot;,
    &quot;end_datetime&quot;: &quot;2020-05-24T13:35:24.999Z&quot;,
    &quot;repeat_at&quot;: &quot;0:00&quot;,
    &quot;process_after&quot;: 0
  }
</code></pre>
</li>
</ul>
<h3 id="_8-cookie-校验类型" tabindex="-1"><a class="header-anchor" href="#_8-cookie-校验类型" aria-hidden="true">#</a> （8）Cookie 校验类型</h3>
<pre><code>from fastapi import Cookie

@app.get(&quot;/cookie&quot;)
async def foo(
        *,
        cookie_info: str = Cookie(None)

):
    return {&quot;cookie_info&quot;: cookie_info}
</code></pre>
<ul>
<li>
<p>需要 F12 Application 中 添加字段 cookie_info: &quot;内容&quot; 然后发送请求即可</p>
</li>
<li>
<p>该参数用于对 Cookie 里面的值进行校验</p>
</li>
</ul>
<h3 id="_9-header-校验类型" tabindex="-1"><a class="header-anchor" href="#_9-header-校验类型" aria-hidden="true">#</a> （9）Header 校验类型</h3>
<p>Header 用于校验头部信息，和 Cookie 类型，一样能获取到头部的各种关键字及信息</p>
<pre><code>from fastapi import Header

@app.get(&quot;/header&quot;)
async def foo(
        *,
        header_info: str = Header(None),
        user_agent: str = Header(None),
        x_token: str = Header(None),

):
    return {&quot;header_info&quot;: header_info, &quot;user_agent&quot;: user_agent, &quot;x_token&quot;: x_token}
</code></pre>
<ul>
<li>
<p>该参数和 Cookie 不同，可以使用 Swagger 来进行输入</p>
</li>
<li>
<p>user_agent 这个参数，系统默认会返回 User-Agent 关键字，若要区分，可换个名字</p>
</li>
<li>
<p>若添加 x_token 参数，则系统会默认转化为 x-token 关键字（F12 头显示），因为 py 中-是不符合代码风格写的写法，因此会进行适当转化
若该前缀为列表，则会显示为 &quot;fff, xxx&quot; 的格式</p>
</li>
</ul>
<h2 id="二、response-响应相关部分" tabindex="-1"><a class="header-anchor" href="#二、response-响应相关部分" aria-hidden="true">#</a> 二、Response 响应相关部分</h2>
<h3 id="_1-响应模型" tabindex="-1"><a class="header-anchor" href="#_1-响应模型" aria-hidden="true">#</a> 1.响应模型：</h3>
<h4 id="_1-response-model" tabindex="-1"><a class="header-anchor" href="#_1-response-model" aria-hidden="true">#</a> （1）response_model</h4>
<pre><code>class UserIn(BaseModel):
    username: str
    password: str
    age: int = None
    email: EmailStr = None


class UserOut(BaseModel):
    username: str
    age: int = None
    email: EmailStr = None


@app.post(&quot;/user&quot;, response_model=UserOut)
async def foo(item: UserIn):
    return item
</code></pre>
<ul>
<li>
<p>response_model： 用于指定返回的响应模型，则响应必须按照指定的类型返回</p>
</li>
<li>
<p>在响应中，为了安全性，注意禁止携带密码</p>
</li>
<li>
<p>若 EmailStr 报错，请使用命令： pip3 install pydantic[email] 进行安装</p>
</li>
</ul>
<h4 id="_2-给-model-数据赋初值-对返回值进行字段过滤" tabindex="-1"><a class="header-anchor" href="#_2-给-model-数据赋初值-对返回值进行字段过滤" aria-hidden="true">#</a> （2）给 model 数据赋初值 &amp; 对返回值进行字段过滤：</h4>
<pre><code>class Item(BaseModel):
    name: str
    # name: str = Field(..., example=&quot;ykb&quot;)
    age: int
    price: float = None
    tag: List[str] = []

    class Config:
    schema_extra = {
        &quot;example&quot;: {
            &quot;name&quot;: &quot;Foo&quot;,
            &quot;description&quot;: &quot;A very nice Item&quot;,
            &quot;price&quot;: 35.4,
            &quot;tax&quot;: [&quot;z, f&quot;],
        }
    }

items = {
    &quot;foo&quot;: {&quot;name&quot;: &quot;zz&quot;, &quot;age&quot;: 24, &quot;price&quot;: 20.2},
    &quot;bar&quot;: {&quot;name&quot;: &quot;ykb&quot;, &quot;age&quot;: 23, &quot;tag&quot;: [&quot;z&quot;, &quot;f&quot;, &quot;kw&quot;]},
    &quot;baz&quot;: {&quot;name&quot;: &quot;zxy&quot;, &quot;age&quot;: 23, &quot;price&quot;: 20.2, &quot;tag&quot;: [&quot;z&quot;, &quot;f&quot;, &quot;kw&quot;]},
}


@app.post(&quot;/items/{item_id}&quot;, response_model=Item, response_model_exclude_unset=True)
async def foo(item_id: str):
    return items[item_id]


@app.post(&quot;/items/{item_id}/public&quot;, response_model=Item, response_model_exclude={&quot;tag&quot;})
async def bar(item_id: str):
    return items[item_id]

@app.post(&quot;/items/{item_id}/protect&quot;, response_model=Item, response_model_include=[&quot;name&quot;, &quot;price&quot;])
async def baz(item_id: str):
    return items[item_id]
</code></pre>
<ul>
<li>
<p>schema_extra 我们可以给 Model 进行赋初值，类型 mock 数据一样，即假装将数据库的数据取出来返回，这是是通过输入路径参数来返回不同的值</p>
<ul>
<li>在 Model 下 创建 Config 类， 通过 schema_extra = { example={ } } 形式，便可以对模型设置文档中真正的例子</li>
<li>或是添加附加参数 example=&quot;value&quot; 也可以在文档中生成例子</li>
<li>但以上的额外参数，fastapi 不会进行校验认证，若 schema_extra 和 example 同时存在，schema_extra 优先级更高</li>
</ul>
</li>
<li>
<p>response_model_exclude_unset 当设置为 True 时则表示若该值不是必须值（即带有默认值），则能在返回结果中去除（若在数据中未取到的话）</p>
</li>
<li>
<p>response_model_exclude 当设置某个 {&quot;字段&quot;} 时，则表示 返回是会自动去除该值的返回。</p>
<ul>
<li>注意：若去除字段是必须的，response_model_exclude 只能过滤去掉值，但不意味着该必填的字段可以没有值传入，必填的校验是不会省的</li>
</ul>
</li>
<li>
<p>response_model_include 当设置某些 [&quot;字段 1&quot;, &quot;字段 2&quot;] 时，则表示 返回值只包括设定的值。</p>
</li>
</ul>
<h4 id="_3-模型的额外操作" tabindex="-1"><a class="header-anchor" href="#_3-模型的额外操作" aria-hidden="true">#</a> （3）模型的额外操作 ：</h4>
<pre><code>class UserIn(BaseModel):
    username: str
    password: str
    email: EmailStr
    full_name: str = None


class UserOut(BaseModel):
    username: str
    email: EmailStr
    full_name: str = None


class UserInDB(BaseModel):
    username: str
    hashed_password: str
    email: EmailStr
    full_name: str = None


def fake_password_hasher(raw_password: str):
    return &quot;supersecret&quot; + raw_password


def fake_save_user(user_in: UserIn):
    hashed_password = fake_password_hasher(user_in.password)
    user_in_db = UserInDB(**user_in.dict(), hashed_password=hashed_password)
    print(&quot;User saved! ..not really&quot;, user_in_db)
    return user_in_db


@app.post(&quot;/user/&quot;, response_model=UserOut)
async def create_user(*, user_in: UserIn):
    user_saved = fake_save_user(user_in)
    return user_saved
</code></pre>
<ul>
<li>
<p>输入模型利用 UserIn, 经过 UserInDB 将密码哈希转化，然后利用 UserOut 进行格式化输出</p>
</li>
<li>
<p>该例子证明 继承了 BaseModel 的模型 只要字段类型一致，就可以相互替换及嵌套</p>
</li>
<li>
<p><strong>user_in.dict()：将 UserIn 类 即 Pydantic 派生出的对象模型用.dict()进行字典化，python 会对</strong>进行解包，因此当传入 UserInDB 数据模型，
BaseModel 可以接收字典并进行合理的解析 变为 =&gt; username = user_dict[&quot;username&quot;] ... 形式</p>
</li>
</ul>
<h5 id="利用基类减少重复-fastapi-核心思想之一" tabindex="-1"><a class="header-anchor" href="#利用基类减少重复-fastapi-核心思想之一" aria-hidden="true">#</a> 利用基类减少重复（FastAPI 核心思想之一）：</h5>
<pre><code>class UserBase(BaseModel):
    username: str
    email: EmailStr
    full_name: str = None


class UserIn(UserBase):
    password: str


class UserOut(UserBase):
    pass


class UserInDB(UserBase):
    hashed_password: str
</code></pre>
<ul>
<li>为了简化：可以定义出某些共有的基类，然后继承即可使代码简化</li>
</ul>
<h5 id="使用-union-灵活输出" tabindex="-1"><a class="header-anchor" href="#使用-union-灵活输出" aria-hidden="true">#</a> 使用 Union 灵活输出</h5>
<pre><code>from typing import Union

class BaseItem(BaseModel):
    description: str
    type: str


class CarItem(BaseItem):
    type = &quot;car&quot;


class PlaneItem(BaseItem):
    type = &quot;plane&quot;
    size: int


items = {
    &quot;item1&quot;: {&quot;description&quot;: &quot;All my friends drive a low rider&quot;, &quot;type&quot;: &quot;car&quot;},
    &quot;item2&quot;: {
        &quot;description&quot;: &quot;Music is my aeroplane, it's my aeroplane&quot;,
        &quot;type&quot;: &quot;plane&quot;,
        &quot;size&quot;: 5,
    },
}


@app.get(&quot;/items/{item_id}&quot;, response_model=Union[PlaneItem, CarItem])
async def read_item(item_id: str):
    return items[item_id]
</code></pre>
<ul>
<li>
<p>注意该案例中 Union[PlaneItem, CarItem]，表示可是按需输出 PlaneItem 数据模型或是 CarItem 数据模型</p>
</li>
<li>
<p>BaseItem 表示可以用父类，将输出的数据模型的部分共有属性提取出来，就比较灵活多用</p>
</li>
</ul>
<h5 id="可指定-list-输出" tabindex="-1"><a class="header-anchor" href="#可指定-list-输出" aria-hidden="true">#</a> 可指定 List 输出</h5>
<pre><code>from typing import List

class Item(BaseModel):
    name: str
    description: str


items = [
    {&quot;name&quot;: &quot;Foo&quot;, &quot;description&quot;: &quot;There comes my hero&quot;},
    {&quot;name&quot;: &quot;Red&quot;, &quot;description&quot;: &quot;It's my aeroplane&quot;},
]


@app.get(&quot;/items/&quot;, response_model=List[Item])
async def read_items():
    return items
</code></pre>
<ul>
<li>即返回值可以使用 List + 自定义的 Model 模型</li>
</ul>
<h5 id="可指定-dict-输出" tabindex="-1"><a class="header-anchor" href="#可指定-dict-输出" aria-hidden="true">#</a> 可指定 Dict 输出</h5>
<pre><code>from typing import Dict

@app.get(&quot;/keyword-weights/&quot;, response_model=Dict[str, float])
async def read_keyword_weights():
    return {&quot;foo&quot;: 2.3, &quot;bar&quot;: 3.4}
</code></pre>
<ul>
<li>返回值可以用 Dict(str, float) 没什么好说的</li>
</ul>
<h4 id="_4-返回状态码" tabindex="-1"><a class="header-anchor" href="#_4-返回状态码" aria-hidden="true">#</a> （4）返回状态码</h4>
<p>可在这里查阅 HTTP 状态码：<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status" target="_blank" rel="noopener noreferrer">https://developer.mozilla.org/en-US/docs/Web/HTTP/Status<ExternalLinkIcon/></a></p>
<pre><code>@app.post(&quot;/items/&quot;, status_code=201)
async def create_item(name: str):
    return {&quot;name&quot;: name}
</code></pre>
<ul>
<li name:name="">
<p>可以在装饰器中 status_code 参数直接指定 http 响应码</p>
<p>from fastapi import FastAPI, status</p>
<p>@app.post(&quot;/items/&quot;, status_code=status.HTTP_201_CREATED)
async def create_item(name: str):
return</p>
</li>
<li>
<p>也可以使用便捷变量 fastapi.status 来直接获取到对应的状态码</p>
</li>
<li>
<p>若因版本而报错，请使用： from starlette import status 导入</p>
</li>
</ul>
<h4 id="_5-错误处理" tabindex="-1"><a class="header-anchor" href="#_5-错误处理" aria-hidden="true">#</a> （5）错误处理</h4>
<p>许多情况下，需要将错误返回给客户端，若都如上返回状态码的形式返回错误，在开发中其实并不合适</p>
<pre><code>from fastapi import HTTPException, status

items = {&quot;foo&quot;: &quot;The Foo Wrestlers&quot;}

@app.get(&quot;/items-header/{item_id}&quot;)
async def read_item_header(item_id: str):
    if item_id not in items:
        raise HTTPException(
            status_code=404,
            detail=&quot;Item not found&quot;,
            headers={&quot;X-Error&quot;: &quot;There goes my error&quot;},
        )
    return {&quot;item&quot;: items[item_id]}
</code></pre>
<ul>
<li>
<p>此时返回值形式如下：可以返回错误的自定义细节
{
&quot;detail&quot;: &quot;Item not found&quot;
}</p>
</li>
<li>
<p>raise: 通常抛出异常都应该用此形式，会直接抛出而省去执行后续代码</p>
</li>
<li>
<p>headers：设置返回头部信息，RequestHeader 中会添加：x-error: There goes my error</p>
</li>
</ul>
<h5 id="使用自定义异常处理程序" tabindex="-1"><a class="header-anchor" href="#使用自定义异常处理程序" aria-hidden="true">#</a> 使用自定义异常处理程序</h5>
<pre><code>from fastapi.responses import JSONResponse

class UnicornException(Exception):
    def __init__(self, name: str):
        self.name = name


@app.exception_handler(UnicornException)
async def unicorn_exception_handler(request: Request, exc: UnicornException):
    return JSONResponse(
        status_code=418,
        content={&quot;message&quot;: f&quot;Oops! {exc.name} did something. There goes a rainbow...&quot;},
    )


@app.get(&quot;/unicorns/{name}&quot;)
async def read_unicorn(name: str):
    if name == &quot;yolo&quot;:
        raise UnicornException(name=name)
    return {&quot;unicorn_name&quot;: name}
</code></pre>
<ul>
<li>
<p>1.先自定义一个 UnicornException， 作为一个常见错误的基类</p>
</li>
<li>
<p>2.exception_handler：基于 Starlette 类, 传入 exc_class 类或 status_code 状态码，最后返回了一个回调类型 Callable</p>
</li>
<li>
<p>3.因此传入 UnicornException 异常类，exception_handler 是个装饰在 unicorn_exception_handler 前的装饰器，里面 func 却是个回调类型
（即 unicorn_exception_handler 作为<strong>回调函数</strong>）相当于传入参数异常类，并加了个回调函数一起执行后返回结果</p>
</li>
<li>
<p>除了返回错误码 418 之外，还返回了 content 里面的信息如下形式:
{
&quot;message&quot;: &quot;Oops! yolo did something. There goes a rainbow...&quot;
}</p>
</li>
</ul>
<h5 id="覆盖框架默认的异常处理程序" tabindex="-1"><a class="header-anchor" href="#覆盖框架默认的异常处理程序" aria-hidden="true">#</a> 覆盖框架默认的异常处理程序</h5>
<p>fastapi 处理器都是默认返回 JSON 响应的，可以对框架默认的 raise http 异常 进行覆盖，进行自定义改写</p>
<pre><code>from fastapi import HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.responses import PlainTextResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

@app.exception_handler(StarletteHTTPException)  # 重写HTTPException 错误处理的程序

async def http_exception_handler(request, exc):
    return PlainTextResponse(str(exc.detail), status_code=exc.status_code)

@app.exception_handler(RequestValidationError)  # 请求验证的异常
async def validation_exception_handler(request, exc):
    return PlainTextResponse(str(exc), status_code=400)


@app.get(&quot;/items/{item_id}&quot;)
async def read_item(item_id: int):
    if item_id == 3:
        raise HTTPException(status_code=418, detail=&quot;Nope! I don't like 3.&quot;)
    return {&quot;item_id&quot;: item_id}
</code></pre>
<ul>
<li>
<p>RequestValidationError：Pydantic 的子类 ValidationError，框架默认的 验证数值 异常</p>
</li>
<li>
<p>StarletteHTTPException：框架默认的 Http 请求 异常</p>
</li>
<li>
<p>此时转到 /items/foo 路径下，会得到上文覆盖的另一个结果
1 validation error for Request
path -&gt; item_id
value is not a valid integer (type=type_error.integer)</p>
</li>
<li>
<p>PlainTextResponse： 利用该函数将请求异常和验证异常进行改写</p>
<ul>
<li>若此时转到 /items/foo，则显示如下
1 validation error for Request
path -&gt; item_id
value is not a valid integer (type=type_error.integer)</li>
</ul>
</li>
<li>
<p>这样做的一部分原因是，若验证出错，常理来说用户应该看不见内部错误信息，免得暴露出安全漏洞给到用户</p>
</li>
</ul>
<h5 id="使用-requestvalidationerror-body" tabindex="-1"><a class="header-anchor" href="#使用-requestvalidationerror-body" aria-hidden="true">#</a> 使用 RequestValidationError body</h5>
<pre><code>@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=jsonable_encoder({&quot;detail&quot;: exc.errors(), &quot;body&quot;: exc.body}),
    )


class Item(BaseModel):
    title: str
    size: int


@app.post(&quot;/items/&quot;)
async def create_item(item: Item):
    return item
</code></pre>
<ul>
<li>
<p>与上文相同，通过回调的方式将错误传入，当发生 ValidationError 验证错误时，会自行执行 return 后的代码，把 detail 和 body 返回了</p>
</li>
<li>
<p>exc.body：该参数可以获取到 post 请求输入的实际参数</p>
</li>
<li>
<p>fastapi 和 starlette 都有自己的 HTTPException，但区别在于 Fastapi 中多了一个头部的响应信息可以传入，OAuth2.0 安全相关可能会用到</p>
</li>
</ul>
<h4 id="_6-表单数据" tabindex="-1"><a class="header-anchor" href="#_6-表单数据" aria-hidden="true">#</a> （6）表单数据：</h4>
<pre><code>from fastapi import FastAPI, Form

@app.post(&quot;/login/&quot;)
async def login(*, username: str = Body(...), password: str = Body(...)):
    return {&quot;username&quot;: username}
</code></pre>
<ul>
<li>
<p>Form 表单其实要通过前端 Form 表单来体现才正常，用 OpenAPI 文档很难体现</p>
</li>
<li>
<p>注意 username 和 password 变量，一定要跟表单中 input 里面的 name 参数一致，且/login/ 要和表单中的 action 一致，post 和 method 一致</p>
</li>
</ul>
<h4 id="_7-文件传输" tabindex="-1"><a class="header-anchor" href="#_7-文件传输" aria-hidden="true">#</a> （7）文件传输</h4>
<pre><code>from fastapi import FastAPI, File, UploadFile


@app.post(&quot;/files/&quot;)
async def create_file(file: bytes = File(...)):
    return {&quot;file_size&quot;: len(file)}


@app.post(&quot;/uploadfile/&quot;)
async def create_upload_file(file: UploadFile = File(...)):
    return {&quot;filename&quot;: file.filename}
</code></pre>
<ul>
<li>
<p>导入 File，用于接收文件相关参数，可以拿到文件对象的各种属性，比如文件名、文件长度等等</p>
</li>
<li>
<p>注意</p>
<ul>
<li>文件下载类型是 bytes, 文件上传则是 UploadFile，若请求中不传文件则会报错</li>
</ul>
</li>
</ul>
<h5 id="在同一个请求中使用上传和下载" tabindex="-1"><a class="header-anchor" href="#在同一个请求中使用上传和下载" aria-hidden="true">#</a> 在同一个请求中使用上传和下载：</h5>
<pre><code>@app.post(&quot;/files/&quot;)
async def create_file(
    file: List[bytes] = File(...), fileb: UploadFile = File(...), token: str = Form(...)
):
    return {
        &quot;file_size&quot;: len(file),
        &quot;token&quot;: token,
        &quot;fileb_content_type&quot;: fileb.content_type,
    }
</code></pre>
<ul>
<li>
<p>使用 List 可以上传多个文件，表单和文件可以进行混合</p>
</li>
<li>
<p>注意：可以声明 File 和 Form 参数，但是不能声明 希望以 JSON 形式接收的字段，因为若声明了，请求的编码就有问题了，编码的主体会进行替换：
Body multipart/form-data application/json，不是 FastAPI 做的限制 ，而是 HTTP 协议规定的</p>
</li>
</ul>
<h5 id="文件-大文件下载" tabindex="-1"><a class="header-anchor" href="#文件-大文件下载" aria-hidden="true">#</a> 文件&amp;大文件下载</h5>
<p>上述下载不算是下载，因为实际返回的还是个字典，正常下载应返回指定的文件对象：</p>
<pre><code>import pathlib

@app.get(&quot;/download_file&quot;)
async def download_file(file_name: str):
    path = pathlib.Path(pathlib.Path(__file__).joinpath(&quot;..&quot;)).resolve()
    file_path = f&quot;{path}\{file_name + '.txt'}&quot;

    if pathlib.Path(file_path).exists():
        return FileResponse(file_path)

    raise Exception
</code></pre>
<ul>
<li>FileResponse(path,status_code,media_type,background...): 返回文件响应对象,path 为本地文件路径,需要安装 aiofiles 库才可以使用,
由于有 background 参数，那么可以使用自定义的后台异步任务函数（参考后文后台任务功能）</li>
</ul>
<p>若文件过大，则可以考虑返回流对象：</p>
<pre><code># 定义一个异步生成器
async def slow_numbers(minimum, maximum):
    yield ('&lt;html&gt;&lt;body&gt;&lt;ul&gt;')
    for number in range(minimum, maximum + 1):
        yield '&lt;li&gt;%d&lt;/li&gt;' % number
        await asyncio.sleep(0.5)
    yield ('&lt;/ul&gt;&lt;/body&gt;&lt;/html&gt;')


@app.get(&quot;/download_stream_file&quot;)
async def get_stream_file():
    generator = slow_numbers(1, 10)  # 获取生成器
    return StreamingResponse(generator, media_type='text/html')
</code></pre>
<ul>
<li>StreamingResponse：流响应，该对象可以使用异步生成器、普通生成器、可迭代对象(包括文件和 BytesIO,StringIO 等类文件对象)作为响应
主体，从而实现大文件的传输操作。</li>
</ul>
<p>【注意】：大文件推荐用流 StreamingResponse， 配置文件加入 capture_output = True（待验证）</p>
<h4 id="_8-json-兼容编码" tabindex="-1"><a class="header-anchor" href="#_8-json-兼容编码" aria-hidden="true">#</a> （8）JSON 兼容编码</h4>
<pre><code>from datetime import datetime
from fastapi.encoders import jsonable_encoder

fake_db = {}

class Item(BaseModel):
    title: str
    timestamp: datetime
    description: str = None

@app.put(&quot;/items/{id}&quot;)
def update_item(id: str, item: Item):
    json_compatible_item_data = jsonable_encoder(item)
    fake_db[id] = json_compatible_item_data
    print(json_compatible_item_data, type(json_compatible_item_data))
    print(fake_db, type(fake_db))
</code></pre>
<ul>
<li>
<p>注意 datatime 是 python 的格式，那么正常的 json 怎么会有 datatime 格式呢，因此应该去转换。</p>
</li>
<li>
<p>jsonable_encoder()：可以通过兼容编码器来将其他格式转为 json 格式，比如上文的 datetime</p>
</li>
<li>
<p>但其实目前来看，即使不用 jsonable_encoder 来转换，内部自己把&lt;class 'api.Item'&gt;类进行自动转换</p>
</li>
</ul>
<h4 id="_9-body-的更新" tabindex="-1"><a class="header-anchor" href="#_9-body-的更新" aria-hidden="true">#</a> （9）Body 的更新</h4>
<h5 id="利用-put-进行数据更新" tabindex="-1"><a class="header-anchor" href="#利用-put-进行数据更新" aria-hidden="true">#</a> 利用 put 进行数据更新：</h5>
<pre><code>class Item(BaseModel):
    name: str = None
    description: str = None
    price: float = None
    tax: float = 10.5
    tags: List[str] = []


items = {
    &quot;foo&quot;: {&quot;name&quot;: &quot;Foo&quot;, &quot;price&quot;: 50.2},
    &quot;bar&quot;: {&quot;name&quot;: &quot;Bar&quot;, &quot;description&quot;: &quot;The bartenders&quot;, &quot;price&quot;: 62, &quot;tax&quot;: 20.2},
    &quot;baz&quot;: {&quot;name&quot;: &quot;Baz&quot;, &quot;description&quot;: None, &quot;price&quot;: 50.2, &quot;tax&quot;: 10.5, &quot;tags&quot;: []},
}


@app.get(&quot;/items/{item_id}&quot;, response_model=Item)
async def read_item(item_id: str):
    return items[item_id]


@app.put(&quot;/items/{item_id}&quot;, response_model=Item)
async def update_item(item_id: str, item: Item):
    update_item_encoded = jsonable_encoder(item)
    items[item_id] = update_item_encoded
    return update_item_encoded
</code></pre>
<ul>
<li>老实讲，item 若是不转换，是不能赋值给字典的，这时候就体现出 jsonable_encoder 的用处了，但其实用 dict(item) 类型转换也一样，</li>
</ul>
<h5 id="利用-patch-进行局部更新" tabindex="-1"><a class="header-anchor" href="#利用-patch-进行局部更新" aria-hidden="true">#</a> 利用 patch 进行局部更新</h5>
<p>其余代码和上文相同，仅仅替换了上文 put 部分</p>
<pre><code>@app.patch(&quot;/items/{item_id}&quot;, response_model=Item)
async def update_item(item_id: str, item: Item):
    stored_item_data = items[item_id]
    stored_item_model = Item(**stored_item_data)
    update_data = item.dict(exclude_unset=True)
    updated_item = stored_item_model.copy(update=update_data)
    items[item_id] = jsonable_encoder(updated_item)
    return updated_item
</code></pre>
<ul>
<li>
<p>Item(**stored_item_data)：把 items 获取的某一条数据传入 Item 类，它会自动解析对应赋值,但传入{'name': 'Foo', 'price': 50.2}，
解析后会附带 Item 类的默认值，为： stored_item_model name='Foo' description=None price=50.2 tax=10.5 tags=[] 这些</p>
</li>
<li>
<p>item.dict()：继承 BaseModel 的类，带有 dict 方法，可以进行一个字典型的转换。</p>
</li>
<li>
<p>exclude_unset=True：它和之前的 response_model_exclude_unset 类似，会将 Item 类中没有赋值的字段给过滤掉</p>
</li>
<li>
<p>.copy()：可以 copy 出一个 Item 副本，这里 copy 出的是 stored_item_model，上文解析后带默认值的</p>
</li>
<li>
<p>update 用于将 Model 进行更新的参数，会将同样的键进行更新，实打实的更新</p>
</li>
<li>
<p>这个例子特别乱，其实就是为了让我们知道，这玩意可以更新的这么另类</p>
</li>
</ul>
<h2 id="fastapi-相关配置" tabindex="-1"><a class="header-anchor" href="#fastapi-相关配置" aria-hidden="true">#</a> FastAPi 相关配置</h2>
<h3 id="_1-静态文件的路径导入" tabindex="-1"><a class="header-anchor" href="#_1-静态文件的路径导入" aria-hidden="true">#</a> 1.静态文件的路径导入：</h3>
<p>需要使用 app.mount(路径名, StaticFiles())来导入路径，之后的访问都会以此静态路径为准，原来访问的路径则会失效</p>
<pre><code>from fastapi.staticfiles import StaticFiles

root_path = os.path.abspath(os.path.join(os.path.dirname(__file__)))
sys.path.insert(0, root_path)
app.mount(&quot;/&quot;, StaticFiles(directory=os.path.join(root_path, &quot;static&quot;)), name=&quot;static&quot;)
</code></pre>
<h3 id="_2-fastapi-启用热更新" tabindex="-1"><a class="header-anchor" href="#_2-fastapi-启用热更新" aria-hidden="true">#</a> 2.fastapi 启用热更新：</h3>
<pre><code>uvicorn.run(app=&quot;main:app&quot;, host='127.0.0.1', port=3311, reload=True)
</code></pre>
<p>需要 run 方法中添加参数 reload=True, 并修改 app 参数为字符串类型: <module>:<attribute> -&gt; &quot;main:app&quot;</p>
</div></template>


