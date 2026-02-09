
import React, { useState, useEffect } from 'react';

export const CostClock: React.FC = () => {
  const [costPerMinute, setCostPerMinute] = useState(1.92);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Dynamic shift based on simulated traffic fluctuations
      setCostPerMinute(prev => {
        const delta = (Math.random() - 0.48) * 0.1;
        const newVal = Math.max(1.65, prev + delta);
        // Trigger visual shake for high-burn volatility
        if (newVal > 1.95) setShake(true);
        else setShake(false);
        return newVal;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const isCritical = costPerMinute > 2.00;

  return (
    <div className="flex flex-col items-end">
      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">
        401/DVP Burn Formula
      </div>
      <div className={`flex items-baseline gap-2 font-mono p-4 rounded-2xl glass transition-all duration-500 
        ${shake ? 'animate-shake' : ''} 
        ${isCritical 
          ? 'animate-critical-alert text-red-500 border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.5)] bg-red-500/10' 
          : 'text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)] border-amber-500/30'
        }`}>
        <span className="text-3xl font-black tracking-tighter">${costPerMinute.toFixed(2)}</span>
        <span className="text-sm font-black opacity-80 uppercase tracking-tighter">/ MIN</span>
      </div>
      <div className="mt-2 text-[10px] text-slate-600 font-mono italic font-bold">
        {isCritical ? 'ALERT: SEVERE CONGESTION DETECTED' : 'Real-time calculation including $80/hr Opportunity Cost'}
      </div>
    </div>
  );
};