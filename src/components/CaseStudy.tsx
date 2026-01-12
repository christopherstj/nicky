"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, BookOpen, FileText, Users, ExternalLink, LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import type {
  Project,
  Excerpt,
  DialogueScene,
} from "@/lib/portfolio";
import DocExcerpt from "./DocExcerpt";
import AnnotatedImage from "./AnnotatedImage";
import BranchingDialogue from "./BranchingDialogue";
import Flourish from "./Flourish";

type MarkdownResource = {
  title: string;
  url: string;
  iconName?: string;
};

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  FileText,
  Users,
};

type Props = {
  project: Project;
  excerpts: Excerpt[];
  dialogueScenes: DialogueScene[];
  defaultOpen?: boolean;
  markdownResources?: MarkdownResource[];
};

export default function CaseStudy({
  project,
  excerpts,
  dialogueScenes,
  defaultOpen = false,
  markdownResources = [],
}: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      {/* Document folder styling */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        {/* Folder tab - darker, aged */}
        <div 
          className="absolute -top-4 left-8 z-10 px-6"
          style={{
            minWidth: "180px",
            width: "auto",
            height: "32px",
            background: "linear-gradient(180deg, #d4c4a8 0%, #c4b498 100%)",
            clipPath: "polygon(8px 100%, 0% 0%, 100% 0%, calc(100% - 8px) 100%)",
            boxShadow: "0 -2px 10px rgba(0,0,0,0.35)",
          }}
        >
          <span 
            className="h-full flex items-center justify-center text-xs font-display font-semibold tracking-wide whitespace-nowrap"
            style={{ color: "#8b2500" }}
          >
            {project.year} • {project.role}
          </span>
        </div>

        {/* Main folder/document - darker aged paper */}
        <div 
          className="relative overflow-hidden"
          style={{
            background: `linear-gradient(
              155deg,
              #e8dcc8 0%,
              #d4c4a8 40%,
              #c4b498 100%
            )`,
            boxShadow: `
              3px 4px 15px rgba(0, 0, 0, 0.4),
              6px 8px 35px rgba(0, 0, 0, 0.3),
              12px 16px 70px rgba(0, 0, 0, 0.25),
              inset 0 0 60px rgba(0, 0, 0, 0.04)
            `,
          }}
        >
          {/* Age stains overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background: `
                radial-gradient(ellipse at 80% 20%, rgba(139, 37, 0, 0.12), transparent 45%),
                radial-gradient(ellipse at 20% 80%, rgba(90, 74, 58, 0.18), transparent 55%)
              `,
            }}
          />

          {/* Collapsed Header - Always visible */}
          <CollapsibleTrigger asChild>
            <button className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b2500]/50">
              <div className="relative">
                {/* Hero Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    className="object-cover object-center"
                    style={{
                      filter: "sepia(20%) contrast(90%) brightness(95%)",
                    }}
                  />
                  {/* Darker gradient overlay */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(
                        to top,
                        #d4c4a8 0%,
                        rgba(212, 196, 168, 0.85) 30%,
                        rgba(212, 196, 168, 0.4) 60%,
                        transparent 100%
                      )`,
                    }}
                  />
                  
                  {/* Paper clip decoration - darker */}
                  <div 
                    className="absolute top-4 right-6 w-6 h-16 opacity-50"
                    style={{
                      background: "linear-gradient(90deg, #808080, #a0a0a0, #808080)",
                      clipPath: "polygon(20% 0%, 80% 0%, 80% 85%, 60% 85%, 60% 100%, 40% 100%, 40% 85%, 20% 85%)",
                      boxShadow: "2px 2px 6px rgba(0,0,0,0.3)",
                    }}
                  />
                </div>

                {/* Header Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h3 
                        className="font-display text-2xl sm:text-3xl font-bold mb-1"
                        style={{ color: "#8b2500" }}
                      >
                        {project.title}
                      </h3>
                      <p className="text-sm" style={{ color: "#5a4a3a" }}>
                        <span style={{ opacity: 0.7 }}>Developer:</span>{" "}
                        <span className="font-medium">{project.studio}</span>
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(26, 20, 16, 0.1)" }}
                    >
                      <ChevronDown className="w-5 h-5" style={{ color: "#5a4a3a" }} />
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
                    <p className="leading-relaxed line-clamp-2" style={{ color: "#5a4a3a" }}>
                      {project.summary}
                    </p>
                    <p className="text-sm mt-2 font-medium" style={{ color: "#8b2500" }}>
                      Open dossier →
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
              <div className="px-6 sm:px-8 pb-8 space-y-8">
                {/* Summary */}
                <div className="space-y-4">
                  <p className="leading-relaxed drop-cap" style={{ color: "#1a1410" }}>
                    {project.summary}
                  </p>

                  {/* Highlights */}
                  {project.highlights.length > 0 && (
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {project.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm"
                          style={{ color: "#5a4a3a" }}
                        >
                          <span 
                            className="mt-1.5 block h-1.5 w-1.5 rounded-full shrink-0" 
                            style={{ background: "#8b2500" }}
                          />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <Flourish variant="divider" className="max-w-sm mx-auto opacity-40" color="#8b2500" />

                {/* Markdown Resources - Grid layout */}
                {markdownResources.length > 0 && (
                  <section className="space-y-4">
                    <h4 
                      className="font-display text-lg font-semibold flex items-center gap-2"
                      style={{ color: "#8b2500" }}
                    >
                      <Flourish variant="ornament" className="w-5 h-5 opacity-60" color="#8b2500" />
                      Research & Documentation
                    </h4>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {markdownResources.map((resource, index) => {
                        const IconComponent = resource.iconName ? iconMap[resource.iconName] : FileText;
                        return (
                          <a
                            key={index}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-auto p-4 flex flex-col items-start gap-2 transition-all text-left group"
                            style={{
                              background: "rgba(196, 180, 152, 0.5)",
                              border: "1px solid rgba(26, 20, 16, 0.15)",
                              textDecoration: "none",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "rgba(139, 37, 0, 0.1)";
                              e.currentTarget.style.borderColor = "rgba(139, 37, 0, 0.3)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "rgba(196, 180, 152, 0.5)";
                              e.currentTarget.style.borderColor = "rgba(26, 20, 16, 0.15)";
                            }}
                          >
                            <div className="flex items-center gap-2 w-full">
                              <IconComponent className="w-4 h-4 shrink-0" style={{ color: "#8b2500" }} />
                              <span 
                                className="font-display font-medium text-sm text-left flex-1"
                                style={{ color: "#1a1410" }}
                              >
                                {resource.title}
                              </span>
                              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity" style={{ color: "#8b2500" }} />
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </section>
                )}

                {/* Dialogue Scenes */}
                {dialogueScenes.length > 0 && (
                  <section className="space-y-4">
                    <h4 
                      className="font-display text-lg font-semibold flex items-center gap-2"
                      style={{ color: "#8b2500" }}
                    >
                      <Flourish variant="ornament" className="w-5 h-5 opacity-60" color="#8b2500" />
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
                    <h4 
                      className="font-display text-lg font-semibold flex items-center gap-2"
                      style={{ color: "#8b2500" }}
                    >
                      <Flourish variant="ornament" className="w-5 h-5 opacity-60" color="#8b2500" />
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
                    <h4 
                      className="font-display text-lg font-semibold flex items-center gap-2"
                      style={{ color: "#8b2500" }}
                    >
                      <Flourish variant="ornament" className="w-5 h-5 opacity-60" color="#8b2500" />
                      {project.title} Overview
                    </h4>
                    <div className="space-y-4">
                      {excerpts.map((excerpt) => (
                        <DocExcerpt key={excerpt.id} excerpt={excerpt} hideTitle />
                      ))}
                    </div>
                  </section>
                )}

                {/* Gallery Images */}
                {project.galleryImages.length > 0 && (
                  <section className="space-y-4">
                    <h4 
                      className="font-display text-lg font-semibold flex items-center gap-2"
                      style={{ color: "#8b2500" }}
                    >
                      <Flourish variant="ornament" className="w-5 h-5 opacity-60" color="#8b2500" />
                      Gallery
                    </h4>
                    <div className={`grid gap-4 ${
                      project.galleryImages.length === 1 
                        ? "grid-cols-1" 
                        : project.galleryImages.length === 2 
                          ? "sm:grid-cols-2" 
                          : "sm:grid-cols-2 lg:grid-cols-3"
                    }`}>
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
                <div 
                  className="pt-4"
                  style={{ borderTop: "1px solid rgba(26, 20, 16, 0.1)" }}
                >
                  <Button
                    variant="ghost"
                    onClick={() => setIsOpen(false)}
                    className="hover:bg-transparent"
                    style={{ color: "#5a4a3a" }}
                  >
                    <ChevronDown className="w-4 h-4 mr-2 rotate-180" />
                    Close Dossier
                  </Button>
                </div>
              </div>
            </motion.div>
          </CollapsibleContent>
          
          {/* Corner flourishes - red ink */}
          <Flourish variant="corner-tl" className="absolute top-2 left-2 opacity-20" color="#8b2500" />
          <Flourish variant="corner-br" className="absolute bottom-2 right-2 opacity-20" color="#8b2500" />
        </div>
      </motion.div>
    </Collapsible>
  );
}
