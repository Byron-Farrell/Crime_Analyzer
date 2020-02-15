from django.contrib import admin
from . import models


class AuthorAdmin(admin.ModelAdmin):
    date_hierarchy = 'timestamp'
    list_display = ('type', 'message', 'row', 'fileName', 'timestamp')
    list_filter  = ('type', 'fileName', 'timestamp')


# Register your models here.
admin.site.register(models.Log, AuthorAdmin)
