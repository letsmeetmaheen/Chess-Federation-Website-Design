import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Trophy,
  Image,
  Newspaper,
  Brain,
  Settings,
  LogOut,
  Menu,
  X,
  Crown,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

interface AdminLayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function AdminLayout({ children, currentPage, onNavigate }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const { registrations } = useData();
  
  const pendingCount = registrations.filter(r => r.status === 'pending').length;

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'members', label: 'Committee Members', icon: Users },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'registrations', label: 'Registrations', icon: Users, badge: true },
    { id: 'players', label: 'Players', icon: Trophy },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'announcements', label: 'Announcements', icon: Newspaper },
    { id: 'puzzles', label: 'Practice Zone', icon: Brain },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-blue-950">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed left-0 top-0 bottom-0 w-72 glass-royal border-r border-purple-500/30 z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Logo */}
              <div className="flex items-center gap-3 mb-8">
                <Crown className="w-8 h-8 text-amber-400 royal-glow" />
                <div>
                  <h2 className="text-white">Admin Panel</h2>
                  <p className="text-xs text-gray-400">ACP Dinajpur</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    whileHover={{ x: 4 }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg gel-transition relative ${
                      currentPage === item.id
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white royal-glow'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                    {item.badge && pendingCount > 0 && (
                      <span className="ml-auto px-2 py-0.5 bg-amber-500 text-white text-xs rounded-full">
                        {pendingCount}
                      </span>
                    )}
                    {currentPage === item.id && !item.badge && (
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    )}
                  </motion.button>
                ))}

                <motion.button
                  onClick={logout}
                  whileHover={{ x: 4 }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 gel-transition mt-6"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </motion.button>
              </nav>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-72' : 'ml-0'} gel-transition`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-40 glass-royal border-b border-purple-500/30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-white/5 text-gray-400"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
              <h1 className="text-2xl text-white">
                {menuItems.find((item) => item.id === currentPage)?.label || 'Dashboard'}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  logout();
                  onNavigate('home');
                }}
                className="px-4 py-2 rounded-lg glass-purple text-purple-300 hover:text-purple-200 gel-transition"
              >
                View Website
              </motion.button>
              <div className="flex items-center gap-3 px-4 py-2 rounded-lg glass-purple">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white royal-glow">
                  {user?.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm text-white">{user?.name}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
