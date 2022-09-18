<template><div><h1 id="fastapi" tabindex="-1"><a class="header-anchor" href="#fastapi" aria-hidden="true">#</a> FastAPI</h1>
<h2 id="三、depend-依赖注入系统" tabindex="-1"><a class="header-anchor" href="#三、depend-依赖注入系统" aria-hidden="true">#</a> 三、Depend 依赖注入系统！</h2>
<h3 id="_1-什么是依赖注入" tabindex="-1"><a class="header-anchor" href="#_1-什么是依赖注入" aria-hidden="true">#</a> 1.什么是依赖注入：</h3>
<p>即是在你编程的代码前（路径函数），有一种方法，可以声明它执行前或是工作中需要使用的东西，比如：</p>
<ul>
<li>有共享逻辑（一次又一次地使用相同的代码逻辑）。</li>
<li>共享数据库连接。</li>
<li>强制执行安全性，身份验证，角色要求</li>
<li>等等很多其他事情</li>
</ul>
<p>所有注入依赖项，可以最大程度地减少了代码重复。</p>
<h3 id="_2-最基本的依赖形式" tabindex="-1"><a class="header-anchor" href="#_2-最基本的依赖形式" aria-hidden="true">#</a> 2.最基本的依赖形式：</h3>
<h4 id="_1-创建最简单依赖-depends" tabindex="-1"><a class="header-anchor" href="#_1-创建最简单依赖-depends" aria-hidden="true">#</a> （1）创建最简单依赖 Depends：</h4>
<pre><code>from fastapi import Depends

async def common_parameters(q: str = None, skip: int = 0, limit: int = 100):
    limit += 66
    return {&quot;q&quot;: q, &quot;skip&quot;: skip, &quot;limit&quot;: limit}


@app.get(&quot;/items/&quot;)
async def read_items(commons: dict = Depends(common_parameters)):
    commons['skip'] += 10
    return commons


@app.get(&quot;/users/&quot;)
async def read_users(commons: dict = Depends(common_parameters)):
    return commons
</code></pre>
<ul>
<li>
<p>Depends(func 等被依赖项): 创建一个依赖，就是所谓在执行对应路径函数前，先执行注入的依赖 func，并可以获取到其执行后的返回值当做参数</p>
</li>
<li>
<p>注意传入的是 func，这个是声明，并没有调用，若执行了则变成 func()了</p>
</li>
</ul>
<p>【注意】：</p>
<ul>
<li>
<p>依赖声明的参数，即使对应的本案例 get 路由所要传入的参数，post 等一样（提交的数据）</p>
</li>
<li>
<p>和装饰器的区别在于，装饰器可以在函数执行动作前后装饰其他操作，依赖去世在函数执行前</p>
</li>
<li>
<p>传入的被依赖项，必须是可调用的，若传入的非异步，那则是同步执行</p>
</li>
</ul>
<h4 id="_2-类作为依赖" tabindex="-1"><a class="header-anchor" href="#_2-类作为依赖" aria-hidden="true">#</a> （2）类作为依赖</h4>
<pre><code>fake_items_db = [{&quot;item_name&quot;: &quot;Foo&quot;}, {&quot;item_name&quot;: &quot;Bar&quot;}, {&quot;item_name&quot;: &quot;Baz&quot;}]


class CommonQueryParams:
    def __init__(self, q: str = None, skip: int = 0, limit: int = 100):
        self.q = q
        self.skip = skip
        self.limit = limit


@app.get(&quot;/items/&quot;)
async def read_items(commons: CommonQueryParams = Depends(CommonQueryParams)):
    response = {}
    if commons.q:
        response.update({&quot;q&quot;: commons.q})
    items = fake_items_db[commons.skip: commons.skip + commons.limit]
    response.update({&quot;items&quot;: items})
    return response
</code></pre>
<ul>
<li>
<p>commons: CommonQueryParams = Depends() 若指定了类型 ，不在传入是写一遍类名，直接为()也是可以的，但这个必须是个类</p>
</li>
<li>
<p>该类的<strong>init</strong> 初始化参数即为，请求所需要传过来的参数，commons 即为该依赖类的实例</p>
</li>
</ul>
<h4 id="_3-依赖套娃" tabindex="-1"><a class="header-anchor" href="#_3-依赖套娃" aria-hidden="true">#</a> （3）.依赖套娃</h4>
<pre><code>def query_extractor(q: str = None):
return q


