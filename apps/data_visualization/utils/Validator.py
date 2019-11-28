import os
import datetime
from apps.data_visualization import models


class CrimeValidator:

    def __init__(self):
        # directory to folder containing log files
        self.LOG_DIR = 'apps/data_visualization/data/logs/'
        # All validation error messages
        self.error_messages = []

    # Validate all data for the Crime model before inserting it
    def validate_crime(self, row):
        longitude = row['Longitude']
        latitude = row['Latitude']

        # Criminal code used to identify different crime types
        IUCR = row['IUCR']
        # Chicago Boundries
        community_area_code = row['Community Area']
        date_time_string = row['Date']

        if self.validate_coords(longitude, latitude) is False:
            return False

        point = 'POINT({} {})'.format(longitude, latitude)


        community_area = self.validate_community_area(community_area_code)
        crime_type = self.validate_crime_type(IUCR)
        census_block = self.validate_census_block(point)

        if crime_type is False:
            return False

        if community_area is False:
            return False

        if census_block is False:
            return False

        try:
            date_time_obj = datetime.datetime.strptime(date_time_string, '%m/%d/%Y %I:%M:%S %p')
            date = date_time_obj.date()
            time = date_time_obj.time()
        except Exception as e:
            error_message = 'Error: Failed to create Date object from date string: "{}".\n'.format(date_time_string)
            self.error_messages.append(str(e) + '\n')
            return False

        try:
            # Validate weather data
            crime = models.ChicagoCrimes(
                communityArea = community_area,
                # weatherDetails = None,
                crime = crime_type,
                censusDetails = census_block,
                date = date,
                time = time,
                arrest = row['Arrest'],
                domestic = row['Domestic'],
                longitude = row['Longitude'],
                latitude = row['Latitude']
            )
        except Exception as e:
            self.error_messages.append(str(e))
            return False

        return crime


    def validate_community_area(self, community_area_code):
        error_message = 'Error: community area "{}" does not exist!\n'.format(community_area_code)
        try:
            community_area_code = int(community_area_code)
            community_area = models.CommunityArea.objects.get(area_numbe=community_area_code)
        except Exception as e:
            self.error_messages.append(str(e) + '\tcommunity area code = {}\n'.format(community_area_code))
            return False
        return community_area


    def validate_crime_type(self, IUCR):
        error_message = 'Error: crime type with IUCR code "{}" does not exist!\n'.format(IUCR)

        try:
            IUCR = int(IUCR)
        except:
            pass

        try:
            crime_type = models.CrimeReportingCodes.objects.get(IUCR = IUCR)
        except Exception as e:
            self.error_messages.append(str(e) + '\tIUCR code = {}\n'.format(IUCR))
            return False
        return crime_type


    def validate_census_block(self, point):
        error_message = 'Error: {} is not within a community area!\n'
        try:
            census_block = models.ChicagoCensusBlocks.objects.all().filter(geom__contains=point)
        except Exception as e:
            self.error_messages.append(str(e) + '\tpoint not in chicago area, point = {}\n'.format(point))
            return False

        try:
            census_block = census_block[0]
        except Exception as e:
            self.error_messages.append(str(e))
            return False

        return census_block


    def validate_coords(self, longitude, latitude):
        if not longitude or not latitude:
            error_message = 'Error: Longitude({}) and Latitude({}) are not valid!\n'.format(longitude, latitude)
            self.error_messages.append(error_message)
            return False
        else:
            return True


    def clear_error_messeges(self):
        self.error_messages = []


    def log(self):
        # Getting current date and time and converting it to a string
        current_datetime = str(datetime.datetime.now().date())
        file_name = self.LOG_DIR + 'date_validation_log {}.txt'.format(current_datetime)

        # Writing error messages to log file
        with open(file_name, 'a') as file:
            for message in self.error_messages:
                file.write(message)
