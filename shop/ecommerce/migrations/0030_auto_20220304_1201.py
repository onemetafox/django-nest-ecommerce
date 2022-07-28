# Generated by Django 3.2 on 2022-03-04 11:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0029_auto_20220302_2151'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='box_dimension',
            field=models.CharField(default='', max_length=75, null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='box_units',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=6, null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='box_weight',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=6, null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='pallet_box',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=6, null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='pallet_weight',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=6, null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='repeated_position',
            field=models.IntegerField(default=0, null=True),
        ),
    ]
