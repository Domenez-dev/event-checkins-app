from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import Participant
from .utils import generate_qrcode, send_qr_code_email

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
