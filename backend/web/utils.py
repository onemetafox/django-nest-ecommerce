from django.db.models import Q

# import models
from ecommerce.models import Product
# import serializers
from ecommerce.serializers import ProductShopSerializer


def get_related_products(slug, limit, request):
    """
    Get related products for a product
    """
    product = Product.objects.get(
        slug=slug)
    related_products = Product.objects.filter(Q(category=product.category) | Q(
        sub_category__in=product.sub_category.all()) | Q(product_name__icontains=product.product_name.split(" ")[0])).exclude(id=product.id)[:limit]
    related_products_serializer = ProductShopSerializer(
        related_products, many=True, context={'request': request})
    return related_products_serializer.data
