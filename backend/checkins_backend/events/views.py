from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import BasePermission, IsAuthenticated
from datetime import datetime
from events.models import Event
from participants.models import Participant
from django.contrib.auth import get_user_model

User = get_user_model()


class IsAdmin(BasePermission):
    """
    Custom permission to check if the user is an admin.
    """

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_admin


class CreateEventView(APIView):
    """
    Handles the creation of new events.
    """
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsAdmin]

    def post(self, request, *args, **kwargs):
        name = request.data.get("name")
        end_date = request.data.get("end_date")
        location = request.data.get("location")

        if not all([name, end_date, location]):
            return Response(
                {"error": "All fields (name, end_date, location) are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            organizer = request.user
            event = Event.objects.create(
                name=name,
                end_date=end_date,
                location=location,
                organizer=organizer
            )
            return Response(
                {"message": "Event created successfully!", "event_id": event.id},
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )


class ListEventsView(APIView):
    """
    API to list all events in the database.
    """
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request, *args, **kwargs):
        events = Event.objects.all().values("id","name", "location", "end_date")
        return Response(
            {"events": list(events)},
            status=status.HTTP_200_OK
        )


class EventDetailsView(APIView):
    """
    API to get event details and its participants.
    """
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request, *args, **kwargs):
        event_id = request.query_params.get("event_id")
        if not event_id:
            return Response(
                {"error": "Event ID is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            event = Event.objects.get(id=event_id)
            participants = Participant.objects.filter(event=event).values("id", "name", "email", "check_in_time")
            return Response(
                {"event_name": event.name, "participants": list(participants)},
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
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsAdmin]

    def post(self, request, *args, **kwargs):
        event_id = request.data.get("event_id")
        participant_id = request.data.get("participant_id")

        if not event_id or not participant_id:
            return Response(
                {"error": "Event ID and Participant ID are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            participant = Participant.objects.get(id=participant_id, event_id=event_id)
            event = participant.event

            if datetime.now().date() > event.end_date:
                return Response(
                    {"error": "The event has already ended."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            if participant.check_in_time:
                return Response(
                    {"error": "Participant already checked in."},
                    status=status.HTTP_409_CONFLICT
                )

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
