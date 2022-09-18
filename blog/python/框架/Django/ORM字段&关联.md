---
title: ORM基础
order: 6
---

一、字段：
AutoField(Field) - int 自增列，必须填入参数 primary_key=True（注意 MySQL 中只能有一个自增列，因此 Django 中设定必须如此，此时便没有默认的主键自增列了）

    BigAutoField(AutoField)
        - bigint自增列，必须填入参数 primary_key=True

        注：当model中如果没有自增列，则自动会创建一个列名为id的列
        from django.db import models

        class UserInfo(models.Model):
            # 自动创建一个列名为id的且为自增的整数列
            username = models.CharField(max_length=32)

        class Group(models.Model):
            # 自定义自增列
            nid = models.AutoField(primary_key=True)
            name = models.CharField(max_length=32)

    SmallIntegerField(IntegerField):
        - 小整数 -32768 ～ 32767

    PositiveSmallIntegerField(PositiveIntegerRelDbTypeMixin, IntegerField)
        - 正小整数 0 ～ 32767
    IntegerField(Field)
        - 整数列(有符号的) -2147483648 ～ 2147483647

    PositiveIntegerField(PositiveIntegerRelDbTypeMixin, IntegerField)
        - 正整数 0 ～ 2147483647

    BigIntegerField(IntegerField):
        - 长整型(有符号的) -9223372036854775808 ～ 9223372036854775807

    自定义无符号整数字段

        class UnsignedIntegerField(models.IntegerField):
            def db_type(self, connection):
                return 'integer UNSIGNED'

        PS: 返回值为字段在数据库中的属性，Django字段默认的值为：
            'AutoField': 'integer AUTO_INCREMENT',
            'BigAutoField': 'bigint AUTO_INCREMENT',
            'BinaryField': 'longblob',
            'BooleanField': 'bool',
            'CharField': 'varchar(%(max_length)s)',
            'CommaSeparatedIntegerField': 'varchar(%(max_length)s)',
            'DateField': 'date',
            'DateTimeField': 'datetime',
            'DecimalField': 'numeric(%(max_digits)s, %(decimal_places)s)',
            'DurationField': 'bigint',
            'FileField': 'varchar(%(max_length)s)',
            'FilePathField': 'varchar(%(max_length)s)',
            'FloatField': 'double precision',
            'IntegerField': 'integer',
            'BigIntegerField': 'bigint',
            'IPAddressField': 'char(15)',
            'GenericIPAddressField': 'char(39)',
            'NullBooleanField': 'bool',
            'OneToOneField': 'integer',
            'PositiveIntegerField': 'integer UNSIGNED',
            'PositiveSmallIntegerField': 'smallint UNSIGNED',
            'SlugField': 'varchar(%(max_length)s)',
            'SmallIntegerField': 'smallint',
            'TextField': 'longtext',
            'TimeField': 'time',
            'UUIDField': 'char(32)',

    BooleanField(Field)
        - 布尔值类型

    NullBooleanField(Field):
        - 可以为空的布尔值

    CharField(Field)
        - 字符类型
        - 必须提供max_length参数， max_length表示字符长度

    TextField(Field)
        - 文本类型

    EmailField(CharField)：
        - 字符串类型，Django Admin以及ModelForm中提供验证机制,带有检查Email合法性的 CharField,不接受 maxlength 参数

    IPAddressField(Field)！！废弃了
        - 字符串类型，Django Admin以及ModelForm中提供验证 IPV4 机制

    GenericIPAddressField(Field)（现在都用这个，代表 IPv4/6）
        - 字符串类型，Django Admin以及ModelForm中提供验证 Ipv4和Ipv6
        - 参数：
            protocol，用于指定Ipv4或Ipv6， 'both',"ipv4","ipv6"
            unpack_ipv4， 如果指定为True，则输入::ffff:192.0.2.1时候，可解析为192.0.2.1，开启刺功能，需要protocol="both"

    URLField(CharField)
        - 字符串类型，Django Admin以及ModelForm中提供验证 URL

    SlugField(CharField)
        - 字符串类型，Django Admin以及ModelForm中提供验证支持 字母、数字、下划线、连接符（减号）

    CommaSeparatedIntegerField(CharField)
        - 字符串类型，格式必须为逗号分割的数字

    UUIDField(Field)
        - 字符串类型，Django Admin以及ModelForm中提供对UUID格式的验证

    FilePathField(Field)
        - 字符串，Django Admin以及ModelForm中提供读取文件夹下文件的功能
        - 参数：
                path,                      文件夹路径
                match=None,                正则匹配
                recursive=False,           递归下面的文件夹
                allow_files=True,          允许文件
                allow_folders=False,       允许文件夹

    FileField(Field)
        - 字符串，路径保存在数据库，文件上传到指定目录
        - 参数：
            upload_to = ""      上传文件的保存路径
            storage = None      存储组件，默认django.core.files.storage.FileSystemStorage

    ImageField(FileField)
        - 字符串，路径保存在数据库，文件上传到指定目录
        - 参数：
            upload_to = ""      上传文件的保存路径
            storage = None      存储组件，默认django.core.files.storage.FileSystemStorage
            width_field=None,   上传图片的高度保存的数据库字段名（字符串）
            height_field=None   上传图片的宽度保存的数据库字段名（字符串）

    DateTimeField(DateField)
        - 日期+时间格式 YYYY-MM-DD HH:MM[:ss[.uuuuuu]][TZ]
        - auto_now_add    当对象首次被创建时,自动将该字段的值设置为当前时间.通常用于表示对象创建时间.
        - auto_now    当对象被保存时,自动将该字段的值设置为当前时间.通常用于表示 "last-modified" 时间戳.不支持update更新,仅支持get-save

    DateField(DateTimeCheckMixin, Field)  （也常用，保存创建时间）
        - 日期格式      YYYY-MM-DD

    TimeField(DateTimeCheckMixin, Field)
        - 时间格式      HH:MM[:ss[.uuuuuu]]

    DurationField(Field)
        - 长整数，时间间隔，数据库中按照bigint存储，ORM中获取的值为datetime.timedelta类型

    FloatField(Field)
        - 浮点型

    DecimalField(Field)
        - 10进制小数
        - 参数：
            max_digits，小数总长度
            decimal_places，小数位长度

    BinaryField(Field)
        - 二进制类型

