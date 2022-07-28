# Generated by Django 3.2 on 2022-04-26 18:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='WebCommon',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('welcome_text', models.CharField(blank=True, max_length=100, null=True)),
                ('web_title', models.CharField(blank=True, max_length=250, null=True)),
                ('about_us_text', models.TextField(blank=True, null=True)),
            ],
            options={
                'db_table': 'dashboard_web_common',
            },
        ),
    ]