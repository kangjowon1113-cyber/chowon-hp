"use client";

import { FileText, Folder } from "lucide-react";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import { FloatingCanvasWindow } from "@/components/FloatingCanvasWindow";
import { HomeWindow } from "@/components/HomeWindow";
import { MyWorks, WORK_PROJECTS } from "@/components/MyWorks";
import { RetroWindow } from "@/components/RetroWindow";
import { Taskbar } from "@/components/Taskbar";
import { CreateWindow } from "@/components/CreateWindow";
import { DatingAlgorithmsPrototype } from "@/components/works/debugging-dating-algorithms/DatingAlgorithmsPrototype";
import { EmotionGraph } from "@/components/works/understanding-korean-emoticons/EmotionGraph";

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

const stickerImages = [
  "/stickers/Group 1.png",
  "/stickers/Group 2.png",
  "/stickers/Star 1.png",
  "/stickers/Star 2.png",
  "/stickers/Star 3.png",
  "/stickers/Vector 1.png",
  "/stickers/Vector 2.png",
  "/stickers/Vector 3.png",
] as const;

const INITIAL_STICKER_COUNT = 40;

type Sticker = {
  id: string;
  src: string;
  x: number;
  y: number;
  rotation: number;
  size: number;
};

type ProjectWindowLayout = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function Desktop() {
  const desktopScale = 0.9;
  const desktopScalePercent = `${(1 / desktopScale) * 100}%`;
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
  const [projectWindowSurface, setProjectWindowSurface] = useState<Record<string, "translucent" | "solid">>(
    {},
  );
  const [projectWindowFrame, setProjectWindowFrame] = useState<Record<string, "rounded" | "window">>(
    {},
  );
  const [projectWindowLayout, setProjectWindowLayout] = useState<Record<string, ProjectWindowLayout>>(
    {},
  );
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const hasSeededInitialStickers = useRef(false);

  const getStickerSize = (src: string, baseSize: number) => {
    return src === "/stickers/Group 2.png" ? Math.max(14, Math.round(baseSize / 3)) : baseSize;
  };

  const createSticker = (src: string, x: number, y: number, size: number): Sticker => ({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    src,
    x,
    y,
    rotation: Math.floor(Math.random() * 24) - 12,
    size,
  });

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

  const getProjectCanvasLayout = (): ProjectWindowLayout => {
    const taskbarHeight = 40;
    const margin = 24;
    const availableWidth = Math.max(760, window.innerWidth - margin * 2);
    const availableHeight = Math.max(620, window.innerHeight - taskbarHeight - margin * 2);
    const width = Math.max(820, Math.min(1280, Math.round(availableWidth * 0.74)));
    const height = Math.max(640, Math.min(820, Math.round(availableHeight * 0.76)));

    return {
      x: Math.max(margin, window.innerWidth - width - 24),
      y: Math.max(18, Math.round((window.innerHeight - taskbarHeight - height) / 2)),
      width,
      height,
    };
  };

  const openProjectWindow = (projectId: string) => {
    setMaxZ((prev) => {
      const next = prev + 1;
      setProjectWindowZ((old) => ({ ...old, [projectId]: next }));
      return next;
    });
    if (projectId === "p1" || projectId === "p3") {
      setProjectWindowLayout((prev) => ({ ...prev, [projectId]: getProjectCanvasLayout() }));
      setProjectWindowFrame((prev) => ({ ...prev, [projectId]: "rounded" }));
    }
    setProjectWindowSurface((prev) => ({ ...prev, [projectId]: "translucent" }));
    setProjectWindowState((prev) => ({ ...prev, [projectId]: true }));
  };

  const closeProjectWindow = (projectId: string) => {
    setProjectWindowSurface((prev) => ({ ...prev, [projectId]: "translucent" }));
    setProjectWindowFrame((prev) => ({ ...prev, [projectId]: "rounded" }));
    setProjectWindowState((prev) => ({ ...prev, [projectId]: false }));
  };

  const focusProjectWindow = (projectId: string) => {
    setMaxZ((prev) => {
      const next = prev + 1;
      setProjectWindowZ((old) => ({ ...old, [projectId]: next }));
      return next;
    });
  };

  const placeRandomSticker = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const baseSize = 44 + Math.floor(Math.random() * 26);
    // Divide by desktopScale to convert from screen coordinates to the scaled div's local coordinate space
    const rawX = (event.clientX - rect.left) / desktopScale;
    const rawY = (event.clientY - rect.top) / desktopScale;
    const src = stickerImages[Math.floor(Math.random() * stickerImages.length)];
    const size = getStickerSize(src, baseSize);
    const x = Math.min(rect.width / desktopScale - size / 2, Math.max(size / 2, rawX));
    const y = Math.min(rect.height / desktopScale - size / 2, Math.max(size / 2, rawY));

    setStickers((prev) => [...prev, createSticker(src, x, y, size)]);
  };

  const handleDesktopBackgroundMouseDown = (event: MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) {
      setSelectedIcon(null);
      placeRandomSticker(event);
    }
  };

  useEffect(() => {
    setOpenState((prev) => ({ ...prev, home: true }));
    const taskbarHeight = 40;
    const margin = 24;
    const availableWidth = Math.max(780, window.innerWidth - margin * 2);
    const availableHeight = Math.max(520, window.innerHeight - taskbarHeight - margin * 2);
    const width = Math.max(860, Math.min(1040, Math.round(availableWidth * 0.7)));
    const height = Math.max(620, Math.min(805, Math.round(availableHeight * 0.85)));
    setHomeLayout({
      x: Math.max(12, (window.innerWidth - width) / 2),
      y: Math.max(12, (window.innerHeight - taskbarHeight - height) / 2),
      width,
      height,
    });
  }, []);

  useEffect(() => {
    if (hasSeededInitialStickers.current) {
      return;
    }

    hasSeededInitialStickers.current = true;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const generated: Sticker[] = [];
    const maxAttempts = INITIAL_STICKER_COUNT * 40;

    let attempts = 0;
    while (generated.length < INITIAL_STICKER_COUNT && attempts < maxAttempts) {
      attempts += 1;
      const src = stickerImages[Math.floor(Math.random() * stickerImages.length)];
      const baseSize = 44 + Math.floor(Math.random() * 26);
      const size = getStickerSize(src, baseSize);
      const x = size / 2 + Math.random() * Math.max(1, vw - size);
      const y = size / 2 + Math.random() * Math.max(1, vh - size);

      const collidesTooMuch = generated.some((sticker) => {
        const dx = sticker.x - x;
        const dy = sticker.y - y;
        const distance = Math.hypot(dx, dy);
        const minDistance = (sticker.size + size) * 0.28;
        return distance < minDistance;
      });

      if (collidesTooMuch) {
        continue;
      }

      generated.push(createSticker(src, x, y, size));
    }

    setStickers(generated);
  }, []);

  return (
    <main
      className="desktop-grid relative h-screen w-screen overflow-hidden font-system98 text-[#111]"
      onMouseDown={handleDesktopBackgroundMouseDown}
    >
      <div
        className="absolute inset-0"
        style={{
          transform: `translateX(-50%) scale(${desktopScale})`,
          transformOrigin: "top center",
          width: desktopScalePercent,
          height: desktopScalePercent,
          left: "50%",
        }}
      >
        <section
          className="absolute left-4 top-5 z-10 flex flex-col gap-5"
          onMouseDown={handleDesktopBackgroundMouseDown}
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

        <div className="pointer-events-none absolute inset-0 z-[1]">
          {stickers.map((sticker) => (
            <img
              key={sticker.id}
              src={sticker.src}
              alt=""
              className="absolute select-none"
              draggable={false}
              style={{
                left: `${sticker.x}px`,
                top: `${sticker.y}px`,
                width: `${sticker.size}px`,
                transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg)`,
                filter: "drop-shadow(2px 2px 0 rgba(0, 0, 0, 0.25))",
              }}
            />
          ))}
        </div>

        <div
          className="absolute inset-0 min-h-0 pb-10"
          onMouseDown={handleDesktopBackgroundMouseDown}
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

          {WORK_PROJECTS.map((project, index) =>
            project.id === "p1" ? (
              <FloatingCanvasWindow
                key={project.id}
                title={project.title}
                isOpen={Boolean(projectWindowState[project.id])}
                zIndex={projectWindowZ[project.id] ?? 10}
                defaultPosition={projectWindowLayout[project.id] ?? { x: 300, y: 36 }}
                defaultSize={projectWindowLayout[project.id] ?? { width: 1280, height: 840 }}
                minSize={{ width: 860, height: 680 }}
                surfaceMode={projectWindowSurface[project.id] ?? "translucent"}
                frameMode={projectWindowFrame[project.id] ?? "rounded"}
                onClose={() => closeProjectWindow(project.id)}
                onFocus={() => focusProjectWindow(project.id)}
              >
                <DatingAlgorithmsPrototype
                  onSurfaceModeChange={(surfaceMode) =>
                    setProjectWindowSurface((prev) => ({ ...prev, [project.id]: surfaceMode }))
                  }
                  onFrameModeChange={(frameMode) =>
                    setProjectWindowFrame((prev) => ({ ...prev, [project.id]: frameMode }))
                  }
                />
              </FloatingCanvasWindow>
            ) : project.id === "p3" ? (
              <FloatingCanvasWindow
                key={project.id}
                title={project.title}
                isOpen={Boolean(projectWindowState[project.id])}
                zIndex={projectWindowZ[project.id] ?? 10}
                defaultPosition={projectWindowLayout[project.id] ?? { x: 300, y: 36 }}
                defaultSize={projectWindowLayout[project.id] ?? { width: 1280, height: 840 }}
                minSize={{ width: 860, height: 680 }}
                surfaceMode={projectWindowSurface[project.id] ?? "translucent"}
                frameMode={projectWindowFrame[project.id] ?? "rounded"}
                onClose={() => closeProjectWindow(project.id)}
                onFocus={() => focusProjectWindow(project.id)}
              >
                <EmotionGraph />
              </FloatingCanvasWindow>
            ) : (
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
            ),
          )}

          <RetroWindow
            title="Create"
            isOpen={openState.create}
            zIndex={zIndex.create}
            gradientColors={["#FF8C00", "#FFD700"]}
            defaultPosition={{ x: 290, y: 180 }}
          defaultSize={{ width: 780, height: 520 }}
          minSize={{ width: 420, height: 300 }}
            onClose={() => closeWindow("create")}
            onFocus={() => focusWindow("create")}
          >
            <CreateWindow />
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
      </div>
    </main>
  );
}
