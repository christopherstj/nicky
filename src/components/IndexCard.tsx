"use client";

import { motion } from "framer-motion";

interface IndexCardProps {
  title: string;
  description?: string;
  className?: string;
  rotation?: number;
  index?: number;
  variant?: "torn" | "folded" | "stained";
}

export default function IndexCard({
  title,
  description,
  className = "",
  rotation = 0,
  index = 0,
  variant = "torn",
}: IndexCardProps) {
  // Different edge effects for variety
  const edgeStyles = {
    torn: {
      clipPath: "polygon(2% 0%, 98% 2%, 100% 97%, 3% 100%)",
      borderRadius: "2px",
    },
    folded: {
      clipPath: "polygon(0% 0%, 85% 0%, 100% 15%, 100% 100%, 0% 100%)",
      borderRadius: "1px",
    },
    stained: {
      clipPath: "polygon(0% 3%, 97% 0%, 100% 98%, 2% 100%)",
      borderRadius: "2px",
    },
  };

  const style = edgeStyles[variant];
  
  // Alternate which corner gets a fold/tear
  const variants = ["torn", "folded", "stained"] as const;
  const actualVariant = variants[index % variants.length];
  const actualStyle = edgeStyles[actualVariant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, rotate: rotation - 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.08,
        ease: "easeOut" 
      }}
      whileHover={{ 
        y: -3, 
        rotate: rotation + 0.5,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className={`relative ${className}`}
    >
      {/* Paper scrap */}
      <div 
        className="relative p-4 min-h-[100px]"
        style={{
          background: `linear-gradient(
            ${135 + (index * 30)}deg,
            var(--paper) 0%,
            var(--paper-aged) 50%,
            var(--paper-dark) 100%
          )`,
          boxShadow: `
            2px 3px 8px rgba(0, 0, 0, 0.3),
            4px 6px 16px rgba(0, 0, 0, 0.2),
            inset 0 0 30px rgba(0, 0, 0, 0.05)
          `,
          clipPath: actualStyle.clipPath,
        }}
      >
        {/* Stain/age marks */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(
              ellipse at ${30 + (index * 20) % 60}% ${20 + (index * 15) % 40}%,
              rgba(139, 37, 0, 0.15),
              transparent 50%
            )`,
          }}
        />
        
        {/* Title - in red ink */}
        <h4 
          className="font-display text-sm font-bold mb-2"
          style={{ color: "var(--ink-red)" }}
        >
          {title}
        </h4>
        
        {/* Description - faded ink */}
        {description && (
          <p 
            className="text-xs leading-relaxed"
            style={{ color: "var(--ink-faded)" }}
          >
            {description}
          </p>
        )}
        
        {/* Subtle fold/crease line */}
        {actualVariant === "folded" && (
          <div 
            className="absolute top-0 right-0 w-8 h-8 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.1) 50%)",
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
