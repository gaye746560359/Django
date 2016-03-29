#!/usr/bin/env python
# coding=utf-8
import os
import sys


if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "my_web.settings")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)


"""
命令行运行：python manage.py runserver
其他电脑访问：
python manage.py runserver 0.0.0.0:8000

同步修改数据库1.9
python manage.py makemigrations
python manage.py migrate

根据数据库反向生成models
python manage.py inspectdb > D:\PycharmProject\my_web\one\models.py
"""
