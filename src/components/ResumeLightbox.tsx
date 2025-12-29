"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pdfPath?: string;
  title?: string;
};

export default function ResumeLightbox({
  open,
  onOpenChange,
  pdfPath = "/resume.pdf",
  title = "Resume",
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
          aria-label={`${title} PDF`}
        >
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute -top-12 left-0 right-0 flex items-center justify-between gap-3">
              <div className="text-sm font-display font-semibold text-paper/90">{title}</div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild className="text-paper/60 hover:text-paper hover:bg-paper/10">
                  <a href={pdfPath} target="_blank" rel="noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open
                  </a>
                </Button>
                <Button variant="ghost" asChild className="text-paper/60 hover:text-paper hover:bg-paper/10">
                  <a href={pdfPath} download>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-paper/60 hover:text-paper hover:bg-paper/10"
                  onClick={() => onOpenChange(false)}
                  aria-label="Close resume"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>

            <div 
              className="paper overflow-hidden"
              style={{
                boxShadow: `
                  4px 6px 20px rgba(26, 20, 16, 0.3),
                  8px 12px 40px rgba(26, 20, 16, 0.2)
                `,
              }}
            >
              <iframe
                src={pdfPath}
                title={`${title} PDF`}
                className="h-[78vh] w-full"
              />
            </div>

            <p className="mt-3 text-xs text-paper/50">
              If the embedded viewer doesn&apos;t load, use{" "}
              <a
                className="underline underline-offset-4 hover:text-paper"
                href={pdfPath}
                target="_blank"
                rel="noreferrer"
              >
                Open
              </a>
              .
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


