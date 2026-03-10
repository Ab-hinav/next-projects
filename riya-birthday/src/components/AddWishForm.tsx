"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, ImagePlus, X, Image as ImageIcon } from 'lucide-react';
import { addWish } from '@/actions/wishes';

export default function AddWishForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setErrorMsg('');
    
    try {
      const res = await addWish(formData);
      
      if (res.success) {
        setIsSuccess(true);
        formRef.current?.reset();
        setImagePreview(null);
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setErrorMsg(res.error || 'Something went wrong.');
      }
    } catch (err) {
      setErrorMsg('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="add-wish" className="py-24 px-6 bg-rose-50/50">
      <div className="max-w-3xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
           className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-rose-100"
        >
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl text-rose-900 mb-4 font-semibold">Leave a Wish</h2>
            <p className="text-slate-600 font-sans">
              Share your love, memories, and blessings for Riya on her special day. Add a photo if you'd like!
            </p>
          </div>

          {isSuccess ? (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
              <h3 className="text-2xl font-serif text-slate-800 mb-2">Thank You!</h3>
              <p className="text-slate-600">Your beautiful wish has been added to the memories.</p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="mt-8 text-rose-600 font-medium hover:text-rose-700 underline underline-offset-4"
              >
                Send another wish
              </button>
            </motion.div>
          ) : (
            <form ref={formRef} action={handleSubmit} className="space-y-6" suppressHydrationWarning>
              {errorMsg && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm italic font-medium">
                  {errorMsg}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-700 ml-1">Your Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none transition-all bg-rose-50/30"
                    placeholder="John Doe"
                    suppressHydrationWarning
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="relation" className="text-sm font-medium text-slate-700 ml-1">Relation (Optional)</label>
                  <input
                    id="relation"
                    name="relation"
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none transition-all bg-rose-50/30"
                    placeholder="Friend, Sister, Colleague..."
                    suppressHydrationWarning
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-700 ml-1">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none transition-all bg-rose-50/30 resize-none"
                  placeholder="Write a heartfelt message..."
                  suppressHydrationWarning
                />
              </div>

              {/* Enhanced Photo Upload UI */}
              <div className="space-y-2 pt-2">
                <label htmlFor="passcode" className="text-sm font-medium text-slate-700 ml-1">Secret Passcode *</label>
                <input
                  id="passcode"
                  name="passcode"
                  type="password"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none transition-all bg-rose-50/30 mb-4"
                  placeholder="Ask Abhinav for the passcode"
                  suppressHydrationWarning
                />
                
                <label className="text-sm font-medium text-slate-700 ml-1 flex items-center gap-2 mt-4">
                  <ImageIcon className="w-4 h-4 text-rose-400" />
                  Attach a Photo (Optional)
                </label>
                
                <div className="relative">
                  {!imagePreview ? (
                    <div 
                      className="border-2 border-dashed border-rose-200 hover:border-rose-400 bg-rose-50/20 rounded-xl p-6 transition-all group cursor-pointer flex flex-col items-center justify-center gap-2"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ImagePlus className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-medium text-slate-600">Click to upload an image</p>
                      <p className="text-xs text-slate-500 italic">Supports JPG, PNG, HEIC from Mobile</p>
                    </div>
                  ) : (
                    <div className="relative w-full sm:w-64 aspect-square rounded-xl overflow-hidden border border-rose-200 shadow-sm group">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={removeImage}
                          className="bg-white/90 text-rose-600 rounded-full p-2 hover:scale-110 hover:bg-white transition-all shadow-lg"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Hidden input - note accept attribute explicitly includes HEIC */}
                  <input
                    ref={fileInputRef}
                    id="image"
                    name="image"
                    type="file"
                    accept="image/jpeg, image/png, image/webp, image/heic, image/heif"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-medium tracking-wide transition-all shadow-[0_4px_14px_0_rgba(225,29,72,0.39)] hover:shadow-[0_6px_20px_rgba(225,29,72,0.23)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-8"
              >
                {isSubmitting ? (
                  <span className="animate-pulse tracking-wide">Adding Memory...</span>
                ) : (
                  <>
                    <span>Add to the Memories</span>
                    <Send className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
