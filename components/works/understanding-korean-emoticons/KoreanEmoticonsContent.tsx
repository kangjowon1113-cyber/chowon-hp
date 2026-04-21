"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { EmotionGraph } from "./EmotionGraph";
import type { DataPoint } from "./EmotionGraph";
import rawEmotionData from "./emotion graph data.json";

const emotionPoints = rawEmotionData as DataPoint[];

type LogicType = "amplification" | "neutrality" | "alleviation";

function getLogicForPoint(pt: DataPoint): LogicType | null {
  if (pt.context === "Neutral") return "neutrality";
  if (pt.context === "Happy" && pt.label.startsWith("ㅠ")) return "amplification";
  if (pt.context === "Sad" && (pt.label.startsWith("ㅋ") || pt.label.startsWith("ㅎ"))) return "alleviation";
  return null;
}

const ICON_FILL = "#fffbeb";
const ICON_FILL_HL = "#fef3c7";
const ICON_STROKE = "#d97706";
const ICON_TEXT = "#92400e";
const ICON_OP = "#b45309";

function AmplificationIcon({ highlighted }: { highlighted: boolean }) {
  const f = highlighted ? ICON_FILL_HL : ICON_FILL;
  return (
    <svg viewBox="0 0 126 44" width="126" height="44" aria-hidden>
      <circle cx="14" cy="22" r="11" fill={f} stroke={ICON_STROKE} strokeWidth="1.5" />
      <text x="14" y="27" textAnchor="middle" fontSize="13" fontWeight="700" fill={ICON_TEXT}>+</text>
      <text x="31" y="27" textAnchor="middle" fontSize="13" fontWeight="300" fill={ICON_OP}>+</text>
      <circle cx="48" cy="22" r="11" fill={f} stroke={ICON_STROKE} strokeWidth="1.5" />
      <text x="48" y="27" textAnchor="middle" fontSize="14" fontWeight="700" fill={ICON_TEXT}>−</text>
      <text x="66" y="27" textAnchor="middle" fontSize="13" fill={ICON_OP}>→</text>
      <circle cx="104" cy="22" r="18" fill={highlighted ? "#fef3c7" : "#fffde7"} stroke={ICON_STROKE} strokeWidth="1.5" />
      <text x="104" y="29" textAnchor="middle" fontSize="17" fontWeight="900" fill={ICON_TEXT}>+</text>
    </svg>
  );
}

function NeutralityIcon({ highlighted }: { highlighted: boolean }) {
  const f = highlighted ? ICON_FILL_HL : ICON_FILL;
  return (
    <svg viewBox="0 0 118 44" width="118" height="44" aria-hidden>
      <circle cx="14" cy="22" r="11" fill={f} stroke={ICON_STROKE} strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="14" y="27" textAnchor="middle" fontSize="12" fontWeight="700" fill={ICON_TEXT}>~</text>
      <text x="31" y="27" textAnchor="middle" fontSize="13" fontWeight="300" fill={ICON_OP}>+</text>
      <circle cx="48" cy="22" r="11" fill={f} stroke={ICON_STROKE} strokeWidth="1.5" />
      <text x="48" y="27" textAnchor="middle" fontSize="13" fontWeight="700" fill={ICON_TEXT}>?</text>
      <text x="66" y="27" textAnchor="middle" fontSize="13" fill={ICON_OP}>→</text>
      <circle cx="98" cy="22" r="12" fill={highlighted ? "#fef3c7" : "#fffde7"} stroke={ICON_STROKE} strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="98" y="27" textAnchor="middle" fontSize="12" fontWeight="700" fill={ICON_TEXT}>~</text>
    </svg>
  );
}

