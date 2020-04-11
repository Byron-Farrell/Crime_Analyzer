import os
import pandas as pd
from django.contrib.gis.utils import LayerMapping
from apps.data_visualization import models
from . import Validator
from . import mappings
import requests
import datetime

# Gets absolute file path for weather type dataset
weather_types_csv = os.path.abspath(
    os.path.join(os.path.dirname(__file__), 'data', 'weather_types.csv'),
)


# Gets absolute file path for crime types dataset
crime_types_csv = os.path.abspath(
    os.path.join(os.path.dirname(__file__), 'data', 'crime_types.csv'),
)

def run_census_blocks(shp_file, mappings):
    lm = LayerMapping(models.CensusBlock, shp_file, mappings, transform=False)
    lm.save(strict=True, verbose=True)

# Loads data from the census_block_shp into CensusBlock model using using the
# chicago_census_blocks_mapping from mappings.py
def run_chicago_census_blocks(verbose=True):
    lm = LayerMapping(models.CensusBlock, census_blocks_shp, mappings.chicago_census_blocks_mapping, transform=False)
    lm.save(strict=True, verbose=verbose)


# Loads data from the community_areas_shp into District model using using the
# community_area_mapping from mappings.py
def run_community_areas(verbose=True):
    lm = LayerMapping(models.District, community_areas_shp, mappings.community_area_mapping, transform=False)
    lm.save(strict=True, verbose=verbose)


# load crime types from crime_types_csv into database
def run_crime_types():
    df = pd.read_csv(crime_types_csv)

    # Looping through dataframe of crimes reporting codes
    for index, row in df.iterrows():
        CrimeType = models.CrimeType(
            type = row['Crime Type'],
        )

        CrimeType.save()


# Load weather types from weather_types_csv into database
def run_weather_types():
    df = pd.read_csv(weather_types_csv)

    # Looping through dataframe of weather types
    for index, row in df.iterrows():
        weatherType = models.WeatherType(
            weatherCode = row['WeatherCode'],
            weatherType = row['Condition'],
            dayIcon = row['DayIcon'],
            nightIcon = row['NightIcon']
        )

        weatherType.save()


# Load moon cycle types into database
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
        moon_phase = models.MoonCycle(
            moonPhase = moon
        )

        moon_phase.save()


# loads chicago crime dataset into database using chicago_crimes_csv
def run_chicago_crimes():
    # Datasets for crime can be quite large
    # therefor the data is split up into chunks of 60,000 rows
    chunks = pd.read_csv(chicago_crimes_csv, chunksize=60000)

    crime_validator = Validator()
    for df in chunks:
        for index, row in df.iterrows():
            print('{:.4}%'.format((index / 7000000) * 100))
            # Validate crime
            crime = crime_validator.validate_chicago_crime(row)
            # store logs in the database
            crime_validator.log(index, chicago_crimes_csv)
            crime_validator.clear_error_messeges()
            if crime is not False:
                crime.save()


# Get all historical weather data and load it into the database.
# The weatherstack API will be used to retrieve the data
def load_historical_weather(date_string, format):
    date = datetime.datetime.strptime(date_string, format)
    
    # Headers for get request
    params = {
        'access_key': '8241d42f4b6b6ba5ffdd42f0d2d52c96',
        'query': 'Chicago',
        'historical_date':  date.strftime(format),
        'interval': 1,
        'units': 'm',
        'hourly': 1
    }

    # Sending get request for data to weatherstack API
    api_result = requests.get('https://api.weatherstack.com/historical', params)
    api_response = api_result.json()

    # Retrieving data from json response
    date_string =  date.strftime('%Y-%m-%d')
    sunset_time =  api_response['historical'][date_string]['astro']['sunset']
    sunrise_time =  api_response['historical'][date_string]['astro']['sunrise']

    sunset_time = datetime.datetime.strptime(sunset_time, '%I:%M %p')
    sunrise_time = datetime.datetime.strptime(sunrise_time, '%I:%M %p')

    current_moon_cycle = api_response['historical'][date_string]['astro']['moon_phase']

    # A json object is returned for the weather details for every hour of the
    # current historicl date. This for loop, loops through each hour and gets
    # the weather for that hour
    for weather in api_response['historical'][date_string]['hourly']:
        weatherDegrees = float(weather['temperature'])
        time = int(weather['time'])
        precipitation = float(weather['precip'])
        cloudCover = int(weather['cloudcover'])

        if (time != 0):
            time = time / 100

        if time > sunrise_time.hour and time < sunset_time.hour:
            dark = False
        else:
            dark = True

        # Unique code used to identify the weather type
        weather_code = int(weather['weather_code'])

        weather_type = models.WeatherType.objects.get(weatherCode=weather_code)
        moon_phase = models.MoonCycle.objects.get(moonPhase=current_moon_cycle)

        # Saving historical weather data to database
        new_weather = models.Weather(
            weatherDegrees = weatherDegrees,
            date = date,
            time = time + 1,
            precipitation = precipitation,
            cloudCover = cloudCover,
            dark = dark,
            weatherType = weather_type,
            moonPhase = moon_phase
        )

        new_weather.save()

    # incrementing date by 1 day and updating the params object with the
    # new date to be queried
    date += datetime.timedelta(days=1)
    params['historical_date'] =  date.strftime('%Y-%m-%d')


# Creates and loads all data for the the date dimension in the database
def run_dates():
    starting_date = datetime.datetime.strptime('2008-07-01', '%Y-%m-%d')
    end_date = datetime.datetime.strptime('2019-12-01', '%Y-%m-%d')

    date = starting_date

    while  date.strftime('%Y-%m-%d') != end_date.strftime('%Y-%m-%d'):


        new_date = models.Date(
            fullDate = date,
            day = date.day,
            month = date.month,
            year = date.year,
            week = date.isocalendar()[1],
            dayOfWeek = date.weekday(),
            dayOfYear =  date.timetuple().tm_yday,
            quarter = pd.Timestamp(date).quarter,
        )

        new_date.save()

        date += datetime.timedelta(days=1)


# Creates and loads all possible combinations of hour:minute into the database
def run_times():

    for hour in range(24):
        for minute in range(60):
            time = models.Time(
                hour = hour + 1,
                minute = minute
            )

            time.save()


# Loads all base data need for the application
def setup():
    run_crime_types()
    run_moon_cycles()
    run_weather_types()
    run_dates()
