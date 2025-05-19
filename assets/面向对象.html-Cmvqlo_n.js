import{_ as o}from"./plugin-vueexport-helper-DlAUqK2U.js";import{c as r,a as n,e as t,d as h,w as e,r as a,o as c,b as i}from"./app-CuyeAIiE.js";const _={};function d(k,s){const l=a("Font"),p=a("Alert");return c(),r("div",null,[s[2]||(s[2]=n("h1",{id:"面向对象",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#面向对象"},[n("span",null,"面向对象")])],-1)),t(p,{type:"queen"},{default:e(()=>[t(l,{type:"queen"},{default:e(()=>s[0]||(s[0]=[i("Python")])),_:1}),s[1]||(s[1]=i(" 里面一切皆对象"))]),_:1}),s[3]||(s[3]=h(`<p>计算机中，一切皆对象，世界里，万物皆对象，对象皆分类</p><p>因此描述对象先不直接写一个对象而是先思考一类对象的共性</p><h2 id="_1-对象" tabindex="-1"><a class="header-anchor" href="#_1-对象"><span>1. 对象</span></a></h2><p>学过<code>Java</code> 的都知道<code> Object</code>是 <code>class</code> 的一个实例， python 其实比 JAVA 面向对象更彻底，它的类和函数都是对象，它具有以下</p><p>【特性】：</p><ul><li><p>赋值给一个变量</p><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> ask</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic;">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;YKB&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">): </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(name)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">func </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> ask</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">func</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;PDA&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> Person</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    def</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> __init__</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E5C07B;--shiki-dark-font-style:italic;">self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic;"> name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;YKB&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">): </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(name)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">my_class </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> Person</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">my_class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;PDA&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>可以添加到集合对象中</p></li><li><p>可以作为参数传递给函数</p></li><li><p>可以当做函数的返回值</p></li></ul><p>python 会根据模板对象生成一个对象</p><pre><code>当创建一个类，之后进行实例化时 在内存中开辟了一个新的空间 并用“类对象指针”指向创建的类 因此可以访问类内方法
注：类内的方法的地址始终是不会变的 都是在类内一开始初始化好的（类对象指针因此关联了类和方法）

实际上之前用的字符串、字典等操作 创建时都相当于创建了对应的对象 方法也都是对应的类内方法
类:包含（字段+方法） 而对象则是类的实例化，因此对象也是（字段+方法）
    当例b = Bar() 程序先执行右侧，此时对象便已经在内存中创建好了，并用类对象指针关联了类

self：
    当创建对象后 对象的值是&lt;__main__.Bar object at 0x000002B0BB76D1D0&gt;
    而打印参数self的值也为&lt;__main__.Bar object at 0x000002B0BB76D1D0&gt;
    也就是说 self这个形式参数就等于是 建立的对象（那个对象调用传那个对象） 类内方法的第一个参数就是对象的地址
    对象.name = &quot;zz&quot; self.name 便可以接收传入的值 因此self可以传值和存值

构造方法：
    写法:def __init__(self):
    特殊作用：1.创建对象
             2.通过对象执行类中的特殊方法
    __init__(self,参数..)这里后面的参数可以利用初始化来传参，由于对象 == self self又可以存值 便可以通过self.参数 = 参数在构造方法
    中进行初始化。然而标签name中存的便是参数地址 self.name这个标签也一样存的是参数地址。只是对象通过类对象指针指向了类又自动的调用了
    类的__init__方法，从而进行了初始化

面向对象三大特性之一：封装
    就是将抽象得到的数据和行为（或功能）相结合，形成一个有机的整体 即类
    封装的目的是增强安全性和简化编程，使用者不必了解具体的实现细节，而只是要通过外部接口，一特定的访问权限来使用类的成员。

使用场景：如果多个函数中有一些相同参数时，便可转换为面向对象的编程

面向对象三大特性之二：继承
    写法：class 类名(父类名,父类名):
    若实例化后子类无父类方法（则会去它的父类找） 去父类找方法时，子类self则为子类对象 父类self传入的也是子类对象
    即self永远指调用方法的调用者

    父类名.父类方法(self) 这种方法可以执行父类方法
    super(当前类名,self).父类函数() 因此可以用super来执行父类的方法
    例:(初始化父类)
        super(本类名,self).__init__(初始化字段)
        继承的父类名.__init__(self)

    Python支持多继承：
        当两个父类共有同名方法时，为了区分混淆，python中是根据继承的先后顺序来查找的，调用先继承的父类方法
        无同根情况：（父类之上没有相同父类时）若父类中没有父类之上的类有则先从第一个父类的分支开始一直向上查找，全部没有之后才会找第二个父类分支
        有同根情况：则分支到父类便不在继续，从第二个继承的父类开始，若无则最后查找相同根
        当子类有两个父类 其中一个父类的方法中又调用了自己的方法而另一个父类中亦有同名方法，此时self依然是子类 则从头开始按如上规则查找
        看源码流程与上述大同小异  看self是谁的对象

面向对象三大特性之二：多态
    通常在Python中被忽略 --- 因为python原生即是多态
    但在JAVA或C#这种静态类型（事先声明好类型）的语言中：函数传参的不同导致了变量具有多种形态，因而叫多态

类：
    类成员包括：1.字段  self.字段名
                    普通字段：保存在对象之中 只能通过对象访问

                    静态字段：保存在类中，访问时通过对象（根据类对象指针）进行访问（可以有效节省内存开销）还可以直接通过类进行访问

               2.方法  self.方法名  方法则保存在类中
                    普通方法：保存在类中 由对象调用 self == 对象

                    静态方法：保存在类中 由类直接调用。在普通方法上加装饰器@staticmethod,此时self便不是必须的参数。因此不需要
                        创建对象要而接访问的便可以用静态对象来实现。相当于直接写了个函数。可以理解为面向对象对函数的封装

                    类方法：保存在类中 由类直接调用。加装饰器@classmethod，传参则把self改为cls，cls是类名（不依赖对象）无需传
                        参，python会自动把类名传入 cls == 当前类名，不依赖对象  （类方法和普通方法的区别是， 类方法只能访问类变
                        量，不能访问实例变量） cls即是class的缩写

    ###########应用场景：
        如果对象中需要保存一些值，执行某功能时需要使用对象中的值 ----&gt;普通方法
        不需要任何对象中的值----&gt;静态方法（self不是必须的，也不用创建对象，节约创建对象的空间，类似于写了一个函数）
        方法中用到当前类的话----&gt;类方法 （说实话没什么卵用，依然可以用静态方法构造出当前类，在静态方法里写一个类名（等同于cls）不也一样）

            3.属性:(我的理解是类似触发器，为了简化调用时加括号难看，貌似没有太大卵用)
                经典类，具有一种@property装饰器
                经典类中的属性只有一种访问方式，其对应被 @property 修饰的方法

                新式类，具有三种@property装饰器
                新式类中的属性有三种访问方式，并分别对应了三个被@property、@方法名.setter、@方法名.deleter修饰的方法

                当方法前加装饰器@property 时，可以直接利用函数名称进行调用和接收其返回值
                @方法名.setter(方法指代上文添加@property 的方法) 在其设置参数时会接收其参数并执行函数调用 但并未给器赋值
                @方法名.deleter，在其删除操作时可以执行函数调用 但并未将其删除

                还有静态字段方式，创建值为property对象的静态字段（当使用静态字段的方式创建属性时，经典类和新式类无区别）
                例： BAR = property(get_bar)  (这种就是不加装饰器的形式)
                property的构造方法中有个四个参数
                BAR = property(get_bar, set_bar, del_bar, &#39;description...&#39;)
                第一个参数是方法名，调用 对象.属性 时自动触发执行方法obj = Foo() obj.BAR
                第二个参数是方法名，调用 对象.属性 ＝ XXX 时自动触发执行方法
                第三个参数是方法名，调用 del 对象.属性 时自动触发执行方法
                第四个参数是字符串，调用 对象.属性.__doc__ ，此参数是该属性的描述信息（可有可无）

                说实话python的属性可有可无，但看源码时可能会遇到

成员修饰符：
    公有成员：指可以被外部访问的成员
    私有成员：指仅仅能在该类之下访问的成员，就算继承也不行（添加双下划线表示私有化）
        __成员变量（字段，函数）：表示该成员为私有 无法直接访问，只能间接访问

        注：内部使用的类、方法或变量前，需加前缀&#39;_&#39;表明此为内部使用的（非语法，PEP8）

类中特殊成员：（之前已经学习__init__，注意这些都是语法，现在不要尝试想它的逻辑，见到这种场景对应语法即可）
    __call__:   对象名.() 则自动执行__call__()方法。或是类名.()()也一样（注：Foo()是type的对象，因此普通类初始化时即Foo()便会执
                行type的__call__方法）

    __int__:    执行int时调用，int(对象) （就是只要用int强转便去找对象中的__int__()方法 下同）

    __str__:    执行str时调用，str(对象)  正常创建一个字符串s = &quot;123&quot; 实质是 s = str(&quot;123&quot;)
                print实质上调用了str方法 在调用print(obj)时 相当于调用了print(str(obj))
                而str(obj) 又会自动调用obj中的__str__方法 并且获取其返回值，之后返回返回再打印出来

    __add__:    当两个对象相加是触发 ，同上

    __del__:    析构方法，python内部触发，当对象销毁时自动执行

    十分重要:
    __dict__:   将对象/类中封装的所有内容通过字典的形式返回 对象.__dict__ 返回对象封装的字典 类.__dict__ 返回类封装的全部字典

    __getitem__:    当创建一个列表时 li = [11,22,33] 等同于li = list([11,22,33]) 用li[2]进行取值时,此时便是触发了__getitem__方法
                    因此当 li[key]时 则调用__getitem__(self,item) item就是传入的key
                    注：切片操作时也执行此方法 例：li[1:4:2] 实质上是在__getitem__方法中进行判断，若type(item) == slice 则表示传
                    入的类型是切片 因此可以利用item.start/stop/step 来获取1、4、2三个值来进行切片

    __setitem__:    当li[key] = value 时触发

    __delitem__:    当del li[key] 时触发  del li[1:4]此方法切片同上

    __iter__:   当for i in f（对象）时触发 若f是迭代器则直接进行next() 若f是可迭代对象则寻找该对象的__iter__方法，并取其返回值
                此返回值是迭代器（注意不是可迭代对象）返回后for循环再调用next()方法（参考3.4for循环实质）



类的实质:（炒鸡重要）
    先说：
        obj是谁的对象 是Foo的对象
        那么Foo()是谁的对象 是type的对象，因此call（见下）

    class MyType(type):                                     #自定义MyType类继承type
        def __init__(cls, what, bases=None, dict=None):
            super(MyType,cls).__init__(what, bases, dict)   #实现父类__init__方法
            print(&quot;MyType init:&quot;, cls)                      #这里cls是Foo类（即type的实例化对象Foo类）


        def __call__(self, *args, **kwargs):                #当Foo()时触发
            print(&quot;MyType call:&quot;, self)                     #self即Foo类

            obj = self.__new__(self,args,kwargs)            #创建对象obj 调用Foo类的__new__方法（这里的obj就类似一个中间值，无实际意义）
            print(&quot;new return :&quot;, obj)                      #返回后的值即为Foo类创建好的obj对象
            self.__init__(obj)                              #调用Foo类的__init__方法进行初始化（此时obj即self初始化便可以存参）
            return obj                                      #返回 创建好的类给 Foo()（Foo()类对象指针指向obj）

    class Foo(object,metaclass= MyType):                    #告诉类不再继承type 而是自定义的MyType
        def __init__(self):                                 #初始化对象，也就是实例化
            print(&quot;Foo init:&quot;, self)                        #Foo类创建好的对象，也就是实例化

        def __new__(cls, *args, **kwargs):                  #Foo类的new方法，用于实例化Foo类的对象
            print(&quot;Foo new:&quot;, cls)                          #cls即Foo类 这个cls是MyType方法传过来的用于下面创建Foo类的对象
            return object.__new__(cls)                      #返回利用object上帝类创建好的对象给MyType的__call__方法中obj接收(每次执行都开辟新的内存空间)

    obj = Foo()

执行顺序：
        1.当类被定义时便自动执行了它父类的__init__方法(写好便执行，不用调用初始化)就是Foo就执行了type的init Foo = type()
        2.当程序读到Foo()时便触发了其父类也就是type类的__call__方法
        3.type类的__call__方法便利用self（也就是Foo类）调用子类（Foo类本身）的__new__方法
        4.其子类（Foo类）的__new__方法利用上帝类的__new__方法创建了其对象（Foo类的对象）之后返回给__call__方法
        5.__call__方法中执行其子类（Foo类）的__init__方法，对子类（Foo类）的对象进行初始化，其中传入的便是__call__接收的返回值obj
            也就是实例化的对象（对象在Foo类中实例化之后此时self中便封装了初始化的参数）这一步主要是使self带参
        6.__call__方法在上一步（5）获取了子类的返回值（第5步实际就是赋参封装），又把返回值返回至Foo()（此时Foo()就是创建好的Foo类对象）
            后被obj进行接收（标签简单赋值）
        因此obj实际上就是__new__中创建后，经过type中的__call__方法返回的，初始化后的self

接口：
    python没有类似Java要实现的接口，也没有interface关键字，只能利用NotImplementedError来实现，它只是看起来像接口。
    若在一个方法中指明
        def pay(self):
            raise NotImplementedError
    那么若有其他类继承，则必须实现pay方法。强制其子类，实现方法，才能不报错。

    或是利用abstractmethod，需要导入from abc import ABCMeta,abstractmethod
        &lt;1&gt;子类必须全部实现重写父类带有@abstractmethod 装饰器的方法
        &lt;2&gt;非abstractmethod方法可以不实现重写
        &lt;3&gt;带abstractmethod方法的类不能实例化

抽象类：
    与java一样，python也有抽象类的概念但是同样需要借助模块实现，抽象类是一个特殊的类，它的特殊之处在于只能被继承，不能被实例化。
    from abc import ABCMeta,abstractmethod  导入模块，基类指定继承metaclass=ABCMeta
    class Base(metaclass=ABCMeta):
        pass

    此后基类无法实例，只能通过子类调用，若实例化报 Can&#39;t instantiate abstract class Base with abstract methods open 错


异常处理:
    try:    处理可能含有异常的代码块
    except Exception as e:      对异常进行处理 返回异常给e 若要日志记录，小异常要在前面声明
    else:   没有发生异常执行else
    finally:    无论是否发生异常都会执行
    注：第一个异常发生后，同一代码块中后续部分程序不会执行

    raise:    手动程序报错 raise Exception(报错信息) 当有多个错误 用一个处理时(比如不同错误记录同一份日志) 可以简化代码
    assert:    断言，用于强制用户服从，不服就报错，可以放到try块中补货，但一般没人去补货。

反射:
    在其他语言中称之为重型武器（因为会消耗大量时间），但Python不同，执行效率异常的高
    若想用 b = &quot;name&quot; 来取对象中的self.name 可以利用obj.__dict__[b]方法以外还可以利用如下操作:

    通过字符串的形式操作对象中的成员（这里包含类  （即Foo等等的类） 因为类也是一个对象，对象也是对象，模块也 一样）
    若str == &quot;类&quot;/&quot;方法&quot;即为取出对应的地址之后加括号即可利用一系列操作

    getattr: (obj,&quot;name&quot;) 利用成员对应的字符串来获取成员
    setattr: (obj,&quot;key&quot;,&quot;value&quot;) 设置新的成员及对应值，若已有此成员则对其进行修改
    delattr: (obj,&quot;name&quot;) 删除字符串相应的成员
    hasattr: (obj,&quot;name&quot;) 判断字符串对应的成员是否在对象中存在
    注意,这里是成员，包括了字段和方法

    因此在不同类中也可以import导入后调用（导入的模块实质上也是对象）模块.类名即可访问类
    有些web框架也是利用反射来实现点击跳转页面功能，其中的Handler封装了get和post请求。
        前端通常点击时在http中发送了一个get请求，get请求会带着字符串，字符串便发送到服务器端，框架的后台拿到请求之后会先获取
        get字符串，然后会根据字符串找到类里的get方法并执行（基于反射实现，路由系统）

extra:（根据字符串动态导入模块）
    module = &quot;导入的目录path.文件py&quot;  #以后通过module参数接收的不同即能动态导入
    func_name = &quot;函数名&quot;
    import importlib
    m = importlib.import_module(module) #此时即动态导入了对应模块，m打印即为模块路径
    func = getattr(m,func_name) #利用反射方法实现动态从数据库获取的数据并执行方法
    func()


单例设计模式:-----单个实例（目的：永远使用同一份实例）
    不像其他语言例如java，单例模式还分为饿汉式和懒汉式，python通常来说只有一种，其他都是基于这一种进行延伸
    像obj = Foo() obj不止叫对象，通常也称其为类的实例，而这一过程就是实例化的过程

    单例：顾名思义即是只有一个实例（对象） 例：
    class Foo:
        __instance = None                   #声明一个静态字段默认为空

        @classmethod                        #声明是类方法
        def get_instance(cls):              #实现单例方法
            if cls.__instance:              #判断字段是否为空
                return cls.__instance       #不为空，返回对象
            else:
                cls.__instance = Foo()      #为空创建实例
                return cls.__instance       #并返回对象

    因此静态字段就类似一个开关，若无值则创建,而创建后的实例的确是只有一份，一旦改动则都受牵连

    应用场景:假设连接数据库非常耗时。数据库连接池：就是如果连接数据库开辟了五个线程并占满，当执行完后线程资源释放后其他人才能使用
        无论多少人来访问，但数据库连接池的五个线程却应该只开辟一份（没听说过谁会每次都为用户开辟一份新的连接池）。但将其类比为是一个类
        无论是谁来访问，按理来说都应该用同一个对象（实例）。此时设计成单例模式，每次请求都利用同一实体即可

        tornado:里面的.ioloop.IOLoop类有一个静态方法instance() 里面用hasattr(IOLoop,&quot;_instance&quot;)来找，若有则返回（加了锁的），没有
        则创建IOLoop()类的实例赋值给IOLoop._instance，再返回。因此以后用instance时永远只有这么一个实例(详细见代码)
        if not hasattr(IOLoop,&quot;_instance&quot;):#判断_instance是否存在（利用了反射）
            with IOLoop._instance_lock:
                if not hasattr(IOLoop,&quot;_instance&quot;):#判断同上
                    IOLoop._instance = IOLoop()#无则创建
        return IOLoop._instance              #这里没有写else 程序到这里是直接返回实例（有则返回，无则创建返回：利用单例）
        拿到实例之后.start()就直接是死循环来进行端口监听

本节作业:(认真复习)
    选课系统:5


#对于每一个请求来的时候，你想让它为你封装一部分数据的时候，就选用面向对象的类，这就对了（或是多个方法用到同一个字段时）
</code></pre><h2 id="理解-mateclass" tabindex="-1"><a class="header-anchor" href="#理解-mateclass"><span>理解 mateclass</span></a></h2><h3 id="_1-什么是-metaclass" tabindex="-1"><a class="header-anchor" href="#_1-什么是-metaclass"><span>1.什么是 metaclass</span></a></h3><p>mate: 一词来源于希腊，大部分书籍中翻译为元</p><ul><li><p>Beyond，例如技术词汇 metadata，意思是描述数据的超越数据。</p></li><li><p>Change，例如技术词汇 metamorphosis，意思是改变的形态。</p></li></ul><p>但 python 中，应该理解为描述类的超类，同时可以改变子类的形态。</p><p>【特性】：没有 metaclass 的情况下，子类继承父类，父类是无法对子类进行操作的。说白了，metaclass 的作用就是可是父类对子类进行操作，可以<br> 像装饰器一样动态定制和修改继承它的子类，</p><h3 id="_2-metaclass-能解决什么问题" tabindex="-1"><a class="header-anchor" href="#_2-metaclass-能解决什么问题"><span>2.metaclass 能解决什么问题</span></a></h3><pre><code>class Mymeta(type):
    def __init__(cls, name, bases, dic):
        super().__init__(name, bases, dic)
        print(&#39;===&gt;Mymeta.__init__&#39;)
        print(cls.__name__)
        print(&quot;name&quot;, name, &quot;bases&quot;, bases, &quot;dic&quot;, dic)
        print(cls.yaml_tag)

    def __new__(mcs, *args, **kwargs):
        print(&#39;===&gt;Mymeta.__new__&#39;)
        print(mcs.__name__)
        return type.__new__(mcs, *args, **kwargs)

    def __call__(cls, *args, **kwargs):
        print(&#39;===&gt;Mymeta.__call__&#39;, cls)
        obj = cls.__new__(cls)
        cls.__init__(cls, *args, **kwargs)
        return obj
</code></pre><p>class Foo(metaclass=Mymeta):<br> ​ yaml_tag = &#39;!Foo&#39;<br> ​<br> ​ def <strong>init</strong>(self, name):<br> ​ print(&#39;Foo.<strong>init</strong>&#39;)<br> ​ <a href="http://self.name" target="_blank" rel="noopener noreferrer">self.name</a> = name<br> ​<br> def <strong>new</strong>(cls, *args, **kwargs):<br> print(&#39;Foo.<strong>new</strong>&#39;)<br> return object.<strong>new</strong>(cls)</p><pre><code>f = Foo(&quot;ykb&quot;)
</code></pre><p>结果：</p><ul><li><p>调用顺序 父类 <strong>new</strong> -&gt; 父类 <strong>init</strong> -&gt; 父类 <strong>call</strong> -&gt; 子类 <strong>new</strong> -&gt; 子类 <strong>init</strong></p></li><li><p>父类 <strong>init</strong> 中的 cls, name, bases, dic 分别对应子类 &lt;class &#39;<strong>main</strong>.Foo&#39;&gt;, Foo, (), Foo 内部字典（不是<strong>dict</strong>）</p></li><li><p>mcs：这个才相当与父类的 self，它指向了当前父类本身</p></li></ul><p>正常情况下我们在父类中是不能对子类的属性进行操作，但是元类可以。换种方式理解：元类、装饰器、类装饰器都可以归为元编程。</p><h3 id="_3-python-底层语言设计层面是如何实现-metaclass-的" tabindex="-1"><a class="header-anchor" href="#_3-python-底层语言设计层面是如何实现-metaclass-的"><span>3.Python 底层语言设计层面是如何实现 metaclass 的</span></a></h3><p>Python 中所有定义的类，都是 type 类的实例，type 类即上帝类</p><h4 id="python-上帝类-type" tabindex="-1"><a class="header-anchor" href="#python-上帝类-type"><span>python 上帝类 type：</span></a></h4><p>上帝类：（object 被默认继承的类，注意不是 type，而是 type 的基类）<br> #######################<br> a.始终记住，在 Python 中，一起事物皆对象 例：</p><p>b.</p><pre><code>class Foo: pass

obj = Foo()
</code></pre><ul><li>此时称 obj 为 Foo 类的对象 那么 Foo 类又是谁的对象。Foo 是 type 的对象，因此 Foo 不过是 class 开头的对象</li></ul><p>c.</p><ul><li><p>类其实都是 type 类的对象，实际类的对象: type()</p><pre><code>因此以上等同于 Foo = type()
</code></pre><p>#######################</p><pre><code>class MyClass:
    data = 1

instance = MyClass()

print(type(instance))
print(type(MyClass))
print(type)
</code></pre></li></ul><p>得到结果：</p><pre><code>&lt;class &#39;__main__.MyClass&#39;&gt;
&lt;class &#39;type&#39;&gt;
&lt;class &#39;type&#39;&gt;
</code></pre><p>可证明，MyClass 的实例类型为 MyClass，但 MyClass 和 type 的类型都是 type，表明，MyClass 继承与 type 类，为上帝类的子类</p><h4 id="type-类" tabindex="-1"><a class="header-anchor" href="#type-类"><span>type 类：</span></a></h4><p>正常创建一个类 还可以利用 type 方法 如下:</p><pre><code>def f(self):    # 注意此处有self
    print(&quot;另一种写法&quot;)

Foo = type(&quot;Foo&quot;, (object,), {&quot;func&quot;: f})
</code></pre><ul><li><p>classname：第一个参数，类名</p></li><li><p>superclasses：第二个参数，当前类的基类</p></li><li><p>attributedict：第三个参数，类的成员 (此处用 func 代替)</p><p>Foo().func() # 类 是由 type 类实例化产生 上文通过 type 自定义创建一个类 才是类实际的创建方式</p></li></ul><p>因此 metaclass ———— 类的祖宗 (普通类都是 type 创建的, 那么普通类都是 type 类的实例化对象 )</p><pre><code>即：  Foo = type()
</code></pre><p>metaclass = 类 :则可更改普通类的默认值（继承 type 类）</p><h4 id="type-类的-call-运算符重载" tabindex="-1"><a class="header-anchor" href="#type-类的-call-运算符重载"><span>type 类的 <strong>call</strong> 运算符重载</span></a></h4><p>由上文可知，所有类的父类都是上帝类，我们知道，当 Foo()() 时会触发 Foo 的 <strong>call</strong> 方法。那么当实例化 mateclass 改写的类时<br> Baz() 就会触发 type 的 <strong>call</strong> 方法。</p><pre><code>class Foo:
    def __call__(self, *args, **kwargs):
        print(&quot;触发call方法&quot;)

Foo()() : type -&gt; type_call -&gt; 诞生 Foo实例 Foo() -&gt; 再加括号 -&gt; Foo_call -&gt; 诞生出 Foo()()，返回的是 Foo_call 的返回值

class Bar(type):
    def __call__(self, *args, **kwargs):
        print(&quot;触发父类call方法&quot;)

class Baz(metaclass=Bar)
    def __init__(self):
        pass

Baz(): type -&gt; type_call -&gt; 被子类复写 -&gt; Bar_call -&gt; 诞生 Baz实例 Baz()

Baz() 实际上是执行了 type()() 因此触发了type类的 __call__ 方法
</code></pre><p>其实每定义一个类，python 解释器实质上执行了如下代码：</p><pre><code>class MyClass:
    data = 1

class = type(classname, superclasses, attributedict)      # 见上文 type 类
</code></pre><p>它相当于是实例化了一个 type 类（上文 Baz 同理）</p><p>这里等号右边的 type(classname, superclasses, attributedict)，就是 type 的 <strong>call</strong> 运算符重载，它会进一步调用：</p><pre><code>type.__new__(typeclass, classname, superclasses, attributedict)
type.__init__(class, classname, superclasses, attributedict)
</code></pre><h4 id="metaclass-本质" tabindex="-1"><a class="header-anchor" href="#metaclass-本质"><span>metaclass 本质</span></a></h4><p>metaclass 是 type 的子类，通过替换 type 的 <strong>call</strong> 运算符重载机制，“超越变形”正常的类</p><p>其实，理解了以上几点，我们就会明白，正是 Python 的类创建机制，给了 metaclass 大展身手的机会。</p><p>一旦你把一个类型 MyClass 的 metaclass 设置成 MyMeta，MyClass 就不再由原生的 type 创建，而是会调用 MyMeta 的 <strong>call</strong> 运算符重载。</p><pre><code>class = type(classname, superclasses, attributedict)
# 变为了
class = MyMeta(classname, superclasses, attributedict)
</code></pre><p>这相当于拿到了 type 创建类的权限，可以最大限度的改写，好用，也十分危险</p><p>【注意】：</p><ul><li>metaclass 仅仅是给小部分 Python 开发者，在开发框架层面的 Python 库时使用的。而在应用层，metaclass 往往不是很好的选择。</li></ul><p>-metaclass 是黑魔法，使用得当就是天堂，反之就是地狱。</p>`,57))])}const m=o(_,[["render",d]]),B=JSON.parse('{"path":"/python/%E8%AF%AD%E8%A8%80/%E8%BF%9B%E9%98%B6/%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1.html","title":"面向对象","lang":"zh-CN","frontmatter":{"title":"面向对象","order":8,"article":false,"description":"面向对象 计算机中，一切皆对象，世界里，万物皆对象，对象皆分类 因此描述对象先不直接写一个对象而是先思考一类对象的共性 1. 对象 学过Java 的都知道 Object是 class 的一个实例， python 其实比 JAVA 面向对象更彻底，它的类和函数都是对象，它具有以下 【特性】： 赋值给一个变量 可以添加到集合对象中 可以作为参数传递给函数 ...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"WebPage\\",\\"name\\":\\"面向对象\\",\\"description\\":\\"面向对象 计算机中，一切皆对象，世界里，万物皆对象，对象皆分类 因此描述对象先不直接写一个对象而是先思考一类对象的共性 1. 对象 学过Java 的都知道 Object是 class 的一个实例， python 其实比 JAVA 面向对象更彻底，它的类和函数都是对象，它具有以下 【特性】： 赋值给一个变量 可以添加到集合对象中 可以作为参数传递给函数 ...\\"}"],["meta",{"property":"og:url","content":"https://igarashi-g.github.io/python/%E8%AF%AD%E8%A8%80/%E8%BF%9B%E9%98%B6/%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1.html"}],["meta",{"property":"og:site_name","content":"悦 ▪ 宝宝"}],["meta",{"property":"og:title","content":"面向对象"}],["meta",{"property":"og:description","content":"面向对象 计算机中，一切皆对象，世界里，万物皆对象，对象皆分类 因此描述对象先不直接写一个对象而是先思考一类对象的共性 1. 对象 学过Java 的都知道 Object是 class 的一个实例， python 其实比 JAVA 面向对象更彻底，它的类和函数都是对象，它具有以下 【特性】： 赋值给一个变量 可以添加到集合对象中 可以作为参数传递给函数 ..."}],["meta",{"property":"og:type","content":"website"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-09-20T09:45:54.000Z"}],["meta",{"property":"article:modified_time","content":"2022-09-20T09:45:54.000Z"}]]},"git":{"createdTime":1663517244000,"updatedTime":1663667154000,"contributors":[{"name":"Igarashi","username":"Igarashi","email":"2545369032@qq.com","commits":4,"url":"https://github.com/Igarashi"}]},"readingTime":{"minutes":20.55,"words":6166},"filePathRelative":"python/语言/进阶/面向对象.md","excerpt":"\\n<p>计算机中，一切皆对象，世界里，万物皆对象，对象皆分类</p>\\n<p>因此描述对象先不直接写一个对象而是先思考一类对象的共性</p>\\n<h2>1. 对象</h2>\\n<p>学过<code>Java</code> 的都知道<code> Object</code>是 <code>class</code> 的一个实例， python 其实比 JAVA 面向对象更彻底，它的类和函数都是对象，它具有以下</p>\\n<p>【特性】：</p>\\n<ul>\\n<li>\\n<p>赋值给一个变量</p>\\n<div class=\\"language-python line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"python\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">def</span><span style=\\"--shiki-light:#4078F2;--shiki-dark:#61AFEF\\"> ask</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic\\">name</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">=</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">\\"YKB\\"</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">): </span><span style=\\"--shiki-light:#0184BC;--shiki-dark:#56B6C2\\">print</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">(name)</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">func </span><span style=\\"--shiki-light:#383A42;--shiki-dark:#56B6C2\\">=</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\"> ask</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#61AFEF\\">func</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">\\"PDA\\"</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">)</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">class</span><span style=\\"--shiki-light:#C18401;--shiki-dark:#E5C07B\\"> Person</span><span style=\\"--shiki-light:#C18401;--shiki-dark:#ABB2BF\\">()</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">:</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">    def</span><span style=\\"--shiki-light:#0184BC;--shiki-dark:#56B6C2\\"> __init__</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E5C07B;--shiki-dark-font-style:italic\\">self</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">,</span><span style=\\"--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic\\"> name</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">=</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">\\"YKB\\"</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">): </span><span style=\\"--shiki-light:#0184BC;--shiki-dark:#56B6C2\\">print</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">(name)</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">my_class </span><span style=\\"--shiki-light:#383A42;--shiki-dark:#56B6C2\\">=</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\"> Person</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#61AFEF\\">my_class</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">\\"PDA\\"</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">)</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div></li>\\n<li>\\n<p>可以添加到集合对象中</p>\\n</li>\\n<li>\\n<p>可以作为参数传递给函数</p>\\n</li>\\n<li>\\n<p>可以当做函数的返回值</p>\\n</li>\\n</ul>","autoDesc":true}');export{m as comp,B as data};
