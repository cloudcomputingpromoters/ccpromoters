'use client';

import { useState, useEffect } from 'react';
import { insforge } from '@/lib/insforge';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  User, Briefcase, BookmarkCheck, Bell, MessageSquare,
  Settings, LogOut, MapPin, DollarSign, Clock, Award,
  FileText, ChevronRight,
} from 'lucide-react';

const statusColors: Record<string, string> = {
  applied: 'bg-gray-100 text-gray-700',
  under_review: 'bg-blue-100 text-blue-700',
  interview_scheduled: 'bg-[#FFF0F7] text-[#D4AF37]',
  offer_made: 'bg-green-100 text-green-700',
  not_progressing: 'bg-red-100 text-red-700',
  withdrawn: 'bg-gray-100 text-gray-500',
};

const statusLabels: Record<string, string> = {
  applied: 'Applied',
  under_review: 'Under Review',
  interview_scheduled: 'Interview Scheduled',
  offer_made: 'Offer Made',
  not_progressing: 'Not Progressing',
  withdrawn: 'Withdrawn',
};

const sidebarItems = [
  { label: 'Overview', href: '/dashboard/candidate', icon: User, exact: true },
  { label: 'My Applications', href: '/dashboard/candidate/applications', icon: Briefcase },
  { label: 'Saved Jobs', href: '/dashboard/candidate/saved-jobs', icon: BookmarkCheck },
  { label: 'Job Alerts', href: '/dashboard/candidate/alerts', icon: Bell },
  { label: 'Messages', href: '/dashboard/candidate/messages', icon: MessageSquare },
  { label: 'My Resume', href: '/dashboard/candidate/resume', icon: FileText },
  { label: 'My Profile', href: '/dashboard/candidate/profile', icon: Settings },
];

