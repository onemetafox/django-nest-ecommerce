from rest_framework import serializers
from django.db.models import Sum, Max, Min

# import models
from .models import Color, EngravingArea, EngravingTechnique, ProductSeo, ProductVariant, Size, Category, Product, ProductTopSeller
from general.models import MediaGallery
from general.serializers import MediaGallerySerializer


""" ATTRIBUTES """


class ColorSerializer(serializers.ModelSerializer):
    color_name = serializers.CharField(
        required=True, min_length=3, max_length=250)

    class Meta:
        model = Color
        fields = ['id', 'color_name', 'slug', 'description', 'color_code', 'sticker_color',  'pfconcept_color',
                  'jhk_color',  'roly_color',  'makito_color',  'is_active',  'created_at',  'updated_at']


class ColorMinimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ['color_name', 'slug']


class SizeSerializer(serializers.ModelSerializer):
    size_name = serializers.CharField(
        required=True, min_length=1, max_length=250)

    class Meta:
        model = Size
        fields = ['id', 'size_name', 'slug', 'makito_size', 'stricker_size',
                  'order', 'created_at', 'updated_at']


class SizeMinimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = ['id', 'size_name', 'slug']


""" CATEGORY """


class CategoryMinimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", 'category_name', 'slug']


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


""" PRODUCT """
# Product Variant


class ProductVariantSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(read_only=True)
    color = ColorMinimalSerializer(read_only=True)
    size = SizeMinimalSerializer(read_only=True)

    class Meta:
        model = ProductVariant
        fields = "__all__"

    def get_product_image(self, obj):
        request = self.context.get("request")
        if not request is None:
            return request.build_absolute_uri(obj.image.url)


# Product Variant Minimal
class ProductVariantMinimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = ["id", "slug",
                  "variant_name", "reference", "price", "stock", "allow_backorder", "image"]

    def get_product_image(self, obj):
        request = self.context.get("request")
        if not request is None:
            return request.build_absolute_uri(obj.image.url)


# Product SEO
class ProductSeoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSeo
        fields = ["id", "title", "meta_description", "key_words", "updated_at"]


# Product
class ProductSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(
        required=True, min_length=3, max_length=350)
    product_description = serializers.CharField(
        required=True, min_length=3)
    category = CategoryMinimalSerializer(read_only=True)
    product_images = serializers.SerializerMethodField("get_product_images")
    sub_category = CategoryMinimalSerializer(read_only=True, many=True)
    variants = serializers.SerializerMethodField()
    engraved_area = serializers.SerializerMethodField("get_engraved_area")
    seo = serializers.SerializerMethodField("get_seo")

    class Meta:
        model = Product
        fields = ["id", 'category', 'sub_category', 'product_name', 'slug', "product_description", "product_description_additional", 'product_images', 'product_image_url',
                  'thumbnail', "accept_order_when_out_of_stock", "max_reserve_quantity", 'provider', 'root_reference', 'is_featured', 'is_new', 'is_published', 'tags', "variants", "show_color_to_order", "weight", "depth", "width", "height", "box_units", "sell_per_box", "minimum_order", "pallet_box", "pallet_units", "pallet_weight", "box_weight", "box_dimension", "material", "total_visit", "link_360", "link_video1", "outlet", "is_discount_allowed", "created_at", "updated_at", "seo", "engraved_area"]

    def get_variants(self, obj):
        request = self.context.get("request")
        variants = ProductVariant.objects.filter(product=obj)
        serializer = ProductVariantSerializer(
            variants, many=True, context={'request': request})
        return serializer.data

    def get_product_images(self, obj):
        request = self.context.get("request")
        images = MediaGallery.objects.filter(product=obj)
        serializer = MediaGallerySerializer(
            images, many=True,  context={'request': request})
        return serializer.data

    def get_engraved_area(self, obj):
        request = self.context.get("request")
        engraved_area = EngravingArea.objects.filter(product=obj.id)
        serializer = EngravedAreaMinimalSerializer(
            engraved_area, many=True, context={'request': request})
        return serializer.data

    def get_seo(self, obj):
        request = self.context.get("request")
        seo = ProductSeo.objects.filter(product=obj)
        if len(seo):
            serializer = ProductSeoSerializer(
                seo.first(), context={'request': request})
            return serializer.data
        return []


