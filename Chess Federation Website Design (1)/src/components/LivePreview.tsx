import { motion } from 'motion/react';
import { Eye } from 'lucide-react';

interface LivePreviewProps {
  title: string;
  children: React.ReactNode;
}

export default function LivePreview({ title, children }: LivePreviewProps) {
  return (
    <div className="glass-royal rounded-2xl border-purple-500/30 p-6 royal-glow">
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-purple-500/30">
        <Eye className="w-5 h-5 text-purple-400" />
        <h3 className="text-white">Live Preview: {title}</h3>
        <div className="ml-auto">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-3 h-3 bg-green-400 rounded-full"
          />
        </div>
      </div>
      <div className="bg-white/5 rounded-lg p-4 min-h-[200px]">
        {children}
      </div>
    </div>
  );
}
