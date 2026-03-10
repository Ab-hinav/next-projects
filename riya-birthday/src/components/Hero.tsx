"use client";

import { motion } from 'framer-motion';
import { siteData } from '@/data/siteContent';
import { Heart } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 pt-20">
      {/* Background elegant gradient blobs */}
      <div className="absolute top-0 w-full h-full overflow-hidden -z-10 bg-rose-50/50">
        <div className="absolute top-20 left-10 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gold/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        
        {/* Floating Particles */}
        <motion.div
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-3 h-3 bg-rose-400 rounded-full blur-[1px]"
        />
        <motion.div
          animate={{ y: [0, 40, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-1/4 w-4 h-4 bg-gold rounded-full blur-[2px]"
        />
        <motion.div
          animate={{ x: [0, 20, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-rose-300 rounded-full blur-[1px]"
        />
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-rose-200 rounded-full blur-[1px]"
        />
      </div>

      <div className="max-w-4xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="flex justify-center mb-6">
            <motion.div
               animate={{ scale: [1, 1.1, 1] }}
               transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Heart className="w-10 h-10 text-rose-500 fill-rose-300 drop-shadow-sm" />
            </motion.div>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-rose-900 mb-6 font-bold leading-tight drop-shadow-md">
            {siteData.hero.headline}
          </h1>
          <p className="font-sans text-lg md:text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed text-balance">
            {siteData.hero.subheadline}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
        >
          <a
            href="#wishes"
            className="px-8 py-3.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-medium tracking-wide transition-all shadow-[0_4px_14px_0_rgba(225,29,72,0.39)] hover:shadow-[0_6px_20px_rgba(225,29,72,0.4)] hover:-translate-y-1 w-full sm:w-auto text-center"
          >
            {siteData.hero.ctaViewWishes}
          </a>
          <a
            href="#add-wish"
            className="px-8 py-3.5 rounded-full bg-white hover:bg-rose-50 border border-rose-200 text-rose-700 font-medium tracking-wide transition-all shadow-sm w-full sm:w-auto text-center"
          >
            {siteData.hero.ctaLeaveWish}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
