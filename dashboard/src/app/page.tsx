import { getRoadmap, getConfig, getScript } from "@/lib/actions";
import InteractiveDials from "@/components/InteractiveDials";
import InteractiveWarRoom from "@/components/InteractiveWarRoom";
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
    <main className="min-h-screen bg-obsidian text-[#FAF9F5] p-6 lg:p-12 selection:bg-cyan-400/30">
      {/* 1. TOP NAV OVERLAY (Institutional Standard) */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 bg-surface-low/20 p-8 rounded-xl tactical-glow border-l-4 border-cyan-400">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_12px_rgba(0,209,255,1)]"></div>
            <h1 className="text-2xl font-black tracking-[0.2em] font-space text-cyan-400 uppercase">Sovereign Observer // V2.0</h1>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500 font-mono tracking-widest uppercase">
            <span className="flex items-center gap-2"><Globe size={14} className="text-cyan-400" /> DCC_STATION: DCC_ALPHA</span>
            <span className="hidden md:inline">|</span>
            <span className="flex items-center gap-2 underline decoration-cyan-400/20 underline-offset-4 pointer-events-none">SECTOR: GLOBAL_MACRO_INTEL</span>
          </div>
        </div>
        
        <div className="flex gap-6">
          <div className="bg-surface p-4 rounded-lg text-center min-w-[140px] border border-cyan-400/5">
            <p className="text-[11px] text-gray-500 font-mono uppercase mb-2 tracking-tighter">BTC_INDEX_REALTIME</p>
            <p className="text-xl font-space font-black text-cyan-400 tracking-tight">$78,100.82</p>
          </div>
          <div className="bg-surface p-4 rounded-lg text-center min-w-[140px] border border-cyan-400/5">
            <p className="text-[11px] text-gray-500 font-mono uppercase mb-2 tracking-tighter">NETWORK_LOAD</p>
            <p className="text-xl font-space font-black text-emerald-400 uppercase tracking-tight">Stable</p>
          </div>
        </div>
      </header>

      {/* 2. CORE TACTICAL GRID (12 Cols) */}
      <div className="grid grid-cols-12 gap-10">
        
        {/* LEFT SECTOR: MISSIONS & CONTROL (4 Cols) */}
        <div className="col-span-12 lg:col-span-4 space-y-10">
          <InteractiveWarRoom missions={roadmapMissions} />
          <InteractiveDials initialConfig={config} />
        </div>

        {/* RIGHT SECTOR: ANALYSIS & OUTPUT (8 Cols) */}
        <div className="col-span-12 lg:col-span-8 space-y-10">
          
          {/* SCRIPT ANALYSIS (High-Fidelity Dual Pane) */}
          <section className="glass-morphism p-12 rounded-xl border border-cyan-400/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-30 select-none pointer-events-none">
              <Shield className="text-cyan-400" size={160} />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-2xl font-black flex items-center gap-4 font-space uppercase tracking-tight">
                  <Terminal className="text-cyan-400" size={28} />
                  Narrative Matrix
                </h2>
                <div className="flex items-center gap-4">
                  <button className="p-2 hover:bg-cyan-400/10 rounded transition-colors text-gray-500 hover:text-cyan-400">
                    <Maximize2 size={18} />
                  </button>
                  <div className="px-4 py-1.5 bg-cyan-400/10 text-cyan-400 text-xs font-mono font-bold rounded border border-cyan-400/30 uppercase tracking-[0.2em] shadow-inner">
                    SECURE_INTEL_v3.2
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-10">
                  <div className="space-y-3">
                    <label className="text-[11px] text-cyan-400/60 font-mono uppercase tracking-[0.3em] font-black border-l-2 border-cyan-400 block pl-3">INTELLIGENCE_HOOK</label>
                    <p className="text-base font-space leading-7 text-gray-200 indent-4">
                      {script.hook}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] text-cyan-400/60 font-mono uppercase tracking-[0.3em] font-black border-l-2 border-cyan-400/30 block pl-3">MARKET_DEEP_DIVE</label>
                    <div className="text-sm font-space leading-7 text-gray-400 italic bg-surface-low/10 p-4 rounded-lg">
                      {script.body.length > 250 ? script.body.substring(0, 250) + "..." : script.body}
                    </div>
                  </div>
                </div>
                
                <div className="bg-surface-mid/40 p-10 rounded-xl border border-cyan-400/10 hover:border-cyan-400/30 transition-all shadow-2xl relative group h-full flex flex-col">
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-surface flex items-center justify-center rounded-br-none rounded-xl border border-cyan-400/20 group-hover:border-cyan-400/60 transition-colors">
                    <ArrowUpRight className="text-cyan-400" size={20} />
                  </div>
                  <label className="text-[11px] text-emerald-400/80 font-mono uppercase tracking-[0.3em] font-black mb-6 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                    ALPHA_EXTRACTION_LOG
                  </label>
                  <p className="text-base font-space text-emerald-100/90 leading-relaxed flex-grow">
                    {script.alpha}
                  </p>
                  <div className="mt-10 pt-8 border-t border-cyan-400/5 flex justify-between items-center text-xs font-mono">
                    <span className="text-gray-500 uppercase tracking-widest">Integrity: verified_v4</span>
                    <span className="text-emerald-400/60">TS_SYNC: {new Date().toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ASSET REPOSITORY (16:9 thumbnails) */}
          <section className="bg-surface p-10 rounded-xl tactical-glow border border-transparent hover:border-cyan-400/5 transition-all">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-xl font-bold flex items-center gap-4 font-space uppercase">
                <BarChart3 className="text-cyan-400" size={24} />
                Asset Repository
              </h2>
              <div className="text-xs text-gray-600 font-mono font-bold tracking-widest">STORAGE_USAGE: 42.1 GB</div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "voiceover.mp3", type: "audio", icon: Volume2, status: "SUCCESS", detail: "AndrewNeural v2" },
                { name: "visuals_raw.mp4", type: "video", icon: Video, status: "READY", detail: "1080x1920 // Manim" },
                { name: "FINAL_OUTPUT.mp4", type: "video", icon: Video, status: "SYNCED", detail: "AV_Interleaved" }
              ].map((asset, idx) => (
                <div key={idx} className="group relative bg-surface-low rounded-xl overflow-hidden hover:scale-[1.02] transition-all cursor-pointer shadow-xl">
                  {/* Pseudo Thumbnail */}
                  <div className="aspect-video bg-surface-mid flex items-center justify-center border-b border-cyan-400/5 relative group-hover:bg-cyan-400/5 transition-colors">
                    <asset.icon className="text-cyan-400/10 group-hover:text-cyan-400/50 transition-all duration-500" size={48} />
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight size={18} className="text-cyan-400" />
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-cyan-400/40 font-mono font-bold uppercase tracking-widest">{asset.type}_STREAM</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-black ${asset.status === 'READY' || asset.status === 'SYNCED' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-400/20' : 'bg-emerald-500/10 text-emerald-400'}`}>
                        {asset.status}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold font-space text-gray-200 tracking-wide uppercase">{asset.name}</h4>
                    <p className="text-xs text-gray-600 font-mono">{asset.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* TACTICAL NAVIGATION (Floating HUD) */}
      <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-surface p-2 rounded-full flex gap-2 tactical-glow z-50 shadow-[0_20px_40px_rgba(0,0,0,0.8)] border border-cyan-400/10 backdrop-blur-md">
        {[
          { icon: Terminal, label: "Console" },
          { icon: Cpu, label: "Intelligence", active: true },
          { icon: BarChart3, label: "Analytics" },
          { icon: Settings, label: "Settings" }
        ].map((item, idx) => (
          <button key={idx} className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all group ${item.active ? 'bg-cyan-400 text-obsidian shadow-lg' : 'hover:bg-cyan-400/10 text-gray-500 hover:text-cyan-400'}`}>
            <item.icon size={20} />
            <span className={`text-xs font-space font-black uppercase tracking-widest transition-all ${item.active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 w-0 group-hover:w-auto overflow-hidden'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>
      
      {/* SCANLINES OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] overflow-hidden pointer-events-none mix-blend-overlay">
        <div className="w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#00D1FF_3px)]"></div>
      </div>
    </main>
  );
}
