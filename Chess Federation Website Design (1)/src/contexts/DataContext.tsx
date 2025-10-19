import { createContext, useContext, useState, ReactNode } from 'react';

export interface CommitteeMember {
  id: string;
  name: string;
  title: string;
  photo?: string;
  bio?: string;
  contact?: string;
  social?: { facebook?: string; twitter?: string };
}

export interface Tournament {
  id: string;
  title: string;
  category: 'Blitz' | 'Rapid' | 'Classical';
  date: string;
  endDate?: string;
  location: string;
  participants: number; // Maximum capacity
  image: string;
  description?: string;
  entryFee?: string;
  registrationLink?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  countdown: { days: number; hours: number; minutes: number };
}

export interface Player {
  id: string;
  rank: number;
  name: string;
  rating: number;
  category: string;
  trend: 'up' | 'down' | 'stable';
  image: string;
  fideId?: string;
  club?: string;
  bio?: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  caption?: string;
  tag: string;
  album?: string;
  visible: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
  pinned: boolean;
  status: 'active' | 'inactive';
}

export interface Puzzle {
  id: string;
  title: string;
  fen?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  answerLink?: string;
}

export interface Registration {
  id: string;
  tournamentId: string;
  tournamentTitle: string;
  playerName: string;
  email: string;
  phone: string;
  category: string;
  rating?: string;
  status: 'pending' | 'approved' | 'rejected';
  registeredAt: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  logo?: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  social: {
    facebook?: string;
    youtube?: string;
    whatsapp?: string;
  };
}

interface DataContextType {
  // Committee
  committeeMembers: CommitteeMember[];
  addCommitteeMember: (member: Omit<CommitteeMember, 'id'>) => void;
  updateCommitteeMember: (id: string, member: Partial<CommitteeMember>) => void;
  deleteCommitteeMember: (id: string) => void;
  
  // Tournaments
  tournaments: Tournament[];
  addTournament: (tournament: Omit<Tournament, 'id'>) => void;
  updateTournament: (id: string, tournament: Partial<Tournament>) => void;
  deleteTournament: (id: string) => void;
  
  // Players
  players: Player[];
  addPlayer: (player: Omit<Player, 'id'>) => void;
  updatePlayer: (id: string, player: Partial<Player>) => void;
  deletePlayer: (id: string) => void;
  reorderPlayers: (players: Player[]) => void;
  
