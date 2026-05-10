"use client";

import { useEffect, useState } from "react";

function formatTime(date: Date) {
  return date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

type MinimizedChip = { key: string; label: string; onRestore: () => void };

type TaskbarProps = {
  onEmailClick: () => void;
  minimizedWindows?: MinimizedChip[];
};

export function Taskbar({ onEmailClick, minimizedWindows = [] }: TaskbarProps) {
  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="win98-outset absolute bottom-0 left-0 right-0 z-50 h-10 bg-winGrey px-2">
      <div className="flex h-full items-center justify-between">
        <div className="flex items-center gap-1 overflow-x-auto">
          <button
            type="button"
            onClick={onEmailClick}
            className="win98-outset shrink-0 bg-winGrey px-3 py-1 text-sm font-bold active:translate-x-px active:translate-y-px"
          >
            📧 Email
          </button>
          <a
            href="https://www.linkedin.com/in/chowonkang"
            target="_blank"
            rel="noreferrer"
            className="win98-outset block bg-winGrey px-3 py-1 text-sm font-bold no-underline active:translate-x-px active:translate-y-px"
          >
            💼 LinkedIn
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noreferrer"
            className="win98-outset block shrink-0 bg-winGrey px-3 py-1 text-sm font-bold no-underline active:translate-x-px active:translate-y-px"
          >
            📄 CV
          </a>
          {minimizedWindows.map((w) => (
            <button
              key={w.key}
              type="button"
              onClick={w.onRestore}
              className="win98-inset shrink-0 bg-[#d4d0c8] px-3 py-1 text-xs font-bold active:translate-x-px active:translate-y-px"
            >
              {w.label}
            </button>
          ))}
        </div>
        <div className="win98-inset min-w-24 px-2 py-1 text-right text-sm">{time}</div>
      </div>
    </div>
  );
}
