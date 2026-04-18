"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

// 1. Robust Pathing: Check local 'src/data_mirror' (Vercel) THEN 'src' THEN parent directory (Local Dev)
async function getRobustPath(filename: string, subfolder: string = "") {
  // Mirror Path (Primary for Vercel Builds)
  const mirrorPath = path.join(process.cwd(), "src", "data_mirror", filename);
  
  // Local Deployment Paths
  const localSrcPath = path.join(process.cwd(), "src", subfolder, filename);
  const localRootPath = path.join(process.cwd(), subfolder, filename); 
  
  // Local Dev Path (Parent Directory)
  const devPath = path.join(process.cwd(), "..", subfolder, filename);

  // Tactical verification loop
  const candidates = [mirrorPath, localSrcPath, localRootPath, devPath];
  
  for (const cand of candidates) {
    try {
      await fs.access(cand);
      return cand;
    } catch {
      continue;
    }
  }

  // Fallback to dev path if all else fails
  return devPath;
}

export async function getRoadmap() {
  const filePath = await getRobustPath("ROADMAP.md");
  const content = await fs.readFile(filePath, "utf-8");
  return content;
}

export async function getConfig() {
  const filePath = await getRobustPath("config.json");
  const content = await fs.readFile(filePath, "utf-8");
  return JSON.parse(content);
}

export async function getScript() {
  const filePath = await getRobustPath("current_script.json", "data");
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch {
    // If mirroring is active, it might be in data_mirror/current_script.json
    const mirrorPath = await getRobustPath("current_script.json"); 
    const content = await fs.readFile(mirrorPath, "utf-8");
    return JSON.parse(content);
  }
}

export async function updateConfig(newConfig: any) {
  const filePath = await getRobustPath("config.json");
  await fs.writeFile(filePath, JSON.stringify(newConfig, null, 4));
  revalidatePath("/");
}

export async function updateRoadmap(newContent: string) {
  const filePath = await getRobustPath("ROADMAP.md");
  await fs.writeFile(filePath, newContent);
  revalidatePath("/");
}

// MISSION 7: Automated YouTube Trigger
export async function publishToYouTube() {
  const scriptPath = path.join(process.cwd(), "..", "src", "publisher_youtube.py");
  
  try {
    // Attempting to run with 'python' (adjust if CEO uses 'python3')
    const { stdout, stderr } = await execAsync(`python "${scriptPath}"`);
    
    if (stderr) {
      console.error("Publisher Error Output:", stderr);
      return { success: false, error: stderr };
    }
    
    console.log("Publisher Output:", stdout);
    return { success: true, output: stdout };
  } catch (error: any) {
    console.error("Failed to execute publisher:", error);
    return { success: false, error: error.message };
  }
}
