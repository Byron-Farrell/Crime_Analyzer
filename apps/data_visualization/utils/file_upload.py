import pandas as pd
from ..models import Crimes
import math
import datetime

# from apps.data_visualization.utils.file_upload import upload_crime_dataset
# upload_crime_dataset('/home/byron/Documents/data_quailty/Crimes.csv')
def upload_crime_dataset(file_path):

    df = None

    for chunk in pd.read_csv(file_path, chunksize=1000000):
        new_df = chunk

    if df is not None:
        df = pd.concat([df, new_df])
    else:
        df = new_df

    # Looping through dataframe of crimes
    for index, row in df.iterrows():
        # Only add crime to database if it has longitude and latitude positions
        if not math.isnan(row['Longitude']) and not math.isnan(row['Latitude']) and not math.isnan(row['Community Area']):
            arrest = None
            domestic = None

            # assigning boolean values to arrest and domestic columns based
            # on the datsets textual description
            if row['Arrest'] == 'false':
                arrest = False
            elif row['Arrest'] == 'true':
                arrest = True

            if row['Domestic'] == 'false':
                domestic = False
            elif row['Domestic'] == 'true':
                domestic = True

            row_date = datetime.datetime.strptime(row['Date'], '%m/%d/%Y %H:%M:%S %p')
            row_updatedOn = datetime.datetime.strptime(row['Updated On'], '%m/%d/%Y %H:%M:%S %p')
            # create crime object that will be insert into the database
            crime = Crimes(
                date = row_date,
                block =  row['Block'],
                locationDescription = row['Location Description'],
                descOne = row['Primary Type'],
                descTwo  = row['Description'],
                arrest = row['Arrest'],
                domestic = row['Domestic'],
                beat = row['Beat'],
                communityArea = row['Community Area'],
                longitude = row['Latitude'],
                latitude = row['Longitude']
            )

            # inserting new crime into database
            crime.save()

# def upload_crime_reporting_codes_dataset(file_path):
#
#         df = pd.read_csv(file_path)
#
#         # Looping through dataframe of crimes reporting codes
#         for index, row in df.iterrows():
#             crimeReportingCode = CrimeReportingCodes(
#                 IUCR = row['IUCR'],
#                 primaryDescription = row['PRIMARY DESCRIPTION'],
#                 secondaryDescription = row['SECONDARY DESCRIPTION']
#             )
#
#             crimeReportingCode.save()

# upload_crime_reporting_codes_dataset('/home/byron/Downloads/Chicago_Police_Department_-_Illinois_Uniform_Crime_Reporting__IUCR__Codes.csv')
# upload_crime_dataset('/home/byron/Downloads/Crimes_-_2001_to_present.csv')
