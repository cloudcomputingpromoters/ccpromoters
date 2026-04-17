'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { User, Phone, Mail, Briefcase, MapPin, FileText } from 'lucide-react';

function ApplyFormContent() {
  const searchParams = useSearchParams();
  
  // URL se details nikalne ke liye (e.g., ?job=Frontend+Developer&loc=Hyderabad)
  const jobTitle = searchParams.get('job') || 'General Application';
  const jobLocation = searchParams.get('loc') || 'Remote';

  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = 'Full name is required';
    if (!form.email.includes('@')) e.email = 'Valid email is required';
    if (form.phone.trim().length < 7) e.phone = 'Valid phone number is required';
    if (!file) e.file = 'Please upload your resume';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("Candidate_Name", form.name);
      formData.append("Candidate_Email", form.email);
      formData.append("Candidate_Phone", form.phone);
      formData.append("Job_Applied_For", jobTitle);
      formData.append("Job_Location", jobLocation);
      if (file) formData.append("Resume_File", file);

      // Aapka Formspree ID
      const response = await fetch("https://formspree.io/f/mpqkpyvd", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) setSubmitted(true);
      else alert("Submission failed, please try again.");
      
    } catch (err) {
      alert("Connection error.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center p-10 bg-white rounded-2xl shadow-xl border-t-4 border-green-500">
        <h2 className="text-2xl font-bold text-green-600">Application Sent!</h2>
        <p className="mt-2 text-gray-600">Thank you <b>{form.name}</b>. We received your resume for <b>{jobTitle}</b>.</p>
        <Link href="/" className="mt-6 inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 mt-10 bg-white rounded-3xl shadow-2xl border border-gray-100">
      <div className="mb-8 border-b pb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">Apply Now</h1>
        <div className="mt-4 flex flex-wrap gap-3">
          <span className="flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-1.5 rounded-lg text-sm font-bold">
            <Briefcase size={16} /> {jobTitle}
          </span>
          <span className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-1.5 rounded-lg text-sm font-bold">
            <MapPin size={16} /> {jobLocation}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input type="text" placeholder="Enter your full name" className="w-full border-2 border-gray-100 pl-11 p-3.5 rounded-xl focus:border-blue-500 focus:ring-0 outline-none transition-all" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          </div>
          {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input type="email" placeholder="name@email.com" className="w-full border-2 border-gray-100 pl-11 p-3.5 rounded-xl focus:border-blue-500 outline-none" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input type="text" placeholder="Phone number" className="w-full border-2 border-gray-100 pl-11 p-3.5 rounded-xl focus:border-blue-500 outline-none" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
            </div>
            {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
          </div>
        </div>

        <div className="p-6 border-2 border-dashed border-blue-200 rounded-2xl bg-blue-50/50 hover:bg-blue-50 transition-colors">
          <label className="flex flex-col items-center cursor-pointer">
            <FileText className="text-blue-500 mb-2" size={32} />
            <span className="text-sm font-bold text-gray-700">Upload Resume (PDF)</span>
            <input type="file" accept=".pdf" className="hidden" onChange={e => setFile(e.target.files?.[0] || null)} />
            <span className="mt-2 text-xs text-gray-500">{file ? `Selected: ${file.name}` : "No file chosen"}</span>
          </label>
          {errors.file && <p className="text-red-500 text-center text-xs mt-2 font-medium">{errors.file}</p>}
        </div>

        <button disabled={submitting} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl font-black text-lg shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:bg-gray-400">
          {submitting ? 'PROCESSING...' : 'SUBMIT APPLICATION'}
        </button>
      </form>
    </div>
  );
}

// Next.js requirement for searchParams
export default function ApplyForm() {
  return (
    <Suspense fallback={<div className="text-center mt-20">Loading Form...</div>}>
      <ApplyFormContent />
    </Suspense>
  );
}