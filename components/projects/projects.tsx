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
};

const PROJECTS: Project[] = [
  {
    id: "al-fajr",
    icon: Moon,
    iconLabel: "Al Fajr",
    title: "A focused product shipped for a real client.",
    description:
      "An end-to-end build delivered for a real business, from data model to deployment.",
    meta: "Full-stack · MERN",
    image: alFajr,
    imageAlt: "Al Fajr project",
  },
  {
    id: "pos",
    icon: ScanBarcode,
    iconLabel: "POS System",
    title: "A point-of-sale system with barcode-driven checkout.",
    description:
      "A full POS built around EAN-13 barcode architecture, with discount, tax, and bulk operations handled end-to-end.",
    meta: "Full-stack · MERN",
    image: pos,
    imageAlt: "POS system dashboard",
  },
  {
    id: "getsetproperties",
    icon: Building2,
    iconLabel: "Get Set Properties",
    title: "A property listing and management platform.",
    description:
      "A real-estate platform for browsing, listing, and managing properties with search, filters, and a clean dashboard.",
    meta: "Full-stack · MERN",
    image: getSetProperties,
    imageAlt: "Get Set Properties real-estate platform",
  },
  {
    id: "transiqi",
    icon: Truck,
    iconLabel: "Transiqi",
    title: "A transport and logistics management tool.",
    description:
      "A dashboard for managing transport operations, built to keep moving parts organized and easy to act on.",
    meta: "Full-stack · MERN",
    image: transiqi,
    imageAlt: "Transiqi logistics dashboard",
  },
  {
    id: "metafessional",
    icon: Globe,
    iconLabel: "Metafessional",
    title: "My own agency — designed and built from scratch.",
    description:
      "The public-facing website for my agency, Metafessional. Designed and shipped end-to-end to represent the brand and bring in clients.",
    meta: "Frontend · Next.js",
    image: metafessional,
    imageAlt: "Metafessional company website",
  },
  {
    id: "fashionthread",
    icon: ShoppingBag,
    iconLabel: "Fashion Thread",
    title: "An e-commerce experience for a fashion brand.",
    description:
      "Product browsing, cart, and checkout for a fashion store, with a focus on a fast, considered shopping flow.",
    meta: "Full-stack · MERN",
    image: fashionThread,
    imageAlt: "Fashion Thread e-commerce store",
  },


  {
    id: "nutrista",
    icon: Salad,
    iconLabel: "Nutrista",
    title: "A nutrition and diet-tracking platform.",
    description:
      "A platform for planning and tracking nutrition, turning daily intake into a clear, readable picture.",
    meta: "Full-stack · MERN",
    image: nutrista,
    imageAlt: "Nutrista nutrition platform",
  },
  {
    id: "aureolea",
    icon: Sparkles,
    iconLabel: "Aureolea",
    title: "A storefront for a beauty and skincare brand.",
    description:
      "A polished brand storefront with product catalog and checkout, designed to feel premium and calm.",
    meta: "Full-stack · MERN",
    image: aureolea,
    imageAlt: "Aureolea beauty brand storefront",
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
              className="border border-foreground/8 focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
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
  return (
    <FadeIn
      delay={Math.min(index * 0.06, 0.3)}
      className="mb-6 break-inside-avoid md:mb-7"
    >
      <article className="project-card flex cursor-pointer flex-col gap-4 rounded-3xl border border-foreground/8 bg-background p-3 sm:p-3.5">
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
    </FadeIn>
  );
}
