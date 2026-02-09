
import React, { useState, useEffect } from 'react';
import { Activity, Thermometer, Car, DollarSign, Cpu, RefreshCw, Zap } from 'lucide-react';
import { getTorontoTrafficData } from '../services/geminiService';

export const Ticker: React.FC = () => {
  const [data, setData] = useState({
    hwy401: 84,
    dvp: 14,
    temp: -2,
    rebatePool: 12450800,
    activeTwins: 1240,
    liveTraffic: 'Syncing real-time traffic data from GTA highways...'
  });
  const [isSyncing, setIsSyncing] = useState(false);

  const fetchLiveTraffic = async () => {
    setIsSyncing(true);
    const trafficInfo = await getTorontoTrafficData();
    setData(prev => ({ ...prev, liveTraffic: trafficInfo }));
    setIsSyncing(false);
  };

  useEffect(() => {
    fetchLiveTraffic();
    const trafficInterval = setInterval(fetchLiveTraffic, 300000); // Sync every 5 mins

    const mockInterval = setInterval(() => {
      setData(prev => ({
        ...prev,
        hwy401: Math.floor(75 + Math.random() * 20),
        dvp: Math.floor(8 + Math.random() * 15),
        rebatePool: prev.rebatePool - Math.floor(Math.random() * 500),
        activeTwins: 1240 + (Math.random() > 0.8 ? 1 : 0)
      }));
    }, 4000);

    return () => {
      clearInterval(trafficInterval);
      clearInterval(mockInterval);
    };
  }, []);

  const Item = ({ icon: Icon, label, value, unit, color, isLive }: any) => (
    <div className="flex items-center gap-4 px-12 border-r border-white/10 h-full whitespace-nowrap group hover:bg-white/5 transition-colors cursor-default">
      <div className={`p-2 rounded-xl bg-black/20 border border-white/5 group-hover:border-white/20 transition-all ${color}`}>
        <Icon size={20} />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-1.5">
          {isLive && <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" />}
          {label}
        </span>
        <span className="text-xl font-mono font-black text-white leading-none mt-0.5 group-hover:text-emerald-400 transition-colors">
          {typeof value === 'number' && label.includes('POOL') 
            ? `$${value.toLocaleString()}` 
            : value}
          {unit && <span className="ml-1 text-xs text-slate-500 font-normal uppercase tracking-widest">{unit}</span>}
        </span>
      </div>
    </div>
  );

  return (
    <div className="h-20 bg-black/60 border-b border-white/10 flex items-center overflow-hidden no-print relative backdrop-blur-3xl group/ticker">
      {/* Visual Accents */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-red-500/5 opacity-50 pointer-events-none" />
      <div className="scanline opacity-10" />

      {/* Sync Control */}
      <div className="absolute left-0 top-0 bottom-0 px-6 bg-black/80 z-30 flex items-center border-r border-white/10 shadow-2xl">
        <button 
          onClick={fetchLiveTraffic}
          disabled={isSyncing}
          className={`p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-95 ${isSyncing ? 'opacity-50' : ''}`}
          title="Refresh Feed"
        >
          <RefreshCw size={18} className={`text-slate-300 ${isSyncing ? 'animate-spin text-emerald-400' : 'hover:text-white'}`} />
        </button>
      </div>

      {/* Marquee Body */}
      <div className="flex items-center animate-marquee whitespace-nowrap pl-24 group-hover/ticker:[animation-play-state:paused]">
        <Item icon={Car} label="LIVE TRAFFIC" value={data.liveTraffic} unit="" color="text-red-400" isLive={true} />
        <Item icon={DollarSign} label="REBATE POOL" value={data.rebatePool} unit="CAD" color="text-emerald-500" />
        <Item icon={Thermometer} label="GTA AMBIENT" value={data.temp} unit="°C" color="text-thermex-blue" />
        <Item icon={Cpu} label="ACTIVE TWINS" value={data.activeTwins} unit="NODES" color="text-purple-400" />
        <Item icon={Activity} label="SYSTEM LOAD" value="NOMINAL" unit="" color="text-emerald-400" />
        <Item icon={Zap} label="NETWORK" value="VERIFIED" unit="" color="text-amber-500" />
        
        {/* Duplicate for seamless loop */}
        <Item icon={Car} label="LIVE TRAFFIC" value={data.liveTraffic} unit="" color="text-red-400" isLive={true} />
        <Item icon={DollarSign} label="REBATE POOL" value={data.rebatePool} unit="CAD" color="text-emerald-500" />
        <Item icon={Thermometer} label="GTA AMBIENT" value={data.temp} unit="°C" color="text-thermex-blue" />
        <Item icon={Cpu} label="ACTIVE TWINS" value={data.activeTwins} unit="NODES" color="text-purple-400" />
        <Item icon={Activity} label="SYSTEM LOAD" value="NOMINAL" unit="" color="text-emerald-400" />
      </div>
    </div>
  );
};
