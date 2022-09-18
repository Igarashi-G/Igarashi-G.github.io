<template><div><h1 id="序列化" tabindex="-1"><a class="header-anchor" href="#序列化" aria-hidden="true">#</a> 序列化</h1>
<pre><code>之前我们学习过用eval内置方法可以将一个字符串转成python对象，不过，eval方法是有局限性的，对于普通的数据类型，
json.loads和eval都能用，但遇到特殊类型的时候，eval就不管用了,所以eval的重点还是通常用来执行一个字符串表达式，并返回表达式的值。
</code></pre>
<p>什么是序列化:
我们把对象(变量)从内存中变成可存储或传输的过程称之为序列化，在 Python 中叫 pickling，在其他语言中也被称之为 serialization，
marshalling，flattening 等等，都是一个意思。
序列化之后，就可以把序列化后的内容写入磁盘，或者通过网络传输到别的机器上。反过来，把变量内容从序列化的对象重新读到内存里称之为反序列化，即 unpickling。</p>
<h2 id="json" tabindex="-1"><a class="header-anchor" href="#json" aria-hidden="true">#</a> json</h2>
<pre><code>以前使用XML这种数据格式，现在已经过时，慢慢会被JSON所取代。现在基本作为各个语言的一个交流通道。
如果我们要在不同的编程语言之间传递对象，就必须把对象序列化为标准格式，比如XML，但更好的方法是序列化为JSON，因为JSON表示出来就是一个字符
串，可以被所有语言读取，也可以方便地存储到磁盘或者通过网络传输。JSON不仅是标准格式，并且比XML更快，而且可以直接在Web页面中读取，非常方便。

JSON表示的对象就是标准的JavaScript语言的对象，但也有局限性。比如只能转化普通的数据类型不能把函数进行转化（函数不是可被序列化的对象）。
.dumps(数据)：使数据序列化   -- 其实做了一个操作就是把例如{'name':'igarashi'}变为了{&quot;name&quot;:&quot;igarashi&quot;}
    （其实是转为了str类型的json对象，这已经不是字典了）
.loads(数据)：使序列化之后的数据转化原始数据，把str类型的json对象 转为dict类型的json数据
.dump(数据.文件句柄):省去了写入的操作，传入两个参，包含文件
.load(文件句柄)：省去了.read()操作

注意：json.loads()不仅能把str转为字典，还可以把'[&quot;qwer&quot;, 1, 2]' 的字符串转化为列表

load()、dumps()方法还提供了一大堆的可选参数,这些可选参数就是让我们来定制JSON序列化,如下：
1.乱序问题：
    json.load()后的数据通常乱序，可以通过 OrderedDict 有序字典来进行排序。
    OrderedDict是dict的子类，它记住了内容添加的顺序。比较时，OrderedDict要内容和顺序完全相同才会视为相等。
    如： from collections import OrderedDict
        前端传过来个Object，通过json.loads(Object, object_pairs_hook=OrderedDict)解析，序列化后的顺序不变。

2.json字符串转对象：（反序列化）
    通常，序列化后的数据类型为dict，但通过以下方式，即可转化为对象，取值可通过对象的方式来获取
    class JSONObject:
        def __init__(self, d):
            self.__dict__ = d

    json.loads(Object, object_hook=JSONObject)
    之后就将JSON字典转换为一个Python对象，利用类的实例__dict__属性进行初始化，之后Object由字典样式的字符串变为对象

3.对象转json字符串：
    class Student:
        def __init__(self, name, age, score):
            self.name = name
            self.age = age
            self.score = score


    s = Student(&quot;arashi&quot;, 17, 99)

    # 以下是对象的转化函数
    def student2dict(std):
        return {
            &quot;name&quot;: std.name,
            &quot;age&quot;: std.age,
            &quot;score&quot;: std.score,
        }

    # 可选参数default就是把任意一个对象变成一个可序列为JSON的对象
    data = json.dumps(s, default=student2dict)

    这样，Student实例首先被student2dict()函数转换成dict，然后再被顺利序列化为JSON
    不过，下次如果遇到一个Teacher（另一个）类的实例，照样无法序列化为JSON。我们可以偷个懒，把任意class的实例变为dict：

    json.dumps(s, default=lambda obj: obj.__dict__)

    因为通常class的实例都有一个__dict__属性，它就是一个dict，用来存储实例变量。也有少数例外，比如定义了__slots__的class。
    当一个类需要构造大量实例，通过__slots__来声明实例所需的属性（更快的属性访问速度，减少内存消耗）


4.格式化字符串后输出：
    可以使用 json.dumps() 的indent参数。 它会使得输出和pprint()函数效果类似。
    json.dumps(data, indent=4) 得到前端API类似的格式
