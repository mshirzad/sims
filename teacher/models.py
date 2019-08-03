from django.db import models
from django.contrib.auth.models import User
import uuid
# Create your models here.
class Teacher(models.Model):

    GENDER_CHOICES = (('f', 'Female'), ('m', 'Male'))
    uid =  models.UUIDField(primary_key=True, default=uuid.uuid4)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    fathers_name = models.CharField(max_length=50)
    dob = models.DateField()
    national_id = models.IntegerField()
    image = models.ImageField(upload_to='images/')
    gender = models.CharField(choices=GENDER_CHOICES, max_length=1)
    user = models.OneToOneField(User, related_name='teacher', on_delete=models.SET_NULL, null=True)


class Attendance(models.Model):

    TERM_CHOICES = (('f', 'Full-Term'), ('m', 'Mid-Term'))
    ATTENDANCE_CHOICES = (('p', 'Present'), ('a', 'Absent'), ('s', 'Sick'), ('l', 'Leave'))
    created_on = models.DateTimeField()
    teacher = models.ForeignKey(Teacher, on_delete=models.SET_NULL, null=True)
    academic_year = models.IntegerField()
    term = models.CharField(choices=TERM_CHOICES, max_length=1)
    attendance = models.CharField(choices=ATTENDANCE_CHOICES, max_length=1)

    def save(self, *args, **kwargs):

        self.created_on = datetime.now()

        super().save(*args, **kwargs)