  // Gallery
  galleryItems: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  
  // Announcements
  announcements: Announcement[];
  addAnnouncement: (announcement: Omit<Announcement, 'id'>) => void;
  updateAnnouncement: (id: string, announcement: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;
  
  // Puzzles
  puzzles: Puzzle[];
  addPuzzle: (puzzle: Omit<Puzzle, 'id'>) => void;
  updatePuzzle: (id: string, puzzle: Partial<Puzzle>) => void;
  deletePuzzle: (id: string) => void;
  
  // Settings
  settings: SiteSettings;
  updateSettings: (settings: Partial<SiteSettings>) => void;
  
  // Registrations
  registrations: Registration[];
  addRegistration: (registration: Omit<Registration, 'id' | 'registeredAt' | 'status'>) => void;
  updateRegistration: (id: string, registration: Partial<Registration>) => void;
  deleteRegistration: (id: string) => void;
  approveRegistration: (id: string) => void;
  rejectRegistration: (id: string) => void;
  
  // Stats
  getStats: () => {
    totalPlayers: number;
    totalTournaments: number;
    activeMembers: number;
    galleryItems: number;
    pendingRegistrations: number;
  };
  
  // Get approved participant count for a tournament
  getApprovedCount: (tournamentId: string) => number;
  
  // Get all registrations for a specific tournament
  getTournamentRegistrations: (tournamentId: string) => Registration[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  // Initialize with default data
  const [committeeMembers, setCommitteeMembers] = useState<CommitteeMember[]>([
    { id: '1', name: 'মোঃ আরিফ আখতার', title: 'সভাপতি' },
    { id: '2', name: 'মোঃ নাদিম', title: 'সহ-সভাপতি (১)' },
    { id: '3', name: 'আলী হাসান আহম্মেদ', title: 'সহ-সভাপতি (২)' },
    { id: '4', name: 'মোঃ আকমল হোসেন', title: 'সাধারণ সম্পাদক' },
    { id: '5', name: 'সাইফুল আলম রেজা', title: 'যুগ্ম সম্পাদক (১)' },
    { id: '6', name: 'মোঃ আলী হাসান', title: 'যুগ্ম সম্পাদক (২)' },
    { id: '7', name: 'এ্যাডঃ মীর আব্দুর রাজ্জাক', title: 'সাংগঠনিক সম্পাদক' },
    { id: '8', name: 'ফেরদৌস আহমেদ', title: 'কোষাধ্যক্ষ' },
    { id: '9', name: 'মীর মোক্তার আলী (মুক্তি)', title: 'প্রচার সম্পাদক' },
    { id: '10', name: 'মোস্তাফিজুর রহমান রাজু', title: 'দপ্তর সম্পাদক' },
    { id: '11', name: 'মোঃ শাহ আলম', title: 'সদস্য' },
    { id: '12', name: 'মোঃ লোকমান হোসেন', title: 'সদস্য' },
    { id: '13', name: 'নুরুজ্জামান শাহিন', title: 'সদস্য' },
    { id: '14', name: 'মোঃ নুরুল ইসলাম তৈয়ব', title: 'সদস্য' },
    { id: '15', name: 'মোঃ লেলিন আজাদ', title: 'সদস্য' },
    { id: '16', name: 'মোল্লা শফিক', title: 'সদস্য' },
    { id: '17', name: 'বেলাল হোসেন বাবু', title: 'সদস্য' },
  ]);

  const [tournaments, setTournaments] = useState<Tournament[]>([
    {
      id: '1',
      title: 'Dinajpur District Championship 2025',
      category: 'Classical',
      date: 'November 15, 2025',
      location: 'Dinajpur Town Hall',
      participants: 128,
      image: 'https://images.unsplash.com/photo-1687862528147-0ecb1aa4b81d?w=800',
      countdown: { days: 214, hours: 12, minutes: 45 },
      status: 'upcoming',
    },
    {
      id: '2',
      title: 'Friday Night Blitz Tournament',
      category: 'Blitz',
      date: 'October 25, 2025',
      location: 'ACP Hall',
      participants: 64,
      image: 'https://images.unsplash.com/photo-1741790009218-d0cc7440a3c2?w=800',
      countdown: { days: 10, hours: 18, minutes: 30 },
      status: 'upcoming',
    },
  ]);

  const [players, setPlayers] = useState<Player[]>([
    { id: '1', rank: 1, name: 'Rakibul Islam', rating: 2145, category: 'Open', trend: 'up', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
    { id: '2', rank: 2, name: 'Farzana Ahmed', rating: 2098, category: 'Women', trend: 'stable', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' },
    { id: '3', rank: 3, name: 'Shahidul Haque', rating: 2076, category: 'Open', trend: 'up', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200' },
  ]);

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([
    { id: '1', url: 'https://images.unsplash.com/photo-1687862528147-0ecb1aa4b81d?w=800', title: 'District Championship 2024', tag: 'Event', visible: true },
    { id: '2', url: 'https://images.unsplash.com/photo-1741790009218-d0cc7440a3c2?w=600', title: 'Young Champions', tag: 'Event', visible: true },
  ]);

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    { id: '1', title: 'New Tournament Registration Opens Soon!', description: 'Registration opens next week', date: new Date().toISOString(), pinned: true, status: 'active' },
    { id: '2', title: 'Join Our Facebook Blitz Connect', description: 'Connect with players online', date: new Date().toISOString(), pinned: true, status: 'active' },
  ]);

  const [puzzles, setPuzzles] = useState<Puzzle[]>([
    { id: '1', title: 'Daily Puzzle #1', difficulty: 'medium' },
  ]);

  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'ACP Bangladesh - Dinajpur Branch',
    tagline: 'Where Strategy Meets Passion',
    contact: {
      email: 'info@acpdinajpur.org',
      phone: '+880 1XXX-XXXXXX',
      address: 'ACP Hall, Dinajpur Town, Bangladesh',
    },
    social: {
      facebook: '#',
      youtube: '#',
      whatsapp: '#',
    },
  });

  // Start with empty registrations - only real user submissions should appear
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  // Committee CRUD
  const addCommitteeMember = (member: Omit<CommitteeMember, 'id'>) => {
    const newMember = { ...member, id: Date.now().toString() };
    setCommitteeMembers([...committeeMembers, newMember]);
  };

  const updateCommitteeMember = (id: string, member: Partial<CommitteeMember>) => {
    setCommitteeMembers(committeeMembers.map(m => m.id === id ? { ...m, ...member } : m));
  };

  const deleteCommitteeMember = (id: string) => {
    setCommitteeMembers(committeeMembers.filter(m => m.id !== id));
  };

  // Tournament CRUD
  const addTournament = (tournament: Omit<Tournament, 'id'>) => {
    const newTournament = { ...tournament, id: Date.now().toString() };
    setTournaments([...tournaments, newTournament]);
  };

  const updateTournament = (id: string, tournament: Partial<Tournament>) => {
    setTournaments(tournaments.map(t => t.id === id ? { ...t, ...tournament } : t));
  };

  const deleteTournament = (id: string) => {
    setTournaments(tournaments.filter(t => t.id !== id));
  };

  // Player CRUD
  const addPlayer = (player: Omit<Player, 'id'>) => {
    const newPlayer = { ...player, id: Date.now().toString() };
    setPlayers([...players, newPlayer]);
  };

  const updatePlayer = (id: string, player: Partial<Player>) => {
    setPlayers(players.map(p => p.id === id ? { ...p, ...player } : p));
  };

  const deletePlayer = (id: string) => {
    setPlayers(players.filter(p => p.id !== id));
  };

  const reorderPlayers = (newPlayers: Player[]) => {
    setPlayers(newPlayers.map((p, index) => ({ ...p, rank: index + 1 })));
  };

  // Gallery CRUD
  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() };
    setGalleryItems([...galleryItems, newItem]);
  };

  const updateGalleryItem = (id: string, item: Partial<GalleryItem>) => {
    setGalleryItems(galleryItems.map(i => i.id === id ? { ...i, ...item } : i));
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryItems(galleryItems.filter(i => i.id !== id));
  };

  // Announcement CRUD
  const addAnnouncement = (announcement: Omit<Announcement, 'id'>) => {
    const newAnnouncement = { ...announcement, id: Date.now().toString() };
    setAnnouncements([...announcements, newAnnouncement]);
  };

  const updateAnnouncement = (id: string, announcement: Partial<Announcement>) => {
    setAnnouncements(announcements.map(a => a.id === id ? { ...a, ...announcement } : a));
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  // Puzzle CRUD
  const addPuzzle = (puzzle: Omit<Puzzle, 'id'>) => {
    const newPuzzle = { ...puzzle, id: Date.now().toString() };
    setPuzzles([...puzzles, newPuzzle]);
  };

  const updatePuzzle = (id: string, puzzle: Partial<Puzzle>) => {
    setPuzzles(puzzles.map(p => p.id === id ? { ...p, ...puzzle } : p));
  };

  const deletePuzzle = (id: string) => {
    setPuzzles(puzzles.filter(p => p.id !== id));
  };

  // Settings
  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings({ ...settings, ...newSettings });
  };

  // Registration CRUD
  const addRegistration = (registration: Omit<Registration, 'id' | 'registeredAt' | 'status'>) => {
    const newRegistration = {
      ...registration,
      id: Date.now().toString(),
      status: 'pending' as const,
      registeredAt: new Date().toISOString(),
    };
    setRegistrations(prevRegistrations => [...prevRegistrations, newRegistration]);
  };

  const updateRegistration = (id: string, registration: Partial<Registration>) => {
    setRegistrations(prevRegistrations => 
      prevRegistrations.map(r => r.id === id ? { ...r, ...registration } : r)
    );
  };

  const deleteRegistration = (id: string) => {
    setRegistrations(prevRegistrations => prevRegistrations.filter(r => r.id !== id));
  };

  const approveRegistration = (id: string) => {
    updateRegistration(id, { status: 'approved' });
  };

  const rejectRegistration = (id: string) => {
    updateRegistration(id, { status: 'rejected' });
  };

  // Stats
  const getStats = () => ({
    totalPlayers: players.length,
    totalTournaments: tournaments.length,
    activeMembers: committeeMembers.length,
    galleryItems: galleryItems.length,
    pendingRegistrations: registrations.filter(r => r.status === 'pending').length,
  });

  // Get approved participant count for a tournament
  const getApprovedCount = (tournamentId: string) => {
    return registrations.filter(r => r.tournamentId === tournamentId && r.status === 'approved').length;
  };

  // Get all registrations for a specific tournament
  const getTournamentRegistrations = (tournamentId: string) => {
    return registrations.filter(r => r.tournamentId === tournamentId);
  };

  return (
    <DataContext.Provider
      value={{
        committeeMembers,
        addCommitteeMember,
        updateCommitteeMember,
        deleteCommitteeMember,
        tournaments,
        addTournament,
        updateTournament,
        deleteTournament,
        players,
        addPlayer,
        updatePlayer,
        deletePlayer,
        reorderPlayers,
        galleryItems,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        announcements,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        puzzles,
        addPuzzle,
        updatePuzzle,
        deletePuzzle,
        settings,
        updateSettings,
        registrations,
        addRegistration,
        updateRegistration,
        deleteRegistration,
        approveRegistration,
        rejectRegistration,
        getStats,
        getApprovedCount,
        getTournamentRegistrations,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}
