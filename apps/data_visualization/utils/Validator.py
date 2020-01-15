import os
import datetime
from apps.data_visualization import models
from apps.data_visualization.utils import mappings
import math
from django.contrib.gis.geos import Point

class Validator:

    def __init__(self):
        # All validation error messages
        self.error_messages = []

    # Validate all data for the Crime model before inserting it
    def validate_chicago_crime(self, row):
        longitude = row['Longitude']
        latitude = row['Latitude']
        print(1)
        # Criminal code used to identify different crime types
        IUCR = row['IUCR']
        # Chicago Boundries
        community_area_code = row['Community Area']
        date_time_string = row['Date']
        date_time_obj = datetime.datetime.strptime(date_time_string, '%m/%d/%Y %I:%M:%S %p')

        if self.validate_coords(longitude, latitude) is False:
            return False

        point = Point(longitude, latitude)

        print(2)
        community_area = self.validate_community_area(community_area_code)
        type = self.validate_crime_type(IUCR)
        print(3)
        census_block = self.validate_census_block(point)
        print(4)
        date = self.get_date(date_time_obj)
        print(5)
        time = self.get_time(date_time_obj.hour, date_time_obj.minute)
        print(6)
        weather = self.get_weather(
            date_time_obj.day,
            date_time_obj.month,
            date_time_obj.year,
            date_time_obj.hour,
        )
        print(7)
        print(type)
        crime_type = self.get_crime_type(type)
        print(8)
        if crime_type is False:
            return False
        print(9)
        if community_area is False:
            return False
        print(10)
        if census_block is False:
            return False
        print(11)
        if date is False:
            return False
        print(12)
        if weather is False:
            return False
        print(13)
        if crime_type is False:
            return False
        print(14)

        try:

            # Validate weather data
            crime = models.Crime(
                city = 'Chicago',
                district = community_area,
                weatherDetails = weather,
                crime = crime_type,
                censusBlock = census_block,
                date = date,
                time = time,
                crimeDescription = row['Description'],
                arrest = row['Arrest'],
                longitude = row['Longitude'],
                latitude = row['Latitude']
            )

            print(15)
        except Exception as e:
            self.error_messages.append(str(e))
            print(str(e))
            return False

        print(16)

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
            print(time[0].id)
            return time[0]


    def get_crime_type(self, crime_type):
        try:
            crime = models.CrimeType.objects.filter(type=crime_type)
        except Exception as e:
            self.error_messages.append(str(e) + '\n')
            print(str(e))
            return False

        if len(crime) == 0:
            print(crime_type)
            print(len(crime))
            self.error_messages.append('Couldn\'t find object for crime type: {}'.format(crime_type))
            return False
        else:
            return crime[0]

    def get_weather(self, day, month, year, time):
        weather_qs = models.Weather.objects.filter(date__year=year,date__month=month,date__day=day,time=time)

        if len(weather_qs) == 1:
            return weather_qs[0]
        else:
            error_message = 'Error: Failed to weather object for crime. Query for {}/{}/{} and hour: "{}" return {} results, expecting only 1 return result.\n'.format(day, month, year, time, len(weather_qs))
            self.error_messages.append(error_message)
            return False

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


    def get_date(self, date_obj):
        year = date_obj.year
        month = date_obj.month
        day = date_obj.day
        print('year: {}'.format(year))
        print('month: {}'.format(month))
        print('day: {}'.format(day))
        try:
            date = models.Date.objects.get(year=year, month=month, day=day)
        except Exception as e:
            self.error_messages.append(str(e) + '\n')
            print(str(e) + '-------------------------------')
            return False

        print(date)
        return date

    def validate_community_area(self, community_area_code):
        error_message = 'Error: community area "{}" does not exist!\n'.format(community_area_code)
        try:
            community_area_code = int(community_area_code)
            community_area = models.District.objects.get(ID=community_area_code)
        except Exception as e:
            print(str(e))
            self.error_messages.append(str(e) + '\tcommunity area code = {}\n'.format(community_area_code))
            return False
        return community_area


    def validate_crime_type(self, IUCR):
        error_message = 'Error: crime type with IUCR code "{}" does not exist!\n'.format(IUCR)

        try:
            crime_type = mappings.IUCR_crime_type_mapping[IUCR]
        except Exception as e:
            self.error_messages.append(str(e) + '\tIUCR code = {}\n'.format(IUCR))
            return False
        return crime_type


    def validate_census_block(self, point):
        error_message = 'Error: {} is not within a community area!\n'

        try:
            print('t1')
            census_block = models.CensusBlock.objects.filter(geom__contains=point)
            print('t2')
        except Exception as e:

            self.error_messages.append(str(e) + '\tpoint not in chicago area, point = {}\n'.format(point))
            return False
        print('t3')
        try:
            print('t4')
            census_block = census_block[0]
            print('t5')
        except Exception as e:

            self.error_messages.append(str(e))
            return False
        print(census_block)
        return census_block


    def validate_coords(self, longitude, latitude):
        if math.isnan(longitude) or math.isnan(latitude):
            error_message = 'Error: Longitude({}) and Latitude({}) are not valid!\n'.format(longitude, latitude)
            self.error_messages.append(error_message)
            return False
        else:
            return True


    def clear_error_messeges(self):
        self.error_messages = []


    def log(self):
        current_date = datetime.datetime.now()
        for error_message in self.error_messages:
            log = models.Logs(
                date = current_date,
                message = error_message
            )

            log.save()
