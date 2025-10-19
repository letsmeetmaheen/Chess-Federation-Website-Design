import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Users, Clock, Trophy, Facebook } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useData, Tournament } from '../contexts/DataContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';

export default function Events() {
  const { tournaments, addRegistration } = useData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState<Tournament | null>(null);
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [formData, setFormData] = useState({
    playerName: '',
    email: '',
    phone: '',
    category: '',
    rating: '',
  });

  const categories = ['All', 'Blitz', 'Rapid', 'Classical'];
  
  // Filter only upcoming tournaments for public display
  const events = tournaments.filter(t => t.status === 'upcoming');

  const filteredEvents = selectedCategory === 'All' 
    ? events 
    : events.filter(e => e.category === selectedCategory);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    addRegistration({
      tournamentId: selectedEvent.id,
      tournamentTitle: selectedEvent.title,
      playerName: formData.playerName,
      email: formData.email,
      phone: formData.phone,
      category: formData.category,
      rating: formData.rating,
    });

    toast.success('Registration submitted! Awaiting admin approval.');
    setRegistrationOpen(false);
    setFormData({ playerName: '', email: '', phone: '', category: '', rating: '' });
    setSelectedEvent(null);
  };

  return (
    <section id="events" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Rotating Background Chess Board */}
      <motion.div
        className="absolute inset-0 opacity-5 dark:opacity-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      >
        <div className="w-full h-full" style={{
          backgroundImage: `repeating-conic-gradient(#000 0% 25%, transparent 0% 50%)`,
          backgroundSize: '60px 60px',
        }} />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-gray-900 dark:text-white mb-4">
            Upcoming <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-amber-500 bg-clip-text text-transparent">Events</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Join our exciting tournaments and test your skills
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full gel-transition ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white shadow-lg shadow-purple-600/40 royal-glow'
                  : 'glass-purple text-gray-700 dark:text-gray-300 hover:border-purple-500'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Events Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16"
          >
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="glass-royal rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl gel-transition royal-glow">
                  {/* Event Image */}
                  <div className="relative h-56 overflow-hidden">
                    <ImageWithFallback
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 gel-transition"
                    />
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full shadow-lg royal-glow">
                      {event.category}
                    </div>
                  </div>

                  {/* Event Info */}
                  <div className="p-6">
                    <h3 className="text-2xl text-gray-900 dark:text-white mb-4">
                      {event.title}
                    </h3>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                        <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                        <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                        <Users className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                        <span>{event.participants} Participants</span>
                      </div>
                    </div>

                    {/* Countdown */}
                    <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div className="text-center">
                        <motion.div
                          key={event.countdown.days}
                          initial={{ rotateX: 90 }}
                          animate={{ rotateX: 0 }}
                          className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-1"
                        >
                          {event.countdown.days}
                        </motion.div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Days</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-1">{event.countdown.hours}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Hours</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-1">{event.countdown.minutes}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Minutes</div>
                      </div>
                    </div>

                    {/* Register Button */}
                    <Dialog open={registrationOpen && selectedEvent?.id === event.id} onOpenChange={(open) => {
                      setRegistrationOpen(open);
                      if (open) setSelectedEvent(event);
                      else setSelectedEvent(null);
                    }}>
                      <DialogTrigger asChild>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="elastic-bounce">
                          <Button className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-700 hover:via-blue-700 hover:to-purple-700 text-white py-6 royal-glow">
                            <Trophy className="w-5 h-5 mr-2" />
                            Register Now
                          </Button>
                        </motion.div>
                      </DialogTrigger>
                      <DialogContent className="glass-royal dark:glass-royal border-purple-500/30">
                        <DialogHeader>
                          <DialogTitle className="dark:text-white">Register for {event.title}</DialogTitle>
                          <DialogDescription className="dark:text-gray-400">
                            Fill out the form below to register for this tournament. Admin approval required.
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleRegister} className="space-y-4 py-4">
                          <div>
                            <Label htmlFor="name" className="dark:text-gray-300">Full Name</Label>
                            <Input 
                              id="name" 
                              value={formData.playerName}
                              onChange={(e) => setFormData({...formData, playerName: e.target.value})}
                              placeholder="Enter your name" 
                              className="dark:bg-white/5 dark:border-purple-500/30 dark:text-white"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="email" className="dark:text-gray-300">Email</Label>
                            <Input 
                              id="email" 
                              type="email" 
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              placeholder="Enter your email" 
                              className="dark:bg-white/5 dark:border-purple-500/30 dark:text-white"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone" className="dark:text-gray-300">Phone Number</Label>
                            <Input 
                              id="phone" 
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              placeholder="+880 1XXX-XXXXXX" 
                              className="dark:bg-white/5 dark:border-purple-500/30 dark:text-white"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="category" className="dark:text-gray-300">Player Category</Label>
                            <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})} required>
                              <SelectTrigger className="dark:bg-white/5 dark:border-purple-500/30 dark:text-white">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent className="glass-royal border-purple-500/30">
                                <SelectItem value="Open">Open</SelectItem>
                                <SelectItem value="Women">Women</SelectItem>
                                <SelectItem value="Junior">Junior (U-18)</SelectItem>
                                <SelectItem value="Senior">Senior (50+)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="rating" className="dark:text-gray-300">Chess Rating (Optional)</Label>
                            <Input 
                              id="rating" 
                              value={formData.rating}
                              onChange={(e) => setFormData({...formData, rating: e.target.value})}
                              placeholder="e.g., 1800" 
                              className="dark:bg-white/5 dark:border-purple-500/30 dark:text-white"
                            />
                          </div>
                          <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 royal-glow">
                            Complete Registration
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Facebook Blitz Connect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white shadow-2xl relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-blue-400 opacity-20"
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative z-10"
            >
              <Facebook className="w-16 h-16 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-3xl mb-4 relative z-10">Join Our Facebook Blitz Connect</h3>
            <p className="mb-6 relative z-10">
              Stay updated with daily blitz tournaments, live streams, and community discussions
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                Connect on Facebook
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
