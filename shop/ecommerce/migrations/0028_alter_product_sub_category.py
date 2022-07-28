# Generated by Django 3.2 on 2022-03-02 15:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0027_product_sub_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='sub_category',
            field=models.ManyToManyField(blank=True, related_name='subcategories', to='ecommerce.Category'),
        ),
    ]