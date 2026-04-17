'use client';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import Link from 'next/link';

export default function CandidateSettingsPage() {
  const [notifications, setNotifications] = useState({ job_alerts: true, application_updates: true, messages: true, newsletter: false });
  const [notifSaved, setNotifSaved] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [showDelete, setShowDelete] = useState(false);

  function saveNotifications() {
    setNotifSaved(true);
    setTimeout(() => setNotifSaved(false), 3000);
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <div className="bg-[#1A3A8F] py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/dashboard/candidate" className="text-white/60 hover:text-white text-sm mb-2 inline-block">← Dashboard</Link>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Settings</h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">

        {/* Password */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
          <h3 className="font-bold text-[#1A3A8F] mb-2">Change Password</h3>
          <p className="text-sm text-[#4A5568] mb-4">To change your password, use the password reset flow. We will send a reset link to your registered email address.</p>
          <Link href="/auth/forgot-password" className="inline-block bg-[#D4AF37] text-white font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-[#B8960C] transition-colors">
            Send Password Reset Email
          </Link>
        </div>

        {/* Notification preferences */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
          <h3 className="font-bold text-[#1A3A8F] mb-4">Notification Preferences</h3>
          {notifSaved && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 mb-4 text-sm">Preferences saved.</div>}
          <div className="space-y-4">
            {[
              { key: 'job_alerts', label: 'Job Alerts', desc: 'New jobs matching your saved alerts' },
              { key: 'application_updates', label: 'Application Updates', desc: 'Status changes on your applications' },
              { key: 'messages', label: 'New Messages', desc: 'Notifications when a recruiter messages you' },
              { key: 'newsletter', label: 'Newsletter', desc: 'Industry insights and hiring tips' },
            ].map(({ key, label, desc }) => (
              <label key={key} className="flex items-center justify-between gap-4 cursor-pointer">
                <div>
                  <p className="font-semibold text-[#1A3A8F] text-sm">{label}</p>
                  <p className="text-xs text-[#4A5568]">{desc}</p>
                </div>
                <div className="relative shrink-0">
                  <input type="checkbox" className="sr-only peer"
                    checked={notifications[key as keyof typeof notifications]}
                    onChange={e => setNotifications(prev => ({...prev, [key]: e.target.checked}))} />
                  <div className="w-10 h-6 bg-[#E2E8F0] rounded-full peer-checked:bg-[#D4AF37] transition-colors cursor-pointer" />
                  <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4 pointer-events-none" />
                </div>
              </label>
            ))}
          </div>
          <button onClick={saveNotifications}
            className="mt-5 bg-[#D4AF37] text-white font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-[#B8960C] transition-colors">
            Save Preferences
          </button>
        </div>

        {/* Danger zone */}
        <div className="bg-white rounded-2xl border border-red-200 p-6">
          <h3 className="font-bold text-red-700 mb-2">Danger Zone</h3>
          <p className="text-sm text-[#4A5568] mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
          {!showDelete ? (
            <button onClick={() => setShowDelete(true)} className="text-sm font-semibold text-red-600 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors">
              Delete Account
            </button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm font-semibold text-[#1A3A8F]">Type <strong>DELETE</strong> to confirm:</p>
              <input type="text" value={deleteConfirm} onChange={e => setDeleteConfirm(e.target.value)}
                className="w-full border border-red-200 rounded-lg px-4 py-2.5 text-sm text-[#1A3A8F] focus:outline-none focus:border-red-500 transition-colors" />
              <div className="flex gap-3">
                <button disabled={deleteConfirm !== 'DELETE'}
                  className="bg-red-600 text-white font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-red-700 transition-colors disabled:opacity-40">
                  Confirm Delete
                </button>
                <button onClick={() => { setShowDelete(false); setDeleteConfirm(''); }}
                  className="px-6 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#1A3A8F] hover:border-[#1A3A8F] transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
