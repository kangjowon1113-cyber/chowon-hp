"use client";

import { FileText, Folder } from "lucide-react";
import { useEffect, useState } from "react";
import { HomeWindow } from "@/components/HomeWindow";
import { MyWorks, WORK_PROJECTS } from "@/components/MyWorks";
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
  const [selectedIcon, setSelectedIcon] = useState<IconKey | null>(null);
  const [homeLayout, setHomeLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [projectWindowState, setProjectWindowState] = useState<Record<string, boolean>>({});
  const [projectWindowZ, setProjectWindowZ] = useState<Record<string, number>>({});

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

  const handleDesktopItemClick = (key: IconKey) => {
    setSelectedIcon(key);
  };

  const openProjectWindow = (projectId: string) => {
    setMaxZ((prev) => {
      const next = prev + 1;
      setProjectWindowZ((old) => ({ ...old, [projectId]: next }));
      return next;
    });
    setProjectWindowState((prev) => ({ ...prev, [projectId]: true }));
  };

  const closeProjectWindow = (projectId: string) => {
    setProjectWindowState((prev) => ({ ...prev, [projectId]: false }));
  };

  const focusProjectWindow = (projectId: string) => {
    setMaxZ((prev) => {
      const next = prev + 1;
      setProjectWindowZ((old) => ({ ...old, [projectId]: next }));
      return next;
    });
  };

  useEffect(() => {
    setOpenState((prev) => ({ ...prev, home: true }));
    const targetWidth = 1104;
    const targetHeight = 696;
    const taskbarHeight = 40;
    const margin = 24;
    const width = Math.min(targetWidth, window.innerWidth - margin);
    const height = Math.min(targetHeight, window.innerHeight - taskbarHeight - margin);
    setHomeLayout({
      x: Math.max(12, (window.innerWidth - width) / 2),
      y: Math.max(12, (window.innerHeight - taskbarHeight - height) / 2),
      width,
      height,
    });
  }, []);

  return (
    <main
      className="desktop-grid relative h-screen w-screen overflow-hidden font-system98 text-[#111]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          setSelectedIcon(null);
        }
      }}
    >
      <section
        className="absolute left-4 top-5 z-10 flex flex-col gap-5"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            setSelectedIcon(null);
          }
        }}
      >
        {desktopItems.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => handleDesktopItemClick(item.key)}
            onDoubleClick={
              item.key === "about"
                ? () => openWindow("home")
                : item.key === "work"
                  ? () => openWindow("work")
                  : () => openWindow(item.key as FolderKey)
            }
            className={`active relative flex w-20 flex-col items-center gap-1 p-0.5 text-center text-sm text-black active:translate-x-px active:translate-y-px ${
              selectedIcon === item.key
                ? "border border-dashed border-black"
                : "border border-transparent"
            }`}
          >
            <span
              className={`win98-outset relative flex h-11 w-11 items-center justify-center bg-[#f8f0ff] shadow-pixel ${
                selectedIcon === item.key ? "brightness-90" : ""
              }`}
            >
              {item.key === "about" ? (
                <FileText size={24} strokeWidth={1.75} className="text-[#313172]" />
              ) : (
                <Folder size={24} strokeWidth={1.75} className="text-[#5f5f00]" />
              )}
              {selectedIcon === item.key ? (
                <span className="pointer-events-none absolute inset-0 bg-[#4c6fff]/25" />
              ) : null}
            </span>
            <span className="bg-white/50 px-1">{item.label}</span>
          </button>
        ))}
      </section>

      <div
        className="absolute inset-0 min-h-0 pb-10"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            setSelectedIcon(null);
          }
        }}
      >
        {homeLayout ? (
          <HomeWindow
            isOpen={openState.home}
            zIndex={zIndex.home}
            defaultPosition={{ x: homeLayout.x, y: homeLayout.y }}
            defaultSize={{ width: homeLayout.width, height: homeLayout.height }}
            minSize={{
              width: Math.max(320, Math.min(480, homeLayout.width)),
              height: Math.max(240, Math.min(340, homeLayout.height)),
            }}
            onClose={() => closeWindow("home")}
            onFocus={() => focusWindow("home")}
          />
        ) : null}

        <RetroWindow
          title="My Works"
          isOpen={openState.work}
          zIndex={zIndex.work}
          gradientColors={["#FF1493", "#FF69B4"]}
          defaultPosition={{ x: 160, y: 80 }}
          defaultSize={{ width: 740, height: 520 }}
          minSize={{ width: 460, height: 300 }}
          onClose={() => closeWindow("work")}
          onFocus={() => focusWindow("work")}
        >
          <MyWorks onOpenProject={openProjectWindow} />
        </RetroWindow>

        {WORK_PROJECTS.map((project, index) => (
          <RetroWindow
            key={project.id}
            title={project.title}
            isOpen={Boolean(projectWindowState[project.id])}
            zIndex={projectWindowZ[project.id] ?? 10}
            gradientColors={["#FF1493", "#FF69B4"]}
            defaultPosition={{ x: 220 + index * 26, y: 110 + index * 24 }}
            defaultSize={{ width: 806, height: 529 }}
            minSize={{ width: 529, height: 328 }}
            onClose={() => closeProjectWindow(project.id)}
            onFocus={() => focusProjectWindow(project.id)}
          >
            <div className="h-full w-full bg-white" />
          </RetroWindow>
        ))}

        <RetroWindow
          title="Create"
          isOpen={openState.create}
          zIndex={zIndex.create}
          gradientColors={["#FF8C00", "#FFD700"]}
          defaultPosition={{ x: 290, y: 180 }}
          defaultSize={{ width: 600, height: 400 }}
          minSize={{ width: 280, height: 240 }}
          onClose={() => closeWindow("create")}
          onFocus={() => focusWindow("create")}
        >
          <ul className="list-none space-y-1 p-0">
            <li>🎵 Music (Media Player)</li>
            <li>🎨 Drawing (Paint UI)</li>
            <li>🖼 Architecture (Gallery)</li>
          </ul>
        </RetroWindow>

        <RetroWindow
          title="Life"
          isOpen={openState.life}
          zIndex={zIndex.life}
          gradientColors={["#87CEEB", "#98FF98"]}
          defaultPosition={{ x: 460, y: 120 }}
          defaultSize={{ width: 600, height: 400 }}
          minSize={{ width: 280, height: 240 }}
          onClose={() => closeWindow("life")}
          onFocus={() => focusWindow("life")}
        >
          <ul className="list-none space-y-1 p-0">
            <li>📝 Cooking</li>
            <li>📝 Travel</li>
            <li>📝 Diary</li>
          </ul>
        </RetroWindow>
      </div>

      <Taskbar />
    </main>
  );
}
