import { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Crown, Medal, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useData } from '../contexts/DataContext';

export default function Rankings() {
  const { players: allPlayers } = useData();
  const [sortBy, setSortBy] = useState<'rating' | 'name'>('rating');

  // Sort players by rank
  const players = [...allPlayers].sort((a, b) => a.rank - b.rank);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-8 h-8 text-amber-500" />;
      case 2:
        return <Medal className="w-8 h-8 text-gray-400" />;
      case 3:
        return <Medal className="w-8 h-8 text-amber-700" />;
      default:
        return <span className="text-2xl text-gray-600 dark:text-gray-400">{rank}</span>;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'down':
        return <TrendingUp className="w-5 h-5 text-red-500 rotate-180" />;
      default:
        return <div className="w-5 h-1 bg-gray-400 rounded" />;
    }
  };

  return (
    <section id="rankings" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2px)',
            backgroundSize: '40px 40px',
          }}
          animate={{ x: [0, 40], y: [0, 40] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-gray-900 dark:text-white mb-4">
            Player <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-amber-500 bg-clip-text text-transparent">Rankings</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Top performers in Dinajpur district
          </p>
        </motion.div>

        {/* Sort Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-8"
        >
          <button
            onClick={() => setSortBy('rating')}
            className={`px-6 py-2 rounded-full gel-transition ${
              sortBy === 'rating'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white royal-glow'
                : 'glass-purple text-gray-700 dark:text-gray-300'
            }`}
          >
            By Rating
          </button>
          <button
            onClick={() => setSortBy('name')}
            className={`px-6 py-2 rounded-full gel-transition ${
              sortBy === 'name'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white royal-glow'
                : 'glass-purple text-gray-700 dark:text-gray-300'
            }`}
          >
            By Name
          </button>
        </motion.div>

        {/* Rankings Table */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-royal rounded-2xl shadow-2xl overflow-hidden royal-glow">
            {players.map((player, index) => (
              <motion.div
                key={player.rank}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ backgroundColor: 'rgba(139, 92, 246, 0.1)' }}
                className={`flex items-center gap-6 p-6 border-b border-purple-200 dark:border-purple-700 last:border-b-0 gel-transition ${
                  player.rank <= 3 ? 'bg-gradient-to-r from-purple-50/50 via-blue-50/30 to-transparent dark:from-purple-900/10 dark:via-blue-900/10' : ''
                }`}
              >
                {/* Rank with Icon */}
                <motion.div
                  className="flex items-center justify-center w-16 h-16"
                  whileHover={{ scale: 1.2, rotate: player.rank <= 3 ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {getRankIcon(player.rank)}
                </motion.div>

                {/* Player Photo */}
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg royal-glow">
                  <ImageWithFallback
                    src={player.image}
                    alt={player.name}
                    className="w-full h-full object-cover"
                  />
                  {player.rank === 1 && (
                    <motion.div
                      className="absolute inset-0 bg-purple-500/20"
                      animate={{ opacity: [0, 0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>

                {/* Player Info */}
                <div className="flex-1">
                  <h4 className="text-xl text-gray-900 dark:text-white">
                    {player.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {player.category}
                  </p>
                </div>

                {/* Rating */}
                <div className="text-center">
                  <div className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {player.rating}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Rating</div>
                </div>

                {/* Trend */}
                <div className="flex items-center justify-center w-12">
                  {getTrendIcon(player.trend)}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Hall of Fame Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-3xl text-center text-gray-900 dark:text-white mb-12">
            <Trophy className="w-10 h-10 inline-block text-purple-600 dark:text-purple-400 mr-3" />
            Hall of <span className="bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent">Fame</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10, scale: 1.05 }}
                className="glass-royal rounded-2xl p-6 shadow-xl royal-glow"
              >
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-purple-500 royal-glow">
                  <ImageWithFallback
                    src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&sig=${index}`}
                    alt="Champion"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl text-center text-gray-900 dark:text-white mb-2">
                  Champion {2024 - index}
                </h4>
                <p className="text-center text-gray-600 dark:text-gray-400">
                  District Champion
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
