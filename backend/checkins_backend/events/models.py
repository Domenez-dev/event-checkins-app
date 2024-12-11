from django.db import models
from users.models import User

class Event(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    end_date = models.DateField()
    location = models.CharField(max_length=255)
    organizer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="events")

    def __str__(self):
        return f"{self.name} ({self.date})"
