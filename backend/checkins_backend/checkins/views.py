import hmac
import hashlib
from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from participants.models import Participant
from django.conf import settings
from events.models import Event

# Secret key for generating QR signatures
QR_GENERATOR_KEY = settings.QR_GENERATOR_KEY

class ScanQRCodeView(APIView):
    """
    Handles scanning and verifying QR codes.
    """

    def post(self, request, *args, **kwargs):
        data = request.data

        # Extract data from the request
        event_id = data.get("event_id")
        participant_id = data.get("participant_id")
        signature = data.get("signature")

        # Validate input
        if not all([event_id, participant_id, signature]):
            return Response(
                {"error": "Missing required fields."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Verify the signature
        message = f"{event_id}:{participant_id}"
        expected_signature = hmac.new(
            QR_GENERATOR_KEY.encode(),
            message.encode(),
            hashlib.sha256
        ).hexdigest()

        if not hmac.compare_digest(signature, expected_signature):
            return Response(
                {"error": "Invalid signature."},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Fetch the participant record
        event = get_object_or_404(Event, id=event_id)

        participant = get_object_or_404(
            Participant,
            id=participant_id,
            event=event
        )
        
        if datetime.now() > event_end_datetime:
            return Response(
                {"error": "Event has already ended. Check-in is not allowed."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check if the participant is already checked in
        if participant.check_in_time is not None:
            return Response(
                {"error": "Participant already checked in."},
                status=status.HTTP_409_CONFLICT
            )

        # Update check-in time
        participant.check_in_time = datetime.now()
        participant.save()

        return Response(
            {"message": "Check-in successful."},
            status=status.HTTP_200_OK
        )
