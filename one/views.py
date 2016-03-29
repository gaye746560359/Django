# coding=utf-8
from django.shortcuts import render, render_to_response
from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext
from django import forms
from models import OneUser
from django.middleware import csrf


# # 注册
# def regist(req):
#     if req.method == 'POST':
#         uf = UserForm(req.POST)
#         if uf.is_valid():
#             # 获得表单数据
#             email = uf.cleaned_data['email']
#             password = uf.cleaned_data['password']
#             # 添加到数据库
#             OneUser.objects.create(email=email, password=password)
#             return HttpResponse('regist success!!')
#     else:
#         uf = UserForm()
#     return render_to_response('regist.html', {'uf': uf}, context_instance=RequestContext(req))
#
#
# 登陆
# def login(req):
#     if req.method == 'POST':
#         uf = UserForm(req.POST)
#         if uf.is_valid():
#             # 获取表单用户密码
#             email = uf.cleaned_data['email']
#             password = uf.cleaned_data['password']
#             # 获取的表单数据与数据库进行比较
#             user = OneUser.objects.filter(email__exact=email, password__exact=password)
#             if user:
#                 # 比较成功，跳转index
#                 response = HttpResponseRedirect('/index/')
#                 # 将email写入浏览器cookie,失效时间为3600
#                 response.set_cookie('email', email, 3600)
#                 return response
#             else:
#                 # 比较失败，还在login
#                 # return HttpResponseRedirect('/login/')
#                 return HttpResponse("账户或密码错误")
#     else:
#         uf = UserForm()
#     return render_to_response('login.html', {'uf': uf}, context_instance=RequestContext(req))
#
#
# # 登陆成功
# def index(req):
#     email = req.COOKIES.get('email', '')
#     return render_to_response('index.html', {'email': email})
#
#
# # 退出
# def logout(req):
#     response = HttpResponse('logout !!')
#     # 清理cookie里保存email
#     response.delete_cookie('email')
#     return response


# 首页 ip = request.META['REMOTE_ADDR']
def login(request):
    if request.POST:
        # dbEmail = OneUser.objects.values("email")
        # bdPwd = OneUser.objects.values("password")
        username = request.POST['username']
        password = request.POST['password']
        user = OneUser.objects.filter(email__exact=username, password__exact=password,
                                      ip__exact=str(request.META['REMOTE_ADDR']))
        if user:
            return HttpResponse("登录成功")
        else:
            return HttpResponse("账户或密码错误")
    return render(request, "login.html")


def register(request):
    if request.POST:
        username = request.POST['username']
        password = request.POST['password']
        ip = str(request.META['REMOTE_ADDR'])
        OneUser.objects.create(email=username, password=password, ip=ip)
        return render_to_response('login.html')
    return render(request, 'register.html')
