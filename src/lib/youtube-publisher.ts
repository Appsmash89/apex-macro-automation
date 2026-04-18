import fs from "fs";
import path from "path";
import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/youtube.upload"];

/**
 * MISSION 7.2: UNIFIED ENGINE
 * Native TypeScript YouTube Publisher using googleapis.
 */
export async function uploadToYouTube() {
  console.log("Unified Engine: Initiating YouTube Authentication...");

  let creds;
  const envToken = process.env.YOUTUBE_TOKEN;
  const tokenFilePath = path.join(process.cwd(), "token.json");

  // 1. Authentication Strategy
  if (envToken) {
    console.log("Unified Engine: Utilizing Cloud-Based YOUTUBE_TOKEN secrets.");
    try {
      creds = JSON.parse(envToken);
    } catch (error) {
      throw new Error(`Failed to parse YOUTUBE_TOKEN from environment: ${error}`);
    }
  } else if (fs.existsSync(tokenFilePath)) {
    console.log("Unified Engine: Utilizing local token.json for authentication.");
    const tokenData = fs.readFileSync(tokenFilePath, "utf8");
    creds = JSON.parse(tokenData);
  } else {
    throw new Error("Authentication missing. Set YOUTUBE_TOKEN env var or provide token.json.");
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials(creds);

  const youtube = google.youtube({
    version: "v3",
    auth: oauth2Client,
  });

  // 2. Load Metadata
  const scriptFilePath = path.join(process.cwd(), "data", "current_script.json");
  const videoFilePath = path.join(process.cwd(), "data", "FINAL_OUTPUT.mp4");

  if (!fs.existsSync(scriptFilePath) || !fs.existsSync(videoFilePath)) {
    throw new Error(`Missing files. Script: ${fs.existsSync(scriptFilePath)}, Video: ${fs.existsSync(videoFilePath)}`);
  }

  const script = JSON.parse(fs.readFileSync(scriptFilePath, "utf8"));

  const title = script.title || "Sovereign Observer // Crypto Pulse";
  const description = [
    script.hook || "",
    script.body || "",
    script.alpha || "",
    "--- SOVEREIGN OBSERVER DIGITAL COMMAND CENTER ---",
    script.cta || "",
    "#Bitcoin #Macro #CryptoPulse #SovereignObserver",
  ].join("\n\n");

  console.log(`Unified Engine: Preparing broadcast for '${title}'...`);

  // 3. Initiate Upload
  try {
    const response = await youtube.videos.insert({
      part: ["snippet", "status"],
      requestBody: {
        snippet: {
          title,
          description,
          tags: ["Bitcoin", "Macro", "Finance", "Trading", "Crypto"],
          categoryId: "27", // Education
        },
        status: {
          privacyStatus: "unlisted", // Safety first
          selfDeclaredMadeForKids: false,
        },
      },
      media: {
        body: fs.createReadStream(videoFilePath),
      },
    });

    console.log(`SUCCESS: Video Broadcasted! Video ID: ${response.data.id}`);
    console.log(`URL: https://youtu.be/${response.data.id}`);

    return {
      success: true,
      videoId: response.data.id,
      url: `https://youtu.be/${response.data.id}`,
    };
  } catch (error: any) {
    console.error("Unified Engine Error during upload:", error);
    throw error;
  }
}
