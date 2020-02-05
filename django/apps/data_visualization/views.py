from django.http import HttpResponse
# from django.core import serializers
from django.views import View
from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from apps.data_visualization import models
from apps.ETL.Validator import Validator
import pandas as pd
import json

from django.shortcuts import render

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
        crime_type = request.GET.get('crimeType', '')
        deprevation_index = request.GET.get('deprevationIndex', '')
        district = request.GET.get('district', '')
        weather_type = request.GET.get('weatherType', '')
        degrees = request.GET.get('degrees', '')
        precipitation = request.GET.get('precipitation', '')
        cloud_cover = request.GET.get('cloudCover', '')
        isDark = request.GET.get('isDark', '')
        moon_phase = request.GET.get('moonPhase', '')
        hour = request.GET.get('hour', '')
        day = request.GET.get('day', '')
        month = request.GET.get('month', '')
        year = request.GET.get('year', '')

        # Checking if URL query keywords have values
        if city:
            filter_options['city'] = city

        if crime_type:
            filter_options['crime__type'] = crime_type

        if deprevation_index:
            filter_options['censusBlock__deprevationIndex'] = deprevation_index

        if district:
            filter_options['district__ID'] = district

        if weather_type:
            filter_options['weatherDetails__weatherType__type'] = weather_type

        if degrees:
            filter_options['weatherDetails__weatherDegrees'] = degrees

        if precipitation:
            filter_options['weatherDetails__precipitation'] = precipitation

        if cloud_cover:
            filter_options['weatherDetails__cloudCover'] = cloud_cover

        if isDark:
            filter_options['weatherDetails__dark'] = dark

        if moon_phase:
            filter_options['weatherDetails__moonPhase__moonPhase'] = moon_phase

        if hour:
            filter_options['time__hour'] = hour

        if day:
            filter_options['date__day'] = day

        if month:
            filter_options['date__month'] = month

        if year:
            filter_options['date__year'] = year

        # FIXME: get all data from related tables and put them in JSON object

        # Sending query to database using values from URL query
        # The crimes will be sent back as an array of querysets
        crimes = models.Crime.objects.filter(**filter_options)

        for obj in crimes:
            new_crime = {}
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

            query_result.append(new_crime)

        print(query_result[0])
        # Converting queryset to JSON object
        # crimes_json = serializers.serialize('json', query_result)
        crimes_json = json.dumps(query_result)

        # Returning JSON object of filtered crimes
        return HttpResponse(crimes_json, content_type='application/json')


# @login_required
# def upload_crimes(request):
#     template = 'data_visualization/index.html'
#
#     if request.method == 'POST':
#         try:
#             chunks = pd.read_csv(chicago_crimes_csv, chunksize=60000)
#         except Exception as e:
#             print(e)
#         else:
#             crime_validator = Validator()
#
#             for df in chunks:
#                 for index, row in df.iterrows():
#                     crime = crime_validator.validate_crime(row, row_num)
#                     if crime is not False:
#                         crime.save()
#                     crime_validator.log()
#                     crime_validator.clear_error_messeges()
#
#         return render(request, template)
#     else:
#         # FIXME: return 403
#         return render(request, template)
