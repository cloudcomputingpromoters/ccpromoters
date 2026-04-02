export const dynamic = 'force-dynamic';

import { insforge } from '@/lib/insforge';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, DollarSign, Award, Clock, Briefcase, ArrowLeft, Share2, Bookmark, CheckCircle } from 'lucide-react';

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

async function getJob(slug: string) {
  const { data } = await insforge.database
    .from('jobs')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'active')
    .maybeSingle();
  return data;
}

async function getRelatedJobs(disciplineSlug: string, currentId: string) {
  const { data } = await insforge.database
    .from('jobs')
    .select('id, title, slug, discipline, discipline_slug, employment_type, location_city, location_state, is_remote, salary_min, salary_max, rate_min, rate_max, posted_at')
    .eq('discipline_slug', disciplineSlug)
    .eq('status', 'active')
    .neq('id', currentId)
    .limit(3);
  return data || [];
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const job = await getJob(params.slug);
  if (!job) return { title: 'Job Not Found | CCPromoters' };
  return {
    title: `${job.title} | CCPromoters Civil Engineering Jobs`,
    description: `${job.discipline} role in ${job.is_remote ? 'Remote' : `${job.location_city}, ${job.location_state}`}. ${job.employment_type === 'permanent' ? `$${Math.round(job.salary_min / 1000)}k–$${Math.round(job.salary_max / 1000)}k` : 'Competitive rate'}.`,
  };
}

