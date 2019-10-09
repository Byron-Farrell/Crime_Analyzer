from django.db import models

# Create your models here.
class Crimes(models.Model):
    longitude = models.DecimalField(max_digits=15, decimal_places=9)
    latitude = models.DecimalField(max_digits=15, decimal_places=9)
    description = models.CharField(max_length=100)
