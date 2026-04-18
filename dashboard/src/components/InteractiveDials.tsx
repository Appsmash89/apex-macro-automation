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
      await updateConfig(newConfig);
      setLastSync(Date.now());
      setTimeout(() => setLastSync(null), 3000); // Hide success after 3s
    });
  }

  return (
    <section className="bg-surface p-8 rounded-xl tactical-glow">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-bold flex items-center gap-3 font-space">
          <Layers className="text-cyan-400" size={20} />
          OVERRIDE MATRIX
        </h2>
        {isPending ? (
          <div className="flex items-center gap-2 text-[11px] text-cyan-400 font-mono animate-pulse">
            <Loader2 size={12} className="animate-spin" />
            SYNCING_INTEL
          </div>
        ) : lastSync ? (
          <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-mono">
            <CheckCircle2 size={12} />
            SYNC_SUCCESS
          </div>
        ) : (
          <span className="text-[11px] text-gray-600 font-mono">STABLE</span>
        )}
      </div>

      <div className="space-y-8">
        {["high", "medium", "low"].map((level) => (
          <button
            key={level}
            onClick={() => toggleImpact(level)}
            disabled={isPending}
            className="w-full group text-left space-y-3 block focus:outline-none"
          >
            <div className="flex justify-between items-end">
              <p className={`text-xs font-mono uppercase tracking-widest transition-colors ${config.impact_threshold.includes(level) ? 'text-gray-300' : 'text-gray-600'}`}>
                {level}_Impact_Threshold
              </p>
              <p className={`text-sm font-bold font-space uppercase transition-all ${config.impact_threshold.includes(level) ? 'text-cyan-400 scale-105' : 'text-gray-700'}`}>
                {config.impact_threshold.includes(level) ? 'Active' : 'Bypassed'}
              </p>
            </div>
            <div className="h-2 bg-surface-mid rounded-full overflow-hidden border border-cyan-400/5">
              <div 
                className={`h-full transition-all duration-500 rounded-full ${config.impact_threshold.includes(level) ? 'bg-cyan-400 shadow-[0_0_10px_rgba(0,209,255,0.4)] w-full' : 'bg-gray-800 w-0'}`}
              ></div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
