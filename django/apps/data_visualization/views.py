from django.http import HttpResponse
from django.views import View
from django.views.generic import TemplateView
from django.views.generic.base import RedirectView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render
from django.shortcuts import redirect
from apps.data_visualization import models
from apps.ETL.Validator import Validator
from apps.ETL import load

from datetime import datetime
import pandas as pd
import geopandas as geo_pd
import json
import zipfile
import os

class HomeRedirect(LoginRequiredMixin, RedirectView):

    def get_redirect_url(self, *args, **kwargs):
        return super().get_redirect_url(*args, **kwargs)


# returns the main webpage defined by template_name
class Index(LoginRequiredMixin, TemplateView):
    template_name = 'data_visualization/index.html'


# GetCrimes is a view that will take in a URL query and send a query to the
# database based on the URL query. A JSON object will be returned to the client
# with all the recieved data
class GetCrimes(LoginRequiredMixin, View):

    def get(self, request):
        filter_options = {}
        query_result = []

        # retrieving URL query values if the keyword is not in the URL query
        # use '' as the default value
        city = request.GET.get('city', '')
        crime_type = request.GET.getlist('crimeType', '')
        deprevation_index = request.GET.get('deprevationIndex', '')
        district = request.GET.get('district', '')
        weather_type = request.GET.getlist('weatherType', '')
        degrees = request.GET.get('degrees', '')
        precipitation_min = request.GET.get('precipitationMin', '')
        precipitation_max = request.GET.get('precipitationMax', '')
        cloud_cover_min = request.GET.get('cloudCoverMin', '')
        cloud_cover_max = request.GET.get('cloudCoverMax', '')
        degrees_min = request.GET.get('degreesMin', '')
        degrees_max = request.GET.get('degreesMax', '')
        isDark = request.GET.getlist('isDark', '')
        moon_phase = request.GET.get('moonPhase', '')
        hour = request.GET.get('hour', '')
        startDate = request.GET.get('startDate', '')
        endDate = request.GET.get('endDate', '')

        offset = request.GET.get('offset', '') # integer value
        limit = request.GET.get('limit', '') # integer value
        count = request.GET.get('count', '') # boolean value

        # Checking if URL query keywords have values
        if city:
            filter_options['city__name'] = city

        if crime_type:
            filter_options['crime__type__in'] = crime_type

        if deprevation_index:
            filter_options['censusBlock__deprevationIndex'] = deprevation_index

        if district:
            filter_options['district__ID'] = district

        if weather_type:
            filter_options['weatherDetails__weatherType__weatherType__in'] = weather_type

        if precipitation_min:
            filter_options['weatherDetails__precipitation__gte'] = precipitation_min

        if precipitation_max:
            filter_options['weatherDetails__precipitation__lte'] = precipitation_max

        if cloud_cover_min:
            filter_options['weatherDetails__cloudCover__gte'] = cloud_cover_min

        if cloud_cover_max:
            filter_options['weatherDetails__cloudCover__lte'] = cloud_cover_max

        if degrees_min:
            filter_options['weatherDetails__weatherDegrees__gte'] = degrees_min

        if degrees_max:
            filter_options['weatherDetails__weatherDegrees__lte'] = degrees_max

        if isDark:
            for i in range(len(isDark)):
                if (isDark[i] == 'true'):
                    isDark[i] = True;
                else:
                    isDark[i] = False;

            filter_options['weatherDetails__dark__in'] = isDark

        if moon_phase:
            filter_options['weatherDetails__moonPhase__moonPhase'] = moon_phase

        if hour:
            filter_options['time__hour'] = hour

        if startDate and endDate:
            startDate = datetime.strptime(startDate, '%d-%m-%Y')
            endDate = datetime.strptime(endDate, '%d-%m-%Y')
            filter_options['date__fullDate__range'] = (startDate, endDate)



        # Sending query to database using values from URL query
        # The crimes will be sent back as an array of querysets
        if limit and offset:
            limit = int(limit)
            offset = int(offset)
            crimes = models.Crime.objects.filter(**filter_options)[offset:limit + offset]
        elif count:
            crimes_count = models.Crime.objects.filter(**filter_options).count()
        else:
            crimes = models.Crime.objects.filter(**filter_options)[:250]

        if 'crimes_count' in locals():
            query_result = {'count': crimes_count}
        else:
            for obj in crimes:
                new_crime = {}
                new_crime['city'] = obj.city.name
                new_crime['crimetype'] = obj.crime.type
                new_crime['weatherType'] = obj.weatherDetails.weatherType.weatherType
                new_crime['degrees'] = float(obj.weatherDetails.weatherDegrees)
                new_crime['precipitation'] = float(obj.weatherDetails.precipitation)
                new_crime['cloudCover'] = obj.weatherDetails.cloudCover
                new_crime['isDark'] = obj.weatherDetails.dark
                new_crime['moonPhase'] = obj.weatherDetails.moonPhase.moonPhase
                new_crime['hour'] = obj.time.hour
                new_crime['day'] = obj.date.day
                new_crime['month'] = obj.date.month
                new_crime['year'] = obj.date.year
                new_crime['longitude'] = float(obj.longitude)
                new_crime['latitude'] = float(obj.latitude)
                new_crime['arrest'] = obj.arrest
                new_crime['uniqueID'] = obj.uniqueID
                new_crime['crimeDescription'] = obj.crimeDescription
                query_result.append(new_crime)


        # Converting queryset to JSON object
        # crimes_json = serializers.serialize('json', query_result)
        crimes_json = json.dumps(query_result)

        # Returning JSON object of filtered crimes
        return HttpResponse(crimes_json, content_type='application/json')


