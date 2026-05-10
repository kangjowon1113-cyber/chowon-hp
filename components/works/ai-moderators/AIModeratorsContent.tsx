"use client";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-4 text-base font-bold text-[#2f2f2f]">{children}</h3>;
}

function Divider() {
  return <div className="my-8 border-t border-[#e8e4e8]" />;
}

// ── Chapter 1 visualization: Gap Plot ────────────────────────────────────────

function GapPlot() {
  return (
    <div className="mt-5 overflow-hidden rounded-[10px] border border-[#e0dce8] bg-[#faf9fb]">
      <svg viewBox="0 0 480 260" width="100%" style={{ display: "block" }}>
        {/* axes */}
        <line x1="40" y1="130" x2="440" y2="130" stroke="#ddd8e4" strokeWidth="1" />
        <line x1="240" y1="20" x2="240" y2="245" stroke="#ddd8e4" strokeWidth="1" />

        {/* axis labels */}
        <text x="240" y="14" textAnchor="middle" fontSize="8" fontWeight="700" letterSpacing="0.12em" fill="#b0a8bc" fontFamily="system-ui,sans-serif">HIGH DEPTH</text>
        <text x="240" y="258" textAnchor="middle" fontSize="8" fontWeight="700" letterSpacing="0.12em" fill="#b0a8bc" fontFamily="system-ui,sans-serif">LOW DEPTH</text>
        <text x="36" y="133" textAnchor="end" fontSize="8" fontWeight="700" letterSpacing="0.12em" fill="#b0a8bc" fontFamily="system-ui,sans-serif">LOW SCALE</text>
        <text x="444" y="133" textAnchor="start" fontSize="8" fontWeight="700" letterSpacing="0.12em" fill="#b0a8bc" fontFamily="system-ui,sans-serif">HIGH SCALE</text>

        {/* Survey ellipse — wide/flat, lower-right (high scale, low depth) */}
        <ellipse cx="350" cy="192" rx="80" ry="26" fill="#000080" opacity="0.10" stroke="#000080" strokeWidth="1.5" strokeOpacity="0.35" />
        <text x="350" y="190" textAnchor="middle" fontSize="11" fontWeight="700" fill="#000080" fontFamily="system-ui,sans-serif">Survey</text>
        <text x="350" y="203" textAnchor="middle" fontSize="8.5" fill="#000080" fontFamily="system-ui,sans-serif" opacity="0.5">High Scale · Low Depth</text>

        {/* IDI ellipse — very tall/narrow, upper-left (low scale, clearly high depth) */}
        <ellipse cx="110" cy="75" rx="24" ry="72" fill="#A29BFE" opacity="0.15" stroke="#A29BFE" strokeWidth="1.5" strokeOpacity="0.5" />
        <text x="110" y="72" textAnchor="middle" fontSize="11" fontWeight="700" fill="#A29BFE" fontFamily="system-ui,sans-serif" opacity="0.9">IDI</text>
        <text x="110" y="85" textAnchor="middle" fontSize="8.5" fill="#A29BFE" fontFamily="system-ui,sans-serif" opacity="0.7">Low Scale · High Depth</text>

        {/* AI Moderator — high scale, slightly above mid depth */}
        <ellipse cx="358" cy="97" rx="64" ry="34" fill="#A29BFE" opacity="0.09" />
        <ellipse cx="358" cy="97" rx="48" ry="24" fill="#A29BFE" opacity="0.20" stroke="#A29BFE" strokeWidth="1.2" strokeOpacity="0.65" strokeDasharray="3 2" />
        <text x="358" y="94" textAnchor="middle" fontSize="11" fontWeight="800" fill="#000080" fontFamily="system-ui,sans-serif">AI Moderator</text>
        <text x="358" y="107" textAnchor="middle" fontSize="8.5" fill="#A29BFE" fontFamily="system-ui,sans-serif" opacity="0.85">High Scale · Mid Depth</text>
      </svg>
    </div>
  );
}

