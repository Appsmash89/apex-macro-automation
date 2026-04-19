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
  Download,
  Eye,
  BarChart2,
  CheckCircle2,
  Clock
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
  broadcastHistory: any[];
}

/**
 * MISSION 2.4 Hardened: Strategic Dashboard Shell
 * Layout: Three-Tab Departmental Suite
 * Styling: Institutional War Room // YouTube Studio High-Density list
 */
export default function DashboardShell({ 
  latestNews, 
  config, 
  script, 
  roadmapMissions,
  assets,
  broadcastHistory
}: DashboardShellProps) {
  const [activeTab, setActiveTab] = useState<"INTELLIGENCE" | "ARCHITECT" | "STUDIO">("INTELLIGENCE");
  const [glowIntensity, setGlowIntensity] = useState(1);
  const [surfaceOffset, setSurfaceOffset] = useState(0);

  const tabs = [
    { id: "INTELLIGENCE", icon: Terminal, label: "Strategic Intelligence" },
    { id: "ARCHITECT", icon: Settings, label: "System Architect" },
    { id: "STUDIO", icon: Box, label: "Apex Studio" },
  ];

  const isPublished = (assetName: string) => {
    return broadcastHistory.some((entry: any) => entry.assetId === assetName);
  };

  return (
    <div 
      className="min-h-[calc(100vh-5rem)] flex flex-col"
      style={{ 
        // @ts-ignore
        "--primary-glow": `${glowIntensity * 0.4}`,
        "--surface-offset": `${surfaceOffset}px` 
      }}
    >
      {/* 1. TACTICAL TAB NAVIGATION (Hardened Nomenclature) */}
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
              <section className="bg-surface-low/30 rounded-3xl p-12 relative overflow-hidden group">
                <div className="flex items-center justify-between mb-12">
                  <h2 className="text-2xl font-black flex items-center gap-5 font-space uppercase tracking-tight">
                    <Terminal className="text-velocity-blue" size={30} />
                    INTELLIGENCE_RELAY
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {latestNews.slice(0, 3).map((news, idx) => (
                    <div key={idx} className="bg-surface-std p-8 rounded-2xl hover:bg-surface-high transition-all duration-500 group/item relative shadow-xl border border-white/5">
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
                SYSTEM_CALIBRATION
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div className="space-y-6">
                    <label className="text-[10px] text-gray-500 font-mono font-black uppercase tracking-[0.4em]">PRIMARY_GLOW_DENSITY</label>
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
                    <label className="text-[10px] text-gray-500 font-mono font-black uppercase tracking-[0.4em]">SURFACE_OFFSET_DEPTH</label>
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

              <div className="p-12 bg-surface-std rounded-2xl border border-white/5 shadow-inner">
                 <p className="text-xs text-velocity-blue/60 font-mono leading-relaxed italic">
                   // SYSTEM COMMAND: Interactive design tokens updated in real-time.
                   State is ephemeral to current cockpit session.
                 </p>
              </div>
            </section>
          )}

          {activeTab === "STUDIO" && (
            <section className="bg-surface-low/30 rounded-3xl p-12 space-y-10">
               <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black flex items-center gap-5 font-space uppercase tracking-tight">
                    <Box className="text-velocity-blue" size={30} />
                    CHANNEL_CONTENT
                  </h2>
                  <div className="flex items-center gap-6 font-mono text-[10px] text-gray-600 uppercase tracking-widest">
                     <div className="flex items-center gap-2">
                        <Activity size={12} className="text-velocity-blue animate-pulse" />
                        UPLINK: ACTIVE
                     </div>
                  </div>
               </div>

               {/* YOUTUBE STUDIO STYLE HIGH-DENSITY GRID */}
               <div className="space-y-4">
                  <div className="grid grid-cols-12 px-8 py-4 text-[9px] font-mono text-gray-600 uppercase tracking-[0.2em] border-b border-white/5">
                     <div className="col-span-5">Video / Metadata</div>
                     <div className="col-span-2 text-center">Visibility</div>
                     <div className="col-span-2 text-center">Restrictions</div>
                     <div className="col-span-2 text-center">Date</div>
                     <div className="col-span-1 text-right">Size</div>
                  </div>

                  {assets.map((asset, idx) => (
                    <div key={idx} className="grid grid-cols-12 px-8 py-6 bg-surface-std/50 hover:bg-surface-std rounded-2xl border border-white/5 transition-all duration-300 group/video items-center">
                       <div className="col-span-5 flex items-center gap-6">
                          <div className="w-24 h-14 bg-surface-base rounded-lg relative overflow-hidden flex items-center justify-center border border-white/5 group-hover/video:border-velocity-blue/30 transition-colors">
                             {asset.endsWith(".mp4") ? <Video size={20} className="text-velocity-blue/50" /> : <Music size={20} className="text-sage-green/50" />}
                             {isPublished(asset) && (
                               <div className="absolute inset-0 bg-velocity-blue/5 flex items-center justify-center">
                                  <CheckCircle2 size={16} className="text-velocity-blue glow-cyan" />
                               </div>
                             )}
                          </div>
                          <div>
                             <h4 className="text-xs font-black font-space uppercase tracking-widest mb-1 group-hover/video:text-velocity-blue transition-colors">{asset}</h4>
                             <p className="text-[8px] text-gray-600 font-mono uppercase tracking-tighter">1080p // H.264 // STEREO</p>
                          </div>
                       </div>
                       
                       <div className="col-span-2 flex justify-center">
                          {isPublished(asset) ? (
                            <div className="flex items-center gap-2 px-3 py-1 bg-velocity-blue/10 rounded-full border border-velocity-blue/20">
                               <div className="w-1 h-1 rounded-full bg-velocity-blue glow-cyan"></div>
                               <span className="text-[8px] text-velocity-blue font-mono font-black uppercase tracking-widest">Public</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 px-3 py-1 bg-surface-base rounded-full border border-white/5 text-gray-600 font-mono text-[8px] font-black uppercase tracking-widest">
                               Staged
                            </div>
                          )}
                       </div>

                       <div className="col-span-2 text-center text-[9px] font-mono text-gray-700 uppercase">None</div>
                       
                       <div className="col-span-2 text-center">
                          <p className="text-[9px] font-mono text-gray-500 uppercase tracking-tighter">Apr 19, 2026</p>
                          <p className="text-[7px] text-gray-700 font-mono uppercase">Uploaded</p>
                       </div>

                       <div className="col-span-1 text-right text-[9px] font-mono text-velocity-blue/60 group-hover/video:text-velocity-blue transition-colors">
                          {asset.endsWith(".mp4") ? "24.2 MB" : "1.8 MB"}
                       </div>
                    </div>
                  ))}
               </div>

               <div className="flex justify-end gap-6 pt-6 border-t border-white/5 font-mono text-[9px] text-gray-700 uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Eye size={12} /> 12_OBJECTS_TRACKED</span>
                  <span className="flex items-center gap-2"><BarChart2 size={12} /> SYNCED_WITH_METADATA_ENGINE</span>
               </div>
            </section>
          )}
        </div>

        {/* SECTOR BETA (Side panel) */}
        <div className="col-span-12 lg:col-span-4 p-10 lg:p-14 bg-surface-low space-y-14 shadow-[-40px_0_60px_-15px_rgba(0,0,0,0.5)] z-10 border-l border-white/5">
           {/* Common Modules */}
           <section className="space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black flex items-center gap-5 font-space uppercase tracking-tight">
                <Cpu className="text-velocity-blue" size={30} />
                COMMAND_SCRIPT
              </h2>
            </div>

            <div className="bg-surface-std p-12 rounded-3xl space-y-12 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                   <Clock size={60} className="text-velocity-blue" />
               </div>
               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] text-gray-500 font-mono font-black uppercase tracking-[0.4em]">CONTENT_STREAM</label>
                  </div>
                  <div className="h-[250px] overflow-y-auto no-scrollbar pr-6 text-xs font-mono leading-loose text-gray-400 bg-surface-base/80 p-8 rounded-2xl border border-white/5 focus-within:border-velocity-blue/20 transition-all">
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
