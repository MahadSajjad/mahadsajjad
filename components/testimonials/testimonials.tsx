import { Quote } from "lucide-react";
import type { ReactNode } from "react";

import { FadeIn } from "@/components/ui/motion-primitives";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

// TODO(mahad): Replace these placeholders with real client quotes.
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Placeholder quote — swap this for a real client testimonial. Mahad shipped exactly what we agreed on, on time, and communicated clearly the whole way.",
    name: "Client Name",
    role: "Founder, Company",
  },
  {
    quote:
      "Placeholder quote — describe the problem Mahad solved and the outcome. Numbers and specifics land best here.",
    name: "Client Name",
    role: "Product Lead, Company",
  },
  {
    quote:
      "Placeholder quote — a short, punchy line about working with him works well as the third card.",
    name: "Client Name",
    role: "CEO, Company",
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
