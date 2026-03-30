"use client";

import { useEffect, useState } from "react";
import { Flame } from "lucide-react";

export default function TrendingPreview() {
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(null);

    useEffect(() => {
        fetch("/api/trending")
            .then((res) => res.json())
            .then((data) => {
                setTrending(data.articles || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="relative bg-[#0f0f0f] border border-white/[0.07] rounded-2xl p-4 sm:p-6 w-full overflow-hidden shadow-2xl">

            <div className="absolute -top-14 -left-10 w-32 sm:w-48 h-32 sm:h-48 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-base sm:text-xl text-orange-400">
                        <Flame size={18} />
                    </span>
                    <span className="text-white text-base sm:text-lg font-bold tracking-tight">
                        Trending
                    </span>
                </div>
                <span className="text-[8px] sm:text-[9px] font-bold tracking-widest text-orange-500 bg-orange-500/10 border border-orange-500/25 rounded px-2 py-1">
                    LIVE
                </span>
            </div>

            <div className="h-px bg-gradient-to-r from-white/10 to-transparent mb-3 sm:mb-4" />

            <div className="flex flex-col gap-1">
                {loading
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="px-2 sm:px-3 py-2 rounded-xl">
                            <div className="h-3 bg-white/[0.06] rounded-full w-4/5 animate-pulse" />
                            <div className="h-3 bg-white/[0.06] rounded-full w-3/5 animate-pulse mt-2" />
                        </div>
                    ))
                    : trending.slice(0, 6).map((item, i) => (
                        <div
                            key={i}
                            className={`flex items-start gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-xl cursor-pointer transition-all duration-150 ${active === i ? "bg-white/[0.04]" : "bg-transparent"
                                }`}
                            onMouseEnter={() => setActive(i)}
                            onMouseLeave={() => setActive(null)}
                        >

                            <span className="text-[10px] sm:text-[11px] font-bold text-orange-500/60 tabular-nums min-w-[18px] sm:min-w-[20px] pt-0.5">
                                {String(i + 1).padStart(2, "0")}
                            </span>

                            <div className="flex-1 min-w-0">
                                <p className="text-[12px] sm:text-[13px] font-medium text-white/90 leading-snug line-clamp-2 tracking-tight">
                                    {item.title}
                                </p>

                                {item.source?.name && (
                                    <span className="text-[10px] sm:text-[11px] text-white/30 font-medium mt-1 block">
                                        {item.source.name}
                                    </span>
                                )}
                            </div>

                            <span
                                className={`text-xs sm:text-sm text-orange-500/80 pt-0.5 flex-shrink-0 transition-all duration-150 ${active === i
                                        ? "opacity-100 translate-x-0"
                                        : "opacity-0 -translate-x-1"
                                    }`}
                            >
                                →
                            </span>
                        </div>
                    ))}
            </div>

            {!loading && (
                <div className="mt-3 sm:mt-4 pt-3 border-t border-white/[0.05]">
                    <span className="text-[9px] sm:text-[10px] text-white/20 tracking-wide">
                        Updated just now · newsapi.org
                    </span>
                </div>
            )}
        </div>
    );
}