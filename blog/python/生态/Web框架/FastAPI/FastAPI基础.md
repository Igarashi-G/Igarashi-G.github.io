---
title: FastAPI基础
date: 2020-03-03
category:
  - WEB框架
  - FastAPI
tag:
  - WEB框架
  - FastAPI
---

**FastAPI** 简介



<!--more-->

[FastAPI 文档](https://fastapi.tiangolo.com/)| [GitHub](https://github.com/tiangolo/fastapi) 

## 1.概述

#### 1.1 特性

- 快速：理论上媲美 **nodejs** 和 **GO** 
- 快速编码：效率提升 **2~3** 倍
- 更少错误：理论减少 **40%**
- 直观、简易、短、健壮
- 基于标准：完全兼容 **API** 的开放标准 **openAPI & JSON Schema**

#### 1.2 层次结构

**FastAPI** 是基于 **Starlette** 和 **Uvicorn** 的进一步封装

- **Uvicorn: ASGI** 服务器
  - **Starlette**:（*使用 **Uvicorn***）网络微框架
    - **FastAPI**:（使用 **Starlette**）具有多个附加功能的 **API** 微框架，用于构建 **API** 进行数据验证
  
- **Uvicorn：**
  - 将具有最佳性能，不会直接再 **Uvicorn** 中编写应用程序，**Uvicorn** 作为后台服务器，请与
    **Daphne**、**Hypercorn**，**uWSGI** 类比
  
- **Starlette：**
  - 需要 **Uvicorn** 来运行，比它慢，但可以简单构建 **web** 应用，请与 **Sanic**、**Flask**、**Django** 类比
- **FastAPI：**
  - 与 **Starlette** 使用 **Uvicorn** 一样，需依赖 **git**，比它慢，但在 **Starlette** 上提供了更多功能，如
    文档（*方便数据验证和序列化* ），要是单用 **Starlette** 的话，开销和 **FastAPI** 无差。

#### 1.3 可选依赖

**Pydantic：**

- **ujson：** 用于更快的 **json** 解析
- **email_validator：** 用于电子邮件验证

## 2. Request (*请求部分*)

### 2.1 url 和 参数获取

##### **路径参数** 

顾名思义，路径参数是传在路径上的参数，**FastAPI** 中接受一个路径参数如下

```python
@app.get("/{item}")
async def foo(item: str):
    return {"item": item}
```

- 此时的 `item` 即可以直接获取到浏览器 `/` 后面的值，若 `item` 不是 `str` 类型的，则会报错

##### **get 请求参数** 

```python
@app.get("/items")
async def read_item(skip: int = 0, limit: int = 10):
    fake_data = [1, 2, 3, 4, 5]
    return fake_data[skip: limit]
```

- 此时输入 `get` 请求：`/items?skip=2&limit=4` 则会输出 `fake_data 的 [3, 4]`

##### **多路径参数与多查询参数混合** 

```python
@app.get("/usr/{user_id}/item/{item_id}")
async def foo(
        user_id: int, item_id: int, name: str, role: str
):
    return {"user_id": user_id, "item_id": item_id, "name": name, "role": role}
```

- 此时输入 **GET** 请求，`/usr/100/item/233?name=ykb&role=kr`

- 返回结果， `{"user_id":100,"item_id":233,"name":"ykb","role":"kr"}`

##### **Request 类** 

```python
from fastapi import Request

# 见 Request 源码，即可获取对应方法
```

### 2.2 数据模型与校验

**FastAPI** 通常集成 **Pydantic** 作为请求参数的数据模型校验工具，**建议封装抽象出公共校验库**，它自带了一套语义化的校验，如 **Query、Path、Body** 参数等，简化手写验证提高效率

通过继承 **BaseModal** 创建校验数据模型（***json** 格式* ）

```python
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    description: str = None          # 带默认值，无默认值则为必填项
    price: float
    tax: float = None

@app.post("/{item_id}")
async def foo(item: Item):
    print(item.dict())
    return {"item": item.dict()}
```

该库会自动校验数据是否符合要求（*此处简单验证，生产环境中可加更多规则*）

- **BaseModel** 是 **pydantic** 的数据验证 **model**，而下文的数值验证则是 **fastapi** 的
- 返回结果 `{'name': 'ykb', 'description': 'qweqweqw', 'price': 1.2, 'tax': 0.3}`

#### **Query 查询参数** 

**Query** 仅适用于 **GET** 请求上的参数验证，仅适用于单个参数，不能校验 **BaseModel** 封装的数据模型，如下

```python
from fastapi import Query

@app.get("/items")
# async def foo(q: str = Query(None, min_length=3, max_length=10)):
async def foo(q: str = Query(..., min_length=3, max_length=10)):
    return {"param": q}
```

- 假如请求资源为  `/items?q=qwe` ，此时 `q=qwe` 将会被 **Query** 参数捕获并校验
- 若不符合指定的字符串长度，则抛出 **422 Value** 参数异常
- 若符合校验，则返回结果 `{"param": qwe}` 

::: tip 其他参数

- **alias=: str = ""：** 起别名
- **title: str = ""：** 起标题
- **description: str = ""：** 写描述
- **gt: float = None：** 仅用于数字，大于
- **ge: float = None：** 仅用于数字，大于或等于
- **lt: float = None：** 仅用于数字，大于
- **le: float = None：** 仅用于数字，大于或等于
- **min_length: int = None：** 仅用于字符串，最小长度
- **max_length: int = None：** 仅用于字符串，最大长度
- **regex: str ="^query$":** 使用正则表达式
- **deprecated: bool =True:** 当为 **True** 时表示已经弃用（*针对 **OpenAPI** 文档的废弃接口* ）

:::

#### **Path 路径参数** 

用于对路径参数的数据验证而服务，用法基本同上

```python
from fastapi import Path

@app.get("/items/{item_id}")
async def foo(item_id: str = Path(..., min_length=3, max_length=10)):
    return {"item_id": item_id}
```

#### **Body 请求体参数** 

用于对请求体的验证，包括但不限于 **POST、PUT、DELETE** 请求的请求体，用法基本同上

```python
from fastapi import Body

@app.put("/items/{item_id}")
async def foo(
        item_id: int,
        name: str = Body(..., min_length=2, max_length=10),
        age: int = Body(..., gt=0, lt=140)
):
    return {"item_id": item_id, "name": name, "age": age}
```

- 若不用 **Body** 进行验证，赋值，则 **默认会当做查询参数 Query** 去处理

##### **Body 的其他参数** 

```python
class Item(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None

@app.put("/items")
sync def foo(
	item_id: int,
	item: Item = Body(..., embed=True),
):
	return {"item": item}
```

- **embed: bool = False：** 默认值 **False**，表示前端传入该 **Body** 结构不用传 **key（*item*）**，直接传 **value（*json 数据* ）** 即可

  ```json
  {
      "name": "string",
      "description": "string",
      "price": 0,
      "tax": 0
  }
  ```

- 否则 **True** 时，需要加 **key** 

  ```json
  {
      "item": {
          "name": "string",
          "age": 0,
          "description": "string",
          "tax": 0
      }
  }
  ```

- **media_type: str = "application/json"** 

#### **Field 校验（Body 内的字段 ）** 

推荐将 数据 **Model** 单独抽层封装


```python
from pydantic import Field

class Item(BaseModel):
    name: str = Field(..., title="名字", min_length=1)
    age: int = Field(..., multiple_of=12)
    description: str = Field(None, description="描述", max_length=10)
    tax: float = Field(None, lt=40.02, ge=10)
    
@app.put("/items/{item_id}")
async def foo(
        item_id: int,
        item: Item = Body(...,
                          embed=True,
                          example={
                              "name": "zz",
                              "age": 24,
                              "description": "qwerty",
                              "tax": 20.2
                          }),
):
    return {"item_id": item_id, "item": item}
```

**Body** 中若指定 **example** 参数并附带 与其校验类型键一致的字典时，会在 **OpenAPI** 文档的 **Swagger** 中初始化该值

从 **pydantic** 里面导入，额外字段有：

- **multiple_of: float = None** 仅用于数字，倍数
- **min_items: int = None** 仅用于数字
- **max_items: int = None** 仅用于数字

#### **嵌套校验**

```python
from typing import List, Set, Dict
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

@app.post("/game/{uuid}")
async def foo(
        uuid: HttpUrl,
        page: Page
):
    return {"uuid": uuid, "page": page}
```

- **typing** 是从 **python3** 的标准库中引入的
- 继承 **BaseModel** 的数据模型是可以进行套娃的，在上文 **List** 中同理
- 但不能再集合中指定： **Set[GameFile]** 则会报错 **unhashable type** 因其不可哈希，且 **FrozenSet** 也不行，集合的要求值为不可变类型
- 集合的格式在 **json** 中也会被转成类数组的 [] 形式
- **HttpUrl：**  这是 **pydantic 库** 自带的校验类型，**pydantic** 提供的校验类型很多，还涵盖了如 **redis、postgres、email、ipv4/6** 等

**附录：** [pydantic 的各种（*特殊*）类型](https://pydantic-docs.helpmanual.io/usage/types/) 

#### **额外类型校验** 

除了上文的校验类型，**FastAPI** 还提供 [额外类型](https://fastapi.tiangolo.com/tutorial/extra-data-types/)  的数据校验，如 **UUID**、**datetime** 等

```python
from uuid import UUID
from uuid import uuid1
from datetime import datetime, time, timedelta

@app.put("/pd_node/{uuid}")
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
        "uuid": uuid,
        "start_datetime": start_datetime,
        "end_datetime": end_datetime,
        "repeat_at": repeat_at,
        "process_after": process_after,
        "duration": duration,
    }

print(f'uuid: {uuid1()}')
```

- 建议使用 **uuid.uuid4().hex** 形式，获取字符串类型的 **uuid**

- 可输入参数
  
  ```json
  // 路径参数 uuid: "68a4bb24-9dc3-11ea-bf01-701ce72d7e03"
  // 请求体
  {
      "start_datetime": "2020-05-24T13:35:24.999Z",
      "end_datetime": "2020-05-24T13:35:24.999Z",
      "repeat_at": "0:00",
      "process_after": 0
    }
  ```

#### **Cookie 校验类型** 

```python
from fastapi import Cookie

@app.get("/cookie")
async def foo(
        *,
        cookie_info: str = Cookie(None)
):
    return {"cookie_info": cookie_info}
```

- 该参数用于对 **Cookie** 中的值进行校验
- 如在 **F12 Application** 中，添加的字段 `cookie_info: "msg"` 然后发送的请求

#### **Header 校验类型**  

**Header** 用于校验头部信息，和 **Cookie** 类型一样，能获取到头部的各种关键字及信息

```python
from fastapi import Header

@app.get("/header")
async def foo(
        *,
        header_info: str = Header(None),
        user_agent: str = Header(None),
        x_token: str = Header(None),

):
    return {"header_info": header_info, "user_agent": user_agent, "x_token": x_token}
```

- **user_agent** 这个参数，系统默认会返回 **User-Agent** 关键字，若要区分，可换个名字
- 若添加 **x_token** 参数，则系统会默认转化为 **x-token** 关键字（***F12** 头部信息*），**Python** 不使用 **x\-xx** 格式的写法，故会下划线 **\_** 转化
- 该参数和 **Cookie** 不同，可以使用 **Swagger** 来进行输入

## 3. Response (*响应部分* )

### 3.1 响应模型

请求需要定义 **Request Model** 同样，响应也可以定义 **Response Model** 响应模型，用于校验

```python
class UserIn(BaseModel):
    username: str
    password: str
    age: int = None
    email: EmailStr = None
    
class UserOut(BaseModel):
    username: str
    age: int = None
    email: EmailStr = None
    
@app.post("/user", response_model=UserOut)
async def foo(item: UserIn):
    return item
```

- **response_model：** 用于指定返回的 **响应模型**，则响应必须按照指定的类型返回，否则 **422**

- 在响应中，为了安全性，注意禁止携带密码

- 若 **EmailStr** 报错，请使用命令： `pip3 install pydantic[email]` 进行安装

#### **文档初始值** 

给 **model** 数据赋初值，并对返回值进行字段过滤

```python
class Item(BaseModel):
    name: str
    # name: str = Field(..., example="ykb")
    age: int
    price: float = None
    tag: List[str] = []

    class Config:
    schema_extra = {
        "example": {
            "name": "Foo",
            "description": "A very nice Item",
            "price": 35.4,
            "tax": ["z, f"],
        }
    }

items = {
    "foo": {"name": "zz", "age": 24, "price": 20.2},
    "bar": {"name": "ykb", "age": 23, "tag": ["z", "f", "kw"]},
    "baz": {"name": "zxy", "age": 23, "price": 20.2, "tag": ["z", "f", "kw"]},
}

@app.post("/items/{item_id}", response_model=Item, response_model_exclude_unset=True)
async def foo(item_id: str):
    return items[item_id]

@app.post("/items/{item_id}/public", response_model=Item, response_model_exclude={"tag"})
async def bar(item_id: str):
    return items[item_id]

@app.post("/items/{item_id}/protect", response_model=Item, response_model_include=["name", "price"])
async def baz(item_id: str):
    return items[item_id]
```

- **schema_extra：** 可对 **Model** 进行**赋初值**，类型 **mock** 数据一样，即假装将数据库的数据取出来返回，这是是通过输入路径参数来返回不同的值
  - 在 **Model** 下 创建 **Config** 类， 通过 `schema_extra = { example={ } }` 形式，便可以对模型设置文档中真正的例子
  - 或是添加附加参数 `example="value"` 也可以在文档中生成例子
  - 但以上的额外参数，**fastapi** 不会进行校验认证，若 **schema_extra** 和 **example** 同时存在，**schema_extra** 优先级更高
  
- **response_model_exclude_unset：** 当设置为 **True** 时则表示若该值不是必须值（*含默认值*），则能在返回结果中去除（*若在数据中未取到的话*）

- **response_model_exclude：** 当设置某个 `{"字段"}` 时，则表示 返回是会自动去除该值的返回
  - **注意：** 若去除字段是必须的，**response_model_exclude** 只能过滤去掉值，但不意味着该必填的字段可以没有值传入，必填的校验是不会省的
  
- **response_model_include：** 当设置某些 `["字段 1", "字段 2"]` 时，则表示 返回值只包括设定的值

#### **Mode 转 Dict** 

```python
class UserIn(BaseModel):
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
    return "supersecret" + raw_password
    
def fake_save_user(user_in: UserIn):
    hashed_password = fake_password_hasher(user_in.password)
    user_in_db = UserInDB(**user_in.dict(), hashed_password=hashed_password)
    print("User saved! ..not really", user_in_db)
    return user_in_db
    
@app.post("/user/", response_model=UserOut)
async def create_user(*, user_in: UserIn):
    user_saved = fake_save_user(user_in)
    return user_saved
```

- 输入模型利用 **UserIn**, 经过 **UserInDB** 将密码哈希转化，然后利用 **UserOut** 进行格式化输出

- 该例子证明 继承了 **BaseModel** 的模型 只要字段类型一致，就可以相互替换及嵌套

- **user_in.dict()：** 将 **UserIn** 类 即 **Pydantic** 派生出的对象模型，用 `.dict()` 字典化，**python** 会对其进行解包，因此当传入 **UserInDB** 模型的数据也可以直接字典形式转 **BaseModel**  模型解析

#### **模型合理继承** 

利用基类减少重复，也是 **FastAPI** 核心思想之一

```python
class UserBase(BaseModel):
    username: str
    email: EmailStr
    full_name: str = None

class UserIn(UserBase):
    password: str

class UserOut(UserBase):
    pass

class UserInDB(UserBase):
    hashed_password: str
```

- 为了简化，可定义出某些 **共有的基类**，然后继承使代码简化

#### **结合 typing 使用** 

**Model** 可以很好的结合 **typing** 类型注解来使用，如使用 **Union** 来灵活地进行输出

```python
from typing import Union

class BaseItem(BaseModel):
    description: str
    type: str

class CarItem(BaseItem):
    type = "car"
    
class PlaneItem(BaseItem):
    type = "plane"
    size: int
    
items = {
    "item1": {"description": "All my friends drive a low rider", "type": "car"},
    "item2": {
        "description": "Music is my aeroplane, it's my aeroplane",
        "type": "plane",
        "size": 5,
    },
}

@app.get("/items/{item_id}", response_model=Union[PlaneItem, CarItem])
async def read_item(item_id: str):
    return items[item_id]
```

- **BaseItem** 父类，它将继承的数据模型 **共有属性** 提出
- 使用 `Union[PlaneItem, CarItem]`，表示可按需输出 **PlaneItem Model** 或 **CarItem Model** 

还可指定 **List** 输出

```python
from typing import List

class Item(BaseModel):
    name: str
    description: str

items = [
    {"name": "Foo", "description": "There comes my hero"},
    {"name": "Red", "description": "It's my aeroplane"},
]

@app.get("/items/", response_model=List[Item])
async def read_items():
    return items
```

- 即返回值为常见的 **List + 自定义的 Model** 的形式

还可指定 **Dict** 输出

```python
from typing import Dict

@app.get("/keyword-weights/", response_model=Dict[str, float])
async def read_keyword_weights():
    return {"foo": 2.3, "bar": 3.4}
```

#### **返回状态码** 

此处查阅 [HTTP 状态码](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) 

```python
@app.post("/items/", status_code=201)
async def create_item(name: str):
    return {"name": name}
```

- 可以在装饰器中 **status_code** 参数直接指定 **HTTP** 的响应码

  ```python
  from fastapi import FastAPI, status
  
  @app.post("/items/", status_code=status.HTTP_201_CREATED)
  async def create_item(name: str):
  return {"name": name}
  ```

- 也可以使用便捷变量 `fastapi.status` 来直接获取到对应的状态码

- 若因版本而报错，请使用： `from starlette import status` 导入

#### **错误处理** 

许多情况下，需要将错误返回给客户端，若都如上返回状态码的形式返回错误，在开发中其实并不合适

```python
from fastapi import HTTPException, status

items = {"foo": "The Foo Wrestlers"}

@app.get("/items-header/{item_id}")
async def read_item_header(item_id: str):
    if item_id not in items:
        raise HTTPException(
            status_code=404,
            detail="Item not found",
            headers={"X-Error": "There goes my error"},
        )
    return {"item": items[item_id]}
```

- 此时返回值形式如下：可以返回错误的自定义细节
  
  ```json
  {
  	"detail": "Item not found"
  }
  ```
  
- **raise:** 通常抛出异常都应该用此形式，会直接抛出而省去执行后续代码

- **headers：** 设置返回头部信息，**RequestHeader** 中会添加 **x-error: There goes my error**

##### **自定义异常**

可使用自带的异常处理进行自定义

```python
from fastapi.responses import JSONResponse

class UnicornException(Exception):
    def __init__(self, name: str):
        self.name = name
        
@app.exception_handler(UnicornException)
async def unicorn_exception_handler(request: Request, exc: UnicornException):
    return JSONResponse(
        status_code=418,
        content={"message": f"Oops! {exc.name} did something. There goes a rainbow..."},
    )
    
@app.get("/unicorns/{name}")
async def read_unicorn(name: str):
    if name == "yolo":
        raise UnicornException(name=name)
    return {"unicorn_name": name}
```

- 自定义一个 **UnicornException**， 作为一个常见错误的基类

- **@app.exception_handler：** 基于 **Starlette** 类, 传入 **exc_class** 类或 **status_code** 状态码，返回一个回调 **callable** 对象

- **unicorn_exception_handler：** 作为回调函数，会捕获到请求和传入的 **UnicornException** 异常类，并返回执行后的 **JSON** 响应 
  
- 除了返回错误码 **418** 之外，还返回了 **content** 里面的信息如下形式
  
  ```python
  {
  	"message": "Oops! yolo did something. There goes a rainbow..."
  }
  ```

**FastAPI** 处理器都是默认返回 **JSON** 响应的，可以对框架默认的 **raise http** 异常 进行覆盖，进行自定义改写

```python
from fastapi import HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.responses import PlainTextResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

@app.exception_handler(StarletteHTTPException)  # 重写HTTPException 错误处理的程序
async def http_exception_handler(request, exc):
    return PlainTextResponse(str(exc.detail), status_code=exc.status_code)

@app.exception_handler(RequestValidationError)  # 请求验证的异常
async def validation_exception_handler(request, exc):
    return PlainTextResponse(str(exc), status_code=400)

@app.get("/items/{item_id}")
async def read_item(item_id: int):
    if item_id == 3:
        raise HTTPException(status_code=418, detail="Nope! I don't like 3.")
    return {"item_id": item_id}
```

- **StarletteHTTPException：** 框架默认，用于处理 **HTTP** 请求异常
- **RequestValidationError：** 是 **Pydantic** 的子类 **ValidationError**，框架默认，用于验证数值异常

##### 使用 RequestValidationError body

```python
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=jsonable_encoder({"detail": exc.errors(), "body": exc.body}),
    )

class Item(BaseModel):
    title: str
    size: int

@app.post("/items/")
async def create_item(item: Item):
    return item
```

- 与上文相同，通过回调的方式将错误传入，当发生 **ValidationError** 验证错误时，会自行执行 retu**r**n 后的代码，把 **detail** 和 **body** 返回了

- **exc.body：** 该参数可以获取到 **POST** 请求输入的实际参数

- **FastAPI** 和 **starlette** 都有自己的 **HTTPException**，但区别在于 **FastAPI** 中多了 **头部的响应信息可以传入** ，**OAuth2.0** 安全相关的可能会用到

#### **Form 表单数据**

```python
from fastapi import FastAPI, Form
```

- **Form** 表单针对于前端传送的 **Form** 表单结构解析

#### **文件传输**

```python
from fastapi import FastAPI, File, UploadFile

@app.post("/files/")
async def create_file(file: bytes = File(...)):
    return {"file_size": len(file)}
    
@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):
    return {"filename": file.filename}
```

- 导入 **File**，用于接收文件相关参数，可以拿到文件对象的各种属性，比如文件名、文件长度等等
- 文件下载类型是 **bytes**, 文件上传则是 **UploadFile**，若请求中不传文件则会报错

在同一个请求中使用上传和下载

```python
@app.post("/files/")
async def create_file(
    file: List[bytes] = File(...), fileb: UploadFile = File(...), token: str = Form(...)
):
    return {
        "file_size": len(file),
        "token": token,
        "fileb_content_type": fileb.content_type,
    }
```

- 使用 **List** 可以上传多个文件，表单和文件可以进行混合

- 注意：可以声明 **File** 和 **Form** 参数，但是不能声明 希望以 **JSON** 形式接收的字段，因为若声明了，请求的编码就有问题了，编码的主体会进行替换：
  **Body multipart/form-data application/json**，不是 **FastAPI** 做的限制 ，而是 **HTTP** 协议规定的

##### **文件&大文件下载**

上述下载，实际返回的是个字典，而正常下载，应返回指定的文件对象

```python
import pathlib

@app.get("/download_file")
async def download_file(file_name: str):
    path = pathlib.Path(pathlib.Path(__file__).joinpath("..")).resolve()
    file_path = f"{path}\{file_name + '.txt'}"

    if pathlib.Path(file_path).exists():
        return FileResponse(file_path)

    raise Exception
```

- **FileResponse(path, status_code, media_type, background...)：** 返回文件响应对象，**path** 是本地文件路径，**background** 参数可以使用其自带的后台异步任务

::: tip 大文件传输

若文件过大，则应使用 **文件流**，考虑返回 **流对象**

```python
# 定义一个异步生成器
async def slow_numbers(minimum, maximum):
    yield ('<html><body><ul>')
    for number in range(minimum, maximum + 1):
        yield '<li>%d</li>' % number
        await asyncio.sleep(0.5)
    yield ('</ul></body></html>')

@app.get("/download_stream_file")
async def get_stream_file():
    generator = slow_numbers(1, 10)  # 获取生成器
    return StreamingResponse(generator, media_type='text/html')
```

- **StreamingResponse：** 流响应，该对象可以使用异步生成器、普通生成器、可迭代对象，包括 **文件、BytesIO、StringIO** 等类文件对象作为响应主体，从而实现大文件的传输操作

大文件推荐用流 **StreamingResponse**， 配置文件加入 **capture_output = True**（*待验证*）

:::

#### JSON 兼容编码

```python
from datetime import datetime
from fastapi.encoders import jsonable_encoder

fake_db = {}

class Item(BaseModel):
    title: str
    timestamp: datetime
    description: str = None

@app.put("/items/{id}")
def update_item(id: str, item: Item):
    json_compatible_item_data = jsonable_encoder(item)
    fake_db[id] = json_compatible_item_data
    print(json_compatible_item_data, type(json_compatible_item_data))
    print(fake_db, type(fake_db))
```

- **datatime** 是 **python** 的格式，那么正常的 **json** 没有 **datatime** 格式，需要转换
- **jsonable_encoder()：** 可以通过兼容编码器来将其他格式转为 **json** 格式，比如上文的 **datetime**

- 其实即使不用 **jsonable_encoder** 转换，内部自己把 `<class 'api.Item'>` 类自动转换

#### Body 的更新

**PUT** 进行数据更新 

```python
class Item(BaseModel):
    name: str = None
    description: str = None
    price: float = None
    tax: float = 10.5
    tags: List[str] = []

items = {
    "foo": {"name": "Foo", "price": 50.2},
    "bar": {"name": "Bar", "description": "The bartenders", "price": 62, "tax": 20.2},
    "baz": {"name": "Baz", "description": None, "price": 50.2, "tax": 10.5, "tags": []},
}

@app.get("/items/{item_id}", response_model=Item)
async def read_item(item_id: str):
    return items[item_id]
    
@app.put("/items/{item_id}", response_model=Item)
async def update_item(item_id: str, item: Item):
    update_item_encoded = jsonable_encoder(item)
    items[item_id] = update_item_encoded
    return update_item_encoded
```

- 若不转换 **item**，则不能赋值给字典的，此时体现出 **jsonable_encoder** 的用处了
- 用 **dict(item)** 类型转换，其实也一样

**PATCH** 进行局部更新

```python
@app.patch("/items/{item_id}", response_model=Item)
async def update_item(item_id: str, item: Item):
    stored_item_data = items[item_id]
    stored_item_model = Item(**stored_item_data)
    
    update_data = item.dict(exclude_unset=True)
    updated_item = stored_item_model.copy(update=update_data)
    
    items[item_id] = jsonable_encoder(updated_item)
    return updated_item
```

- **Item(\*\*stored_item_data)：** 把 **items** 获取的一条数据传入 **Item** 类，会自动解析对应赋值，但传入`{'name': 'Foo', 'price': 50.2}` 解析后会附带 **Item** 类的默认值为 `stored_item_model name='Foo' description=None price=50.2 tax=10.5 tags=[]` 
- **item.dict()：** 继承 **BaseModel** 的类，即可调用 `.dict()` 转换字典类型
- **exclude_unset=True：** 和上文 **response_model_exclude_unset** 类似，将 **Item** 类中没有赋值的字段给过滤掉
- **.copy()：** 可以 **copy** 出一个 **Item** 副本，这里 **copy** 出的是 **stored_item_model**，上文解析后带默认值的
- **update** 用于将 **Model** 进行更新的参数，会将同样的键进行实打实的更新

## 4. FastAPI 相关配置

### 4.1 静态资源导入

需要使用 `app.mount(路径名, StaticFiles())` 来导入路径

之后的访问都会以此静态路径为准，原来访问的路径则会失效

```python
import sys
import os
from fastapi.staticfiles import StaticFiles

root_path = os.path.abspath(os.path.join(os.path.dirname(__file__)))
sys.path.insert(0, root_path)

app.mount("/", StaticFiles(directory=os.path.join(root_path, "static")), name="static")
```

### 2. fastapi 启用热更新

```python
uvicorn.run(app="main:app", host='127.0.0.1', port=3311, reload=True)
```

需要 **run** 方法中添加参数 **reload=True**, 并修改 **app** 参数为字符串类型，如 `"main:app"`
