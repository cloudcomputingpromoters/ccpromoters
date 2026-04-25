import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Our Team | CCPromoters Civil Engineering Staffing',
  description: 'Meet the specialist civil engineering recruiters at CCPromoters. Each recruiter is dedicated to specific disciplines and brings deep sector knowledge to every search.',
};

const team = [
  { name: 'Alex Reed', title: 'Senior Recruiter — Structural & Construction', discipline: 'Structural, Construction & Project Management', bio: 'Alex has placed over 120 structural and construction engineers in the past three years, with a focus on bridge rehabilitation and heavy civil programmes across Texas and the Southeast. Former civil engineering technician.', disciplines: ['Structural', 'Construction'], linkedin: '#', email: 'alex.reed@ccpromoters.com' },
  { name: 'Priya Nair', title: 'Senior Recruiter — Transportation & Geotechnical', discipline: 'Transportation Engineering & Geotechnical', bio: 'Priya specialises in transportation and geotechnical placements, with deep relationships at State DOTs and geotechnical consultancies in the Mountain West and Mid-Atlantic regions. She holds a BS in Civil Engineering.', disciplines: ['Transportation', 'Geotechnical'], linkedin: '#', email: 'priya.nair@ccpromoters.com' },
  { name: 'Marcus Thompson', title: 'Recruiter — Water Resources & Environmental', discipline: 'Water Resources, Environmental & Wastewater', bio: 'Marcus focuses on water sector placements — from stormwater engineers and floodplain modellers to environmental scientists and wastewater process designers. He has filled roles across SFWMD, FDOT, and major water management districts.', disciplines: ['Water Resources', 'Environmental', 'Wastewater'], linkedin: '#', email: 'marcus.thompson@ccpromoters.com' },
  { name: 'Samantha Cole', title: 'Recruiter — Land Development & Surveying', discipline: 'Land Development, Urban Planning & Surveying', bio: 'Samantha works with private developers, engineering consultancies, and municipal planning departments to place land development engineers, urban planners, and licensed surveyors. She is based in Austin and has placed over 60 engineers in Texas and Florida.', disciplines: ['Land Development', 'Surveying'], linkedin: '#', email: 'samantha.cole@ccpromoters.com' },
  { name: 'James Park', title: 'Recruiter — Coastal & Marine Engineering', discipline: 'Coastal, Marine & Water Resources', bio: 'James leads CCPromoters\' coastal engineering practice, placing engineers on shoreline protection, beach nourishment, and coastal resilience programmes along the Gulf Coast, Southeast, and Mid-Atlantic. Deep knowledge of USACE and FDEP permitting processes.', disciplines: ['Coastal', 'Water Resources'], linkedin: '#', email: 'james.park@ccpromoters.com' },
  { name: 'Rachel Okafor', title: 'Executive Recruiter — Senior & Principal Level', discipline: 'All Disciplines — Senior & Executive Roles', bio: 'Rachel manages CCPromoters\' executive search practice, confidentially placing Department Heads, Directors of Engineering, and VP-level leaders at engineering consultancies and infrastructure development firms across the US.', disciplines: ['All Disciplines'], linkedin: '#', email: 'rachel.okafor@ccpromoters.com' },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0D0D0D] py-20 px-4 text-center">
        <Link href="/about" className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-6 transition-colors">← About CCPromoters</Link>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Meet the <span className="text-[#CC1016]">Team</span>
        </h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Every recruiter at CCPromoters is assigned to specific civil engineering disciplines. You will always speak to someone who genuinely understands your sector.
        </p>
      </section>

      {/* Team grid */}
      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map(member => (
              <div key={member.name} className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative bg-[#061838] overflow-hidden" style={{ height: '140px' }}>
                  {/* Engineering blueprint background */}
                  <svg viewBox="0 0 320 140" className="absolute inset-0 w-full h-full" aria-hidden="true">
                    {Array.from({length:7},(_,i)=>(
                      <line key={`v${i}`} x1={i*54} y1="0" x2={i*54} y2="140" stroke="#1E3A8A" strokeOpacity="0.18" strokeWidth="0.5"/>
                    ))}
                    {Array.from({length:4},(_,i)=>(
                      <line key={`h${i}`} x1="0" y1={i*46} x2="320" y2={i*46} stroke="#1E3A8A" strokeOpacity="0.18" strokeWidth="0.5"/>
                    ))}
                    {/* Mini bridge silhouette */}
                    <line x1="40" y1="100" x2="280" y2="100" stroke="#2A4A6A" strokeWidth="1" strokeOpacity="0.4"/>
                    <rect x="128" y="55" width="6" height="45" fill="none" stroke="#CC1016" strokeWidth="0.8" strokeOpacity="0.35"/>
                    <rect x="186" y="55" width="6" height="45" fill="none" stroke="#CC1016" strokeWidth="0.8" strokeOpacity="0.35"/>
                    {[50,80,110].map(x=>(<line key={x} x1="131" y1="57" x2={x} y2="100" stroke="#CC1016" strokeWidth="0.5" strokeOpacity="0.25"/>))}
                    {[210,235,260].map(x=>(<line key={x} x1="189" y1="57" x2={x} y2="100" stroke="#CC1016" strokeWidth="0.5" strokeOpacity="0.25"/>))}
                    {/* Hard hat icon top-right */}
                    <path d="M272 20 Q272 8 285 6 Q298 8 298 20 Z" fill="#CC1016" fillOpacity="0.3"/>
                    <rect x="270" y="20" width="30" height="5" rx="2.5" fill="#CC1016" fillOpacity="0.3"/>
                  </svg>
                  {/* Avatar centered */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=CC1016&color=FFFFFF&bold=true&size=128`}
                      alt={member.name}
                      width={80} height={80}
                      className="rounded-full border-2 border-[#CC1016]/40 relative z-10"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-[#0D0D0D] text-lg mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>{member.name}</h3>
                  <p className="text-[#CC1016] text-sm font-semibold mb-3">{member.title}</p>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {member.disciplines.map(d => (
                      <span key={d} className="text-xs bg-[#F5F5F5] border border-[#E5E5E5] text-[#6B6B6B] px-2.5 py-1 rounded-full">{d}</span>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-[#E5E5E5]">
                    <a href={`mailto:${member.email}`}
                      className="flex-1 text-center bg-[#0D0D0D] text-white text-sm font-semibold py-2 rounded-lg hover:bg-[#111111] transition-colors">
                      Email
                    </a>
                    <a href={member.linkedin}
                      className="flex-1 text-center border border-[#E5E5E5] text-[#6B6B6B] text-sm font-semibold py-2 rounded-lg hover:border-[#CC1016] hover:text-[#CC1016] transition-colors">
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-16 bg-[#0D0D0D] text-center px-4">
        <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>Join the CCPromoters Team</h2>
        <p className="text-white/70 mb-8 max-w-xl mx-auto">Are you an experienced recruiter with a background in civil engineering or the engineering sector? We are always looking for talent.</p>
        <Link href="/contact" className="btn-pink">Get in Touch</Link>
      </section>
    </div>
  );
}
