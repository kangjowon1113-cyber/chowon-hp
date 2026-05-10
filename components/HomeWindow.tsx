"use client";

import { useMemo, useState } from "react";
import { RetroWindow } from "@/components/RetroWindow";

type HomeWindowProps = {
  isOpen: boolean;
  zIndex: number;
  defaultPosition: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  minSize?: { width: number; height: number };
  onClose: () => void;
  onFocus: () => void;
};

type PhotoItem = {
  id: string;
  title: string;
  label: string;
  src: string;
};

const photoItems: PhotoItem[] = [
  { id: "p1", title: "Photo 01", label: "001_image", src: "/home/1_PC.jpg" },
  { id: "p2", title: "Photo 02", label: "002_image", src: "/home/2_PC.jpg" },
  { id: "p3", title: "Photo 03", label: "003_image", src: "/home/3.jpg" },
];

const stats = [
  { label: "User Insight", value: 92, color: "bg-[#7b68ee]" },
  { label: "Problem Solving", value: 88, color: "bg-[#4cc9f0]" },
  { label: "Storytelling", value: 83, color: "bg-[#ff4d8d]" },
  { label: "Visual Taste", value: 90, color: "bg-[#f9c74f]" },
];

/** Candy-pop button bg + keyword text color (user-specified hex per tag). */
const profileTags = [
  { label: "#HCI_Researcher", textColor: "#98FF98", bgColor: "#FF1493" },
  { label: "#Product_Manager", textColor: "#FF69B4", bgColor: "#98FF98" },
  { label: "#Architecture_Designer", textColor: "#FF8C00", bgColor: "#E6B6FF" },
  { label: "#Music", textColor: "#E6E6FA", bgColor: "#FF6B35" },
  { label: "#Maximalist", textColor: "#FFF700", bgColor: "#BA55D3" },
] as const;

export function HomeWindow({
  isOpen,
  zIndex,
  defaultPosition,
  defaultSize = { width: 920, height: 580 },
  minSize = { width: 480, height: 340 },
  onClose,
  onFocus,
}: HomeWindowProps) {
  const [selectedPhotoId, setSelectedPhotoId] = useState(photoItems[0].id);

  const selectedPhoto = useMemo(
    () => photoItems.find((photo) => photo.id === selectedPhotoId) ?? photoItems[0],
    [selectedPhotoId]
  );

  return (
    <RetroWindow
      title="Home"
      isOpen={isOpen}
      zIndex={zIndex}
      gradientColors={["#FF69B4", "#39FF14"]}
      defaultPosition={defaultPosition}
      defaultSize={defaultSize}
      minSize={minSize}
      onClose={onClose}
      onFocus={onFocus}
    >
      <div className="grid h-full min-h-0 grid-cols-2 gap-3">
        <section className="win98-inset grid min-h-0 h-full grid-cols-[130px_1fr] gap-2 bg-[#f5f8ff] p-2">
          <div className="win98-inset flex flex-col gap-2 bg-white p-2">
            {photoItems.map((photo) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setSelectedPhotoId(photo.id)}
                className={`h-[168px] w-full appearance-none overflow-hidden bg-transparent p-0 ${
                  selectedPhotoId === photo.id
                    ? "ring-2 ring-[#2f80ed]/50"
                    : ""
                }`}
              >
                <div className="flex h-full flex-col">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="h-[144px] w-full object-cover"
                    loading="lazy"
                  />
                  <p className="mt-1 text-center text-[12px] font-bold tracking-wide text-[#2d2d2d]">
                    {photo.label}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="win98-inset relative h-full overflow-hidden bg-[#c7c7cc]">
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute left-3 top-3 bg-white/80 px-2 py-1 text-[11px] font-bold tracking-wide">
              {selectedPhoto.title}
            </div>
            <div className="absolute bottom-3 right-3 bg-black/50 px-2 py-1 text-xs text-white">
              Main Preview
            </div>
          </div>
        </section>

        <section className="grid min-h-0 h-full grid-rows-[minmax(0,1fr)_minmax(88px,0.24fr)] gap-3">
          <article className="win98-inset min-h-0 overflow-y-auto bg-white p-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#6a5acd]">Profile Card</p>
            <h3 className="mt-1 text-2xl font-black tracking-wide">CHOWON</h3>
            <p className="text-sm font-bold text-[#4f4f7f]">HCI Researcher · Product Manager · Seoul</p>
            <p className="mt-2 text-sm leading-5">
              I&apos;m an HCI researcher and Product Manager based in Seoul, passionate about
              enhancing social and emotional connections in digital spaces.
            </p>
            <p className="mt-2 text-sm leading-5">
              With a background in interior architecture, I&apos;ve long been fascinated by how
              physical environments shape human experience — a perspective I now bring to designing
              online interactions. Beyond the screen, I find balance in music, experimenting in the
              kitchen, and collecting moments from the world with curiosity.
            </p>
            <div className="mt-3 border-t-2 border-[#c0c0c0] pt-3">
              <div className="flex flex-wrap gap-2">
                {profileTags.map((item) => (
                  <span
                    key={item.label}
                    className="win98-outset inline-block px-2 py-1 text-[11px] font-bold tracking-wide shadow-[inset_0_-1px_0_rgba(0,0,0,0.12)]"
                    style={{ backgroundColor: item.bgColor, color: item.textColor }}
                  >
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </article>

          <article className="win98-inset min-h-0 overflow-y-auto bg-white p-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#6a5acd]">RPG Stats</p>
            <div className="mt-3 space-y-3">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="mb-1 flex items-center justify-between text-xs font-bold">
                    <span>{stat.label}</span>
                    <span>{stat.value}</span>
                  </div>
                  <div className="win98-inset h-4 bg-[#efefef] p-[2px]">
                    <div className={`h-full ${stat.color}`} style={{ width: `${stat.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </RetroWindow>
  );
}

