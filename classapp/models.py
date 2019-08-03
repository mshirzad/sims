from django.db import models
from teacher.models import Teacher
import uuid
# Create your models here.

class Subject(models.Model):

    uid =  models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=100)
    teacher = models.ForeignKey(Teacher, on_delete=models.SET_NULL, null=True, blank=True)







