import { getRoadmap, getConfig, getScript } from "@/lib/actions";
import { 
  Activity, 
  Terminal, 
  Settings, 
  ChevronRight, 
  Video, 
  Volume2, 
  Cpu, 
  Shield, 
  Globe,
  BarChart3,
  Layers,
  ArrowUpRight
} from "lucide-react";

export default async function DashboardPage() {
  const roadmapText = await getRoadmap();
  const config = await getConfig();
  const script = await getScript();

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
    .slice(-4);

  return (
    <main className="min-h-screen bg-obsidian text-[#FAF9F5] p-6 lg:p-10">
      {/* 1. TOP STATUS BAR (Tactical Overlay) */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 bg-surface-low/30 p-6 rounded-lg tactical-glow border-l-2 border-cyan-400/50">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(0,209,255,0.8)]"></div>
            <h1 className="text-xl font-bold tracking-[0.2em] font-space text-cyan-400 uppercase">Sovereign Observer // V1.2</h1>
          </div>
          <p className="text-[10px] text-gray-500 font-mono tracking-widest flex items-center gap-2">
            <Globe size={10} className="text-cyan-400/50" />
            STATION_ID: DCC_ALPHA // UPTIME: 99.98% // SECTOR: GLOBAL_MACRO
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-surface-mid px-5 py-3 rounded text-center min-w-[120px]">
            <p className="text-[9px] text-gray-500 font-mono uppercase mb-1">BTC_INDEX</p>
            <p className="text-sm font-space font-bold text-cyan-400">$78,100</p>
          </div>
          <div className="bg-surface-mid px-5 py-3 rounded text-center min-w-[120px]">
            <p className="text-[9px] text-gray-500 font-mono uppercase mb-1">SYSTEM_STATUS</p>
            <p className="text-sm font-space font-bold text-emerald-400 uppercase">Operational</p>
          </div>
        </div>
      </header>

      {/* 2. MODULAR 12-COLUMN GRID */}
      <div className="grid grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: THE WAR ROOM (4 Cols) */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <section className="bg-surface p-8 rounded-xl tactical-glow transition-all hover:bg-surface-low/50">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-lg font-bold flex items-center gap-3 font-space">
                <Activity className="text-cyan-400" size={20} />
                THE WAR ROOM
              </h2>
              <span className="text-[9px] text-cyan-400/50 font-mono">MISSION_LOG.v6</span>
            </div>

            <div className="relative pl-6 space-y-10">
              {/* Pulse Line */}
              <div className="absolute left-[3px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-cyan-400/50 via-cyan-400/10 to-transparent"></div>
              
              {roadmapMissions.map((mission, idx) => (
                <div key={idx} className="relative group">
                  <div className={`absolute -left-[27px] top-1.5 w-2 h-2 rounded-full border border-obsidian ${mission.status === 'complete' ? 'bg-cyan-400 shadow-[0_0_8px_rgba(0,209,255,0.8)]' : 'bg-surface-mid'}`}></div>
                  <div className="bg-surface-low/40 p-5 rounded-lg border-l-2 border-transparent group-hover:border-cyan-400/30 transition-all">
                    <h3 className={`text-xs font-bold mb-2 font-space tracking-wider uppercase ${mission.status === 'complete' ? 'text-gray-300' : 'text-gray-500'}`}>
                      {mission.title}
                    </h3>
                    <ul className="space-y-1">
                      {mission.details.slice(0, 2).map((detail, dIdx) => (
                        <li key={dIdx} className="text-[10px] text-gray-600 font-mono flex items-center gap-2">
                          <ChevronRight size={10} className="text-cyan-400/30" />
                          {detail.length > 40 ? detail.substring(0, 40) + "..." : detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PARAMETER OVERRIDE MATRIX */}
          <section className="bg-surface p-8 rounded-xl tactical-glow">
            <h2 className="text-lg font-bold mb-8 flex items-center gap-3 font-space">
              <Layers className="text-cyan-400" size={20} />
              OVERRIDE MATRIX
            </h2>
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <p className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">Macro_Impact_Threshold</p>
                  <p className="text-xs font-bold font-space text-cyan-400">HIGH_LEVEL</p>
                </div>
                <div className="h-1 bg-surface-mid rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 w-[78%] shadow-[0_0_10px_rgba(0,209,255,0.4)]"></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <p className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">Automation_Sync_Rate</p>
                  <p className="text-xs font-bold font-space text-emerald-400">OPTIMAL</p>
                </div>
                <div className="h-1 bg-surface-mid rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 w-[92%] shadow-[0_0_10px_rgba(52,211,153,0.4)]"></div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: SCRIPT & ASSETS (8 Cols) */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* SCRIPT REVIEW (Dual Pane Glass) */}
          <section className="glass-morphism p-10 rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4">
              <Shield className="text-cyan-400/20" size={120} />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold flex items-center gap-3 font-space uppercase">
                  <Terminal className="text-cyan-400" size={22} />
                  Sovereign Script // Analysis
                </h2>
                <div className="flex gap-2">
                  <div className="px-3 py-1 bg-cyan-400/10 text-cyan-400 text-[9px] font-mono rounded border border-cyan-400/20 uppercase tracking-widest">
                    V3.2_SECURE
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div>
                    <label className="text-[9px] text-cyan-400/40 font-mono uppercase tracking-widest mb-2 block font-bold underline decoration-cyan-400/20 underline-offset-4">Primary_Hook</label>
                    <p className="text-sm font-space leading-relaxed text-gray-300">
                      {script.hook}
                    </p>
                  </div>
                  <div>
                    <label className="text-[9px] text-cyan-400/40 font-mono uppercase tracking-widest mb-2 block font-bold underline decoration-cyan-400/20 underline-offset-4">Narrative_Intelligence</label>
                    <p className="text-sm font-space leading-relaxed text-gray-400 italic">
                      {script.body.substring(0, 180)}...
                    </p>
                  </div>
                </div>
                
                <div className="bg-surface-mid/40 p-6 rounded-lg border border-cyan-400/5 group-hover:border-cyan-400/20 transition-all">
                  <label className="text-[9px] text-emerald-400/60 font-mono uppercase tracking-widest mb-4 block font-bold">Market_Alpha_Extraction</label>
                  <p className="text-sm font-space text-emerald-400/80 leading-relaxed">
                    {script.alpha}
                  </p>
                  <div className="mt-8 pt-6 border-t border-cyan-400/5 flex justify-between items-center">
                    <span className="text-[9px] text-gray-500 font-mono uppercase">Sync: verified</span>
                    <ArrowUpRight className="text-cyan-400" size={16} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ASSET GALLERY */}
          <section className="bg-surface-low/20 p-8 rounded-xl border border-cyan-400/5 hover:bg-surface-low/30 transition-all">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold flex items-center gap-3 font-space">
                <Layers className="text-cyan-400" size={20} />
                INTEL ASSETS
              </h2>
              <p className="text-[9px] text-gray-500 font-mono uppercase tracking-tighter">RENDER_ID: RD-4458</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "voiceover.mp3", type: "audio", icon: Volume2, status: "SUCCESS" },
                { name: "visuals_raw.mp4", type: "video", icon: Video, status: "DONE" },
                { name: "FINAL_OUTPUT.mp4", type: "video", icon: Video, status: "READY" }
              ].map((asset, idx) => (
                <div key={idx} className="bg-surface rounded-lg p-5 flex flex-col justify-between tactical-glow relative group cursor-pointer hover:bg-surface-mid">
                  <div className="absolute top-3 right-3">
                    <asset.icon className="text-cyan-400/20 group-hover:text-cyan-400/50 transition-all" size={24} />
                  </div>
                  <div>
                    <p className="text-[8px] text-gray-500 font-mono mb-1 uppercase tracking-widest">{asset.type}</p>
                    <h4 className="text-[11px] font-bold font-space text-gray-200">{asset.name}</h4>
                  </div>
                  <div className="mt-6 flex justify-between items-center">
                    <span className={`text-[8px] px-2 py-0.5 rounded font-mono font-bold ${asset.status === 'READY' ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/20' : 'bg-gray-800 text-gray-500'}`}>
                      {asset.status}
                    </span>
                    <ChevronRight size={12} className="text-gray-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* FIXED BOTTOM HUD (Mobile/Tablet Optim) */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-surface-mid border border-cyan-400/20 px-10 py-4 rounded-full flex gap-12 tactical-glow z-50 transition-all hover:scale-105 active:scale-95">
        <div className="group cursor-pointer">
          <Terminal className="text-gray-500 group-hover:text-cyan-400 transition-colors" size={20} />
          <span className="sr-only">Terminals</span>
        </div>
        <div className="group cursor-pointer">
          <Cpu className="text-cyan-400" size={20} />
          <span className="sr-only">Compute</span>
        </div>
        <div className="group cursor-pointer">
          <BarChart3 className="text-gray-500 group-hover:text-cyan-400 transition-colors" size={20} />
          <span className="sr-only">Analytics</span>
        </div>
        <div className="group cursor-pointer">
          <Settings className="text-gray-500 group-hover:text-cyan-400 transition-colors" size={20} />
          <span className="sr-only">Settings</span>
        </div>
      </nav>
      
      {/* BACKGROUND ELEMENTS (Scanlines / Ambient) */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-5 overflow-hidden">
        <div className="w-full h-full bg-[linear-gradient(rgba(0,209,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,209,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian"></div>
      </div>
    </main>
  );
}
