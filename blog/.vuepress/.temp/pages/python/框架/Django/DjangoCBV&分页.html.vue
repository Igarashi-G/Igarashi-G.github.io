<template><div><p>Django 之 CBV &amp; FBV：
url——&gt;def 函数： FBV（F 指代 function，B：Base V：views 依赖于视图）
url——&gt;class 类： CBV（C 指代 classs）</p>
<p>一、CBV:（CBV 和 FBV 并无本质区别，想用哪个用哪个）
当利用 CBV 模式时： 1.先要导入 from django import views
2.view 的 class 要继承 views.View 例：class LoginView(View): 3.路由 url 要改为 views.CBV.as_view(),即使没有 as_view()方法也要如此，因为见下。</p>
<pre><code>此时类(View)内包含方法如源码所示：
    http_method_names = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace']，get、post请求分离

    URL的对应关系则是源码中的def as_view(cls, **initkwargs):   故可以通过as_view进行对应

注:chrome插件postman（用来发送请求的），BILogin利用CBV复写时 遇到的BUG:居然把@csrf_exempt放在了类前。

FBV模式利用装饰器：直接按函数加装饰器的方式来即可。

CBV模式利用装饰器：（要依赖于Django的模块）
    1.导入from django.utils.decorators import method_decorator
    2.每次使用装饰器都在前面加@method_decorator(装饰器名)

CBV是如何知道get、post分别对应执行的是什么方法：
    1.服务器端可以拿到请求头
    2.请求头包含了当前的url（url路由映射早就配置好了）因此通过映射可以找到对应类。（此时还不知道是类里面的什么方法）
    3.此时可以拿到Request Method（请求头拧下来，拿到方法即GET或POST字符串）
    4.类名+()即可以创建一个对象，此时可以依据对象来调用get、post、delete方法
    5.Method因为是个字符串所以基于反射来做。大小写问题则可以统一处理为小写。
    6.对象选择也有，方法名也拿到了，此时则直接反射即可执行。
注：所有的基于、类似CBV的都是通过反射操作的。每个方法反射是需要一个分发器的（根据method进行分发）View中的dispatch即为分发

dispatch:（在其他方法执行前，先执行此方法，因此也可以自定义）
    request.method.lower()                                                              #全部变为小写
    handler = getattr(self, request.method.lower(), self.http_method_not_allowed)       #反射

    因此可以对其进行自定义：
        ret = super(BILogin,self).dispatch(request, *args, **kwargs)              #要先用super执行父类，此处没有self
        return ret                                                                #返回父类本要返回的response
    此时便可以在对应方法执行之前、后自定义操作（比如执行前统一加装饰器，不执行get方法，或是执行之后定义操作）
    此时之前的登录验证便可写入index下的dispatchヾ(๑╹◡╹)ﾉ&quot;

总结：如果对某一种请求做处理：  在对应请求上用单一装饰器
      如果对所有请求统一处理：  在dispatch上用统一装饰器
</code></pre>
<p>二、Django 分页：</p>
<pre><code>1.XSS攻击：（跨站脚本攻击）
    字符串在页面若要渲染，Django默认是不合法的。（比如若要开一个评论，默认合法的话录入数据库加载进行渲染，那么只需写一个循环的alert
    即可进行攻击，更别提可以更改各种页面数据）因此会把所有字符串按照原生字符串的格式进行渲染。故这种安全机制称XSS

    -更要命的是若是不禁用渲染，完全可以获取本地用户的cookie进行发送到你的博客中的这种操作。一旦有人访问此页面自动发送cookie。
        黑客便可以用cookie进行登录。

    &lt;1&gt;利用mark_safe来标记安全,取消默认的XSS（后端）
        导入from django.utils.safestring import mark_safe ，rencder渲染时字典值用mark_safe(page)传值
    &lt;2&gt;见本节笔记9.2的 {% autoescape off %} 和 |safe（前端模板）
        但要注意加|safe的同时一定要过滤 v = req.POST.get(&quot;content&quot;) if &quot;script&quot; in v: -error!!

