'use client';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminSettingsPage() {
  const [maintenance, setMaintenance] = useState(false);
  const [saved, setSaved] = useState(false);

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-[#0D0D0D] py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/dashboard/admin" className="text-white/60 hover:text-white text-sm mb-2 inline-block">← Admin</Link>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Admin Settings</h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        {saved && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 text-sm">Settings saved.</div>}

        <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 space-y-4">
          <h3 className="font-bold text-[#0D0D0D]">Site Configuration</h3>
          <label className="flex items-center justify-between gap-4 cursor-pointer">
            <div>
              <p className="font-semibold text-[#0D0D0D] text-sm">Maintenance Mode</p>
              <p className="text-xs text-[#6B6B6B]">Displays a maintenance page to visitors while keeping the admin accessible</p>
            </div>
            <div className="relative shrink-0">
              <input type="checkbox" className="sr-only peer" checked={maintenance} onChange={e => setMaintenance(e.target.checked)} />
              <div className="w-10 h-6 bg-[#E5E5E5] rounded-full peer-checked:bg-[#CC1016] transition-colors cursor-pointer" />
              <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
            </div>
          </label>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6">
          <h3 className="font-bold text-[#0D0D0D] mb-4">Quick Links</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: 'View Live Site', href: '/' },
              { label: 'Job Listings', href: '/jobs' },
              { label: 'Blog / Insights', href: '/insights' },
              { label: 'Contact Page', href: '/contact' },
            ].map(({ label, href }) => (
              <a key={href} href={href} target="_blank" rel="noreferrer"
                className="flex items-center justify-between border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm text-[#0D0D0D] hover:border-[#CC1016] hover:text-[#CC1016] transition-colors">
                {label} <span>→</span>
              </a>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6">
          <h3 className="font-bold text-[#0D0D0D] mb-2">System Info</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex gap-4"><dt className="text-[#6B6B6B] w-32 shrink-0">Framework</dt><dd className="text-[#0D0D0D] font-medium">Next.js 14 App Router</dd></div>
            <div className="flex gap-4"><dt className="text-[#6B6B6B] w-32 shrink-0">Backend</dt><dd className="text-[#0D0D0D] font-medium">InsForge BaaS</dd></div>
            <div className="flex gap-4"><dt className="text-[#6B6B6B] w-32 shrink-0">Styling</dt><dd className="text-[#0D0D0D] font-medium">Tailwind CSS 3.4</dd></div>
          </dl>
        </div>

        <button onClick={save} className="bg-[#CC1016] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#A80D12] transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  );
}