function AlleviationIcon({ highlighted }: { highlighted: boolean }) {
  const f = highlighted ? ICON_FILL_HL : ICON_FILL;
  return (
    <svg viewBox="0 0 116 44" width="116" height="44" aria-hidden>
      <circle cx="14" cy="22" r="11" fill={f} stroke={ICON_STROKE} strokeWidth="1.5" />
      <text x="14" y="27" textAnchor="middle" fontSize="14" fontWeight="700" fill={ICON_TEXT}>−</text>
      <text x="31" y="27" textAnchor="middle" fontSize="13" fontWeight="300" fill={ICON_OP}>+</text>
      <circle cx="48" cy="22" r="11" fill={f} stroke={ICON_STROKE} strokeWidth="1.5" />
      <text x="48" y="27" textAnchor="middle" fontSize="13" fontWeight="700" fill={ICON_TEXT}>+</text>
      <text x="66" y="27" textAnchor="middle" fontSize="13" fill={ICON_OP}>→</text>
      <circle cx="95" cy="22" r="9" fill={highlighted ? "#fef3c7" : "#fffde7"} stroke={ICON_STROKE} strokeWidth="1.5" />
      <text x="95" y="27" textAnchor="middle" fontSize="12" fontWeight="700" fill={ICON_TEXT}>−</text>
    </svg>
  );
}

const LOGIC_CARDS: Array<{
  id: LogicType;
  title: string;
  subtitle: string;
  description: string;
  example: string;
}> = [
  {
    id: "amplification",
    title: "Amplification",
    subtitle: "Negative emoticon × Positive context",
    description:
      "Negative emoticons (like ㅠㅠ) in a positive context amplify the joy, turning a simple 'happy' into 'overwhelmingly moved.'",
    example: "Happy + ㅠㅠ",
  },
  {
    id: "neutrality",
    title: "Neutrality",
    subtitle: "Emoticon × Neutral context",
    description:
      "In a neutral context, the emoticon's impact is highly sensitive to surrounding words — functioning as a subtle vibe-checker.",
    example: "Neutral + any",
  },
  {
    id: "alleviation",
    title: "Alleviation",
    subtitle: "Positive emoticon × Negative context",
    description:
      "Positive emoticons (like ㅎㅎ) in a negative context alleviate the displeasure, adding a layer of resilience or 'awkward politeness' to the sadness.",
    example: "Sad + ㅎㅎ",
  },
];

type EmoticonData = Record<string, Record<string, string>>;

const emoticonData: EmoticonData = {
  "I finally got the job!": {
    ㅋ: "Sarcastic / Aggressive",
    ㅋㅋ: "Habitual / Grinning",
    ㅋㅋㅋㅋㅋㅋㅋㅋ: "Pure & Loud Joy",
    ㅎ: "Sneering / Smirking",
    ㅎㅎ: "Polite / Nice Smile",
    ㅎㅎㅎㅎㅎㅎㅎㅎ: "Ecstatic Laughter",
    ㅠ: "Slightly Sad (Bittersweet)",
    ㅠㅠ: "Touched / Moved",
    ㅠㅠㅠㅠㅠㅠㅠㅠ: "Overwhelming Bliss (Tears of Joy)",
  },
  "I'm heading home now.": {
    ㅋ: "Sarcastic / Dry",
    ㅋㅋ: "Habitual / Grinning",
    ㅋㅋㅋㅋㅋㅋㅋㅋ: "Excited & Playful",
    ㅎ: "Sneering / Smirking",
    ㅎㅎ: "Gentle / Soft Smile",
    ㅎㅎㅎㅎㅎㅎㅎㅎ: "Cheerful Laughter",
    ㅠ: "Tired / Bit Sad",
    ㅠㅠ: "Exhausted / Seeking Comfort",
    ㅠㅠㅠㅠㅠㅠㅠㅠ: "Desperate Relief",
  },
  "I failed the exam.": {
    ㅋ: "Cynical / Self-Mocking",
    ㅋㅋ: "Habitual / Grinning",
    ㅋㅋㅋㅋㅋㅋㅋㅋ: "Hysterical Laughter",
    ㅎ: "Bitter / Smirking",
    ㅎㅎ: "Bitter but Resilient",
    ㅎㅎㅎㅎㅎㅎㅎㅎ: "Awkward Laughter",
    ㅠ: "Genuine Sadness",
    ㅠㅠ: "Deep Grief",
    ㅠㅠㅠㅠㅠㅠㅠㅠ: "Dramatic / Playful Despair",
  },
};

