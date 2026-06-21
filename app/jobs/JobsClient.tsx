'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { MapPin, DollarSign, Award, Search, X } from 'lucide-react';
import { filterJobs } from '@/lib/jobSearch';

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
  'concrete-inspector': 'bg-red-100 text-red-700',
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
  { label: 'Concrete Inspector', value: 'concrete-inspector' },
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
  posted_at?: string;
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
      className={`group bg-white rounded-xl border border-[#E5E5E5] p-8 hover:shadow-lg hover:border-[#CC1016] transition-all duration-300 hover:-translate-y-0.5 flex flex-col gap-5 border-l-4 ${job.is_featured ? 'border-l-[#CC1016]' : 'border-l-transparent hover:border-l-[#CC1016]'}`}>
      {job.is_featured && (
        <div className="text-xs text-[#CC1016] font-semibold uppercase tracking-wider">⭐ Featured</div>
      )}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <span className={`discipline-tag ${colorClass}`}>{job.discipline}</span>
          <span className={`discipline-tag ${job.employment_type === 'contract' ? 'bg-orange-100 text-orange-700' : 'bg-[#F5F5F5] text-[#0D0D0D]'}`}>
            {job.employment_type === 'contract' ? 'Contract' : 'Permanent'}
          </span>
        </div>
        {job.is_remote && (
          <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full shrink-0">Remote</span>
        )}
      </div>
      <h3 className="font-bold text-[#0D0D0D] text-xl group-hover:text-[#CC1016] transition-colors leading-snug">
        {job.title}
      </h3>
      <div className="flex flex-wrap gap-4 text-base text-[#6B6B6B]">
        <span className="flex items-center gap-1.5">
          <MapPin size={16} className="text-[#CC1016]" />
          {job.is_remote ? 'Remote (US)' : [job.location_city, job.location_state].filter(Boolean).join(', ')}
        </span>
        <span className="flex items-center gap-1.5">
          <DollarSign size={16} className="text-[#CC1016]" />
          {formatSalary(job)}
        </span>
        {job.license_required && (
          <span className="flex items-center gap-1.5">
            <Award size={16} className="text-[#CC1016]" />
            {job.license_required}
          </span>
        )}
      </div>
      <div className="flex items-center justify-end pt-3 border-t border-[#E5E5E5] mt-auto">
        <span className="text-[#CC1016] text-base font-semibold">View Role →</span>
      </div>
    </Link>
  );
}

const PAGE_SIZE = 10;

interface JobsClientProps {
  initialJobs: Job[];
}

