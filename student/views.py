from django.shortcuts import render
from django.http import HttpResponse
from .models import Student
from teacher.models import Teacher
import json
from django.core import serializers
# Create your views here.
def home(request):


    return render(request, 'index.html')



def student_list(request):

    students = Student.objects.all()

    data = serializers.serialize('json', students)

    return HttpResponse(data)