from django.http import HttpResponse
from django.template import loader
from django.core import serializers
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from apps.data_visualization.models import Crimes

# Create your views here.
@login_required
def index(request):
    template = loader.get_template('data_visualization/index.html')
    return HttpResponse(template.render())


def getCrimes(request):

    if request.method == 'GET':
        # crimes = Crimes.objects.all().values('date','block', 'arrest', 'longitude', 'latitude', 'primaryDescription', 'secondaryDescription')
        crimes = Crimes.objects.all()[:50]
        crimes_json = serializers.serialize('json', crimes)
        return HttpResponse(crimes_json, content_type='application/json')
    else:
        return HttpResponse('Sending "' + request.method + '" request to a GET request view')
