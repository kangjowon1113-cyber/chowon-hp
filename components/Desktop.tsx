"use client";

import { FileText, Folder } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { HomeWindow } from "@/components/HomeWindow";
import { RetroWindow } from "@/components/RetroWindow";
import { Taskbar } from "@/components/Taskbar";

type FolderKey = "work" | "create" | "life";
type IconKey = "about" | FolderKey;
type WindowKey = "home" | FolderKey;

const desktopItems: Array<{ key: IconKey; label: string }> = [
  { key: "about", label: "About Me" },
  { key: "work", label: "Work" },
  { key: "create", label: "Create" },
  { key: "life", label: "Life" },
];

const initialZIndex: Record<WindowKey, number> = {
  home: 24,
  work: 20,
  create: 21,
  life: 22,
};

const initialOpenState: Record<WindowKey, boolean> = {
  home: true,
  work: false,
  create: false,
  life: false,
};

export function Desktop() {
  const [openState, setOpenState] = useState(initialOpenState);
  const [zIndex, setZIndex] = useState(initialZIndex);
  const [maxZ, setMaxZ] = useState(30);
  const lastAboutClickTime = useRef(0);
  const lastWorkClickTime = useRef(0);
  const [homeDefaultPosition, setHomeDefaultPosition] = useState({ x: 120, y: 60 });
  const [homeReady, setHomeReady] = useState(false);

  const windowContent = useMemo(
    () => ({
      work: (
        <ul>
          <li>📁 UX_Research</li>
          <li>📁 Design</li>
          <li>📁 Papers</li>
        </ul>
      ),
      create: (
        <ul>
          <li>🎵 Music (Media Player)</li>
          <li>🎨 Drawing (Paint UI)</li>
          <li>🖼 Architecture (Gallery)</li>
        </ul>
      ),
      life: (
        <ul>
          <li>📝 Cooking</li>
          <li>📝 Travel</li>
          <li>📝 Diary</li>
        </ul>
      ),
    }),
    []
  );

  const openWindow = (key: WindowKey) => {
    setMaxZ((prev) => {
      const next = prev + 1;
      setZIndex((old) => ({ ...old, [key]: next }));
      return next;
    });
    setOpenState((prev) => ({ ...prev, [key]: true }));
  };

  const closeWindow = (key: WindowKey) => {
    setOpenState((prev) => ({ ...prev, [key]: false }));
  };

  const focusWindow = (key: WindowKey) => {
    setMaxZ((prev) => {
      const next = prev + 1;
      setZIndex((old) => ({ ...old, [key]: next }));
      return next;
    });
  };

  const handleWorkClick = () => {
    const now = Date.now();
    if (now - lastWorkClickTime.current < 320) {
      openWindow("work");
    }
    lastWorkClickTime.current = now;
  };

  const handleAboutClick = () => {
    const now = Date.now();
    if (now - lastAboutClickTime.current < 320) {
      openWindow("home");
    }
    lastAboutClickTime.current = now;
  };

  useEffect(() => {
    const centerHomeWindow = () => {
      const desktopHeight = window.innerHeight - 40;
      setHomeDefaultPosition({
        x: Math.max((window.innerWidth - 1320) / 2, 16),
        y: Math.max((desktopHeight - 760) / 2, 16),
      });
      setHomeReady(true);
    };

    centerHomeWindow();
    window.addEventListener("resize", centerHomeWindow);
    return () => window.removeEventListener("resize", centerHomeWindow);
  }, []);

  return (
    <main className="desktop-grid relative h-screen w-screen overflow-hidden font-system98 text-[#111]">
      <section className="absolute left-4 top-5 z-10 flex flex-col gap-5">
        {desktopItems.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={
              item.key === "about"
                ? handleAboutClick
                : item.key === "work"
                  ? handleWorkClick
                  : () => openWindow(item.key as FolderKey)
            }
            onDoubleClick={
              item.key === "about"
                ? () => openWindow("home")
                : item.key === "work"
                  ? () => openWindow("work")
                  : undefined
            }
            className="flex w-20 flex-col items-center gap-1 text-center text-sm text-black"
          >
            <span className="win98-outset flex h-11 w-11 items-center justify-center bg-[#f8f0ff] shadow-pixel">
              {item.key === "about" ? (
                <FileText size={24} strokeWidth={1.75} className="text-[#313172]" />
              ) : (
                <Folder size={24} strokeWidth={1.75} className="text-[#5f5f00]" />
              )}
            </span>
            <span className="bg-white/50 px-1">{item.label}</span>
          </button>
        ))}
      </section>

      <div className="absolute inset-0 pb-10">
        {homeReady ? (
          <HomeWindow
            isOpen={openState.home}
            zIndex={zIndex.home}
            defaultPosition={homeDefaultPosition}
            onClose={() => closeWindow("home")}
            onFocus={() => focusWindow("home")}
          />
        ) : null}

        <RetroWindow
          title="My Works"
          isOpen={openState.work}
          zIndex={zIndex.work}
          gradientColors={["#2f80ed", "#9b51e0"]}
          defaultPosition={{ x: 160, y: 80 }}
          defaultSize={{ width: 600, height: 400 }}
          minSize={{ width: 420, height: 280 }}
          onClose={() => closeWindow("work")}
          onFocus={() => focusWindow("work")}
        >
          {windowContent.work}
        </RetroWindow>

        <RetroWindow
          title="Create"
          isOpen={openState.create}
          zIndex={zIndex.create}
          gradientColors={["#FF8C00", "#FFD700"]}
          defaultPosition={{ x: 290, y: 180 }}
          defaultSize={{ width: 600, height: 400 }}
          minSize={{ width: 420, height: 280 }}
          onClose={() => closeWindow("create")}
          onFocus={() => focusWindow("create")}
        >
          {windowContent.create}
        </RetroWindow>

        <RetroWindow
          title="Life"
          isOpen={openState.life}
          zIndex={zIndex.life}
          gradientColors={["#87CEEB", "#98FF98"]}
          defaultPosition={{ x: 460, y: 120 }}
          defaultSize={{ width: 600, height: 400 }}
          minSize={{ width: 420, height: 280 }}
          onClose={() => closeWindow("life")}
          onFocus={() => focusWindow("life")}
        >
          {windowContent.life}
        </RetroWindow>
      </div>

      <Taskbar />
    </main>
  );
}

