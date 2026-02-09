
import React from 'react';
import { DigitalTwin } from '../types';

export const FurnaceWireframe: React.FC<{ twin: DigitalTwin }> = ({ twin }) => {
  const isOptimal = twin.health_score > 85;
  const isWarning = twin.health_score <= 80 && twin.health_score > 60;
  const isCritical = twin.health_score <= 60;
  
  const statusColor = isOptimal ? '#10b981' : isWarning ? '#f59e0b' : '#ef4444';
  const motorAlertColor = '#ef4444'; 

  const isInducerProblem = twin.system_motors === 'Inducer';
  const isBlowerProblem = twin.system_motors === 'Blower';

  return (
    <div className="relative w-full max-w-[320px] aspect-[4/5] group">
      <svg viewBox="0 0 100 125" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_20px_rgba(255,255,255,0.03)] transition-all duration-700">
        <defs>
          <linearGradient id="cabinetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Main Cabinet Chassis */}
        <rect x="20" y="10" width="60" height="105" rx="4" stroke="#334155" strokeWidth="1.5" fill="url(#cabinetGrad)" />
        <rect x="24" y="14" width="52" height="97" rx="2" stroke="#1e293b" strokeWidth="0.5" />
        
        {/* Inducer Assembly (Top Unit) */}
        <g className="inducer-module">
          <circle cx="50" cy="35" r="14" stroke={isInducerProblem ? motorAlertColor : "#334155"} strokeWidth="1.5" />
          
          {/* Internal Fan Blades */}
          <g className={(isInducerProblem || isOptimal) ? 'animate-spin' : ''} 
             style={{ transformOrigin: '50px 35px', animationDuration: isInducerProblem ? '0.4s' : '3s' }}>
            <path d="M50 25 V35 M50 35 L58.66 40 M50 35 L41.34 40" 
                  stroke={isInducerProblem ? motorAlertColor : "#475569"} 
                  strokeWidth="2.5" 
                  strokeLinecap="round" />
          </g>
          
          {/* Operational Aura */}
          {(isInducerProblem || isOptimal) && (
             <circle cx="50" cy="35" r="18" 
                     stroke={isInducerProblem ? motorAlertColor : statusColor} 
                     strokeWidth="0.5" 
                     strokeDasharray="4 4" 
                     className="animate-spin opacity-40" />
          )}
        </g>

        {/* Heat Exchanger Section */}
        <g className="heat-exchanger" filter="url(#glow)">
          <path d="M30 52 H70 M30 58 H70 M30 64 H70" stroke={isCritical ? "#ef4444" : "#334155"} strokeWidth="1.5" strokeOpacity={isCritical ? "0.8" : "0.3"} />
          {(isOptimal || isWarning) && (
            <path d="M30 52 H70 M30 58 H70 M30 64 H70" stroke={statusColor} strokeWidth="1" strokeDasharray="2 10" className="animate-[marquee_2s_linear_infinite]" />
          )}
        </g>

        {/* Blower Assembly (Bottom Unit) */}
        <g className="blower-module">
          <rect x="32" y="78" width="36" height="28" rx="4" stroke={isBlowerProblem ? motorAlertColor : "#334155"} strokeWidth="1.5" />
          
          {/* Blower Wheel Visualization */}
          <g className={(isBlowerProblem || isOptimal) ? 'animate-pulse' : ''}>
             <circle cx="50" cy="92" r="10" stroke={isBlowerProblem ? motorAlertColor : "#475569"} strokeWidth="1.5" strokeDasharray="2 2" />
             <path d="M44 92 H56 M50 86 V98" stroke={isBlowerProblem ? motorAlertColor : "#475569"} strokeWidth="1" />
          </g>

          {/* Airflow Lines (Driven by Blower Status) */}
          {(isBlowerProblem || isOptimal) && (
            <g className="airflow-vectors">
              <path d="M40 108 V118" stroke={statusColor} strokeWidth="2" strokeLinecap="round" className="animate-bounce" />
              <path d="M50 110 V122" stroke={statusColor} strokeWidth="2.5" strokeLinecap="round" className="animate-bounce" style={{ animationDelay: '0.2s' }} />
              <path d="M60 108 V118" stroke={statusColor} strokeWidth="2" strokeLinecap="round" className="animate-bounce" style={{ animationDelay: '0.4s' }} />
            </g>
          )}
        </g>
        
        {/* Center Health Core (The "System Heartbeat") */}
        <circle cx="50" cy="58" r="3" fill={statusColor} filter="url(#glow)">
          <animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
      
      {/* Dynamic Data Callouts */}
      <div className="absolute top-[28%] right-[-15%] glass px-3 py-1.5 rounded-lg text-[10px] font-bold border-l-2 border-emerald-500 shadow-xl shadow-black/20 group-hover:scale-110 transition-transform">
        <div className="text-slate-500 uppercase tracking-tighter text-[8px]">Static Pressure</div>
        <div className="font-mono text-white leading-none mt-0.5">{twin.system_breathing} <span className="text-slate-500 font-normal italic text-[8px]">iwc</span></div>
      </div>
      
      <div className="absolute bottom-[20%] left-[-15%] glass px-3 py-1.5 rounded-lg text-[10px] font-bold border-l-2 border-thermex-blue shadow-xl shadow-black/20 group-hover:scale-110 transition-transform">
        <div className="text-slate-500 uppercase tracking-tighter text-[8px]">Delta-T</div>
        <div className="font-mono text-white leading-none mt-0.5">{twin.heating_power}° <span className="text-slate-500 font-normal italic text-[8px]">ΔT</span></div>
      </div>

      {/* Diagnostic "Scanning" Beam overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl opacity-20">
        <div className="w-full h-1.5 bg-gradient-to-r from-transparent via-white/40 to-transparent absolute top-0 animate-[scan_4s_linear_infinite]" />
      </div>
    </div>
  );
};
