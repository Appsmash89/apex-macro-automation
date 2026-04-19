import json
import os
import time

def update_pipeline_status(stage: int, status: str):
    """
    Updates the Sovereign Orchestrator status from Python engines.
    """
    # MISSION 0.3: Absolute Root Pathing
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    file_path = os.path.join(base_dir, "data", "pipeline_status.json")
    
    if not os.path.exists(file_path):
        return

    try:
        with open(file_path, "r") as f:
            data = json.load(f)
        
        data["current_stage"] = stage
        if str(stage) in data["stages"]:
            data["stages"][str(stage)]["status"] = status
        
        # Add log entry
        timestamp = time.strftime("%H:%M:%S")
        data["logs"].insert(0, f"[{timestamp}] Stage {stage}: {status.upper()}")
        if len(data["logs"]) > 10:
            data["logs"].pop()
            
        with open(file_path, "w") as f:
            json.dump(data, f, indent=4)
        
        print(f"ORCHESTRATOR_SYNC: Stage [{stage}] marked as [{status}]", flush=True)
        
        # Check for Manual Pause Gate
        if status == "complete" or status == "running":
            manual_pause_enabled = data["stages"].get(str(stage), {}).get("manual_pause", False)
            if manual_pause_enabled and status == "running":
                # Signal the UI that we are entering a pause gate
                enter_pause_gate(stage, file_path)
    except Exception as e:
        print(f"ORCHESTRATOR_ERR: Failed to update status: {e}", flush=True)

def enter_pause_gate(stage: int, file_path: str):
    """
    Enforces a hard-lock wait until the UI signals RESUME.
    """
    with open(file_path, "r") as f:
        data = json.load(f)
    
    data["is_paused"] = True
    with open(file_path, "w") as f:
        json.dump(data, f, indent=4)
    
    print(f"PAUSE_GATE: Waiting for manual RESUME at Stage {stage}...", flush=True)
    
    while True:
        time.sleep(2)
        try:
            with open(file_path, "r") as f:
                current_data = json.load(f)
            if not current_data.get("is_paused", False):
                print(f"PAUSE_GATE: RESUME signal received. Proceeding Stage {stage}.", flush=True)
                break
        except Exception:
            continue
