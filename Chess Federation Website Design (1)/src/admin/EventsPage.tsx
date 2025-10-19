import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit, Trash2, Search, Calendar, MapPin, Eye } from 'lucide-react';
import { useData, Tournament } from '../contexts/DataContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../components/ui/dialog';
import { Card, CardContent } from '../components/ui/card';
import { toast } from 'sonner@2.0.3';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../components/ui/alert-dialog';
import { Badge } from '../components/ui/badge';
import EventDetailPage from './EventDetailPage';

export default function EventsPage() {
  const [viewingEventId, setViewingEventId] = useState<string | null>(null);

  if (viewingEventId) {
    return <EventDetailPage eventId={viewingEventId} onBack={() => setViewingEventId(null)} />;
  }

  return <EventsListPage onViewEvent={setViewingEventId} />;
}

function EventsListPage({ onViewEvent }: { onViewEvent: (id: string) => void }) {
  const { tournaments, addTournament, updateTournament, deleteTournament, getApprovedCount } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Tournament | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Blitz' as 'Blitz' | 'Rapid' | 'Classical',
    date: '',
    location: '',
    participants: 0,
    image: '',
    description: '',
    status: 'upcoming' as 'upcoming' | 'ongoing' | 'completed',
  });

  const filteredEvents = tournaments.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eventData = {
      ...formData,
      countdown: { days: 0, hours: 0, minutes: 0 },
    };
    
    if (editingEvent) {
      updateTournament(editingEvent.id, eventData);
      toast.success('Event updated successfully');
      setEditingEvent(null);
    } else {
      addTournament(eventData);
      toast.success('Event added successfully');
      setIsAddOpen(false);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'Blitz',
      date: '',
      location: '',
      participants: 0,
      image: '',
      description: '',
      status: 'upcoming',
    });
  };

  const handleEdit = (event: Tournament) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      category: event.category,
      date: event.date,
      location: event.location,
      participants: event.participants,
      image: event.image,
      description: event.description || '',
      status: event.status,
    });
  };

  const handleDelete = (id: string) => {
    deleteTournament(id);
    toast.success('Event deleted successfully');
    setDeletingId(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'ongoing': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'completed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Live Preview Notice */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-purple rounded-lg p-4 border border-purple-500/30"
      >
        <p className="text-purple-300 text-sm flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Events marked as "upcoming" will appear on the public Events page
        </p>
      </motion.div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl text-white mb-2">Events & Tournaments</h2>
          <p className="text-gray-400">Manage chess tournaments and events</p>
        </div>
        
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 royal-glow">
              <Plus className="w-5 h-5 mr-2" />
              Add New Event
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-royal border-purple-500/30 max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Event</DialogTitle>
              <DialogDescription className="text-gray-400">
                Create a new tournament or event.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-gray-300">Event Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="District Championship 2025"
                  className="bg-white/5 border-purple-500/30 text-white"
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Category</Label>
                  <Select value={formData.category} onValueChange={(value: any) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger className="bg-white/5 border-purple-500/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-royal border-purple-500/30">
                      <SelectItem value="Blitz">Blitz</SelectItem>
                      <SelectItem value="Rapid">Rapid</SelectItem>
                      <SelectItem value="Classical">Classical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-300">Status</Label>
                  <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger className="bg-white/5 border-purple-500/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-royal border-purple-500/30">
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Date</Label>
                  <Input
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="November 15, 2025"
                    className="bg-white/5 border-purple-500/30 text-white"
                    required
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Location</Label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Dinajpur Town Hall"
                    className="bg-white/5 border-purple-500/30 text-white"
                    required
                  />
                </div>
              </div>
              <div>
                <Label className="text-gray-300">Expected Participants</Label>
                <Input
                  type="number"
                  value={formData.participants}
                  onChange={(e) => setFormData({ ...formData, participants: parseInt(e.target.value) || 0 })}
                  placeholder="128"
                  className="bg-white/5 border-purple-500/30 text-white"
                  required
                />
              </div>
              <div>
                <Label className="text-gray-300">Banner Image URL</Label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="bg-white/5 border-purple-500/30 text-white"
                  required
                />
              </div>
              <div>
                <Label className="text-gray-300">Description (optional)</Label>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Event details and description"
                  className="bg-white/5 border-purple-500/30 text-white"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => { setIsAddOpen(false); resetForm(); }} className="glass-purple border-purple-500/30 text-gray-300">
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600">
                  Save Event
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="glass-royal border-purple-500/30">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search events..."
              className="pl-10 bg-white/5 border-purple-500/30 text-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="glass-royal border-purple-500/30 hover:border-purple-500/50 gel-transition royal-glow overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-purple-900 to-blue-900">
                {event.image && (
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover opacity-50" />
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge className={getStatusColor(event.status)}>
                    {event.status}
                  </Badge>
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                    {event.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl text-white mb-3">{event.title}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-500 text-sm">Capacity: {event.participants}</p>
                    <p className="text-green-400 text-sm">Approved: {getApprovedCount(event.id)}</p>
                  </div>
                  {/* Capacity Bar */}
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                      style={{ width: `${Math.min((getApprovedCount(event.id) / event.participants) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => onViewEvent(event.id)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Manage
                  </Button>
                  <Dialog open={editingEvent?.id === event.id} onOpenChange={(open) => !open && setEditingEvent(null)}>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(event)}
                        className="flex-1 glass-purple border-purple-500/30 text-blue-400 hover:text-blue-300"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="glass-royal border-purple-500/30 max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-white">Edit Event</DialogTitle>
                        <DialogDescription className="text-gray-400">
                          Update event information.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Same form fields as add */}
                        <div>
                          <Label className="text-gray-300">Event Title</Label>
                          <Input
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="bg-white/5 border-purple-500/30 text-white"
                            required
                          />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-gray-300">Category</Label>
                            <Select value={formData.category} onValueChange={(value: any) => setFormData({ ...formData, category: value })}>
                              <SelectTrigger className="bg-white/5 border-purple-500/30 text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="glass-royal border-purple-500/30">
                                <SelectItem value="Blitz">Blitz</SelectItem>
                                <SelectItem value="Rapid">Rapid</SelectItem>
                                <SelectItem value="Classical">Classical</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-gray-300">Status</Label>
                            <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                              <SelectTrigger className="bg-white/5 border-purple-500/30 text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="glass-royal border-purple-500/30">
                                <SelectItem value="upcoming">Upcoming</SelectItem>
                                <SelectItem value="ongoing">Ongoing</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-gray-300">Date</Label>
                            <Input
                              value={formData.date}
                              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                              className="bg-white/5 border-purple-500/30 text-white"
                              required
                            />
                          </div>
                          <div>
                            <Label className="text-gray-300">Location</Label>
                            <Input
                              value={formData.location}
                              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                              className="bg-white/5 border-purple-500/30 text-white"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <Label className="text-gray-300">Participants</Label>
                          <Input
                            type="number"
                            value={formData.participants}
                            onChange={(e) => setFormData({ ...formData, participants: parseInt(e.target.value) || 0 })}
                            className="bg-white/5 border-purple-500/30 text-white"
                            required
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300">Image URL</Label>
                          <Input
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="bg-white/5 border-purple-500/30 text-white"
                            required
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300">Description</Label>
                          <Input
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="bg-white/5 border-purple-500/30 text-white"
                          />
                        </div>
                        <div className="flex gap-2 justify-end">
                          <Button type="button" variant="outline" onClick={() => setEditingEvent(null)} className="glass-purple border-purple-500/30 text-gray-300">
                            Cancel
                          </Button>
                          <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600">
                            Update Event
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setDeletingId(event.id)}
                    className="glass-purple border-purple-500/30 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent className="glass-royal border-purple-500/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This action cannot be undone. This will permanently delete this event.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="glass-purple border-purple-500/30 text-gray-300">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingId && handleDelete(deletingId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
