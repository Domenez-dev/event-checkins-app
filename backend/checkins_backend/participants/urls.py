from django.urls import path
from . import views

urlpatterns = [
    path('<int:event_id>/create/', views.CreateParticipantView.as_view(), name="create_participant"),
]
