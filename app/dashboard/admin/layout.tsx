'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';
import {
  LayoutDashboard, Users, Briefcase, FileText, HelpCircle,
  Star, Mail, BarChart2, Settings, LogOut, ChevronRight,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/dashboard/admin/users', label: 'Users', icon: Users },
  { href: '/dashboard/admin/jobs', label: 'Jobs', icon: Briefcase },
  { href: '/dashboard/admin/blog', label: 'Blog / Insights', icon: FileText },
  { href: '/dashboard/admin/faqs', label: 'FAQs', icon: HelpCircle },
  { href: '/dashboard/admin/testimonials', label: 'Testimonials', icon: Star },
  { href: '/dashboard/admin/contacts', label: 'Contact Submissions', icon: Mail },
  { href: '/dashboard/admin/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/dashboard/admin/settings', label: 'Site Settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [adminUser, setAdminUser] = useState<any>(null);

  useEffect(() => {
    insforge.auth.getCurrentUser().then(({ data }) => {
      const u = data?.user;
      const roleVal = (u?.metadata as Record<string, unknown>)?.role
                   ?? (u?.profile as Record<string, unknown>)?.role;
      const isAdmin = roleVal === 'admin';
      if (!u || !isAdmin) {
        window.location.href = '/login';
        return;
      }
      setAdminUser(u);
      setReady(true);
    });
  }, []);

  async function handleSignOut() {
    await insforge.auth.signOut();
    window.location.href = '/';
  }

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-[#4A5568] text-sm">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  function isActive(item: { href: string; exact?: boolean }) {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  }

  return (
    <div className="flex min-h-screen bg-[#F7F9FC]">
      {/* Sidebar */}
      <aside className="w-60 bg-[#1A3A8F] shrink-0 flex flex-col">
        {/* Admin header */}
        <div className="px-5 py-5 border-b border-white/10">
          <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-1">Admin Panel</p>
          <p className="text-white font-semibold text-sm truncate">
            {adminUser?.email?.split('@')[0]}
          </p>
          <p className="text-white/40 text-xs truncate">{adminUser?.email}</p>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(item => {
            const active = isActive(item);
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                  active
                    ? 'bg-[#D4AF37] text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}>
                <item.icon size={16} className={active ? 'text-white' : 'text-white/50 group-hover:text-white'} />
                <span className="flex-1">{item.label}</span>
                {active && <ChevronRight size={14} />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-white/10 space-y-1">
          <Link href="/" target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/10 transition-all">
            <LayoutDashboard size={16} />
            View Public Site
          </Link>
          <button onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-red-300 hover:bg-red-500/10 transition-all">
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Content area */}
      <main className="flex-1 min-w-0 overflow-auto">
        {children}
      </main>
    </div>
  );
}
