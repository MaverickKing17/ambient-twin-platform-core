
import React, { useState, useEffect } from 'react';
import { Building2, Search, FileCheck, ShieldCheck, MapPin, Printer, ArrowUpRight, Activity, X, FileText, ExternalLink, Thermometer, Wind, Cpu, Heart, ChevronRight, Gavel, BarChart3, Database } from 'lucide-react';
import { INITIAL_MOCK_DATA } from '../constants';
import { DigitalTwin } from '../types';
import { Link } from 'react-router-dom';

export const RealtorPortal: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedReport, setSelectedReport] = useState<DigitalTwin | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('at_realtor_favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
  }, []);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newFavorites = favorites.includes(id) 
      ? favorites.filter(f => f !== id) 
      : [...favorites, id];
    
    setFavorites(newFavorites);
    localStorage.setItem('at_realtor_favorites', JSON.stringify(newFavorites));
  };
  
  const filteredData = INITIAL_MOCK_DATA.filter(twin => {
    const matchesSearch = twin.address.toLowerCase().includes(search.toLowerCase()) || 
                         twin.city.toLowerCase().includes(search.toLowerCase());
    const matchesFavorite = showFavoritesOnly ? favorites.includes(twin.id) : true;
    return matchesSearch && matchesFavorite;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-1000">
      {/* Executive Header Architecture */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-white/10 pb-12">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-2xl shadow-white/10">
                <Building2 className="text-obsidian" size={28} />
             </div>
             <div>
               <h1 className="text-5xl font-black text-white tracking-tighter uppercase leading-none">The Realtor Portal</h1>
               <div className="flex items-center gap-3 mt-2">
                 <span className="px-3 py-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded text-[9px] font-black text-emerald-500 uppercase tracking-widest">Live Audit Engine</span>
                 <span className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">Institutional Risk Mitigation • GTA CORE</span>
               </div>
             </div>
          </div>
        </div>
        
        <div className="hidden lg:flex gap-6">
           <div className="glass px-8 py-6 rounded-[2rem] border border-white/5 shadow-2xl flex flex-col justify-center">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Portfolio Viability</div>
              <div className="text-3xl font-black text-emerald-500 font-mono tracking-tighter">92.4% <span className="text-xs text-slate-600 font-bold uppercase">mean score</span></div>
           </div>
        </div>
      </div>

      {/* Advanced Command Search */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
        <div className="lg:col-span-3">
          <div className="relative group">
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-thermex-blue transition-all duration-500" size={28} />
            <input 
              type="text"
              placeholder="Query Address, City, or MLS ID..."
              className="w-full h-24 bg-card/30 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] pl-20 pr-10 text-2xl font-black text-white focus:outline-none focus:ring-4 focus:ring-thermex-blue/10 focus:border-thermex-blue transition-all placeholder:text-slate-700"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <button 
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`h-24 px-10 rounded-[2.5rem] flex items-center justify-center gap-4 font-black uppercase text-xs tracking-[0.2em] transition-all border shadow-2xl ${showFavoritesOnly ? 'bg-mckinnon-red text-white border-mckinnon-red shadow-xl shadow-mckinnon-red/30' : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white'}`}
        >
          <Heart size={20} fill={showFavoritesOnly ? "white" : "transparent"} className={showFavoritesOnly ? "animate-pulse" : ""} />
          {showFavoritesOnly ? 'Saved Portfolio' : 'Watchlist'}
        </button>
      </div>

      {/* High-Impact Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-32">
        {filteredData.length > 0 ? (
          filteredData.map(twin => (
            <div key={twin.id} className="group relative glass rounded-[3.5rem] p-10 border border-white/5 hover:border-white/20 transition-all duration-700 flex flex-col overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] hover:shadow-emerald-500/10 hover:-translate-y-3">
              <div className="scanline opacity-10" />
              
              {/* Institutional Background Identity */}
              <div className="absolute -right-12 -top-12 opacity-[0.02] rotate-12 pointer-events-none group-hover:rotate-[24deg] transition-transform duration-1000">
                <Database size={320} className="text-white" />
              </div>

              {/* Card Header: Score & Watchlist */}
              <div className="flex justify-between items-start mb-10 relative z-10">
                <div className="space-y-4">
                  <div className={`w-20 h-20 rounded-[1.5rem] flex flex-col items-center justify-center border-2 shadow-2xl transition-all duration-500 group-hover:scale-105 ${twin.health_score > 90 ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500' : twin.health_score > 70 ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-red-500/10 border-red-500 text-red-500'}`}>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60 leading-none mb-1">Asset</span>
                    <span className="text-4xl font-black leading-none">{twin.grade}</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-3">
                  <button 
                    onClick={(e) => toggleFavorite(twin.id, e)}
                    className={`p-4 rounded-2xl border backdrop-blur-3xl transition-all duration-300 ${favorites.includes(twin.id) ? 'bg-mckinnon-red border-mckinnon-red text-white shadow-xl shadow-mckinnon-red/30' : 'bg-black/40 border-white/5 text-slate-600 hover:text-white hover:bg-white/10'}`}
                  >
                    <Heart size={20} fill={favorites.includes(twin.id) ? "currentColor" : "transparent"} />
                  </button>
                  <div className="bg-black/40 px-4 py-2 rounded-xl border border-white/10 flex flex-col items-end backdrop-blur-md">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Node ID</span>
                    <span className="text-sm font-black text-white font-mono uppercase tracking-tighter">#{twin.id.replace('tw-', 'ATC')}</span>
                  </div>
                </div>
              </div>
              
              {/* Asset Identity Area */}
              <div className="relative z-10 mb-10">
                <div className="flex items-center gap-2 mb-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Active Telemetry Stream</span>
                </div>
                <h4 className="text-3xl font-black text-white tracking-tighter uppercase mb-2 group-hover:text-emerald-400 transition-colors duration-500">{twin.address}</h4>
                <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                  <MapPin size={14} className="text-mckinnon-red" />
                  {twin.city}, ONTARIO
                </div>
              </div>

              {/* Telemetry Architecture Visualization */}
              <div className="relative z-10 space-y-8 mb-12 bg-black/30 rounded-[2.5rem] p-8 border border-white/5 backdrop-blur-sm">
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-2">
                      <BarChart3 size={14} className="text-slate-500" />
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">System Health Viability</span>
                    </div>
                    <span className={`text-sm font-black font-mono ${twin.health_score > 70 ? 'text-emerald-400' : 'text-mckinnon-red'}`}>{twin.health_score}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                    <div 
                      className={`h-full transition-all duration-1000 ease-in-out rounded-full ${twin.health_score > 90 ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : twin.health_score > 70 ? 'bg-amber-500' : 'bg-mckinnon-red'}`}
                      style={{ width: `${twin.health_score}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-6">
                  <div className="space-y-1">
                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-1"><Wind size={8} /> Airflow</span>
                    <div className="text-xs font-black text-white font-mono">{twin.system_breathing}<span className="text-[8px] text-slate-600 ml-0.5">iwc</span></div>
                  </div>
                  <div className="space-y-1 text-center">
                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest flex items-center justify-center gap-1"><Thermometer size={8} /> Delta-T</span>
                    <div className="text-xs font-black text-white font-mono">{twin.heating_power}°</div>
                  </div>
                  <div className="space-y-1 text-right">
                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest flex items-center justify-end gap-1"><Cpu size={8} /> Status</span>
                    <div className="text-xs font-black text-emerald-500 uppercase tracking-tighter">Normal</div>
                  </div>
                </div>
              </div>

              {/* Executive Action Suite */}
              <div className="grid grid-cols-2 gap-5 mt-auto relative z-10">
                <button 
                  onClick={() => setSelectedReport(twin)}
                  className="group/btn h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                >
                  <Activity size={18} className="text-thermex-blue group-hover/btn:scale-110 transition-transform" />
                  Diagnostic
                </button>
                <Link 
                  to={`/certificate/${twin.id}`}
                  className="h-16 bg-white text-black rounded-2xl flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-slate-200 hover:scale-[1.02] transition-all duration-300 shadow-2xl shadow-white/5"
                >
                  <Printer size={18} />
                  Certificate
                </Link>
              </div>

              {/* Visual Watermark */}
              <div className="absolute bottom-8 right-12 pointer-events-none opacity-[0.03] select-none">
                <div className="text-[42px] font-black text-white uppercase tracking-tighter leading-none italic group-hover:tracking-widest transition-all duration-1000">SECURE</div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-48 text-center glass rounded-[4rem] border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
            <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <Building2 className="text-slate-800" size={48} />
            </div>
            <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">No Asset Matches Found</h3>
            <p className="text-slate-500 text-sm font-black uppercase tracking-[0.4em] max-w-sm mx-auto leading-loose">The requested property credentials do not exist in the Ambient Twin Enterprise Ledger.</p>
          </div>
        )}
      </div>

      {/* Detailed Report Modal - High Authority Design */}
      {selectedReport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-obsidian/95 backdrop-blur-[40px]" onClick={() => setSelectedReport(null)} />
          <div className="relative glass w-full max-w-3xl rounded-[4rem] p-12 lg:p-16 border border-white/10 shadow-[0_0_200px_rgba(0,0,0,0.9)] animate-in zoom-in duration-500">
            <div className="scanline opacity-20" />
            
            <button 
              onClick={() => setSelectedReport(null)}
              className="absolute top-12 right-12 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 hover:rotate-90 transition-all duration-500 z-20"
            >
              <X size={28} />
            </button>

            <div className="flex flex-col lg:flex-row lg:items-center gap-10 mb-16 relative z-10">
              <div className={`w-40 h-40 shrink-0 rounded-[2.5rem] flex flex-col items-center justify-center border-4 shadow-2xl ${selectedReport.health_score > 80 ? 'border-emerald-500 bg-emerald-500/10 shadow-emerald-500/20' : 'border-amber-500 bg-amber-500/10 shadow-amber-500/20'}`}>
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 leading-none mb-2">Grade</span>
                <span className={`text-7xl font-black ${selectedReport.health_score > 80 ? 'text-emerald-500' : 'text-amber-400'}`}>{selectedReport.grade}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                   <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded uppercase tracking-[0.2em]">Verified Digital Twin</span>
                   <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">CA-NODE: {selectedReport.id}</span>
                </div>
                <h3 className="text-5xl font-black text-white uppercase tracking-tighter mb-3 leading-none">{selectedReport.address}</h3>
                <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[11px] flex items-center gap-3">
                  <Activity size={20} className="text-thermex-blue" />
                  Enterprise Operational Audit • {selectedReport.city}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
              <div className="p-8 rounded-[2.5rem] bg-black/40 border border-white/5 backdrop-blur-md space-y-5">
                <Wind size={28} className="text-thermex-blue" />
                <div>
                  <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Static Pressure</span>
                  <div className="text-3xl font-mono font-bold text-white">{selectedReport.system_breathing} <span className="text-sm text-slate-600">iwc</span></div>
                </div>
              </div>
              <div className="p-8 rounded-[2.5rem] bg-black/40 border border-white/5 backdrop-blur-md space-y-5">
                <Thermometer size={28} className="text-orange-500" />
                <div>
                  <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Thermal Output</span>
                  <div className="text-3xl font-mono font-bold text-white">{selectedReport.heating_power}° <span className="text-sm text-slate-600">ΔT</span></div>
                </div>
              </div>
              <div className="p-8 rounded-[2.5rem] bg-black/40 border border-white/5 backdrop-blur-md space-y-5">
                <Cpu size={28} className="text-purple-500" />
                <div>
                  <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Logic Status</span>
                  <div className="text-2xl font-black text-white uppercase tracking-tighter leading-none">{selectedReport.system_motors}</div>
                </div>
              </div>
            </div>

            <div className="p-12 rounded-[3.5rem] bg-emerald-500/5 border border-emerald-500/10 mb-16 relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <ShieldCheck size={28} className="text-emerald-500" />
                <span className="text-[12px] font-black text-white uppercase tracking-[0.4em]">Compliance Abstract</span>
              </div>
              <p className="text-lg text-slate-300 font-medium leading-relaxed italic border-l-4 border-emerald-500/30 pl-8">
                "Subject property HVAC asset demonstrates {selectedReport.health_score}% telemetry alignment with ASHRAE peak performance standards. Mechanical longevity remains high, with zero imminent operational risk detected."
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 relative z-10">
              <Link 
                to={`/certificate/${selectedReport.id}`}
                className="flex-1 h-24 bg-white text-black rounded-[2.5rem] flex items-center justify-center gap-4 text-sm font-black uppercase tracking-[0.3em] hover:bg-slate-200 transition-all shadow-[0_24px_48px_-12px_rgba(255,255,255,0.15)]"
              >
                <Printer size={28} />
                Generate Audit Bundle
              </Link>
              <button 
                onClick={() => setSelectedReport(null)}
                className="px-12 h-24 border border-white/10 rounded-[2.5rem] text-slate-400 font-black uppercase text-xs tracking-[0.2em] hover:bg-white/5 transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
