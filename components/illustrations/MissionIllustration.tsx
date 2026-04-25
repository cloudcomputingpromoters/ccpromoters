export default function MissionIllustration() {
  return (
    <svg viewBox="0 0 450 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <defs>
        <filter id="mi-glow-lg" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="mi-glow-sm" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4"  result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <radialGradient id="mi-bg" cx="45%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#061838"/><stop offset="100%" stopColor="#030D1E"/>
        </radialGradient>
        <linearGradient id="mi-paper" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0A2A5C"/><stop offset="100%" stopColor="#071A3E"/>
        </linearGradient>
        <linearGradient id="mi-table" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1A2E44"/><stop offset="100%" stopColor="#0E1E2E"/>
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="450" height="420" fill="url(#mi-bg)" rx="14"/>

      {/* Background grid */}
      {Array.from({length:10},(_,i)=>(
        <line key={`gv${i}`} x1={i*50} y1="0" x2={i*50} y2="420" stroke="#1E3A6A" strokeOpacity="0.12" strokeWidth="0.5"/>
      ))}
      {Array.from({length:9},(_,i)=>(
        <line key={`gh${i}`} x1="0" y1={i*52} x2="450" y2={i*52} stroke="#1E3A6A" strokeOpacity="0.12" strokeWidth="0.5"/>
      ))}

      {/* Site ground / floor */}
      <rect x="0" y="340" width="450" height="80" fill="url(#mi-table)"/>
      <line x1="0" y1="340" x2="450" y2="340" stroke="#2A4A6A" strokeWidth="1" strokeOpacity="0.5"/>

      {/* Blueprint paper on table */}
      <rect x="60" y="210" width="330" height="165" rx="4" fill="url(#mi-paper)" stroke="#4A8ACA" strokeWidth="1" strokeOpacity="0.5"/>
      {/* Blueprint grid on paper */}
      {Array.from({length:12},(_,i)=>(
        <line key={`pv${i}`} x1={60+i*28} y1="210" x2={60+i*28} y2="375" stroke="#3A70AA" strokeOpacity="0.2" strokeWidth="0.5"/>
      ))}
      {Array.from({length:7},(_,i)=>(
        <line key={`ph${i}`} x1="60" y1={210+i*24} x2="390" y2={210+i*24} stroke="#3A70AA" strokeOpacity="0.2" strokeWidth="0.5"/>
      ))}

      {/* Bridge elevation drawing on blueprint */}
      {/* Deck line */}
      <line x1="80" y1="310" x2="370" y2="310" stroke="#6AAAD0" strokeWidth="1.2" strokeOpacity="0.7"/>
      {/* Left tower on blueprint */}
      <rect x="140" y="260" width="8" height="50" fill="none" stroke="#6AAAD0" strokeWidth="1" strokeOpacity="0.7"/>
      <rect x="134" y="272" width="20" height="4" rx="1" fill="none" stroke="#6AAAD0" strokeWidth="0.8" strokeOpacity="0.5"/>
      {/* Right tower on blueprint */}
      <rect x="302" y="260" width="8" height="50" fill="none" stroke="#6AAAD0" strokeWidth="1" strokeOpacity="0.7"/>
      <rect x="296" y="272" width="20" height="4" rx="1" fill="none" stroke="#6AAAD0" strokeWidth="0.8" strokeOpacity="0.5"/>
      {/* Cable stays on blueprint */}
      {[90,112,128].map(ax=>(
        <line key={ax} x1="144" y1="262" x2={ax} y2="310" stroke="#4A8ACA" strokeWidth="0.7" strokeOpacity="0.6"/>
      ))}
      {[322,340,360].map(ax=>(
        <line key={ax} x1="306" y1="262" x2={ax} y2="310" stroke="#4A8ACA" strokeWidth="0.7" strokeOpacity="0.6"/>
      ))}
      {/* Road deck below bridge */}
      <line x1="80" y1="322" x2="370" y2="322" stroke="#4A8ACA" strokeWidth="0.6" strokeOpacity="0.4" strokeDasharray="8 4"/>

      {/* Dimension annotations */}
      {/* Span dimension */}
      <line x1="140" y1="330" x2="310" y2="330" stroke="#CC1016" strokeWidth="0.6" strokeOpacity="0.5" strokeDasharray="3 2"/>
      <line x1="140" y1="326" x2="140" y2="334" stroke="#CC1016" strokeWidth="0.8" strokeOpacity="0.5"/>
      <line x1="310" y1="326" x2="310" y2="334" stroke="#CC1016" strokeWidth="0.8" strokeOpacity="0.5"/>
      <text x="225" y="326" textAnchor="middle" fill="#CC1016" fontSize="6.5" fontFamily="monospace" fillOpacity="0.6">170.0m</text>
      {/* Height annotation */}
      <line x1="155" y1="258" x2="155" y2="310" stroke="#CC1016" strokeWidth="0.6" strokeOpacity="0.4" strokeDasharray="3 2"/>
      <text x="158" y="286" fill="#CC1016" fontSize="6" fontFamily="monospace" fillOpacity="0.55">38m</text>
      {/* Elevation label */}
      <text x="70" y="307" fill="#6AAAD0" fontSize="7" fontFamily="monospace" fillOpacity="0.55">±0.000</text>

      {/* Blueprint title block */}
      <rect x="64" y="352" width="120" height="18" rx="2" fill="none" stroke="#3A70AA" strokeWidth="0.6" strokeOpacity="0.4"/>
      <text x="70" y="364" fill="#6AAAD0" fontSize="6.5" fontFamily="monospace" fillOpacity="0.5">BRIDGE ELEVATION — S1</text>
      <rect x="310" y="352" width="76" height="18" rx="2" fill="none" stroke="#3A70AA" strokeWidth="0.6" strokeOpacity="0.4"/>
      <text x="316" y="360" fill="#4A8ACA" fontSize="5.5" fontFamily="monospace" fillOpacity="0.4">SCALE 1:200</text>
      <text x="316" y="368" fill="#4A8ACA" fontSize="5.5" fontFamily="monospace" fillOpacity="0.4">REV C — 2026</text>

      {/* Glow under blueprint */}
      <ellipse cx="225" cy="376" rx="120" ry="8" fill="#1E6AC0" fillOpacity="0.08" filter="url(#mi-glow-lg)"/>

      {/* ENGINEER SILHOUETTES around blueprint */}

      {/* Engineer 1 — left, leaning over blueprint */}
      <g transform="translate(88,215)">
        {/* Hard hat */}
        <path d="M-11 0 Q-11-8 0-10 Q11-8 11 0 Z" fill="white" fillOpacity="0.88"/>
        <rect x="-12" y="0" width="24" height="4" rx="1.5" fill="white" fillOpacity="0.75"/>
        {/* Head */}
        <ellipse cx="0" cy="10" rx="8" ry="9" fill="#243040"/>
        {/* Body — leaning forward */}
        <rect x="-9" y="19" width="18" height="32" rx="3" fill="#1A2A3A" transform="rotate(-8)"/>
        {/* Hi-vis vest */}
        <rect x="-9" y="24" width="18" height="5" rx="1" fill="#CC1016" fillOpacity="0.55" transform="rotate(-8)"/>
        <rect x="-9" y="32" width="18" height="5" rx="1" fill="#CC1016" fillOpacity="0.35" transform="rotate(-8)"/>
        {/* Arm reaching to blueprint */}
        <path d="M8 22 Q20 28 28 42" stroke="#1A2A3A" strokeWidth="10" strokeLinecap="round" fill="none"/>
        {/* Other arm */}
        <rect x="-18" y="19" width="9" height="22" rx="3" fill="#1A2A3A" transform="rotate(-5)"/>
        {/* Hand on blueprint */}
        <ellipse cx="30" cy="44" rx="7" ry="5" fill="#243040"/>
      </g>

      {/* Engineer 2 — center, standing upright */}
      <g transform="translate(225,190)">
        {/* Hard hat */}
        <path d="M-12 0 Q-12-9 0-11 Q12-9 12 0 Z" fill="white" fillOpacity="0.9"/>
        <rect x="-13" y="0" width="26" height="4" rx="1.5" fill="white" fillOpacity="0.78"/>
        {/* Head */}
        <ellipse cx="0" cy="10" rx="8" ry="9" fill="#243040"/>
        {/* Body */}
        <rect x="-10" y="19" width="20" height="36" rx="3" fill="#1A2A3A"/>
        {/* Hi-vis vest */}
        <rect x="-10" y="25" width="20" height="5" rx="1" fill="#CC1016" fillOpacity="0.6"/>
        <rect x="-10" y="34" width="20" height="5" rx="1" fill="#CC1016" fillOpacity="0.35"/>
        {/* Arm holding rolled drawing */}
        <rect x="-18" y="19" width="8" height="26" rx="3" fill="#1A2A3A"/>
        {/* Rolled drawing in hand */}
        <rect x="-24" y="40" width="10" height="18" rx="3" fill="#0A2A5C" stroke="#4A8ACA" strokeWidth="0.8"/>
        <line x1="-22" y1="44" x2="-16" y2="44" stroke="#6AAAD0" strokeWidth="0.6"/>
        <line x1="-22" y1="48" x2="-16" y2="48" stroke="#6AAAD0" strokeWidth="0.6"/>
        <line x1="-22" y1="52" x2="-18" y2="52" stroke="#6AAAD0" strokeWidth="0.6"/>
        {/* Other arm — pointing */}
        <path d="M10 20 Q22 30 36 36" stroke="#1A2A3A" strokeWidth="9" strokeLinecap="round" fill="none"/>
        <ellipse cx="38" cy="37" rx="6" ry="4" fill="#243040"/>
      </g>

      {/* Engineer 3 — right, looking at tablet/clipboard */}
      <g transform="translate(362,202)">
        {/* Hard hat */}
        <path d="M-11 0 Q-11-8 0-10 Q11-8 11 0 Z" fill="white" fillOpacity="0.85"/>
        <rect x="-12" y="0" width="24" height="4" rx="1.5" fill="white" fillOpacity="0.72"/>
        {/* Head */}
        <ellipse cx="0" cy="10" rx="8" ry="9" fill="#243040"/>
        {/* Body */}
        <rect x="-9" y="19" width="18" height="34" rx="3" fill="#1A2A3A"/>
        {/* Hi-vis vest */}
        <rect x="-9" y="24" width="18" height="5" rx="1" fill="#CC1016" fillOpacity="0.5"/>
        <rect x="-9" y="33" width="18" height="5" rx="1" fill="#CC1016" fillOpacity="0.3"/>
        {/* Arms holding clipboard */}
        <rect x="-16" y="20" width="8" height="24" rx="3" fill="#1A2A3A"/>
        <rect x="9"   y="20" width="8" height="24" rx="3" fill="#1A2A3A"/>
        {/* Clipboard */}
        <rect x="-14" y="38" width="28" height="36" rx="3" fill="#0A2A5C" stroke="#4A8ACA" strokeWidth="1"/>
        <rect x="-12" y="34" width="12" height="6" rx="2" fill="#2A5088"/>
        <line x1="-10" y1="44" x2="10" y2="44" stroke="#6AAAD0" strokeWidth="0.7"/>
        <line x1="-10" y1="50" x2="10" y2="50" stroke="#6AAAD0" strokeWidth="0.7"/>
        <line x1="-10" y1="56" x2="5"  y2="56" stroke="#6AAAD0" strokeWidth="0.7"/>
        <line x1="-10" y1="62" x2="8"  y2="62" stroke="#6AAAD0" strokeWidth="0.7"/>
      </g>

      {/* Ground shadows under workers */}
      <ellipse cx="88"  cy="345" rx="22" ry="4" fill="#000" fillOpacity="0.18"/>
      <ellipse cx="225" cy="345" rx="22" ry="4" fill="#000" fillOpacity="0.18"/>
      <ellipse cx="362" cy="345" rx="22" ry="4" fill="#000" fillOpacity="0.18"/>

      {/* Construction site context — safety cones */}
      {[120,176,274,330].map((x,i)=>(
        <g key={i} transform={`translate(${x},338)`}>
          <polygon points="0,-12 -5,0 5,0" fill="#FF6030" fillOpacity="0.7"/>
          <rect x="-6" y="0" width="12" height="3" rx="1" fill="#FF6030" fillOpacity="0.5"/>
          <rect x="-5" y="-7" width="10" height="2" fill="white" fillOpacity="0.4"/>
        </g>
      ))}

      {/* Safety barrier tape across bottom */}
      <line x1="0" y1="342" x2="450" y2="342" stroke="#CC1016" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="12 8"/>

      {/* Ambient glow at blueprint center */}
      <ellipse cx="225" cy="285" rx="80" ry="40" fill="#1E6AC0" fillOpacity="0.06" filter="url(#mi-glow-lg)"/>

      {/* Corner label */}
      <text x="16" y="22" fill="#4A8ACA" fontSize="8" fontFamily="monospace" fillOpacity="0.3" letterSpacing="1.5">SITE REVIEW — CCPromoters</text>
    </svg>
  );
}
