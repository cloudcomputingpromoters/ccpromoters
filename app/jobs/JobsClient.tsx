'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MapPin, DollarSign, Clock, Award, Search, X } from 'lucide-react';

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

const disciplineChips = [
  { label: 'All', value: 'all' },
  { label: 'Structural', value: 'structural' },
  { label: 'Transportation', value: 'transportation' },
  { label: 'Geotechnical', value: 'geotechnical' },
  { label: 'Environmental', value: 'environmental' },
  { label: 'Water Resources', value: 'water-resources' },
  { label: 'Construction', value: 'construction' },
  { label: 'Land Development', value: 'land-development' },
  { label: 'Surveying', value: 'surveying' },
  { label: 'Coastal', value: 'coastal' },
];

type Job = {
  id: string;
  title: string;
  slug: string;
  discipline: string;
  discipline_slug: string;
  employment_type: string;
  location_city: string;
  location_state: string;
  is_remote: boolean;
  salary_min: number | null;
  salary_max: number | null;
  rate_min: number | null;
  rate_max: number | null;
  license_required: string | null;
  experience_level: string | null;
  is_featured: boolean;
  posted_at: string;
};

function formatSalary(job: Job) {
  if (job.employment_type === 'contract' && job.rate_min && job.rate_max) {
    return `$${job.rate_min}–$${job.rate_max}/hr`;
  }
  if (job.salary_min && job.salary_max) {
    return `$${Math.round(job.salary_min / 1000)}k–$${Math.round(job.salary_max / 1000)}k`;
  }
  return 'Competitive';
}

