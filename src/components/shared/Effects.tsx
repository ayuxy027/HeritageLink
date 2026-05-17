import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  BackgroundGradient                                                */
/* ------------------------------------------------------------------ */
export function BackgroundGradient() {
  return (
    <motion.div
      className="absolute inset-0 opacity-20"
      animate={{
        background: [
          'radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(200,200,255,0.3) 100%)',
          'radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(255,200,200,0.3) 100%)',
          'radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(200,255,200,0.3) 100%)',
        ],
      }}
      transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  FloatingIcon                                                      */
/* ------------------------------------------------------------------ */
interface FloatingIconProps {
  Icon: LucideIcon;
  size: number;
  top: string;
  left: string;
  duration?: number;
  x?: number[];
  y?: number[];
  rotate?: number[];
  scale?: number[];
}

export function FloatingIcon({ Icon, size, top, left, duration = 5, x, rotate, scale }: FloatingIconProps) {
  return (
    <motion.div
      className="absolute text-white opacity-70"
      style={{ top, left }}
      animate={{
        y: [0, -10, 0],
        x,
        rotate,
        scale,
      }}
      transition={{
        duration,
        ease: 'easeInOut',
        times: [0, 0.5, 1],
        repeat: Infinity,
      }}
    >
      <Icon size={size} />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Meteor                                                            */
/* ------------------------------------------------------------------ */
interface MeteorProps {
  size: number;
  duration: number;
  delay: number;
  color?: string;
}

export function Meteor({ size, duration, delay, color = 'rgba(255,255,255,0.5)' }: MeteorProps) {
  return (
    <motion.div
      className="absolute rounded-full shadow-lg"
      style={{
        width: size,
        height: size,
        boxShadow: `0 0 ${size * 2}px ${size / 2}px ${color}`,
        background: color,
      }}
      initial={{ top: '-5%', left: '105%' }}
      animate={{
        top: '105%',
        left: '-5%',
        transition: { duration, delay, repeat: Infinity, repeatDelay: 3 },
      }}
    />
  );
}
