
from datetime import datetime
import json
from django.db.models import Q, Func, F, Count
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import CartItemSerializer, CartSerializer

class CartView(APIView):
    permission_classes = (AllowAny,)
    cart_class = CartSerializer
    cartitem_class = CartItemSerializer


    def post(self, request):
        cart = self.cart_class(data=request.data)
        cart.is_valid(raise_exception=True)
        cart.save()
        for row in request.data['variants']:
            row['cart_id'] = cart.data['id']
            row['quantity'] = row['qty']
            row['variant_id'] = row['item']['id']
            cartitem = self.cartitem_class(data=row)
            cartitem.is_valid(raise_exception=True)
            cartitem.save()
        return Response(cart.data, status=status.HTTP_201_CREATED)




