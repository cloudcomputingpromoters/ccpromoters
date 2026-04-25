export default function ContactIllustration() {
  const cities = [
    { x: 200, y: 158, label: 'DAL', primary: true  },
    { x: 145, y: 132, label: 'DEN', primary: false },
    { x: 115, y: 105, label: 'SEA', primary: false },
    { x: 315, y: 172, label: 'NYC', primary: false },
    { x: 290, y: 185, label: 'CHI', primary: false },
    { x: 258, y: 218, label: 'HOU', primary: false },
    { x: 92,  y: 178, label: 'LAX', primary: false },
    { x: 335, y: 202, label: 'MIA', primary: false },
  ];

  // Highway route segments between cities
  const highways = [
    [200,158,145,132],[200,158,258,218],[200,158,290,185],
    [145,132,115,105],[290,185,315,172],[315,172,335,202],
    [92,178,115,105],[200,158,315,172],
  ];

  return (
    <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <defs>
        <filter id="ci-glow-lg" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="ci-glow-sm" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4"  result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="ci-glow-xs" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2"  result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <radialGradient id="ci-bg" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#0D1B55"/><stop offset="100%" stopColor="#050E2B"/>
        </radialGradient>
        <radialGradient id="ci-dal-aura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#CC1016" stopOpacity="0.35"/><stop offset="100%" stopColor="#CC1016" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="ci-envelope-body" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1A3060"/><stop offset="100%" stopColor="#0C1A38"/>
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="400" height="320" fill="url(#ci-bg)" rx="14"/>
      {/* Grid */}
      {Array.from({length:8},(_,i)=>(
        <line key={`gv${i}`} x1={i*57} y1="0" x2={i*57} y2="320" stroke="#1E3A8A" strokeOpacity="0.1" strokeWidth="0.5"/>
      ))}
      {Array.from({length:6},(_,i)=>(
        <line key={`gh${i}`} x1="0" y1={i*64} x2="400" y2={i*64} stroke="#1E3A8A" strokeOpacity="0.1" strokeWidth="0.5"/>
      ))}

      {/* US outline */}
      <path d="M60 90 L75 75 L105 72 L125 68 L155 65 L185 62 L215 60 L245 58 L275 56 L305 58 L330 62 L350 70 L365 80 L368 95 L360 110 L355 125 L360 140 L355 160 L340 175 L325 185 L310 195 L295 205 L275 215 L255 220 L235 215 L215 218 L195 222 L170 218 L145 215 L120 210 L100 205 L80 195 L65 182 L55 165 L52 148 L56 130 L60 110 Z"
        fill="#0A1843" stroke="#1E3A8A" strokeWidth="1" strokeOpacity="0.5"/>

      {/* Highway network lines */}
      {highways.map(([x1,y1,x2,y2],i)=>(
        <g key={i}>
          {/* Highway body */}
          <line x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={i%2===0?'#CC1016':'#3B82F6'} strokeWidth="1.5" strokeOpacity="0.2"/>
          {/* Center line */}
          <line x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={i%2===0?'#CC1016':'#3B82F6'} strokeWidth="0.5" strokeOpacity="0.4" strokeDasharray="5 4"/>
        </g>
      ))}

      {/* Dallas aura */}
      <circle cx="200" cy="158" r="28" fill="url(#ci-dal-aura)" filter="url(#ci-glow-lg)"/>
      <circle cx="200" cy="158" r="16" fill="none" stroke="#CC1016" strokeWidth="1.2" strokeOpacity="0.4"/>
      <circle cx="200" cy="158" r="22" fill="none" stroke="#CC1016" strokeWidth="0.5" strokeOpacity="0.25" strokeDasharray="4 3"/>

      {/* City markers */}
      {cities.map(city=>(
        <g key={city.label}>
          {city.primary ? (
            <>
              {/* Bridge tower marker for Dallas */}
              {/* Tower base */}
              <rect x={city.x-4} y={city.y-18} width="8" height="22" rx="1"
                fill="#CC1016" fillOpacity="0.9" filter="url(#ci-glow-sm)"/>
              {/* Cross brace */}
              <rect x={city.x-8} y={city.y-12} width="16" height="3" rx="1"
                fill="#CC1016" fillOpacity="0.8"/>
              {/* Tower top beacon */}
              <circle cx={city.x} cy={city.y-20} r="4" fill="#CC1016" fillOpacity="0.9" filter="url(#ci-glow-sm)"/>
              {/* Cable stays */}
              <line x1={city.x} y1={city.y-20} x2={city.x-14} y2={city.y+2} stroke="#CC1016" strokeWidth="0.7" strokeOpacity="0.5"/>
              <line x1={city.x} y1={city.y-20} x2={city.x+14} y2={city.y+2} stroke="#CC1016" strokeWidth="0.7" strokeOpacity="0.5"/>
              {/* Deck */}
              <line x1={city.x-16} y1={city.y+2} x2={city.x+16} y2={city.y+2} stroke="#CC1016" strokeWidth="1" strokeOpacity="0.6"/>
              {/* Spike to ground */}
              <line x1={city.x} y1={city.y+2} x2={city.x} y2={city.y+12} stroke="#CC1016" strokeWidth="1.2" strokeOpacity="0.7"/>
              <text x={city.x+14} y={city.y+6} fill="#CC1016" fontSize="9" fontFamily="sans-serif" fontWeight="700">{city.label}</text>
            </>
          ) : (
            <>
              {/* Mini building icon for other cities */}
              <rect x={city.x-5} y={city.y-10} width="10" height="14" rx="1"
                fill="#3B82F6" fillOpacity="0.7" filter="url(#ci-glow-xs)"/>
              {/* Windows */}
              <rect x={city.x-3} y={city.y-8} width="3" height="3" rx="0.5" fill="white" fillOpacity="0.5"/>
              <rect x={city.x+1} y={city.y-8} width="3" height="3" rx="0.5" fill="white" fillOpacity="0.5"/>
              <rect x={city.x-3} y={city.y-3} width="3" height="3" rx="0.5" fill="white" fillOpacity="0.3"/>
              {/* Spike */}
              <line x1={city.x} y1={city.y+4} x2={city.x} y2={city.y+12} stroke="#3B82F6" strokeWidth="1" strokeOpacity="0.5"/>
              <text x={city.x+7} y={city.y+2} fill="white" fillOpacity="0.5" fontSize="7" fontFamily="sans-serif">{city.label}</text>
            </>
          )}
        </g>
      ))}

      {/* ── Hard hat icon (top-right, replacing envelope) ── */}
      <g transform="translate(295,30)">
        {/* Background circle */}
        <circle cx="35" cy="30" r="28" fill="#1A3060" stroke="#CC1016" strokeWidth="0.8" strokeOpacity="0.4"/>
        {/* Hard hat shape */}
        <path d="M15 34 Q15 18 35 16 Q55 18 55 34 Z" fill="#CC1016" fillOpacity="0.85"/>
        <rect x="12" y="34" width="46" height="6" rx="3" fill="#CC1016" fillOpacity="0.9"/>
        {/* Hat band */}
        <line x1="15" y1="32" x2="55" y2="32" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>
        {/* Glow */}
        <circle cx="35" cy="30" r="28" fill="none" stroke="#CC1016" strokeWidth="3" strokeOpacity="0.08" filter="url(#ci-glow-sm)"/>
      </g>
      {/* Dashed signal line from hat to Dallas */}
      <path d="M330 72 Q295 120 200 158" stroke="#CC1016" strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="5 3" fill="none"/>
      <circle cx="330" cy="72" r="3" fill="#CC1016" fillOpacity="0.6"/>

      {/* ── Status bar ── */}
      <rect x="24" y="264" width="352" height="36" rx="8" fill="#0D1843" stroke="#1E3A8A" strokeWidth="0.8"/>
      {/* Left: national coverage */}
      <g transform="translate(38,282)">
        <rect x="-8" y="-8" width="16" height="16" rx="2" fill="#CC1016" fillOpacity="0.15" stroke="#CC1016" strokeWidth="0.7"/>
        <text x="0" y="5" textAnchor="middle" fill="#CC1016" fontSize="8" fontFamily="sans-serif" fontWeight="700">✓</text>
      </g>
      <text x="55" y="286" fill="white" fillOpacity="0.7" fontSize="9" fontFamily="sans-serif">20+ States Covered</text>
      {/* Divider */}
      <rect x="180" y="272" width="1" height="16" fill="#1E3A8A"/>
      {/* Right: response time */}
      <g transform="translate(198,282)">
        <rect x="-8" y="-8" width="16" height="16" rx="2" fill="#3B82F6" fillOpacity="0.15" stroke="#3B82F6" strokeWidth="0.7"/>
        <text x="0" y="5" textAnchor="middle" fill="#60A5FA" fontSize="8" fontFamily="sans-serif">⚡</text>
      </g>
      <text x="215" y="286" fill="white" fillOpacity="0.7" fontSize="9" fontFamily="sans-serif">Response within 1 business day</text>

      {/* Corner particles */}
      {[{x:20,y:20},{x:380,y:20},{x:20,y:300},{x:380,y:300}].map((p,i)=>(
        <circle key={i} cx={p.x} cy={p.y} r="2" fill={i%2===0?'#CC1016':'#3B82F6'} fillOpacity="0.5"/>
      ))}
    </svg>
  );
}
