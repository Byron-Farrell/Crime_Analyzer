import os
import pandas as pd
from django.contrib.gis.utils import LayerMapping
from apps.data_visualization import models
from .Validator import CrimeValidator
import requests

census_blocks_shp = os.path.abspath(
    os.path.join(os.path.dirname(__file__), '../data', 'census_blocks/cb_2018_17_bg_500k.shp'),
)

community_areas_shp = os.path.abspath(
    os.path.join(os.path.dirname(__file__), '../data', 'community_areas/geo_export_e32b8cf0-5322-42b8-a0ce-d7a0ab9b00dc.shp'),
)

weather_types_csv = os.path.abspath(
    os.path.join(os.path.dirname(__file__), '../data', 'weather_types.csv'),
)

iucr_codes_csv = os.path.abspath(
    os.path.join(os.path.dirname(__file__), '../data', 'IUCR_codes.csv'),
)

# chicago_crimes_csv = os.path.abspath(
#     os.path.join(os.path.dirname(__file__), '../data', 'Chicago_Crimes.csv'),
# )


def run_chicago_census_blocks(verbose=True):
    lm = LayerMapping(models.ChicagoCensusBlocks, census_blocks_shp, models.chicago_census_blocks_mapping, transform=False)
    lm.save(strict=True, verbose=verbose)


def run_community_areas(verbose=True):
    lm = LayerMapping(models.CommunityArea, community_areas_shp, models.community_area_mapping, transform=False)
    lm.save(strict=True, verbose=verbose)


def run_iucr_codes():
    df = pd.read_csv(iucr_codes_csv)

    # Looping through dataframe of crimes reporting codes
    for index, row in df.iterrows():
        crimeReportingCode = models.CrimeReportingCodes(
            IUCR = row['IUCR'],
            primaryDescription = row['PRIMARY DESCRIPTION'],
            secondaryDescription = row['SECONDARY DESCRIPTION']
        )

        crimeReportingCode.save()


def run_weather_types():
    df = pd.read_csv(weather_types_csv)

    # Looping through dataframe of weather types
    for index, row in df.iterrows():
        weatherType = models.WeatherTypes(
            weatherCode = row['WeatherCode'],
            weatherType = row['Condition'],
            dayIcon = row['DayIcon'],
            nightIcon = row['NightIcon']
        )

        weatherType.save()


def run_moon_cycles():
    moon_phases = [
        'New Moon',
        'Waxing Crescent',
        'First Quarter',
        'Waxing Gibbous',
        'Full Moon',
        'Waning Gibbous',
        'Last Quarter',
        'Waning Crescent'
    ]

    for moon in moon_phases:
        moon_phase = models.MoonCycles(
            moonPhase = moon
        )

        moon_phase.save()


# def run_chicago_crimes():
#     chunks = pd.read_csv(chicago_crimes_csv, chunksize=60000)
#     crime_validator = CrimeValidator()
#
#     for df in chunks:
#         for index, row in df.iterrows():
#             crime = crime_validator.validate_crime(row)
#             if crime is not False:
#                 crime.save()
#             crime_validator.log()
#             crime_validator.clear_error_messeges()


def run_historical_weather():
    starting_date = '2008-07-01'
    


def setup():
    run_chicago_census_blocks()
    run_community_areas()
    run_iucr_codes()
    run_moon_cycles()
    run_weather_types()

    #run_chicago_crimes()
