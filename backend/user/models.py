from django.db import models
from django.contrib.auth.models import User
from django.template.defaultfilters import slugify


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


class UserProfile(models.Model):
    ROLE = (
        ('COMMERCIAL', 'COMMERCIAL'),
        ('ADMIN', 'ADMIN'),
        ('USER', 'USER')
    )

    auth_user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        null=False,
        default=None,
        unique=True,
        related_name='user_profile'
    )
    phone_number = models.BigIntegerField(null=False, blank=False, default=0)
    slug = models.SlugField(max_length=250, null=True,
                            editable=False, allow_unicode=True)
    accept_offers_and_newsletters = models.BooleanField(default=True)
    cookies_accepted = models.BooleanField(default=False)
    cookies_version = models.CharField(
        max_length=4, null=True, blank=True, default=None)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    role = models.CharField(max_length=10, choices=ROLE,
                            null=False, default='USER')
    language = models.CharField(max_length=6, blank=True, null=True)

    def __str__(self):
        return str(self.auth_user.username)

    class Meta:
        db_table = "user_profile"
        ordering = ['slug']

    def save(self, *args, **kwargs):
        if not self.slug:
            slug_text = slugify(self.auth_user.username)
            self.slug = unique_slugify(self, slug_text)
        self.clean()
        super().save(*args, **kwargs)


class BillingAddress(models.Model):
    auth_user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        null=False,
        default=None,
        unique=True,
        related_name='user_billing_address'
    )
    slug = models.SlugField(max_length=250, null=False,
                            blank=False, editable=False, allow_unicode=True)
    phone_number = models.BigIntegerField(null=False, blank=False, default=0)
    company_name = models.CharField(
        max_length=100, null=False, blank=False, default=None)
    address = models.CharField(
        max_length=100, null=False, blank=False, default=None)
    city = models.CharField(max_length=40, null=False,
                            blank=False, default=None)
    province = models.CharField(
        max_length=40, null=False, blank=False, default=None)
    postal_code = models.IntegerField(null=False, blank=False, default=0)
    cif = models.CharField(max_length=20, null=False,
                           blank=False, default=None)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    country = models.CharField(
        max_length=2, blank=False, null=False, default="ES")
    email = models.CharField(max_length=60, null=True)

    def __str__(self):
        return str(self.auth_user.username)

    class Meta:
        db_table = "billing_address"
        ordering = ['slug']

    def save(self, *args, **kwargs):
        if not self.slug:
            slug_text = slugify(self.auth_user.username)
            self.slug = unique_slugify(self, slug_text)
        self.clean()
        super().save(*args, **kwargs)


class ShippingAddress(models.Model):
    auth_user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=False,
        default=None,
        unique=False,
        related_name='user_shipping_address'
    )
    slug = models.SlugField(max_length=250, null=False,
                            blank=False, editable=False, allow_unicode=True)
    phone_number = models.BigIntegerField(null=False, blank=False, default=0)
    name = models.CharField(max_length=100, null=False,
                            blank=False, default=None)
    address = models.CharField(
        max_length=100, null=False, blank=False, default=None)
    city = models.CharField(max_length=40, null=False,
                            blank=False, default=None)
    province = models.CharField(
        max_length=40, null=False, blank=False, default=None)
    postal_code = models.IntegerField(null=False, blank=False, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    country = models.CharField(
        max_length=2, blank=False, null=False, default="ES")
    default = models.BooleanField(default=False)

    def __str__(self):
        return str(self.auth_user.username)

    class Meta:
        db_table = "shipping_address"
        ordering = ['slug']

    def save(self, *args, **kwargs):
        if not self.slug:
            slug_text = slugify(self.auth_user.username)
            self.slug = unique_slugify(self, slug_text)
        self.clean()
        super().save(*args, **kwargs)
