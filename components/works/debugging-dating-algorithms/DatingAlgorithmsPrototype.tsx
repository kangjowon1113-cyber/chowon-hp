"use client";

import { useEffect, useRef, useState } from "react";

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
  onBackToStudy: () => void;
  isMobile?: boolean;
};

export function DatingAlgorithmsPrototype({
  onBackToStudy,
  isMobile = false,
}: DatingAlgorithmsPrototypeProps) {
  const [screen, setScreen] = useState<"home" | "candidate" | "compare" | "complete">("home");
  const [activeMatchId, setActiveMatchId] = useState<(typeof matchProfiles)[number]["id"]>("cha-eunwoo");
  const [pendingLikeProfileId, setPendingLikeProfileId] = useState<ProfileOptionId | null>(null);
  const [chaEunwooChoice, setChaEunwooChoice] = useState<ProfileOptionId | null>(null);
  const [byeonWooseokChoice, setByeonWooseokChoice] = useState<ProfileOptionId | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [compareTabId, setCompareTabId] = useState<ProfileOptionId>("iu-1");
  const bellRef = useRef<HTMLDivElement>(null);

  const activeMatch = matchProfiles.find((profile) => profile.id === activeMatchId) ?? matchProfiles[0];
  const pendingLikeLabel = pendingLikeProfileId?.replace("iu-", "Profile ");
  const compareProfile = profileOptions.find((profile) => profile.id === compareTabId) ?? profileOptions[0];
  const notificationCount = [chaEunwooChoice, byeonWooseokChoice].filter(Boolean).length;

  useEffect(() => {
    if (!showNotifications) return;
    const handler = (event: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showNotifications]);

  const handleConfirmLike = () => {
    if (!pendingLikeProfileId) return;
    setShowNotifications(false);
    if (activeMatchId === "cha-eunwoo") {
      setChaEunwooChoice(pendingLikeProfileId);
      setActiveMatchId("byeon-wooseok");
      setScreen("candidate");
    } else {
      setByeonWooseokChoice(pendingLikeProfileId);
      setScreen("complete");
    }
    setPendingLikeProfileId(null);
  };

  const restartDemo = () => {
    setScreen("home");
    setActiveMatchId("cha-eunwoo");
    setPendingLikeProfileId(null);
    setChaEunwooChoice(null);
    setByeonWooseokChoice(null);
    setShowNotifications(false);
    setCompareTabId("iu-1");
  };

  const notifications = matchProfiles.flatMap((profile) => {
    const choiceId = profile.id === "cha-eunwoo" ? chaEunwooChoice : byeonWooseokChoice;
    return choiceId ? [{
      matchId: profile.id,
      matchLabel: profile.label,
      choiceId,
      status: getMatchStatus(profile.id, choiceId),
    }] : [];
  });

  const resultList = (
    <ul className="divide-y divide-[#f0eaf0]">
      {notifications.map((notification) => (
        <li key={notification.matchId} className="flex items-center gap-3 px-4 py-3 text-left">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-[#2f2f2f]">{notification.matchLabel}</p>
            <p className="mt-0.5 text-[11px] text-[#807681]">
              Sent with IU {notification.choiceId.replace("iu-", "Profile ")}
            </p>
          </div>
          {notification.status === "match" ? (
            <span className="shrink-0 rounded-full bg-[#edfff4] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-[#1e9e4a]">
              Match!
            </span>
          ) : (
            <span className="shrink-0 rounded-full bg-[#fff8e6] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-[#b07d00]">
              Pending
            </span>
          )}
        </li>
      ))}
    </ul>
  );

  const profileTabs = (
    <div className="flex shrink-0 gap-2" aria-label="Choose your profile">
      {profileOptions.map((option) => (
        <button
          key={option.id}
          type="button"
          aria-pressed={compareTabId === option.id}
          onClick={() => setCompareTabId(option.id)}
          className={`flex-1 rounded-full px-2 py-2 text-xs font-bold transition ${
            compareTabId === option.id
              ? "bg-[#ff7ea7] text-white shadow-[0_4px_12px_rgba(255,126,167,0.25)]"
              : "bg-[#f0eafa] text-[#4b4550] hover:bg-[#e7dcf7]"
          }`}
        >
          {option.label.replace("IU profile", "Profile ")}
        </button>
      ))}
    </div>
  );

  const profilePreview = (
    <button
      type="button"
      aria-label={`Send Like with ${compareProfile.label}`}
      onClick={() => setPendingLikeProfileId(compareTabId)}
      className={`relative shrink-0 overflow-hidden rounded-[24px] bg-white shadow-[0_10px_24px_rgba(0,0,0,0.10)] ring-[5px] ring-[#dad3d9] transition hover:ring-[#ffb1c8] active:scale-[0.98] ${isMobile ? "w-[70%] max-w-[280px]" : "aspect-[375/814] h-full max-h-[400px]"}`}
    >
      <img
        src={compareProfile.src}
        alt={compareProfile.label}
        className="block h-full w-full select-none"
        draggable={false}
      />
    </button>
  );

  const phone = (interactive: boolean) => (
    <div className={`relative shrink-0 overflow-hidden rounded-[28px] bg-white shadow-[0_18px_38px_rgba(0,0,0,0.18)] ring-[8px] ring-[#c7c7cc] ${isMobile ? "w-[80%] max-w-[300px]" : "aspect-[375/814] h-full max-h-[540px]"}`}>
      <img
        src={screen === "home" ? homeScreenSrc : activeMatch.src}
        alt={screen === "home" ? "Datemate home screen" : `${activeMatch.label} dating profile screen`}
        className="block h-full w-full select-none"
        draggable={false}
      />
      {interactive ? screen === "home" ? (
        <button
          type="button"
          aria-label="Get started: open Cha Eunwoo profile"
          className="absolute left-[22.3%] top-[83.05%] h-[6.95%] w-[55.5%] rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff7ea7]"
          onClick={() => {
            setActiveMatchId("cha-eunwoo");
            setPendingLikeProfileId(null);
            setScreen("candidate");
          }}
        />
      ) : (
        <button
          type="button"
          aria-label={`Like ${activeMatch.label}`}
          className="absolute left-[34.5%] top-[86.1%] h-[10.3%] w-[31%] rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff7ea7]"
          onClick={() => setScreen("compare")}
        />
      ) : null}
    </div>
  );

  return (
    <section className="relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-[#faf7fb] text-[#4b4550]">
      <div className="relative z-40 flex min-h-[58px] shrink-0 items-center justify-between gap-3 border-b border-[#e8dfe7] bg-white px-4 py-2.5">
        <button
          autoFocus
          data-demo-return
          type="button"
          onClick={onBackToStudy}
          className="shrink-0 rounded-full bg-[#f0eafa] px-3 py-2 text-xs font-bold transition hover:bg-[#e7dcf7]"
        >
          ← Back to study
        </button>
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8a7d8c]">
          Profile demo
        </span>
        {notificationCount > 0 ? (
          <div ref={bellRef} className="relative">
            <button
              type="button"
              aria-label="Notifications"
              aria-expanded={showNotifications}
              onClick={() => setShowNotifications((visible) => !visible)}
              className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f0f6] transition hover:bg-[#ece5ef]"
            >
              <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M9 2a5 5 0 0 0-5 5v3l-1.5 2H15.5L14 10V7a5 5 0 0 0-5-5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M7.5 14.5a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ff7ea7] text-[9px] font-black text-white">
                {notificationCount}
              </span>
            </button>
            {showNotifications ? (
              <div className="absolute right-0 top-[44px] w-[min(280px,calc(100vw-32px))] overflow-hidden rounded-[14px] border border-[#e8dfe7] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.16)]">
                <p className="border-b border-[#f0eaf0] px-4 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#807681]">
                  Demo notifications
                </p>
                {resultList}
                <p className="border-t border-[#f0eaf0] px-4 py-2 text-[10px] leading-relaxed text-[#807681]">
                  Preset results for this prototype.
                </p>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      {screen === "complete" ? (
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-8">
          <div className="mx-auto my-auto w-full max-w-[420px] rounded-[24px] border border-[#e8dfe7] bg-white p-6 text-center shadow-[0_12px_30px_rgba(70,45,75,0.06)]">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#a36b83]">Demo complete</p>
            <h2 className="mt-3 text-[25px] font-bold leading-tight">Different sides of the same person.</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#776b79]">
              You explored choosing which version of your profile to share with different people. What did each profile bring forward?
            </p>
            <div className="mt-5 overflow-hidden rounded-[14px] border border-[#eee6ed]">{resultList}</div>
            <p className="mt-2 text-[11px] leading-relaxed text-[#807681]">These results are preset examples for this prototype.</p>
            <button type="button" onClick={onBackToStudy} className="mt-6 w-full rounded-full bg-[#4b4550] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#655b6b]">
              ← Back to study
            </button>
            <button type="button" onClick={restartDemo} className="mt-3 rounded-full px-4 py-2 text-xs font-bold text-[#89768d] transition hover:bg-[#f5f0f6]">
              Try again
            </button>
          </div>
        </div>
      ) : screen === "compare" ? (
        isMobile ? (
          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
            <p className="mb-4 text-sm leading-relaxed">
              You are IU. Choose one of your three profiles to share with {activeMatch.label}, then tap the preview to send your Like.
            </p>
            {profileTabs}
            <div className="flex justify-center pb-5 pt-6">{profilePreview}</div>
          </div>
        ) : (
          <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-8 px-8 py-6">
            <div className="flex min-h-0 min-w-0 items-center justify-center py-2">{phone(false)}</div>
            <div className="flex min-h-0 min-w-0 flex-col gap-4">
              <p className="text-sm leading-relaxed">
                You are IU. Choose one of your three profiles to share with {activeMatch.label}, then click the preview to send your Like.
              </p>
              {profileTabs}
              <div className="flex min-h-0 flex-1 items-center justify-center py-2">{profilePreview}</div>
            </div>
          </div>
        )
      ) : (
        <div className={`flex min-h-0 flex-1 flex-col ${isMobile ? "overflow-y-auto" : "overflow-hidden"}`}>
          <p className="shrink-0 px-5 pb-2 pt-4 text-center text-sm leading-relaxed">
            {screen === "home"
              ? <>Explore the profile concept. Tap &ldquo;Get Started&rdquo; to try it.</>
              : <>Tap &ldquo;Like&rdquo; to choose which of your profiles to share.</>}
          </p>
          <div className={`flex justify-center px-5 pb-6 pt-4 ${isMobile ? "shrink-0" : "min-h-0 flex-1 items-center"}`}>
            {phone(true)}
          </div>
        </div>
      )}

      {pendingLikeProfileId ? (
        <div className="absolute inset-x-0 bottom-0 top-[58px] z-30 flex items-center justify-center overflow-y-auto bg-black/20 p-4" role="dialog" aria-modal="true" aria-label="Like sent">
          <div className="w-full max-w-[380px] overflow-hidden rounded-[22px] border border-[#cfc7cd] bg-[#f7f2f6] shadow-[0_16px_36px_rgba(0,0,0,0.18)]">
            <div className="bg-white/85 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6d6670]">Demo notification</div>
            <div className="px-6 py-5 text-center">
              <p className="text-[20px] font-black leading-snug">{`You sent a "Like" with ${pendingLikeLabel}.`}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#6d6670]">
                {activeMatchId === "cha-eunwoo" ? "Next, try choosing a profile for someone else." : "You’ve finished both profile choices."}
              </p>
              <button type="button" onClick={handleConfirmLike} className="mt-5 rounded-full border border-[#d4ccd2] bg-white px-5 py-2 text-sm font-bold shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                {activeMatchId === "cha-eunwoo" ? "Continue" : "See your results"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
