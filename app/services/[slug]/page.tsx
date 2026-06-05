export async function generateStaticParams() {
  return [
    'permanent-placement','contract-staffing','executive-search','volume-recruitment',
    'talent-mapping','compensation-benchmarking','job-search','resume-optimization',
    'interview-coaching','salary-negotiation','career-roadmap','unlisted-roles',
    'employer-branding','outplacement',
  ].map(slug => ({ slug }));
}

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { insforge } from '@/lib/insforge';

const serviceContent: Record<string, {
  tagline: string; audience: 'employer' | 'candidate';
  intro: string; includes: string[];
  steps: { title: string; desc: string }[];
  cta: { primary: string; href: string; secondary: string; href2: string };
  testimonial?: { quote: string; author: string; title: string };
}> = {
  'permanent-placement': {
    tagline: 'Pre-screened, PE-verified engineers on contingent or retained basis',
    audience: 'employer',
    intro: 'Our permanent placement service connects engineering firms with fully vetted civil engineers ready to join your team. We handle the full search lifecycle — from sourcing and screening through credential verification and offer negotiation — so your team can focus on projects, not hiring.',
    includes: [
      'Detailed job brief consultation with a specialist civil engineering recruiter',
      'Active candidate sourcing from our network of 8,000+ registered engineers',
      'Multi-stage screening: technical assessment, culture fit, and credential verification',
      'PE license status verified through state engineering board databases',
      'Shortlist of 3–5 qualified candidates delivered within 48–72 hours',
      'Interview coordination and candidate briefing for each stage',
      'Offer negotiation support and reference checking',
      '90-day placement guarantee on all permanent hires',
    ],
    steps: [
      { title: 'Briefing', desc: 'A 30-minute call with your dedicated recruiter to define the technical requirements, company culture, compensation range, and timeline.' },
      { title: 'Search & Shortlist', desc: 'We activate our network and present a shortlist of 3–5 pre-vetted, interview-ready candidates within 48–72 hours.' },
      { title: 'Offer & Onboard', desc: 'We manage the offer process, negotiate on your behalf, and provide post-placement support to ensure a smooth onboarding.' },
    ],
    cta: { primary: 'Post a Job', href: '/register/employer', secondary: 'Contact Us', href2: '/contact' },
    testimonial: { quote: 'CCPromoters filled three senior PE positions for us in under four weeks. Every candidate they sent understood our project type without us having to explain the basics.', author: 'Rebecca Thornton', title: 'VP of Engineering, Hargrove Infrastructure Group' },
  },
  'contract-staffing': {
    tagline: 'Flexible project-based engineers deployed within 48 hours',
    audience: 'employer',
    intro: 'When project demands spike or permanent headcount is constrained, our contract staffing service delivers qualified civil engineers on a project basis. We maintain a bench of available engineers across all disciplines, screened and ready to mobilise on short notice.',
    includes: [
      'Contract engineers available on W2 or C2C arrangements',
      'Rates quoted and confirmed before candidate presentation',
      'Engineers pre-screened for the specific discipline and software required',
      'Flexible contract durations: 3 months to multi-year programmes',
      'Rapid mobilisation: engineers placed and onboarded within 48 hours of offer',
      'Weekly timesheet and payroll management handled by CCPromoters',
      'Seamless conversion to permanent employment at contract end if desired',
    ],
    steps: [
      { title: 'Requirement Brief', desc: 'Tell us the role, duration, software requirements, and start date. We confirm availability and rates within 4 hours.' },
      { title: 'Candidate Presentation', desc: 'We present 2–3 available, screened engineers. You select your preferred candidate and we confirm the engagement.' },
      { title: 'Mobilisation', desc: 'The engineer is onboarded, timesheet processes set up, and they are ready to contribute from day one.' },
    ],
    cta: { primary: 'Request Contract Staff', href: '/register/employer', secondary: 'Talk to a Recruiter', href2: '/contact' },
  },
  'executive-search': {
    tagline: 'Confidential Director, VP & C-suite engineering leadership placement',
    audience: 'employer',
    intro: 'Our executive search practice places senior engineering leaders — Department Heads, Directors of Engineering, Vice Presidents, and C-suite technical roles — with engineering firms, developers, and government agencies. All searches are conducted with full confidentiality and a dedicated senior recruiter.',
    includes: [
      'Dedicated senior recruiter with 10+ years of engineering sector executive search',
      'Fully confidential search: client and candidate identities protected until mutual interest confirmed',
      'Long-list of 15–20 qualified candidates researched and mapped from the market',
      'Detailed candidate assessment reports including leadership style and cultural fit',
      'Comprehensive reference checking and background verification',
      'Salary benchmarking data provided at brief stage',
      '6-month placement guarantee on all executive hires',
      'Post-placement onboarding support at 30, 60, and 90 days',
    ],
    steps: [
      { title: 'Strategy Session', desc: 'We meet with your leadership team to understand the strategic context, reporting structure, cultural requirements, and ideal candidate profile.' },
      { title: 'Market Mapping', desc: 'We confidentially approach 15–20 qualified leaders, assess interest, and present a shortlist of 4–6 highly qualified candidates within 3 weeks.' },
      { title: 'Selection & Onboarding', desc: 'We manage the final interview process, facilitate the offer, and provide structured 90-day onboarding support.' },
    ],
    cta: { primary: 'Start a Confidential Search', href: '/contact', secondary: 'Learn More', href2: '/contact' },
    testimonial: { quote: 'We were growing rapidly and needed to hire eight engineers in 90 days across three disciplines. CCPromoters built a dedicated team for our search and delivered.', author: 'Thomas Kirkland', title: 'Director of Operations, Pinnacle Civil Group' },
  },
  'volume-recruitment': {
    tagline: 'Multi-hire programmes for rapid team expansion',
    audience: 'employer',
    intro: 'When you need to scale rapidly — multiple hires across one or more disciplines in a defined timeframe — our volume recruitment service provides dedicated resourcing capacity, structured processes, and the pipeline depth to deliver at pace without compromising quality.',
    includes: [
      'Dedicated recruitment team assigned exclusively to your programme',
      'Applicant tracking system (ATS) integration or standalone tracking dashboard',
      'Weekly candidate pipeline reports with conversion metrics',
      'Structured assessment process: technical screening, competency interviews, culture fit',
      'PE license and credential verification at scale',
      'Volume fee structures and programme discounts available',
      'Dedicated account manager for day-to-day coordination',
    ],
    steps: [
      { title: 'Programme Design', desc: 'We scope the number of hires, disciplines, locations, and timeline — then design a recruitment process and team to match.' },
      { title: 'Pipeline Build', desc: 'We activate multiple sourcing channels simultaneously, building a qualified pipeline within the first two weeks.' },
      { title: 'Delivery', desc: 'Candidates flow through a consistent assessment process, with weekly reporting until all positions are filled.' },
    ],
    cta: { primary: 'Discuss Your Programme', href: '/contact', secondary: 'View All Services', href2: '/services' },
  },
  'talent-mapping': {
    tagline: 'Market intelligence and candidate pipeline for future hiring',
    audience: 'employer',
    intro: 'Before you need to hire, talent mapping gives you a clear picture of who is in the market, where your competitors source their engineers, and what it will take to attract the talent you need. Our mapping projects deliver actionable market intelligence, not just a list of names.',
    includes: [
      'Market mapping of all qualified engineers in your target geography and discipline',
      'Compensation benchmarking for the specific roles you plan to hire',
      'Competitor talent intelligence: where are they hiring from and at what cost?',
      'Passive candidate identification and warm relationship building',
      'Talent pipeline development: pre-qualified candidates ready when you need them',
      'Quarterly market update reports included for 12 months post-mapping',
    ],
    steps: [
      { title: 'Scope Definition', desc: 'We agree on the disciplines, geographies, and experience levels to map — and the competitive intelligence questions you want answered.' },
      { title: 'Research & Mapping', desc: 'Over 4–6 weeks we map the market, approach passive candidates, and compile a comprehensive intelligence report.' },
      { title: 'Briefing & Pipeline', desc: 'We present findings and maintain the pipeline, keeping identified candidates warm until you are ready to hire.' },
    ],
    cta: { primary: 'Commission a Talent Map', href: '/contact', secondary: 'View All Services', href2: '/services' },
  },
  'compensation-benchmarking': {
    tagline: 'Real-world salary data to attract and retain engineering talent',
    audience: 'employer',
    intro: 'Attracting and retaining qualified civil engineers requires knowing what the market is actually paying — not just published surveys, but real placement data from comparable firms in your geography. Our compensation benchmarking service provides current, discipline-specific salary intelligence.',
    includes: [
      'Salary benchmarking report for up to 10 specified roles',
      'Data drawn from CCPromoters placement database and BLS occupational wage statistics',
      'Breakdown by discipline, experience level, geography, and company size',
      'Total compensation analysis: base salary, bonus structures, benefits, and perks',
      'Retention risk analysis: which roles are most likely to see attrition in current market',
      'Actionable recommendations for compensation structure',
    ],
    steps: [
      { title: 'Role Specification', desc: 'You provide the list of roles and geographies to benchmark. We clarify scope and confirm methodology.' },
      { title: 'Data Collection', desc: 'We compile current placement data and market intelligence across all specified roles and geographies.' },
      { title: 'Report Delivery', desc: 'We deliver a detailed report with salary ranges, total compensation data, and strategic recommendations within 10 business days.' },
    ],
    cta: { primary: 'Request a Benchmarking Report', href: '/contact', secondary: 'View Salary Guide', href2: '/salary-guide' },
  },
  'job-search': {
    tagline: 'Expert job matching for civil engineers at every career stage',
    audience: 'candidate',
    intro: 'Our specialist recruiters do more than forward your resume — we actively advocate for you with firms that match your discipline, experience level, career goals, and preferred work environment. Submit your profile once and access our full network of active and hidden roles.',
    includes: [
      'One-on-one consultation with a discipline-specialist recruiter',
      'Access to roles that are never publicly advertised (confidential searches)',
      'Matching based on discipline, experience level, geography, and culture fit',
      'Company briefing before every interview: culture, team, project pipeline',
      'Salary and total compensation benchmarking for your specific profile',
      'Multiple offer management support if you receive competing proposals',
      'Completely free for all candidates — we are paid by the hiring firm',
    ],
    steps: [
      { title: 'Submit Your Profile', desc: 'Upload your resume and complete your candidate profile. A recruiter will reach out within 24–48 hours.' },
      { title: 'Consultation', desc: 'A 30-minute call to understand your goals, preferences, and target firms or project types.' },
      { title: 'Matching & Placement', desc: 'We present your profile to firms that fit your criteria and manage the entire process through to offer acceptance.' },
    ],
    cta: { primary: 'Submit Your Resume', href: '/register/candidate', secondary: 'Browse Open Roles', href2: '/jobs' },
    testimonial: { quote: 'I had been quietly looking for six months and getting nowhere on my own. My CCPromoters recruiter had me in front of three qualified firms within two weeks.', author: 'Daniel Osei', title: 'Senior Transportation Engineer, PE — Placed in Charlotte, NC' },
  },
  'resume-optimization': {
    tagline: 'Engineering-specific resume review and LinkedIn optimisation',
    audience: 'candidate',
    intro: 'Your resume is the first filter in every hiring process. Our specialist recruiters provide detailed, engineering-specific feedback to ensure your resume clearly communicates your technical credentials, PE licensure status, software proficiency, and project achievements in the language that hiring managers in your discipline respond to.',
    includes: [
      'Detailed resume review by a recruiter with civil engineering sector knowledge',
      'Discipline-specific keyword optimisation for ATS systems',
      'PE license and certification highlighting best practices',
      'Project achievement quantification guidance',
      'LinkedIn profile review and optimisation recommendations',
      'Before/after comparison and annotated feedback document',
      'Unlimited revisions until you are satisfied with the result',
    ],
    steps: [
      { title: 'Submit Your Resume', desc: 'Upload your current resume and complete a brief questionnaire about your target roles and career goals.' },
      { title: 'Review & Feedback', desc: 'Your recruiter provides detailed written feedback within 3 business days.' },
      { title: 'Revise & Approve', desc: 'You revise your resume based on feedback and we confirm it is ready for the job market.' },
    ],
    cta: { primary: 'Get a Resume Review', href: '/register/candidate', secondary: 'Learn More', href2: '/contact' },
  },
  'interview-coaching': {
    tagline: 'Technical and behavioural interview preparation for engineering roles',
    audience: 'candidate',
    intro: 'Engineering interviews often include technical screening questions, software proficiency demos, and project walk-throughs in addition to standard behavioural competency questions. Our interview coaching prepares you for all components, with firm-specific briefings for every interview we arrange.',
    includes: [
      'Firm-specific briefing before every interview: culture, team, projects, interview format',
      'Technical question coaching tailored to your discipline and experience level',
      'STAR framework coaching for behavioural and competency questions',
      'Salary expectation framing and negotiation language',
      'Mock interview session with detailed feedback (available for senior roles)',
      'Post-interview debrief and guidance on next steps',
    ],
    steps: [
      { title: 'Pre-Interview Briefing', desc: 'Before every interview, we provide a detailed brief on the firm, the interviewer, the format, and the technical areas likely to be covered.' },
      { title: 'Preparation Session', desc: 'We conduct a focused coaching session on the specific technical and behavioural questions most relevant to the role.' },
      { title: 'Post-Interview Review', desc: 'We debrief after the interview, gather employer feedback, and adjust approach for subsequent rounds.' },
    ],
    cta: { primary: 'Register as a Candidate', href: '/register/candidate', secondary: 'Browse Jobs', href2: '/jobs' },
  },
  'salary-negotiation': {
    tagline: 'Market-data-driven salary negotiation support for engineers',
    audience: 'candidate',
    intro: 'Engineers consistently leave compensation on the table by accepting initial offers without negotiating. Our salary negotiation support provides you with market data, negotiation scripts, and real-time coaching to ensure you secure the best possible total compensation package.',
    includes: [
      'Salary benchmarking report for your specific role, discipline, experience level, and geography',
      'Total compensation analysis: base salary, bonus, benefits, PE exam support, relocation',
      'Negotiation strategy and scripting tailored to your specific offer',
      'Counter-offer coaching: how to respond to pushback',
      'Multiple offer comparison framework if you receive competing proposals',
      'Available throughout the entire offer stage, with same-day response for urgent negotiations',
    ],
    steps: [
      { title: 'Share the Offer', desc: 'Share the offer details with your recruiter (confidentially). We research comparable market data within 24 hours.' },
      { title: 'Strategy Session', desc: 'We review the offer together, identify negotiation opportunities, and develop your specific counter-offer strategy.' },
      { title: 'Negotiation Support', desc: 'We coach you through the negotiation in real time, available by phone or text throughout the process.' },
    ],
    cta: { primary: 'Register as a Candidate', href: '/register/candidate', secondary: 'View Salary Guide', href2: '/salary-guide' },
  },
  'career-roadmap': {
    tagline: 'Long-term career planning and PE roadmap consultation',
    audience: 'candidate',
    intro: 'Not ready to change jobs today? Our career roadmap consultations help civil engineers at any stage plan their path to the next level — whether that means targeting PE licensure, transitioning to a new discipline, moving from consultancy to government, or positioning for a leadership role.',
    includes: [
      'One-on-one career consultation with an experienced civil engineering recruiter',
      'PE licensure timeline planning and state-specific guidance',
      'Discipline transition roadmap for engineers considering a practice area change',
      'Salary trajectory modelling: what should you be earning in 2, 5, and 10 years?',
      'Target employer identification and long-term positioning strategy',
      'Annual check-in and roadmap update included for 12 months',
    ],
    steps: [
      { title: 'Initial Consultation', desc: 'A 60-minute career consultation to understand where you are, where you want to go, and what is holding you back.' },
      { title: 'Roadmap Development', desc: 'We produce a written career roadmap with 12, 24, and 60-month milestones and specific action steps.' },
      { title: 'Annual Review', desc: 'We check in 12 months later to review progress, adjust the roadmap, and identify new opportunities.' },
    ],
    cta: { primary: 'Book a Consultation', href: '/contact', secondary: 'Submit Your Resume', href2: '/register/candidate' },
  },
  'unlisted-roles': {
    tagline: 'Access roles that never appear on public job boards',
    audience: 'candidate',
    intro: 'Many of the most coveted engineering positions are filled before they are ever advertised. Our unlisted roles programme gives registered candidates first access to confidential searches, exclusive positions, and direct referrals to hiring managers — opportunities that are completely invisible to candidates who search only on job boards.',
    includes: [
      'Priority consideration for all confidential and exclusive searches in your discipline',
      'Direct recruiter introductions to hiring managers at target firms',
      'Early notification of upcoming roles before public posting',
      'Access to positions being filled through the CCPromoters retained search practice',
      'Confidential exploration: we approach firms on your behalf without revealing your identity until you approve',
      'No applications, no ATS queues — direct recruiter-to-hiring-manager placement',
    ],
    steps: [
      { title: 'Register Your Profile', desc: 'Complete your candidate profile including disciplines, experience level, geographic preferences, and target firm types.' },
      { title: 'Recruiter Match', desc: 'You are matched with a specialist recruiter in your discipline who maintains active relationships with hiring managers at your target firms.' },
      { title: 'Exclusive Introductions', desc: 'When a matching unlisted opportunity arises, your recruiter approaches the firm on your behalf — with your approval — and facilitates a direct introduction.' },
    ],
    cta: { primary: 'Register as a Candidate', href: '/register/candidate', secondary: 'Browse Open Roles', href2: '/jobs' },
    testimonial: { quote: 'My role was never posted anywhere. My recruiter knew the firm was about to expand and introduced me before they even wrote the job description.', author: 'Marcus Chen', title: 'Senior Structural Engineer, PE — Placed in Austin, TX' },
  },
  'employer-branding': {
    tagline: 'Build a talent brand that attracts the best candidates before they search',
    audience: 'employer',
    intro: 'Top candidates choose employers, not just jobs. Our employer branding service helps you articulate your culture, values, and employee value proposition (EVP) in a way that resonates with the professionals you want to hire. From careers page copy to LinkedIn presence, we make your company the place the best candidates want to work.',
    includes: [
      'EVP discovery workshop with your leadership team',
      'Competitor employer brand analysis',
      'Careers page copywriting and content strategy',
      'LinkedIn company page audit and optimisation',
      'Job description tone-of-voice refresh across all open roles',
      'Social media content calendar for talent-focused content',
      'Candidate testimonial and team spotlight creation',
    ],
    steps: [
      { title: 'Discovery', desc: 'A workshop with your leadership to uncover what makes your company a great place to work and what your ideal candidates care about most.' },
      { title: 'Strategy & Content', desc: 'We craft your EVP, update your careers page, and build a content plan that tells your employer story consistently across every channel.' },
      { title: 'Launch & Measure', desc: 'We help you roll out the refreshed brand and track application quality and volume over the following 90 days.' },
    ],
    cta: { primary: 'Get Started', href: '/contact', secondary: 'Learn More', href2: '/about' },
    testimonial: { quote: 'After our employer branding refresh, we saw a 40% increase in qualified inbound applications within the first quarter.', author: 'Daniel Marsh', title: 'Head of People, Crestline Solutions' },
  },
  'outplacement': {
    tagline: 'Supporting your people through career transitions with dignity and direction',
    audience: 'employer',
    intro: 'When workforce changes are unavoidable, how you support departing employees matters — for them and for your remaining team. Our outplacement service provides professional career transition support that helps affected employees land faster, while protecting your employer reputation and boosting morale among those who stay.',
    includes: [
      'One-to-one career transition coaching sessions',
      'Resume and LinkedIn profile rewrite for each participant',
      'Job search strategy and market positioning guidance',
      'Interview preparation and mock interviews',
      'Access to CCP\'s exclusive job network and recruiter connections',
      'Negotiation coaching for new offers',
      'Progress reporting to HR throughout the programme',
    ],
    steps: [
      { title: 'Programme Setup', desc: 'We work with your HR team to design a programme tailored to the level and volume of employees being supported.' },
      { title: 'Individual Coaching', desc: 'Each participant receives dedicated 1:1 coaching, updated career materials, and introductions to relevant opportunities in our network.' },
      { title: 'Placement & Follow-Up', desc: 'We track each participant\'s landing and provide a summary report to your HR team on placement outcomes.' },
    ],
    cta: { primary: 'Request a Proposal', href: '/contact', secondary: 'View All Services', href2: '/services' },
  },
};

