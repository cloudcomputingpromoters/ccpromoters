import Link from 'next/link';
import { Briefcase, HardHat } from 'lucide-react';

export default function AudienceCards() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
        {/* Employer card */}
        <div className="bg-[#1A3A8F] rounded-2xl p-10 flex flex-col gap-5 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
          <div className="w-14 h-14 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center">
            <Briefcase size={28} className="text-[#D4AF37]" />
          </div>
          <div>
            <h2 className="text-white font-bold text-2xl mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
              I Need to Hire Engineers
            </h2>
            <p className="text-white/70 text-base leading-relaxed">
              Access pre-screened civil engineering professionals across every discipline. PE-verified, technically assessed, and ready to deliver.
            </p>
          </div>
          <ul className="space-y-2">
            {['PE & EIT license verification included', '48-hour candidate turnaround', 'Permanent, contract & executive roles'].map(item => (
              <li key={item} className="flex items-center gap-2 text-white/60 text-sm">
                <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <Link href="/register/employer"
            className="inline-block bg-[#D4AF37] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#B8960C] transition-colors text-center mt-2">
            Find Talent Now →
          </Link>
        </div>

        {/* Candidate card */}
        <div className="bg-white border-2 border-[#E2E8F0] rounded-2xl p-10 flex flex-col gap-5 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37] group">
          <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center">
            <HardHat size={28} className="text-[#D4AF37]" />
          </div>
          <div>
            <h2 className="text-[#1A3A8F] font-bold text-2xl mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
              I&apos;m Looking for a Role
            </h2>
            <p className="text-[#4A5568] text-base leading-relaxed">
              Explore 200+ active civil engineering positions. Your dedicated recruiter advocates for you at every step of the process.
            </p>
          </div>
          <ul className="space-y-2">
            {['All disciplines, all experience levels', 'Salary negotiation support included', 'Access to unlisted confidential roles'].map(item => (
              <li key={item} className="flex items-center gap-2 text-[#4A5568] text-sm">
                <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <Link href="/jobs"
            className="inline-block bg-[#D4AF37] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#B8960C] transition-colors text-center mt-2">
            Browse Jobs →
          </Link>
        </div>
      </div>
    </section>
  );
}