</code></pre>
<h2 id="pickle" tabindex="-1"><a class="header-anchor" href="#pickle" aria-hidden="true">#</a> Pickle：</h2>
<pre><code>方法同JSON
pickle虽然可以转化其他的数据类型，但是不能查看。因为写入的是bytes类型数据 读取也要用rb读取bytes类型
注意事项
    1.读取后若想调用则必须有这块对应的内存地址指向
    2.使用时请写入用&quot;wb&quot;并且直接写（不用转类型什么的）而且不用编码（因为二进制）
    3.读取时同上，假如写入了类User的self,那么读取的必定会是User的对象
</code></pre>
<h2 id="shelve" tabindex="-1"><a class="header-anchor" href="#shelve" aria-hidden="true">#</a> Shelve</h2>
<p>对象持久化</p>
<pre><code>只有一个open函数，返回类似字典的对象，可读可写：key必须为字符串，而值可以是python所支持的数据类型
shelve是利用字典的方式，通过.bak.dat.dir三种格式的文件进行存取。f = shelve.open(文件名)
其中f可以利用字典的任何方法（相当于就是字典）
优点：可以存储多个键值对类型数据 （值是什么都可以）
例：
    f[&quot;info&quot;] = {&quot;name&quot;:&quot;Ryougi&quot;, &quot;age&quot;:18}这样便存了一条字典数据（后面等于的内容可以是任意的）
但是不能做到不同语言之间的转换 因此最多还是利用JSON
</code></pre>
<p>XML： -----2
xml 是实现不同语言或程序之间进行数据交换的协议，跟 json 差不多，但 json 使用起来更简单，不过，古时候，在 json 还没诞生的黑暗年代，
大家只能选择用 xml 呀，至今很多传统公司如金融行业的很多系统的接口还主要是 xml。</p>
<pre><code>xml的格式，就是通过&lt;&gt;节点（标签）来区别数据结构的。
    见xml_test
    属性：（颜色、牌子等）因此标签里的name等的一组键值对为属性
xml协议在各个语言里的都 是支持的，在python中可以用以下模块操作xml：
    调用xml.etree.ElementTree as ET
几乎不用作为了解，详情请参阅代码
</code></pre>
<h2 id="configparser-模块" tabindex="-1"><a class="header-anchor" href="#configparser-模块" aria-hidden="true">#</a> ConfigParser 模块</h2>
<pre><code>用于生成和修改配置文档 py3 变为configparser
就是先创建一个config = configparser.ConfigParser()对象之后 填字典 之后通过 open写入
with open('example.ini', 'w') as configfile:
    config.write(configfile)
增删查改：
    详见代码
</code></pre>
<h2 id="protobuf" tabindex="-1"><a class="header-anchor" href="#protobuf" aria-hidden="true">#</a> protobuf:</h2>
<pre><code>1.对应文档写proto 文件，
    syntax = &quot;proto2&quot;;
    message Person {

    }
    然后执行shell 脚本 protoc --python_out=./ ./test_proto.proto  自动生成 test_proto_pb2.py

    注：Windows下 下载 https://github.com/google/protobuf/releases 安装 protoc 配置环境变量
      运行：protoc --python_out=./ 文件名.proto

2.不关心该文件，每次改动 若添加变量 name = 1
    syntax = &quot;proto2&quot;;
    message Person {
        required string name = 1;
    }
    重新编译即可。主要是在fields里增加了内容。
    fields=[
        descriptor.FieldDescriptor(
          name='begin_index', full_name='ufs.SearchUsersOrGroupsReq.begin_index', index=0,
          number=1, type=13, cpp_type=3, label=2,
          has_default_value=False, default_value=0,
          message_type=None, enum_type=None, containing_type=None,
          is_extension=False, extension_scope=None,
          options=None),
        ]
    有了fields,我们就可以用来存数据了。

3.主要使用SerializeToString()和ParseFromString()来序列化和反序列化数据结构
    import test_proto_pb2 as ufs_ioctl   # 导入自动生成的pb2文件

    def write_test():
        person = ufs_ioctl.Person()  # 实例化
        person.name = 'my name is hello world!!!'
        f = open(FILE_PATH, &quot;wb&quot;)
        f.write(person.SerializeToString())  # 序列化
        f.close()


    def read_test():
        person = Person()
        f = open(FILE_PATH, &quot;rb&quot;)
        person.ParseFromString(f.read())    # 反序列化
        f.close()
        print person.name  # 'my name is hello world!!!'
</code></pre>
<h2 id="mimetypes" tabindex="-1"><a class="header-anchor" href="#mimetypes" aria-hidden="true">#</a> mimetypes</h2>
<p>映射文件名到 MIME 类型</p>
</div></template>


