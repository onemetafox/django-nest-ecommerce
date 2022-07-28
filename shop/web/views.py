from rest_framework import pagination
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import serializers, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny, IsAuthenticated

# import models
from ecommerce.models import Category, Product

# import serializers
from .serializers import CategorySerializer, CategoryWithSubcategorySerializer
from ecommerce.serializers import ProductMinimalSerializer

# Home page view
class HomePageView(APIView):
    permission_classes = (AllowAny, )
    # category_serializer_class = CategorySerializer
    category_serializer_class = CategoryWithSubcategorySerializer
    product_serializer_class = ProductMinimalSerializer
    def get(self, request):
        favourite_category_list = Category.objects.filter(is_favorite=True)
        favourite_category_list_serializer = self.category_serializer_class(favourite_category_list, many=True)

        category_list = Category.objects.filter(parent_category=None)
        category_serializer = self.category_serializer_class(category_list, many=True)

        product_list = Product.objects.all()
        product_serializer = self.product_serializer_class(product_list, many=True, context={'request': request})

        output = {
            # 'category_list_favourite' : favourite_category_list_serializer.data,
            # 'category_list_all' : category_serializer.data,
            'product_list' : product_serializer.data
        }
        return Response(output, status=status.HTTP_200_OK)