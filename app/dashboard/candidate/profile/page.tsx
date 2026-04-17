'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';
import { User, MapPin, Phone, Mail, Briefcase, Edit3 } from 'lucide-react';

export default function CandidateProfilePage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: userData } = await insforge.auth.getCurrentUser();
      if (!userData?.user) { window.location.href = '/login'; return; }
      const { data } = await insforge.database
        .from('candidate_profiles')
        .select('*')
        .eq('user_id', userData.user.id)
        .single();
      setProfile(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <div className="bg-[#1A3A8F] py-10 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <Link href="/dashboard/candidate" className="text-white/60 hover:text-white text-sm mb-2 inline-block">← Dashboard</Link>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>My Profile</h1>
          </div>
          <Link href="/dashboard/candidate/profile/edit" className="flex items-center gap-2 bg-[#D4AF37] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#B8960C] transition-colors">
            <Edit3 size={16} /> Edit Profile
          </Link>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-10">
        {loading ? (
          <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-32 bg-white rounded-xl border border-[#E2E8F0] animate-pulse" />)}</div>
        ) : !profile ? (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-16 text-center">
            <User size={48} className="text-[#D4AF37]/30 mx-auto mb-4" />
            <h3 className="font-bold text-[#1A3A8F] text-xl mb-2">Profile Not Set Up</h3>
            <p className="text-[#4A5568] mb-6">Complete your profile to get matched with the right opportunities.</p>
            <Link href="/dashboard/candidate/profile/edit" className="btn-pink">Create Profile</Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-full bg-[#1A3A8F] flex items-center justify-center text-white text-xl font-bold shrink-0">
                  {profile.first_name?.[0]}{profile.last_name?.[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-[#1A3A8F]">{profile.first_name} {profile.last_name}</h2>
                  {profile.current_title && <p className="text-[#4A5568]">{profile.current_title}</p>}
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-[#4A5568]">
                    {profile.email && <span className="flex items-center gap-1"><Mail size={13} className="text-[#D4AF37]" />{profile.email}</span>}
                    {profile.phone && <span className="flex items-center gap-1"><Phone size={13} className="text-[#D4AF37]" />{profile.phone}</span>}
                    {(profile.location_city || profile.location_state) && (
                      <span className="flex items-center gap-1"><MapPin size={13} className="text-[#D4AF37]" />{[profile.location_city, profile.location_state].filter(Boolean).join(', ')}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {profile.bio && (
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
                <h3 className="font-bold text-[#1A3A8F] mb-3">About</h3>
                <p className="text-[#4A5568] leading-relaxed">{profile.bio}</p>
              </div>
            )}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
              <h3 className="font-bold text-[#1A3A8F] mb-4 flex items-center gap-2"><Briefcase size={16} className="text-[#D4AF37]" />Career Details</h3>
              <dl className="grid sm:grid-cols-2 gap-4 text-sm">
                {profile.discipline && <div><dt className="text-[#4A5568] font-medium mb-0.5">Discipline</dt><dd className="text-[#1A3A8F] font-semibold capitalize">{profile.discipline.replace(/-/g,' ')}</dd></div>}
                {profile.years_experience != null && <div><dt className="text-[#4A5568] font-medium mb-0.5">Experience</dt><dd className="text-[#1A3A8F] font-semibold">{profile.years_experience} year{profile.years_experience !== 1 ? 's' : ''}</dd></div>}
                {profile.employment_type_preference && <div><dt className="text-[#4A5568] font-medium mb-0.5">Preferred Type</dt><dd className="text-[#1A3A8F] font-semibold capitalize">{profile.employment_type_preference.replace(/_/g,' ')}</dd></div>}
                {profile.salary_expectation_min && profile.salary_expectation_max && <div><dt className="text-[#4A5568] font-medium mb-0.5">Salary Expectation</dt><dd className="text-[#1A3A8F] font-semibold">${Math.round(profile.salary_expectation_min/1000)}k – ${Math.round(profile.salary_expectation_max/1000)}k</dd></div>}
                {profile.open_to_remote != null && <div><dt className="text-[#4A5568] font-medium mb-0.5">Remote</dt><dd className="text-[#1A3A8F] font-semibold">{profile.open_to_remote ? 'Open to remote' : 'On-site preferred'}</dd></div>}
              </dl>
            </div>
            {profile.skills?.length > 0 && (
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
                <h3 className="font-bold text-[#1A3A8F] mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill: string, i: number) => (
                    <span key={i} className="bg-[#F7F9FC] border border-[#E2E8F0] text-[#1A3A8F] text-sm px-3 py-1 rounded-full">{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
