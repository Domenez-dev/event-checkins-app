# import libraries for qr code generating functionality
import qrcode
import hmac
import hashlib
import json

# import libraries for email sending functionality
from django.conf import settings
from io import BytesIO
from .authenticate_gmail import GmailService


# Secret key for hashing
QR_GENERATOR_KEY = settings.QR_GENERATOR_KEY
EMAIL_HOST_USER = settings.EMAIL_HOST_USER

def generate_qrcode(event_id, participant_id):
    """Generate a QR code as an image."""
    # Create the data payload
    message = f"{event_id}:{participant_id}"
    signature = hmac.new(QR_GENERATOR_KEY.encode(), message.encode(), hashlib.sha256).hexdigest()
    data = {
        "event_id": event_id,
        "participant_id": participant_id,
        "signature": signature
    }
    # Create the QR code
    qr = qrcode.QRCode()
    qr.add_data(json.dumps(data))  # Ensure the data is serialized properly
    qr.make(fit=True)
    qr.print_ascii()
    qr_image = qr.make_image(fill_color="black", back_color="white")  # Generate the QR code as an image
    return qr_image

def send_qr_code_email(email, qr_image, name):
    """
    Sends an email with the QR code attached to the participant.
    """
    # Convert the QR code image to bytes
    qr_code_buffer = BytesIO()
    qr_image.save(qr_code_buffer, format="PNG")
    qr_code_buffer.seek(0)

    # Email content
    subject = "Your Event QR Code"
    body = """
    Dear Participant,

    Thank you for registering for our event!
    Attached to this email, you will find your unique QR code, which you can use to check in at the event.

    Please keep this email for your reference and present the QR code during check-in.

    Best regards,
    The Event Team
    """

    # Send the email using GmailService
    gmail_service = GmailService()
    try:
        gmail_service.send_email(
            recipient_email=email,
            subject=subject,
            body=body,
            attachment=qr_code_buffer,
            attachment_filename="qr_code.png"
        )
        print(f"Email successfully sent to {email}.")
    except Exception as e:
        print(f"Failed to send email to {email}. Error: {e}")
