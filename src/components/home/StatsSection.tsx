import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ParticleBackground } from '../shared/ParticleBackground';

interface Stat {
  label: string;
  value: number;
  suffix: string;
  color: string;
}

const StatsSection = (): React.JSX.Element => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats: Stat[] = [
    { label: 'Annual Visitors', value: 500000, suffix: '+', color: 'from-blue-400 to-indigo-600' },
    { label: 'Heritages', value: 50, suffix: '+', color: 'from-purple-400 to-pink-600' },
    { label: 'Customer Satisfaction', value: 98, suffix: '%', color: 'from-green-500 to-teal-700' },
    { label: 'Booking Time Reduced', value: 75, suffix: '%', color: 'from-yellow-400 to-orange-500' },
  ];

  return (
    <section ref={ref} className="relative py-12 overflow-hidden sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
      <ParticleBackground count={20} />
      <div className="container relative z-10 px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <StatItem key={stat.label} stat={stat} inView={inView} delay={index * 0.2} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

interface StatItemProps {
  stat: Stat;
  inView: boolean;
  delay: number;
}

const StatItem = ({ stat, inView, delay }: StatItemProps): React.JSX.Element => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
      className="relative group"
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-lg sm:rounded-xl lg:rounded-2xl opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300`}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
      />
      <motion.div
        className="relative flex flex-col items-center justify-center h-full p-3 transition-all duration-300 bg-white rounded-lg shadow-md sm:p-4 md:p-5 lg:p-6 sm:shadow-lg lg:shadow-xl bg-opacity-80 backdrop-blur-sm sm:rounded-xl lg:rounded-2xl group-hover:shadow-lg sm:group-hover:shadow-xl lg:group-hover:shadow-2xl"
        whileHover={{ scale: 1.03 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.8, delay: delay + 0.2, ease: 'easeOut' }}
          className="text-center"
        >
          <motion.h2
            className={`mb-1 sm:mb-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}
            animate={{ opacity: [1, 0.8, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          >
            <CountUp end={stat.value} suffix={stat.suffix} duration={2} />
          </motion.h2>
          <p className="text-xs font-medium text-gray-700 sm:text-sm md:text-base lg:text-lg">{stat.label}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

interface CountUpProps {
  end: number;
  suffix: string;
  duration: number;
}

const CountUp = ({ end, suffix, duration }: CountUpProps): React.JSX.Element => {
  const [count, setCount] = React.useState(0);
  const rafRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        rafRef.current = window.requestAnimationFrame(step);
      }
    };
    rafRef.current = window.requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [end, duration]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export default StatsSection;
