from django.db import models
from django.contrib.auth.models import User

# Create your models here.
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
    user = models.OneToOneField(User, related_name='student')
    grade = models.ForeignKey(Grade)




class Grade(models.Model):

    name = models.CharField(max_length=100) # class 11 A
    grade = models.IntegerField()