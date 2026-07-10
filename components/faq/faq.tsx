import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

import { FadeIn } from "@/components/ui/motion-primitives";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQS: FaqItem[] = [
  {
    question: "What tech stack do you use?",
    answer:
      "I primarily build with the MERN stack (React, Express, MongoDB, and Node.js) along with Next.js and Tailwind CSS on the frontend, Supabase or Firebase for backend services, and Vercel or Netlify for deployment.",
  },
  {
    question: "Are you available for freelance work?",
    answer:
      "Yes, I'm currently open to new freelance and contract projects. Reach out through the whatsapp or email to discuss what you're building.",
  },
  {
    question: "What kind of projects do you build?",
    answer:
      "Full-stack web apps, SaaS platforms, POS systems, and admin dashboards, plus marketing sites and Shopify storefronts when the project calls for it.",
  },
  {
    question: "Do you work with international or remote clients?",
    answer:
      "Yes. Al Fajr and Transiqi are both Saudi Arabia-based clients I've built for remotely, a contracting company marketing site and a multi-language logistics management system.",
  },
];

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
} as const;

export function Faq(): ReactNode {
  return (
    <section
      id="faq"
      className="mx-auto w-full max-w-275 px-6 sm:px-10"
      aria-labelledby="faq-heading"
    >
      <FadeIn className="flex flex-col items-center gap-4 text-center">
        <h2
          id="faq-heading"
          className="font-serif text-[2.25rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-[2.75rem]"
        >
          FAQ
        </h2>
      </FadeIn>

      <div className="mt-12 flex flex-col gap-3">
        {FAQS.map((faq, index) => (
          <FadeIn key={faq.question} delay={0.05 * index}>
            <details className="group rounded-2xl border border-foreground/5 bg-foreground/2 px-5 py-5 transition-colors hover:bg-foreground/4 sm:px-7 sm:py-6 dark:bg-foreground/4 dark:hover:bg-foreground/6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[17px] font-medium tracking-tight text-foreground sm:text-[19px]">
                {faq.question}
                <ChevronDown
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-foreground/40 transition-transform duration-300 group-open:rotate-180"
                />
              </summary>
              <p className="mt-4 max-w-160 text-[15px] leading-[1.65] tracking-tight text-foreground/65 sm:text-[16px]">
                {faq.answer}
              </p>
            </details>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
