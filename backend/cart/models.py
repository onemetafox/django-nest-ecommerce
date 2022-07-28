from statistics import mode
from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth import get_user_model

# Models
from ecommerce.models import Product, ProductVariant, EngravingArea, EngravingTechnique, EngravingTechniqueColor
from user.models import BillingAddress, ShippingAddress

User = get_user_model()

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

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,
                             null=True, blank=True, related_name='user_orders')
    ref_code = models.CharField(max_length=20, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    ordered_date = models.DateTimeField(blank=True, null=True)
    ordered = models.BooleanField(default=False)
    billing_address = models.CharField(max_length = 255, blank=False, null = False)
    shipping_address = models.CharField(max_length = 255, blank=False, null = False)
    payment = models.ForeignKey(
        'Payment', on_delete=models.SET_NULL, blank=True, null=True)
    coupon = models.ForeignKey(
        'Coupon', on_delete=models.SET_NULL, blank=True, null=True)
    being_delivered = models.BooleanField(default=False)
    received = models.BooleanField(default=False)
    refund_requested = models.BooleanField(default=False)
    refund_granted = models.BooleanField(default=False)
    email = models.CharField(max_length = 100, blank=True, null = True)
    cookie = models.CharField(max_length = 255, blank=True, null = True)

    '''
        1. Item added to cart
        2. Adding a billing address
        (Failed checkout)
        3. Payment
        (Preprocessing, processing, packaging etc.)
        4. Being delivered
        5. Received
        6. Refunds
    '''

    def __str__(self) -> str:
        return self.reference_number

    def get_total(self):
        total = 0
        for order_item in self.items.all():
            total += order_item.get_final_price()
        if self.coupon:
            total -= self.coupon.amount
        return total

    @property
    def reference_number(self):
        return f"order-{self.pk}"

class OrderItem(models.Model):
    variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    cart = models.ForeignKey(Order, on_delete=models.CASCADE)

    cusomized = models.BooleanField(default=False)
    image_url = models.CharField(
        max_length=250, null=True, blank=True, default=None)
    description = models.CharField(max_length=250, null=True, blank=True, default=None)
    engraved_area = models.ForeignKey(EngravingArea, on_delete=models.SET_NULL, null=True, blank=True, default=None)
    engraved_technique = models.ForeignKey(EngravingTechnique, on_delete=models.SET_NULL, blank=True, default=None, null=True)
    engraved_color = models.ForeignKey(EngravingTechniqueColor,on_delete=models.SET_NULL, blank=True, default=None, null=True)

    def __str__(self):
        return f"{self.quantity} x {self.product.product_name}"

    def get_total_item_price(self):
        return self.quantity * self.item.price

    def get_total_discount_item_price(self):
        return self.quantity * self.item.discount_price

    def get_amount_saved(self):
        return self.get_total_item_price() - self.get_total_discount_item_price()

    def get_final_price(self):
        if self.item.discount_price:
            return self.get_total_discount_item_price()
        return self.get_total_item_price()






class Payment(models.Model):
    PAYMENT_METHODS = (
        ('Paypal', 'Paypal'),
        ('Transfer', 'Transferencia'),
        ('redsys', 'redsys'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE,
                             null=False, blank=False, related_name='user_payments')
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHODS)
    succesful = models.BooleanField(default=False)
    amount = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    raw_response = models.TextField()

    def __str__(self) -> str:
        return f"payment-{self.order}-{self.pk}"


class Coupon(models.Model):
    TYPES = (
        ("PERCENT", "PERCENTAGE"),
        ("AMOUNT", "AMOUNT"),
        ("PRODUCT", "PRODUCT AMOUNT"),
    )
    coupon_code = models.CharField(max_length=100, null=False, unique=True)
    to_single_user = models.ForeignKey(
        User, null=True, blank=True, on_delete=models.CASCADE)
    to_single_product = models.ForeignKey(
        Product, null=True, blank=True, on_delete=models.CASCADE)
    to_product_root_reference = models.CharField(
        max_length=50, null=True, blank=True)
    free_shipping = models.BooleanField(default=False)
    description = models.CharField(max_length=350, null=True, blank=True)
    expired_on = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    individual_use = models.BooleanField(default=True)
    min_amount = models.IntegerField(null=True, blank=True)
    max_amount = models.IntegerField(null=True, blank=True)
    excluded_products = ArrayField(models.CharField(max_length=50,
                                                    null=True, blank=True), null=True, blank=list)
    excluded_categories = ArrayField(models.CharField(max_length=50,
                                                      null=True, blank=True), null=True, blank=list)
    max_per_user = models.IntegerField(default=1)
    max_uses = models.IntegerField(default=1)

    def __str__(self) -> str:
        return str(self.coupon_code)


class Refund(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    reason = models.TextField()
    accepted = models.BooleanField(default=False)
    email = models.EmailField()

    def __str__(self):
        return f"{self.pk}"
