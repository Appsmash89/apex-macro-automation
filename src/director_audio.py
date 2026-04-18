import os
import json
from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs
from elevenlabs import save

# 1. Load Environment
load_dotenv()
api_key = os.getenv("ELEVENLABS_API_KEY")

def generate_voiceover():
    # 2. Check for API Key
    if not api_key or api_key == "your_key_here":
        print("\n" + "!"*60)
        print("CEO ERROR: ELEVENLABS_API_KEY is missing in .env")
        print("Please fill in the .env file with your API key to proceed.")
        print("!"*60 + "\n")
        return

    client = ElevenLabs(api_key=api_key)

    # 3. Load Script
    script_path = "data/current_script.json"
    if not os.path.exists(script_path):
        print(f"Error: {script_path} not found.")
        return

    with open(script_path, "r") as f:
        script_data = json.load(f)

    # 4. Concatenate Voiceover Text
    full_text = f"{script_data['hook']} {script_data['body']} {script_data['cta']}"
    
    print("Director Audio: Generating voiceover via ElevenLabs...", flush=True)
    
    try:
        audio = client.generate(
            text=full_text,
            voice="Adam", # Deep professional voice
            model="eleven_multilingual_v2"
        )
        
        # 5. Save Output
        output_path = "data/voiceover.mp3"
        os.makedirs("data", exist_ok=True)
        save(audio, output_path)
        
        print(f"Director Audio: Voiceover successfully saved to {output_path}", flush=True)
    except Exception as e:
        print(f"Director Audio Error: {e}", flush=True)

if __name__ == "__main__":
    generate_voiceover()