export default function CandidateDashboard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [applications, setApplications] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    async function load() {
      const { data: userData } = await insforge.auth.getCurrentUser();
      if (!userData?.user) {
        window.location.href = '/login';
        return;
      }
      setUser(userData.user);

      // Ensure a candidates row exists for this user (needed for applications/saved jobs)
      let { data: candidate } = await insforge.database
        .from('candidates')
        .select('id')
        .eq('user_id', userData.user.id)
        .maybeSingle();

      if (!candidate) {
        // Pull from candidate_profiles if available
        const { data: prof } = await insforge.database
          .from('candidate_profiles')
          .select('first_name, last_name, discipline, years_experience, skills')
          .eq('user_id', userData.user.id)
          .maybeSingle();

        const { data: newCandidate } = await insforge.database
          .from('candidates')
          .insert({
            user_id: userData.user.id,
            first_name: prof?.first_name || userData.user.email.split('@')[0],
            last_name: prof?.last_name || '',
            discipline: prof?.discipline || null,
            years_experience: prof?.years_experience || null,
            skills: prof?.skills || null,
            is_visible: true,
          })
          .select('id')
          .single();
        candidate = newCandidate;
      }

      // applications.candidate_id = auth user.id (consistent with ApplyButton and applications sub-page)
      const [appsRes, savedRes] = await Promise.all([
        insforge.database
          .from('applications')
          .select('*, jobs(title, slug, discipline, location_city, location_state, is_remote, salary_min, salary_max, employment_type)')
          .eq('candidate_id', userData.user.id)
          .order('applied_at', { ascending: false }),
        insforge.database
          .from('saved_jobs')
          .select('*, jobs(id, title, slug, discipline, location_city, location_state, is_remote, salary_min, salary_max, employment_type, posted_at)')
          .eq('candidate_id', candidate?.id || userData.user.id)
          .order('saved_at', { ascending: false }),
      ]);
      setApplications(appsRes.data || []);
      setSavedJobs(savedRes.data || []);

      setLoading(false);
    }
    load();
  }, []);

  async function handleSignOut() {
    await insforge.auth.signOut();
    window.location.href = '/';
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#4A5568]">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const displayName = user?.profile?.name || user?.email?.split('@')[0] || 'Engineer';

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* Header */}
      <div className="bg-[#1A3A8F] text-white py-6 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Welcome back, <span className="text-[#D4AF37]">{displayName}</span>
            </h1>
            <p className="text-white/60 text-sm mt-0.5">{user?.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/jobs" className="text-white/70 hover:text-white text-sm">Browse Jobs</Link>
            <button onClick={handleSignOut}
              className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors">
              <LogOut size={15} /> Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-56 shrink-0">
            <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
              {sidebarItems.map(item => {
                const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                return (
                  <Link key={item.href} href={item.href}
                    className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition-colors ${
                      active
                        ? 'bg-[#FFF8E7] text-[#D4AF37] border-r-2 border-[#D4AF37]'
                        : 'text-[#4A5568] hover:bg-[#F7F9FC]'
                    }`}>
                    <item.icon size={16} />
                    <span className="flex-1">{item.label}</span>
                    {active && <ChevronRight size={13} />}
                  </Link>
                );
              })}
              <div className="border-t border-[#E2E8F0]">
                <button onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            </div>
          </aside>

          {/* Overview */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Applications', value: applications.length, icon: Briefcase, color: '#D4AF37' },
                { label: 'Saved Jobs', value: savedJobs.length, icon: BookmarkCheck, color: '#7C3AED' },
                { label: 'Interviews', value: applications.filter(a => a.status === 'interview_scheduled').length, icon: MessageSquare, color: '#059669' },
                { label: 'Offers', value: applications.filter(a => a.status === 'offer_made').length, icon: Award, color: '#D97706' },
              ].map(stat => (
                <div key={stat.label} className="bg-white rounded-xl border border-[#E2E8F0] p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: stat.color + '20' }}>
                    <stat.icon size={20} style={{ color: stat.color }} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#1A3A8F]">{stat.value}</div>
                    <div className="text-xs text-[#4A5568]">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Applications */}
            {applications.length > 0 ? (
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-[#1A3A8F]">Recent Applications</h3>
                  <Link href="/dashboard/candidate/applications" className="text-[#D4AF37] text-sm font-semibold hover:underline">
                    View All →
                  </Link>
                </div>
                <div className="space-y-3">
                  {applications.slice(0, 5).map(app => (
                    <div key={app.id} className="flex items-center justify-between py-3 border-b border-[#E2E8F0] last:border-0">
                      <div>
                        <Link href={`/jobs/${app.jobs?.slug}`} className="font-semibold text-[#1A3A8F] hover:text-[#D4AF37] transition-colors text-sm">
                          {app.jobs?.title}
                        </Link>
                        <p className="text-xs text-[#4A5568] mt-0.5 flex items-center gap-2">
                          <MapPin size={10} />
                          {app.jobs?.is_remote ? 'Remote' : `${app.jobs?.location_city}, ${app.jobs?.location_state}`}
                          <span className="flex items-center gap-1 ml-1"><Clock size={10} />
                            {new Date(app.applied_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </p>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[app.status] || 'bg-gray-100 text-gray-700'}`}>
                        {statusLabels[app.status] || app.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-10 text-center">
                <Briefcase size={40} className="text-[#E2E8F0] mx-auto mb-3" />
                <h4 className="font-bold text-[#1A3A8F] mb-1">No applications yet</h4>
                <p className="text-[#4A5568] text-sm mb-5">Browse and apply to civil engineering roles that match your skills.</p>
                <Link href="/jobs" className="bg-[#D4AF37] text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-[#B8960C] transition-colors text-sm inline-block">
                  Browse Jobs
                </Link>
              </div>
            )}

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/jobs" className="bg-[#1A3A8F] text-white rounded-xl p-5 hover:bg-[#163298] transition-colors">
                <Briefcase size={20} className="mb-2 text-[#D4AF37]" />
                <h4 className="font-bold text-sm">Browse Jobs</h4>
                <p className="text-white/60 text-xs mt-1">200+ active roles</p>
              </Link>
              <Link href="/dashboard/candidate/profile" className="bg-white border border-[#E2E8F0] rounded-xl p-5 hover:border-[#D4AF37] transition-colors">
                <User size={20} className="mb-2 text-[#D4AF37]" />
                <h4 className="font-bold text-[#1A3A8F] text-sm">My Profile</h4>
                <p className="text-[#4A5568] text-xs mt-1">Update your details</p>
              </Link>
              <Link href="/salary-guide" className="bg-white border border-[#E2E8F0] rounded-xl p-5 hover:border-[#D4AF37] transition-colors">
                <DollarSign size={20} className="mb-2 text-[#D4AF37]" />
                <h4 className="font-bold text-[#1A3A8F] text-sm">Salary Guide</h4>
                <p className="text-[#4A5568] text-xs mt-1">Check your market rate</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
