'use client';

import { useState, useEffect } from 'react';
import { insforge } from '@/lib/insforge';
import Link from 'next/link';
import { User, Briefcase, BookmarkCheck, Bell, MessageSquare, Settings, LogOut, MapPin, DollarSign, Clock, Award } from 'lucide-react';

const statusColors: Record<string, string> = {
  applied: 'bg-gray-100 text-gray-700',
  under_review: 'bg-blue-100 text-blue-700',
  interview_scheduled: 'bg-[#FFF0F7] text-[#E91E8C]',
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

const navItems = [
  { id: 'overview', label: 'Overview', icon: User },
  { id: 'applications', label: 'My Applications', icon: Briefcase },
  { id: 'saved', label: 'Saved Jobs', icon: BookmarkCheck },
  { id: 'alerts', label: 'Job Alerts', icon: Bell },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'profile', label: 'My Profile', icon: Settings },
];

export default function CandidateDashboard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profile, setProfile] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [applications, setApplications] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: userData } = await insforge.auth.getCurrentUser();
      if (!userData?.user) {
        window.location.href = '/login';
        return;
      }
      setUser(userData.user);

      const { data: prof } = await insforge.auth.getProfile(userData.user.id);
      setProfile(prof);

      const { data: candidate } = await insforge.database
        .from('candidates')
        .select('id')
        .eq('user_id', userData.user.id)
        .maybeSingle();

      if (candidate) {
        const { data: apps } = await insforge.database
          .from('applications')
          .select('*, jobs(title, slug, discipline, discipline_slug, location_city, location_state, is_remote, salary_min, salary_max, employment_type)')
          .eq('candidate_id', candidate.id)
          .order('applied_at', { ascending: false });
        setApplications(apps || []);

        const { data: saved } = await insforge.database
          .from('saved_jobs')
          .select('*, jobs(id, title, slug, discipline, discipline_slug, location_city, location_state, is_remote, salary_min, salary_max, employment_type, posted_at)')
          .eq('candidate_id', candidate.id)
          .order('saved_at', { ascending: false });
        setSavedJobs(saved || []);
      }

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
          <div className="w-12 h-12 border-4 border-[#E91E8C] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#4A5568]">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const displayName = profile?.name || user?.email?.split('@')[0] || 'Engineer';

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* Dashboard header */}
      <div className="bg-[#0B1F3A] text-white py-6 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Welcome back, <span className="text-[#E91E8C]">{displayName}</span> 👷
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
              {navItems.map(item => (
                <button key={item.id} onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-[#FFF0F7] text-[#E91E8C] border-r-2 border-[#E91E8C]' : 'text-[#4A5568] hover:bg-[#F7F9FC]'}`}>
                  <item.icon size={16} />
                  {item.label}
                </button>
              ))}
              <div className="border-t border-[#E2E8F0]">
                <button onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Applications', value: applications.length, icon: Briefcase, color: '#E91E8C' },
                    { label: 'Saved Jobs', value: savedJobs.length, icon: BookmarkCheck, color: '#7C3AED' },
                    { label: 'Interviews', value: applications.filter(a => a.status === 'interview_scheduled').length, icon: MessageSquare, color: '#059669' },
                    { label: 'Offers', value: applications.filter(a => a.status === 'offer_made').length, icon: Award, color: '#D97706' },
                  ].map(stat => (
                    <div key={stat.label} className="bg-white rounded-xl border border-[#E2E8F0] p-5 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: stat.color + '20' }}>
                        <stat.icon size={20} style={{ color: stat.color }} />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-[#0B1F3A]">{stat.value}</div>
                        <div className="text-xs text-[#4A5568]">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent applications */}
                {applications.length > 0 && (
                  <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
                    <h3 className="font-bold text-[#0B1F3A] mb-5">Recent Applications</h3>
                    <div className="space-y-3">
                      {applications.slice(0, 4).map(app => (
                        <div key={app.id} className="flex items-center justify-between py-3 border-b border-[#E2E8F0] last:border-0">
                          <div>
                            <Link href={`/jobs/${app.jobs?.slug}`} className="font-semibold text-[#0B1F3A] hover:text-[#E91E8C] transition-colors text-sm">
                              {app.jobs?.title}
                            </Link>
                            <p className="text-xs text-[#4A5568] mt-0.5">
                              Applied {new Date(app.applied_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </p>
                          </div>
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[app.status] || 'bg-gray-100 text-gray-700'}`}>
                            {statusLabels[app.status] || app.status}
                          </span>
                        </div>
                      ))}
                    </div>
                    {applications.length > 4 && (
                      <button onClick={() => setActiveTab('applications')} className="text-[#E91E8C] text-sm font-semibold mt-4 hover:underline">
                        View All {applications.length} Applications →
                      </button>
                    )}
                  </div>
                )}

                {/* Quick actions */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Link href="/jobs" className="bg-[#0B1F3A] text-white rounded-xl p-5 hover:bg-[#112850] transition-colors">
                    <Briefcase size={20} className="mb-2 text-[#E91E8C]" />
                    <h4 className="font-bold text-sm">Browse Jobs</h4>
                    <p className="text-white/60 text-xs mt-1">200+ active roles</p>
                  </Link>
                  <Link href="/salary-guide" className="bg-white border border-[#E2E8F0] rounded-xl p-5 hover:border-[#E91E8C] transition-colors">
                    <DollarSign size={20} className="mb-2 text-[#E91E8C]" />
                    <h4 className="font-bold text-[#0B1F3A] text-sm">Salary Guide</h4>
                    <p className="text-[#4A5568] text-xs mt-1">Check your market rate</p>
                  </Link>
                  <Link href="/services/career-roadmap" className="bg-white border border-[#E2E8F0] rounded-xl p-5 hover:border-[#E91E8C] transition-colors">
                    <MessageSquare size={20} className="mb-2 text-[#E91E8C]" />
                    <h4 className="font-bold text-[#0B1F3A] text-sm">Career Coaching</h4>
                    <p className="text-[#4A5568] text-xs mt-1">Talk to a recruiter</p>
                  </Link>
                </div>
              </div>
            )}

            {/* Applications */}
            {activeTab === 'applications' && (
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
                <h3 className="font-bold text-[#0B1F3A] text-lg mb-6">My Applications</h3>
                {applications.length === 0 ? (
                  <div className="text-center py-16">
                    <Briefcase size={48} className="text-[#E2E8F0] mx-auto mb-4" />
                    <h4 className="font-bold text-[#0B1F3A] mb-2">No applications yet</h4>
                    <p className="text-[#4A5568] mb-6">Start browsing and apply to civil engineering roles.</p>
                    <Link href="/jobs" className="btn-pink">Browse Jobs</Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {applications.map(app => (
                      <div key={app.id} className="border border-[#E2E8F0] rounded-xl p-5 hover:border-[#E91E8C] transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <Link href={`/jobs/${app.jobs?.slug}`} className="font-bold text-[#0B1F3A] hover:text-[#E91E8C] transition-colors block truncate">
                              {app.jobs?.title}
                            </Link>
                            <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-[#4A5568]">
                              <span className="flex items-center gap-1">
                                <MapPin size={11} />
                                {app.jobs?.is_remote ? 'Remote' : `${app.jobs?.location_city}, ${app.jobs?.location_state}`}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock size={11} />
                                Applied {new Date(app.applied_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full shrink-0 ${statusColors[app.status] || 'bg-gray-100'}`}>
                            {statusLabels[app.status] || app.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Saved Jobs */}
            {activeTab === 'saved' && (
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
                <h3 className="font-bold text-[#0B1F3A] text-lg mb-6">Saved Jobs</h3>
                {savedJobs.length === 0 ? (
                  <div className="text-center py-16">
                    <BookmarkCheck size={48} className="text-[#E2E8F0] mx-auto mb-4" />
                    <h4 className="font-bold text-[#0B1F3A] mb-2">No saved jobs yet</h4>
                    <p className="text-[#4A5568] mb-6">Save jobs you&apos;re interested in to revisit later.</p>
                    <Link href="/jobs" className="btn-pink">Browse Jobs</Link>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {savedJobs.map((item) => (
                      <Link key={item.id} href={`/jobs/${item.jobs?.slug}`}
                        className="border border-[#E2E8F0] rounded-xl p-5 hover:border-[#E91E8C] hover:shadow-md transition-all group">
                        <h4 className="font-bold text-[#0B1F3A] text-sm group-hover:text-[#E91E8C] transition-colors leading-snug mb-2">
                          {item.jobs?.title}
                        </h4>
                        <div className="flex gap-3 text-xs text-[#4A5568]">
                          <span className="flex items-center gap-1"><MapPin size={11} />{item.jobs?.location_city}, {item.jobs?.location_state}</span>
                          {item.jobs?.salary_min && (
                            <span className="flex items-center gap-1"><DollarSign size={11} />${Math.round(item.jobs.salary_min / 1000)}k–${Math.round(item.jobs.salary_max / 1000)}k</span>
                          )}
                        </div>
                        <span className="text-[#E91E8C] text-xs font-semibold mt-3 block">View Role →</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Alerts, Messages, Profile — placeholder */}
            {(activeTab === 'alerts' || activeTab === 'messages' || activeTab === 'profile') && (
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-12 text-center">
                <div className="text-5xl mb-4">🚧</div>
                <h3 className="font-bold text-[#0B1F3A] text-xl mb-2">Coming Soon</h3>
                <p className="text-[#4A5568]">This section is being built. Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
