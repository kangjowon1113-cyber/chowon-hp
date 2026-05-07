"use client";

// Coordinate system: x = 0 (Qual/left) → 100 (Quant/right)
//                   y = 0 (Un-Moderated/bottom) → 100 (Moderated/top)
// Positions traced from original reference graph.

const W = 660;
const H = 460;
const PAD = { top: 50, right: 56, bottom: 50, left: 56 };

function sx(x: number) {
  return PAD.left + (x / 100) * (W - PAD.left - PAD.right);
}
function sy(y: number) {
  return PAD.top + ((100 - y) / 100) * (H - PAD.top - PAD.bottom);
}

// ── types ────────────────────────────────────────────────────────────────────

type TextPill = {
  kind: "pill";  // bordered oval — for FGD / IDI / AST / UT
  label: string;
  x: number;
  y: number;
  w: number;
};

type TextLabel = {
  kind: "label"; // plain lightweight text
  label: string;
  x: number;
  y: number;
};

type Logo = {
  kind: "logo";
  label: string;
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
  highlight?: boolean;
};

type Tool = TextPill | TextLabel | Logo;

// ── tool definitions ─────────────────────────────────────────────────────────

const TOOLS: Tool[] = [
  // Upper-left — Moderated + Qual — pill badges
  { kind: "pill",  label: "FGD", x: 13,  y: 83,  w: 28 },
  { kind: "pill",  label: "IDI", x: 22,  y: 76,  w: 26 },
  { kind: "pill",  label: "AST", x: 30,  y: 82,  w: 28 },
  { kind: "pill",  label: "UT",  x: 19,  y: 69,  w: 22 },

  // Lower-left — Un-Moderated + Qual — plain labels
  { kind: "label", label: "Diary Study",     x: 9,  y: 49 },
  { kind: "label", label: "Observation",     x: 23, y: 43 },
  { kind: "label", label: "Un-Moderated UT", x: 31, y: 14 },

  // Lower-right — plain label
  { kind: "label", label: "Survey", x: 88, y: 10 },

  // Upper-right — Moderated + Quant — logo chips
  {
    kind: "logo", label: "Proby",
    src: "/works/ai-moderators/logos/quant-moderated/proby.png",
    x: 79, y: 89, w: 90, h: 30, highlight: true,
  },
  {
    kind: "logo", label: "Listen",
    src: "/works/ai-moderators/logos/quant-moderated/listen%20labs.png",
    x: 61, y: 78, w: 74, h: 26,
  },
  {
    kind: "logo", label: "Conveo",
    src: "/works/ai-moderators/logos/quant-moderated/conveo.jpeg",
    x: 70, y: 70, w: 74, h: 26,
  },
  {
    kind: "logo", label: "Strella",
    src: "/works/ai-moderators/logos/quant-moderated/strella.png",
    x: 65, y: 62, w: 74, h: 26,
  },
  {
    kind: "logo", label: "Suzy Speaks",
    src: "/works/ai-moderators/logos/quant-moderated/suzy-speaks.png",
    x: 62, y: 54, w: 82, h: 26,
  },

  // Lower-left — qual-unmoderated logos
  {
    kind: "logo", label: "UserTesting",
    src: "/works/ai-moderators/logos/qual-unmoderated/user%20testing.png",
    x: 12, y: 24, w: 96, h: 30,
  },
  {
    kind: "logo", label: "Maze",
    src: "/works/ai-moderators/logos/qual-unmoderated/maze.png",
    x: 39, y: 10, w: 84, h: 28,
  },
];

// ── component ─────────────────────────────────────────────────────────────────

