
import React from 'react';
import { DigitalTwin } from '../types';

export const FurnaceWireframe: React.FC<{ twin: DigitalTwin }> = ({ twin }) => {
  const isOptimal = twin.system_motors === 'Optimal';
  const isInducerFocus = twin.system_motors === 'Inducer';
  const isBlowerFocus = twin.system_motors === 'Blower';

  // Core status color based on overall health
  const healthColor = twin.health_score > 85 ? '#10b981' : twin.health_score > 60 ? '#f59e0b' : '#ef4444';
  const alertColor = '#ef4444';

  // Inducer Configuration
  const inducerActive = isInducerFocus || isOptimal;
  const inducerDuration = isInducerFocus ? '0.5s' : (isOptimal ? '4s' : '15s');
  const inducerColor = isInducerFocus ? alertColor : (isOptimal ? healthColor : '#475569');

  // Blower Configuration
  const blowerActive = isBlowerFocus || isOptimal;
  const blowerDuration = isBlowerFocus ? '0.7s' : (isOptimal ? '3s' : '12s');
  const blowerColor = isBlowerFocus ? alertColor : (isOptimal ? healthColor : '#475569');

  return (
    <div className="relative w-full max-w-[340px] aspect-[4/5] group select-none">
      <svg viewBox="0 0 100 125" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_30px_rgba(255,255,255,0.02)] transition-all duration-700">
        <defs>
          <linearGradient id="chassisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
          </linearGradient>
          <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Chassis Frame */}
        <rect x="18" y="8" width="64" height="109" rx="6" stroke="#334155" strokeWidth="1.5" fill="url(#chassisGrad)" />
        <rect x="22" y="12" width="56" height="101" rx="4" stroke="#1e293b" strokeWidth="0.5" />
        
        {/* Inducer Motor Section */}
        <g className="inducer-section">
          <circle cx="50" cy="35" r="16" stroke={inducerColor} strokeWidth="1" strokeOpacity="0.1" />
          <circle cx="50" cy="35" r="13" stroke={inducerColor} strokeWidth="1.5" className="transition-colors duration-1000" />
          
          {/* Constant Spin Fan */}
          <g className="animate-spin" style={{ transformOrigin: '50px 35px', animationDuration: inducerDuration }}>
            <circle cx="50" cy="35" r="2" fill={inducerColor} />
            <path d="M50 25 V35 M50 35 L58.66 40 M50 35 L41.34 40" stroke={inducerColor} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M50 45 V35 M50 35 L41.34 30 M50 35 L58.66 30" stroke={inducerColor} strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* Halo Effect for Active/Vibrant State */}
          {inducerActive && (
            <circle cx="50" cy="35" r="18" stroke={inducerColor} strokeWidth="0.5" strokeDasharray="4 4" className="animate-spin opacity-20" style={{ animationDuration: '20s' }} />
          )}
        </g>

        {/* Heat Exchange Area */}
        <g className="core-dynamics" filter="url(#neon-glow)">
          <path d="M30 54 Q50 48 70 54 M30 60 Q50 54 70 60 M30 66 Q50 60 70 66" stroke={healthColor} strokeWidth="1" strokeOpacity="0.2" />
          {isOptimal && (
             <path d="M30 54 Q50 48 70 54" stroke={healthColor} strokeWidth="1" strokeDasharray="4 20" className="animate-[marquee_3s_linear_infinite]" />
          )}
        </g>

        {/* Blower Motor Section */}
        <g className="blower-section">
          <rect x="30" y="78" width="40" height="30" rx="6" stroke={blowerColor} strokeWidth="1.5" className="transition-colors duration-1000" />
          
          {/* Internal Blower Wheel (Pulsating) */}
          <g className="animate-pulse" style={{ animationDuration: blowerDuration }}>
             <circle cx="50" cy="93" r="11" stroke={blowerColor} strokeWidth="1" strokeDasharray="2 3" className="opacity-40" />
             <rect x="42" y="88" width="16" height="10" rx="2" stroke={blowerColor} strokeWidth="1.5" />
          </g>

          {/* Pulsating Airflow Animation */}
          <g className="airflow-vectors">
            <path d="M38 108 V120" stroke={blowerColor} strokeWidth="2" strokeLinecap="round" 
              className="animate-pulse-flow" style={{ animationDuration: blowerDuration, animationDelay: '0s' }} />
            <path d="M50 110 V124" stroke={blowerColor} strokeWidth="3" strokeLinecap="round" 
              className="animate-pulse-flow" style={{ animationDuration: blowerDuration, animationDelay: '0.2s' }} />
            <path d="M62 108 V120" stroke={blowerColor} strokeWidth="2" strokeLinecap="round" 
              className="animate-pulse-flow" style={{ animationDuration: blowerDuration, animationDelay: '0.4s' }} />
          </g>
        </g>
        
        {/* Status Heartbeat Pin */}
        <circle cx="50" cy="60" r="2.5" fill={healthColor}>
          <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
      
      {/* Callout Badges */}
      <div className="absolute top-[30%] right-[-10%] glass px-3 py-1.5 rounded-lg border-l-2 border-emerald-500 shadow-2xl group-hover:scale-110 transition-transform">
        <div className="text-[8px] text-slate-500 uppercase tracking-tighter font-black">Static Pressure</div>
        <div className="font-mono text-xs font-bold text-white leading-none mt-1">{twin.system_breathing} <span className="text-[9px] text-slate-500 font-normal">iwc</span></div>
      </div>
      
      <div className="absolute bottom-[22%] left-[-10%] glass px-3 py-1.5 rounded-lg border-l-2 border-thermex-blue shadow-2xl group-hover:scale-110 transition-transform">
        <div className="text-[8px] text-slate-500 uppercase tracking-tighter font-black">Temp Delta</div>
        <div className="font-mono text-xs font-bold text-white leading-none mt-1">{twin.heating_power}° <span className="text-[9px] text-slate-500 font-normal">ΔT</span></div>
      </div>

      {/* Global Scanning Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl opacity-10">
        <div className="w-full h-2 bg-gradient-to-r from-transparent via-white to-transparent absolute top-0 animate-[scan_6s_linear_infinite]" />
      </div>
    </div>
  );
};
