"use client";
import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

const zones = [
  { label: "India", flag: "🇮🇳", locale: "en-IN", tz: "Asia/Kolkata" },
  { label: "New York", flag: "🇺🇸", locale: "en-US", tz: "America/New_York" },
  { label: "Tokyo", flag: "🇯🇵", locale: "en-JP", tz: "Asia/Tokyo" },
  { label: "London", flag: "🇬🇧", locale: "en-GB", tz: "Europe/London" },
  { label: "Berlin", flag: "🇩🇪", locale: "en-DE", tz: "Europe/Berlin" },
  { label: "Dublin", flag: "🇮🇪", locale: "en-IE", tz: "Europe/Dublin" },
];

function getTime(locale, tz) {
  return new Date().toLocaleTimeString(locale, {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function isDaytime(tz) {
  const hour = parseInt(
    new Date().toLocaleString("en-US", {
      timeZone: tz,
      hour: "numeric",
      hour12: false,
    })
  );
  return hour >= 6 && hour < 20;
}

export default function ClockPreview() {
  const [times, setTimes] = useState({});

  useEffect(() => {
    const tick = () => {
      const t = {};
      zones.forEach(({ label, locale, tz }) => {
        t[label] = getTime(locale, tz);
      });
      setTimes(t);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative bg-[#0f0f0f] border border-white/[0.07] rounded-2xl p-4 sm:p-6 overflow-hidden shadow-2xl">

      <div className="absolute -bottom-10 -right-10 w-28 sm:w-40 h-28 sm:h-40 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <span className="text-base sm:text-xl text-blue-400"><Globe size={18} /></span>
          <span className="text-white text-base sm:text-lg font-bold tracking-tight">
            Global Clock
          </span>
        </div>
        <span className="text-[8px] sm:text-[9px] font-bold tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/25 rounded px-2 py-1">
          LIVE
        </span>
      </div>

      <div className="h-px bg-gradient-to-r from-white/10 to-transparent mb-3 sm:mb-4" />

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-1.5 sm:gap-2">
        {zones.map(({ label, flag, tz }) => {
          const day = isDaytime(tz);
          return (
            <div
              key={label}
              className="flex flex-col gap-0.5 px-3 py-2 rounded-xl hover:bg-white/[0.04] transition-all duration-150 cursor-default group"
            >
              <span className="text-[9px] sm:text-[10px] text-white/30 font-medium tracking-wide">
                {label}
              </span>

              <div className="flex items-center gap-1.5">
                <span className="text-xs">{flag}</span>

                <span className="text-[12px] sm:text-[13px] font-semibold text-white/90 tabular-nums tracking-tight">
                  {times[label] || "--:--:--"}
                </span>

                <span
                  className={`ml-auto text-[7px] sm:text-[8px] font-bold tracking-widest ${day ? "text-amber-400/60" : "text-blue-400/50"
                    }`}
                >
                  {day ? "DAY" : "NGT"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}