export function MarketGraph() {
  const pills  = TOOLS.filter((t): t is TextPill  => t.kind === "pill");
  const labels = TOOLS.filter((t): t is TextLabel => t.kind === "label");
  const logos  = TOOLS.filter((t): t is Logo      => t.kind === "logo");

  const PILL_H = 18;
  const axisStroke   = "#d8d3e4";
  const labelColor   = "#a09ab8";
  const pillBorder   = "#c4bdda";
  const pillText     = "#7a7090";
  const labelText    = "#9890b0";

  return (
    <div className="overflow-hidden rounded-[12px] border border-[#ddd8e8] bg-[#f7f5fc]">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        style={{ display: "block" }}
        aria-label="Market positioning chart: Qual vs Quant, Moderated vs Un-Moderated"
      >
        <defs>
          {logos.map((t) => (
            <clipPath key={`clip-${t.label}`} id={`clip-${t.label}`}>
              <rect
                x={sx(t.x) - t.w / 2}
                y={sy(t.y) - t.h / 2}
                width={t.w}
                height={t.h}
                rx={6}
              />
            </clipPath>
          ))}
        </defs>

        {/* subtle upper-right quadrant tint — the "AI zone" */}
        <rect
          x={W / 2}
          y={PAD.top}
          width={W / 2 - PAD.right}
          height={H / 2 - PAD.top}
          fill="#6a5acd"
          opacity={0.055}
          rx={2}
        />

        {/* axes */}
        <line x1={PAD.left} y1={H / 2} x2={W - PAD.right} y2={H / 2} stroke={axisStroke} strokeWidth={1} />
        <line x1={W / 2} y1={PAD.top} x2={W / 2} y2={H - PAD.bottom} stroke={axisStroke} strokeWidth={1} />

        {/* axis labels */}
        <text x={W / 2} y={22} textAnchor="middle" fontSize={9} fontWeight="700" letterSpacing="0.14em" fill={labelColor} fontFamily="system-ui,sans-serif">MODERATED</text>
        <text x={W / 2} y={H - 8} textAnchor="middle" fontSize={9} fontWeight="700" letterSpacing="0.14em" fill={labelColor} fontFamily="system-ui,sans-serif">UN-MODERATED</text>
        <text x={PAD.left - 8} y={H / 2 + 4} textAnchor="end" fontSize={9} fontWeight="700" letterSpacing="0.14em" fill={labelColor} fontFamily="system-ui,sans-serif">QUAL</text>
        <text x={W - PAD.right + 8} y={H / 2 + 4} textAnchor="start" fontSize={9} fontWeight="700" letterSpacing="0.14em" fill={labelColor} fontFamily="system-ui,sans-serif">QUANT</text>

        {/* Proby glow rings */}
        {(() => {
          const p = logos.find((t) => t.highlight);
          if (!p) return null;
          const cx = sx(p.x), cy = sy(p.y);
          return (
            <>
              <circle cx={cx} cy={cy} r={64} fill="#6a5acd" opacity={0.09} />
              <circle cx={cx} cy={cy} r={44} fill="#6a5acd" opacity={0.14} />
              <circle cx={cx} cy={cy} r={28} fill="#7060d4" opacity={0.18} />
            </>
          );
        })()}

        {/* pill badges (FGD / IDI / AST / UT) */}
        {pills.map((t) => {
          const cx = sx(t.x), cy = sy(t.y);
          return (
            <g key={t.label}>
              <rect x={cx - t.w / 2} y={cy - PILL_H / 2} width={t.w} height={PILL_H} rx={5}
                fill="white" stroke={pillBorder} strokeWidth={0.8} />
              <text x={cx} y={cy + 4} textAnchor="middle" fontSize={8.5} fontWeight="600"
                fill={pillText} fontFamily="system-ui,sans-serif">
                {t.label}
              </text>
            </g>
          );
        })}

        {/* plain text labels */}
        {labels.map((t) => (
          <text key={t.label} x={sx(t.x)} y={sy(t.y) + 4} textAnchor="middle"
            fontSize={8.5} fontWeight="500" fill={labelText} fontFamily="system-ui,sans-serif">
            {t.label}
          </text>
        ))}

        {/* logo chips */}
        {logos.map((t) => {
          const cx = sx(t.x), cy = sy(t.y);
          const lx = cx - t.w / 2, ly = cy - t.h / 2;
          return (
            <g key={t.label}>
              <rect x={lx} y={ly} width={t.w} height={t.h} rx={6} fill="white" />
              <image
                href={t.src}
                x={lx + 4} y={ly + 4}
                width={t.w - 8} height={t.h - 8}
                preserveAspectRatio="xMidYMid meet"
                clipPath={`url(#clip-${t.label})`}
              />
              <rect x={lx} y={ly} width={t.w} height={t.h} rx={6}
                fill="none"
                stroke={t.highlight ? "#a090e0" : "#ddd8e8"}
                strokeWidth={t.highlight ? 1.5 : 0.8}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
