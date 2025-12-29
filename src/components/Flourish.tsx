"use client";

interface FlourishProps {
  variant?: "divider" | "corner-tl" | "corner-tr" | "corner-bl" | "corner-br" | "ornament";
  className?: string;
  color?: string;
}

export default function Flourish({ 
  variant = "divider", 
  className = "",
  color = "currentColor" 
}: FlourishProps) {
  if (variant === "divider") {
    return (
      <svg
        viewBox="0 0 400 30"
        className={`w-full h-auto ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 15 Q50 5, 100 15 T200 15 T300 15 T400 15"
          stroke={color}
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
        <circle cx="200" cy="15" r="3" fill={color} opacity="0.6" />
        <path
          d="M170 15 Q185 8, 200 15 Q215 22, 230 15"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M150 15 Q175 3, 200 15 Q225 27, 250 15"
          stroke={color}
          strokeWidth="1"
          fill="none"
          opacity="0.3"
        />
      </svg>
    );
  }

  if (variant === "ornament") {
    return (
      <svg
        viewBox="0 0 60 60"
        className={`w-8 h-8 ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30 5 Q35 15, 30 20 Q25 15, 30 5"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M30 55 Q35 45, 30 40 Q25 45, 30 55"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M5 30 Q15 35, 20 30 Q15 25, 5 30"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M55 30 Q45 35, 40 30 Q45 25, 55 30"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        <circle cx="30" cy="30" r="4" stroke={color} strokeWidth="1" fill="none" opacity="0.4" />
        <circle cx="30" cy="30" r="8" stroke={color} strokeWidth="0.5" fill="none" opacity="0.3" />
      </svg>
    );
  }

  // Corner variants
  const cornerPaths: Record<string, { path: string; transform?: string }> = {
    "corner-tl": {
      path: "M5 40 Q5 5, 40 5 M10 30 Q10 10, 30 10 M15 22 Q15 15, 22 15",
    },
    "corner-tr": {
      path: "M5 40 Q5 5, 40 5 M10 30 Q10 10, 30 10 M15 22 Q15 15, 22 15",
      transform: "scale(-1, 1) translate(-50, 0)",
    },
    "corner-bl": {
      path: "M5 40 Q5 5, 40 5 M10 30 Q10 10, 30 10 M15 22 Q15 15, 22 15",
      transform: "scale(1, -1) translate(0, -50)",
    },
    "corner-br": {
      path: "M5 40 Q5 5, 40 5 M10 30 Q10 10, 30 10 M15 22 Q15 15, 22 15",
      transform: "scale(-1, -1) translate(-50, -50)",
    },
  };

  const corner = cornerPaths[variant];
  if (!corner) return null;

  return (
    <svg
      viewBox="0 0 50 50"
      className={`w-12 h-12 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform={corner.transform}>
        <path
          d={corner.path}
          stroke={color}
          strokeWidth="1"
          fill="none"
          opacity="0.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

