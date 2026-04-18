"use client";

import { Activity, ChevronRight } from "lucide-react";

interface Mission {
  title: string;
  status: string;
  details: string[];
}

interface InteractiveWarRoomProps {
  missions: Mission[];
}

export default function InteractiveWarRoom({ missions }: InteractiveWarRoomProps) {
  return (
    <section className="bg-surface p-8 lg:p-10 rounded-xl tactical-glow flex flex-col h-[520px]">
      <div className="flex items-center justify-between mb-8 flex-shrink-0">
        <h2 className="text-xl font-bold flex items-center gap-3 font-space uppercase tracking-tight">
          <Activity className="text-cyan-400" size={24} />
          THE WAR ROOM
        </h2>
        <div className="flex items-center gap-2">
           <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"></span>
           <span className="text-xs text-cyan-400/50 font-mono font-bold uppercase tracking-widest">LIVE_LOGS</span>
        </div>
      </div>

      <div className="relative flex-grow overflow-y-auto no-scrollbar scroll-smooth pr-2">
        <div className="relative pl-8 space-y-12">
          {/* Pulse Line */}
          <div className="absolute left-[3px] top-2 bottom-6 w-[1px] bg-gradient-to-b from-cyan-400/60 via-cyan-400/10 to-transparent"></div>
          
          {missions.map((mission, idx) => (
            <div key={idx} className="relative group animate-in fade-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
              {/* Node */}
              <div className={`absolute -left-[29px] top-2 w-2.5 h-2.5 rounded-full border border-obsidian transition-all ${mission.status === 'complete' ? 'bg-cyan-400 shadow-[0_0_12px_rgba(0,209,255,1)]' : 'bg-surface-mid animate-pulse'}`}></div>
              
              <div className="bg-surface-low/30 hover:bg-surface-low/60 p-6 rounded-lg border-l-2 border-transparent hover:border-cyan-400/40 transition-all cursor-default group-hover:tactical-glow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className={`text-sm font-bold font-space tracking-wider uppercase transition-colors ${mission.status === 'complete' ? 'text-gray-100' : 'text-cyan-400/80'}`}>
                    {mission.title}
                  </h3>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${mission.status === 'complete' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-cyan-500/10 text-cyan-400'}`}>
                    {mission.status.toUpperCase()}
                  </span>
                </div>
                
                <ul className="space-y-2">
                  {mission.details.map((detail, dIdx) => (
                    <li key={dIdx} className="text-xs text-gray-400 font-mono flex items-start gap-3 leading-relaxed">
                      <ChevronRight size={14} className="text-cyan-400/30 mt-0.5 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          
          {/* Feed End Spacer */}
          <div className="h-10"></div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-cyan-400/5 flex justify-between items-center flex-shrink-0">
        <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">Showing last {missions.length} tactical missions</p>
        <span className="text-[10px] text-cyan-400/30 font-mono">SCROLL_FOR_HISTORY_v7</span>
      </div>
    </section>
  );
}
