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
    <section className="bg-surface p-10 lg:p-12 rounded-2xl tactical-glow border border-white/5 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-xl font-black flex items-center gap-4 font-space uppercase tracking-tight text-bone">
          <Layers className="text-sage-green" size={24} />
          OVERRIDE_MATRIX
        </h2>
        <div className="flex items-center gap-3">
          {isPending ? (
            <div className="flex items-center gap-2 text-[10px] text-sage-green font-mono font-black animate-pulse uppercase bg-sage-green/5 px-2 py-1 rounded">
              <Loader2 size={12} className="animate-spin" />
              SYNCING
            </div>
          ) : (
            <span className="text-[10px] text-gray-600 font-mono font-black tracking-widest uppercase">STATION_ALPHA // READY</span>
          )}
        </div>
      </div>

      <div className="space-y-8">
        {["high", "medium", "low"].map((level) => (
          <div key={level} className="flex items-center justify-between p-6 bg-surface-low rounded-xl border border-white/5 group transition-all hover:border-sage-green/20">
            <div className="space-y-1">
              <p className="text-[10px] text-gray-500 font-mono font-black uppercase tracking-[0.2em]">{level}_Gate</p>
              <p className={`text-sm font-black font-space uppercase tracking-widest ${config.impact_threshold.includes(level) ? 'text-sage-green dream-pop-glow-sage' : 'text-gray-700'}`}>
                {config.impact_threshold.includes(level) ? 'LINKED' : 'BYPASSED'}
              </p>
            </div>
            
            {/* Physical Style Switch */}
            <button
              onClick={() => toggleImpact(level)}
              disabled={isPending}
              className={`w-14 h-8 rounded-full p-1 transition-all duration-300 relative border ${config.impact_threshold.includes(level) ? 'bg-sage-green/20 border-sage-green' : 'bg-surface-mid border-white/10'}`}
            >
              <div 
                className={`w-5 h-5 rounded-full transition-all duration-300 transform shadow-lg ${config.impact_threshold.includes(level) ? 'translate-x-6 bg-sage-green dream-pop-glow-sage' : 'translate-x-0 bg-gray-600'}`}
              />
            </button>
          </div>
        ))}
      </div>

      <p className="mt-8 text-[10px] text-gray-700 font-mono uppercase tracking-widest italic text-center opacity-40">
        MISSION_2_CONTROL // SECURE_TOGGLE_v1
      </p>
    </section>
  );
}
