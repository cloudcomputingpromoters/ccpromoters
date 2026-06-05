export async function generateStaticParams() {
  return [
    'structural','transportation','geotechnical','water-resources',
    'environmental','wastewater','construction','land-development','surveying','coastal',
  ].map(slug => ({ slug }));
}

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, DollarSign, Award } from 'lucide-react';
import { insforge } from '@/lib/insforge';
import { DISCIPLINE_IMAGES } from '@/lib/images';

const disciplineContent: Record<string, {
  fullName: string; tagline: string; color: string;
  about: string[]; roles: { title: string; salary: string }[];
  differentiators: { title: string; desc: string }[];
}> = {
  structural: {
    fullName: 'Structural Engineering', tagline: 'Bridges, buildings & heavy infrastructure', color: 'bg-[#0D0D0D]',
    about: [
      'Structural engineers are the backbone of our built environment, designing the load-bearing systems that keep bridges, buildings, and infrastructure standing safely for generations. From a 100-year-old railroad bridge rehabilitation to a 60-storey glass tower in New York City, structural engineers apply first principles of physics and materials science to solve complex design challenges.',
      'The discipline spans a wide range of project types: highway bridges and overpasses, commercial and residential high-rises, industrial warehouses, sports stadiums, marine structures, and public infrastructure. Each project type demands its own specialised knowledge, software skills, and familiarity with jurisdiction-specific design codes.',
      'CCPromoters has deep roots in the structural engineering sector. Our specialist recruiters have placed structural engineers across every experience level — from recent EIT graduates pursuing their first PE-licensed role to Principal Engineers taking on departmental leadership — in firms ranging from boutique bridge specialists to top-50 ENR firms.',
    ],
    roles: [
      { title: 'Graduate / EIT Structural Engineer', salary: '$60k – $76k' },
      { title: 'Structural Engineer (Mid-Level)', salary: '$90k – $128k' },
      { title: 'Senior Structural Engineer', salary: '$115k – $160k' },
      { title: 'Principal / Lead Structural Engineer', salary: '$145k – $210k+' },
      { title: 'Bridge Design Engineer', salary: '$85k – $140k' },
      { title: 'Structural Project Manager', salary: '$110k – $155k' },
    ],
    differentiators: [
      { title: 'We Know Your Software Stack', desc: 'Our recruiters understand the difference between STAAD.Pro and ETABS workflows, LRFD vs. ASD design methodologies, and the importance of PE licensure state-by-state.' },
      { title: 'Exclusive Access to Hidden Roles', desc: 'Many of our structural engineering searches are conducted confidentially. Register your profile to be considered for roles that never appear on public job boards.' },
      { title: 'Salary Negotiation Support', desc: 'We provide every candidate with current market data and coaching to ensure you negotiate the best possible compensation package.' },
    ],
  },
  transportation: {
    fullName: 'Transportation Engineering', tagline: 'Highways, traffic & transit systems', color: 'bg-[#0D0D0D]',
    about: [
      'Transportation engineers plan, design, and operate the systems that move people and goods — from urban arterial roads to interstate highway interchanges, signalised intersections, bus rapid transit corridors, and rail networks. As cities grow and federal infrastructure investment accelerates, demand for transportation engineers has never been higher.',
      'The discipline spans roadway geometric design, traffic operations analysis, signal timing, transportation demand modelling, and intelligent transportation systems (ITS). Many transportation engineers specialise by project type (highway vs. transit), by phase (planning vs. design vs. construction), or by client (State DOT vs. municipal vs. private developer).',
      'CCPromoters works with State DOTs, engineering consultancies, transit authorities, and traffic engineering firms across the US to source qualified transportation engineers at every level. Our recruiters understand the nuances between AASHTO-based highway design, MUTCD compliance, and the specific standards of agencies like TxDOT, NCDOT, FDOT, and CDOT.',
    ],
    roles: [
      { title: 'Graduate Transportation Engineer', salary: '$58k – $74k' },
      { title: 'Transportation Engineer (EIT)', salary: '$70k – $92k' },
      { title: 'Highway / Roadway Design Engineer', salary: '$85k – $122k' },
      { title: 'Traffic Engineer', salary: '$80k – $115k' },
      { title: 'Senior Transportation Engineer (PE)', salary: '$108k – $152k' },
      { title: 'Transportation Project Manager', salary: '$100k – $145k' },
    ],
    differentiators: [
      { title: 'DOT-Specific Knowledge', desc: 'We understand the differences between working for a State DOT versus a private consultancy, and match candidates to the environment where they will thrive.' },
      { title: 'Contract and Permanent Roles', desc: 'Transportation engineering is uniquely well-suited to contract staffing. We offer both permanent placement and project-based contract roles on active highway programs.' },
      { title: 'Nationwide Network', desc: 'With placements in 15+ states, we have active relationships with the firms hiring transportation engineers right now — not just those posting publicly.' },
    ],
  },
  geotechnical: {
    fullName: 'Geotechnical Engineering', tagline: 'Soils, foundations & slope stability', color: 'bg-[#0D0D0D]',
    about: [
      'Geotechnical engineers investigate, characterise, and model the behaviour of earth materials — soil, rock, and groundwater — to safely design foundations, retaining structures, embankments, and underground infrastructure. Every building, bridge, and highway begins below grade, making geotechnical work a critical first step on any project.',
      'Field work is a defining feature of the discipline. Geotechnical engineers oversee drilling programmes, collect soil samples, conduct in-situ tests, and log field conditions before transitioning to the office to perform analyses using software such as gINT, PLAXIS, and SLIDE. The role blends hands-on site investigation with rigorous analytical and reporting work.',
      'CCPromoters places geotechnical engineers with private consultancies, government agencies, and specialty contractors. Whether you are a recent graduate building your field experience or a Senior PE with deep expertise in complex foundation systems, our network includes firms that match your project preferences and career goals.',
    ],
    roles: [
      { title: 'Graduate Geotechnical Engineer', salary: '$58k – $75k' },
      { title: 'Geotechnical Engineer (EIT)', salary: '$72k – $92k' },
      { title: 'Senior Geotechnical Engineer (PE)', salary: '$105k – $144k' },
      { title: 'Geotechnical Project Manager', salary: '$110k – $148k' },
      { title: 'Geoenvironmental Engineer', salary: '$82k – $115k' },
    ],
    differentiators: [
      { title: 'Field + Office Balance', desc: 'We ask candidates about their preferred split between field investigation and office analysis work, and match them to firms with a compatible project mix.' },
      { title: 'Company Vehicle & Field Perks', desc: 'Many of our geotechnical clients provide company vehicles, safety equipment, and per diem for field assignments — we negotiate these inclusions for you.' },
      { title: 'PE Licensure Support', desc: 'We actively connect EIT candidates to firms with structured PE mentorship programmes, accelerating the path to full licensure.' },
    ],
  },
  'water-resources': {
    fullName: 'Water Resources & Hydrology', tagline: 'Stormwater, hydrology & flood control', color: 'bg-[#0D0D0D]',
    about: [
      'Water resources engineers apply hydrologic and hydraulic principles to manage, analyse, and design systems that control and utilise water — from stormwater drainage networks and flood control channels to detention basins, culverts, and watershed management plans. With climate change intensifying rainfall events and sea-level rise threatening coastal communities, demand for water resources expertise is at an all-time high.',
      'The discipline is highly computational, with engineers using software such as HEC-HMS, HEC-RAS, SWMM, and ArcGIS to model rainfall-runoff relationships, floodplain extents, and hydraulic performance of structures. Regulatory experience — particularly with FEMA flood zone work, SFWMD permitting, or municipal stormwater programmes — is highly valued.',
      'CCPromoters places water resources engineers with private consultancies, government agencies, and water management districts. We understand the permitting requirements of major regional regulators and can match candidates to firms where their specific expertise is most valued.',
    ],
    roles: [
      { title: 'Graduate Water Resources Engineer', salary: '$58k – $74k' },
      { title: 'Stormwater / Hydrology Engineer', salary: '$80k – $114k' },
      { title: 'Senior Water Resources Engineer (PE)', salary: '$100k – $140k' },
      { title: 'Floodplain Management Specialist', salary: '$85k – $118k' },
      { title: 'Water Resources Project Manager', salary: '$108k – $148k' },
    ],
    differentiators: [
      { title: 'Regulatory Expertise Match', desc: 'We match candidates to clients whose primary regulatory environment aligns with the candidate\'s permitting experience — SFWMD, USACE, FEMA, or municipal stormwater.' },
      { title: 'Software Proficiency Screening', desc: 'We verify HEC-HMS, HEC-RAS, SWMM, and ArcGIS proficiency levels before presenting candidates to clients, saving firms time in technical screening.' },
      { title: 'Remote & Hybrid Opportunities', desc: 'Many water resources roles involve deliverable-focused office work that lends itself to hybrid or partial-remote arrangements — we actively source these for candidates who prefer flexibility.' },
    ],
  },
  environmental: {
    fullName: 'Environmental Engineering', tagline: 'Remediation, air quality & sustainability', color: 'bg-[#0D0D0D]',
    about: [
      'Environmental engineers protect human health and the natural environment by managing contamination, designing remediation systems, assessing environmental impacts, and ensuring regulatory compliance. The discipline spans Phase I and II Environmental Site Assessments, remedial investigation and feasibility studies, air emissions modelling, and sustainability consulting.',
      'Environmental engineering sits at the intersection of chemistry, biology, and civil engineering. Project types include brownfield redevelopment, underground storage tank removal, industrial facility compliance, NPDES permitting, and CEQA/NEPA documentation. Contract roles are particularly common in this discipline, with firms staffing up for specific remediation programmes.',
      'CCPromoters recruits environmental engineers for private consultancies, government agencies, and remediation contractors. Our specialist recruiters understand the difference between RCRA and CERCLA remediation, can assess IEPA versus NJDEP regulatory experience, and know which firms offer the most interesting project portfolios.',
    ],
    roles: [
      { title: 'Environmental Scientist / Engineer', salary: '$65k – $95k' },
      { title: 'Site Remediation Engineer', salary: '$80k – $112k' },
      { title: 'Senior Environmental Engineer (PE)', salary: '$95k – $135k' },
      { title: 'Environmental Project Manager', salary: '$100k – $140k' },
      { title: 'Contract Environmental Engineer', salary: '$55 – $90/hr' },
    ],
    differentiators: [
      { title: 'Contract & Permanent Options', desc: 'Environmental engineering is a contract-heavy discipline. We maintain active relationships with firms staffing 6–24 month remediation programmes across the Midwest, Northeast, and Southeast.' },
      { title: 'Regulatory Jurisdiction Matching', desc: 'Environmental regulations vary dramatically by state. We match candidates based on their specific state regulatory experience to minimise client onboarding time.' },
      { title: 'Confidential Searches', desc: 'Many of our environmental engineering searches are conducted for clients who prefer not to advertise — register your profile to access the full opportunity set.' },
    ],
  },
  wastewater: {
    fullName: 'Wastewater & Utilities', tagline: 'Treatment plants, pipelines & utilities', color: 'bg-[#0D0D0D]',
    about: [
      'Wastewater engineers design, upgrade, and operate the treatment systems and distribution infrastructure that manage used water from homes, commercial buildings, and industrial facilities. With an ageing national wastewater infrastructure requiring substantial investment, the sector is experiencing strong hiring demand — particularly for engineers with biological nutrient removal (BNR) and biosolids management expertise.',
      'The discipline includes wastewater treatment plant process design, collection system hydraulic modelling, pump station design, force main engineering, and regulatory compliance with EPA and state environmental agencies. Process modelling software such as BioWin and GPS-X is increasingly valued, as firms move toward data-driven optimisation of treatment plant operations.',
      'CCPromoters places wastewater engineers with municipal engineering consultancies, water utilities, and government agencies. Our recruiters understand NPDES permit requirements, nutrient removal regulations, and the difference between planning, design, and construction-phase engineering roles.',
    ],
    roles: [
      { title: 'Wastewater Process Engineer', salary: '$78k – $115k' },
      { title: 'Collection Systems Engineer', salary: '$75k – $108k' },
      { title: 'Senior Wastewater Engineer (PE)', salary: '$105k – $148k' },
      { title: 'Utilities Project Manager', salary: '$110k – $150k' },
      { title: 'Water / Wastewater Modeller', salary: '$80k – $118k' },
    ],
    differentiators: [
      { title: 'Municipal Client Network', desc: 'We have established relationships with the engineering consultancies and municipal utilities that manage the largest wastewater infrastructure programmes in the US.' },
      { title: 'Process Modelling Expertise', desc: 'We actively screen for BioWin and GPS-X proficiency, connecting process modellers with firms investing in advanced nutrient removal and resource recovery.' },
      { title: 'Career Progression Focus', desc: 'Wastewater is a discipline with a clear path from project engineer to project manager to department lead. We match candidates to firms with documented career development tracks.' },
    ],
  },
  construction: {
    fullName: 'Construction & Project Management', tagline: 'Field engineering & project delivery', color: 'bg-[#0D0D0D]',
    about: [
      'Construction and project management engineers bridge the gap between engineering design and physical delivery. Working on-site, in project offices, and in client-facing roles, they coordinate subcontractors, track schedule and cost performance, manage submittals and RFIs, and ensure that what is built matches what was designed. Heavy civil construction — roads, bridges, utilities, earthworks — is the primary focus of CCPromoters\' construction practice.',
      'The discipline includes field engineering, construction management, resident engineering, owner\'s representative services, and programme management. Key tools include Primavera P6 for scheduling, Procore for project management, and a thorough understanding of agency-specific construction standards such as TxDOT, FDOT, NCDOT, and Caltrans.',
      'CCPromoters places construction engineers with general contractors, engineering consultancies, government agencies (in resident engineer roles), and owners\' representative firms. We understand the difference between CM-at-Risk, design-build, and traditional design-bid-build delivery, and match candidates to programmes that fit their career goals.',
    ],
    roles: [
      { title: 'Field Engineer (Entry)', salary: '$65k – $90k' },
      { title: 'Construction Manager', salary: '$95k – $140k' },
      { title: 'Resident Engineer', salary: '$90k – $130k' },
      { title: 'Senior Construction Manager', salary: '$115k – $155k' },
      { title: 'Programme / Project Director', salary: '$140k – $185k+' },
    ],
    differentiators: [
      { title: 'Active Heavy Civil Network', desc: 'We are actively filling construction positions on highway, bridge, and utilities programmes across TX, FL, NC, AZ, and CO — with 48-hour candidate delivery for urgent needs.' },
      { title: 'Per Diem & Travel Negotiation', desc: 'Construction roles often involve travel and site relocation. We negotiate per diem, housing allowances, and company vehicle provisions as standard for field assignments.' },
      { title: 'Agency Standards Knowledge', desc: 'We screen for state DOT-specific construction experience, matching candidates to programmes where their agency familiarity shortens the onboarding curve.' },
    ],
  },
  'land-development': {
    fullName: 'Land Development & Urban Planning', tagline: 'Site civil, entitlements & planning', color: 'bg-[#0D0D0D]',
    about: [
      'Land development engineers design the site infrastructure that transforms raw land into usable, permitted development — residential subdivisions, commercial centres, mixed-use projects, and industrial parks. Their work spans grading and drainage design, utility layout, erosion and sediment controls, and coordination with local authorities on permitting and approvals.',
      'Urban planners and entitlement specialists navigate the regulatory environment that governs land use — zoning, general plan amendments, CEQA/NEPA documentation, conditional use permits, and public hearing processes. In markets like Texas, Florida, and California, where development pressure is intense, this expertise is in exceptional demand.',
      'CCPromoters places both site civil engineers (design-focused, Civil 3D proficient) and urban planners / entitlement specialists (regulatory-focused, AICP-certified) with private developers, engineering consultancies, and municipal planning departments. We understand the full land development workflow from acquisition to construction.',
    ],
    roles: [
      { title: 'Site Civil / Land Development Engineer', salary: '$80k – $115k' },
      { title: 'Urban Planner / Entitlement Specialist', salary: '$78k – $108k' },
      { title: 'Senior Land Development Engineer (PE)', salary: '$105k – $140k' },
      { title: 'Development Project Manager', salary: '$110k – $148k' },
      { title: 'Civil 3D Design Engineer', salary: '$75k – $108k' },
    ],
    differentiators: [
      { title: 'Local Regulatory Knowledge', desc: 'Land development is hyper-local. We match candidates based on their experience with specific jurisdictions — Austin COA, LA County, Broward County, Travis County — where their relationships accelerate approvals.' },
      { title: 'Private Developer Network', desc: 'Beyond consultancies, we place directly with private developers and home-builders who maintain in-house engineering teams with strong compensation and career growth.' },
      { title: 'Civil 3D & BIM Skills', desc: 'We verify Civil 3D proficiency as a standard part of candidate screening for land development roles, ensuring clients receive production-ready engineers.' },
    ],
  },
  surveying: {
    fullName: 'Surveying & Geospatial', tagline: 'Land survey, GIS & LiDAR mapping', color: 'bg-[#0D0D0D]',
    about: [
      'Land surveyors and geospatial professionals measure, map, and document the physical world — establishing legal property boundaries, producing topographic surveys for engineering design, and creating the spatial datasets that underpin infrastructure planning. The discipline is evolving rapidly with technology: drone-based LiDAR, mobile mapping systems, and GIS analytics are transforming traditional survey practice.',
      'GIS analysts work closely with civil engineers and environmental scientists to produce spatial analyses, manage infrastructure asset data, support permitting documentation, and create public-facing maps and visualisations. The intersection of GIS with civil engineering is a fast-growing career path, particularly as state and local governments invest in digital infrastructure management.',
      'CCPromoters places licensed land surveyors, party chiefs, survey technicians, GIS analysts, and remote sensing specialists with engineering consultancies, government agencies, and utility companies. Our recruiters understand the difference between boundary, topographic, construction, and as-built survey work.',
    ],
    roles: [
      { title: 'Survey Technician / Crew Member', salary: '$48k – $68k' },
      { title: 'Party Chief', salary: '$65k – $90k' },
      { title: 'GIS Analyst', salary: '$62k – $92k' },
      { title: 'Licensed Land Surveyor (PLS)', salary: '$85k – $120k' },
      { title: 'Remote Sensing / LiDAR Specialist', salary: '$72k – $105k' },
    ],
    differentiators: [
      { title: 'Technology-Forward Firms', desc: 'We specifically identify and partner with survey firms investing in drone LiDAR, mobile mapping, and scan-to-BIM workflows — connecting technology-minded surveyors to the right environments.' },
      { title: 'GISP & PLS Exam Support', desc: 'Many of our clients offer exam fee reimbursement and paid study time for GISP and PLS licensure candidates. We highlight these opportunities in our candidate briefings.' },
      { title: 'Field + Office Balance', desc: 'We ask about your preferred field-to-office ratio and match you to firms where the project mix aligns with your career goals and lifestyle.' },
    ],
  },
  coastal: {
    fullName: 'Coastal & Marine Engineering', tagline: 'Shoreline protection & coastal resilience', color: 'bg-[#0D0D0D]',
    about: [
      'Coastal engineers work at the dynamic interface between land and sea, designing structures and systems that manage the forces of waves, currents, tides, and storm surge. Their work includes shoreline protection structures (seawalls, revetments, breakwaters), beach nourishment programmes, living shoreline solutions, inlet navigation channels, and coastal flooding risk assessments.',
      'Climate change has elevated coastal engineering to a strategic priority for state and federal agencies along both US coastlines. FEMA-funded flood mitigation, USACE beach nourishment projects, and state-level coastal resilience programmes are generating consistent hiring demand for engineers with wave modelling, sediment transport, and regulatory permitting experience.',
      'CCPromoters places coastal and marine engineers in Florida, the Gulf Coast, the Mid-Atlantic, and the Pacific Northwest. Our recruiters understand USACE Section 404 / 10 permitting, FDEP CAMA requirements, and the major numerical modelling tools used in the discipline — MIKE, Delft3D, ADCIRC, and SWAN.',
    ],
    roles: [
      { title: 'Coastal Engineer (EIT/PE)', salary: '$75k – $120k' },
      { title: 'Senior Coastal / Marine Engineer', salary: '$105k – $148k' },
      { title: 'Coastal Modelling Specialist', salary: '$90k – $130k' },
      { title: 'Coastal Project Manager', salary: '$115k – $155k' },
      { title: 'Living Shoreline Designer', salary: '$80k – $115k' },
    ],
    differentiators: [
      { title: 'Niche Discipline Expertise', desc: 'Coastal engineering is one of the most specialised civil disciplines. Our recruiters have a dedicated coastal practice and understand the specific technical and regulatory requirements of the sector.' },
      { title: 'USACE & State Agency Permitting', desc: 'We screen for specific regulatory experience — Section 404, FDEP CAMA, Corps Districts — to match candidates to clients where their knowledge immediately adds value.' },
      { title: 'Resilience & Climate Adaptation Projects', desc: 'We connect coastal engineers to firms leading the most innovative resilience programmes in the country, from living shorelines to managed coastal retreat planning.' },
    ],
  },
};

