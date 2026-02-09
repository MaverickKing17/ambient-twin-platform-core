
import React, { useState, useEffect } from 'react';
import { Building2, Search, FileCheck, ShieldCheck, MapPin, Printer, ArrowUpRight, Activity, X, FileText, ExternalLink, Thermometer, Wind, Cpu, Heart, ChevronRight, Gavel } from 'lucide-react';
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
      {/* Dynamic Header - Refined for Enterprise feel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-lg">
                <Building2 className="text-obsidian" size={20} />
             </div>
             <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">Realtor Portal</h1>
          </div>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[9px] flex items-center gap-2">
            <ShieldCheck size={12} className="text-emerald-500" />
            Institutional Property Risk Mitigation • GTA CORE
          </p>
        </div>
        
        <div className="flex gap-4">
           <div className="glass px-6 py-4 rounded-2xl border border-white/5 shadow-xl">
              <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Market Velocity</div>
              <div className="text-2xl font-black text-emerald-500 font-mono tracking-tighter">1.4x <span className="text-[10px] text-slate-600 font-bold uppercase">faster close</span></div>
           </div>
        </div>
      </div>

      {/* Compact Filter Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-thermex-blue transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Search MLS Address or Region..."
              className="w-full h-16 bg-card/40 backdrop-blur-3xl border border-white/10 rounded-2xl pl-16 pr-8 text-lg font-bold text-white focus:outline-none focus:ring-2 focus:ring-thermex-blue/20 focus:border-thermex-blue transition-all placeholder:text-slate-700"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <button 
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`h-16 px-8 rounded-2xl flex items-center justify-center gap-3 font-black uppercase text-[10px] tracking-[0.1em] transition-all border shadow-lg ${showFavoritesOnly ? 'bg-mckinnon-red text-white border-mckinnon-red/50' : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'}`}
        >
          <Heart size={16} fill={showFavoritesOnly ? "white" : "transparent"} className={showFavoritesOnly ? "animate-pulse" : ""} />
          {showFavoritesOnly ? 'Saved Portfolio' : 'View Saved'}
        </button>
      </div>

      {/* Compact High-Density Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-20">
        {filteredData.length > 0 ? (
          filteredData.map(twin => (
            <div key={twin.id} className="group relative glass rounded-[2rem] p-5 border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col overflow-hidden shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1">
              <div className="scanline opacity-10" />
              
              {/* Status Header */}
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center border shadow-lg transition-transform group-hover:scale-105 ${twin.health_score > 90 ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-500' : twin.health_score > 70 ? 'bg-amber-500/10 border-amber-500/50 text-amber-400' : 'bg-red-500/10 border-red-500/50 text-red-500'}`}>
                  <span className="text-[8px] font-black uppercase tracking-widest opacity-60 leading-none">Grade</span>
                  <span className="text-xl font-black leading-none mt-0.5">{twin.grade}</span>
                </div>
                
                <button 
                  onClick={(e) => toggleFavorite(twin.id, e)}
                  className={`p-2 rounded-xl border backdrop-blur-xl transition-all ${favorites.includes(twin.id) ? 'bg-mckinnon-red/20 border-mckinnon-red/40 text-mckinnon-red shadow-lg' : 'bg-black/20 border-white/5 text-slate-600 hover:text-white hover:bg-white/10'}`}
                >
                  <Heart size={14} fill={favorites.includes(twin.id) ? "currentColor" : "transparent"} />
                </button>
              </div>
              
              {/* Location Data */}
              <div className="relative z-10 mb-4 h-12">
                <h4 className="text-sm font-black text-white tracking-tight uppercase line-clamp-2 leading-tight">{twin.address}</h4>
                <div className="flex items-center gap-1 text-[8px] font-black text-slate-500 uppercase tracking-[0.1em] mt-1">
                  <MapPin size={10} className="text-mckinnon-red" />
                  {twin.city}
                </div>
              </div>

              {/* Compact Metrics Architecture */}
              <div className="relative z-10 space-y-4 mb-5 bg-black/20 rounded-2xl p-4 border border-white/5">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Viability</span>
                    <span className={`text-[9px] font-black font-mono ${twin.health_score > 70 ? 'text-emerald-400' : 'text-mckinnon-red'}`}>{twin.health_score}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${twin.health_score > 90 ? 'bg-emerald-500' : twin.health_score > 70 ? 'bg-amber-500' : 'bg-mckinnon-red'}`}
                      style={{ width: `${twin.health_score}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest">
                  <span className="text-slate-600">Ref</span>
                  <span className="text-white font-mono">{twin.id.replace('tw-', 'ATC')}</span>
                </div>
              </div>

              {/* Action Suite - Compact Buttons */}
              <div className="grid grid-cols-2 gap-2 mt-auto relative z-10">
                <button 
                  onClick={() => setSelectedReport(twin)}
                  className="group/btn h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center gap-2 text-[8px] font-black uppercase tracking-[0.1em] text-white hover:bg-white/10 transition-all active:scale-95"
                >
                  <Activity size={12} className="text-thermex-blue" />
                  Diag
                </button>
                <Link 
                  to={`/certificate/${twin.id}`}
                  className="h-10 bg-white text-black rounded-xl flex items-center justify-center gap-2 text-[8px] font-black uppercase tracking-[0.1em] hover:bg-slate-200 transition-all active:scale-95"
                >
                  <Printer size={12} />
                  Cert
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center glass rounded-[2rem] border border-white/5">
            <Building2 className="text-slate-800 mx-auto mb-4" size={32} />
            <h3 className="text-xl font-black text-white uppercase tracking-tighter">No Asset Matches</h3>
            <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] mt-1">Adjust search criteria</p>
          </div>
        )}
      </div>

      {/* Detailed Report Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-obsidian/95 backdrop-blur-3xl" onClick={() => setSelectedReport(null)} />
          <div className="relative glass w-full max-w-2xl rounded-[3rem] p-10 border border-white/10 shadow-2xl animate-in zoom-in duration-300">
            <div className="scanline opacity-20" />
            
            <button 
              onClick={() => setSelectedReport(null)}
              className="absolute top-8 right-8 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 hover:text-white transition-all z-20"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-6 mb-10 relative z-10">
              <div className={`w-24 h-24 rounded-[1.5rem] flex flex-col items-center justify-center border-4 shadow-xl ${selectedReport.health_score > 80 ? 'border-emerald-500 bg-emerald-500/10' : 'border-amber-500 bg-amber-500/10'}`}>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 leading-none mb-1">Grade</span>
                <span className={`text-5xl font-black ${selectedReport.health_score > 80 ? 'text-emerald-500' : 'text-amber-400'}`}>{selectedReport.grade}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-1 leading-none">{selectedReport.address}</h3>
                <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[9px] flex items-center gap-2">
                  <Activity size={14} className="text-thermex-blue" />
                  Enterprise Diagnostic Report • {selectedReport.city}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 relative z-10">
              <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                <Wind size={20} className="text-thermex-blue" />
                <div>
                  <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Breathing</span>
                  <div className="text-2xl font-mono font-bold text-white">{selectedReport.system_breathing} <span className="text-[10px] text-slate-600">iwc</span></div>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                <Thermometer size={20} className="text-orange-500" />
                <div>
                  <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Output Power</span>
                  <div className="text-2xl font-mono font-bold text-white">{selectedReport.heating_power}° <span className="text-[10px] text-slate-600">ΔT</span></div>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                <Cpu size={20} className="text-purple-500" />
                <div>
                  <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Logic Status</span>
                  <div className="text-xl font-black text-white uppercase tracking-tighter">{selectedReport.system_motors}</div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/10 mb-10 relative z-10 text-sm italic text-slate-300 font-medium leading-relaxed">
              "Subject property HVAC asset demonstrates {selectedReport.health_score}% telemetry alignment with ASHRAE standards. Zero imminent operational risk detected."
            </div>

            <div className="flex gap-4 relative z-10">
              <Link 
                to={`/certificate/${selectedReport.id}`}
                className="flex-1 h-16 bg-white text-black rounded-2xl flex items-center justify-center gap-3 text-[12px] font-black uppercase tracking-[0.1em] hover:bg-slate-200 transition-all shadow-xl shadow-white/5"
              >
                <Printer size={20} />
                Generate Audit
              </Link>
              <button 
                onClick={() => setSelectedReport(null)}
                className="px-8 h-16 border border-white/10 rounded-2xl text-slate-400 font-black uppercase text-[10px] tracking-widest hover:bg-white/5 transition-colors"
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
