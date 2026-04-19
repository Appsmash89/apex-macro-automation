"use client";

import { useState } from "react";
import { 
  Terminal, 
  Cpu, 
  Zap, 
  Shield, 
  Settings, 
  Box, 
  Activity,
  Maximize2,
  Video,
  Music,
  Download
} from "lucide-react";
import InteractiveDials from "./InteractiveDials";
import InteractiveWarRoom from "./InteractiveWarRoom";
import InteractivePublish from "./InteractivePublish";

interface DashboardShellProps {
  latestNews: any[];
  config: any;
  script: any;
  roadmapMissions: any[];
  assets: string[];
}

export default function DashboardShell({ 
  latestNews, 
  config, 
  script, 
  roadmapMissions,
  assets 
}: DashboardShellProps) {
  const [activeTab, setActiveTab] = useState<"INTELLIGENCE" | "ARCHITECT" | "STUDIO">("INTELLIGENCE");
  const [glowIntensity, setGlowIntensity] = useState(1);
  const [surfaceOffset, setSurfaceOffset] = useState(0);

  const tabs = [
    { id: "INTELLIGENCE", icon: Terminal, label: "Intelligence" },
    { id: "ARCHITECT", icon: Settings, label: "Architect" },
    { id: "STUDIO", icon: Box, label: "Studio" },
  ];

  return (
    <div 
      className="min-h-[calc(100vh-5rem)] flex flex-col"
      style={{ 
        // @ts-ignore
        "--primary-glow": `${glowIntensity * 0.4}`,
        "--surface-offset": `${surfaceOffset}px` 
      }}
    >
      {/* 1. TACTICAL TAB NAVIGATION */}
      <nav className="h-16 bg-surface-low/80 backdrop-blur-md flex items-center px-10 gap-2 border-b border-white/5 sticky top-20 z-40">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-4 px-8 h-full font-space font-black uppercase text-[10px] tracking-[0.2em] transition-all duration-500 relative group ${
              activeTab === tab.id ? "text-velocity-blue" : "text-gray-600 hover:text-gray-400"
            }`}
          >
            <tab.icon size={16} className={activeTab === tab.id ? "glow-cyan" : ""} />
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-velocity-blue glow-cyan"></div>
            )}
          </button>
        ))}
        
        <div className="ml-auto flex items-center gap-4 px-6 py-2 bg-surface-base/50 rounded-full">
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 glow-cyan animate-pulse"></div>
           <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">SYSTEM_PARITY: 100%</span>
        </div>
      </nav>

      <div className="flex-1 grid grid-cols-12">
        {/* SECTOR ALPHA (Main content) */}
        <div className="col-span-12 lg:col-span-8 p-10 lg:p-14 space-y-14">
          {activeTab === "INTELLIGENCE" && (
            <>
              {/* Narrative Matrix */}
              <section className="bg-surface-low/30 rounded-3xl p-12 relative overflow-hidden group">
                <div className="flex items-center justify-between mb-12">
                  <h2 className="text-2xl font-black flex items-center gap-5 font-space uppercase tracking-tight">
                    <Terminal className="text-velocity-blue" size={30} />
                    INTELLIGENCE_RELAY
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {latestNews.slice(0, 3).map((news, idx) => (
                    <div key={idx} className="bg-surface-std p-8 rounded-2xl hover:bg-surface-high transition-all duration-500 group/item relative shadow-xl">
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-[9px] text-velocity-blue font-mono font-black uppercase tracking-widest bg-velocity-blue/10 px-3 py-1 rounded">
                          {news.currency} // {news.impact}
                        </span>
                      </div>
                      <h3 className="text-lg font-black font-space leading-tight mb-6 uppercase tracking-wide group-hover/item:text-velocity-blue transition-colors">
                        {news.event}
                      </h3>
                      <div className="flex gap-4 opacity-50 font-mono text-[10px]">
                        <span>ACTUAL: {news.actual || "???"}</span>
                        <span>FORECAST: {news.forecast || "???"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <InteractiveDials initialConfig={config} />
            </>
          )}

          {activeTab === "ARCHITECT" && (
            <section className="bg-surface-low/30 rounded-3xl p-12 space-y-12">
              <h2 className="text-2xl font-black flex items-center gap-5 font-space uppercase tracking-tight">
                <Settings className="text-velocity-blue" size={30} />
                COCKPIT_CALIBRATION
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div className="space-y-6">
                    <label className="text-[10px] text-gray-500 font-mono font-black uppercase tracking-[0.4em]">GLOW_INTENSITY</label>
                    <input 
                      type="range" min="0" max="2" step="0.1" 
                      value={glowIntensity}
                      onChange={(e) => setGlowIntensity(parseFloat(e.target.value))}
                      className="w-full accent-velocity-blue bg-surface-std h-2 rounded-full appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between font-mono text-[9px] text-gray-600">
                       <span>0.0</span>
                       <span>{glowIntensity.toFixed(1)}</span>
                       <span>2.0</span>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <label className="text-[10px] text-gray-500 font-mono font-black uppercase tracking-[0.4em]">SURFACE_DEPTH_OFFSET</label>
                    <input 
                      type="range" min="-20" max="20" step="1" 
                      value={surfaceOffset}
                      onChange={(e) => setSurfaceOffset(parseInt(e.target.value))}
                      className="w-full accent-velocity-blue bg-surface-std h-2 rounded-full appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between font-mono text-[9px] text-gray-600">
                       <span>-20PX</span>
                       <span>{surfaceOffset}PX</span>
                       <span>+20PX</span>
                    </div>
                 </div>
              </div>

              <div className="p-12 bg-surface-std rounded-2xl border-none shadow-inner">
                 <p className="text-xs text-gray-500 font-mono leading-relaxed italic">
                   // Institutional design tokens are dynamically adjusted via the Architect Suite.
                   Changes are transient to this session.
                 </p>
              </div>
            </section>
          )}

          {activeTab === "STUDIO" && (
            <section className="bg-surface-low/30 rounded-3xl p-12 space-y-12">
               <h2 className="text-2xl font-black flex items-center gap-5 font-space uppercase tracking-tight">
                <Box className="text-velocity-blue" size={30} />
                MEDIA_ARTIFACTS
              </h2>

              <div className="grid grid-cols-1 gap-6">
                 {assets.map((asset, idx) => (
                   <div key={idx} className="bg-surface-std p-8 rounded-2xl flex items-center gap-8 group/asset hover:bg-surface-high transition-all duration-500">
                      <div className="p-4 bg-surface-base rounded-xl">
                         {asset.endsWith(".mp4") ? <Video className="text-velocity-blue" size={24} /> : <Music className="text-sage-green" size={24} />}
                      </div>
                      <div className="flex-1">
                         <h4 className="text-sm font-black font-space uppercase tracking-widest">{asset}</h4>
                         <p className="text-[9px] text-gray-600 font-mono uppercase mt-1">STATUS: PRODUCTION_READY // LOCAL_STORAGE</p>
                      </div>
                      <div className="flex items-center gap-4 opacity-0 group-hover/asset:opacity-100 transition-opacity">
                         <button className="p-3 bg-surface-base text-gray-500 hover:text-velocity-blue hover:bg-surface-std rounded-lg transition-all">
                            <Download size={16} />
                         </button>
                      </div>
                   </div>
                 ))}
              </div>
            </section>
          )}
        </div>

        {/* SECTOR BETA (Side panel) */}
        <div className="col-span-12 lg:col-span-4 p-10 lg:p-14 bg-surface-low space-y-14 shadow-[-40px_0_60px_-15px_rgba(0,0,0,0.5)] z-10">
           {/* Common Modules */}
           <section className="space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black flex items-center gap-5 font-space uppercase tracking-tight">
                <Cpu className="text-velocity-blue" size={30} />
                COMMAND_SCRIPT
              </h2>
            </div>

            <div className="bg-surface-std p-12 rounded-3xl space-y-12 shadow-2xl">
               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] text-gray-500 font-mono font-black uppercase tracking-[0.4em]">CONTENT_STREAM</label>
                  </div>
                  <div className="h-[250px] overflow-y-auto no-scrollbar pr-6 text-xs font-mono leading-loose text-gray-400 bg-surface-base/80 p-8 rounded-2xl">
                    {script.body || "NO_DATA_LINK_DETECTED"}
                  </div>
               </div>

               <InteractivePublish initialStatus={script.broadcast_status} />
            </div>
          </section>

          <InteractiveWarRoom missions={roadmapMissions} />
        </div>
      </div>
    </div>
  );
}
