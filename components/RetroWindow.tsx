"use client";

import { type ReactNode } from "react";
import { Rnd } from "react-rnd";

type RetroWindowProps = {
  title: string;
  isOpen: boolean;
  zIndex: number;
  gradientColors: [string, string];
  defaultPosition: { x: number; y: number };
  defaultSize: { width: number; height: number };
  minSize?: { width: number; height: number };
  noPadding?: boolean;
  rounded?: boolean;
  onClose: () => void;
  onFocus: () => void;
  children?: ReactNode;
};

export function RetroWindow({
  title,
  isOpen,
  zIndex,
  gradientColors,
  defaultPosition,
  defaultSize,
  minSize = { width: 420, height: 280 },
  noPadding = false,
  rounded = false,
  onClose,
  onFocus,
  children,
}: RetroWindowProps) {
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

  return (
    <Rnd
      className="retro-rnd absolute"
      style={{ zIndex }}
      bounds="parent"
      dragHandleClassName="retro-window-handle"
      cancel=".retro-resize-handle"
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
      <section
        className={`win98-outset flex h-full min-h-0 w-full flex-col bg-winGrey shadow-[6px_6px_0_#5a5a5a] ${rounded ? "overflow-hidden rounded-xl" : ""}`}
        onMouseDown={onFocus}
      >
        <header
          className={`retro-window-handle flex cursor-move items-center justify-between px-3 py-2 ${rounded ? "rounded-t-xl" : ""}`}
          style={{
            backgroundImage: `linear-gradient(90deg, ${gradientColors[0]}, ${gradientColors[1]})`,
          }}
        >
          <h2 className="text-sm font-bold text-white">{title}</h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={`Maximize ${title} window`}
              className="h-3.5 w-3.5 rounded-full border border-black/40 bg-[#52d96b]"
            />
            <button
              type="button"
              aria-label={`Minimize ${title} window`}
              className="h-3.5 w-3.5 rounded-full border border-black/40 bg-[#ffd43b]"
            />
            <button
              type="button"
              aria-label={`Close ${title} window`}
              className="h-3.5 w-3.5 rounded-full border border-black/40 bg-[#ff4b4b]"
              onClick={onClose}
            />
          </div>
        </header>

        {noPadding ? (
          <div className="min-h-0 flex-1 overflow-hidden">
            {children}
          </div>
        ) : (
          <div className="min-h-0 flex-1 p-3">
            <div className="win98-inset h-full min-h-0 overflow-y-auto bg-white p-3 text-sm leading-6">
              {children}
            </div>
          </div>
        )}
      </section>
    </Rnd>
  );
}