def query_or_cookie_extractor(
    q: str = Depends(query_extractor), last_query: str = Cookie(None)
):
    if not q:
        return last_query
    return q


@app.get(&quot;/items/&quot;)
async def read_query(query_or_default: str = Depends(query_or_cookie_extractor)):
    return {&quot;q_or_cookie&quot;: query_or_default}
</code></pre>
<ul>
<li>依赖可以嵌套依赖， 嵌套的依赖若也带有参数，则一并是需要请求中携带的</li>
</ul>
<h4 id="_4-多次使用相同依赖" tabindex="-1"><a class="header-anchor" href="#_4-多次使用相同依赖" aria-hidden="true">#</a> （4）多次使用相同依赖</h4>
<p>如果在同一个路径操作，多次声明一个依赖项（大概指 /item 的 get、post、put...请求都指定了不同依赖项 Foo、Bar、Baz...，但是这写依赖项有
一个相同的子依赖 get_value） 那么此时 FastApi 默认每次请求仅调用一次子依赖项，并把自依赖项 get_value 缓存，并传给特定请求中的需要它
的所有依赖项 （如 Foo、Bar、Baz、needy_dependency...）</p>
<pre><code>async def needy_dependency(fresh_value: str = Depends(get_value, use_cache=False)):
    return {&quot;fresh_value&quot;: fresh_value}
</code></pre>
<ul>
<li>use_cache=False 若要不使用缓存，而每次都调用依赖，可以通过 use_cache 关闭</li>
</ul>
<h4 id="_5-请求依赖-dependencies" tabindex="-1"><a class="header-anchor" href="#_5-请求依赖-dependencies" aria-hidden="true">#</a> （5）请求依赖 dependencies</h4>
<pre><code>async def verify_token(x_token: str = Header(...)):
if x_token != &quot;fake-super-secret-token&quot;:
    raise HTTPException(status_code=400, detail=&quot;X-Token header invalid&quot;)


async def verify_key(x_key: str = Header(...)):
    if x_key != &quot;fake-super-secret-key&quot;:
        raise HTTPException(status_code=400, detail=&quot;X-Key header invalid&quot;)
    return x_key


@app.get(&quot;/items/&quot;, dependencies=[Depends(verify_token), Depends(verify_key)])
async def read_items():
    return [{&quot;item&quot;: &quot;Foo&quot;}, {&quot;item&quot;: &quot;Bar&quot;}]
</code></pre>
<ul>
<li>dependencies： 可添加 dependencies 到 路径操作装饰器里面，</li>
</ul>
<h3 id="_3-依赖的进阶操作" tabindex="-1"><a class="header-anchor" href="#_3-依赖的进阶操作" aria-hidden="true">#</a> 3.依赖的进阶操作：</h3>
<p><a href="https://www.pythonf.cn/read/56921" target="_blank" rel="noopener noreferrer">https://www.pythonf.cn/read/56921<ExternalLinkIcon/></a></p>
<h4 id="_1" tabindex="-1"><a class="header-anchor" href="#_1" aria-hidden="true">#</a> （1）：</h4>
<h2 id="四、安全" tabindex="-1"><a class="header-anchor" href="#四、安全" aria-hidden="true">#</a> 四、安全</h2>
<p>是为了处理安全性、身份验证和授权，其实在很多其他框架和系统中是很复杂困难的话题，但 FastApi 中提供了多种工具，可以轻松快速实现</p>
<h3 id="_1-oauth2-规范" tabindex="-1"><a class="header-anchor" href="#_1-oauth2-规范" aria-hidden="true">#</a> 1.OAuth2 规范</h3>
<p>OAuth2 是一个规范国际、一个通用的授权标准，定义了几种处理身份验证和授权的方式。相当广泛的规范，涵盖了几个复杂的用例，包括使用
&quot;第三方&quot;进行身份验证的方法。是所有带有“使用 Facebook，Google，Twitter，GitHub 登录”的系统的基础（规范超庞大了解即可）</p>
<ul>
<li>
<p>1.前端从浏览器发送 url（这个是特定指定的）包含 username 、password 的请求</p>
</li>
<li>
<p>2.服务器有一套完整授权机制，它会返回前端一个 token（一个字符串的令牌）</p>
</li>
<li>
<p>3.前端找个地方给 token 存起来（通常是放 Cookie 中、Local Storage、Session 中也行？）</p>
</li>
<li>
<p>4.然后下次访问网页，前端存起来的令牌 token 就可以提供标识（前端发送请求要携带标头 Authorization 值：Bearer 加上令牌 token）</p>
</li>
<li>
<p>5.服务器收到标识，判断有没有认证权限，然后（带着判断 token 后拿到该用户特有信息）一并返回给前端</p>
</li>
<li>
<p>注：token 会过期的，因此比较安全，会逼迫用户再次登录，因此即使令牌被盗，风险也相对会降低</p>
</li>
</ul>
<h4 id="_1-oauth-1" tabindex="-1"><a class="header-anchor" href="#_1-oauth-1" aria-hidden="true">#</a> （1）：OAuth 1</h4>
<p>它与 OAuth2 完全不同，并且更为复杂，因为它直接包含有关如何加密通信的规范。目前也不是很流行。</p>
<p>OAuth2 没有指定如何加密通信，它希望您使用 HTTPS 为应用程序提供服务。</p>
<h4 id="_2-引入-oauth2" tabindex="-1"><a class="header-anchor" href="#_2-引入-oauth2" aria-hidden="true">#</a> （2）引入 OAuth2</h4>
<pre><code>from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=&quot;/token&quot;)

