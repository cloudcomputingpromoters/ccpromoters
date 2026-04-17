'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';
import { MapPin } from 'lucide-react';

type Pin = { id: string; state: string; city: string; latitude: number; longitude: number; role_type: string; discipline: string; firm_type: string; year: number };

const disciplineColors: Record<string, string> = {
  Structural: '#D4AF37', Transportation: '#7C3AED', Geotechnical: '#D97706', 'Water Resources': '#0891B2',
  Environmental: '#059669', Wastewater: '#0D9488', Construction: '#EA580C', 'Land Development': '#4F46E5', Surveying: '#475569', Coastal: '#2563EB',
};

export default function PlacementMapPage() {
  const [pins, setPins] = useState<Pin[]>([]);
  const [selected, setSelected] = useState<Pin | null>(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    insforge.database.from('placement_pins').select('*').eq('is_active', true).then(({ data }) => setPins((data as Pin[]) || []));
  }, []);

  const disciplines = ['All', ...Array.from(new Set(pins.map(p => p.discipline)))];
  const filtered = filter === 'All' ? pins : pins.filter(p => p.discipline === filter);

  // Simple SVG US map approximation using state positions
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-[#1A3A8F] to-[#163298] py-20 px-4 text-center">
        <span className="inline-block bg-[#D4AF37]/20 text-[#D4AF37] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Where We Place</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
          US Placement <span className="text-[#D4AF37]">Map</span>
        </h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Every pin represents a successful civil engineering placement by CCPromoters. We are active in 20+ states across all disciplines.
        </p>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Filter chips */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {disciplines.map(d => (
              <button key={d} onClick={() => setFilter(d)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${filter === d ? 'text-white border-transparent' : 'bg-white border-[#E2E8F0] text-[#4A5568] hover:border-[#D4AF37]'}`}
                style={filter === d ? { backgroundColor: disciplineColors[d] || '#D4AF37' } : {}}>
                {d}
              </button>
            ))}
          </div>

          {/* Map + list grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Placement list */}
            <div className="lg:col-span-1 space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {filtered.map(pin => (
                <button key={pin.id} onClick={() => setSelected(selected?.id === pin.id ? null : pin)}
                  className={`w-full text-left bg-white rounded-xl border p-4 transition-all hover:shadow-md ${selected?.id === pin.id ? 'border-[#D4AF37] shadow-md' : 'border-[#E2E8F0]'}`}>
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="shrink-0 mt-0.5" style={{ color: disciplineColors[pin.discipline] || '#D4AF37' }} />
                    <div>
                      <p className="font-semibold text-[#1A3A8F] text-sm">{pin.role_type}</p>
                      <p className="text-[#4A5568] text-xs">{pin.city}, {pin.state} · {pin.year}</p>
                      <p className="text-[#4A5568] text-xs">{pin.firm_type}</p>
                      <span className="inline-block mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: disciplineColors[pin.discipline] || '#D4AF37' }}>{pin.discipline}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Visual map */}
            <div className="lg:col-span-2 bg-[#F7F9FC] rounded-2xl border border-[#E2E8F0] p-6 min-h-[500px] relative overflow-hidden">
              <h3 className="font-bold text-[#1A3A8F] mb-4">Recent Placements by Location</h3>
              {/* Grid-based placement display */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {filtered.map(pin => (
                  <div key={pin.id} onClick={() => setSelected(selected?.id === pin.id ? null : pin)}
                    className={`bg-white rounded-xl p-4 border cursor-pointer transition-all hover:shadow-md ${selected?.id === pin.id ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/20' : 'border-[#E2E8F0]'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: disciplineColors[pin.discipline] || '#D4AF37' }} />
                      <span className="text-xs font-bold text-[#1A3A8F]">{pin.city}, {pin.state}</span>
                    </div>
                    <p className="text-[#4A5568] text-xs leading-snug">{pin.role_type}</p>
                    <p className="text-[#D4AF37] text-[10px] font-semibold mt-1">{pin.discipline} · {pin.year}</p>
                  </div>
                ))}
              </div>

              {selected && (
                <div className="absolute bottom-4 right-4 bg-white rounded-xl shadow-xl border border-[#D4AF37] p-5 max-w-xs">
                  <button onClick={() => setSelected(null)} className="absolute top-2 right-2 text-[#4A5568] hover:text-[#1A3A8F]">✕</button>
                  <div className="w-2 h-2 rounded-full mb-2" style={{ backgroundColor: disciplineColors[selected.discipline] || '#D4AF37' }} />
                  <h4 className="font-bold text-[#1A3A8F] mb-1">{selected.role_type}</h4>
                  <p className="text-[#D4AF37] text-sm font-semibold mb-1">{selected.discipline}</p>
                  <p className="text-[#4A5568] text-sm">{selected.city}, {selected.state}</p>
                  <p className="text-[#4A5568] text-sm">{selected.firm_type} · {selected.year}</p>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[
              { num: '300+', label: 'Total Placements' },
              { num: '20+', label: 'States Served' },
              { num: '10', label: 'Disciplines Covered' },
              { num: '< 3 Weeks', label: 'Avg. Time to Offer' },
            ].map(s => (
              <div key={s.label} className="bg-[#1A3A8F] rounded-xl p-5 text-center text-white">
                <div className="text-2xl font-extrabold text-[#D4AF37] mb-1">{s.num}</div>
                <div className="text-white/70 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#D4AF37] text-center px-4">
        <h2 className="text-2xl font-bold text-white mb-3">Could Your Next Placement Be on This Map?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register/candidate" className="bg-white text-[#D4AF37] font-bold px-8 py-3 rounded-lg hover:bg-white/90 transition-colors">Submit Your Resume</Link>
          <Link href="/register/employer" className="border border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">Hire with CCPromoters</Link>
        </div>
      </section>
    </div>
  );
}
