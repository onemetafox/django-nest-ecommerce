from rest_framework import serializers

# import models
from ecommerce.models import Category

class CategorySerializer(serializers.ModelSerializer):
	class Meta:
		model = Category
		fields =  ['category_name', 'slug']

class CategoryWithSubcategorySerializer(serializers.ModelSerializer):
	subcategory = CategorySerializer(many=True)
	class Meta:
		model = Category
		fields =  ['category_name', 'slug', 'subcategory']