@app.get(&quot;/items/&quot;)
async def read_items(token: str = Depends(oauth2_scheme)):
    return {&quot;token&quot;: token}
</code></pre>
<ul>
<li>
<p>OAuth2PasswordBearer： 导入并将其实例化</p>
</li>
<li>
<p>tokenUrl：需要引入一个路径，该路径意思是吧用户名密码啥的那条请求发送到/token 这里面来。</p>
<ul>
<li>还有个好处是可以将账号密码的服务器分离</li>
</ul>
</li>
<li>
<p>后续加上 token 函数进行路径认证即可</p>
</li>
</ul>
<p>【注意】：</p>
<p>后续用户名密码的输入方式，是要在 web 界面文档中的 Authorize 有一把小锁头，点开即可弹出输入表单</p>
<h4 id="_3-获取当前用户" tabindex="-1"><a class="header-anchor" href="#_3-获取当前用户" aria-hidden="true">#</a> （3）获取当前用户：</h4>
<pre><code>oauth2_scheme = OAuth2PasswordBearer(tokenUrl=&quot;/token&quot;)


class User(BaseModel):
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None
    disabled: Optional[bool] = None


def fake_decode_token(token):
    return User(
        username=token + &quot;fakedecoded&quot;, email=&quot;john@example.com&quot;, full_name=&quot;John Doe&quot;
    )


async def get_current_user(token: str = Depends(oauth2_scheme)):
    user = fake_decode_token(token)
    return user


@app.get(&quot;/users/me&quot;)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user
</code></pre>
<ul>
<li>
<p>执行后会发现即使输入用户名和密码，依然不能按照官方文档说的那样拿到密码，这是因为 OAuth2 请求是要加上标头 Authorization：Bearer 的，
因此可以用 PostMan 携带头部信息发送请求，Authorization：Bearer xxxx 后面的 xxxx 就是 token 值（正常是后端 jwt 生成的 token 并给到前端才对）</p>
</li>
<li>
<p>调用通过依赖 get_current_user -&gt; oauth2_scheme 实例获取 token -&gt; fake_decode_token 携带并生成用户 Model -&gt; 返回 user 实现的</p>
</li>
</ul>
<h4 id="_4-具有密码和承载的简单-oauth2" tabindex="-1"><a class="header-anchor" href="#_4-具有密码和承载的简单-oauth2" aria-hidden="true">#</a> （4）具有密码和承载的简单 OAuth2</h4>
<pre><code>from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

fake_users_db = {
    &quot;admin&quot;: {
        &quot;username&quot;: &quot;admin&quot;,
        &quot;full_name&quot;: &quot;root&quot;,
        &quot;email&quot;: &quot;admin@example.com&quot;,
        &quot;hashed_password&quot;: &quot;fakehashed123456&quot;,
        &quot;disabled&quot;: False,
    },
    &quot;alice&quot;: {
        &quot;username&quot;: &quot;alice&quot;,
        &quot;full_name&quot;: &quot;Alice Wonderson&quot;,
        &quot;email&quot;: &quot;alice@example.com&quot;,
        &quot;hashed_password&quot;: &quot;fakehashedsecret2&quot;,
        &quot;disabled&quot;: True,
    },
}


def fake_hash_password(password: str):
    return &quot;fakehashed&quot; + password


