import { getRoadmap, getConfig, getScript, getLatestNews } from "@/lib/actions";
import InteractiveDials from "@/components/InteractiveDials";
import InteractiveWarRoom from "@/components/InteractiveWarRoom";
import InteractivePublish from "@/components/InteractivePublish";
import {
  Terminal,
  Cpu,
  Shield,
  Globe,
  Activity,
  Zap,
  BarChart3,
  Maximize2
} from "lucide-react";

export default async function DashboardPage() {
  const roadmapText = await getRoadmap();
  const config = await getConfig();
  const script = await getScript();
  const latestNews = await getLatestNews();

  // DASHBOARD MISSION PARSING (Recent 10)
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
    <main className="min-h-screen bg-surface-base text-bone selection:bg-velocity-blue/30 selection:text-white antialiased overflow-x-hidden">
      
      {/* 1. TACTICAL HUD (SOVEREIGN AUTHORITY) */}
      <header className="h-20 bg-surface-low flex items-center justify-between px-10 relative z-50 shadow-2xl">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
             <Shield className="text-velocity-blue glow-cyan" size={28} />
             <div className="flex flex-col">
                <h1 className="text-xl font-black font-space uppercase tracking-tighter leading-none">
                  APEX_COMMAND_CENTER
                </h1>
                <span className="text-velocity-blue/40 text-[9px] font-mono tracking-[0.4em] mt-1">SOVEREIGN_OBSERVER_v2.2</span>
             </div>
          </div>
          <div className="h-8 w-[1px] bg-white/5"></div>
          <div className="flex items-center gap-4 bg-surface-base px-6 py-2 rounded uppercase font-mono text-[10px] tracking-widest text-gray-500">
             <Globe size={14} className="text-velocity-blue animate-pulse" />
             NODE_01: OMEGA_PRIMARY
          </div>
        </div>
        
        <div className="flex items-center gap-12">
          <div className="text-right">
            <p className="text-[10px] text-gray-600 font-mono uppercase tracking-[0.2em] font-black">STATION_TIME</p>
            <p className="text-base font-black font-space text-velocity-blue/80 tabular-nums">03:26:50 // GMT+8</p>
          </div>
          <div className="h-8 w-[1px] bg-white/5"></div>
          <div className="text-right">
            <p className="text-[10px] text-gray-600 font-mono uppercase tracking-[0.2em] font-black">AUTH_LEVEL</p>
            <p className="text-base font-black font-space text-sage-green uppercase">AUTHORIZED // E0-1</p>
          </div>
        </div>
      </header>

      {/* 2. CORE COCKPIT INTERFACE */}
      <div className="grid grid-cols-12 min-h-[calc(100vh-5rem)]">
        
        {/* SECTOR ALPHA: INTELLIGENCE & CONFIG (8 Cols) */}
        <div className="col-span-12 lg:col-span-8 p-10 lg:p-14 bg-surface-base space-y-14">
          
          {/* Narrative Matrix (Latest news) */}
          <section className="bg-surface-low/30 rounded-3xl p-12 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl font-black flex items-center gap-5 font-space uppercase tracking-tight">
                <Terminal className="text-velocity-blue" size={30} />
                INTELLIGENCE_RELAY
              </h2>
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-velocity-blue glow-cyan"></div>
                 <span className="text-[10px] text-velocity-blue/60 font-mono font-black tracking-widest uppercase">STREAM_ACTIVE</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestNews.slice(0, 3).map((news, idx) => (
                <div key={idx} className="bg-surface-std p-8 rounded-2xl hover:bg-surface-high transition-all duration-500 group/item relative shadow-xl">
                  <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                    <Zap size={40} className="text-velocity-blue" />
                  </div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[9px] text-velocity-blue font-mono font-black uppercase tracking-widest bg-velocity-blue/10 px-3 py-1 rounded">
                      {news.currency} // {news.impact}
                    </span>
                  </div>
                  <h3 className="text-lg font-black font-space leading-tight mb-6 uppercase tracking-wide group-hover/item:text-velocity-blue transition-colors">
                    {news.event}
                  </h3>
                  <div className="flex gap-4 opacity-50">
                    <div className="flex flex-col">
                       <span className="text-[8px] text-gray-500 font-mono font-black uppercase">ACTUAL</span>
                       <span className="text-xs font-mono font-bold text-bone">{news.actual || "???"}</span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[8px] text-gray-500 font-mono font-black uppercase">FORECAST</span>
                       <span className="text-xs font-mono font-bold text-bone">{news.forecast || "???"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Override Matrix (CEO Dial) */}
          <InteractiveDials initialConfig={config || { impact_threshold: ["high"], auto_mode: true }} />
        </div>

        {/* SECTOR BETA: MISSION ARCHITECTURE (4 Cols) */}
        <div className="col-span-12 lg:col-span-4 p-10 lg:p-14 bg-surface-low space-y-14 relative shadow-[-40px_0_60px_-15px_rgba(0,0,0,0.5)] z-10">
          
          {/* Script Overview (Cockpit Module) */}
          <section className="space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black flex items-center gap-5 font-space uppercase tracking-tight">
                <Cpu className="text-velocity-blue" size={30} />
                COMMAND_SCRIPT
              </h2>
              <div className="flex gap-2">
                 <div className="w-4 h-1 bg-velocity-blue/20 rounded-full"></div>
                 <div className="w-12 h-1 bg-velocity-blue rounded-full glow-cyan"></div>
              </div>
            </div>

            <div className="bg-surface-std p-12 rounded-3xl space-y-12 relative overflow-hidden group shadow-2xl">
               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] text-gray-500 font-mono font-black uppercase tracking-[0.4em]">CONTENT_STREAM</label>
                    <Maximize2 size={12} className="text-gray-700 hover:text-velocity-blue transition-colors cursor-pointer" />
                  </div>
                  <div className="h-[250px] overflow-y-auto no-scrollbar pr-6 text-xs font-mono leading-loose text-gray-400 capitalize bg-surface-base/80 p-8 rounded-2xl transition-all duration-500 group-hover:bg-surface-base group-hover:text-gray-300">
                    {script.body || "NO_DATA_LINK_DETECTED"}
                  </div>
               </div>

               <InteractivePublish initialStatus={script.broadcast_status} />
            </div>
          </section>

          {/* DCC Timeline (War Room) */}
          <InteractiveWarRoom missions={roadmapMissions} />
        </div>

      </div>

      {/* 3. TACTICAL FOOTER (TELEMETRY STRIP) */}
      <footer className="h-12 bg-surface-std flex items-center justify-between px-10 relative z-50 shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-8">
           <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <p className="text-[10px] text-velocity-blue font-mono uppercase tracking-[0.3em] font-black">UPLINK_STABLE // 128_BIT_ENCRYPTION</p>
           </div>
           <div className="h-4 w-[1px] bg-white/5"></div>
           <p className="text-[10px] text-gray-700 font-mono uppercase tracking-widest font-black">TERMINAL_REF: DCC_ALPHA_NODE_01</p>
        </div>
        
        <div className="flex items-center gap-8">
           <div className="flex items-center gap-6">
              <BarChart3 size={14} className="text-gray-700" />
              <Activity size={14} className="text-velocity-blue animate-pulse" />
           </div>
           <span className="text-[10px] text-velocity-blue/60 font-mono font-black tracking-widest uppercase glow-cyan">CONNECTED_TO_ORACLE_NETWORK</span>
        </div>
      </footer>
    </main>
  );
}
