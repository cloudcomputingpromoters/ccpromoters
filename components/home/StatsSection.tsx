'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 200, suffix: '+', label: 'Active Jobs', icon: '📋' },
  { value: 94, suffix: '%', label: 'Client Satisfaction Rate', icon: '⭐' },
  { value: 48, suffix: ' hrs', label: 'Average Time to First Candidate', icon: '⚡' },
  { value: 2, suffix: '%', label: 'Engineer Turnover Rate', icon: '📈', note: 'vs 25% national avg' },
];

function CountUp({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(target * ease));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function StatsSection() {
  return (
    <section className="bg-[#0B1F3A] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
            The Numbers Behind Our <span className="text-[#E91E8C]">Track Record</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-bold text-[#E91E8C] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white font-semibold mb-1">{stat.label}</div>
              {stat.note && <div className="text-white/40 text-xs">{stat.note}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
