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
    <footer className="bg-[#0D0D0D] text-white">
      {/* Premium gold-to-red accent line */}
      <div className="h-[3px] bg-gradient-to-r from-[#C9A84C] via-[#CC1016] to-[#C9A84C]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Row 1: Brand + social */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-[#C9A84C]/20">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-[#CC1016] rounded flex items-center justify-center border border-[#C9A84C]/40">
                <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                  <path d="M2 12l10-8 10 8" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  <path d="M4 19h16v2H4v-2zm5-9h3v9H9V10zm5-3h3v12h-3V7z" />
                </svg>
              </div>
              <span className="text-white font-bold text-xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
                CC<span className="text-[#CC1016]">Promoters</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm max-w-xs">
              Building the Future, One Engineer at a Time. Civil engineering talent specialists across all disciplines.
            </p>
            <div className="flex items-center gap-2 mt-4 text-white/40 text-sm">
              <span>✉</span>
              <a href="mailto:hr@ccpromoters.com" className="hover:text-[#CC1016] transition-colors">
                hr@ccpromoters.com
              </a>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {[
              { label: 'in', href: 'https://linkedin.com' },
              { label: 'X',  href: 'https://twitter.com' },
              { label: 'fb', href: 'https://facebook.com' },
              { label: 'ig', href: 'https://instagram.com' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-[#C9A84C]/30 hover:bg-[#CC1016] hover:border-[#CC1016] flex items-center justify-center transition-all text-xs font-bold text-white">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Row 2: Link grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 py-12 border-b border-[#C9A84C]/20">
          {[
            { title: 'Quick Links',    links: quickLinks },
            { title: 'For Employers',  links: employerLinks },
            { title: 'For Candidates', links: candidateLinks },
            { title: 'Disciplines',    links: disciplineLinks, extra: { name: 'View All →', href: '/disciplines' } },
            { title: 'Legal',          links: legalLinks },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-4 border-l-2 border-[#C9A84C] pl-3">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-white/50 hover:text-[#CC1016] text-sm transition-colors">
                      {l.name}
                    </Link>
                  </li>
                ))}
                {col.extra && (
                  <li>
                    <Link href={col.extra.href} className="text-[#C9A84C] text-sm hover:underline">
                      {col.extra.name}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Row 3: Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} CCPromoters. All rights reserved. Civil Engineering Talent Specialists.
          </p>
          <div className="flex items-center gap-6">
            {legalLinks.slice(0, 3).map(l => (
              <Link key={l.href} href={l.href} className="text-white/30 hover:text-white/60 text-xs transition-colors">
                {l.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
