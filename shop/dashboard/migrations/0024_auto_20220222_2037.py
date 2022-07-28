# Generated by Django 3.2 on 2022-02-22 19:37

import dashboard.models
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0023_auto_20220222_1957'),
    ]

    operations = [
        migrations.AlterField(
            model_name='homebanner',
            name='banner_image',
            field=models.ImageField(upload_to=dashboard.models.get_banner_image_upload_path, validators=[django.core.validators.FileExtensionValidator(['png', 'jpg', 'jpeg'])]),
        ),
        migrations.AlterField(
            model_name='homeslider',
            name='slider_image',
            field=models.ImageField(upload_to=dashboard.models.get_banner_image_upload_path, validators=[django.core.validators.FileExtensionValidator(['png', 'jpg', 'jpeg'])]),
        ),
    ]
