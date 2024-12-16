from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import BasePermission, IsAuthenticated
from .models import Participant
from .utils import generate_qrcode, send_qr_code_email
from django.contrib.auth import get_user_model

User = get_user_model()
class IsAdmin(BasePermission):
    """
    Custom permission to check if the user is an admin.
    """

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_admin

class CreateParticipantView(APIView):
    """
    Create a new participant and send a QR code to their email.
    """
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsAdmin]

    def post(self, request, event_id):
        name = request.data.get("name")
        email = request.data.get("email")

        if not (name and email):
            return Response(
                {"error": "All fields (name and email) are required."},
                status=status.HTTP_400_BAD_REQUEST
            )
        # Create participant
        try:
            participant = Participant.objects.create(name=name, email=email, event_id=event_id)

            # Generate and send QR code
            qr_code = generate_qrcode(event_id, participant.id)
            send_qr_code_email(email, qr_code, name)
            return Response(
                {
                    "message": f"Participant {name} created successfully.",
                    "participant_id": participant.id,
                },
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {"error": f"An error occurred: {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
