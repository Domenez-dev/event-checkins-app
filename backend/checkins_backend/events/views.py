from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from events.models import Event
from participants.models import Participant
from django.contrib.auth import get_user_model
from functools import wraps

User = get_user_model()

def is_admin_required(view_func):
    """
    Decorator to ensure the user is authenticated and has is_admin=True.
    """
    @wraps(view_func)
    def wrapper(self, request, *args, **kwargs):
        # Apply token authentication
        auth = TokenAuthentication()
        user, _ = auth.authenticate(request)

        if not user:
            return Response(
                {"error": "Authentication credentials were not provided."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        if not user.is_admin:
            return Response(
                {"error": "Only admin users can access this resource."},
                status=status.HTTP_403_FORBIDDEN
            )

        # Pass the user to the view for further processing
        request.user = user
        return view_func(self, request, *args, **kwargs)

    return wrapper

class CreateEventView(APIView):
    """
    Handles the creation of new events.
    """
    @is_admin_required

    def post(self, request, *args, **kwargs):
        # Extract data from the request
        name = request.data.get("name")
        end_date = request.data.get("end_date")
        location = request.data.get("location")

        # Validate required fields
        if not all([name, end_date, location]):
            return Response(
                {"error": "All fields (name, end_date, location) are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create the event
        event = Event.objects.create(
            name=name,
            end_date=end_date,
            location=location,
            organizer=user
        )

        return Response(
            {"message": "Event created successfully!", "event_id": event.id},
            status=status.HTTP_201_CREATED
        )


class ListEventsView(APIView):
    """
    API to list all events in the database.
    """
    @is_admin_required

    def get(self, request, *args, **kwargs):
        # Fetch all events
        events = Event.objects.all().values("name", "location", "end_date")
        return Response(
            {"events": list(events)},
            status=status.HTTP_200_OK
        )


class EventDetailsView(APIView):
    """
    API to get event details and its participants.
    """
    @is_admin_required

    def get(self, request, *args, **kwargs):
        # Get the event ID from the query parameters
        event_id = request.query_params.get("event_id")
        if not event_id:
            return Response(
                {"error": "Event ID is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Fetch the selected event
            event = Event.objects.get(id=event_id)

            # Get all participants associated with this event
            participants = Participant.objects.filter(event=event).values("id", "name", "email", "check_in_time")

            # Response with event name and participant details
            return Response(
                {
                    "event_name": event.name,
                    "participants": list(participants)
                },
                status=status.HTTP_200_OK
            )
        except Event.DoesNotExist:
            return Response(
                {"error": "Event not found."},
                status=status.HTTP_404_NOT_FOUND
            )
