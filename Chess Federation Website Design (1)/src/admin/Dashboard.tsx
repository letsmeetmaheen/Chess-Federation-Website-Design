import { motion } from 'motion/react';
import { Users, Calendar, Trophy, Image, TrendingUp, Plus } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { getStats } = useData();
  const stats = getStats();

  const statCards = [
    {
      title: 'Total Players',
      value: stats.totalPlayers,
      icon: Trophy,
      color: 'from-purple-600 to-purple-700',
      change: '+12%',
    },
    {
      title: 'Total Tournaments',
      value: stats.totalTournaments,
      icon: Calendar,
      color: 'from-blue-600 to-blue-700',
      change: '+8%',
    },
    {
      title: 'Pending Registrations',
      value: stats.pendingRegistrations,
      icon: Users,
      color: 'from-amber-600 to-amber-700',
      change: 'needs review',
      highlight: stats.pendingRegistrations > 0,
    },
    {
      title: 'Gallery Items',
      value: stats.galleryItems,
      icon: Image,
      color: 'from-green-600 to-green-700',
      change: '+15%',
    },
  ];

  const quickActions = [
    { label: 'Review Registrations', page: 'registrations', icon: Users },
    { label: 'Add New Event', page: 'events', icon: Calendar },
    { label: 'Add Committee Member', page: 'members', icon: Users },
    { label: 'Upload to Gallery', page: 'gallery', icon: Image },
  ];

  const chartData = [
    { month: 'Jan', participants: 45 },
    { month: 'Feb', participants: 52 },
    { month: 'Mar', participants: 61 },
    { month: 'Apr', participants: 58 },
    { month: 'May', participants: 70 },
    { month: 'Jun', participants: 85 },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-royal border-purple-500/30 hover:border-purple-500/50 gel-transition royal-glow overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-2">{stat.title}</p>
                    <h3 className="text-3xl text-white mb-2">{stat.value}</h3>
                    <div className={`flex items-center gap-1 text-sm ${stat.highlight ? 'text-amber-400' : 'text-green-400'}`}>
                      <TrendingUp className="w-4 h-4" />
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} royal-glow`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-royal border-purple-500/30 royal-glow">
            <CardHeader>
              <CardTitle className="text-white">Tournament Participation Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.2)" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(26, 18, 53, 0.95)',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="participants" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass-royal border-purple-500/30 royal-glow">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Button
                    onClick={() => onNavigate(action.page)}
                    variant="outline"
                    className="w-full justify-start glass-purple border-purple-500/30 hover:border-purple-500 text-gray-300 hover:text-white gel-transition"
                  >
                    <action.icon className="w-5 h-5 mr-3" />
                    {action.label}
                  </Button>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="glass-royal border-purple-500/30 royal-glow">
          <CardHeader>
            <CardTitle className="text-white">Recent Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Aminul Rahman', event: 'Friday Night Blitz', time: '2 hours ago' },
                { name: 'Fatima Khatun', event: 'District Championship', time: '5 hours ago' },
                { name: 'Karim Hossain', event: 'Inter-School Rapid', time: '1 day ago' },
              ].map((registration, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg glass-purple hover:border-purple-500 gel-transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white royal-glow">
                      {registration.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white">{registration.name}</p>
                      <p className="text-sm text-gray-400">{registration.event}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{registration.time}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
