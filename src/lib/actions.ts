"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { uploadToYouTube } from "../engines/distribution/youtube-publisher";

/**
 * MISSION 7.5: STATIC SCOPING
 * Replaced dynamic getRootPath with statically scoped path.join calls 
 * to resolve Vercel NFT/Turbopack trace warnings.
 */

export async function getRoadmap() {
  const filePath = path.join(process.cwd(), "ROADMAP.md");
  const content = await fs.readFile(filePath, "utf-8");
  return content;
}

export async function getConfig() {
  const filePath = path.join(process.cwd(), "shared", "config.json");
  const content = await fs.readFile(filePath, "utf-8");
  return JSON.parse(content);
}

export async function getScript() {
  const filePath = path.join(process.cwd(), "data", "current_script.json");
  const content = await fs.readFile(filePath, "utf-8");
  return JSON.parse(content);
}

export async function updateConfig(newConfig: any) {
  const filePath = path.join(process.cwd(), "shared", "config.json");
  await fs.writeFile(filePath, JSON.stringify(newConfig, null, 4));
  revalidatePath("/");
}

export async function updateRoadmap(newContent: string) {
  const filePath = path.join(process.cwd(), "ROADMAP.md");
  await fs.writeFile(filePath, newContent);
  revalidatePath("/");
}

/**
 * MISSION 7.2: UNIFIED ENGINE
 * Native Next.js Server Action for YouTube Distribution.
 * Eradicates the "Python not found" blocker on Vercel.
 */
export async function publishToYouTube() {
  console.log("Strategic Server Action: Triggering Unified Distribution Engine...");

  try {
    const result = await uploadToYouTube();

    return {
      success: true,
      output: `SUCCESS: Video Broadcasted! Video ID: ${result.videoId}`,
      url: result.url
    };
  } catch (error: any) {
    console.error("Unified Engine Failure:", error);
    return {
      success: false,
      error: error.message || "Unknown error during native distribution."
    };
  }
}
export async function getLatestNews() {
  const filePath = path.join(process.cwd(), "data", "latest_news.json");
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch (err) {
    console.error("Latest News Fetch Failed:", err);
    return [];
  }
}

export async function getAssets() {
  const dataPath = path.join(process.cwd(), "public", "data");
  try {
    const files = await fs.readdir(dataPath);
    return files.filter(f => f.endsWith(".mp4") || f.endsWith(".mp3"));
  } catch (err) {
    console.error("Asset Fetch Failed:", err);
    return [];
  }
}
