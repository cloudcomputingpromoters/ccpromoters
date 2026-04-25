export default function InsightsIllustration() {
  return (
    <svg viewBox="0 0 480 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <defs>
        <filter id="ii-glow-sm" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="ii-glow-xs" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <radialGradient id="ii-bg" cx="45%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#071A3E"/><stop offset="100%" stopColor="#030D20"/>
        </radialGradient>
        <linearGradient id="ii-card-a" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0A2450"/><stop offset="100%" stopColor="#061530"/>
        </linearGradient>
        <linearGradient id="ii-trend" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#CC1016" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#CC1016" stopOpacity="0.7"/>
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="480" height="340" fill="url(#ii-bg)" rx="14"/>

      {/* Blueprint grid */}
      {Array.from({length:11},(_,i)=>(
        <line key={`gv${i}`} x1={i*48} y1="0" x2={i*48} y2="340" stroke="#1E3A8A" strokeOpacity="0.1" strokeWidth="0.5"/>
      ))}
      {Array.from({length:8},(_,i)=>(
        <line key={`gh${i}`} x1="0" y1={i*48} x2="480" y2={i*48} stroke="#1E3A8A" strokeOpacity="0.1" strokeWidth="0.5"/>
      ))}

      {/* Header */}
      <text x="24" y="28" fill="white" fillOpacity="0.25" fontSize="8" fontFamily="monospace" letterSpacing="2">CIVIL ENGINEERING INSIGHTS — CCPromoters</text>
      <line x1="24" y1="33" x2="456" y2="33" stroke="#1E3A8A" strokeOpacity="0.4" strokeWidth="0.5"/>

      {/* ── CARD 1: Bridge Engineering (left) ── */}
      <rect x="22" y="44" width="138" height="200" rx="7" fill="url(#ii-card-a)" stroke="#CC1016" strokeWidth="0.7" strokeOpacity="0.5"/>
      {/* Tag */}
      <rect x="30" y="52" width="80" height="13" rx="6" fill="#CC1016" fillOpacity="0.12"/>
      <text x="70" y="62" textAnchor="middle" fill="#CC1016" fontSize="7" fontFamily="monospace" fontWeight="700" letterSpacing="0.5">BRIDGES</text>
      {/* Mini bridge elevation sketch */}
      <line x1="34"  y1="142" x2="148" y2="142" stroke="#6AAAD0" strokeWidth="0.9" strokeOpacity="0.6"/>
      <rect x="64"  y="100" width="6"  height="42" rx="0.5" fill="none" stroke="#CC1016" strokeWidth="0.8" strokeOpacity="0.7"/>
      <rect x="111" y="100" width="6"  height="42" rx="0.5" fill="none" stroke="#CC1016" strokeWidth="0.8" strokeOpacity="0.7"/>
      <circle cx="67"  cy="101" r="3" fill="#CC1016" fillOpacity="0.7" filter="url(#ii-glow-xs)"/>
      <circle cx="114" cy="101" r="3" fill="#CC1016" fillOpacity="0.7" filter="url(#ii-glow-xs)"/>
      {[36,48,58].map(x=>(<line key={x} x1="67"  y1="103" x2={x} y2="142" stroke="#CC1016" strokeWidth="0.6" strokeOpacity="0.45"/>))}
      {[76,86,96].map(x=>(<line key={x} x1="67"  y1="103" x2={x} y2="142" stroke="#CC1016" strokeWidth="0.6" strokeOpacity="0.45"/>))}
      {[104,114,125].map(x=>(<line key={x} x1="114" y1="103" x2={x} y2="142" stroke="#CC1016" strokeWidth="0.6" strokeOpacity="0.45"/>))}
      {[136,146,148].map(x=>(<line key={x} x1="114" y1="103" x2={x} y2="142" stroke="#CC1016" strokeWidth="0.6" strokeOpacity="0.45"/>))}
      {/* Under-deck */}
      {[34,50,66,82,98,114,130].map((x,i)=>(
        <path key={i} d={`M${x} 142 L${x+8} 152 L${x+16} 142`} stroke="#1A3055" strokeWidth="0.7"/>
      ))}
      {/* Dimension */}
      <line x1="34" y1="158" x2="148" y2="158" stroke="#4A8ACA" strokeWidth="0.4" strokeOpacity="0.4" strokeDasharray="3 2"/>
      <text x="91" y="154" textAnchor="middle" fill="#4A8ACA" fontSize="5.5" fontFamily="monospace" fillOpacity="0.5">SPAN 168m</text>
      {/* Text lines */}
      <rect x="30" y="170" width="108" height="5" rx="2" fill="white" fillOpacity="0.2"/>
      <rect x="30" y="180" width="125" height="4" rx="2" fill="white" fillOpacity="0.12"/>
      <rect x="30" y="189" width="90"  height="4" rx="2" fill="white" fillOpacity="0.1"/>
      <text x="30" y="216" fill="#CC1016" fontSize="7" fontFamily="monospace" fillOpacity="0.7">Read Article →</text>
      <text x="30" y="234" fill="white" fillOpacity="0.2" fontSize="6" fontFamily="monospace">DWG: BRG-INS-01</text>

      {/* ── CARD 2: Structural / Blueprints (center, slightly taller) ── */}
      <rect x="172" y="36" width="138" height="216" rx="7" fill="url(#ii-card-a)" stroke="#3B82F6" strokeWidth="0.7" strokeOpacity="0.55"/>
      <rect x="180" y="44" width="80" height="13" rx="6" fill="#3B82F6" fillOpacity="0.12"/>
      <text x="220" y="54" textAnchor="middle" fill="#60A5FA" fontSize="7" fontFamily="monospace" fontWeight="700" letterSpacing="0.5">STRUCTURAL</text>
      {/* Blueprint building section */}
      {/* Columns */}
      {[188,214,240].map((x,i)=>(
        <g key={i}>
          <rect x={x} y="72" width="7" height="100" rx="0.5" fill="none" stroke="#6AAAD0" strokeWidth="0.9" strokeOpacity="0.6"/>
          <rect x={x-3} y="170" width="13" height="3" rx="0.5" fill="#4A8ACA" fillOpacity="0.4"/>
        </g>
      ))}
      {/* Foundation */}
      <line x1="182" y1="172" x2="252" y2="172" stroke="#6AAAD0" strokeWidth="1.1" strokeOpacity="0.55"/>
      {/* Beams */}
      {[72,108,140].map(y=>(
        <line key={y} x1="182" y1={y} x2="252" y2={y} stroke="#6AAAD0" strokeWidth={y===72?1.2:0.7} strokeOpacity={y===72?0.7:0.45}/>
      ))}
      {/* Window infill */}
      {[[190,76,18,28],[220,76,20,28],[190,113,18,24],[220,113,20,24]].map(([x,y,w,h],i)=>(
        <rect key={i} x={x} y={y} width={w} height={h} rx="1"
          fill="#0A1A30" stroke="#3A6A9A" strokeWidth="0.5" strokeOpacity="0.4"/>
      ))}
      {/* Rebar detail at base */}
      {[188,198,208,218,228,238].map((x,i)=>(
        <line key={i} x1={x} y1="172" x2={x+2} y2="186" stroke="#6AAAD0" strokeWidth="0.6" strokeOpacity="0.4"/>
      ))}
      <line x1="182" y1="186" x2="252" y2="186" stroke="#4A8ACA" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="3 2"/>
      {/* Labels */}
      <text x="258" y="73" fill="#CC1016" fontSize="5.5" fontFamily="monospace" fillOpacity="0.5">+10m</text>
      <text x="258" y="110" fill="#4A8ACA" fontSize="5.5" fontFamily="monospace" fillOpacity="0.4">+6m</text>
      <text x="258" y="142" fill="#4A8ACA" fontSize="5.5" fontFamily="monospace" fillOpacity="0.4">+3m</text>
      {/* Text lines */}
      <rect x="180" y="196" width="120" height="5" rx="2" fill="white" fillOpacity="0.2"/>
      <rect x="180" y="206" width="105" height="4" rx="2" fill="white" fillOpacity="0.12"/>
      <rect x="180" y="215" width="90"  height="4" rx="2" fill="white" fillOpacity="0.1"/>
      <text x="180" y="234" fill="#60A5FA" fontSize="7" fontFamily="monospace" fillOpacity="0.7">Read Article →</text>
      <text x="180" y="245" fill="white" fillOpacity="0.2" fontSize="6" fontFamily="monospace">DWG: STR-INS-02</text>

      {/* ── CARD 3: Site / Urban Planning (right) ── */}
      <rect x="322" y="44" width="138" height="200" rx="7" fill="url(#ii-card-a)" stroke="#CC1016" strokeWidth="0.7" strokeOpacity="0.4"/>
      <rect x="330" y="52" width="80" height="13" rx="6" fill="#CC1016" fillOpacity="0.1"/>
      <text x="370" y="62" textAnchor="middle" fill="#CC1016" fontSize="7" fontFamily="monospace" fontWeight="700" letterSpacing="0.5">URBAN PLAN</text>
      {/* Site plan sketch */}
      {/* Contour lines */}
      <ellipse cx="390" cy="118" rx="44" ry="32" fill="none" stroke="#3B82F6" strokeWidth="0.5" strokeOpacity="0.25"/>
      <ellipse cx="390" cy="118" rx="30" ry="22" fill="none" stroke="#3B82F6" strokeWidth="0.5" strokeOpacity="0.32"/>
      <ellipse cx="390" cy="118" rx="16" ry="12" fill="none" stroke="#3B82F6" strokeWidth="0.7" strokeOpacity="0.42"/>
      {/* Building footprints */}
      <rect x="334" y="90" width="30" height="22" rx="1" fill="none" stroke="#6AAAD0" strokeWidth="0.8" strokeOpacity="0.55"/>
      <rect x="408" y="94" width="24" height="16" rx="1" fill="none" stroke="#6AAAD0" strokeWidth="0.7" strokeOpacity="0.45"/>
      <rect x="338" y="128" width="20" height="16" rx="1" fill="none" stroke="#6AAAD0" strokeWidth="0.7" strokeOpacity="0.45"/>
      {/* Roads */}
      <path d="M322 110 L360 100 L420 104 L450 110" fill="none" stroke="#4A8ACA" strokeWidth="1.2" strokeOpacity="0.45"/>
      <path d="M322 118 L360 108 L420 112 L450 118" fill="none" stroke="#4A8ACA" strokeWidth="1.2" strokeOpacity="0.35"/>
      {/* North indicator */}
      <g transform="translate(444,60)">
        <circle cx="0" cy="0" r="8" fill="none" stroke="#4A8ACA" strokeWidth="0.6" strokeOpacity="0.4"/>
        <polygon points="0,-6 3,-1 0,0 -3,-1" fill="#CC1016" fillOpacity="0.7"/>
        <polygon points="0,0 3,-1 0,7 -3,-1" fill="#1E3A5A"/>
        <text x="0" y="-10" textAnchor="middle" fill="#CC1016" fontSize="6.5" fontFamily="monospace" fillOpacity="0.6">N</text>
      </g>
      {/* Text lines */}
      <rect x="330" y="156" width="110" height="5" rx="2" fill="white" fillOpacity="0.2"/>
      <rect x="330" y="166" width="124" height="4" rx="2" fill="white" fillOpacity="0.12"/>
      <rect x="330" y="175" width="92"  height="4" rx="2" fill="white" fillOpacity="0.1"/>
      <text x="330" y="200" fill="#CC1016" fontSize="7" fontFamily="monospace" fillOpacity="0.7">Read Article →</text>
      <text x="330" y="218" fill="white" fillOpacity="0.2" fontSize="6" fontFamily="monospace">DWG: URB-INS-03</text>

      {/* ── Bottom analytics trend strip ── */}
      <rect x="22" y="262" width="436" height="52" rx="7" fill="#0A1830" stroke="#1E3A8A" strokeWidth="0.6"/>
      <text x="32" y="278" fill="white" fillOpacity="0.3" fontSize="7.5" fontFamily="monospace">READERSHIP TREND</text>
      {/* Sparkline */}
      <path d="M100 288 L132 278 L164 282 L196 268 L228 272 L260 258 L292 264 L324 252 L356 256 L388 244 L420 248 L444 238"
        stroke="url(#ii-trend)" strokeWidth="1.5" fill="none"/>
      {/* Peak dot */}
      <circle cx="444" cy="238" r="4" fill="#CC1016" fillOpacity="0.9" filter="url(#ii-glow-xs)"/>
      <rect x="426" y="228" width="36" height="14" rx="4" fill="#0A1830" stroke="#CC1016" strokeWidth="0.6" strokeOpacity="0.5"/>
      <text x="444" y="238" textAnchor="middle" fill="#CC1016" fontSize="7.5" fontFamily="monospace">↑24%</text>

      {/* Tags strip */}
      {['Salary','Bridges','Geotech','Structural','Urban','Coastal'].map((tag,i)=>(
        <g key={i}>
          <circle cx={34+i*72} cy="305" r="3" fill={i%2===0?'#CC1016':'#3B82F6'} fillOpacity="0.6"/>
          <text x={40+i*72} y="309" fill="white" fillOpacity="0.35" fontSize="7.5" fontFamily="monospace">{tag}</text>
        </g>
      ))}
    </svg>
  );
}
