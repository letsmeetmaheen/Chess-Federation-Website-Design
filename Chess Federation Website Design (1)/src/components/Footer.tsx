import { motion } from 'motion/react';
import { Crown, Facebook, Youtube, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export default function Footer() {
  const { settings } = useData();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    'Quick Links': ['Home', 'About Us', 'Events', 'Rankings'],
    'Resources': ['Practice Zone', 'Gallery', 'Contact', 'Join Us'],
    'Legal': ['Privacy Policy', 'Terms of Service', 'Rules & Regulations'],
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      {/* Chessboard Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              #fff 0px,
              #fff 1px,
              transparent 1px,
              transparent 40px
            ),
            repeating-linear-gradient(
              90deg,
              #fff 0px,
              #fff 1px,
              transparent 1px,
              transparent 40px
            )`,
          }}
        />
      </div>

      {/* Light Shimmer Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent"
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Federation Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
                className="royal-glow"
              >
                <Crown className="w-10 h-10 text-purple-500 dark:text-purple-400" />
              </motion.div>
              <div>
                <h3 className="text-2xl">ACP Bangladesh</h3>
                <p className="bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">Dinajpur Branch</p>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6 max-w-md italic text-lg">
              "Where Strategy Meets Passion"
            </p>
            
            <p className="text-gray-400 mb-6">
              Association of Chess Player Bangladesh – Dinajpur Branch is dedicated to 
              promoting chess excellence, nurturing talent, and building a vibrant chess 
              community across northern Bangladesh.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                <span>{settings.contact.address}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                <span>{settings.contact.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                <span>{settings.contact.phone}</span>
              </div>
            </div>
          </motion.div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="text-xl mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-purple-400 gel-transition inline-block"
                      whileHover={{ x: 5 }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Media & Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-gray-400">Follow Us:</span>
              {[
                { icon: <Facebook className="w-5 h-5" />, color: 'hover:bg-blue-600' },
                { icon: <Youtube className="w-5 h-5" />, color: 'hover:bg-red-600' },
                { icon: <Mail className="w-5 h-5" />, color: 'hover:bg-green-600' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 bg-gray-800 rounded-full ${social.color} hover:text-white transition-all`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-gray-400">
                © {new Date().getFullYear()} Association of Chess Player Bangladesh - Dinajpur Branch
              </p>
              <p className="text-gray-500 text-sm mt-1">
                All rights reserved | Powered by Chess Excellence
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.2, rotate: 360 }}
        whileTap={{ scale: 0.9 }}
        viewport={{ once: true }}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl z-50 cursor-pointer group royal-glow elastic-bounce"
      >
        <ArrowUp className="w-6 h-6 text-white group-hover:animate-bounce" />
        {/* Rook Tower Shape */}
        <motion.div
          className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-purple-700 rounded-t"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <div className="absolute top-0 left-0 w-2 h-1 bg-purple-800" />
          <div className="absolute top-0 right-0 w-2 h-1 bg-purple-800" />
        </motion.div>
      </motion.button>

      {/* Federation Emblem Placeholder */}
      <motion.div
        className="absolute bottom-4 left-4 opacity-5 pointer-events-none select-none"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <Crown className="w-24 h-24" />
      </motion.div>
    </footer>
  );
}
