"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import { Shield, Lock, Terminal, Globe, ChevronRight, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await login(password);
      if (result.success) {
        router.push("/");
        router.refresh();
      } else {
        setError(result.error);
        setLoading(false);
      }
    } catch (err) {
      console.error("Login attempt failed:", err);
      setError("SYSTEM_TIMEOUT: Connection to auth node failed.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-obsidian text-[#FAF9F5] flex items-center justify-center p-8 lg:p-12 relative overflow-hidden">
      {/* BACKGROUND ELEMENTS (Scanlines / Ambient) */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-10">
        <div className="w-full h-full bg-[linear-gradient(rgba(0,209,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,209,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="w-full max-w-[480px] relative z-10">
        {/* LOGO AREA */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-20 h-20 bg-surface-low border border-cyan-400/30 rounded-full flex items-center justify-center mb-8 tactical-glow shadow-[0_0_20px_rgba(0,209,255,0.2)]">
            <Shield className="text-cyan-400 w-10 h-10 animate-pulse" />
          </div>
          <h1 className="text-2xl font-black tracking-[0.3em] font-space text-cyan-400 uppercase">ACCESS_VERIFICATION</h1>
          <p className="text-sm text-gray-500 font-mono tracking-widest mt-4 flex items-center gap-3">
            <Globe size={14} className="text-cyan-400/50" />
            STATION: DCC_ALPHA // PROT_LVL: OMEGA
          </p>
        </div>

        {/* AUTH FORM */}
        <div className="bg-surface p-10 lg:p-12 rounded-2xl tactical-glow border border-cyan-400/5 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-6">
              <label className="text-sm text-cyan-400/60 font-mono uppercase tracking-[0.2em] block font-black border-l-2 border-cyan-400 pl-3">Encrypted_Pass_Key</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Lock className="text-cyan-400/30 group-focus-within:text-cyan-400 transition-colors" size={20} />
                </div>
                <input
                  type="password"
                  placeholder="ENTER_ADMIN_SECRET"
                  className="block w-full pl-14 pr-5 py-5 bg-surface-low border-b-2 border-cyan-400/20 focus:border-cyan-400 rounded-t-xl text-lg text-[#FAF9F5] placeholder:text-gray-700 focus:outline-none transition-all font-mono tracking-widest shadow-inner"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-950/40 border border-red-500/50 p-5 rounded-xl text-sm items-center flex gap-4 text-red-400 font-mono animate-in fade-in slide-in-from-top-2 duration-300">
                <AlertCircle size={20} className="flex-shrink-0" />
                <span className="font-bold tracking-tight uppercase">ERR_ACCESS: {error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-surface-mid hover:bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 hover:text-cyan-300 py-6 rounded-xl font-space font-black text-lg uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 group disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? (
                <>
                  <Terminal size={22} className="animate-spin" />
                  AUTHENTICATING...
                </>
              ) : (
                <>
                  <Terminal size={22} className="group-hover:translate-x-1 transition-transform" />
                  INITIALIZE_COMMAND
                </>
              )}
              <ChevronRight size={20} className="ml-auto opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
            </button>
          </form>

          <div className="mt-12 pt-10 border-t border-cyan-400/5 flex flex-col items-center gap-6">
            <p className="text-gray-600 text-[11px] font-mono tracking-tight text-center leading-relaxed italic opacity-40 uppercase">
              WARNING: UNAUTHORIZED_ACCESS_ATTEMPTS_ARE_LOGGED<br />
              IP_TRACKING_IN_EFFECT // SECTOR_GLOBAL_LOCK
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
