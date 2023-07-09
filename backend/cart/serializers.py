from unittest.util import _MAX_LENGTH
from attrs import field
from django.http import cookie
from rest_framework import serializers
from .models import Coupon, Order, OrderItem


class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = "__all__"

class CartSerializer(serializers.ModelSerializer):
    cookie = serializers.CharField(max_length = 255, required = True)
    # user_id = serializers.CharField(max_length = 255)
    
    class Meta:
        model = Order
        fields = ['id', 'created_at', 'ordered_date', 'ordered', 'user_id','cookie']



class CartItemSerializer(serializers.ModelSerializer):
    
    variant_id = serializers.IntegerField(required = True)
    quantity = serializers.IntegerField(required = True)
    cart_id = serializers.IntegerField(required = True)

    class Meta:
        model = OrderItem
        fields = ['id', 'created_at', 'variant_id', 'quantity', 'cart_id']

