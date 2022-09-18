<template><div><p>SMTP 发送邮件:
SMTP 是发送邮件的协议，Python 内置对 SMTP 的支持，可以发送纯文本邮件、HTML 邮件以及带附件的邮件。
Python 对 SMTP 支持有 smtplib 和 email 两个模块，email 负责构造邮件，smtplib 负责发送邮件。</p>
<p>一、构造邮件：
示例代码：
以下执行实例需要你本机已安装了支持 SMTP 的服务，如：sendmaill（邮件传输代理程序）。</p>
<pre><code>    # coding:utf-8   #强制使用utf-8编码格式
    import smtplib  # 加载smtplib模块
    from email.mime.text import MIMEText
    from email.utils import formataddr

    my_sender = '642423899@qq.com'  # 发件人邮箱账号
    my_user = '2545369032@qq.com'  # 收件人邮箱账号


    def mail():
        ret = True
        try:
            msg = MIMEText('填写邮件内容xxxxx', 'plain', 'utf-8') # 这里构造邮件内容
            #
            msg['From'] = formataddr([&quot;A&quot;, my_sender])  # 括号里的对应发件人邮箱昵称、发件人邮箱账号
            msg['To'] = formataddr([&quot;B&quot;, my_user])  # 括号里的对应收件人邮箱昵称、收件人邮箱账号
            msg['Subject'] = &quot;邮件的主题&quot;  # 邮件的主题，也可以说是标题

            server = smtplib.SMTP(&quot;smtp.qq.com&quot;, 465)  # 发件人邮箱中的SMTP服务器，端口通常默认为25
            server.login(my_sender, &quot;zhengzhe8224874&quot;)  # 括号中对应的是发件人邮箱账号、邮箱密码
            server.sendmail(my_sender, [my_user, ], msg.as_string())  # 括号中对应的是发件人邮箱账号、收件人邮箱账号、发送邮件
            server.quit()  # 这句是关闭连接的意思
        except Exception:  # 如果try中的语句没有执行，则会执行下面的ret=False
            ret = False
        return ret


    ret = mail()
    if ret:
        print(&quot;ok&quot;)  # 如果发送成功则会返回ok，稍等20秒左右就可以收到邮件
    else:
        print(&quot;filed&quot;)  # 如果发送失败则会返回filed
说明：
    smtplib.SMTP( [host [, port [, local_hostname]]] )
        host: SMTP 服务器主机。 你可以指定主机的ip地址或者域名如: runoob.com，这个是可选参数。
        port: 如果你提供了 host 参数, 你需要指定 SMTP 服务使用的端口号，一般情况下 SMTP 端口号为25。
        local_hostname: 如果 SMTP 在你的本机上，你只需要指定服务器地址为 localhost 即可。

    SMTP.sendmail(from_addr, to_addrs, msg[, mail_options, rcpt_options])
        from_addr: 邮件发送者地址。
        to_addrs: 字符串列表，邮件发送地址。
        msg: 发送消息
    这里要注意一下第三个参数，msg 是字符串，表示邮件。我们知道邮件一般由标题，发信人，收件人，邮件内容，附件等构成，发送邮件
    的时候，要注意 msg 的格式。这个格式就是 smtp 协议中定义的格式。

注意:
    1.msg = MIMEText()
        当构造MIMEText对象时，第一个参数就是邮件正文，第二个参数是MIME的subtype，传入'plain'，最终的MIME就是'text/plain'，
        最后一定要用utf-8编码保证多语言兼容性。

    2.这是因为邮件主题、如何显示发件人、收件人等信息并不是通过SMTP协议发给MTA，而是包含在发给MTA的文本中的，所以，
        我们必须把From、To和Subject添加到MIMEText中，才是一封完整的邮件
</code></pre>
<p>二、发送 HTML 邮件：
如果我们要发送 HTML 邮件，而不是普通的纯文本文件怎么办？方法很简单，在构造 MIMEText 对象时，把 HTML 字符串传进去，
再把第二个参数由 plain 变为 html 就可以了： 如
msg = MIMEText('<html><body><h1>Hello</h1>' +'<p>send by <a href="http://www.python.org">Python</a>...</p>' +
'</body></html>', 'html', 'utf-8')</p>
<p>三、发送附件：
如果 Email 中要加上附件怎么办？带附件的邮件可以看做包含若干部分的邮件：文本和各个附件本身，所以，可以构造一个 MIMEMultipart 对象
代表邮件本身，然后往里面加上一个 MIMEText 作为邮件正文，再继续往里面加上表示附件的 MIMEBase 对象即可：</p>
<pre><code>例：
    from email.mime.multipart import MIMEMultipart
    from email.mime.base import MIMEBase
    from email import encoders      # 导入必要模块

    msg = MIMEMultipart()   # 构造带附件的邮件对象

    # 邮件正文是MIMEText:
    msg.attach(MIMEText('send with file...', 'plain', 'utf-8'))

    # 添加附件就是加上一个MIMEBase，从本地读取一个图片:
    with open('/Users/michael/Downloads/test.png', 'rb') as f:
        # 设置附件的MIME和文件名，这里是png类型:
        mime = MIMEBase('image', 'png', filename='test.png')

        # 加上必要的头信息:
        mime.add_header('Content-Disposition', 'attachment', filename='test.png')
        mime.add_header('Content-ID', '&lt;0&gt;')
        mime.add_header('X-Attachment-Id', '0')

        # 把附件的内容读进来:
        mime.set_payload(f.read())

        # 用Base64编码:
        encoders.encode_base64(mime)

        # 添加到MIMEMultipart:
        msg.attach(mime)
</code></pre>
<p>四、加密
使用标准的 25 端口连接 SMTP 服务器时，使用的是明文传输，发送邮件的整个过程可能会被窃听。要更安全地发送邮件，可以加密 SMTP 会话，实际
上就是先创建 SSL 安全连接，然后再使用 SMTP 协议发送邮件。
某些邮件服务商，例如 Gmail，提供的 SMTP 服务必须要加密传输。必须知道，Gmail 的 SMTP 端口是 587
smtp_server = '<a href="http://smtp.gmail.com" target="_blank" rel="noopener noreferrer">smtp.gmail.com<ExternalLinkIcon/></a>'
smtp_port = 587
server = smtplib.SMTP(smtp_server, smtp_port)
server.starttls() # 剩下的代码和前面的一模一样:
server.set_debuglevel(1)</p>
<pre><code>只需要在创建SMTP对象后，立刻调用starttls()方法，就创建了安全连接。后面的代码和前面的发送邮件代码完全一样。
如果因为网络问题无法连接Gmail的SMTP服务器，请相信我们的代码是没有问题的，你需要对你的网络设置做必要的调整。
</code></pre>
<p>小结：
构造一个邮件对象就是一个 Messag 对象，如果构造一个 MIMEText 对象，就表示一个文本邮件对象，如果构造一个 MIMEImage 对象，就表示一个
作为附件的图片，要把多个对象组合起来，就用 MIMEMultipart 对象，而 MIMEBase 可以表示任何对象。它们的继承关系如下：
Message
+- MIMEBase
+- MIMEMultipart
+- MIMENonMultipart
+- MIMEMessage
+- MIMEText
+- MIMEImage</p>
<pre><code>这种嵌套关系就可以构造出任意复杂的邮件。可以通过email.mime文档查看它们所在的包以及详细的用法。
</code></pre>
</div></template>


