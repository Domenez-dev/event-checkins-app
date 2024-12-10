from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import Participant
from .utils import generate_qrcode, send_qr_code_email
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .authenticate_gmail import GmailService
import json


def create_participant(request, event_id):
    """
    Create a new participant and send a QR code to their email.
    """
    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get("email")

        if not (name and email):
            return render(request, "participants/create_participant.html", {
                "error": "All fields are required.",
            })

        # Create participant
        try:
            participant = Participant.objects.create(name=name, email=email, event_id=event_id)

            # Generate and send QR code
            qr_code = generate_qrcode(event_id, participant.id)
            send_qr_code_email(email, qr_code)

            return render(request, "participants/create_participant.html", {
                "success": f"Participant {name} created, and QR code sent to {email}.",
            })
        except Exception as e:
            return render(request, "participants/create_participant.html", {
                "error": f"An error occurred: {e}",
            })

    return render(request, "participants/create_participant.html")

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
