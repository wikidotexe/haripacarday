import { useMemo } from 'react';

const GLYPHS = ['💗', '💖', '💕', '🌸', '✨', '💜'];

type Petal = {
  left: number;
  delay: number;
  duration: number;
  size: number;
  glyph: string;
  peak: number;
  spin: number;
};

export default function FloatingHearts({ count = 18 }: { count?: number }) {
  const petals = useMemo<Petal[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: (i * 100) / count + Math.random() * 4,
        delay: Math.random() * 18,
        duration: 16 + Math.random() * 14,
        size: 12 + Math.random() * 20,
        glyph: GLYPHS[i % GLYPHS.length],
        peak: 0.25 + Math.random() * 0.4,
        spin: Math.random() * 80 - 40,
      })),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {petals.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-[-10vh] select-none"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animation: `floatUp ${p.duration}s linear ${p.delay}s infinite`,
            ['--peak' as string]: p.peak,
            ['--spin' as string]: `${p.spin}deg`,
          }}
        >
          {p.glyph}
        </span>
      ))}
    </div>
  );
}
