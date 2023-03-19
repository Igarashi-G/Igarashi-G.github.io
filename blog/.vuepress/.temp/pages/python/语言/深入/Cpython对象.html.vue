<template><div><p><strong>Cpython</strong> 的对象</p>
<!--more-->
<h2 id="_1-python-对象实现机制" tabindex="-1"><a class="header-anchor" href="#_1-python-对象实现机制" aria-hidden="true">#</a> 1. Python 对象实现机制</h2>
<p>在顶层抽象上，<strong>python</strong> 对象是属性、方法、作用域的集合</p>
<p>在底层实现上，<strong>python</strong> 对象不过就是对 <strong>C</strong> 语言 <strong>struct</strong> 结构的封装</p>
<h3 id="_1-1-cpython-结构体" tabindex="-1"><a class="header-anchor" href="#_1-1-cpython-结构体" aria-hidden="true">#</a> 1.1 CPython 结构体</h3>
<p>一个 <strong>python</strong> 的 <strong>int</strong> 类型可写成如下形式</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">python_int</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>value <span class="token operator">=</span> value

    <span class="token keyword">def</span> <span class="token function">add_fun</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> num<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>value <span class="token operator">+</span> num

    <span class="token keyword">def</span> <span class="token function">mul_fun</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> num<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>value <span class="token operator">*</span> num

    <span class="token keyword">def</span> <span class="token function">equal_fun</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">pass</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>python</strong> 对应 <strong>C</strong> 的结构体如下</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">_int</span> <span class="token punctuation">{</span>
    <span class="token keyword">long</span> value<span class="token punctuation">;</span>
    <span class="token keyword">long</span> <span class="token punctuation">(</span><span class="token operator">*</span>add_fun<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">long</span> a<span class="token punctuation">,</span> <span class="token keyword">long</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> <span class="token punctuation">(</span><span class="token operator">*</span>mul_fun<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">long</span> a<span class="token punctuation">,</span> <span class="token keyword">long</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    ```
<span class="token punctuation">}</span>Int_object<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>C</strong> 语言通过利用结构体 <strong>struct</strong> 和函数指针，即完成了对象的模拟，尽管办法很 <code v-pre>‘土’</code>，但已初窥门径</p>
<p>对象即是 <strong>struct</strong> 的封装，如此思想可助于理解很多 <strong>python</strong> 中难以理解的问题</p>
<h3 id="_1-2-解决问题" tabindex="-1"><a class="header-anchor" href="#_1-2-解决问题" aria-hidden="true">#</a> 1.2 解决问题</h3>
<p>如上示例，实现一个 <strong>python</strong> 中的 <strong>int</strong> 类型对象，需要一个非常大的 <strong>struct</strong> 来装下 <strong>int</strong> 的值和可以作用于该对象的所有方法，但是，<strong>太浪费空间了</strong>（<em><strong>python</strong> 一切皆对象，那么每次 <strong>new</strong> 对象就要实现一个结构体，过于浪费空间了</em> ）</p>
<p><strong>C</strong> 语言中，函数指针的返回值类型、参数类型都需要事先声明，但在 <strong>python</strong> 中无论传入什么类型都不需要声明</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token builtin">str</span><span class="token punctuation">(</span><span class="token string">"3"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># 其实结果上是完全一致的</span>
<span class="token comment"># True</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-结构体空间问题" tabindex="-1"><a class="header-anchor" href="#_1-结构体空间问题" aria-hidden="true">#</a> 1.结构体空间问题</h3>
<p>python 相同的 内建类型 对应的方法都是一样的。借鉴设计模式的思想，把类型的值与类型所拥有的方法分开维护，所有 相同的类型对象 指向一个
共同的方法 struct 结构，这样一个对象就可以被压缩到很小了。</p>
<p>代码及图示如下</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">_int</span><span class="token punctuation">{</span>    # 代表下文每个对象
<span class="token keyword">long</span> value<span class="token punctuation">;</span>
strcut _int_methods <span class="token operator">*</span>methods<span class="token punctuation">;</span>
<span class="token punctuation">}</span> PyInt_Object<span class="token punctuation">;</span>

<span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">_int_methods</span><span class="token punctuation">{</span>    # 代表下文方法族
    <span class="token keyword">long</span> <span class="token punctuation">(</span><span class="token operator">*</span>add_fun<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">long</span> a<span class="token punctuation">,</span> <span class="token keyword">long</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> <span class="token punctuation">(</span><span class="token operator">*</span>mul_fun<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">long</span> a<span class="token punctuation">,</span> <span class="token keyword">long</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    ```
<span class="token punctuation">}</span>Int_methods<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="@source/python/语言/深入/img/CPython_Int对象.png"> 
<pre><code>int对象1 ————
            |——————int对象方法族
int对象2 ————
</code></pre>
<h3 id="_2-python-数据对象的核心基石" tabindex="-1"><a class="header-anchor" href="#_2-python-数据对象的核心基石" aria-hidden="true">#</a> 2.python 数据对象的核心基石</h3>
<p>方案是，在 python 的所有的类型对象中都有类型一个类型属性 type ，python 正是靠着这个属性正确地区分它们，在 python 中，可以用 type 函数打印
他们。</p>
<div class="language-C ext-C line-numbers-mode"><pre v-pre class="language-C"><code>print(type(1))
print(type(type(1)))
&lt;class 'int'&gt;
&lt;class 'type'&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你猜的没错，type 本身也是一个 python 对象，或者说，也是一个封装的 struct。 既然所有相同类型的对象都具有共同的方法，那么把 type 属性
与方法们封装到一个 struct 中也就是一个很自然的想法了。 事实上，python 也正是这么做的。</p>
<p>而在 python 世界中，对象们除了‘我是谁’（type）这个问题之外，还有另一个更重要的问题等着他们。</p>
<p>‘我还活着吗？’</p>
<h4 id="衍生-垃圾回收" tabindex="-1"><a class="header-anchor" href="#衍生-垃圾回收" aria-hidden="true">#</a> 衍生：垃圾回收</h4>
<p>这不是搞笑，众所周知，python 垃圾回收采用了一个经典的（老土的）设计方法--引用计数。(见 3.2 垃圾回收，很老土的机制)</p>
<p>所有的 python 对象都要有一个记录自己引用计数的属性，refcnt， 当 refcnt == 0 时，意味着没有任何 python 变量引用该对象。python 会将该
对象销毁，以免他们成为无主幽魂（内存泄漏）。</p>
<p>python 中所有的对象都实现了这两个属性 refcnt 与 type，换句话说，实现了这两个成员的 struct 变量都是 python 中的对象。代码如下:</p>
<div class="language-C ext-C line-numbers-mode"><pre v-pre class="language-C"><code>typedef struct _object{
    int ob_refcnt;                        //引用计数
    struct _typeobject *ob_type;         // 类型对象
}PyObject;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而之前提到的整数类型 PyIntObject 实现如下:</p>
<div class="language-C ext-C line-numbers-mode"><pre v-pre class="language-C"><code>typedef struct{
    int ob_refcnt;                        //引用计数
    struct _typeobject *ob_type;         // 类型对象
    long ob_ival；                        //int对象维护的值
} PyIntObject；
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到 python 中整数对象、PyIntObject 就是在 PyObject 的基础上维护了一个 long 的值。（就多了个 int 对象维护的值）</p>
<p>而这个 PyObject 是 python 对象的核心基石，也是 python 最强大的魔法来源之一。</p>
<p>python 中所有的对象都有一个这样的 PyObject 头。这样我们就很好理解，在 python 中，所有的变量，所有的函数，所有的类，其实都是 PyObject 对象。</p>
<p>而函数所有的输入、输出，都是 PyObject 对象·········的指针。</p>
<h3 id="我们来谈谈指针" tabindex="-1"><a class="header-anchor" href="#我们来谈谈指针" aria-hidden="true">#</a> 我们来谈谈指针：</h3>
<p>为什么对象的 struct 有了共同的头，就可以使用同一个指针？对 c 语言了解不深的同学可以看看我的解释。
在 c 语言中，指针有着三个作用</p>
<ul>
<li>
<p>指针所指对象的位置</p>
</li>
<li>
<p>指针所指对象的大小</p>
</li>
<li>
<p>指针所指对象的解释方法</p>
</li>
</ul>
<p>利用任何 python 对象的 PyObject 的指针 *p, 都可以通过 p-&gt;ob_type 获得对象的类型信息，python 可以根据这个更换成相应的指针，比如 *PyIntObject。</p>
<p>python 的 type 类型在源码中的定义（struct 结构声明）如下:</p>
<p>太长了，你们不用全部都看(ˊo̴̶̷̤⌄o̴̶̷̤ˋ)。</p>
<div class="language-C ext-C line-numbers-mode"><pre v-pre class="language-C"><code>typedef struct _typeobject {
    int ob_refcnt;                        //引用计数
    struct _typeobject *ob_type;          //类型对象
    int ob_size;                          //变长对象的长度，如len（list）， len(str), len(dict)，int类型没有该属性
    const char *tp_name; /* For printing, in format &quot;&lt;module&gt;.&lt;name&gt;&quot; */   // 变量的类型名字 如&lt;class 'int'&gt;    &lt;class 'type'&gt;
    Py_ssize_t tp_basicsize, tp_itemsize; /* For allocation */

    /* Methods to implement standard operations */

    destructor tp_dealloc;
    printfunc tp_print;
    getattrfunc tp_getattr;
    setattrfunc tp_setattr;
    cmpfunc tp_compare;
    reprfunc tp_repr;

    /* Method suites for standard classes */

    PyNumberMethods *tp_as_number;       //数字类型方法族
    PySequenceMethods *tp_as_sequence;   //序列类型方法族
    PyMappingMethods *tp_as_mapping;     //映射类型方法族

    /* More standard operations (here for binary compatibility) */

    hashfunc tp_hash;
    ternaryfunc tp_call;
    reprfunc tp_str;
    getattrofunc tp_getattro;
    setattrofunc tp_setattro;

    /* Functions to access object as input/output buffer */
    PyBufferProcs *tp_as_buffer;

    /* Flags to define presence of optional/expanded features */
    long tp_flags;

    const char *tp_doc; /* Documentation string */

    /* Assigned meaning in release 2.0 */
    /* call function for all accessible objects */
    traverseproc tp_traverse;

    /* delete references to contained objects */
    inquiry tp_clear;

    /* Assigned meaning in release 2.1 */
    /* rich comparisons */
    richcmpfunc tp_richcompare;

    /* weak reference enabler */
    Py_ssize_t tp_weaklistoffset;

    /* Added in release 2.2 */
    /* Iterators */
    getiterfunc tp_iter;
    iternextfunc tp_iternext;

    /* Attribute descriptor and subclassing stuff */
    struct PyMethodDef *tp_methods;
    struct PyMemberDef *tp_members;
    struct PyGetSetDef *tp_getset;
    struct _typeobject *tp_base;
    PyObject *tp_dict;
    descrgetfunc tp_descr_get;
    descrsetfunc tp_descr_set;
    Py_ssize_t tp_dictoffset;
    initproc tp_init;
    allocfunc tp_alloc;
    newfunc tp_new;
    freefunc tp_free; /* Low-level free-memory routine */
    inquiry tp_is_gc; /* For PyObject_IS_GC */
    PyObject *tp_bases;
    PyObject *tp_mro; /* method resolution order */
    PyObject *tp_cache;
    PyObject *tp_subclasses;
    PyObject *tp_weaklist;
    destructor tp_del;

    /* Type attribute cache version tag. Added in version 2.6 */
    unsigned int tp_version_tag;

#ifdef COUNT_ALLOCS
    /* these must be last and never explicitly initialized */
    Py_ssize_t tp_allocs;
    Py_ssize_t tp_frees;
    Py_ssize_t tp_maxalloc;
    struct _typeobject *tp_prev;
    struct _typeobject *tp_next;
#endif
} PyTypeObject;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个 PyTypeObject 里声明了所有 python 内置类型的方法，所有的内置类型实现的方法都只是该声明的一个子集。</p>
<p>其中尤其值得注意的是其中声明的三个方法族指针</p>
<div class="language-C ext-C line-numbers-mode"><pre v-pre class="language-C"><code>PyNumberMethods *tp_as_number;       //数字类型方法族
PySequenceMethods *tp_as_sequence;   //序列类型方法族
PyMappingMethods *tp_as_mapping;     //映射类型方法族
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>他们每一个都代表了该类型的一系列方法。
这三类不同的方法族就是 python 的内置对象被划为三大类的根本原因，数值类型、序列类型、映射类型。</p>
<p>比如 PyNumberMethods 的代码如下:
(也是很长很长···)</p>
<div class="language-C ext-C line-numbers-mode"><pre v-pre class="language-C"><code>typedef struct {
    /* For numbers without flag bit Py_TPFLAGS_CHECKTYPES set, all
       arguments are guaranteed to be of the object's type (modulo
       coercion hacks -- i.e. if the type's coercion function
       returns other types, then these are allowed as well).  Numbers that
       have the Py_TPFLAGS_CHECKTYPES flag bit set should check *both*
       arguments for proper type and implement the necessary conversions
       in the slot functions themselves. */

    binaryfunc nb_add;            //加法
    binaryfunc nb_subtract;       //减法
    binaryfunc nb_multiply;       //乘法
    binaryfunc nb_divide;         //除法
    binaryfunc nb_remainder;      //求余
    binaryfunc nb_divmod;
    ternaryfunc nb_power;
    unaryfunc nb_negative;
    unaryfunc nb_positive;
    unaryfunc nb_absolute;
    inquiry nb_nonzero;
    unaryfunc nb_invert;
    binaryfunc nb_lshift;
    binaryfunc nb_rshift;
    binaryfunc nb_and;
    binaryfunc nb_xor;
    binaryfunc nb_or;
    coercion nb_coerce;
    unaryfunc nb_int;
    unaryfunc nb_long;
    unaryfunc nb_float;
    unaryfunc nb_oct;
    unaryfunc nb_hex;
    /* Added in release 2.0 */
    binaryfunc nb_inplace_add;
    binaryfunc nb_inplace_subtract;
    binaryfunc nb_inplace_multiply;
    binaryfunc nb_inplace_divide;
    binaryfunc nb_inplace_remainder;
    ternaryfunc nb_inplace_power;
    binaryfunc nb_inplace_lshift;
    binaryfunc nb_inplace_rshift;
    binaryfunc nb_inplace_and;
    binaryfunc nb_inplace_xor;
    binaryfunc nb_inplace_or;

    /* Added in release 2.2 */
    /* The following require the Py_TPFLAGS_HAVE_CLASS flag */
    binaryfunc nb_floor_divide;
    binaryfunc nb_true_divide;
    binaryfunc nb_inplace_floor_divide;
    binaryfunc nb_inplace_true_divide;

    /* Added in release 2.5 */
    unaryfunc nb_index;
} PyNumberMethods;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，PyNumberMethods 没有 PyObject 头，它没有回答 python 对象的两个关键问题，所以尽管他也是 struct 结构体，但它不是 python 对象。</p>
<p>那么在我们的 python 中，整数类型对象实现如下 PyInt_Type：</p>
<div class="language-C ext-C line-numbers-mode"><pre v-pre class="language-C"><code>PyTypeObject PyInt_Type = {
    1；             //引用计数
    type；          //类型
    &quot;int&quot;,
    sizeof(PyIntObject),
    0,
    (destructor)int_dealloc,                    /* tp_dealloc */
    (printfunc)int_print,                       /* tp_print */
    0,                                          /* tp_getattr */
    0,                                          /* tp_setattr */
    (cmpfunc)int_compare,                       /* tp_compare */
    (reprfunc)int_to_decimal_string,
    &amp;int_as_number,                             //数字类型方法族
    0,                                          //序列类型方法族
    0,                                          /* tp_as_mapping */映射类型方法族
    (hashfunc)int_hash,                         /* tp_hash */
    0,                                          /* tp_call */
    (reprfunc)int_to_decimal_string,            /* tp_str */
    PyObject_GenericGetAttr,                    /* tp_getattro */
    0,                                          /* tp_setattro */
    0,                                          /* tp_as_buffer */
    Py_TPFLAGS_DEFAULT | Py_TPFLAGS_CHECKTYPES |
        Py_TPFLAGS_BASETYPE | Py_TPFLAGS_INT_SUBCLASS,          /* tp_flags */
    int_doc,                                    /* tp_doc */
    0,                                          /* tp_traverse */
    0,                                          /* tp_clear */
    0,                                          /* tp_richcompare */
    0,                                          /* tp_weaklistoffset */
    0,                                          /* tp_iter */
    0,                                          /* tp_iternext */
    int_methods,                                /* tp_methods */
    0,                                          /* tp_members */
    int_getset,                                 /* tp_getset */
    0,                                          /* tp_base */
    0,                                          /* tp_dict */
    0,                                          /* tp_descr_get */
    0,                                          /* tp_descr_set */
    0,                                          /* tp_dictoffset */
    0,                                          /* tp_init */
    0,                                          /* tp_alloc */
    int_new,                                    /* tp_new */
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也不需要全部看，只要看到那些一大堆 0，我想你就应该差不多明白了，PyInt_Type 是 PyTypeObject 结构体声明实现一个结构变量，只实现了所有
方法的一部分，这也符合我们对 python 的认知，你当然不应该这样写代码</p>
<p>5[6]</p>
<p>因为 PyInt_Type 没有实现序列方法族。（在序列方法族与映射方法族的两行上，全都是 0，代码中我已经使用中文标注出来了）</p>
<p>反而言之，如果 PyInt_Type 实现了序列方法族，代码就可以这样写了。</p>
<p>5[6]</p>
<p>至于结果如何，全看你自己喜欢如何定义咯。</p>
<h2 id="迎刃而解" tabindex="-1"><a class="header-anchor" href="#迎刃而解" aria-hidden="true">#</a> 迎刃而解</h2>
<p>理解了 python 对象在 c 语言源码中的实现方式，许多问题都将迎刃而解。</p>
<h3 id="_1、为什么-python-语言明明没有变量声明-却是强类型语言-python-是如何检查类型的" tabindex="-1"><a class="header-anchor" href="#_1、为什么-python-语言明明没有变量声明-却是强类型语言-python-是如何检查类型的" aria-hidden="true">#</a> 1、为什么 python 语言明明没有变量声明，却是强类型语言？python 是如何检查类型的？</h3>
<p>因为 python 语言可以通过对象的 PyObject 指针获得他们类型信息，从而检查他们的类型。反观 c 语言，尽管有类型声明，然而 c 语言并没有检查他们
变量类型的手段，或者换句话说，c 语言中存储的值不记录他们自身的类型信息。</p>
<h3 id="_2、为什么-list-dict-等容器可以随意嵌套-如此灵活" tabindex="-1"><a class="header-anchor" href="#_2、为什么-list-dict-等容器可以随意嵌套-如此灵活" aria-hidden="true">#</a> 2、为什么 list，dict 等容器可以随意嵌套，如此灵活？</h3>
<p>因为对于这些容器来说，他们存放的只是对象引用，也就是 PyObject 指针，无论存放什么对象对容器来说毫无区别。不难猜想，简单地利用 c 语言中的
数组，就可以实现 python 中的 list。</p>
<h3 id="_3、类的方法第一个参数是它自身-如何实现" tabindex="-1"><a class="header-anchor" href="#_3、类的方法第一个参数是它自身-如何实现" aria-hidden="true">#</a> 3、类的方法第一个参数是它自身，如何实现？</h3>
<p>简单啊，在方法的 struct 中加一个记录 自己所属类 的 成员变量 就可以了。</p>
<h3 id="关于-python-的一致性。" tabindex="-1"><a class="header-anchor" href="#关于-python-的一致性。" aria-hidden="true">#</a> 关于 python 的一致性。</h3>
<p>在《流畅的 python》一书中，作者开篇就是</p>
<pre><code>“python最好的品质之一就是一致性。”
</code></pre>
<p>而在该书的封底则写着</p>
<pre><code>“理解为什么特殊方法是对象行为的一直的关键”。
</code></pre>
<p>读完此文之后，相信你已经理解了这句话的含义了，并且了解了所谓的一致性是如何实现的。</p>
<p>所谓的特殊方法，就是 PyTypeObject 中所给出的那一大串长长的方法。</p>
<p>他们就像是 python 赠与使用者的武器库，python 不把它们雪藏起来，而是大大方方向我们地敞开，你可以随意挑选合适的武器武装自己。获得与
python 内置类型十分相似的属性。</p>
<h3 id="然而就其本质而言-这些所谓的特殊方法实际上并没有什么真正特殊的地方。" tabindex="-1"><a class="header-anchor" href="#然而就其本质而言-这些所谓的特殊方法实际上并没有什么真正特殊的地方。" aria-hidden="true">#</a> 然而就其本质而言，这些所谓的特殊方法实际上并没有什么真正特殊的地方。</h3>
<p>一个类，只要你实现了<strong>getitem</strong>方法，就可以使用[]操作符，换句话说 A[b]与 A.<strong>getitem</strong>(b)普通函数调用别无二致,只是 python 提供给使用
者的语法糖而已。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">A</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>value <span class="token operator">=</span> value

    <span class="token keyword">def</span> <span class="token function">__getitem__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> item<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>value <span class="token operator">+</span> item

a <span class="token operator">=</span> A<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"a[6] = "</span><span class="token punctuation">,</span> a<span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token keyword">for</span> i <span class="token keyword">in</span> a<span class="token punctuation">:</span>
    <span class="token keyword">if</span> i <span class="token operator">></span> <span class="token number">10</span><span class="token punctuation">:</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>

<span class="token keyword">if</span> <span class="token number">1000</span> <span class="token keyword">in</span> a<span class="token punctuation">:</span>   <span class="token comment"># 这里 in 的实质会进行遍历，会去调用 a[0]、a[1]、a[2]、a[3]、a[4] ... a[995] 直到叠加到1000，扩大数字试试</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"1000存储在对象a中"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>【注】：.<strong>getitem</strong>() 主要实现了对象迭代功能, 若有 li = [2, 3, 4] 当 li[key] 时 则调用<strong>getitem</strong>(self,item) item 就是传入的 key</p>
<p>a 明明不是一个序列，他充其量存储了一个整数值而已，然而只要我们实现了<strong>getitem</strong>方法就可以轻松骗过 python，它甚至还傻乎乎地认为 a 中存储了 1000 呢。</p>
<p>了解这些并不是为了鼓励你们写出这样的代码，而是让你们了解所谓的特殊方法只不过是 python 的语法糖而已，并不特殊。</p>
<p>除了语法糖之外，我认为特殊方法的另一重更重要含义是程序员之间的约定俗成。</p>
<p>【注意】：当你为一个类实现了 <strong>getitem</strong> 方法，那么它就应该是一个序列，或者说至少可以被当作序列来看待(参考什么是鸭子类型)，那你也
应该实现它 <strong>len</strong> 方法。上面这个类是不能使用 len(a)的，这不符合我们对序列的期待。</p>
<p>python 的一致性是由程序员之间的约定俗成共同维护的，这也就是为什么有人说：</p>
<pre><code>“在python里私自取名__（双下划线）开头的函数是非常自私的行为.”
</code></pre>
<p>了解规则的边界，是为了更好地利用它，而不是破坏它。</p>
<p>ps: 真正的 PyObject 对象已经变成了这样：</p>
<div class="language-C ext-C line-numbers-mode"><pre v-pre class="language-C"><code>typedef struct _object{
    struct _object *_ob_next;
    struct _object *_ob_prev;
    int ob_refcnt;                        //引用计数
    struct _typeobject *ob_type;         // 类型对象
}PyObject;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新加入的两个指针是在存活的对象之间构成一个双向链表，方便调试，与本文主题无关，故省去。</p>
<p>这篇文章 <a href="https://zhuanlan.zhihu.com/p/34410799" target="_blank" rel="noopener noreferrer">引用<ExternalLinkIcon/></a></p>
<p>源码读 python（二）<a href="https://zhuanlan.zhihu.com/p/34498622" target="_blank" rel="noopener noreferrer">内存中的 python 对象<ExternalLinkIcon/></a></p>
<p>源码读 python（三）<a href="https://zhuanlan.zhihu.com/p/34593593" target="_blank" rel="noopener noreferrer">Int 整数类型探秘<ExternalLinkIcon/></a></p>
</div></template>


