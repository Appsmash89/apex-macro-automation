import asyncio
import json
import os
from datetime import datetime
from playwright.async_api import async_playwright

import asyncio
import json
import os
import time
from datetime import datetime
from playwright.async_api import async_playwright

async def check_for_challenge(page, response=None):
    """
    MISSION 3.2.1: Multi-Signal Auditor
    Detection Vectors: Headers (403/503 + cf-ray), Title ("Just a moment..."), Visuals.
    """
    # Vector 1: Response Headers
    if response:
        headers = response.headers
        if response.status in [403, 503] and ("cf-ray" in headers or "cloudflare" in str(headers).lower()):
            print("SIGNAL_AUDIT: CHALLENGE_DETECTED via Status/Headers", flush=True)
            return True
        
    # Vector 2: Page Title
    title = await page.title()
    if "Just a moment..." in title or "Cloudflare" in title:
        print(f"SIGNAL_AUDIT: CHALLENGE_DETECTED via Title ({title})", flush=True)
        return True
    
    # Vector 3: Content Heuristics
    content = await page.content()
    if "challenges.cloudflare.com" in content or "Ray ID:" in content:
        print("SIGNAL_AUDIT: CHALLENGE_DETECTED via Content Elements", flush=True)
        return True

    return False

async def run_scout():
    # 1. Load Configuration
    with open("shared/config.json", "r") as f:
        config = json.load(f)
    
    impact_threshold = config.get("impact_threshold", ["high"])
    
    async with async_playwright() as p:
        # 2. Setup Data Directory
        os.makedirs("data", exist_ok=True)
        
        # 3. Initial Launch (Headless attempt for automation)
        print("Launching stealth browser for automated scouting...", flush=True)
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        )
        page = await context.new_page()
        
        url = "https://www.forexfactory.com/calendar?day=today"
        print(f"Navigating to {url}...", flush=True)
        
        try:
            response = await page.goto(url, wait_until="domcontentloaded", timeout=60000)
            is_blocked = await check_for_challenge(page, response)
        except Exception as e:
            print(f"Navigation Failure: {e}", flush=True)
            is_blocked = True

        # MISSION 3.2.1: Handover Protocol
        if is_blocked:
            print("\n" + "!"*60, flush=True)
            print("SIGNAL_AUDIT: VERIFICATION_WALL_DETECTED", flush=True)
            print("MISSION_3.2.1: TRIGGERING_MANUAL_HANDOVER", flush=True)
            print("!"*60 + "\n", flush=True)
            
            await browser.close()
            
            # Update Orchestrator to AWAITING_VERIFICATION
            from pipeline_utils import update_pipeline_status
            update_pipeline_status(1, "AWAITING_VERIFICATION")
            
            # Relaunch in HEADED mode
            print("Starting Visible Browser for CEO Intervention...", flush=True)
            browser = await p.chromium.launch(headless=False)
            context = await browser.new_context()
            page = await context.new_page()
            await page.goto(url)
            
            # Wait for RESUME signal from UI
            print("System Locking... Waiting for 'RESUME FACTORY' signal from Dashboard.", flush=True)
            status_file = "data/pipeline_status.json"
            while True:
                await asyncio.sleep(2)
                try:
                    with open(status_file, "r") as f:
                        data = json.load(f)
                    if data["stages"]["1"]["status"] == "running":
                        print("HANDOVER_COMPLETE: Resume signal detected. Proceeding.", flush=True)
                        break
                except Exception:
                    continue
        
        # 4. Data Extraction (Visible or Headless)
        print("Extracting intelligence from Forex Factory...", flush=True)
        await page.wait_for_selector("tr.calendar__row", timeout=30000)
        rows = await page.query_selector_all("tr.calendar__row")
        
        extracted_news = []
        impact_map = {
            "high": "icon--ff-impact-red",
            "medium": "icon--ff-impact-ora",
            "low": "icon--ff-impact-yel"
        }
        
        for row in rows:
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
        
        # 5. Save Data
        with open("data/latest_news.json", "w") as f:
            json.dump(extracted_news, f, indent=4)
            
        print(f"Scout Agent: Extraction Complete. Found {len(extracted_news)} events.", flush=True)
if __name__ == "__main__":
    import sys
    sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    from pipeline_utils import update_pipeline_status
    
    update_pipeline_status(1, "running")
    try:
        asyncio.run(run_scout())
        update_pipeline_status(1, "complete")
    except Exception as e:
        update_pipeline_status(1, "error")
        raise e
