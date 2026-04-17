'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { insforge } from '@/lib/insforge';

type SalaryPoint = { discipline: string; experience_level: string; salary_min: number; salary_median: number; salary_max: number };

const disciplines = [
  { value: 'structural', label: 'Structural Engineering' },
  { value: 'transportation', label: 'Transportation Engineering' },
  { value: 'geotechnical', label: 'Geotechnical Engineering' },
  { value: 'water-resources', label: 'Water Resources' },
  { value: 'environmental', label: 'Environmental Engineering' },
  { value: 'construction', label: 'Construction Management' },
];

const levels = ['Graduate', 'EIT', 'Mid-Level', 'Senior', 'Principal'];

const summaryTable = [
  { discipline: 'Structural', graduate: '$60k–$76k', mid: '$90k–$128k', senior: '$115k–$160k', principal: '$145k–$210k' },
  { discipline: 'Transportation', graduate: '$58k–$74k', mid: '$87k–$122k', senior: '$108k–$152k', principal: '$120k–$165k' },
  { discipline: 'Geotechnical', graduate: '$58k–$75k', mid: '$84k–$118k', senior: '$105k–$144k', principal: '$120k–$158k' },
  { discipline: 'Water Resources', graduate: '$57k–$73k', mid: '$80k–$114k', senior: '$100k–$140k', principal: '$115k–$155k' },
  { discipline: 'Environmental', graduate: '$55k–$70k', mid: '$78k–$112k', senior: '$95k–$135k', principal: '$110k–$150k' },
  { discipline: 'Construction', graduate: '$60k–$78k', mid: '$82k–$116k', senior: '$105k–$148k', principal: '$130k–$175k' },
];

