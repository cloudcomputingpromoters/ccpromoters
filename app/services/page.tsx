export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { insforge } from '@/lib/insforge';
import { Building2, Users, Search, Briefcase, BarChart3, Map, Star, Heart } from 'lucide-react';

const serviceIcons: Record<string, React.ReactNode> = {
  'permanent-placement':      <Building2 size={28} />,
  'contract-staffing':        <Briefcase size={28} />,
  'volume-recruitment':       <Users size={28} />,
  'executive-search':         <Star size={28} />,
  'talent-mapping':           <Map size={28} />,
  'compensation-benchmarking':<BarChart3 size={28} />,
  'job-search':               <Search size={28} />,
  'resume-optimization':      <Users size={28} />,
  'interview-coaching':       <Users size={28} />,
  'salary-negotiation':       <BarChart3 size={28} />,
  'career-roadmap':           <Heart size={28} />,
  'employer-branding':        <Building2 size={28} />,
  'outplacement':             <Heart size={28} />,
};

export const metadata = {
  title: 'Recruitment Services | CCPromoters Civil Engineering',
  description: 'CCPromoters offers a full suite of civil engineering recruitment services for employers and candidates — from permanent placement to executive search, contract staffing, and career coaching.',
};

async function getServices() {
  const { data } = await insforge.database
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });
  return data || [];
}

export default async function ServicesPage() {
  const services = await getServices();
  const employerServices = (services as Array<{ id: string; slug: string; title: string; description: string; audience: string }>).filter(s => s.audience === 'employer');
  const candidateServices = (services as Array<{ id: string; slug: string; title: string; description: string; audience: string }>).filter(s => s.audience === 'candidate');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#1A3A8F] to-[#163298] py-16 px-4 overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block bg-[#D4AF37]/20 text-[#D4AF37] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Our Services</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
              More Than Recruitment —<br /><span className="text-[#D4AF37]">A True Talent Partner</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl">
              We support engineering firms and professionals at every stage — from sourcing a single specialist to building an entire project team.
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-white/10" style={{ height: '240px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/blueprints-tools.jpg"
              alt="Civil engineering blueprints, orange safety hard hat, spirit level and measuring tape for structural project planning"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-[#1A3A8F]/30" />
          </div>
        </div>
      </section>

      {/* Employer services */}
      <section className="py-16 px-4 bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <span className="text-[#D4AF37] font-semibold text-sm uppercase tracking-wider">For Employers</span>
            <h2 className="text-3xl font-bold text-[#1A3A8F] mt-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Hiring Solutions for Engineering Firms</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employerServices.map(s => (
              <Link key={s.id} href={`/services/${s.slug}`}
                className="group bg-white rounded-2xl border border-[#E2E8F0] p-7 hover:shadow-xl hover:border-[#D4AF37] transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-[#1A3A8F] text-white rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#D4AF37] transition-colors">
                  {serviceIcons[s.slug] || <Briefcase size={28} />}
                </div>
                <h3 className="font-bold text-[#1A3A8F] text-lg mb-2 group-hover:text-[#D4AF37] transition-colors" style={{ fontFamily: 'Manrope, sans-serif' }}>{s.title}</h3>
                <p className="text-[#4A5568] text-sm mb-5">{s.description}</p>
                <span className="text-[#D4AF37] text-sm font-semibold">Learn More →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Candidate services */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <span className="text-[#D4AF37] font-semibold text-sm uppercase tracking-wider">For Candidates</span>
            <h2 className="text-3xl font-bold text-[#1A3A8F] mt-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Career Support for Civil Engineers</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidateServices.map(s => (
              <Link key={s.id} href={`/services/${s.slug}`}
                className="group bg-[#F7F9FC] rounded-2xl border border-[#E2E8F0] p-7 hover:shadow-xl hover:border-[#D4AF37] hover:bg-white transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-[#D4AF37] text-white rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#1A3A8F] transition-colors">
                  {serviceIcons[s.slug] || <Search size={28} />}
                </div>
                <h3 className="font-bold text-[#1A3A8F] text-lg mb-2 group-hover:text-[#D4AF37] transition-colors" style={{ fontFamily: 'Manrope, sans-serif' }}>{s.title}</h3>
                <p className="text-[#4A5568] text-sm mb-5">{s.description}</p>
                <span className="text-[#D4AF37] text-sm font-semibold">Learn More →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="py-16 bg-[#D4AF37] text-center px-4">
        <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>Ready to Get Started?</h2>
        <p className="text-white/85 mb-8 max-w-xl mx-auto">Whether you are hiring or job-seeking, a specialist recruiter is ready to help.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register/employer" className="bg-white text-[#D4AF37] font-bold px-8 py-3 rounded-lg hover:bg-white/90 transition-colors">Post a Job</Link>
          <Link href="/register/candidate" className="border border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">Submit Your Resume</Link>
        </div>
      </section>
    </div>
  );
}
