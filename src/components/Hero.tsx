"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type Props = {
  onCta?: () => void;
};

export default function Hero({ onCta }: Props) {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-surface/80 via-surface/40 to-surface/30 px-6 py-16 sm:px-12 sm:py-20 shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(179,17,43,0.08),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(94,65,130,0.12),transparent_30%)]" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative space-y-6 max-w-3xl"
      >
        <p className="text-xs uppercase tracking-[0.4em] text-primary/80">
          Narrative Director / Story Architect
        </p>
        <h1 className="text-4xl sm:text-5xl font-black leading-tight drop-shadow">
          Building worlds where player choice bleeds into consequence.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Nicholas Popkey designs narrative systems, branching quests, and
          character-driven stories that feel authored yet reactive. Gothic,
          moody, and eminently game-forward.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={onCta}
            className="rounded-full shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:shadow-primary/40 px-6 py-6 text-sm tracking-wide uppercase font-semibold"
          >
            View the Work
          </Button>
          <Button
            variant="outline"
            asChild
            className="rounded-full border-white/10 px-6 py-6 text-sm font-semibold uppercase tracking-wide text-foreground transition hover:border-primary/60 hover:text-primary hover:bg-transparent"
          >
            <a href="#about">About Nicholas</a>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

