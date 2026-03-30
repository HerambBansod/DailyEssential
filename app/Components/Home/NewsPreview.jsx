"use client";

import { useEffect, useState } from "react";
import { Newspaper } from "lucide-react";

export default function NewsPreview() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null);

  useEffect(() => {
    fetch("/api/trending")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles?.slice(0, 5) || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function timeAgo(dateStr) {
    if (!dateStr) return "";
    const diff = Math.floor((Date.now() - new Date(dateStr)) / 60000);
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  }

  return (
    <div className="relative bg-[#0f0f0f] border border-white/[0.07] rounded-2xl p-4 sm:p-6 overflow-hidden shadow-2xl h-full">

      <div className="absolute -top-10 -right-10 w-28 sm:w-44 h-28 sm:h-44 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <span className="text-base sm:text-xl text-emerald-400">
            <Newspaper size={18} />
          </span>
          <span className="text-white text-base sm:text-lg font-bold tracking-tight">
            Latest News
          </span>
        </div>
        <span className="text-[8px] sm:text-[9px] font-bold tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 rounded px-2 py-1">
          TOP
        </span>
      </div>

      <div className="h-px bg-gradient-to-r from-white/10 to-transparent mb-3 sm:mb-4" />

      <div className="flex flex-col gap-1">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="px-2 sm:px-3 py-2.5 sm:py-3 rounded-xl">
              <div className="h-3 bg-white/[0.06] rounded-full w-full animate-pulse" />
              <div className="h-3 bg-white/[0.06] rounded-full w-2/3 animate-pulse mt-2" />
              <div className="h-2 bg-white/[0.04] rounded-full w-1/4 animate-pulse mt-2" />
            </div>
          ))
          : articles.map((item, i) => (
            <div
              key={i}
              className={`flex flex-col gap-1 px-2 sm:px-3 py-2.5 sm:py-3 rounded-xl cursor-pointer transition-all duration-150 border-l-2 ${active === i
                  ? "bg-white/[0.04] border-emerald-500/60"
                  : "border-transparent"
                }`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onClick={() => item.url && window.open(item.url, "_blank")}
            >
              <p className="text-[12px] sm:text-[13px] font-medium text-white/90 leading-snug line-clamp-2 tracking-tight">
                {item.title}
              </p>

              <div className="flex items-center gap-2 flex-wrap">
                {item.source?.name && (
                  <span className="text-[9px] sm:text-[10px] text-emerald-400/60 font-semibold">
                    {item.source.name}
                  </span>
                )}
                {item.publishedAt && (
                  <span className="text-[9px] sm:text-[10px] text-white/20">
                    · {timeAgo(item.publishedAt)}
                  </span>
                )}
              </div>
            </div>
          ))}
      </div>

      {!loading && (
        <div className="mt-3 sm:mt-4 pt-3 border-t border-white/[0.05]">
          <span className="text-[9px] sm:text-[10px] text-white/20 tracking-wide">
            Powered by NewsAPI · Tap to read full story
          </span>
        </div>
      )}
    </div>
  );
}