二、参数：
null 数据库中字段是否可以为空
db_column 数据库中字段的列名 （相当于把列改了个名）
db_tablespace
default 数据库中字段的默认值
primary_key 数据库中字段是否为主键
db_index 数据库中字段是否可以建立索引
unique 数据库中字段是否可以建立唯一索引
unique_for_date 数据库中字段【日期】部分是否可以建立唯一索引
unique_for_month 数据库中字段【月】部分是否可以建立唯一索引
unique_for_year 数据库中字段【年】部分是否可以建立唯一索引

    以下是对于Django admin中的有影响的字段
    verbose_name        Admin中显示的字段名称
    blank               Admin中是否允许用户输入为空
    editable            Admin中是否可以编辑
    help_text           Admin中该字段的提示信息
    choices             Admin中显示选择框的内容，用不变动的数据放在内存中从而避免跨表操作（也就是连表查询，因为效率低）
                        如：gf = models.IntegerField(choices=[(0, '何穗'),(1, '大表姐'),],default=1)
                        再例如:user_type_chioce = (
                                (1, "超级用户"),
                                (2, "尊贵用户"),
                                (3, "普通用户"),
                            )
                            user_type_id = models.IntegerField(choices=user_type_chioce, default=1)
                            在admin中会显示为下拉框，自动生成选择框选择为超级用户

    error_messages      自定义错误信息（字典类型），从而定制想要显示的错误信息；
                        字典健：null, blank, invalid, invalid_choice, unique, and unique_for_date
                        如：{'null': "不能为空.", 'invalid': '格式错误'}

    validators          自定义错误验证（列表类型），从而定制想要的验证规则
                        from django.core.validators import RegexValidator
                        from django.core.validators import EmailValidator,URLValidator,DecimalValidator,\
                        MaxLengthValidator,MinLengthValidator,MaxValueValidator,MinValueValidator
                        如：
                            test = models.CharField(
                                max_length=32,
                                error_messages={
                                    'c1': '优先错信息1',
                                    'c2': '优先错信息2',
                                    'c3': '优先错信息3',
                                },
                                validators=[
                                    RegexValidator(regex='root_\d+', message='错误了', code='c1'),
                                    RegexValidator(regex='root_112233\d+', message='又错误了', code='c2'),
                                    EmailValidator(message='又错误了', code='c3'), ]
                            )

