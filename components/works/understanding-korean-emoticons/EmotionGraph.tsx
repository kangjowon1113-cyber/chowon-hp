"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import emotionData from "./emotion graph data.json";

type DataPoint = {
  context: string;
  label: string;
  count: number;
  x: number;
  y: number;
  meanings: string[];
  emojis: string[];
};

const CONTEXT_COLORS: Record<string, string> = {
  Happy: "#e8303a",
  Neutral: "#27ae60",
  Sad: "#2274e0",
};

const CONTEXT_COLORS_MUTED: Record<string, string> = {
  Happy: "#f4a3a7",
  Neutral: "#90d4af",
  Sad: "#90b8f4",
};

const FONT = "MS Sans Serif, Tahoma, sans-serif";

function expandLabel(label: string, count: number): string {
  const match = label.match(/^([ㅋㅎㅠ])/);
  if (!match) return label;
  return match[1].repeat(Math.max(1, count));
}

export function EmotionGraph() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const data = emotionData as DataPoint[];

  const svgWidth = 620;
  const svgHeight = 560;
  const padLeft = 64;
  const padRight = 40;
  const padTop = 36;
  const padBottom = 64;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const dataMin = -1;
  const dataMax = 1;
  const dataRange = dataMax - dataMin;

  const toSvg = (x: number, y: number) => ({
    sx: padLeft + ((x - dataMin) / dataRange) * plotW,
    sy: padTop + ((dataMax - y) / dataRange) * plotH,
  });

  const originX = padLeft + ((0 - dataMin) / dataRange) * plotW;
  const originY = padTop + ((dataMax - 0) / dataRange) * plotH;

  const tickValues = [-0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8];

  const hoveredPt = hoveredIndex !== null ? data[hoveredIndex] : null;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-white p-4 font-system98">
      <h2 className="text-xs font-bold uppercase tracking-widest text-[#6c6377]">
        Emotion Space of Korean Emoticons
      </h2>

      <div className="relative w-full flex-1 min-h-0 flex items-center justify-center">
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          preserveAspectRatio="xMidYMid meet"
          style={{ overflow: "visible", maxHeight: "100%" }}
        >
          {/* Grid lines */}
          {tickValues.map((v) => {
            const { sx } = toSvg(v, 0);
            const { sy } = toSvg(0, v);
            return (
              <g key={v}>
                <line x1={sx} y1={padTop} x2={sx} y2={padTop + plotH} stroke="#e8e4f0" strokeWidth={1} />
                <line x1={padLeft} y1={sy} x2={padLeft + plotW} y2={sy} stroke="#e8e4f0" strokeWidth={1} />
              </g>
            );
          })}

          {/* Axes */}
          <line x1={padLeft} y1={originY} x2={padLeft + plotW} y2={originY} stroke="#bbb" strokeWidth={1.5} />
          <line x1={originX} y1={padTop} x2={originX} y2={padTop + plotH} stroke="#bbb" strokeWidth={1.5} />

          {/* Axis labels */}
          <text x={padLeft + plotW + 8} y={originY + 5} fontSize={16} fill="#aaa" fontFamily={FONT}>→ Valence</text>
          <text x={originX - 6} y={padTop - 12} fontSize={16} fill="#aaa" fontFamily={FONT} textAnchor="middle">↑ Arousal</text>

          {/* Tick labels */}
          {[-0.5, 0, 0.5].map((v) => {
            const { sx } = toSvg(v, 0);
            return (
              <text key={`xt-${v}`} x={sx} y={originY + 20} fontSize={14} fill="#bbb" textAnchor="middle" fontFamily={FONT}>
                {v}
              </text>
            );
          })}
          {[-0.5, 0.5].map((v) => {
            const { sy } = toSvg(0, v);
            return (
              <text key={`yt-${v}`} x={originX - 10} y={sy + 5} fontSize={14} fill="#bbb" textAnchor="end" fontFamily={FONT}>
                {v}
              </text>
            );
          })}

          {/* Legend */}
          {["Happy", "Neutral", "Sad"].map((ctx, i) => (
            <g key={ctx} transform={`translate(${padLeft + i * 120}, ${svgHeight - 18})`}>
              <circle cx={7} cy={0} r={6} fill={CONTEXT_COLORS[ctx]} />
              <text x={18} y={5} fontSize={16} fill="#555" fontFamily={FONT}>{ctx}</text>
            </g>
          ))}

          {/* Data nodes */}
          {data.map((pt, i) => {
            const { sx, sy } = toSvg(pt.x, pt.y);
            const color = CONTEXT_COLORS[pt.context] ?? "#888";
            const isHovered = hoveredIndex === i;
            const isDimmed = hoveredIndex !== null && !isHovered;

            return (
              <motion.g
                key={`${pt.context}-${pt.label}-${i}`}
                style={{ cursor: "default", transformOrigin: `${sx}px ${sy}px` }}
                onHoverStart={() => setHoveredIndex(i)}
                onHoverEnd={() => setHoveredIndex(null)}
                animate={{
                  opacity: isDimmed ? 0.18 : 1,
                  scale: isHovered ? 2.4 : 1,
                }}
                transition={{ duration: 0.15 }}
              >
                <circle
                  cx={sx}
                  cy={sy}
                  r={6}
                  fill={isHovered ? color : (CONTEXT_COLORS_MUTED[pt.context] ?? "#ccc")}
                  stroke={color}
                  strokeWidth={isHovered ? 2 : 1.5}
                />
                {/* Default tiny label */}
                {!isHovered && (
                  <text
                    x={sx + 10}
                    y={sy + 5}
                    fontSize={15}
                    fill={color}
                    fontFamily={FONT}
                    fontWeight="600"
                    opacity={isDimmed ? 0.2 : 0.75}
                  >
                    {pt.label}
                  </text>
                )}
              </motion.g>
            );
          })}

          {/* Hover tooltip — rendered outside motion.g so it doesn't scale */}
          {hoveredPt !== null && hoveredIndex !== null && (() => {
            const { sx, sy } = toSvg(hoveredPt.x, hoveredPt.y);
            const color = CONTEXT_COLORS[hoveredPt.context] ?? "#888";
            const expanded = expandLabel(hoveredPt.label, hoveredPt.count);
            const tooltipW = 210;
            const tooltipH = 80;
            const margin = 18;
            const ttX = sx + margin + tooltipW > svgWidth ? sx - tooltipW - margin : sx + margin;
            const ttY = Math.max(padTop, Math.min(sy - tooltipH / 2, padTop + plotH - tooltipH));

            return (
              <g>
                <rect x={ttX} y={ttY} width={tooltipW} height={tooltipH} rx={10} fill="white" stroke={color} strokeWidth={1.5} />
                <text x={ttX + 14} y={ttY + 28} fontSize={22} fontWeight="700" fill={color} fontFamily={FONT}>
                  {expanded}
                </text>
                <text x={ttX + 14} y={ttY + 48} fontSize={13} fill="#555" fontFamily={FONT}>
                  {hoveredPt.meanings.join("  ·  ")}
                </text>
                <text x={ttX + 14} y={ttY + 68} fontSize={18} fontFamily={FONT}>
                  {hoveredPt.emojis.join(" ")}
                </text>
              </g>
            );
          })()}
        </svg>
      </div>
    </div>
  );
}
