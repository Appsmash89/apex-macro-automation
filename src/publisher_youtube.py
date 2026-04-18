import os
import json
import googleapiclient.discovery
import googleapiclient.http
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from dotenv import load_dotenv

# 1. Configuration
load_dotenv()
SCOPES = ["https://www.googleapis.com/auth/youtube.upload"]
TOKEN_FILE = "token.json"

def get_youtube_service():
    """
    Initializes the YouTube Service using existing token.json.
    """
    if not os.path.exists(TOKEN_FILE):
        print(f"ERROR: {TOKEN_FILE} missing. Run generate_token.py first.")
        return None

    creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)
    
    # If creds are expired, refresh them
    if creds and creds.expired and creds.refresh_token:
        print("Refreshing authentication token...")
        creds.refresh(Request())
        with open(TOKEN_FILE, "w") as token:
            token.write(creds.to_json())

    return googleapiclient.discovery.build("youtube", "v3", credentials=creds)

def upload_video(video_path, script_path):
    """
    Constructs metadata and uploads the video.
    """
    youtube = get_youtube_service()
    if not youtube:
        return False

    if not os.path.exists(video_path) or not os.path.exists(script_path):
        print("Error: Missing video or script files.")
        return False

    with open(script_path, "r") as f:
        script = json.load(f)

    # Map Metadata
    title = script.get("title", "Sovereign Observer // Crypto Pulse")
    description = (
        f"{script.get('hook', '')}\n\n"
        f"{script.get('body', '')}\n\n"
        f"{script.get('alpha', '')}\n\n"
        "--- SOVEREIGN OBSERVER DIGITAL COMMAND CENTER ---\n"
        f"{script.get('cta', '')}\n\n"
        "#Bitcoin #Macro #CryptoPulse #SovereignObserver"
    )

    body = {
        "snippet": {
            "title": title,
            "description": description,
            "tags": ["Bitcoin", "Macro", "Finance", "Trading", "Crypto"],
            "categoryId": "27"  # Education
        },
        "status": {
            "privacyStatus": "unlisted",  # Safety first
            "selfDeclaredMadeForKids": False
        }
    }

    print(f"Publisher: Initiating upload for '{title}'...")
    
    media = googleapiclient.http.MediaFileUpload(
        video_path, chunksize=-1, resumable=True
    )
    
    request = youtube.videos().insert(
        part="snippet,status",
        body=body,
        media_body=media
    )

    response = None
    while response is None:
        status, response = request.next_chunk()
        if status:
            print(f"Uploaded {int(status.progress() * 100)}%")

    print(f"SUCCESS: Video Broadcasted! Video ID: {response['id']}")
    print(f"URL: https://youtu.be/{response['id']}")
    return True

if __name__ == "__main__":
    # Standard output paths
    VIDEO = "data/FINAL_OUTPUT.mp4"
    SCRIPT = "data/current_script.json"
    
    success = upload_video(VIDEO, SCRIPT)
    if not success:
        exit(1)
