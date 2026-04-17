export default function ServicesIllustration() {
  return (
    <svg viewBox="0 0 560 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <defs>
        <filter id="si-glow-sm" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="si-glow-xs" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <radialGradient id="si-bg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#061838"/><stop offset="100%" stopColor="#030D1E"/>
        </radialGradient>
        <linearGradient id="si-card" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0A1E44"/><stop offset="100%" stopColor="#061230"/>
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="560" height="300" fill="url(#si-bg)" rx="14"/>
      {/* Blueprint grid */}
      {Array.from({length:12},(_,i)=>(
        <line key={`bv${i}`} x1={i*50} y1="0" x2={i*50} y2="300" stroke="#1E3A6A" strokeOpacity="0.1" strokeWidth="0.5"/>
      ))}
      {Array.from({length:7},(_,i)=>(
        <line key={`bh${i}`} x1="0" y1={i*50} x2="560" y2={i*50} stroke="#1E3A6A" strokeOpacity="0.1" strokeWidth="0.5"/>
      ))}

      {/* ── PANEL 1: Structural / Permanent Placement ── x=18–178 */}
      <rect x="18" y="20" width="160" height="260" rx="8" fill="url(#si-card)" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.45"/>
      {/* Panel label */}
      <rect x="28" y="30" width="90" height="14" rx="7" fill="#D4AF37" fillOpacity="0.15"/>
      <text x="73" y="41" textAnchor="middle" fill="#D4AF37" fontSize="7.5" fontFamily="monospace" fontWeight="700" letterSpacing="0.5">FOR EMPLOYERS</text>
      {/* Building elevation drawing */}
      {/* Foundation */}
      <line x1="38" y1="245" x2="168" y2="245" stroke="#6AAAD0" strokeWidth="1.2" strokeOpacity="0.6"/>
      <rect x="38" y="245" width="130" height="6" rx="1" fill="#1E3A5A" stroke="#4A8ACA" strokeWidth="0.6" strokeOpacity="0.4"/>
      {/* Columns */}
      {[50,88,126,155].map((x,i)=>(
        <g key={i}>
          <rect x={x} y="115" width="8" height="130" rx="1" fill="none" stroke="#6AAAD0" strokeWidth="0.9" strokeOpacity="0.65"/>
          {/* Column base plate */}
          <rect x={x-3} y="243" width="14" height="3" rx="0.5" fill="#4A8ACA" fillOpacity="0.5"/>
        </g>
      ))}
      {/* Beams — floors */}
      {[115,160,205].map(y=>(
        <line key={y} x1="38" y1={y} x2="170" y2={y} stroke="#6AAAD0" strokeWidth="0.9" strokeOpacity="0.55"/>
      ))}
      {/* Roof beam with moment symbols */}
      <line x1="38" y1="115" x2="170" y2="115" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity="0.6"/>
      <circle cx="70"  cy="115" r="3" fill="none" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.5"/>
      <circle cx="130" cy="115" r="3" fill="none" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.5"/>
      {/* Window fills */}
      {[[54,120,28,36],[96,120,22,36],[54,164,28,36],[96,164,22,36],[130,164,22,36]].map(([x,y,w,h],i)=>(
        <rect key={i} x={x} y={y} width={w} height={h} rx="1"
          fill="#0A2040" stroke="#3A6A9A" strokeWidth="0.6" strokeOpacity="0.5"/>
      ))}
      {/* Structural annotation */}
      <line x1="145" y1="115" x2="175" y2="100" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.4" strokeDasharray="3 2"/>
      <text x="140" y="98" fill="#D4AF37" fontSize="6" fontFamily="monospace" fillOpacity="0.5">PE STAMPED</text>
      {/* Title */}
      <text x="98" y="278" textAnchor="middle" fill="#6AAAD0" fontSize="7" fontFamily="monospace" fillOpacity="0.5">BLDG ELEV — PE-01</text>

      {/* ── Connector arrow (panel 1→2) ── */}
      <g transform="translate(178,150)">
        <line x1="0" y1="0" x2="24" y2="0" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.6"/>
        <circle cx="8"  cy="0" r="2" fill="#D4AF37" fillOpacity="0.5"/>
        <circle cx="16" cy="0" r="2" fill="#D4AF37" fillOpacity="0.6"/>
        <polygon points="24,-4 32,0 24,4" fill="#D4AF37" fillOpacity="0.7"/>
      </g>

      {/* ── PANEL 2: Bridge / Transportation (center, taller) ── x=204–356 */}
      <rect x="204" y="10" width="152" height="280" rx="8" fill="url(#si-card)" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity="0.65"/>
      {/* Center glow */}
      <rect x="204" y="10" width="152" height="280" rx="8" fill="#D4AF37" fillOpacity="0.015" filter="url(#si-glow-sm)"/>
      <text x="280" y="38" textAnchor="middle" fill="#D4AF37" fontSize="9" fontFamily="monospace" fontWeight="700" letterSpacing="0.5">SMART MATCH</text>
      <rect x="220" y="26" width="120" height="16" rx="8" fill="#D4AF37" fillOpacity="0.1"/>
      {/* Bridge cable-stay elevation */}
      {/* Deck */}
      <line x1="218" y1="210" x2="342" y2="210" stroke="#6AAAD0" strokeWidth="1.4" strokeOpacity="0.7"/>
      {/* Road surface */}
      <line x1="218" y1="216" x2="342" y2="216" stroke="#4A8ACA" strokeWidth="0.7" strokeOpacity="0.4" strokeDasharray="8 4"/>
      {/* Left tower */}
      <rect x="256" y="130" width="8" height="80" rx="1" fill="none" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity="0.8"/>
      <rect x="250" y="148" width="20" height="5" rx="1" fill="none" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.6"/>
      {/* Right tower */}
      <rect x="296" y="130" width="8" height="80" rx="1" fill="none" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity="0.8"/>
      <rect x="290" y="148" width="20" height="5" rx="1" fill="none" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.6"/>
      {/* Tower top glows */}
      <circle cx="260" cy="132" r="5" fill="#D4AF37" fillOpacity="0.6" filter="url(#si-glow-xs)"/>
      <circle cx="300" cy="132" r="5" fill="#D4AF37" fillOpacity="0.6" filter="url(#si-glow-xs)"/>
      {/* Cable stays */}
      {[224,238,250].map(x=>(
        <line key={x} x1="260" y1="134" x2={x} y2="210" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.5"/>
      ))}
      {[270,282,296].map(x=>(
        <line key={x} x1="260" y1="134" x2={x} y2="210" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.5"/>
      ))}
      {[264,278,292].map(x=>(
        <line key={x} x1="300" y1="134" x2={x} y2="210" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.5"/>
      ))}
      {[310,324,338].map(x=>(
        <line key={x} x1="300" y1="134" x2={x} y2="210" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.5"/>
      ))}
      {/* Under-deck truss */}
      {[218,234,250,266,282,298,314,330].map((x,i)=>(
        <path key={i} d={`M${x} 210 L${x+8} 222 L${x+16} 210`} stroke="#2A5080" strokeWidth="0.8"/>
      ))}
      {/* Road cross-section below */}
      <text x="280" y="240" textAnchor="middle" fill="#6AAAD0" fontSize="7" fontFamily="monospace" fillOpacity="0.5">CROSS-SECTION A-A</text>
      <line x1="218" y1="246" x2="342" y2="246" stroke="#4A8ACA" strokeWidth="0.4" strokeOpacity="0.4" strokeDasharray="4 3"/>
      {/* Road layers in section */}
      <rect x="230" y="250" width="100" height="4" rx="0" fill="#3A5A7A" fillOpacity="0.4" stroke="#4A8ACA" strokeWidth="0.4"/>
      <rect x="226" y="254" width="108" height="4" rx="0" fill="#2A4060" fillOpacity="0.4" stroke="#4A8ACA" strokeWidth="0.4"/>
      <text x="280" y="270" textAnchor="middle" fill="#4A8ACA" fontSize="6" fontFamily="monospace" fillOpacity="0.4">AC PAVEMENT 50mm</text>
      {/* "AI MATCH" label */}
      <rect x="220" y="78" width="120" height="42" rx="4" fill="#0A1830" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.5"/>
      <text x="280" y="96"  textAnchor="middle" fill="#D4AF37" fontSize="8"  fontFamily="monospace" fillOpacity="0.8">CANDIDATE ⟷ ROLE</text>
      <text x="280" y="112" textAnchor="middle" fill="#6AAAD0" fontSize="7"  fontFamily="monospace" fillOpacity="0.6">DISCIPLINE VERIFIED</text>

      {/* ── Connector arrow (panel 2→3) ── */}
      <g transform="translate(356,150)">
        <line x1="0" y1="0" x2="24" y2="0" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.6"/>
        <circle cx="8"  cy="0" r="2" fill="#D4AF37" fillOpacity="0.5"/>
        <circle cx="16" cy="0" r="2" fill="#D4AF37" fillOpacity="0.6"/>
        <polygon points="24,-4 32,0 24,4" fill="#D4AF37" fillOpacity="0.7"/>
      </g>

      {/* ── PANEL 3: Site / Environmental / Candidate ── x=382–542 */}
      <rect x="382" y="20" width="160" height="260" rx="8" fill="url(#si-card)" stroke="#3B82F6" strokeWidth="0.8" strokeOpacity="0.45"/>
      <rect x="392" y="30" width="90" height="14" rx="7" fill="#3B82F6" fillOpacity="0.15"/>
      <text x="437" y="41" textAnchor="middle" fill="#60A5FA" fontSize="7.5" fontFamily="monospace" fontWeight="700" letterSpacing="0.5">FOR CANDIDATES</text>
      {/* Site plan drawing */}
      {/* Contour lines */}
      <ellipse cx="470" cy="170" rx="55" ry="42" fill="none" stroke="#3B82F6" strokeWidth="0.6" strokeOpacity="0.25"/>
      <ellipse cx="470" cy="170" rx="40" ry="30" fill="none" stroke="#3B82F6" strokeWidth="0.6" strokeOpacity="0.3"/>
      <ellipse cx="470" cy="170" rx="25" ry="18" fill="none" stroke="#3B82F6" strokeWidth="0.7" strokeOpacity="0.4"/>
      <ellipse cx="470" cy="170" rx="12" ry="8"  fill="#3B82F6" fillOpacity="0.1" stroke="#3B82F6" strokeWidth="0.7" strokeOpacity="0.5"/>
      {/* Building footprint on site plan */}
      <rect x="420" y="120" width="42" height="32" rx="1" fill="none" stroke="#6AAAD0" strokeWidth="1" strokeOpacity="0.65"/>
      <line x1="420" y1="130" x2="462" y2="130" stroke="#4A8ACA" strokeWidth="0.5" strokeOpacity="0.4"/>
      <line x1="420" y1="140" x2="462" y2="140" stroke="#4A8ACA" strokeWidth="0.5" strokeOpacity="0.4"/>
      {/* Road access */}
      <path d="M392 200 L430 178 L540 185" fill="none" stroke="#4A8ACA" strokeWidth="1.5" strokeOpacity="0.5"/>
      <path d="M392 206 L430 184 L540 191" fill="none" stroke="#4A8ACA" strokeWidth="1.5" strokeOpacity="0.4"/>
      {/* North arrow */}
      <g transform="translate(516,60)">
        <circle cx="0" cy="0" r="12" fill="none" stroke="#4A8ACA" strokeWidth="0.8" strokeOpacity="0.4"/>
        <polygon points="0,-10 4,-2 0,0 -4,-2" fill="#D4AF37" fillOpacity="0.8"/>
        <polygon points="0,0 4,-2 0,10 -4,-2" fill="#1E3A5A"/>
        <text x="0" y="-15" textAnchor="middle" fill="#D4AF37" fontSize="8" fontFamily="monospace" fillOpacity="0.7">N</text>
      </g>
      {/* Scale bar */}
      <line x1="392" y1="255" x2="462" y2="255" stroke="#4A8ACA" strokeWidth="1" strokeOpacity="0.5"/>
      <line x1="392" y1="251" x2="392" y2="259" stroke="#4A8ACA" strokeWidth="1" strokeOpacity="0.5"/>
      <line x1="427" y1="251" x2="427" y2="259" stroke="#4A8ACA" strokeWidth="1" strokeOpacity="0.5"/>
      <line x1="462" y1="251" x2="462" y2="259" stroke="#4A8ACA" strokeWidth="1" strokeOpacity="0.5"/>
      <text x="392" y="248" fill="#4A8ACA" fontSize="6" fontFamily="monospace" fillOpacity="0.45">0</text>
      <text x="422" y="248" fill="#4A8ACA" fontSize="6" fontFamily="monospace" fillOpacity="0.45">50m</text>
      <text x="455" y="248" fill="#4A8ACA" fontSize="6" fontFamily="monospace" fillOpacity="0.45">100m</text>
      <text x="462" y="270" fill="#6AAAD0" fontSize="7" fontFamily="monospace" fillOpacity="0.5">SITE PLAN — SP-01</text>

      {/* Label strip bottom */}
      <rect x="18" y="272" width="524" height="0" />
    </svg>
  );
}
