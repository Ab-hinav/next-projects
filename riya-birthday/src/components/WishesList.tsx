"use client";

import { motion } from 'framer-motion';
import { Wish } from '@/data/wishes';
import { Quote } from 'lucide-react';
import Image from 'next/image';

interface WishesListProps {
  wishes: Wish[];
}

export default function WishesList({ wishes }: WishesListProps) {
  if (!wishes || wishes.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500 font-sans italic">Be the first to leave a wish!</p>
      </div>
    );
  }

  return (
    <section id="wishes" className="py-24 px-6 bg-white relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-rose-900 mb-4 font-semibold">Wishes From Loved Ones</h2>
          <div className="w-24 h-1 bg-gold/40 mx-auto rounded-full"></div>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {wishes.map((wish, index) => (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
              className="break-inside-avoid glass-card rounded-2xl p-6 md:p-8 border border-white/50 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all group inline-block w-full relative overflow-hidden"
            >
              {/* Decorative Subtle Glowing Orb inside card */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-200/40 rounded-full blur-2xl group-hover:bg-rose-300/50 transition-colors"></div>

              {wish.imageUrl && (
                <div className="mb-6 relative w-full h-auto overflow-hidden rounded-xl bg-white shadow-sm border border-rose-50/50">
                  <img
                    src={wish.imageUrl}
                    alt={`Photo from ${wish.name}`}
                    className="w-full h-auto object-cover max-h-[400px] hover:scale-[1.02] transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              )}
              
              <Quote className="w-8 h-8 text-rose-400/50 mb-4 group-hover:text-rose-500/60 transition-colors group-hover:scale-110 transform duration-300" />
              <p className="font-serif italic text-slate-700 leading-relaxed mb-6 whitespace-pre-wrap text-base md:text-lg relative z-10">
                "{wish.message}"
              </p>
              
              <div className="flex items-center justify-between border-t border-rose-200/60 pt-4 relative z-10">
                <div>
                  <h4 className="font-serif font-semibold text-rose-900 text-lg">{wish.name}</h4>
                  {wish.relation && (
                    <span className="text-xs text-rose-500 font-medium tracking-wide uppercase mt-1 block">
                      {wish.relation}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