async function getService(slug: string) {
  const { data } = await insforge.database.from('services').select('*').eq('slug', slug).maybeSingle();
  return data;
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const content = serviceContent[slug];
  if (!content) notFound();

  const service = await getService(slug);
  const svc = (service as { id: string; slug: string; title: string; description: string; audience: string } | null) ?? {
    id: slug, slug, title: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), description: '', audience: content.audience,
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className={`py-20 px-4 ${content.audience === 'employer' ? 'bg-[#0D0D0D]' : 'bg-gradient-to-r from-[#CC1016] to-[#A80D12]'}`}>
        <div className="max-w-4xl mx-auto">
          <Link href="/services" className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-6 transition-colors">← All Services</Link>
          <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${content.audience === 'employer' ? 'bg-[#CC1016]/20 text-[#CC1016]' : 'bg-white/20 text-white'}`}>
            {content.audience === 'employer' ? 'For Employers' : 'For Candidates'}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>{svc.title}</h1>
          <p className="text-white/80 text-xl">{content.tagline}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>About This Service</h2>
              <p className="text-[#6B6B6B] leading-relaxed text-lg">{content.intro}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0D0D0D] mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>What&apos;s Included</h2>
              <ul className="space-y-3">
                {content.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-[#CC1016] shrink-0 mt-0.5" />
                    <span className="text-[#6B6B6B]">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0D0D0D] mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>How It Works</h2>
              <div className="grid md:grid-cols-3 gap-5">
                {content.steps.map((step, i) => (
                  <div key={i} className="bg-[#F5F5F5] rounded-xl p-5 border border-[#E5E5E5]">
                    <div className="w-8 h-8 bg-[#CC1016] text-white rounded-full flex items-center justify-center font-bold text-sm mb-3">{i + 1}</div>
                    <h3 className="font-bold text-[#0D0D0D] mb-2">{step.title}</h3>
                    <p className="text-[#6B6B6B] text-sm">{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {content.testimonial && (
              <section className="bg-[#0D0D0D] rounded-2xl p-8">
                <blockquote className="text-white text-lg leading-relaxed mb-4">&ldquo;{content.testimonial.quote}&rdquo;</blockquote>
                <div>
                  <p className="text-[#CC1016] font-semibold">{content.testimonial.author}</p>
                  <p className="text-white/60 text-sm">{content.testimonial.title}</p>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#CC1016] rounded-xl p-6 text-white">
              <h3 className="font-bold text-lg mb-3">Get Started Today</h3>
              <p className="text-white/85 text-sm mb-5">Speak to a specialist recruiter about your specific needs.</p>
              <Link href={content.cta.href} className="block w-full text-center bg-white text-[#CC1016] font-bold py-3 rounded-lg hover:bg-white/90 transition-colors mb-3">{content.cta.primary}</Link>
              <Link href={content.cta.href2} className="block w-full text-center border border-white/50 text-white font-semibold py-3 rounded-lg hover:bg-white/10 transition-colors">{content.cta.secondary}</Link>
            </div>

            <div className="bg-[#F5F5F5] rounded-xl p-6 border border-[#E5E5E5]">
              <h3 className="font-bold text-[#0D0D0D] mb-3">Related Services</h3>
              <ul className="space-y-2">
                {Object.entries(serviceContent)
                  .filter(([k, v]) => k !== slug && v.audience === content.audience)
                  .slice(0, 4)
                  .map(([k, v]) => (
                    <li key={k}>
                      <Link href={`/services/${k}`} className="text-[#CC1016] hover:underline text-sm font-medium">
                        {(v as { tagline: string; audience: string; intro: string; includes: string[]; steps: { title: string; desc: string }[]; cta: { primary: string; href: string; secondary: string; href2: string }; testimonial?: { quote: string; author: string; title: string } }) && k.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} →
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
