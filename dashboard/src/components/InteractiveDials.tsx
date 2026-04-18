"use client";

import { useState, useTransition } from "react";
import { updateConfig } from "@/lib/actions";
import { Layers, Loader2, CheckCircle2 } from "lucide-react";

interface InteractiveDialsProps {
  initialConfig: {
    impact_threshold: string[];
    auto_mode: boolean;
  };
}

export default function InteractiveDials({ initialConfig }: InteractiveDialsProps) {
  const [config, setConfig] = useState(initialConfig);
  const [isPending, startTransition] = useTransition();
  const [lastSync, setLastSync] = useState<number | null>(null);

  async function toggleImpact(level: string) {
    const newThreshold = config.impact_threshold.includes(level)
      ? config.impact_threshold.filter(l => l !== level)
      : [...config.impact_threshold, level];
    
    const newConfig = { ...config, impact_threshold: newThreshold };
    setConfig(newConfig);

    startTransition(async () => {
      try {
        await updateConfig(newConfig);
        setLastSync(Date.now());
        setTimeout(() => setLastSync(null), 3000);
      } catch (err) {
        console.error("Config update failed:", err);
      }
    });
  }

  return (
    <section className="bg-surface p-10 lg:p-12 rounded-2xl tactical-glow border border-cyan-400/5 shadow-2xl">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl font-black flex items-center gap-4 font-space uppercase tracking-tight">
          <Layers className="text-cyan-400" size={28} />
          OVERRIDE MATRIX
        </h2>
        <div className="flex flex-col items-end">
          {isPending ? (
            <div className="flex items-center gap-3 text-sm text-cyan-400 font-mono font-black animate-pulse bg-cyan-400/5 px-3 py-1 rounded-md">
              <Loader2 size={16} className="animate-spin" />
              SYNCING_CONFIG
            </div>
          ) : lastSync ? (
            <div className="flex items-center gap-3 text-sm text-emerald-400 font-mono font-black bg-emerald-400/5 px-3 py-1 rounded-md">
              <CheckCircle2 size={16} />
              SYNC_SUCCESS
            </div>
          ) : (
            <span className="text-sm text-gray-500 font-mono font-bold tracking-widest bg-surface-low px-3 py-1 rounded-md uppercase border border-white/5">Link_Active</span>
          )}
        </div>
      </div>

      <div className="space-y-10">
        {["high", "medium", "low"].map((level) => (
          <button
            key={level}
            onClick={() => toggleImpact(level)}
            disabled={isPending}
            className="w-full group text-left space-y-4 block focus:outline-none transition-all"
          >
            <div className="flex justify-between items-end px-2">
              <p className={`text-sm font-mono font-black uppercase tracking-[0.2em] transition-colors ${config.impact_threshold.includes(level) ? 'text-gray-100' : 'text-gray-600'}`}>
                {level}_Intel_Gate
              </p>
              <p className={`text-base font-black font-space uppercase transition-all tracking-wider ${config.impact_threshold.includes(level) ? 'text-cyan-400 scale-105' : 'text-gray-700'}`}>
                {config.impact_threshold.includes(level) ? 'OPERATIONAL' : 'BYPASSED'}
              </p>
            </div>
            <div className="h-4 bg-surface-low rounded-xl overflow-hidden border border-white/5 p-1">
              <div 
                className={`h-full transition-all duration-700 rounded-lg ${config.impact_threshold.includes(level) ? 'bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_20px_rgba(0,209,255,0.4)] w-full' : 'bg-surface-mid w-0 opacity-20'}`}
              ></div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
