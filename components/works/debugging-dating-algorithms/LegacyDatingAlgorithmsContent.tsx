const insights = [
  {
    content: (
      <>
        Dating apps are more often{" "}
        <strong>used as a means for self-evaluation and validation</strong>, rather than for
        forming meaningful connections.
      </>
    ),
  },
  {
    content: (
      <>
        <strong>Effectively expressing one&apos;s unique traits and personal strengths</strong> is
        critical for successful matching.
      </>
    ),
  },
  {
    content: (
      <>
        Profiles and <strong>matching mechanisms that dynamically adapt</strong> based on user
        interest and compatibility can enable more personalized dating experiences.
      </>
    ),
  },
];

const iuProfiles = [
  {
    src: "/works/debugging-dating-algorithms/IU%20profile1.png",
    persona: "Persona 1",
    keywords: ["Reading", "Indie Music", "Film Camera"],
    color: {
      border: "border-[#ffb1c8]",
      bg: "bg-[#fff0f4]",
      text: "text-[#ff7ea7]",
      labelText: "text-[#ff7ea7]",
    },
  },
  {
    src: "/works/debugging-dating-algorithms/IU%20profile2.png",
    persona: "Persona 2",
    keywords: ["Drinking Wine", "Partying", "Cats"],
    color: {
      border: "border-[#c4baee]",
      bg: "bg-[#f0eeff]",
      text: "text-[#6a5acd]",
      labelText: "text-[#6a5acd]",
    },
  },
  {
    src: "/works/debugging-dating-algorithms/IU%20profile3.png",
    persona: "Persona 3",
    keywords: ["Street Fashion", "Graffiti", "Skate boarding"],
    color: {
      border: "border-[#7edba0]",
      bg: "bg-[#edfff4]",
      text: "text-[#1e9e4a]",
      labelText: "text-[#1e9e4a]",
    },
  },
];

const orderedKeywords = [
  { kw: "Reading", color: iuProfiles[0].color },
  { kw: "Drinking Wine", color: iuProfiles[1].color },
  { kw: "Partying", color: iuProfiles[1].color },
  { kw: "Indie Music", color: iuProfiles[0].color },
  { kw: "Street Fashion", color: iuProfiles[2].color },
  { kw: "Graffiti", color: iuProfiles[2].color },
  { kw: "Film Camera", color: iuProfiles[0].color },
  { kw: "Cats", color: iuProfiles[1].color },
  { kw: "Skate boarding", color: iuProfiles[2].color },
];

const chaEunwooSrc = "/works/debugging-dating-algorithms/%EC%B0%A8%EC%9D%80%EC%9A%B0%20profile.png";
const chaEunwooKeywords = ["Drinking", "Clubbing", "Dog"];

const amandaImageSrc = "/works/debugging-dating-algorithms/%EC%95%84%EB%A7%8C%EB%8B%A4.png";
const tinderMatchImageSrc = "/works/debugging-dating-algorithms/tinder%20match.png";
const attractivenessDataImageSrc =
  "/works/debugging-dating-algorithms/%EB%A7%A4%EB%A0%A5%20%EB%8D%B0%EC%9D%B4%ED%84%B0.png";

