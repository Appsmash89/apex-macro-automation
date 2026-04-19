import fs from "fs";
import path from "path";

/**
 * MISSION 2.4: BROADCAST IDEMPOTENCY REGISTRY
 * Law: Every broadcast must be registered. Attempts to re-broadcast 
 * the same artifact will result in a 409 Conflict rejection.
 */
export class BroadcastRegistry {
  private static historyPath = path.join(process.cwd(), "data", "broadcast_history.json");

  static isPublished(assetId: string): boolean {
    if (!fs.existsSync(this.historyPath)) return false;
    
    try {
      const history = JSON.parse(fs.readFileSync(this.historyPath, "utf8"));
      return history.some((entry: any) => entry.assetId === assetId);
    } catch (e) {
      console.error("REGISTRY_READ_ERR:", e);
      return false;
    }
  }

  static register(assetId: string, videoId: string, url: string) {
    let history: any[] = [];
    
    if (fs.existsSync(this.historyPath)) {
      try {
        history = JSON.parse(fs.readFileSync(this.historyPath, "utf8"));
      } catch (e) {
        history = [];
      }
    }

    history.push({
      assetId,
      videoId,
      url,
      timestamp: new Date().toISOString()
    });

    fs.writeFileSync(this.historyPath, JSON.stringify(history, null, 4));
  }
}
