export default function TrustBar() {
  const stats = [
    { value: '326,000+', label: 'Civil Engineers in Our Network' },
    { value: '95%', label: 'Client Satisfaction Rate' },
    { value: '23,600+', label: 'Annual Job Openings' },
    { value: '48 hrs', label: 'Average Candidate Turnaround' },
  ];

  return (
    <section className="bg-[#0D1F6B] border-y border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/10">
          {stats.map(stat => (
            <div key={stat.label} className="text-center px-4">
              <div className="text-[#D4AF37] font-bold text-2xl md:text-3xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {stat.value}
              </div>
              <div className="text-white/60 text-xs md:text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
