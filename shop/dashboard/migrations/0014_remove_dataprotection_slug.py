# Generated by Django 3.2 on 2022-02-18 11:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0013_auto_20220218_1251'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dataprotection',
            name='slug',
        ),
    ]
