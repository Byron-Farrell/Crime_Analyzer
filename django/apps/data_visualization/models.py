from django.contrib.gis.db import models

class CensusBlock(models.Model):
    # Boundary information
    ID = models.CharField(max_length=30, primary_key=True)
    geom = models.MultiPolygonField(srid=4326)


class CensusData(models.Model):
    censusBlockId = models.ForeignKey(CensusBlock, on_delete=models.CASCADE)
    # Census information
    deprevationIndex = models.IntegerField()
    #population = models.IntegerField()

class CrimeType(models.Model):
    type = models.CharField(max_length=50, primary_key=True)


class WeatherType(models.Model):
    weatherCode = models.IntegerField(primary_key=True)
    weatherType = models.CharField(max_length=50)
    dayIcon = models.CharField(max_length=50)
    nightIcon = models.CharField(max_length=50)


class MoonCycle(models.Model):
    moonPhase = models.CharField(max_length=30)


class Weather(models.Model):
    weatherDegrees = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    date = models.DateField()
    time = models.IntegerField()
    precipitation = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    cloudCover = models.IntegerField()
    dark = models.BooleanField()
    weatherType = models.ForeignKey(WeatherType, on_delete=models.CASCADE)
    moonPhase = models.ForeignKey(MoonCycle, on_delete=models.CASCADE)


class Date(models.Model):
    fullDate = models.DateField()
    day = models.IntegerField()
    month = models.IntegerField()
    year = models.IntegerField()
    week = models.IntegerField()
    dayOfWeek = models.IntegerField()
    dayOfYear = models.IntegerField()
    quarter = models.IntegerField()


class Time(models.Model):
    hour = models.IntegerField()
    minute = models.IntegerField()


class City(models.Model):
    name = models.CharField(max_length=150)


class Crime(models.Model):
    uniqueID = models.CharField(max_length=150, primary_key=True)
    weatherDetails = models.ForeignKey(Weather, on_delete=models.CASCADE)
    crime = models.ForeignKey(CrimeType, on_delete=models.CASCADE)
    censusBlock = models.ForeignKey(CensusBlock, on_delete=models.CASCADE)
    date = models.ForeignKey(Date, on_delete=models.CASCADE)
    time = models.ForeignKey(Time, on_delete=models.CASCADE)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    crimeDescription = models.CharField(max_length=150, default='Undefined')
    arrest = models.BooleanField()
    longitude = models.DecimalField(max_digits=15, decimal_places=9, default=0)
    latitude = models.DecimalField(max_digits=15, decimal_places=9, default=0)


class Log(models.Model):
    timestamp = models.DateTimeField()
    type = models.CharField(max_length=30)
    message = models.CharField(max_length=150)
    row = models.IntegerField()
    fileName = models.CharField(max_length=150)
