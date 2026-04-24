'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { User, Phone, Mail, Briefcase, MapPin, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { insforge } from '@/lib/insforge';

function ApplyFormContent() {
  const searchParams = useSearchParams();
  const jobTitle    = searchParams.get('job')   || 'General Application';
  const jobLocation = searchParams.get('loc')   || 'Remote';
  const prefillEmail= searchParams.get('email') || '';

  const [form, setForm] = useState({ name: '', email: prefillEmail, phone: '' });
  const [file,       setFile]       = useState<File | null>(null);
  const [errors,     setErrors]     = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [globalErr,  setGlobalErr]  = useState('');

  function validate() {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2)               e.name  = 'Full name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email is required.';
    if (form.phone.trim().length < 7)              e.phone = 'Valid phone number is required.';
    if (!file)                                     e.file  = 'Please upload your resume (PDF).';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalErr('');
    if (!validate()) return;
    setSubmitting(true);

    try {
      /* 1. Upload resume to insforge storage */
      let resumeUrl = '';
      if (file) {
        const path = `resumes/${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
        const { data: upData, error: upErr } = await insforge.storage
          .from('candidate-files')
          .upload(path, file);

        if (upErr || !upData) {
          console.error('[apply] Upload error:', upErr);
          setGlobalErr('Resume upload failed. Please try again.');
          setSubmitting(false);
          return;
        }
        resumeUrl = insforge.storage.from('candidate-files').getPublicUrl(path) as string;
      }

      /* 2. Save to DB */
      await insforge.database.from('contact_submissions').insert({
        name:    form.name,
        email:   form.email,
        phone:   form.phone,
        subject: `Job Application: ${jobTitle}`,
        message: `Position: ${jobTitle}\nLocation: ${jobLocation}\nPhone: ${form.phone}${resumeUrl ? `\nResume: ${resumeUrl}` : ''}`,
        company: null,
      });

      /* 3. Email HR */
      const res = await fetch('/api/notify', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'application',
          data: {
            candidateName:  form.name,
            candidateEmail: form.email,
            candidatePhone: form.phone,
            jobTitle,
            discipline:     jobLocation,
            location:       jobLocation,
            resumeUrl,
          },
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        console.error('[apply] Notify error:', body);
      }

      setSubmitted(true);
    } catch (err) {
      console.error('[apply] Submit error:', err);
      setGlobalErr('Something went wrong. Please try again or email hr@ccpromoters.com directly.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-14 px-8">
        <div className="w-20 h-20 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={36} className="text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-[#1A3A8F] mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Application Submitted!
        </h2>
        <p className="text-[#4A5568] max-w-sm mx-auto mb-6">
          Thank you, <strong>{form.name.split(' ')[0]}</strong>. Our team will review your application and be in touch within 3–5 business days.
        </p>
        <div className="inline-flex items-center gap-2 bg-[#1A3A8F]/10 text-[#1A3A8F] text-sm font-semibold px-5 py-2 rounded-full border border-[#1A3A8F]/20 mb-8">
          <Briefcase size={14} /> Applied for: {jobTitle}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/jobs" className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#B8960C] transition-colors text-sm">
            Browse More Jobs →
          </Link>
          <Link href="/" className="inline-flex items-center justify-center gap-2 border border-[#E2E8F0] text-[#4A5568] font-medium px-6 py-3 rounded-lg hover:border-[#1A3A8F] transition-colors text-sm">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 mt-10 bg-white rounded-3xl shadow-sm border border-[#E2E8F0]">
      {/* Header */}
      <div className="mb-8 border-b border-[#E2E8F0] pb-6">
        <h1 className="text-3xl font-bold text-[#1A3A8F]" style={{ fontFamily: 'Manrope, sans-serif' }}>Apply Now</h1>
        <div className="mt-4 flex flex-wrap gap-3">
          <span className="flex items-center gap-2 bg-[#1A3A8F]/10 text-[#1A3A8F] px-4 py-1.5 rounded-lg text-sm font-semibold">
            <Briefcase size={14} /> {jobTitle}
          </span>
          <span className="flex items-center gap-2 bg-[#F7F9FC] text-[#4A5568] px-4 py-1.5 rounded-lg text-sm font-semibold border border-[#E2E8F0]">
            <MapPin size={14} /> {jobLocation}
          </span>
        </div>
      </div>

      {globalErr && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm mb-5">
          {globalErr}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-[#1A3A8F] mb-1.5">Full Name <span className="text-[#D4AF37]">*</span></label>
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-[#8891a8]" size={16} />
            <input type="text" placeholder="Your full name"
              className={`w-full border rounded-xl pl-10 p-3.5 text-sm outline-none transition-all ${errors.name ? 'border-red-400 bg-red-50' : 'border-[#E2E8F0] focus:border-[#D4AF37]'}`}
              value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-[#1A3A8F] mb-1.5">Email <span className="text-[#D4AF37]">*</span></label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-[#8891a8]" size={16} />
              <input type="email" placeholder="you@example.com"
                className={`w-full border rounded-xl pl-10 p-3.5 text-sm outline-none transition-all ${errors.email ? 'border-red-400 bg-red-50' : 'border-[#E2E8F0] focus:border-[#D4AF37]'}`}
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-[#1A3A8F] mb-1.5">Phone <span className="text-[#D4AF37]">*</span></label>
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 text-[#8891a8]" size={16} />
              <input type="tel" placeholder="+1 (555) 000-0000"
                className={`w-full border rounded-xl pl-10 p-3.5 text-sm outline-none transition-all ${errors.phone ? 'border-red-400 bg-red-50' : 'border-[#E2E8F0] focus:border-[#D4AF37]'}`}
                value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* Resume upload */}
        <div>
          <label className="block text-sm font-semibold text-[#1A3A8F] mb-1.5">Resume / CV (PDF) <span className="text-[#D4AF37]">*</span></label>
          <label className={`flex flex-col items-center cursor-pointer p-6 border-2 border-dashed rounded-2xl transition-colors
            ${file ? 'border-green-400 bg-green-50' : errors.file ? 'border-red-300 bg-red-50' : 'border-[#E2E8F0] bg-[#F7F9FC] hover:border-[#D4AF37]'}`}>
            {file
              ? <CheckCircle className="text-green-500 mb-2" size={28} />
              : <FileText className="text-[#D4AF37] mb-2" size={28} />
            }
            <span className="text-sm font-semibold text-[#1A3A8F]">
              {file ? file.name : 'Click to upload PDF resume'}
            </span>
            <span className="text-xs text-[#8891a8] mt-1">{file ? 'Click to change' : 'PDF only — max 5 MB'}</span>
            <input type="file" accept=".pdf" className="hidden"
              onChange={e => {
                const f = e.target.files?.[0] || null;
                if (f && f.size > 5 * 1024 * 1024) {
                  setErrors(p => ({ ...p, file: 'File must be under 5 MB.' }));
                  return;
                }
                setFile(f);
                setErrors(p => { const n = { ...p }; delete n.file; return n; });
              }} />
          </label>
          {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file}</p>}
        </div>

        <button disabled={submitting} type="submit"
          className="w-full bg-[#D4AF37] hover:bg-[#B8960C] text-white p-4 rounded-xl font-bold text-base shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          {submitting ? <><Loader2 size={18} className="animate-spin" /> Submitting…</> : 'Submit Application →'}
        </button>

        <p className="text-xs text-center text-[#8891a8]">
          Sent directly to <span className="text-[#D4AF37] font-medium">hr@ccpromoters.com</span> — we reply within 3–5 business days.
        </p>
      </form>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/jobs" className="inline-flex items-center gap-1.5 text-sm text-[#4A5568] hover:text-[#1A3A8F] mb-6 transition-colors">
          ← Back to jobs
        </Link>
        <div className="inline-flex items-center gap-2 bg-[#1A3A8F]/10 border border-[#1A3A8F]/20 text-[#1A3A8F] text-xs font-semibold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" /> Now Hiring
        </div>
        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <Loader2 size={28} className="animate-spin text-[#1A3A8F]" />
          </div>
        }>
          <ApplyFormContent />
        </Suspense>
        <p className="text-center text-xs text-[#8891a8] mt-6">
          Have an account?{' '}
          <Link href="/login" className="text-[#D4AF37] font-semibold hover:underline">Sign in to apply with your profile →</Link>
        </p>
      </div>
    </div>
  );
}
