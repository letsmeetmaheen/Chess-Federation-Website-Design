import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit, Trash2, Search, TrendingUp, TrendingDown, Minus, GripVertical } from 'lucide-react';
import { useData, Player } from '../contexts/DataContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../components/ui/dialog';
import { Card, CardContent } from '../components/ui/card';
import { toast } from 'sonner@2.0.3';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

export default function PlayersPage() {
  const { players, addPlayer, updatePlayer, deletePlayer } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    rating: 0,
    category: '',
    trend: 'stable' as 'up' | 'down' | 'stable',
    image: '',
    fideId: '',
    club: '',
    bio: '',
  });

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.category.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.rank - b.rank);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const playerData = {
      ...formData,
      rank: editingPlayer ? editingPlayer.rank : players.length + 1,
    };
    
    if (editingPlayer) {
      updatePlayer(editingPlayer.id, playerData);
      toast.success('Player updated successfully');
      setEditingPlayer(null);
    } else {
      addPlayer(playerData);
      toast.success('Player added successfully');
      setIsAddOpen(false);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      rating: 0,
      category: '',
      trend: 'stable',
      image: '',
      fideId: '',
      club: '',
      bio: '',
    });
  };

  const handleEdit = (player: Player) => {
    setEditingPlayer(player);
    setFormData({
      name: player.name,
      rating: player.rating,
      category: player.category,
      trend: player.trend,
      image: player.image,
      fideId: player.fideId || '',
      club: player.club || '',
      bio: player.bio || '',
    });
  };

  const handleDelete = (id: string) => {
    deletePlayer(id);
    toast.success('Player deleted successfully');
    setDeletingId(null);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl text-white mb-2">Player Rankings</h2>
          <p className="text-gray-400">Manage player profiles and rankings</p>
        </div>
        
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 royal-glow">
              <Plus className="w-5 h-5 mr-2" />
              Add New Player
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-royal border-purple-500/30 max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Player</DialogTitle>
              <DialogDescription className="text-gray-400">
                Add a new player to the rankings.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Player Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Rakibul Islam"
                    className="bg-white/5 border-purple-500/30 text-white"
                    required
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Rating</Label>
                  <Input
                    type="number"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 0 })}
                    placeholder="2145"
                    className="bg-white/5 border-purple-500/30 text-white"
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Category</Label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Open / Women / Junior"
                    className="bg-white/5 border-purple-500/30 text-white"
                    required
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Trend</Label>
                  <Select value={formData.trend} onValueChange={(value: any) => setFormData({ ...formData, trend: value })}>
                    <SelectTrigger className="bg-white/5 border-purple-500/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-royal border-purple-500/30">
                      <SelectItem value="up">Rising ↑</SelectItem>
                      <SelectItem value="stable">Stable →</SelectItem>
                      <SelectItem value="down">Falling ↓</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label className="text-gray-300">Photo URL</Label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/photo.jpg"
                  className="bg-white/5 border-purple-500/30 text-white"
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">FIDE ID (optional)</Label>
                  <Input
                    value={formData.fideId}
                    onChange={(e) => setFormData({ ...formData, fideId: e.target.value })}
                    placeholder="123456"
                    className="bg-white/5 border-purple-500/30 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Club (optional)</Label>
                  <Input
                    value={formData.club}
                    onChange={(e) => setFormData({ ...formData, club: e.target.value })}
                    placeholder="Dinajpur Chess Club"
                    className="bg-white/5 border-purple-500/30 text-white"
                  />
                </div>
              </div>
              <div>
                <Label className="text-gray-300">Bio (optional)</Label>
                <Input
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Player biography"
                  className="bg-white/5 border-purple-500/30 text-white"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => { setIsAddOpen(false); resetForm(); }} className="glass-purple border-purple-500/30 text-gray-300">
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600">
                  Save Player
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
              placeholder="Search players..."
              className="pl-10 bg-white/5 border-purple-500/30 text-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Players Table */}
      <Card className="glass-royal border-purple-500/30 royal-glow overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-purple-500/30 hover:bg-purple-500/5">
                  <TableHead className="text-gray-300">Rank</TableHead>
                  <TableHead className="text-gray-300">Player</TableHead>
                  <TableHead className="text-gray-300">Rating</TableHead>
                  <TableHead className="text-gray-300">Category</TableHead>
                  <TableHead className="text-gray-300">Trend</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlayers.map((player, index) => (
                  <motion.tr
                    key={player.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`border-purple-500/20 hover:bg-purple-500/10 gel-transition ${
                      player.rank <= 3 ? 'bg-gradient-to-r from-purple-500/10 to-transparent' : ''
                    }`}
                  >
                    <TableCell className="text-white">
                      <div className="flex items-center gap-2">
                        <GripVertical className="w-4 h-4 text-gray-500 cursor-move" />
                        {player.rank <= 3 ? (
                          <span className="text-2xl">
                            {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : '🥉'}
                          </span>
                        ) : (
                          <span className="text-lg">{player.rank}</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={player.image}
                          alt={player.name}
                          className="w-10 h-10 rounded-full border-2 border-purple-500 royal-glow"
                        />
                        <span className="text-white">{player.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-purple-400">{player.rating}</TableCell>
                    <TableCell className="text-gray-400">{player.category}</TableCell>
                    <TableCell>{getTrendIcon(player.trend)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog open={editingPlayer?.id === player.id} onOpenChange={(open) => !open && setEditingPlayer(null)}>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEdit(player)}
                              className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="glass-royal border-purple-500/30 max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-white">Edit Player</DialogTitle>
                              <DialogDescription className="text-gray-400">
                                Update player information.
                              </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                              {/* Same form as add */}
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
                                  <Label className="text-gray-300">Rating</Label>
                                  <Input
                                    type="number"
                                    value={formData.rating}
                                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 0 })}
                                    className="bg-white/5 border-purple-500/30 text-white"
                                    required
                                  />
                                </div>
                              </div>
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-gray-300">Category</Label>
                                  <Input
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="bg-white/5 border-purple-500/30 text-white"
                                    required
                                  />
                                </div>
                                <div>
                                  <Label className="text-gray-300">Trend</Label>
                                  <Select value={formData.trend} onValueChange={(value: any) => setFormData({ ...formData, trend: value })}>
                                    <SelectTrigger className="bg-white/5 border-purple-500/30 text-white">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="glass-royal border-purple-500/30">
                                      <SelectItem value="up">Rising ↑</SelectItem>
                                      <SelectItem value="stable">Stable →</SelectItem>
                                      <SelectItem value="down">Falling ↓</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div>
                                <Label className="text-gray-300">Photo URL</Label>
                                <Input
                                  value={formData.image}
                                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                  className="bg-white/5 border-purple-500/30 text-white"
                                  required
                                />
                              </div>
                              <div className="flex gap-2 justify-end">
                                <Button type="button" variant="outline" onClick={() => setEditingPlayer(null)} className="glass-purple border-purple-500/30 text-gray-300">
                                  Cancel
                                </Button>
                                <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600">
                                  Update Player
                                </Button>
                              </div>
                            </form>
                          </DialogContent>
                        </Dialog>
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setDeletingId(player.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
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
        </CardContent>
      </Card>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent className="glass-royal border-purple-500/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This action cannot be undone. This will permanently delete this player.
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
