"use client";

import { useState, useTransition } from "react";
import { publishToYouTube } from "@/lib/actions";
import { Youtube, Loader2, CheckCircle2, AlertCircle, PlaySquare } from "lucide-react";

export default function InteractivePublish() {
  const [status, setStatus] = useState<"READY" | "UPLOADING" | "SUCCESS" | "ERROR">("READY");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handlePublish() {
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

  return (
    <div className="w-full">
      <button
        onClick={handlePublish}
        disabled={status === "UPLOADING" || isPending}
        className={`w-full py-5 rounded-xl font-space font-black text-lg uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 group shadow-lg border-2 ${
          status === "SUCCESS" 
            ? "bg-emerald-500/10 border-emerald-500 text-emerald-400" 
            : status === "ERROR"
            ? "bg-red-500/10 border-red-500 text-red-500"
            : "bg-surface-mid hover:bg-cyan-400/10 border-cyan-400/30 text-cyan-400 hover:border-cyan-400"
        } disabled:opacity-70 disabled:cursor-not-allowed`}
      >
        {status === "UPLOADING" ? (
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
        <div className={`mt-4 p-4 rounded-lg font-mono text-xs uppercase tracking-widest border flex items-center gap-3 ${
          status === "SUCCESS" ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400/70" : "bg-red-500/5 border-red-500/20 text-red-400/70"
        }`}>
          <PlaySquare size={14} />
          {message}
        </div>
      )}
      
      <p className="mt-4 text-[11px] text-gray-600 font-mono text-center uppercase tracking-tighter opacity-60">
        MISSION_7_ALPHA_BROADCAST // CHANNEL_SYNC: READY
      </p>
    </div>
  );
}
