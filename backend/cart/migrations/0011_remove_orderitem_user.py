# Generated by Django 3.2 on 2022-05-16 19:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0010_rename_order_orderitem_cart'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderitem',
            name='user',
        ),
    ]