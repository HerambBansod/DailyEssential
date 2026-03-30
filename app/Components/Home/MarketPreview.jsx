"use client";
import { useEffect, useState } from "react";
import { LineChart } from "lucide-react";

const GROUPS = ["All", "Index", "Tata", "US Tech", "India", "Commodity"];

export default function StockPreview() {
  const [indices, setIndices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeGroup, setActiveGroup] = useState("All");

  useEffect(() => {
    fetch("/api/stock")
      .then((res) => res.json())
      .then((data) => {
        if (data.indices) setIndices(data.indices);
        else setError(true);
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  const filtered =
    activeGroup === "All"
      ? indices
      : indices.filter((i) => i.group === activeGroup);

  return (
    <div className="relative bg-[#0f0f0f] border border-white/[0.07] rounded-2xl p-4 sm:p-6 overflow-hidden shadow-2xl">

      <div className="absolute -top-10 -left-10 w-28 sm:w-40 h-28 sm:h-40 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <LineChart size={16} className="text-violet-400 sm:size-[18px]" />
          <span className="text-white text-base sm:text-lg font-bold tracking-tight">
            Markets
          </span>
        </div>
        <span className="text-[8px] sm:text-[9px] font-bold tracking-widest text-violet-400 bg-violet-500/10 border border-violet-500/25 rounded px-2 py-1">
          LIVE
        </span>
      </div>

      <div className="flex gap-1 flex-wrap mb-3 sm:mb-4">
        {GROUPS.map((g) => (
          <button
            key={g}
            onClick={() => setActiveGroup(g)}
            className={`text-[9px] sm:text-[10px] font-semibold px-2 py-1 rounded-lg tracking-wide transition-all duration-150 ${activeGroup === g
                ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                : "text-white/30 hover:text-white/60 hover:bg-white/[0.04] border border-transparent"
              }`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="h-px bg-gradient-to-r from-white/10 to-transparent mb-3" />

      <div className="flex flex-col gap-0.5 max-h-[280px] sm:max-h-[340px] overflow-y-auto pr-1 scrollbar-thin">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex justify-between px-2 sm:px-3 py-2 rounded-xl">
              <div className="h-3 bg-white/[0.06] rounded-full w-24 sm:w-28 animate-pulse" />
              <div className="h-3 bg-white/[0.06] rounded-full w-16 sm:w-20 animate-pulse" />
            </div>
          ))
          : error
            ? (
              <p className="text-[11px] sm:text-[12px] text-red-400/70 px-3 py-2">
                Failed to load. Check your API route.
              </p>
            )
            : filtered.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-2 sm:px-3 py-2 rounded-xl hover:bg-white/[0.04] transition-all duration-150 cursor-default group"
              >
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] sm:text-[12px] font-medium text-white/70 group-hover:text-white/90 tracking-wide truncate">
                    {item.label}
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-white/20 tracking-widest uppercase">
                    {item.group}
                  </span>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-[12px] sm:text-[13px] font-semibold text-white/90 tabular-nums whitespace-nowrap">
                    {item.value}
                  </span>

                  {item.up !== null ? (
                    <span
                      className={`text-[10px] sm:text-[11px] font-bold tabular-nums min-w-[50px] sm:min-w-[56px] text-right ${item.up ? "text-emerald-400" : "text-red-400"
                        }`}
                    >
                      {item.up ? "▲" : "▼"} {item.change}
                    </span>
                  ) : (
                    <span className="text-[10px] sm:text-[11px] text-white/20 min-w-[50px] sm:min-w-[56px] text-right">
                      —
                    </span>
                  )}
                </div>
              </div>
            ))}
      </div>

      <div className="mt-3 sm:mt-4 pt-3 border-t border-white/[0.05]">
        <span className="text-[9px] sm:text-[10px] text-white/20 tracking-wide">
          {loading
            ? "Fetching live data…"
            : error
              ? "Data unavailable"
              : `${filtered.length} symbols · Yahoo Finance`}
        </span>
      </div>
    </div>
  );
}