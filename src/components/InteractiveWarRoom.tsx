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
    <section className="bg-surface-std p-10 lg:p-12 rounded-2xl tactical-glow flex flex-col h-[550px] border-none shadow-2xl relative overflow-hidden transition-all duration-500">
      <div className="flex items-center justify-between mb-10 flex-shrink-0">
        <h2 className="text-xl font-black flex items-center gap-4 font-space uppercase tracking-tight text-bone">
          <Activity className="text-velocity-blue" size={24} />
          THE WAR ROOM
        </h2>
        <div className="flex items-center gap-3 bg-velocity-blue/5 px-4 py-1.5 rounded-full">
           <span className="w-2 h-2 bg-velocity-blue rounded-full animate-pulse glow-cyan"></span>
           <span className="text-[10px] text-velocity-blue font-mono font-black uppercase tracking-widest">LIVE_INTEL_LOGS</span>
        </div>
      </div>

      <div className="relative flex-grow overflow-y-auto no-scrollbar scroll-smooth pr-4">
        <div className="relative pl-12 space-y-4">
          {/* Vertical Trace Line (Asymmetric Offset) */}
          <div className="absolute left-[8px] top-2 bottom-6 w-[1px] bg-white/5"></div>
          
          {missions.map((mission, idx) => (
            <div 
              key={idx} 
              className={`relative group animate-in fade-in slide-in-from-left-4 duration-500 p-6 rounded-xl transition-all cursor-default ${idx % 2 === 0 ? 'bg-surface-low/40' : 'bg-surface-base/40'}`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Node (Velocity Blue Glow) */}
              <div className={`absolute -left-[32px] top-6 w-1.5 h-1.5 rounded-full border border-obsidian transition-all ${mission.status === 'complete' ? 'bg-velocity-blue glow-cyan scale-125' : 'bg-surface-high animate-pulse'}`}></div>
              
              <div className="flex justify-between items-start mb-4 gap-4">
                <div className="space-y-1">
                   <h3 className={`text-sm font-black font-space tracking-wider uppercase transition-colors ${mission.status === 'complete' ? 'text-bone' : 'text-gray-600'}`}>
                     {mission.title}
                   </h3>
                   <div className="flex gap-2">
                      <span className={`text-[8px] font-mono font-black px-2 py-0.5 rounded uppercase tracking-widest bg-surface-high text-gray-400`}>
                        {idx % 3 === 0 ? "GEOPOLITICAL_EVENT" : idx % 3 === 1 ? "SYSTEM_UPDATE" : "MARKET_ANOMALY"}
                      </span>
                   </div>
                </div>
                <span className={`text-[9px] font-mono font-black px-2 py-0.5 rounded uppercase tracking-widest border-none ${mission.status === 'complete' ? 'bg-sage-green/20 text-sage-green' : 'bg-market-crimson/20 text-market-crimson'}`}>
                  {mission.status}
                </span>
              </div>
              
              <ul className="space-y-2">
                {mission.details.map((detail, dIdx) => (
                  <li key={dIdx} className="text-[11px] text-gray-500 font-mono flex items-start gap-4 leading-tight font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                    <ChevronRight size={12} className="text-velocity-blue/30 mt-0.5 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div className="h-4"></div>
        </div>
      </div>
      
      <div className="mt-8 pt-6 flex justify-between items-center flex-shrink-0 relative z-10">
        <p className="text-[10px] text-gray-700 font-mono uppercase tracking-widest font-black">ENTRIES_DETECTED: {missions.length}</p>
        <span className="text-[10px] text-velocity-blue/30 font-mono font-black italic uppercase">DCC_ALPHA_RELAY</span>
      </div>
    </section>
  );
}
