"use client";

type ProjectItem = {
  id: string;
  title: string;
  type: string;
  status: string;
  summary: string;
};

export const WORK_PROJECTS: ProjectItem[] = [
  {
    id: "p1",
    title: "Debugging Dating Algorithms: How can we find true love?",
    type: "HCI RESEARCH",
    status: "PUBLISHED(1st Author)",
    summary: "The reliability of online dating algorithms has sparked considerable debate...",
  },
  {
    id: "p2",
    title: "AI Moderators: Blurring the Boundaries of Qualitative and Quantitative Research",
    type: "Current Business",
    status: "In Progress",
    summary: "AI moderators are the new interviewers for the future...",
  },
  {
    id: "p3",
    title: "Korean Emoticons: Understanding How Subtle Emotional Differences Are Evoked Online",
    type: "HCI RESEARCH",
    status: "PUBLISHED(1st Author)",
    summary: "Online conversations through text have limitations in expressing emotions that...",
  },
  {
    id: "p4",
    title: "Compass as Your One and Only Travel Mate",
    type: "School Research Project",
    status: "WORK EXPERIENCE",
    summary:
      "A personal exploration and insights based on my experience working with AI moderation systems.",
  },
];

const unifiedTagColor = "#FF1493";
const unifiedTagTextColor = "#98FF98";

type MyWorksProps = {
  onOpenProject: (projectId: string) => void;
};

export function MyWorks({ onOpenProject }: MyWorksProps) {
  return (
    <section className="flex h-full min-h-0 flex-col bg-white font-system98 text-[#1b1b1b]">
      <div className="win98-inset mb-2 bg-white px-2 py-1 text-[11px] font-bold text-[#4a4a7a]">
        Home &gt; My Works &gt; UX_Research
      </div>

      <div className="retro-scrollbar min-h-0 flex-1 overflow-y-auto bg-white p-1">
        {WORK_PROJECTS.map((project) => (
          <button
            key={project.id}
            type="button"
            onDoubleClick={() => onOpenProject(project.id)}
            className="win98-outset mb-2 block w-full border border-[#777] bg-white p-2 text-left last:mb-0 active:translate-x-px active:translate-y-px"
            style={{ borderColor: "#c6c6c6 #777 #777 #c6c6c6" }}
          >
            <div className="flex items-start gap-2">
              <span className="mt-0.5 text-lg leading-none" aria-hidden="true">
                💾
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#6a5acd]">
                  {project.type}
                </p>
                <h3 className="mt-1 text-[17px] font-bold leading-5 text-[#2f2f2f]">{project.title}</h3>
                <p className="mt-1 text-[12px] leading-4 text-[#303030]">{project.summary}</p>
                <span
                  className="mt-2 inline-block px-2 py-[2px] text-[11px] font-bold uppercase tracking-[0.06em]"
                  style={{
                    backgroundColor: unifiedTagColor,
                    color: unifiedTagTextColor,
                    borderTop: "2px solid white",
                    borderLeft: "2px solid white",
                    borderRight: "2px solid #555",
                    borderBottom: "2px solid #555",
                  }}
                >
                  {project.status}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

