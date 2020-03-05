# Generated by Django 2.2.6 on 2020-03-05 13:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('data_visualization', '0002_remove_censusdata_population'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='crime',
            name='id',
        ),
        migrations.AddField(
            model_name='crime',
            name='uniqueID',
            field=models.CharField(default=None, max_length=150, primary_key=True, serialize=False),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='crime',
            name='city',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='data_visualization.City'),
        ),
    ]
