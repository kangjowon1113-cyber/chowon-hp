"use client";

import { useEffect, useRef, useState } from "react";
import { LegacyDatingAlgorithmsContent } from "@/components/works/debugging-dating-algorithms/LegacyDatingAlgorithmsContent";

const homeScreenSrc = "/works/debugging-dating-algorithms/Home.png";
const matchProfiles = [
  {
    id: "cha-eunwoo",
    label: "Cha Eunwoo",
    src: "/works/debugging-dating-algorithms/%EC%B0%A8%EC%9D%80%EC%9A%B0%20profile.png",
  },
  {
    id: "byeon-wooseok",
    label: "Byeon Wooseok",
    src: "/works/debugging-dating-algorithms/%EB%B3%80%EC%9A%B0%EC%84%9D%20profile.png",
  },
] as const;

const profileOptions = [
  {
    id: "iu-1",
    label: "IU profile1",
    src: "/works/debugging-dating-algorithms/IU%20profile1.png",
  },
  {
    id: "iu-2",
    label: "IU profile2",
    src: "/works/debugging-dating-algorithms/IU%20profile2.png",
  },
  {
    id: "iu-3",
    label: "IU profile3",
    src: "/works/debugging-dating-algorithms/IU%20profile3.png",
  },
] as const;

type ProfileOptionId = (typeof profileOptions)[number]["id"];

function getMatchStatus(
  matchId: (typeof matchProfiles)[number]["id"],
  choiceId: ProfileOptionId
): "match" | "pending" {
  if (matchId === "cha-eunwoo") {
    return choiceId === "iu-1" ? "pending" : "match";
  }
  // byeon-wooseok
  return choiceId === "iu-2" ? "pending" : "match";
}

type DatingAlgorithmsPrototypeProps = {
  onSurfaceModeChange?: (surfaceMode: "translucent" | "solid") => void;
  onFrameModeChange?: (frameMode: "rounded" | "window") => void;
};

