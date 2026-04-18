"use server";

import { cookies } from "next/headers";

export async function login(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD || "ADMIN_DISABLED_FOR_ALPHA";

  if (password === adminPassword) {
    // Set a simple session cookie
    // In a real production app, this would be a JWT or similar
    cookies().set("session-auth", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });
    return { success: true };
  }

  return { success: false, error: "Invalid Credentials" };
}

export async function logout() {
  cookies().delete("session-auth");
}
