import json
import os

def update_pipeline_status(stage, status):
    """
    Updates the global pipeline_status.json from Python engines.
    """
    # MISSION 0.3: Absolute Root Pathing
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    file_path = os.path.join(base_dir, "data", "pipeline_status.json")
    
    if not os.path.exists(file_path):
        return

    try:
        with open(file_path, "r") as f:
            data = json.load(f)
        
        data["stage"] = stage
        data["status"] = status
        
        with open(file_path, "w") as f:
            json.dump(data, f, indent=4)
        
        print(f"PIPELINE_SYNC: Stage [{stage}] marked as [{status}]", flush=True)
    except Exception as e:
        print(f"PIPELINE_ERR: Failed to update status: {e}", flush=True)
