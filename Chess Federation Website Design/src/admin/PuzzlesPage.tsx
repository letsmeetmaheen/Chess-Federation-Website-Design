import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2 } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../components/ui/dialog';
import { Card, CardContent } from '../components/ui/card';
import { toast } from 'sonner@2.0.3';

export default function PuzzlesPage() {
  const { puzzles, addPuzzle, deletePuzzle } = useData();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
    fen: '',
    answerLink: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPuzzle(formData);
    toast.success('Puzzle added');
    setIsAddOpen(false);
    setFormData({ title: '', difficulty: 'medium', fen: '', answerLink: '' });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'hard': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl text-white mb-2">Practice Puzzles</h2>
          <p className="text-gray-400">Manage chess puzzles and training</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 royal-glow">
              <Plus className="w-5 h-5 mr-2" />
              Add Puzzle
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-royal border-purple-500/30">
            <DialogHeader>
              <DialogTitle className="text-white">Add Puzzle</DialogTitle>
              <DialogDescription className="text-gray-400">
                Add a new chess puzzle for practice.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-gray-300">Puzzle Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-white/5 border-purple-500/30 text-white"
                  required
                />
              </div>
              <div>
                <Label className="text-gray-300">Difficulty</Label>
                <Select value={formData.difficulty} onValueChange={(value: any) => setFormData({ ...formData, difficulty: value })}>
                  <SelectTrigger className="bg-white/5 border-purple-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-royal border-purple-500/30">
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-300">FEN Notation (optional)</Label>
                <Input
                  value={formData.fen}
                  onChange={(e) => setFormData({ ...formData, fen: e.target.value })}
                  placeholder="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
                  className="bg-white/5 border-purple-500/30 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Answer Link (optional)</Label>
                <Input
                  value={formData.answerLink}
                  onChange={(e) => setFormData({ ...formData, answerLink: e.target.value })}
                  placeholder="https://..."
                  className="bg-white/5 border-purple-500/30 text-white"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)} className="glass-purple border-purple-500/30 text-gray-300">
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600">
                  Add Puzzle
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {puzzles.map((puzzle, index) => (
          <motion.div
            key={puzzle.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="glass-royal border-purple-500/30 hover:border-purple-500/50 gel-transition">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-white">{puzzle.title}</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => { deletePuzzle(puzzle.id); toast.success('Deleted'); }}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className={`inline-block px-3 py-1 rounded-full text-sm ${getDifficultyColor(puzzle.difficulty)}`}>
                  {puzzle.difficulty}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
