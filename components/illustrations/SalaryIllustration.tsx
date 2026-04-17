export default function SalaryIllustration() {
  const bars = [
    { label: 'Structural (PE)', min: 95,  max: 185, pct: 0.90, color: '#D4AF37' },
    { label: 'Const. Mgmt',    min: 90,  max: 155, pct: 0.80, color: '#B8960C' },
    { label: 'Geotechnical',   min: 80,  max: 140, pct: 0.68, color: '#3B82F6' },
    { label: 'Transportation', min: 75,  max: 130, pct: 0.58, color: '#60A5FA' },
    { label: 'Environmental',  min: 70,  max: 120, pct: 0.50, color: '#4A8ACA' },
  ];
  const chartH = 155, barW = 44, gap = 24, startX = 52;

  return (
    <svg viewBox="0 0 380 290" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <defs>
        <filter id="sal-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="sal-glow-sm" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <radialGradient id="sal-bg" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#0C1A3A"/><stop offset="100%" stopColor="#050E2A"/>
        </radialGradient>
        {bars.map((bar,i)=>(
          <linearGradient key={i} id={`sal-bar-${i}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%"   stopColor={bar.color} stopOpacity="0.3"/>
            <stop offset="60%"  stopColor={bar.color} stopOpacity="0.7"/>
            <stop offset="100%" stopColor={bar.color} stopOpacity="1"/>
          </linearGradient>
        ))}
      </defs>

      {/* Background */}
      <rect width="380" height="290" fill="url(#sal-bg)" rx="14"/>

      {/* Blueprint frame border */}
      <rect x="6" y="6" width="368" height="278" rx="10" fill="none" stroke="#1E3A8A" strokeWidth="0.8" strokeOpacity="0.5"/>
      <rect x="10" y="10" width="360" height="270" rx="8"  fill="none" stroke="#1E3A8A" strokeWidth="0.4" strokeOpacity="0.3"/>

      {/* Blueprint grid */}
      {Array.from({length:9},(_,i)=>(
        <line key={`gv${i}`} x1={i*44} y1="10" x2={i*44} y2="280" stroke="#1E3A8A" strokeOpacity="0.12" strokeWidth="0.5"/>
      ))}
      {Array.from({length:7},(_,i)=>(
        <line key={`gh${i}`} x1="10" y1={i*44} x2="370" y2={i*44} stroke="#1E3A8A" strokeOpacity="0.12" strokeWidth="0.5"/>
      ))}

      {/* Title */}
      <text x="44" y="28" fill="white" fillOpacity="0.3" fontSize="8"
        fontFamily="monospace" fontWeight="500" letterSpacing="2">2026 CIVIL ENGINEERING SALARIES (USD)</text>

      {/* Chart grid lines and Y-axis labels */}
      {Array.from({length:5},(_,i)=>{
        const y = 46 + i*(chartH/4);
        return (
          <g key={i}>
            <line x1="46" y1={y} x2="340" y2={y} stroke="#1E3A8A" strokeOpacity="0.35" strokeWidth="0.5" strokeDasharray="4 4"/>
            <text x="38" y={y+4} textAnchor="end" fill="white" fillOpacity="0.35" fontSize="8" fontFamily="monospace">${200-i*40}k</text>
          </g>
        );
      })}

      {/* Y axis */}
      <line x1="46" y1="42" x2="46" y2={46+chartH} stroke="#1E3A8A" strokeOpacity="0.6" strokeWidth="1"/>
      {/* X axis */}
      <line x1="46" y1={46+chartH} x2="344" y2={46+chartH} stroke="#1E3A8A" strokeOpacity="0.6" strokeWidth="1"/>

      {/* Bars */}
      {bars.map((bar,i)=>{
        const x = startX + i*(barW+gap);
        const barHeight = bar.pct * chartH;
        const y = 46 + chartH - barHeight;
        return (
          <g key={i}>
            {/* Bar glow */}
            <rect x={x} y={y} width={barW} height={barHeight} rx="3"
              fill={bar.color} fillOpacity="0.12" filter="url(#sal-glow)"/>
            {/* Bar body */}
            <rect x={x} y={y} width={barW} height={barHeight} rx="3"
              fill={`url(#sal-bar-${i})`}/>
            {/* Cap line glow */}
            <rect x={x} y={y} width={barW} height="3" rx="1.5"
              fill={bar.color} filter="url(#sal-glow-sm)"/>
            {/* Max value label */}
            <text x={x+barW/2} y={y-7} textAnchor="middle"
              fill={bar.color} fontSize="8.5" fontFamily="monospace" fontWeight="700">${bar.max}k</text>
            {/* Min value — small */}
            <text x={x+barW/2} y={46+chartH+10} textAnchor="middle"
              fill="white" fillOpacity="0.3" fontSize="6.5" fontFamily="monospace">${bar.min}k</text>
            {/* Discipline label (split onto 2 lines) */}
            {bar.label.split(' ').map((word,wi)=>(
              <text key={wi} x={x+barW/2} y={46+chartH+20+wi*10} textAnchor="middle"
                fill="white" fillOpacity="0.5" fontSize="7" fontFamily="monospace">{word}</text>
            ))}
          </g>
        );
      })}

      {/* Trend line overlay */}
      <path d={`M${startX+22} ${46+chartH-bars[0].pct*chartH} L${startX+barW+gap+22} ${46+chartH-bars[1].pct*chartH} L${startX+2*(barW+gap)+22} ${46+chartH-bars[2].pct*chartH} L${startX+3*(barW+gap)+22} ${46+chartH-bars[3].pct*chartH} L${startX+4*(barW+gap)+22} ${46+chartH-bars[4].pct*chartH}`}
        stroke="#D4AF37" strokeWidth="1.2" strokeOpacity="0.35" fill="none" strokeDasharray="5 3"/>

      {/* ── PE STAMP SEAL (top-right) ── */}
      <g transform="translate(310,46)">
        <circle cx="20" cy="20" r="22" fill="#0A1830" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity="0.6"/>
        <circle cx="20" cy="20" r="17" fill="none" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.4" strokeDasharray="3 2"/>
        {/* PE text */}
        <text x="20" y="17" textAnchor="middle" fill="#D4AF37" fontSize="11" fontFamily="monospace" fontWeight="700" fillOpacity="0.9">PE</text>
        <text x="20" y="28" textAnchor="middle" fill="#D4AF37" fontSize="5.5" fontFamily="monospace" fillOpacity="0.6">LICENSED</text>
        {/* Star marks */}
        {[0,60,120,180,240,300].map((deg,i)=>{
          const rad = (deg-90)*Math.PI/180;
          const sx = 20+20*Math.cos(rad), sy = 20+20*Math.sin(rad);
          return <circle key={i} cx={sx} cy={sy} r="1.5" fill="#D4AF37" fillOpacity="0.5"/>;
        })}
        <circle cx="20" cy="20" r="22" fill="none" stroke="#D4AF37" strokeWidth="4" strokeOpacity="0.05" filter="url(#sal-glow)"/>
      </g>

      {/* ── Hard hat icon (top-left accent) ── */}
      <g transform="translate(16,36)">
        <path d="M0 18 Q0 4 14 2 Q28 4 28 18 Z" fill="#D4AF37" fillOpacity="0.6"/>
        <rect x="-2" y="18" width="32" height="5" rx="2.5" fill="#D4AF37" fillOpacity="0.7"/>
      </g>

      {/* ── Legend bottom ── */}
      <rect x="44" y="258" width="292" height="20" rx="4" fill="#0D1843" stroke="#1E3A8A" strokeWidth="0.6"/>
      <circle cx="58"  cy="268" r="4" fill="#D4AF37"/>
      <text x="67"  y="272" fill="white" fillOpacity="0.5" fontSize="7.5" fontFamily="monospace">Max (PE-licensed)</text>
      <circle cx="175" cy="268" r="4" fill="#4A8ACA"/>
      <text x="184" y="272" fill="white" fillOpacity="0.5" fontSize="7.5" fontFamily="monospace">Entry level</text>
      <text x="256" y="272" fill="#D4AF37" fillOpacity="0.4" fontSize="7" fontFamily="monospace">PE +30%</text>

      {/* Title block corner */}
      <text x="16" y="287" fill="#1E3A8A" fontSize="6" fontFamily="monospace" fillOpacity="0.5">CCPromoters · DWG: SAL-2026</text>
    </svg>
  );
}
