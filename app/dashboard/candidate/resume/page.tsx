'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';
import { FileText, Upload, Trash2, Download } from 'lucide-react';

export default function CandidateResumePage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [resume, setResume] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      const { data: userData } = await insforge.auth.getCurrentUser();
      if (!userData?.user) { window.location.href = '/login'; return; }
      setUserId(userData.user.id);
      setUserEmail(userData.user.email || '');
      const profile = userData.user.profile as Record<string, unknown> | null;
      setUserName((profile?.name as string) || userData.user.email?.split('@')[0] || '');
      const { data } = await insforge.database
        .from('candidate_resumes')
        .select('*')
        .eq('user_id', userData.user.id)
        .order('uploaded_at', { ascending: false })
        .limit(1)
        .single();
      setResume(data);
      setLoading(false);
    }
    load();
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !userId) return;
    if (file.size > 5 * 1024 * 1024) { setError('File must be under 5MB.'); return; }
    const allowed = ['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowed.includes(file.type)) { setError('Only PDF or Word documents are accepted.'); return; }
    setUploading(true); setError('');

    const path = `resumes/${userId}/${Date.now()}_${file.name}`;
    const { data: uploadData, error: uploadErr } = await insforge.storage
      .from('candidate-files')
      .upload(path, file);

    if (uploadErr || !uploadData) {
      setError('Upload failed. Please try again.');
      setUploading(false);
      return;
    }

    const publicUrl = insforge.storage.from('candidate-files').getPublicUrl(path);

    const { data: newResume } = await insforge.database
      .from('candidate_resumes')
      .insert({ user_id: userId, file_name: file.name, file_url: publicUrl, file_size: file.size })
      .select()
      .single();

    setResume(newResume);
    setUploading(false);

    // Notify HR of resume upload (fire-and-forget)
    fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'resume',
        data: { name: userName, email: userEmail, fileName: file.name, fileUrl: publicUrl },
      }),
    }).catch(() => {});
  }

  async function handleDelete() {
    if (!resume) return;
    await insforge.database.from('candidate_resumes').delete().eq('id', resume.id);
    setResume(null);
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes/1024).toFixed(1)} KB`;
    return `${(bytes/(1024*1024)).toFixed(1)} MB`;
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <div className="bg-[#1A3A8F] py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/dashboard/candidate" className="text-white/60 hover:text-white text-sm mb-2 inline-block">← Dashboard</Link>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>My Resume</h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-10">
        {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm mb-6">{error}</div>}
        {loading ? (
          <div className="h-40 bg-white rounded-xl border border-[#E2E8F0] animate-pulse" />
        ) : resume ? (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center shrink-0">
                <FileText size={24} className="text-[#D4AF37]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[#1A3A8F] truncate">{resume.file_name}</p>
                <p className="text-sm text-[#4A5568]">{formatSize(resume.file_size)} · Uploaded {new Date(resume.uploaded_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <a href={resume.file_url} target="_blank" rel="noreferrer"
                  className="p-2 rounded-lg border border-[#E2E8F0] text-[#1A3A8F] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">
                  <Download size={16} />
                </a>
                <button onClick={handleDelete} className="p-2 rounded-lg border border-[#E2E8F0] text-[#4A5568] hover:border-red-300 hover:text-red-600 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E2E8F0]">
              <p className="text-sm text-[#4A5568] mb-3">Want to update your resume? Upload a new version below.</p>
              <label className="cursor-pointer inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37] hover:underline">
                <Upload size={14} /> Upload New Version
                <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleUpload} disabled={uploading} />
              </label>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center">
            <FileText size={48} className="text-[#D4AF37]/30 mx-auto mb-4" />
            <h3 className="font-bold text-[#1A3A8F] text-xl mb-2">No Resume Uploaded</h3>
            <p className="text-[#4A5568] mb-8 text-sm">Upload your resume (PDF or Word, max 5MB) so recruiters can review your background.</p>
            <label className={`btn-pink cursor-pointer inline-flex items-center gap-2 ${uploading ? 'opacity-60 pointer-events-none' : ''}`}>
              <Upload size={16} /> {uploading ? 'Uploading...' : 'Upload Resume'}
              <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleUpload} disabled={uploading} />
            </label>
          </div>
        )}
        <div className="mt-8 bg-white rounded-2xl border border-[#E2E8F0] p-6">
          <h3 className="font-bold text-[#1A3A8F] mb-3">Tips for a Strong Resume</h3>
          <ul className="space-y-2 text-sm text-[#4A5568]">
            <li className="flex gap-2"><span className="text-[#D4AF37] font-bold">·</span> Use a clean, single-column format for ATS compatibility</li>
            <li className="flex gap-2"><span className="text-[#D4AF37] font-bold">·</span> Quantify achievements with numbers and percentages</li>
            <li className="flex gap-2"><span className="text-[#D4AF37] font-bold">·</span> Tailor keywords to the job descriptions you are targeting</li>
            <li className="flex gap-2"><span className="text-[#D4AF37] font-bold">·</span> Keep it to 1–2 pages unless you have 10+ years of experience</li>
            <li className="flex gap-2"><span className="text-[#D4AF37] font-bold">·</span> <Link href="/services/resume-optimization" className="text-[#D4AF37] hover:underline">Get a professional resume review from our team →</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
