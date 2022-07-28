from datetime import datetime
import random
from re import T
from dateutil.relativedelta import relativedelta

from django.db import models
from django.template.defaultfilters import slugify
from django.utils.translation import gettext as _
from django.core.validators import FileExtensionValidator
from django.contrib.postgres.fields import ArrayField


# Generate unique slug


def unique_slugify(instance, slug):
    model = instance.__class__
    unique_slug = slug
    record_count = 0
    while model.objects.filter(slug=unique_slug).exists():
        unique_slug = slug + "-1"
        while model.objects.filter(slug=unique_slug).exists():
            record_count = record_count + 1
            unique_slug = slug + "-" + str(record_count)
    return unique_slug


class Category(models.Model):
    category_name = models.CharField(
        max_length=250, null=False, blank=False, default='')
    parent_category = models.ForeignKey(
        'self', on_delete=models.CASCADE, null=True, blank=True, default=None, related_name='subcategory')
    slug = models.SlugField(max_length=250, null=False,
                            blank=False, editable=False, allow_unicode=True)
    is_active = models.BooleanField(default=True)
    show_in_menu_list = models.BooleanField(default=False)
    is_favorite = models.BooleanField(default=False)

    makito_id = models.CharField(
        max_length=50, null=True, blank=True, default=None)
    pfconcept_id = models.CharField(
        max_length=50, null=True, blank=True, default=None)
    sticker_id = models.CharField(
        max_length=50, null=True, blank=True, default=None)
    pfconcept_name = models.CharField(
        max_length=250, null=True, blank=True, default=None)
    cifra_name = models.CharField(
        max_length=250, null=True, blank=True, default=None)
    rolly_name = models.CharField(
        max_length=250, null=True, blank=True, default=None)
    jhk_name = models.CharField(
        max_length=250, null=True, blank=True, default=None)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.category_name)

    # def __unicode__(self):
    #     return self.category_name

    class Meta:
        db_table = "ecommerce_category"
        ordering = ['category_name']

    def save(self, *args, **kwargs):
        if not self.slug:
            slug_text = slugify(self.category_name)
            self.slug = unique_slugify(self, slug_text)
        self.clean()
        super().save(*args, **kwargs)


class Color(models.Model):
    color_name = models.CharField(
        max_length=250, null=False, blank=False, default='')
    slug = models.SlugField(max_length=250, null=False,
                            blank=False, editable=False, allow_unicode=True)
    description = models.TextField(null=True, default=None)
    color_code = models.CharField(
        max_length=10, null=True, blank=True, default=None)

    sticker_color = models.CharField(
        max_length=50, null=True, blank=True, default=None)
    pfconcept_color = models.CharField(
        max_length=50, null=True, blank=True, default=None)
    jhk_color = models.CharField(
        max_length=50, null=True, blank=True, default=None)
    roly_color = models.CharField(
        max_length=50, null=True, blank=True, default=None)
    makito_color = models.CharField(
        max_length=50, null=True, blank=True, default=None)

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.color_name)

    class Meta:
        db_table = "ecommerce_color"
        ordering = ['color_name']

    def save(self, *args, **kwargs):
        if not self.slug:
            slug_text = slugify(self.color_name)
            self.slug = unique_slugify(self, slug_text)
        self.clean()
        super().save(*args, **kwargs)


class Size(models.Model):
    size_name = models.CharField(
        max_length=250, null=False, blank=False, default='')
    slug = models.SlugField(max_length=250, null=False,
                            blank=False, editable=False, allow_unicode=True)
    stricker_size = models.CharField(
        max_length=50, null=True, blank=True, default=None)
    makito_size = models.CharField(
        max_length=50, null=True, blank=True, default=None)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.size_name)

    class Meta:
        db_table = "ecommerce_size"
        ordering = ['order']

    def save(self, *args, **kwargs):
        if not self.slug:
            slug_text = slugify(self.size_name)
            self.slug = unique_slugify(self, slug_text)
            latest_order = Size.objects.all().order_by('-order').first()
            if not latest_order:
                order = 1
            else:
                order = latest_order.order + 1
            self.order = order
        self.clean()
        super().save(*args, **kwargs)


# Product image upload directory path
def get_product_image_upload_path(instance, filename):
    provider = getattr(instance, "provider", "publiexpe").lower()
    return 'images/product/{0}/{1}/{2}'.format(provider, instance.slug, filename)


