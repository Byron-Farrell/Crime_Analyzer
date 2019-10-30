from django.db import models


# class CrimeReportingCodes(models.Model):
#     IUCR = models.CharField(max_length=50, primary_key=True)
#     primaryDescription = models.CharField(max_length=50)
#     secondaryDescription = models.CharField(max_length=150)


class Crimes(models.Model):
    date = models.DateField()
    block = models.CharField(max_length=100)
    locationDescription = models.CharField(max_length=50, default='Unknown')
    arrest = models.BooleanField()
    domestic = models.BooleanField()
    beat = models.CharField(max_length=50, default='Unknown')
    descOne = models.CharField(max_length=100, default='Unknown')
    descTwo = models.CharField(max_length=100, default='Unknown')
    communityArea = models.IntegerField(default=0)
    longitude = models.DecimalField(max_digits=15, decimal_places=9, default=0)
    latitude = models.DecimalField(max_digits=15, decimal_places=9, default=0)
