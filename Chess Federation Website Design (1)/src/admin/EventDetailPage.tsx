import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Edit, Save, X, Calendar, MapPin, Users, CheckCircle, XCircle, Trash2, Clock } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner@2.0.3';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../components/ui/alert-dialog';

interface EventDetailPageProps {
  eventId: string;
  onBack: () => void;
}

export default function EventDetailPage({ eventId, onBack }: EventDetailPageProps) {
  const { 
    tournaments, 
    updateTournament, 
    getApprovedCount, 
    getTournamentRegistrations,
    approveRegistration,
    rejectRegistration,
    deleteRegistration,
  } = useData();

  const event = tournaments.find(t => t.id === eventId);
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    date: event?.date || '',
    location: event?.location || '',
    participants: event?.participants || 0,
  });

  if (!event) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-400">Event not found</p>
      </div>
    );
  }

  const registrations = getTournamentRegistrations(eventId);
  const approvedCount = getApprovedCount(eventId);
  const pendingCount = registrations.filter(r => r.status === 'pending').length;

  const handleSave = () => {
    updateTournament(eventId, formData);
    setIsEditing(false);
    toast.success('Event details updated successfully');
  };

  const handleCancel = () => {
    setFormData({
      date: event.date,
      location: event.location,
      participants: event.participants,
    });
    setIsEditing(false);
  };

  const handleApprove = (id: string) => {
    if (approvedCount >= event.participants) {
      toast.error('Event has reached maximum capacity!');
      return;
    }
    approveRegistration(id);
    toast.success('Registration approved successfully');
  };

  const handleReject = (id: string) => {
    rejectRegistration(id);
    toast.success('Registration rejected');
  };

  const handleDelete = (id: string) => {
    deleteRegistration(id);
    toast.success('Registration deleted');
    setDeletingId(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'approved': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'rejected': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="glass-purple border-purple-500/30 text-gray-300 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Events
        </Button>
        <h2 className="text-2xl text-white flex-1">{event.title}</h2>
        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 royal-glow"
          >
            <Edit className="w-5 h-5 mr-2" />
            Edit Event Details
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Changes
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="glass-purple border-purple-500/30 text-gray-300"
            >
              <X className="w-5 h-5 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      {/* Event Details Card */}
      <Card className="glass-royal border-purple-500/30 royal-glow">
        <CardHeader>
          <CardTitle className="text-white">Event Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Event Image */}
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-6">
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 mb-2">
                  {event.category}
                </Badge>
                <h3 className="text-2xl text-white">{event.title}</h3>
              </div>
            </div>
          </div>

          {/* Editable Fields */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <Label className="text-gray-300 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Event Date
              </Label>
              {isEditing ? (
                <Input
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="bg-white/5 border-purple-500/30 text-white"
                />
              ) : (
                <p className="text-white text-lg">{event.date}</p>
              )}
            </div>

            <div>
              <Label className="text-gray-300 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </Label>
              {isEditing ? (
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="bg-white/5 border-purple-500/30 text-white"
                />
              ) : (
                <p className="text-white text-lg">{event.location}</p>
              )}
            </div>

            <div>
              <Label className="text-gray-300 mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Maximum Participants
              </Label>
              {isEditing ? (
                <Input
                  type="number"
                  value={formData.participants}
                  onChange={(e) => setFormData({ ...formData, participants: parseInt(e.target.value) || 0 })}
                  className="bg-white/5 border-purple-500/30 text-white"
                />
              ) : (
                <p className="text-white text-lg">{event.participants}</p>
              )}
            </div>
          </div>

          {/* Participant Stats */}
          <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-purple-500/30">
            <Card className="glass-purple border-green-500/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Approved Participants</p>
                    <h4 className="text-2xl text-green-400">{approvedCount}</h4>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-purple border-amber-500/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Pending Review</p>
                    <h4 className="text-2xl text-amber-400">{pendingCount}</h4>
                  </div>
                  <Clock className="w-8 h-8 text-amber-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-purple border-purple-500/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Available Spots</p>
                    <h4 className="text-2xl text-purple-400">{event.participants - approvedCount}</h4>
                  </div>
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Capacity Progress */}
          <div>
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Capacity: {approvedCount} / {event.participants}</span>
              <span>{Math.round((approvedCount / event.participants) * 100)}% Full</span>
            </div>
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(approvedCount / event.participants) * 100}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className={`h-full rounded-full ${
                  approvedCount >= event.participants
                    ? 'bg-red-500'
                    : approvedCount >= event.participants * 0.8
                    ? 'bg-amber-500'
                    : 'bg-green-500'
                }`}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Registrations List */}
      <Card className="glass-royal border-purple-500/30 royal-glow">
        <CardHeader>
          <CardTitle className="text-white">Registrations ({registrations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {registrations.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No registrations yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-purple-500/30">
                    <TableHead className="text-gray-300">Player Name</TableHead>
                    <TableHead className="text-gray-300">Email</TableHead>
                    <TableHead className="text-gray-300">Phone</TableHead>
                    <TableHead className="text-gray-300">Category</TableHead>
                    <TableHead className="text-gray-300">Rating</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {registrations.map((reg, index) => (
                    <motion.tr
                      key={reg.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-purple-500/20 hover:bg-purple-500/10"
                    >
                      <TableCell className="text-white">{reg.playerName}</TableCell>
                      <TableCell className="text-gray-400 text-sm">{reg.email}</TableCell>
                      <TableCell className="text-gray-400 text-sm">{reg.phone}</TableCell>
                      <TableCell>
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                          {reg.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-purple-400">{reg.rating || 'N/A'}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(reg.status)}>
                          {reg.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {reg.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleApprove(reg.id)}
                                className="bg-green-600 hover:bg-green-700"
                                disabled={approvedCount >= event.participants}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleReject(reg.id)}
                                className="glass-purple border-red-500/30 text-red-400"
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setDeletingId(reg.id)}
                            className="text-red-400 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent className="glass-royal border-purple-500/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Registration?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This action cannot be undone. This will permanently delete this registration.
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
