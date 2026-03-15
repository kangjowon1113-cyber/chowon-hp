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
  onClose,
  onFocus,
  children,
}: RetroWindowProps) {
  if (!isOpen) return null;

  return (
    <Rnd
      className="retro-rnd absolute"
      style={{ zIndex }}
      bounds="parent"
      dragHandleClassName="retro-window-handle"
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
        className="win98-outset flex h-full w-full flex-col bg-winGrey shadow-[6px_6px_0_#5a5a5a]"
        onMouseDown={onFocus}
      >
        <header
          className="retro-window-handle flex cursor-move items-center justify-between px-3 py-2"
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

        <div className="flex-1 p-3">
          <div className="win98-inset h-full overflow-y-auto bg-white p-3 text-sm leading-6">
            {children}
          </div>
        </div>
      </section>
    </Rnd>
  );
}