const SENTENCES = [
  "I finally got the job!",
  "I'm heading home now.",
  "I failed the exam.",
];

const BASE_CHARS = ["ㅋ", "ㅎ", "ㅠ"] as const;
type BaseChar = (typeof BASE_CHARS)[number];

const CHAR_VARIANTS: Record<BaseChar, [string, string, string]> = {
  ㅋ: ["ㅋ", "ㅋㅋ", "ㅋㅋㅋㅋㅋㅋㅋㅋ"],
  ㅎ: ["ㅎ", "ㅎㅎ", "ㅎㅎㅎㅎㅎㅎㅎㅎ"],
  ㅠ: ["ㅠ", "ㅠㅠ", "ㅠㅠㅠㅠㅠㅠㅠㅠ"],
};

const CHAR_CFG: Record<BaseChar, { color: string; bg: string; selectedBg: string }> = {
  ㅋ: { color: "#e8303a", bg: "#fef2f2", selectedBg: "#fce8e8" },
  ㅎ: { color: "#1a9955", bg: "#edfff5", selectedBg: "#d6f7e8" },
  ㅠ: { color: "#2274e0", bg: "#eff6ff", selectedBg: "#dbeafe" },
};

const INTENSITY_LABELS = ["×1", "×2", "×8"];

const koreanChars = [
  {
    char: "ㅋ",
    type: "consonant",
    name: "kiyeok",
    description: 'Used to express laughter (like "lol" or "haha")',
  },
  {
    char: "ㅎ",
    type: "consonant",
    name: "hieut",
    description: 'A softer, lighter laugh (like "heh")',
  },
  {
    char: "ㅠ",
    type: "vowel",
    name: "yu",
    description: 'Looks like a crying face — used to express sadness or tears ("ㅠㅠ")',
  },
];

const researchContributions = [
  {
    title: "Cross-Linguistic Framework",
    content:
      "Similar to linguistic markers like 'lol' in English, 'mdrr' in French, or 'www' in Japanese, Korean emoticons function as vital emotional modifiers. This research provides a methodology to analyze such digital linguistic phenomena across diverse languages.",
  },
  {
    title: "Cultural Bridge for Global Content",
    content:
      "As Korean culture gains global influence, the demand for high-fidelity translation increases. This data serves as a foundational asset for developing translation engines that go beyond literal meaning to capture deep-seated cultural nuances.",
  },
  {
    title: "Emotionally Intelligent AI Communication",
    content:
      "This study contributes to the design of AI-mediated communication protocols. By integrating these findings, we can develop AI moderators and chatbots capable of delivering more flexible, natural, and emotionally accurate conversations in global settings.",
  },
];

