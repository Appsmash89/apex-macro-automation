"use client";

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label: string;
}

/**
 * MISSION 2.6: Tactical Toggle Switch
 * High-fidelity parameter control for Architect mode.
 */
export default function Toggle({ enabled, onChange, label }: ToggleProps) {
  return (
    <div className="flex items-center justify-between p-6 bg-surface-base rounded-2xl border border-white/5 hover:border-velocity-blue/20 transition-all group">
      <span className="text-[10px] text-gray-400 font-mono font-black uppercase tracking-[0.3em] group-hover:text-velocity-blue transition-colors">
        {label}
      </span>
      <button
        onClick={() => onChange(!enabled)}
        className={`w-14 h-7 rounded-full transition-all duration-500 relative flex items-center px-1 shadow-inner ${
          enabled ? "bg-velocity-blue/20" : "bg-surface-std"
        }`}
      >
        <div 
          className={`w-5 h-5 rounded-full transition-all duration-500 shadow-xl ${
            enabled 
              ? "translate-x-7 bg-velocity-blue glow-cyan" 
              : "translate-x-0 bg-gray-600"
          }`}
        />
      </button>
    </div>
  );
}
