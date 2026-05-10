"use client";

import { type ReactNode } from "react";
import { Rnd } from "react-rnd";

type FloatingCanvasWindowProps = {
  title: string;
  isOpen: boolean;
  zIndex: number;
  defaultPosition: { x: number; y: number };
  defaultSize: { width: number; height: number };
  minSize?: { width: number; height: number };
  surfaceMode?: "translucent" | "solid";
  frameMode?: "rounded" | "window";
  onClose: () => void;
  onFocus: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isMaximized?: boolean;
  children?: ReactNode;
};

export function FloatingCanvasWindow({
  title,
  isOpen,
  zIndex,
  defaultPosition,
  defaultSize,
  minSize = { width: 720, height: 620 },
  surfaceMode = "translucent",
  frameMode = "rounded",
  onClose,
  onFocus,
  onMinimize,
  onMaximize,
  isMaximized = false,
  children,
}: FloatingCanvasWindowProps) {
  if (!isOpen) return null;

  const handleZ = 50;

  const resizeHandleStyles = {
    top: { height: 10, top: -5, zIndex: handleZ, pointerEvents: "auto" },
    right: { width: 10, right: -5, zIndex: handleZ, pointerEvents: "auto" },
    bottom: { height: 10, bottom: -5, zIndex: handleZ, pointerEvents: "auto" },
    left: { width: 10, left: -5, zIndex: handleZ, pointerEvents: "auto" },
    topRight: { width: 18, height: 18, top: -9, right: -9, zIndex: handleZ, pointerEvents: "auto" },
    bottomRight: { width: 18, height: 18, bottom: -9, right: -9, zIndex: handleZ, pointerEvents: "auto" },
    bottomLeft: { width: 18, height: 18, bottom: -9, left: -9, zIndex: handleZ, pointerEvents: "auto" },
    topLeft: { width: 18, height: 18, top: -9, left: -9, zIndex: handleZ, pointerEvents: "auto" },
  } as const;

  const windowModeContent = (
    <section
      className={`win98-outset flex h-full w-full flex-col p-[3px] shadow-[8px_8px_0_rgba(0,0,0,0.22)] ${
        surfaceMode === "solid" ? "bg-[#d4d0c8]" : "bg-[#efe8ee]/96 backdrop-blur-sm"
      }`}
    >
      <header
        className={`floating-canvas-drag-handle relative flex items-center bg-[linear-gradient(90deg,#ff5db1,#39ff14)] px-3 py-2 ${
          isMaximized ? "cursor-default" : "cursor-grab active:cursor-grabbing"
        }`}
      >
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            aria-label={`Close ${title}`}
            className="h-3.5 w-3.5 rounded-full border border-black/30 bg-[#ff5f57]"
            onClick={onClose}
          />
          <button
            type="button"
            aria-label={`Minimize ${title}`}
            className="h-3.5 w-3.5 rounded-full border border-black/30 bg-[#ffd43b]"
            onClick={onMinimize}
          />
          <button
            type="button"
            aria-label={`${isMaximized ? "Restore" : "Maximize"} ${title}`}
            className="h-3.5 w-3.5 rounded-full border border-black/30 bg-[#52d96b]"
            onClick={onMaximize}
          />
        </div>
        <h2 className="absolute left-1/2 -translate-x-1/2 truncate text-xs font-bold uppercase tracking-[0.12em] text-white">
          {title}
        </h2>
      </header>
      <div className="min-h-0 flex-1 bg-white p-3">{children}</div>
    </section>
  );

  const roundedModeContent = (
    <section
      className={`flex h-full w-full flex-col rounded-[36px] p-4 shadow-[0_20px_48px_rgba(0,0,0,0.24)] ${
        surfaceMode === "solid" ? "bg-[#f4f0f4]" : "bg-[#efe8ee]/96 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center justify-between pb-3">
        <div
          className={`floating-canvas-drag-handle flex min-w-0 flex-1 items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#6c6377] ${
            isMaximized ? "cursor-default" : "cursor-grab active:cursor-grabbing"
          }`}
          onMouseDown={onFocus}
        >
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff8fb1]" />
          <span className="truncate">{title}</span>
        </div>
        <button
          type="button"
          aria-label={`Close ${title}`}
          className="ml-3 flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-lg font-bold text-[#ff4b4b] shadow-[0_4px_14px_rgba(0,0,0,0.16)]"
          onClick={onClose}
        >
          {"×"}
        </button>
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </section>
  );

  const content = frameMode === "window" ? windowModeContent : roundedModeContent;

  if (isMaximized) {
    return (
      <div className="absolute inset-0" style={{ zIndex }}>
        {content}
      </div>
    );
  }

  return (
    <Rnd
      className="retro-rnd absolute"
      style={{ zIndex }}
      bounds="parent"
      dragHandleClassName="floating-canvas-drag-handle"
      cancel=".retro-resize-handle, button"
      enableResizing={{
        top: true,
        right: true,
        bottom: true,
        left: true,
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true,
      }}
      default={{
        x: defaultPosition.x,
        y: defaultPosition.y,
        width: defaultSize.width,
        height: defaultSize.height,
      }}
      minWidth={minSize.width}
      minHeight={minSize.height}
      onDragStart={onFocus}
      onResizeStart={onFocus}
      resizeHandleStyles={resizeHandleStyles}
      resizeHandleWrapperStyle={{ zIndex: handleZ, pointerEvents: "none" }}
      resizeHandleClasses={{
        top: "retro-resize-handle retro-resize-handle-top",
        right: "retro-resize-handle retro-resize-handle-right",
        bottom: "retro-resize-handle retro-resize-handle-bottom",
        left: "retro-resize-handle retro-resize-handle-left",
        topRight: "retro-resize-handle retro-resize-handle-top-right",
        bottomRight: "retro-resize-handle retro-resize-handle-bottom-right",
        bottomLeft: "retro-resize-handle retro-resize-handle-bottom-left",
        topLeft: "retro-resize-handle retro-resize-handle-top-left",
      }}
    >
      {content}
    </Rnd>
  );
}
