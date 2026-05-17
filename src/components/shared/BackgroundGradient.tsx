import { motion } from 'framer-motion';

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
