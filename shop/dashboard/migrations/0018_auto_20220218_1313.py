# Generated by Django 3.2 on 2022-02-18 12:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0017_auto_20220218_1312'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dataprotection',
            name='cookies_web',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='dataprotection',
            name='legal_advice',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='dataprotection',
            name='privacy_policy',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='dataprotection',
            name='terms_and_conditions',
            field=models.TextField(blank=True, null=True),
        ),
    ]