async function getDiscipline(slug: string) {
  const { data } = await insforge.database.from('disciplines').select('*').eq('slug', slug).maybeSingle();
  return data;
}

async function getJobsForDiscipline(slug: string) {
  const { data } = await insforge.database
    .from('jobs')
    .select('id, title, slug, employment_type, location_city, location_state, is_remote, salary_min, salary_max, rate_min, rate_max, license_required, is_featured')
    .eq('discipline_slug', slug)
    .order('is_featured', { ascending: false })
    .order('posted_at', { ascending: false })
    .limit(4);
  return data || [];
}

export default async function DisciplineDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const content = disciplineContent[slug];
  if (!content) notFound();

  const [, jobs] = await Promise.all([getDiscipline(slug), getJobsForDiscipline(slug)]);

  const img = DISCIPLINE_IMAGES[slug];

  function formatSalary(job: { employment_type: string; salary_min: number | null; salary_max: number | null; rate_min: number | null; rate_max: number | null }) {
    if (job.employment_type === 'contract' && job.rate_min && job.rate_max) return `$${job.rate_min}–$${job.rate_max}/hr`;
    if (job.salary_min && job.salary_max) return `$${Math.round(job.salary_min / 1000)}k–$${Math.round(job.salary_max / 1000)}k`;
    return 'Competitive';
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className={`${content.color} relative py-24 px-4 overflow-hidden`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt={content.fullName} className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" />
        <div className="relative max-w-5xl mx-auto">
          <Link href="/disciplines" className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-6 transition-colors">← All Disciplines</Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>{content.fullName}</h1>
          <p className="text-white/80 text-xl mb-8">{content.tagline}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/register/candidate" className="bg-white text-[#0D0D0D] font-semibold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors">Submit Your Resume</Link>
            <Link href={`/jobs?discipline=${slug}`} className="border border-white/50 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
              View {jobs.length > 0 ? `${jobs.length}+` : 'All'} Open Roles
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            {/* About */}
            <section>
              <h2 className="text-2xl font-bold text-[#0D0D0D] mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>About {content.fullName}</h2>
              <div className="space-y-4">
                {content.about.map((para, i) => (
                  <p key={i} className="text-[#6B6B6B] leading-relaxed">{para}</p>
                ))}
              </div>
            </section>

            {/* Why CCPromoters */}
            <section>
              <h2 className="text-2xl font-bold text-[#0D0D0D] mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>Why CCPromoters for {content.fullName}?</h2>
              <div className="grid md:grid-cols-3 gap-5">
                {content.differentiators.map((d, i) => (
                  <div key={i} className="bg-[#F5F5F5] rounded-xl p-5 border border-[#E5E5E5]">
                    <div className="w-8 h-8 bg-[#CC1016] rounded-lg flex items-center justify-center text-white font-bold text-sm mb-3">{i + 1}</div>
                    <h3 className="font-bold text-[#0D0D0D] mb-2">{d.title}</h3>
                    <p className="text-[#6B6B6B] text-sm">{d.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Live jobs */}
            {jobs.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#0D0D0D]" style={{ fontFamily: 'Manrope, sans-serif' }}>Open Roles in {content.fullName}</h2>
                  <Link href={`/jobs?discipline=${slug}`} className="text-[#CC1016] font-semibold hover:underline text-sm">View All →</Link>
                </div>
                <div className="space-y-4">
                  {(jobs as Array<{ id: string; title: string; slug: string; employment_type: string; location_city: string; location_state: string; is_remote: boolean; salary_min: number | null; salary_max: number | null; rate_min: number | null; rate_max: number | null; license_required: string | null; is_featured: boolean }>).map(job => (
                    <Link key={job.id} href={`/jobs/${job.slug}`}
                      className="group flex items-start justify-between gap-4 bg-white border border-[#E5E5E5] rounded-xl p-5 hover:border-[#CC1016] hover:shadow-md transition-all">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[#0D0D0D] group-hover:text-[#CC1016] transition-colors mb-1">{job.title}</h3>
                        <div className="flex flex-wrap gap-3 text-sm text-[#6B6B6B]">
                          <span className="flex items-center gap-1"><MapPin size={13} className="text-[#CC1016]" />
                            {job.is_remote ? 'Remote (US)' : `${job.location_city}, ${job.location_state}`}
                          </span>
                          <span className="flex items-center gap-1"><DollarSign size={13} className="text-[#CC1016]" />{formatSalary(job)}</span>
                          {job.license_required && job.license_required !== 'NONE' && (
                            <span className="flex items-center gap-1"><Award size={13} className="text-[#CC1016]" />{job.license_required}</span>
                          )}
                        </div>
                      </div>
                      <span className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full ${job.employment_type === 'contract' ? 'bg-orange-100 text-orange-700' : 'bg-[#F5F5F5] text-[#0D0D0D]'}`}>
                        {job.employment_type === 'contract' ? 'Contract' : 'Permanent'}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key roles */}
            <div className="bg-[#0D0D0D] rounded-xl p-6 text-white">
              <h3 className="font-bold text-lg mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>Roles We Place</h3>
              <ul className="space-y-3">
                {content.roles.map((r, i) => (
                  <li key={i} className="flex items-start justify-between gap-2 text-sm pb-3 border-b border-white/10 last:border-0">
                    <span className="text-white/85">{r.title}</span>
                    <span className="text-[#CC1016] font-semibold shrink-0">{r.salary}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Submit resume CTA */}
            <div className="bg-[#CC1016] rounded-xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Ready to Make a Move?</h3>
              <p className="text-white/85 text-sm mb-4">Submit your resume and a specialist {content.fullName.toLowerCase()} recruiter will reach out within 48 hours.</p>
              <Link href="/register/candidate" className="block w-full text-center bg-white text-[#CC1016] font-bold py-3 rounded-lg hover:bg-white/90 transition-colors">
                Submit Your Resume
              </Link>
            </div>

            {/* Hire talent CTA */}
            <div className="border-2 border-[#0D0D0D] rounded-xl p-6">
              <h3 className="font-bold text-[#0D0D0D] text-lg mb-2">Hiring {content.fullName} Engineers?</h3>
              <p className="text-[#6B6B6B] text-sm mb-4">We deliver pre-vetted, PE-verified candidates within 48–72 hours of your brief.</p>
              <Link href="/register/employer" className="block w-full text-center bg-[#0D0D0D] text-white font-bold py-3 rounded-lg hover:bg-[#111111] transition-colors">
                Request Talent
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
