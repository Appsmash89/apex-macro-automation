"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import { ShieldCheck, Lock } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(password);
    if (result.success) {
      router.push("/");
      router.refresh();
    } else {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1A1A1A] border border-[#4C6545]/20 p-10 rounded-xl shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#4C6545] p-4 rounded-full mb-4">
            <ShieldCheck className="text-[#FAF9F5] w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tighter text-[#FAF9F5] uppercase">Secure Access</h1>
          <p className="text-[#4C6545] text-xs font-mono tracking-widest mt-2">DIGITAL COMMAND CENTER</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="text-[#4C6545] w-5 h-5" />
            </div>
            <input
              type="password"
              placeholder="ENTER ADMIN PASSWORD"
              className="block w-full pl-10 pr-3 py-4 bg-[#121212] border border-[#4C6545]/30 rounded-lg text-[#FAF9F5] placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4C6545] transition-all font-mono"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-900 text-red-500 p-3 rounded text-sm text-center font-mono">
              // ACCESS_DENIED: {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4C6545] text-[#FAF9F5] py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-[#5a7a52] transition-colors disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Initialize Command"}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-600 text-[10px] font-mono leading-relaxed">
            WARNING: UNAUTHORIZED ACCESS ATTEMPTS ARE LOGGED. <br />
            IP_ADDRESS RECORDING: ACTIVE
          </p>
        </div>
      </div>
    </div>
  );
}
