'use client';

import { useState } from 'react';

const employerSteps = [
  { n: '01', title: 'Share Your Requirements', desc: 'Tell us the role, discipline, license requirement, location, and timeline. Our civil-specialist recruiters take it from there.' },
  { n: '02', title: 'We Source & Screen', desc: 'We tap our network of 326,000+ pre-screened engineers and verify PE/EIT license status before any candidate is presented.' },
  { n: '03', title: 'Review Top Candidates', desc: 'Receive a shortlist of 3-5 qualified, PE-verified candidates within 48 hours — with technical assessments and a recruiter briefing.' },
  { n: '04', title: 'Hire with Confidence', desc: 'We manage offer negotiation, onboarding coordination, and provide a replacement guarantee on all permanent placements.' },
];

const candidateSteps = [
  { n: '01', title: 'Submit Your Resume', desc: 'Register and upload your resume. Tell us your discipline, licensure status, and what you are looking for in your next role.' },
  { n: '02', title: 'Recruiter Matches You', desc: 'A civil-specialist recruiter reviews your profile and reaches out within 1 business day with tailored opportunities.' },
  { n: '03', title: 'Interview Prep & Coaching', desc: 'We prepare you with firm-specific coaching, salary benchmarking data, and mock technical interview practice.' },
  { n: '04', title: 'Land Your Next Role', desc: 'We negotiate your offer, support your transition, and stay in touch as your career grows — for the long term.' },
];

export default function HowItWorks() {
  const [tab, setTab] = useState<'employer' | 'candidate'>('employer');
  const steps = tab === 'employer' ? employerSteps : candidateSteps;

  return (
    <section className="py-20 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            How <span className="text-[#CC1016]">CCPromoters</span> Works
          </h2>
          {/* Tabs */}
          <div className="inline-flex bg-white/10 rounded-lg p-1 mt-4">
            <button
              onClick={() => setTab('employer')}
              className={`px-6 py-2 rounded-md text-sm font-semibold transition-all ${tab === 'employer' ? 'bg-[#CC1016] text-white' : 'text-white/70 hover:text-white'}`}>
              For Employers
            </button>
            <button
              onClick={() => setTab('candidate')}
              className={`px-6 py-2 rounded-md text-sm font-semibold transition-all ${tab === 'candidate' ? 'bg-[#CC1016] text-white' : 'text-white/70 hover:text-white'}`}>
              For Candidates
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mt-8">
          {steps.map((step, i) => (
            <div key={step.n} className="relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-[#CC1016] to-[#CC1016]/20 z-0" />
              )}
              <div className="relative bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all z-10">
                <div className="w-14 h-14 bg-[#CC1016] rounded-xl flex items-center justify-center text-white font-bold text-lg mb-4" style={{ fontFamily: 'Space Mono, monospace' }}>
                  {step.n}
                </div>
                <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
