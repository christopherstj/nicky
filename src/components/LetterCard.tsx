"use client";

import { motion } from "framer-motion";
import Flourish from "@/components/Flourish";
import WaxSeal from "@/components/WaxSeal";

interface LetterCardProps {
  children: React.ReactNode;
  className?: string;
  rotation?: number;
  showSeal?: boolean;
  sealInitial?: string;
}

export default function LetterCard({
  children,
  className = "",
  rotation = -1.5,
  showSeal = true,
  sealInitial = "N",
}: LetterCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: rotation - 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Letter paper - aged and stained */}
      <div 
        className="relative p-8 sm:p-12"
        style={{
          background: `linear-gradient(
            145deg,
            var(--paper) 0%,
            var(--paper-aged) 30%,
            var(--paper-dark) 100%
          )`,
          boxShadow: `
            3px 4px 12px rgba(0, 0, 0, 0.3),
            6px 8px 30px rgba(0, 0, 0, 0.25),
            12px 16px 60px rgba(0, 0, 0, 0.2),
            inset 0 0 60px rgba(0, 0, 0, 0.05)
          `,
        }}
      >
        {/* Age stains */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background: `
              radial-gradient(ellipse at 80% 20%, rgba(139, 37, 0, 0.1), transparent 40%),
              radial-gradient(ellipse at 20% 80%, rgba(90, 74, 58, 0.15), transparent 50%)
            `,
          }}
        />
        
        {/* Letterhead decoration */}
        <div className="mb-8 pb-6 border-b border-ink/15">
          <div className="flex items-center justify-between">
            <div>
              <h3 
                className="font-display text-xl sm:text-2xl font-bold"
                style={{ color: "var(--ink-red)" }}
              >
                Nicholas Popkey
              </h3>
              <p 
                className="text-sm mt-1 font-medium tracking-wide"
                style={{ color: "var(--ink-faded)" }}
              >
                Narrative Director
              </p>
            </div>
            <Flourish variant="ornament" className="opacity-20" color="var(--ink-red)" />
          </div>
        </div>
        
        {/* Letter content */}
        <div 
          className="space-y-4"
          style={{ color: "var(--ink)" }}
        >
          {children}
        </div>
        
        {/* Signature area */}
        <div className="mt-8 pt-6">
          <p 
            className="font-script text-2xl"
            style={{ color: "var(--ink-red)" }}
          >
            Nicholas
          </p>
        </div>
        
        {/* Corner flourishes - red ink */}
        <Flourish 
          variant="corner-tl" 
          className="absolute top-3 left-3 opacity-15" 
          color="var(--ink-red)" 
        />
        <Flourish 
          variant="corner-br" 
          className="absolute bottom-3 right-3 opacity-15" 
          color="var(--ink-red)" 
        />
      </div>
      
      {/* Wax seal */}
      {showSeal && (
        <div className="absolute -bottom-6 right-8 sm:right-12">
          <WaxSeal size="md" initial={sealInitial} />
        </div>
      )}
    </motion.div>
  );
}
