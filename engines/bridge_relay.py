from flask import Flask, jsonify, request
from flask_cors import CORS
import subprocess
import os
import json
import threading

app = Flask(__name__)
CORS(app)  # Enables cross-origin requests from the Dashboard (port 3000)

# MISSION 2.8: Local Command Relay
# This bridge allows the cloud-hosted dashboard to physically trigger local Python processes.

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATUS_FILE = os.path.join(BASE_DIR, "data", "pipeline_status.json")

def run_script(command, stage_id):
    """
    Spawns a subprocess to execute the departmental engine.
    """
    print(f"RELAY_EXEC: Triggering Stage {stage_id} command -> {command}", flush=True)
    try:
        # Run in the project root to preserve relative path logic in engines
        process = subprocess.Popen(
            command, 
            shell=True, 
            cwd=BASE_DIR,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True
        )
        
        # Stream logs to the bridge console
        for line in process.stdout:
            print(f"[STAGE_{stage_id}] {line.strip()}", flush=True)
            
        process.wait()
        print(f"RELAY_DONE: Stage {stage_id} completed with exit code {process.returncode}", flush=True)
    except Exception as e:
        print(f"RELAY_ERR: Stage {stage_id} failure: {e}", flush=True)

@app.route("/trigger/<int:stage_id>", methods=["POST"])
def trigger_stage(stage_id):
    commands = {
        1: "python engines/intelligence/scout_forex.py",
        2: "python engines/intelligence/analyst_engine.py",
        3: "manim -pql engines/creative/director_visuals.py MacroPulseShort"
    }

    if stage_id not in commands:
        return jsonify({"success": False, "error": "Invalid Stage ID"}), 400

    # Execute in a separate thread to prevent blocking the HTTP response
    thread = threading.Thread(target=run_script, args=(commands[stage_id], stage_id))
    thread.start()

    return jsonify({"success": True, "message": f"Stage {stage_id} triggered locally."})

@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy", "engine": "APEX_SOVEREIGN_RELAY"})

if __name__ == "__main__":
    print("\n" + "="*60)
    print("APEX SOVEREIGN RELAY: Command Bridge Active (Port 5000)")
    print("Locked on BASE_DIR:", BASE_DIR)
    print("="*60 + "\n")
    app.run(port=5000, debug=False)
 Elisa 
