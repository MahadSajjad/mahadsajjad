import { Quote } from "lucide-react";
import type { ReactNode } from "react";

import { FadeIn } from "@/components/ui/motion-primitives";

type Testimonial = {
  project: string;
  quote: string;
  name: string;
  role: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    project: "Transiqi",
    quote:
      "Mahad built our vehicle and logistics dashboard and the whole experience was great. He understood exactly what our operations team needed and delivered a system that made our day-to-day tracking much easier to manage.",
    name: "Nejat Sayed",
    role: "Operations & Logistics Manager",
  },
  {
    project: "Al Fajr",
    quote:
      "The website Mahad built for us is smooth, responsive, and exactly what we needed. He was professional throughout and delivered everything fast without compromising on quality. A genuinely well-developed site.",
    name: "Hayat Khan",
    role: "Manager, Al Fajr Contracting Company, Saudi Arabia",
  },
  {
    project: "Nutrista",
    quote:
      "Very satisfied with the overall experience. The website is clean and responsive, and the dashboard covers every requirement we had. Communication was smooth from start to finish, and every change we asked for was handled efficiently.",
    name: "Muhammad Umair Ahmad",
    role: "Project Manager, Al Fajr Contracting Company, Saudi Arabia",
  },
];

export function Testimonials(): ReactNode {
  return (
    <section
      id="testimonials"
      className="mx-auto w-full max-w-275 px-6 sm:px-10"
      aria-labelledby="testimonials-heading"
    >
      <FadeIn className="flex flex-col items-center gap-4 text-center">
        <h2
          id="testimonials-heading"
          className="font-serif text-[2.25rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-[2.75rem]"
        >
          What People Say
        </h2>
        <p className="max-w-[42ch] text-[18px] leading-[1.4] tracking-tight text-foreground/65 sm:text-[20px]">
          A few words from the people I&rsquo;ve built for.
        </p>
      </FadeIn>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((testimonial, index) => (
          <FadeIn key={testimonial.name + index} delay={0.05 * index}>
            <TestimonialCard testimonial={testimonial} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}): ReactNode {
  return (
    <figure className="flex h-full flex-col gap-5 rounded-4xl border border-foreground/5 bg-foreground/2 p-6 sm:p-7 dark:bg-foreground/5">
      <Quote
        aria-hidden="true"
        className="h-6 w-6 shrink-0 text-foreground/20"
        strokeWidth={2}
      />
      <blockquote className="flex-1 text-[15px] leading-[1.6] tracking-tight text-foreground/75 sm:text-[16px]">
        {testimonial.quote}
      </blockquote>
      <figcaption className="flex flex-col">
        <span className="text-[15px] font-semibold tracking-tight text-foreground">
          {testimonial.name}
        </span>
        <span className="text-[13px] tracking-tight text-foreground/55">
          {testimonial.role}
        </span>
      </figcaption>
    </figure>
  );
}
