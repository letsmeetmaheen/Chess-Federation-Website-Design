import { motion } from 'motion/react';
import { Crown, Sparkles, Trophy, Users } from 'lucide-react';
import { Button } from './ui/button';
import { useData } from '../contexts/DataContext';

export default function Hero() {
  const { announcements } = useData();
  
  // Get pinned announcements for the news ribbon
  const newsItems = announcements.filter(a => a.pinned && a.status === 'active');
  // Floating chess pieces animation
  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const chessPieces = [
    { icon: '♔', delay: 0, x: '10%', y: '20%', size: 'text-6xl' },
    { icon: '♕', delay: 1, x: '80%', y: '15%', size: 'text-5xl' },
    { icon: '♜', delay: 2, x: '15%', y: '70%', size: 'text-4xl' },
    { icon: '♞', delay: 1.5, x: '85%', y: '65%', size: 'text-5xl' },
    { icon: '♝', delay: 0.5, x: '50%', y: '10%', size: 'text-4xl' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-purple-950 dark:to-blue-950">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            #000 0px,
            #000 1px,
            transparent 1px,
            transparent 60px
          ),
          repeating-linear-gradient(
            90deg,
            #000 0px,
            #000 1px,
            transparent 1px,
            transparent 60px
          )`,
        }} />
      </div>

      {/* Floating Chess Pieces */}
      {chessPieces.map((piece, index) => (
        <motion.div
          key={index}
          className={`absolute ${piece.size} opacity-10 dark:opacity-20 pointer-events-none select-none`}
          style={{ left: piece.x, top: piece.y }}
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: piece.delay }}
        >
          {piece.icon}
        </motion.div>
      ))}

      {/* Breaking News Ribbon */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: 'spring' }}
        className="absolute top-20 left-0 right-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white py-2 overflow-hidden z-10 royal-glow"
      >
        <motion.div
          animate={{ x: [1000, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="whitespace-nowrap"
        >
          {newsItems.length > 0 ? (
            newsItems.map((item, index) => (
              <span key={item.id} className="mx-8">
                {index === 0 ? '🏆' : index === 1 ? '📢' : '👑'} {item.title}
              </span>
            ))
          ) : (
            <>
              <span className="mx-8">🏆 Welcome to ACP Bangladesh - Dinajpur Branch</span>
              <span className="mx-8">📢 Chess Federation of Dinajpur District</span>
              <span className="mx-8">👑 Where Every Move Shapes a Champion</span>
            </>
          )}
        </motion.div>
      </motion.div>

      <div className="container mx-auto px-4 pt-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Headline with Spotlight Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/30 to-blue-400/0 blur-3xl liquid-blob"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.h1
              className="relative text-5xl md:text-7xl text-gray-900 dark:text-white mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Where Every Move
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-amber-500 bg-clip-text text-transparent">
                  Shapes a Champion
                </span>
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-amber-500 liquid-morph"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </span>
            </motion.h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            Official Chess Federation of Dinajpur | Recognized by the National Body
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-4 justify-center mb-20"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="elastic-bounce"
            >
              <Button className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-700 hover:via-blue-700 hover:to-purple-700 text-white px-8 py-6 shadow-xl shadow-purple-600/40 relative overflow-hidden group royal-glow">
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-purple-400 via-blue-400 to-amber-400 shimmer-effect"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Join Tournament
                </span>
              </Button>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="elastic-bounce"
            >
              <Button variant="outline" className="px-8 py-6 border-2 glass-purple hover:border-purple-500 dark:hover:border-purple-400 relative group">
                <span className="relative flex items-center gap-2 text-purple-600 dark:text-purple-400">
                  <Sparkles className="w-5 h-5" />
                  Learn More
                </span>
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-amber-500"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Parallax Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
      
      {/* Floating Royal Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-20 blur-3xl liquid-blob"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-amber-400 to-purple-400 rounded-full opacity-20 blur-3xl liquid-blob"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />
    </section>
  );
}
