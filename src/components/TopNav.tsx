"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ResumeLightbox from "@/components/ResumeLightbox";

const NAV_LINKS: Array<{ href: string; label: string; color: string }> = [
  { href: "#about", label: "About", color: "#1a1310" },
  { href: "#skills", label: "Skills", color: "#2a1d14" },
  { href: "#projects", label: "Works", color: "#1a1310" },
  { href: "#contact", label: "Contact", color: "#2a1d14" },
];

export default function TopNav() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 100; // Start collapsing after scrolling 100px
      
      // Only collapse if we've scrolled past the threshold
      if (currentScrollY > scrollThreshold) {
        // Scrolling down - collapse
        if (currentScrollY > lastScrollY.current + 10) {
          setIsCollapsed(true);
        }
        // Scrolling up - expand
        else if (currentScrollY < lastScrollY.current - 10) {
          setIsCollapsed(false);
        }
      } else {
        // Near top of page - always show
        setIsCollapsed(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Book shelf navigation */}
      <motion.nav 
        className="sticky top-0 z-40 py-4"
        initial={{ y: 0 }}
        animate={{ 
          y: isCollapsed ? -120 : 0,
          opacity: isCollapsed ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-8">
          {/* Shelf with books */}
          <div className="flex items-end justify-center gap-1">
            {/* Book spines */}
            {NAV_LINKS.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="relative group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ y: 0 }}
                animate={{ 
                  y: hoveredIndex === index ? -8 : 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {/* Book spine */}
                <div
                  className="relative w-10 sm:w-12 h-28 sm:h-36 rounded-t-sm flex items-center justify-center overflow-hidden"
                  style={{
                    background: `linear-gradient(90deg, 
                      rgba(0,0,0,0.2) 0%, 
                      ${link.color} 10%, 
                      ${link.color} 90%, 
                      rgba(0,0,0,0.15) 100%
                    )`,
                    boxShadow: hoveredIndex === index 
                      ? "0 -4px 12px rgba(26,20,16,0.3), inset 0 1px 0 rgba(255,255,255,0.1)"
                      : "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.2)",
                  }}
                >
                  {/* Leather texture lines */}
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 2px,
                        rgba(0,0,0,0.15) 2px,
                        rgba(0,0,0,0.15) 3px
                      )`,
                    }}
                  />
                  
                  {/* Aged paper text */}
                  <span
                    className="text-xs sm:text-sm font-display font-semibold tracking-wide"
                    style={{
                      writingMode: "vertical-rl",
                      textOrientation: "mixed",
                      transform: "rotate(180deg)",
                      color: "#c4b498",
                      textShadow: "0 1px 1px rgba(0,0,0,0.4)",
                    }}
                  >
                    {link.label}
                  </span>
                  
                  {/* Gold decoration lines */}
                  <div 
                    className="absolute top-3 left-1/2 -translate-x-1/2 w-6 h-px"
                    style={{ background: "linear-gradient(90deg, transparent, #8b2500, transparent)" }}
                  />
                  <div 
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 w-6 h-px"
                    style={{ background: "linear-gradient(90deg, transparent, #8b2500, transparent)" }}
                  />
                </div>
              </motion.a>
            ))}
            
            {/* Resume "book" - slightly different styling */}
            <motion.button
              onClick={() => setResumeOpen(true)}
              className="relative group ml-2"
              onMouseEnter={() => setHoveredIndex(NAV_LINKS.length)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ y: 0 }}
              animate={{ 
                y: hoveredIndex === NAV_LINKS.length ? -8 : 0,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div
                className="relative w-10 sm:w-12 h-28 sm:h-36 rounded-t-sm flex items-center justify-center overflow-hidden"
                style={{
                  background: `linear-gradient(90deg, 
                    rgba(0,0,0,0.2) 0%, 
                    #8b2500 10%, 
                    #8b2500 90%, 
                    rgba(0,0,0,0.15) 100%
                  )`,
                  boxShadow: hoveredIndex === NAV_LINKS.length 
                    ? "0 -4px 12px rgba(26,20,16,0.3), inset 0 1px 0 rgba(255,255,255,0.1)"
                    : "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.2)",
                }}
              >
                {/* Leather texture */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 2px,
                      rgba(0,0,0,0.15) 2px,
                      rgba(0,0,0,0.15) 3px
                    )`,
                  }}
                />
                
                {/* Gold foil text */}
                <span
                  className="text-xs sm:text-sm font-display font-semibold tracking-wide"
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    transform: "rotate(180deg)",
                    color: "#f5f0e6",
                    textShadow: "0 1px 1px rgba(0,0,0,0.4)",
                  }}
                >
                  CV
                </span>
                
                {/* Gold decoration */}
                <div 
                  className="absolute top-3 left-1/2 -translate-x-1/2 w-6 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, #d4a574, transparent)" }}
                />
                <div 
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 w-6 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, #8b2500, transparent)" }}
                />
              </div>
            </motion.button>
          </div>
          
          {/* Shelf surface - darker */}
          <div 
            className="h-3 rounded-b-sm mx-auto"
            style={{
              background: "linear-gradient(180deg, #1a1310 0%, #2a1d14 50%, #1a1310 100%)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)",
              width: `${(NAV_LINKS.length + 1) * 52 + 8}px`,
              maxWidth: "100%",
            }}
          />
        </div>
      </motion.nav>

      <ResumeLightbox open={resumeOpen} onOpenChange={setResumeOpen} />
    </>
  );
}
