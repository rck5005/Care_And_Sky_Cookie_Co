# Generated by Django 5.1 on 2024-08-13 23:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CookieCutter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('shape', models.CharField(max_length=255)),
                ('material', models.CharField(max_length=255)),
                ('size', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('image', models.URLField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
