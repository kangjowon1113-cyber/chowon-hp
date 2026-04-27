"use client";

import { useState } from "react";

const folders = [
  { id: "music", label: "Music", color: "#fe2395", darkColor: "#c4006e" },
  { id: "architecture", label: "Architecture", color: "#2596be", darkColor: "#1a6e8e" },
  { id: "drawing", label: "Drawing", color: "#fe742e", darkColor: "#c44d0a" },
] as const;

type FolderId = (typeof folders)[number]["id"];

function FolderIcon({ color, darkColor }: { color: string; darkColor: string }) {
  return (
    <svg width="44" height="36" viewBox="0 0 44 36" fill="none">
      {/* tab */}
      <path d="M2 10 L2 4 Q2 2 4 2 L16 2 L19 6 L42 6 Q44 6 44 8 L44 10 Z" fill={color} />
      {/* body */}
      <rect x="0" y="9" width="44" height="27" rx="2" fill={darkColor} />
      <rect x="1" y="10" width="42" height="25" rx="1" fill={color} />
      {/* highlight line */}
      <line x1="3" y1="13" x2="41" y2="13" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
    </svg>
  );
}

const playlistItems = [
  {
    id: "v1",
    title: "IU - Through the Night Cover",
    duration: "5:15",
    embedUrl: "https://www.youtube.com/embed/eRP1F9wDxlQ?si=Q_XtnCeemado270S&autoplay=1",
  },
  {
    id: "v2",
    title: "Lauv - All 4 Nothing Cover",
    duration: "3:19",
    embedUrl: "https://www.youtube.com/embed/-xeFFnxCflI?si=YYpSj3GhpYtGbiwe&autoplay=1",
  },
  {
    id: "v3",
    title: "Olivia Dean - Dive Cover",
    duration: "3:48",
    embedUrl: "https://www.youtube.com/embed/eD2ypVBgDmk?si=JK8xbK5ReU09s_kR&autoplay=1",
  },
  {
    id: "v4",
    title: "Reality from La Boum Cover",
    duration: "3:27",
    embedUrl: "https://www.youtube.com/embed/lfhzA4BMBJg?si=hZwUz1fq5s4bbpbS&autoplay=1",
  },
];

const drawingItems = [
  {
    id: "d1",
    title: "Girl",
    src: "/create/drawing/Girl.jpg",
  },
  {
    id: "d2",
    title: "Nude Croquis 1",
    src: "/create/drawing/nude croquis 1.jpg",
  },
  {
    id: "d3",
    title: "Nude Croquis 2",
    src: "/create/drawing/nude croquis 2.jpg",
  },
  {
    id: "d4",
    title: "Nude Croquis 3",
    src: "/create/drawing/nude croquis 3.jpg",
  },
  {
    id: "d5",
    title: "Nude Croquis 4",
    src: "/create/drawing/nude croquis 4.jpg",
  },
  {
    id: "d6",
    title: "Nude Croquis 5",
    src: "/create/drawing/nude croquis 5.jpg",
  },
] as const;

export function CreateWindow() {
  const [selectedFolder, setSelectedFolder] = useState<FolderId | null>(null);
  const [openFolder, setOpenFolder] = useState<FolderId | null>(null);
  const [activeTrack, setActiveTrack] = useState<(typeof playlistItems)[number] | null>(null);
  const [selectedDrawingId, setSelectedDrawingId] = useState<(typeof drawingItems)[number]["id"]>(
    drawingItems[0].id,
  );
  const selectedDrawing =
    drawingItems.find((drawing) => drawing.id === selectedDrawingId) ?? drawingItems[0];

  const handleFolderClick = (id: FolderId) => setSelectedFolder(id);
  const handleFolderDoubleClick = (id: FolderId) => {
    setOpenFolder((prev) => (prev === id ? null : id));
    setSelectedFolder(id);
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Folder icons row */}
      <div className="flex gap-8 p-3">
        {folders.map((folder) => (
          <button
            key={folder.id}
            type="button"
            onClick={() => handleFolderDoubleClick(folder.id)}
            className={`flex flex-col items-center gap-1.5 rounded-[2px] p-1.5 text-center focus:outline-none ${
              selectedFolder === folder.id ? "border border-dashed border-black bg-[#c0c0ff]/30" : "border border-transparent"
            }`}
          >
            <div className={`win98-outset p-1 ${selectedFolder === folder.id ? "brightness-90" : ""}`}>
              <FolderIcon color={folder.color} darkColor={folder.darkColor} />
            </div>
            <span className="text-xs font-bold text-[#111]">{folder.label}</span>
          </button>
        ))}
      </div>

      {/* Music playlist panel */}
      {openFolder === "music" ? (
        <div className="win98-inset mx-3 mb-3 flex min-h-0 flex-1 bg-black">
          {/* Player header */}
          <div className="flex w-[220px] min-w-[220px] flex-col border-r border-[#333] bg-[#111]">
            <div className="flex items-center gap-2 border-b border-[#333] bg-[#1a1a1a] px-3 py-2">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#ffd43b]" />
                <span className="h-3 w-3 rounded-full bg-[#52d96b]" />
              </div>
              <span className="ml-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#fe2395]">
                ♫ Playlist
              </span>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
              {playlistItems.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTrack(item)}
                  className={`flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-[#fe2395]/20 ${
                    activeTrack?.id === item.id ? "bg-[#fe2395]/30 text-[#fe2395]" : "text-[#ccc]"
                  }`}
                >
                  <span className="w-5 text-center text-[10px] text-[#555]">{i + 1}</span>
                  <div className="flex-1">
                    <span className="block text-xs font-bold">{item.title}</span>
                    <span className="mt-0.5 block text-[10px] text-[#666]">{item.duration}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex items-center gap-2 border-b border-[#333] bg-[#1a1a1a] px-3 py-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#fe2395]">
                Music Player
              </span>
              {activeTrack ? (
                <span className="text-[11px] text-[#bbb]">{activeTrack.title}</span>
              ) : null}
            </div>

            <div className="relative min-h-0 flex-1 bg-[#0d0d0d]">
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
                <div className="flex h-full w-full items-center justify-center">
                  <p className="text-center text-xs text-[#666]">Select a track from the playlist</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {openFolder === "drawing" ? (
        <div className="win98-inset mx-3 mb-3 flex min-h-0 flex-1 flex-col bg-[#f4f1ea]">
          <div className="flex min-h-0 flex-1 flex-col p-3">
            <div className="win98-inset min-h-0 flex-1 overflow-auto bg-white p-2">
              <div className="flex min-h-full min-w-full items-start justify-center">
                <img
                  src={selectedDrawing.src}
                  alt={selectedDrawing.title}
                  className="block h-auto w-auto max-w-none min-h-[520px]"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="mt-3 win98-inset bg-[#efe4cf] p-2">
              <div className="flex gap-2 overflow-x-auto">
                {drawingItems.map((drawing) => (
                  <button
                    key={drawing.id}
                    type="button"
                    onClick={() => setSelectedDrawingId(drawing.id)}
                    className={`flex w-[45px] min-w-[45px] flex-col bg-transparent p-0 text-left ${
                      selectedDrawingId === drawing.id ? "ring-2 ring-[#a64b11]/40" : ""
                    }`}
                  >
                    <div className="win98-outset bg-white p-1">
                      <img
                        src={drawing.src}
                        alt={drawing.title}
                        className="h-[34px] w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
