# Generated by Django 5.1.4 on 2024-12-11 00:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0002_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='event',
            old_name='date',
            new_name='end_date',
        ),
    ]
