'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Search } from 'lucide-react';

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

const services = [
  { name: 'Permanent Placement', slug: 'permanent-placement' },
  { name: 'Contract Staffing', slug: 'contract-staffing' },
  { name: 'Executive Search', slug: 'executive-search' },
  { name: 'Volume Recruitment', slug: 'volume-recruitment' },
  { name: 'Talent Mapping', slug: 'talent-mapping' },
  { name: 'Compensation Benchmarking', slug: 'compensation-benchmarking' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [disciplinesOpen, setDisciplinesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-[#E91E8C] text-white text-center text-sm py-2 font-medium z-50 relative">
        Now Hiring: 200+ Active Civil Engineering Roles Across the US —{' '}
        <Link href="/jobs" className="underline font-bold hover:text-white/80">Browse Openings</Link>
      </div>

      {/* Main navbar — always dark navy, shadow increases on scroll */}
      <nav className={`sticky top-0 z-40 bg-[#0B1F3A] transition-shadow duration-300 ${scrolled ? 'shadow-xl' : 'shadow-md'}`}>
        {/* Top accent line */}
        <div className="h-0.5 bg-gradient-to-r from-[#E91E8C] via-[#E91E8C]/60 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 bg-[#E91E8C] rounded flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                  <path d="M2 12l10-8 10 8" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="9" y="12" width="6" height="8" fill="white"/>
                  <rect x="4" y="15" width="4" height="5" fill="white" opacity="0.6"/>
                  <rect x="16" y="15" width="4" height="5" fill="white" opacity="0.6"/>
                </svg>
              </div>
              <span className="font-extrabold text-xl tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <span className="text-white">CC</span><span className="text-[#E91E8C]">Promoters</span>
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
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-2xl py-2 z-50 border border-gray-100">
                    {services.map(s => (
                      <Link key={s.slug} href={`/services/${s.slug}`}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#0B1F3A] hover:bg-[#F7F9FC] hover:text-[#E91E8C] transition-colors">
                        <span className="w-1.5 h-1.5 bg-[#E91E8C] rounded-full shrink-0" />
                        {s.name}
                      </Link>
                    ))}
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
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#0B1F3A] hover:bg-[#F7F9FC] hover:text-[#E91E8C] transition-colors">
                        <span className="w-1.5 h-1.5 bg-[#E91E8C] rounded-full shrink-0" />
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

            {/* CTAs + Search + Login */}
            <div className="hidden lg:flex items-center gap-2">
              <button onClick={() => setSearchOpen(true)}
                className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all">
                <Search size={17} />
              </button>

              {/* Login */}
              <Link href="/login"
                className="text-white/85 hover:text-white border border-white/30 hover:border-white/60 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                Login
              </Link>

              {/* Post a Job */}
              <Link href="/register/employer"
                className="bg-[#E91E8C] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#C0176E] transition-colors shadow-sm">
                Post a Job
              </Link>

              {/* Submit Resume */}
              <Link href="/register/candidate"
                className="bg-white text-[#0B1F3A] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors shadow-sm">
                Submit Resume
              </Link>
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
          <div className="lg:hidden bg-[#071529] border-t border-white/10 px-4 py-5 space-y-1">
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
              <Link href="/login"
                className="block text-center border border-white/30 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-all"
                onClick={() => setMobileOpen(false)}>
                Login
              </Link>
              <Link href="/register/employer"
                className="block text-center bg-[#E91E8C] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#C0176E] transition-colors"
                onClick={() => setMobileOpen(false)}>
                Post a Job
              </Link>
              <Link href="/register/candidate"
                className="block text-center bg-white text-[#0B1F3A] font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setMobileOpen(false)}>
                Submit Resume
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-[#0B1F3A]/95 z-50 flex items-start justify-center pt-24 px-4">
          <div className="w-full max-w-2xl">
            <div className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 shadow-2xl">
              <Search size={22} className="text-[#E91E8C] shrink-0" />
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
                className="flex-1 outline-none text-[#0B1F3A] text-lg placeholder:text-gray-400"
              />
              <button onClick={() => setSearchOpen(false)} className="text-gray-400 hover:text-[#0B1F3A] transition-colors">
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
