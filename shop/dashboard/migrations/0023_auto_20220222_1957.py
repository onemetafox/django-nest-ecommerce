# Generated by Django 3.2 on 2022-02-22 18:57

import dashboard.models
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0022_auto_20220221_1520'),
    ]

    operations = [
        migrations.AlterField(
            model_name='homebanner',
            name='banner_image',
            field=models.FileField(upload_to=dashboard.models.get_banner_image_upload_path, validators=[django.core.validators.FileExtensionValidator(['png', 'jpg', 'jpeg'])]),
        ),
        migrations.AlterField(
            model_name='homeslider',
            name='slider_image',
            field=models.FileField(upload_to=dashboard.models.get_banner_image_upload_path, validators=[django.core.validators.FileExtensionValidator(['png', 'jpg', 'jpeg'])]),
        ),
    ]