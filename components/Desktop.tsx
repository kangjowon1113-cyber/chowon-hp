"use client";

import { FileText, Folder, LinkedinIcon, Mail, Music, Palette } from "lucide-react";
import { type MouseEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { EmailComposeWindow } from "@/components/EmailComposeWindow";
import { FloatingCanvasWindow } from "@/components/FloatingCanvasWindow";
import { HomeWindow } from "@/components/HomeWindow";
import { MyWorks, WORK_PROJECTS } from "@/components/MyWorks";
import { RetroWindow } from "@/components/RetroWindow";
import { Taskbar } from "@/components/Taskbar";
import { CreateWindow } from "@/components/CreateWindow";
import { DatingAlgorithmsPrototype } from "@/components/works/debugging-dating-algorithms/DatingAlgorithmsPrototype";
import { AIModeratorsContent } from "@/components/works/ai-moderators/AIModeratorsContent";
import { KoreanEmoticonsContent } from "@/components/works/understanding-korean-emoticons/KoreanEmoticonsContent";

type FolderKey = "work" | "create" | "life";
type IconKey = "about" | FolderKey;
type WindowKey = "home" | FolderKey;
type MobileSectionKey = "about" | "work" | "music" | "artworks";
type ArtworkImage = {
  src: string;
  alt?: string;
  caption?: ReactNode;
  chapterTitle?: string;
  /** default: 기본 높이 · prominent: 메인 이미지 등 ~1.2배 · tall: diagram 등 더 큼 */
  layout?: "default" | "tall" | "prominent";
};
type ArtworkGroup = {
  id: string;
  title: string;
  detailTitle?: string;
  thumbnail: string;
  images: ArtworkImage[];
};

const desktopItems: Array<{ key: IconKey; label: string }> = [
  { key: "about", label: "About Me" },
  { key: "work", label: "Work" },
  { key: "life", label: "Art" },
  { key: "create", label: "Music" },
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

const ARTWORK_GROUPS: ArtworkGroup[] = [
  {
    id: "visualizing-social-problems-capitalism",
    title: "Visualizing Social Problems - Capitalism",
    detailTitle: "Visualizing Capitalism",
    thumbnail: "/create/visualizing capitalism/대표이미지.png",
    images: [
      {
        src: "/create/visualizing capitalism/대표이미지.png",
        alt: "Representative image for Visualizing Social Problems - Capitalism",
        chapterTitle: "Final Visualization",
        caption: (
          <>
            I wanted to <strong>reflect Social problems in the form of architecture</strong>. Here,
            I deisgned a speculative design form of a dystopian city. It is a paradoxical
            demonstration of a problem of the society(Capitalism) in an architectural form.
          </>
        ),
      },
      {
        src: "/create/visualizing capitalism/concept.png",
        alt: "Concept image for Visualizing Social Problems - Capitalism",
        chapterTitle: "Inspirations",
        caption: (
          <>
            The vulnerable, who need temporary housing, parasitize and grow on the buildings of the
            wealthy. It is the rich who waters and grows the poor, and when the gap becomes too big,{" "}
            <strong>
              the poor will have to paratize on the rich and eventually, the society can collapse.
            </strong>
          </>
        ),
      },
      {
        src: "/create/visualizing capitalism/inspiration1.png",
        alt: "Inspiration 1 - Tower of Babel",
        caption: "Tower of Babel",
      },
      {
        src: "/create/visualizing capitalism/inspiration2.png",
        alt: "Inspiration 2 - Movie Parasite",
        caption: "Movie - Parasite",
      },
      {
        src: "/create/visualizing capitalism/inspiration3.png",
        alt: "Inspiration 3 - Kowloon Walled City",
        caption: "Kowloon Walled City",
      },
      {
        src: "/create/visualizing capitalism/mov.GIF",
        alt: "Moving interaction capture for Visualizing Social Problems - Capitalism",
        chapterTitle: "Interactive Image",
        caption: "Interactive motion capture",
      },
      {
        src: "/create/visualizing capitalism/exhibition1.jpg",
        alt: "Exhibition documentation 1",
        chapterTitle: "Exhibition",
      },
      {
        src: "/create/visualizing capitalism/exhibition.jpg",
        alt: "Exhibition documentation 2",
      },
    ],
  },
  {
    id: "my-favorite-memory",
    title: "My Favorite Memory",
    detailTitle: "My Favorite Memory",
    thumbnail: `/create/${encodeURIComponent("my fav memory")}/1.JPG`,
    images: [
      {
        src: `/create/${encodeURIComponent("my fav memory")}/1.JPG`,
        alt: "My favorite memory — main visualization",
        layout: "prominent",
        caption: (
          <>
            <p className="mb-3 last:mb-0">
              This project translates one of my favorite childhood memories into a spatial experience:
              playing with friends on the grass under a sprinkler.
            </p>
            <p className="mb-3 last:mb-0">
              The streams of water are represented through the shadows cast by strings, while the
              layered surface adds depth and playfulness.
            </p>
            <p>
              The overall form evokes a spiderweb, symbolizing the friendships and connections that
              emerged from this shared moment.
            </p>
          </>
        ),
      },
      {
        src: `/create/${encodeURIComponent("my fav memory")}/2.JPG`,
        alt: "My favorite memory — image 2",
      },
      {
        src: `/create/${encodeURIComponent("my fav memory")}/3.JPG`,
        alt: "My favorite memory — image 3",
      },
      {
        src: `/create/${encodeURIComponent("my fav memory")}/4.JPG`,
        alt: "My favorite memory — study 4",
        chapterTitle: "studies and sketches",
      },
      {
        src: `/create/${encodeURIComponent("my fav memory")}/5.JPG`,
        alt: "My favorite memory — study 5",
      },
      {
        src: `/create/${encodeURIComponent("my fav memory")}/6.JPG`,
        alt: "My favorite memory — study 6",
      },
    ],
  },
  {
    id: "library-different-lighting-book-genres",
    title: "Different lighting for Book Genres",
    detailTitle: "Library with Different lighting for Book Genres",
    thumbnail: "/create/library/section.png",
    images: [
      {
        src: "/create/library/section.png",
        alt: "Library with different lighting for book genres — section overview",
        caption: (
          <>
            This library is designed to{" "}
            <strong>
              help readers feel more immersed in each book, with lighting tailored to different
              genres.
            </strong>{" "}
            Take a quick tour through its various spaces.
          </>
        ),
      },
      {
        src: "/create/library/diagram.png",
        alt: "Library diagram",
        chapterTitle: "Library Spaces",
        caption: "Diagram",
        layout: "tall",
      },
      {
        src: `/create/library/${encodeURIComponent("mystery & thrillar books.png")}`,
        alt: "Mystery and thriller books area",
        caption: "Mystery & thriller books",
      },
      {
        src: "/create/library/magazines.png",
        alt: "Magazines area",
        caption: "Magazines",
      },
      {
        src: `/create/library/${encodeURIComponent("history books.png")}`,
        alt: "History books area",
        caption: "History books",
      },
      {
        src: "/create/library/Novels.png",
        alt: "Novels area",
        caption: "Novels",
      },
    ],
  },
  {
    id: "nude-croquis",
    title: "Nude Croquis",
    thumbnail: "/create/drawing/nude croquis 1.jpg",
    images: [
      { src: "/create/drawing/nude croquis 1.jpg" },
      { src: "/create/drawing/nude croquis 2.jpg" },
      { src: "/create/drawing/nude croquis 3.jpg" },
      { src: "/create/drawing/nude croquis 4.jpg" },
      { src: "/create/drawing/nude croquis 5.jpg" },
    ],
  },
  {
    id: "girl",
    title: "Girl",
    thumbnail: "/create/drawing/Girl.jpg",
    images: [{ src: "/create/drawing/Girl.jpg" }],
  },
];

/** Art 목록 창 기본 위치·크기 — 작품 상세 창은 이 오른쪽에 붙여 배치 */
const ART_BROWSER_WINDOW = {
  defaultPosition: { x: 280, y: 120 },
  defaultSize: { width: 600, height: 400 },
} as const;

/** 상세 뷰: 이미지가 세로로 창을 넘지 않도록 감싼 뒤 스케일 */
const ARTWORK_DETAIL_IMG_WRAP_CLASS =
  "flex w-full max-h-[min(54vmin,540px)] min-h-0 justify-center overflow-hidden";
const ARTWORK_DETAIL_IMG_INNER_CLASS = "max-h-full w-auto max-w-full object-contain";

const ARTWORK_DETAIL_IMG_WRAP_MOBILE_CLASS =
  "flex w-full max-h-[min(48vmin,360px)] min-h-0 justify-center overflow-hidden";

const ARTWORK_DETAIL_IMG_WRAP_TALL_CLASS =
  "flex w-full max-h-[min(72vmin,780px)] min-h-0 justify-center overflow-hidden";
const ARTWORK_DETAIL_IMG_WRAP_TALL_MOBILE_CLASS =
  "flex w-full max-h-[min(62vmin,520px)] min-h-0 justify-center overflow-hidden";

/** 기본 래퍼 대비 세로 약 1.2배 (메인 히어로 이미지) */
const ARTWORK_DETAIL_IMG_WRAP_PROMINENT_CLASS =
  "flex w-full max-h-[min(65vmin,648px)] min-h-0 justify-center overflow-hidden";
const ARTWORK_DETAIL_IMG_WRAP_PROMINENT_MOBILE_CLASS =
  "flex w-full max-h-[min(58vmin,432px)] min-h-0 justify-center overflow-hidden";

const profileTags = [
  { label: "#HCI_Researcher", textColor: "#98FF98", bgColor: "#FF1493" },
  { label: "#Product_Manager", textColor: "#FF69B4", bgColor: "#98FF98" },
  { label: "#Architecture_Designer", textColor: "#FF8C00", bgColor: "#E6B6FF" },
  { label: "#Music", textColor: "#E6E6FA", bgColor: "#FF6B35" },
  { label: "#Maximalist", textColor: "#FFF700", bgColor: "#BA55D3" },
] as const;

const mobileStats = [
  { label: "User Insight", value: 92, color: "bg-[#7b68ee]" },
  { label: "Problem Solving", value: 88, color: "bg-[#4cc9f0]" },
  { label: "Storytelling", value: 83, color: "bg-[#ff4d8d]" },
  { label: "Visual Taste", value: 90, color: "bg-[#f9c74f]" },
];

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
  const [isMobile, setIsMobile] = useState(false);
  const [mobileSection, setMobileSection] = useState<MobileSectionKey>("about");
  const [mobileWorkProjectId, setMobileWorkProjectId] = useState<string | null>(null);
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
  const [selectedArtworkGroupId, setSelectedArtworkGroupId] = useState<string | null>(null);
  const [artworkWindowLayout, setArtworkWindowLayout] = useState<ProjectWindowLayout | null>(null);
  const [artworkWindowZ, setArtworkWindowZ] = useState(40);
  const mobileArtworkDetailScrollRef = useRef<HTMLDivElement | null>(null);
  const desktopArtworkDetailScrollRef = useRef<HTMLElement | null>(null);
  const hasSeededInitialStickers = useRef(false);
  const selectedArtworkGroup = selectedArtworkGroupId
    ? (ARTWORK_GROUPS.find((g) => g.id === selectedArtworkGroupId) ?? null)
    : null;
  const [emailOpen, setEmailOpen] = useState(false);
  const [minimizedState, setMinimizedState] = useState<Record<WindowKey, boolean>>({
    home: false, work: false, create: false, life: false,
  });
  const [maximizedState, setMaximizedState] = useState<Record<WindowKey, boolean>>({
    home: false, work: false, create: false, life: false,
  });
  const [minimizedProjectState, setMinimizedProjectState] = useState<Record<string, boolean>>({});
  const [maximizedProjectState, setMaximizedProjectState] = useState<Record<string, boolean>>({});

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

  const minimizeWindow = (key: WindowKey) => {
    setMinimizedState((prev) => ({ ...prev, [key]: true }));
  };
  const restoreWindow = (key: WindowKey) => {
    setMinimizedState((prev) => ({ ...prev, [key]: false }));
    focusWindow(key);
  };
  const toggleMaximizeWindow = (key: WindowKey) => {
    setMaximizedState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const minimizeProjectWindow = (projectId: string) => {
    setMinimizedProjectState((prev) => ({ ...prev, [projectId]: true }));
  };
  const restoreProjectWindow = (projectId: string) => {
    setMinimizedProjectState((prev) => ({ ...prev, [projectId]: false }));
    focusProjectWindow(projectId);
  };
  const toggleMaximizeProjectWindow = (projectId: string) => {
    setMaximizedProjectState((prev) => ({ ...prev, [projectId]: !prev[projectId] }));
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
    if (projectId === "p1" || projectId === "p2" || projectId === "p3") {
      setProjectWindowLayout((prev) => ({ ...prev, [projectId]: getProjectCanvasLayout() }));
      if (projectId === "p1") {
        setProjectWindowFrame((prev) => ({ ...prev, [projectId]: "rounded" }));
        setProjectWindowSurface((prev) => ({ ...prev, [projectId]: "translucent" }));
      } else {
        setProjectWindowFrame((prev) => ({ ...prev, [projectId]: "window" }));
        setProjectWindowSurface((prev) => ({ ...prev, [projectId]: "solid" }));
      }
    } else {
      setProjectWindowSurface((prev) => ({ ...prev, [projectId]: "translucent" }));
    }
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

  const getArtworkDetailLayout = (): ProjectWindowLayout => {
    const margin = 24;
    const taskbarHeight = 40;
    const desktopWidth = window.innerWidth / desktopScale;
    const desktopHeight = (window.innerHeight - taskbarHeight) / desktopScale;

    const artRight = ART_BROWSER_WINDOW.defaultPosition.x + ART_BROWSER_WINDOW.defaultSize.width;
    const gap = -32;
    const maxWRight = desktopWidth - margin - (artRight + gap);
    const maxH = desktopHeight - margin * 2;
    const rawSide = Math.min(maxWRight, maxH, 640);
    const side = Math.max(360, Math.min(640, Math.floor(rawSide)));

    let x = artRight + gap;
    if (x + side > desktopWidth - margin) {
      x = desktopWidth - margin - side;
    }
    x = Math.max(margin, x);

    const y = Math.max(
      margin,
      Math.min(Math.round((desktopHeight - side) / 2), desktopHeight - side - margin),
    );

    return { x, y, width: side, height: side };
  };

  const openArtworkDetailWindow = (groupId: string) => {
    setSelectedArtworkGroupId(groupId);
    setArtworkWindowLayout(getArtworkDetailLayout());
    setMaxZ((prev) => {
      const next = prev + 1;
      setArtworkWindowZ(next);
      return next;
    });
  };

  const closeArtworkDetailWindow = () => {
    setSelectedArtworkGroupId(null);
  };

  const focusArtworkDetailWindow = () => {
    setMaxZ((prev) => {
      const next = prev + 1;
      setArtworkWindowZ(next);
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
    const mediaQuery = window.matchMedia("(max-width: 900px)");
    const handleMobileChange = () => setIsMobile(mediaQuery.matches);

    handleMobileChange();
    mediaQuery.addEventListener("change", handleMobileChange);
    return () => mediaQuery.removeEventListener("change", handleMobileChange);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      return;
    }
    setMobileSection("about");
    setMobileWorkProjectId(null);
    setSelectedArtworkGroupId(null);
  }, [isMobile]);

  useEffect(() => {
    setOpenState((prev) => ({ ...prev, home: true }));
    const taskbarHeight = 40;
    const margin = 24;
    const availableWidth = Math.max(780, window.innerWidth - margin * 2);
    const availableHeight = Math.max(520, window.innerHeight - taskbarHeight - margin * 2);
    const width = Math.max(860, Math.min(1040, Math.round(availableWidth * 0.7)));
    const height = Math.max(620, Math.min(805, Math.round(availableHeight * 0.85)));
    setHomeLayout({
      x: Math.max(12, (window.innerWidth / desktopScale - width) / 2),
      y: Math.max(12, ((window.innerHeight - taskbarHeight) / desktopScale - height) / 2),
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

  // 작품을 바꿔 열 때 이전 스크롤 위치를 유지하지 않도록 항상 맨 위로 이동
  useEffect(() => {
    mobileArtworkDetailScrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
    desktopArtworkDetailScrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [selectedArtworkGroupId]);

  const renderMobileWorkContent = () => {
    if (!mobileWorkProjectId) {
      return (
        <section className="flex h-full min-h-0 flex-col">

          <div className="min-h-0 flex-1 overflow-y-auto">
            {WORK_PROJECTS.map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() => setMobileWorkProjectId(project.id)}
                className="win98-outset mb-3 block w-full bg-white p-3 text-left last:mb-0"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#6a5acd]">
                  {project.type}
                </p>
                <h3 className="mt-1 text-base font-bold leading-5 text-[#272727]">{project.title}</h3>
                <p className="mt-1 text-xs leading-4 text-[#464646]">{project.summary}</p>
                <span className="mt-2 inline-block bg-[#ff1493] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#98ff98]">
                  {project.status}
                </span>
              </button>
            ))}
          </div>
        </section>
      );
    }

    return (
      <section className="flex h-full min-h-0 flex-col">
        <div className="min-h-0 flex-1 overflow-auto rounded border border-black/20 bg-white">
          {mobileWorkProjectId === "p1" ? (
            <DatingAlgorithmsPrototype />
          ) : mobileWorkProjectId === "p2" ? (
            <AIModeratorsContent />
          ) : mobileWorkProjectId === "p3" ? (
            <KoreanEmoticonsContent />
          ) : (
            <div className="p-4 text-sm text-[#404040]">
              This project is being prepared for mobile presentation.
            </div>
          )}
        </div>
      </section>
    );
  };

  const minimizedWindowChips = [
    openState.home && minimizedState.home ? { key: "home" as WindowKey, label: "Home" } : null,
    openState.work && minimizedState.work ? { key: "work" as WindowKey, label: "My Works" } : null,
    openState.create && minimizedState.create ? { key: "create" as WindowKey, label: "Music" } : null,
    openState.life && minimizedState.life ? { key: "life" as WindowKey, label: "Art" } : null,
  ]
    .filter((x): x is { key: WindowKey; label: string } => x !== null)
    .map(({ key, label }) => ({ key, label, onRestore: () => restoreWindow(key) }));

  const minimizedProjectChips = WORK_PROJECTS
    .filter((p) => minimizedProjectState[p.id] && projectWindowState[p.id])
    .map((p) => ({ key: p.id, label: p.title, onRestore: () => restoreProjectWindow(p.id) }));

  if (isMobile) {
    // Dating algorithms: full-screen with no nav bar
    if (mobileWorkProjectId === "p1") {
      return (
        <main className="relative h-screen w-screen overflow-hidden font-system98 text-[#111]">
          <EmailComposeWindow isOpen={emailOpen} zIndex={9999} onClose={() => setEmailOpen(false)} />
          <DatingAlgorithmsPrototype onBack={() => setMobileWorkProjectId(null)} />
        </main>
      );
    }

    return (
      <main className="desktop-grid relative h-screen w-screen overflow-hidden font-system98 text-[#111]">
        <EmailComposeWindow isOpen={emailOpen} zIndex={9999} onClose={() => setEmailOpen(false)} />
        <section className="h-full overflow-hidden pb-[56px]">
          <div className="h-full overflow-y-auto px-3 pb-4 pt-3">
            {mobileSection !== "about" ? (
              <div className="mb-2 border-b border-black/15 pb-2">
                <button
                  type="button"
                  onClick={() => {
                    if (mobileSection === "work" && mobileWorkProjectId) {
                      setMobileWorkProjectId(null);
                      return;
                    }
                    if (mobileSection === "artworks" && selectedArtworkGroupId) {
                      setSelectedArtworkGroupId(null);
                      return;
                    }
                    setMobileSection("about");
                    setMobileWorkProjectId(null);
                    setSelectedArtworkGroupId(null);
                  }}
                  className="win98-outset bg-white px-3 py-1 text-xs font-bold"
                >
                  ← Back
                </button>
              </div>
            ) : null}
            {mobileSection === "about" ? (
              <article className="mx-auto max-w-xl space-y-3">
                <div className="win98-outset overflow-hidden bg-[#ece6ff]">
                  <img
                    src="/home/1_mobile.jpg"
                    alt="Chowon profile"
                    className="h-[42vh] w-full object-cover object-center"
                  />
                </div>
                <div className="win98-outset bg-white p-3">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[#6a5acd]">Profile Card</p>
                  <h1 className="mt-1 text-2xl font-black tracking-wide">CHOWON</h1>
                  <p className="text-sm font-bold text-[#4f4f7f]">HCI Researcher · Product Manager · Seoul</p>
                  <p className="mt-2 text-sm leading-5">
                    I&apos;m an HCI researcher and Product Manager based in Seoul, passionate about
                    enhancing social and emotional connections in digital spaces.
                  </p>
                  <p className="mt-2 text-sm leading-5">
                    With a background in interior architecture, I&apos;ve long been fascinated by how
                    physical environments shape human experience — a perspective I now bring to designing
                    online interactions.
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
                </div>
                <div className="win98-outset bg-white p-3">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[#6a5acd]">RPG Stats</p>
                  <div className="mt-2 space-y-2">
                    {mobileStats.map((stat) => (
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
                </div>
              </article>
            ) : mobileSection === "work" ? (
              renderMobileWorkContent()
            ) : mobileSection === "music" ? (
              <section className="h-full overflow-hidden rounded border border-black/20 bg-white">
                <CreateWindow />
              </section>
            ) : (
              <section className="min-h-0">
                {selectedArtworkGroup ? (
                  <section className="flex h-full min-h-0 flex-col">
                    <div
                      ref={mobileArtworkDetailScrollRef}
                      className="min-h-0 flex-1 overflow-y-auto rounded border border-black/20 bg-white p-3"
                    >
                      {selectedArtworkGroup.detailTitle ? (
                        <h2 className="mb-3 text-lg font-black leading-6 text-[#2f2f2f]">
                          {selectedArtworkGroup.detailTitle}
                        </h2>
                      ) : (
                        <h3 className="mb-3 text-sm font-bold text-[#2f2f2f]">{selectedArtworkGroup.title}</h3>
                      )}
                      <div className="space-y-4">
                        {selectedArtworkGroup.images.map((image, index) => (
                          <div key={`${selectedArtworkGroup.id}-${index}`}>
                            {image.chapterTitle ? (
                              <h3 className="mb-2 text-[11px] font-black uppercase tracking-[0.12em] text-[#6a5acd]">
                                {image.chapterTitle}
                              </h3>
                            ) : null}
                            <article className="win98-inset bg-white p-2">
                              <div
                                className={
                                  image.layout === "tall"
                                    ? ARTWORK_DETAIL_IMG_WRAP_TALL_MOBILE_CLASS
                                    : image.layout === "prominent"
                                      ? ARTWORK_DETAIL_IMG_WRAP_PROMINENT_MOBILE_CLASS
                                      : ARTWORK_DETAIL_IMG_WRAP_MOBILE_CLASS
                                }
                              >
                                <img
                                  src={image.src}
                                  alt={image.alt ?? `${selectedArtworkGroup.title} image ${index + 1}`}
                                  className={ARTWORK_DETAIL_IMG_INNER_CLASS}
                                />
                              </div>
                              {image.caption ? (
                                <p className="mt-2 text-xs leading-5 text-[#3a3a3a]">{image.caption}</p>
                              ) : null}
                            </article>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {ARTWORK_GROUPS.map((group) => (
                      <button
                        key={group.id}
                        type="button"
                        onClick={() => setSelectedArtworkGroupId(group.id)}
                        className="win98-outset overflow-hidden bg-white text-left"
                      >
                        <img
                          src={group.thumbnail}
                          alt={group.title}
                          className="h-40 w-full object-cover"
                        />
                        <p className="px-2 py-1.5 text-[11px] font-bold text-[#2d2d2d]">{group.title}</p>
                        {group.images.length > 1 && (
                          <p className="px-2 pb-1.5 text-[10px] text-[#888]">{group.images.length} images</p>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </section>
            )}
          </div>
        </section>

        <nav className="win98-outset absolute bottom-0 left-0 right-0 z-50 h-[52px] bg-winGrey px-2 pb-[max(env(safe-area-inset-bottom),2px)] pt-1">
          <div className="flex h-full items-center gap-1">
            <button
              type="button"
              onClick={() => {
                setMobileSection("work");
                setMobileWorkProjectId(null);
              }}
              className={`win98-outset flex flex-1 items-center justify-center gap-1 py-1 text-xs font-bold ${mobileSection === "work" ? "bg-[#d2ccff]" : "bg-[#efefef]"}`}
            >
              <Folder size={12} />
              Work
            </button>
            <button
              type="button"
              onClick={() => setMobileSection("artworks")}
              className={`win98-outset flex flex-1 items-center justify-center gap-1 py-1 text-xs font-bold ${mobileSection === "artworks" ? "bg-[#c8f7d2]" : "bg-[#efefef]"}`}
            >
              <Palette size={12} />
              Art
            </button>
            <button
              type="button"
              onClick={() => setMobileSection("music")}
              className={`win98-outset flex flex-1 items-center justify-center gap-1 py-1 text-xs font-bold ${mobileSection === "music" ? "bg-[#ffd39f]" : "bg-[#efefef]"}`}
            >
              <Music size={12} />
              Music
            </button>

            <div className="mx-0.5 h-5 w-px bg-[#aaaaaa]" />

            <button
              type="button"
              onClick={() => setEmailOpen(true)}
              className="win98-outset flex shrink-0 items-center justify-center px-2 py-1 active:translate-x-px active:translate-y-px"
              aria-label="Email"
            >
              <Mail size={13} />
            </button>
            <a
              href="https://www.linkedin.com/in/chowonkang"
              target="_blank"
              rel="noreferrer"
              className="win98-outset flex shrink-0 items-center justify-center px-2 py-1 active:translate-x-px active:translate-y-px"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={13} />
            </a>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noreferrer"
              className="win98-outset flex shrink-0 items-center justify-center gap-0.5 px-2 py-1 text-[10px] font-bold no-underline active:translate-x-px active:translate-y-px"
            >
              <FileText size={12} />
              CV
            </a>
          </div>
        </nav>
      </main>
    );
  }

  return (
    <main
      className="desktop-grid relative h-screen w-screen overflow-hidden font-system98 text-[#111]"
      onMouseDown={handleDesktopBackgroundMouseDown}
    >
      <EmailComposeWindow
        isOpen={emailOpen}
        zIndex={9999}
        onClose={() => setEmailOpen(false)}
      />
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
              onClick={() => {
                handleDesktopItemClick(item.key);
                if (item.key === "about") openWindow("home");
                else if (item.key === "work") openWindow("work");
                else openWindow(item.key as FolderKey);
              }}
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
                ) : item.key === "create" ? (
                  <Music size={24} strokeWidth={1.75} className="text-[#c4006e]" />
                ) : item.key === "life" ? (
                  <Palette size={24} strokeWidth={1.75} className="text-[#7b3fa0]" />
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
              isOpen={openState.home && !minimizedState.home}
              zIndex={zIndex.home}
              defaultPosition={{ x: homeLayout.x, y: homeLayout.y }}
              defaultSize={{ width: homeLayout.width, height: homeLayout.height }}
              minSize={{
                width: Math.max(320, Math.min(480, homeLayout.width)),
                height: Math.max(240, Math.min(340, homeLayout.height)),
              }}
              onClose={() => closeWindow("home")}
              onFocus={() => focusWindow("home")}
              onMinimize={() => minimizeWindow("home")}
              onMaximize={() => toggleMaximizeWindow("home")}
              isMaximized={maximizedState.home}
            />
          ) : null}

          <RetroWindow
            title="My Works"
            isOpen={openState.work && !minimizedState.work}
            zIndex={zIndex.work}
            gradientColors={["#FF1493", "#FF69B4"]}
            defaultPosition={{ x: 160, y: 80 }}
            defaultSize={{ width: 740, height: 520 }}
            minSize={{ width: 460, height: 300 }}
            onClose={() => closeWindow("work")}
            onFocus={() => focusWindow("work")}
            onMinimize={() => minimizeWindow("work")}
            onMaximize={() => toggleMaximizeWindow("work")}
            isMaximized={maximizedState.work}
          >
            <MyWorks onOpenProject={openProjectWindow} />
          </RetroWindow>

          {WORK_PROJECTS.map((project, index) =>
            project.id === "p1" ? (
              <FloatingCanvasWindow
                key={project.id}
                title={project.title}
                isOpen={Boolean(projectWindowState[project.id]) && !minimizedProjectState[project.id]}
                zIndex={projectWindowZ[project.id] ?? 10}
                defaultPosition={projectWindowLayout[project.id] ?? { x: 300, y: 36 }}
                defaultSize={projectWindowLayout[project.id] ?? { width: 1280, height: 840 }}
                minSize={{ width: 860, height: 680 }}
                surfaceMode={projectWindowSurface[project.id] ?? "translucent"}
                frameMode={projectWindowFrame[project.id] ?? "rounded"}
                onClose={() => closeProjectWindow(project.id)}
                onFocus={() => focusProjectWindow(project.id)}
                onMinimize={() => minimizeProjectWindow(project.id)}
                onMaximize={() => toggleMaximizeProjectWindow(project.id)}
                isMaximized={Boolean(maximizedProjectState[project.id])}
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
            ) : project.id === "p2" ? (
              <FloatingCanvasWindow
                key={project.id}
                title={project.title}
                isOpen={Boolean(projectWindowState[project.id]) && !minimizedProjectState[project.id]}
                zIndex={projectWindowZ[project.id] ?? 10}
                defaultPosition={projectWindowLayout[project.id] ?? { x: 300, y: 36 }}
                defaultSize={projectWindowLayout[project.id] ?? { width: 1280, height: 840 }}
                minSize={{ width: 860, height: 680 }}
                surfaceMode={projectWindowSurface[project.id] ?? "solid"}
                frameMode={projectWindowFrame[project.id] ?? "window"}
                onClose={() => closeProjectWindow(project.id)}
                onFocus={() => focusProjectWindow(project.id)}
                onMinimize={() => minimizeProjectWindow(project.id)}
                onMaximize={() => toggleMaximizeProjectWindow(project.id)}
                isMaximized={Boolean(maximizedProjectState[project.id])}
              >
                <AIModeratorsContent />
              </FloatingCanvasWindow>
            ) : project.id === "p3" ? (
              <FloatingCanvasWindow
                key={project.id}
                title={project.title}
                isOpen={Boolean(projectWindowState[project.id]) && !minimizedProjectState[project.id]}
                zIndex={projectWindowZ[project.id] ?? 10}
                defaultPosition={projectWindowLayout[project.id] ?? { x: 300, y: 36 }}
                defaultSize={projectWindowLayout[project.id] ?? { width: 1280, height: 840 }}
                minSize={{ width: 860, height: 680 }}
                surfaceMode={projectWindowSurface[project.id] ?? "solid"}
                frameMode={projectWindowFrame[project.id] ?? "window"}
                onClose={() => closeProjectWindow(project.id)}
                onFocus={() => focusProjectWindow(project.id)}
                onMinimize={() => minimizeProjectWindow(project.id)}
                onMaximize={() => toggleMaximizeProjectWindow(project.id)}
                isMaximized={Boolean(maximizedProjectState[project.id])}
              >
                <KoreanEmoticonsContent />
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
            title="Music"
            isOpen={openState.create && !minimizedState.create}
            zIndex={zIndex.create}
            gradientColors={["#FF8C00", "#FFD700"]}
            defaultPosition={{ x: 180, y: 20 }}
            defaultSize={{ width: 936, height: 624 }}
            minSize={{ width: 420, height: 300 }}
            noPadding
            onClose={() => closeWindow("create")}
            onFocus={() => focusWindow("create")}
            onMinimize={() => minimizeWindow("create")}
            onMaximize={() => toggleMaximizeWindow("create")}
            isMaximized={maximizedState.create}
          >
            <CreateWindow />
          </RetroWindow>

          <RetroWindow
            title="Art"
            isOpen={openState.life && !minimizedState.life}
            zIndex={zIndex.life}
            gradientColors={["#87CEEB", "#98FF98"]}
            defaultPosition={ART_BROWSER_WINDOW.defaultPosition}
            defaultSize={ART_BROWSER_WINDOW.defaultSize}
            minSize={{ width: 280, height: 240 }}
            onClose={() => {
              closeWindow("life");
              closeArtworkDetailWindow();
            }}
            onFocus={() => focusWindow("life")}
            onMinimize={() => minimizeWindow("life")}
            onMaximize={() => toggleMaximizeWindow("life")}
            isMaximized={maximizedState.life}
          >
            <section className="h-full min-h-0 overflow-y-auto bg-white p-3">
              <div className="grid grid-cols-2 gap-3">
                {ARTWORK_GROUPS.map((group) => (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => openArtworkDetailWindow(group.id)}
                    className="win98-outset overflow-hidden bg-white text-left"
                  >
                    <img
                      src={group.thumbnail}
                      alt={group.title}
                      className="h-40 w-full object-cover"
                    />
                    <p className="px-2 py-1.5 text-[11px] font-bold text-[#2d2d2d]">{group.title}</p>
                    {group.images.length > 1 && (
                      <p className="px-2 pb-1.5 text-[10px] text-[#888]">{group.images.length} images</p>
                    )}
                  </button>
                ))}
              </div>
            </section>
          </RetroWindow>

          {selectedArtworkGroup ? (
            <RetroWindow
              title={selectedArtworkGroup.title}
              isOpen={openState.life && Boolean(selectedArtworkGroup)}
              zIndex={artworkWindowZ}
              gradientColors={["#87CEEB", "#98FF98"]}
              defaultPosition={artworkWindowLayout ?? { x: 848, y: 96 }}
              defaultSize={artworkWindowLayout ?? { width: 640, height: 640 }}
              minSize={{ width: 400, height: 400 }}
              onClose={closeArtworkDetailWindow}
              onFocus={focusArtworkDetailWindow}
            >
              <section
                ref={desktopArtworkDetailScrollRef}
                className="h-full min-h-0 overflow-y-auto bg-white px-3 pb-4 pt-2"
              >
                {selectedArtworkGroup.detailTitle ? (
                  <h2 className="mb-3 px-1 text-2xl font-black leading-8 text-[#2f2f2f]">
                    {selectedArtworkGroup.detailTitle}
                  </h2>
                ) : null}
                <div className="space-y-4">
                  {selectedArtworkGroup.images.map((image, index) => (
                    <div key={`${selectedArtworkGroup.id}-${index}`}>
                      {image.chapterTitle ? (
                        <h3 className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-[#6a5acd]">
                          {image.chapterTitle}
                        </h3>
                      ) : null}
                      <article className="win98-inset bg-white p-2">
                        <div
                          className={
                            image.layout === "tall"
                              ? ARTWORK_DETAIL_IMG_WRAP_TALL_CLASS
                              : image.layout === "prominent"
                                ? ARTWORK_DETAIL_IMG_WRAP_PROMINENT_CLASS
                                : ARTWORK_DETAIL_IMG_WRAP_CLASS
                          }
                        >
                          <img
                            src={image.src}
                            alt={image.alt ?? `${selectedArtworkGroup.title} image ${index + 1}`}
                            className={ARTWORK_DETAIL_IMG_INNER_CLASS}
                          />
                        </div>
                        {image.caption ? (
                          <p className="mt-3 text-sm leading-7 text-[#3a3a3a]">{image.caption}</p>
                        ) : null}
                      </article>
                    </div>
                  ))}
                </div>
              </section>
            </RetroWindow>
          ) : null}
        </div>

        <Taskbar
          onEmailClick={() => setEmailOpen(true)}
          minimizedWindows={[...minimizedWindowChips, ...minimizedProjectChips]}
        />
      </div>
    </main>
  );
}
