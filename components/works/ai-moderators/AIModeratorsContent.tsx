"use client";

type FlowStepProps = {
  label: string;
  sub?: string;
  color: string;
  bg: string;
};

function FlowStep({ label, sub, color, bg }: FlowStepProps) {
  return (
    <div
      className="flex flex-1 flex-col items-center justify-center rounded-[8px] border-2 px-3 py-3 text-center"
      style={{ borderColor: color, backgroundColor: bg }}
    >
      <p className="text-[11px] font-bold leading-tight" style={{ color }}>
        {label}
      </p>
      {sub && (
        <p
          className="mt-1 text-[9px] font-bold uppercase tracking-[0.08em]"
          style={{ color, opacity: 0.65 }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

function Arrow() {
  return <span className="shrink-0 text-[16px] font-bold text-[#9a9099]">→</span>;
}

const COMPARISON_DATA = [
  { dimension: "Scale", survey: "High", human: "Low", ai: "High" },
  { dimension: "Depth", survey: "Low", human: "High", ai: "Medium–High" },
  { dimension: "Probing", survey: "None", human: "Manual", ai: "Automated" },
  { dimension: "Cost", survey: "Low", human: "High", ai: "Medium" },
  { dimension: "Consistency", survey: "High", human: "Low", ai: "High" },
];

function getCellStyle(value: string): { bg: string; text: string } {
  const v = value.toLowerCase();
  if (v === "high" || v === "automated") return { bg: "#e8f5e9", text: "#1a7a3a" };
  if (v === "medium–high" || v === "medium") return { bg: "#fff8e1", text: "#8a5a00" };
  return { bg: "#fce8e8", text: "#8b2020" };
}

export function AIModeratorsContent() {
  return (
    <section className="h-full w-full overflow-y-auto bg-white p-6 font-system98 text-[#1b1b1b]">
      {/* ── Header ─────────────────────────────────── */}
      <h2 className="text-xl font-bold leading-tight text-[#2f2f2f]">
        AI Moderators: Blurring the Boundaries of Qualitative and Quantitative Research
      </h2>
      <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.06em] text-[#6a5acd]">
        #Qualitative AI &nbsp; #AI Moderator Design &nbsp; #Prompt Engineering
      </p>
      <p className="mt-4 text-sm">
        <span className="font-bold">Product URL: </span>
        <a
          href="https://www.proby.io/landing"
          target="_blank"
          rel="noreferrer"
          className="text-[#0000ee] underline"
        >
          https://www.proby.io/landing
        </a>
      </p>

      {/* ── 01. Current Research Situation ─────────── */}
      <div className="mt-10 border-t border-[#e8e4e8] pt-8">
        <div className="mb-1 text-[11px] font-bold tracking-[0.12em] text-[#9a9099]">01 —</div>
        <h3 className="mb-5 text-base font-bold uppercase tracking-[0.1em] text-[#6d6670]">
          Current Research Situation
        </h3>
        <p className="mb-5 text-sm leading-7 text-[#4b4550]">
          Research has always involved a fundamental trade-off.
        </p>

        <div className="grid grid-cols-2 gap-4">
          {/* a. Quantitative */}
          <div className="rounded-[10px] border-2 border-[#4169e1]/40 bg-[#f0f4ff] p-5">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-[4px] bg-[#4169e1] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white">
                a. Quantitative
              </span>
              <span className="text-[11px] text-[#6d6670]">Survey</span>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-[12px]">
                <span className="font-bold text-[#1a9955]">✓</span>
                <span className="text-[#2f2f2f]">Scalable</span>
              </li>
              <li className="flex items-center gap-2 text-[12px]">
                <span className="font-bold text-[#1a9955]">✓</span>
                <span className="text-[#2f2f2f]">Efficient</span>
              </li>
              <li className="flex items-center gap-2 text-[12px]">
                <span className="font-bold text-[#cc4444]">−</span>
                <span className="text-[#6d6670]">Lacks depth and context</span>
              </li>
            </ul>
          </div>

          {/* b. Qualitative */}
          <div className="rounded-[10px] border-2 border-[#6a5acd]/40 bg-[#f5f0ff] p-5">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-[4px] bg-[#6a5acd] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white">
                b. Qualitative
              </span>
              <span className="text-[11px] text-[#6d6670]">Interview</span>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-[12px]">
                <span className="font-bold text-[#1a9955]">✓</span>
                <span className="text-[#2f2f2f]">Rich and contextual</span>
              </li>
              <li className="flex items-center gap-2 text-[12px]">
                <span className="font-bold text-[#cc4444]">−</span>
                <span className="text-[#6d6670]">Limited in scale</span>
              </li>
              <li className="flex items-center gap-2 text-[12px]">
                <span className="font-bold text-[#cc4444]">−</span>
                <span className="text-[#6d6670]">Cost-intensive</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 rounded-[8px] bg-[#f7f7f7] px-6 py-4">
          <span className="text-[12px] text-[#4b4550]">→ Researchers have been forced to choose:</span>
          <span className="rounded-[4px] bg-[#4169e1] px-3 py-1 text-[13px] font-black text-white">
            Depth
          </span>
          <span className="text-[13px] font-bold text-[#9a9099]">vs.</span>
          <span className="rounded-[4px] bg-[#6a5acd] px-3 py-1 text-[13px] font-black text-white">
            Scale
          </span>
        </div>
      </div>

      {/* ── 02. AI Moderators to Merge This Gap ─────── */}
      <div className="mt-10 border-t border-[#e8e4e8] pt-8">
        <div className="mb-1 text-[11px] font-bold tracking-[0.12em] text-[#9a9099]">02 —</div>
        <h3 className="mb-5 text-base font-bold uppercase tracking-[0.1em] text-[#6d6670]">
          AI Moderators to Merge This Gap
        </h3>

        <p className="mb-4 text-sm leading-7 text-[#4b4550]">
          AI Moderators introduce a fundamentally different way of conducting research. Instead of
          separating quantitative and qualitative methods, they enable both to operate within a
          single interface.
        </p>

        <div className="space-y-2.5">
          <div className="flex items-start gap-3 rounded-[8px] bg-[#f0f4ff] px-4 py-3">
            <span className="mt-0.5 shrink-0 rounded-[4px] bg-[#4169e1] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.06em] text-white">
              Quant Input
            </span>
            <p className="text-[12px] leading-6 text-[#4b4550]">
              Structured, multiple-choice questions (quantitative input)
            </p>
          </div>
          <div className="flex items-start gap-3 rounded-[8px] bg-[#f5f0ff] px-4 py-3">
            <span className="mt-0.5 shrink-0 rounded-[4px] bg-[#6a5acd] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.06em] text-white">
              Qual Depth
            </span>
            <p className="text-[12px] leading-6 text-[#4b4550]">
              Contextual, adaptive probing based on individual responses (qualitative depth)
            </p>
          </div>
        </div>

        <p className="mt-4 text-[12px] leading-7 text-[#6d6670]">
          → These two layers are no longer separate — they are tightly integrated in real time.
        </p>

        <p className="mt-4 text-[12px] leading-6 text-[#4b4550]">
          In practice, this creates a new type of research flow:
        </p>
        <ul className="mt-2 space-y-1.5 pl-4">
          {[
            "A participant selects an answer to a structured question",
            "The AI immediately follows up with personalized probing",
            "Responses become both structured and context-rich at the same time",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-[12px] text-[#4b4550]">
              <span className="mt-0.5 text-[#6a5acd]">→</span>
              {item}
            </li>
          ))}
        </ul>

        {/* Flow Diagram */}
        <div className="mt-6">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#9a9099]">
            Flow Diagram
          </p>
          <div className="overflow-x-auto rounded-[10px] border border-[#e0dce8] bg-[#faf9fb] px-5 py-5">
            <div className="flex min-w-[520px] items-stretch gap-2">
              <FlowStep color="#4169e1" bg="#f0f4ff" label="User Response" />
              <Arrow />
              <FlowStep
                color="#6a5acd"
                bg="#f5f0ff"
                label="Quant / Qual Question"
                sub="선택"
              />
              <Arrow />
              <FlowStep color="#1a9955" bg="#f0fff7" label="AI Probing" sub="개인화 질문" />
              <Arrow />
              <FlowStep color="#FF1493" bg="#fff0f8" label="Structured + Rich Data" />
            </div>
          </div>
        </div>
      </div>

      {/* ── 03. Market Positioning ──────────────────── */}
      <div className="mt-10 border-t border-[#e8e4e8] pt-8">
        <div className="mb-1 text-[11px] font-bold tracking-[0.12em] text-[#9a9099]">03 —</div>
        <h3 className="mb-5 text-base font-bold uppercase tracking-[0.1em] text-[#6d6670]">
          Market Positioning: Where AI Moderators Sit
        </h3>

        <div className="overflow-hidden rounded-[10px] border border-[#e0dce8] bg-white p-2">
          <img
            src="/works/ai-moderators/quant-graph.png"
            alt="Market positioning — qualitative vs. quantitative axis"
            className="w-full object-contain"
            style={{ mixBlendMode: "multiply", maxHeight: "480px" }}
          />
        </div>
      </div>

      {/* ── 04. What We Tested ──────────────────────── */}
      <div className="mt-10 border-t border-[#e8e4e8] pt-8">
        <div className="mb-1 text-[11px] font-bold tracking-[0.12em] text-[#9a9099]">04 —</div>
        <h3 className="mb-5 text-base font-bold uppercase tracking-[0.1em] text-[#6d6670]">
          What We Tested
        </h3>

        <p className="mb-5 text-sm leading-7 text-[#4b4550]">
          To explore how LLM-based AI Moderators change this dynamic, we conducted multiple
          interview-based studies using an AI moderator system.
        </p>

        {/* Video */}
        <div className="overflow-hidden rounded-[10px] border border-[#e0dce8] bg-black">
          <video
            src="/works/ai-moderators/proby-interview.mov"
            controls
            className="w-full"
            style={{ maxHeight: "360px" }}
          >
            <track kind="captions" />
          </video>
        </div>

        <p className="mt-5 text-sm leading-7 text-[#4b4550]">
          We collaborated with a range of companies — from early-stage startups to larger
          organizations — and conducted their in-depth qualitative interviews (IDIs) using the AI
          moderator.
        </p>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="rounded-[10px] border-2 border-[#e0dce8] bg-[#f7f7f7] p-4 text-center">
            <p className="text-[28px] font-black text-[#6a5acd]">~16</p>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.06em] text-[#9a9099]">
              Total Companies
            </p>
          </div>
          <div className="rounded-[10px] border-2 border-[#e0dce8] bg-[#f7f7f7] p-4 text-center">
            <p className="text-[28px] font-black text-[#4169e1]">~2</p>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.06em] text-[#9a9099]">
              Studies per Company
            </p>
          </div>
          <div className="rounded-[10px] border-2 border-[#e0dce8] bg-[#f7f7f7] p-4 text-center">
            <p className="text-[28px] font-black text-[#1a9955]">10–60</p>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.06em] text-[#9a9099]">
              Participants per Study
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-7 text-[#4b4550]">
          Across these studies, the AI moderator was used to facilitate semi-structured interviews
          at scale, combining structured questions with adaptive probing. This allowed us to observe
          how AI moderation performs across different research contexts, participant sizes, and use
          cases.
        </p>
      </div>

      {/* ── 05. Key Findings ────────────────────────── */}
      <div className="mt-10 border-t border-[#e8e4e8] pt-8">
        <div className="mb-1 text-[11px] font-bold tracking-[0.12em] text-[#9a9099]">05 —</div>
        <h3 className="mb-6 text-base font-bold uppercase tracking-[0.1em] text-[#6d6670]">
          Key Findings
        </h3>

        <div className="space-y-5">
          {/* Finding 1 */}
          <div className="rounded-[10px] border-2 border-[#6a5acd]/30 p-5">
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#6a5acd] text-[11px] font-black text-white">
                1
              </span>
              <h4 className="text-[13px] font-bold text-[#2f2f2f]">
                The boundary between quantitative and qualitative research is collapsing
              </h4>
            </div>
            <ul className="space-y-1.5 pl-10">
              {[
                "Multiple-choice questions can be followed by contextual probing",
                "Quantitative responses gain explanatory depth",
                "Qualitative responses can be structured and analyzed at scale",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-[12px] text-[#4b4550]">
                  <span className="mt-0.5 text-[#6a5acd]">→</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap items-center gap-2 pl-10">
              <span className="rounded-[4px] border border-[#4169e1]/40 bg-[#f0f4ff] px-3 py-1.5 text-[11px] font-bold text-[#4169e1]">
                Structured enough to scale
              </span>
              <span className="text-[#9a9099]">+</span>
              <span className="rounded-[4px] border border-[#6a5acd]/40 bg-[#f5f0ff] px-3 py-1.5 text-[11px] font-bold text-[#6a5acd]">
                Rich enough to interpret
              </span>
              <span className="text-[#9a9099]">=</span>
              <span className="rounded-[4px] border border-[#FF1493]/40 bg-[#fff0f8] px-3 py-1.5 text-[11px] font-bold text-[#FF1493]">
                New Hybrid Data Layer
              </span>
            </div>
          </div>

          {/* Finding 2 */}
          <div className="rounded-[10px] border-2 border-[#4169e1]/30 p-5">
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#4169e1] text-[11px] font-black text-white">
                2
              </span>
              <h4 className="text-[13px] font-bold text-[#2f2f2f]">
                Large-scale qualitative research becomes possible
              </h4>
            </div>
            <ul className="space-y-1.5 pl-10">
              {[
                "Removes the traditional limitation of 1:1 moderated interviews",
                "Enables simultaneous semi-structured interviews at scale",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-[12px] text-[#4b4550]">
                  <span className="mt-0.5 text-[#4169e1]">→</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-[8px] bg-[#fce8e8] p-3 text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#cc4444]">
                  Before
                </p>
                <p className="mt-2 text-[26px] font-black text-[#cc4444]">~10</p>
                <p className="text-[11px] text-[#cc4444]">in-depth interviews</p>
              </div>
              <div className="rounded-[8px] bg-[#e8f5e9] p-3 text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#1a7a3a]">
                  After
                </p>
                <p className="mt-2 text-[26px] font-black text-[#1a7a3a]">50–100+</p>
                <p className="text-[11px] text-[#1a7a3a]">with comparable depth</p>
              </div>
            </div>
            <div className="mt-3 rounded-[8px] border border-[#4169e1]/30 bg-[#f0f4ff] px-4 py-2.5 text-center">
              <span className="text-[12px] font-bold text-[#4169e1]">
                → New research mode: &ldquo;Scalable Qualitative Research&rdquo;
              </span>
            </div>
          </div>

          {/* Finding 3 */}
          <div className="rounded-[10px] border-2 border-[#1a9955]/30 p-5">
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1a9955] text-[11px] font-black text-white">
                3
              </span>
              <h4 className="text-[13px] font-bold text-[#2f2f2f]">
                The role of the researcher is shifting
              </h4>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 pl-10">
              <div className="rounded-[8px] border border-[#e0dce8] bg-[#f7f7f7] p-4">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.08em] text-[#9a9099]">
                  From
                </p>
                <ul className="space-y-1.5">
                  {[
                    "Asking questions directly",
                    "Moderating conversations manually",
                    "Interviewing skill",
                    "Real-time moderation",
                  ].map((item) => (
                    <li key={item} className="text-[11px] text-[#4b4550]">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[8px] border border-[#1a9955]/40 bg-[#f0fff7] p-4">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.08em] text-[#1a9955]">
                  To
                </p>
                <ul className="space-y-1.5">
                  {[
                    "Designing question systems",
                    "Structuring prompts and probing logic",
                    "Prompt engineering & logic design",
                    "Pre-designed adaptive systems",
                  ].map((item) => (
                    <li key={item} className="text-[11px] text-[#4b4550]">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-3 rounded-[8px] bg-[#f7f7f7] px-4 py-2.5 text-center">
              <span className="text-[12px] font-bold text-[#1a9955]">
                Research Execution → Research System Design
              </span>
            </div>
          </div>

          {/* Finding 4 */}
          <div className="rounded-[10px] border-2 border-[#FF1493]/20 p-5">
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FF1493] text-[11px] font-black text-white">
                4
              </span>
              <h4 className="text-[13px] font-bold text-[#2f2f2f]">
                Behavioral differences emerge in AI-moderated interviews
              </h4>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 pl-10">
              <div className="rounded-[8px] border border-[#1a9955]/40 bg-[#f0fff7] p-4">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.08em] text-[#1a9955]">
                  Positive Effects
                </p>
                <ul className="space-y-2">
                  {[
                    "Users tend to be more honest",
                    "Reduced social pressure",
                    "Users take more time to think before answering",
                    "Lower people-pleasing bias",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[11px] text-[#4b4550]">
                      <span className="mt-0.5 font-bold text-[#1a9955]">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[8px] border border-[#cc4444]/40 bg-[#fce8e8] p-4">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.08em] text-[#cc4444]">
                  Limitations
                </p>
                <ul className="space-y-2">
                  {[
                    "Fatigue increases in longer sessions (30+ min)",
                    "Lack of non-verbal interaction reduces engagement",
                    "Emotional rapport is weaker than human moderators",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[11px] text-[#4b4550]">
                      <span className="mt-0.5 font-bold text-[#cc4444]">−</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-3 pl-10 text-[12px] leading-6 text-[#6d6670]">
              → AI moderation changes not only data collection, but also how users behave during
              interviews
            </p>
          </div>
        </div>
      </div>

      {/* ── 06. Comparison Table ────────────────────── */}
      <div className="mt-10 border-t border-[#e8e4e8] pt-8">
        <div className="mb-1 text-[11px] font-bold tracking-[0.12em] text-[#9a9099]">06 —</div>
        <h3 className="mb-5 text-base font-bold uppercase tracking-[0.1em] text-[#6d6670]">
          Comparison: Traditional Methods vs AI Moderator
        </h3>

        <div className="overflow-hidden rounded-[10px] border border-[#e0dce8]">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-[#f7f7f7]">
                <th className="border-b border-r border-[#e0dce8] px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.08em] text-[#9a9099]">
                  Dimension
                </th>
                <th className="border-b border-r border-[#e0dce8] px-4 py-3 text-center text-[11px] font-bold uppercase tracking-[0.08em] text-[#4169e1]">
                  Survey
                </th>
                <th className="border-b border-r border-[#e0dce8] px-4 py-3 text-center text-[11px] font-bold uppercase tracking-[0.08em] text-[#6a5acd]">
                  Human Interview
                </th>
                <th className="border-b border-[#e0dce8] px-4 py-3 text-center text-[11px] font-bold uppercase tracking-[0.08em] text-[#FF1493]">
                  AI Moderator
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_DATA.map((row, i) => (
                <tr
                  key={row.dimension}
                  className={i < COMPARISON_DATA.length - 1 ? "border-b border-[#e0dce8]" : ""}
                >
                  <td className="border-r border-[#e0dce8] px-4 py-3 text-[12px] font-bold text-[#2f2f2f]">
                    {row.dimension}
                  </td>
                  {[row.survey, row.human, row.ai].map((val, j) => {
                    const cellStyle = getCellStyle(val);
                    return (
                      <td
                        key={j}
                        className={`px-4 py-3 text-center text-[12px] font-bold ${j < 2 ? "border-r border-[#e0dce8]" : ""}`}
                        style={{ backgroundColor: cellStyle.bg, color: cellStyle.text }}
                      >
                        {val}
                      </td>
                    );
                  })}
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
