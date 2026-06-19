import type { ReactNode } from "react";

type Entry = {
  company: string;
  role: string;
  period: string;
  description?: string;
  slug?: string;
  brand?: string;
};

const ENTRIES: Entry[] = [
  {
    company: "Codev Inc",
    role: "MERN Stack Developer",
    period: "3 months",
    description:
      "A MERN stack training where I handled several light projects while learning new things.",
    brand: "#2F74C0",
  },
  {
    company: "MBM Services",
    role: "Project-Based Developer",
    period: "3 months",
    description:
      "Bridged coding theory with hands-on practice in a real work setting, and learned which design patterns get used most often.",
    brand: "#0AA06E",
  },
];

const TOTAL = "6 months";

export function Experience(): ReactNode {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <h3 className="text-foreground text-[15px] font-semibold tracking-tight">
          Experience
        </h3>
        <span className="text-foreground/45 text-[13px] tracking-tight">
          {TOTAL}
        </span>
      </div>
      <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 rounded-4xl border p-2 sm:p-4">
        <ul className="flex flex-col gap-2">
          {ENTRIES.map((entry) => (
            <li
              key={`${entry.company}-${entry.period}`}
              className="bg-background border-foreground/5 flex items-start gap-4 rounded-3xl border p-3"
            >
              <CompanyLogo entry={entry} />
              <div className="flex min-w-0 flex-col">
                <span className="text-foreground text-[17px] font-semibold tracking-tight sm:text-[18px]">
                  {entry.company}
                </span>
                <span className="text-foreground/65 mt-0.5 text-[14px] tracking-tight sm:text-[15px]">
                  {entry.role}
                  <span className="text-foreground/30 mx-2">•</span>
                  <span className="text-foreground/55">{entry.period}</span>
                </span>
                {entry.description ? (
                  <p className="text-foreground/60 mt-2 max-w-[48ch] text-[14px] leading-[1.55] tracking-tight">
                    {entry.description}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CompanyLogo({ entry }: { entry: Entry }): ReactNode {
  const initials = entry.company.charAt(0);
  return (
    <span
      className="ring-foreground/8 mt-0.5 inline-flex h-12 w-12 shrink-0 items-center justify-center bg-white ring-1 dark:ring-white/10"
      aria-hidden="true"
      style={{
        borderRadius: 14,
        ...(entry.slug ? {} : { backgroundColor: entry.brand }),
      }}
    >
      {entry.slug ? (
        <img
          src={`https://cdn.simpleicons.org/${entry.slug}`}
          alt=""
          width={24}
          height={24}
          className="h-6 w-6"
          draggable={false}
        />
      ) : (
        <span className="text-[18px] font-semibold tracking-tight text-white">
          {initials}
        </span>
      )}
    </span>
  );
}
