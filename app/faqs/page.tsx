'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { insforge } from '@/lib/insforge';

type FAQ = { id: string; question: string; answer: string; category: string; sort_order: number };

const categoryLabels: Record<string, string> = {
  candidates: 'For Candidates',
  employers: 'For Employers',
  licensing: 'PE Licensing',
  general: 'General',
};

function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="space-y-3">
      {faqs.map(faq => (
        <div key={faq.id} className={`border rounded-xl transition-all ${open === faq.id ? 'border-[#D4AF37] shadow-md' : 'border-[#E2E8F0]'}`}>
          <button
            onClick={() => setOpen(open === faq.id ? null : faq.id)}
            className="w-full flex items-center justify-between gap-4 p-5 text-left">
            <span className={`font-semibold ${open === faq.id ? 'text-[#D4AF37]' : 'text-[#1A3A8F]'}`}>{faq.question}</span>
            {open === faq.id ? <ChevronUp size={18} className="text-[#D4AF37] shrink-0" /> : <ChevronDown size={18} className="text-[#4A5568] shrink-0" />}
          </button>
          {open === faq.id && (
            <div className="px-5 pb-5 text-[#4A5568] leading-relaxed border-t border-[#E2E8F0] pt-4">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function FAQsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    insforge.database
      .from('faqs')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        setFaqs((data as FAQ[]) || []);
        setLoading(false);
      });
  }, []);

  const categories = ['all', ...Array.from(new Set(faqs.map(f => f.category)))];
  const filtered = activeCategory === 'all' ? faqs : faqs.filter(f => f.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#1A3A8F] to-[#163298] py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Frequently Asked <span className="text-[#D4AF37]">Questions</span>
        </h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Everything you need to know about working with CCPromoters — whether you are a candidate looking for a role or a firm looking to hire.
        </p>
      </section>

      <section className="py-16 px-4 bg-[#F7F9FC]">
        <div className="max-w-4xl mx-auto">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === cat ? 'bg-[#D4AF37] text-white' : 'bg-white border border-[#E2E8F0] text-[#4A5568] hover:border-[#D4AF37]'}`}>
                {cat === 'all' ? 'All Questions' : categoryLabels[cat] || cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1,2,3,4,5].map(i => <div key={i} className="h-16 bg-white rounded-xl border border-[#E2E8F0] animate-pulse" />)}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-[#4A5568]">No questions in this category yet.</p>
          ) : (
            <FAQAccordion faqs={filtered} />
          )}

          {/* Still have questions */}
          <div className="mt-14 bg-[#1A3A8F] rounded-2xl p-8 text-center text-white">
            <h3 className="font-bold text-2xl mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>Still Have Questions?</h3>
            <p className="text-white/70 mb-6">Our specialist recruiters are happy to answer any questions about the process, our services, or the civil engineering job market.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="btn-pink">Contact Us</Link>
              <Link href="/jobs" className="btn-outline-white">Browse Open Roles</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
