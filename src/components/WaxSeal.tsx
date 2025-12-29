"use client";

import { motion } from "framer-motion";

interface WaxSealProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  initial?: string;
}

const sizes = {
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-24 h-24",
};

const initialSizes = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-4xl",
};

export default function WaxSeal({ size = "md", className = "", initial = "N" }: WaxSealProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.05, rotate: 5 }}
      transition={{ type: "spring", damping: 15 }}
      className={`
        ${sizes[size]}
        ${className}
        relative rounded-full flex items-center justify-center
        cursor-pointer select-none
      `}
      style={{
        background: "radial-gradient(circle at 30% 30%, #8b2500, #6b1a00 50%, #4a1000)",
        boxShadow: `
          inset 0 2px 4px rgba(255, 255, 255, 0.15),
          inset 0 -2px 4px rgba(0, 0, 0, 0.5),
          2px 3px 10px rgba(0, 0, 0, 0.6),
          4px 6px 20px rgba(0, 0, 0, 0.4)
        `,
      }}
    >
      {/* Wax drip texture */}
      <div
        className="absolute inset-0 rounded-full opacity-30"
        style={{
          background: `
            radial-gradient(ellipse at 20% 80%, rgba(0,0,0,0.3), transparent 40%),
            radial-gradient(ellipse at 70% 20%, rgba(255,255,255,0.15), transparent 30%)
          `,
        }}
      />
      
      {/* Initial letter */}
      <span
        className={`
          ${initialSizes[size]}
          font-display font-bold text-[#e8dcc8]
          relative z-10
        `}
        style={{
          textShadow: "0 1px 3px rgba(0,0,0,0.6)",
          fontFamily: "var(--font-display)",
        }}
      >
        {initial}
      </span>
      
      {/* Embossed ring */}
      <div
        className="absolute inset-2 rounded-full border-2 opacity-20"
        style={{
          borderColor: "rgba(255,255,255,0.3)",
          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.3)",
        }}
      />
    </motion.div>
  );
}

