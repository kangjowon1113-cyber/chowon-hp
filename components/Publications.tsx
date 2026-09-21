import { Fragment } from "react";
import { ResearchListCard } from "@/components/ResearchListCard";

const publications = [
  {
    venue: "DIS 2025",
    title: "Driving with Algorithms Beyond Gig Work: Investigating How Algorithmic Management Affects Workers’ Practices in an On-Demand Ride-Pooling Service",
    authors: ["Yongjae Sohn", "Daehyun Kwak", "Sehee Son", "Chowon Kang", "Youn-kyung Lim"],
    citation: "ACM DIS 2025, pp. 2117–2129.",
    href: "https://dl.acm.org/doi/10.1145/3715336.3735697",
  },
  {
    venue: "CSCW 2024",
    title: "Beyond Swipes and Scores: Investigating Practices, Challenges and User-Centered Values in Online Dating Algorithms",
    authors: ["Chowon Kang", "Yoonseo Choi", "Yongjae Sohn", "Hyunseung Lim", "Hwajung Hong"],
    citation: "Proceedings of the ACM on Human-Computer Interaction, 8(CSCW2), Article 486, 2024. Full paper.",
    href: "https://dl.acm.org/doi/abs/10.1145/3687025",
  },
  {
    venue: "CSCW 2022",
    title: "Korean Emoticons: Understanding How Subtle Emotional Differences Are Evoked Online",
    authors: ["Chowon Kang", "Jong-Ok Hong", "Wooje Chang", "Hyeon-Jeong Suk", "Hwajung Hong"],
    citation: "CSCW 2022 Companion, pp. 121–125. Poster paper.",
    href: "https://dl.acm.org/doi/10.1145/3500868.3559463",
  },
];

export function Publications({ mobile = false }: { mobile?: boolean }) {
  return (
    <section className={`flex min-h-0 flex-col font-system98 text-[#1b1b1b] ${mobile ? "" : "h-full bg-white"}`}>
      <div className={`retro-scrollbar min-h-0 flex-1 overflow-y-auto ${mobile ? "" : "bg-white p-1"}`}>
        {publications.map((publication) => (
          <ResearchListCard
            key={publication.href}
            mobile={mobile}
            eyebrow={publication.venue}
            title={publication.title}
            description={publication.authors.map((author, index) => (
              <Fragment key={author}>
                {index > 0 && ", "}
                {author === "Chowon Kang" ? <strong className="font-bold">{author}</strong> : author}
              </Fragment>
            ))}
            metadata={publication.citation}
            badge="Read paper ↗"
            href={publication.href}
          />
        ))}
      </div>
    </section>
  );
}
