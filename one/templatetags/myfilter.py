# coding=utf-8
from django import template

register = template.Library()


@register.filter()
def key(dicts, key_name):
    """
    自定义过滤器通过字典的key取值
    :param dicts:
    :param key_name:
    :return:
    """
    try:
        value = dicts[key_name]
    except KeyError:
        value = 0
    return value


