import { motion } from 'framer-motion';

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
