from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from events.models import Event
from django.contrib.auth import get_user_model

User = get_user_model()

class CreateEventView(APIView):
    """
    Handles the creation of new events.
    """
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # Get the logged-in user from the session
        user = request.user

        # Check if the user is an admin
        if not user.is_admin:
            return Response(
                {"error": "Only admin users can create events."},
                status=status.HTTP_403_FORBIDDEN
            )

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
