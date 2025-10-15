import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Mail, Phone, Facebook, Youtube, MessageCircle, UserPlus, Trophy, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Office Location',
      content: 'ACP Hall, Dinajpur Town',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Address',
      content: 'info@acpdinajpur.org',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Hotline',
      content: '+880 1XXX-XXXXXX',
      color: 'from-green-500 to-green-600',
    },
  ];

  const actionButtons = [
    {
      icon: <UserPlus className="w-6 h-6" />,
      title: 'Join as Member',
      description: 'Become part of our chess family',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: 'Sponsor a Tournament',
      description: 'Support chess development',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Volunteer With Us',
      description: 'Help organize events',
      color: 'from-blue-500 to-blue-600',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at center, #000 2px, transparent 2px)`,
            backgroundSize: '50px 50px',
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-gray-900 dark:text-white mb-4">
            Get in <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-amber-500 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Join our community and be part of something extraordinary
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="glass-royal rounded-2xl p-8 shadow-xl hover:shadow-2xl gel-transition text-center relative overflow-hidden royal-glow">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-400/0 to-purple-400/0 group-hover:from-purple-400/15 group-hover:to-blue-400/10 liquid-morph"
                  transition={{ duration: 0.3 }}
                />
                
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${info.color} text-white mb-4 shadow-lg`}
                >
                  {info.icon}
                </motion.div>
                
                <h3 className="text-xl text-gray-900 dark:text-white mb-2">
                  {info.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{info.content}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-royal rounded-2xl p-8 shadow-2xl royal-glow">
              <h3 className="text-3xl text-gray-900 dark:text-white mb-6">
                Send us a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                    Full Name
                  </Label>
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                      className="mt-2"
                    />
                  </motion.div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                    Email Address
                  </Label>
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter your email"
                      className="mt-2"
                    />
                  </motion.div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">
                    Phone Number
                  </Label>
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter your phone"
                      className="mt-2"
                    />
                  </motion.div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-700 dark:text-gray-300">
                    Message
                  </Label>
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us how we can help..."
                      className="mt-2 min-h-[120px]"
                    />
                  </motion.div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-700 hover:via-blue-700 hover:to-purple-700 text-white py-6 shadow-xl relative overflow-hidden group royal-glow"
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-purple-400 via-blue-400 to-amber-400 shimmer-effect"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative">Send Message</span>
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* Map & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Map Placeholder */}
            <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="relative"
                >
                  <MapPin className="w-16 h-16 text-red-600" />
                  <motion.div
                    className="absolute inset-0 bg-red-600 rounded-full opacity-20"
                    animate={{ scale: [1, 2, 1], opacity: [0.2, 0, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg p-4">
                <p className="text-gray-900 dark:text-white">
                  ACP Hall, Dinajpur Town, Bangladesh
                </p>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="glass-royal rounded-2xl p-6 shadow-xl royal-glow">
              <h4 className="text-2xl text-gray-900 dark:text-white mb-6">
                Connect With Us
              </h4>
              
              <div className="space-y-4">
                {[
                  { icon: <Facebook className="w-6 h-6" />, name: 'Facebook', color: 'hover:bg-blue-600' },
                  { icon: <Youtube className="w-6 h-6" />, name: 'YouTube', color: 'hover:bg-red-600' },
                  { icon: <MessageCircle className="w-6 h-6" />, name: 'WhatsApp', color: 'hover:bg-green-600' },
                ].map((social, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 ${social.color} hover:text-white transition-all group`}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {social.icon}
                    </motion.div>
                    <span>{social.name}</span>
                    <motion.div
                      className="ml-auto"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                    >
                      →
                    </motion.div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-3 gap-8">
          {actionButtons.map((action, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative group cursor-pointer">
                <div className={`absolute inset-0 bg-gradient-to-br ${action.color} rounded-2xl blur opacity-50 group-hover:opacity-75 gel-transition liquid-morph`} />
                <div className="relative glass-royal rounded-2xl p-8 hover:border-transparent gel-transition">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${action.color} text-white mb-4 shadow-lg`}
                  >
                    {action.icon}
                  </motion.div>
                  <h3 className="text-xl text-gray-900 dark:text-white mb-2">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {action.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
