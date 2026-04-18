"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

/**
 * MISSION 8.0: CONSOLIDATED PATHING
 * Reads directly from the project root.
 */
async function getRootPath(filename: string, subfolder: string = "") {
  return path.join(process.cwd(), subfolder, filename);
}

export async function getRoadmap() {
  const filePath = await getRootPath("ROADMAP.md");
  const content = await fs.readFile(filePath, "utf-8");
  return content;
}

export async function getConfig() {
  const filePath = await getRootPath("config.json");
  const content = await fs.readFile(filePath, "utf-8");
  return JSON.parse(content);
}

export async function getScript() {
  const filePath = await getRootPath("current_script.json", "data");
  const content = await fs.readFile(filePath, "utf-8");
  return JSON.parse(content);
}

export async function updateConfig(newConfig: any) {
  const filePath = await getRootPath("config.json");
  await fs.writeFile(filePath, JSON.stringify(newConfig, null, 4));
  revalidatePath("/");
}

export async function updateRoadmap(newContent: string) {
  const filePath = await getRootPath("ROADMAP.md");
  await fs.writeFile(filePath, newContent);
  revalidatePath("/");
}

// MISSION 7/8: Automated YouTube Trigger
export async function publishToYouTube() {
  // Now located in the /backend folder
  const scriptPath = path.join(process.cwd(), "backend", "publisher_youtube.py");
  
  try {
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