class GetCrimeTypes(LoginRequiredMixin, View):
    def get(self, request):
        # Getting all crime types
        queryset = models.CrimeType.objects.all();
        crime_types = []

        for obj in queryset:
            crime_types.append(obj.type);

        crime_types_json = json.dumps(crime_types)

        # returning json response
        return HttpResponse(crime_types_json, content_type='application/json')


class GetWeatherTypes(LoginRequiredMixin, View):
    def get(self, request):
        # Getting all crime types
        queryset = models.WeatherType.objects.all();
        weather_types = []

        for obj in queryset:
            weather_types.append(obj.weatherType);

        weather_types_json = json.dumps(weather_types)

        # returning json response
        return HttpResponse(weather_types_json, content_type='application/json')


class GetMoonTypes(LoginRequiredMixin, View):
    def get(self, request):
        # Getting all crime types
        queryset = models.MoonCycle.objects.all();
        moon_types = []

        for obj in queryset:
            moon_types.append(obj.moonPhase);

        moon_types_json = json.dumps(moon_types)

        # returning json response
        return HttpResponse(moon_types_json, content_type='application/json')


class GetCityNames(LoginRequiredMixin, View):
    def get(self, request):
        queryset = models.City.objects.all()
        cities = []

        for obj in queryset:
            cities.append(obj.name);


        cities_json = json.dumps(cities)

        # returning json response
        return HttpResponse(cities_json, content_type='application/json')


class GetAnalytics(LoginRequiredMixin, View):

    def get(self, request):
        filter_options = {}
        query_result = {
            'isDark': {},
            'isDarkTotal': {},
            'timeCrimeCount': {},
        }

        city = request.GET.getlist('city', '')
        crime_types = request.GET.getlist('crimeType', '')
        startDate = request.GET.get('startDate', '')
        endDate = request.GET.get('endDate', '')

        # Checking if URL query keywords have values
        if city:
            filter_options['city__name__in'] = city

        if crime_types:
            filter_options['crime__type__in'] = crime_types
        if startDate and endDate:
            startDate = datetime.strptime(startDate, '%d-%m-%Y')
            endDate = datetime.strptime(endDate, '%d-%m-%Y')
            filter_options['date__fullDate__range'] = (startDate, endDate)


        if crime_types and startDate and endDate and city:
            for type in crime_types:
                isDarkCount = models.Crime.objects.filter(city__name__in=city, date__fullDate__range=(startDate, endDate), crime__type=type, weatherDetails__dark=True).count()
                isNotDarkCount = models.Crime.objects.filter(city__name__in=city, date__fullDate__range=(startDate, endDate), crime__type=type, weatherDetails__dark=False).count()
                query_result['isDark'][type] = { 'yes': isDarkCount, 'no': isNotDarkCount}

        isDarkCountTotal = models.Crime.objects.filter(crime__type__in=crime_types, city__name__in=city, date__fullDate__range=(startDate, endDate), weatherDetails__dark=True).count()
        isNotDarkCountTotal = models.Crime.objects.filter(crime__type__in=crime_types, city__name__in=city, date__fullDate__range=(startDate, endDate), weatherDetails__dark=False).count()
        query_result['isDarkTotal'] = { 'yes': isDarkCountTotal, 'no': isNotDarkCountTotal }

        for i in range(1, 25):

            count = models.Crime.objects.filter(crime__type__in=crime_types, time__hour=i,city__name__in=city, date__fullDate__range=(startDate, endDate)).count()

            key = str(i)

            query_result['timeCrimeCount'][key] = count

        result_json = json.dumps(query_result)

        return HttpResponse(result_json, content_type='application/json')


