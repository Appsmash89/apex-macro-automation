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

export async function getBroadcastHistory() {
  const filePath = path.join(process.cwd(), "data", "broadcast_history.json");
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch (err) {
    return [];
  }
}

export async function toggleAutoMode(enabled: boolean) {
  const filePath = path.join(process.cwd(), "shared", "config.json");
  try {
    const content = await fs.readFile(filePath, "utf-8");
    const config = JSON.parse(content);
    config.auto_mode = enabled;
    await fs.writeFile(filePath, JSON.stringify(config, null, 4));
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error("Auto Mode Toggle Failed:", err);
    return { success: false };
  }
}

import { getPipelineStatus as getStatus, updatePipelineStage, setPipelinePause, addPipelineLog } from "./pipeline";
import { spawn } from "child_process";

export async function getPipelineStatus() {
  return await getStatus();
}

/**
 * MISSION 3.1: Native Engine Trigger
 * Executes local Python agents directly from the Node.js server.
 * Pushes telemetry logs into the pipeline status registry.
 */
export async function triggerNativeEngine(stage: number) {
  const commands: Record<number, string> = {
    1: "engines/intelligence/scout_forex.py",
    2: "engines/intelligence/analyst_engine.py",
    3: "engines/creative/director_visuals.py" // Note: v3 uses manim command usually
  };

  const scriptPath = commands[stage];
  if (!scriptPath) return { success: false, error: "Protocol Error: Invalid Stage ID" };

  console.log(`NATIVE_EXEC: Spawning Stage ${stage} Agent -> ${scriptPath}`);

  // 1. Initial State Update
  await updatePipelineStage(stage, "running");
  
  // 2. Spawn Subprocess
  const pythonProcess = spawn("python", [path.join(process.cwd(), scriptPath)]);

  // 3. Telemetry Pumping (Logs)
  pythonProcess.stdout.on("data", (data) => {
    const lines = data.toString().split("\n");
    lines.forEach((line: string) => {
      if (line.trim()) {
        addPipelineLog(`STAGE_${stage} >> ${line.trim()}`);
      }
    });
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`AGENT_ERR [${stage}]: ${data}`);
    addPipelineLog(`AGENT_ERR [${stage}] >> ${data.toString().trim()}`);
  });

  pythonProcess.on("error")?.((err) => {
    console.error(`AGENT_SPAWN_ERR [${stage}]: ${err.message}`);
    addPipelineLog(`AGENT_SPAWN_ERR [${stage}] >> ${err.message}`);
    updatePipelineStage(stage, "error");
  });

  pythonProcess.on("close", (code) => {
    console.log(`AGENT_DONE [${stage}]: Process exited with code ${code}`);
    if (code === 0) {
      updatePipelineStage(stage, "complete");
      addPipelineLog(`STAGE_${stage} // EXECUTION_SUCCESS`);
    } else {
      updatePipelineStage(stage, "error");
      addPipelineLog(`STAGE_${stage} // CRITICAL_FAILURE [EXIT_${code}]`);
    }
  });

  return { success: true, message: `System: Agent ${stage} deployed natively.` };
}

export async function resumePipeline(stage: number) {
    return await setPipelinePause(stage, false);
}

export async function pausePipeline(stage: number) {
    return await setPipelinePause(stage, true);
}

/**
 * MISSION 3.2.1: Verification Resume
 * Resets the stage status to 'running' to release the Python Handover loop.
 */
export async function resumeVerification(stage: number) {
    return await updatePipelineStage(stage, "running");
}
/**
 * MISSION 3.2.2: Force Reset Utility
 * Clears stuck 'running' states manually.
 */
export async function forceResetStage(stage: number) {
    return await updatePipelineStage(stage, "idle");
}
