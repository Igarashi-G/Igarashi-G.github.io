---
title: FastAPI基础二
date: 2020-03-03
category:
  - WEB框架
  - FastAPI
tag:
  - WEB框架
  - FastAPI
---

**Python FastAPI Web 框架** 的基础使用



<!--more-->

## 1. Depend（*依赖注入系统*）

### 1.1 什么是依赖注入

即是在你编程的代码前（路径函数），有一种方法，可以声明它执行前或是工作中需要使用的东西，比如：

- 有共享逻辑（一次又一次地使用相同的代码逻辑）。
- 共享数据库连接。
- 强制执行安全性，身份验证，角色要求
- 等等很多其他事情

所有注入依赖项，可以最大程度地减少了代码重复。

### 2. 最基本的依赖形式

### 2.1 参数依赖

如创建一个最简单的依赖注入 **Depends** 

```python
from fastapi import Depends

async def common_parameters(q: str = None, skip: int = 0, limit: int = 100):
    limit += 66
    return {"q": q, "skip": skip, "limit": limit}

@app.get("/items/")
async def read_items(commons: dict = Depends(common_parameters)):
    commons['skip'] += 10
    return commons
    
@app.get("/users/")
async def read_users(commons: dict = Depends(common_parameters)):
    return commons

```

- **Depends：** 创建一个依赖注入，传入需要注入的依赖函数 **func**，在获取对应的某个参数前，会先执行注入的 **func()**，并 **获取执行后的返回值作为参数**

::: tip 和装饰器的区别

- 装饰器是 **包裹**，可以在函数前后 执行装饰动作
- 而依赖则仅能作为参数获取前，注入函数执行
- 传入的被依赖项，必须是可调用的，若传入的非异步，则会同步执行

:::

如下，一个实际的案例

```python
async def generate_request_id(request: Request, response: Response) -> str:
    request_id = uuid.uuid4().hex
    response.headers["x_request_id"] = request_id
    # 记录http请求日志
    LogService.save_request_log(
        request_id=request_id,
        log_ip=request.headers.get("x-real-ip", request.client.host),
        log_info=await RequestLog.request_params(request),
        method=request.method,
    )
    return request_id

async def get_client_ip(request: Request, response: Response) -> str:
    return request.headers.get("x-real-ip", request.client.host)

@api.get(
    path="/nodes",
    response_model=List[NodeInResponse],
    name="查询节点列表",
    summary="查询节点列表",
    operation_id="node::list",
    dependencies=[Depends(require_permission("node::list"))])
async def nodes_list(
        request: Request,
        response: Response,
        request_id: str = Depends(generate_request_id),
        client_ip: str = Depends(get_client_ip),
        current_user: UserInResponse = Depends(get_current_user),
        offset: int = Query(0, title="offset", ge=0),
        limit: int = Query(10, title="limit", ge=1, le=100),
        sort_key: str = Query(None, description="排序字段"),
        sort_oder: SortOderEnum = Query(SortOderEnum.DESC, description="排序规则"),
):
    pass

```

分别对 **权限、请求ID、客户端IP** 进行了依赖注入，方便的进行了用户请求的权限校验、请求 **ID** 的日志记录，和客户端 **IP** 的获取

### 2.2 类作为依赖


```python
fake_items_db = [{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"}]

class CommonQueryParams:
    def __init__(self, q: str = None, skip: int = 0, limit: int = 100):
        self.q = q
        self.skip = skip
        self.limit = limit

@app.get("/items/")
# async def read_items(commons: CommonQueryParams = Depends(CommonQueryParams)):
async def read_items(commons: CommonQueryParams = Depends()):
    response = {}
    if commons.q:
        response.update({"q": commons.q})
    items = fake_items_db[commons.skip: commons.skip + commons.limit]
    response.update({"items": items})
    return response
```

- **commons: CommonQueryParams = Depends()：** 若指定了类型 ，可无需传参，会默认调取此类

- 在获取请求传入的参数前，通过 **CommonQueryParams** 进行了实例的初始化

### 2.3 其他情况

#### **依赖嵌套** 

若不止一个依赖的情况下，可进行依赖嵌套


```python
def query_extractor(q: str = None):
	return q

def query_or_cookie_extractor(
    q: str = Depends(query_extractor), last_query: str = Cookie(None)
):
    if not q:
        return last_query
    return q

@app.get("/items/")
async def read_query(query_or_default: str = Depends(query_or_cookie_extractor)):
    return {"q_or_cookie": query_or_default}
```

依赖可以嵌套依赖， 嵌套的依赖若也带有参数，则一并是需要请求中携带的

#### **多次使用相同依赖**

