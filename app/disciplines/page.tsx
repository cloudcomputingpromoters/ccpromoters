export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { insforge } from '@/lib/insforge';
import { DISCIPLINE_IMAGES } from '@/lib/images';

const disciplineDetails: Record<string, { fullName: string; tagline: string; color: string }> = {
  structural:       { fullName: 'Structural Engineering',                 tagline: 'Bridges, buildings & heavy infrastructure',      color: 'from-rose-600 to-pink-700' },
  transportation:   { fullName: 'Transportation Engineering',             tagline: 'Highways, traffic & transit systems',            color: 'from-purple-600 to-indigo-700' },
  geotechnical:     { fullName: 'Geotechnical Engineering',               tagline: 'Soils, foundations & slope stability',           color: 'from-amber-600 to-orange-700' },
  'water-resources':{ fullName: 'Water Resources & Hydrology',            tagline: 'Stormwater, hydrology & flood control',          color: 'from-cyan-600 to-blue-700' },
  environmental:    { fullName: 'Environmental Engineering',              tagline: 'Remediation, air quality & sustainability',      color: 'from-green-600 to-emerald-700' },
  wastewater:       { fullName: 'Wastewater & Utilities',                 tagline: 'Treatment plants, pipelines & utilities',        color: 'from-teal-600 to-cyan-700' },
  construction:     { fullName: 'Construction & Project Management',      tagline: 'Field engineering & project delivery',           color: 'from-orange-600 to-amber-700' },
  'land-development':{ fullName: 'Land Development & Urban Planning',     tagline: 'Site civil, entitlements & planning',            color: 'from-indigo-600 to-violet-700' },
  surveying:        { fullName: 'Surveying & Geospatial',                 tagline: 'Land survey, GIS & LiDAR mapping',              color: 'from-slate-600 to-gray-700' },
  coastal:          { fullName: 'Coastal & Marine Engineering',           tagline: 'Shoreline protection & coastal resilience',      color: 'from-blue-600 to-cyan-700' },
};

async function getDisciplines() {
  const { data } = await insforge.database.from('disciplines').select('*').order('slug', { ascending: true });
  return data || [];
}

async function getJobCountByDiscipline() {
  const { data } = await insforge.database
    .from('jobs')
    .select('discipline_slug')
    .eq('status', 'active');
  const counts: Record<string, number> = {};
  (data || []).forEach((j: { discipline_slug: string }) => {
    counts[j.discipline_slug] = (counts[j.discipline_slug] || 0) + 1;
  });
  return counts;
}

export const metadata = {
  title: 'Civil Engineering Disciplines | CCPromoters',
  description: 'CCPromoters places engineers across all 10 civil engineering disciplines. Find roles in structural, transportation, geotechnical, environmental, water resources, and more.',
};

export default async function DisciplinesPage() {
  const [disciplines, jobCounts] = await Promise.all([getDisciplines(), getJobCountByDiscipline()]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#1A3A8F] to-[#163298] py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block bg-[#D4AF37]/20 text-[#D4AF37] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">All 10 Disciplines</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Civil Engineering <span className="text-[#D4AF37]">Specialisations</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            We place engineers across every discipline. Select your specialisation to see active roles, salary ranges, and how we can help.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-4 bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {disciplines.map((disc: { slug: string; description: string }) => {
              const detail = disciplineDetails[disc.slug];
              const count = jobCounts[disc.slug] || 0;
              const img = DISCIPLINE_IMAGES[disc.slug];
              if (!detail) return null;
              return (
                <Link key={disc.slug} href={`/disciplines/${disc.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] hover:shadow-xl hover:border-[#D4AF37] transition-all duration-300 hover:-translate-y-1">
                  <div className={`h-40 bg-gradient-to-br ${detail.color} relative overflow-hidden`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={detail.fullName} className="w-full h-full object-cover opacity-30 mix-blend-overlay" />
                    <div className="absolute inset-0 flex items-end p-5">
                      <div>
                        <h3 className="text-white font-bold text-xl leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                          {detail.fullName}
                        </h3>
                        <p className="text-white/80 text-sm mt-0.5">{detail.tagline}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-[#4A5568] text-sm mb-4">{disc.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${count > 0 ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {count > 0 ? `${count} active role${count > 1 ? 's' : ''}` : 'Coming soon'}
                      </span>
                      <span className="text-[#D4AF37] text-sm font-semibold group-hover:underline">Explore →</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1A3A8F] text-center px-4">
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
