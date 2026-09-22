import type { ReactNode } from "react";

type ResearchListCardProps = {
  eyebrow: string;
  title: string;
  description: ReactNode;
  metadata?: ReactNode;
  badge: string;
  mobile?: boolean;
} & ({ href: string; onClick?: never } | { href?: never; onClick: () => void });

export function ResearchListCard({
  eyebrow,
  title,
  description,
  metadata,
  badge,
  mobile = false,
  href,
  onClick,
}: ResearchListCardProps) {
  const className = mobile
    ? "win98-outset mb-3 block w-full bg-white p-3 text-left font-system98 text-[#1b1b1b] no-underline last:mb-0"
    : "win98-outset mb-2 block w-full border border-[#777] bg-white px-2 py-3 text-left font-system98 text-[#1b1b1b] no-underline last:mb-0 active:translate-x-px active:translate-y-px";
  const style = mobile ? undefined : { borderColor: "#c6c6c6 #777 #777 #c6c6c6" };
  const content = (
    <div className={mobile ? undefined : "flex items-start gap-2"}>
      {!mobile && <span className="mt-0.5 text-lg leading-none" aria-hidden="true">💾</span>}
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#6a5acd]">{eyebrow}</p>
        <h3 className={mobile
          ? "mt-1 text-base font-bold leading-5 text-[#272727]"
          : "mt-1 text-[17px] font-bold leading-5 text-[#2f2f2f]"}>{title}</h3>
        <p className={mobile
          ? "mt-1 text-[14px] leading-5 text-[#464646]"
          : "mt-1 text-[14px] leading-5 text-[#303030]"}>{description}</p>
        {metadata && (
          <p className="mt-2 text-[14px] font-normal leading-5 text-[#464646]">{metadata}</p>
        )}
        <span
          className={mobile
            ? "mt-2 inline-block bg-[#ff1493] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#98ff98]"
            : "mt-2 inline-block px-2 py-[2px] text-[11px] font-bold uppercase tracking-[0.06em]"}
          style={mobile ? undefined : {
            backgroundColor: "#FF1493",
            color: "#98FF98",
            borderTop: "2px solid white",
            borderLeft: "2px solid white",
            borderRight: "2px solid #555",
            borderBottom: "2px solid #555",
          }}
        >{badge}</span>
      </div>
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={className} style={style}>
      {content}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={className} style={style}>
      {content}
    </button>
  );
}
