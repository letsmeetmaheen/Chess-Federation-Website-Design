import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { useData, CommitteeMember } from '../contexts/DataContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../components/ui/dialog';
import { Card, CardContent } from '../components/ui/card';
import { toast } from 'sonner@2.0.3';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../components/ui/alert-dialog';
import LivePreview from '../components/LivePreview';

export default function MembersPage() {
  const { committeeMembers, addCommitteeMember, updateCommitteeMember, deleteCommitteeMember } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<CommitteeMember | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    photo: '',
    bio: '',
    contact: '',
  });

  const filteredMembers = committeeMembers.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      updateCommitteeMember(editingMember.id, formData);
      toast.success('Member updated successfully');
      setEditingMember(null);
    } else {
      addCommitteeMember(formData);
      toast.success('Member added successfully');
      setIsAddOpen(false);
    }
    setFormData({ name: '', title: '', photo: '', bio: '', contact: '' });
  };

  const handleEdit = (member: CommitteeMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      title: member.title,
      photo: member.photo || '',
      bio: member.bio || '',
      contact: member.contact || '',
    });
  };

  const handleDelete = (id: string) => {
    deleteCommitteeMember(id);
    toast.success('Member deleted successfully');
    setDeletingId(null);
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
          Changes made here will instantly reflect on the public website
        </p>
      </motion.div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl text-white mb-2">Committee Members</h2>
          <p className="text-gray-400">Manage federation committee members</p>
        </div>
        
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 royal-glow">
              <Plus className="w-5 h-5 mr-2" />
              Add New Member
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-royal border-purple-500/30 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Committee Member</DialogTitle>
              <DialogDescription className="text-gray-400">
                Add a new member to the committee. All fields are required unless marked optional.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Name (Bangla/English)</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="মোঃ আরিফ আখতার"
                    className="bg-white/5 border-purple-500/30 text-white"
                    required
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Role/Title</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="সভাপতি"
                    className="bg-white/5 border-purple-500/30 text-white"
                    required
                  />
                </div>
              </div>
              <div>
                <Label className="text-gray-300">Photo URL (optional)</Label>
                <Input
                  value={formData.photo}
                  onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                  placeholder="https://example.com/photo.jpg"
                  className="bg-white/5 border-purple-500/30 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Bio (optional)</Label>
                <Input
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Brief biography"
                  className="bg-white/5 border-purple-500/30 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Contact (optional)</Label>
                <Input
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  placeholder="Phone or email"
                  className="bg-white/5 border-purple-500/30 text-white"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)} className="glass-purple border-purple-500/30 text-gray-300">
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Save Member
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
              placeholder="Search members..."
              className="pl-10 bg-white/5 border-purple-500/30 text-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="glass-royal border-purple-500/30 hover:border-purple-500/50 gel-transition royal-glow overflow-hidden group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-2xl royal-glow">
                    {member.name.charAt(0)}
                  </div>
                  <div className="flex gap-2">
                    <Dialog open={editingMember?.id === member.id} onOpenChange={(open) => !open && setEditingMember(null)}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(member)}
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="glass-royal border-purple-500/30 max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-white">Edit Committee Member</DialogTitle>
                          <DialogDescription className="text-gray-400">
                            Update member information.
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-gray-300">Name</Label>
                              <Input
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="bg-white/5 border-purple-500/30 text-white"
                                required
                              />
                            </div>
                            <div>
                              <Label className="text-gray-300">Role</Label>
                              <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="bg-white/5 border-purple-500/30 text-white"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <Label className="text-gray-300">Photo URL</Label>
                            <Input
                              value={formData.photo}
                              onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                              className="bg-white/5 border-purple-500/30 text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-gray-300">Bio</Label>
                            <Input
                              value={formData.bio}
                              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                              className="bg-white/5 border-purple-500/30 text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-gray-300">Contact</Label>
                            <Input
                              value={formData.contact}
                              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                              className="bg-white/5 border-purple-500/30 text-white"
                            />
                          </div>
                          <div className="flex gap-2 justify-end">
                            <Button type="button" variant="outline" onClick={() => setEditingMember(null)} className="glass-purple border-purple-500/30 text-gray-300">
                              Cancel
                            </Button>
                            <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600">
                              Update Member
                            </Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setDeletingId(member.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <h3 className="text-white mb-1">{member.name}</h3>
                <p className="text-purple-400 text-sm mb-2">{member.title}</p>
                {member.bio && <p className="text-gray-400 text-sm">{member.bio}</p>}
                {member.contact && <p className="text-gray-500 text-xs mt-2">{member.contact}</p>}
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
              This action cannot be undone. This will permanently delete this committee member.
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
