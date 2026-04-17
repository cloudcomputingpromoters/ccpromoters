'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';

const disciplines = [
  'Structural Engineers',
  'Transportation Planners',
  'Geotechnical Engineers',
  'Water Resources Engineers',
  'Environmental Engineers',
  'Construction Managers',
  'Coastal Engineers',
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex(i => (i + 1) % disciplines.length);
        setVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#1A3A8F] flex items-center overflow-hidden">
      {/* Full-bleed photo background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/construction-sunset.jpg"
          alt=""
          className="w-full h-full object-cover object-center opacity-35"
        />
      </div>
      {/* Gradient overlay — stronger on left for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A3A8F] via-[#1A3A8F]/85 to-[#1A3A8F]/20" />

      {/* Pink accent line bottom-left */}
      <div className="absolute bottom-0 left-0 w-1/3 h-1 bg-gradient-to-r from-[#D4AF37] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: copy */}
        <div>
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
            <span className="text-[#D4AF37] text-sm font-semibold">200+ Active Civil Engineering Roles</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
            The Civil Engineering Talent Partner That{' '}
            <span className="text-[#D4AF37]">Speaks Your Language</span>
          </h1>

          <p className="text-white/70 text-lg mb-8 max-w-xl">
            From structural design to transportation planning — we connect the best engineers with the best projects across every civil discipline.
          </p>

          {/* Typewriter */}
          <div className="flex items-center gap-3 mb-10">
            <span className="text-white/50 text-sm">Now placing:</span>
            <span
              className="text-[#D4AF37] font-bold text-lg transition-opacity duration-400"
              style={{ opacity: visible ? 1 : 0 }}
            >
              {disciplines[index]}
            </span>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <Link href="/jobs"
              className="inline-flex items-center gap-2 bg-[#D4AF37] text-white font-semibold px-7 py-4 rounded-lg hover:bg-[#B8960C] transition-all hover:shadow-lg hover:-translate-y-0.5 text-base">
              Explore Open Roles <ArrowRight size={18} />
            </Link>
            <Link href="/register/employer"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-7 py-4 rounded-lg hover:bg-white hover:text-[#1A3A8F] transition-all text-base">
              Request Engineering Talent
            </Link>
          </div>
        </div>

        {/* Right: illustration + floating stats */}
        <div className="hidden lg:flex flex-col gap-4 relative">
          {/* Main photo card */}
          <div className="relative w-full rounded-2xl overflow-hidden border border-white/10"
               style={{ height: '340px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/engineers-site.jpg"
              alt="Two civil engineers in hard hats reviewing large-scale infrastructure construction project at sunset"
              className="w-full h-full object-cover object-center"
            />
            {/* Gradient fade on bottom */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#1A3A8F]/90 to-transparent" />
            {/* Subtle gold tint overlay */}
            <div className="absolute inset-0 bg-[#1A3A8F]/20" />
          </div>
          {/* Floating stat chips */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: '326k+', label: 'Engineers in Network' },
              { value: '95%',   label: 'Satisfaction Rate'    },
              { value: '48 hr', label: 'First Candidate'      },
              { value: '10',    label: 'Civil Disciplines'     },
            ].map(stat => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3">
                <div className="text-[#D4AF37] font-bold text-lg">{stat.value}</div>
                <div className="text-white/55 text-xs mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-bounce">
        <span className="text-xs">Scroll</span>
        <ChevronDown size={16} />
      </div>
    </section>
  );
}
