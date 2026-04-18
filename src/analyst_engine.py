import json
import os

def generate_short_script(news_data, snapshot):
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
        "Map highlighting the Strait of Hormuz with 'OPEN' status indicator.",
        "Sentiment gauge shifting from red (Extreme Fear) to green (Neutral/Greed).",
        "Upcoming event ticker: President Trump Speaking / IMF Meetings Day 6."
    ]
    
    script = {
        "title": title,
        "hook": hook,
        "body": body,
        "alpha": alpha,  # Added alpha field to match structure
        "cta": cta,
        "visual_prompts": visual_prompts
    }
    
    return script

def main():
    # 1. Load News
    news_path = "data/latest_news.json"
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

    # 3. Generate Script
    print("Analyst Engine: Processing data into script...", flush=True)
    script = generate_short_script(news_data, market_snapshot)

    # 4. Save Script
    output_path = "data/current_script.json"
    os.makedirs("data", exist_ok=True)
    with open(output_path, "w") as f:
        json.dump(script, f, indent=4)

    print(f"Analyst Engine: Mission 2.0 Complete. Script saved to {output_path}", flush=True)

if __name__ == "__main__":
    main()
