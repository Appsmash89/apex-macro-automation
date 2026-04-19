import os
import json
from datetime import datetime

def generate_short_script(news_data, snapshot, schema):
    """
    Generates a YouTube Shorts script based on news and market snapshot.
    Tone: Professional Institutional.
    """
    
    # Extract news summary
    trump_speech = next((n for n in news_data if "Trump" in n['event']), None)
    imf_meetings = next((n for n in news_data if "IMF" in n['event']), None)
    
    # Narrative Building
    btc_price = snapshot['btc_price']
    oil_drop = snapshot['oil_crash']
    sentiment = snapshot['sentiment']
    
    title = f"Bitcoin ${btc_price}: The Macro Bridge"
    
    hook = f"Bitcoin has shattered the $76,000 resistance, currently trading at ${btc_price}. This isn't just a technical breakout; it's a structural shift in the global macro landscape."
    
    body = (
        f"As IMF meetings enter their sixth day and geopolitical tensions de-escalate in the Middle East, we've seen a staggering 10% collapse in Crude Oil. "
        f"Lower energy costs are flushing through the system, cooling inflation expectations and fueling a widespread 'Risk-On' rally. "
        f"The pivot from extreme fear to neutral sentiment is being cemented by stability signals, including the upcoming address from President Trump."
    )
    
    alpha = (
        "The logic is clear: Deflationary pressure in energy markets is a tailwind for liquidity. "
        "With the Strait of Hormuz remaining open, the bottleneck on global trade is easing, providing the perfect 'Goldilocks' environment for Bitcoin to test new all-time highs."
    )
    
    cta = "The macro-crypto bridge is strengthening. Like and subscribe for your daily Digital Command Center briefing. Stay tuned for the next Macro Pulse."
    
    visual_prompts = [
        "Digital Command Center intro - HUD overlay of Bitcoin breaking $78,100.",
        "Line chart showing Crude Oil (WTI) falling 10% alongside Bitcoin's vertical rise.",
        "Map highlighting the Strait of Hormuz with 'OPEN' indicator.",
        "Sentiment gauge shifting from red (Extreme Fear) to green (Neutral/Greed).",
        "Upcoming event ticker: President Trump Speaking / IMF Meetings Day 6."
    ]
    
    script = {
        "title": title,
        "hook": hook,
        "body": body,
        "alpha": alpha,
        "cta": cta,
        "visual_prompts": visual_prompts,
        schema["broadcast_status"]: "pending",
        schema["video_id"]: None,
        schema["generation_timestamp"]: datetime.utcnow().isoformat(),
        schema["version"]: "1.0.0"
    }
    
    return script

def main():
    # MISSION 0.3: Absolute Root Pathing
    # Calculate project root relative to this file's location
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

    # 1. Load Configuration & Schema
    config_path = os.path.join(base_dir, "shared", "config.json")
    if not os.path.exists(config_path):
        print(f"Error: {config_path} not found.")
        return

    with open(config_path, "r") as f:
        config = json.load(f)
    
    schema = config.get("METADATA_SCHEMA")

    # 2. Load News
    news_path = os.path.join(base_dir, "data", "latest_news.json")
    if not os.path.exists(news_path):
        print(f"Error: {news_path} not found.")
        return

    with open(news_path, "r") as f:
        news_data = json.load(f)

    # 2. Market Snapshot (Ground Truth provided by CEO)
    market_snapshot = {
        "btc_price": "78,100",
        "sentiment": "Neutral/Greed",
        "geopolitical": "Iran de-escalation",
        "oil_crash": "10%",
        "narrative": "Risk-On rally fueled by lower energy costs"
    }

    # 4. Generate Script
    print("Analyst Engine: Processing data into script...", flush=True)
    script = generate_short_script(news_data, market_snapshot, schema)

    # 4. Save Script
    output_path = os.path.join(base_dir, "data", "current_script.json")
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w") as f:
        json.dump(script, f, indent=4)

    print(f"Analyst Engine: Mission 2.0 Complete. Script saved to {output_path}", flush=True)

if __name__ == "__main__":
    import sys
    # Add parent to path to find pipeline_utils
    sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    from pipeline_utils import update_pipeline_status
    
    # MISSION 2.7: Stage 2 (Analysis Scripting)
    update_pipeline_status(2, "running")
    try:
        main()
        update_pipeline_status(2, "complete")
    except Exception as e:
        update_pipeline_status(2, "error")
        raise e

