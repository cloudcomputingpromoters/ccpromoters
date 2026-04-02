import Link from 'next/link';

const disciplines = [
  { name: 'Structural Engineering', slug: 'structural', desc: 'Bridges, buildings, and infrastructure design', color: '#E91E8C', icon: '🏗️' },
  { name: 'Transportation Engineering', slug: 'transportation', desc: 'Highways, traffic, and transit systems', color: '#7C3AED', icon: '🛣️' },
  { name: 'Geotechnical Engineering', slug: 'geotechnical', desc: 'Soil investigation and foundation design', color: '#D97706', icon: '🪨' },
  { name: 'Water Resources & Hydrology', slug: 'water-resources', desc: 'Stormwater, hydrology, and flood control', color: '#0891B2', icon: '💧' },
  { name: 'Environmental Engineering', slug: 'environmental', desc: 'Remediation, air quality, sustainability', color: '#059669', icon: '🌿' },
  { name: 'Wastewater & Utilities', slug: 'wastewater', desc: 'Treatment plants and pipeline infrastructure', color: '#DC2626', icon: '🔧' },
  { name: 'Construction & Project Mgmt', slug: 'construction', desc: 'Field engineering and project delivery', color: '#EA580C', icon: '👷' },
  { name: 'Land Development & Planning', slug: 'land-development', desc: 'Site civil design and urban planning', color: '#4338CA', icon: '🏙️' },
  { name: 'Surveying & Geospatial', slug: 'surveying', desc: 'Land surveying, GIS, and geospatial mapping', color: '#0B1F3A', icon: '📐' },
  { name: 'Coastal & Marine Engineering', slug: 'coastal', desc: 'Shoreline protection and coastal design', color: '#0E7490', icon: '🌊' },
];

export default function DisciplinesSection() {
  return (
    <section className="py-20 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Every Civil Engineering Discipline.{' '}
            <span className="text-[#E91E8C]">One Partner.</span>
          </h2>
          <p className="text-[#4A5568] text-lg mt-3 max-w-2xl mx-auto">
            Deep sector expertise across all 10 major civil engineering specializations — from entry level to principal.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {disciplines.map(d => (
            <Link key={d.slug} href={`/disciplines/${d.slug}`}
              className="group bg-white rounded-xl p-5 border border-[#E2E8F0] hover:border-[#E91E8C] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col gap-3">
              <div className="text-3xl">{d.icon}</div>
              <div>
                <h3 className="font-bold text-[#0B1F3A] text-sm leading-tight mb-1 group-hover:text-[#E91E8C] transition-colors">
                  {d.name}
                </h3>
                <p className="text-[#4A5568] text-xs leading-relaxed">{d.desc}</p>
              </div>
              <div className="mt-auto">
                <span className="text-[#E91E8C] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  View Roles →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/disciplines"
            className="inline-flex items-center gap-2 border-2 border-[#0B1F3A] text-[#0B1F3A] font-semibold px-6 py-3 rounded-lg hover:bg-[#0B1F3A] hover:text-white transition-all">
            Explore All Disciplines
          </Link>
        </div>
      </div>
    </section>
  );
}
