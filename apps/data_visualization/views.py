from django.http import HttpResponse
from django.template import loader
from django.core import serializers
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from apps.data_visualization import models
from apps.data_visualization.utils.Validator import Validator
from django.shortcuts import render
import pandas as pd


@login_required
def index(request):
    template = 'data_visualization/index.html'
    return render(request, template)


@login_required
def get_crimes(request):
    if request.method == 'GET':
        crimes = models.Crime.objects.filter(weatherDetails__dark=False, crime__type='ROBBERY', date__year=2011, weatherDetails__moonPhase__moonPhase='Full Moon')
        crimes_json = serializers.serialize('json', crimes)

        return HttpResponse(crimes_json, content_type='application/json')
    else:
        # FIXME: return 403
        return HttpResponse('Sending "' + request.method + '" request to a GET request view')



@login_required
def upload_crimes(request):
    template = 'data_visualization/index.html'

    if request.method == 'POST':
        try:
            chunks = pd.read_csv(chicago_crimes_csv, chunksize=60000)
        except Exception as e:
            print(e)
        else:
            crime_validator = Validator()

            for df in chunks:
                for index, row in df.iterrows():
                    crime = crime_validator.validate_crime(row, row_num)
                    if crime is not False:
                        crime.save()
                    crime_validator.log()
                    crime_validator.clear_error_messeges()

        return render(request, template)
    else:
        # FIXME: return 403
        return render(request, template)
