"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Simple markdown renderer (reused from DocExcerpt)
function renderMarkdown(content: string): React.ReactNode {
  // Normalize line endings: handle \r\n, \r, and \n
  const normalized = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  // Split by line breaks
  const lines = normalized.split("\n");
  const elements: React.ReactNode[] = [];
  let currentParagraph: string[] = [];
  let inList = false;
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      // Join paragraphs, preserving line breaks within paragraphs
      // If a line starts with spaces, it's indented - preserve as-is
      const text = currentParagraph.map((line, idx) => {
        // If line starts with spaces (indentation), preserve it
        if (line.match(/^\s+/)) {
          return idx === 0 ? line : "\n" + line;
        }
        return idx === 0 ? line : " " + line;
      }).join("");
      
      elements.push(
        <p key={elements.length} className="text-foreground/80 leading-relaxed break-words whitespace-pre-wrap">
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
          className="space-y-1 text-sm text-muted-foreground ml-4 break-words"
        >
          {listItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2 break-words">
              <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-primary/70 shrink-0" />
              <span className="break-words min-w-0 flex-1">{renderInlineFormatting(item)}</span>
            </li>
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  // First pass: collect image references (reference-style images)
  const imageRefs: Record<string, string> = {};
  for (const line of lines) {
    const trimmed = line.trim();
    // Match reference-style images: [image1]: <data:image/...;base64,...>
    // Use non-greedy match and handle very long base64 strings
    const refMatch = trimmed.match(/^\[([^\]]+)\]:\s*<data:image\/([^;]+);base64,([^>]+)>/);
    if (refMatch) {
      // Reconstruct the full data URI (base64 can be very long)
      const fullMatch = trimmed.match(/^\[([^\]]+)\]:\s*<(data:image\/[^>]+)>/);
      if (fullMatch) {
        imageRefs[refMatch[1]] = fullMatch[2];
      }
    }
  }

  for (const line of lines) {
    // Convert tabs to spaces (4 spaces per tab) and preserve leading whitespace
    const normalizedLine = line.replace(/\t/g, "    ");
    const trimmed = normalizedLine.trim();
    const leadingWhitespace = normalizedLine.match(/^(\s*)/)?.[1] || "";

    // Skip reference-style image definitions (already processed)
    if (trimmed.match(/^\[([^\]]+)\]:\s*<data:image/)) {
      continue;
    }

    // Inline images: ![alt](data:image/...;base64,...) or ![alt](imageRef)
    const inlineImageMatch = trimmed.match(/!\[([^\]]*)\]\((data:image\/[^)]+)\)/);
    if (inlineImageMatch) {
      flushParagraph();
      flushList();
      const alt = inlineImageMatch[1] || "";
      const src = inlineImageMatch[2];
      elements.push(
        <div key={elements.length} className="my-4 flex justify-center">
          <img
            src={src}
            alt={alt}
            className="max-w-full h-auto rounded-lg border border-border"
          />
        </div>
      );
      continue;
    }

    // Reference-style inline images: ![alt][imageRef] or ![][imageRef]
    // Handle multiple images on one line: ![][image1]![][image2]
    const refImagePattern = /!\[([^\]]*)\]\[([^\]]+)\]/g;
    let refImageMatch;
    let hasImages = false;
    const imageElements: React.ReactNode[] = [];
    
    // Reset regex lastIndex
    refImagePattern.lastIndex = 0;
    
    while ((refImageMatch = refImagePattern.exec(trimmed)) !== null) {
      if (imageRefs[refImageMatch[2]]) {
        hasImages = true;
        const alt = refImageMatch[1] || "";
        const src = imageRefs[refImageMatch[2]];
        imageElements.push(
          <img
            key={imageElements.length}
            src={src}
            alt={alt}
            className="max-w-full h-auto rounded-lg border border-border"
          />
        );
      }
    }
    
    if (hasImages) {
      flushParagraph();
      flushList();
      elements.push(
        <div key={elements.length} className="my-4 flex flex-wrap justify-center gap-4">
          {imageElements}
        </div>
      );
      continue;
    }

    // Headers
    if (trimmed.startsWith("# ")) {
      flushParagraph();
      flushList();
      elements.push(
        <h1
          key={elements.length}
          className="text-2xl font-black mt-6 mb-3 first:mt-0"
        >
          {trimmed.slice(2)}
        </h1>
      );
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      elements.push(
        <h2
          key={elements.length}
          className="text-xl font-bold mt-5 mb-2 first:mt-0"
        >
          {trimmed.slice(3)}
        </h2>
      );
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      elements.push(
        <h3
          key={elements.length}
          className="text-lg font-bold mt-4 mb-2 first:mt-0"
        >
          {trimmed.slice(4)}
        </h3>
      );
      continue;
    }

    if (trimmed.startsWith("#### ")) {
      flushParagraph();
      flushList();
      elements.push(
        <h4
          key={elements.length}
          className="text-base font-semibold mt-3 mb-1 first:mt-0"
        >
          {trimmed.slice(5)}
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
      // Preserve empty lines as spacing
      elements.push(<br key={`br-${elements.length}`} />);
      continue;
    }

    // Regular text - preserve indentation for lines that start with spaces
    flushList();
    // If line has leading whitespace (indentation), preserve it
    if (leadingWhitespace.length > 0 && !trimmed.startsWith("- ") && !trimmed.startsWith("* ")) {
      currentParagraph.push(leadingWhitespace + trimmed);
    } else {
      currentParagraph.push(trimmed);
    }
  }

  flushParagraph();
  flushList();

  return <div className="space-y-3 break-words">{elements}</div>;
}

