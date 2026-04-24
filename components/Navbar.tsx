'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Search, LogOut, LayoutDashboard, Shield } from 'lucide-react';
import { insforge } from '@/lib/insforge';

const disciplines = [
  { name: 'Structural Engineering', slug: 'structural' },
  { name: 'Transportation Engineering', slug: 'transportation' },
  { name: 'Geotechnical Engineering', slug: 'geotechnical' },
  { name: 'Water Resources & Hydrology', slug: 'water-resources' },
  { name: 'Environmental Engineering', slug: 'environmental' },
  { name: 'Wastewater & Utilities', slug: 'wastewater' },
  { name: 'Construction & Project Mgmt', slug: 'construction' },
  { name: 'Land Development & Planning', slug: 'land-development' },
  { name: 'Surveying & Geospatial', slug: 'surveying' },
  { name: 'Coastal & Marine Engineering', slug: 'coastal' },
];

const employerServices = [
  { name: 'Permanent Placement', slug: 'permanent-placement' },
  { name: 'Contract Staffing', slug: 'contract-staffing' },
  { name: 'Executive Search', slug: 'executive-search' },
  { name: 'Volume Recruitment', slug: 'volume-recruitment' },
  { name: 'Talent Mapping', slug: 'talent-mapping' },
  { name: 'Compensation Benchmarking', slug: 'compensation-benchmarking' },
  { name: 'Employer Branding', slug: 'employer-branding' },
  { name: 'Outplacement Support', slug: 'outplacement' },
];

const candidateServices = [
  { name: 'Job Search', slug: 'job-search' },
  { name: 'Resume Optimisation', slug: 'resume-optimization' },
  { name: 'Interview Coaching', slug: 'interview-coaching' },
  { name: 'Salary Negotiation', slug: 'salary-negotiation' },
  { name: 'Career Roadmap', slug: 'career-roadmap' },
  { name: 'Unlisted Roles', slug: 'unlisted-roles' },
];

