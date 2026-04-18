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
    <section className="bg-surface p-10 lg:p-12 rounded-2xl tactical-glow flex flex-col h-[550px] border border-white/5 shadow-2xl">
      <div className="flex items-center justify-between mb-10 flex-shrink-0">
        <h2 className="text-xl font-black flex items-center gap-4 font-space uppercase tracking-tight text-bone">
          <Activity className="text-sage-green" size={24} />
          THE WAR ROOM
        </h2>
        <div className="flex items-center gap-3 bg-sage-green/5 px-4 py-1.5 rounded-full border border-sage-green/20">
           <span className="w-2 h-2 bg-sage-green rounded-full animate-pulse dream-pop-glow-sage"></span>
           <span className="text-[10px] text-sage-green font-mono font-black uppercase tracking-widest">LIVE_LOGS</span>
        </div>
      </div>

      <div className="relative flex-grow overflow-y-auto no-scrollbar scroll-smooth pr-4">
        <div className="relative pl-10 space-y-12">
          {/* Vertical Trace Line */}
          <div className="absolute left-[3px] top-2 bottom-6 w-[1px] bg-sage-green/20"></div>
          
          {missions.map((mission, idx) => (
            <div key={idx} className="relative group animate-in fade-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
              {/* Node */}
              <div className={`absolute -left-[32px] top-2.5 w-2.5 h-2.5 rounded-full border border-obsidian transition-all ${mission.status === 'complete' ? 'bg-sage-green dream-pop-glow-sage' : 'bg-surface-mid animate-pulse'}`}></div>
              
              <div className="bg-surface-low/30 hover:bg-surface-low/60 p-6 rounded-xl border-l-2 border-transparent hover:border-sage-green transition-all cursor-default">
                <div className="flex justify-between items-start mb-3 gap-4">
                  <h3 className={`text-sm font-black font-space tracking-wider uppercase transition-colors ${mission.status === 'complete' ? 'text-bone' : 'text-sage-green'}`}>
                    {mission.title}
                  </h3>
                  <span className={`text-[9px] font-mono font-black px-2 py-0.5 rounded uppercase tracking-widest border ${mission.status === 'complete' ? 'bg-sage-green/10 text-sage-green border-sage-green/20 dream-pop-glow-sage' : 'bg-amber-500/10 text-amber-500 border-amber-500/20 dream-pop-glow-amber'}`}>
                    {mission.status}
                  </span>
                </div>
                
                <ul className="space-y-2">
                  {mission.details.map((detail, dIdx) => (
                    <li key={dIdx} className="text-[12px] text-gray-500 font-mono flex items-start gap-3 leading-tight font-medium">
                      <ChevronRight size={14} className="text-sage-green/40 mt-0.5 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          
          <div className="h-4"></div>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center flex-shrink-0">
        <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest font-black">Entries: {missions.length}</p>
        <span className="text-[10px] text-sage-green/40 font-mono font-black italic uppercase">STATION_ALPHA</span>
      </div>
    </section>
  );
}
