"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

const STATUS_PATH = path.join(process.cwd(), "data", "pipeline_status.json");

export async function getPipelineStatus() {
  try {
    const content = await fs.readFile(STATUS_PATH, "utf-8");
    return JSON.parse(content);
  } catch (err) {
    return null;
  }
}

export async function updatePipelineStage(stage: number, status: "idle" | "running" | "complete" | "error") {
  try {
    const content = await fs.readFile(STATUS_PATH, "utf-8");
    const data = JSON.parse(content);
    
    data.current_stage = stage;
    if (data.stages[stage.toString()]) {
      data.stages[stage.toString()].status = status;
    }
    
    // Add log entry
    const timestamp = new Date().toLocaleTimeString();
    data.logs.unshift(`[${timestamp}] Stage ${stage}: ${status.toUpperCase()}`);
    if (data.logs.length > 10) data.logs.pop();

    await fs.writeFile(STATUS_PATH, JSON.stringify(data, null, 4));
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

export async function setPipelinePause(stage: number, paused: boolean) {
  try {
    const content = await fs.readFile(STATUS_PATH, "utf-8");
    const data = JSON.parse(content);
    
    data.is_paused = paused;
    
    const timestamp = new Date().toLocaleTimeString();
    data.logs.unshift(`[${timestamp}] PIPELINE_${paused ? "PAUSED" : "RESUMED"} at Stage ${stage}`);
    if (data.logs.length > 10) data.logs.pop();

    await fs.writeFile(STATUS_PATH, JSON.stringify(data, null, 4));
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return { success: false };
  }
}

/**
 * MISSION 3.1: Native Telemetry Ingestion
 * High-speed logging utility for child_process stdout.
 */
export async function addPipelineLog(message: string, truncate: boolean = false) {
  try {
    const content = await fs.readFile(STATUS_PATH, "utf-8");
    const data = JSON.parse(content);
    
    const timestamp = new Date().toLocaleTimeString();
    data.logs.unshift(`[${timestamp}] ${message}`);
    
    // Keep logs manageable but informative for the War Room
    if (data.logs.length > 20) data.logs.pop();

    await fs.writeFile(STATUS_PATH, JSON.stringify(data, null, 4));
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return { success: false };
  }
}

export async function toggleManualPauseGate(stage: string, enabled: boolean) {
    try {
      const content = await fs.readFile(STATUS_PATH, "utf-8");
      const data = JSON.parse(content);
      
      if (data.stages[stage]) {
        data.stages[stage].manual_pause = enabled;
      }
  
      await fs.writeFile(STATUS_PATH, JSON.stringify(data, null, 4));
      revalidatePath("/");
      return { success: true };
    } catch (err) {
      return { success: false };
    }
}
