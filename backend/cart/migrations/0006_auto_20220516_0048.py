# Generated by Django 3.2 on 2022-05-16 00:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0008_auto_20220510_1701'),
        ('cart', '0005_auto_20220513_1946'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='cookies',
            new_name='cookie',
        ),
        migrations.AlterField(
            model_name='orderitem',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ecommerce.productvariant'),
        ),
    ]
