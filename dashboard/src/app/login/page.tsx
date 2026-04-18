"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import { Shield, Lock, Terminal, Globe, ChevronRight } from "lucide-react";

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
    <main className="min-h-screen bg-obsidian text-[#FAF9F5] flex items-center justify-center p-6 relative overflow-hidden">
      {/* BACKGROUND ELEMENTS (Scanlines / Ambient) */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-5">
        <div className="w-full h-full bg-[linear-gradient(rgba(0,209,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,209,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="w-full max-w-[420px] relative z-10">
        {/* LOGO AREA */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-surface-low border border-cyan-400/20 rounded-full flex items-center justify-center mb-6 tactical-glow">
            <Shield className="text-cyan-400 w-8 h-8 animate-pulse" />
          </div>
          <h1 className="text-xl font-bold tracking-[0.3em] font-space text-cyan-400 uppercase">ACCESS_VERIFICATION</h1>
          <p className="text-[10px] text-gray-500 font-mono tracking-widest mt-2 flex items-center gap-2">
            <Globe size={10} className="text-cyan-400/50" />
            STATION: DCC_ALPHA // PROT_LVL: OMEGA
          </p>
        </div>

        {/* AUTH FORM */}
        <div className="bg-surface p-8 lg:p-10 rounded-xl tactical-glow transition-all">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <label className="text-[9px] text-cyan-400/40 font-mono uppercase tracking-widest block font-bold">Encrypted_Input</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="text-cyan-400/30 group-focus-within:text-cyan-400 transition-colors" size={18} />
                </div>
                <input
                  type="password"
                  placeholder="ADMIN_PASS_KEY"
                  className="block w-full pl-12 pr-4 py-4 bg-surface-low border-b-2 border-cyan-400/10 focus:border-cyan-400/60 rounded-t-lg text-[#FAF9F5] placeholder:text-gray-700 focus:outline-none transition-all font-mono text-sm tracking-widest"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-950/20 border-l-2 border-red-500 p-4 rounded text-[10px] items-center flex gap-3 text-red-400 font-mono">
                <Terminal size={14} />
                <span>ERR_ACCESS: {error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-surface-mid hover:bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 hover:text-cyan-300 py-5 rounded-lg font-space font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
            >
              <Terminal size={18} className="group-hover:rotate-12 transition-transform" />
              {loading ? "AUTHENTICATING..." : "INITIALIZE_COMMAND"}
              <ChevronRight size={16} className="ml-auto opacity-40" />
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-cyan-400/5 flex flex-col items-center gap-4">
            <p className="text-gray-600 text-[9px] font-mono tracking-tighter text-center leading-relaxed italic opacity-50">
              BY_AUTHENTICATING_YOU_ACCEPT_FULL_LIABILITY<br />
              FOR_MACRO_SYNCHRONIZATION_OUTCOMES
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
