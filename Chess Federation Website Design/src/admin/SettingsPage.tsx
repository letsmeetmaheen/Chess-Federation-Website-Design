import { useState } from 'react';
import { motion } from 'motion/react';
import { Save } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner@2.0.3';

export default function SettingsPage() {
  const { settings, updateSettings } = useData();
  const [formData, setFormData] = useState(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    toast.success('Settings saved successfully');
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
          Settings changes will update the footer, contact page, and site branding
        </p>
      </motion.div>

      <div>
        <h2 className="text-2xl text-white mb-2">Settings</h2>
        <p className="text-gray-400">Configure site settings</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="glass-royal border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-white">General Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-300">Site Name</Label>
              <Input
                value={formData.siteName}
                onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                className="bg-white/5 border-purple-500/30 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-gray-300">Tagline</Label>
              <Input
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="bg-white/5 border-purple-500/30 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-gray-300">Logo URL (optional)</Label>
              <Input
                value={formData.logo || ''}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                className="bg-white/5 border-purple-500/30 text-white"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-royal border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-white">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-300">Email</Label>
              <Input
                value={formData.contact.email}
                onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, email: e.target.value } })}
                className="bg-white/5 border-purple-500/30 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-gray-300">Phone</Label>
              <Input
                value={formData.contact.phone}
                onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, phone: e.target.value } })}
                className="bg-white/5 border-purple-500/30 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-gray-300">Address</Label>
              <Input
                value={formData.contact.address}
                onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, address: e.target.value } })}
                className="bg-white/5 border-purple-500/30 text-white"
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-royal border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-white">Social Media Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-300">Facebook</Label>
              <Input
                value={formData.social.facebook || ''}
                onChange={(e) => setFormData({ ...formData, social: { ...formData.social, facebook: e.target.value } })}
                className="bg-white/5 border-purple-500/30 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">YouTube</Label>
              <Input
                value={formData.social.youtube || ''}
                onChange={(e) => setFormData({ ...formData, social: { ...formData.social, youtube: e.target.value } })}
                className="bg-white/5 border-purple-500/30 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">WhatsApp</Label>
              <Input
                value={formData.social.whatsapp || ''}
                onChange={(e) => setFormData({ ...formData, social: { ...formData.social, whatsapp: e.target.value } })}
                className="bg-white/5 border-purple-500/30 text-white"
              />
            </div>
          </CardContent>
        </Card>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 royal-glow">
            <Save className="w-5 h-5 mr-2" />
            Save Settings
          </Button>
        </motion.div>
      </form>
    </div>
  );
}
