
import React, { useState } from 'react';
import { Building2, Search, FileCheck, ShieldCheck, MapPin, Printer, ArrowUpRight } from 'lucide-react';
import { INITIAL_MOCK_DATA } from '../constants';

export const RealtorPortal: React.FC = () => {
  const [search, setSearch] = useState('');
  
  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase leading-none">The Realtor Portal</h1>
          <p className="text-slate-400 mt-3 font-bold uppercase tracking-[0.2em] text-xs">Risk Mitigation & Property Value Verification • GTA</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="glass px-6 py-4 rounded-3xl border border-emerald-500/30 shadow-2xl shadow-emerald-500/10">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Avg Sale Delta</div>
              <div className="text-2xl font-black text-emerald-500">+$12,500 <span className="text-xs text-slate-500 font-bold uppercase">per deal</span></div>
           </div>
        </div>
      </div>

      {/* Hero Search */}
      <div className="glass rounded-[3rem] p-12 border border-white/10 relative overflow-hidden bg-gradient-to-br from-thermex-blue/10 to-transparent">
        <div className="scanline opacity-20" />
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-6">Verify HVAC Health Grade</h2>
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input 
              type="text"
              placeholder="Enter MLS Property Address..."
              className="w-full h-20 bg-black/40 border border-white/20 rounded-3xl pl-16 pr-8 text-xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-thermex-blue transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-black h-14 px-8 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all">
              Run Audit
            </button>
          </div>
          <p className="text-[10px] text-slate-500 mt-6 font-black uppercase tracking-[0.4em] italic opacity-50">Authorized by OREA-Compliance Framework</p>
        </div>
      </div>

      {/* Featured Listing Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {INITIAL_MOCK_DATA.slice(0, 3).map(twin => (
          <div key={twin.id} className="glass rounded-3xl p-8 border border-white/5 hover:border-white/20 transition-all group flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl border-2 ${twin.health_score > 90 ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500' : 'bg-amber-500/10 border-amber-500 text-amber-500'}`}>
                {twin.grade}
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">MLS Verified</span>
                <span className="text-xs font-bold text-white font-mono">#{twin.id.replace('tw-', 'ATC-')}</span>
              </div>
            </div>
            
            <h4 className="text-xl font-black text-white uppercase tracking-tight mb-1">{twin.address}</h4>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-8">
              <MapPin size={12} className="text-red-500" />
              {twin.city}, ON
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-slate-500 uppercase tracking-widest">HVAC Longevity</span>
                <span className="text-white">9-12 Years Expected</span>
              </div>
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-slate-500 uppercase tracking-widest">Buyer Risk</span>
                <span className="text-emerald-500 uppercase tracking-widest">Negligible</span>
              </div>
            </div>

            <button className="mt-auto w-full py-4 border border-white/10 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest group-hover:bg-white group-hover:text-black transition-all">
              <Printer size={14} />
              Print Certification
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
