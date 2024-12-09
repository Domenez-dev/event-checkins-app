import os
import pickle
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

# If modifying the scope, delete the token.pickle file.
SCOPES = ['https://www.googleapis.com/auth/gmail.send']  # Gmail API for sending emails
CLIENT_SECRET_FILE = 'client_secret_440047033744-777t0gm277gq3dfaqm3aqmsoo7fud4tn.apps.googleusercontent.com.json'  # Replace with the path to your client secret JSON file
TOKEN_FILE = 'token.pickle'  # This file will store the access token

def authenticate():
    """Authenticate using OAuth 2.0 and return the credentials."""
    creds = None
    
    # Check if the token.pickle file exists, which stores the user's credentials
    if os.path.exists(TOKEN_FILE):
        with open(TOKEN_FILE, 'rb') as token:
            creds = pickle.load(token)
    
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                CLIENT_SECRET_FILE, SCOPES)
            creds = flow.run_local_server(port=0)

        # Save the credentials for the next run
        with open(TOKEN_FILE, 'wb') as token:
            pickle.dump(creds, token)
    
    return creds

authenticate()