// ── Chapter 2 visualization: Live Data Flow ──────────────────────────────────

const PROBING_EXAMPLES = [
  { user: '"It\'s frustrating"',        ai: 'Can you describe what specifically felt frustrating?' },
  { user: '"I gave up halfway"',        ai: 'What made you decide to stop at that point?' },
  { user: '"I expected it to be fast"', ai: 'How long did you expect it to take?' },
];

function LiveDataFlow() {
  return (
    <div className="mt-5 space-y-3">
      {PROBING_EXAMPLES.map((ex, i) => (
        <div key={i} className="rounded-[8px] border border-[#e0dce8] bg-[#faf9fb] p-4">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 shrink-0 rounded-[4px] bg-[#4b4550] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-white">User</span>
            <p className="text-sm text-[#2f2f2f]">{ex.user}</p>
          </div>
          <div className="mt-2 flex items-start gap-3 pl-4">
            <span className="mt-0.5 shrink-0 rounded-[4px] bg-[#000080] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-white">AI Probe</span>
            <p className="text-sm italic text-[#000080]">{ex.ai}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Chapter 3 visualization: Complex Tree ────────────────────────────────────

function ComplexTree() {
  type N = { cx: number; cy: number; hl: boolean };
  const nodes: N[] = [
    { cx: 110, cy: 15,  hl: false }, // 0  Root
    { cx: 45,  cy: 52,  hl: false }, // 1  A
    { cx: 110, cy: 52,  hl: true  }, // 2  B*
    { cx: 175, cy: 52,  hl: false }, // 3  C
    { cx: 20,  cy: 89,  hl: false }, // 4  A1
    { cx: 58,  cy: 89,  hl: false }, // 5  A2
    { cx: 88,  cy: 89,  hl: true  }, // 6  B1*
    { cx: 110, cy: 89,  hl: true  }, // 7  B2*
    { cx: 133, cy: 89,  hl: true  }, // 8  B3*
    { cx: 155, cy: 89,  hl: false }, // 9  C1
    { cx: 192, cy: 89,  hl: false }, // 10 C2
    { cx: 12,  cy: 126, hl: false }, // 11 A1a
    { cx: 30,  cy: 126, hl: false }, // 12 A1b
    { cx: 50,  cy: 126, hl: false }, // 13 A2a
    { cx: 68,  cy: 126, hl: false }, // 14 A2b
    { cx: 88,  cy: 126, hl: true  }, // 15 B1a*
    { cx: 110, cy: 126, hl: true  }, // 16 B2a*
    { cx: 133, cy: 126, hl: true  }, // 17 B3a*
    { cx: 145, cy: 126, hl: false }, // 18 C1a
    { cx: 162, cy: 126, hl: false }, // 19 C1b
    { cx: 183, cy: 126, hl: false }, // 20 C2a
    { cx: 205, cy: 126, hl: false }, // 21 C2b
    { cx: 30,  cy: 163, hl: false }, // 22 A1b1
    { cx: 68,  cy: 163, hl: false }, // 23 A2b1
    { cx: 82,  cy: 163, hl: true  }, // 24 B1a1*
    { cx: 97,  cy: 163, hl: true  }, // 25 B1a2*
    { cx: 110, cy: 163, hl: true  }, // 26 B2a1*
    { cx: 127, cy: 163, hl: true  }, // 27 B3a1*
    { cx: 140, cy: 163, hl: true  }, // 28 B3a2*
    { cx: 183, cy: 163, hl: false }, // 29 C2a1
    { cx: 68,  cy: 200, hl: false }, // 30 A2b1a
    { cx: 183, cy: 200, hl: false }, // 31 C2a1a
    { cx: 68,  cy: 237, hl: false }, // 32 A2b1a1
  ];

  const edges: [number, number][] = [
    [0,1],[0,2],[0,3],
    [1,4],[1,5],
    [2,6],[2,7],[2,8],
    [3,9],[3,10],
    [4,11],[4,12],
    [5,13],[5,14],
    [6,15],[7,16],[8,17],
    [9,18],[9,19],
    [10,20],[10,21],
    [12,22],[14,23],
    [15,24],[15,25],
    [16,26],
    [17,27],[17,28],
    [20,29],[23,30],[29,31],[30,32],
  ];

  return (
    <svg viewBox="0 0 220 252" width="200" style={{ display: "block", flexShrink: 0 }}>
      {/* Highlight background around the Q1 sub-tree */}
      <rect x="70" y="44" width="80" height="130" rx="5"
        fill="#A29BFE08" stroke="#A29BFE" strokeWidth="1" strokeDasharray="4 2" />

      {edges.map(([fi, ti], i) => {
        const f = nodes[fi], t = nodes[ti];
        const hl = f.hl && t.hl;
        return (
          <line key={i}
            x1={f.cx} y1={f.cy + 5} x2={t.cx} y2={t.cy - 5}
            stroke={hl ? "#A29BFE" : "#c0b8cc"}
            strokeWidth={hl ? 1.2 : 0.8}
          />
        );
      })}

      {nodes.map((n, i) => (
        <rect key={i}
          x={n.cx - 10} y={n.cy - 5} width={20} height={10} rx={2}
          fill={n.hl ? "#eeecff" : "white"}
          stroke={n.hl ? "#A29BFE" : "#c0b8cc"}
          strokeWidth={n.hl ? 1.2 : 0.8}
        />
      ))}
    </svg>
  );
}

// ── Chapter 3 visualization: Conversation Flow ────────────────────────────────

function ConversationFlow() {
  return (
    <div className="mt-5">
      <p className="mb-3 text-sm font-bold text-[#4b4550]">
        Live Moderation in Action
      </p>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
        {/* User */}
        <div className="flex-1 rounded-[10px] rounded-bl-[3px] border border-[#e0dce8] bg-white p-3 shadow-sm">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.08em] text-[#9a9099]">User says</p>
          <p className="text-sm italic leading-6 text-[#4b4550]">
            "I use Tinder and Bumble, but I mostly use Bumble because people seem more serious there."
          </p>
        </div>

        <div className="hidden shrink-0 text-[#c0b8cc] sm:mt-8 sm:block">→</div>

        {/* AI Detects */}
        <div className="flex-1 rounded-[10px] border border-[#A29BFE]/40 bg-[#f5f4ff] p-3">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.08em] text-[#A29BFE]">AI detects</p>
          <ul className="space-y-1.5">
            {[
              ["Multiple apps", "Tinder, Bumble"],
              ["Primary app", "Bumble"],
              ["Reason", "serious user base"],
              ["Comparison cue", "Tinder vs Bumble"],
            ].map(([k, v]) => (
              <li key={k} className="text-sm leading-5 text-[#4b4550]">
                <span className="font-semibold text-[#6b5fb0]">· {k}:</span> {v}
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden shrink-0 text-[#c0b8cc] sm:mt-8 sm:block">→</div>

        {/* Next Action */}
        <div className="flex-1 rounded-[10px] border border-[#55E6C1]/40 bg-[#f0faf8] p-3">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.08em] text-[#2db89a]">Next action</p>
          <p className="text-sm leading-6 text-[#4b4550]">
            Ask why Bumble feels more serious, and what makes Tinder feel different.
          </p>
        </div>

        <div className="hidden shrink-0 text-[#c0b8cc] sm:mt-8 sm:block">→</div>

        {/* AI Response */}
        <div className="flex-1 rounded-[10px] rounded-br-[3px] border border-[#000080]/20 bg-[#f0f0ff] p-3">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.08em] text-[#000080]">AI Moderator</p>
          <p className="text-sm italic leading-6 text-[#000080]">
            "Why does Bumble feel more serious than Tinder? I want you to explain what makes the two apps feel different."
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Chapter 3 visualization: Architect Section ────────────────────────────────

function ArchitectSection() {
  const ifCards = [
    {
      condition: "If the user uses multiple dating applications:",
      checklist: [
        "Figure out which dating application the user uses the most frequently, and why it is used most frequently.",
        "Understand why the user switches between applications.",
      ],
      color: "#A29BFE", bg: "#f5f4ff", borderColor: "#A29BFE70",
    },
    {
      condition: "If the user rarely uses the app",
      checklist: [
        "Understand what prevents active usage.",
        "Explore whether external factors affect usage frequency.",
      ],
      color: "#000080", bg: "#f0f0ff", borderColor: "#00008050",
    },
    {
      condition: "If the user uses the app very frequently",
      checklist: [
        "Understand whether usage is habitual, emotional, or goal-oriented.",
        "Explore how they usually spend time inside the app.",
      ],
      color: "#2db89a", bg: "#f0faf8", borderColor: "#55E6C160",
    },
  ];

  return (
    <div className="mt-5">
      <p className="mb-3 text-sm font-bold text-[#4b4550]">
        Researcher's Role in Structuring the AI Moderator's Thinking Logic
      </p>

      <div className="flex flex-col overflow-hidden rounded-[10px] border border-[#e0dce8] bg-[#faf9fb] sm:flex-row sm:items-start">
        {/* Left: Full logic tree */}
        <div className="shrink-0 p-4 pr-2">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.08em] text-[#9a9099]">Full Research Logic</p>
          <ComplexTree />
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-[#e0dce8] sm:h-auto sm:w-px sm:self-stretch" />

        {/* Right: Q1+IF detail */}
        <div className="flex-1 min-w-0 p-4">
          <p className="mb-3 text-xs font-bold text-[#A29BFE]">
            ↳ Highlighted Branch
          </p>

          {/* Q1 card */}
          <div className="rounded-[10px] border border-[#e0dce8] bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-[4px] bg-[#f5c542] px-2 py-0.5 text-xs font-bold text-[#2f2f2f]">Q1</span>
            </div>
            <p className="text-sm font-bold text-[#2f2f2f]">
              Which dating application do you use the most?
            </p>
            <div className="mt-3">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.08em] text-[#4b4550]">Checklist</p>
              <ul className="space-y-2">
                {[
                  "Figure out the names of dating application the user uses.",
                  "Understand how often the user uses each dating application.",
                  "Understand the main purpose of using each application (serious relationship, casual dating, friendship, networking, entertainment, etc.).",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm leading-6 text-[#4b4550]">
                    <span className="mt-1 h-3 w-3 shrink-0 rounded-sm border border-[#c0b8cc]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tree connector */}
          <svg viewBox="0 0 600 34" preserveAspectRatio="none" className="w-full" style={{ height: 34, display: "block" }}>
            <line x1="300" y1="0" x2="300" y2="17" stroke="#c0b8cc" strokeWidth="1.5" />
            <line x1="100" y1="17" x2="500" y2="17" stroke="#c0b8cc" strokeWidth="1.5" />
            <line x1="100" y1="17" x2="100" y2="34" stroke="#c0b8cc" strokeWidth="1.5" />
            <line x1="300" y1="17" x2="300" y2="34" stroke="#c0b8cc" strokeWidth="1.5" />
            <line x1="500" y1="17" x2="500" y2="34" stroke="#c0b8cc" strokeWidth="1.5" />
          </svg>

          {/* IF cards */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {ifCards.map((card, i) => (
              <div key={i} className="rounded-[8px] border p-3"
                style={{ borderColor: card.borderColor, backgroundColor: card.bg }}>
                <span className="rounded-[4px] px-1.5 py-0.5 text-xs font-bold uppercase tracking-[0.06em] text-white"
                  style={{ backgroundColor: card.color }}>IF</span>
                <p className="mt-2 text-sm font-bold leading-5 text-[#2f2f2f]">{card.condition}</p>
                <div className="mt-2">
                  <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.08em]" style={{ color: card.color }}>
                    Checklist
                  </p>
                  <ul className="space-y-1.5">
                    {card.checklist.map((item, j) => (
                      <li key={j} className="flex items-start gap-1.5 text-sm leading-5 text-[#4b4550]">
                        <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-sm border" style={{ borderColor: card.borderColor }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ConversationFlow />
    </div>
  );
}

// ── Chapter 4 visualization: Conversion Engine ───────────────────────────────

const CLUSTERS = [
  { theme: "Cognitive Load Issue",   n: 42, color: "#A29BFE", pct: 84 },
  { theme: "Navigation Confusion",   n: 31, color: "#000080", pct: 62 },
  { theme: "Speed Expectation Gap",  n: 27, color: "#55E6C1", pct: 54 },
  { theme: "Onboarding Friction",    n: 19, color: "#FF79C6", pct: 38 },
];

const RAW_QUOTES = [
  '"It\'s too cluttered"',
  '"I\'m completely lost"',
  '"Confusing UI layout"',
  '"Took way longer than expected"',
  '"I didn\'t know where to tap"',
];

function ConversionEngine() {
  return (
    <div className="mt-5 rounded-[10px] border border-[#e0dce8] bg-[#faf9fb] p-5">
      <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.14em] text-[#b0a8b8]">Data Transformation</p>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        {/* Raw quotes */}
        <div className="flex-1 space-y-1.5">
          <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.1em] text-[#9a9099]">Raw Responses</p>
          {RAW_QUOTES.map((q) => (
            <div key={q} className="rounded-[6px] border border-[#e0dce8] bg-white px-3 py-1.5">
              <p className="text-[11px] text-[#4b4550]">{q}</p>
            </div>
          ))}
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center gap-2 sm:flex-col sm:gap-0 sm:pt-10">
          <div className="rounded-[6px] bg-[#000080] px-2 py-1 text-[8px] font-bold uppercase tracking-[0.08em] text-white">AI</div>
          <span className="text-lg font-bold text-[#000080] sm:mt-1">→</span>
        </div>

        {/* Clustered output */}
        <div className="flex-1 space-y-2">
          <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.1em] text-[#9a9099]">Clustered Themes</p>
          {CLUSTERS.map((c) => (
            <div key={c.theme} className="space-y-0.5">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold text-[#2f2f2f]">{c.theme}</p>
                <span className="text-[9px] font-bold" style={{ color: c.color }}>N={c.n}</span>
              </div>
              <div className="h-[6px] overflow-hidden rounded-full bg-[#e8e8f4]">
                <div className="h-full rounded-full" style={{ width: `${c.pct}%`, backgroundColor: c.color, opacity: 0.75 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Chapter 5 table data ──────────────────────────────────────────────────────

const PLAYBOOK = [
  {
    type: "Initial Product Feedback",
    limit: "Surveys show Good/Bad; interviews limited to 5–10 people.",
    advantage: "Captures first impressions and the Why from hundreds at once.",
    example: "Understanding how users perceive a new UI element after a redesign.",
  },
  {
    type: "In-depth Churn Analysis",
    limit: "Exit surveys have low response rates and zero depth.",
    advantage: "AI intervenes at exit to capture core dissatisfaction nodes.",
    example: 'Investigating "What is holding you back?" during a sudden bounce rate spike.',
  },
  {
    type: "Brand Positioning",
    limit: "Brand image constrained to rigid 5-point scales.",
    advantage: "Collects natural language to build organic keyword maps.",
    example: 'Measuring the ratio of users who describe the brand as a "Friend" vs. an "Expert."',
  },
  {
    type: "Scaling Usability Testing",
    limit: "Researcher bottleneck: 3–4 sessions/day max.",
    advantage: "Probes friction points during unmoderated tests with 50+ participants.",
    example: "Identifying psychological hurdles for beta testers before full rollout.",
  },
];

// ── main component ────────────────────────────────────────────────────────────

export function AIModeratorsContent() {
  return (
    <section className="h-full w-full overflow-y-auto bg-white p-3 text-[#1b1b1b] sm:p-5">

      {/* Header */}
      <h2 className="text-base font-bold text-[#2f2f2f] sm:text-xl">
        AI moderators: Redefining Research through Large-Scale Qualitative AI Moderation
      </h2>
      <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.06em] text-[#6a5acd]">
        #Qualitative AI &nbsp;#AI Moderator Design &nbsp;#Prompt Engineering
      </p>
      <p className="mt-4 text-sm">
        <span className="font-bold">Product URL: </span>
        <a href="https://www.proby.io/landing" target="_blank" rel="noreferrer" className="text-[#0000ee] underline">
          https://www.proby.io/landing
        </a>
      </p>

      <Divider />

      {/* Chapter 1: The False Dichotomy */}
      <div>
        <SectionHeading>The False Dichotomy: Scale or Depth?</SectionHeading>
        <p className="text-sm leading-7 text-[#2f2f2f]">
          For decades, researchers have been forced to choose.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <div className="rounded-[10px] border-[1.5px] border-[#000080]/20 bg-[#f0f0ff] p-5">
            <span className="rounded-[4px] bg-[#000080] px-2 py-0.5 text-sm font-bold uppercase tracking-[0.08em] text-white">Quantitative Survey</span>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start gap-2 text-sm text-[#2f2f2f]">
                <span className="mt-[6px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#55E6C1]" />High scale — reaches thousands
              </li>
              <li className="flex items-start gap-2 text-sm text-[#6d6670]">
                <span className="mt-[6px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#cc4444]" />Zero context — we know <em>what</em>, never <em>why</em>
              </li>
            </ul>
          </div>
          <div className="rounded-[10px] border-[1.5px] border-[#A29BFE]/40 bg-[#f8f8ff] p-5">
            <span className="rounded-[4px] bg-[#000080] px-2 py-0.5 text-sm font-bold uppercase tracking-[0.08em] text-white">Qualitative Interview</span>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start gap-2 text-sm text-[#2f2f2f]">
                <span className="mt-[6px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#55E6C1]" />Deep context — rich, adaptive insight
              </li>
              <li className="flex items-start gap-2 text-sm text-[#6d6670]">
                <span className="mt-[6px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#cc4444]" />Impossible to scale — limited to 10–15 people
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-4 text-sm leading-7 text-[#4b4550]">
          This gap is where the most critical user insights are lost. While AI moderators may not reach the profound depth of a human-led IDI, they unlock a new frontier: <strong>Shallow-yet-Broad Qualitative Insight</strong>. It is the missing middle that allows us to listen to thousands without losing the essential context of each voice.
        </p>
        <GapPlot />
      </div>

      <Divider />

      {/* Chapter 2: Large-Scale Qualitative Research */}
      <div>
        <SectionHeading>Large-Scale Qualitative Research</SectionHeading>
        <p className="text-sm leading-7 text-[#2f2f2f]">
          AI moderators aren't here to mimic human empathy — they are here to process qualitative data at the speed of light. By utilizing LLM-based probing, we can now conduct <strong>"Shallow but Wide"</strong> qualitative research. This isn't just a better survey — it's a new data layer that captures the <em>Why</em> from 500+ participants simultaneously.
        </p>
        <p className="mt-4 text-sm leading-7 text-[#4b4550]">
          The moment a participant responds, the AI reads their answer and fires a personalised follow-up probe in real time — at any scale. Below are examples of how this plays out in practice:
        </p>
        <LiveDataFlow />
      </div>

      <Divider />

      {/* Chapter 3: From Interviewer to Architect */}
      <div>
        <SectionHeading>From Interviewer to Architect</SectionHeading>
        <p className="text-sm leading-7 text-[#2f2f2f]">
          Through our extensive field experiments, we discovered that the AI moderator's effectiveness isn't a result of its "intelligence," but of the researcher's <strong>structural foresight</strong>. This marks a fundamental shift in the researcher's identity: from a conversationalist to an <strong>Architect of Logic</strong>.
        </p>
        <p className="mt-3 text-sm leading-7 text-[#4b4550]">
          The future researcher doesn't just ask questions — they engineer the prompting strategy and guide how the AI should navigate the complexity of human response.
        </p>
        <ArchitectSection />
      </div>

      <Divider />

      {/* Chapter 4: The Data Bridge */}
      <div>
        <SectionHeading>The Data Bridge: Quantifying the Qualitative</SectionHeading>
        <p className="text-sm leading-7 text-[#2f2f2f]">
          The biggest challenge of qualitative data is the "Anecdote" trap — the fear that one person's voice isn't representative. We solve this by turning human speech into statistical evidence.
        </p>
        <div className="mt-5 space-y-4">
          {[
            {
              label: "Semantic Clustering",
              color: "#A29BFE",
              bg: "#f0f0ff",
              body: 'AI doesn\'t just look for keywords — it understands meaning. It groups "It\'s too cluttered," "I\'m lost," and "Confusing UI" into a single, quantified data point: Cognitive Load Issue (N=42).',
            },
            {
              label: "Frequency vs. Intensity",
              color: "#000080",
              bg: "#f0f0ff",
              body: "We measure not just how many people said it, but how strongly they felt. By analyzing tone and depth of explanation, we score the Intensity of pain points.",
            },
            {
              label: "Objective Evidence",
              color: "#55E6C1",
              bg: "#f0faf8",
              body: "We transform 500 individual stories into a prioritized roadmap. It's the emotional depth of an interview with the statistical power of a survey.",
            },
          ].map((item) => (
            <div key={item.label} className="rounded-[10px] border-[1.5px] p-5" style={{ borderColor: `${item.color}40`, backgroundColor: item.bg }}>
              <p className="mb-2 text-sm font-bold text-[#2f2f2f]">{item.label}</p>
              <p className="text-sm leading-6 text-[#4b4550]">{item.body}</p>
            </div>
          ))}
        </div>
        <ConversionEngine />
      </div>

      <Divider />

      {/* Chapter 5: Strategic Playbook */}
      <div>
        <SectionHeading>Strategic Playbook: When to Use</SectionHeading>
        <p className="mb-5 text-sm leading-7 text-[#2f2f2f]">
          This methodology isn't a silver bullet for every study. It is a high-precision tool designed for moments when you need both <strong>Context</strong> and <strong>Certainty</strong> at scale.
        </p>
        <div className="overflow-x-auto rounded-[10px] border border-[#e0dce8]">
          <table className="w-full min-w-[560px] border-collapse text-[12px]">
            <thead>
              <tr className="bg-[#f0f0ff]">
                {["Research Type", "Traditional Limits", "Large-Scale Qual Advantage", "Example Use Case"].map((h, i) => (
                  <th key={h} className={`border-b border-[#e0dce8] px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.08em] text-[#000080] ${i < 3 ? "border-r" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PLAYBOOK.map((row, i) => (
                <tr key={row.type} className={i < PLAYBOOK.length - 1 ? "border-b border-[#e0dce8]" : ""}>
                  <td className="border-r border-[#e0dce8] px-4 py-3 text-[12px] font-bold text-[#2f2f2f]">{row.type}</td>
                  <td className="border-r border-[#e0dce8] px-4 py-3 text-[12px] leading-5 text-[#6d6670]">{row.limit}</td>
                  <td className="border-r border-[#e0dce8] px-4 py-3 text-[12px] leading-5 text-[#2f2f2f]">{row.advantage}</td>
                  <td className="px-4 py-3 text-[12px] leading-5 text-[#4b4550] italic">{row.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="h-10" />
    </section>
  );
}
