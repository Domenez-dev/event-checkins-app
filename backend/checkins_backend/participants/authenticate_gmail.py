import base64
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders

# Define the Gmail API scope
SCOPES = ['https://www.googleapis.com/auth/gmail.send']

class GmailService:
    def __init__(self):
        self.creds = None
        self.authenticate()

    def authenticate(self):
        """
        Authenticate the user and get the Gmail API credentials.
        """
        try:
            # Check if token.json exists (saved credentials)
            self.creds = Credentials.from_authorized_user_file('token.json', SCOPES)
        except Exception:
            pass

        # If credentials are not valid or don't exist, authenticate again
        if not self.creds or not self.creds.valid:
            if self.creds and self.creds.expired and self.creds.refresh_token:
                self.creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
                self.creds = flow.run_local_server(port=8081)

            # Save the credentials for future use
            with open('token.json', 'w') as token:
                token.write(self.creds.to_json())

    def send_email(self, recipient_email, subject, body, attachment=None, attachment_filename=None):
        """
        Send an email with optional attachment using the Gmail API.
        """
        try:
            # Create the email message
            message = MIMEMultipart()
            message['to'] = recipient_email
            message['subject'] = subject

            # Add the email body
            message.attach(MIMEText(body, 'plain'))

            # Add an attachment if provided
            if attachment and attachment_filename:
                part = MIMEBase('application', 'octet-stream')
                part.set_payload(attachment.getvalue())  # Read from BytesIO
                encoders.encode_base64(part)
                part.add_header('Content-Disposition', f'attachment; filename={attachment_filename}')
                message.attach(part)

            # Encode the email message
            raw_message = base64.urlsafe_b64encode(message.as_bytes()).decode()

            # Build Gmail API service
            service = build('gmail', 'v1', credentials=self.creds)
            send_result = service.users().messages().send(
                userId='me',
                body={'raw': raw_message}
            ).execute()

            print(f"Email sent successfully! Message ID: {send_result['id']}")
            return send_result
        except Exception as e:
            print(f"An error occurred while sending email: {e}")
            raise
