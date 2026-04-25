import Link from 'next/link';
export const metadata = { title: 'Sitemap | CCPromoters', description: 'Complete sitemap for the CCPromoters civil engineering staffing website.' };

const sections = [
  { title: 'Main Pages', links: [{ label: 'Home', href: '/' }, { label: 'Find a Job', href: '/jobs' }, { label: 'All Disciplines', href: '/disciplines' }, { label: 'All Services', href: '/services' }, { label: 'About Us', href: '/about' }, { label: 'Meet the Team', href: '/about/team' }, { label: 'Insights & News', href: '/insights' }, { label: 'Salary Guide', href: '/salary-guide' }, { label: 'Placement Map', href: '/project-placement-map' }, { label: 'FAQs', href: '/faqs' }, { label: 'Contact', href: '/contact' }] },
  { title: 'Engineering Disciplines', links: [{ label: 'Structural Engineering', href: '/disciplines/structural' }, { label: 'Transportation Engineering', href: '/disciplines/transportation' }, { label: 'Geotechnical Engineering', href: '/disciplines/geotechnical' }, { label: 'Water Resources & Hydrology', href: '/disciplines/water-resources' }, { label: 'Environmental Engineering', href: '/disciplines/environmental' }, { label: 'Wastewater & Utilities', href: '/disciplines/wastewater' }, { label: 'Construction & Project Mgmt', href: '/disciplines/construction' }, { label: 'Land Development & Planning', href: '/disciplines/land-development' }, { label: 'Surveying & Geospatial', href: '/disciplines/surveying' }, { label: 'Coastal & Marine Engineering', href: '/disciplines/coastal' }] },
  { title: 'Employer Services', links: [{ label: 'Permanent Placement', href: '/services/permanent-placement' }, { label: 'Contract Staffing', href: '/services/contract-staffing' }, { label: 'Volume Recruitment', href: '/services/volume-recruitment' }, { label: 'Executive Search', href: '/services/executive-search' }, { label: 'Talent Mapping', href: '/services/talent-mapping' }, { label: 'Compensation Benchmarking', href: '/services/compensation-benchmarking' }] },
  { title: 'Candidate Services', links: [{ label: 'Job Search', href: '/services/job-search' }, { label: 'Resume Optimisation', href: '/services/resume-optimization' }, { label: 'Interview Coaching', href: '/services/interview-coaching' }, { label: 'Salary Negotiation', href: '/services/salary-negotiation' }, { label: 'Career Roadmap', href: '/services/career-roadmap' }] },
  { title: 'Account & Authentication', links: [{ label: 'Login', href: '/login' }, { label: 'Register', href: '/register' }, { label: 'Register as Candidate', href: '/register/candidate' }, { label: 'Register as Employer', href: '/register/employer' }, { label: 'Forgot Password', href: '/auth/forgot-password' }] },
  { title: 'Legal', links: [{ label: 'Privacy Policy', href: '/privacy-policy' }, { label: 'Terms of Service', href: '/terms-of-service' }, { label: 'Cookie Policy', href: '/cookie-policy' }] },
];

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#0D0D0D] py-16 px-4 text-center">
        <h1 className="text-4xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Sitemap</h1>
        <p className="text-white/60 mt-2">All pages on the CCPromoters platform</p>
      </section>
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {sections.map(section => (
            <div key={section.title}>
              <h2 className="font-bold text-[#0D0D0D] text-lg mb-4 pb-2 border-b border-[#E5E5E5]">{section.title}</h2>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[#6B6B6B] hover:text-[#CC1016] transition-colors text-sm">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
