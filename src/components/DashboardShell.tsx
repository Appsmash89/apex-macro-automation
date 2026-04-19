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
  Clock,
  Lock
} from "lucide-react";
import InteractiveDials from "./InteractiveDials";
import InteractiveWarRoom from "./InteractiveWarRoom";
import InteractivePublish from "./InteractivePublish";
import MacroTicker from "./MacroTicker";
import Toggle from "./Toggle";
import { toggleAutoMode } from "@/lib/actions";

interface DashboardShellProps {
  latestNews: any[];
  config: any;
  script: any;
  roadmapMissions: any[];
  assets: string[];
  broadcastHistory: any[];
}

/**
 * MISSION 2.6: Institutional Tabbed Suite
 * Layout: Top-Nav Departments with Tonal Surface Hierarchy.
 * High-Fidelity: Institutional authority through data density and precise calibration.
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
  const [tacticalGlow, setTacticalGlow] = useState(1);
  const [surfaceLayer1, setSurfaceLayer1] = useState(0);
  const [autoPublish, setAutoPublish] = useState(config.auto_mode || false);

  const tabs = [
    { id: "INTELLIGENCE", icon: Terminal, label: "Strategic Intelligence" },
    { id: "ARCHITECT", icon: Settings, label: "System Architect" },
    { id: "STUDIO", icon: Box, label: "Apex Studio" },
  ];

  const isPublished = (assetName: string) => {
    return broadcastHistory.some((entry: any) => entry.assetId === assetName);
  };

  const handleToggleAutoMode = async (enabled: boolean) => {
    setAutoPublish(enabled);
    await toggleAutoMode(enabled);
  };

  return (
    <div 
      className="min-h-[calc(100vh-5rem)] flex flex-col"
      style={{ 
        // @ts-ignore
        "--tactical-glow": `${tacticalGlow * 0.4}`,
        "--surface-layer-1": `${surfaceLayer1}px` 
      }}
    >
      {/* 1. INSTITUTIONAL TOP NAVIGATION (Surface Shift: Midnight Onyx -> Surface Low) */}
      <nav className="h-16 bg-surface-low/95 backdrop-blur-xl flex items-center px-10 gap-2 border-b border-white/5 sticky top-20 z-40 shadow-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-4 px-8 h-full font-space font-black uppercase text-[10px] tracking-[0.2em] transition-all duration-500 relative group overflow-hidden ${
              activeTab === tab.id ? "text-velocity-blue" : "text-gray-600 hover:text-gray-400"
            }`}
          >
            <tab.icon size={16} className={activeTab === tab.id ? "glow-cyan" : ""} />
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-velocity-blue glow-cyan"></div>
            )}
            <div className="absolute inset-0 bg-velocity-blue/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 pointer-events-none"></div>
          </button>
        ))}
        
        <div className="ml-auto flex items-center gap-6">
           <div className="flex items-center gap-4 px-6 py-2 bg-surface-base/80 rounded-full border border-white/5">
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${autoPublish ? "bg-velocity-blue glow-cyan" : "bg-market-crimson"}`}></div>
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">AUTO_MODE: {autoPublish ? "ENGAGED" : "OFFLINE"}</span>
           </div>
        </div>
      </nav>

      <div className="flex-1 grid grid-cols-12">
        {/* SECTOR ALPHA: MISSION CONTROL (Main content) */}
        <div className="col-span-12 lg:col-span-8 p-10 lg:p-14 space-y-14 bg-surface-base">
          {activeTab === "INTELLIGENCE" && (
            <div className="space-y-14 flex flex-col min-h-full">
              <section className="bg-surface-low/30 rounded-3xl p-12 relative overflow-hidden group border border-white/5">
                <div className="flex items-center justify-between mb-12">
                  <h2 className="text-2xl font-black flex items-center gap-5 font-space uppercase tracking-tight">
                    <Terminal className="text-velocity-blue" size={30} />
                    NARRATIVE_MATRIX
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {latestNews.slice(0, 3).map((news, idx) => (
                    <div key={idx} className="bg-surface-std/50 p-8 rounded-2xl hover:bg-surface-high transition-all duration-500 group/item relative shadow-xl border border-white/5">
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-[9px] text-velocity-blue font-mono font-black uppercase tracking-widest bg-velocity-blue/10 px-3 py-1 rounded border border-velocity-blue/10">
                          {news.currency} // {news.impact}
                        </span>
                      </div>
                      <h3 className="text-lg font-black font-space leading-tight mb-6 uppercase tracking-wide group-hover/item:text-velocity-blue transition-colors">
                        {news.event}
                      </h3>
                    </div>
                  ))}
                </div>
              </section>

              <InteractiveDials initialConfig={config} />
              
              <div className="mt-auto pt-10">
                 <MacroTicker news={latestNews} />
              </div>
            </div>
          )}

          {activeTab === "ARCHITECT" && (
            <section className="bg-surface-low/30 rounded-3xl p-12 space-y-12 border border-white/5">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black flex items-center gap-5 font-space uppercase tracking-tight">
                  <Settings className="text-velocity-blue" size={30} />
                  PARAMETER_MATRIX
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div className="space-y-12">
                   <div className="space-y-6">
                      <label className="text-[10px] text-gray-500 font-mono font-black uppercase tracking-[0.4em]">TACTICAL_GLOW_INTENSITY</label>
                      <input 
                        type="range" min="0" max="2" step="0.1" 
                        value={tacticalGlow}
                        onChange={(e) => setTacticalGlow(parseFloat(e.target.value))}
                        className="w-full accent-velocity-blue bg-surface-std h-2 rounded-full appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between font-mono text-[9px] text-gray-600">
                         <span>0.0</span>
                         <span>{tacticalGlow.toFixed(1)}</span>
                         <span>2.0</span>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <label className="text-[10px] text-gray-500 font-mono font-black uppercase tracking-[0.4em]">SURFACE_LAYER_1_OFFSET</label>
                      <input 
                        type="range" min="-20" max="20" step="1" 
                        value={surfaceLayer1}
                        onChange={(e) => setSurfaceLayer1(parseInt(e.target.value))}
                        className="w-full accent-velocity-blue bg-surface-std h-2 rounded-full appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between font-mono text-[9px] text-gray-600">
                         <span>-20PX</span>
                         <span>{surfaceLayer1}PX</span>
                         <span>+20PX</span>
                      </div>
                   </div>
                 </div>

                 <div className="space-y-8">
                    <Toggle 
                      enabled={autoPublish} 
                      onChange={handleToggleAutoMode} 
                      label="Automated Broadcast Mode" 
                    />
                    <div className="p-8 bg-surface-base rounded-2xl border border-white/5 space-y-4">
                       <h4 className="text-[10px] font-black font-space uppercase text-velocity-blue">PROTOCOL_NOTES</h4>
                       <p className="text-[9px] text-gray-500 font-mono leading-relaxed uppercase tracking-widest">
                         // Auto-publish mode enables lights-out distribution of generated assets.
                         // Parameter shifts are transient to session.
                       </p>
                    </div>
                 </div>
              </div>
            </section>
          )}

          {activeTab === "STUDIO" && (
            <section className="bg-surface-low/30 rounded-3xl p-12 space-y-10 border border-white/5">
               <h2 className="text-2xl font-black flex items-center gap-5 font-space uppercase tracking-tight">
                <Box className="text-velocity-blue" size={30} />
                APEX_STUDIO_TERMINAL
              </h2>

               <div className="space-y-2">
                  {assets.map((asset, idx) => (
                    <div key={idx} className="grid grid-cols-12 px-8 py-6 bg-surface-std/30 hover:bg-surface-std/80 rounded-2xl border border-white/5 transition-all duration-300 group/video items-center">
                       <div className="col-span-6 flex items-center gap-6">
                          <div className="w-24 h-14 bg-surface-base rounded-lg relative overflow-hidden flex items-center justify-center border border-white/5">
                             {asset.endsWith(".mp4") ? <Video size={20} className="text-velocity-blue/30" /> : <Music size={20} className="text-sage-green/30" />}
                             {isPublished(asset) && (
                               <div className="absolute inset-0 bg-velocity-blue/10 flex items-center justify-center">
                                  <Lock size={16} className="text-velocity-blue glow-cyan" />
                               </div>
                             )}
                          </div>
                          <div>
                             <h4 className="text-xs font-black font-space uppercase tracking-widest group-hover/video:text-velocity-blue transition-colors">{asset}</h4>
                             <p className="text-[8px] text-gray-700 font-mono uppercase mt-2">1080p // H.264 // STEREO</p>
                          </div>
                       </div>
                       
                       <div className="col-span-3 flex justify-center">
                          {isPublished(asset) ? (
                            <div className="flex items-center gap-2 px-4 py-1.5 bg-market-crimson/10 rounded-full border border-market-crimson/20">
                               <div className="w-1.5 h-1.5 rounded-full bg-market-crimson glow-crimson animate-pulse"></div>
                               <span className="text-[9px] text-market-crimson font-mono font-black uppercase tracking-widest">Locked</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 glow-sage"></div>
                               <span className="text-[9px] text-emerald-500 font-mono font-black uppercase tracking-widest">Staged</span>
                            </div>
                          )}
                       </div>

                       <div className="col-span-3 text-right">
                          <button className="p-3 bg-surface-base hover:bg-surface-std text-gray-600 hover:text-velocity-blue rounded-xl border border-white/5 transition-all group/btn relative overflow-hidden">
                             <Download size={16} className="relative z-10" />
                          </button>
                       </div>
                    </div>
                  ))}
               </div>
            </section>
          )}
        </div>

        {/* SECTOR BETA: MISSION ARCHITECTURE (4 Cols) */}
        <div className="col-span-12 lg:col-span-4 p-10 lg:p-14 bg-surface-low space-y-14 shadow-[-40px_0_60px_-15px_rgba(0,0,0,0.5)] z-10 border-l border-white/5">
           <section className="space-y-10">
            <h2 className="text-2xl font-black flex items-center gap-5 font-space uppercase tracking-tight">
              <Cpu className="text-velocity-blue" size={30} />
              COMMAND_SCRIPT
            </h2>

            <div className="bg-surface-std p-12 rounded-3xl space-y-12 shadow-2xl relative border border-white/5">
               <div className="space-y-6">
                  <label className="text-[10px] text-gray-500 font-mono font-black uppercase tracking-[0.4em]">CONTENT_STREAM</label>
                  <div className="h-[250px] overflow-y-auto no-scrollbar pr-6 text-xs font-mono leading-loose text-gray-400 bg-surface-base/80 p-8 rounded-2xl border border-white/5">
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
