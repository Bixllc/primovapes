import Image from "next/image";
import type { CSSProperties } from "react";

// Neon pulse + pink/teal smoke puffs drifting off the round Primo logo.
// Both animations are disabled under prefers-reduced-motion (see globals.css).
const SOURCES = [
  { x: 14, y: 20, c: "255,60,170", dx: -0.18, dy: -0.9, r: -40 },
  { x: 87, y: 30, c: "80,220,230", dx: 0.16, dy: -0.95, r: 40 },
];

export default function AnimatedLogo({ size, priority = false }: { size: number; priority?: boolean }) {
  const puffs = SOURCES.flatMap((s, si) =>
    [0, 1, 2, 3].map((i) => {
      const d = size * (0.2 + (i % 2) * 0.06);
      const style = {
        left: `${s.x}%`,
        top: `${s.y}%`,
        width: d,
        height: d,
        background: `radial-gradient(circle, rgba(${s.c},.75) 0%, rgba(${s.c},.25) 45%, rgba(${s.c},0) 70%)`,
        filter: `blur(${Math.max(2, size * 0.03)}px)`,
        "--dx": `${s.dx * size * (1 + i * 0.25)}px`,
        "--dy": `${s.dy * size * (0.8 + i * 0.15)}px`,
        "--r": `${s.r}deg`,
        "--o": 0.8,
        animation: `primoPuff ${3.6 + i * 0.4}s ease-out ${i * 0.95 + si * 0.5}s infinite`,
      } as CSSProperties;
      return <span key={`${si}-${i}`} className="logo-puff" style={style} aria-hidden />;
    }),
  );

  return (
    <div className="logo">
      <Image
        src="/assets/primo-logo.png"
        alt="Primo Vapes & Exotics"
        width={size}
        height={size}
        className="logo-img"
        priority={priority}
      />
      {puffs}
    </div>
  );
}
