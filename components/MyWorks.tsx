"use client";

import { ResearchListCard } from "@/components/ResearchListCard";

type ProjectItem = {
  id: string;
  title: string;
  type: string;
  status: string;
  summary: string;
};

export const WORK_PROJECTS: ProjectItem[] = [
  {
    id: "p2",
    title: "AI moderators: Redefining Research through Large-Scale Qualitative AI Moderation",
    type: "Current Business",
    status: "In Progress",
    summary: "AI moderators are the new interviewers for the future...",
  },
  {
    id: "p1",
    title: "Debugging Dating Algorithms: How can we find true love?",
    type: "HCI RESEARCH",
    status: "PUBLISHED(1st Author)",
    summary: "The reliability of online dating algorithms has sparked considerable debate...",
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
    status: "DESIGN PROTOTYPE",
    summary:
      "A handheld compass that sparks curiosity about new places and helps turn discoveries into personal memories and emotional connections.",
  },
];

type MyWorksProps = {
  onOpenProject: (projectId: string) => void;
};

export function MyWorks({ onOpenProject }: MyWorksProps) {
  return (
    <section className="flex h-full min-h-0 flex-col bg-white font-system98 text-[#1b1b1b]">
      <div className="retro-scrollbar min-h-0 flex-1 overflow-y-auto bg-white p-1">
        {WORK_PROJECTS.map((project) => (
          <ResearchListCard
            key={project.id}
            onClick={() => onOpenProject(project.id)}
            eyebrow={project.type}
            title={project.title}
            description={project.summary}
            badge={project.status}
          />
        ))}
      </div>
    </section>
  );
}
