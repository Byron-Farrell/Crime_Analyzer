from django.urls import path, re_path

from . import views

urlpatterns = [
    path('', views.Index.as_view(), name='index'),
    path('getCrimes', views.GetCrimes.as_view(), name='getCrimes'),
    path('getCrimeTypes', views.GetCrimeTypes.as_view(), name='getCrimeTypes'),
    path('getWeatherTypes', views.GetWeatherTypes.as_view(), name='getWeatherTypes'),
    path('getMoonTypes', views.GetMoonTypes.as_view(), name='getMoonTypes'),
    path('getCityNames', views.GetCityNames.as_view(), name='getCityNames'),
    re_path(r'^.*$',  views.HomeRedirect.as_view(url='http://127.0.0.1:8000'), name='homeRedirect'),
    # path('uploadCrimes', views.upload_crimes, name='upload_crimes'),
]
