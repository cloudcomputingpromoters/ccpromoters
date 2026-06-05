import Link from 'next/link';
import { Target, Zap, Shield, Users } from 'lucide-react';

export const metadata = {
  title: 'About CCPromoters | Civil Engineering Staffing Specialists',
  description: 'CCPromoters is a specialist civil engineering staffing firm placing engineers across all disciplines in the US. Learn about our mission, approach, and team.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0D0D0D] py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#CC1016]" style={{ transform: 'translate(30%, -30%)' }} />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-block bg-[#CC1016]/20 text-[#CC1016] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">About CCPromoters</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Built by Engineers, <span className="text-[#CC1016]">for Engineers</span>
          </h1>
          <p className="text-white/70 text-xl leading-relaxed max-w-3xl mx-auto">
            We are a specialist civil engineering staffing firm on a mission to connect the best engineers with the firms building America&apos;s infrastructure — with precision, speed, and genuine expertise.
          </p>
        </div>
      </section>

      {/* Mission + Story */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#0D0D0D] mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>Our Mission</h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              CCPromoters was founded on a simple observation: civil engineering is a specialist discipline, but most staffing firms treat it as a commodity. Engineers were being matched by keyword, not by expertise. Firms were getting candidates who looked right on paper but needed months of ramp-up before contributing.
            </p>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              We set out to change that. Our mission is to be the most knowledgeable, most connected, and most trusted civil engineering staffing firm in the United States — placing engineers who are genuinely qualified, genuinely interested, and genuinely ready to contribute from day one.
            </p>
            <p className="text-[#6B6B6B] leading-relaxed">
              Today, we serve engineering firms and individual engineers across all 10 civil engineering disciplines in 20+ states. Every recruiter on our team understands what a PE license means, knows the difference between ETABS and STAAD.Pro, and can hold a credible conversation about LRFD bridge design or BNR wastewater treatment. That is the CCPromoters difference.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {/* Site photo */}
            <div className="rounded-2xl overflow-hidden border border-[#E5E5E5]" style={{ height: '280px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/engineers-review.jpg"
                alt="Two civil engineers in safety gear reviewing construction plans and blueprints on site"
                className="w-full h-full object-cover object-center"
              />
            </div>
            {/* Stats row */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { number: '300+', label: 'Placements in 12 Months' },
                { number: '20+',  label: 'States Served' },
                { number: '10',   label: 'Civil Disciplines' },
                { number: '98%',  label: 'Client Satisfaction' },
              ].map(stat => (
                <div key={stat.label} className="bg-[#F5F5F5] rounded-xl p-4 border border-[#E5E5E5] text-center">
                  <div className="text-2xl font-extrabold text-[#CC1016] mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>{stat.number}</div>
                  <div className="text-[#6B6B6B] text-xs font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 px-4 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0D0D0D]" style={{ fontFamily: 'Manrope, sans-serif' }}>Our Approach</h2>
            <p className="text-[#6B6B6B] mt-3 max-w-xl mx-auto">Three principles that separate us from generalist staffing firms.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Zap size={28} />, title: 'Speed Without Sacrifice', desc: 'We deliver pre-vetted shortlists within 48–72 hours — not because we cut corners, but because we maintain a live, always-current network of qualified engineers across all disciplines.' },
              { icon: <Target size={28} />, title: 'Genuine Specialisation', desc: 'Every recruiter at CCPromoters is assigned to specific disciplines. They know the software, the codes, the career paths, and the firms in their sector. You will never hear "what does PE mean?" from one of our team.' },
              { icon: <Shield size={28} />, title: 'Quality Guarantee', desc: 'We verify PE licenses through state engineering board databases before presenting any candidate for a licensed role. We stand behind every placement with a 90-day guarantee on permanent hires.' },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-2xl p-8 border border-[#E5E5E5] hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#CC1016] text-white rounded-xl flex items-center justify-center mb-5">{item.icon}</div>
                <h3 className="font-bold text-[#0D0D0D] text-xl mb-3">{item.title}</h3>
                <p className="text-[#6B6B6B]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DE&I */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-12 h-12 bg-[#0D0D0D] text-white rounded-xl flex items-center justify-center mb-5"><Users size={24} /></div>
            <h2 className="text-3xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>Our Commitment to Diversity & Inclusion</h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              Civil engineering remains one of the least diverse STEM disciplines. At CCPromoters, we believe that diverse engineering teams produce better outcomes — more creative solutions, stronger risk identification, and better community relationships.
            </p>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              We actively work to broaden the pipeline of civil engineering talent by partnering with HBCUs, Hispanic-serving institutions, and women-in-engineering organisations. We encourage all clients to consider diverse shortlists and provide DE&I-focused talent strategy guidance on request.
            </p>
            <p className="text-[#6B6B6B] leading-relaxed">
              For candidates from underrepresented groups, we offer additional career coaching, mentorship connections, and advocacy throughout the hiring process — at no additional cost.
            </p>
          </div>
          <div className="bg-[#0D0D0D] rounded-2xl p-8 text-white">
            <h3 className="font-bold text-xl mb-6">DE&I Commitments</h3>
            {[
              'Actively source from HBCUs and Hispanic-serving engineering programmes',
              'Provide blind resume review options to reduce unconscious bias',
              'Track and report diversity metrics across all client programmes on request',
              'Partner with SWE, NSBE, and SHPE for candidate pipeline development',
              'Offer pro-bono career coaching for candidates from underrepresented groups',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 mb-4 last:mb-0">
                <div className="w-5 h-5 bg-[#CC1016] rounded-full shrink-0 mt-0.5 flex items-center justify-center">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span className="text-white/85 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#CC1016] text-center px-4">
        <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>Meet the Team Behind the Placements</h2>
        <p className="text-white/85 mb-8 max-w-xl mx-auto">Our specialist recruiters are ready to help you find the right engineer or the right opportunity.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/about/team" className="bg-white text-[#CC1016] font-bold px-8 py-3 rounded-lg hover:bg-white/90 transition-colors">Meet the Team</Link>
          <Link href="/contact" className="border border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">Contact Us</Link>
        </div>
      </section>
    </div>
  );
}
