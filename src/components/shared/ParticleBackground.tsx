import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  width: number;
  height: number;
  top: string;
  left: string;
  duration: number;
}

interface ParticleBackgroundProps {
  count?: number;
  colorClass?: string;
}

export function ParticleBackground({ count = 30, colorClass = 'bg-white' }: ParticleBackgroundProps) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      width: Math.random() * 4 + 1,
      height: Math.random() * 4 + 1,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 5 + 5,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full opacity-20 ${colorClass}`}
          style={{
            width: p.width,
            height: p.height,
            top: p.top,
            left: p.left,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
