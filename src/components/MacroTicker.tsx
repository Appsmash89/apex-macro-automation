"use client";

import { useEffect, useState } from "react";

interface NewsItem {
  event: string;
  impact: string;
  currency: string;
}

interface MacroTickerProps {
  news: NewsItem[];
}

/**
 * MISSION 2.6: Macro Intelligence Ticker
 * Layout: Horizontal marquee of global economic events.
 */
export default function MacroTicker({ news }: MacroTickerProps) {
  return (
    <div className="w-full bg-surface-base border-t border-white/5 h-10 flex items-center overflow-hidden relative group">
      <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-surface-base to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-surface-base to-transparent z-10 pointer-events-none"></div>
      
      <div className="flex whitespace-nowrap animate-ticker group-hover:pause-animation">
        {[...news, ...news].map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 px-10 text-[9px] font-mono tracking-[0.2em] font-black uppercase text-gray-500 hover:text-velocity-blue transition-colors">
            <span className={item.impact === "High" ? "text-market-crimson" : "text-velocity-blue"}>
              [{item.currency}]
            </span>
            <span>{item.event}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-white/10"></div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 30s linear infinite;
        }
        .pause-animation {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
