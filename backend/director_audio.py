import asyncio
import json
import os
import edge_tts

# 1. Configuration
VOICE = "en-US-AndrewNeural"  # Authoritative, deep male voice (Andrew)
OUTPUT_FILE = "public/data/voiceover.mp3"

async def generate_voiceover():
    # 2. Load Script
    script_path = "data/current_script.json"
    if not os.path.exists(script_path):
        print(f"Error: {script_path} not found.")
        return

    with open(script_path, "r") as f:
        script_data = json.load(f)

    # 3. Concatenate Voiceover Text (Hook + Body + CTA)
    # Using Alpha if available, but staying true to the requested sections
    full_text = f"{script_data['hook']} {script_data['body']} {script_data['alpha']} {script_data['cta']}"
    
    print(f"Director Audio: Generating zero-cost voiceover using {VOICE}...", flush=True)
    
    # 4. Communicate with Edge-TTS
    os.makedirs("data", exist_ok=True)
    
    try:
        communicate = edge_tts.Communicate(full_text, VOICE)
        await communicate.save(OUTPUT_FILE)
        print(f"Director Audio: Voiceover successfully saved to {OUTPUT_FILE}", flush=True)
    except Exception as e:
        print(f"Director Audio Error: {e}", flush=True)

if __name__ == "__main__":
    asyncio.run(generate_voiceover())