oauth2_scheme = OAuth2PasswordBearer(tokenUrl=&quot;/token&quot;)


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
            detail=&quot;Invalid authentication credentials&quot;,
            headers={&quot;WWW-Authenticate&quot;: &quot;Bearer&quot;},
        )
    return user


async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail=&quot;Inactive user&quot;)
    return current_user


@app.post(&quot;/token&quot;)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user_dict = fake_users_db.get(form_data.username)
    if not user_dict:
        raise HTTPException(status_code=400, detail=&quot;Incorrect username or password&quot;)
    user = UserInDB(**user_dict)
    hashed_password = fake_hash_password(form_data.password)
    if not hashed_password == user.hashed_password:
        raise HTTPException(status_code=400, detail=&quot;Incorrect username or password&quot;)

    return {&quot;access_token&quot;: user.username, &quot;token_type&quot;: &quot;bearer&quot;}


@app.get(&quot;/users/me&quot;)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user
</code></pre>
<ul>
<li>
<p>OAuth2PasswordBearer： 可以先简单理解为是一个密码服务器的作用（有一条消息过来，密码服务器会响应这个密码是对是错）</p>
</li>
<li>
<p>OAuth2PasswordRequestForm: 这玩意是页面的 Form 表单，抓了 username 和 password 过来（怎么抓，有没有加密不要操心）</p>
</li>
<li>
<p>/token：OAuth2PasswordBearer 就是从这个请求中取的吧，大概，然后拿到 access_token 即为 token 值吧</p>
</li>
<li>
<p>此时打开表单输入用户名密码，即可验证成功进行登录，然后会自动的给请求头加上一些东西，但这里并未用到 cookie</p>
</li>
<li>
<p>再执行/users/me 请求时，此时会直接获取到未过期的用户来执行动作，即后续加入 get_current_active_user 依赖的都会进行验证，并
返回状态和信息等</p>
</li>
</ul>
<h4 id="_4-具有-jwt-令牌和哈希加密的-oauth2" tabindex="-1"><a class="header-anchor" href="#_4-具有-jwt-令牌和哈希加密的-oauth2" aria-hidden="true">#</a> （4）具有 jwt 令牌和哈希加密的 OAuth2</h4>
<p>JWT 是一个加密令牌，通常用于产生 token 令牌，</p>
<h5 id="passlib-生成哈希密码的库" tabindex="-1"><a class="header-anchor" href="#passlib-生成哈希密码的库" aria-hidden="true">#</a> passlib 生成哈希密码的库：</h5>
<pre><code>from passlib.context import CryptContext

pwd_context = CryptContext(schemes=[&quot;bcrypt&quot;], deprecated=&quot;auto&quot;)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


if __name__ == '__main__':
    xxx = get_password_hash(&quot;123456&quot;)
    yyy = get_password_hash(&quot;123456&quot;)
    print(xxx)
    print(yyy)

    print(verify_password(&quot;123456&quot;, xxx))
    print(verify_password(&quot;123456&quot;, yyy))
    print(verify_password(&quot;123456&quot;, &quot;$2b$12$IqBuIjvgZgj/sYY0DrRbuOyrlDg8tgSKbGgO6YNfgrOFIoDJwUb3i&quot;))
</code></pre>
<ul>
<li>
<p>passlib： 处理哈希加密的包，fastapi 官方文档推荐的，其实也不太好用其实，但毕竟推荐的就用叭</p>
</li>
<li>
<p>CryptContext： 通过该类进行实例化</p>
</li>
<li>
<p>.verify(原密码，hash 密码)： 可以进行哈希校验，校验原密码后哈希后的值是否一致</p>
</li>
<li>
<p>.hash()： 获取哈希密码，将明文密码进行哈希，获得一个加密后的哈希密码</p>
</li>
</ul>
<p>【注意】</p>
<p>即使是相同的密码经过哈希，每次的结果都是不同的，因此不同哈希值对应解码后的明文确可能会一致</p>
<h5 id="时间差" tabindex="-1"><a class="header-anchor" href="#时间差" aria-hidden="true">#</a> 时间差</h5>
<pre><code>from datetime import datetime
from datetime import timedelta

aDay = timedelta(minutes=30)
now = datetime.now() + aDay
print(aDay)
print(datetime.now())
print(now, type(now))
</code></pre>
<ul>
<li>timedelta(): 代表了时间差，aDay 即是通过该函数获取了一个三十分钟的时间差，+ datetime.now() 即可得到一个未来三十分钟后的时间</li>
</ul>
</div></template>


