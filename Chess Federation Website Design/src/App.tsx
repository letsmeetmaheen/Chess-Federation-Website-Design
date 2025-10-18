import { useState } from 'react';
import { Toaster } from './components/ui/sonner';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';

// Public Website Components
import Header from './components/Header';
import Hero from './components/Hero';
import StatsCounter from './components/StatsCounter';
import About from './components/About';
import Committee from './components/Committee';
import Events from './components/Events';
import Rankings from './components/Rankings';
import Gallery from './components/Gallery';
import Practice from './components/Practice';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Admin Components
import Login from './admin/Login';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import MembersPage from './admin/MembersPage';
import EventsPage from './admin/EventsPage';
import EventDetailPage from './admin/EventDetailPage';
import RegistrationsPage from './admin/RegistrationsPage';
import PlayersPage from './admin/PlayersPage';
import GalleryPage from './admin/GalleryPage';
import AnnouncementsPage from './admin/AnnouncementsPage';
import PuzzlesPage from './admin/PuzzlesPage';
import SettingsPage from './admin/SettingsPage';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState<string>('home');

  // List of admin pages
  const adminPages = ['admin', 'dashboard', 'members', 'events', 'registrations', 'players', 'gallery', 'announcements', 'puzzles', 'settings'];

  // Render public website
  if (currentPage === 'home' || !adminPages.includes(currentPage)) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <main>
          <Hero />
          <StatsCounter />
          <About />
          <Committee />
          <Events />
          <Rankings />
          <Gallery />
          <Practice />
          <Contact />
        </main>
        <Footer />
        
        {/* Admin Access Button */}
        <button
          onClick={() => setCurrentPage('admin')}
          className="fixed bottom-4 left-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all z-50 text-sm"
        >
          Admin Login
        </button>
      </div>
    );
  }

  // Render admin panel - redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={() => setCurrentPage('dashboard')} />;
  }

  // Render admin dashboard
  const renderAdminPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'members':
        return <MembersPage />;
      case 'events':
        return <EventsPage />;
      case 'registrations':
        return <RegistrationsPage />;
      case 'players':
        return <PlayersPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'announcements':
        return <AnnouncementsPage />;
      case 'puzzles':
        return <PuzzlesPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <AdminLayout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderAdminPage()}
    </AdminLayout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
        <Toaster />
      </DataProvider>
    </AuthProvider>
  );
}
