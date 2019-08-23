from django.contrib import admin
from .models import Student, Grade
# Register your models here.


class StudentAdmin(admin.ModelAdmin):
    pass

admin.site.register(Student, StudentAdmin)


class GradeAdmin(admin.ModelAdmin):
    pass

admin.site.register(Grade, GradeAdmin)

