---
title: 文件锁
order: 3
---

# Python 的文件锁使用

并发情况下，多个进程如何对同一文件进行读写操作呢？这就要用到文件锁了。

### 对 fcntl.flock()函数的说明：

linux 的 flock() 的函数原型如下所示：

        int flock(int fd, int operation);

其中，参数 fd 表示文件描述符；参数 operation 指定要进行的锁操作，该参数的取值有如下几种：

- LOCK_SH：表示要创建一个共享锁，在任意时间内，一个文件的共享锁可以被多个进程拥有；
- LOCK_EX：表示创建一个排他锁，在任意时间内，一个文件的排他锁只能被一个进程拥有；
- LOCK_UN：表示删除该进程创建的锁；
- LOCK_MAND：它主要是用于共享模式强制锁，它可以与 LOCK_READ 或者 LOCK_WRITE 联合起来使用，从而表示是否允许并发的读操作或者并发的写操作；

通常情况下，如果加锁请求不能被立即满足，那么系统调用 flock()会阻塞当前进程。比如，进程想要请求一个排他锁，但此时，
已经由其他进程获取了这个锁，那么该进程将会被阻塞。如果想要在没有获得这个排他锁的情况下不阻塞该进程，可以将 LOCK_NB 和 LOCK_SH
或者 LOCK_EX 联合使用，那么系统就不会阻塞该进程。flock()所加的锁会对整个文件起作用。

    # coding=utf-8
    import fcntl
    import os, time
    import uuid

    FILE = "counter.txt"

    if not os.path.exists(FILE):
        # create the counter file if it doesn't exist
        file = open(FILE, "w")
        vnc_line = '123cajfg: 127.0.0.1:15900'
        file.write(vnc_line + '\n')
        file.close()

    for i in range(5):
        file = open(FILE, "a+")     #由于flock生成的是劝告锁，不能阻止进程对文件的操作，所以这里可以正常打开文件
        fcntl.flock(file.fileno(), fcntl.LOCK_EX)   #为了避免同时操作文件，需要程序自己来检查该文件是否已经被加锁。这里如果检查到加锁了，进程会被阻塞
        print 'acquire lock'
        now_port = int(file.readlines()[-1].split(':')[-1])
        new_port = now_port + 1
        token = str(uuid.uuid4())
        # file.seek(0)
        vnc_line = ':'.join([token, ' 127.0.0.1', str(new_port)])
        file.write(vnc_line + '\n')
        print os.getpid(), "=>", new_port
        time.sleep(10)
        file.close() # unlocks the file
        print 'release lock'
        time.sleep(2)


    例子2：（比较容易）
        #!/usr/bin/python
        # coding:utf-8

        import fcntl
        import threading
        import time

        def writetoTxt():
            id = threading.currentThread().getName()
            with open("aaa.txt", "a") as f:
                # fcntl.flock(f.fileno(), fcntl.LOCK_EX)  # 加锁
                print("{} acquire lock".format(id))
                for i in range(10):
                    f.write('"write from" + str(i) + {} \n'.format(id))
                    time.sleep(2)
            # 在with块外，文件关闭，自动解锁
            print("{} exit".format(id))
        if __name__ == '__main__':
            writetoTxt()

在多个终端中启动上面的程序，会发现它们相互阻塞。

注意：

- 对于文件的 close() 操作会使文件锁失效；
- 同理，进程结束后文件锁失效；
- flock() 的 LOCK_EX 是“劝告锁”，系统内核不会强制检查锁的状态，需要在代码中进行文件操作的地方显式检查才能生效。
