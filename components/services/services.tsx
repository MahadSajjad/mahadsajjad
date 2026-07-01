import { Boxes, LayoutDashboard, ScanBarcode, Server, Sparkles, Gauge, } from "lucide-react";
import type { ComponentType, ReactNode } from "react";

import { TechLoop } from "@/components/services/tech-loop";
import { FadeIn } from "@/components/ui/motion-primitives";

type Service = {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
};

const SERVICES: Service[] = [
  {
    title: "Full-Stack Web Apps",
    description:
      "End-to-end products built from database to deployment, covering architecture, APIs, edge cases, and a frontend that holds up under real use.",
    icon: Boxes,
  },
  {
    title: "SaaS Platforms",
    description:
      "Multi-user products with auth, roles, billing logic, and the recurring-data modeling that keeps a subscription business running.",
    icon: Sparkles,
  },
  {
    title: "POS Systems",
    description:
      "Point-of-sale tools with payment, discount, and tax logic, barcode architecture (EAN-13), and bulk operations.",
    icon: ScanBarcode,
  },
  {
    title: "Admin Dashboards",
    description:
      "Data-dense dashboards with URL-driven state, optimistic UI mutations, drag-to-reorder, and rich-text editing with sanitization.",
    icon: LayoutDashboard,
  },
  {
    title: "APIs & Backend",
    description:
      "Express + MongoDB backends with schema design, Zod validation, JWT auth, and refactors that make the data layer easier to reason about.",
    icon: Server,
  },
  {
    title: "Performance & SEO",
    description:
      "Fast, discoverable sites, built with SEO/GEO optimization, sensible loading, and the polish that makes a product feel considered.",
    icon: Gauge,
  },
];

export function Services(): ReactNode {
  return (
    <section
      id="services"
      className="mx-auto w-full max-w-275 px-6 sm:px-10"
      aria-labelledby="services-heading"
    >
      <FadeIn className="flex flex-col items-center gap-4 text-center">
        <h2
          id="services-heading"
          className="font-serif text-[2.25rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-[2.75rem]"
        >
          What I Do
        </h2>
        <p className="max-w-[42ch] text-[18px] leading-[1.4] tracking-tight text-foreground/65 sm:text-[20px]">
          I take products from an idea to something real people use, owning
          every decision along the way.
        </p>
      </FadeIn>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, index) => (
          <FadeIn key={service.title} delay={0.05 * index}>
            <ServiceCard service={service} />
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.1} className="mt-14">
        <p className="mb-6 text-center text-[12px] font-medium uppercase tracking-wider text-foreground/40">
          Tools I build with
        </p>
        <TechLoop />
      </FadeIn>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }): ReactNode {
  const { icon: Icon } = service;
  return (
    <div className="flex h-full flex-col gap-4 rounded-4xl border border-foreground/5 bg-foreground/2 p-6 transition-colors hover:bg-foreground/4 sm:p-7 dark:bg-foreground/5 dark:hover:bg-foreground/8">
      <span
        aria-hidden="true"
        className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-foreground/8 bg-background text-foreground/80"
      >
        <Icon className="h-5 w-5" strokeWidth={2} />
      </span>
      <div className="flex flex-col gap-2">
        <h3 className="text-[18px] font-semibold tracking-tight text-foreground sm:text-[19px]">
          {service.title}
        </h3>
        <p className="text-[14px] leading-[1.55] tracking-tight text-foreground/60 sm:text-[15px]">
          {service.description}
        </p>
      </div>
    </div>
  );
}