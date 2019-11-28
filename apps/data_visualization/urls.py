from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('getCrimes', views.get_crimes, name='get_crimes'),
    path('uploadCrimes', views.upload_crimes, name='upload_crimes'),
]
