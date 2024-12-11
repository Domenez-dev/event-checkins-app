from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .models import Participant
from .utils import generate_qrcode, send_qr_code_email
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .authenticate_gmail import GmailService
import json


class CreateParticipantView(APIView):
    """
    Create a new participant and send a QR code to their email.
    """

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


def list_participants(request):
    """
    List all participants.
    """
    participants = Participant.objects.all()
    data = [
        {
            "id": participant.id,
            "name": participant.name,
            "email": participant.email,
            "checked_in": participant.checked_in,
            "event_id": participant.event.id,
        }
        for participant in participants
    ]
    return JsonResponse({"participants": data}, status=200)


@csrf_exempt
def send_email(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            sender = data.get('sender')
            to = data.get('to')
            subject = data.get('subject')
            message_text = data.get('message')
            html = data.get('html', None)

            gmail_service = GmailService()
            result = gmail_service.send_message(
                sender=sender,
                to=to,
                subject=subject,
                message_text=message_text,
                html=html
            )

            if result:
                return JsonResponse({
                    'status': 'success',
                    'message_id': result['id']
                })
            else:
                return JsonResponse({
                    'status': 'error',
                    'message': 'Failed to send email'
                }, status=500)

        except Exception as e:
            return JsonResponse({
                'status': 'error',
                'message': str(e)
            }, status=500)

    return JsonResponse({
        'status': 'error',
        'message': 'Method not allowed'
    }, status=405)