# Product thumbnail image upload directory path
def get_product_thumbnail_upload_path(instance, filename):
    provider = getattr(instance, "provider", "publiexpe").lower()
    return 'images/product/{0}/thumbnail/{1}'.format(provider, filename)

# Product datasheet upload directory path


def get_product_datasheet_upload_path(instance, filename):
    provider = getattr(instance, "provider", "publiexpe").lower()
    return 'images/product/{0}/datasheet/{1}/{2}'.format(provider, instance.slug, filename)


class Product(models.Model):
    class SettlementPosition(models.TextChoices):
        LEFT_UP = 'LEFT_UP', _('LEFT_UP')
        LEFT_DOWN = 'LEFT_DOWN', _('LEFT_DOWN')
        RIGHT_UP = 'RIGHT_UP', _('RIGHT_UP')
        RIGHT_DOWN = 'RIGHT_DOWN', _('RIGHT_DOWN')

    category = models.ForeignKey(Category, on_delete=models.CASCADE,
                                 null=False, blank=False, related_name='belongs_to_category')
    sub_category = models.ManyToManyField(
        Category, related_name="subcategories", blank=True)
    product_name = models.CharField(
        max_length=250, null=False, blank=False, default='')
    slug = models.SlugField(max_length=250, null=False,
                            blank=False, editable=False, allow_unicode=True)
    product_description = models.TextField(null=False, default=None)
    product_description_additional = models.TextField(
        blank=True, null=True, default=None)
    product_image_url = models.CharField(
        max_length=250, null=True, blank=True, default=None)
    thumbnail = models.ImageField(
        null=True, blank=True, upload_to=get_product_thumbnail_upload_path,  max_length=500)
    provider = models.CharField(
        max_length=250, null=True, blank=True, default='publiexpe')
    repeated_position = models.IntegerField(null=True, default=0)

    accept_order_when_out_of_stock = models.BooleanField(default=False)
    max_reserve_quantity = models.IntegerField(default=50)

    root_reference = models.CharField(
        max_length=250, null=True, blank=True, default=None)

    show_color_to_order = models.BooleanField(default=False)
    weight = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, blank=True, default=0.00)
    depth = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, blank=True, default=0.00)
    width = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, blank=True, default=0.00)
    height = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, blank=True, default=0.00)
    combined_measured = models.CharField(
        max_length=250, null=True, blank=True, default=None)
    box_units = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True, default=0.00)
    sell_per_box = models.BooleanField(default=False)
    minimum_order = models.IntegerField(default=1)
    pallet_box = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, blank=True, default=0.00)
    pallet_units = models.IntegerField(null=True, blank=True, default=0)
    pallet_weight = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True, default=0.00)
    box_weight = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, blank=True, default=0.00)
    box_dimension = models.CharField(
        max_length=75, null=True, blank=True, default="")
    material = models.CharField(
        max_length=250, null=True, blank=True, default=None)
    total_visit = models.IntegerField(null=True, blank=True, default=0)
    is_published = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    link_360 = models.CharField(
        max_length=250, null=True, blank=True, default=None)
    link_video1 = models.CharField(
        max_length=250, null=True, blank=True, default=None)
    link_video2 = models.CharField(
        max_length=250, null=True, blank=True, default=None)
    outlet = models.BooleanField(default=False)
    is_new = models.BooleanField(default=True)
    is_most_sold = models.BooleanField(default=False)
    liquidation = models.BooleanField(default=False)
    settlement_position = models.CharField(
        choices=SettlementPosition.choices, max_length=10, default=SettlementPosition.LEFT_UP)
    liquidation_text = models.CharField(
        max_length=250, null=True, blank=True, default=None)
    liquidation_background_color = models.CharField(
        max_length=8, null=True, blank=True, default='#000000')
    liquidation_text_color = models.CharField(
        max_length=8, null=True, blank=True, default='#FFFFFF')
    is_seal_activated = models.BooleanField(default=False)
    is_discount_allowed = models.BooleanField(default=False)
    protect_image = models.BooleanField(default=False)
    datasheet = models.FileField(
        null=True, blank=True, upload_to=get_product_datasheet_upload_path)
    imported_json_data = models.JSONField(null=True, blank=True, default=None)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    tags = ArrayField(models.CharField(
        max_length=500, null=True, blank=True), size=10, default=list, blank=True)
    rating = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, blank=True, default=0.00)

    def __str__(self):
        return str(self.product_name)

    class Meta:
        db_table = "ecommerce_product"
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            slug_text = slugify(self.product_name)
            self.slug = unique_slugify(self, slug_text)
        if not self.product_description:
            self.product_description = self.product_name
        self.clean()
        super().save(*args, **kwargs)

    def delete(self, using=None, keep_parents=False):
        if self.thumbnail:
            name = self.thumbnail.name
            self.thumbnail.storage.delete(name)
        super().delete()


