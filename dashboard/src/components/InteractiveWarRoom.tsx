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
    <section className="bg-surface p-10 lg:p-12 rounded-2xl tactical-glow flex flex-col h-[600px] border border-cyan-400/5 shadow-2xl">
      <div className="flex items-center justify-between mb-10 flex-shrink-0">
        <h2 className="text-2xl font-black flex items-center gap-4 font-space uppercase tracking-tight">
          <Activity className="text-cyan-400" size={28} />
          THE WAR ROOM
        </h2>
        <div className="flex items-center gap-3 bg-cyan-400/5 px-4 py-1.5 rounded-full border border-cyan-400/20">
           <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></span>
           <span className="text-sm text-cyan-400 font-mono font-black uppercase tracking-widest">LIVE_LOGS</span>
        </div>
      </div>

      <div className="relative flex-grow overflow-y-auto no-scrollbar scroll-smooth pr-4 group/scroll">
        <div className="relative pl-10 space-y-16">
          {/* Pulse Line */}
          <div className="absolute left-[3px] top-2 bottom-6 w-[2px] bg-gradient-to-b from-cyan-400/60 via-cyan-400/10 to-transparent"></div>
          
          {missions.map((mission, idx) => (
            <div key={idx} className="relative group animate-in fade-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
              {/* Node */}
              <div className={`absolute -left-[32px] top-2.5 w-3.5 h-3.5 rounded-full border-2 border-obsidian transition-all ${mission.status === 'complete' ? 'bg-cyan-400 shadow-[0_0_15px_rgba(0,209,255,1)]' : 'bg-surface-mid animate-pulse'}`}></div>
              
              <div className="bg-surface-low/30 hover:bg-surface-low/60 p-8 rounded-xl border-l-4 border-transparent hover:border-cyan-400/60 transition-all cursor-default group-hover:shadow-[0_0_30px_rgba(0,209,255,0.05)]">
                <div className="flex justify-between items-start mb-4 gap-4">
                  <h3 className={`text-base font-black font-space tracking-wider uppercase transition-colors ${mission.status === 'complete' ? 'text-gray-100' : 'text-cyan-400'}`}>
                    {mission.title}
                  </h3>
                  <span className={`text-xs font-mono font-black px-3 py-1 rounded-md uppercase tracking-widest border ${mission.status === 'complete' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'}`}>
                    {mission.status}
                  </span>
                </div>
                
                <ul className="space-y-3">
                  {mission.details.map((detail, dIdx) => (
                    <li key={dIdx} className="text-sm text-gray-400 font-mono flex items-start gap-3 leading-relaxed">
                      <ChevronRight size={16} className="text-cyan-400/40 mt-1 flex-shrink-0" />
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
      
      <div className="mt-8 pt-6 border-t border-cyan-400/5 flex justify-between items-center flex-shrink-0">
        <p className="text-sm text-gray-500 font-mono uppercase tracking-widest font-bold">Log_Depth: {missions.length}_Entries</p>
        <span className="text-xs text-cyan-400/30 font-mono font-black italic">STATION_ALPHA // SCROLL_STABLE</span>
      </div>
    </section>
  );
}
