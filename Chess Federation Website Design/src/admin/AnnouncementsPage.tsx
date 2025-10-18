import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit, Trash2, Pin } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../components/ui/dialog';
import { Card, CardContent } from '../components/ui/card';
import { toast } from 'sonner@2.0.3';
import { Switch } from '../components/ui/switch';
import { Badge } from '../components/ui/badge';

export default function AnnouncementsPage() {
  const { announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement } = useData();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    pinned: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAnnouncement({ ...formData, date: new Date().toISOString(), status: 'active' });
    toast.success('Announcement added');
    setIsAddOpen(false);
    setFormData({ title: '', description: '', pinned: false });
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
          Pinned announcements will appear in the homepage news ticker
        </p>
      </motion.div>

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl text-white mb-2">Announcements & News</h2>
          <p className="text-gray-400">Manage news and announcements</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 royal-glow">
              <Plus className="w-5 h-5 mr-2" />
              Add News
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-royal border-purple-500/30">
            <DialogHeader>
              <DialogTitle className="text-white">Add Announcement</DialogTitle>
              <DialogDescription className="text-gray-400">
                Create a new announcement or news item.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-gray-300">Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.pinned}
                  onCheckedChange={(checked) => setFormData({ ...formData, pinned: checked })}
                />
                <Label className="text-gray-300">Pin to homepage</Label>
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)} className="glass-purple border-purple-500/30 text-gray-300">
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600">
                  Add Announcement
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {announcements.map((announcement, index) => (
          <motion.div
            key={announcement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="glass-royal border-purple-500/30 hover:border-purple-500/50 gel-transition">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl text-white">{announcement.title}</h3>
                      {announcement.pinned && (
                        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                          <Pin className="w-3 h-3 mr-1" />
                          Pinned
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-400 mb-2">{announcement.description}</p>
                    <p className="text-gray-500 text-sm">{new Date(announcement.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => updateAnnouncement(announcement.id, { pinned: !announcement.pinned })}
                      className="text-amber-400 hover:text-amber-300"
                    >
                      <Pin className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => { deleteAnnouncement(announcement.id); toast.success('Deleted'); }}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
