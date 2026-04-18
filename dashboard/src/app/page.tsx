import { 
  Activity, 
  LayoutDashboard, 
  MessageSquare, 
  Settings, 
  Video, 
  Volume2, 
  ShieldCheck, 
  ChevronRight 
} from "lucide-react";
import { getRoadmap, getConfig, getScript, updateConfig } from "@/lib/actions";

export default async function Dashboard() {
  const roadmap = await getRoadmap();
  const config = await getConfig();
  const script = await getScript();

  // Simple parser for roadmap latest missions
  const missionMatches = Array.from(roadmap.matchAll(/## (Mission [\d.]+: .*)/g));
  const latestMissions = missionMatches.slice(-5).reverse();

  async function handleToggleImpact(impact: string) {
    "use server";
    const currentConfig = await getConfig();
    const thresholds = currentConfig.impact_threshold || [];
    const newThresholds = thresholds.includes(impact)
      ? thresholds.filter((t: string) => t !== impact)
      : [...thresholds, impact];
    
    await updateConfig({
      ...currentConfig,
      impact_threshold: newThresholds
    });
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#4C6545]/20 bg-[#1A1A1A] p-6">
        <div className="mb-10 flex items-center gap-3">
          <div className="bg-[#4C6545] p-2 rounded">
            <ShieldCheck className="text-[#FAF9F5] w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tighter text-[#FAF9F5]">APEX COMMAND</h1>
        </div>
        
        <nav className="space-y-4">
          <div className="flex items-center gap-3 text-[#4C6545] font-medium">
            <LayoutDashboard size={20} />
            The War Room
          </div>
          <div className="flex items-center gap-3 text-gray-500 hover:text-[#FAF9F5] cursor-pointer">
            <MessageSquare size={20} />
            Script Review
          </div>
          <div className="flex items-center gap-3 text-gray-500 hover:text-[#FAF9F5] cursor-pointer">
            <Settings size={20} />
            CEO Dial
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 space-y-12">
        <header className="flex justify-between items-center bg-[#1A1A1A] p-8 border-l-4 border-[#4C6545] rounded-r-lg">
          <div>
            <h2 className="text-3xl font-bold text-[#FAF9F5] mb-2 uppercase tracking-tight">Digital Command Center</h2>
            <p className="text-[#4C6545] text-sm font-mono tracking-widest">SYSTEM STATUS: OPTIMAL // [ALPHA_V1]</p>
          </div>
          <Activity className="text-[#4C6545] animate-pulse" size={32} />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* THE WAR ROOM - Timeline */}
          <section className="bg-[#1A1A1A] p-8 rounded-xl border border-[#4C6545]/10">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2 text-[#FAF9F5]">
              <div className="w-2 h-2 bg-[#4C6545] rounded-full"></div>
              THE WAR ROOM
            </h3>
            <div className="space-y-8">
              {latestMissions.map((m, i) => (
                <div key={i} className="relative pl-8 border-l border-[#4C6545]/30">
                  <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 bg-[#4C6545] rounded-full"></div>
                  <div className="font-mono text-[#4C6545] text-xs mb-1">04.18.2026 // [LOG_{i}]</div>
                  <p className="text-[#FAF9F5] font-medium">{m[1]}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SCRIPT REVIEW */}
          <section className="bg-[#1A1A1A] p-8 rounded-xl border border-[#4C6545]/10">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2 text-[#FAF9F5]">
              <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
              SCRIPT REVIEW
            </h3>
            <div className="bg-[#121212] p-6 rounded border border-[#4C6545]/20 font-mono text-sm leading-relaxed">
              <div className="text-[#4C6545] mb-4 text-xs">TITLE: {script.title}</div>
              <p className="text-gray-300 italic mb-4">"{script.hook}"</p>
              <p className="text-gray-400">{script.body}</p>
            </div>
          </section>
        </div>

        {/* CEO DIAL & CONFIG */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <section className="bg-[#1A1A1A] p-8 rounded-xl border border-[#4C6545]/10 lg:col-span-2">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2 text-[#FAF9F5]">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              THE CEO DIAL
            </h3>
            <div className="flex gap-6">
              {['high', 'medium', 'low'].map((impact) => (
                <div key={impact} className="flex flex-col gap-3 flex-1">
                  <div className={`p-4 rounded-lg border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                    config.impact_threshold.includes(impact) 
                      ? "bg-[#4C6545]/20 border-[#4C6545]" 
                      : "bg-[#121212] border-gray-800"
                  }`}>
                    <span className="text-xs uppercase font-bold tracking-widest">{impact}</span>
                    <span className="text-3xl font-bold">
                      {config.impact_threshold.includes(impact) ? "ON" : "OFF"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-gray-500 text-xs font-mono italic">
              // WARNING: ADJUSTING THRESHOLDS WILL TRIGGER RE-SCRAPING AT NEXT RUN.
            </p>
          </section>

          {/* ASSET GALLERY */}
          <section className="bg-[#1A1A1A] p-8 rounded-xl border border-[#4C6545]/10">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2 text-[#FAF9F5]">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              ASSET GALLERY
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#121212] rounded border border-[#4C6545]/10">
                <div className="flex items-center gap-3">
                  <Volume2 className="text-[#4C6545]" size={18} />
                  <span className="text-xs font-mono">voiceover.mp3</span>
                </div>
                <ChevronRight className="text-gray-600" size={16} />
              </div>
              <div className="flex items-center justify-between p-4 bg-[#121212] rounded border border-[#4C6545]/10 opacity-50">
                <div className="flex items-center gap-3">
                  <Video className="text-[#4C6545]" size={18} />
                  <span className="text-xs font-mono">visuals_raw.mp4</span>
                </div>
                <span className="text-[10px] bg-red-900 px-2 py-1 rounded text-red-200">FFMPEG_PENDING</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