# Product for landing
class ProductShopSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(
        required=True, min_length=3, max_length=350)
    product_description = serializers.CharField(
        required=True, min_length=3)
    category = CategoryMinimalSerializer(read_only=True)
    product_images = serializers.SerializerMethodField("get_product_images")
    sub_category = CategoryMinimalSerializer(read_only=True, many=True)
    variants = serializers.SerializerMethodField()
    engraved_area = serializers.SerializerMethodField("get_engraved_area")
    seo = serializers.SerializerMethodField("get_seo")
    price = serializers.SerializerMethodField("get_min_max")
    dimensions = serializers.SerializerMethodField()
    max_price = serializers.SerializerMethodField("get_max_price")
    min_price = serializers.SerializerMethodField("get_min_price")

    class Meta:
        model = Product
        fields = ['category', "sub_category", 'product_name', 'slug', "product_description", "product_description_additional", 'product_images',
                  'thumbnail', "accept_order_when_out_of_stock", "max_reserve_quantity", "minimum_order", 'provider', 'root_reference', 'is_featured', 'is_new', 'is_published', 'tags', "variants", "material", "link_360", "link_video1", "outlet", "is_discount_allowed", "created_at", "updated_at", "seo", "engraved_area", "price", 'rating', 'total_visit', "dimensions", "box_dimension", "box_weight", "box_units", "is_published", "max_price", "min_price"]

    def get_variants(self, obj):
        request = self.context.get("request")
        variants = ProductVariant.objects.filter(product=obj)
        serializer = ProductVariantSerializer(
            variants, many=True, context={'request': request})
        return serializer.data

    def get_product_images(self, obj):
        request = self.context.get("request")
        images = MediaGallery.objects.filter(product=obj).order_by("-main")
        serializer = MediaGallerySerializer(
            images, many=True,  context={'request': request})
        return serializer.data

    def get_engraved_area(self, obj):
        request = self.context.get("request")
        engraved_area = EngravingArea.objects.filter(product=obj.id)
        serializer = EngravedAreaSerializer(
            engraved_area, many=True, context={'request': request})
        return serializer.data

    def get_seo(self, obj):
        request = self.context.get("request")
        seo = ProductSeo.objects.filter(product=obj)
        if len(seo):
            serializer = ProductSeoSerializer(
                seo.first(), context={'request': request})
            return serializer.data
        return []

    def get_min_max(self, obj):
        from dashboard.models import Company
        company = Company.objects.all().first()

        max = ProductVariant.objects.filter(
            product=obj, price__isnull=False).aggregate(Max('price'))['price__max']
        min = ProductVariant.objects.filter(
            product=obj, price__isnull=False).aggregate(Min('price'))['price__min']

        if min is None or max is None:
            return []

        global_discount = 1
        if company is not None and company.tariff_global is not None:
            discount = company.tariff_global if company.tariff_global else None
            if discount is not None:
                global_discount = float("1." + str(discount).split(".")[0])

        if company is not None and company.vat_show_in_products:
            vat_percent = float("1."+str(company.vat).split('.')[0])

            return round(float(min)*float(vat_percent), 2), round((float(max)*float(vat_percent) * global_discount), 2)

        return round(min, 2), round(float(max)*global_discount, 2)

    def get_dimensions(self, obj):
        return (obj.width, obj.height, obj.depth)

    def get_max_price(self, obj):
        max = ProductVariant.objects.filter(
            product=obj, price__isnull=False).aggregate(Max('price'))['price__max']
        if max is None:
            return 0
        return max

    def get_min_price(self, obj):
        min = ProductVariant.objects.filter(
            product=obj, price__isnull=False).aggregate(Min('price'))['price__min']
        if min is None:
            return 0
        return min


# Product detailed No Images
class ProductNoImagesDetailView(serializers.ModelSerializer):
    category = CategoryMinimalSerializer(read_only=True)
    sub_category = CategoryMinimalSerializer(read_only=True, many=True)
    variants = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ["id", 'category', 'sub_category', 'product_name', 'slug', "product_description", 'product_image_url',
                  'thumbnail', 'provider', 'price', 'root_reference', 'stock', 'is_featured', 'is_new', 'is_published', 'tags', "variants"]

    def get_variants(self, obj):
        request = self.context.get("request")
        variants = ProductVariant.objects.filter(product=obj)
        serializer = ProductVariantSerializer(
            variants, many=True, context={'request': request})
        return serializer.data


# Product Minimal
class ProductMinimalSerializer(serializers.ModelSerializer):
    category = CategoryMinimalSerializer(read_only=True)
    variants = serializers.SerializerMethodField()
    total_stock = serializers.SerializerMethodField("get_total_stock")

    class Meta:
        model = Product
        fields = ["id", 'slug', 'category', 'product_name', 'product_image_url', "variants", "total_stock",
                  'thumbnail', 'provider', 'root_reference', 'is_featured', 'is_new', 'is_published']

    def get_product_image(self, obj):
        request = self.context.get("request")
        if not request is None:
            return request.build_absolute_uri(obj.product_image.url)

    def get_variants(self, obj):
        variants = ProductVariant.objects.filter(product=obj).count()
        return variants

    def get_total_stock(self, obj):
        total_stock = ProductVariant.objects.filter(
            product=obj).aggregate(Sum('stock'))
        return total_stock['stock__sum']


# Product with area
class ProductWithAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ("slug", "id", "product_name", )


# Product Top Seller
class ProductTopSellerSerializer(serializers.ModelSerializer):
    product = ProductMinimalSerializer(read_only=True)

    class Meta:
        model = ProductTopSeller
        fields = ["product", "sales"]

    def add_sale(self, product):
        product.sales += 1
        product.save()
        return product


""" ENGRAVED """

# Techniques


class EngravingTechniqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = EngravingTechnique
        fields = "__all__"


# Engraved Area
class EngravedAreaMinimalSerializer(serializers.ModelSerializer):

    class Meta:
        model = EngravingArea
        fields = ("id", "slug", "name", "image",
                  "code_makito", "width", "height", "diameter")


class EngravingTechniqueMinimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = EngravingTechnique
        fields = ("id", "slug", "name", 'code_makito', 'cliche_price', 'terms')


# Areas
class EngravedAreaSerializer(serializers.ModelSerializer):
    engraving_technique = EngravingTechniqueSerializer(
        read_only=True, many=True)
    product = ProductWithAreaSerializer(many=True, read_only=True)

    class Meta:
        model = EngravingArea
        fields = ["id", "slug", "name", "image",
                  "engraving_technique", "width", "height", "diameter", "code_makito", "product", ]

    def get_engravedarea_image(self, obj):
        request = self.context.get("request")
        if not request is None:
            return request.build_absolute_uri(obj.image.url)
