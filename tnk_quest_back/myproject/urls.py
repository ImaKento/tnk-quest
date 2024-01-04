"""myproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

import sys
import os
import django

sys.path.append('/app')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
django.setup()
from tnk_quest import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('get_quest/', views.get_quest, name='get_quest'),
    path('add_quest/', views.add_quest, name='add_quest'),
    path('delete_quest/<int:quest_id>/', views.delete_quest, name='delete_quest'),
    path('delete_hunter/<str:user_name>/', views.delete_hunter, name='delete_hunter'),
    path('accept_quest/', views.accept_quest, name='accept_quest'),
    path('update_quest/<int:pk>/', views.update_quest, name='update_quest'),
    path('complete_quest/', views.complete_quest, name='complete_quest'),
    path('get_achievements/<str:hunter_name>/', views.get_achievements, name='get_achievements'),
    path('get_hunters/', views.get_hunters, name='get_hunters'),
]