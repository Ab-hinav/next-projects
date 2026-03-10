"use client";

import { motion } from 'framer-motion';
import { siteData } from '@/data/siteContent';

export default function SpecialWish() {
  const { husbandWish } = siteData;

  return (
    <section id="special-wish" className="py-24 px-6 relative overflow-hidden bg-rose-50">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8 }}
           className="glass-card rounded-3xl p-8 md:p-14 border border-rose-200 shadow-xl relative overflow-hidden"
        >
          {/* Subtle decoration elements inside the card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full mix-blend-multiply filter blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-300/10 rounded-full mix-blend-multiply filter blur-3xl translate-y-1/3 -translate-x-1/3"></div>

          <div className="relative z-10 flex flex-col md:flex-row gap-10 md:gap-14 items-center">
            
            {/* Portrait Image Section */}
            {(husbandWish as any).imageUrl && (
              <div className="w-full md:w-2/5 flex-shrink-0">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/60 group">
                  <img 
                    src={(husbandWish as any).imageUrl} 
                    alt="Special Portrait" 
                    className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-xl pointer-events-none border border-rose-200/50"></div>
                </div>
              </div>
            )}

            <div className={`w-full ${(husbandWish as any).imageUrl ? 'md:w-3/5' : ''}`}>
              <h2 className={`font-serif text-3xl md:text-5xl text-rose-800 mb-8 font-medium italic ${!(husbandWish as any).imageUrl ? 'text-center' : ''}`}>
                {husbandWish.title}
              </h2>
              
              <div className="space-y-6 font-serif text-lg md:text-xl text-slate-700 leading-relaxed py-2">
                {husbandWish.message.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="whitespace-pre-wrap">{paragraph}</p>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-rose-200/50 text-right pr-2">
                <p className="font-serif italic text-rose-500/80 text-xl">{husbandWish.signoff}</p>
                <p className="font-serif text-2xl text-rose-900 mt-2 font-semibold">{husbandWish.name}</p>
              </div>
            </div>

          </div>
        </motion.div>
      </div>

      {/* Decorative floral or sparkle background patterns */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-rose-400 rounded-full blur-[1px] opacity-60"></div>
      <div className="absolute top-1/3 right-20 w-3 h-3 bg-gold rounded-full blur-[1px] opacity-40"></div>
      <div className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-rose-300 rounded-full blur-[2px] opacity-50"></div>
      
      {/* Animated floating particles */}
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-1/4 w-3 h-3 bg-rose-300 rounded-full blur-[1px]"
      />
      <motion.div
        animate={{ y: [0, 30, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-20 left-1/3 w-2 h-2 bg-gold/60 rounded-full blur-[1px]"
      />
    </section>
  );
}
