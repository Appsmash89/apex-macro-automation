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

  async function toggleImpact(level: string) {
    const newThreshold = config.impact_threshold.includes(level)
      ? config.impact_threshold.filter(l => l !== level)
      : [...config.impact_threshold, level];
    
    const newConfig = { ...config, impact_threshold: newThreshold };
    setConfig(newConfig);

    startTransition(async () => {
      try {
        await updateConfig(newConfig);
      } catch (err) {
        console.error("Config update failed:", err);
      }
    });
  }

  return (
    <section className="bg-surface-std p-10 lg:p-12 rounded-2xl tactical-glow shadow-2xl relative overflow-hidden transition-all duration-500">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-xl font-black flex items-center gap-4 font-space uppercase tracking-tight text-bone">
          <Layers className="text-velocity-blue" size={24} />
          OVERRIDE_MATRIX
        </h2>
        <div className="flex items-center gap-3">
          {isPending ? (
            <div className="flex items-center gap-2 text-[10px] text-velocity-blue font-mono font-black animate-pulse uppercase bg-velocity-blue/5 px-2 py-1 rounded">
              <Loader2 size={12} className="animate-spin" />
              SYNCING
            </div>
          ) : (
            <span className="text-[10px] text-gray-600 font-mono font-black tracking-widest uppercase opacity-40">STATION_ALPHA // READY</span>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {["high", "medium", "low"].map((level) => (
          <div key={level} className="flex items-center justify-between p-6 bg-surface-base rounded-xl group transition-all duration-300 relative overflow-hidden">
            <div className="space-y-1 relative z-10">
              <p className="text-[10px] text-gray-500 font-mono font-black uppercase tracking-[0.2em] opacity-60">{level}_Gate</p>
              <p className={`text-sm font-black font-space uppercase tracking-[0.1em] ${config.impact_threshold.includes(level) ? 'text-velocity-blue glow-cyan' : 'text-white/20'}`}>
                {config.impact_threshold.includes(level) ? 'INTEGRATED' : 'BYPASSED'}
              </p>
            </div>
            
            {/* Physical Style Switch (No Border) */}
            <button
              onClick={() => toggleImpact(level)}
              disabled={isPending}
              className={`w-14 h-8 rounded-full p-1 transition-all duration-500 relative ${config.impact_threshold.includes(level) ? 'bg-velocity-blue/20' : 'bg-surface-std'}`}
            >
              <div 
                className={`w-5 h-5 rounded-full transition-all duration-500 transform shadow-[0_0_15px_rgba(0,209,255,0.4)] ${config.impact_threshold.includes(level) ? 'translate-x-6 bg-velocity-blue' : 'translate-x-0 bg-white/10'}`}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-4">
        <div className="flex justify-between items-center px-2">
            <span className="text-[10px] text-gray-700 font-mono uppercase tracking-widest font-black">STATION_AUTH: OMEGA_LEVEL</span>
            <span className="text-[10px] text-velocity-blue/40 font-mono font-black italic uppercase">SECURE_TOGGLE_v2.2</span>
        </div>
      </div>
    </section>
  );
}