2.自定义分页技巧：
    分页实现原理：(核心current_page，即当前页数，后面的逻辑都是基于此而来)
    1.每页显示个数：
        从url中get获取p（指代页数）之后利用stu_list = models.Student.objects.all()[start:end] 每页显示start到end个数据
    2.总共页数：
        利用divmod(models.Student.objects.all().count(),10) 总共数据除10 得出页数余数，余数不为零则页数+1
    3.前端页数生成：
        &lt;1&gt;：利用for循环range(1,v+1)循环出所有的页数标签&lt;a&gt; append 到page列表中安全渲染    --如下进行迭代
        &lt;2&gt;：若让每列显示11页，通过判断总页数，根据current_page（核心）当前页（从url获取）设置start、end。此时range_start、_end代替i,v
            if 总页数 &lt;= 11:
                _start = 1
                _end =  总页数 + 1 （这里+1是为了for循环，下同）

            if 总页数 &gt; 11:
                if 当前页 &lt; 6:
                    _start = 1      （按照下文逻辑这里省去了起始页0）
                    _end = 11 + 1
                else:
                    _start = 当前页 - 5
                    _end =  当前页 + 5 + 1
                    if _end &gt; 总页数：
                        _start = 总页数 - 11 + 1
                        _end = 总页数 + 1
    4.在上下可生成上一页和下一页（首页、尾页）
        上一页：即current_page - 1    首页始终为1
        下一页：即current_page + 1    尾页始终为v

        当前页等于1时 上一页 href=&quot;javascript:void(0)&quot; 或是 pass
        当前页等于v时 下一页 href=&quot;javascript:void(0)&quot; 或是 pass

    注：原理即如上，但是def中的代码量大，复用性极低，因此设计为类进行封装。返回值即为生成的分页字符串。
        封装时注意可以把count、current_page、url、per_page（每页显示条数）作为参数封装。
        之后建立一个utils文件夹和对应功能的脚本，通过from utils.page import PagerHelper即可调用٩(๑❛ᴗ❛๑)۶

3.Django 内置分页
    导入form django.core.Paginator import Paginator,Page,PageNotAnInteger,EmptyPage

    current_page = req.POST.get(&quot;page&quot;) 表示现在要获取第几页
    paginator = Paginator(user_list,10) #   创建分页对象，传入要分页的数据和每页页数

    方法：
        # per_page: 每页显示条目数量
        # count:    数据总个数
        # num_pages:总页数
        # page_range:总页数的索引范围，如: (1,10),(1,200)
        # page:     page对象  page(number)当前显示第几页，3表示显示第3页

    post=paginator.page(current_page)   #   当前显示第几页

    post里面的方法：
        # has_next              是否有下一页
        # next_page_number      下一页页码
        # has_previous          是否有上一页
        # previous_page_number  上一页页码
        # object_list           分页之后的数据列表
        # number                当前页
        # paginator             paginator对象

    因此之后只需要把post传入前端即可render(req,&quot;index.html&quot;,{&quot;posts&quot;:post})
    posts里面有.object_list即是获取分页之后的数据列表。之后的获取上下页也可以利用这些方法。（获取上下页的url即可）

    非法输入异常检测：
        当用户输入的url页数不再查找范围之内，或是非数字的，则进行异常捕获。
        try:
            post = paginator.page(current_page)
        exception PageNotAnInteger as e:
            post = paginator.page(1)    #   输入非数字则返回第一页
        except EmptyPage as e:
            post = paginator.page(1)    #   输入范围查询不到数据则返回第一页

    缺点：
        Django的分页若要显示所有页数则可以利用post.paginator.page_range进行循环，但默认把所有页数显示出来。
        假设有一万条数据也会全部显示，对此只能进行二次开发。故还不如用自定义分页。
        因此Django只适合有上一页和下一页，不适合加页码
</code></pre>
<p>三、文件上传：</p>
<pre><code>-Form表单上传文件：
    1.利用表单+input：type=&quot;file&quot;上传文件。
    2.注意from中要加enctype=&quot;multipart/form-data&quot;。（不然会报错&quot;NoneType。。。&quot;）
    3.通过req.FILES.get(&quot;XX&quot;)获取文件对象，对象有.name/.size/.chunks()等方法
    4.利用for chunk in .chunks()循环读取字节数据并存储

