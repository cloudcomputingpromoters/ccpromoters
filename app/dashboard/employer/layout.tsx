'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';
import { Briefcase, PlusCircle, Users, Settings, LogOut, BarChart2 } from 'lucide-react';

const navItems = [
  { label: 'Overview',     href: '/dashboard/employer',           icon: BarChart2,   exact: true },
  { label: 'My Listings',  href: '/dashboard/employer/listings',  icon: Briefcase  },
  { label: 'Post a Job',   href: '/dashboard/employer/post-job',  icon: PlusCircle },
  { label: 'Applicants',   href: '/dashboard/employer/applicants',icon: Users      },
  { label: 'Settings',     href: '/dashboard/employer/settings',  icon: Settings   },
];

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function verify() {
      const { data } = await insforge.auth.getCurrentUser();
      if (cancelled) return;
      if (!data?.user) { router.replace('/login'); return; }

      const u = data.user;
      const role = (u.metadata as Record<string, unknown>)?.role
               ?? (u.profile as Record<string, unknown>)?.role;
      if (role === 'admin') { router.replace('/dashboard/admin'); return; }

      // Verify employer profile exists
      const { data: emp } = await insforge.database
        .from('employer_profiles')
        .select('company_name')
        .eq('user_id', u.id)
        .maybeSingle();

      if (cancelled) return;
      if (!emp && role !== 'employer') {
        // Not an employer — redirect to candidate dashboard
        router.replace('/dashboard/candidate');
        return;
      }

      setUser(u);
      setCompanyName(emp?.company_name || 'Your Company');
      setChecking(false);
    }
    verify();
    return () => { cancelled = true; };
  }, [router]);

  async function handleSignOut() {
    await insforge.auth.signOut();
    window.location.href = '/';
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#CC1016] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Top bar */}
      <div className="bg-[#0D0D0D] text-white py-4 px-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-bold text-lg">
              CC<span className="text-[#CC1016]">Promoters</span>
            </Link>
            <span className="text-white/30 hidden sm:block">|</span>
            <span className="text-white/70 text-sm hidden sm:block">{companyName}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/jobs" className="text-white/60 hover:text-white text-sm transition-colors hidden sm:block">
              Job Board
            </Link>
            <span className="text-white/50 text-sm hidden sm:block">{user?.email}</span>
            <button onClick={handleSignOut}
              className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors">
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-56 shrink-0">
            <div className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden sticky top-24">
              <div className="px-5 py-4 border-b border-[#E5E5E5]">
                <p className="text-xs text-[#6B6B6B] font-medium uppercase tracking-wide">Employer</p>
                <p className="font-bold text-[#0D0D0D] mt-0.5 truncate">{companyName}</p>
              </div>
              {navItems.map(item => {
                const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                return (
                  <Link key={item.href} href={item.href}
                    className={`flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition-colors ${
                      active
                        ? 'bg-[#FFF8E7] text-[#CC1016] border-r-2 border-[#CC1016]'
                        : 'text-[#6B6B6B] hover:bg-[#F5F5F5]'
                    }`}>
                    <item.icon size={16} />
                    {item.label}
                  </Link>
                );
              })}
              <div className="border-t border-[#E5E5E5]">
                <button onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            </div>
          </aside>

          {/* Page content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
