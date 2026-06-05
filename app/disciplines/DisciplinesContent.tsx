'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';
import { DISCIPLINE_IMAGES } from '@/lib/images';

const disciplineDetails: Record<string, { fullName: string; tagline: string }> = {
  structural:         { fullName: 'Structural Engineering',            tagline: 'Bridges, buildings & heavy infrastructure' },
  transportation:     { fullName: 'Transportation Engineering',        tagline: 'Highways, traffic & transit systems' },
  geotechnical:       { fullName: 'Geotechnical Engineering',          tagline: 'Soils, foundations & slope stability' },
  'water-resources':  { fullName: 'Water Resources & Hydrology',       tagline: 'Stormwater, hydrology & flood control' },
  environmental:      { fullName: 'Environmental Engineering',         tagline: 'Remediation, air quality & sustainability' },
  wastewater:         { fullName: 'Wastewater & Utilities',            tagline: 'Treatment plants, pipelines & utilities' },
  construction:       { fullName: 'Construction & Project Management', tagline: 'Field engineering & project delivery' },
  'land-development': { fullName: 'Land Development & Urban Planning', tagline: 'Site civil, entitlements & planning' },
  surveying:          { fullName: 'Surveying & Geospatial',            tagline: 'Land survey, GIS & LiDAR mapping' },
  coastal:            { fullName: 'Coastal & Marine Engineering',      tagline: 'Shoreline protection & coastal resilience' },
};

export default function DisciplinesContent() {
  const [disciplines, setDisciplines] = useState<Array<{ slug: string; description: string }>>([]);
  const [jobCounts, setJobCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [{ data: discs }, { data: jobs }] = await Promise.all([
        insforge.database.from('disciplines').select('*').order('slug', { ascending: true }),
        insforge.database.from('jobs').select('discipline_slug'),
      ]);
      setDisciplines(discs || []);
      const counts: Record<string, number> = {};
      (jobs || []).forEach((j: { discipline_slug: string }) => {
        counts[j.discipline_slug] = (counts[j.discipline_slug] || 0) + 1;
      });
      setJobCounts(counts);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0D0D0D] py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block bg-[#CC1016]/20 text-[#CC1016] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">All 10 Disciplines</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Civil Engineering <span className="text-[#CC1016]">Specialisations</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            We place engineers across every discipline. Select your specialisation to see active roles, salary ranges, and how we can help.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-[#E5E5E5] animate-pulse">
                  <div className="h-40 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {disciplines.map((disc) => {
                const detail = disciplineDetails[disc.slug];
                const count = jobCounts[disc.slug] || 0;
                const img = DISCIPLINE_IMAGES[disc.slug];
                if (!detail) return null;
                return (
                  <Link key={disc.slug} href={`/disciplines/${disc.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-[#E5E5E5] hover:shadow-xl hover:border-[#CC1016] transition-all duration-300 hover:-translate-y-1">
                    <div className="h-40 bg-[#0D0D0D] relative overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt={detail.fullName} className="w-full h-full object-cover opacity-30 mix-blend-overlay" />
                      <div className="absolute inset-0 flex items-end p-5">
                        <div>
                          <h3 className="text-white font-bold text-xl leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                            {detail.fullName}
                          </h3>
                          <p className="text-white/70 text-sm mt-0.5">{detail.tagline}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-[#6B6B6B] text-sm mb-4">{disc.description}</p>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${count > 0 ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {count > 0 ? `${count} active role${count > 1 ? 's' : ''}` : 'Coming soon'}
                        </span>
                        <span className="text-[#CC1016] text-sm font-semibold group-hover:underline">Explore →</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0D0D0D] text-center px-4">
        <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Not Sure Which Discipline Fits?
        </h2>
        <p className="text-white/70 mb-8 max-w-xl mx-auto">Talk to a specialist recruiter who understands your background and can match you to the right opportunity.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register/candidate" className="btn-pink">Submit Your Resume</Link>
          <Link href="/contact" className="btn-outline-white">Speak to a Recruiter</Link>
        </div>
      </section>
    </div>
  );
}
