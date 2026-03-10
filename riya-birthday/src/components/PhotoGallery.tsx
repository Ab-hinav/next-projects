"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image as ImageIcon } from 'lucide-react';

// You can easily replace these with actual image paths later
export interface Photo {
  id: number;
  src: string;
  width: number;
  height: number;
  alt: string;
  message?: string;
}

const placeholderPhotos: Photo[] = [
  { id: 1, src: "/images/memories/firstMeet.jpg", width: 800, height: 800, alt: "Memory 1", message: "The first day we met officially for marriage, how nervous we were then :)" },
  { id: 2, src: "/images/memories/ringceremony.jpg", width: 800, height: 800, alt: "Memory 2", message: "Remember how cold it was and how tensed you were about the dance performance. It was an amazing day, we were the real stars of the night." },
  { id: 3, src: "/images/memories/reception2.jpeg", width: 800, height: 800, alt: "Memory 3", message: "Ah the photoshoot in the cold weather, but we still managed to look hot :)" },
  { id: 4, src: "/images/memories/indoremeet.jpg", width: 800, height: 800, alt: "Memory 4", message: "Things happened on this visit , that no one knows(hehe) , but it was a very special visit for me and us " },
  { id: 5, src: "/images/memories/unofficialmeet.jpg", width: 800, height: 800, alt: "Memory 5", message: "Its the unofficial meet, had lots of fun that night , you were looking stunning" },
  { id: 6, src: "/images/memories/wedding.jpg", width: 800, height: 800, alt: "Memory 6", message: "A snapshot of pure happiness." },
  { id: 7, src: "/images/memories/darjeeling.jpg", width: 800, height: 800, alt: "Memory 7", message: "Darjeeling diaries, had to add this one for obvious reasons hehe" },
  { id: 8, src: "/images/memories/darjeeling2.jpg", width: 800, height: 800, alt: "Memory 8", message: "Darjeeling diaries, my little tea picker :)" },
  { id: 9, src: "/images/memories/neemrana.jpg", width: 800, height: 800, alt: "Memory 9", message: "Look at us the newlyweds taking the cliche picks :)" },
  { id: 10, src: "/images/memories/neemrana2.jpg", width: 800, height: 800, alt: "Memory 10", message: "We should star in some calender shoot :)" },
  { id: 11, src: "/images/memories/pelling.jpg", width: 800, height: 800, alt: "Memory 11", message: "Some of the best parts of our honeymoon , lets go again soon" },
  { id: 12, src: "/images/memories/pelling2.jpg", width: 800, height: 800, alt: "Memory 12", message: " Look how happy you are :) " },
  { id: 13, src: "/images/memories/rosepic.jpg", width: 800, height: 800, alt: "Memory 13", message: " You fit right in my life, just like a rose  " },
  { id: 14, src: "/images/memories/trek1.jpg", width: 800, height: 800, alt: "Memory 14", message: " Fears were conquered here , smiles were won :) " },
  { id: 15, src: "/images/memories/temple.jpg", width: 800, height: 800, alt: "Memory 15", message: " I like this pic of us , we should visit more temples like these , so we have lots of ashirwaad" },
  { id: 16, src: "/images/memories/rajaseat.jpg", width: 800, height: 800, alt: "Memory 16", message: " You are so happy around elephants , views and me  " },
  { id: 17, src: "/images/memories/dubare.jpg", width: 800, height: 800, alt: "Memory 13", message: " Fun times crossing river , bathing elephants and almost catching snakes :)" },

];

export default function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<Photo | null>(null);

  return (
    <section id="memories" className="py-24 px-6 bg-white relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-rose-900 mb-4 font-semibold">Our Beautiful Memories</h2>
          <div className="w-24 h-1 bg-gold/40 mx-auto rounded-full"></div>
          <p className="mt-6 text-slate-600 max-w-2xl mx-auto font-sans text-lg">
            A glimpse into the magical moments we&apos;ve shared so far.
          </p>
        </motion.div>

        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {placeholderPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95, rotate: index % 2 === 0 ? -4 : 4 }}
              whileInView={{ opacity: 1, scale: 1, rotate: index % 2 === 0 ? -2 : 2 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden bg-white p-3 pb-12 rounded-sm cursor-pointer group break-inside-avoid shadow-sm hover:shadow-2xl transition-all border border-slate-100"
              onClick={() => setSelectedImage(photo)}
            >
              <div className="aspect-w-auto aspect-h-auto overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <ImageIcon className="text-white w-8 h-8 opacity-80" />
              </div>
              <div className="absolute bottom-4 left-0 right-0 text-center px-2">
                <span className="font-serif italic text-sm text-slate-500 line-clamp-1">{photo.message || "A beautiful memory"}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110] p-2"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <div 
               className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center p-4"
               onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[75vh] object-contain rounded-md shadow-2xl"
              />
              {selectedImage.message && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="mt-6 text-center max-w-2xl px-4"
                >
                  <p className="font-serif text-xl md:text-2xl text-rose-50/90 leading-relaxed italic drop-shadow-md">
                    "{selectedImage.message}"
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
