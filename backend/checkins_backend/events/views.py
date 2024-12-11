from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from datetime import datetime
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

class DirectCheckInView(APIView):
    """
    API to check in a participant without scanning a QR code.
    """
    @is_admin_required
    def post(self, request, *args, **kwargs):
        # Extract event and participant IDs from the request data
        data = request.data
        event_id = data.get("event_id")
        participant_id = data.get("participant_id")

        if not event_id or not participant_id:
            return Response(
                {"error": "Event ID and Participant ID are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Fetch the participant record
            participant = Participant.objects.get(id=participant_id, event_id=event_id)

            # Ensure the event is still active
            event = participant.event
            if datetime.now().date() > event.end_date:
                return Response(
                    {"error": "The event has already ended."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Check if the participant is already checked in
            if participant.check_in_time:
                return Response(
                    {"error": "Participant already checked in."},
                    status=status.HTTP_409_CONFLICT
                )

            # Update check-in time
            participant.check_in_time = datetime.now()
            participant.save()

            return Response(
                {"message": f"{participant.name} has been checked in successfully."},
                status=status.HTTP_200_OK
            )

        except Participant.DoesNotExist:
            return Response(
                {"error": "Participant not found."},
                status=status.HTTP_404_NOT_FOUND
            )
