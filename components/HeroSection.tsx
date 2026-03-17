'use client';

import { motion } from 'framer-motion';
import { MapPin, Search, ShieldCheck, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function HeroSection() {
  const [destination, setDestination] = useState('');
  const router = useRouter();

  const onSearch = () => {
    if (!destination.trim()) return;
    router.push(`/packages?destination=${encodeURIComponent(destination.trim())}`);
  };

  return (
    <section className="relative min-h-[74vh] overflow-hidden rounded-[2rem] border border-slate-200/60 shadow-card">
      <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline>
        <source src="https://cdn.coverr.co/videos/coverr-aerial-shot-of-a-beautiful-beach-5178/1080p.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(8,47,128,0.86),rgba(11,94,215,0.58),rgba(249,115,22,0.55))]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto flex min-h-[74vh] max-w-5xl flex-col items-center justify-center px-4 text-center"
      >
        <p className="rounded-full border border-white/40 bg-white/20 px-4 py-1 text-sm font-semibold text-white">Trusted by 10,000+ Travelers</p>
        <h1 className="mt-5 text-4xl font-bold leading-[1.06] text-white md:text-6xl">
          Premium Tours,
          <br />
          Seamless Bookings
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/90">Discover handcrafted itineraries, 24x7 support, and luxury travel planning.</p>

        <div className="mt-8 flex w-full max-w-2xl rounded-2xl bg-white p-2 shadow-card">
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Search destinations like Bali, Dubai, Maldives..."
            className="w-full rounded-xl px-4 py-3 outline-none"
          />
          <button onClick={onSearch} className="rounded-xl bg-brandBlue px-5 text-white transition hover:bg-blue-700">
            <Search className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-white/95">
          <span className="rounded-full bg-white/20 px-3 py-1.5"><ShieldCheck className="mr-1 inline h-4 w-4" />Verified Packages</span>
          <span className="rounded-full bg-white/20 px-3 py-1.5"><MapPin className="mr-1 inline h-4 w-4" />50+ Destinations</span>
          <span className="rounded-full bg-white/20 px-3 py-1.5"><Sparkles className="mr-1 inline h-4 w-4" />Best Price Promise</span>
        </div>
      </motion.div>
    </section>
  );
}
