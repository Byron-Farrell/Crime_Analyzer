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
    path('uploadFile', views.FileUpload.as_view(), name='fileUpload'),
    path('getColumns', views.GetColumns.as_view(), name='getColumns'),
    path('importCensusBorders', views.ImportCensusBorders.as_view(), name='importCensusBorders'),
    path('importCrimes', views.ImportCrimes.as_view(), name='importCrimes'),
    # path('uploadCrimes', views.upload_crimes, name='upload_crimes'),
]
