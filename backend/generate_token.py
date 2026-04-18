import os
import google_auth_oauthlib.flow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials

# 1. SCOPES required for YouTube distribution
SCOPES = ["https://www.googleapis.com/auth/youtube.upload"]
CLIENT_SECRETS_FILE = "client_secret.json"
TOKEN_FILE = "token.json"

def main():
    """
    Initializes the OAuth2 flow to generate token.json.
    Run this script locally to authorize the application.
    """
    creds = None
    
    # The file token.json stores the user's access and refresh tokens
    if os.path.exists(TOKEN_FILE):
        creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)
    
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            print("Refreshing existing credentials...")
            creds.refresh(Request())
        else:
            if not os.path.exists(CLIENT_SECRETS_FILE):
                print(f"\nERROR: {CLIENT_SECRETS_FILE} not found!")
                print("Please download your OAuth 2.0 Client ID (Desktop app) from Google Cloud Console.")
                return

            print("Starting OAuth flow. A browser window will open...")
            flow = google_auth_oauthlib.flow.InstalledAppFlow.from_client_secrets_file(
                CLIENT_SECRETS_FILE, SCOPES
            )
            creds = flow.run_local_server(port=0)
        
        # Save the credentials for the next run
        with open(TOKEN_FILE, "w") as token:
            token.write(creds.to_json())
            print(f"SUCCESS: {TOKEN_FILE} generated.")

if __name__ == "__main__":
    main()
