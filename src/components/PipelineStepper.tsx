"use client";

import { useState } from "react";
import { 
  Activity, 
  CheckCircle2, 
  Pause, 
  Play, 
  Zap,
  ArrowRight
} from "lucide-react";
import { togglePipelinePause, togglePipelineAutoNext } from "@/lib/actions";

interface PipelineStepperProps {
  initialStatus: any;
}

/**
 * MISSION 2.7: Integrated Pipeline Stepper
 * Visualization for: Intelligence -> Creative -> Studio -> Distribution.
 * Controls: Auto-Progression toggle + Stage-level pause guards.
 */
export default function PipelineStepper({ initialStatus }: PipelineStepperProps) {
  const [pipeline, setPipeline] = useState(initialStatus);

  const stages = [
    { id: "intelligence", label: "Intelligence Relay", sub: "Scout / Analyst" },
    { id: "creative", label: "Creative Engine", sub: "Video / Audio" },
    { id: "studio", label: "Apex Studio", sub: "Assembly / Guard" }
  ];

  const handleToggleAutoNext = async () => {
    const newVal = !pipeline.auto_next;
    setPipeline({ ...pipeline, auto_next: newVal });
    await togglePipelineAutoNext(newVal);
  };

  const handleTogglePause = async (stageId: string) => {
    const newVal = !pipeline.stages[stageId].paused;
    const newPipeline = { ...pipeline };
    newPipeline.stages[stageId].paused = newVal;
    setPipeline(newPipeline);
    await togglePipelinePause(stageId, newVal);
  };

  const getStageStatus = (stageId: string) => {
    if (pipeline.stage === stageId) return pipeline.status;
    // Simple logic for non-active stages
    const stageIdx = stages.findIndex(s => s.id === stageId);
    const activeIdx = stages.findIndex(s => s.id === pipeline.stage);
    if (stageIdx < activeIdx) return "complete";
    return "idle";
  };

  return (
    <div className="bg-surface-low/30 rounded-3xl p-12 border border-white/5 space-y-12 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between">
         <h2 className="text-2xl font-black flex items-center gap-5 font-space uppercase tracking-tight">
            <Zap className="text-velocity-blue" size={30} />
            PIPELINE_CONTROLLER_v2.7
         </h2>
         <div className="flex items-center gap-6">
            <button 
              onClick={handleToggleAutoNext}
              className={`flex items-center gap-3 px-6 py-2 rounded-full border transition-all ${
                pipeline.auto_next ? "bg-velocity-blue/10 border-velocity-blue text-velocity-blue" : "bg-surface-std border-white/5 text-gray-500"
              }`}
            >
               <div className={`w-1.5 h-1.5 rounded-full ${pipeline.auto_next ? "bg-velocity-blue glow-cyan animate-pulse" : "bg-gray-600"}`}></div>
               <span className="text-[10px] font-mono font-black uppercase tracking-widest">AUTO_PROG: {pipeline.auto_next ? "ACTIVE" : "PAUSED"}</span>
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
         {/* Connector Lines */}
         <div className="hidden md:block absolute top-[2.75rem] left-0 w-full h-[1px] bg-white/5 -z-10"></div>
         
         {stages.map((stage, idx) => {
           const status = getStageStatus(stage.id);
           const isPaused = pipeline.stages[stage.id]?.paused;

           return (
             <div key={stage.id} className="space-y-6 group">
                <div className="flex items-center gap-6">
                   <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all duration-500 ${
                     status === "running" ? "bg-velocity-blue/10 border-velocity-blue glow-cyan" :
                     status === "complete" ? "bg-emerald-500/10 border-emerald-500" :
                     "bg-surface-std border-white/5"
                   }`}>
                      {status === "running" ? <Activity size={20} className="text-velocity-blue animate-pulse" /> :
                       status === "complete" ? <CheckCircle2 size={20} className="text-emerald-500" /> :
                       <Zap size={20} className="text-gray-700" />}
                   </div>
                   <div className="flex-1">
                      <h4 className="text-[11px] font-black font-space uppercase tracking-widest leading-none mb-1 group-hover:text-velocity-blue transition-colors">{stage.label}</h4>
                      <p className="text-[8px] text-gray-600 font-mono uppercase tracking-[0.2em]">{stage.sub}</p>
                   </div>
                </div>

                <div className="p-6 bg-surface-base/50 rounded-2xl border border-white/5 flex items-center justify-between group-hover:bg-surface-std transition-all">
                   <div className="flex items-center gap-4">
                      {isPaused ? <Pause size={14} className="text-market-crimson" /> : <Play size={14} className="text-velocity-blue" />}
                      <span className={`text-[9px] font-mono font-black uppercase tracking-widest ${isPaused ? "text-market-crimson" : "text-gray-600"}`}>
                        {isPaused ? "HOLD_ACTIVE" : "FLOW_ENABLED"}
                      </span>
                   </div>
                   <button 
                     onClick={() => handleTogglePause(stage.id)}
                     className={`px-4 py-2 rounded-lg text-[9px] font-mono font-black uppercase tracking-widest transition-all ${
                       isPaused ? "bg-market-crimson/10 text-market-crimson hover:bg-market-crimson/20" : "bg-surface-high text-gray-400 hover:text-white"
                     }`}
                   >
                     {isPaused ? "RESUME" : "PAUSE"}
                   </button>
                </div>
             </div>
           );
         })}
      </div>

      <div className="bg-surface-std p-8 rounded-2xl border border-white/5 relative overflow-hidden">
         <div className="flex items-center justify-between font-mono text-[9px] tracking-widest">
            <div className="flex items-center gap-4">
               <span className="text-gray-600 uppercase">CURRENT_PIPELINE_STATUS:</span>
               <span className={`font-black uppercase ${pipeline.status === "running" ? "text-velocity-blue animate-pulse" : "text-emerald-500"}`}>
                 {pipeline.stage} // {pipeline.status}
               </span>
            </div>
            <div className="flex items-center gap-4 text-gray-600">
               <Activity size={12} />
               <span>SYSTEM_SYNC_STABLE</span>
            </div>
         </div>
      </div>
    </div>
  );
}
