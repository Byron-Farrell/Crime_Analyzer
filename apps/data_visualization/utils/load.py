import os
import pandas as pd
from django.contrib.gis.utils import LayerMapping
from apps.data_visualization import models
from .Validator import Validator
from . import mappings
import requests
import datetime



chicago_crimes_csv = os.path.abspath(
    os.path.join(os.path.dirname(__file__), '../data', 'Chicago_Crimes.csv'),
)

census_blocks_shp = os.path.abspath(
    os.path.join(os.path.dirname(__file__), '../data', 'census_blocks/cb_2018_17_bg_500k.shp'),
)

community_areas_shp = os.path.abspath(
    os.path.join(os.path.dirname(__file__), '../data', 'community_areas/geo_export_e32b8cf0-5322-42b8-a0ce-d7a0ab9b00dc.shp'),
)

weather_types_csv = os.path.abspath(
    os.path.join(os.path.dirname(__file__), '../data', 'weather_types.csv'),
)

crime_types_csv = os.path.abspath(
    os.path.join(os.path.dirname(__file__), '../data', 'crime_types.csv'),
)

iucr_codes_csv = os.path.abspath(
    os.path.join(os.path.dirname(__file__), '../data', 'IUCR_codes.csv'),
)

deprevation_index_csv = os.path.abspath(
    os.path.join(os.path.dirname(__file__), '../data', 'IL_blockgroup_15.csv'),
)

def run_chicago_census_blocks(verbose=True):
    lm = LayerMapping(models.CensusBlock, census_blocks_shp, mappings.chicago_census_blocks_mapping, transform=False)
    lm.save(strict=True, verbose=verbose)


def run_community_areas(verbose=True):
    lm = LayerMapping(models.District, community_areas_shp, mappings.community_area_mapping, transform=False)
    lm.save(strict=True, verbose=verbose)


def run_crime_types():
    df = pd.read_csv(crime_types_csv)

    # Looping through dataframe of crimes reporting codes
    for index, row in df.iterrows():
        CrimeType = models.CrimeType(
            type = row['Crime Type'],
        )

        CrimeType.save()


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


def run_chicago_crimes():
    chunks = pd.read_csv(chicago_crimes_csv, chunksize=60000)

    crime_validator = Validator()
    count_2 = 1
    for df in chunks:
        if count_2 > 95:
            for index, row in df.iterrows():

                crime = crime_validator.validate_chicago_crime(row)
                print('before if')
                crime_validator.log()
                crime_validator.clear_error_messeges()
                if crime is not False:
                    print('before save')
                    crime.save()
                    print('after save')
                crime_validator.log()
                crime_validator.clear_error_messeges()
        count_2 += 1

def run_historical_weather():
    starting_date = datetime.datetime.strptime('2014-03-19', '%Y-%m-%d')
    end_date = datetime.datetime.strptime('2019-12-01', '%Y-%m-%d')

    date = starting_date

    params = {
        'access_key': '8241d42f4b6b6ba5ffdd42f0d2d52c96',
        'query': 'Chicago',
        'historical_date':  starting_date.strftime('%Y-%m-%d'),
        'interval': 1,
        'units': 'm',
        'hourly': 1
    }

    sentinal = 0

    while  date.strftime('%Y-%m-%d') != end_date.strftime('%Y-%m-%d'):

        if sentinal > 5000:
            break

        sentinal += 1

        api_result = requests.get('https://api.weatherstack.com/historical', params)
        api_response = api_result.json()

        date_string =  date.strftime('%Y-%m-%d')
        sunset_time =  api_response['historical'][date_string]['astro']['sunset']
        sunrise_time =  api_response['historical'][date_string]['astro']['sunrise']

        sunset_time = datetime.datetime.strptime(sunset_time, '%I:%M %p')
        sunrise_time = datetime.datetime.strptime(sunrise_time, '%I:%M %p')

        current_moon_cycle = api_response['historical'][date_string]['astro']['moon_phase']

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
            print('after save')
        date += datetime.timedelta(days=1)
        params['historical_date'] =  date.strftime('%Y-%m-%d')


def run_dates():
    starting_date = datetime.datetime.strptime('2008-07-01', '%Y-%m-%d')
    end_date = datetime.datetime.strptime('2019-12-01', '%Y-%m-%d')
    date = starting_date

    while  date.strftime('%Y-%m-%d') != end_date.strftime('%Y-%m-%d'):


        date2 = end_date.strftime('%Y-%m-%d')
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


def run_times():

    for hour in range(24):
        for minute in range(60):
            time = models.Time(
                hour = hour + 1,
                minute = minute
            )

            time.save()


def setup():
    run_chicago_census_blocks()
    run_community_areas()
    run_crime_types()
    run_moon_cycles()
    run_weather_types()
    run_dates()
    run_historical_weather()
    # run_chicago_crimes()





def crime_load():
    import pandas as pd
    import datetime

    chunks = pd.read_csv('/home/byron/dev/Project-White-Wolf/apps/data_visualization/data/Chicago_Crimes.csv', chunksize=60000)
    my_crimes = []
    count = 0

    for chunk in chunks:
        if count == 700:
            break;
        for index, row in chunk.iterrows():
            if count == 700:
                break;
            count += 1
            date_obj =  datetime.datetime.strptime(row['Date'], '%m/%d/%Y %I:%M:%S %p')
            if date_obj.year == 2008 and date_obj.month == 7:
                my_crimes.append(row)
