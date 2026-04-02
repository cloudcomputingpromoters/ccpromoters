import Link from 'next/link';
import { MapPin, DollarSign, Clock, Award } from 'lucide-react';
import { insforge } from '@/lib/insforge';

const disciplineColors: Record<string, string> = {
  structural: 'bg-pink-100 text-pink-700',
  transportation: 'bg-purple-100 text-purple-700',
  geotechnical: 'bg-amber-100 text-amber-700',
  'water-resources': 'bg-cyan-100 text-cyan-700',
  environmental: 'bg-green-100 text-green-700',
  wastewater: 'bg-red-100 text-red-700',
  construction: 'bg-orange-100 text-orange-700',
  'land-development': 'bg-indigo-100 text-indigo-700',
  surveying: 'bg-slate-100 text-slate-700',
  coastal: 'bg-teal-100 text-teal-700',
};

async function getFeaturedJobs() {
  const { data } = await insforge.database
    .from('jobs')
    .select('id, title, slug, discipline, discipline_slug, employment_type, location_city, location_state, is_remote, salary_min, salary_max, rate_min, rate_max, license_required, posted_at')
    .eq('status', 'active')
    .order('is_featured', { ascending: false })
    .order('posted_at', { ascending: false })
    .limit(6);
  return data || [];
}

function formatSalary(min?: number | null, max?: number | null, rateMin?: number | null, rateMax?: number | null, type?: string) {
  if (type === 'contract' && rateMin && rateMax) return `$${rateMin}–$${rateMax}/hr`;
  if (min && max) return `$${(min / 1000).toFixed(0)}k–$${(max / 1000).toFixed(0)}k`;
  return 'Competitive';
}

export default async function FeaturedJobs() {
  const jobs = await getFeaturedJobs();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Latest Civil Engineering <span className="text-[#E91E8C]">Opportunities</span>
            </h2>
            <p className="text-[#4A5568] mt-2">Hand-picked roles across every discipline, updated daily.</p>
          </div>
          <Link href="/jobs" className="text-[#E91E8C] font-semibold hover:underline shrink-0">
            View All 200+ Roles →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {jobs.map(job => (
            <Link key={job.id} href={`/jobs/${job.slug}`}
              className="group border border-[#E2E8F0] rounded-xl p-6 hover:shadow-lg hover:border-[#E91E8C] transition-all duration-300 hover:-translate-y-0.5 border-l-4 border-l-transparent hover:border-l-[#E91E8C] flex flex-col gap-4 bg-white">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <span className={`discipline-tag ${disciplineColors[job.discipline_slug] || 'bg-gray-100 text-gray-700'}`}>
                    {job.discipline}
                  </span>
                  <span className={`discipline-tag ${job.employment_type === 'contract' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                    {job.employment_type === 'contract' ? 'Contract' : 'Permanent'}
                  </span>
                </div>
                {job.is_remote && (
                  <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full shrink-0">
                    Remote
                  </span>
                )}
              </div>

              <h3 className="font-bold text-[#0B1F3A] text-lg group-hover:text-[#E91E8C] transition-colors leading-snug">
                {job.title}
              </h3>

              <div className="flex flex-wrap gap-4 text-sm text-[#4A5568]">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#E91E8C]" />
                  {job.is_remote ? 'Remote (US)' : `${job.location_city}, ${job.location_state}`}
                </span>
                <span className="flex items-center gap-1.5">
                  <DollarSign size={14} className="text-[#E91E8C]" />
                  {formatSalary(job.salary_min, job.salary_max, job.rate_min, job.rate_max, job.employment_type)}
                </span>
                {job.license_required && (
                  <span className="flex items-center gap-1.5">
                    <Award size={14} className="text-[#E91E8C]" />
                    {job.license_required}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between mt-auto pt-2 border-t border-[#E2E8F0]">
                <span className="flex items-center gap-1 text-xs text-[#4A5568]">
                  <Clock size={12} />
                  {new Date(job.posted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
                <span className="text-[#E91E8C] text-sm font-semibold">View Role →</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/jobs"
            className="inline-block bg-[#E91E8C] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#C0176E] transition-all hover:shadow-lg hover:-translate-y-0.5">
            View All 200+ Civil Engineering Roles →
          </Link>
        </div>
      </div>
    </section>
  );
}
