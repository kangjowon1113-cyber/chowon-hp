"use client";

import { useEffect, useState } from "react";
import { LegacyDatingAlgorithmsContent } from "@/components/works/debugging-dating-algorithms/LegacyDatingAlgorithmsContent";

const homeScreenSrc = "/works/debugging-dating-algorithms/Home.png";
const matchProfiles = [
  {
    id: "cha-eunwoo",
    label: "Cha Eunwoo profile",
    src: "/works/debugging-dating-algorithms/%EC%B0%A8%EC%9D%80%EC%9A%B0%20profile.png",
  },
  {
    id: "byeon-wooseok",
    label: "Byeon Wooseok profile",
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

type DatingAlgorithmsPrototypeProps = {
  onSurfaceModeChange?: (surfaceMode: "translucent" | "solid") => void;
};

export function DatingAlgorithmsPrototype({ onSurfaceModeChange }: DatingAlgorithmsPrototypeProps) {
  const [screen, setScreen] = useState<"home" | "candidate" | "compare" | "legacy">("home");
  const [activeMatchId, setActiveMatchId] = useState<(typeof matchProfiles)[number]["id"]>("cha-eunwoo");
  const [pendingLikeProfileId, setPendingLikeProfileId] = useState<
    (typeof profileOptions)[number]["id"] | null
  >(null);
  const activeMatch = matchProfiles.find((profile) => profile.id === activeMatchId) ?? matchProfiles[0];
  const pendingLikeProfile =
    profileOptions.find((option) => option.id === pendingLikeProfileId) ?? null;
  const pendingLikeLabel = pendingLikeProfile?.label.replace("IU profile", "Profile") ?? "";

  useEffect(() => {
    onSurfaceModeChange?.(screen === "legacy" ? "solid" : "translucent");
  }, [onSurfaceModeChange, screen]);

  const handleConfirmLike = () => {
    if (activeMatchId === "cha-eunwoo") {
      setActiveMatchId("byeon-wooseok");
      setScreen("candidate");
      setPendingLikeProfileId(null);
      return;
    }

    setPendingLikeProfileId(null);
    setScreen("legacy");
  };

  if (screen === "legacy") {
    return (
      <section className="h-full w-full overflow-hidden rounded-[28px] bg-white shadow-[0_8px_18px_rgba(0,0,0,0.08)]">
        <LegacyDatingAlgorithmsContent />
      </section>
    );
  }

  return (
    <section className="flex h-full w-full items-center justify-center">
      <div
        className={`grid h-full w-full gap-6 ${
          screen === "compare" ? "grid-cols-[minmax(420px,480px)_minmax(840px,1fr)]" : "place-items-center"
        }`}
      >
        <div className="flex h-full min-h-0 items-center justify-center">
          <div className="relative aspect-[375/814] h-full max-h-full w-full max-w-[450px] rounded-[42px] border-[10px] border-[#c7c7cc] bg-[#c7c7cc] p-[8px] shadow-[0_18px_38px_rgba(0,0,0,0.22)]">
            <div className="pointer-events-none absolute left-1/2 top-[10px] z-20 h-[22px] w-[132px] -translate-x-1/2 rounded-full bg-[#8f8f95]" />
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
          <aside className="flex h-full min-h-0 flex-col justify-center">
            <div className="mb-5 flex justify-center">
              <p className="rounded-[18px] bg-white px-5 py-3 text-center text-[20px] font-black leading-tight text-[#4b4550] shadow-[0_10px_20px_rgba(0,0,0,0.08)]">
                Which profile would you like to use for your match?
              </p>
            </div>

            <div className="grid w-full grid-cols-3 gap-5">
              {profileOptions.map((option) => {
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-label={option.label}
                    onClick={() => setPendingLikeProfileId(option.id)}
                    className="overflow-hidden rounded-[32px] border-[7px] border-[#dad3d9] bg-white/90 p-[7px] shadow-[0_10px_20px_rgba(0,0,0,0.1)] transition hover:border-[#ffb1c8]"
                  >
                    <div className="overflow-hidden rounded-[24px] bg-white">
                      <img
                        src={option.src}
                        alt={option.label}
                        className="aspect-[375/814] w-full object-cover object-top"
                        draggable={false}
                      />
                    </div>
                  </button>
                );
              })}
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
                  <span className="h-3.5 w-3.5 rounded-full border border-black/10 bg-[#ff5f57]" />
                  <span className="h-3.5 w-3.5 rounded-full border border-black/10 bg-[#ffd43b]" />
                  <span className="h-3.5 w-3.5 rounded-full border border-black/10 bg-[#52d96b]" />
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
  );
}
