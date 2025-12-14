"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type {
  Project,
  Excerpt,
  DialogueScene,
} from "@/lib/portfolio";
import DocExcerpt from "./DocExcerpt";
import AnnotatedImage from "./AnnotatedImage";
import BranchingDialogue from "./BranchingDialogue";

type Props = {
  project: Project;
  excerpts: Excerpt[];
  dialogueScenes: DialogueScene[];
  defaultOpen?: boolean;
};

export default function CaseStudy({
  project,
  excerpts,
  dialogueScenes,
  defaultOpen = false,
}: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="glass border-white/5 bg-transparent rounded-3xl overflow-hidden">
        {/* Collapsed Header - Always visible */}
        <CollapsibleTrigger asChild>
          <button className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-3xl">
            <div className="relative">
              {/* Hero Image */}
              <div className="relative h-48 sm:h-64 overflow-hidden">
                <Image
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              </div>

              {/* Header Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge
                    variant="outline"
                    className="border-primary/50 text-primary bg-background/80 backdrop-blur-sm"
                  >
                    {project.role}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-white/20 text-muted-foreground bg-background/80 backdrop-blur-sm"
                  >
                    {project.year}
                  </Badge>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {project.studio}
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                  >
                    <ChevronDown className="w-6 h-6 text-muted-foreground" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Summary - visible when collapsed */}
            <AnimatePresence>
              {!isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-6 sm:px-8 pb-6"
                >
                  <p className="text-foreground/80 leading-relaxed line-clamp-2">
                    {project.summary}
                  </p>
                  <p className="text-sm text-primary mt-2">
                    Click to expand case study →
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </CollapsibleTrigger>

        {/* Expanded Content */}
        <CollapsibleContent>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <CardContent className="px-6 sm:px-8 pb-8 space-y-8">
              {/* Summary */}
              <div className="space-y-4">
                <p className="text-foreground/90 leading-relaxed">
                  {project.summary}
                </p>

                {/* Highlights */}
                {project.highlights.length > 0 && (
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {project.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-primary/70 shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Dialogue Scenes */}
              {dialogueScenes.length > 0 && (
                <section className="space-y-4">
                  <h4 className="text-lg font-bold flex items-center gap-2">
                    <span className="text-primary">◆</span>
                    Interactive Dialogue
                  </h4>
                  <div className="space-y-6">
                    {dialogueScenes.map((scene) => (
                      <BranchingDialogue key={scene.id} scene={scene} />
                    ))}
                  </div>
                </section>
              )}

              {/* Workflow Images */}
              {project.workflowImages.length > 0 && (
                <section className="space-y-4">
                  <h4 className="text-lg font-bold flex items-center gap-2">
                    <span className="text-primary">◆</span>
                    Dialogue Architecture
                  </h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {project.workflowImages.map((image, i) => (
                      <AnnotatedImage
                        key={i}
                        src={image.src}
                        alt={image.alt}
                        description={image.description}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Documentation Excerpts */}
              {excerpts.length > 0 && (
                <section className="space-y-4">
                  <h4 className="text-lg font-bold flex items-center gap-2">
                    <span className="text-primary">◆</span>
                    Documentation
                  </h4>
                  <div className="space-y-4">
                    {excerpts.map((excerpt) => (
                      <DocExcerpt key={excerpt.id} excerpt={excerpt} />
                    ))}
                  </div>
                </section>
              )}

              {/* Gallery Images */}
              {project.galleryImages.length > 0 && (
                <section className="space-y-4">
                  <h4 className="text-lg font-bold flex items-center gap-2">
                    <span className="text-primary">◆</span>
                    Gallery
                  </h4>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {project.galleryImages.map((image, i) => (
                      <AnnotatedImage
                        key={i}
                        src={image.src}
                        alt={image.alt}
                        description={image.description}
                        compact
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Collapse button */}
              <div className="pt-4 border-t border-white/5">
                <Button
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ChevronDown className="w-4 h-4 mr-2 rotate-180" />
                  Collapse
                </Button>
              </div>
            </CardContent>
          </motion.div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