-Ajax上传文件：
  利用原生ajax上传文件：
    1.创建FormData() 根据.append(&quot;键&quot;,&quot;值:document.getElementById(&quot;img&quot;).files[0]&quot;)来创建数据
    2.xml的ajax四步（见10.3）
    3.JSON.parse(xml.responseText)拿到后端发来的JSON，创建标签

  利用jQuery-ajax上传:
    1.同上
    2.$.ajax({}),其中要写上processData: false 和 contentType: false, 让其不要处理数据和设置请求头，还有dataType:&quot;JSON&quot;拿到JSON类型数据
    3.success中判断status，创建标签

-利用form表单和iframe自己实现ajax请求：（伪Ajax操作）
    现在很多网站用这种方式，比上面两种兼容性好，上面这两种要依赖于FormData这个额外的对象，这个对象不是在所有浏览器上都有的，早期版本的没有。

    - iframe,天生局部刷新，但是只能通过get方式向后台发送数据
    - form,天生整个页面刷新 ，但是可以通过post方式向后台发送数据

    故：iframe + form = 局部刷新 + post方式传送数据

    1.form表单中的target属性 和 iframe中的name属性值 相同的时候,form就不会通过页面刷新的方式提交,而是静态局部的提交。
        target=&quot;iframe的name&quot;
    2.此时会报错，UploadIframe is not defined：意思是UploadIframe函数没有被定义，因为代码从上到下执行，第一次加载到iframe内容，
        但是js代码在HTML代码下面还没执行,所以会报错。（不用管）
    3.提交改进，用a标签来提交，先添加ondlick事件，当事件触发后给iframe添加onload（未加载页面不会报错）在获取form用.submit进行提交
    4.iframe中有上下文#document，因此先利用.contents()获取到上下文在find(&quot;body&quot;).text()获取值
    5.获取到的是字符串，此时要转化为JSON对象，之后同上创建标签即可
</code></pre>
<p>四、Django 表单
1、为啥要用 Django 的 Form：
按照以前的方式，每次 POST 提交要用 N 次 POST.get()获取到数据。不仅如此还需要判断用户的输入是否正确并返回提示，很麻烦。
数据库校验用 filter(user=u,email=e,pwd=p...)或 filter(**{})方式校验，失败要重新 render 渲染，附加错误信息，页面要有错误信息展示位置
以上全是不爽之处。</p>
<pre><code>-控诉：（为了解决以下问题）
    a.用户提交数据的验证
    b.错误信息的提示
    c.保留上一次提交的数据

-解决方法：
    Django的Form类的运行顺序为init、clean、validte、save。clean和validate会在form.is_valid()方法中被先后调用。

    from django import forms                                引入djangoform

    class LoginForms(forms.Form):                           创建模板
        user = forms.CharField(min_length=6)                设置user位数至少为6
        email = forms.EmailField()                          进入email正则 -- 注意这些字段要与表单提交的name一致

    obj = LoginForms(req.POST)                              将请求（表单提交的数据）交给模板，创建一个对象

    obj.is_valid():                                         进行验证，若正确返回True

    value = obj.clean()                                     若正确则获取字典，方便插入时直接create(**value)

    password = obj.cleaned_data['password'] or .get('password')  获取到对应字典的信息。

    obj.errors.as_json()                                    错误时显示错误信息，error里面封装了所有错误信息

    error_messages={&quot;required&quot;: &quot;邮箱不能为空&quot;,              错误信息定义在LoginForms模板中
     &quot;invalid&quot;: &quot;邮箱格式输入错误&quot;}



2、如何传入错误信息给前端显示：
    obj.error里面封装了所有的错误信息
    例：
        obj.errors[&quot;username&quot;][0]获取到错误信息，类型为str
    因此传入前端可以直接传入obj,render(req,&quot;form.html&quot;,{&quot;obj&quot;:obj})模板语言用{{ obj.errors.username.0 }}进行获取。

    利用errorobj = obj.errors.as_json() ; errorobj = json.loads(errorobj)  return render(req, &quot;form.html&quot;, errorobj)
    前端用{{ username.0.message }}也能进行获取。常用以上方式。

注：当你GET请求访问URL时，前端页面没有找到页面中模板语言的值Django不会报错，但tornado一定报错。
    因为Django默认模板中没有找到就是null。其他模板语言中若没有找到直接报错。



