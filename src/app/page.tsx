import { getRoadmap, getConfig, getScript, getLatestNews, getAssets } from "@/lib/actions";
import DashboardShell from "@/components/DashboardShell";
import { 
  Shield, 
  Globe
} from "lucide-react";

export default async function DashboardPage() {
  const roadmapText = await getRoadmap();
  const config = await getConfig();
  const script = await getScript();
  const latestNews = await getLatestNews();
  const assets = await getAssets();

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
      <header className="h-20 bg-surface-low/95 backdrop-blur-sm flex items-center justify-between px-10 border-b border-white/5 relative z-50 shadow-2xl sticky top-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
             <Shield className="text-velocity-blue glow-cyan" size={28} />
             <div className="flex flex-col">
                <h1 className="text-xl font-black font-space uppercase tracking-tighter leading-none">
                  APEX_COMMAND_CENTER
                </h1>
                <span className="text-velocity-blue/40 text-[9px] font-mono tracking-[0.4em] mt-1">SOVEREIGN_OBSERVER_v2.4</span>
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
            <p className="text-[10px] text-gray-600 font-mono uppercase tracking-[0.2em] font-black">AUTH_LEVEL</p>
            <p className="text-base font-black font-space text-sage-green uppercase">AUTHORIZED // E0-1</p>
          </div>
        </div>
      </header>

      {/* 2. CORE COCKPIT INTERFACE (Tabbed Shell) */}
      <DashboardShell 
        latestNews={latestNews}
        config={config}
        script={script}
        roadmapMissions={roadmapMissions}
        assets={assets}
      />

      {/* 3. TACTICAL FOOTER (TELEMETRY STRIP) */}
      <footer className="h-12 bg-surface-std flex items-center justify-between px-10 relative z-50 border-t border-white/5">
        <div className="flex items-center gap-8">
           <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <p className="text-[10px] text-velocity-blue font-mono uppercase tracking-[0.3em] font-black">UPLINK_STABLE // 128_BIT_ENCRYPTION</p>
           </div>
           <div className="h-4 w-[1px] bg-white/5"></div>
           <p className="text-[10px] text-gray-700 font-mono uppercase tracking-widest font-black">TERMINAL_REF: DCC_ALPHA_NODE_01</p>
        </div>
        
        <div className="flex items-center gap-8">
           <span className="text-[10px] text-velocity-blue/60 font-mono font-black tracking-widest uppercase glow-cyan">CONNECTED_TO_ORACLE_NETWORK</span>
        </div>
      </footer>
    </main>
  );
}
