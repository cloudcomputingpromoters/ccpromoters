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
    <section className="relative min-h-screen bg-[#0B1F3A] flex items-center overflow-hidden">
      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&q=80')" }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/90 to-[#0B1F3A]/60" />

      {/* Pink accent line bottom-left */}
      <div className="absolute bottom-0 left-0 w-1/3 h-1 bg-gradient-to-r from-[#E91E8C] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: copy */}
        <div>
          <div className="inline-flex items-center gap-2 bg-[#E91E8C]/20 border border-[#E91E8C]/30 rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 bg-[#E91E8C] rounded-full animate-pulse" />
            <span className="text-[#E91E8C] text-sm font-semibold">200+ Active Civil Engineering Roles</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
            The Civil Engineering Talent Partner That{' '}
            <span className="text-[#E91E8C]">Speaks Your Language</span>
          </h1>

          <p className="text-white/70 text-lg mb-8 max-w-xl">
            From structural design to transportation planning — we connect the best engineers with the best projects across every civil discipline.
          </p>

          {/* Typewriter */}
          <div className="flex items-center gap-3 mb-10">
            <span className="text-white/50 text-sm">Now placing:</span>
            <span
              className="text-[#E91E8C] font-bold text-lg transition-opacity duration-400"
              style={{ opacity: visible ? 1 : 0 }}
            >
              {disciplines[index]}
            </span>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <Link href="/jobs"
              className="inline-flex items-center gap-2 bg-[#E91E8C] text-white font-semibold px-7 py-4 rounded-lg hover:bg-[#C0176E] transition-all hover:shadow-lg hover:-translate-y-0.5 text-base">
              Explore Open Roles <ArrowRight size={18} />
            </Link>
            <Link href="/register/employer"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-7 py-4 rounded-lg hover:bg-white hover:text-[#0B1F3A] transition-all text-base">
              Request Engineering Talent
            </Link>
          </div>
        </div>

        {/* Right: stats card */}
        <div className="hidden lg:block">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h3 className="text-white font-bold text-xl mb-6">Why Engineering Firms Choose Us</h3>
            <div className="space-y-5">
              {[
                { label: 'Civil Engineers in Our Network', value: '326,000+', icon: '👷' },
                { label: 'Client Satisfaction Rate', value: '95%', icon: '⭐' },
                { label: 'Annual Job Openings', value: '23,600+', icon: '📋' },
                { label: 'Time to First Candidate', value: '48 hrs', icon: '⚡' },
              ].map(stat => (
                <div key={stat.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#E91E8C]/20 rounded-lg flex items-center justify-center text-lg shrink-0">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-[#E91E8C] font-bold text-xl">{stat.value}</div>
                    <div className="text-white/60 text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <Link href="/about" className="text-[#E91E8C] text-sm font-semibold hover:underline flex items-center gap-1">
                Learn More About CCPromoters <ArrowRight size={14} />
              </Link>
            </div>
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
