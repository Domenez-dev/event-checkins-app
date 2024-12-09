from django.urls import path
from . import views

urlpatterns = [
    path('<int:event_id>/', views.list_participants, name="list_participants"),
    path('<int:event_id>/create/', views.create_participant, name="create_participant"),
    # path('<int:event_id>/check-in/<int:participant_id>/', views.check_in_participant, name="check_in_participant"),
]
