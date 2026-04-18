"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

// 1. Robust Pathing: Check local 'src' (Vercel) then fall back to parent directory (Local Dev)
async function getRobustPath(filename: string, subfolder: string = "") {
  const localSrcPath = path.join(process.cwd(), "src", subfolder, filename);
  const localRootPath = path.join(process.cwd(), subfolder, filename); 
  const devPath = path.join(process.cwd(), "..", subfolder, filename);

  try {
    await fs.access(localSrcPath);
    return localSrcPath;
  } catch {
    try {
      await fs.access(localRootPath);
      return localRootPath;
    } catch {
      return devPath;
    }
  }
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
    const backupPath = await getRobustPath("current_script.json"); 
    const content = await fs.readFile(backupPath, "utf-8");
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
