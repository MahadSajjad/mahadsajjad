import type { ReactNode } from "react";

type SkillGroup = {
  title: string;
  items: string[];
};

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Frontend",
    items: [
      "JavaScript",
      "React 19",
      "Vite",
      "Tailwind v4",
      "Ant Design v6",
      "Bootstrap",
      "Framer Motion",
      "shadcn",
    ],
  },
  {
    title: "Backend",
    items: ["Express 5", "MongoDB / Mongoose", "Zod", "JWT Auth"],
  },
  {
    title: "Services & Tools",
    items: [
      "Supabase",
      "Firebase",
      "Cloudinary",
      "TipTap",
      "DnD Kit",
      "DOMPurify",
    ],
  },
  {
    title: "Deployment",
    items: ["Vercel", "Netlify", "Render"],
  },
  {
    title: "Engineering strengths",
    items: [
      "Schema design & refactoring",
      "Optimistic UI mutations",
      "URL-driven state",
      "Payment / discount / tax logic",
      "Recurring-data modeling",
      "Rich-text with sanitization",
      "Drag-to-reorder",
      "Bulk ops with per-item failure handling",
      "Code review",
      "SEO / GEO optimization",
      "Barcode architecture (EAN-13)",
    ],
  },
];

export function Skills(): ReactNode {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
        What I do
      </h3>
      <div className="flex flex-col gap-5 rounded-4xl border border-foreground/5 bg-foreground/2 p-4 sm:p-5 dark:bg-foreground/5">
        {SKILL_GROUPS.map((group) => (
          <div key={group.title} className="flex flex-col gap-2.5">
            <h4 className="text-[12px] font-medium uppercase tracking-wider text-foreground/45">
              {group.title}
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-foreground/8 bg-background px-3.5 py-1.5 text-[13px] tracking-tight text-foreground/85 sm:text-[14px]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
