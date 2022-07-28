from django.urls import path
from . import views

urlpatterns = [
    #Cart
    path('cart/create', views.CartView.as_view(), name='cart-create'),    # [POST] cart create
]
