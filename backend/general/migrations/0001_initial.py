# Generated by Django 3.2 on 2022-04-18 10:53

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import general.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('ecommerce', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='MediaGallery',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(blank=True, null=True, upload_to=general.models.get_media_file_upload_path, validators=[django.core.validators.FileExtensionValidator(['png', 'jpg', 'jpeg', 'gif', 'pdf']), general.models.file_size])),
                ('title', models.CharField(blank=True, default=None, max_length=250, null=True)),
                ('alt', models.CharField(blank=True, default=None, max_length=250, null=True)),
                ('main', models.BooleanField(default=False)),
                ('resized', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('product', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='product_image', to='ecommerce.product')),
            ],
            options={
                'db_table': 'media_gallery',
                'ordering': ['-created_at'],
            },
        ),
    ]