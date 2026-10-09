"use client";

import { RetroWindow } from "@/components/RetroWindow";
import { profileBio, profileTags } from "@/components/profileContent";

type HomeWindowProps = {
  isOpen: boolean;
  zIndex: number;
  defaultPosition: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  minSize?: { width: number; height: number };
  onClose: () => void;
  onFocus: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isMaximized?: boolean;
};

const mainPhoto = {
  title: "Photo 01",
  src: "/home/1_PC.jpg",
};

export function HomeWindow({
  isOpen,
  zIndex,
  defaultPosition,
  defaultSize = { width: 920, height: 580 },
  minSize = { width: 480, height: 340 },
  onClose,
  onFocus,
  onMinimize,
  onMaximize,
  isMaximized,
}: HomeWindowProps) {
  return (
    <RetroWindow
      title="About Me"
      isOpen={isOpen}
      zIndex={zIndex}
      gradientColors={["#FF69B4", "#39FF14"]}
      defaultPosition={defaultPosition}
      defaultSize={defaultSize}
      minSize={minSize}
      onClose={onClose}
      onFocus={onFocus}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      isMaximized={isMaximized}
    >
      <div className="grid h-full min-h-0 grid-cols-2 gap-3">
        <section className="win98-inset min-h-0 h-full bg-[#f5f8ff] p-2">
          <div className="win98-inset relative h-full overflow-hidden bg-[#c7c7cc]">
            <img
              src={mainPhoto.src}
              alt={mainPhoto.title}
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        <section className="min-h-0 h-full">
          <article className="win98-inset h-full min-h-0 overflow-y-auto bg-white p-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#6a5acd]">Profile Card</p>
            <h3 className="mt-1 text-2xl font-black tracking-wide">CHOWON</h3>
            <p className="text-sm font-bold text-[#4f4f7f]">HCI Researcher · Product Manager · Seoul</p>
            {profileBio.map((paragraph) => (
              <p key={paragraph} className="mt-2 text-sm leading-5">
                {paragraph}
              </p>
            ))}
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
        </section>
      </div>
    </RetroWindow>
  );
}