如果在同一个路径操作，多次声明一个依赖项（大概指 /item 的 get、post、put...请求都指定了不同依赖项 Foo、Bar、Baz...，但是这写依赖项有
一个相同的子依赖 get_value） 那么此时 FastApi 默认每次请求仅调用一次子依赖项，并把自依赖项 get_value 缓存，并传给特定请求中的需要它
的所有依赖项 （如 Foo、Bar、Baz、needy_dependency...）

```python
async def needy_dependency(fresh_value: str = Depends(get_value, use_cache=False)):
    return {"fresh_value": fresh_value}
```

- use_cache=False 若要不使用缓存，而每次都调用依赖，可以通过 use_cache 关闭

#### 请求多个依赖 dependencies


```python
async def verify_token(x_token: str = Header(...)):
if x_token != "fake-super-secret-token":
    raise HTTPException(status_code=400, detail="X-Token header invalid")

async def verify_key(x_key: str = Header(...)):
    if x_key != "fake-super-secret-key":
        raise HTTPException(status_code=400, detail="X-Key header invalid")
    return x_key

@app.get(
    "/items/",
    dependencies=[Depends(verify_token), Depends(verify_key)])
async def read_items():
    return [{"item": "Foo"}, {"item": "Bar"}]
```

- **dependencies：** 可在请求中添加多个依赖到路径操作的装饰器里面

