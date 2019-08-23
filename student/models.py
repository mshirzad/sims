from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
import uuid 
from classapp.models import Subject
# Create your models here.

class Grade(models.Model):

    uid =  models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=100) # class 11 A
    grade = models.IntegerField()

    def __str__(self):
        return self.name

class Class(models.Model):

    uid =  models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=100)
    grade = models.ForeignKey(Grade, on_delete=models.SET_NULL, null=True)
    students = models.ManyToManyField('Student')
    subjects = models.ManyToManyField(Subject)


class Student(models.Model):

    GENDER_CHOICES = (('f', 'Female'), ('m', 'Male'))
    uid =  models.UUIDField(primary_key=True, default=uuid.uuid4)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    fathers_name = models.CharField(max_length=50)
    dob = models.DateField()
    national_id = models.IntegerField()
    image = models.ImageField(upload_to='images/')
    gender = models.CharField(choices=GENDER_CHOICES, max_length=1)
    user = models.OneToOneField(User, related_name='student', on_delete=models.SET_NULL, null=True)
    grade = models.ForeignKey(Grade, on_delete=models.SET_NULL, null=True)


class Performance(models.Model):

    TERM_CHOICES = (('f', 'Full-Term'), ('m', 'Mid-Term'))

    created_on = models.DateTimeField()
    student = models.ForeignKey(Student, on_delete=models.SET_NULL, null=True)
    academic_year = models.IntegerField()
    date = models.DateTimeField()
    #to be created inside Student app
    subject = models.ForeignKey(Subject, on_delete=models.SET_NULL, null=True)
    score = models.FloatField()
    #to be create inside class app
    clas = models.ForeignKey(Class, on_delete=models.SET_NULL, null=True)
    term = models.CharField(max_length=1)

    class Meta:
        # introspection
        unique_together = ('student', 'academic_year', 'subject', 'term')

    def save(self, *args, **kwargs):

        self.created_on = datetime.now()

        super().save(*args, **kwargs)

    

class Attendance(models.Model):

    TERM_CHOICES = (('f', 'Full-Term'), ('m', 'Mid-Term'))
    ATTENDANCE_CHOICES = (('p', 'Present'), ('a', 'Absent'), ('s', 'Sick'), ('l', 'Leave'))
    created_on = models.DateTimeField()
    student = models.ForeignKey(Student, on_delete=models.SET_NULL, null=True)
    academic_year = models.IntegerField()
    term = models.CharField(choices=TERM_CHOICES, max_length=1)
    first_half_attendance = models.CharField(choices=ATTENDANCE_CHOICES, max_length=1)
    second_half_attendance = models.CharField(choices=ATTENDANCE_CHOICES, max_length=1)

    def save(self, *args, **kwargs):

        self.created_on = datetime.now()

        super().save(*args, **kwargs)