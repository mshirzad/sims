from django.contrib import admin
from .models import Subject
# Register your models here.

class SubjectAdmin(admin.ModelAdmin):
	
	fields = ('name', 'teacher')
	list_display = ('name', 'teacher')


admin.site.register(Subject, SubjectAdmin)


