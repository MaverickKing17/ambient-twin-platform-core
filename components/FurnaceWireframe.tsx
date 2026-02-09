
import React from 'react';
import { DigitalTwin } from '../types';

export const FurnaceWireframe: React.FC<{ twin: DigitalTwin }> = ({ twin }) => {
  const isOptimal = twin.health_score > 85;
  const color = twin.health_score > 80 ? '#10b981' : twin.health_score > 60 ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative w-full max-w-[300px] aspect-[4/5]">
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]">
        {/* Main Cabinet */}
        <rect x="20" y="10" width="60" height="100" rx="4" stroke="#1f1f23" strokeWidth="1" fill="#09090b" />
        <rect x="25" y="15" width="50" height="90" rx="2" stroke="#1f1f23" strokeWidth="0.5" />
        
        {/* Inducer Area */}
        <circle cx="50" cy="35" r="12" stroke={twin.system_motors === 'Inducer' ? '#ef4444' : '#1f1f23'} strokeWidth="1.5" />
        <path d="M42 35 H58 M50 27 V43" stroke="#1f1f23" strokeWidth="0.5" />
        {twin.system_motors === 'Inducer' && (
           <circle cx="50" cy="35" r="15" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="2 2" className="animate-spin" />
        )}

        {/* Blower Area */}
        <rect x="35" y="70" width="30" height="25" rx="2" stroke={twin.system_motors === 'Blower' ? '#ef4444' : '#1f1f23'} strokeWidth="1.5" />
        <path d="M40 75 L60 90 M40 90 L60 75" stroke="#1f1f23" strokeWidth="0.5" />
        {twin.system_motors === 'Blower' && (
           <rect x="32" y="67" width="36" height="31" rx="3" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="4 2" className="animate-pulse" />
        )}

        {/* Heat Exchanger Vents */}
        <path d="M30 48 H70 M30 54 H70 M30 60 H70" stroke="#1f1f23" strokeWidth="1" />
        
        {/* Pulse Effect for Vital Signs */}
        <circle cx="50" cy="54" r="2" fill={color} className="animate-ping" />
        
        {/* Flow Lines */}
        <path 
          d="M50 110 V115" 
          stroke={color} 
          strokeWidth="2" 
          strokeLinecap="round" 
          className="animate-pulse"
        />
      </svg>
      
      {/* Label Overlays */}
      <div className="absolute top-[30%] right-[-20%] glass px-2 py-1 rounded text-[9px] font-bold border-l-2 border-emerald-500">
        SYSTEM BREATHING: {twin.system_breathing}
      </div>
      <div className="absolute bottom-[25%] left-[-20%] glass px-2 py-1 rounded text-[9px] font-bold border-l-2 border-thermex-blue">
        HEATING POWER: {twin.heating_power}°
      </div>
    </div>
  );
};
