# Generated by Django 3.2 on 2022-04-27 15:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0006_engravingtechnique_block_import'),
    ]

    operations = [
        migrations.AlterField(
            model_name='engravingtechnique',
            name='min_amount',
            field=models.IntegerField(default=0, null=True),
        ),
    ]
