"use client";

import { useState, useTransition, useEffect } from "react";
import { publishToYouTube } from "@/lib/actions";
import { Youtube, Loader2, CheckCircle2, AlertCircle, PlaySquare } from "lucide-react";

interface InteractivePublishProps {
  initialStatus?: string;
}

export default function InteractivePublish({ initialStatus }: InteractivePublishProps) {
  const [status, setStatus] = useState<"READY" | "HOLDING" | "UPLOADING" | "SUCCESS" | "ERROR">("READY");
  const [message, setMessage] = useState("");
  const [holdProgress, setHoldProgress] = useState(0);
  const [isPending, startTransition] = useTransition();

  // MISSION 8.1: State Synchronization
  useEffect(() => {
    if (initialStatus === "published") {
      setStatus("SUCCESS");
      setMessage("BROADCAST_LOCKED // SYNC_SUCCESS");
    }
  }, [initialStatus]);

  // MISSION 2.1: Hold Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === "HOLDING") {
      interval = setInterval(() => {
        setHoldProgress((prev) => {
          if (prev >= 100) {
            handlePublish();
            return 100;
          }
          return prev + 5; 
        });
      }, 100);
    } else {
      setHoldProgress(0);
    }
    return () => clearInterval(interval);
  }, [status]);

  async function handlePublish() {
    if (status === "SUCCESS" || initialStatus === "published") return;

    setStatus("UPLOADING");
    setMessage("");

    startTransition(async () => {
      const result = await publishToYouTube();
      if (result.success) {
        setStatus("SUCCESS");
        setMessage("MISSION_PARITY_ACHIEVED");
      } else {
        setStatus("ERROR");
        setMessage(result.error || "UPLINK_INTERRUPTED");
      }
    });
  }

  const handleStartHold = () => {
    if (status === "READY") setStatus("HOLDING");
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
        disabled={status === "UPLOADING" || status === "SUCCESS" || isPending}
        className={`w-full py-8 rounded-xl font-space font-black text-xl uppercase tracking-[0.25em] transition-all duration-500 flex items-center justify-center gap-6 relative overflow-hidden active:scale-95 ${
          status === "SUCCESS" 
            ? "bg-sage-green/10 text-sage-green cursor-not-allowed opacity-80" 
            : status === "ERROR"
            ? "bg-market-crimson/10 text-market-crimson"
            : status === "HOLDING"
            ? "bg-velocity-blue/30 text-white"
            : "bg-surface-std hover:bg-surface-high text-gray-600 hover:text-velocity-blue"
        } disabled:cursor-not-allowed border-none shadow-2xl`}
      >
        {/* Background Gradient Layer for Primary Actions */}
        {(status === "READY" || status === "HOLDING") && (
            <div className={`absolute inset-0 bg-gradient-to-r from-velocity-blue/20 to-velocity-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>
        )}

        {/* Progress Trigger Indicator (Hold) */}
        {status === "HOLDING" && (
           <div 
             className="absolute bottom-0 left-0 h-1 bg-velocity-blue glow-cyan transition-all duration-100" 
             style={{ width: `${holdProgress}%` }}
           />
        )}

        {status === "HOLDING" ? (
          <>
            <Loader2 className="animate-spin text-velocity-blue" size={28} />
            <span className="glow-cyan">AUTHORIZING...</span>
          </>
        ) : status === "UPLOADING" ? (
          <>
            <Loader2 className="animate-spin text-velocity-blue" size={28} />
            UPLINKING_DATA...
          </>
        ) : status === "SUCCESS" ? (
          <>
            <CheckCircle2 size={28} />
            LOCKED_FOR_SYNDICATION
          </>
        ) : status === "ERROR" ? (
          <>
            <AlertCircle size={28} />
            PROTOCOL_FAILURE
          </>
        ) : (
          <>
            <PlaySquare className="group-hover:text-velocity-blue transition-colors" size={28} />
            EXECUTION_TRIGGER
          </>
        )}
      </button>

      {message && (
        <div className={`mt-6 p-6 rounded-xl font-mono text-[10px] uppercase tracking-[0.3em] flex items-center gap-4 glass-tactical border-none relative overflow-hidden transition-all duration-1000 ${
          status === "SUCCESS" ? "text-velocity-blue/60" : "text-market-crimson/60"
        }`}>
          <div className={`w-1 h-6 ${status === "SUCCESS" ? "bg-velocity-blue" : "bg-market-crimson"} opacity-20`}></div>
          {message}
          <div className="ml-auto opacity-20">v2.2</div>
        </div>
      )}
    </div>
  );
}
