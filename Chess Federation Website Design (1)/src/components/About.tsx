import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Target, Eye, Crown, Shield, Landmark } from 'lucide-react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const timeline = [
    { year: '2013', title: 'Foundation', description: 'Establishment of ACP Bangladesh - Dinajpur Branch', icon: '♔' },
    { year: '2015', title: 'First Tournament', description: 'Successfully organized district-level championship', icon: '♕' },
    { year: '2017', title: 'National Recognition', description: 'Officially recognized by Bangladesh Chess Federation', icon: '♖' },
    { year: '2020', title: 'Digital Era', description: 'Launched online training and tournaments', icon: '♗' },
    { year: '2025', title: 'Current Legacy', description: 'Leading chess development in northern Bangladesh', icon: '♚' },
  ];

  return (
    <section id="about" ref={ref} className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Animated Logo */}
      <motion.div
        className="absolute top-10 right-10 opacity-5 dark:opacity-10 text-9xl pointer-events-none select-none"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        ♔
      </motion.div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Crown className="w-10 h-10 text-purple-600 dark:text-purple-400" />
            <h2 className="text-4xl md:text-5xl text-gray-900 dark:text-white">
              About Our <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-amber-500 bg-clip-text text-transparent">Federation</span>
            </h2>
          </motion.div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Empowering chess players across Dinajpur district with world-class training, 
            competitive tournaments, and a vibrant community
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="relative group"
          >
            <div className="glass-royal rounded-2xl p-8 hover:border-purple-500 dark:hover:border-purple-400 gel-transition h-full royal-glow">
              <Target className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-3xl text-gray-900 dark:text-white mb-4">Our Mission</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To promote chess as a strategic sport and mental discipline across all age groups 
                in Dinajpur, nurturing talent from grassroots to professional levels through 
                structured training, regular tournaments, and community engagement.
              </p>
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-amber-500 rounded-b-xl shimmer-effect"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="relative group"
          >
            <div className="glass-royal rounded-2xl p-8 hover:border-purple-500 dark:hover:border-purple-400 gel-transition h-full royal-glow">
              <Eye className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-3xl text-gray-900 dark:text-white mb-4">Our Vision</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To establish Dinajpur as a leading chess hub in Bangladesh, producing national 
                and international champions while making chess accessible to every student, 
                professional, and enthusiast in our region.
              </p>
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-amber-500 rounded-b-xl shimmer-effect"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        </div>

        {/* Our Journey Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-3xl md:text-4xl text-center text-gray-900 dark:text-white mb-12">
            Our <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-amber-500 bg-clip-text text-transparent">Journey</span>
          </h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-600 via-blue-600 to-amber-500 transform -translate-x-1/2 hidden md:block liquid-morph" />
            
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8 + index * 0.2 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="glass-royal rounded-xl p-6 shadow-lg hover:border-purple-500 dark:hover:border-purple-400 gel-transition"
                  >
                    <div className="text-purple-600 dark:text-purple-400 mb-2">{item.year}</div>
                    <h4 className="text-xl text-gray-900 dark:text-white mb-2">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                  </motion.div>
                </div>

                {/* Chess Piece Icon */}
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl shadow-lg border-4 border-white dark:border-gray-900 z-10 hidden md:flex royal-glow"
                >
                  {item.icon}
                </motion.div>

                {/* Empty space for opposite side */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
