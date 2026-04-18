import os
import json
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.http import MediaFileUpload
from dotenv import load_dotenv

# 1. Configuration
load_dotenv()
SCOPES = ["https://www.googleapis.com/auth/youtube.upload"]

def get_youtube_service():
    """
    Initializes the YouTube Service using OAuth2.
    Note: Requires client_secrets.json from Google Cloud Console.
    """
    client_id = os.getenv("YOUTUBE_CLIENT_ID")
    client_secret = os.getenv("YOUTUBE_CLIENT_SECRET")

    if not client_id or not client_secret:
        print("\n" + "!"*60)
        print("CEO WARNING: YouTube API credentials missing in .env")
        print("Module initialized in 'PREP' mode. Uploads disabled.")
        print("!"*60 + "\n")
        return None

    # Logic for token persistence and OAuth flow would go here
    # For now, we are initializing the publisher logic structure
    return None

def prepare_upload_request(video_path, script_path):
    """
    Constructs the metadata for a YouTube upload from the current script.
    """
    if not os.path.exists(video_path):
        print(f"Error: Video file {video_path} not found.")
        return None

    if not os.path.exists(script_path):
        print(f"Error: Script file {script_path} not found.")
        return None

    with open(script_path, "r") as f:
        script = json.load(f)

    # 2. Map Mission Intel to YouTube Metadata
    title = script.get("title", "Sovereign Observer // Crypto Pulse")
    
    # Description: Hook + Body + Alpha + CTA + Tags
    description = (
        f"{script.get('hook', '')}\n\n"
        f"{script.get('body', '')}\n\n"
        f"{script.get('alpha', '')}\n\n"
        "--- DIGITAL COMMAND CENTER ---\n"
        f"{script.get('cta', '')}\n\n"
        "#Bitcoin #Macro #CryptoPulse #ProjectApex"
    )

    metadata = {
        "snippet": {
            "title": title,
            "description": description,
            "tags": ["Bitcoin", "Macro", "Finance", "Trading"],
            "categoryId": "27"  # Education
        },
        "status": {
            "privacyStatus": "unlisted",  # Default to unlisted for CEO review
            "selfDeclaredMadeForKids": False
        }
    }

    print(f"Publisher: Upload request prepared for '{title}'.")
    return metadata

if __name__ == "__main__":
    # 3. Execution (Dry Run/Prep)
    print("Publisher: Initializing Mission 6.2 structure...")
    video = "data/FINAL_OUTPUT.mp4"
    script = "data/current_script.json"
    
    metadata = prepare_upload_request(video, script)
    if metadata:
        print(json.dumps(metadata, indent=4))
