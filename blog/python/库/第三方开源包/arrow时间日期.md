---
title: arrow
order: 1

group:
  title: 常用开源库
  order: 13
---

# arrow

<Alert type="info"> Python 最好用的时间日期处理库 </Alert>

一、初识：
安装：
pip install arrow

    初步使用：
        import arrow        导入
        arrow.utcnow()      获取utc时间
        arrow.now()         获取local时间

        最终获取的是一个 Arrow时间对象，通过这个对象我们可以做各种时间转换

二、时间转换：
now = arrow.now('+08:00') # 现在获取到当前(东八区)时间

    now.timestamp                 # 转化为时间戳，如：1535600267

    now.format()                  # 转化为时间字符串，如： u'2018-08-30 11:38:03+08:00'

    now.format("YYYY-MM-DD HH:mm")    # 转化为对应格式的时间字符串，如：u'2018-08-30 11:39'

    arrow.get("2018-08-30 11:39", "YYYY-MM-DD HH:mm")   # 从字符串转换成Arrow对象，如：<Arrow [2018-08-30T11:39:00+00:00]>

    注意：
        <*>要获取9点这个时间，若想利用 arrow.get('09:00', "HH:mm") 转化，获取的是 0001-01-01T09:00:00+00:00 这种形式
            之后可以.time()获取到arrow的时间对象

        <*>若要获取9点的datatime.time对象，则还可以利用datetime.strptime("09:00", "%H:%M") 转化，获取的是 1900-01-01 09:00:00
            这种形式。之后也可以.time() 来进行获取datatime.time的时间对象


    arrow.get("1535600267") & .get(1535600267)    # 从时间戳转化为Arrow对象，如：<Arrow [2018-08-30T03:37:47+00:00]>

    arrow.Arrow(2018, 2, 1)     # 直接生成Arrow对象，如：<Arrow [2018-02-01T00:00:00+00:00]>

    now.datetime        # 直接将arrow对象转化为datetime对象，如：2018-08-30 11:41:37.966118+08:00 <class 'datetime.datetime'>

    now.naive           # 得到一个本土化的datetime时间，大概，如：2018-08-30 11:43:04.513118

    now.tzinfo          # 大概是获取本土化时区，如：tzlocal()，之后就即可调用tz

    now.hour/.day       # 直接获取值 <int 21>

    now.shift(days/weeks/weekday=+1/-3/6)   # 获取一天后/三周前/距离最近now的星期日，weekday从0到6

    now.replace(**kwargs)   # 替换时间，如hour=9 注：若为minute是替换分钟，若为minutes则是推移时间

    now.humanize(present,locale='zh')   # 输出给人看的时间，present:相对于参数时间，locale参数可以指定地区语言，如 just now

    now.span('hour')    # 现在所在的时间区间，如：(<Arrow [2018-08-30T12:00:00+08:00]>, <Arrow [2018-08-30T12:59:59.999999+08:00]>)

    now.floor('hour')    # 现在所在区间的开始，如：2018-08-30T12:00:00+08:00

    now.ceil('hour')    # 现在所在区间的结尾，如：2018-08-30T12:59:59.999999+08:00

    start = datetime.datetime(2018, 2, 24, 12, 30)
    end = datetime.datetime(2018, 2, 24, 15, 20)
    for r in arrow.Arrow.span_range(hour',start,end):   # 获取start,end之间的时间区间

    for r in arrow.Arrow.range('hour',start,end):   #获取间隔单位时间的时间
