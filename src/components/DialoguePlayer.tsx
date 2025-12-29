"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type DialogueLine = {
  speaker: string;
  line: string;
};

type Props = {
  title: string;
  description?: string;
  lines: DialogueLine[];
};

export default function DialoguePlayer({ title, description, lines }: Props) {
  const [index, setIndex] = useState(0);
  const current = useMemo(() => lines[index], [lines, index]);
  const atEnd = index >= lines.length - 1;

  return (
    <Card className="glass border-border/50 bg-transparent rounded-3xl">
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0 pb-6">
        <div className="space-y-1">
          <p className="text-xs tracking-[0.22em] text-primary/80 font-semibold">
            Interactive Script
          </p>
          <CardTitle className="text-2xl font-black">{title}</CardTitle>
          {description && (
            <p className="text-sm text-muted-foreground max-w-2xl">{description}</p>
          )}
        </div>
        <span className="text-xs text-muted-foreground shrink-0 pt-1">
          {index + 1}/{lines.length}
        </span>
      </CardHeader>
      
      <CardContent>
        <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-surface p-6 min-h-[160px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${current.speaker}-${index}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <p className="text-xs tracking-[0.22em] text-primary/80 font-semibold">
                {current.speaker}
              </p>
              <p className="text-lg leading-relaxed text-foreground/90">
                {current.line}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </CardContent>

      <CardFooter className="flex gap-3">
        <Button
          variant="outline"
          className="rounded-full border-border hover:border-primary/60 hover:text-primary hover:bg-transparent"
          onClick={() => setIndex((i) => Math.max(i - 1, 0))}
          disabled={index === 0}
        >
          Back
        </Button>
        <Button
          variant="default"
          className="rounded-full shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:shadow-primary/40"
          onClick={() => setIndex((i) => (atEnd ? 0 : i + 1))}
        >
          {atEnd ? "Restart" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
}