class ProductVariant(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, null=False, blank=False, related_name="variant")
    variant_name = models.CharField(
        max_length=250, null=False, blank=False, default='')
    reference = models.CharField(
        max_length=250, null=True, blank=True, default=None)
    price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, default=0.00)
    slug = models.SlugField(max_length=250, null=False,
                            blank=False, editable=False, allow_unicode=True)
    stock = models.IntegerField(default=0)
    available_from = models.DateTimeField(auto_now=True)
    color = models.ForeignKey(Color, on_delete=models.CASCADE,
                              null=False, blank=False, related_name='belongs_to_color')
    size = models.ForeignKey(Size, on_delete=models.CASCADE,
                             null=False, blank=False, related_name='belongs_to_size')
    image = models.ImageField(
        null=True, blank=True, upload_to=get_product_thumbnail_upload_path,  max_length=500)
    original_img_url = models.CharField(
        max_length=350, null=True, blank=True, default=None)
    allow_backorder = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.slug)

    class Meta:
        db_table = "ecommerce_product_variant"
        ordering = ['reference']

    def save(self, *args, **kwargs):
        if not self.slug:
            slug_text = slugify(self.variant_name)
            self.slug = unique_slugify(self, slug_text)
        self.clean()
        super().save(*args, **kwargs)

    def delete(self, using=None, keep_parents=False):
        from general.models import MediaGallery
        media = MediaGallery.objects.filter(
            product=self.product, file=self.image)
        if len(media):
            media = media.first()
            media.product = None
            media.save()
        super().delete()


class ProductSeo(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, null=False, blank=False, related_name="belongs_to")
    title = models.CharField(
        max_length=150, null=False, blank=False, default='')
    meta_description = models.CharField(
        max_length=250, null=True, blank=True, default=None)
    key_words = ArrayField(models.CharField(
        max_length=500, null=True, blank=True), size=10, default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.title)

    class Meta:
        db_table = "ecommerce_product_seo"
        ordering = ['-updated_at']

    def save(self, *args, **kwargs) -> None:
        if not self.title:
            self.title = f"{self.product.product_name} {self.product.provider}"
        if not self.meta_description:
            self.meta_description = f"{self.title} personalizable"
        if not self.key_words:
            self.key_words = [f"{self.product.product_name} personalizable"]
            for tag in self.product.tags:
                self.key_words.append(tag)

        self.clean()
        super().save(*args, **kwargs)


class EngravingTechnique(models.Model):
    name = models.CharField(
        max_length=250, null=False, blank=False, default='')
    slug = models.SlugField(max_length=250, null=False,
                            blank=False, editable=False, allow_unicode=True)
    code_makito = models.CharField(max_length=150, null=True, blank=True)
    max_color = models.IntegerField(default=1)
    terms = models.TextField(blank=True)

    cliche_price = models.FloatField(default=30.0)
    is_cliche_repeated = models.BooleanField(default=False)
    repeated_cliche_price = models.FloatField(default=15.0)
    minimum_work = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, default=0.00)
    min_amount = models.IntegerField(default=0, null=True)

    min_amount_1 = models.IntegerField(default=0)
    color1_price = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, default=0.00)
    color1_aditional = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, default=0.00)
    cm_price_1 = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, default=0.00)

    min_amount_2 = models.IntegerField(default=0)
    color2_price = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, default=0.00)
    color2_aditional = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, default=0.00)
    cm_price_2 = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, default=0.00)

    min_amount_3 = models.IntegerField(default=0)
    color3_price = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, default=0.00)
    color3_aditional = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, default=0.00)
    cm_price_3 = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, default=0.00)

    min_amount_4 = models.IntegerField(default=0)
    color4_price = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, default=0.00)
    color4_aditional = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, default=0.00)
    cm_price_4 = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, default=0.00)

    min_amount_5 = models.IntegerField(default=0)
    color5_price = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, default=0.00)
    color5_aditional = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, default=0.00)
    cm_price_5 = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, default=0.00)

    min_amount_6 = models.IntegerField(default=0)
    color6_price = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, default=0.00)
    color6_aditional = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, default=0.00)
    cm_price_6 = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, default=0.00)

    min_amount_7 = models.IntegerField(default=0)
    color7_price = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, default=0.00)
    color7_aditional = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, default=0.00)
    cm_price_7 = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, default=0.00)

    order_under_request = models.BooleanField(default=False)
    block_import = models.BooleanField(default=False)
    select_color = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.name)

    class Meta:
        db_table = "ecommerce_engraving_technique"
        ordering = ['name']

    def save(self, *args, **kwargs):
        if not self.slug:
            slug_text = slugify(self.name)
            self.slug = unique_slugify(self, slug_text)
        self.clean()
        super().save(*args, **kwargs)


