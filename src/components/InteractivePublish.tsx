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
      setMessage("Broadcast Synced Successfully (Locked)");
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
          return prev + 5; // 2 seconds to full (100/5 * 100ms)
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
        setMessage("Broadcast Synced Successfully");
      } else {
        setStatus("ERROR");
        setMessage(result.error || "Broadcast Interrupted");
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
    <div className="w-full relative">
      <button
        onMouseDown={handleStartHold}
        onMouseUp={handleEndHold}
        onMouseLeave={handleEndHold}
        disabled={status === "UPLOADING" || status === "SUCCESS" || isPending}
        className={`w-full py-6 rounded-xl font-space font-black text-lg uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 group shadow-2xl border-2 relative overflow-hidden ${
          status === "SUCCESS" 
            ? "bg-emerald-500/10 border-emerald-500 text-emerald-500 cursor-not-allowed dream-pop-glow-sage" 
            : status === "ERROR"
            ? "bg-red-500/10 border-red-500 text-red-500"
            : status === "HOLDING"
            ? "bg-sage-green/20 border-sage-green text-bone"
            : "bg-surface-mid hover:bg-sage-green/10 border-white/10 text-gray-500 hover:text-sage-green hover:border-sage-green/40"
        } disabled:opacity-70 disabled:cursor-not-allowed`}
      >
        {/* Progress Bar (Hold) */}
        {status === "HOLDING" && (
           <div 
             className="absolute bottom-0 left-0 h-1.5 bg-sage-green transition-all" 
             style={{ width: `${holdProgress}%` }}
           />
        )}

        {status === "HOLDING" ? (
          <>
            <Loader2 className="animate-spin" size={24} />
            HOLD_TO_CONFIRM...
          </>
        ) : status === "UPLOADING" ? (
          <>
            <Loader2 className="animate-spin" size={24} />
            UPLOADING_TO_YOUTUBE...
          </>
        ) : status === "SUCCESS" ? (
          <>
            <CheckCircle2 size={24} />
            BROADCAST_COMPLETE
          </>
        ) : status === "ERROR" ? (
          <>
            <AlertCircle size={24} />
            UPLOAD_FAILED
          </>
        ) : (
          <>
            <Youtube className="group-hover:scale-110 transition-transform" size={24} />
            INITIALIZE_PUBLISH
          </>
        )}
      </button>

      {message && (
        <div className={`mt-4 p-4 rounded-lg font-mono text-xs uppercase tracking-widest border flex items-center gap-3 bg-surface-low ${
          status === "SUCCESS" ? "border-emerald-500/20 text-emerald-400/70" : "border-red-500/20 text-red-400/70"
        }`}>
          <PlaySquare size={14} />
          {message}
        </div>
      )}
      
      <p className="mt-4 text-[10px] text-gray-600 font-mono text-center uppercase tracking-widest opacity-60">
        MISSION_2_CONTROL_MATRIX // SYNC: {status === "SUCCESS" ? "LOCKED" : "READY"}
      </p>
    </div>
  );
}
