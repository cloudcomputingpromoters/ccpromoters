import Link from 'next/link';

const quickLinks = [
  { name: 'Homepage', href: '/' },
  { name: 'Browse Jobs', href: '/jobs' },
  { name: 'Salary Guide', href: '/salary-guide' },
  { name: 'Insights Hub', href: '/insights' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'FAQs', href: '/faqs' },
];

const employerLinks = [
  { name: 'Post a Job', href: '/register/employer' },
  { name: 'Permanent Placement', href: '/services/permanent-placement' },
  { name: 'Contract Staffing', href: '/services/contract-staffing' },
  { name: 'Executive Search', href: '/services/executive-search' },
  { name: 'Talent Mapping', href: '/services/talent-mapping' },
  { name: 'Compensation Data', href: '/services/compensation-benchmarking' },
];

const candidateLinks = [
  { name: 'Submit Resume', href: '/register/candidate' },
  { name: 'Job Search', href: '/jobs' },
  { name: 'Career Coaching', href: '/services/career-roadmap' },
  { name: 'Interview Prep', href: '/services/interview-coaching' },
  { name: 'Salary Negotiation', href: '/services/salary-negotiation' },
  { name: 'Candidate Login', href: '/login' },
];

const disciplineLinks = [
  { name: 'Structural', href: '/disciplines/structural' },
  { name: 'Transportation', href: '/disciplines/transportation' },
  { name: 'Geotechnical', href: '/disciplines/geotechnical' },
  { name: 'Water Resources', href: '/disciplines/water-resources' },
  { name: 'Environmental', href: '/disciplines/environmental' },
  { name: 'Construction', href: '/disciplines/construction' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms of Service', href: '/terms-of-service' },
  { name: 'Cookie Policy', href: '/cookie-policy' },
  { name: 'Sitemap', href: '/sitemap' },
];

export default function Footer() {
  return (
    <footer className="bg-[#1A3A8F] text-white">
      {/* Pink accent line */}
      <div className="h-1 bg-[#D4AF37]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Row 1: Brand + social */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/10">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-[#D4AF37] rounded flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                  <path d="M2 12l10-8 10 8" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  <path d="M4 19h16v2H4v-2zm5-9h3v9H9V10zm5-3h3v12h-3V7z" />
                </svg>
              </div>
              <span className="text-white font-bold text-xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
                CC<span className="text-[#D4AF37]">Promoters</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm max-w-xs">
              Building the Future, One Engineer at a Time. Civil engineering talent specialists across all disciplines.
            </p>
            <div className="flex items-center gap-2 mt-4 text-white/50 text-sm">
              <span>✉</span>
              <a href="mailto:hr@ccpromoters.com" className="hover:text-white transition-colors">hr@ccpromoters.com</a>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {[
              { label: 'in', href: 'https://linkedin.com' },
              { label: 'X', href: 'https://twitter.com' },
              { label: 'fb', href: 'https://facebook.com' },
              { label: 'ig', href: 'https://instagram.com' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D4AF37] flex items-center justify-center transition-colors text-xs font-bold text-white">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Row 2: Link grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 py-12 border-b border-white/10">
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/60 hover:text-[#D4AF37] text-sm transition-colors">{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">For Employers</h4>
            <ul className="space-y-2">
              {employerLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/60 hover:text-[#D4AF37] text-sm transition-colors">{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">For Candidates</h4>
            <ul className="space-y-2">
              {candidateLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/60 hover:text-[#D4AF37] text-sm transition-colors">{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Disciplines</h4>
            <ul className="space-y-2">
              {disciplineLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/60 hover:text-[#D4AF37] text-sm transition-colors">{l.name}</Link>
                </li>
              ))}
              <li>
                <Link href="/disciplines" className="text-[#D4AF37] text-sm hover:underline">View All →</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/60 hover:text-[#D4AF37] text-sm transition-colors">{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Row 3: Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} CCPromoters. All rights reserved. Civil Engineering Talent Specialists.
          </p>
          <div className="flex items-center gap-6">
            {legalLinks.slice(0, 3).map(l => (
              <Link key={l.href} href={l.href} className="text-white/40 hover:text-white/70 text-xs transition-colors">
                {l.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
