# Generated by Django 3.2 on 2022-01-09 13:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0013_engravedarea'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='color',
            name='parent_category',
        ),
    ]