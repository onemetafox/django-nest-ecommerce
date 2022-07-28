from django.contrib.auth.models import User
from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry

from .models import Category, Product


@registry.register_document
class ProductDocument(Document):
    category = fields.ObjectField(properties={
        "slug": fields.TextField(),
        "category_name": fields.TextField(),
    })

    class Index:
        name = "products"
        settings = {
            'number_of_shards': 1,
            'number_of_replicas': 0,
        }

    class Django:
        model = Product
        fields = [
            "product_name",
            "slug",
            "reference",
            "root_reference"
        ]


@registry.register_document
class CategoryDocument(Document):
    parent_category = fields.ObjectField(properties={
        "slug": fields.TextField(),
        "category_name": fields.TextField()
    })

    class Index:
        name = 'categories'
        settings = {
            'number_of_shards': 1,
            'number_of_replicas': 0,
        }

    class Django:
        model = Category
        fields = [
            'category_name',
            'slug',
        ]