export default async function JobDetailPage({ params }: { params: { slug: string } }) {
  const job = await getJob(params.slug);
  if (!job) notFound();

  const relatedJobs = await getRelatedJobs(job.discipline_slug, job.id);
  const colorClass = disciplineColors[job.discipline_slug] || 'bg-gray-100 text-gray-700';

  const salaryDisplay = job.employment_type === 'contract' && job.rate_min && job.rate_max
    ? `$${job.rate_min}–$${job.rate_max}/hr`
    : job.salary_min && job.salary_max
    ? `$${(job.salary_min / 1000).toFixed(0)}k–$${(job.salary_max / 1000).toFixed(0)}k per year`
    : 'Competitive';

  // JSON-LD for Google for Jobs
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    hiringOrganization: {
      '@type': 'Organization',
      name: job.is_confidential ? 'Confidential Client (via CCPromoters)' : 'CCPromoters Client',
      sameAs: 'https://ccpromoters.com',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location_city || '',
        addressRegion: job.location_state || '',
        addressCountry: 'US',
      },
    },
    baseSalary: job.salary_min ? {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: { '@type': 'QuantitativeValue', minValue: job.salary_min, maxValue: job.salary_max, unitText: 'YEAR' },
    } : undefined,
    employmentType: job.employment_type === 'permanent' ? 'FULL_TIME' : 'CONTRACTOR',
    datePosted: job.posted_at,
    validThrough: job.expires_at,
    jobLocationType: job.is_remote ? 'TELECOMMUTE' : undefined,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-[#F7F9FC]">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-[#4A5568]">
            <Link href="/" className="hover:text-[#E91E8C] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/jobs" className="hover:text-[#E91E8C] transition-colors">Jobs</Link>
            <span>/</span>
            <Link href={`/disciplines/${job.discipline_slug}`} className="hover:text-[#E91E8C] transition-colors">{job.discipline}</Link>
            <span>/</span>
            <span className="text-[#0B1F3A] font-medium truncate">{job.title}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content */}
            <div className="flex-1 min-w-0">
              <Link href="/jobs" className="inline-flex items-center gap-2 text-sm text-[#4A5568] hover:text-[#E91E8C] mb-6 transition-colors">
                <ArrowLeft size={16} /> Back to Jobs
              </Link>

              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 mb-6">
                {/* Title & badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`discipline-tag ${colorClass}`}>{job.discipline}</span>
                  <span className={`discipline-tag ${job.employment_type === 'contract' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                    {job.employment_type === 'contract' ? 'Contract' : 'Permanent'}
                  </span>
                  {job.is_remote && <span className="discipline-tag bg-green-100 text-green-700">Remote</span>}
                  {job.is_featured && <span className="discipline-tag bg-yellow-100 text-yellow-700">⭐ Featured</span>}
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-[#0B1F3A] mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {job.title}
                </h1>

                {/* Meta pills */}
                <div className="flex flex-wrap gap-4 text-sm text-[#4A5568] mb-8 pb-8 border-b border-[#E2E8F0]">
                  <span className="flex items-center gap-1.5 bg-[#F7F9FC] px-3 py-2 rounded-lg">
                    <MapPin size={15} className="text-[#E91E8C]" />
                    {job.is_remote ? 'Remote (US)' : `${job.location_city}, ${job.location_state}`}
                  </span>
                  <span className="flex items-center gap-1.5 bg-[#F7F9FC] px-3 py-2 rounded-lg">
                    <DollarSign size={15} className="text-[#E91E8C]" />
                    {salaryDisplay}
                  </span>
                  <span className="flex items-center gap-1.5 bg-[#F7F9FC] px-3 py-2 rounded-lg">
                    <Briefcase size={15} className="text-[#E91E8C]" />
                    {job.experience_level ? job.experience_level.charAt(0).toUpperCase() + job.experience_level.slice(1) + ' Level' : 'All levels'}
                  </span>
                  {job.license_required && (
                    <span className="flex items-center gap-1.5 bg-[#FFF0F7] px-3 py-2 rounded-lg border border-[#E91E8C]/20">
                      <Award size={15} className="text-[#E91E8C]" />
                      <span className="font-semibold text-[#E91E8C]">{job.license_required}</span>
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 bg-[#F7F9FC] px-3 py-2 rounded-lg">
                    <Clock size={15} className="text-[#E91E8C]" />
                    Posted {new Date(job.posted_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-[#0B1F3A] mb-4">About This Role</h2>
                  <div className="text-[#4A5568] leading-relaxed space-y-4">
                    {job.description?.split('\n').map((p: string, i: number) => p.trim() && <p key={i}>{p}</p>)}
                  </div>
                </div>

                {/* Requirements */}
                {job.requirements && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-[#0B1F3A] mb-4">Requirements</h2>
                    <ul className="space-y-2">
                      {job.requirements.split('. ').filter((r: string) => r.trim()).map((req: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-[#4A5568]">
                          <CheckCircle size={16} className="text-[#E91E8C] mt-0.5 shrink-0" />
                          <span>{req.trim().replace(/\.$/, '')}.</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Skills */}
                {job.skills?.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-[#0B1F3A] mb-4">Key Skills & Tools</h2>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill: string) => (
                        <span key={skill} className="bg-[#F7F9FC] border border-[#E2E8F0] text-[#0B1F3A] text-sm px-3 py-1.5 rounded-lg font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Benefits */}
                {job.benefits && (
                  <div className="bg-[#F7F9FC] rounded-xl p-6">
                    <h2 className="text-xl font-bold text-[#0B1F3A] mb-4">Benefits & Package</h2>
                    <p className="text-[#4A5568]">{job.benefits}</p>
                  </div>
                )}
              </div>

              {/* Related Jobs */}
              {relatedJobs.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-[#0B1F3A] mb-5">Similar {job.discipline} Roles</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    {relatedJobs.map((rj) => (
                      <Link key={rj.id} href={`/jobs/${rj.slug}`}
                        className="bg-white rounded-xl border border-[#E2E8F0] p-5 hover:border-[#E91E8C] hover:shadow-md transition-all group">
                        <h3 className="font-bold text-[#0B1F3A] text-sm mb-2 group-hover:text-[#E91E8C] transition-colors leading-snug">{rj.title}</h3>
                        <p className="text-xs text-[#4A5568]">
                          {rj.is_remote ? 'Remote' : `${rj.location_city}, ${rj.location_state}`}
                        </p>
                        <p className="text-xs text-[#E91E8C] mt-2 font-semibold">View Role →</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky sidebar */}
            <div className="lg:w-80 shrink-0">
              <div className="sticky top-24 space-y-5">
                {/* Apply card */}
                <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
                  <h3 className="font-bold text-[#0B1F3A] text-lg mb-2">Ready to Apply?</h3>
                  <p className="text-[#4A5568] text-sm mb-5">
                    Submit your application and a CCPromoters recruiter will be in touch within 1 business day.
                  </p>
                  <Link href={`/register/candidate?job=${job.slug}`}
                    className="block bg-[#E91E8C] text-white font-bold text-center py-4 rounded-xl hover:bg-[#C0176E] transition-colors text-lg mb-3">
                    Apply Now →
                  </Link>
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 border border-[#E2E8F0] rounded-lg py-2.5 text-sm text-[#4A5568] hover:border-[#E91E8C] hover:text-[#E91E8C] transition-colors">
                      <Bookmark size={15} /> Save Job
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 border border-[#E2E8F0] rounded-lg py-2.5 text-sm text-[#4A5568] hover:border-[#E91E8C] hover:text-[#E91E8C] transition-colors">
                      <Share2 size={15} /> Share
                    </button>
                  </div>
                </div>

                {/* Recruiter card */}
                <div className="bg-[#0B1F3A] rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#E91E8C] rounded-full flex items-center justify-center text-white font-bold text-lg">
                      CC
                    </div>
                    <div>
                      <p className="text-white font-semibold">CCPromoters Team</p>
                      <p className="text-white/60 text-xs">{job.discipline} Specialist</p>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm mb-4">
                    Have questions about this role? Our civil engineering specialist recruiters are here to help.
                  </p>
                  <Link href="/contact"
                    className="block text-center border border-white/30 text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-white/10 transition-colors">
                    Contact a Recruiter
                  </Link>
                </div>

                {/* Job alert */}
                <div className="bg-[#FFF0F7] border border-[#E91E8C]/20 rounded-2xl p-6">
                  <h4 className="font-bold text-[#0B1F3A] mb-2">Get Job Alerts</h4>
                  <p className="text-[#4A5568] text-sm mb-4">Never miss a new {job.discipline} role. Set up a free job alert today.</p>
                  <Link href="/register/candidate"
                    className="block text-center bg-[#0B1F3A] text-white text-sm font-semibold py-3 rounded-lg hover:bg-[#112850] transition-colors">
                    Create Free Alert
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