// Render inline formatting (bold, italic, code, links)
function renderInlineFormatting(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Links [text](url)
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch && linkMatch.index !== undefined) {
      if (linkMatch.index > 0) {
        parts.push(remaining.slice(0, linkMatch.index));
      }
      parts.push(
        <a
          key={key++}
          href={linkMatch[2]}
          target="_blank"
          rel="noreferrer"
          className="text-primary hover:underline break-all"
        >
          {linkMatch[1]}
        </a>
      );
      remaining = remaining.slice(linkMatch.index + linkMatch[0].length);
      continue;
    }

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

    // Italic
    const italicMatch = remaining.match(/\*(.+?)\*/);
    if (italicMatch && italicMatch.index !== undefined && !remaining.match(/^\*\*/)) {
      if (italicMatch.index > 0) {
        parts.push(remaining.slice(0, italicMatch.index));
      }
      parts.push(
        <em key={key++} className="italic">
          {italicMatch[1]}
        </em>
      );
      remaining = remaining.slice(italicMatch.index + italicMatch[0].length);
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

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  content: string;
};

export default function MarkdownLightbox({
  open,
  onOpenChange,
  title,
  content,
}: Props) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{ background: "rgba(61, 43, 31, 0.9)" }}
          onClick={() => onOpenChange(false)}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <motion.div
            initial={{ scale: 0.98, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.98, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="relative w-full max-w-4xl max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute -top-12 left-0 right-0 flex items-center justify-between gap-3">
              <div className="text-sm font-display font-semibold text-paper/90">{title}</div>

              <Button
                variant="ghost"
                size="icon"
                className="text-paper/60 hover:text-paper hover:bg-paper/10"
                onClick={() => onOpenChange(false)}
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Paper document styling */}
            <div 
              className="paper paper-texture overflow-hidden flex-1 flex flex-col"
              style={{
                boxShadow: `
                  4px 6px 20px rgba(26, 20, 16, 0.3),
                  8px 12px 40px rgba(26, 20, 16, 0.2),
                  16px 24px 80px rgba(26, 20, 16, 0.15)
                `,
              }}
            >
              <div className="p-6 sm:p-8 overflow-y-auto flex-1">
                <div className="max-w-none break-words overflow-wrap-anywhere text-ink">
                  {renderMarkdown(content)}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

