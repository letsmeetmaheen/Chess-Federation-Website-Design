import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Crown, Shield, Users, Briefcase, Megaphone, Building } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useData } from '../contexts/DataContext';

interface MemberProps {
  name: string;
  title: string;
  photo?: string;
  icon: React.ReactNode;
  delay: number;
}

function MemberCard({ name, title, photo, icon, delay }: MemberProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, type: 'spring' }}
      className="group"
    >
      <div className="relative glass-royal rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl gel-transition royal-glow">
        {/* Photo Placeholder */}
        <div className="relative h-64 bg-gradient-to-br from-purple-200 to-blue-300 dark:from-purple-900 dark:to-blue-900 overflow-hidden">
          {photo ? (
            <ImageWithFallback
              src={photo}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 gel-transition"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl text-white">
              {name.charAt(0)}
            </div>
          )}
          
          {/* Overlay on Hover */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-t from-purple-600/80 via-blue-600/50 to-transparent flex items-end justify-center pb-4 glass-slide"
          >
            <motion.div
              initial={{ y: 20 }}
              whileHover={{ y: 0 }}
              className="text-white"
            >
              {icon}
            </motion.div>
          </motion.div>
        </div>

        {/* Info Section */}
        <motion.div
          className="p-6 relative"
          initial={{ y: 0 }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          {/* Role Icon */}
          <div className="absolute -top-6 right-6 w-12 h-12 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg royal-glow elastic-bounce">
            {icon}
          </div>

          <h4 className="text-xl text-gray-900 dark:text-white mb-1 pr-14">
            {name}
          </h4>
          <p className="text-purple-600 dark:text-purple-400">
            {title}
          </p>

          {/* Bottom Accent */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-amber-500 shimmer-effect"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Committee() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { committeeMembers } = useData();

  const getIconForRole = (title: string) => {
    if (title.includes('সভাপতি') && !title.includes('সহ')) return <Crown className="w-6 h-6 text-white" />;
    if (title.includes('সহ-সভাপতি')) return <Shield className="w-6 h-6 text-white" />;
    if (title.includes('সম্পাদক')) return <Briefcase className="w-6 h-6 text-white" />;
    if (title.includes('কোষাধ্যক্ষ')) return <Building className="w-6 h-6 text-white" />;
    if (title.includes('প্রচার')) return <Megaphone className="w-6 h-6 text-white" />;
    return <Users className="w-6 h-6 text-white" />;
  };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background Chess Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 60px,
            #000 60px,
            #000 120px
          )`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-gray-900 dark:text-white mb-4">
            Our <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-amber-500 bg-clip-text text-transparent">Leadership</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Meet the dedicated committee members driving chess excellence in Dinajpur
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {committeeMembers.map((member, index) => (
            <MemberCard 
              key={member.id} 
              name={member.name}
              title={member.title}
              photo={member.photo}
              icon={getIconForRole(member.title)}
              delay={index * 0.05} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
