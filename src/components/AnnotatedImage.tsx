"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Expand, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  src: string;
  alt: string;
  description?: string;
  compact?: boolean;
};

export default function AnnotatedImage({
  src,
  alt,
  description,
  compact = false,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <Card
        className={`group relative overflow-hidden border-white/5 bg-surface/50 cursor-pointer transition-all hover:border-primary/30 ${
          compact ? "rounded-xl" : "rounded-2xl"
        }`}
        onClick={() => setIsExpanded(true)}
      >
        <div
          className={`relative ${compact ? "aspect-video" : "aspect-[4/3]"}`}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Expand icon */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-background/80 backdrop-blur-sm rounded-full p-2">
              <Expand className="w-4 h-4 text-foreground" />
            </div>
          </div>

          {/* Description overlay */}
          {description && (
            <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-sm text-foreground/90 line-clamp-2">
                {description}
              </p>
            </div>
          )}
        </div>

        {/* Alt text label */}
        <div className={`p-3 ${compact ? "py-2" : ""}`}>
          <p
            className={`text-muted-foreground line-clamp-1 ${
              compact ? "text-xs" : "text-sm"
            }`}
          >
            {alt}
          </p>
        </div>
      </Card>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-sm"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-6xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-12 right-0 text-muted-foreground hover:text-foreground"
                onClick={() => setIsExpanded(false)}
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Image container */}
              <div className="relative w-full h-auto rounded-2xl overflow-hidden border border-white/10 bg-surface">
                <Image
                  src={src}
                  alt={alt}
                  width={1920}
                  height={1080}
                  className="w-full h-auto object-contain max-h-[70vh]"
                />
              </div>

              {/* Description */}
              {description && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 p-4 rounded-xl bg-surface/50 border border-white/5"
                >
                  <p className="text-sm font-medium text-foreground mb-1">
                    {alt}
                  </p>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

