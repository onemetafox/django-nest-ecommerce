from unicodedata import category
from rest_framework import pagination
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import serializers, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import MultiPartParser, FormParser

# import models
from .models import Color, ProductImage, ProductTopSeller, Size, Category, Product

# import serializers
from .serializers import CategoryWithSubcategorySerializer, ColorSerializer, ProductMinimalSerializer, ProductTopSellerSerializer, SizeSerializer, CategorySerializer, CategoryMinimalSerializer, ProductSerializer

# Color view


class ColorView(APIView):
    serializer_class = ColorSerializer

    def get(self, request):
        paginator = PageNumberPagination()
        queryset = Color.objects.all()
        context = paginator.paginate_queryset(queryset, request)
        serializer = self.serializer_class(context, many=True)
        return paginator.get_paginated_response(serializer.data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request, slug):
        try:
            queryset = Color.objects.get(slug=slug)
            serializer = self.serializer_class(queryset, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Color.DoesNotExist:
            return Response({'message': 'Record does not exist'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, slug):
        try:
            country = Color.objects.get(slug=slug)
            country.delete()
            return Response({'message': 'Record deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
        except Color.DoesNotExist:
            return Response({'message': 'Record does not exist'}, status=status.HTTP_404_NOT_FOUND)

# Color Record View


class ColorRecordView(APIView):
    serializer_class = ColorSerializer

    def get(self, slug):
        try:
            country = Color.objects.get(slug=slug)
            serializer = self.serializer_class(country)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Color.DoesNotExist:
            return Response({'message': 'Record not found'}, status=status.HTTP_404_NOT_FOUND)


# Size view
class SizeView(APIView):
    serializer_class = SizeSerializer

    def get(self, request):
        paginator = PageNumberPagination()
        queryset = Size.objects.all()
        context = paginator.paginate_queryset(queryset, request)
        serializer = self.serializer_class(context, many=True)
        return paginator.get_paginated_response(serializer.data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request, slug):
        try:
            queryset = Size.objects.get(slug=slug)
            serializer = self.serializer_class(queryset, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Size.DoesNotExist:
            return Response({'message': 'Record does not exist'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, slug):
        try:
            size = Size.objects.get(slug=slug)
            size.delete()
            return Response({'message': 'Record deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
        except Size.DoesNotExist:
            return Response({'message': 'Record does not exist'}, status=status.HTTP_404_NOT_FOUND)

# Size Record View


class SizeRecordView(APIView):
    serializer_class = SizeSerializer

    def get(self, slug):
        try:
            country = Size.objects.get(slug=slug)
            serializer = self.serializer_class(country)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Size.DoesNotExist:
            return Response({'message': 'Record not found'}, status=status.HTTP_404_NOT_FOUND)

# Category view


class CategoryView(APIView):
    serializer_class = CategorySerializer

    def get(self, request):
        paginator = PageNumberPagination()
        queryset = Category.objects.all()
        context = paginator.paginate_queryset(queryset, request)
        serializer = self.serializer_class(context, many=True)
        return paginator.get_paginated_response(serializer.data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        parent_category = None
        if request.data['parent_category']:
            parent_category = Category.objects.filter(
                slug=request.data['parent_category']).first()
        serializer.save(parent_category=parent_category)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request, slug):
        try:
            queryset = Category.objects.get(slug=slug)
            serializer = self.serializer_class(queryset, data=request.data)
            serializer.is_valid(raise_exception=True)
            parent_category = None
            if request.data['parent_category']:
                parent_category = Category.objects.filter(
                    slug=request.data['parent_category']).first()

            serializer.save(parent_category=parent_category)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Category.DoesNotExist:
            return Response({'message': 'Record does not exist'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, slug):
        try:
            category = Category.objects.get(slug=slug)
            category.delete()
            return Response({'message': 'Record deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
        except Category.DoesNotExist:
            return Response({'message': 'Record does not exist'}, status=status.HTTP_404_NOT_FOUND)

# Category minimal view


class CategoryMinimalView(APIView):
    serializer_class = CategoryMinimalSerializer

    def get(self, request):
        queryset = Category.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Category subcategory view


class CategoryWithSubCategoryView(APIView):
    serializer_class = CategoryWithSubcategorySerializer

    def get(self, request, slug):
        queryset = Category.objects.filter(slug=slug).first()
        serializer = self.serializer_class(queryset)
        return Response(serializer.data, status=status.HTTP_200_OK)


# Product view


class ProductView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = ProductSerializer
    min_serializer_class = ProductMinimalSerializer

    def get(self, request):
        paginator = PageNumberPagination()
        queryset = Product.objects.all()
        context = paginator.paginate_queryset(queryset, request)
        serializer = self.min_serializer_class(
            context, many=True)
        return paginator.get_paginated_response(serializer.data)

    def post(self, request):
        try:
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)
            category = Category.objects.get(slug=request.data['category'])
            color = Color.objects.get(slug=request.data['color'])
            size = Size.objects.get(slug=request.data['size'])
            serializer.save(category=category, color=color, size=size)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Category.DoesNotExist:
            return Response({'message': 'Category does not exist'}, status=status.HTTP_404_NOT_FOUND)
        except Size.DoesNotExist:
            return Response({'message': 'Size does not exist'}, status=status.HTTP_404_NOT_FOUND)
        except Color.DoesNotExist:
            return Response({'message': 'Color not exist'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, slug):
        try:
            queryset = Product.objects.get(slug=slug)
            serializer = self.serializer_class(
                queryset, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            category = queryset.category
            if request.data.get('category'):
                category = Category.objects.get(slug=request.data['category'])
            color = queryset.color
            if request.data.get('color'):
                color = Color.objects.get(slug=request.data['color'])
            size = queryset.size
            if request.data.get('size'):
                size = Size.objects.get(slug=request.data['size'])
            serializer.save(category=category, color=color, size=size)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response({'message': 'Record does not exist'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, slug):
        try:
            size = Product.objects.get(slug=slug)
            size.delete()
            return Response({'message': 'Record deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
        except Product.DoesNotExist:
            return Response({'message': 'Record does not exist'}, status=status.HTTP_404_NOT_FOUND)

# Product detailed View


class ProductDetailedView(APIView):
    serializer_class = ProductSerializer

    def get(self, request, slug):
        try:
            product = Product.objects.get(
                slug=slug)
            images = ProductImage.objects.filter(product=product)
            product.product_images = images
            serializer = self.serializer_class(product)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response({'message': 'Record not found'}, status=status.HTTP_404_NOT_FOUND)

# Product top sell


class ProductTopSellerView(APIView):
    serializer_class = ProductTopSellerSerializer
    product_serializer_class = ProductSerializer

    def get(self, request):
        queryset = ProductTopSeller.objects.filter(
            product__is_published=True)[:30]
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, slug):
        product = Product.objects.filter(
            slug=slug, is_published=True).first()
        if product:
            product_top_seller = ProductTopSeller.objects.filter(
                product=product).first()
            if product_top_seller:
                product_updated = self.serializer_class.add_sale(
                    self, product_top_seller)
                serializer = self.serializer_class(product_updated)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                new_top_seller = ProductTopSeller(
                    product=product, sales=1)
                serializer = self.serializer_class(
                    ProductTopSeller.objects.create(product=product, sales=1))
                return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Record not found'}, status=status.HTTP_404_NOT_FOUND)
