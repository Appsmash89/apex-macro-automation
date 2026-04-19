"use client";

import { useState, useTransition, useEffect } from "react";
import { publishToYouTube } from "@/lib/actions";
import { Loader2, CheckCircle2, AlertCircle, PlaySquare, X, ShieldAlert, Lock } from "lucide-react";

interface InteractivePublishProps {
  initialStatus?: string;
}

/**
 * MISSION 2.4 Hardened: Tactical Interaction Logic
 * Law: 0.5s Precision Trigger + Industrial Confirmation Modal.
 * Law: Explicit LOCKED state for Idempotency Guard triggers.
 */
export default function InteractivePublish({ initialStatus }: InteractivePublishProps) {
  const [status, setStatus] = useState<"READY" | "HOLDING" | "CONFIRMING" | "UPLOADING" | "SUCCESS" | "LOCKED" | "ERROR">("READY");
  const [message, setMessage] = useState("");
  const [holdProgress, setHoldProgress] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isPending, startTransition] = useTransition();

  // MISSION 8.1 / 2.4: State Synchronization
  useEffect(() => {
    if (initialStatus === "published") {
      setStatus("LOCKED");
      setMessage("BROADCAST_REGISTRY // CONTENT_LOCKED");
    }
  }, [initialStatus]);

  // MISSION 2.4: Tactical 0.5s Trigger
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === "HOLDING") {
      interval = setInterval(() => {
        setHoldProgress((prev) => {
          if (prev >= 100) {
            setStatus("CONFIRMING");
            return 100;
          }
          return prev + 20; // 5 steps * 100ms = 500ms
        });
      }, 100);
    } else {
      setHoldProgress(0);
    }
    return () => clearInterval(interval);
  }, [status]);

  // Telemetry Progress Simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === "UPLOADING") {
      setUploadProgress(10);
      interval = setInterval(() => {
        setUploadProgress(prev => {
           if (prev >= 95) return 95;
           return prev + Math.random() * 5;
        });
      }, 500);
    } else if (status === "SUCCESS") {
      setUploadProgress(100);
    } else {
      setUploadProgress(0);
    }
    return () => clearInterval(interval);
  }, [status]);

  async function handlePublish() {
    setStatus("UPLOADING");
    setMessage("");

    startTransition(async () => {
      const result = await publishToYouTube();
      if (result.success) {
        setStatus("SUCCESS");
        setMessage("MISSION_PARITY_ACHIEVED");
      } else {
        // DETECT 409 CONFLICT (IDEMPOTENCY TRIGGER)
        if (result.error?.includes("409")) {
          setStatus("LOCKED");
          setMessage("IDEMPOTENCY_GUARD: CONTENT_ALREADY_BROADCASTED");
        } else {
          setStatus("ERROR");
          setMessage(result.error || "UPLINK_INTERRUPTED");
        }
      }
    });
  }

  const handleStartHold = () => {
    if (status === "READY" || status === "ERROR") setStatus("HOLDING");
  };

  const handleEndHold = () => {
    if (status === "HOLDING") setStatus("READY");
  };

  return (
    <div className="w-full relative group">
      <button
        onMouseDown={handleStartHold}
        onMouseUp={handleEndHold}
        onMouseLeave={handleEndHold}
        disabled={status === "UPLOADING" || status === "SUCCESS" || status === "LOCKED" || isPending}
        className={`w-full py-8 rounded-xl font-space font-black text-xl uppercase tracking-[0.25em] transition-all duration-500 flex items-center justify-center gap-6 relative overflow-hidden active:scale-95 ${
          status === "SUCCESS" 
            ? "bg-sage-green/10 text-sage-green cursor-not-allowed opacity-80" 
            : status === "LOCKED"
            ? "bg-market-crimson/10 text-market-crimson cursor-not-allowed opacity-80"
            : status === "ERROR"
            ? "bg-market-crimson/10 text-market-crimson"
            : status === "HOLDING" || status === "CONFIRMING"
            ? "bg-velocity-blue/30 text-white"
            : "bg-surface-std hover:bg-surface-high text-gray-600 hover:text-velocity-blue"
        } disabled:cursor-not-allowed border-none shadow-2xl`}
      >
        {/* Progress Trigger Indicator (Hold) */}
        {status === "HOLDING" && (
           <div 
             className="absolute bottom-0 left-0 h-1 bg-velocity-blue glow-cyan transition-all duration-100" 
             style={{ width: `${holdProgress}%` }}
           />
        )}

        {/* Upload Telemetry Bar */}
        {status === "UPLOADING" && (
           <div 
             className="absolute top-0 left-0 h-full bg-velocity-blue/10 transition-all duration-500" 
             style={{ width: `${uploadProgress}%` }}
           />
        )}

        {status === "UPLOADING" ? (
          <>
            <Loader2 className="animate-spin text-velocity-blue" size={28} />
            <span className="tabular-nums">{Math.round(uploadProgress)}% UPLINKING...</span>
          </>
        ) : status === "SUCCESS" ? (
          <>
            <CheckCircle2 size={28} />
            SYNDICATION_COMPLETE
          </>
        ) : status === "LOCKED" ? (
          <>
            <Lock size={28} className="text-market-crimson glow-crimson" />
            BROADCAST_LOCKED
          </>
        ) : status === "ERROR" ? (
          <>
            <AlertCircle size={28} />
            PROTOCOL_FAILURE
          </>
        ) : (
          <>
            <PlaySquare size={28} />
            {status === "CONFIRMING" ? "PENDING_CONFIRMATION" : "EXECUTION_TRIGGER"}
          </>
        )}
      </button>

      {/* INDUSTRIAL CONFIRMATION MODAL */}
      {status === "CONFIRMING" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-10">
           <div className="max-w-md w-full bg-surface-base border border-white/5 rounded-3xl p-12 space-y-12 shadow-[0_0_100px_rgba(0,0,0,1)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-velocity-blue to-transparent glow-cyan"></div>
              
              <div className="space-y-6 text-center">
                 <div className="w-20 h-20 bg-velocity-blue/10 rounded-full flex items-center justify-center mx-auto">
                    <ShieldAlert className="text-velocity-blue glow-cyan" size={40} />
                 </div>
                 <h2 className="text-2xl font-black font-space uppercase">AUTHORIZE_BROADCAST?</h2>
                 <p className="text-[10px] text-gray-500 font-mono leading-loose tracking-widest uppercase">
                    You are about to initiate a global syndication event. This action is immutable and will be logged in the Sovereign Registry.
                 </p>
              </div>

              <div className="flex flex-col gap-4">
                 <button 
                   onClick={handlePublish}
                   className="w-full py-6 bg-velocity-blue text-surface-base font-black font-space uppercase tracking-[0.2em] rounded-xl hover:bg-white transition-all glow-cyan"
                 >
                    CONFIRM_EXECUTION
                 </button>
                 <button 
                   onClick={() => setStatus("READY")}
                   className="w-full py-6 bg-surface-std text-gray-400 font-black font-space uppercase tracking-[0.2em] rounded-xl hover:text-white transition-all flex items-center justify-center gap-4"
                 >
                    <X size={18} />
                    ABORT_MISSION
                 </button>
              </div>
           </div>
        </div>
      )}

      {message && (
        <div className={`mt-6 p-6 rounded-xl font-mono text-[10px] uppercase tracking-[0.3em] flex items-center gap-4 glass-tactical border-none relative overflow-hidden ${
          status === "SUCCESS" ? "text-velocity-blue/60" : "status" === "LOCKED" ? "text-market-crimson/60" : "text-market-crimson/60"
        }`}>
          <div className={`w-1 h-6 ${status === "SUCCESS" ? "bg-velocity-blue" : "bg-market-crimson"} opacity-20`}></div>
          {message}
          <div className="ml-auto opacity-20 uppercase font-black tracking-tighter">{status === "SUCCESS" ? "PARITY" : status === "LOCKED" ? "LOCKED" : "v2.4"}</div>
        </div>
      )}
    </div>
  );
}