function JobCard({ job }: { job: Job }) {
  const colorClass = disciplineColors[job.discipline_slug] || 'bg-gray-100 text-gray-700';
  return (
    <Link href={`/jobs/${job.slug}`}
      className={`group bg-white rounded-xl border border-[#E2E8F0] p-6 hover:shadow-lg hover:border-[#E91E8C] transition-all duration-300 hover:-translate-y-0.5 flex flex-col gap-4 border-l-4 ${job.is_featured ? 'border-l-[#E91E8C]' : 'border-l-transparent hover:border-l-[#E91E8C]'}`}>
      {job.is_featured && (
        <div className="text-xs text-[#E91E8C] font-semibold uppercase tracking-wider">⭐ Featured</div>
      )}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <span className={`discipline-tag ${colorClass}`}>{job.discipline}</span>
          <span className={`discipline-tag ${job.employment_type === 'contract' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
            {job.employment_type === 'contract' ? 'Contract' : 'Permanent'}
          </span>
        </div>
        {job.is_remote && (
          <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full shrink-0">Remote</span>
        )}
      </div>
      <h3 className="font-bold text-[#0B1F3A] text-lg group-hover:text-[#E91E8C] transition-colors leading-snug">
        {job.title}
      </h3>
      <div className="flex flex-wrap gap-4 text-sm text-[#4A5568]">
        <span className="flex items-center gap-1.5">
          <MapPin size={14} className="text-[#E91E8C]" />
          {job.is_remote ? 'Remote (US)' : [job.location_city, job.location_state].filter(Boolean).join(', ')}
        </span>
        <span className="flex items-center gap-1.5">
          <DollarSign size={14} className="text-[#E91E8C]" />
          {formatSalary(job)}
        </span>
        {job.license_required && (
          <span className="flex items-center gap-1.5">
            <Award size={14} className="text-[#E91E8C]" />
            {job.license_required}
          </span>
        )}
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0] mt-auto">
        <span className="flex items-center gap-1 text-xs text-[#4A5568]">
          <Clock size={12} />
          {new Date(job.posted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
        <span className="text-[#E91E8C] text-sm font-semibold">View Role →</span>
      </div>
    </Link>
  );
}

export default function JobsClient({
  initialJobs,
  total,
  searchParams,
}: {
  initialJobs: Job[];
  total: number;
  searchParams: Record<string, string>;
}) {
  const router = useRouter();
  const [keyword, setKeyword] = useState(searchParams.q || '');
  const [location, setLocation] = useState(searchParams.location || '');
  const [activeDiscipline, setActiveDiscipline] = useState(searchParams.discipline || 'all');
  const [typeFilter, setTypeFilter] = useState(searchParams.type || '');
  const [remoteFilter, setRemoteFilter] = useState(searchParams.remote || '');
  const [licenseFilter, setLicenseFilter] = useState(searchParams.license || '');

  function applyFilters(overrides: Record<string, string> = {}) {
    const params = new URLSearchParams();
    if (keyword) params.set('q', keyword);
    if (location) params.set('location', location);
    if (activeDiscipline && activeDiscipline !== 'all') params.set('discipline', activeDiscipline);
    if (typeFilter) params.set('type', typeFilter);
    if (remoteFilter) params.set('remote', remoteFilter);
    if (licenseFilter) params.set('license', licenseFilter);
    Object.entries(overrides).forEach(([k, v]) => v ? params.set(k, v) : params.delete(k));
    router.push(`/jobs?${params.toString()}`);
  }

  function setDiscipline(val: string) {
    setActiveDiscipline(val);
    const params = new URLSearchParams(window.location.search);
    if (val === 'all') params.delete('discipline');
    else params.set('discipline', val);
    params.delete('page');
    router.push(`/jobs?${params.toString()}`);
  }

  const page = parseInt(searchParams.page || '1');
  const pageSize = 10;
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* Search Hero */}
      <div className="bg-gradient-to-r from-[#0B1F3A] to-[#112850] py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Find Your Next Civil Engineering Role
          </h1>
          <p className="text-white/60 text-center mb-8">{total} active roles across all disciplines</p>
          <div className="bg-white rounded-xl shadow-xl p-2 flex flex-col md:flex-row gap-2">
            <div className="flex items-center gap-2 flex-1 px-4 py-2 border-b md:border-b-0 md:border-r border-[#E2E8F0]">
              <Search size={18} className="text-[#E91E8C] shrink-0" />
              <input
                type="text"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && applyFilters()}
                placeholder="Job title, discipline, skills..."
                className="flex-1 outline-none text-[#0B1F3A] text-sm"
              />
              {keyword && <button onClick={() => setKeyword('')}><X size={14} className="text-[#4A5568]" /></button>}
            </div>
            <div className="flex items-center gap-2 flex-1 px-4 py-2">
              <MapPin size={18} className="text-[#E91E8C] shrink-0" />
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && applyFilters()}
                placeholder="City or state..."
                className="flex-1 outline-none text-[#0B1F3A] text-sm"
              />
            </div>
            <button
              onClick={() => applyFilters()}
              className="bg-[#E91E8C] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#C0176E] transition-colors whitespace-nowrap">
              Search Jobs
            </button>
          </div>

          {/* Discipline chips */}
          <div className="flex flex-wrap gap-2 mt-5 justify-center">
            {disciplineChips.map(chip => (
              <button key={chip.value} onClick={() => setDiscipline(chip.value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeDiscipline === chip.value
                  ? 'bg-[#E91E8C] text-white'
                  : 'bg-white/20 text-white hover:bg-white/30'}`}>
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-[#0B1F3A]">Filter Results</h3>
                <button onClick={() => router.push('/jobs')} className="text-xs text-[#E91E8C] hover:underline">Clear All</button>
              </div>

              {/* Employment type */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#0B1F3A] mb-3">Employment Type</label>
                {[{ label: 'All Types', value: '' }, { label: 'Permanent', value: 'permanent' }, { label: 'Contract', value: 'contract' }].map(opt => (
                  <label key={opt.value} className="flex items-center gap-2 py-1.5 cursor-pointer">
                    <input type="radio" name="type" checked={typeFilter === opt.value} onChange={() => { setTypeFilter(opt.value); applyFilters({ type: opt.value }); }}
                      className="accent-[#E91E8C]" />
                    <span className="text-sm text-[#4A5568]">{opt.label}</span>
                  </label>
                ))}
              </div>

              {/* Work style */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#0B1F3A] mb-3">Work Style</label>
                {[{ label: 'All', value: '' }, { label: 'Remote Only', value: 'true' }].map(opt => (
                  <label key={opt.value} className="flex items-center gap-2 py-1.5 cursor-pointer">
                    <input type="radio" name="remote" checked={remoteFilter === opt.value} onChange={() => { setRemoteFilter(opt.value); applyFilters({ remote: opt.value }); }}
                      className="accent-[#E91E8C]" />
                    <span className="text-sm text-[#4A5568]">{opt.label}</span>
                  </label>
                ))}
              </div>

              {/* License */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#0B1F3A] mb-3">License Required</label>
                {[{ label: 'Any', value: '' }, { label: 'PE Licensed', value: 'PE' }, { label: 'EIT / Engineer-in-Training', value: 'EIT' }].map(opt => (
                  <label key={opt.value} className="flex items-center gap-2 py-1.5 cursor-pointer">
                    <input type="radio" name="license" checked={licenseFilter === opt.value} onChange={() => { setLicenseFilter(opt.value); applyFilters({ license: opt.value }); }}
                      className="accent-[#E91E8C]" />
                    <span className="text-sm text-[#4A5568]">{opt.label}</span>
                  </label>
                ))}
              </div>

              <div className="pt-4 border-t border-[#E2E8F0]">
                <Link href="/register/candidate"
                  className="block text-center bg-[#0B1F3A] text-white text-sm font-semibold py-3 rounded-lg hover:bg-[#112850] transition-colors">
                  Submit Resume for Hidden Roles
                </Link>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-[#4A5568]">
                Showing <strong>{initialJobs.length}</strong> of <strong>{total}</strong> civil engineering jobs
              </p>
            </div>

            {initialJobs.length === 0 ? (
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-16 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-bold text-[#0B1F3A] text-xl mb-2">No jobs found</h3>
                <p className="text-[#4A5568] mb-6">Try adjusting your filters or browse all disciplines.</p>
                <Link href="/jobs" className="btn-pink">Clear Filters</Link>
              </div>
            ) : (
              <div className="grid gap-5">
                {initialJobs.map(job => <JobCard key={job.id} job={job} />)}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                {page > 1 && (
                  <Link href={`/jobs?${new URLSearchParams({ ...searchParams, page: String(page - 1) })}`}
                    className="px-4 py-2 border border-[#E2E8F0] rounded-lg text-sm hover:border-[#E91E8C] text-[#4A5568]">
                    ← Previous
                  </Link>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <Link key={p} href={`/jobs?${new URLSearchParams({ ...searchParams, page: String(p) })}`}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${p === page ? 'bg-[#E91E8C] text-white' : 'border border-[#E2E8F0] text-[#4A5568] hover:border-[#E91E8C]'}`}>
                    {p}
                  </Link>
                ))}
                {page < totalPages && (
                  <Link href={`/jobs?${new URLSearchParams({ ...searchParams, page: String(page + 1) })}`}
                    className="px-4 py-2 border border-[#E2E8F0] rounded-lg text-sm hover:border-[#E91E8C] text-[#4A5568]">
                    Next →
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
