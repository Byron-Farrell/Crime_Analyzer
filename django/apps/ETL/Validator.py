import os
import datetime
from apps.data_visualization import models
from . import mappings
import math
from django.contrib.gis.geos import Point
from apps.ETL import load

class Validator:

    def __init__(self, date_format=None, column_mappings=None, crime_type_mappings=None, city_name=None, arrest_mapping=None):
        # All validation error messages
        self.error_messages = []
        self.column_mappings = column_mappings
        self.crime_type_mappings = crime_type_mappings
        self.city_name = city_name
        self.arrest_mapping = arrest_mapping
        self.date_format = date_format

    # Validate all data for the Crime model before inserting it
    def validate_crime(self, row):
        #Error checking
        if self.column_mappings is None or self.crime_type_mappings is None or self.city_name is None or self.arrest_mapping is None:
            print('Required variables undefined')
            return False

        # Get column mapping names
        description_column_name = self.column_mappings['Crime Description']
        arrest_column_name = self.column_mappings['Arrest']
        longitude_column_name = self.column_mappings['Longitude']
        latitude_column_name = self.column_mappings['Latitude']
        crime_type_column_name = self.column_mappings['Crime Type']
        date_column_name = self.column_mappings['Date']
        unique_id_column_name = self.column_mappings['Unique ID']

        # Getting values from row
        description = row[description_column_name]
        arrest = row[arrest_column_name]
        longitude = row[longitude_column_name]
        latitude = row[latitude_column_name]
        IUCR = row[crime_type_column_name] # Criminal code used to identify different crime types
        date_time_string = row[date_column_name]
        uniqueID = row[unique_id_column_name]
        date_time_obj = datetime.datetime.strptime(date_time_string, self.date_format)

        if self.validate_coords(longitude, latitude) is False:
            return False

        point = Point(longitude, latitude)

        city_name = self.city_name;
        city = self.get_city(self.city_name)

        type = self.validate_crime_type(IUCR)
        census_block = self.validate_census_block(point)
        date = self.get_date(date_time_obj)
        time = self.get_time(date_time_obj.hour + 1, date_time_obj.minute)

        weather = self.get_weather(
            date_time_obj.day,
            date_time_obj.month,
            date_time_obj.year,
            date_time_obj.hour + 1,
        )

        crime_type = self.get_crime_type(type)

        if city is False:
            city = self.insert_city(self.city_name)
            if city is False:
                return False

        if crime_type is False:
            return False

        if census_block is False:
            return False

        if date is False:
            return False

        if weather is False:
            return False

        if crime_type is False:
            return False

        if self.validate_unique_idenitfier(uniqueID) is False:
            return False

        try:
            # Validate weather data
            crime = models.Crime(
                uniqueID=uniqueID,
                city = city,
                weatherDetails = weather,
                crime = crime_type,
                censusBlock = census_block,
                date = date,
                time = time,
                crimeDescription = description,
                arrest = self.arrest_mapping[arrest],
                longitude = longitude,
                latitude = latitude
            )

        except Exception as e:
            self.error_messages.append(str(e))
            return False

        return crime


    def get_time(self, hour, minute):
        try:
            time = models.Time.objects.filter(hour=hour,minute=minute)
        except Exception as e:
            self.error_messages.append(str(e) + '\n')
            return False

        if len(time) == 0:
            self.error_messages.append('Couldn\'t find object for hour: {}, minute: {}'.format(hour, minute))
            return False
        else:
            return time[0]


    def get_crime_type(self, crime_type):
        try:
            crime = models.CrimeType.objects.filter(type=crime_type)
        except Exception as e:
            self.error_messages.append('failed to validate IUCR code {}\nException Error Message\n{}\n'.format(crime_type, str(e)))
            return False

        if len(crime) == 0:
            self.error_messages.append('Couldn\'t find record in CrimeType table for crime type: {}'.format(crime_type))
            return False
        else:
            return crime[0]


    def get_weather(self, day, month, year, time):
        weather_qs = models.Weather.objects.filter(date__year=year,date__month=month,date__day=day,time=time)

        if len(weather_qs) == 1:
            return weather_qs[0]
        else:
            try:
                date_string = year + "-" + month + "-" + day
                format = '%Y-%m-%d'
                load.load_historical_weather(date_string, format)
                return True
            except:
                error_message = 'Error: Failed to weather object for crime. Query for {}/{}/{} and hour: "{}" return {} results, expecting only 1 return result.\n'.format(day, month, year, time, len(weather_qs))
                self.error_messages.append(error_message)
                return False

    def get_city(self, name):
        try:
            city = models.City.objects.get(name=name)
        except Exception as e:
            #self.error_messages.append(str(e) + '\n')
            return False

        return city

    def insert_city(self, name):
        try:
            new_city = models.City(name=name)
            new_city.save()
        except Exception as e:
            self.error_messages.append(str(e) + '\n')
            return False

        return self.get_city(name)

    def get_date(self, date_obj):
        year = date_obj.year
        month = date_obj.month
        day = date_obj.day
        try:
            date = models.Date.objects.get(year=year, month=month, day=day)
        except Exception as e:
            self.error_messages.append(str(e) + '\n')
            return False

        return date


    def validate_unique_idenitfier(self, uniqueID):
        try:
            crime = models.Crime.objects.filter(uniqueID=uniqueID)
        except Exception as e:
            self.error_messages.append('Failed to validate crime uniqueID {}.\nException Error Message\n{}\n'.format(uniqueID, str(e)))
            return False

        if len(crime) > 0:
            self.error_messages.append('This criminal record with the uniqueID {} as already been uploaded'.format(uniqueID))
            return False
        else:
            True


    def validate_crime_type(self, crime_type):
        error_message = 'Error: crime type "{}" does not exist!\n'.format(crime_type)

        try:
            crime_type = self.crime_type_mappings[crime_type]
        except Exception as e:
            self.error_messages.append('failed to validate crime type with crime_type {}.\nException Error Message\n{}\n'.format(crime_type, str(e)))
            return False
        return crime_type


    def validate_census_block(self, point):
        error_message = 'Error: {} is not within a community area!\n'

        try:
            census_block = models.CensusBlock.objects.filter(geom__contains=point)
        except Exception as e:
            self.error_messages.append('Failed to map crime location ({}) to census block.\nException Error Message\n{}\n'.format(point, str(e)))
            return False
        try:
            census_block = census_block[0]
        except Exception as e:
            self.error_messages.append(str(e))
            return False
        return census_block


    def validate_coords(self, longitude, latitude):
        try:
            if math.isnan(float(longitude)) or math.isnan(float(latitude)):
                error_message = 'Error: Longitude({}) and Latitude({}) are not valid!\n'.format(longitude, latitude)
                self.error_messages.append(error_message)
                return False
        except Exception as e:
            self.error_messages.append('Failed to validate coords ({}, {}).\nException Error Message\n{}\n'.format(longitude, latitude, str(e)))
            return False
        return True


    def clear_error_messeges(self):
        self.error_messages = []


    def log(self, index, file_name):
        current_date = datetime.datetime.now()
        for error_message in self.error_messages:
            log = models.Log(
                timestamp = current_date,
                type = 'Error',
                message = error_message,
                row = index,
                fileName = file_name
            )

            log.save()




    # def validate_date(self, date_time_string):
    #     try:
    #         date_time_obj = datetime.datetime.strptime(date_time_string, '%m/%d/%Y %I:%M:%S %p')
    #         date = date_time_obj.date()
    #         time = date_time_obj.time()
    #     except Exception as e:
    #         # error_message = 'Error: Failed to create Date object from date string: "{}".\n'.format(date_time_string)
    #         self.error_messages.append(str(e) + '\n')
    #         return False
    #
    #
    #     count = models.Date.objects.filter(fullDate=str(date)).count()
    #
    #     if count is 0:
    #         new_date_dimension = models.Date(
    #             fullDate = str(date),
    #             day = date.day,
    #             month = date.month,
    #             year = date.year,
    #             week = date.isocalendar()[1],
    #             dayOfWeek = date.weekday(),
    #             dayOfYear = timetuple().tm_yday,
    #             quarter = pd.Timestamp(date).quarter,
    #             hour = date.hour,
    #             minute = date.minute
    #         )
    #         return new_date_dimension
    #     else:
    #         return False
