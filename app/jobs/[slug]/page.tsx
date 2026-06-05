export const dynamic = 'force-dynamic';

import type { ReactNode } from 'react';
import { insforge } from '@/lib/insforge';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, DollarSign, Award, Briefcase, ArrowLeft, CheckCircle } from 'lucide-react';
import ApplyButton from './ApplyButton';
import SaveJobButton from './SaveJobButton';
import ShareButton from './ShareButton';

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

function renderInline(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-[#0D0D0D]">$1</strong>');
}

function MarkdownContent({ content }: { content: string }) {
  const lines = content.split('\n');
  const result: ReactNode[] = [];
  let listBuffer: string[] = [];
  let key = 0;

  const flush = () => {
    if (!listBuffer.length) return;
    const items = [...listBuffer];
    listBuffer = [];
    result.push(
      <ul key={key++} className="space-y-2.5 mb-5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-[#6B6B6B] text-sm leading-relaxed">
            <CheckCircle size={15} className="text-[#CC1016] mt-0.5 shrink-0" />
            <span dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
          </li>
        ))}
      </ul>
    );
  };

  for (const line of lines) {
    const t = line.trim();
    if (t.startsWith('## ')) {
      flush();
      result.push(<h2 key={key++} className="text-xl font-bold text-[#0D0D0D] mt-8 mb-3 pb-2 border-b border-[#E5E5E5] first:mt-0">{t.slice(3)}</h2>);
    } else if (t.startsWith('### ')) {
      flush();
      result.push(<h3 key={key++} className="text-base font-semibold text-[#0D0D0D] mt-5 mb-2">{t.slice(4)}</h3>);
    } else if (t.startsWith('- ')) {
      listBuffer.push(t.slice(2));
    } else if (t === '') {
      flush();
    } else {
      flush();
      result.push(<p key={key++} className="text-[#6B6B6B] leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: renderInline(t) }} />);
    }
  }
  flush();
  return <div>{result}</div>;
}