三、元信息
class UserInfo(models.Model):
nid = models.AutoField(primary_key=True)
username = models.CharField(max_length=32)
class Meta: # 数据库中生成的表名称 默认 app 名称 + 下划线 + 类名
db_table = "table_name"

            # 联合索引
            index_together = [
                ("pub_date", "deadline"),
            ]

            # 联合唯一索引
            unique_together = (("driver", "restaurant"),)

            # admin中显示的表名称
            verbose_name

            # verbose_name加s
            verbose_name_plural

    更多：https://docs.djangoproject.com/en/1.10/ref/models/options/

四、拓展知识 1.触发 Model 中的验证和错误提示有两种方式：
a. Django Admin 中的错误信息会优先根据 Admiin 内部的 ModelForm 错误信息提示，如果都成功，才来检查 Model 的字段并显示指定错误信息
b. 调用 Model 对象的 clean_fields 方法，如： # models.py
class UserInfo(models.Model):
nid = models.AutoField(primary_key=True)
username = models.CharField(max_length=32)

                email = models.EmailField(error_messages={'invalid': '格式错了.'})

            # views.py
            def index(request):
                obj = models.UserInfo(username='11234', email='uu')
                try:
                    print(obj.clean_fields())
                except Exception as e:
                    print(e)
                return HttpResponse('ok')

           # Model的clean方法是一个钩子，可用于定制操作，如：上述的异常处理。

    2.Admin中修改错误提示
        # admin.py
        from django.contrib import admin
        from model_club import models
        from django import forms


        class UserInfoForm(forms.ModelForm):
            username = forms.CharField(error_messages={'required': '用户名不能为空.'})
            email = forms.EmailField(error_messages={'invalid': '邮箱格式错误.'})
            age = forms.IntegerField(initial=1, error_messages={'required': '请输入数值.', 'invalid': '年龄必须为数值.'})

            class Meta:
                model = models.UserInfo
                # fields = ('username',)
                fields = "__all__"


        class UserInfoAdmin(admin.ModelAdmin):
            form = UserInfoForm


        admin.site.register(models.UserInfo, UserInfoAdmin)

