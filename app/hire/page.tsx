import Link from 'next/link';
import { CheckCircle, Clock, Shield, Users, BarChart3, Search, Briefcase, Map, Star } from 'lucide-react';

export const metadata = {
  title: 'Hire Civil Engineers | CCPromoters',
  description: 'CCPromoters sources pre-vetted, PE-licensed civil engineers across all 10 disciplines. Permanent placement, contract staffing, executive search and more.',
};

const services = [
  {
    icon: <Briefcase size={24} />,
    title: 'Permanent Placement',
    desc: 'Full-time hires with a 90-day guarantee. We own the process end-to-end — sourcing, screening, interviewing, offer management.',
    href: '/services/permanent-placement',
  },
  {
    icon: <Users size={24} />,
    title: 'Contract Staffing',
    desc: 'Flexible contract engineers for project surges, coverage gaps, and short-term specialist needs. On-boarded in days, not weeks.',
    href: '/services/contract-staffing',
  },
  {
    icon: <Star size={24} />,
    title: 'Executive Search',
    desc: 'Confidential retained search for Directors, VPs, and C-suite engineering leaders. Discreet, thorough, results-driven.',
    href: '/services/executive-search',
  },
  {
    icon: <Users size={24} />,
    title: 'Volume Recruitment',
    desc: 'Need to staff an entire project team fast? We scale to deliver multiple hires simultaneously across disciplines.',
    href: '/services/volume-recruitment',
  },
  {
    icon: <Map size={24} />,
    title: 'Talent Mapping',
    desc: 'Know who is available in your market before you post. We build custom talent maps of engineers in your geography and discipline.',
    href: '/services/talent-mapping',
  },
  {
    icon: <BarChart3 size={24} />,
    title: 'Compensation Benchmarking',
    desc: 'Stay competitive with real-time salary data for every civil engineering role, level, and location across the US.',
    href: '/services/compensation-benchmarking',
  },
];

const steps = [
  {
    number: '01',
    title: 'Tell Us What You Need',
    desc: 'Share the role, discipline, experience level, and location. We ask the right questions upfront so nothing is wasted later.',
  },
  {
    number: '02',
    title: 'Receive Pre-Vetted Shortlists',
    desc: 'Within 48–72 hours you receive a curated shortlist of qualified engineers — PE license verified, technically screened, interested in your role.',
  },
  {
    number: '03',
    title: 'Interview, Hire, Done',
    desc: 'We coordinate interviews, handle offer negotiations, and stay involved through onboarding. Every permanent placement is backed by a 90-day guarantee.',
  },
];

const differentiators = [
  {
    icon: <Clock size={22} />,
    title: '48–72 Hour Shortlists',
    desc: 'We maintain a live, always-current network — no cold sourcing delays.',
  },
  {
    icon: <Shield size={22} />,
    title: 'PE License Verification',
    desc: 'Every licensed candidate is verified through state engineering board databases before presentation.',
  },
  {
    icon: <CheckCircle size={22} />,
    title: '90-Day Placement Guarantee',
    desc: 'If a permanent hire doesn\'t work out within 90 days, we replace them at no additional cost.',
  },
  {
    icon: <Search size={22} />,
    title: 'True Discipline Specialists',
    desc: 'Our recruiters are assigned to specific disciplines — structural, transportation, water resources, and more. They speak your language.',
  },
];

export default function HirePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-[#0D0D0D] py-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-[#CC1016]/20 text-[#CC1016] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              For Employers
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Hire Pre-Vetted Civil Engineers — <span className="text-[#CC1016]">Fast</span>
            </h1>
            <p className="text-white/70 text-lg mb-8 max-w-lg">
              We source PE-licensed engineers across all 10 civil disciplines. Shortlists in 48–72 hours. Every hire backed by a 90-day guarantee.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register/employer" className="btn-primary">Post a Job</Link>
              <Link href="/contact" className="btn-ghost">Talk to a Recruiter</Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { number: '300+', label: 'Placements in 12 Months' },
              { number: '48h',  label: 'Average Shortlist Time' },
              { number: '10',   label: 'Civil Disciplines Covered' },
              { number: '98%',  label: 'Client Satisfaction Rate' },
            ].map(stat => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <div className="text-3xl font-extrabold text-[#CC1016] mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {stat.number}
                </div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#CC1016] font-semibold text-sm uppercase tracking-wider">Why CCPromoters</span>
            <h2 className="text-3xl font-bold text-[#0D0D0D] mt-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
              The Specialists, Not a Generalist Agency
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map(d => (
              <div key={d.title} className="bg-[#F5F5F5] rounded-2xl p-6 border border-[#E5E5E5] hover:border-[#CC1016] hover:shadow-lg transition-all">
                <div className="w-11 h-11 bg-[#CC1016] text-white rounded-xl flex items-center justify-center mb-4">
                  {d.icon}
                </div>
                <h3 className="font-bold text-[#0D0D0D] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>{d.title}</h3>
                <p className="text-[#6B6B6B] text-sm">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-[#0D0D0D]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#CC1016] font-semibold text-sm uppercase tracking-wider">The Process</span>
            <h2 className="text-3xl font-bold text-white mt-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
              How It Works
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.number} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(100%+0px)] w-full h-0.5 bg-white/10 -translate-x-8" />
                )}
                <div className="text-5xl font-extrabold text-[#CC1016]/20 mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {step.number}
                </div>
                <h3 className="font-bold text-white text-lg mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>{step.title}</h3>
                <p className="text-white/60 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#CC1016] font-semibold text-sm uppercase tracking-wider">Our Services</span>
            <h2 className="text-3xl font-bold text-[#0D0D0D] mt-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Hiring Solutions for Engineering Firms
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(s => (
              <Link key={s.title} href={s.href}
                className="group bg-white rounded-2xl border border-[#E5E5E5] p-7 hover:shadow-xl hover:border-[#CC1016] transition-all duration-300 hover:-translate-y-1">
                <div className="w-11 h-11 bg-[#0D0D0D] text-white rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#CC1016] transition-colors">
                  {s.icon}
                </div>
                <h3 className="font-bold text-[#0D0D0D] text-lg mb-2 group-hover:text-[#CC1016] transition-colors" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {s.title}
                </h3>
                <p className="text-[#6B6B6B] text-sm mb-4">{s.desc}</p>
                <span className="text-[#CC1016] text-sm font-semibold">Learn More →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#CC1016] text-center px-4">
        <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Ready to Build Your Team?
        </h2>
        <p className="text-white/85 mb-8 max-w-xl mx-auto">
          Post a role and receive pre-vetted shortlists within 48 hours, or speak to a specialist recruiter today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register/employer" className="bg-white text-[#CC1016] font-bold px-8 py-3 rounded-lg hover:bg-white/90 transition-colors">
            Post a Job
          </Link>
          <Link href="/contact" className="border border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
            Talk to a Recruiter
          </Link>
        </div>
      </section>

    </div>
  );
}