export function DatingAlgorithmsPrototype({
  onSurfaceModeChange,
  onFrameModeChange,
}: DatingAlgorithmsPrototypeProps) {
  const [screen, setScreen] = useState<"home" | "candidate" | "compare" | "legacy">("home");
  const [activeMatchId, setActiveMatchId] = useState<(typeof matchProfiles)[number]["id"]>("cha-eunwoo");
  const [pendingLikeProfileId, setPendingLikeProfileId] = useState<ProfileOptionId | null>(null);
  const [chaEunwooChoice, setChaEunwooChoice] = useState<ProfileOptionId | null>(null);
  const [byeonWooseokChoice, setByeonWooseokChoice] = useState<ProfileOptionId | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);

  const activeMatch = matchProfiles.find((p) => p.id === activeMatchId) ?? matchProfiles[0];
  const pendingLikeProfile = profileOptions.find((o) => o.id === pendingLikeProfileId) ?? null;
  const pendingLikeLabel = pendingLikeProfile?.label.replace("IU profile", "Profile") ?? "";

  const notificationCount = [chaEunwooChoice, byeonWooseokChoice].filter(Boolean).length;

  useEffect(() => {
    onSurfaceModeChange?.(screen === "legacy" ? "solid" : "translucent");
    onFrameModeChange?.(screen === "legacy" ? "window" : "rounded");
  }, [onFrameModeChange, onSurfaceModeChange, screen]);

  // Close notification panel when clicking outside
  useEffect(() => {
    if (!showNotifications) return;
    const handler = (e: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showNotifications]);

  const handleConfirmLike = () => {
    if (activeMatchId === "cha-eunwoo") {
      if (pendingLikeProfileId) setChaEunwooChoice(pendingLikeProfileId);
      setActiveMatchId("byeon-wooseok");
      setScreen("candidate");
      setPendingLikeProfileId(null);
      return;
    }
    if (pendingLikeProfileId) setByeonWooseokChoice(pendingLikeProfileId);
    setPendingLikeProfileId(null);
    setScreen("legacy");
  };

  const notifications: Array<{
    matchId: (typeof matchProfiles)[number]["id"];
    matchLabel: string;
    choiceId: ProfileOptionId;
    status: "match" | "pending";
  }> = [];
  if (chaEunwooChoice) {
    notifications.push({
      matchId: "cha-eunwoo",
      matchLabel: "Cha Eunwoo",
      choiceId: chaEunwooChoice,
      status: getMatchStatus("cha-eunwoo", chaEunwooChoice),
    });
  }
  if (byeonWooseokChoice) {
    notifications.push({
      matchId: "byeon-wooseok",
      matchLabel: "Byeon Wooseok",
      choiceId: byeonWooseokChoice,
      status: getMatchStatus("byeon-wooseok", byeonWooseokChoice),
    });
  }

  return (
    <div className="relative h-full w-full">
      {/* Bell notification button — always visible when there are notifications */}
      {notificationCount > 0 ? (
        <div ref={bellRef} className="absolute right-10 top-4 z-40">
          <button
            type="button"
            aria-label="Notifications"
            onClick={() => setShowNotifications((v) => !v)}
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/85 shadow-[0_4px_12px_rgba(0,0,0,0.12)] backdrop-blur-sm transition hover:bg-white"
          >
            <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 2a5 5 0 0 0-5 5v3l-1.5 2H15.5L14 10V7a5 5 0 0 0-5-5Z"
                stroke="#4b4550"
                strokeWidth="1.6"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M7.5 14.5a1.5 1.5 0 0 0 3 0"
                stroke="#4b4550"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            {/* Badge */}
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff7ea7] text-[10px] font-black text-white shadow-[0_2px_6px_rgba(255,126,167,0.5)]">
              {notificationCount}
            </span>
          </button>

          {/* Notification dropdown */}
          {showNotifications ? (
            <div className="absolute right-0 top-[44px] w-[280px] overflow-hidden rounded-[14px] border border-[#e8dfe7] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.16)]">
              <div className="border-b border-[#f0eaf0] px-4 py-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9a9099]">
                  Notifications
                </p>
              </div>
              <ul className="divide-y divide-[#f7f2f6]">
                {notifications.map((n) => {
                  const choiceLabel = n.choiceId.replace("iu-", "Profile ");
                  return (
                    <li key={n.matchId} className="flex items-center gap-3 px-4 py-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-[#2f2f2f]">{n.matchLabel}</p>
                        <p className="mt-0.5 text-[11px] text-[#9a9099]">
                          Sent with IU {choiceLabel}
                        </p>
                      </div>
                      {n.status === "match" ? (
                        <span className="shrink-0 rounded-full bg-[#edfff4] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-[#1e9e4a]">
                          Match!
                        </span>
                      ) : (
                        <span className="shrink-0 rounded-full bg-[#fff8e6] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-[#b07d00]">
                          Pending
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}

      {screen === "legacy" ? (
        <LegacyDatingAlgorithmsContent />
      ) : (
        <section className="flex h-full w-full items-center justify-center">
          <button
            type="button"
            onClick={() => setScreen("legacy")}
            className={`absolute top-4 z-20 rounded-full bg-white/80 px-4 py-2 text-xs font-bold text-[#4b4550] shadow-[0_4px_12px_rgba(0,0,0,0.12)] backdrop-blur-sm transition hover:bg-white ${
              notificationCount > 0 ? "right-24" : "right-4"
            }`}
          >
            Move to Study →
          </button>
          <div
            className={`grid h-full w-full min-w-0 gap-5 ${
              screen === "compare"
                ? "grid-cols-[minmax(250px,340px)_minmax(0,1fr)] items-center"
                : "place-items-center"
            }`}
          >
            <div className="flex h-full min-h-0 min-w-0 items-center justify-center">
              <div className="relative aspect-[375/814] h-full max-h-full w-full max-w-[336px] rounded-[42px] border-[10px] border-[#c7c7cc] bg-[#c7c7cc] p-[8px] shadow-[0_18px_38px_rgba(0,0,0,0.22)]">
                <div className="pointer-events-none absolute left-1/2 top-[10px] z-20 h-[22px] w-[132px] -translate-x-1/2 rounded-full bg-[#8f8f95]" />

                {/* Tap hint — floats to the right of the phone */}
                {screen === "home" ? (
                  <div className="pointer-events-none absolute left-[calc(100%+20px)] top-[76%] -translate-y-1/2 flex items-center gap-3 z-30">
                    <svg width="40" height="26" viewBox="0 0 40 26" fill="none" className="shrink-0">
                      <path d="M2 13 L36 13 M26 4 L36 13 L26 22" stroke="#ff7ea7" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div className="whitespace-nowrap rounded-[8px] border-2 border-[#ff7ea7] bg-white px-5 py-3 shadow-[0_6px_20px_rgba(255,126,167,0.25)]">
                      <p className="text-[17px] font-bold uppercase tracking-[0.14em] text-[#ff7ea7]">
                        Tap on &ldquo;Get Started&rdquo;
                      </p>
                    </div>
                  </div>
                ) : null}

                <div className="h-full w-full overflow-hidden rounded-[32px] bg-white">
                  <div className="relative h-full w-full">
                    {screen === "home" ? (
                      <>
                        <img
                          src={homeScreenSrc}
                          alt="Datemate home screen"
                          className="h-full w-full object-cover object-center select-none"
                          draggable={false}
                        />

                        <button
                          type="button"
                          aria-label="Open Cha Eunwoo profile"
                          className="absolute left-[22.3%] top-[83.05%] h-[6.95%] w-[55.5%] rounded-full"
                          onClick={() => {
                            setActiveMatchId("cha-eunwoo");
                            setPendingLikeProfileId(null);
                            setScreen("candidate");
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <img
                          src={activeMatch.src}
                          alt={`${activeMatch.label} dating profile screen`}
                          className="h-full w-full object-cover object-center select-none"
                          draggable={false}
                        />

                        {screen === "candidate" ? (
                          <button
                            type="button"
                            aria-label={`Like ${activeMatch.label}`}
                            className="absolute left-[34.5%] top-[86.1%] h-[10.3%] w-[31%] rounded-full"
                            onClick={() => setScreen("compare")}
                          />
                        ) : null}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {screen === "compare" ? (
              <aside className="flex h-full min-h-0 min-w-0 flex-col justify-center">
                <div className="mb-5 flex justify-center">
                  <p className="rounded-[18px] border-[4px] border-[#ff7ea7] bg-white px-5 py-3 text-center text-[20px] font-black leading-tight text-[#4b4550] shadow-[0_10px_20px_rgba(0,0,0,0.08)]">
                    Which profile would you like to use for your match?
                  </p>
                </div>

                <div className="grid w-full min-w-0 grid-cols-3 gap-3">
                  {profileOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      aria-label={option.label}
                      onClick={() => setPendingLikeProfileId(option.id)}
                      className="flex min-w-0 flex-col items-center gap-2 rounded-[30px] border-[6px] border-[#dad3d9] bg-white/90 p-[7px] shadow-[0_10px_20px_rgba(0,0,0,0.1)] transition hover:border-[#ffb1c8]"
                    >
                      <div className="w-full overflow-hidden rounded-[22px] bg-white">
                        <img
                          src={option.src}
                          alt={option.label}
                          className="aspect-[375/814] w-full object-cover object-top"
                          draggable={false}
                        />
                      </div>
                      <span className="pb-1 text-center text-[11px] font-bold text-[#4b4550]">
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              </aside>
            ) : null}

            {pendingLikeProfile ? (
              <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/15">
                <div className="w-full max-w-[380px] overflow-hidden rounded-[22px] border border-[#cfc7cd] bg-[#f7f2f6] shadow-[0_16px_36px_rgba(0,0,0,0.18)]">
                  <div className="flex items-center justify-between bg-white/85 px-4 py-3">
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6d6670]">
                      Notification
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="h-3.5 w-3.5 rounded-full border border-black/10 bg-[#52d96b]" />
                      <span className="h-3.5 w-3.5 rounded-full border border-black/10 bg-[#ffd43b]" />
                      <span className="h-3.5 w-3.5 rounded-full border border-black/10 bg-[#ff5f57]" />
                    </div>
                  </div>

                  <div className="px-6 py-5 text-center">
                    <p className="text-[20px] font-black leading-snug text-[#4b4550]">
                      {`We sent a "Like" with ${pendingLikeLabel}.`}
                    </p>
                    <p className="mt-2 text-[16px] font-bold leading-snug text-[#6d6670]">
                      We&apos;ll notify you if it&apos;s a match.
                    </p>
                    <button
                      type="button"
                      onClick={handleConfirmLike}
                      className="mt-5 rounded-full border border-[#d4ccd2] bg-white px-5 py-2 text-sm font-bold text-[#4b4550] shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      )}
    </div>
  );
}
