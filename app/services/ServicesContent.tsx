'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';
import { Building2, Users, Search, Briefcase, BarChart3, Map, Star, Heart } from 'lucide-react';

const serviceIcons: Record<string, React.ReactNode> = {
  'permanent-placement':       <Building2 size={28} />,
  'contract-staffing':         <Briefcase size={28} />,
  'volume-recruitment':        <Users size={28} />,
  'executive-search':          <Star size={28} />,
  'talent-mapping':            <Map size={28} />,
  'compensation-benchmarking': <BarChart3 size={28} />,
  'job-search':                <Search size={28} />,
  'resume-optimization':       <Users size={28} />,
  'interview-coaching':        <Users size={28} />,
  'salary-negotiation':        <BarChart3 size={28} />,
  'career-roadmap':            <Heart size={28} />,
  'employer-branding':         <Building2 size={28} />,
  'outplacement':              <Heart size={28} />,
};

type Service = { id: string; slug: string; title: string; description: string; audience: string };

export default function ServicesContent() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    insforge.database
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        setServices((data as Service[]) || []);
        setLoading(false);
      });
  }, []);

  const employerServices = services.filter(s => s.audience === 'employer');
  const candidateServices = services.filter(s => s.audience === 'candidate');

  const ServiceSkeleton = () => (
    <div className="bg-white rounded-2xl border border-[#E5E5E5] p-7 animate-pulse">
      <div className="w-12 h-12 bg-gray-200 rounded-xl mb-5" />
      <div className="h-5 bg-gray-200 rounded w-2/3 mb-3" />
      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0D0D0D] py-16 px-4 overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block bg-[#CC1016]/20 text-[#CC1016] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Our Services</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
              More Than Recruitment —<br /><span className="text-[#CC1016]">A True Talent Partner</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl">
              We support engineering firms and professionals at every stage — from sourcing a single specialist to building an entire project team.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2" style={{ height: '240px' }}>
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/blueprints-tools.jpg"
                alt="Civil engineering blueprints and precision tools on desk"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-[#0D0D0D]/30" />
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/worker-hardhat.jpg"
                alt="Civil engineering worker holding hard hat at construction site"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-[#0D0D0D]/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Employer services */}
      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <span className="text-[#CC1016] font-semibold text-sm uppercase tracking-wider">For Employers</span>
            <h2 className="text-3xl font-bold text-[#0D0D0D] mt-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Hiring Solutions for Engineering Firms</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? [...Array(3)].map((_, i) => <ServiceSkeleton key={i} />)
              : employerServices.map(s => (
                <Link key={s.id} href={`/services/${s.slug}`}
                  className="group bg-white rounded-2xl border border-[#E5E5E5] p-7 hover:shadow-xl hover:border-[#CC1016] transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-[#0D0D0D] text-white rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#CC1016] transition-colors">
                    {serviceIcons[s.slug] || <Briefcase size={28} />}
                  </div>
                  <h3 className="font-bold text-[#0D0D0D] text-lg mb-2 group-hover:text-[#CC1016] transition-colors" style={{ fontFamily: 'Manrope, sans-serif' }}>{s.title}</h3>
                  <p className="text-[#6B6B6B] text-sm mb-5">{s.description}</p>
                  <span className="text-[#CC1016] text-sm font-semibold">Learn More →</span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Candidate services */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <span className="text-[#CC1016] font-semibold text-sm uppercase tracking-wider">For Candidates</span>
            <h2 className="text-3xl font-bold text-[#0D0D0D] mt-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Career Support for Civil Engineers</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? [...Array(3)].map((_, i) => <ServiceSkeleton key={i} />)
              : candidateServices.map(s => (
                <Link key={s.id} href={`/services/${s.slug}`}
                  className="group bg-[#F5F5F5] rounded-2xl border border-[#E5E5E5] p-7 hover:shadow-xl hover:border-[#CC1016] hover:bg-white transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-[#CC1016] text-white rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#0D0D0D] transition-colors">
                    {serviceIcons[s.slug] || <Search size={28} />}
                  </div>
                  <h3 className="font-bold text-[#0D0D0D] text-lg mb-2 group-hover:text-[#CC1016] transition-colors" style={{ fontFamily: 'Manrope, sans-serif' }}>{s.title}</h3>
                  <p className="text-[#6B6B6B] text-sm mb-5">{s.description}</p>
                  <span className="text-[#CC1016] text-sm font-semibold">Learn More →</span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#CC1016] text-center px-4">
        <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>Ready to Get Started?</h2>
        <p className="text-white/85 mb-8 max-w-xl mx-auto">Whether you are hiring or job-seeking, a specialist recruiter is ready to help.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register/employer" className="bg-white text-[#CC1016] font-bold px-8 py-3 rounded-lg hover:bg-white/90 transition-colors">Post a Job</Link>
          <Link href="/register/candidate" className="border border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">Submit Your Resume</Link>
        </div>
      </section>
    </div>
  );
}
