import { Heart } from 'lucide-react';
import { siteData } from '@/data/siteContent';

export default function Footer() {
  return (
    <footer className="bg-rose-950 py-12 px-6 text-center text-rose-100">
      <div className="flex justify-center items-center mb-6">
        <div className="w-12 h-[1px] bg-rose-800"></div>
        <Heart className="w-5 h-5 mx-4 text-rose-500 fill-rose-500" />
        <div className="w-12 h-[1px] bg-rose-800"></div>
      </div>
      <p className="font-serif tracking-wide text-lg text-rose-200/80">
        {siteData.footer.text}
      </p>
    </footer>
  );
}
