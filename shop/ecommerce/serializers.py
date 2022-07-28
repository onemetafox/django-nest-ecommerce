from rest_framework import serializers

# import models
from .models import Color, ProductImage, Size, Category, Product, ProductTopSeller


class ColorSerializer(serializers.ModelSerializer):
    color_name = serializers.CharField(
        required=True, min_length=3, max_length=250)
    description = serializers.CharField(
        required=True, min_length=3, max_length=250)

    class Meta:
        model = Color
        fields = ['id', 'color_name', 'slug', 'description', 'basic_color',  'simple_color',  'primary_color',  'secondary_color',   'sticker_id',  'sticker_name',  'pfconcept_color',
                  'pms_color_reference',  'jhk_color',  'jhk_color_reference',   'roly_color',  'roly_color_id',   'makito_color',  'is_active',  'created_at',  'updated_at']


class ColorMinimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ['color_name', 'slug']


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['product_image', 'slug', 'id', "updated_at"]


class SizeSerializer(serializers.ModelSerializer):
    size_name = serializers.CharField(
        required=True, min_length=1, max_length=250)

    class Meta:
        model = Size
        fields = ['size_name', 'slug', 'cifra_size', 'makito_size', 'pfconcept_size',
                  'roly_size', 'roly_size_id', 'jhk_size', 'order', 'created_at', 'updated_at']


class SizeMinimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = ['size_name', 'slug']


class CategoryMinimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['category_name', 'slug']


class CategorySerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(
        required=True, min_length=3, max_length=250)
    parent_category = CategoryMinimalSerializer(read_only=True)
    is_active = serializers.BooleanField(required=True)
    show_in_menu_list = serializers.BooleanField(required=True)
    is_favorite = serializers.BooleanField(required=True)

    class Meta:
        model = Category
        fields = ['id', 'category_name', 'slug', 'parent_category', 'is_active', 'show_in_menu_list', 'is_favorite',  'makito_id',
                  'pfconcept_id', 'sticker_id', 'pfconcept_name', 'cifra_name', 'rolly_name', 'jhk_name',  'created_at', 'updated_at']


class CategoryWithSubcategorySerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(
        required=True, min_length=3, max_length=250)
    is_active = serializers.BooleanField(required=True)
    show_in_menu_list = serializers.BooleanField(required=True)
    is_favorite = serializers.BooleanField(required=True)
    subcategory = CategorySerializer(many=True)

    class Meta:
        model = Category
        fields = ['category_name', 'slug', 'is_active', 'show_in_menu_list', 'is_favorite',  'makito_id', 'pfconcept_id',
                  'sticker_id', 'pfconcept_name', 'cifra_name', 'rolly_name', 'jhk_name',  'created_at', 'updated_at', 'subcategory']


class ProductSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(
        required=True, min_length=3, max_length=350)
    product_description = serializers.CharField(
        required=True, min_length=3)
    color = ColorMinimalSerializer(read_only=True)
    category = CategoryMinimalSerializer(read_only=True)
    size = SizeMinimalSerializer(read_only=True)
    product_images = ProductImageSerializer(read_only=True, many=True)
    sub_category = CategoryMinimalSerializer(read_only=True, many=True)

    class Meta:
        model = Product
        fields = "__all__"


class ProductMinimalSerializer(serializers.ModelSerializer):
    color = ColorMinimalSerializer(read_only=True)
    category = CategoryMinimalSerializer(read_only=True)
    size = SizeMinimalSerializer(read_only=True)
    product_images = ProductImageSerializer(read_only=True, many=True)
    sub_category = CategoryMinimalSerializer(read_only=True, many=True)

    class Meta:
        model = Product
        fields = ["id", 'category', 'sub_category', 'color', 'size', 'product_name', 'slug', 'product_images', 'product_image_url', 'product_thumbnail_image',
                  'provider', 'price', 'reference', 'stock', 'accept_order_when_out_of_stock', 'show_color_to_order', 'is_featured', 'is_new', 'is_published', 'tags']

    def get_product_image(self, obj):
        request = self.context.get("request")
        if not request is None:
            return self.context['request'].build_absolute_uri(obj.product_image.url)


class ProductTopSellerSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = ProductTopSeller
        fields = ["product", "sales"]

    def add_sale(self, product):
        product.sales += 1
        product.save()
        return product
