import Link from 'next/link';
import { Briefcase, HardHat, ArrowRight } from 'lucide-react';

export const metadata = { title: 'Register | CCPromoters' };

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center px-4 py-16">
      <div className="max-w-3xl w-full text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-[#D4AF37] rounded flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
              <path d="M2 12l10-8 10 8" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-bold text-[#1A3A8F] text-xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
            CC<span className="text-[#D4AF37]">Promoters</span>
          </span>
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1A3A8F] mb-3">Join CCPromoters</h1>
        <p className="text-[#4A5568] text-lg mb-12">Tell us how you&apos;d like to use the platform</p>
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/register/candidate"
            className="group bg-white rounded-2xl border-2 border-[#E2E8F0] hover:border-[#D4AF37] p-10 text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col gap-4">
            <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center">
              <HardHat size={28} className="text-[#D4AF37]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1A3A8F] mb-2 group-hover:text-[#D4AF37] transition-colors">
                I&apos;m a Civil Engineer
              </h2>
              <p className="text-[#4A5568]">Find your next role, get career coaching, and access confidential opportunities.</p>
            </div>
            <div className="flex items-center gap-2 text-[#D4AF37] font-semibold mt-auto">
              Create Candidate Profile <ArrowRight size={16} />
            </div>
          </Link>
          <Link href="/register/employer"
            className="group bg-[#1A3A8F] rounded-2xl border-2 border-[#1A3A8F] hover:border-[#D4AF37] p-10 text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col gap-4">
            <div className="w-14 h-14 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center">
              <Briefcase size={28} className="text-[#D4AF37]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-2">I&apos;m an Employer</h2>
              <p className="text-white/70">Post jobs, find PE-licensed engineers, and manage your hiring pipeline.</p>
            </div>
            <div className="flex items-center gap-2 text-[#D4AF37] font-semibold mt-auto">
              Create Employer Account <ArrowRight size={16} />
            </div>
          </Link>
        </div>
        <p className="text-[#4A5568] mt-8 text-sm">
          Already have an account?{' '}
          {/* eslint-disable-next-line react/no-unescaped-entities -- intentional */}
          <Link href="/login" className="text-[#D4AF37] font-semibold hover:underline">Sign In →</Link>
        </p>
      </div>
    </div>
  );
}
