from rest_framework import serializers

# import models
from ecommerce.models import Category, Product


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['category_name', 'slug']


class CategoryWithSubcategorySerializer(serializers.ModelSerializer):
    subcategory = CategorySerializer(many=True)
    count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['category_name', 'slug', 'subcategory', "count"]

    def get_count(self, obj):
        products = Product.objects.filter(category=obj).count()
        return products
