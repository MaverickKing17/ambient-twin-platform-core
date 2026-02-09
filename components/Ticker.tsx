
import React, { useState, useEffect } from 'react';
import { Activity, Thermometer, Car, DollarSign, Cpu } from 'lucide-react';

export const Ticker: React.FC = () => {
  const [data, setData] = useState({
    hwy401: 84,
    dvp: 14,
    temp: -2,
    rebatePool: 12450800,
    activeTwins: 1240
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setData(prev => ({
        ...prev,
        hwy401: Math.floor(75 + Math.random() * 20),
        dvp: Math.floor(8 + Math.random() * 15),
        rebatePool: prev.rebatePool - Math.floor(Math.random() * 500),
        activeTwins: 1240 + (Math.random() > 0.8 ? 1 : 0)
      }));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const Item = ({ icon: Icon, label, value, unit, color }: any) => (
    <div className="flex items-center gap-2 px-6 border-r border-white/5 whitespace-nowrap">
      <Icon size={12} className={color} />
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}:</span>
      <span className="text-[11px] font-mono font-bold text-white">
        {typeof value === 'number' && label.includes('POOL') 
          ? `$${value.toLocaleString()}` 
          : value}
        <span className="ml-1 text-[9px] text-slate-500 font-normal">{unit}</span>
      </span>
    </div>
  );

  return (
    <div className="h-8 bg-black/40 border-b border-white/5 flex items-center overflow-hidden no-print">
      <div className="flex items-center animate-marquee whitespace-nowrap">
        <Item icon={Car} label="401-E FLOW" value={data.hwy401} unit="KM/H" color="text-emerald-400" />
        <Item icon={Car} label="DVP-S DELAY" value={data.dvp} unit="MIN" color="text-amber-400" />
        <Item icon={Thermometer} label="TORONTO AMBIENT" value={data.temp} unit="°C" color="text-thermex-blue" />
        <Item icon={DollarSign} label="REBATE POOL" value={data.rebatePool} unit="CAD" color="text-emerald-500" />
        <Item icon={Cpu} label="ACTIVE TWINS" value={data.activeTwins} unit="NODES" color="text-purple-400" />
        <Item icon={Activity} label="GTA LOAD" value="NOMINAL" unit="" color="text-emerald-400" />
        {/* Duplicate for seamless loop */}
        <Item icon={Car} label="401-E FLOW" value={data.hwy401} unit="KM/H" color="text-emerald-400" />
        <Item icon={Car} label="DVP-S DELAY" value={data.dvp} unit="MIN" color="text-amber-400" />
        <Item icon={Thermometer} label="TORONTO AMBIENT" value={data.temp} unit="°C" color="text-thermex-blue" />
      </div>
    </div>
  );
};
