from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.template.defaultfilters import slugify
from django.core.validators import FileExtensionValidator

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


# Web settings

# Bussiness info settings
class Company(models.Model):
    SHIP_TO = (
        ('SHIPPING_ADDRESS', 'SHIPPING_ADDRESS'),
        ('BILLING_ADDRESS', 'BILLING_ADDRESS')
    )

    company_name = models.CharField(max_length=250, null=False)
    cif = models.CharField(max_length=13, null=False, unique=True)
    address = models.CharField(max_length=100, null=False)
    address_extra = models.CharField(max_length=100, null=True, blank=True)
    locality = models.CharField(max_length=35, null=False)
    city = models.CharField(max_length=50, null=False)
    postal_code = models.IntegerField(null=False)
    phone_number = models.BigIntegerField(null=False, blank=False, default=0)
    slug = models.SlugField(max_length=250, null=True,
                            editable=False, allow_unicode=True)
    tariff_global = models.FloatField(max_length=5, null=False, default=0)
    tariff_engraving = models.FloatField(max_length=5, null=False, default=0)
    vat = models.FloatField(null=True, blank=True)
    vat_french = models.FloatField(null=True, blank=True)
    vat_show_in_products = models.BooleanField(default=False)
    vat_prefix = models.CharField(max_length=30, null=True)
    shipping_measure_unit = models.CharField(max_length=5, null=True)
    shipping_dimension_unit = models.CharField(max_length=5, null=True)
    shipping_calculate_in_cart = models.BooleanField(default=False)
    shipping_to = models.CharField(
        max_length=20, choices=SHIP_TO, null=False, default='SHIPPING_ADDRESS')
    product_active_review = models.BooleanField(default=False)
    product_active_rating = models.BooleanField(default=False)
    stock_active_management = models.BooleanField(default=False)
    stock_low_threshold = models.IntegerField(null=True, default=0)
    stock_high_threshold = models.IntegerField(null=True, default=0)
    stock_out_hidde_product = models.BooleanField(default=False)
    cart_active = models.BooleanField(default=True)
    cuppons_active = models.BooleanField(default=True)

    def __str__(self):
        return str(self.cif)

    class Meta:
        db_table = "company_settings"

    def has_add_permission(self, *args, **kargs):
        return not Company.objects.exists()

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    def create(self, validated_data):
        company, created = Company.objects.update_or_create(
            question=validated_data.get('cif', None),
            defaults={**validated_data})

        return company

# Data Protection


class DataProtection(models.Model):
    display_text = models.CharField(max_length=500, null=True, blank=True)
    legal_advice = models.TextField(null=True, blank=True)
    privacy_policy = models.TextField(null=True, blank=True)
    cookies_web = models.TextField(null=True, blank=True)
    terms_and_conditions = models.TextField(null=True, blank=True)
    version = models.FloatField(null=False, default="0.0")
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str("Data Protection")

    class Meta:
        db_table = "data_protection"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    def create(self, validated_data):
        data_protection, created = DataProtection.objects.update_or_create(
            question=validated_data.get('id', None),
            defaults={**validated_data})

        return data_protection


# Shippings
class ShippingMethod(models.Model):
    TYPES = (
        ('FREE', 'FREE'),
        ('FLAT', 'FLAT'),
        ("CUSTOM", "CUSTOM")
    )
    REQUIREMENTS = (
        ("MIN_AMOUNT", "MIN_AMOUNT"),
        ("COUPON", "COUPON"),
        ("EITHER", "EITHER")
    )
    slug = models.SlugField(max_length=250, null=True,
                            editable=False, allow_unicode=True)
    name = models.CharField(max_length=30, null=False)
    is_active = models.BooleanField(default=False, null=False)
    description = models.CharField(max_length=100, null=True)
    price = models.FloatField(null=False)
    type = models.CharField(max_length=20, null=True,
                            choices=TYPES, blank=False)
    requirement = models.CharField(max_length=20, null=True,
                                   choices=REQUIREMENTS, blank=False)

    def __str__(self):
        return str(self.name)

    class Meta:
        db_table = "shipping_method"

    def save(self, *args, **kwargs):
        if not self.slug:
            slug_text = slugify(self.name)
            self.slug = unique_slugify(self, slug_text)
        self.clean()
        super().save(*args, **kwargs)


class Shipping(models.Model):
    slug = models.SlugField(max_length=250, null=True,
                            editable=False, allow_unicode=True)
    zone_name = models.CharField(max_length=20, null=False, blank=False)
    regions = ArrayField(models.CharField(max_length=50, blank=True), size=100)
    shippings_methods = models.ManyToManyField(
        ShippingMethod,
        related_name="shippings_methods", blank=False
    )

    def __str__(self):
        return str(self.zone_name)

    class Meta:
        db_table = "shippings"

    def save(self, *args, **kwargs):
        if not self.slug:
            slug_text = slugify(self.zone_name)
            self.slug = unique_slugify(self, slug_text)
        self.clean()
        super().save(*args, **kwargs)


