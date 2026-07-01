"use client";

import { ArrowRight } from "lucide-react";
import { LayoutGroup, motion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";

import { ContactButton } from "@/components/contact/contact-button";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroCtas(): ReactNode {
  return (
    <LayoutGroup>
      <motion.div
        layout
        transition={{ layout: { duration: 0.55, ease: EASE } }}
        className="mt-2 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center"
      >
        <ContactButton className="w-full sm:w-auto" />

        <motion.div
          layout
          transition={{ layout: { duration: 0.55, ease: EASE } }}
          className="w-full sm:w-auto"
        >
          <Link
            href="/projects"
            className="border border-foreground/5 focus-ring group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-2xl transition-colors hover:bg-foreground/4 sm:w-auto"
          >
            View My Work
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </motion.div>
    </LayoutGroup>
  );
}
