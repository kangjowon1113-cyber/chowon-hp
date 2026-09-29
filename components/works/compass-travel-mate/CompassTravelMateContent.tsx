const asset = (name: string) => `/works/compass-travel-mate/${name}.jpg`;

const prototypes = [
  {
    image: "prototype-tokens",
    alt: "Paper compass surrounded by illustrated cardboard tokens and fabric swatches",
    title: "Expressing a feeling",
    description: "Symbols and textures explored different ways to express emotions before setting out.",
  },
  {
    image: "prototype-sliders",
    alt: "Handheld cardboard compass with sliders for energy, activities and walking time",
    title: "Making it tangible",
    description: "A cardboard model explored physical sliders for energy, activities and walking time.",
  },
  {
    image: "prototype-symbols",
    alt: "Round paper prototype with illustrated symbols around its face",
    title: "Exploring the dial",
    description: "A paper dial explored using visual symbols to communicate different experiences.",
  },
];

const sectionClass = "mt-8 border-t border-[#e8e4e8] pt-6";
const headingClass = "mb-4 text-base font-bold uppercase tracking-[0.1em] text-[#6d6670]";
const stepLabelClass = "win98-outset flex items-center justify-center bg-[#c7c7cc] px-3 py-2 text-center text-xs font-bold tracking-[0.08em] text-[#424242] sm:min-h-[48px]";

