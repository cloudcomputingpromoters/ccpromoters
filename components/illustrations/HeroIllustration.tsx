export default function HeroIllustration() {
  const leftCables  = [55, 95, 135, 165, 215, 255, 290];
  const rightCables = [270, 310, 348, 400, 442, 482, 522];

  return (
    <svg viewBox="0 0 560 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <defs>
        <filter id="h-glow-lg" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="10" result="b" /><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="h-glow-sm" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4"  result="b" /><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="h-glow-xs" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2"  result="b" /><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <radialGradient id="h-sky" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#0C1E4A"/><stop offset="100%" stopColor="#040D20"/>
        </radialGradient>
        <linearGradient id="h-tower" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8AAACE"/><stop offset="100%" stopColor="#3A5A7A"/>
        </linearGradient>
        <linearGradient id="h-deck" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4A6080"/><stop offset="100%" stopColor="#2A4060"/>
        </linearGradient>
        <linearGradient id="h-water" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#07132C"/><stop offset="100%" stopColor="#030A18"/>
        </linearGradient>
        <linearGradient id="h-bp-fade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#061838" stopOpacity="0"/>
          <stop offset="35%" stopColor="#061838" stopOpacity="0.82"/>
          <stop offset="100%" stopColor="#061838" stopOpacity="0.93"/>
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="560" height="420" fill="url(#h-sky)"/>

      {/* Stars */}
      {[{x:30,y:20},{x:80,y:38},{x:145,y:14},{x:202,y:30},{x:318,y:19},{x:392,y:42},{x:454,y:13},{x:512,y:29},{x:62,y:62},{x:264,y:48},{x:424,y:54},{x:544,y:23}].map((s,i)=>(
        <circle key={i} cx={s.x} cy={s.y} r="1" fill="white" fillOpacity="0.35"/>
      ))}

      {/* City skyline background */}
      {[{x:0,w:50,h:130},{x:42,w:28,h:108},{x:64,w:52,h:158},{x:112,w:38,h:125},
        {x:338,w:48,h:142},{x:382,w:36,h:116},{x:414,w:58,h:162},{x:468,w:44,h:132},{x:508,w:52,h:102}
      ].map((b,i)=>(
        <g key={i}>
          <rect x={b.x} y={280-b.h} width={b.w} height={b.h} fill="#0A1530" fillOpacity="0.85"/>
          {[0.3,0.5,0.68,0.8].map((fy,wi)=>(
            <rect key={wi} x={b.x+6+(wi%2)*12} y={280-b.h+b.h*fy} width={5} height={3} rx="0.5"
              fill="#D4AF37" fillOpacity={(i+wi)%3===0?0.35:0}/>
          ))}
        </g>
      ))}

      {/* Water */}
      <rect x="0" y="296" width="560" height="124" fill="url(#h-water)"/>
      {[305,318,333,350,368].map((y,i)=>(
        <line key={i} x1="0" y1={y} x2="560" y2={y} stroke="white" strokeOpacity={0.025+i*0.008} strokeWidth="1"/>
      ))}
      {/* Tower reflections */}
      <rect x="179" y="300" width="12" height="55" fill="#5A7A9A" fillOpacity="0.12"/>
      <rect x="369" y="300" width="12" height="55" fill="#5A7A9A" fillOpacity="0.12"/>

      {/* Under-deck truss */}
      {Array.from({length:18},(_,i)=>{
        const x1=i*32, x2=x1+16, x3=x1+32;
        return <path key={i} d={`M${x1} 292 L${x2} 314 L${x3} 292`} stroke="#1A3055" strokeWidth="1.2" strokeOpacity="0.65"/>;
      })}
      <line x1="0" y1="314" x2="560" y2="314" stroke="#1A3055" strokeWidth="0.8" strokeOpacity="0.5"/>

      {/* Bridge deck */}
      <rect x="0" y="280" width="560" height="12" fill="url(#h-deck)"/>
      {/* Road markings */}
      {[80,160,240,320,400,480].map(x=>(
        <rect key={x} x={x} y="285" width="36" height="2" rx="1" fill="white" fillOpacity="0.1"/>
      ))}
      {/* Deck edge highlight */}
      <line x1="0" y1="280" x2="560" y2="280" stroke="#6A90B0" strokeWidth="0.8" strokeOpacity="0.5"/>

      {/* LEFT TOWER */}
      <rect x="179" y="62" width="12" height="218" fill="url(#h-tower)"/>
      <rect x="165" y="116" width="40" height="7" rx="2" fill="#6A8AAA"/>
      <rect x="170" y="178" width="30" height="5" rx="2" fill="#5A7A9A"/>
      <circle cx="185" cy="64" r="16" fill="#D4AF37" fillOpacity="0.1" filter="url(#h-glow-lg)"/>
      <circle cx="185" cy="64" r="5"  fill="#D4AF37" fillOpacity="0.8" filter="url(#h-glow-sm)"/>
      <rect x="183" y="56" width="4" height="14" rx="1" fill="#D4AF37" fillOpacity="0.9"/>

      {/* RIGHT TOWER */}
      <rect x="369" y="62" width="12" height="218" fill="url(#h-tower)"/>
      <rect x="355" y="116" width="40" height="7" rx="2" fill="#6A8AAA"/>
      <rect x="360" y="178" width="30" height="5" rx="2" fill="#5A7A9A"/>
      <circle cx="375" cy="64" r="16" fill="#D4AF37" fillOpacity="0.1" filter="url(#h-glow-lg)"/>
      <circle cx="375" cy="64" r="5"  fill="#D4AF37" fillOpacity="0.8" filter="url(#h-glow-sm)"/>
      <rect x="373" y="56" width="4" height="14" rx="1" fill="#D4AF37" fillOpacity="0.9"/>

      {/* Cable stays */}
      {leftCables.map((ax,i)=>(
        <line key={i} x1="185" y1="67" x2={ax} y2="282" stroke="#8AAACE" strokeWidth={1.3-i*0.06} strokeOpacity="0.5"/>
      ))}
      {rightCables.map((ax,i)=>(
        <line key={i} x1="375" y1="67" x2={ax} y2="282" stroke="#8AAACE" strokeWidth={1.3-i*0.06} strokeOpacity="0.5"/>
      ))}

      {/* Anchor glints */}
      {[55,290,522].map((x,i)=>(
        <circle key={i} cx={x} cy="282" r="2.5" fill="#D4AF37" fillOpacity="0.5" filter="url(#h-glow-xs)"/>
      ))}

      {/* CONSTRUCTION CRANE */}
      {/* Mast */}
      <rect x="144" y="118" width="8" height="162" fill="#2A4060"/>
      {[130,148,166,184,202,220,238,256].map((y,i)=>(
        <line key={i} x1="144" y1={y} x2="152" y2={y+9} stroke="#3A5070" strokeWidth="0.8"/>
      ))}
      {/* Cab */}
      <rect x="138" y="113" width="20" height="13" rx="2" fill="#3A5878"/>
      <rect x="141" y="115" width="7" height="5" rx="1" fill="#6AAAD0" fillOpacity="0.6"/>
      {/* Counter boom */}
      <rect x="100" y="118" width="44" height="5" rx="2" fill="#2A4060"/>
      <rect x="96"  y="116" width="10" height="4" rx="1" fill="#D4AF37" fillOpacity="0.4"/>
      {/* Main boom */}
      <line x1="152" y1="120" x2="244" y2="108" stroke="#2A4060" strokeWidth="6" strokeLinecap="round"/>
      {/* Hook cable */}
      <line x1="234" y1="111" x2="234" y2="208" stroke="#8AAACE" strokeWidth="1.2"/>
      <path d="M230 208 Q226 217 232 221 Q238 221 238 215" stroke="#8AAACE" strokeWidth="1.5" fill="none"/>
      {/* Warning light on boom tip */}
      <circle cx="244" cy="108" r="3" fill="#FF6040" fillOpacity="0.8" filter="url(#h-glow-xs)"/>

      {/* WORKER SILHOUETTES on bridge deck */}
      {[{x:228,s:1},{x:266,s:1},{x:304,s:0.88}].map(({x,s},i)=>(
        <g key={i} transform={`translate(${x},272) scale(${s})`}>
          {/* Hard hat */}
          <path d="M-9 0 Q-9-6 0-8 Q9-6 9 0 Z" fill="#D4AF37" fillOpacity="0.9"/>
          <rect x="-10" y="0" width="20" height="3" rx="1" fill="#D4AF37" fillOpacity="0.75"/>
          {/* Head */}
          <ellipse cx="0" cy="8" rx="6" ry="7" fill="#243040"/>
          {/* Body */}
          <rect x="-7" y="15" width="14" height="22" rx="2" fill="#1A2A3A"/>
          {/* Hi-vis stripe */}
          <rect x="-7" y="19" width="14" height="4" fill="#D4AF37" fillOpacity="0.45"/>
          {/* Arms */}
          <rect x="-12" y="15" width="5" height="15" rx="2" fill="#1A2A3A"/>
          <rect x="7"   y="15" width="5" height="15" rx="2" fill="#1A2A3A"/>
        </g>
      ))}

      {/* Safety barrier rail */}
      {[0,36,72,108,144,180,216,252,288,324,360,396,432,468,504,540].map(x=>(
        <rect key={x} x={x} y="276" width="3" height="8" rx="0.8" fill="#D4AF37" fillOpacity="0.35"/>
      ))}
      <line x1="0" y1="279" x2="560" y2="279" stroke="#D4AF37" strokeOpacity="0.28" strokeWidth="0.8"/>

      {/* BLUEPRINT OVERLAY — right portion */}
      <rect x="338" y="0" width="222" height="278" fill="url(#h-bp-fade)"/>
      {Array.from({length:12},(_,i)=>(
        <line key={`bv${i}`} x1={338+i*20} y1="0" x2={338+i*20} y2="278" stroke="#4A8ACA" strokeOpacity="0.11" strokeWidth="0.5"/>
      ))}
      {Array.from({length:14},(_,i)=>(
        <line key={`bh${i}`} x1="338" y1={i*20} x2="560" y2={i*20} stroke="#4A8ACA" strokeOpacity="0.11" strokeWidth="0.5"/>
      ))}
      {/* Blueprint tower sketch */}
      <rect x="368" y="60" width="6" height="102" fill="none" stroke="#6AAAD0" strokeWidth="0.8" strokeOpacity="0.45"/>
      <line x1="355" y1="98" x2="390" y2="98" stroke="#6AAAD0" strokeWidth="0.5" strokeOpacity="0.35"/>
      <text x="395" y="101" fill="#6AAAD0" fontSize="7" fontFamily="monospace" fillOpacity="0.5">+38.5m</text>
      {/* Span dimension */}
      <line x1="348" y1="168" x2="542" y2="168" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="4 3"/>
      <text x="350" y="175" fill="#D4AF37" fontSize="7" fontFamily="monospace" fillOpacity="0.38">MAIN SPAN: 190m</text>
      {/* Title block */}
      <rect x="346" y="228" width="202" height="42" rx="3" fill="none" stroke="#4A8ACA" strokeWidth="0.5" strokeOpacity="0.28"/>
      <text x="356" y="243" fill="#6AAAD0" fontSize="7" fontFamily="monospace" fillOpacity="0.45">CCPromoters Infrastructure</text>
      <text x="356" y="256" fill="#4A8ACA" fontSize="6" fontFamily="monospace" fillOpacity="0.35">DWG: BRIDGE-001  REV B</text>

      {/* Ambient glow under towers from lights */}
      <ellipse cx="185" cy="308" rx="28" ry="7" fill="#D4AF37" fillOpacity="0.04"/>
      <ellipse cx="375" cy="308" rx="28" ry="7" fill="#D4AF37" fillOpacity="0.04"/>
    </svg>
  );
}