function stripMarkdown(md: string): string {
  return md
    .replace(/^#{1,3}\s+/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/^-\s+/gm, '')
    .replace(/\n{2,}/g, ' ')
    .trim()
    .slice(0, 500);
}

async function getJob(slug: string) {
  const { data } = await insforge.database
    .from('jobs')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  return data;
}

async function getRelatedJobs(disciplineSlug: string, currentId: string) {
  const { data } = await insforge.database
    .from('jobs')
    .select('id, title, slug, discipline, discipline_slug, employment_type, location_city, location_state, is_remote, salary_min, salary_max, rate_min, rate_max, posted_at')
    .eq('discipline_slug', disciplineSlug)
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
    description: stripMarkdown(job.description || ''),
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

      <div className="min-h-screen bg-[#F5F5F5]">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-[#E5E5E5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-[#6B6B6B]">
            <Link href="/" className="hover:text-[#CC1016] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/jobs" className="hover:text-[#CC1016] transition-colors">Jobs</Link>
            <span>/</span>
            <Link href={`/disciplines/${job.discipline_slug}`} className="hover:text-[#CC1016] transition-colors">{job.discipline}</Link>
            <span>/</span>
            <span className="text-[#0D0D0D] font-medium truncate">{job.title}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content */}
            <div className="flex-1 min-w-0">
              <Link href="/jobs" className="inline-flex items-center gap-2 text-sm text-[#6B6B6B] hover:text-[#CC1016] mb-6 transition-colors">
                <ArrowLeft size={16} /> Back to Jobs
              </Link>

              <div className="bg-white rounded-2xl border border-[#E5E5E5] p-8 mb-6">
                {/* Title & badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`discipline-tag ${colorClass}`}>{job.discipline}</span>
                  <span className={`discipline-tag ${job.employment_type === 'contract' ? 'bg-orange-100 text-orange-700' : 'bg-[#F5F5F5] text-[#0D0D0D]'}`}>
                    {job.employment_type === 'contract' ? 'Contract' : 'Permanent'}
                  </span>
                  {job.is_remote && <span className="discipline-tag bg-green-100 text-green-700">Remote</span>}
                  {job.is_featured && <span className="discipline-tag bg-yellow-100 text-yellow-700">⭐ Featured</span>}
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {job.title}
                </h1>

                {/* Meta pills */}
                <div className="flex flex-wrap gap-4 text-sm text-[#6B6B6B] mb-8 pb-8 border-b border-[#E5E5E5]">
                  <span className="flex items-center gap-1.5 bg-[#F5F5F5] px-3 py-2 rounded-lg">
                    <MapPin size={15} className="text-[#CC1016]" />
                    {job.is_remote ? 'Remote (US)' : `${job.location_city}, ${job.location_state}`}
                  </span>
                  <span className="flex items-center gap-1.5 bg-[#F5F5F5] px-3 py-2 rounded-lg">
                    <DollarSign size={15} className="text-[#CC1016]" />
                    {salaryDisplay}
                  </span>
                  <span className="flex items-center gap-1.5 bg-[#F5F5F5] px-3 py-2 rounded-lg">
                    <Briefcase size={15} className="text-[#CC1016]" />
                    {job.experience_level ? job.experience_level.charAt(0).toUpperCase() + job.experience_level.slice(1) + ' Level' : 'All levels'}
                  </span>
                  {job.license_required && (
                    <span className="flex items-center gap-1.5 bg-[#F5F5F5] px-3 py-2 rounded-lg border border-[#CC1016]/20">
                      <Award size={15} className="text-[#CC1016]" />
                      <span className="font-semibold text-[#CC1016]">{job.license_required}</span>
                    </span>
                  )}
                </div>

                {/* Description — renders rich markdown if present, plain text otherwise */}
                {job.description?.includes('## ') ? (
                  <div className="mb-8">
                    <MarkdownContent content={job.description} />
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h2 className="text-xl font-bold text-[#0D0D0D] mb-4">About This Role</h2>
                      <div className="text-[#6B6B6B] leading-relaxed space-y-4">
                        {job.description?.split('\n').map((p: string, i: number) => p.trim() && <p key={i}>{p}</p>)}
                      </div>
                    </div>
                    {job.requirements && (
                      <div className="mb-8">
                        <h2 className="text-xl font-bold text-[#0D0D0D] mb-4">Requirements</h2>
                        <ul className="space-y-2">
                          {job.requirements.split('. ').filter((r: string) => r.trim()).map((req: string, i: number) => (
                            <li key={i} className="flex items-start gap-3 text-[#6B6B6B]">
                              <CheckCircle size={16} className="text-[#CC1016] mt-0.5 shrink-0" />
                              <span>{req.trim().replace(/\.$/, '')}.</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}

                {/* Skills */}
                {job.skills?.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-[#0D0D0D] mb-4">Key Skills & Tools</h2>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill: string) => (
                        <span key={skill} className="bg-[#F5F5F5] border border-[#E5E5E5] text-[#0D0D0D] text-sm px-3 py-1.5 rounded-lg font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Benefits */}
                {job.benefits && (
                  <div className="bg-[#F5F5F5] rounded-xl p-6">
                    <h2 className="text-xl font-bold text-[#0D0D0D] mb-4">Benefits & Package</h2>
                    <p className="text-[#6B6B6B]">{job.benefits}</p>
                  </div>
                )}
              </div>

              {/* Related Jobs */}
              {relatedJobs.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-[#0D0D0D] mb-5">Similar {job.discipline} Roles</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    {relatedJobs.map((rj) => (
                      <Link key={rj.id} href={`/jobs/${rj.slug}`}
                        className="bg-white rounded-xl border border-[#E5E5E5] p-5 hover:border-[#CC1016] hover:shadow-md transition-all group">
                        <h3 className="font-bold text-[#0D0D0D] text-sm mb-2 group-hover:text-[#CC1016] transition-colors leading-snug">{rj.title}</h3>
                        <p className="text-xs text-[#6B6B6B]">
                          {rj.is_remote ? 'Remote' : `${rj.location_city}, ${rj.location_state}`}
                        </p>
                        <p className="text-xs text-[#CC1016] mt-2 font-semibold">View Role →</p>
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
                <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 shadow-sm">
                  <h3 className="font-bold text-[#0D0D0D] text-lg mb-2">Ready to Apply?</h3>
                  <p className="text-[#6B6B6B] text-sm mb-5">
                    Submit your application and a CCPromoters recruiter will be in touch within 1 business day.
                  </p>
                  <ApplyButton
                    jobId={job.id}
                    jobTitle={job.title}
                    jobSlug={job.slug}
                    discipline={job.discipline}
                    location={job.is_remote ? 'Remote (US)' : `${job.location_city}, ${job.location_state}`}
                  />
                  <div className="flex gap-2">
                    <SaveJobButton jobId={job.id} />
                    <ShareButton title={job.title} />
                  </div>
                </div>

                {/* Recruiter card */}
                <div className="bg-[#0D0D0D] rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#CC1016] rounded-full flex items-center justify-center text-white font-bold text-lg">
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
                <div className="bg-[#F5F5F5] border border-[#CC1016]/20 rounded-2xl p-6">
                  <h4 className="font-bold text-[#0D0D0D] mb-2">Get Job Alerts</h4>
                  <p className="text-[#6B6B6B] text-sm mb-4">Never miss a new {job.discipline} role. Set up a free job alert today.</p>
                  <Link href="/register/candidate"
                    className="block text-center bg-[#0D0D0D] text-white text-sm font-semibold py-3 rounded-lg hover:bg-[#111111] transition-colors">
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