export default function JobsClient({ initialJobs }: JobsClientProps) {
  const searchParams = useSearchParams();

  const allJobs = useMemo(() => (Array.isArray(initialJobs) ? initialJobs : []), [initialJobs]);

  // Filters are local state, seeded once from the URL so inbound deep links still
  // work (e.g. /jobs?discipline=structural, /jobs?location=Denver). Filtering is
  // done entirely client-side over the already-loaded jobs — no navigation/refetch
  // per keystroke (that previously caused focus loss / a broken-feeling search).
  const [keywordInput, setKeywordInput] = useState(() => searchParams.get('q') || '');
  const [locationInput, setLocationInput] = useState(() => searchParams.get('location') || '');
  const [debouncedKeyword, setDebouncedKeyword] = useState(() => searchParams.get('q') || '');
  const [debouncedLocation, setDebouncedLocation] = useState(() => searchParams.get('location') || '');
  const [discipline, setDiscipline] = useState(() => searchParams.get('discipline') || 'all');
  const [typeFilter, setTypeFilter] = useState(() => searchParams.get('type') || '');
  const [remoteFilter, setRemoteFilter] = useState(() => searchParams.get('remote') || '');
  const [licenseFilter, setLicenseFilter] = useState(() => searchParams.get('license') || '');
  const [page, setPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on client-side only to avoid hydration mismatch
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Debounce the text inputs (~300ms) — instant, client-side, no page navigation.
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedKeyword(keywordInput);
      setDebouncedLocation(locationInput);
    }, 300);
    return () => clearTimeout(t);
  }, [keywordInput, locationInput]);

  // Flush the debounce immediately — used by Enter key and the Search button.
  function runSearch() {
    setDebouncedKeyword(keywordInput);
    setDebouncedLocation(locationInput);
  }

  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      runSearch();
    }
  }

  function clearAll() {
    setKeywordInput('');
    setLocationInput('');
    setDebouncedKeyword('');
    setDebouncedLocation('');
    setDiscipline('all');
    setTypeFilter('');
    setRemoteFilter('');
    setLicenseFilter('');
    setPage(1);
  }

  // All filters applied together (AND'd), case-insensitive, partial-match.
  const filteredJobs = useMemo(
    () =>
      filterJobs(allJobs, {
        keyword: debouncedKeyword,
        location: debouncedLocation,
        discipline,
        type: typeFilter,
        remote: remoteFilter,
        license: licenseFilter,
      }),
    [allJobs, debouncedKeyword, debouncedLocation, discipline, typeFilter, remoteFilter, licenseFilter]
  );

  // Reset to page 1 whenever the active filters change.
  useEffect(() => {
    setPage(1);
  }, [debouncedKeyword, debouncedLocation, discipline, typeFilter, remoteFilter, licenseFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const paginatedJobs = useMemo(() => {
    const from = (safePage - 1) * PAGE_SIZE;
    return filteredJobs.slice(from, from + PAGE_SIZE);
  }, [filteredJobs, safePage]);

  return (
    <div className="w-full max-w-full overflow-hidden min-h-screen bg-[#F5F5F5]">
      {/* Search Hero */}
      <div className="w-full max-w-full overflow-hidden bg-[#0D0D0D] py-14 px-4">
        <div className="w-full max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Find Your Next Civil Engineering Role
          </h1>
          <p className="text-gray-200 text-center mb-8">{allJobs.length} active roles across all disciplines</p>
          <div className="w-full max-w-full bg-white rounded-xl shadow-xl p-2 flex flex-col gap-2 overflow-hidden">
            <div className="flex items-center gap-2 flex-1 px-3 py-2 border-b md:border-b-0 md:border-r border-[#E5E5E5] min-w-0">
              <Search size={18} className="text-[#CC1016] shrink-0" />
              <input
                type="text"
                value={keywordInput}
                onChange={e => setKeywordInput(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Job title, discipline, skills..."
                className="flex-1 outline-none text-[#0D0D0D] text-sm min-w-0"
              />
              {keywordInput && <button onClick={() => { setKeywordInput(''); setDebouncedKeyword(''); }}><X size={14} className="text-[#6B6B6B]" /></button>}
            </div>
            <div className="flex items-center gap-2 flex-1 px-3 py-2 min-w-0">
              <MapPin size={18} className="text-[#CC1016] shrink-0" />
              <input
                type="text"
                value={locationInput}
                onChange={e => setLocationInput(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="City or state..."
                className="flex-1 outline-none text-[#0D0D0D] text-sm min-w-0"
              />
              {locationInput && <button onClick={() => { setLocationInput(''); setDebouncedLocation(''); }}><X size={14} className="text-[#6B6B6B]" /></button>}
            </div>
            <button
              onClick={runSearch}
              className="w-full md:w-auto bg-[#CC1016] text-white font-semibold px-6 md:px-8 py-3 rounded-lg hover:bg-[#A80D12] transition-colors whitespace-nowrap">
              Search Jobs
            </button>
          </div>

          {/* Discipline chips */}
          <div className="w-full max-w-full flex flex-wrap gap-2 mt-5 justify-center overflow-hidden">
            {disciplineChips.map(chip => (
              <button key={chip.value} onClick={() => setDiscipline(chip.value)}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all flex-shrink-0 ${discipline === chip.value
                  ? 'bg-[#CC1016] text-white'
                  : 'bg-white/20 text-white hover:bg-white/30'}`}>
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-full overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="w-full max-w-full overflow-hidden flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className="w-full lg:w-64 shrink-0 overflow-hidden">
            <div className="w-full max-w-full bg-white rounded-xl border border-[#E5E5E5] p-4 lg:p-6 sticky top-24 overflow-hidden">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-[#0D0D0D]">Filter Results</h3>
                <button onClick={clearAll} className="text-xs text-[#CC1016] hover:underline">Clear All</button>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#0D0D0D] mb-3">Employment Type</label>
                {[{ label: 'All Types', value: '' }, { label: 'Permanent', value: 'permanent' }, { label: 'Contract', value: 'contract' }].map(opt => (
                  <label key={opt.value} className="flex items-center gap-2 py-1.5 cursor-pointer">
                    <input type="radio" name="type" checked={typeFilter === opt.value} onChange={() => setTypeFilter(opt.value)}
                      className="accent-[#CC1016]" />
                    <span className="text-sm text-[#6B6B6B]">{opt.label}</span>
                  </label>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#0D0D0D] mb-3">Work Style</label>
                {[{ label: 'All', value: '' }, { label: 'Remote Only', value: 'true' }].map(opt => (
                  <label key={opt.value} className="flex items-center gap-2 py-1.5 cursor-pointer">
                    <input type="radio" name="remote" checked={remoteFilter === opt.value} onChange={() => setRemoteFilter(opt.value)}
                      className="accent-[#CC1016]" />
                    <span className="text-sm text-[#6B6B6B]">{opt.label}</span>
                  </label>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#0D0D0D] mb-3">License Required</label>
                {[{ label: 'Any', value: '' }, { label: 'PE Licensed', value: 'PE' }, { label: 'EIT / Engineer-in-Training', value: 'EIT' }].map(opt => (
                  <label key={opt.value} className="flex items-center gap-2 py-1.5 cursor-pointer">
                    <input type="radio" name="license" checked={licenseFilter === opt.value} onChange={() => setLicenseFilter(opt.value)}
                      className="accent-[#CC1016]" />
                    <span className="text-sm text-[#6B6B6B]">{opt.label}</span>
                  </label>
                ))}
              </div>

              <div className="pt-4 border-t border-[#E5E5E5]">
                <Link href="/register/candidate"
                  className="block text-center bg-[#0D0D0D] text-white text-sm font-semibold py-3 rounded-lg hover:bg-[#111111] transition-colors">
                  Submit Resume for Hidden Roles
                </Link>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="w-full lg:flex-1 min-w-0 overflow-hidden max-w-full">
            <div className="w-full max-w-full flex items-center justify-between mb-5 overflow-hidden">
              <p className="text-sm text-[#6B6B6B]">
                {allJobs.length === 0 ? 'No jobs available' : <>Showing <strong>{paginatedJobs.length}</strong> of <strong>{filteredJobs.length}</strong> civil engineering jobs</>}
              </p>
            </div>

            {allJobs.length === 0 ? (
              <div className="w-full max-w-full bg-white rounded-xl border border-[#E5E5E5] p-8 md:p-16 text-center overflow-hidden">
                <div className="text-3xl md:text-5xl mb-4">⚠️</div>
                <h3 className="font-bold text-[#0D0D0D] text-lg md:text-xl mb-2">Unable to Load Jobs</h3>
                <p className="text-[#6B6B6B] mb-6 text-sm md:text-base">The job database is currently unavailable. Please try again later.</p>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="w-full max-w-full bg-white rounded-xl border border-[#E5E5E5] p-8 md:p-16 text-center overflow-hidden">
                <div className="text-3xl md:text-5xl mb-4">🔍</div>
                <h3 className="font-bold text-[#0D0D0D] text-lg md:text-xl mb-2">No jobs match your search</h3>
                <p className="text-[#6B6B6B] mb-6 text-sm md:text-base">Try a different city, state, or job title — or clear your filters to see all roles.</p>
                <button onClick={clearAll} className="btn-pink">Clear Filters</button>
              </div>
            ) : (
              <div className="w-full max-w-full grid gap-5 overflow-hidden">
                {paginatedJobs.map(job => <JobCard key={job.id} job={job} />)}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1 sm:gap-2 mt-10 overflow-hidden px-2">
                {safePage > 1 && (
                  <button onClick={() => setPage(safePage - 1)}
                    className="px-2 sm:px-4 py-2 border border-[#E5E5E5] rounded-lg text-xs sm:text-sm hover:border-[#CC1016] text-[#6B6B6B] whitespace-nowrap flex-shrink-0">
                    ← Prev
                  </button>
                )}

                {/* Mobile: Show current page ± 2 | Desktop: Show all */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(p => {
                    // On mobile (sm breakpoint ~640px), only show current ± 2
                    if (isMobile) {
                      return Math.abs(p - safePage) <= 2;
                    }
                    // Desktop: show all
                    return true;
                  })
                  .map((p, idx, arr) => {
                    // Show ellipsis if there's a gap
                    const showEllipsisBefore = idx === 0 && p > 1;
                    return (
                      <div key={`page-${p}`} className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        {showEllipsisBefore && <span className="text-[#6B6B6B] px-1 text-xs">…</span>}
                        <button onClick={() => setPage(p)}
                          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-xs sm:text-sm font-medium transition-colors flex-shrink-0 ${p === safePage ? 'bg-[#CC1016] text-white' : 'border border-[#E5E5E5] text-[#6B6B6B] hover:border-[#CC1016]'}`}>
                          {p}
                        </button>
                        {idx === arr.length - 1 && p < totalPages && <span className="text-[#6B6B6B] px-1 text-xs">…</span>}
                      </div>
                    );
                  })}

                {safePage < totalPages && (
                  <button onClick={() => setPage(safePage + 1)}
                    className="px-2 sm:px-4 py-2 border border-[#E5E5E5] rounded-lg text-xs sm:text-sm hover:border-[#CC1016] text-[#6B6B6B] whitespace-nowrap flex-shrink-0">
                    Next →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
