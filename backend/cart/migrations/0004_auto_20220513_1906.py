# Generated by Django 3.2 on 2022-05-13 19:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0008_auto_20220510_1701'),
        ('cart', '0003_orderitem_ordered'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='cookies',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='email',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='orderitem',
            name='cusomized',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='orderitem',
            name='description',
            field=models.CharField(blank=True, default=None, max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='orderitem',
            name='engraved_area',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='ecommerce.engravingarea'),
        ),
        migrations.AddField(
            model_name='orderitem',
            name='engraved_color',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='ecommerce.engravingtechniquecolor'),
        ),
        migrations.AddField(
            model_name='orderitem',
            name='engraved_technique',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='ecommerce.engravingtechnique'),
        ),
        migrations.AddField(
            model_name='orderitem',
            name='image_url',
            field=models.CharField(blank=True, default=None, max_length=250, null=True),
        ),
    ]
