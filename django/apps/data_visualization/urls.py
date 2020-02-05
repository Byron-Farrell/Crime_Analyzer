from django.urls import path

from . import views

urlpatterns = [
    path('', views.Index.as_view(), name='index'),
    path('getCrimes', views.GetCrimes.as_view(), name='getCrimes'),
    path('getCrimeTypes', views.GetCrimeTypes.as_view(), name='getCrimeTypes'),
    # path('uploadCrimes', views.upload_crimes, name='upload_crimes'),
]
