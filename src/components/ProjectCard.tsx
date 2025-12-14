"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

type Props = {
  title: string;
  role: string;
  summary: string;
  bullets?: string[];
  accent?: string;
  children?: ReactNode;
};

const MotionCard = motion(Card);

export default function ProjectCard({
  title,
  role,
  summary,
  bullets = [],
  accent = "Narrative Direction",
  children,
}: Props) {
  return (
    <MotionCard
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass border-white/5 bg-transparent rounded-3xl relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-primary/40 via-transparent to-transparent pointer-events-none" />
      
      <CardHeader className="space-y-1 pb-2">
        <p className="text-xs uppercase tracking-[0.3em] text-primary/80 mb-2">
          {accent}
        </p>
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4">
          <CardTitle className="text-2xl sm:text-3xl font-black">{title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground font-medium">{role}</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-base text-foreground/90 leading-relaxed">{summary}</p>
        
        {bullets.length > 0 && (
          <ul className="space-y-2 text-sm text-muted-foreground">
            {bullets.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 before:mt-2 before:block before:h-1 before:w-1 before:rounded-full before:bg-primary/70"
              >
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
        
        {children && <div className="pt-4">{children}</div>}
      </CardContent>
    </MotionCard>
  );
}

