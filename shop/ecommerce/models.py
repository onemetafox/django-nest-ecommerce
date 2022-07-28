from django.db import models
from django.template.defaultfilters import slugify
from django.utils.translation import gettext as _
from django.utils import timezone
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
    show_in_menu_list = models.BooleanField(default=True)
    is_favorite = models.BooleanField(default=True)

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
    description = models.TextField(null=False, default=None)

    basic_color = models.CharField(
        max_length=80, null=True, blank=True, default=None)
    simple_color = models.CharField(
        max_length=80, null=True, blank=True, default=None)
    primary_color = models.CharField(
        max_length=80, null=True, blank=True, default=None)
    secondary_color = models.CharField(
        max_length=80, null=True, blank=True, default=None)

    sticker_id = models.CharField(
        max_length=50, null=True, blank=True, default=None)
    sticker_name = models.CharField(
        max_length=100, null=True, blank=True, default=None)
    pfconcept_color = models.CharField(
        max_length=50, null=True, blank=True, default=None)
    pms_color_reference = models.CharField(
        max_length=50, null=True, blank=True, default=None)
    jhk_color = models.CharField(
        max_length=50, null=True, blank=True, default=None)
    jhk_color_reference = models.CharField(
        max_length=50, null=True, blank=True, default=None)

    roly_color = models.CharField(
        max_length=50, null=True, blank=True, default=None)
    roly_color_id = models.CharField(
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
    cifra_size = models.CharField(
        max_length=50, null=True, blank=True, default=None)
    makito_size = models.CharField(
        max_length=50, null=True, blank=True, default=None)
    pfconcept_size = models.CharField(
        max_length=50, null=True, blank=True, default=None)
    roly_size = models.CharField(
        max_length=50, null=True, blank=True, default=None)
    roly_size_id = models.CharField(
        max_length=50, null=True, blank=True, default=None)
    jhk_size = models.CharField(
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
    return 'images/product/{0}/{1}'.format(provider, filename)

# Product thumbnail image upload directory path


def get_product_thumbnail_upload_path(instance, filename):
    provider = getattr(instance, "provider", "publiexpe").lower()
    return 'images/product/{0}/thumbnail/{1}'.format(provider, filename)

# Product datasheet upload directory path


def get_product_datasheet_upload_path(instance, filename):
    provider = getattr(instance, "provider", "publiexpe").lower()
    return 'images/product/{0}/datasheet/{1}'.format(provider, filename)


class Product(models.Model):
    class SettlementPosition(models.TextChoices):
        LEFT_UP = 'LEFT_UP', _('LEFT_UP')
        LEFT_DOWN = 'LEFT_DOWN', _('LEFT_DOWN')
        RIGHT_UP = 'RIGHT_UP', _('RIGHT_UP')
        RIGHT_DOWN = 'RIGHT_DOWN', _('RIGHT_DOWN')

    category = models.ForeignKey(Category, on_delete=models.CASCADE,
                                 null=False, blank=False, related_name='belongs_to_category')
    color = models.ForeignKey(Color, on_delete=models.CASCADE,
                              null=False, blank=False, related_name='belongs_to_color')
    size = models.ForeignKey(Size, on_delete=models.CASCADE,
                             null=False, blank=False, related_name='belongs_to_size')
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
    product_thumbnail_image = models.ImageField(
        null=True, blank=True, upload_to=get_product_thumbnail_upload_path,  max_length=500)
    provider = models.CharField(
        max_length=250, null=True, blank=True, default='publiexpe')
    repeated_position = models.IntegerField(null=True, default=0)
    price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, default=0.00)
    net_price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, default=0.00)
    stock = models.IntegerField(default=0)
    accept_order_when_out_of_stock = models.BooleanField(default=False)
    max_reserve_quantity = models.IntegerField(default=50)
    available_from = models.DateTimeField(auto_now=True)
    reference = models.CharField(
        max_length=250, null=True, blank=True, default=None)
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
        max_digits=6, decimal_places=2, null=True, blank=True, default=0.00)
    sell_per_box = models.BooleanField(default=False)
    minimum_order = models.IntegerField(default=1)
    pallet_box = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, blank=True, default=0.00)
    pallet_units = models.IntegerField(null=True, blank=True, default=0)
    pallet_weight = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, blank=True, default=0.00)
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
    liquidation = models.BooleanField(default=True)
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
        max_length=25, null=True, blank=True), size=50, default=list, blank=True)

    def __str__(self):
        return f'{self.product_name} - {self.provider}'

    class Meta:
        db_table = "ecommerce_product"
        ordering = ['product_name']

    def save(self, *args, **kwargs):
        if not self.slug:
            slug_text = slugify(self.product_name)
            self.slug = unique_slugify(self, slug_text)
        self.clean()
        super().save(*args, **kwargs)

    def delete(self, using=None, keep_parents=False):
        name = self.product_thumbnail_image.name
        self.product_thumbnail_image.storage.delete(name)
        super().delete()


class ProductImage(models.Model):
    """Product Images"""
    product = models.ForeignKey(Product, on_delete=models.CASCADE,
                                null=False, blank=False, related_name='belongs_to_product')
    product_image = models.FileField(
        null=True, blank=True, upload_to=get_product_image_upload_path, validators=[
            FileExtensionValidator(['png', 'jpg', 'jpeg'])])
    slug = models.SlugField(max_length=250, null=False,
                            blank=False, editable=False, allow_unicode=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.product.product_name)

    class Meta:
        db_table = "ecommerce_product_image"
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            slug_text = slugify(self.product.product_name)
            self.slug = unique_slugify(self, slug_text)
        self.clean()
        super().save(*args, **kwargs)

    def delete(self, using=None, keep_parents=False):
        self.product_image.storage.delete(self.product_image.name)
        super().delete()


