"use client";

import { useState, useEffect } from "react";
import { 
  Activity, 
  CheckCircle2, 
  Pause, 
  Play, 
  Zap,
  ArrowRight,
  ShieldCheck,
  RotateCcw
} from "lucide-react";
import { getPipelineStatus, resumePipeline, pausePipeline } from "@/lib/actions";

interface PipelineStepperProps {
  initialStatus: any;
}

/**
 * MISSION 2.7: Sovereign Orchestrator Stepper
 * 4-Stage Multi-Engine Telemetry: Scouting -> Analysis -> Rendering -> Distribution.
 * Features: 2s Polling + Hard-Lock "RESUME" Gates.
 */
export default function PipelineStepper({ initialStatus }: PipelineStepperProps) {
  const [pipeline, setPipeline] = useState(initialStatus);

  // MISSION 2.7: Live Telemetry Pulse (2s Polling)
  useEffect(() => {
    const pollInterval = setInterval(async () => {
      const latest = await getPipelineStatus();
      if (latest) {
        setPipeline(latest);
      }
    }, 2000);

    return () => clearInterval(pollInterval);
  }, []);

  const stages = [
    { id: 1, label: "Intelligence", sub: "Scouting (Live)", icon: Activity },
    { id: 2, label: "Analysis", sub: "Scripting (Gate)", icon: Zap },
    { id: 3, label: "Director", sub: "Rendering (Gate)", icon: RotateCcw },
    { id: 4, label: "Studio", sub: "Distribution", icon: ShieldCheck }
  ];

  const handleResume = async () => {
    await resumePipeline(pipeline.current_stage);
  };

  const stageData = (id: number) => pipeline.stages[id.toString()];

  return (
    <div className="bg-surface-low/30 rounded-3xl p-12 border border-white/5 space-y-12 shadow-2xl relative overflow-hidden group/pipeline">
      {/* 1. Header: Sovereign Guard Status */}
      <div className="flex items-center justify-between">
         <div className="space-y-2">
            <h2 className="text-2xl font-black flex items-center gap-5 font-space uppercase tracking-tight">
               <ShieldCheck className="text-velocity-blue" size={30} />
               SOVEREIGN_ORCHESTRATOR_v2.7
            </h2>
            <div className="flex items-center gap-4">
               <div className={`w-2 h-2 rounded-full ${pipeline.is_paused ? "bg-market-crimson glow-crimson" : "bg-emerald-500 glow-sage animate-pulse"}`}></div>
               <span className="text-[9px] font-mono font-black uppercase tracking-widest text-gray-500">
                  SYSTEM_LOCK: {pipeline.is_paused ? "PAUSED_FOR_REVIEW" : "AUTONOMOUS_FLOW"}
               </span>
            </div>
         </div>

         {pipeline.is_paused && (
            <button 
              onClick={handleResume}
              className="flex items-center gap-4 bg-velocity-blue text-black px-10 py-4 rounded-2xl font-black font-space uppercase text-xs tracking-widest glow-cyan-bg transition-all hover:scale-105 active:scale-95 animate-bounce"
            >
               <Play size={18} fill="black" />
               RESUME_PIPELINE
            </button>
         )}
      </div>

      {/* 2. 4-Stage Stepper Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative items-start">
         {/* Adaptive Connector Line */}
         <div className="hidden md:block absolute top-[2.75rem] left-0 w-full h-[2px] bg-white/5 -z-10 overflow-hidden">
            <div 
               className="h-full bg-velocity-blue transition-all duration-1000 glow-cyan"
               style={{ width: `${((pipeline.current_stage - 1) / 3) * 100}%` }}
            ></div>
         </div>
         
         {stages.map((stage) => {
           const data = stageData(stage.id);
           const isActive = pipeline.current_stage === stage.id;
           const isComplete = pipeline.current_stage > stage.id;
           const StatusIcon = stage.icon;

           return (
             <div key={stage.id} className={`space-y-6 transition-all duration-700 ${isActive ? "opacity-100 scale-100" : "opacity-30 scale-95"}`}>
                <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${
                     isActive ? "bg-velocity-blue/10 border-velocity-blue glow-cyan" :
                     isComplete ? "bg-emerald-500/10 border-emerald-500" :
                     "bg-surface-std border-white/5"
                   }`}>
                      {isComplete ? <CheckCircle2 size={24} className="text-emerald-500" /> : <StatusIcon size={24} className={isActive ? "text-velocity-blue animate-pulse" : "text-gray-700"} />}
                   </div>
                   <div className="space-y-1">
                      <h4 className="text-[11px] font-black font-space uppercase tracking-widest text-white leading-none">{stage.label}</h4>
                      <p className="text-[8px] text-gray-600 font-mono uppercase tracking-widest">{stage.sub}</p>
                   </div>
                </div>

                {isActive && (
                   <div className="p-4 bg-surface-base/80 rounded-xl border border-white/5 backdrop-blur-md">
                      <div className="flex items-center justify-between font-mono text-[8px] tracking-widest">
                         <span className="text-gray-600">STATUS:</span>
                         <span className="text-velocity-blue font-black uppercase text-[10px]">{data.status}</span>
                      </div>
                   </div>
                )}
             </div>
           );
         })}
      </div>

      {/* 3. Real-Time Command Logs */}
      <div className="bg-surface-std/50 p-8 rounded-2xl border border-white/5 space-y-4">
         <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
            <h3 className="text-[9px] font-black font-space uppercase tracking-widest text-gray-500 italic">// COMMAND_LOGS_STREAM</h3>
            <span className="text-[8px] font-mono text-gray-700 uppercase">Buffer: 10/10</span>
         </div>
         <div className="space-y-3">
            {pipeline.logs.map((log: string, idx: number) => (
              <div key={idx} className={`font-mono text-[9px] tracking-widest transition-all duration-500 ${idx === 0 ? "text-velocity-blue translate-x-2" : "text-gray-600 opacity-60"}`}>
                <span className="text-velocity-blue/30 mr-4">{">"}</span>
                {log}
              </div>
            ))}
         </div>
      </div>

      {/* Background Decor */}
      <div className="absolute -bottom-20 -right-20 opacity-5 pointer-events-none group-hover/pipeline:opacity-10 transition-opacity duration-1000">
         <ShieldCheck size={300} className="text-velocity-blue" />
      </div>
    </div>
  );
}
