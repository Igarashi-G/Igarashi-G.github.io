from sqlalchemy.orm import sessionmaker

from sqlalchemy import create_engine, engine_from_config
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, func
from sqlalchemy.dialects.mysql import (
    INTEGER, TINYINT, TIME, TIMESTAMP, VARCHAR
)

engine2 = create_engine(
    "mysql+pymysql://root:@127.0.0.说明.md:3306/webapp?charset=utf8",
    max_overflow=0,  # 超过连接池大小外最多创建的连接
    pool_size=5,  # 连接池大小
    pool_timeout=30,  # 池中没有线程最多等待的时间，否则报错
    pool_recycle=-1  # 多久之后对线程池中的线程进行一次连接的回收（重置）
)

db_config = {'url': 'mysql+pymysql://root@localhost:3306/webapp?charset=utf8', 'pool_recycle': 1800, 'pool_size': 5,
             'echo': False}
# engine2 = engine_from_config(db_config, '', encoding="utf-8")
ModelBase = declarative_base()  # 生成orm基类


class User(ModelBase):
    __tablename__ = "user"
    id = Column(INTEGER(unsigned=True), primary_key=True)
    name = Column(VARCHAR(32))
    password = Column(VARCHAR(32))


ModelBase.metadata.create_all(engine2)

# class Period(ModelBase):
#     __tablename__ = 'period'  # 表名
#
#     id = Column(INTEGER(unsigned=True), primary_key=True)
#     season_id = Column(INTEGER(unsigned=True), nullable=False)
#     grade_type = Column(TINYINT(unsigned=True), nullable=False)
#     start_time = Column(TIME, nullable=False)
#     end_time = Column(TIME, nullable=False)
#     created_at = Column(TIMESTAMP, nullable=False, default=func.now())
#
# ModelBase.metadata.create_all(engine2)

Session_class = sessionmaker(bind=engine2)  # 创建于数据库的会话session class ，注意这里返回给session的是个class，不是实例
Session = Session_class()  # 生成session实例
user_obj = User(name="igarashi",password="fuuk123")

Session.add(user_obj)
print(user_obj.name,user_obj.id)
Session.commit()
my_user = Session.query(User).filter(User.name.like("%i%"))
for i in my_user:
    print(i.id)

# period_obj = Period(id=13, season_id=2, grade_type=说明.md, start_time=(8, 30), end_time=(10, 0),
#                     created_at=(2016, 3, 5, 13, 28, 58))
# print(period_obj.id, period_obj.season_id)  # 此时数据未创建
# # 13L, 2L, 说明.md, datetime.time(8, 30), datetime.time(10, 0), datetime.datetime(2016, 3, 5, 13, 28, 58)
# Session.add(period_obj)
# Session.commit()  # 此时才统一提交，创建数据

print(engine2)
