"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Excerpt } from "@/lib/portfolio";

type Props = {
  excerpt: Excerpt;
  defaultExpanded?: boolean;
};

// Simple markdown renderer for basic formatting
function renderMarkdown(content: string): React.ReactNode {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentParagraph: string[] = [];
  let inList = false;
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(" ");
      elements.push(
        <p key={elements.length} className="text-foreground/80 leading-relaxed">
          {renderInlineFormatting(text)}
        </p>
      );
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul
          key={elements.length}
          className="space-y-1 text-sm text-muted-foreground ml-4"
        >
          {listItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-primary/70 shrink-0" />
              {renderInlineFormatting(item)}
            </li>
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();

    // Headers
    if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      elements.push(
        <h3
          key={elements.length}
          className="text-lg font-bold mt-4 mb-2 first:mt-0"
        >
          {trimmed.slice(3)}
        </h3>
      );
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      elements.push(
        <h4
          key={elements.length}
          className="text-base font-semibold mt-3 mb-1 first:mt-0"
        >
          {trimmed.slice(4)}
        </h4>
      );
      continue;
    }

    // List items
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      flushParagraph();
      if (!inList) {
        inList = true;
      }
      listItems.push(trimmed.slice(2));
      continue;
    }

    // Empty line
    if (trimmed === "") {
      flushParagraph();
      flushList();
      continue;
    }

    // Regular text
    flushList();
    currentParagraph.push(trimmed);
  }

  flushParagraph();
  flushList();

  return <div className="space-y-3">{elements}</div>;
}

// Render inline formatting (bold, italic, code)
function renderInlineFormatting(text: string): React.ReactNode {
  // Simple regex-based inline formatting
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Bold
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    if (boldMatch && boldMatch.index !== undefined) {
      if (boldMatch.index > 0) {
        parts.push(remaining.slice(0, boldMatch.index));
      }
      parts.push(
        <strong key={key++} className="font-semibold text-foreground">
          {boldMatch[1]}
        </strong>
      );
      remaining = remaining.slice(boldMatch.index + boldMatch[0].length);
      continue;
    }

    // Inline code
    const codeMatch = remaining.match(/`(.+?)`/);
    if (codeMatch && codeMatch.index !== undefined) {
      if (codeMatch.index > 0) {
        parts.push(remaining.slice(0, codeMatch.index));
      }
      parts.push(
        <code
          key={key++}
          className="px-1.5 py-0.5 rounded bg-surface text-primary text-sm font-mono"
        >
          {codeMatch[1]}
        </code>
      );
      remaining = remaining.slice(codeMatch.index + codeMatch[0].length);
      continue;
    }

    // No more matches, add remaining text
    parts.push(remaining);
    break;
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

const typeLabels: Record<string, string> = {
  overview: "Project Overview",
  character: "Character Design",
  quest: "Quest Design",
  world: "World Building",
  research: "Research",
  excerpt: "Documentation",
};

export default function DocExcerpt({ excerpt, defaultExpanded = false }: Props) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const typeLabel = typeLabels[excerpt.type] || excerpt.type;

  // Truncate content for preview
  const previewLength = 300;
  const isLong = excerpt.content.length > previewLength;
  const previewContent = isLong
    ? excerpt.content.slice(0, previewLength) + "..."
    : excerpt.content;

  return (
    <Card className="border-white/5 bg-surface/30 rounded-2xl overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base font-bold">
                {excerpt.title}
              </CardTitle>
              <Badge
                variant="outline"
                className="mt-1 text-xs border-white/10 text-muted-foreground"
              >
                {typeLabel}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {renderMarkdown(excerpt.content)}
              {isLong && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-4 text-muted-foreground hover:text-foreground"
                  onClick={() => setIsExpanded(false)}
                >
                  <ChevronDown className="w-4 h-4 mr-1 rotate-180" />
                  Show less
                </Button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-sm text-foreground/70 leading-relaxed">
                {previewContent}
              </p>
              {isLong && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 text-primary hover:text-primary/80"
                  onClick={() => setIsExpanded(true)}
                >
                  <ChevronDown className="w-4 h-4 mr-1" />
                  Read more
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

