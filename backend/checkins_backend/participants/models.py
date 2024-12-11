from django.db import models
from events.models import Event

class Participant(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="participants")
    check_in_time = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.email})"

