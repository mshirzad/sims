from django.urls import path
from .views import home, student_list, grade_list

urlpatterns = [
    path('', home),
    path('students/', student_list),
    path('grades/', grade_list)
]

