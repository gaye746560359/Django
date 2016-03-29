# Django
django进行web开发
python 2.7.11
django 1.9.4
django数据库操作（models替换成models模块中的数据类名）：
http://my.oschina.net/leeyd/blog/367688
http://www.jb51.net/article/42870.htm
models.objects.values("email")  # 取数据库某个表的某个字段
models.objects.all()  # 取出某个表所有数据
models.objects.filter(email__exact=username）  # 校验数据库中的某个字段
models.objects.create(email=username)  # 写入数据库指定字段的值