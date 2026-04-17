'use client';

import { useState } from 'react';
import { Mail, Send, CheckCircle, Building2, Users, Briefcase } from 'lucide-react';
import { insforge } from '@/lib/insforge';

const subjects = [
  { value: 'Hiring Enquiry',     label: 'I want to hire civil engineers'      },
  { value: 'Job Search',         label: 'I am looking for a new role'          },
  { value: 'Service Enquiry',    label: 'I have a question about your services'},
  { value: 'Salary Benchmarking',label: 'I need salary benchmarking data'      },
  { value: 'Partnership',        label: 'Partnership or media enquiry'          },
  { value: 'Other',              label: 'Something else'                        },
];

export default function ContactUsSection() {
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
      // Save to database
      await insforge.database.from('contact_submissions').insert({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        company: form.company || null,
        subject: form.subject,
        message: form.message,
      });
      // Fire email to hr@ccpromoters.com
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
    <section className="py-20 bg-[#F7F9FC] px-4" id="contact-us">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-[#D4AF37]/15 text-[#D4AF37] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Get in Touch</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A3A8F] mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Contact <span className="text-[#D4AF37]">Us</span>
          </h2>
          <p className="text-[#4A5568] max-w-xl mx-auto text-lg">
            Whether you are looking to hire top civil engineers or find your next opportunity — reach out and we will get back to you within one business day.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* LEFT — Info column */}
          <div className="space-y-8">
            {/* Why contact us */}
            {[
              {
                icon: <Building2 size={22} />,
                title: 'For Employers',
                desc: 'Tell us about the role you need filled — discipline, location, and seniority. We will come back with pre-vetted candidates within 48–72 hours.',
                color: 'bg-[#1A3A8F]',
              },
              {
                icon: <Users size={22} />,
                title: 'For Candidates',
                desc: 'Share your discipline and career goals. Our specialist recruiters will match you with active roles and confidential opportunities that suit your profile.',
                color: 'bg-[#D4AF37]',
              },
              {
                icon: <Briefcase size={22} />,
                title: 'General Enquiries',
                desc: 'Questions about salary data, hiring trends, or our services? Our team is happy to help with any civil engineering workforce question.',
                color: 'bg-[#1A3A8F]',
              },
            ].map(item => (
              <div key={item.title} className="flex gap-5 items-start">
                <div className={`${item.color} text-white rounded-xl w-11 h-11 flex items-center justify-center shrink-0 mt-0.5`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[#1A3A8F] text-base mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>{item.title}</h3>
                  <p className="text-[#4A5568] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}

            {/* Direct email */}
            <div className="bg-[#1A3A8F] rounded-2xl p-6 flex items-center gap-4">
              <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center shrink-0">
                <Mail size={18} className="text-white" />
              </div>
              <div>
                <p className="text-white/60 text-xs mb-0.5">Or email us directly</p>
                <a href="mailto:hr@ccpromoters.com" className="text-[#D4AF37] font-semibold hover:text-white transition-colors">
                  hr@ccpromoters.com
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT — Contact form */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-8">
            {submitted ? (
              <div className="text-center py-10">
                <CheckCircle size={52} className="text-green-500 mx-auto mb-4" />
                <h3 className="font-bold text-[#1A3A8F] text-2xl mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Message Sent!</h3>
                <p className="text-[#4A5568] mb-6">
                  Thank you for reaching out. A member of our team will be in touch within one business day.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name:'', email:'', phone:'', company:'', subject:'', message:'' }); }}
                  className="text-[#D4AF37] font-semibold hover:underline text-sm"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-bold text-[#1A3A8F] text-xl mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Send Us a Message</h3>
                <p className="text-[#4A5568] text-sm mb-5">All enquiries are reviewed by our specialist team and responded to promptly.</p>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">{error}</div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#1A3A8F] mb-1.5">
                      Full Name <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="text" value={form.name} onChange={e => set('name', e.target.value)}
                      placeholder="Jane Smith"
                      className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[#1A3A8F] text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1A3A8F] mb-1.5">
                      Email Address <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="email" value={form.email} onChange={e => set('email', e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[#1A3A8F] text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#1A3A8F] mb-1.5">Phone</label>
                    <input
                      type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                      placeholder="(555) 000-0000"
                      className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[#1A3A8F] text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1A3A8F] mb-1.5">Company / Firm</label>
                    <input
                      type="text" value={form.company} onChange={e => set('company', e.target.value)}
                      placeholder="Meridian Engineering Group"
                      className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[#1A3A8F] text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1A3A8F] mb-1.5">
                    What can we help with? <span className="text-[#D4AF37]">*</span>
                  </label>
                  <select
                    value={form.subject} onChange={e => set('subject', e.target.value)}
                    className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[#1A3A8F] text-sm focus:outline-none focus:border-[#D4AF37] transition-colors bg-white"
                  >
                    <option value="">Select a subject...</option>
                    {subjects.map(s => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1A3A8F] mb-1.5">
                    Message <span className="text-[#D4AF37]">*</span>
                  </label>
                  <textarea
                    rows={4} value={form.message} onChange={e => set('message', e.target.value)}
                    placeholder="Tell us what you are looking for..."
                    className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[#1A3A8F] text-sm focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit" disabled={submitting}
                  className="w-full bg-[#D4AF37] text-white font-bold py-4 rounded-lg hover:bg-[#B8960C] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {submitting ? 'Sending...' : <><Send size={16} /> Send Message</>}
                </button>

                <p className="text-[#4A5568] text-xs text-center">
                  Your message is sent directly to our team at{' '}
                  <span className="text-[#D4AF37] font-medium">hr@ccpromoters.com</span>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