type UserRole = 'admin' | 'employer' | 'candidate' | null;

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [disciplinesOpen, setDisciplinesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Auth state
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [authUser, setAuthUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function checkAuth() {
      try {
        const { data } = await insforge.auth.getCurrentUser();
        if (cancelled) return;
        if (!data?.user) {
          setAuthUser(null);
          setUserRole(null);
          setAuthLoading(false);
          return;
        }
        const user = data.user;
        setAuthUser(user);

        // Admin: check metadata.role or profile.role
        const metaRole = (user.metadata as Record<string, unknown>)?.role
                      ?? (user.profile as Record<string, unknown>)?.role;
        if (metaRole === 'admin') {
          setUserRole('admin');
          setAuthLoading(false);
          return;
        }
        // Employer: check employer_profiles table
        const { data: emp } = await insforge.database
          .from('employer_profiles')
          .select('user_id')
          .eq('user_id', user.id)
          .maybeSingle();
        if (cancelled) return;
        setUserRole(emp ? 'employer' : 'candidate');
      } catch {
        if (!cancelled) { setAuthUser(null); setUserRole(null); }
      } finally {
        if (!cancelled) setAuthLoading(false);
      }
    }
    checkAuth();
    return () => { cancelled = true; };
  }, [pathname]); // re-check on every route change

  async function handleSignOut() {
    await insforge.auth.signOut();
    setAuthUser(null);
    setUserRole(null);
    window.location.href = '/';
  }

  // Derive initials from email
  function getInitials(email: string) {
    const name = email.split('@')[0];
    return name.slice(0, 2).toUpperCase();
  }

  const dashboardHref =
    userRole === 'admin' ? '/dashboard/admin' :
    userRole === 'employer' ? '/dashboard/employer' :
    '/dashboard/candidate';

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-[#D4AF37] text-white text-center text-sm py-2 font-medium z-50 relative">
        Now Hiring: 200+ Active Civil Engineering Roles Across the US —{' '}
        <Link href="/jobs" className="underline font-bold hover:text-white/80">Browse Openings</Link>
      </div>

      {/* Main navbar */}
      <nav className={`sticky top-0 z-40 bg-[#1A3A8F] transition-shadow duration-300 ${scrolled ? 'shadow-xl' : 'shadow-md'}`}>
        <div className="h-0.5 bg-gradient-to-r from-[#D4AF37] via-[#D4AF37]/60 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 bg-[#D4AF37] rounded flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                  <path d="M2 12l10-8 10 8" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="9" y="12" width="6" height="8" fill="white"/>
                  <rect x="4" y="15" width="4" height="5" fill="white" opacity="0.6"/>
                  <rect x="16" y="15" width="4" height="5" fill="white" opacity="0.6"/>
                </svg>
              </div>
              <span className="font-extrabold text-xl tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <span className="text-white">CC</span><span className="text-[#D4AF37]">Promoters</span>
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1">
              <Link href="/jobs"
                className="text-white/85 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm font-medium transition-all">
                Find a Job
              </Link>
              <Link href="/jobs?audience=employer"
                className="text-white/85 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm font-medium transition-all">
                Hire Talent
              </Link>

              {/* Services dropdown */}
              <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
                <button className="flex items-center gap-1 text-white/85 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm font-medium transition-all">
                  Services <ChevronDown size={14} className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {servicesOpen && (
                  <div className="absolute top-full left-0 mt-1 w-[480px] bg-white rounded-xl shadow-2xl py-4 z-50 border border-gray-100">
                    <div className="grid grid-cols-2 gap-0 divide-x divide-gray-100">
                      <div className="px-4">
                        <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2 px-0">For Employers</p>
                        {employerServices.map(s => (
                          <Link key={s.slug} href={`/services/${s.slug}`}
                            className="flex items-center gap-2 px-2 py-2 text-sm text-[#1A3A8F] hover:bg-[#F7F9FC] hover:text-[#D4AF37] rounded-lg transition-colors">
                            <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full shrink-0" />
                            {s.name}
                          </Link>
                        ))}
                      </div>
                      <div className="px-4">
                        <p className="text-xs font-bold text-[#1A3A8F] uppercase tracking-wider mb-2 px-0">For Candidates</p>
                        {candidateServices.map(s => (
                          <Link key={s.slug} href={`/services/${s.slug}`}
                            className="flex items-center gap-2 px-2 py-2 text-sm text-[#1A3A8F] hover:bg-[#F7F9FC] hover:text-[#D4AF37] rounded-lg transition-colors">
                            <span className="w-1.5 h-1.5 bg-[#1A3A8F] rounded-full shrink-0" />
                            {s.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="mt-3 mx-4 pt-3 border-t border-gray-100">
                      <Link href="/services" className="block text-center text-sm font-semibold text-[#D4AF37] hover:text-[#B8960C] transition-colors">
                        View All Services →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Disciplines dropdown */}
              <div className="relative" onMouseEnter={() => setDisciplinesOpen(true)} onMouseLeave={() => setDisciplinesOpen(false)}>
                <button className="flex items-center gap-1 text-white/85 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm font-medium transition-all">
                  Disciplines <ChevronDown size={14} className={`transition-transform ${disciplinesOpen ? 'rotate-180' : ''}`} />
                </button>
                {disciplinesOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-2xl py-2 z-50 border border-gray-100">
                    {disciplines.map(d => (
                      <Link key={d.slug} href={`/disciplines/${d.slug}`}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#1A3A8F] hover:bg-[#F7F9FC] hover:text-[#D4AF37] transition-colors">
                        <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full shrink-0" />
                        {d.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/insights"
                className="text-white/85 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm font-medium transition-all">
                Insights
              </Link>
              <Link href="/about"
                className="text-white/85 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm font-medium transition-all">
                About
              </Link>
              <Link href="/contact"
                className="text-white/85 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm font-medium transition-all">
                Contact
              </Link>
            </div>

            {/* CTAs + Search */}
            <div className="hidden lg:flex items-center gap-2">
              <button onClick={() => setSearchOpen(true)}
                className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all">
                <Search size={17} />
              </button>

              {authLoading ? (
                <div className="w-20 h-8 bg-white/10 rounded-lg animate-pulse" />
              ) : authUser ? (
                /* ── LOGGED IN ── */
                <div className="flex items-center gap-2">
                  {/* Avatar + name */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {getInitials(authUser.email)}
                    </div>
                    <span className="text-white/80 text-sm hidden xl:block max-w-[120px] truncate">
                      {authUser.email.split('@')[0]}
                    </span>
                  </div>

                  {/* Dashboard link */}
                  {userRole === 'admin' ? (
                    <Link href="/dashboard/admin"
                      className="flex items-center gap-1.5 text-white/85 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm font-medium transition-all">
                      <Shield size={14} className="text-[#D4AF37]" />
                      Admin Panel
                    </Link>
                  ) : (
                    <Link href={dashboardHref}
                      className="flex items-center gap-1.5 text-white/85 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm font-medium transition-all">
                      <LayoutDashboard size={14} className="text-[#D4AF37]" />
                      My Dashboard
                    </Link>
                  )}

                  {/* Sign out */}
                  <button onClick={handleSignOut}
                    className="flex items-center gap-1.5 text-white/60 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm transition-all">
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </div>
              ) : (
                /* ── LOGGED OUT ── */
                <>
                  <Link href="/login"
                    className="text-white/85 hover:text-white border border-white/30 hover:border-white/60 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                    Login
                  </Link>
                  <Link href="/register/employer"
                    className="bg-[#D4AF37] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#B8960C] transition-colors shadow-sm">
                    Post a Job
                  </Link>
                  <Link href="/register/candidate"
                    className="bg-white text-[#1A3A8F] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors shadow-sm">
                    Submit Resume
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#0D1F6B] border-t border-white/10 px-4 py-5 space-y-1">
            {[
              { label: 'Find a Job', href: '/jobs' },
              { label: 'Hire Talent', href: '/jobs?audience=employer' },
              { label: 'Services', href: '/services' },
              { label: 'Disciplines', href: '/disciplines' },
              { label: 'Insights', href: '/insights' },
              { label: 'About', href: '/about' },
              { label: 'Contact', href: '/contact' },
            ].map(item => (
              <Link key={item.href} href={item.href}
                className="block text-white/85 hover:text-white hover:bg-white/10 px-4 py-2.5 rounded-lg font-medium transition-all"
                onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 mt-3 border-t border-white/10">
              {authUser ? (
                <>
                  <Link href={dashboardHref}
                    className="block text-center bg-[#D4AF37] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#B8960C] transition-colors"
                    onClick={() => setMobileOpen(false)}>
                    {userRole === 'admin' ? 'Admin Panel' : 'My Dashboard'}
                  </Link>
                  <button onClick={handleSignOut}
                    className="block w-full text-center border border-white/30 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-all">
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login"
                    className="block text-center border border-white/30 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-all"
                    onClick={() => setMobileOpen(false)}>
                    Login
                  </Link>
                  <Link href="/register/employer"
                    className="block text-center bg-[#D4AF37] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#B8960C] transition-colors"
                    onClick={() => setMobileOpen(false)}>
                    Post a Job
                  </Link>
                  <Link href="/register/candidate"
                    className="block text-center bg-white text-[#1A3A8F] font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => setMobileOpen(false)}>
                    Submit Resume
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-[#1A3A8F]/95 z-50 flex items-start justify-center pt-24 px-4">
          <div className="w-full max-w-2xl">
            <div className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 shadow-2xl">
              <Search size={22} className="text-[#D4AF37] shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Search jobs, disciplines, services..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && searchQuery) {
                    window.location.href = `/jobs?q=${encodeURIComponent(searchQuery)}`;
                  }
                  if (e.key === 'Escape') setSearchOpen(false);
                }}
                className="flex-1 outline-none text-[#1A3A8F] text-lg placeholder:text-gray-400"
              />
              <button onClick={() => setSearchOpen(false)} className="text-gray-400 hover:text-[#1A3A8F] transition-colors">
                <X size={20} />
              </button>
            </div>
            <p className="text-white/40 text-sm mt-3 text-center">Press Enter to search · Esc to close</p>
          </div>
        </div>
      )}
    </>
  );
}
