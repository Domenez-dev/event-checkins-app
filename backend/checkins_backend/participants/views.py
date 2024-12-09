from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import Participant
from .utils import generate_qrcode, send_qr_code_email

def create_participant(request):
    """
    Create a new participant and send a QR code to their email.
    """
    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get("email")
        event_id = request.POST.get("event_id")

        if not (name and email and event_id):
            return JsonResponse({"error": "All fields are required: name, email, event_id."}, status=400)

        # Create participant
        participant = Participant.objects.create(name=name, email=email, event_id=event_id)

        # Generate and send QR code
        qr_code = generate_qrcode(event_id, participant.id)
        try:
            send_qr_code_email(email, qr_code)
            return JsonResponse({"message": f"Participant created and QR code sent to {email}."}, status=201)
        except Exception as e:
            return JsonResponse({"error": f"Failed to send email: {e}"}, status=500)

    return JsonResponse({"error": "Invalid HTTP method. Use POST."}, status=405)

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