class EngravingTechniqueColor(models.Model):
    engraving_technique = models.ForeignKey(
        EngravingTechnique, on_delete=models.CASCADE, null=False, blank=False, related_name='belongs_to_engraving_technique')
    name = models.CharField(max_length=250, null=False,
                            blank=False, default='')
    slug = models.SlugField(max_length=250, null=False,
                            blank=False, editable=False, allow_unicode=True)
    n_colors = models.IntegerField(default=1)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.name)

    class Meta:
        db_table = "ecommerce_engraving_technique_color"
        ordering = ['name']

    def save(self, *args, **kwargs):
        if not self.slug:
            slug_text = slugify(self.name)
            self.slug = unique_slugify(self, slug_text)
        self.clean()
        super().save(*args, **kwargs)


# Product image upload directory path
def get_engraved_area_image_upload_path(instance, filename):
    return 'images/product/{0}/engraved-area/{1}'.format(instance.product.provider, filename)


class EngravingArea(models.Model):
    product = models.ManyToManyField(Product, blank=True)
    engraving_technique = models.ManyToManyField(
        EngravingTechnique, blank=False)
    name = models.CharField(max_length=250, null=False,
                            blank=False, default='')
    slug = models.SlugField(max_length=250, null=False,
                            blank=False, editable=False, allow_unicode=True)
    code_makito = models.CharField(max_length=150, null=True, blank=True)

    width = models.DecimalField(
        max_digits=6, decimal_places=2, null=False, blank=False, default=0.00)
    height = models.DecimalField(
        max_digits=6, decimal_places=2, null=False, blank=False, default=0.00)
    diameter = models.DecimalField(
        max_digits=6, decimal_places=2, null=False, blank=False, default=0.00)
    image = models.FileField(
        null=True, blank=True, upload_to=get_engraved_area_image_upload_path, validators=[
            FileExtensionValidator(['png', 'jpg', 'jpeg'])])

    is_modified = models.BooleanField(default=False)
    is_deprecated = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.name)

    class Meta:
        db_table = "ecommerce_engraved_area"
        ordering = ['-slug']

    def save(self, *args, **kwargs):
        if not self.slug:
            slug_text = slugify(self.name)
            self.slug = unique_slugify(self, slug_text)
        self.clean()
        super().save(*args, **kwargs)

    def delete(self, using=None, keep_parents=False):
        if self.image:
            self.image.storage.delete(self.image.name)
        super().delete()

    @property
    def get_area_cm2(self):
        if self.width > 0:
            return self.width * self.width
        else:
            return self.diameter * self.diameter


class ProductTopSeller(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE,
                                null=False, blank=False, related_name='product_top_seller')
    sales = models.IntegerField(default=0, null=False, blank=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'product_top_seller'
        ordering = ["-sales", "-updated_at"]

    def __str__(self):
        return str(self.product.product_name)

    @staticmethod
    def get_best_sellers_in_month():
        this_month = datetime.now() - relativedelta(months=1)
        return ProductTopSeller.objects.filter(updated_at__gte=this_month)

    @staticmethod
    def get_top_best_sellers():
        top_seller = list(ProductTopSeller.objects.all())
        if len(top_seller) > 0:
            top_seller = random.sample(top_seller, 10)
            return top_seller
        else:
            return ProductTopSeller.objects.all()[:10]