export function LegacyDatingAlgorithmsContent() {
  return (
    <section className="h-full w-full overflow-y-auto bg-white p-5 text-[#1b1b1b]">
      <h2 className="text-xl font-bold text-[#2f2f2f]">
        Debugging Dating Algorithms: How Can We Find True Love?
      </h2>

      <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.06em] text-[#6a5acd]">
        #CSCW2024 #IDI #AI Ethics
      </p>

      <p className="mt-4 text-sm">
        <span className="font-bold">Paper URL: </span>
        <a
          href="https://dl.acm.org/doi/abs/10.1145/3687025"
          target="_blank"
          rel="noreferrer"
          className="text-[#0000ee] underline"
        >
          https://dl.acm.org/doi/abs/10.1145/3687025
        </a>
      </p>

      <div className="mt-6">
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div key={index} className="space-y-3">
              <div className="grid grid-cols-[132px_1fr] items-center gap-3 rounded-[4px] bg-[#f7f7f7] p-3">
                <div className="win98-outset flex min-h-[48px] items-center justify-center bg-[#c7c7cc] px-3 py-2 text-center text-xs font-bold tracking-[0.08em] text-[#424242]">
                  {`Key Insight ${index + 1}`}
                </div>
                <div className="flex min-h-[48px] items-center">
                  <p className="text-[17px] leading-7 text-[#2f2f2f]">{insight.content}</p>
                </div>
              </div>

              {index === 1 ? (
                <div className="rounded-[4px] bg-[#f7f7f7] p-4">
                  <div className="rounded-[4px] bg-white p-4">
                    {/* All keywords row */}
                    <div className="mb-5">
                      <p className="mb-2 text-xs font-bold uppercase tracking-[0.08em] text-[#6d6670]">
                        Who am I?
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {orderedKeywords.map(({ kw, color: c }) => (
                          <span
                            key={kw}
                            className={`rounded-[4px] border px-2 py-0.5 text-[13px] font-bold ${c.border} ${c.bg} ${c.text}`}
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 3 profiles */}
                    <div className="grid grid-cols-3 gap-4">
                      {iuProfiles.map((profile) => (
                        <div key={profile.persona} className="flex flex-col items-center">
                          <div className="mb-2 flex flex-wrap justify-center gap-1">
                            {profile.keywords.map((kw) => (
                              <span
                                key={kw}
                                className={`rounded-[4px] border px-2 py-0.5 text-[11px] font-bold ${profile.color.border} ${profile.color.bg} ${profile.color.text}`}
                              >
                                {kw}
                              </span>
                            ))}
                          </div>
                          <div className="overflow-hidden rounded-[10px] border border-[#d8d8d8] bg-white p-1 shadow-[0_4px_10px_rgba(0,0,0,0.06)]">
                            <img
                              src={profile.src}
                              alt={profile.persona}
                              className="block w-[120px] rounded-[8px]"
                              draggable={false}
                            />
                          </div>
                          <p className={`mt-2 text-center text-xs font-bold tracking-[0.06em] ${profile.color.labelText}`}>
                            {profile.persona}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-[4px] bg-white p-4">
                    <h4 className="text-base font-bold text-[#2f2f2f]">
                      Authentic Expression: Beyond the Surface
                    </h4>

                    <p className="mt-3 text-sm font-bold text-[#2f2f2f]">
                      Breaking the Mold of Uniformity
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#2f2f2f]">
                      Current dating apps often reduce individuals to a series of standardized,
                      appearance-driven profiles. This one-dimensional approach overlooks the
                      complexity of human attraction. In reality, we don&apos;t just fall for a
                      face; we fall for a person&apos;s unique character, their niche tastes, and
                      the distinct &quot;vibe&quot; they radiate.
                    </p>

                    <p className="mt-4 text-sm font-bold text-[#2f2f2f]">
                      Showcasing the Multi-Faceted Self
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#2f2f2f]">
                      We believe that self-expression should be as diverse as the people using the
                      app. Our platform provides the tools to move beyond the photo wall and lead
                      with authenticity.
                    </p>

                    <ul className="mt-4 space-y-2">
                      <li className="flex gap-2.5 text-sm leading-6 text-[#2f2f2f]">
                        <span className="mt-[8px] h-2 w-2 shrink-0 rounded-full bg-[#ff7ea7]" />
                        <span>
                          <strong>Expanded Vocabulary for Identity:</strong> We suggest a richer
                          toolkit for users to articulate the nuances that define them. While
                          illustrated via keyword tags, the core mechanism allows users to go beyond
                          simple text, capturing their aesthetic, personal values, and unique
                          atmosphere to build a more holistic profile.
                        </span>
                      </li>
                      <li className="flex gap-2.5 text-sm leading-6 text-[#2f2f2f]">
                        <span className="mt-[8px] h-2 w-2 shrink-0 rounded-full bg-[#ff7ea7]" />
                        <span>
                          <strong>Curated Personas:</strong> As illustrated in our &quot;Persona&quot; UI,
                          users can curate different facets of their identity. Whether you are a
                          &quot;Film Enthusiast&quot; or a &quot;Street Fashion&quot; fan, you can tailor your
                          profile to reflect the version of yourself you want to share.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : null}

              {index === 0 ? (
                <div className="rounded-[4px] bg-[#f7f7f7] p-4">
                  <div className="rounded-[4px] bg-white p-4">
                    <div className="flex items-center justify-center gap-5">
                      <div>
                        <div className="flex items-end justify-center gap-3">
                          <div className="inline-flex w-fit rounded-[12px] border border-[#d8d8d8] bg-white p-1.5 shadow-[0_4px_10px_rgba(0,0,0,0.06)]">
                            <img
                              src={amandaImageSrc}
                              alt="Amanda app interface"
                              className="block w-[154px] rounded-[10px] bg-white"
                              draggable={false}
                            />
                          </div>
                          <div className="inline-flex w-fit rounded-[12px] border border-[#d8d8d8] bg-white p-1.5 shadow-[0_4px_10px_rgba(0,0,0,0.06)]">
                            <img
                              src={tinderMatchImageSrc}
                              alt="Tinder match interface"
                              className="block w-[154px] rounded-[10px] bg-white"
                              draggable={false}
                            />
                          </div>
                        </div>
                        <p className="mt-3 text-center text-xs font-bold tracking-[0.06em] text-[#4b4550]">
                          Attractiveness Score, Likes, Ranking
                        </p>
                      </div>

                      <div className="flex items-center justify-center text-[44px] font-black leading-none text-[#ff7ea7]">
                        &#10140;
                      </div>

                      <div>
                        <div className="inline-flex w-fit rounded-[12px] border border-[#d8d8d8] bg-white p-1.5 shadow-[0_4px_10px_rgba(0,0,0,0.06)]">
                          <img
                            src={attractivenessDataImageSrc}
                            alt="Attractiveness data interface"
                            className="block w-[202px] rounded-[10px] bg-white"
                            draggable={false}
                          />
                        </div>
                        <p className="mt-3 text-center text-xs font-bold tracking-[0.06em] text-[#4b4550]">
                          Self Understanding, Patterns
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 rounded-[4px] bg-[#f7f7f7] p-4">
                      <h4 className="text-base font-bold text-[#2f2f2f]">
                        Shifting focus from external validation to self-understanding
                      </h4>
                      <p className="mt-3 text-sm leading-6 text-[#2f2f2f]">
                        Modern dating apps have become platforms for superficial validation.
                        Instead of seeking connections, users often obsess over tracking their
                        &quot;popularity&quot; through likes and messages. In Korea, many apps even
                        rank users by percentile, gatekeeping entry based on attractiveness
                        scores. This constant evaluation leads to self-deprecation, burnout, and
                        eventual platform fatigue.
                      </p>
                      <p className="mt-4 text-sm font-bold text-[#2f2f2f]">
                        The Pivot: Focus on the Self
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#2f2f2f]">
                        Our proposal shifts the focus from &quot;How others judge me&quot; to
                        &quot;How I can grow.&quot; We use matching data not to rank, but to
                        empower.
                      </p>
                      <ul className="mt-4 space-y-2">
                        <li className="flex gap-2.5 text-sm leading-6 text-[#2f2f2f]">
                          <span className="mt-[8px] h-2 w-2 shrink-0 rounded-full bg-[#ff7ea7]" />
                          <span>
                            <strong>Insight-Based Analysis:</strong> A Radar Chart visualizes your
                            unique strengths—like conversational wit or lifestyle depth—instead of a
                            single numerical rank.
                          </span>
                        </li>
                        <li className="flex gap-2.5 text-sm leading-6 text-[#2f2f2f]">
                          <span className="mt-[8px] h-2 w-2 shrink-0 rounded-full bg-[#ff7ea7]" />
                          <span>
                            <strong>Constructive Feedback:</strong> We provide actionable tips to
                            bridge the gap between your profile and your authentic self.
                          </span>
                        </li>
                        <li className="flex gap-2.5 text-sm leading-6 text-[#2f2f2f]">
                          <span className="mt-[8px] h-2 w-2 shrink-0 rounded-full bg-[#ff7ea7]" />
                          <span>
                            <strong>Confidence Building:</strong> By highlighting what makes you
                            special, we help you navigate the dating landscape with self-assurance
                            rather than anxiety.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : null}

              {index === 2 ? (
                <div className="rounded-[4px] bg-[#f7f7f7] p-4">
                  <div className="rounded-[4px] bg-white p-4">
                    <div className="flex items-start gap-6">
                      {/* Left: 차은우 profile */}
                      <div className="flex flex-col items-center">
                        <div className="mb-2 flex flex-wrap justify-center gap-1">
                          {chaEunwooKeywords.map((kw) => (
                            <span
                              key={kw}
                              className="rounded-[4px] border border-[#d8d8d8] bg-[#f7f7f7] px-2 py-0.5 text-[11px] font-bold text-[#4b4550]"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                        <div className="overflow-hidden rounded-[10px] border border-[#d8d8d8] bg-white p-1 shadow-[0_4px_10px_rgba(0,0,0,0.06)]">
                          <img
                            src={chaEunwooSrc}
                            alt="Cha Eunwoo profile"
                            className="block w-[120px] rounded-[8px]"
                            draggable={false}
                          />
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="flex flex-1 items-center justify-center self-center text-[36px] font-black leading-none text-[#ff7ea7]">
                        &#8596;
                      </div>

                      {/* Right: 3 IU profiles */}
                      <div className="flex gap-3">
                        {iuProfiles.map((profile) => {
                          const isMatch = profile.persona === "Persona 2";
                          return (
                            <div key={profile.persona} className="flex flex-col items-center">
                              <div className="mb-2 flex flex-wrap justify-center gap-1">
                                {profile.keywords.map((kw) => (
                                  <span
                                    key={kw}
                                    className={`rounded-[4px] border px-2 py-0.5 text-[11px] font-bold ${profile.color.border} ${profile.color.bg} ${profile.color.text}`}
                                  >
                                    {kw}
                                  </span>
                                ))}
                              </div>
                              <div
                                className={`overflow-hidden rounded-[10px] bg-white p-1 shadow-[0_4px_10px_rgba(0,0,0,0.06)] ${
                                  isMatch
                                    ? "border-2 border-[#6a5acd] shadow-[0_0_0_3px_rgba(106,90,205,0.15)]"
                                    : "border border-[#d8d8d8]"
                                }`}
                              >
                                <img
                                  src={profile.src}
                                  alt={profile.persona}
                                  className="block w-[120px] rounded-[8px]"
                                  draggable={false}
                                />
                              </div>
                              <p className={`mt-2 text-center text-xs font-bold tracking-[0.06em] ${profile.color.labelText}`}>
                                {profile.persona}
                              </p>
                              {isMatch ? (
                                <p className="mt-1 text-center text-[10px] font-bold text-[#6a5acd]">
                                  Shares overlapping interests
                                </p>
                              ) : null}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-[4px] bg-white p-4">
                    <h4 className="text-base font-bold text-[#2f2f2f]">
                      Dynamic Adaptation: Bringing Real-World Nuance to Digital Dating
                    </h4>
                    <p className="mt-3 text-sm leading-6 text-[#2f2f2f]">
                      In real life, dating is a fluid and adaptive process. We naturally highlight
                      different facets of our personality to connect with a specific person—whether
                      it&apos;s dressing a certain way, discussing shared hobbies, or mirroring
                      their communication pace. However, digital dating profiles are currently
                      &quot;one-size-fits-all,&quot; showing the same static image to everyone
                      regardless of compatibility.
                    </p>

                    <p className="mt-4 text-sm font-bold text-[#2f2f2f]">
                      A Personalized Matching Journey
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#2f2f2f]">
                      We propose a system where the profile and matching mechanism evolve to create
                      the most authentic connection possible between two unique individuals.
                    </p>

                    <ul className="mt-4 space-y-2">
                      <li className="flex gap-2.5 text-sm leading-6 text-[#2f2f2f]">
                        <span className="mt-[8px] h-2 w-2 shrink-0 rounded-full bg-[#ff7ea7]" />
                        <span>
                          <strong>Contextual Profile Optimization:</strong> Instead of a fixed
                          layout, the profile dynamically highlights the most relevant traits. For
                          example, if a potential match loves fitness, your &quot;athletic&quot; side is
                          prioritized; if they value intellectual depth, your shared interests in
                          books or philosophy take center stage.
                        </span>
                      </li>
                      <li className="flex gap-2.5 text-sm leading-6 text-[#2f2f2f]">
                        <span className="mt-[8px] h-2 w-2 shrink-0 rounded-full bg-[#ff7ea7]" />
                        <span>
                          <strong>Relational Pacing:</strong> For users who prefer a more cautious
                          approach, the profile can &quot;unfold&quot; gradually. As trust is built through
                          conversation, more details and photos are revealed, mimicking the natural
                          process of getting to know someone in person.
                        </span>
                      </li>
                      <li className="flex gap-2.5 text-sm leading-6 text-[#2f2f2f]">
                        <span className="mt-[8px] h-2 w-2 shrink-0 rounded-full bg-[#ff7ea7]" />
                        <span>
                          <strong>Intentional Interaction (Beyond the &quot;Like&quot;):</strong> To show
                          genuine interest, we move beyond the low-effort &quot;Like.&quot; Users can signal
                          their intent through diverse, personalized actions—such as
                          &quot;knocking&quot; on a profile, solving a private quiz together, or sending a
                          customized icebreaker that reflects their shared &quot;vibe.&quot;
                        </span>
                      </li>
                    </ul>

                    <div className="mt-5 rounded-[4px] bg-[#f7f7f7] p-4">
                      <p className="text-sm font-bold text-[#2f2f2f]">
                        Conclusion: Optimized for Us, Not for Everyone
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#2f2f2f]">
                        By allowing profiles to adapt and interactions to require more
                        &quot;intent,&quot; we shift the focus from mass-matching to
                        quality-matching. This ensures that the digital first impression is as
                        dynamic and intentional as a real-life encounter.
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* Research Process Section */}
      <div className="mt-8 border-t border-[#e8e4e8] pt-6">
        <h3 className="text-base font-bold uppercase tracking-[0.1em] text-[#6d6670]">
          How did we conduct this research?
        </h3>

        {/* Process flow — centered */}
        <div className="mt-4 flex justify-center">
          <div className="flex items-start gap-1">
            {[
              { step: "01", label: "IDI Sessions", sub: "22 people, 90m, Zoom" },
              { step: "02", label: "Understand User Challenges", sub: null },
              { step: "03", label: "User Participatory Design Workshops", sub: "3 People 5 Groups, 90m, Face to Face" },
              { step: "04", label: "Key Insights", sub: null },
            ].map(({ step, label, sub }, i, arr) => (
              <div key={step} className="flex shrink-0 items-center gap-1">
                <div className="flex flex-col items-center rounded-[6px] bg-[#f7f7f7] px-4 py-3 shadow-[0_2px_6px_rgba(0,0,0,0.06)]">
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#ff7ea7]">
                    {step}
                  </span>
                  <span className="mt-0.5 text-center text-xs font-bold text-[#2f2f2f]">
                    {label}
                  </span>
                  {sub ? (
                    <span className="mt-1 text-center text-[10px] text-[#9a9099]">{sub}</span>
                  ) : null}
                </div>
                {i < arr.length - 1 ? (
                  <span className="mt-[-8px] text-base font-bold text-[#d8d0d7]">→</span>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* Research images — 0.8x width, centered, vertical stack */}
        <div className="mt-5 flex flex-col items-center gap-4">
          {[
            { src: "/works/debugging-dating-algorithms/challenge%20cards.png", alt: "Challenge cards", label: "Challenge Cards" },
            { src: "/works/debugging-dating-algorithms/participatory%20design%20workshop.png", alt: "Participatory design workshop", label: "Participatory Design Workshop" },
            { src: "/works/debugging-dating-algorithms/Design%20Workshop%20example.png", alt: "Design workshop example", label: "How we Conducted the Workshop" },
          ].map(({ src, alt, label }) => (
            <div key={label} className="w-[80%] overflow-hidden rounded-[8px] border border-[#e8e4e8] bg-white shadow-[0_4px_10px_rgba(0,0,0,0.06)]">
              <img src={src} alt={alt} className="w-full object-cover" draggable={false} />
              <p className="px-3 py-2 text-xs font-bold text-[#6d6670]">{label}</p>
            </div>
          ))}

          {/* Design workshop explanation */}
          <div className="w-[80%] rounded-[8px] bg-[#f7f7f7] p-4">
            <h4 className="text-sm font-bold text-[#2f2f2f]">
              Methodology: Metaphoric Design Workshop
            </h4>

            <p className="mt-2 text-sm font-bold text-[#4b4550]">
              Lowering the Barrier to Sensitive Topics
            </p>
            <p className="mt-1 text-sm leading-6 text-[#2f2f2f]">
              Online dating is a personal and sometimes sensitive subject for group discussions. To
              help general users—who were unfamiliar with design thinking—ideate comfortably, we
              used the &quot;Metaphoric Design Method.&quot;
            </p>

            <p className="mt-3 text-sm font-bold text-[#4b4550]">
              Creative Ideation via Metaphor Cards
            </p>
            <p className="mt-1 text-sm leading-6 text-[#2f2f2f]">
              Participants received random emoji cards and used them as creative catalysts to
              reimagine dating algorithms. This allowed them to translate abstract feelings into
              tangible concepts.
            </p>

            <p className="mt-3 text-sm font-bold text-[#4b4550]">
              Example: The &quot;Subway&quot; Metaphor
            </p>
            <p className="mt-1 text-sm leading-6 text-[#2f2f2f]">
              One participant used a Subway card to propose &quot;interaction speeds.&quot; They suggested
              that just as subways have &quot;Express&quot; and &quot;Transfer&quot; lines, the app should offer
              different ways to express interest depending on whether a user wants to move quickly
              or take their time to build a connection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
