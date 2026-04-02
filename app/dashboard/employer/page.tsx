'use client';

import { useState, useEffect } from 'react';
import { insforge } from '@/lib/insforge';
import Link from 'next/link';
import { Briefcase, Eye, PlusCircle, LogOut, Settings, BarChart2, Star } from 'lucide-react';

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  draft: 'bg-gray-100 text-gray-600',
  paused: 'bg-yellow-100 text-yellow-700',
  closed: 'bg-red-100 text-red-700',
  expired: 'bg-red-50 text-red-500',
};

const navItems = [
  { id: 'overview', label: 'Overview', icon: BarChart2 },
  { id: 'listings', label: 'My Listings', icon: Briefcase },
  { id: 'post', label: 'Post a Job', icon: PlusCircle },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function EmployerDashboard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profile, setProfile] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [jobs, setJobs] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [employer, setEmployer] = useState<any>(null);
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

      const { data: emp } = await insforge.database
        .from('employers')
        .select('id, company_name, is_verified')
        .eq('user_id', userData.user.id)
        .maybeSingle();
      setEmployer(emp);

      if (emp) {
        const { data: jobList } = await insforge.database
          .from('jobs')
          .select('id, title, slug, discipline, status, view_count, is_featured, posted_at, expires_at, employment_type')
          .eq('employer_id', emp.id)
          .order('created_at', { ascending: false });
        setJobs(jobList || []);
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

  const companyName = profile?.company_name || employer?.company_name || 'Your Company';
  const activeJobs = jobs.filter(j => j.status === 'active');

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <div className="bg-[#0B1F3A] text-white py-6 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>
              <span className="text-[#E91E8C]">{companyName}</span> — Employer Dashboard
            </h1>
            <p className="text-white/60 text-sm mt-0.5">{user?.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/jobs" className="text-white/70 hover:text-white text-sm">View Job Board</Link>
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
                <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-red-500 hover:bg-red-50">
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Active Jobs', value: activeJobs.length, icon: Briefcase, color: '#E91E8C' },
                    { label: 'Total Listings', value: jobs.length, icon: BarChart2, color: '#7C3AED' },
                    { label: 'Total Views', value: jobs.reduce((sum, j) => sum + (j.view_count || 0), 0), icon: Eye, color: '#0891B2' },
                    { label: 'Featured Jobs', value: jobs.filter(j => j.is_featured).length, icon: Star, color: '#D97706' },
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

                {/* Quick post CTA */}
                <div className="bg-[#0B1F3A] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-white font-bold text-xl mb-1">Need to hire a civil engineer?</h3>
                    <p className="text-white/70">Post a job and receive pre-screened, PE-verified candidates within 48 hours.</p>
                  </div>
                  <button onClick={() => setActiveTab('post')}
                    className="bg-[#E91E8C] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-[#C0176E] transition-colors whitespace-nowrap flex items-center gap-2">
                    <PlusCircle size={18} /> Post a Job
                  </button>
                </div>

                {/* Recent listings */}
                {jobs.length > 0 && (
                  <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="font-bold text-[#0B1F3A]">Recent Listings</h3>
                      <button onClick={() => setActiveTab('listings')} className="text-[#E91E8C] text-sm font-semibold hover:underline">View All</button>
                    </div>
                    <div className="space-y-3">
                      {jobs.slice(0, 4).map(job => (
                        <div key={job.id} className="flex items-center justify-between py-3 border-b border-[#E2E8F0] last:border-0">
                          <div>
                            <Link href={`/jobs/${job.slug}`} className="font-semibold text-[#0B1F3A] hover:text-[#E91E8C] text-sm transition-colors">
                              {job.title}
                            </Link>
                            <div className="flex items-center gap-2 mt-0.5 text-xs text-[#4A5568]">
                              <span>{job.discipline}</span>
                              <span>·</span>
                              <span className="flex items-center gap-1"><Eye size={11} /> {job.view_count || 0} views</span>
                            </div>
                          </div>
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[job.status] || 'bg-gray-100'}`}>
                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'listings' && (
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-[#0B1F3A] text-lg">My Job Listings</h3>
                  <button onClick={() => setActiveTab('post')}
                    className="flex items-center gap-2 bg-[#E91E8C] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#C0176E] transition-colors">
                    <PlusCircle size={15} /> Post New Job
                  </button>
                </div>
                {jobs.length === 0 ? (
                  <div className="text-center py-16">
                    <Briefcase size={48} className="text-[#E2E8F0] mx-auto mb-4" />
                    <h4 className="font-bold text-[#0B1F3A] mb-2">No listings yet</h4>
                    <p className="text-[#4A5568] mb-6">Post your first civil engineering job today.</p>
                    <button onClick={() => setActiveTab('post')} className="btn-pink">Post a Job</button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#E2E8F0]">
                          <th className="text-left py-3 font-semibold text-[#0B1F3A]">Job Title</th>
                          <th className="text-left py-3 font-semibold text-[#0B1F3A] hidden md:table-cell">Discipline</th>
                          <th className="text-left py-3 font-semibold text-[#0B1F3A]">Status</th>
                          <th className="text-left py-3 font-semibold text-[#0B1F3A] hidden md:table-cell">Views</th>
                          <th className="text-left py-3 font-semibold text-[#0B1F3A]">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jobs.map(job => (
                          <tr key={job.id} className="border-b border-[#E2E8F0] last:border-0">
                            <td className="py-3">
                              <Link href={`/jobs/${job.slug}`} className="font-medium text-[#0B1F3A] hover:text-[#E91E8C] transition-colors">
                                {job.title}
                              </Link>
                              {job.is_featured && <span className="ml-2 text-xs text-yellow-600">⭐</span>}
                            </td>
                            <td className="py-3 text-[#4A5568] hidden md:table-cell">{job.discipline}</td>
                            <td className="py-3">
                              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[job.status] || 'bg-gray-100'}`}>
                                {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-3 text-[#4A5568] hidden md:table-cell">{job.view_count || 0}</td>
                            <td className="py-3">
                              <Link href={`/jobs/${job.slug}`} className="text-[#E91E8C] hover:underline text-xs font-medium">View</Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'post' && (
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-8">
                <h3 className="font-bold text-[#0B1F3A] text-xl mb-2">Post a New Job</h3>
                <p className="text-[#4A5568] mb-8">Fill in the details and our team will review and publish your listing within 2-4 hours.</p>
                <div className="bg-[#FFF0F7] border border-[#E91E8C]/20 rounded-xl p-6 text-center">
                  <PlusCircle size={40} className="text-[#E91E8C] mx-auto mb-3" />
                  <h4 className="font-bold text-[#0B1F3A] text-lg mb-2">Full Job Posting Form</h4>
                  <p className="text-[#4A5568] mb-4">Contact our team directly to post your role — we&apos;ll handle the rest.</p>
                  <Link href="/contact"
                    className="inline-block bg-[#E91E8C] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#C0176E] transition-colors">
                    Contact a Recruiter →
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-12 text-center">
                <Settings size={48} className="text-[#E2E8F0] mx-auto mb-4" />
                <h3 className="font-bold text-[#0B1F3A] text-xl mb-2">Account Settings</h3>
                <p className="text-[#4A5568]">Profile settings and billing coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
