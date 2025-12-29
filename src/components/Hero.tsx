"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Flourish from "@/components/Flourish";

export default function Hero() {
  return (
    <section className="relative py-8">
      {/* Open Journal - Two page spread */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotateX: 5 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative mx-auto max-w-5xl"
        style={{ perspective: "1000px" }}
      >
        {/* Journal binding shadow - darker */}
        <div 
          className="absolute left-1/2 top-4 bottom-4 w-5 -translate-x-1/2 z-10"
          style={{
            background: "linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.4) 100%)",
            boxShadow: "0 0 30px rgba(0,0,0,0.5)",
          }}
        />

        <div className="flex flex-col md:flex-row">
          {/* Left Page */}
          <motion.div
            initial={{ rotateY: -5 }}
            animate={{ rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 relative p-8 sm:p-12 md:rounded-l-sm"
            style={{
              background: `linear-gradient(
                160deg,
                var(--paper) 0%,
                var(--paper-aged) 40%,
                var(--paper-dark) 100%
              )`,
              transformOrigin: "right center",
              boxShadow: "-4px 4px 25px rgba(0,0,0,0.35), -8px 8px 50px rgba(0,0,0,0.25)",
            }}
          >
            {/* Age stains */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-25"
              style={{
                background: `
                  radial-gradient(ellipse at 70% 30%, rgba(139, 37, 0, 0.15), transparent 50%),
                  radial-gradient(ellipse at 30% 70%, rgba(90, 74, 58, 0.2), transparent 60%)
                `,
              }}
            />
            
            {/* Corner flourish - red ink */}
            <Flourish variant="corner-tl" className="absolute top-4 left-4 opacity-25" color="var(--ink-red)" />
            
            {/* Title page content */}
            <div className="relative space-y-6 pt-8">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="font-script text-3xl sm:text-4xl"
                style={{ color: "var(--ink-faded)" }}
              >
                The Works of
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-4xl sm:text-5xl md:text-6xl font-display font-bold leading-tight"
                style={{ color: "var(--ink-red)" }}
              >
                Nicholas Popkey
              </motion.h1>
              
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <Flourish variant="divider" className="max-w-xs" color="var(--ink-red)" />
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="text-sm tracking-[0.2em] font-medium"
                style={{ color: "var(--ink-faded)" }}
              >
                Narrative Director & Story Architect
              </motion.p>
            </div>
            
            {/* Corner flourish */}
            <Flourish variant="corner-bl" className="absolute bottom-4 left-4 opacity-25" color="var(--ink-red)" />
          </motion.div>

          {/* Right Page */}
          <motion.div
            initial={{ rotateY: 5 }}
            animate={{ rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 relative p-8 sm:p-12 md:rounded-r-sm"
            style={{
              background: `linear-gradient(
                200deg,
                var(--paper) 0%,
                var(--paper-aged) 40%,
                var(--paper-dark) 100%
              )`,
              transformOrigin: "left center",
              boxShadow: "4px 4px 25px rgba(0,0,0,0.35), 8px 8px 50px rgba(0,0,0,0.25)",
            }}
          >
            {/* Age stains */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                background: `
                  radial-gradient(ellipse at 20% 40%, rgba(139, 37, 0, 0.12), transparent 45%),
                  radial-gradient(ellipse at 80% 80%, rgba(90, 74, 58, 0.18), transparent 55%)
                `,
              }}
            />
            
            {/* Corner flourish */}
            <Flourish variant="corner-tr" className="absolute top-4 right-4 opacity-25" color="var(--ink-red)" />
            
            {/* Main content */}
            <div className="relative space-y-6 pt-8">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="text-lg sm:text-xl leading-relaxed drop-cap"
                style={{ color: "var(--ink)" }}
              >
                Building worlds where choices have consequences. 
                Designing narrative systems, branching quests, and character-driven 
                stories that feel authored yet reactive.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-base leading-relaxed"
                style={{ color: "var(--ink-faded)" }}
              >
                <span style={{ color: "var(--ink-red)" }}>Gothic, moody, and eminently game-forward</span> — exploring the 
                intersection of player agency and authored narrative.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 }}
                className="flex flex-wrap gap-3 pt-4"
              >
                <Button
                  asChild
                  className="rounded-none px-6 py-5 text-sm font-medium tracking-wide shadow-md transition-all hover:-translate-y-0.5"
                  style={{
                    background: "var(--ink-red)",
                    color: "var(--paper)",
                  }}
                >
                  <a href="#projects">View the Work</a>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="rounded-none bg-transparent px-6 py-5 text-sm font-medium tracking-wide transition-all hover:bg-ink/5"
                  style={{
                    borderColor: "var(--ink-faded)",
                    color: "var(--ink)",
                  }}
                >
                  <a href="#about">Read More</a>
                </Button>
              </motion.div>
            </div>
            
            {/* Page number */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="absolute bottom-6 right-8 text-xs font-medium"
              style={{ color: "var(--ink-faded)" }}
            >
              i
            </motion.span>
            
            {/* Corner flourish */}
            <Flourish variant="corner-br" className="absolute bottom-4 right-4 opacity-25" color="var(--ink-red)" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
