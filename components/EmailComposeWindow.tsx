"use client";

import { useState } from "react";

type EmailComposeWindowProps = {
  isOpen: boolean;
  zIndex: number;
  onClose: () => void;
};

export function EmailComposeWindow({ isOpen, zIndex, onClose }: EmailComposeWindowProps) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  if (!isOpen) return null;

  const handleSend = () => {
    const qs: string[] = [];
    if (subject) qs.push(`subject=${encodeURIComponent(subject)}`);
    if (body) qs.push(`body=${encodeURIComponent(body)}`);
    window.open(
      `mailto:kangjowon1113@gmail.com${qs.length ? `?${qs.join("&")}` : ""}`,
      "_blank",
    );
    setSubject("");
    setBody("");
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  return (
    <section
      className="win98-outset flex flex-col bg-winGrey shadow-[6px_6px_0_#5a5a5a] font-system98"
      style={{
        position: "fixed",
        zIndex,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 440,
      }}
      onKeyDown={handleKeyDown}
    >
      {/* Title bar */}
      <header className="flex items-center justify-between bg-[linear-gradient(90deg,#FF1493,#FF69B4)] px-3 py-2">
        <h2 className="text-sm font-bold text-white">📧 New Message</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Close email compose"
            className="h-3.5 w-3.5 rounded-full border border-black/40 bg-[#ff4b4b]"
            onClick={onClose}
          />
        </div>
      </header>

      {/* Form */}
      <div className="flex flex-col gap-0 p-3">
        {/* To */}
        <div className="win98-inset mb-2 flex items-center gap-0 bg-white px-2 py-1">
          <span className="w-16 shrink-0 text-xs font-bold text-[#444]">To:</span>
          <span className="flex-1 text-xs text-[#888]">kangjowon1113@gmail.com</span>
        </div>

        {/* Subject */}
        <div className="win98-inset mb-2 flex items-center bg-white px-2 py-1">
          <span className="w-16 shrink-0 text-xs font-bold text-[#444]">Subject:</span>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="flex-1 bg-transparent text-xs outline-none"
            placeholder="Enter subject..."
            autoFocus
          />
        </div>

        {/* Body */}
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="win98-inset h-36 w-full resize-none bg-white px-2 py-1 text-xs outline-none"
          placeholder="Write your message here..."
        />
      </div>

      {/* Footer buttons */}
      <div className="flex justify-end gap-2 px-3 pb-3">
        <button
          type="button"
          onClick={handleSend}
          className="win98-outset bg-winGrey px-5 py-1 text-sm font-bold active:translate-x-px active:translate-y-px"
        >
          Send
        </button>
        <button
          type="button"
          onClick={onClose}
          className="win98-outset bg-winGrey px-4 py-1 text-sm font-bold active:translate-x-px active:translate-y-px"
        >
          Cancel
        </button>
      </div>
    </section>
  );
}
