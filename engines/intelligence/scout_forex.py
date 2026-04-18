import asyncio
import json
import os
from datetime import datetime
from playwright.async_api import async_playwright

async def run_scout():
    # 1. Load Configuration
    with open("shared/config.json", "r") as f:
        config = json.load(f)
    
    impact_threshold = config.get("impact_threshold", ["high"])
    
    async with async_playwright() as p:
        # 2. Setup Data Directory
        os.makedirs("data", exist_ok=True)
        
        # 3. Launch Browser in HEADED mode
        print("Launching browser in HEADED mode for CEO verification...", flush=True)
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context()
        page = await context.new_page()
        
        url = "https://www.forexfactory.com/calendar?day=today"
        print(f"Navigating to {url}...", flush=True)
        await page.goto(url)
        
        # 4. CEO Handover / Pause
        print("\n" + "!"*60, flush=True)
        print("ATTENTION CEO: Please solve the Cloudflare/Verification puzzle in the browser.", flush=True)
        print("Press ENTER in THIS terminal once the Calendar is fully visible.", flush=True)
        print("!"*60 + "\n", flush=True)
        
        # Use asyncio to wait for user input in a non-blocking way for the event loop
        # But since we are in a script, a simple input() in a thread or just loop is fine.
        # Actually, in this environment, input() might block the whole process.
        # However, for a one-off script run via run_command, it's the standard way.
        loop = asyncio.get_event_loop()
        await loop.run_in_executor(None, input, "Waiting for CEO confirmation... (Press Enter to continue)")
        
        print("CEO confirmed. Proceeding with data extraction...", flush=True)
        
        # 5. Data Extraction
        rows = await page.query_selector_all("tr.calendar__row")
        
        extracted_news = []
        
        # Mapping impact names to their CSS patterns
        impact_map = {
            "high": "icon--ff-impact-red",
            "medium": "icon--ff-impact-ora",
            "low": "icon--ff-impact-yel"
        }
        
        for row in rows:
            # Check impact
            impact_found = None
            for level, css_class in impact_map.items():
                if level in impact_threshold:
                    impact_selector = f".calendar__impact span.{css_class}"
                    if await row.query_selector(impact_selector):
                        impact_found = level
                        break
            
            if impact_found:
                event_cell = await row.query_selector(".calendar__event")
                time_cell = await row.query_selector(".calendar__time")
                forecast_cell = await row.query_selector(".calendar__forecast")
                actual_cell = await row.query_selector(".calendar__actual")
                
                extracted_news.append({
                    "event": (await event_cell.inner_text()).strip() if event_cell else "N/A",
                    "impact": impact_found,
                    "forecast": (await forecast_cell.inner_text()).strip() if forecast_cell else "N/A",
                    "actual": (await actual_cell.inner_text()).strip() if actual_cell else "N/A",
                    "time": (await time_cell.inner_text()).strip() if time_cell else "N/A"
                })
        
        # 6. Save Data
        output_path = "data/latest_news.json"
        with open(output_path, "w") as f:
            json.dump(extracted_news, f, indent=4)
            
        print(f"Scout Agent: Extraction Complete. Found {len(extracted_news)} events.", flush=True)
        print(f"Data saved to {output_path}", flush=True)
        
        # 7. Close Browser
        await browser.close()

if __name__ == "__main__":
    asyncio.run(run_scout())
