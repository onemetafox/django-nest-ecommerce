from datetime import datetime
import json
from django.db.models import Q, Func, F, Count
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.parsers import MultiPartParser, FormParser

# import models
from .models import Color, EngravingArea, EngravingTechnique, ProductSeo, ProductTopSeller, ProductVariant, Size, Category, Product
from general.models import MediaGallery

# custom paginators
from .pagination import CustomPagination

# import serializers
from .serializers import CategoryWithSubcategorySerializer, ColorSerializer, EngravedAreaMinimalSerializer, EngravedAreaSerializer, EngravingTechniqueMinimalSerializer, EngravingTechniqueSerializer, ProductMinimalSerializer, ProductSeoSerializer, ProductTopSellerSerializer, ProductVariantMinimalSerializer, ProductVariantSerializer, SizeMinimalSerializer, SizeSerializer, CategorySerializer, CategoryMinimalSerializer, ProductSerializer

from general.serializers import MediaGallerySerializer


def get_media_file_upload_path(instance, filename):
    year = datetime.now().year
    return 'uploads/{0}/{1}'.format(year, filename)

# Color view


class ColorView(APIView):
    serializer_class = ColorSerializer

    def get(self, request):
        paginator = CustomPagination()
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
            color = Color.objects.get(slug=slug).delete()
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
    minimal_serializer_class = SizeMinimalSerializer

    def get(self, request):
        paginator = CustomPagination()
        queryset = Size.objects.all()
        context = paginator.paginate_queryset(queryset, request)
        serializer = self.minimal_serializer_class(context, many=True)
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
            size = Size.objects.get(slug=slug).delete()
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
        paginator = CustomPagination()
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


""" PRODUCT """
# Product view


