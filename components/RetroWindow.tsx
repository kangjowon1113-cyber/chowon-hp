"use client";

import { type ReactNode, useState } from "react";
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
  onMinimize?: () => void;
  onMaximize?: () => void;
  isMaximized?: boolean;
  maximizedBottomInset?: number;
  keepMountedOnMaximize?: boolean;
  scale?: number;
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
  onMinimize,
  onMaximize,
  isMaximized = false,
  maximizedBottomInset = 0,
  keepMountedOnMaximize = false,
  scale = 1,
  children,
}: RetroWindowProps) {
  const [restoredLayout, setRestoredLayout] = useState(() => ({
    position: defaultPosition,
    size: defaultSize,
  }));

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

  const windowContent = (
    <section
      className={`win98-outset flex h-full min-h-0 w-full flex-col bg-winGrey shadow-[6px_6px_0_#5a5a5a] ${rounded ? "overflow-hidden rounded-xl" : ""}`}
      onMouseDown={onFocus}
    >
      <header
        className={`retro-window-handle relative flex items-center px-3 py-2 ${isMaximized ? "cursor-default" : "cursor-move"} ${rounded ? "rounded-t-xl" : ""}`}
        style={{ backgroundImage: `linear-gradient(90deg, ${gradientColors[0]}, ${gradientColors[1]})` }}
      >
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            aria-label={`Close ${title} window`}
            className="h-3.5 w-3.5 rounded-full border border-black/40 bg-[#ff4b4b]"
            onClick={onClose}
          />
          <button
            type="button"
            aria-label={`Minimize ${title} window`}
            className="h-3.5 w-3.5 rounded-full border border-black/40 bg-[#ffd43b]"
            onClick={onMinimize}
          />
          <button
            type="button"
            aria-label={`${isMaximized ? "Restore" : "Maximize"} ${title} window`}
            className="h-3.5 w-3.5 rounded-full border border-black/40 bg-[#52d96b]"
            onClick={onMaximize}
          />
        </div>
        <h2 className="absolute left-1/2 -translate-x-1/2 text-sm font-bold text-white">{title}</h2>
      </header>

      {noPadding ? (
        <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
      ) : (
        <div className="min-h-0 flex-1 p-3">
          <div className="win98-inset h-full min-h-0 overflow-y-auto bg-white p-3 text-sm leading-6">
            {children}
          </div>
        </div>
      )}
    </section>
  );

  if (isMaximized && !keepMountedOnMaximize) {
    return (
      <div className="absolute inset-0" style={{ zIndex, bottom: maximizedBottomInset }}>
        {windowContent}
      </div>
    );
  }

  return (
    <Rnd
      scale={scale}
      className="retro-rnd absolute"
      style={{ zIndex }}
      bounds="parent"
      dragHandleClassName="retro-window-handle"
      cancel=".retro-resize-handle"
      disableDragging={keepMountedOnMaximize && isMaximized}
      enableResizing={keepMountedOnMaximize && isMaximized ? false : {
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
      position={keepMountedOnMaximize ? (isMaximized ? { x: 0, y: 0 } : restoredLayout.position) : undefined}
      size={keepMountedOnMaximize ? (isMaximized ? {
        width: "100%",
        height: `calc(100% - ${maximizedBottomInset}px)`,
      } : restoredLayout.size) : undefined}
      minWidth={keepMountedOnMaximize && isMaximized ? 0 : minSize.width}
      minHeight={keepMountedOnMaximize && isMaximized ? 0 : minSize.height}
      onDragStart={onFocus}
      onDragStop={keepMountedOnMaximize ? (_event, data) => {
        if (isMaximized) return;
        setRestoredLayout((layout) => ({
          ...layout,
          position: { x: data.x, y: data.y },
        }));
      } : undefined}
      onResizeStart={onFocus}
      onResizeStop={keepMountedOnMaximize ? (_event, _direction, element, _delta, position) => {
        if (isMaximized) return;
        setRestoredLayout({
          position,
          size: { width: element.offsetWidth, height: element.offsetHeight },
        });
      } : undefined}
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
      {windowContent}
    </Rnd>
  );
}
