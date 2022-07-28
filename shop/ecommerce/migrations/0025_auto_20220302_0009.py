# Generated by Django 3.2 on 2022-03-01 23:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0024_auto_20220301_1012'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='producttopseller',
            options={'ordering': ['-sales', '-updated_at']},
        ),
        migrations.RenameField(
            model_name='product',
            old_name='box_gross_weight',
            new_name='box_weight',
        ),
        migrations.RemoveField(
            model_name='product',
            name='box_net_weight',
        ),
        migrations.AlterField(
            model_name='product',
            name='box_dimension',
            field=models.CharField(default='', max_length=75),
        ),
    ]