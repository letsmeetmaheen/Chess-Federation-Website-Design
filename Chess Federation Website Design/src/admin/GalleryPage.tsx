import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../components/ui/dialog';
import { toast } from 'sonner@2.0.3';
import { Switch } from '../components/ui/switch';

export default function GalleryPage() {
  const { galleryItems, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useData();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    caption: '',
    tag: '',
    visible: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGalleryItem(formData);
    toast.success('Media added successfully');
    setIsAddOpen(false);
    setFormData({ url: '', title: '', caption: '', tag: '', visible: true });
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
          Only visible items will appear in the public gallery
        </p>
      </motion.div>

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl text-white mb-2">Gallery & Media</h2>
          <p className="text-gray-400">Manage gallery images and videos</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 royal-glow">
              <Plus className="w-5 h-5 mr-2" />
              Add Media
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-royal border-purple-500/30">
            <DialogHeader>
              <DialogTitle className="text-white">Add Media</DialogTitle>
              <DialogDescription className="text-gray-400">
                Upload images or videos to the gallery.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-gray-300">Image/Video URL</Label>
                <Input
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="bg-white/5 border-purple-500/30 text-white"
                  required
                />
              </div>
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
                <Label className="text-gray-300">Caption (optional)</Label>
                <Input
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  className="bg-white/5 border-purple-500/30 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Tag</Label>
                <Input
                  value={formData.tag}
                  onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  placeholder="Event / History / Press"
                  className="bg-white/5 border-purple-500/30 text-white"
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.visible}
                  onCheckedChange={(checked) => setFormData({ ...formData, visible: checked })}
                />
                <Label className="text-gray-300">Visible on gallery</Label>
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)} className="glass-purple border-purple-500/30 text-gray-300">
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600">
                  Add Media
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="relative group glass-royal rounded-lg overflow-hidden border border-purple-500/30 hover:border-purple-500/50 gel-transition"
          >
            <img src={item.url} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-3">
              <h4 className="text-white text-sm mb-1">{item.title}</h4>
              <p className="text-gray-400 text-xs">{item.tag}</p>
            </div>
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => updateGalleryItem(item.id, { visible: !item.visible })}
                className="bg-black/50 hover:bg-black/70"
              >
                {item.visible ? <Eye className="w-4 h-4 text-white" /> : <EyeOff className="w-4 h-4 text-gray-400" />}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => { deleteGalleryItem(item.id); toast.success('Media deleted'); }}
                className="bg-black/50 hover:bg-red-600"
              >
                <Trash2 className="w-4 h-4 text-white" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
