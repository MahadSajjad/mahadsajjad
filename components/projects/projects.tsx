import {
  ArrowRight,
  Building2,
  Globe,
  Moon,
  ScanBarcode,
  ShoppingBag,
  Salad,
  Sparkles,
  Truck,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/ui/motion-primitives";

import alFajr from "./images/al-fajr.png";
import aureolea from "./images/aureolea.png";
import fashionThread from "./images/fashionthread.png";
import getSetProperties from "./images/getsetproperties.png";
import metafessional from "./images/Metafessional.png";
import nutrista from "./images/nutrista.png";
import pos from "./images/pos.png";
import transiqi from "./images/transiqi.png";

type Project = {
  id: string;
  icon: ComponentType<{ className?: string }>;
  iconLabel: string;
  title: string;
  description: string;
  meta: string;
  image: StaticImageData;
  imageAlt: string;
  href?: string;
};

const PROJECTS: Project[] = [
  {
    id: "al-fajr",
    icon: Moon,
    iconLabel: "Al Fajr",
    title: "A marketing website built for a Saudi contracting company.",
    description:
      "Designed and built end-to-end with a contact system backed by Supabase, deployed on Vercel.",
    meta: "React · Tailwind · Supabase",
    image: alFajr,
    imageAlt: "Al Fajr project",
    href: "https://alfajrcontractingco.vercel.app/",
  },
  {
    id: "pos",
    icon: ScanBarcode,
    iconLabel: "POS System",
    title: "A point-of-sale system built for inventory management.",
    description:
      "Core inventory management, single and multiple product returns, and expense tracking.",
    meta: "React · Bootstrap · Supabase",
    image: pos,
    imageAlt: "POS system dashboard",
    href: "https://fmse.vercel.app/",
  },
  {
    id: "getsetproperties",
    icon: Building2,
    iconLabel: "Get Set Properties",
    title: "A real-estate website with a property management dashboard.",
    description:
      "Property listings with location data, a dashboard for managing them, and a contact system for buyer inquiries.",
    meta: "React · Tailwind · Supabase",
    image: getSetProperties,
    imageAlt: "Get Set Properties real-estate platform",
    href: "https://getsetproperties.com/",
  },
  {
    id: "transiqi",
    icon: Truck,
    iconLabel: "Transiqi",
    title: "A multi-language vehicle and logistics management system.",
    description:
      "Vehicle records with registration, insurance, and MVPI expiry tracking, date-based filtering and PDF/Excel export. Supports multiple languages including English, Urdu, and Arabic.",
    meta: "MERN · Ant Design · i18n",
    image: transiqi,
    imageAlt: "Transiqi logistics dashboard",
    href: "https://transiqi.netlify.app/auth/login",
  },
  {
    id: "metafessional",
    icon: Globe,
    iconLabel: "Metafessional",
    title: "My own agency Metafessional.",
    description:
      "The public-facing website for my agency, Metafessional is built with Next.js, Shadcn, and Framer Motion to represent the brand and convert visitors into clients.",
    meta: "Next.js · Shadcn · Framer Motion",
    image: metafessional,
    imageAlt: "Metafessional company website",
    href: "https://metafessional.com/",
  },
  {
    id: "fashionthread",
    icon: ShoppingBag,
    iconLabel: "Fashion Thread",
    title: "A Shopify store built for a fashion brand.",
    description:
      "Custom storefront design and setup on Shopify — product browsing, cart, and checkout tailored for a fast, considered shopping flow.",
    meta: "Shopify",
    image: fashionThread,
    imageAlt: "Fashion Thread e-commerce store",
    href: "http://fashionthread.shop/",
  },
  {
    id: "nutrista",
    icon: Salad,
    iconLabel: "Nutrista",
    title: "A management platform for a nutritionist.",
    description:
      "A public website where clients book appointments, paired with an admin dashboard to manage bookings, blog content, and customers.",
    meta: "MERN · Ant Design",
    image: nutrista,
    imageAlt: "Nutrista nutrition platform",
  },
  {
    id: "aureolea",
    icon: Sparkles,
    iconLabel: "Aureolea",
    title: "A storefront for a perfume brand.",
    description:
      "A polished brand storefront with product catalog and checkout, designed to feel premium and refined.",
    meta: "Shopify",
    image: aureolea,
    imageAlt: "Aureolea perfume storefront",
    href: "https://aureolea.com/",
  },

];

export type ProjectsProps = {
  withHeadline?: boolean;
  viewMoreVisible?: boolean;
};

export function Projects({
  withHeadline = false,
  viewMoreVisible = false,
}: ProjectsProps): ReactNode {
  const items = viewMoreVisible ? PROJECTS.slice(0, 4) : PROJECTS;

  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        {withHeadline ? (
          <FadeIn className="flex flex-col items-center gap-5 pt-12 pb-10 text-center sm:pt-20 sm:pb-14">
            <h2 className="font-serif text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3rem] lg:text-[3.5rem]">
              My projects
            </h2>
            <p className="max-w-[33ch] text-[18px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[20px]">
              Products I&rsquo;ve designed, built, and shipped for real clients and users.
            </p>
          </FadeIn>
        ) : null}

        <div className="columns-1 gap-6 md:columns-2 md:gap-7">
          {items.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {viewMoreVisible ? (
          <div className="mt-12 flex justify-center sm:mt-16">
            <Link
              href="/projects"
              className="focus-ring group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-sm transition-all hover:gap-2.5 hover:opacity-90 sm:w-auto"
            >
              View all projects
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}): ReactNode {
  const Icon = project.icon;
  const card = (
    <article className="project-card flex h-full cursor-pointer flex-col gap-4 rounded-3xl border border-foreground/8 bg-background p-3 sm:p-3.5">
        <header className="flex items-center gap-2.5 px-1 pt-2">
          <span className="border-foreground/10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-background">
            <Icon className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
          </span>
          <span className="text-sm font-medium tracking-tight text-foreground">
            {project.iconLabel}
          </span>
        </header>

        <div
          className="project-card__image ring-foreground/5 relative w-full overflow-hidden rounded-2xl bg-foreground/5 ring-1"
          style={{ aspectRatio: project.image.width / project.image.height }}
        >
          <div className="project-card__image-inner">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(min-width: 1024px) 540px, (min-width: 768px) 45vw, 100vw"
              className="object-cover"
              priority={index < 2}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2.5 px-1 pb-1">
          <h3 className="text-[20px] font-medium leading-[1.2] tracking-tight text-foreground sm:text-[22px]">
            {project.title}
          </h3>
          <p className="text-[14px] leading-normal tracking-tight text-foreground/65 sm:text-[15px]">
            {project.description}
          </p>
        </div>

        <p className="px-1 pb-2 text-[12px] tracking-tight text-foreground/50">
          {project.meta}
        </p>
      </article>
  );

  return (
    <FadeIn
      delay={Math.min(index * 0.06, 0.3)}
      className="mb-6 break-inside-avoid md:mb-7"
    >
      {project.href ? (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${project.iconLabel}`}
          className="focus-ring block rounded-3xl"
        >
          {card}
        </a>
      ) : (
        card
      )}
    </FadeIn>
  );
}
