"use server";

import fs from "fs/promises";
import path from "path";

const ROOT_DIR = path.join(process.cwd(), "..");

export async function getRoadmap() {
  const content = await fs.readFile(path.join(ROOT_DIR, "ROADMAP.md"), "utf-8");
  return content;
}

export async function getConfig() {
  const content = await fs.readFile(path.join(ROOT_DIR, "config.json"), "utf-8");
  return JSON.parse(content);
}

export async function getScript() {
  const content = await fs.readFile(path.join(ROOT_DIR, "data", "current_script.json"), "utf-8");
  return JSON.parse(content);
}

export async function updateConfig(newConfig: any) {
  await fs.writeFile(path.join(ROOT_DIR, "config.json"), JSON.stringify(newConfig, null, 4));
}

export async function updateRoadmap(newContent: string) {
  await fs.writeFile(path.join(ROOT_DIR, "ROADMAP.md"), newContent);
}
