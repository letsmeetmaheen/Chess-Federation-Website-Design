import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useData } from '../contexts/DataContext';

export default function Gallery() {
  const { galleryItems: allItems } = useData();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Filter only visible items
  const galleryImages = allItems
    .filter(item => item.visible)
    .map((item, index) => ({
      url: item.url,
      title: item.title,
      span: index === 0 ? 'md:col-span-2 md:row-span-2' : index % 3 === 0 ? 'md:col-span-2' : '',
    }));

  const timeline = [
    { year: '2024', event: 'Dinajpur District Championship - Record 200+ participants' },
    { year: '2023', event: 'First International Master from Dinajpur' },
    { year: '2022', event: 'Youth Development Program Launch' },
    { year: '2021', event: 'Women\'s Chess Initiative Success' },
    { year: '2020', event: 'Digital Tournament Platform Introduced' },
  ];

  return (
    <section id="gallery" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-gray-900 dark:text-white mb-4">
            Moments & <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-amber-500 bg-clip-text text-transparent">Memories</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Capturing the passion and excellence of our chess community
          </p>
        </motion.div>

        {/* Masonry Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-20">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative group cursor-pointer overflow-hidden rounded-xl ${image.span}`}
              onClick={() => setSelectedImage(image.url)}
            >
              <div className="relative h-64 md:h-full min-h-[16rem] overflow-hidden">
                <ImageWithFallback
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                
                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center p-6"
                >
                  <div className="text-white text-center w-full">
                    <ZoomIn className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-lg">{image.title}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute top-4 right-4 text-white bg-red-600 rounded-full p-3 hover:bg-red-700 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-6 h-6" />
              </motion.button>
              
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="max-w-5xl max-h-[90vh]"
              >
                <img
                  src={selectedImage}
                  alt="Gallery"
                  className="w-full h-full object-contain rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Historical Moments Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-3xl text-center text-gray-900 dark:text-white mb-12">
            Historical <span className="bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent">Moments</span>
          </h3>

          <div className="space-y-6">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 items-start group"
              >
                <div className="flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg royal-glow elastic-bounce"
                  >
                    {item.year}
                  </motion.div>
                </div>
                
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex-1 glass-royal rounded-xl p-6 shadow-lg group-hover:border-purple-500 dark:group-hover:border-purple-400 gel-transition"
                >
                  <p className="text-lg text-gray-700 dark:text-gray-300">{item.event}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