五、连表结构中的字段以及参数
<1>:一对多：
ForeignKey(ForeignObject) # ForeignObject(RelatedField)
to, # 要进行关联的表名
to_field=None, # 要关联的表中的字段名称
on_delete=None, # 当删除关联表中的数据时，当前表与其关联的行的行为 - models.CASCADE，删除关联数据，与之关联也删除 - models.DO_NOTHING，删除关联数据，引发错误 IntegrityError - models.PROTECT，删除关联数据，引发错误 ProtectedError - models.SET_NULL，删除关联数据，与之关联的值设置为 null（前提 FK 字段需要设置为可空） - models.SET_DEFAULT，删除关联数据，与之关联的值设置为默认值（前提 FK 字段需要设置默认值） - models.SET，删除关联数据，
a. 与之关联的值设置为指定值，设置：models.SET(值)
b. 与之关联的值设置为可执行对象的返回值，设置：models.SET(可执行对象)

                                                        def func():
                                                            return 10

                                                        class MyModel(models.Model):
                                                            user = models.ForeignKey(
                                                                to="User",
                                                                to_field="id"
                                                                on_delete=models.SET(func),)
        related_name=None,          # 反向操作时，使用的字段名，用于代替 【表名_set】 如： obj.表名_set.all()
        related_query_name=None,    # 反向操作时，使用的连接前缀，用于替换【表名】
                                    # 如： models.UserGroup.objects.filter(表名__字段名=1).values('表名__字段名')
        limit_choices_to=None,      # 在Admin或ModelForm中显示关联数据时，提供的条件：
                                    # 如：
                                            - limit_choices_to={'nid__gt': 5}
                                            - limit_choices_to=lambda : {'nid__gt': 5}

                                            from django.db.models import Q
                                            - limit_choices_to=Q(nid__gt=10)
                                            - limit_choices_to=Q(nid=8) | Q(nid__gt=10)
                                            - limit_choices_to=lambda : Q(Q(nid=8) | Q(nid__gt=10)) & Q(caption='root')
        db_constraint=True          # 是否在数据库中创建外键约束
        parent_link=False           # 在Admin中是否显示关联数据


    <2>一对一：
    OneToOneField(ForeignKey)
        to,                         # 要进行关联的表名
        to_field=None               # 要关联的表中的字段名称
        on_delete=None,             # 当删除关联表中的数据时，当前表与其关联的行的行为

                                    ###### 对于一对一 ######
                                    # 1. 一对一其实就是 一对多 + 唯一索引
                                    # 2.当两个类之间有继承关系时，默认会创建一个一对一字段
                                    # 如下会在A表中额外增加一个c_ptr_id列且唯一：
                                            class C(models.Model):
                                                nid = models.AutoField(primary_key=True)
                                                part = models.CharField(max_length=12)

                                            class A(C):
                                                id = models.AutoField(primary_key=True)
                                                code = models.CharField(max_length=1)
    <3>多对多:
    ManyToManyField(RelatedField)
        to,                         # 要进行关联的表名
        related_name=None,          # 反向操作时，使用的字段名，用于代替 【表名_set】 如： obj.表名_set.all()
        related_query_name=None,    # 反向操作时，使用的连接前缀，用于替换【表名】
                                    # 如： models.UserGroup.objects.filter(表名__字段名=1).values('表名__字段名')
        limit_choices_to=None,      # 在Admin或ModelForm中显示关联数据时，提供的条件：
                                    # 如：
                                            - limit_choices_to={'nid__gt': 5}
                                            - limit_choices_to=lambda : {'nid__gt': 5}

                                            from django.db.models import Q
                                            - limit_choices_to=Q(nid__gt=10)
                                            - limit_choices_to=Q(nid=8) | Q(nid__gt=10)
                                            - limit_choices_to=lambda : Q(Q(nid=8) | Q(nid__gt=10)) & Q(caption='root')
        symmetrical=None,           # 仅用于多对多自关联时，symmetrical用于指定内部是否创建反向操作的字段
                                    # 做如下操作时，不同的symmetrical会有不同的可选字段
                                        models.BB.objects.filter(...)

                                        # 可选字段有：code, id, m1
                                            class BB(models.Model):

                                            code = models.CharField(max_length=12)
                                            m1 = models.ManyToManyField('self',symmetrical=True)

                                        # 可选字段有: bb, code, id, m1
                                            class BB(models.Model):

                                            code = models.CharField(max_length=12)
                                            m1 = models.ManyToManyField('self',symmetrical=False)

        through=None,               # 自定义第三张表时，使用字段用于指定关系表
        through_fields=None,        # 自定义第三张表时，使用字段用于指定关系表中那些字段做多对多关系表
                                        from django.db import models

                                        class Person(models.Model):
                                            name = models.CharField(max_length=50)

                                        class Group(models.Model):
                                            name = models.CharField(max_length=128)
                                            members = models.ManyToManyField(
                                                Person,
                                                through='Membership',
                                                through_fields=('group', 'person'),
                                            )

                                        class Membership(models.Model):
                                            group = models.ForeignKey(Group, on_delete=models.CASCADE)
                                            person = models.ForeignKey(Person, on_delete=models.CASCADE)
                                            inviter = models.ForeignKey(
                                                Person,
                                                on_delete=models.CASCADE,
                                                related_name="membership_invites",
                                            )
                                            invite_reason = models.CharField(max_length=64)
        db_constraint=True,         # 是否在数据库中创建外键约束
        db_table=None,              # 默认创建第三张表时，数据库中表的名称

2、进阶操作（了不起的双下划线）补充：
isnull # Entry.objects.filter(pub_date\_\_isnull=True)

    range
        #
        # models.Tb1.objects.filter(id__range=[1, 2])   # 范围bettwen and

    order by
        #
        # models.Tb1.objects.filter(name='seven').order_by('id')    # asc
        # models.Tb1.objects.filter(name='seven').order_by('-id')   # desc

    group by
        #
        # from django.db.models import Count, Min, Max, Sum
        # models.Tb1.objects.filter(c1=1).values('id').annotate(c=Count('num'))
        # SELECT "app01_tb1"."id", COUNT("app01_tb1"."num") AS "c" FROM "app01_tb1" WHERE "app01_tb1"."c1" = 1 GROUP BY "app01_tb1"."id"

    limit 、offset
        #
        # models.Tb1.objects.all()[10:20]

    regex正则匹配，iregex 不区分大小写
        #
        # Entry.objects.get(title__regex=r'^(An?|The) +')
        # Entry.objects.get(title__iregex=r'^(an?|the) +')

    date（等等一系列对时间的操作year、month、day、week_day、hour、minute、second）
        #
        # Entry.objects.filter(pub_date__date=datetime.date(2005, 1, 1))
        # Entry.objects.filter(pub_date__date__gt=datetime.date(2005, 1, 1))
