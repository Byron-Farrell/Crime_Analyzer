from django.contrib.gis.db import models

# This is an auto-generated Django model module created by ogrinspect.
class ChicagoCensusBlocks(models.Model):
    # Boundary information
    statefp = models.CharField(max_length=2)
    countyfp = models.CharField(max_length=3)
    tractce = models.CharField(max_length=6)
    blkgrpce = models.CharField(max_length=1)
    affgeoid = models.CharField(max_length=21)
    geoid = models.CharField(max_length=12)
    name = models.CharField(max_length=100)
    lsad = models.CharField(max_length=2)
    aland = models.BigIntegerField()
    awater = models.BigIntegerField()
    geom = models.MultiPolygonField(srid=4326)

    # Census information
    # deprevationIndex = models.IntegerField()
    # population = models.IntegerField()


# Auto-generated `LayerMapping` dictionary for CensusBlocks model
chicago_census_blocks_mapping = {
    'statefp': 'STATEFP',
    'countyfp': 'COUNTYFP',
    'tractce': 'TRACTCE',
    'blkgrpce': 'BLKGRPCE',
    'affgeoid': 'AFFGEOID',
    'geoid': 'GEOID',
    'name': 'NAME',
    'lsad': 'LSAD',
    'aland': 'ALAND',
    'awater': 'AWATER',
    'geom': 'MULTIPOLYGON',
}


# This is an auto-generated Django model module created by ogrinspect.
class CommunityArea(models.Model):
    area = models.FloatField()
    area_num_1 = models.CharField(max_length=254)
    area_numbe = models.CharField(max_length=254)
    comarea = models.FloatField()
    comarea_id = models.FloatField()
    community = models.CharField(max_length=254)
    perimeter = models.FloatField()
    shape_area = models.FloatField()
    shape_len = models.FloatField()
    geom = models.MultiPolygonField()


# Auto-generated `LayerMapping` dictionary for CommunityArea model
community_area_mapping = {
    'area': 'area',
    'area_num_1': 'area_num_1',
    'area_numbe': 'area_numbe',
    'comarea': 'comarea',
    'comarea_id': 'comarea_id',
    'community': 'community',
    'perimeter': 'perimeter',
    'shape_area': 'shape_area',
    'shape_len': 'shape_len',
    'geom': 'MULTIPOLYGON',
}


class CrimeReportingCodes(models.Model):
    IUCR = models.CharField(max_length=10, primary_key=True)
    primaryDescription = models.CharField(max_length=50)
    secondaryDescription = models.CharField(max_length=150)


class WeatherTypes(models.Model):
    weatherCode = models.IntegerField(primary_key=True)
    weatherType = models.CharField(max_length=50)
    dayIcon = models.CharField(max_length=50)
    nightIcon = models.CharField(max_length=50)


class MoonCycles(models.Model):
    moonPhase = models.CharField(max_length=30)


class Weather(models.Model):
    weatherDegrees = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    time = models.IntegerField()
    precipitation = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    cloudCover = models.IntegerField()
    dark = models.BooleanField()
    weatherType = models.ForeignKey(WeatherTypes, on_delete=models.CASCADE)
    moonPhase = models.ForeignKey(MoonCycles, on_delete=models.CASCADE)


class ChicagoCrimes(models.Model):
    communityArea = models.ForeignKey(CommunityArea, on_delete=models.CASCADE)
    # weatherDetails = models.ForeignKey(WeatherTypes, on_delete=models.CASCADE)
    crime = models.ForeignKey(CrimeReportingCodes, on_delete=models.CASCADE)
    censusDetails = models.ForeignKey(ChicagoCensusBlocks, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    arrest = models.BooleanField()
    domestic = models.BooleanField()
    longitude = models.DecimalField(max_digits=15, decimal_places=9, default=0)
    latitude = models.DecimalField(max_digits=15, decimal_places=9, default=0)


class Logs(models.Model):
    date = models.DateField()
    message = models.CharField(max_length=150)