export function CompassTravelMateContent() {
  return (
    <article aria-label="Compass travel mate project" className="retro-scrollbar h-full w-full overflow-y-auto bg-white p-3 font-system98 text-[#1b1b1b] sm:p-5">
      <h2 className="text-base font-bold text-[#2f2f2f] sm:text-xl">
        Compass as Your One and Only Travel Mate
      </h2>
      <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.06em] text-[#6a5acd]">
        #UX Research #Interaction Design #Physical Prototyping
      </p>
      <p className="mt-4 text-sm">
        TU Delft · 2023 · Individual project · 6 months
      </p>

      <section aria-label="Project concept" className="mt-6">
        <div className="rounded-[4px] bg-[#f7f7f7] p-4">
          <p className="text-sm font-bold leading-6 text-[#2f2f2f] sm:text-[17px] sm:leading-7">
            Turning curiosity about a new place into memories that make it feel familiar.
          </p>
          <p className="mt-2 text-sm leading-6 text-[#4b4550]">
            A handheld companion designed to spark the curiosity to explore. Start with your mood
            and energy, follow the compass toward an unknown destination, and notice small surprises
            along the way. A keepsake ticket connects the place with how you felt there, inviting
            you to build an emotional connection with your surroundings through personal memories.
          </p>
          <ol aria-label="Experience overview" className="mt-4 grid grid-cols-3 divide-x divide-[#d6d3d8] border-y border-[#d6d3d8] py-3 text-center text-[11px] font-bold text-[#424242] sm:text-xs">
            <li className="px-1 sm:px-3"><span className="mr-1 text-[#6a5acd]">01</span> Feel <span aria-hidden="true">→</span></li>
            <li className="px-1 sm:px-3"><span className="mr-1 text-[#6a5acd]">02</span> Explore <span aria-hidden="true">→</span></li>
            <li className="px-1 sm:px-3"><span className="mr-1 text-[#6a5acd]">03</span> Remember</li>
          </ol>
          <figure className="mx-auto mt-4 w-full overflow-hidden rounded-[8px] border border-[#e8e4e8] bg-white sm:w-[70%]">
            <img
              src={asset("compass")}
              alt="White compass prototype with an orange needle, resting beside a cup on a wooden table"
              width={2000}
              height={1125}
              className="block h-auto w-full"
              fetchPriority="high"
            />
            <figcaption className="px-3 py-2 text-xs font-bold text-[#6d6670]">Physical compass prototype</figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="compass-experience" className={sectionClass}>
        <h3 id="compass-experience" className={headingClass}>How Does It Work?</h3>
        <div className="space-y-4">
          <div className="rounded-[4px] bg-[#f7f7f7] p-4">
            <div className="flex flex-col gap-3 sm:grid sm:grid-cols-[132px_1fr] sm:items-start">
              <div className={stepLabelClass}>01 · Set Your Mood</div>
              <div>
                <h4 className="text-sm font-bold text-[#2f2f2f]">How do you feel today?</h4>
                <p className="mt-2 text-sm leading-6 text-[#4b4550]">
                  Adjust two sliders: your current mood and your energy to explore. The intended
                  journey begins with how you feel, giving you a simple way to express what you need from a walk.
                </p>
              </div>
            </div>
            <div className="mx-auto mt-4 grid max-w-[760px] grid-cols-2 gap-3">
              {[
                { image: "mood-slider", label: "Current mood", alt: "Mood slider on the side of the handheld compass prototype" },
                { image: "energy-slider", label: "Energy to feel", alt: "Energy slider on the side of the handheld compass prototype" },
              ].map(({ image, label, alt }) => (
                <figure key={image} className="min-w-0 overflow-hidden rounded-[8px] border border-[#e8e4e8] bg-white">
                  <img src={asset(image)} alt={alt} width={1600} height={1200} loading="lazy" className="block aspect-[4/3] w-full object-cover" />
                  <figcaption className="px-3 py-2 text-xs font-bold text-[#6d6670]">{label}</figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="rounded-[4px] bg-[#f7f7f7] p-4">
            <div className="flex flex-col gap-3 sm:grid sm:grid-cols-[132px_1fr] sm:items-start">
              <div className={stepLabelClass}>02 · Explore</div>
              <div>
                <h4 className="text-sm font-bold text-[#2f2f2f]">Where will it take you?</h4>
                <p className="mt-2 text-sm leading-6 text-[#4b4550]">
                  Where might this direction lead? Leaving the destination unknown is intended to
                  spark curiosity and make setting out feel inviting. Streets, shops and small
                  surprises become moments to notice and connect with along the way.
                </p>
              </div>
            </div>
            <figure className="mx-auto mt-4 w-full overflow-hidden rounded-[8px] border border-[#e8e4e8] bg-white sm:w-[80%]">
              <img src={asset("neighborhood-walk")} alt="Walking through a neighborhood with the compass in hand" width={1600} height={895} loading="lazy" className="block h-auto w-full" />
              <figcaption className="px-3 py-2 text-xs font-bold text-[#6d6670]">Taking the compass into the neighborhood</figcaption>
            </figure>
          </div>

          <div className="rounded-[4px] bg-[#f7f7f7] p-4">
            <div className="flex flex-col gap-3 sm:grid sm:grid-cols-[132px_1fr] sm:items-start">
              <div className={stepLabelClass}>03 · Keep a Memory</div>
              <div>
                <h4 className="text-sm font-bold text-[#2f2f2f]">Take a little of the place home.</h4>
                <p className="mt-2 text-sm leading-6 text-[#4b4550]">
                  A ticket with the date and place becomes a small keepsake of the visit. It offers
                  a way to recall what you discovered and how you felt, giving a new place a personal
                  story to return to.
                </p>
              </div>
            </div>
            <figure className="mx-auto mt-4 w-full overflow-hidden rounded-[8px] border border-[#e8e4e8] bg-white sm:w-[80%]">
              <img src={asset("destination-ticket")} alt="Nexum ticket prepared for Chowon Kang's exhibition at TU Delft, dated 26 January 2023" width={1600} height={900} loading="lazy" className="block h-auto w-full" />
              <figcaption className="px-3 py-2 text-xs font-bold text-[#6d6670]">Ticket sample from the TU Delft exhibition · January 2023</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section aria-labelledby="compass-intention" className={sectionClass}>
        <h3 id="compass-intention" className={headingClass}>Design Intention</h3>
        <div className="rounded-[8px] bg-[#f7f7f7] p-4">
          <h4 className="text-sm font-bold text-[#2f2f2f]">The feeling of finding a favorite record in an unfamiliar shop.</h4>
          <p className="mt-3 text-sm leading-6 text-[#4b4550]">
            A familiar song can bring back a feeling or memory, even somewhere you have never been.
            That mix of recognition, surprise and curiosity shaped the interaction. The aim was to
            invite exploration and help people build that same emotional connection with a neighborhood,
            one personal discovery at a time.
          </p>
        </div>
      </section>

      <section aria-labelledby="compass-process" className={sectionClass}>
        <h3 id="compass-process" className={headingClass}>Research &amp; Prototyping</h3>
        <p className="text-sm leading-6 text-[#4b4550]">
          I explored how people connect with places through a survey of 14 participants, interviews,
          collages and emotional journey maps. Role-playing and physical prototypes helped explore
          how a companion for solo outings could feel and behave.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {prototypes.map((prototype, index) => (
            <figure key={prototype.image} className="min-w-0 overflow-hidden rounded-[8px] border border-[#e8e4e8] bg-[#f7f7f7]">
              <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-white">
                <img src={asset(prototype.image)} alt={prototype.alt} loading="lazy" className="h-full w-full object-contain" />
              </div>
              <figcaption className="p-3">
                <h4 className="text-sm font-bold text-[#2f2f2f]">Prototype {index + 1}: {prototype.title}</h4>
                <p className="mt-2 text-xs leading-5 text-[#4b4550]">{prototype.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section aria-labelledby="compass-exhibition" className={sectionClass}>
        <h3 id="compass-exhibition" className={headingClass}>Exhibition at TU Delft</h3>
        <p className="text-sm leading-6 text-[#4b4550]">
          The physical prototype brings the compass and two sliders into one handheld object.
          It was presented alongside a scenario video and sample tickets at TU Delft in 2023.
        </p>
        <figure className="mx-auto mt-4 w-full max-w-[440px] overflow-hidden rounded-[8px] border border-[#e8e4e8] bg-white">
          <img src={asset("exhibition")} alt="The physical compass, sample tickets and a demonstration video displayed at the TU Delft exhibition" width={1200} height={1600} loading="lazy" className="block h-auto w-full" />
          <figcaption className="px-3 py-2 text-xs font-bold text-[#6d6670]">Exhibited as Nexum · A connection for you and your environment</figcaption>
        </figure>
      </section>
    </article>
  );
}
