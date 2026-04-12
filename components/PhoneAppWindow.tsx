"use client";

import { type ReactNode } from "react";
import { Rnd } from "react-rnd";

type PhoneAppWindowProps = {
  title: string;
  isOpen: boolean;
  zIndex: number;
  defaultPosition: { x: number; y: number };
  defaultSize: { width: number; height: number };
  minSize?: { width: number; height: number };
  onClose: () => void;
  onFocus: () => void;
  children?: ReactNode;
};

export function PhoneAppWindow({
  title,
  isOpen,
  zIndex,
  defaultPosition,
  defaultSize,
  minSize = { width: 320, height: 680 },
  onClose,
  onFocus,
  children,
}: PhoneAppWindowProps) {
  if (!isOpen) return null;

  const handleZ = 50;

  const resizeHandleStyles = {
    top: { height: 10, top: -5, zIndex: handleZ, pointerEvents: "auto" },
    right: { width: 10, right: -5, zIndex: handleZ, pointerEvents: "auto" },
    bottom: { height: 10, bottom: -5, zIndex: handleZ, pointerEvents: "auto" },
    left: { width: 10, left: -5, zIndex: handleZ, pointerEvents: "auto" },
    topRight: { width: 18, height: 18, top: -9, right: -9, zIndex: handleZ, pointerEvents: "auto" },
    bottomRight: {
      width: 18,
      height: 18,
      bottom: -9,
      right: -9,
      zIndex: handleZ,
      pointerEvents: "auto",
    },
    bottomLeft: {
      width: 18,
      height: 18,
      bottom: -9,
      left: -9,
      zIndex: handleZ,
      pointerEvents: "auto",
    },
    topLeft: { width: 18, height: 18, top: -9, left: -9, zIndex: handleZ, pointerEvents: "auto" },
  } as const;

  return (
    <Rnd
      className="retro-rnd absolute"
      style={{ zIndex }}
      bounds="parent"
      lockAspectRatio={375 / 814}
      dragHandleClassName="phone-window-drag-handle"
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
      <section className="flex h-full w-full flex-col items-center">
        <div className="flex w-full justify-end pb-2 pr-1">
          <button
            type="button"
            aria-label={`Close ${title}`}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white text-lg font-bold text-[#ff4b4b] shadow-[0_4px_14px_rgba(0,0,0,0.16)]"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div
          className="phone-window-drag-handle relative h-[calc(100%-40px)] w-full cursor-grab rounded-[42px] border-[10px] border-[#c7c7cc] bg-[#c7c7cc] p-[8px] shadow-[0_18px_38px_rgba(0,0,0,0.28)] active:cursor-grabbing"
          onMouseDown={onFocus}
        >
          <div className="pointer-events-none absolute left-1/2 top-[10px] z-20 h-[22px] w-[132px] -translate-x-1/2 rounded-full bg-[#8f8f95]" />
          <div className="h-full w-full overflow-hidden rounded-[32px] bg-white">
            {children}
          </div>
        </div>
      </section>
    </Rnd>
  );
}
