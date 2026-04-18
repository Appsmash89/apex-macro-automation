import { getRoadmap, getConfig, getScript } from "@/lib/actions";
import InteractiveDials from "@/components/InteractiveDials";
import InteractiveWarRoom from "@/components/InteractiveWarRoom";
import InteractivePublish from "@/components/InteractivePublish";
import { 
  Terminal, 
  Settings, 
  ChevronRight, 
  Video, 
  Volume2, 
  Cpu, 
  Shield, 
  Globe,
  BarChart3,
  ArrowUpRight,
  Maximize2
} from "lucide-react";

export default async function DashboardPage() {
  const roadmapText = await getRoadmap();
  const config = await getConfig();
  const script = await getScript();

  // Parsing 10 most recent missions
  const roadmapMissions = roadmapText
    .split("##")
    .filter((m) => m.trim())
    .map((m) => {
      const lines = m.trim().split("\n");
      const title = lines[0].replace("Mission ", "").trim();
      const status = lines.some((l) => l.includes("[ ]")) ? "in-progress" : "complete";
      const details = lines.slice(1).filter((l) => l.trim().startsWith("-")).map(l => l.replace("- ", "").trim());
      return { title, status, details };
    })
    .reverse()
    .slice(0, 10);

  return (
    <main className="min-h-screen bg-obsidian text-[#FAF9F5] p-8 lg:p-16 selection:bg-cyan-400/30">
      {/* 1. TOP NAV OVERLAY (Institutional Standard) */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 gap-10 bg-surface-low/30 p-10 rounded-2xl tactical-glow border-l-8 border-cyan-400 shadow-2xl">
        <div className="space-y-4">
          <div className="flex items-center gap-6">
            <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_20px_rgba(0,209,255,1)]"></div>
            <h1 className="text-3xl font-black tracking-[0.2em] font-space text-cyan-400 uppercase">Sovereign Observer // V2.2</h1>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500 font-mono tracking-widest uppercase font-bold">
            <span className="flex items-center gap-2"><Globe size={16} className="text-cyan-400" /> DCC_STATION: DCC_ALPHA</span>
            <span className="hidden md:inline text-white/10">|</span>
            <span className="flex items-center gap-2 underline decoration-cyan-400/30 underline-offset-8 pointer-events-none">SECTOR: GLOBAL_MACRO_INTEL</span>
          </div>
        </div>
        
        <div className="flex gap-8">
          <div className="bg-surface p-6 rounded-xl text-center min-w-[170px] border border-cyan-400/10 shadow-lg">
            <p className="text-xs text-gray-500 font-mono uppercase mb-3 tracking-tighter opacity-70">BTC_REALTIME_FEED</p>
            <p className="text-2xl font-space font-black text-cyan-400 tracking-tight">$78,100.82</p>
          </div>
          <div className="bg-surface p-6 rounded-xl text-center min-w-[170px] border border-cyan-400/10 shadow-lg">
            <p className="text-xs text-gray-500 font-mono uppercase mb-3 tracking-tighter opacity-70">SYSTEM_INTEGRITY</p>
            <p className="text-2xl font-space font-black text-emerald-400 uppercase tracking-tight">Active</p>
          </div>
        </div>
      </header>

      {/* 2. CORE TACTICAL GRID (12 Cols) */}
      <div className="grid grid-cols-12 gap-12">
        
        {/* LEFT SECTOR: MISSIONS & CONTROL (4 Cols) */}
        <div className="col-span-12 lg:col-span-4 space-y-12">
          <InteractiveWarRoom missions={roadmapMissions} />
          <InteractiveDials initialConfig={config} />
        </div>

        {/* RIGHT SECTOR: ANALYSIS & OUTPUT (8 Cols) */}
        <div className="col-span-12 lg:col-span-8 space-y-12">
          
          {/* NARRATIVE MATRIX (High-Fidelity Dual Pane) */}
          <section className="glass-morphism p-14 rounded-2xl border border-cyan-400/10 relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
            <div className="absolute top-0 right-0 p-8 opacity-20 select-none pointer-events-none">
              <Shield className="text-cyan-400" size={200} />
            </div>
            
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center justify-between mb-16">
                <h2 className="text-3xl font-black flex items-center gap-5 font-space uppercase tracking-tight">
                  <Terminal className="text-cyan-400" size={32} />
                  Strategy_Engine
                </h2>
                <div className="flex items-center gap-6">
                  <button className="p-3 hover:bg-cyan-400/10 rounded-lg transition-colors text-gray-500 hover:text-cyan-400 border border-transparent hover:border-cyan-400/20">
                    <Maximize2 size={24} />
                  </button>
                  <div className="px-6 py-2 bg-cyan-400/10 text-cyan-400 text-sm font-mono font-black rounded-lg border border-cyan-400/30 uppercase tracking-[0.3em] shadow-inner">
                    ANALYSIS_STABLE_v4
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-12 flex-grow">
                <div className="space-y-12">
                  <div className="space-y-4">
                    <label className="text-sm text-cyan-400/60 font-mono uppercase tracking-[0.3em] font-black border-l-4 border-cyan-400 block pl-4">PRIMARY_INTEL_HOOK</label>
                    <p className="text-lg font-space font-medium leading-relaxed text-gray-100 italic selection:bg-cyan-400/50">
                      "{script.hook}"
                    </p>
                  </div>
                  <div className="space-y-4">
                    <label className="text-sm text-cyan-400/60 font-mono uppercase tracking-[0.3em] font-black border-l-4 border-cyan-400/30 block pl-4">INTEL_RECAPITULATION</label>
                    <div className="text-base font-space leading-relaxed text-gray-400 bg-surface-low/30 p-8 rounded-2xl border border-white/5 shadow-inner">
                      {script.body.length > 300 ? script.body.substring(0, 300) + "..." : script.body}
                    </div>
                  </div>
                </div>
                
                <div className="bg-surface-mid p-12 rounded-2xl border border-cyan-400/10 hover:border-cyan-400/40 transition-all shadow-2xl relative group h-full flex flex-col justify-between">
                  <div>
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-surface flex items-center justify-center rounded-2xl border border-cyan-400/20 group-hover:border-cyan-400/60 transition-colors shadow-2xl">
                      <ArrowUpRight className="text-cyan-400" size={24} />
                    </div>
                    <label className="text-sm text-emerald-400 font-mono uppercase tracking-[0.3em] font-black mb-8 flex items-center gap-4">
                      <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"></div>
                      ALPHA_EXTRACTION_FEED
                    </label>
                    <p className="text-lg font-space text-emerald-100/90 leading-relaxed font-bold">
                      {script.alpha}
                    </p>
                  </div>
                  <div className="mt-12 pt-8 border-t border-cyan-400/5 flex justify-between items-center text-sm font-mono font-bold opacity-60">
                    <span className="text-gray-500 uppercase tracking-widest">Integrity: verified</span>
                    <span className="text-emerald-400">LAST_UPDATE: {new Date().toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>

              {/* MISSION 7: PUBLISH TRIGGER INTEGRATION */}
              <div className="mt-auto pt-10 border-t border-cyan-400/10">
                <InteractivePublish initialStatus={script.broadcast_status} />
              </div>
            </div>
          </section>

          {/* ASSET REPOSITORY (Institutional Grids) */}
          <section className="bg-surface p-12 rounded-2xl tactical-glow border border-transparent hover:border-cyan-400/5 transition-all shadow-2xl">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl font-black flex items-center gap-5 font-space uppercase">
                <BarChart3 className="text-cyan-400" size={32} />
                Strategic Assets
              </h2>
              <div className="text-sm text-gray-600 font-mono font-black tracking-widest bg-surface-low px-4 py-1.5 rounded-md border border-white/5 uppercase">Sector_Usage: 88%</div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                { name: "voiceover.mp3", type: "audio", icon: Volume2, status: "STABLE", detail: "AndrewNeural Master" },
                { name: "visuals_raw.mp4", type: "video", icon: Video, status: "READY", detail: "4K_Render // Manim" },
                { name: "FINAL_OUTPUT.mp4", type: "video", icon: Video, status: "SYNCED", detail: "Production_Build" }
              ].map((asset, idx) => (
                <div key={idx} className="group relative bg-surface-low rounded-2xl overflow-hidden hover:scale-[1.03] transition-all cursor-pointer shadow-xl border border-white/5">
                  {/* Pseudo Thumbnail */}
                  <div className="aspect-video bg-surface-mid flex items-center justify-center border-b border-cyan-400/10 relative group-hover:bg-cyan-400/10 transition-colors duration-500">
                    <asset.icon className="text-cyan-400/10 group-hover:text-cyan-400/60 transition-all duration-700" size={64} />
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                      <ChevronRight size={24} className="text-cyan-400" />
                    </div>
                  </div>
                  
                  <div className="p-8 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-cyan-400/60 font-mono font-black uppercase tracking-widest">{asset.type}_SOURCE</span>
                      <span className={`text-xs px-3 py-1 rounded-md font-mono font-black uppercase tracking-widest border ${asset.status === 'READY' || asset.status === 'SYNCED' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                        {asset.status}
                      </span>
                    </div>
                    <h4 className="text-base font-black font-space text-gray-100 tracking-wide uppercase">{asset.name}</h4>
                    <p className="text-sm text-gray-600 font-mono font-bold tracking-tight">{asset.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* COMMAND NAVIGATION (Floating Tactical HUD) */}
      <nav className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-surface p-3 rounded-2xl flex gap-3 tactical-glow z-50 shadow-[0_30px_60px_rgba(0,0,0,0.9)] border border-cyan-400/20 backdrop-blur-xl scale-110">
        {[
          { icon: Terminal, label: "Console" },
          { icon: Cpu, label: "Core", active: true },
          { icon: BarChart3, label: "Charts" },
          { icon: Settings, label: "Admin" }
        ].map((item, idx) => (
          <button key={idx} className={`flex items-center gap-4 px-8 py-4 rounded-xl transition-all group ${item.active ? 'bg-cyan-400 text-obsidian shadow-[0_0_20px_rgba(0,209,255,0.4)]' : 'hover:bg-cyan-400/10 text-gray-600 hover:text-cyan-400'}`}>
            <item.icon size={24} />
            <span className={`text-sm font-space font-black uppercase tracking-[0.2em] transition-all ${item.active ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden pointer-events-none'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>
      
      {/* SCANLINES INTENSITY OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.05] overflow-hidden pointer-events-none mix-blend-overlay">
        <div className="w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#00D1FF_3px)]"></div>
      </div>
    </main>
  );
}
