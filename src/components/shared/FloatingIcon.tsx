import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

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