class FileUpload(LoginRequiredMixin, View):

    def post(self, request):
        uploaded_file = request.FILES.get('uploadFile', None)

        file_type = request.POST.get('fileType')

        # Creating timestamp to add to file name
        now = datetime.now()
        uploaded_file_name = now.ctime() + ' - ' + uploaded_file.name


        uploaded_file_path = os.path.join(os.path.dirname(__file__), 'uploaded_files', uploaded_file_name)
        local_file = open(uploaded_file_path, 'wb+')

        for chunk in uploaded_file.chunks():
            local_file.write(chunk)

        local_file.close()

        if file_type == 'SHP.ZIP':
            df = geo_pd.read_file('zip:///' + uploaded_file_path)
        elif file_type == 'CSV':
            df = pd.read_csv(uploaded_file_path)

        preview = json.loads(df.head(5).to_json())

        result_json = {
            'columns': [],
            'file_name': '',
            'preview': preview
        }
        result_json['file_name'] = uploaded_file_name
        for col in df.columns:
            result_json['columns'].append(col)

        result_json = json.dumps(result_json)

        return HttpResponse(result_json, content_type='application/json')


class ImportCensusBorders(LoginRequiredMixin, View):

    def post(self, request):
        uploaded_file_name = request.POST.get('fileName', None)
        mappings = json.loads(request.POST.get('mappings', None))
        upload_file_path = os.path.join(os.path.dirname(__file__), 'uploaded_files', uploaded_file_name)
        tmp = os.path.join(os.path.dirname(__file__), 'tmp', uploaded_file_name)
        with zipfile.ZipFile(upload_file_path, 'r') as zip_ref:
            zip_ref.extractall(tmp)

        path = '/tmp/' + uploaded_file_name + '/'
        files = []
        for i in os.listdir(tmp):
            if os.path.isfile(os.path.join(tmp,i)) and '.shp' in i:
                files.append(i)

        shp_file = ''

        for file in files:
            if (file.endswith('.shp')):
                shp_file  = file

        result_json = {}
        load.run_census_blocks(tmp + '/' + shp_file, mappings)
        result_json['SUCCESS'] = True
        result_json = json.dumps(result_json)

        return HttpResponse(result_json, content_type='application/json')


class ImportCrimes(LoginRequiredMixin, View):

    def post(self, request):
        uploaded_file_name = request.POST.get('fileName', None)
        mappings = request.POST.get('mappings', None)
        upload_file_path = os.path.join(os.path.dirname(__file__), 'uploaded_files', uploaded_file_name)

        if mappings is not None:
            mappings_obj = json.loads(mappings)
        else:
            pass
            return

        city_name = mappings_obj['city']
        crime_type_mappings = mappings_obj['crimeTypes']
        date_format = mappings_obj['dateFormat']
        time_format = mappings_obj['timeFormat']
        column_mappings = mappings_obj['columnMappings']
        arrest_mappings = mappings_obj['arrestMappings']

        try:
            chunks = pd.read_csv(upload_file_path, chunksize=60000)
        except Exception as e:
            print(e)
        else:
            crime_validator = Validator(
                column_mappings=column_mappings,
                city_name=city_name,
                crime_type_mappings=crime_type_mappings,
                arrest_mapping=arrest_mappings,
                date_format=date_format
            )

            for df in chunks:
                for index, row in df.iterrows():
                    crime = crime_validator.validate_crime(row)
                    if crime is not False:
                        crime.save()
                    crime_validator.log(index, uploaded_file_name)
                    crime_validator.clear_error_messeges()


class GetColumns(LoginRequiredMixin, View):

    def get(self, request):
        file_upload_path = os.path.join(os.path.dirname(__file__), 'uploaded_files/')
        file_name = request.GET.get('fileName', None)
        col_name = request.GET.get('colName', None)
        file_type = request.GET.get('fileType')

        if file_type == 'SHP.ZIP':
            df = geo_pd.read_file('zip:///' + file_upload_path + file_name)
        elif file_type == 'CSV':
            df = pd.read_csv(file_upload_path + file_name)

        result_json = {}

        result_json[col_name] = df[col_name].unique().tolist()

        result_json = json.dumps(result_json)

        return HttpResponse(result_json, content_type='application/json')
