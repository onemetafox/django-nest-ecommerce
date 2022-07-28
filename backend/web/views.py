
from django.db.models import Q
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.permissions import AllowAny
from django_filters import rest_framework as filters
import random

# import models
from ecommerce.models import Category, Product, ProductTopSeller
from dashboard.models import HomeBanner, HomeSlider, WebCommon

# import serializers
from .serializers import CategoryWithSubcategorySerializer
from ecommerce.serializers import ProductShopSerializer, ProductTopSellerSerializer
from dashboard.serializers import PromosWebSerializer, HomeBannerSerializer, HomeSliderSerializer, WebCommonSerializer

# custom paginators
from ecommerce.pagination import CustomPagination

# import utils
from .utils import get_related_products


# Home page view
class HomePageView(APIView):
    permission_classes = (AllowAny, )
    category_serializer_class = CategoryWithSubcategorySerializer
    product_serializer_class = ProductShopSerializer
    promo_serializer_class = PromosWebSerializer
    top_seller_serializer_class = ProductTopSellerSerializer

    def get(self, request):
        # Category
        category_menu = Category.objects.filter(
            is_active=True, show_in_menu_list=True, parent_category=None)[:10]
        category_menu_serializer = self.category_serializer_class(
            category_menu, many=True)
        category_mega_menu = Category.objects.filter(
            is_active=True, is_favorite=True)[:31]
        category_mega_menu_serializer = self.category_serializer_class(
            category_mega_menu, many=True)

        # Products
        featured_products = list(Product.objects.filter(
            is_featured=True, is_published=True))
        featured_products = random.sample(featured_products, 10)

        latest_products = list(Product.objects.filter(
            is_new=True, is_published=True))
        latest_products = random.sample(latest_products, 10)

        latest_products_serializer = self.product_serializer_class(
            latest_products, many=True, context={'request': request})

        featured_serializer = self.product_serializer_class(
            featured_products, many=True, context={'request': request})

        best_selling_products = ProductTopSeller.get_best_sellers_in_month()
        top_10_products = ProductTopSeller.get_top_best_sellers()

        best_not_in_top = best_selling_products.union(top_10_products)
        top_not_in_best = top_10_products.union(best_selling_products)

        best_selling_products_serializer = self.top_seller_serializer_class(
            best_not_in_top, many=True, context={'request': request})
        top_10_serializer = self.top_seller_serializer_class(
            top_not_in_best, many=True, context={'request': request})

        most_view_products = Product.objects.filter(
            is_published=True, total_visit__gt=0).order_by('-total_visit')[:10]
        most_viewed_serializer = self.product_serializer_class(
            most_view_products, many=True, context={'request': request})

        # Promo
        active_promo = self.promo_serializer_class.get_active_promo()
        if active_promo is not None:
            active_promo_serializer = self.promo_serializer_class(active_promo)

        web_commons = WebCommon.objects.first()
        web_commons_serializer = WebCommonSerializer(web_commons)

        output = {
            'menu': {
                'web_menu': category_menu_serializer.data,
                'category_menu': category_mega_menu_serializer.data,
            },
            'featured_products': featured_serializer.data,
            'latest_products': latest_products_serializer.data,
            'best_selling': best_selling_products_serializer.data,
            'top10_selling': top_10_serializer.data,
            'most_viewed_products': most_viewed_serializer.data,
            'active_promo': active_promo_serializer.data if active_promo is not None else None,
            'web_commons': web_commons_serializer.data if web_commons is not None else None

        }
        return Response(output, status=status.HTTP_200_OK)


class HomeCarouselView(APIView):
    permission_classes = (AllowAny, )
    serializer_class = HomeSliderSerializer

    def get(self, request):
        queryset = HomeSlider.get_active_sliders()
        serializer = self.serializer_class(
            queryset, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class HomeBannersView(APIView):
    permission_classes = (AllowAny, )
    serializer_class = HomeBannerSerializer

    def get(self, request):
        queryset = HomeBanner.get_active_banners()
        serializer = self.serializer_class(
            queryset, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


# Web Products
class WebProductView(APIView):
    permission_classes = (AllowAny, )
    product_serializer_class = ProductShopSerializer

    def get(self, request, slug):
        queryset = Product.objects.get(slug=slug)
        serializer = self.product_serializer_class(
            queryset, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class WebRelatedProductView(APIView):
    permission_classes = (AllowAny, )
    product_serializer_class = ProductShopSerializer

    def get(self, request, slug):
        related = get_related_products(
            slug, request.data.get("size") or 5, request)
        return Response(related, status=status.HTTP_200_OK)


class WebProductRecordView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, slug):
        product = Product.objects.get(slug=slug)
        product.total_visit += 1
        product.save()
        return Response(status=status.HTTP_200_OK)


class WebOutletPorductsView(APIView):
    permission_classes = (AllowAny, )
    produc_serializer_class = ProductShopSerializer

    def get(self, request):
        queryset = Product.objects.filter(outlet=True)
        product = Product.objects.get(id=queryset.id)
        serializer = self.produc_serializer_class(
            queryset, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class WebCategoriesView(APIView):
    permission_classes = (AllowAny, )
    category_serializer_class = CategoryWithSubcategorySerializer

    def get(self, request):
        queryset = Category.objects.filter(
            is_active=True)
        serializer = self.category_serializer_class(
            queryset, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class WebSearchView(APIView):
    permission_classes = (AllowAny, )
    product_serializer_class = ProductShopSerializer
    filter_backends = (filters.DjangoFilterBackend,)

    def get(self, request, ):
        search, category = request.GET.get(
            'search'), request.GET.get('category')
        products = None
        if category is not None and category != '':
            products = Product.objects.filter(
                (Q(is_published=True) & Q(category__slug__icontains=category)) & Q(product_name__icontains=search) | Q(product_description__icontains=search)).filter(category__slug__contains=category)
        else:
            products = Product.objects.filter(
                Q(is_published=True) & Q(product_name__icontains=search) | Q(product_description__icontains=search) | Q(root_reference__icontains=search))

        serializer = self.product_serializer_class(
            products, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class WebShopFilterView(generics.ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = ProductShopSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('category__slug',)

    def filter_queryset(self, queryset):
        for backend in list(self.filter_backends):
            queryset = backend().filter_queryset(self.request, queryset, self)
        return queryset

    def get(self, request):
        paginator = CustomPagination()
        base_qs = Product.objects.all()
        filtered_qs = self.filter_queryset(base_qs)
        context = paginator.paginate_queryset(filtered_qs, request)
        serializer = self.serializer_class(
            context, many=True, context={'request': request})

        return paginator.get_paginated_response(serializer.data)
