import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const StatsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { label: "Annual Visitors", value: 500000, suffix: "+", color: "from-blue-400 to-indigo-600" },
    { label: "Heritages", value: 50, suffix: "+", color: "from-purple-400 to-pink-600" },
    { label: "Customer Satisfaction", value: 98, suffix: "%", color: "from-green-500 to-teal-700" },
    { label: "Booking Time Reduced", value: 75, suffix: "%", color: "from-yellow-400 to-orange-500" },
  ];

  return (
    <section ref={ref} className="relative py-24 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
      <ParticleBackground />
      <div className="container relative z-10 px-4 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <StatItem key={index} stat={stat} inView={inView} delay={index * 0.2} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const StatItem = ({ stat, inView, delay }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className="relative group"
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl opacity-75 blur-xl group-hover:opacity-100 transition-opacity duration-300`}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div 
        className="relative flex flex-col items-center justify-center h-full p-6 transition-all duration-300 bg-white shadow-xl bg-opacity-80 backdrop-blur-sm rounded-2xl hover:shadow-2xl"
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.8, delay: delay + 0.2, ease: "easeOut" }}
          className="text-center"
        >
          <motion.h2 
            className={`mb-2 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}
            animate={{ opacity: [1, 0.8, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          >
            <CountUp end={stat.value} suffix={stat.suffix} duration={2} />
          </motion.h2>
          <p className="text-lg font-medium text-gray-700">{stat.label}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const CountUp = ({ end, suffix, duration }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let startTimestamp;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return (
    <span>{count.toLocaleString()}{suffix}</span>
  );
};

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full opacity-20"
          style={{
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default StatsSection;