"use client";

import { useEffect, useState } from "react";

function formatTime(date: Date) {
  return date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function Taskbar() {
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
        <button
          type="button"
          className="win98-outset bg-winGrey px-3 py-1 text-sm font-bold"
        >
          Start
        </button>
        <div className="win98-inset min-w-24 px-2 py-1 text-right text-sm">{time}</div>
      </div>
    </div>
  );
}

