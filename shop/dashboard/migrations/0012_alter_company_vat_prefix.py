# Generated by Django 3.2 on 2022-02-17 23:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0011_company_vat_french'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='vat_prefix',
            field=models.CharField(max_length=30, null=True),
        ),
    ]