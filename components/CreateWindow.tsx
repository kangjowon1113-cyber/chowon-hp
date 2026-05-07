"use client";

import { useState } from "react";

const playlistItems = [
  {
    id: "v1",
    title: "IU - Through the Night Cover",
    duration: "5:15",
    embedUrl: "https://www.youtube.com/embed/eRP1F9wDxlQ?si=Q_XtnCeemado270S&autoplay=1",
    thumbnailUrl: "https://img.youtube.com/vi/eRP1F9wDxlQ/hqdefault.jpg",
  },
  {
    id: "v2",
    title: "Lauv - All 4 Nothing Cover",
    duration: "3:19",
    embedUrl: "https://www.youtube.com/embed/-xeFFnxCflI?si=YYpSj3GhpYtGbiwe&autoplay=1",
    thumbnailUrl: "https://img.youtube.com/vi/-xeFFnxCflI/hqdefault.jpg",
  },
  {
    id: "v3",
    title: "Olivia Dean - Dive Cover",
    duration: "3:48",
    embedUrl: "https://www.youtube.com/embed/eD2ypVBgDmk?si=JK8xbK5ReU09s_kR&autoplay=1",
    thumbnailUrl: "https://img.youtube.com/vi/eD2ypVBgDmk/hqdefault.jpg",
  },
  {
    id: "v4",
    title: "Reality from La Boum Cover",
    duration: "3:27",
    embedUrl: "https://www.youtube.com/embed/lfhzA4BMBJg?si=hZwUz1fq5s4bbpbS&autoplay=1",
    thumbnailUrl: "https://img.youtube.com/vi/lfhzA4BMBJg/hqdefault.jpg",
  },
];

export function CreateWindow() {
  const [activeTrack, setActiveTrack] = useState<(typeof playlistItems)[number] | null>(null);

  return (
    <div className="flex h-full flex-col" style={{ backgroundColor: "#E8E8E7" }}>
      {/* Main video viewport — fills top, edge-to-edge */}
      <div className="relative min-h-0 flex-1">
        {activeTrack ? (
          <iframe
            key={activeTrack.id}
            src={activeTrack.embedUrl}
            title={activeTrack.title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-3"
            style={{ backgroundColor: "#C8C8C7" }}
          >
            <span className="text-5xl opacity-50">🎵</span>
            <p className="text-[13px] font-semibold text-[#888]">Click a video below to play</p>
          </div>
        )}
      </div>

      {/* Photo Booth–style filmstrip */}
      <div
        className="flex items-center gap-3 overflow-x-auto px-4 py-3"
        style={{ backgroundColor: "#E8E8E7", minHeight: "108px" }}
      >
        {playlistItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveTrack(item)}
            className="group flex-shrink-0 focus:outline-none"
          >
            {/* Polaroid-style frame */}
            <div
              className={`flex flex-col transition-all duration-150 ${
                activeTrack?.id === item.id
                  ? "scale-105 shadow-[0_4px_16px_rgba(0,0,0,0.32)]"
                  : "shadow-[0_2px_6px_rgba(0,0,0,0.22)] group-hover:scale-[1.03] group-hover:shadow-[0_3px_10px_rgba(0,0,0,0.28)]"
              }`}
              style={{
                backgroundColor: "#ffffff",
                padding: "4px 4px 20px 4px",
                borderRadius: "2px",
              }}
            >
              <div className="relative overflow-hidden" style={{ width: 112, height: 68 }}>
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                {/* Active indicator */}
                {activeTrack?.id === item.id && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <span className="rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-bold text-black">
                      ▶
                    </span>
                  </div>
                )}
              </div>
            </div>

            <p className="mt-1.5 w-[120px] truncate text-center text-[11px] font-bold text-[#333]">
              {item.title}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
