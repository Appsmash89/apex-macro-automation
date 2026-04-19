from flask import Flask, jsonify, request
from flask_cors import CORS
import subprocess
import os
import json
import threading
import time

app = Flask(__name__)
CORS(app)  # Enables cross-origin requests from the Dashboard (port 3000)

# MISSION 2.9: End-to-End Functional Orchestration
# This bridge allows the cloud-hosted dashboard to physically trigger local Python processes.

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATUS_FILE = os.path.join(BASE_DIR, "data", "pipeline_status.json")

def update_logs(message):
    """
    Appends a message to the pipeline_status.json logs for real-time UI telemetry.
    """
    try:
        with open(STATUS_FILE, "r") as f:
            data = json.load(f)
        
        timestamp = time.strftime("%H:%M:%S")
        data["logs"].insert(0, f"[{timestamp}] {message}")
        if len(data["logs"]) > 15: # Keeping slightly more for fluidity
            data["logs"].pop()
            
        with open(STATUS_FILE, "w") as f:
            json.dump(data, f, indent=4)
    except Exception as e:
        print(f"LOG_PUMP_ERR: {e}")

def run_script(command, stage_id):
    """
    Spawns a subprocess to execute the departmental engine and pumps logs to the dashboard.
    """
    print(f"RELAY_EXEC: Triggering Stage {stage_id} command -> {command}", flush=True)
    
    # Reset logs if starting Stage 1 (Intelligence Scouting)
    if stage_id == 1:
        try:
            with open(STATUS_FILE, "r") as f:
                data = json.load(f)
            data["logs"] = [f"[{time.strftime('%H:%M:%S')}] --- NEW_PRODUCTION_CYCLE_STARTED ---"]
            with open(STATUS_FILE, "w") as f:
                json.dump(data, f, indent=4)
        except Exception:
            pass

    try:
        # Run in the project root to preserve relative path logic in engines
        process = subprocess.Popen(
            command, 
            shell=True, 
            cwd=BASE_DIR,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1, # Line buffered
            universal_newlines=True
        )
        
        # Stream logs to the bridge console AND the dashboard telemetry
        for line in process.stdout:
            clean_line = line.strip()
            if clean_line:
                print(f"[STAGE_{stage_id}] {clean_line}", flush=True)
                update_logs(f"STAGE_{stage_id} >> {clean_line}")
            
        process.wait()
        print(f"RELAY_DONE: Stage {stage_id} completed.", flush=True)
        update_logs(f"STAGE_{stage_id} // EXECUTION_SUCCESS")
    except Exception as e:
        error_msg = f"RELAY_ERR: Stage {stage_id} failure: {e}"
        print(error_msg, flush=True)
        update_logs(error_msg)

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

@app.route("/list-assets", methods=["GET"])
def list_assets():
    """
    Lists all generated media assets for the Apex Studio tab.
    """
    path = os.path.join(BASE_DIR, "public", "data")
    if not os.path.exists(path):
        return jsonify([])
    
    files = [f for f in os.listdir(path) if f.endswith(".mp4") or f.endswith(".mp3")]
    return jsonify(files)

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
