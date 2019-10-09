from django.http import HttpResponse
from django.template import loader
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Crimes

from .utils.file_handler import proccess_file_upload

# Create your views here.
def index(request):
    template = loader.get_template('data_visualization/index.html')
    return HttpResponse(template.render())

# REST API
class CrimeApi(APIView):

    def get(self, request):
        # return json of crimes
        crimes = {
            'allCrimes': []
        }

        all = Crimes.objects.all()

        for crime in all:
            newCrime = {
                'longitude': '',
                'latitude': '',
                'description': ''
            }

            newCrime['longitude'] = crime.longitude
            newCrime['latitude'] = crime.latitude
            newCrime['description'] = crime.description

            crimes['allCrimes'].append(newCrime)

        return Response(crimes)

    def post(self, request):
        file = request.FILES['file']

        df = proccess_file_upload(file)

        for i in range(100):
            crime = Crimes(longitude=df['Longitude'][i], latitude=df['Latitude'][i], description=df['Description'][i])
            crime.save()

        return Response("DONE!")
