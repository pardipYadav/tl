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
    <section className="relative min-h-[74vh] overflow-hidden rounded-[2rem] border border-[#e8e0d0]/60 shadow-card">
      <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline>
        <source src="https://cdn.coverr.co/videos/coverr-aerial-shot-of-a-beautiful-beach-5178/1080p.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-hero-gradient" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto flex min-h-[74vh] max-w-5xl flex-col items-center justify-center px-4 text-center"
      >
        <p className="rounded-full border border-brandGold/50 bg-white/15 px-4 py-1 text-sm font-semibold tracking-wide text-white backdrop-blur-sm">
          Traveling · Importer · Exporter
        </p>
        <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.06] text-white md:text-6xl">
          Divine Simparna
          <br />
          <span className="text-brandGold">Premium Journeys</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/90">
          Handcrafted itineraries, global logistics expertise, and seamless luxury travel planning.
        </p>

        <div className="mt-8 flex w-full max-w-2xl rounded-2xl bg-white p-2 shadow-card">
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Search destinations like Bali, Dubai, Maldives..."
            className="w-full rounded-xl px-4 py-3 text-brandNavy outline-none"
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          />
          <button
            onClick={onSearch}
            aria-label="Search packages"
            className="rounded-xl bg-brandNavy px-5 text-white transition hover:bg-[#16396a]"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-white/95">
          <span className="rounded-full bg-white/20 px-3 py-1.5 backdrop-blur-sm">
            <ShieldCheck className="mr-1 inline h-4 w-4" />
            Verified Packages
          </span>
          <span className="rounded-full bg-white/20 px-3 py-1.5 backdrop-blur-sm">
            <MapPin className="mr-1 inline h-4 w-4" />
            50+ Destinations
          </span>
          <span className="rounded-full bg-white/20 px-3 py-1.5 backdrop-blur-sm">
            <Sparkles className="mr-1 inline h-4 w-4 text-brandGold" />
            Best Price Promise
          </span>
        </div>
      </motion.div>
    </section>
  );
}
