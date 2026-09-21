"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { Publication } from "@/components/Publications";
import { RetroWindow } from "@/components/RetroWindow";

const PdfDocumentViewer = dynamic(() => import("@/components/PdfDocumentViewer"), {
  ssr: false,
  loading: () => <p className="p-4 text-sm">Loading PDF…</p>,
});

type PublicationPdfWindowProps = {
  publication: Publication | null;
  desktopScale: number;
  gradientColors: [string, string];
  zIndex: number;
  minimized: boolean;
  onClose: () => void;
  onFocus: () => void;
  onMinimize: () => void;
};

export function PublicationPdfWindow({
  publication,
  desktopScale,
  gradientColors,
  zIndex,
  minimized,
  onClose,
  onFocus,
  onMinimize,
}: PublicationPdfWindowProps) {
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [maximized, setMaximized] = useState(false);

  useEffect(() => {
    const updateViewport = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  if (!publication || !viewport.width) return null;

  const desktopWidth = viewport.width / desktopScale;
  const desktopHeight = viewport.height / desktopScale;
  const margin = 12;
  const taskbarHeight = 40;
  const width = Math.min(920, desktopWidth * 0.62);
  const height = desktopHeight - taskbarHeight - margin * 2;
  const actionClassName = "win98-outset inline-block bg-[#efefef] px-2 py-1 text-xs font-bold text-[#000080] no-underline active:translate-x-px active:translate-y-px";

  return (
    <RetroWindow
      key={`${viewport.width}-${viewport.height}`}
      title="PDF Reader"
      isOpen={!minimized}
      zIndex={zIndex}
      gradientColors={gradientColors}
      defaultPosition={{ x: desktopWidth - width - margin, y: margin }}
      defaultSize={{ width, height }}
      minSize={{ width: 420, height: Math.min(360, height) }}
      noPadding
      onClose={onClose}
      onFocus={onFocus}
      onMinimize={onMinimize}
      onMaximize={() => setMaximized((value) => !value)}
      isMaximized={maximized}
      maximizedBottomInset={taskbarHeight}
      scale={desktopScale}
    >
      <div className="flex h-full min-h-0 flex-col">
        <div className="flex shrink-0 gap-2 whitespace-nowrap border-b-2 border-[#808080] bg-white px-3 py-2">
          <a className={actionClassName} href={publication.pdf} target="_blank" rel="noreferrer">Open in new tab ↗</a>
          <a className={actionClassName} href={publication.pdf} download>Download PDF ↓</a>
          <a className={actionClassName} href={publication.href} target="_blank" rel="noreferrer">ACM ↗</a>
        </div>
        <PdfDocumentViewer
          key={publication.pdf}
          file={publication.pdf}
        />
      </div>
    </RetroWindow>
  );
}