class ProductView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = ProductSerializer
    min_serializer_class = ProductMinimalSerializer

    def get(self, request):
        paginator = CustomPagination()
        queryset = Product.objects.all()
        context = paginator.paginate_queryset(queryset, request)
        serializer = self.min_serializer_class(
            context, many=True,  context={'request': request})
        return paginator.get_paginated_response(serializer.data)

    def post(self, request):
        try:
            serializer = self.serializer_class(data=request.data)
            cat = json.loads(request.data.get("category"))
            category = Category.objects.get(id=cat["id"])
            sub_categories = request.data.getlist("sub_category")
            sub_category = list()
            for cat in sub_categories:
                cat = json.loads(cat)
                sub_cat = Category.objects.get(slug=cat["slug"])
                sub_category.append(sub_cat)

            serializer.is_valid(raise_exception=True)
            serializer.save(category=category, sub_category=sub_category)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Category.DoesNotExist:
            return Response({'message': 'Category does not exist'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, slug):
        try:
            data = request.data
            data.tags = request.data.getlist("tags")
            sub_categories = request.data.getlist("sub_category")
            queryset = Product.objects.get(slug=slug)
            category = None
            sub_category = None
            if request.data.get('category'):
                cat = json.loads(request.data.get('category'))
                category = Category.objects.get(slug=cat["slug"])
            if sub_categories:
                sub_category = list()
                for cat in sub_categories:
                    cat = json.loads(cat)
                    sub_cat = Category.objects.get(slug=cat["slug"])
                    sub_category.append(sub_cat)

            if category and sub_category is not None:
                serializer = self.serializer_class(
                    queryset, data=data, partial=True, context={'request': request})
                serializer.is_valid(raise_exception=True)
                serializer.save(category=category, sub_category=sub_category)
            else:
                serializer = self.serializer_class(
                    queryset, data=data, partial=True, context={'request': request})
                serializer.is_valid(raise_exception=True)
                serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response({'message': 'Record does not exist'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, slug):
        try:
            Product.objects.get(slug=slug).delete()
            return Response({'message': 'Record deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
        except Product.DoesNotExist:
            return Response({'message': 'Record does not exist'}, status=status.HTTP_404_NOT_FOUND)


# Product detailed with images View
class ProductDetailedView(APIView):
    serializer_class = ProductSerializer

    def get(self, request, slug):
        try:
            product = Product.objects.get(
                slug=slug)
            serializer = self.serializer_class(
                product,  context={'request': request})
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


# Product media gallery
class ProductMediaView(APIView):
    permission_classes = (IsAuthenticated, IsAdminUser)
    media_serializer_class = MediaGallerySerializer

    def get(self, request, slug):
        product = Product.objects.get(slug=slug)
        images = MediaGallery.objects.filter(product=product)
        serializer = self.media_serializer_class(
            images, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, slug):
        product = Product.objects.get(slug=slug)
        try:
            image_media = MediaGallery.objects.filter(
                product=product, id=request.data.get("id"))
            if len(image_media) == 0:
                image = MediaGallery.objects.get(
                    id=request.data.get("id"))
                image.product = product
                image.save()

            return Response(status=status.HTTP_200_OK)
        except MediaGallery.DoesNotExist:
            return Response({'message': 'Record does not exist'}, status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, slug):
        image_id = request.data.get("id")
        try:
            image = MediaGallery.objects.get(id=image_id)
            serializer = self.media_serializer_class(
                image, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        except MediaGallery.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, slug, pk):
        product = Product.objects.get(slug=slug)
        try:
            image = MediaGallery.objects.get(product=product, id=pk)
            image.product = None
            image.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except MediaGallery.DoesNotExist:
            return Response({'message': 'Record does not exist'}, status=status.HTTP_404_NOT_FOUND)


# Product Thumbnail
class ProductThumbnailView(APIView):
    serializer_class = ProductSerializer

    def patch(self, request, slug):
        product = Product.objects.get(slug=slug)
        image = MediaGallery.objects.get(id=request.data.get("id"))
        product.thumbnail = image.file
        product.save()
        serializer = self.serializer_class(
            product, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


# Product search
class ProductSearchView(APIView):
    serializer_class = ProductMinimalSerializer

    def get(self, request, q):
        paginator = CustomPagination()
        query = q
        if query:
            products = Product.objects.filter(Q(product_name__icontains=query) |
                                              Q(slug__icontains=query) |
                                              Q(root_reference__icontains=query) |
                                              Q(category__slug__icontains=query))

            context = paginator.paginate_queryset(products, request)
            serializer = self.serializer_class(context, many=True)
            return paginator.get_paginated_response(serializer.data)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)


# Product SEO
class ProductSeoView(APIView):
    serializer_class = ProductSeoSerializer

    def post(self, request, slug):
        try:
            product = Product.objects.get(slug=slug)
            seo = ProductSeo.objects.get(product=product)
            serializer = self.serializer_class(
                seo, data=request.data, context={'request': request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ProductSeo.DoesNotExist:
            serializer = self.serializer_class(product, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(product=product)


""" VARIANTS """


# Variant price change
class VariantPriceView(APIView):
    serializer_class = ProductVariantSerializer

    def patch(self, request, slug):
        product = Product.objects.get(slug=slug)
        variants = ProductVariant.objects.filter(product=product)
        price = request.data.get("price")
        for var in variants:
            var.price = float(price)
            var.save()
        serializer = self.serializer_class(
            variants, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


# Variant create, update, delete
class VariantView(APIView):
    serializer_class = ProductVariantMinimalSerializer

    def post(self, request, slug):
        product = Product.objects.get(slug=slug)
        if request.data.get("color"):
            color = Color.objects.get(**request.data.get("color"))
        if request.data.get("size"):
            size = Size.objects.get(**request.data.get("size"))
        serializer = self.serializer_class(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        reference = f"{product.root_reference}{color.color_name[:3]}{size.size_name[:3]}"
        serializer.save(product=product, color=color,
                        size=size, reference=reference)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, slug):
        variant = ProductVariant.objects.get(slug=slug)
        serializer = self.serializer_class(variant,
                                           data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, slug):
        ProductVariant.objects.get(slug=slug).delete()
        return Response({'message': "Record deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


# Variant Image
class VariantImageView(APIView):
    serializer_class = ProductVariantMinimalSerializer

    def patch(self, request, slug):
        variant = ProductVariant.objects.get(slug=slug)
        image_id = request.data.get("id")
        media_image = MediaGallery.objects.get(id=image_id)
        variant.image = media_image.file
        variant.save()
        serializer = self.serializer_class(
            variant, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


""" TAGS """


class TagsView(APIView):

    def get(self, request):
        tags = Product.objects.annotate(tag=Func(F('tags'), function='unnest')).values(
            'tag').order_by('tag').annotate(count=Count('id')).values_list('tag', 'count').order_by("-count")[:10]
        return Response(tags, status=status.HTTP_200_OK)


""" ENGRAVED AREA """


class EngravedAreaView(APIView):
    serializer_class = EngravedAreaSerializer

    def get(self, request):
        paginator = CustomPagination()
        queryset = EngravingArea.objects.annotate(
            Count('product')).order_by('-product__count')
        context = paginator.paginate_queryset(queryset, request)
        serializer = self.serializer_class(
            context, many=True, context={"request": request})
        return paginator.get_paginated_response(serializer.data)

    def post(self, request):
        data = request.data
        if data.get("image"):
            image = MediaGallery.objects.get(id=data.get("image"))
            data["image"] = image.file

        technique = EngravingTechnique.objects.get(
            id=data.get("engraving_technique"))
        products = list()
        for p in data.get("product"):
            product = Product.objects.get(slug=p.get("slug"))
            products.append(product)

        serializer = self.serializer_class(
            data=data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save(engraving_technique=technique, product=products)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def patch(self, request, slug):
        data = request.data
        if data.get("image"):
            image = MediaGallery.objects.get(id=data.get("image"))
            data["image"] = image.file

        technique = None
        if data.get("engraving_technique"):
            technique = EngravingTechnique.objects.get(
                id=data.get("engraving_technique"))

        products = list()
        if data.get("product"):
            for p in data.get("product"):
                product = Product.objects.get(slug=p.get("slug"))
                products.append(product)

        serializer = self.serializer_class(
            data=data, partial=True, context={'request': request})
        serializer.is_valid(raise_exception=True)

        if len(products) and technique is not None:
            serializer.save(engraving_technique=technique, product=products)
        if len(products) == 0 and technique is not None:
            serializer.save(engraving_technique=technique)
        if len(products) and technique is None:
            serializer.save(product=products)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, reques, slug):
        try:
            EngravingArea.objects.get(slug=slug).delete()
            return Response({'message': "Record deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except EngravingArea.DoesNotExist:
            return Response({'message': 'Record does not exist'}, status=status.HTTP_404_NOT_FOUND)


""" ENGRAVED TECHNICS """


class EngravingTechniqueView(APIView):
    serializer_class = EngravingTechniqueSerializer
    serializer_min_class = EngravingTechniqueMinimalSerializer

    def get(self, request):
        paginator = CustomPagination()
        queryset = EngravingTechnique.objects.all()
        context = paginator.paginate_queryset(queryset, request)
        serializer = self.serializer_min_class(
            context, many=True, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class EngravingTechniqueSearchView(APIView):
    serializer_class = EngravedAreaMinimalSerializer

    def get(self, request, q):
        query = q
        if query:
            techniques = EngravingTechnique.objects.filter(Q(name__icontains=query) |
                                                           Q(code_makito__icontains=query))
            serializer = self.serializer_class(techniques, many=True)
            if len(techniques):
                return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(status=status.HTTP_204_NO_CONTENT)
