from django.conf.urls import include
from django.urls import path
from . import views

urlpatterns = [
    path('', views.HomePageView.as_view(), name='home-page'),    # [GET] home page

]