3、如何让Django的表单保留上一次提交后的值：（自动生成html）
    把所有表单中的input删除，替换成Django提供的表单，改写方式如下：

    &lt;1&gt;obj = LoginForms()                               在Django的GET中也创建表单对象,此时没有req则不传参
    &lt;2&gt;render(req,&quot;form.html&quot;,{&quot;obj&quot; : obj})            传入前端页面,注意要和POST中命名一致，否则再次加载不会自动生成input
    &lt;3&gt;{{ obj.username }}                               此时自动生成input标签，name即为username

    当type=&quot;email&quot;时，chrome也会提示错误，可改写type=&quot;text&quot;进行测试。

注：GET中利用obj生成了input，提交Form表单浏览器会再次刷新，若POST中的render传入的命名与GET不同，则需要前端再次指定{{ obj.username }}，
    让提交之后返回的页面也自定生成html并保留提交时的值。否则不会自动生成input

4.Django-Ajax提交：
    obj.errors解析：他是class  -- django.forms.utils.ErrorDict 其中：ErrorDict类内有以下方法
    as_ul       生成html标签        as_text     把所有的弄成文本  --没什么用
    as_json     内部做了json的dumps，str类型
    as_data     内部是字典       形容：{'email': [ValidationError(['邮箱格式输入错误'])]}

    obj.errors.as_data()[&quot;error&quot;][0]  -- 类型为   django.core.exceptions.ValidationError      （Django的数据类型，dump不能处理）

    错误信息处理：
        利用as_json()形式前端需要序列化两次，as_data+自定义处理器，前端需要序列化一次
</code></pre>
<hr>
<p>-- 额外补充
Django 序列化：
主要应用将数据库中检索的数据返回给客户端，特别是 Ajax 请求通常返回 Json 格式
1.serializers:
from django.core import serializers
ret = model.BookType.objects.all()
data = serializers.serialize(&quot;json&quot;,ret)</p>
<pre><code>2.Json.dumps
    import json
    ret = models.BookType.objects.all().values_list(&quot;caption&quot;)
    ret = list(ret)
    result = json.dumps(ret)

由于json.dumps暂时无法处理datetime日期，所以通过自定义处理器来扩展
    import json
    from datetime import date
    from datetime import datetime

    class JsonCustomEncoder(json.JSONEncoder):              #要继承json.JSONEncoder类
        def default(self, o):
            if isinstance(o,datetime):                        #若传入的类型为datetime
                return o.strftime(&quot;%Y-%m-%d %H:%M:%S&quot;)
            elif isinstance(o,date):
                return o.strftime(&quot;%Y-%m-%d&quot;)
            else:
                return json.JSONEncoder.default(self,field)

    # ds = json.dumps(d,cls=JsonCustomEncoder)


-因此通过自定义处理器把错误信息处理：

    if isinstance(field,ValidationError)                             #若为这种类型，根据这个类内字段创建字典
        return {'code': field.code, 'message': field.message}        #则返回一个字典 此时即可序列化给ajax

    return HttpResponse(json.dumps(result, cls=JsonCustomEncoder))   #dumps用cls即可在自定义的JC处理器类中序列化

注：以后写表单单开一个脚本，引入。forms其实是__init__.py把所有文件引入了，如CharField真正写在field.py文件。
    因此用from django.forms import fields  -- 之后直接用fields.XX写 from django import forms 只是用来导入类进行继承
</code></pre>
<hr>
<pre><code>5.Form自定制：（通过字段widget指定插件）
    参数：（默认Text）
        widget = widgets.PasswordInput/TextInput()                    #指定是什么类型的表单,若()则传入对象可以设置属性

        -TextInput(attrs={&quot;calss&quot;:&quot;c1&quot;,&quot;placeholder&quot;:&quot;用户名&quot;})        #添加指定样式

        ChoiceField(choices=[(1,'Beijing'),(2,'ShangHai'),])           #1、2表示value值

注：如CharField、IntegerField可以进行类型转换，把拿到的数据转化为对应类型，ChoiceField则是字符串，RadioSelect则是根据选项
    chioce=[(1,&quot;BJ&quot;),(2,&quot;SH&quot;)]互斥
</code></pre>
</div></template>


