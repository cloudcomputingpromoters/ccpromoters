'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

type Testimonial = {
  id: string;
  quote: string;
  client_name: string;
  client_title: string;
  company: string;
  rating: number;
};

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(i => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (!testimonials.length) return null;

  const t = testimonials[current];

  return (
    <section className="py-20 bg-[#F7F9FC]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Trusted by Engineering Firms <span className="text-[#E91E8C]">Across the US</span>
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-10 md:p-14 relative">
          {/* Big quote mark */}
          <div className="absolute top-6 left-8 text-[#E91E8C] text-8xl font-serif leading-none opacity-20 select-none">
            &ldquo;
          </div>

          {/* Stars */}
          <div className="flex gap-1 mb-6 justify-center">
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} size={20} fill="#E91E8C" className="text-[#E91E8C]" />
            ))}
          </div>

          {/* Quote */}
          <blockquote className="text-[#0B1F3A] text-lg md:text-xl text-center leading-relaxed mb-8 max-w-3xl mx-auto relative z-10">
            &ldquo;{t.quote}&rdquo;
          </blockquote>

          {/* Attribution */}
          <div className="text-center">
            <p className="font-bold text-[#0B1F3A]">{t.client_name}</p>
            <p className="text-[#4A5568] text-sm">{t.client_title} · {t.company}</p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrent(i => (i - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-[#E2E8F0] flex items-center justify-center hover:border-[#E91E8C] hover:text-[#E91E8C] transition-colors">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-[#E91E8C] w-6' : 'bg-[#E2E8F0]'}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent(i => (i + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-[#E2E8F0] flex items-center justify-center hover:border-[#E91E8C] hover:text-[#E91E8C] transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
