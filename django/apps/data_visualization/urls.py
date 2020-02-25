from django.urls import path

from . import views

urlpatterns = [
    path('', views.Index.as_view(), name='index'),
    path('getCrimes', views.GetCrimes.as_view(), name='getCrimes'),
    path('getCrimeTypes', views.GetCrimeTypes.as_view(), name='getCrimeTypes'),
    path('getWeatherTypes', views.GetWeatherTypes.as_view(), name='getWeatherTypes'),
    path('getMoonTypes', views.GetMoonTypes.as_view(), name='getMoonTypes'),
    path('getCityNames', views.GetCityNames.as_view(), name='getCityNames'),
    path('getAnalytics', views.GetAnalytics.as_view(), name='getAnalytics'),
    path('uploadCriminalDataFile', views.CrimeFileUpload.as_view(), name='crimeFileUpload'),
    # path('uploadCrimes', views.upload_crimes, name='upload_crimes'),
]
