"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Expand, X } from "lucide-react";
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
      <div
        className="group relative overflow-hidden cursor-pointer transition-all"
        style={{
          background: `linear-gradient(
            145deg,
            #d4c4a8 0%,
            #c4b498 50%,
            #b4a488 100%
          )`,
          boxShadow: `
            2px 3px 8px rgba(0, 0, 0, 0.25),
            4px 6px 16px rgba(0, 0, 0, 0.15)
          `,
        }}
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
            style={{ filter: "sepia(10%) contrast(95%)" }}
          />
          {/* Darker overlay on hover */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              background: "linear-gradient(to top, rgba(26,20,16,0.8) 0%, rgba(26,20,16,0.2) 50%, transparent 100%)",
            }}
          />

          {/* Expand icon */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div 
              className="backdrop-blur-sm rounded-full p-2"
              style={{ background: "rgba(232,220,200,0.9)" }}
            >
              <Expand className="w-4 h-4" style={{ color: "#1a1410" }} />
            </div>
          </div>

          {/* Description overlay */}
          {description && (
            <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-sm line-clamp-2" style={{ color: "#e8dcc8" }}>
                {description}
              </p>
            </div>
          )}
        </div>

        {/* Alt text label */}
        <div className={`p-3 ${compact ? "py-2" : ""}`}>
          <p
            className={`line-clamp-1 ${compact ? "text-xs" : "text-sm"}`}
            style={{ color: "#5a4a3a" }}
          >
            {alt}
          </p>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(26, 19, 16, 0.95)" }}
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
                className="absolute -top-12 right-0 hover:bg-transparent"
                style={{ color: "#c4b498" }}
                onClick={() => setIsExpanded(false)}
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Image container - paper style */}
              <div 
                className="relative w-full h-auto overflow-hidden"
                style={{
                  background: "#d4c4a8",
                  padding: "12px",
                  boxShadow: `
                    4px 6px 20px rgba(0, 0, 0, 0.4),
                    8px 12px 40px rgba(0, 0, 0, 0.3)
                  `,
                }}
              >
                <Image
                  src={src}
                  alt={alt}
                  width={1920}
                  height={1080}
                  className="w-full h-auto object-contain max-h-[70vh]"
                  style={{ filter: "sepia(5%) contrast(98%)" }}
                />
              </div>

              {/* Description */}
              {description && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 p-4"
                  style={{
                    background: "rgba(212, 196, 168, 0.1)",
                    border: "1px solid rgba(212, 196, 168, 0.2)",
                  }}
                >
                  <p className="text-sm font-display font-medium mb-1" style={{ color: "#e8dcc8" }}>
                    {alt}
                  </p>
                  <p className="text-sm" style={{ color: "#c4b498" }}>{description}</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
