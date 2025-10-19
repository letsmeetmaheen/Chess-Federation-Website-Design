import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Cpu, Lightbulb, Zap, BookOpen, Target } from 'lucide-react';
import { Button } from './ui/button';
import ChessPuzzleGame from './ChessPuzzleGame';
import AIChessGame from './AIChessGame';

export default function Practice() {
  const [showPuzzleGame, setShowPuzzleGame] = useState(false);
  const [showAIChessGame, setShowAIChessGame] = useState(false);
  const features = [
    {
      icon: <Lightbulb className="w-12 h-12" />,
      title: 'Daily Puzzles',
      description: 'Solve tactical puzzles to sharpen your skills',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: <Cpu className="w-12 h-12" />,
      title: 'AI Practice',
      description: 'Train against advanced AI opponents',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: 'Video Lessons',
      description: 'Learn from expert instructors',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: 'Endgame Training',
      description: 'Master critical endgame positions',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  // Chess board pattern for visualization
  const ChessBoard = () => (
    <div className="w-full aspect-square max-w-md mx-auto glass-royal rounded-2xl shadow-2xl overflow-hidden border-4 border-purple-600 relative royal-glow">
      <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
        {Array.from({ length: 64 }).map((_, i) => {
          const row = Math.floor(i / 8);
          const col = i % 8;
          const isLight = (row + col) % 2 === 0;
          return (
            <motion.div
              key={i}
              className={`${isLight ? 'bg-gray-100 dark:bg-gray-700' : 'bg-gray-800 dark:bg-gray-900'}`}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(234, 179, 8, 0.3)' }}
              transition={{ duration: 0.2 }}
            />
          );
        })}
      </div>
      
      {/* Animated hint lines */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <svg className="w-full h-full">
          <motion.line
            x1="12.5%"
            y1="87.5%"
            x2="37.5%"
            y2="62.5%"
            stroke="rgb(234, 179, 8)"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle
            cx="37.5%"
            cy="62.5%"
            r="8"
            fill="rgb(234, 179, 8)"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>
      </motion.div>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {showPuzzleGame && (
          <ChessPuzzleGame onExit={() => setShowPuzzleGame(false)} />
        )}
        {showAIChessGame && (
          <AIChessGame onExit={() => setShowAIChessGame(false)} />
        )}
      </AnimatePresence>
      
      <section id="practice" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background animated chess piece */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30rem] opacity-5 dark:opacity-10 pointer-events-none select-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        ♞
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-gray-900 dark:text-white mb-4">
            <Brain className="w-12 h-12 inline-block text-purple-600 dark:text-purple-400 mr-3 mb-2" />
            Chess Practice <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-amber-500 bg-clip-text text-transparent">Zone</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Improve your game with our interactive training tools
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Interactive Chess Board */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <ChessBoard />
            
            {/* Glowing Knight Shape */}
            <motion.div
              className="absolute -bottom-10 -right-10 text-9xl opacity-20"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              ♞
            </motion.div>
          </motion.div>

          {/* Practice Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, x: 10 }}
                className="group"
              >
                <div 
                  onClick={() => {
                    if (feature.title === 'Daily Puzzles') setShowPuzzleGame(true);
                    if (feature.title === 'AI Practice') setShowAIChessGame(true);
                  }}
                  className="glass-royal rounded-xl p-6 shadow-lg hover:border-purple-500 dark:hover:border-purple-400 gel-transition cursor-pointer royal-glow"
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`p-4 rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-lg flex-shrink-0`}
                    >
                      {feature.icon}
                    </motion.div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  
                  <motion.div
                    className="h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-amber-500 mt-4 rounded shimmer-effect"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Daily Puzzle Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-royal rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden royal-glow">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/15 to-blue-400/0 shimmer-effect"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            
            <div className="relative z-10 text-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="inline-block mb-6"
              >
                <Zap className="w-16 h-16 text-purple-600 dark:text-purple-400" />
              </motion.div>
              
              <h3 className="text-3xl md:text-4xl text-gray-900 dark:text-white mb-4">
                Today's Challenge
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Solve the daily puzzle and climb the leaderboard
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="elastic-bounce">
                  <Button 
                    onClick={() => setShowPuzzleGame(true)}
                    className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-700 hover:via-blue-700 hover:to-purple-700 text-white px-8 py-6 shadow-xl royal-glow"
                  >
                    <Target className="w-5 h-5 mr-2" />
                    Start Puzzle
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="elastic-bounce">
                  <Button 
                    variant="outline" 
                    className="px-8 py-6 border-2 glass-purple border-purple-600 text-purple-600 dark:text-purple-400 hover:border-purple-500"
                    onClick={() => setShowAIChessGame(true)}
                  >
                    <Cpu className="w-5 h-5 mr-2" />
                    Practice with AI
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
}
