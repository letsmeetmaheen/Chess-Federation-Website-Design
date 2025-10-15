import { useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Users, Trophy, Calendar, Award } from 'lucide-react';

interface StatProps {
  icon: React.ReactNode;
  end: number;
  label: string;
  suffix?: string;
  delay?: number;
}

function StatCard({ icon, end, label, suffix = '', delay = 0 }: StatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, duration: 0.5, type: 'spring' }}
      className="relative group"
    >
      <div className="glass-royal rounded-2xl p-8 shadow-xl hover:shadow-2xl gel-transition overflow-hidden royal-glow">
        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-400/0 via-purple-400/20 to-blue-400/0 liquid-morph"
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 3, repeat: Infinity, delay }}
        />
        
        <div className="relative z-10">
          <motion.div
            className="inline-flex p-4 rounded-xl bg-gradient-to-br from-purple-600 via-blue-600 to-purple-600 text-white mb-4 shadow-lg royal-glow elastic-bounce"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            {icon}
          </motion.div>
          
          <motion.div
            className="text-5xl text-gray-900 dark:text-white mb-2 perspective-1000"
            key={count}
          >
            {count}{suffix}
          </motion.div>
          
          <p className="text-gray-600 dark:text-gray-400">{label}</p>
        </div>

        {/* Hover Accent */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-amber-500 shimmer-effect"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

export default function StatsCounter() {
  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      end: 1250,
      suffix: '+',
      label: 'Registered Players',
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      end: 87,
      suffix: '+',
      label: 'Tournaments Organized',
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      end: 12,
      suffix: '+',
      label: 'Years of Service',
    },
    {
      icon: <Award className="w-8 h-8" />,
      end: 342,
      suffix: '+',
      label: 'Awards Won',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-gray-900 dark:text-white mb-4">
            Our Impact in <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-amber-500 bg-clip-text text-transparent">Numbers</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Building a stronger chess community in Dinajpur
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
