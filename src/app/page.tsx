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
    <main className="min-h-screen bg-obsidian text-bone p-8 lg:p-12 selection:bg-sage-green/30">
      {/* 1. TOP NAV OVERLAY (Institutional Standard) */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-10 bg-surface-low/50 p-10 rounded-2xl tactical-glow border-l-8 border-sage-green shadow-2xl backdrop-blur-md">
        <div className="space-y-4">
          <div className="flex items-center gap-6">
            <div className="w-4 h-4 bg-sage-green rounded-full animate-pulse shadow-[0_0_20px_rgba(76,101,69,1)]"></div>
            <h1 className="text-3xl font-black tracking-[0.2em] font-space text-sage-green uppercase">Sovereign Observer // V2.2</h1>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500 font-mono tracking-widest uppercase font-bold">
            <span className="flex items-center gap-2"><Globe size={16} className="text-sage-green" /> DCC_STATION: DCC_ALPHA</span>
            <span className="hidden md:inline text-white/10">|</span>
            <span className="flex items-center gap-2 underline decoration-sage-green/30 underline-offset-8 pointer-events-none">SECTOR: GLOBAL_MACRO_INTEL</span>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="bg-surface p-6 rounded-xl text-center min-w-[170px] border border-sage-green/10 shadow-lg">
            <p className="text-xs text-gray-500 font-mono uppercase mb-3 tracking-tighter opacity-70">BTC_REALTIME_FEED</p>
            <p className="text-2xl font-space font-black text-sage-green tracking-tight">$78,100.82</p>
          </div>
          <div className="bg-surface p-6 rounded-xl text-center min-w-[170px] border border-sage-green/10 shadow-lg">
            <p className="text-xs text-gray-500 font-mono uppercase mb-3 tracking-tighter opacity-70">SYSTEM_INTEGRITY</p>
            <p className="text-2xl font-space font-black text-emerald-500 uppercase tracking-tight">Active</p>
          </div>
        </div>
      </header>

      {/* 2. CORE TACTICAL GRID (12 Cols) */}
      <div className="grid grid-cols-12 gap-10">

        {/* TELEMETRY SECTOR: DATA & MONITORING (8 Cols) */}
        <div className="col-span-12 lg:col-span-8 space-y-10">
          {/* NARRATIVE MATRIX */}
          <section className="bg-surface p-12 rounded-2xl border border-white/5 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-5 select-none pointer-events-none">
              <Shield className="text-sage-green" size={200} />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-2xl font-black flex items-center gap-5 font-space uppercase tracking-tight">
                  <Terminal className="text-sage-green" size={28} />
                  Telemetry_Relay
                </h2>
                <div className="px-6 py-2 bg-sage-green/10 text-sage-green text-sm font-mono font-black rounded-lg border border-sage-green/30 uppercase tracking-[0.3em]">
                  INTEL_STREAM_v4
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-xs text-sage-green/60 font-mono uppercase tracking-[0.3em] font-black border-l-4 border-sage-green block pl-4">PRIMARY_INTEL_HOOK</label>
                    <p className="text-lg font-space font-medium leading-relaxed text-bone italic">
                      "{script.hook}"
                    </p>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs text-sage-green/60 font-mono uppercase tracking-[0.3em] font-black border-l-4 border-sage-green/30 block pl-4">INTEL_RECAPITULATION</label>
                    <div className="text-base font-space leading-relaxed text-gray-400 bg-surface-low/50 p-8 rounded-xl border border-white/5">
                      {script.body.length > 250 ? script.body.substring(0, 250) + "..." : script.body}
                    </div>
                  </div>
                </div>

                <div className="bg-surface-mid/50 p-10 rounded-xl border border-sage-green/10 shadow-xl flex flex-col justify-between">
                  <div>
                    <label className="text-xs text-emerald-500 font-mono uppercase tracking-[0.3em] font-black mb-6 flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      ALPHA_EXTRACTION_FEED
                    </label>
                    <p className="text-lg font-space text-bone leading-relaxed font-bold">
                      {script.alpha}
                    </p>
                  </div>
                  <div className="mt-10 pt-6 border-t border-sage-green/5 flex justify-between items-center text-xs font-mono font-bold opacity-60">
                    <span className="text-gray-500 uppercase">Integrity: verified</span>
                    <span className="text-emerald-500">LAST_UPDATE: {new Date().toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <InteractiveWarRoom missions={roadmapMissions} />
            
            {/* ASSET REPOSITORY */}
            <section className="bg-surface p-10 rounded-2xl border border-white/5 shadow-2xl">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-xl font-black flex items-center gap-4 font-space uppercase">
                  <BarChart3 className="text-sage-green" size={24} />
                  Asset_Repo
                </h2>
              </div>

              <div className="space-y-6">
                {[
                  { name: "voiceover.mp3", type: "audio", icon: Volume2, status: "STABLE" },
                  { name: "visuals_raw.mp4", type: "video", icon: Video, status: "READY" },
                  { name: "FINAL_OUTPUT.mp4", type: "video", icon: Video, status: "SYNCED" }
                ].map((asset, idx) => (
                  <div key={idx} className="flex items-center justify-between p-5 bg-surface-low rounded-xl border border-white/5 hover:border-sage-green/20 transition-all">
                    <div className="flex items-center gap-4">
                      <asset.icon className="text-sage-green" size={20} />
                      <div>
                        <p className="text-sm font-black font-space text-bone uppercase tracking-wide">{asset.name}</p>
                        <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">{asset.type}_SOURCE</p>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-sage-green/10 text-sage-green font-mono font-black border border-sage-green/20">
                      {asset.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* CONTROL SECTOR: ACTIONS & OVERRIDES (4 Cols) */}
        <div className="col-span-12 lg:col-span-4 space-y-10">
          <InteractiveDials initialConfig={config} />
          
          <section className="bg-surface p-10 rounded-2xl border border-white/5 shadow-2xl relative">
             <div className="flex items-center gap-4 mb-10 font-space font-black uppercase text-xl text-sage-green">
               <Cpu size={24} />
               Command_Terminal
             </div>
             <InteractivePublish initialStatus={script.broadcast_status} />
             <div className="mt-8 p-6 bg-surface-low rounded-xl border border-white/5 space-y-4">
                <p className="text-[10px] text-gray-600 font-mono uppercase tracking-[0.2em] font-black">STATION_IDENTITY_VERIFIED</p>
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                   <span className="text-xs font-mono text-bone tracking-widest">DCC_KEY_SECURE_v2</span>
                </div>
             </div>
          </section>
        </div>
      </div>

      {/* COMMAND NAVIGATION (Floating Tactical HUD) */}
      <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-surface/80 p-2 rounded-2xl flex gap-1 tactical-glow z-50 shadow-2xl border border-sage-green/20 backdrop-blur-xl">
        {[
          { icon: Terminal, label: "Console" },
          { icon: Cpu, label: "Core", active: true },
          { icon: BarChart3, label: "Charts" },
          { icon: Settings, label: "Admin" }
        ].map((item, idx) => (
          <button key={idx} className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all ${item.active ? 'bg-sage-green text-bone' : 'hover:bg-sage-green/10 text-gray-500 hover:text-sage-green'}`}>
            <item.icon size={20} />
            <span className={`text-xs font-space font-black uppercase tracking-[0.2em] ${item.active ? 'block' : 'hidden'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* SCANLINES INTENSITY OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] overflow-hidden mix-blend-overlay">
        <div className="w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#FAF9F5_3px)]"></div>
      </div>
    </main>
  );
}
