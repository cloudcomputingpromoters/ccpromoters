'use client';

import { useState } from 'react';
import { Mail, Send, CheckCircle, Building2, Users, Briefcase, Link as LinkIcon } from 'lucide-react';
import { insforge } from '@/lib/insforge';
import Link from 'next/link';

const subjects = [
  { value: 'Hiring Enquiry',      label: 'I want to hire civil engineers'       },
  { value: 'Job Search',          label: 'I am looking for a new role'           },
  { value: 'Service Enquiry',     label: 'I have a question about your services' },
  { value: 'Salary Benchmarking', label: 'I need salary benchmarking data'       },
  { value: 'Partnership',         label: 'Partnership or media enquiry'           },
  { value: 'Other',               label: 'Something else'                         },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      setError('Please fill in Name, Email, Subject and Message.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await insforge.database.from('contact_submissions').insert({
        name: form.name, email: form.email,
        phone: form.phone || null, company: form.company || null,
        subject: form.subject, message: form.message,
      });
      // Email notification to hr@ccpromoters.com
      fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact', data: { ...form } }),
      }).catch(() => {});
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or email us directly at hr@ccpromoters.com');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0D0D0D] py-20 px-4 text-center">
        <span className="inline-block bg-[#CC1016]/20 text-[#CC1016] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Get in Touch</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Contact <span className="text-[#CC1016]">Us</span>
        </h1>
        <p className="text-white/70 text-lg max-w-xl mx-auto">
          Whether you are hiring, job-seeking, or just have a question — our team responds within one business day.
        </p>
      </section>

      {/* Main two-column section */}
      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">

          {/* LEFT — info column */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-[#0D0D0D] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                We Would Love to Hear From You
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed">
                Fill in the form and your message goes directly to our team. We reply to every enquiry personally.
              </p>
            </div>

            {/* Why contact */}
            {[
              {
                icon: <Building2 size={22} />,
                title: 'For Employers',
                desc: 'Tell us the role, discipline, and location. We will deliver pre-vetted, PE-verified shortlists within 48–72 hours.',
                color: 'bg-[#0D0D0D]',
              },
              {
                icon: <Users size={22} />,
                title: 'For Candidates',
                desc: 'Share your discipline and career goals. We match you to active roles and confidential opportunities across 20+ states.',
                color: 'bg-[#CC1016]',
              },
              {
                icon: <Briefcase size={22} />,
                title: 'General Enquiries',
                desc: 'Salary benchmarking, market intelligence, partnership opportunities — our team handles it all.',
                color: 'bg-[#0D0D0D]',
              },
            ].map(item => (
              <div key={item.title} className="flex gap-5 items-start">
                <div className={`${item.color} text-white rounded-xl w-11 h-11 flex items-center justify-center shrink-0 mt-0.5`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[#0D0D0D] text-base mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>{item.title}</h3>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}

            {/* Direct email card */}
            <div className="bg-[#0D0D0D] rounded-2xl p-6 flex items-center gap-4">
              <div className="w-10 h-10 bg-[#CC1016] rounded-full flex items-center justify-center shrink-0">
                <Mail size={18} className="text-white" />
              </div>
              <div>
                <p className="text-white/60 text-xs mb-0.5">Or email us directly</p>
                <a href="mailto:hr@ccpromoters.com" className="text-[#CC1016] font-semibold hover:text-white transition-colors">
                  hr@ccpromoters.com
                </a>
              </div>
            </div>

            {/* Photo */}
            <div className="rounded-2xl overflow-hidden border border-[#E5E5E5]" style={{ height: '220px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/construction-cranes.jpg"
                alt="Multi-storey building under construction with tower cranes in major urban civil engineering development"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Quick links */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5]">
              <h3 className="font-bold text-[#0D0D0D] mb-4 flex items-center gap-2">
                <LinkIcon size={16} className="text-[#CC1016]" /> Quick Links
              </h3>
              <ul className="space-y-2">
                {[
                  { label: 'Browse Open Jobs',     href: '/jobs'                },
                  { label: 'Submit Your Resume',    href: '/register/candidate'  },
                  { label: 'Post a Job',            href: '/register/employer'   },
                  { label: 'Our Services',          href: '/services'            },
                  { label: 'FAQs',                  href: '/faqs'                },
                ].map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[#CC1016] hover:underline text-sm font-medium">{l.label} →</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT — contact form */}
          <div className="bg-white rounded-2xl border border-[#E5E5E5] shadow-sm p-8 lg:sticky lg:top-8">
            {submitted ? (
              <div className="text-center py-10">
                <CheckCircle size={52} className="text-green-500 mx-auto mb-4" />
                <h3 className="font-bold text-[#0D0D0D] text-2xl mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Message Received!</h3>
                <p className="text-[#6B6B6B] mb-6">
                  Thank you for reaching out. A member of our team will be in touch within one business day.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name:'', email:'', phone:'', company:'', subject:'', message:'' }); }}
                  className="text-[#CC1016] font-semibold hover:underline text-sm"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h2 className="text-2xl font-bold text-[#0D0D0D] mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Send Us a Message</h2>
                  <p className="text-[#6B6B6B] text-sm">All enquiries are reviewed and responded to personally.</p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">{error}</div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Full Name <span className="text-[#CC1016]">*</span></label>
                    <input type="text" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Jane Smith"
                      className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[#0D0D0D] text-sm focus:outline-none focus:border-[#CC1016] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Email Address <span className="text-[#CC1016]">*</span></label>
                    <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="jane@example.com"
                      className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[#0D0D0D] text-sm focus:outline-none focus:border-[#CC1016] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Phone Number</label>
                    <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="(555) 000-0000"
                      className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[#0D0D0D] text-sm focus:outline-none focus:border-[#CC1016] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Company / Firm</label>
                    <input type="text" value={form.company} onChange={e => set('company', e.target.value)} placeholder="Meridian Engineering Group"
                      className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[#0D0D0D] text-sm focus:outline-none focus:border-[#CC1016] transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">What can we help with? <span className="text-[#CC1016]">*</span></label>
                  <select value={form.subject} onChange={e => set('subject', e.target.value)}
                    className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[#0D0D0D] text-sm focus:outline-none focus:border-[#CC1016] transition-colors bg-white">
                    <option value="">Select a subject...</option>
                    {subjects.map(s => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Message <span className="text-[#CC1016]">*</span></label>
                  <textarea rows={5} value={form.message} onChange={e => set('message', e.target.value)} placeholder="Tell us about your needs..."
                    className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[#0D0D0D] text-sm focus:outline-none focus:border-[#CC1016] transition-colors resize-none" />
                </div>

                <button type="submit" disabled={submitting}
                  className="w-full bg-[#CC1016] text-white font-bold py-4 rounded-lg hover:bg-[#A80D12] transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                  {submitting ? 'Sending...' : <><Send size={16} /> Send Message</>}
                </button>

                <p className="text-[#6B6B6B] text-xs text-center">
                  Your message is sent directly to our team at{' '}
                  <span className="text-[#CC1016] font-medium">hr@ccpromoters.com</span>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