[其他进阶操作](https://www.pythonf.cn/read/56921) 

## 2. 安全认证

是为了处理安全性、身份验证和授权，其实在很多其他框架和系统中是很复杂困难的话题，但 **FastAPI** 中提供了多种工具，可以轻松快速实现

### 2.1 OAuth2 规范

**OAuth2** 是一个规范国际、一个通用的授权标准，定义了几种处理身份验证和授权的方式，相当广泛的规范，涵盖了几个复杂的用例，包括使用 **"第三方"** 进行身份验证的方法

是所有带有使用 **Facebook，Google，Twitter，GitHub** 登录的系统的基础，流程如下：

1. 前端从浏览器发送 **url** 包含 **username** 、**password** 的请求

2. 服务器有一套 **完整授权机制**，它会返回前端一个 **token**（*字符串的令牌* ）

3. 前端找地方给 **token** 存起来（*通常是放 **Cookie 、Local Storage、Session** 等* ）

4. 然后下次访问网页，前端发送请求要携带标头 **Authorization：bearer + 令牌 token** 作为标识认证，如

   ```http
   Authorization: bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJzY29wZXMiOltdLCJleHAiOjE2Nzg3ODMyMzF9.xuouTmDkxVBgTNF1lEsBT-IDP2KJQpx0zrqzlibjtVc
   ```

5. 服务器收到标识，会判断 **token** 有无认证权限，若有，再将拿到的该用户的特有信息，一并返回给前端

> **token 过期：**  一旦过期，会逼迫用户再次登录，因此即使令牌被盗，风险也相对会降低

#### **OAuth 1 和 2 的区别**

与 **OAuth2** 完全不同，并且更为复杂，因为它直接包含有关如何加密通信的规范，目前也不流行

**OAuth2** 没有指定如何加密通信，它希望用户默认使用 **HTTPS** 为应用程序提供服务

### 2.2 OAuth2 基本使用

```python
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")

@app.get("/items/")
async def read_items(
    token: str = Depends(oauth2_scheme)
):
    return {"token": token}
```

- **OAuth2PasswordBearer：** 导入并实例化

- **tokenUrl：** 需要引入一个路径，该路径意思是把含有用户名密码的认证请求发，送到 `/token` 下
  - 还有个好处是将账号密码的服务器分离
  
- 后续加上 **token** 函数进行路径认证即可

#### **获取当前用户**

```python
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")

class User(BaseModel):
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None
    disabled: Optional[bool] = None

def fake_decode_token(token):
    return User(
        username=token + "fakedecoded", email="john@example.com", full_name="John Doe"
    )

async def get_current_user(token: str = Depends(oauth2_scheme)):
    user = fake_decode_token(token)
    return user
    
@app.get("/users/me")
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user
```

#### **具有密码和承载的简单 OAuth2**

```python
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

fake_users_db = {
    "admin": {
        "username": "admin",
        "full_name": "root",
        "email": "admin@example.com",
        "hashed_password": "fakehashed123456",
        "disabled": False,
    },
    "alice": {
        "username": "alice",
        "full_name": "Alice Wonderson",
        "email": "alice@example.com",
        "hashed_password": "fakehashedsecret2",
        "disabled": True,
    },
}

def fake_hash_password(password: str):
    return "fakehashed" + password

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")

class User(BaseModel):  # 用户信息模型
    username: str
    email: str = None
    full_name: str = None
    disabled: bool = None   # True： 表示用户被拉进了黑名单啊之类的，禁止使用
    
class UserInDB(User):
    hashed_password: str    # 这里理解为哈希加密后的密码

def get_user(db, username: str):    # 获取用户
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)

def fake_decode_token(token):   # 解码令牌
    # This doesn't provide any security at all
    # Check the next version
    user = get_user(fake_users_db, token)
    return user

async def get_current_user(token: str = Depends(oauth2_scheme)):
    user = fake_decode_token(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user

async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user_dict = fake_users_db.get(form_data.username)
    if not user_dict:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    user = UserInDB(**user_dict)
    hashed_password = fake_hash_password(form_data.password)
    if not hashed_password == user.hashed_password:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    return {"access_token": user.username, "token_type": "bearer"}

@app.get("/users/me")
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user
```

- **OAuth2PasswordBearer：** 可以先简单理解为是密码服务器的作用（*有一条消息过来，密码服务器会响应这个密码是对是错*）
- **OAuth2PasswordRequestForm:** 是页面的 **Form** 表单，抓了 **username** 和 **password** 过来（*怎么抓，有没有加密无需操心*）
- **`/token：`** **OAuth2PasswordBearer** 转向该路由登录 ，会先去数据库查用户，然后比较其密码的哈希值是否一致

#### 具有 jwt 令牌和哈希加密的 OAuth2

**JWT** 是一个加密令牌，通常用于产生 **token** 令牌

```python
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)
    

def get_password_hash(password):
    return pwd_context.hash(password)

if __name__ == '__main__':
    xxx = get_password_hash("123456")
    yyy = get_password_hash("123456")
    print(xxx)
    print(yyy)

    print(verify_password("123456", xxx))
    print(verify_password("123456", yyy))
    print(verify_password("123456", "$2b$12$IqBuIjvgZgj/sYY0DrRbuOyrlDg8tgSKbGgO6YNfgrOFIoDJwUb3i"))
```

- **passlib：** 用于生成和处理哈希密码的库，**FastAPI** 官方推荐，并不是太好用

- **CryptContext：** 通过该类进行实例化

- **.verify(原密码，hash 密码)：** 可以进行哈希校验，校验原密码后哈希后的值是否一致

- **.hash()：** 获取哈希密码，将明文密码进行哈希，获得一个加密后的哈希密码

> 即使是相同的密码经过哈希，每次的结果都是不同的，因此不同哈希值对应解码后的明文确可能会一致

#### **生产实例** 

```python
# /src/dashboard/scheme.py
from fastapi.security import OAuth2PasswordBearer

PROJECT_URL_TOKEN = "/api/v1/auth/access_token"

OAuth2Scheme = OAuth2PasswordBearer(
    tokenUrl=PROJECT_URL_TOKEN,
    scopes={}
)
```

再每次请求中注入依赖 **OAuth2Scheme** 来获取 **token** 

```python
from typing import Callable

from fastapi import Depends
from fastapi import HTTPException
from fastapi.security import SecurityScopes
from starlette import status

from dashboard import scheme
from dashboard.core import security
from dashboard.model.access_token import AccessTokenPayload
from dashboard.model.user import UserInResponse
from dashboard.services.user import UserService

async def get_current_user(
        security_scopes: SecurityScopes,
        token: str = Depends(scheme.OAuth2Scheme)
) -> UserInResponse:
    if security_scopes.scopes:
        authenticate_value = f'Bearer scope="{security_scopes.scope_str}"'
    else:
        authenticate_value = f"Bearer"
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="UNAUTHORIZED",
        headers={"WWW-Authenticate": authenticate_value},
    )

    payload = security.decode_access_token(token)
    if not payload:
        raise credentials_exception
    username = payload.get("username", None)
    if username is None:
        raise credentials_exception
    token_scopes = payload.get("scopes", [])
    created_at = payload.get("created_at", 0)
    token_payload = AccessTokenPayload(scopes=token_scopes, username=username, created_at=created_at)
    try:
        user = await UserService.get_user(name=username)
    except Exception as exception:
        raise exception
    if user is None:
        raise credentials_exception
    if not user.is_active:
        raise credentials_exception
    # for scope in security_scopes.scopes:
    #     if scope not in token_payload.scopes:
    #         raise HTTPException(
    #             status_code=status.HTTP_401_UNAUTHORIZED,
    #             detail="Not enough permissions",
    #             headers={"WWW-Authenticate": authenticate_value},
    #         )
    return user
```

- 若 **decode_access_token（*使用了 jwt.decode* ）** 失败，则抛出 **401** 认证异常
- **get_current_user：** 则可作为每次请求认证与权限的依赖注入