# Landing

# banner image upload directory path
def get_banner_image_upload_path(instance, filename):
    return 'images/home/{0}/{1}'.format(instance.slug, filename)


class HomeSlider(models.Model):
    slug = models.SlugField(max_length=250, null=False,
                            blank=False, editable=False, allow_unicode=True)
    name = models.CharField(max_length=50, null=False, default="")
    title = models.CharField(max_length=100, null=True, blank=True)
    subtitle = models.CharField(max_length=100, null=True, blank=True)
    image = models.ImageField(upload_to=get_banner_image_upload_path, validators=[
        FileExtensionValidator(['png', 'jpg', 'jpeg'])])
    image_url = models.CharField(
        max_length=250, null=True, blank=True, default=None)
    link_to = models.CharField(max_length=400, null=True)
    button_text = models.CharField(default="Ir", max_length=50)
    text_color = models.CharField(max_length=7, default='#000000')
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return str(self.name)

    def save(self, *args, **kwargs):
        if not self.slug:
            slug_text = slugify(self.name)
            self.slug = unique_slugify(self, slug_text)
            self.image_url = self.image.url
        self.clean()
        super().save(*args, **kwargs)

    def get_active_sliders():
        return HomeSlider.objects.filter(is_active=True)


class HomeBanner(models.Model):
    slug = models.SlugField(max_length=250, null=False,
                            blank=False, editable=False, allow_unicode=True)
    image = models.ImageField(upload_to=get_banner_image_upload_path, validators=[
        FileExtensionValidator(['png', 'jpg', 'jpeg'])])
    image_url = models.CharField(
        max_length=250, null=True, blank=True, default=None)
    title = models.CharField(max_length=100, blank=True, null=True)
    link_to = models.CharField(max_length=400)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return str(self.title)

    def save(self, *args, **kwargs):
        if not self.slug:
            slug_text = slugify(self.title)
            self.slug = unique_slugify(self, slug_text)
            self.image_url = self.image.url
        self.clean()
        super().save(*args, **kwargs)

    def get_active_banners():
        return HomeBanner.objects.filter(is_active=True)


class Provider(models.Model):
    slug = models.SlugField(max_length=250, null=False,
                            blank=False, editable=False, allow_unicode=True)
    provider_name = models.CharField(max_length=100, blank=True, null=True)
    is_active = models.BooleanField(default=False)
    data = models.JSONField(null=True, blank=True, default=None)
    type = ArrayField(models.CharField(
        max_length=50, blank=True, default=''), size=100, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_imported = models.DateTimeField(
        auto_now=False, null=True, blank=True, default=None)

    class Meta:
        db_table = "dashboard_provider"

    def __str__(self):
        return str(self.provider_name)

    def save(self, *args, **kwargs):
        if not self.slug:
            slug_text = slugify(self.provider_name)
            self.slug = unique_slugify(self, slug_text)
        self.clean()
        super().save(*args, **kwargs)


class PromoWeb(models.Model):
    slug = models.SlugField(max_length=250, null=False,
                            blank=False, editable=False, allow_unicode=True)
    title = models.TextField(max_length=50, null=False,
                             blank=False, default="")
    description = models.TextField(
        max_length=300, null=False, blank=False, default="")
    expired_at = models.DateTimeField()
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "dashboard_promo_web"

    def __str__(self):
        return str(self.title)

    def save(self, *args, **kwargs):
        if not self.slug:
            slug_text = slugify(self.title)
            self.slug = unique_slugify(self, slug_text)
        self.clean()
        super().save(*args, **kwargs)


class ActivePromo(models.Model):
    promo_web = models.ForeignKey(PromoWeb, on_delete=models.CASCADE, )
    is_active = models.BooleanField(default=False)

    class Meta:
        db_table = "dashboard_active_promo"

    def __str__(self):
        return str(self.promo_web.title)

    def save(self, *args, **kwargs) -> None:
        if self.is_active:
            try:
                temp = ActivePromo.objects.get(is_active=True)
                if self != temp:
                    temp.is_active = False
                    temp.save()
            except ActivePromo.DoesNotExist:
                pass
        return super(ActivePromo, self).save(*args, **kwargs)


class WebCommon(models.Model):
    welcome_text = models.CharField(max_length=100, blank=True, null=True)
    web_title = models.CharField(max_length=250, blank=True, null=True)
    about_us_text = models.TextField(blank=True, null=True)

    class Meta:
        db_table = "dashboard_web_common"

    def __str__(self):
        return str(self.id)
