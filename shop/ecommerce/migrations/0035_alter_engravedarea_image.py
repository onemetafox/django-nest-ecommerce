# Generated by Django 3.2 on 2022-03-07 15:35

import django.core.validators
from django.db import migrations, models
import ecommerce.models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0034_auto_20220307_1549'),
    ]

    operations = [
        migrations.AlterField(
            model_name='engravedarea',
            name='image',
            field=models.FileField(blank=True, null=True, upload_to=ecommerce.models.get_engraved_area_image_upload_path, validators=[django.core.validators.FileExtensionValidator(['png', 'jpg', 'jpeg'])]),
        ),
    ]