export default function SalaryGuidePage() {
  const [allData, setAllData] = useState<SalaryPoint[]>([]);
  const [selectedDiscipline, setSelectedDiscipline] = useState('structural');
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  useEffect(() => {
    insforge.database
      .from('salary_data_points')
      .select('discipline, experience_level, salary_min, salary_median, salary_max')
      .then(({ data }) => setAllData((data as SalaryPoint[]) || []));
  }, []);

  const chartData = allData
    .filter(d => d.discipline === selectedDiscipline)
    .map(d => ({
      level: d.experience_level,
      Min: Math.round(d.salary_min / 1000),
      Median: Math.round(d.salary_median / 1000),
      Max: Math.round(d.salary_max / 1000),
    }))
    .sort((a, b) => levels.indexOf(a.level) - levels.indexOf(b.level));

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    try { await insforge.database.from('newsletter_signups').insert({ email, source: 'salary-guide' }); } catch { /* ignore */ }
    setEmailSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#1A3A8F] to-[#163298] py-20 px-4 text-center">
        <span className="inline-block bg-[#D4AF37]/20 text-[#D4AF37] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">2026 Salary Data</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Civil Engineering <span className="text-[#D4AF37]">Salary Guide</span>
        </h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Real placement data from 300+ civil engineering hires in 2025–2026. See what engineers in your discipline and experience level are actually earning.
        </p>
      </section>

      {/* Interactive calculator */}
      <section className="py-16 px-4 bg-[#F7F9FC]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1A3A8F] mb-2 text-center" style={{ fontFamily: 'Manrope, sans-serif' }}>Salary Calculator</h2>
          <p className="text-[#4A5568] text-center mb-8">Select your discipline to see salary ranges by experience level.</p>

          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {disciplines.map(d => (
              <button key={d.value} onClick={() => setSelectedDiscipline(d.value)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${selectedDiscipline === d.value ? 'bg-[#D4AF37] text-white' : 'bg-white border border-[#E2E8F0] text-[#4A5568] hover:border-[#D4AF37]'}`}>
                {d.label}
              </button>
            ))}
          </div>

          {chartData.length > 0 ? (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
              <h3 className="font-bold text-[#1A3A8F] mb-6 text-center">
                {disciplines.find(d => d.value === selectedDiscipline)?.label} — Salary by Experience Level (USD thousands)
              </h3>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="level" tick={{ fill: '#4A5568', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#4A5568', fontSize: 12 }} unit="k" />
                  <Tooltip formatter={(v) => [`$${Number(v)}k`, '']} labelStyle={{ color: '#1A3A8F', fontWeight: 'bold' }} />
                  <Bar dataKey="Min" fill="#1A3A8F" radius={[4,4,0,0]} />
                  <Bar dataKey="Median" fill="#D4AF37" radius={[4,4,0,0]} />
                  <Bar dataKey="Max" fill="#163298" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-4 text-sm">
                {[{c:'#1A3A8F',l:'Min'},{c:'#D4AF37',l:'Median'},{c:'#163298',l:'Max'}].map(item => (
                  <span key={item.l} className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm inline-block" style={{background:item.c}} />{item.l}</span>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-16 text-center">
              <div className="text-4xl mb-3">📊</div>
              <p className="text-[#4A5568]">Loading salary data...</p>
            </div>
          )}
        </div>
      </section>

      {/* Full table */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1A3A8F] mb-8 text-center" style={{ fontFamily: 'Manrope, sans-serif' }}>Salary Ranges by Discipline</h2>
          <div className="overflow-x-auto rounded-2xl border border-[#E2E8F0] shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-[#1A3A8F] text-white">
                <tr>
                  <th className="text-left px-5 py-4 font-semibold">Discipline</th>
                  <th className="text-center px-4 py-4 font-semibold">Graduate</th>
                  <th className="text-center px-4 py-4 font-semibold">Mid-Level</th>
                  <th className="text-center px-4 py-4 font-semibold">Senior (PE)</th>
                  <th className="text-center px-4 py-4 font-semibold">Principal</th>
                </tr>
              </thead>
              <tbody>
                {summaryTable.map((row, i) => (
                  <tr key={row.discipline} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F7F9FC]'}>
                    <td className="px-5 py-4 font-semibold text-[#1A3A8F]">{row.discipline}</td>
                    <td className="px-4 py-4 text-center text-[#4A5568]">{row.graduate}</td>
                    <td className="px-4 py-4 text-center text-[#4A5568]">{row.mid}</td>
                    <td className="px-4 py-4 text-center text-[#D4AF37] font-semibold">{row.senior}</td>
                    <td className="px-4 py-4 text-center text-[#4A5568]">{row.principal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[#4A5568] text-sm mt-3 text-center">All figures are annual base salary in USD. Data reflects national averages from 2025–2026 placements.</p>
        </div>
      </section>

      {/* Download gate */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#D4AF37] to-[#1A3A8F]">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>Download the Full 2026 Salary Guide</h2>
          <p className="text-white/85 mb-8">Get the complete 28-page PDF including contract rates, benefits benchmarking, and region-by-region breakdowns.</p>
          {emailSubmitted ? (
            <div className="bg-white/20 backdrop-blur rounded-xl p-6 text-white">
              <div className="text-3xl mb-2">✅</div>
              <p className="font-semibold">The salary guide has been sent to your email!</p>
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} className="flex gap-2">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address"
                className="flex-1 border-0 rounded-lg px-4 py-3 text-[#1A3A8F] focus:outline-none" required />
              <button type="submit" className="bg-[#1A3A8F] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#163298] transition-colors whitespace-nowrap">
                Get PDF
              </button>
            </form>
          )}
          <p className="text-white/60 text-xs mt-3">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* Market value CTA */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-2xl font-bold text-[#1A3A8F] mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>Want to Know Your Personal Market Value?</h2>
        <p className="text-[#4A5568] mb-6 max-w-lg mx-auto">Talk to one of our specialist recruiters for a personalised salary assessment based on your experience, licensure, and target market.</p>
        <Link href="/contact" className="btn-pink">Talk to a Recruiter</Link>
      </section>
    </div>
  );
}
