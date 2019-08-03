from django.contrib import admin
from .models import Teacher, Attendance
# Register your models here.

class TeacherAdmin(admin.ModelAdmin):

	pass


admin.site.register(Teacher, TeacherAdmin)


class AttendanceAdmin(admin.ModelAdmin):
	pass

admin.site.register(Attendance, AttendanceAdmin)
