from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.CreateEventView.as_view(), name="create_new_event"),
    path('list/', views.ListEventsView.as_view(), name="list_events"),
    path('details/', views.EventDetailsView.as_view(), name="event_details"),
]