class ProductAnnouncement(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=False,
                                blank=False, related_name='product_product_announcement')
    name = models.CharField(max_length=250, null=False,
                            blank=False, default='')
    slug = models.SlugField(max_length=250, null=False,
                            blank=False, editable=False, allow_unicode=True)
    adjective = models.CharField(max_length=250, null=True, blank=True)
    title = models.CharField(
        max_length=250, null=False, blank=False, default='')
    subtitle = models.CharField(
        max_length=250, null=False, blank=False, default='')
    image = models.ImageField(null=True, blank=True,
                              upload_to=get_product_image_upload_path)
    text_bottom = models.CharField(max_length=250, null=True, blank=True)
    right_position = models.BooleanField(default=True)
    text_color = models.CharField(
        max_length=8, null=True, blank=True, default='#000000')
    url = models.CharField(max_length=250, null=False, blank=False, default='')
    is_active = models.BooleanField(default=True)
    sort_order = models.IntegerField(default=1)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.product.product_name)

    class Meta:
        db_table = "ecommerce_product_announcement"
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            slug_text = slugify(self.product.product_name)
            self.slug = unique_slugify(self, slug_text)
        self.clean()
        super().save(*args, **kwargs)


class EngravingTechnique(models.Model):
    engraving_technique_name = models.CharField(
        max_length=250, null=False, blank=False, default='')
    slug = models.SlugField(max_length=250, null=False,
                            blank=False, editable=False, allow_unicode=True)
    code_makito = models.CharField(max_length=150, null=True, blank=True)
    code_pfconcept = models.CharField(max_length=150, null=True, blank=True)
    max_color = models.IntegerField(default=1)
    included_color = models.IntegerField(default=1)

    minimum_work = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, default=20.00)
    minimum_price_per_unit = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, default=0.00)

    low_order_price = models.BooleanField(default=False)
    cm2 = models.BooleanField(default=False)
    select_color = models.BooleanField(default=True)

    color1_1 = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, default=1.00)
    color1_10 = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, default=1.00)
    color1_50 = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, default=1.00)
    color1_100 = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, default=1.00)
    color1_250 = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, default=1.00)
    color1_500 = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, default=1.00)
    color1_1000 = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, default=1.00)
    color1_2000 = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, default=1.00)
    color1_5000 = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, default=1.00)

    color2_1 = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, default=1.00)
    color2_10 = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, default=1.00)
    color2_50 = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, default=1.00)
    color2_100 = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, default=1.00)
    color2_250 = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, default=1.00)
    color2_500 = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, default=1.00)
    color2_1000 = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, default=1.00)
    color2_2000 = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, default=1.00)
    color2_5000 = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, default=1.00)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.engraving_technique_name)

    class Meta:
        db_table = "ecommerce_engraving_technique"
        ordering = ['engraving_technique_name']

    def save(self, *args, **kwargs):
        if not self.slug:
            slug_text = slugify(self.engraving_technique_name)
            self.slug = unique_slugify(self, slug_text)
        self.clean()
        super().save(*args, **kwargs)

    def get_price(self, amount, color, is_minimum=True, area=1):
        if color == 1:
            selection = self.color1_1
        else:
            selection = self.color2_1

        if amount >= 5000:
            if color == 1:
                selection = self.color1_5000
            else:
                selection = self.color2_5000
        elif amount >= 2000:
            if color == 1:
                selection = self.color1_2000
            else:
                selection = self.color2_2000
        elif amount >= 1000:
            if color == 1:
                selection = self.color1_1000
            else:
                selection = self.color2_1000
        elif amount >= 500:
            if color == 1:
                selection = self.color1_500
            else:
                selection = self.color2_500
        elif amount >= 250:
            if color == 1:
                selection = self.color1_250
            else:
                selection = self.color2_250
        elif amount >= 100:
            if color == 1:
                selection = self.color1_100
            else:
                selection = self.color2_100
        elif amount >= 50:
            if color == 1:
                selection = self.color1_50
            else:
                selection = self.color2_50
        price = amount * selection
        price = price * area
        try:
            unit_price = price / amount
        except:
            unit_price = price

        if is_minimum and unit_price < self.minimum_price_per_unit:
            price = self.minimum_price_per_unit * amount
        if is_minimum and price < self.minimum_work:
            price = self.minimum_work
        return price


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


class EngravedArea(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE,
                                null=False, blank=False, related_name='product_engraved_area')
    engraving_technique = models.ForeignKey(
        EngravingTechnique, on_delete=models.CASCADE, null=False, blank=False, related_name='engraving_technique_engraved_area')
    name = models.CharField(max_length=250, null=False,
                            blank=False, default='')
    display_name = models.CharField(
        max_length=250, null=False, blank=False, default='')
    slug = models.SlugField(max_length=250, null=False,
                            blank=False, editable=False, allow_unicode=True)
    code_makito = models.CharField(max_length=150, null=True, blank=True)
    code_pfconcept = models.CharField(max_length=150, null=True, blank=True)

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
        ordering = ['name']

    def save(self, *args, **kwargs):
        if not self.slug:
            slug_text = slugify(self.name)
            self.slug = unique_slugify(self, slug_text)
        self.clean()
        super().save(*args, **kwargs)

    def delete(self, using=None, keep_parents=False):
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
