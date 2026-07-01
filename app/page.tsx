import { AboutSummary } from "@/components/about/about-summary";
import { ContactCard } from "@/components/contact/contact-card";
import { Hero } from "@/components/hero/hero";
import { Projects } from "@/components/projects/projects";
import { Services } from "@/components/services/services";
import { Testimonials } from "@/components/testimonials/testimonials";
import { createMetadata, siteConfig } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Home",
  description: `Welcome to ${siteConfig.name}. ${siteConfig.description}`,
  path: "/",
});

export default function HomePage(): ReactNode {
  return (
    <main id="main-content" className="flex flex-1 flex-col gap-20 sm:gap-28">
      <Hero />
      <AboutSummary />
      <Services />
      <div id="projects" className="scroll-mt-28">
        <Projects withHeadline viewMoreVisible />
      </div>
      <Testimonials />
      <div id="contact" className="scroll-mt-28">
        <ContactCard />
      </div>
      <div className="h-12 sm:h-16" />
    </main>
  );
}