export function KoreanEmoticonsContent() {
  const [selectedSentence, setSelectedSentence] = useState<string | null>(null);
  const [selectedChar, setSelectedChar] = useState<BaseChar | null>(null);
  const [selectedEmoticon, setSelectedEmoticon] = useState<string | null>(null);
  const [graphHoveredIndex, setGraphHoveredIndex] = useState<number | null>(null);

  const highlightedLogic: LogicType | null =
    graphHoveredIndex !== null
      ? getLogicForPoint(emotionPoints[graphHoveredIndex])
      : null;

  const handleCharSelect = (c: BaseChar) => {
    setSelectedChar(c === selectedChar ? null : c);
    setSelectedEmoticon(null);
  };

  const meaning =
    selectedSentence && selectedEmoticon
      ? (emoticonData[selectedSentence]?.[selectedEmoticon] ?? null)
      : null;

  const activeCfg = selectedChar ? CHAR_CFG[selectedChar] : null;

  return (
    <section className="h-full w-full overflow-y-auto bg-white p-5 font-system98 text-[#1b1b1b]">
      {/* ── Header ─────────────────────────────────── */}
      <h2 className="text-xl font-bold text-[#2f2f2f]">
        Korean Emoticons: Understanding How Subtle Emotional Differences Are Evoked Online
      </h2>

      <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.06em] text-[#6a5acd]">
        #CSCW2022 #Online Survey #Sentiment Analysis
      </p>

      <p className="mt-4 text-sm">
        <span className="font-bold">Paper URL: </span>
        <a
          href="https://dl.acm.org/doi/10.1145/3500868.3559463"
          target="_blank"
          rel="noreferrer"
          className="text-[#0000ee] underline"
        >
          https://dl.acm.org/doi/10.1145/3500868.3559463
        </a>
      </p>

      {/* ── What are Korean Emoticons? ─────────────── */}
      <div className="mt-8">
        <h3 className="mb-4 text-base font-bold uppercase tracking-[0.1em] text-[#6d6670]">
          What are Korean Emoticons?
        </h3>

        <div className="overflow-hidden rounded-[8px] border border-[#e0dce8]">
          {koreanChars.map((item, i) => (
            <div
              key={item.char}
              className={`grid grid-cols-[64px_140px_1fr] ${
                i !== koreanChars.length - 1 ? "border-b border-[#e0dce8]" : ""
              }`}
            >
              <div className="flex items-center justify-center bg-[#f7f7f7] text-[30px] font-black text-[#2f2f2f]">
                {item.char}
              </div>
              <div className="flex flex-col justify-center border-r border-[#e0dce8] bg-[#f7f7f7] px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#9a9099]">
                  {item.type}
                </p>
                <p className="mt-0.5 text-sm font-bold text-[#2f2f2f]">&ldquo;{item.name}&rdquo;</p>
              </div>
              <div className="flex items-center bg-white px-5 py-3">
                <p className="text-sm leading-6 text-[#4b4550]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Emoticon in Context ────────────────────── */}
      <div className="mt-10">
        <h3 className="mb-6 text-base font-bold uppercase tracking-[0.1em] text-[#6d6670]">
          Emoticon in Context
        </h3>

        <div className="grid grid-cols-[minmax(190px,260px)_1fr] items-start gap-8">
          {/* Left — Sentences */}
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#9a9099]">
              Choose a Context
            </p>
            <div className="space-y-3">
              {SENTENCES.map((s) => {
                const isSelected = selectedSentence === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSentence(isSelected ? null : s)}
                    className="w-full rounded-[10px] border-2 px-4 py-3 text-left text-sm font-bold text-[#2f2f2f] shadow-[0_2px_6px_rgba(0,0,0,0.06)]"
                    style={{
                      borderColor: isSelected ? "#6a5acd" : "#e0dce8",
                      backgroundColor: isSelected ? "#f5f3ff" : "#ffffff",
                      transition: "border-color 0.18s, background-color 0.18s",
                    }}
                  >
                    <span style={{ color: isSelected ? "#6a5acd" : "#2f2f2f" }}>{s}</span>
                    {isSelected && <span className="ml-2 text-[#6a5acd]">→</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right — Emoticon selector + result */}
          <div>
            {/* Step 1: base char */}
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#9a9099]">
              Choose a Character
            </p>
            <div className="flex gap-3">
              {BASE_CHARS.map((c) => {
                const cfg = CHAR_CFG[c];
                const isSelected = selectedChar === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleCharSelect(c)}
                    className="flex h-14 w-14 items-center justify-center rounded-[12px] border-2 text-2xl font-black shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                    style={{
                      color: cfg.color,
                      borderColor: isSelected ? cfg.color : "#e0dce8",
                      backgroundColor: isSelected ? cfg.selectedBg : "#ffffff",
                      transition: "border-color 0.18s, background-color 0.18s",
                    }}
                  >
                    {c}
                  </button>
                );
              })}
            </div>

            {/* Step 2: intensity buttons (animated) */}
            <AnimatePresence>
              {selectedChar && activeCfg && (
                <motion.div
                  key={selectedChar}
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 20 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ overflow: "hidden" }}
                >
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#9a9099]">
                    Choose Intensity
                  </p>
                  <div className="flex gap-3">
                    {CHAR_VARIANTS[selectedChar].map((variant, idx) => {
                      const isSelected = selectedEmoticon === variant;
                      return (
                        <button
                          key={variant}
                          type="button"
                          onClick={() =>
                            setSelectedEmoticon(isSelected ? null : variant)
                          }
                          className="flex min-w-[80px] flex-col items-center justify-center rounded-[10px] border-2 px-3 py-2.5 shadow-[0_2px_6px_rgba(0,0,0,0.06)]"
                          style={{
                            color: activeCfg.color,
                            borderColor: isSelected ? activeCfg.color : "#e0dce8",
                            backgroundColor: isSelected ? activeCfg.bg : "#ffffff",
                            transition: "border-color 0.18s, background-color 0.18s",
                          }}
                        >
                          <span className="text-[15px] font-bold leading-tight">{variant}</span>
                          <span
                            className="mt-1 text-[9px] font-bold uppercase tracking-[0.1em]"
                            style={{ color: activeCfg.color, opacity: 0.6 }}
                          >
                            {INTENSITY_LABELS[idx]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 3: meaning (animated) */}
            <AnimatePresence mode="wait">
              {meaning && activeCfg ? (
                <motion.div
                  key={`${selectedSentence}__${selectedEmoticon}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="mt-5 rounded-[16px] border-2 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
                  style={{ borderColor: activeCfg.color, backgroundColor: activeCfg.bg }}
                >
                  <p className="text-[26px] font-black leading-none" style={{ color: activeCfg.color }}>
                    {selectedEmoticon}
                  </p>
                  <p className="mt-3 text-[11px] leading-5 text-[#6d6670]">
                    &ldquo;{selectedSentence}&rdquo;
                  </p>
                  <p className="mt-2 text-[20px] font-black leading-snug" style={{ color: activeCfg.color }}>
                    {meaning}
                  </p>
                </motion.div>
              ) : selectedEmoticon && !selectedSentence ? (
                <motion.div
                  key="pick-context"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-5 flex min-h-[90px] items-center justify-center rounded-[16px] border-2 border-dashed border-[#c8c3d4] bg-[#f5f3ff]"
                >
                  <p className="text-center text-[13px] font-bold leading-6 text-[#6a5acd]">
                    Now select a context →
                  </p>
                </motion.div>
              ) : selectedChar && !selectedEmoticon ? (
                <motion.div
                  key="pick-intensity"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-5 flex min-h-[90px] items-center justify-center rounded-[16px] border-2 border-dashed border-[#e0dce8] bg-[#faf9fb]"
                >
                  <p className="text-center text-[13px] font-bold leading-6 text-[#6d6670]">
                    Now choose an intensity
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-5 flex min-h-[90px] items-center justify-center rounded-[16px] border-2 border-dashed border-[#e0dce8] bg-[#faf9fb]"
                >
                  <p className="text-center text-[13px] font-bold leading-6 text-[#6d6670]">
                    Select a context
                    <br />
                    and a character
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Transition paragraph ──────────────────── */}
      <div className="mt-10">
        <p className="text-sm leading-7 text-[#4b4550]">
          As illustrated above, the emotional meaning of a sentence shifts subtly depending on the
          combination of sentence context and Korean emoticons, as well as the repetition count of
          those characters. Understanding these nuances is crucial for accurate translation and
          effective cross-cultural communication.
        </p>
      </div>

      {/* ── Research Method ───────────────────────── */}
      <div className="mt-6 border-t border-[#e8e4e8] pt-6">
        <h3 className="mb-4 text-base font-bold uppercase tracking-[0.1em] text-[#6d6670]">
          Research Method: Quantitative &amp; Qualitative Insight
        </h3>
        <div className="rounded-[8px] bg-[#f7f7f7] p-5">
          <p className="text-sm leading-7 text-[#4b4550]">
            We conducted a comprehensive study to decode these digital nuances. Our methodology
            involved an{" "}
            <strong>Online Survey with 86 South Korean participants</strong> (40 male, 46 female;
            aged 19–36) followed by{" "}
            <strong>Semi-structured Interviews with 10 participants</strong> (6 male, 4 female;
            aged 20–33).
          </p>
          <p className="mt-3 text-sm leading-7 text-[#4b4550]">
            By presenting various combinations of contexts and emoticons, we gathered and analyzed
            quantitative emotional coordinates and qualitative insights to define the precise
            &lsquo;vibe&rsquo; of each interaction.
          </p>
        </div>
      </div>

      {/* ── Emotion Coordinate Space + Emotional Logic ── */}
      <div className="mt-10 border-t border-[#e8e4e8] pt-6">
        <h3 className="mb-4 text-base font-bold uppercase tracking-[0.1em] text-[#6d6670]">
          Emotion Coordinate Space
        </h3>

        {/* Side-by-side layout — stacks vertically on smaller viewports */}
        <div className="flex flex-col gap-6 xl:flex-row">
          {/* Left: Scatter Plot */}
          <div className="h-[420px] min-w-0 flex-1 xl:h-auto">
            <EmotionGraph
              hoveredIndex={graphHoveredIndex}
              onHoverChange={setGraphHoveredIndex}
            />
          </div>

          {/* Right: Emotional Logic cards */}
          <div className="flex flex-col gap-3 xl:w-[272px] xl:shrink-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9a9099]">
              Emotional Logic
            </p>
            <p className="mb-1 text-[11px] leading-5 text-[#9a9099]">
              Hover a point on the graph to see which logic applies.
            </p>

            {LOGIC_CARDS.map((card) => {
              const isHighlighted = highlightedLogic === card.id;
              const isDimmed = highlightedLogic !== null && !isHighlighted;
              return (
                <div
                  key={card.id}
                  className="rounded-[12px] border-2 p-4 transition-all duration-200"
                  style={{
                    borderColor: isHighlighted ? "#d97706" : "#e0dce8",
                    backgroundColor: isHighlighted ? "#fffbeb" : "#ffffff",
                    opacity: isDimmed ? 0.35 : 1,
                    boxShadow: isHighlighted
                      ? "0 4px 16px rgba(217,119,6,0.18)"
                      : "0 2px 6px rgba(0,0,0,0.05)",
                  }}
                >
                  {/* SVG icon */}
                  <div className="mb-3">
                    {card.id === "amplification" && (
                      <AmplificationIcon highlighted={isHighlighted} />
                    )}
                    {card.id === "neutrality" && (
                      <NeutralityIcon highlighted={isHighlighted} />
                    )}
                    {card.id === "alleviation" && (
                      <AlleviationIcon highlighted={isHighlighted} />
                    )}
                  </div>

                  <p
                    className="text-[13px] font-black uppercase tracking-[0.08em]"
                    style={{ color: isHighlighted ? "#92400e" : "#2f2f2f" }}
                  >
                    {card.title}
                  </p>
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.06em] text-[#9a9099]">
                    {card.subtitle}
                  </p>
                  <p className="mt-2 text-[12px] leading-5 text-[#4b4550]">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Research Contribution ─────────────────── */}
      <div className="mt-10 border-t border-[#e8e4e8] pt-6">
        <h3 className="mb-5 text-base font-bold uppercase tracking-[0.1em] text-[#6d6670]">
          Research Contribution
        </h3>

        <div className="space-y-3">
          {researchContributions.map((c, i) => (
            <div
              key={i}
              className="grid grid-cols-[132px_1fr] items-start gap-3 rounded-[4px] bg-[#f7f7f7] p-3"
            >
              <div className="win98-outset flex min-h-[48px] items-center justify-center bg-[#c7c7cc] px-3 py-2 text-center text-xs font-bold tracking-[0.08em] text-[#424242]">
                Contribution {i + 1}
              </div>
              <div className="py-1">
                <p className="text-[13px] font-bold text-[#2f2f2f]">{c.title}</p>
                <p className="mt-1.5 text-[13px] leading-6 text-[#4b4550]">{c.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-8" />
    </section>
  );
}
