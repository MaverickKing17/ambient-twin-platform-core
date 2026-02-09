
import React, { useState, useEffect } from 'react';
import { Building2, Search, FileCheck, ShieldCheck, MapPin, Printer, ArrowUpRight, Activity, X, FileText, ExternalLink, Thermometer, Wind, Cpu, Heart, ChevronRight, Gavel, BarChart3, Database, TrendingUp, Info, Loader2 } from 'lucide-react';
import { INITIAL_MOCK_DATA } from '../constants';
import { DigitalTwin } from '../types';
import { Link } from 'react-router-dom';
import { getTorontoMarketData } from '../services/geminiService';

export const RealtorPortal: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedReport, setSelectedReport] = useState<DigitalTwin | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [marketData, setMarketData] = useState<{ text: string; sources: { title: string; uri: string }[] } | null>(null);
  const [loadingMarket, setLoadingMarket] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('at_realtor_favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }

    const fetchMarket = async () => {
      setLoadingMarket(true);
      const data = await getTorontoMarketData();
      setMarketData(data);
      setLoadingMarket(false);
    };
    fetchMarket();
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
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-white/10 pb-12">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-lg">
                <Building2 className="text-obsidian" size={28} />
             </div>
             <div>
               <h1 className="text-5xl font-black text-white tracking-tighter uppercase leading-none">Home Agent Hub</h1>
               <div className="flex items-center gap-3 mt-2">
                 <span className="px-3 py-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Live Check System</span>
                 <span className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Checking House Health for Agents • Toronto</span>
               </div>
             </div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6 w-full lg:w-auto">
           {/* Average Health Card */}
           <div className="glass px-8 py-6 rounded-[2rem] border border-white/5 shadow-xl flex flex-col justify-center flex-1 lg:flex-none">
              <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-1">Average House Health</div>
              <div className="text-3xl font-black text-emerald-400 font-mono tracking-tighter">92.4% <span className="text-xs text-slate-500 font-bold uppercase">Good</span></div>
           </div>

           {/* Market Pulse Widget */}
           <div className="glass px-8 py-6 rounded-[2rem] border border-white/5 shadow-xl flex flex-col justify-center min-w-[320px] flex-1 lg:flex-none relative overflow-hidden group">
              <div className="scanline opacity-10" />
              <div className="flex justify-between items-start mb-2">
                <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                  <TrendingUp size={14} className="text-thermex-blue" />
                  Toronto Market Pulse
                </div>
                {loadingMarket && <Loader2 size={12} className="animate-spin text-slate-500" />}
              </div>
              
              {loadingMarket ? (
                <div className="h-10 flex items-center">
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-thermex-blue/30 animate-pulse w-2/3" />
                  </div>
                </div>
              ) : (
                <div className="space-y-3 animate-in fade-in duration-500">
                  <p className="text-[11px] font-bold text-white uppercase tracking-tight line-clamp-2">
                    {marketData?.text}
                  </p>
                  {marketData?.sources && marketData.sources.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {marketData.sources.slice(0, 2).map((source, idx) => (
                        <a 
                          key={idx} 
                          href={source.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[8px] font-bold text-thermex-blue hover:text-white transition-colors uppercase tracking-widest bg-thermex-blue/10 px-2 py-0.5 rounded-full border border-thermex-blue/20"
                        >
                          <ExternalLink size={8} />
                          {source.title.split(' ')[0]}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
           </div>
        </div>
      </div>

      {/* Search */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
        <div className="lg:col-span-3">
          <div className="relative group">
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-thermex-blue transition-all duration-300" size={28} />
            <input 
              type="text"
              placeholder="Type street name or house number..."
              className="w-full h-24 bg-black/10 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] pl-20 pr-10 text-2xl font-bold text-white focus:outline-none focus:ring-4 focus:ring-thermex-blue/10 focus:border-thermex-blue transition-all placeholder:text-slate-500"
              value={search}
              // Fixed: Using 'setSearch' instead of 'setSearchTerm' as defined in line 12
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <button 
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`h-24 px-10 rounded-[2.5rem] flex items-center justify-center gap-4 font-bold uppercase text-xs tracking-[0.2em] transition-all border shadow-lg ${showFavoritesOnly ? 'bg-mckinnon-red text-white border-mckinnon-red shadow-xl' : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'}`}
        >
          <Heart size={20} fill={showFavoritesOnly ? "white" : "transparent"} className={showFavoritesOnly ? "animate-pulse" : ""} />
          {showFavoritesOnly ? 'Showing Saved' : 'Watch List'}
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-32">
        {filteredData.length > 0 ? (
          filteredData.map(twin => (
            <div key={twin.id} className="group relative glass rounded-[3.5rem] p-10 border border-white/10 hover:border-white/30 transition-all duration-500 flex flex-col overflow-hidden shadow-xl hover:-translate-y-3">
              <div className="scanline opacity-10" />
              
              <div className="flex justify-between items-start mb-10 relative z-10">
                <div className={`w-20 h-20 rounded-[1.5rem] flex flex-col items-center justify-center border-2 shadow-lg transition-all duration-300 group-hover:scale-105 ${twin.health_score > 90 ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : twin.health_score > 70 ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-red-500/10 border-red-500 text-red-400'}`}>
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 leading-none mb-1">Grade</span>
                  <span className="text-4xl font-black leading-none">{twin.grade}</span>
                </div>
                
                <div className="flex flex-col items-end gap-3">
                  <button 
                    onClick={(e) => toggleFavorite(twin.id, e)}
                    className={`p-4 rounded-2xl border backdrop-blur-3xl transition-all duration-300 ${favorites.includes(twin.id) ? 'bg-mckinnon-red border-mckinnon-red text-white shadow-lg' : 'bg-black/40 border-white/5 text-slate-500 hover:text-white hover:bg-white/10'}`}
                  >
                    <Heart size={20} fill={favorites.includes(twin.id) ? "currentColor" : "transparent"} />
                  </button>
                  <div className="bg-black/40 px-4 py-2 rounded-xl border border-white/10 text-right backdrop-blur-md">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">Home Code</span>
                    <span className="text-sm font-bold text-white font-mono uppercase block tracking-tighter">#{twin.id.replace('tw-', 'ATC')}</span>
                  </div>
                </div>
              </div>
              
              <div className="relative z-10 mb-10">
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Active Data Feed</span>
                </div>
                <h4 className="text-3xl font-black text-white tracking-tighter uppercase mb-2 group-hover:text-emerald-400 transition-colors">{twin.address}</h4>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-[0.2em]">
                  <MapPin size={14} className="text-mckinnon-red" />
                  {twin.city}, ONTARIO
                </div>
              </div>

              {/* Stats */}
              <div className="relative z-10 space-y-8 mb-12 bg-black/10 rounded-[2.5rem] p-8 border border-white/5">
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">How Well It Runs</span>
                    <span className={`text-sm font-bold font-mono ${twin.health_score > 70 ? 'text-emerald-400' : 'text-mckinnon-red'}`}>{twin.health_score}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden border border-white/10 p-0.5">
                    <div 
                      className={`h-full transition-all duration-1000 ease-in-out rounded-full ${twin.health_score > 90 ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : twin.health_score > 70 ? 'bg-amber-500' : 'bg-mckinnon-red'}`}
                      style={{ width: `${twin.health_score}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                  <div className="space-y-1">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Air Flow</span>
                    <div className="text-xs font-bold text-white font-mono">{twin.system_breathing}</div>
                  </div>
                  <div className="space-y-1 text-center">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Heat Strength</span>
                    <div className="text-xs font-bold text-white font-mono">{twin.heating_power}°</div>
                  </div>
                  <div className="space-y-1 text-right">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Unit Status</span>
                    <div className="text-xs font-bold text-emerald-400 uppercase tracking-tighter">Good</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-5 mt-auto relative z-10">
                <button 
                  onClick={() => setSelectedReport(twin)}
                  className="group/btn h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white hover:bg-white/10 transition-all"
                >
                  <Activity size={18} className="text-thermex-blue" />
                  Check Data
                </button>
                <Link 
                  to={`/certificate/${twin.id}`}
                  className="h-16 bg-white text-black rounded-2xl flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-slate-100 shadow-xl"
                >
                  <Printer size={18} />
                  Safe Paper
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-48 text-center glass rounded-[4rem] border border-white/10">
            <Building2 className="text-slate-500 mx-auto mb-8" size={48} />
            <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">House Not Found</h3>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-[0.4em]">Try typing a different address.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-[40px]" onClick={() => setSelectedReport(null)} />
          <div className="relative glass w-full max-w-3xl rounded-[4rem] p-12 lg:p-16 border border-white/20 shadow-2xl animate-in zoom-in duration-500">
            <div className="scanline opacity-20" />
            
            <button 
              onClick={() => setSelectedReport(null)}
              className="absolute top-12 right-12 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all z-20"
            >
              <X size={28} />
            </button>

            <div className="flex flex-col lg:flex-row lg:items-center gap-10 mb-16 relative z-10">
              <div className={`w-40 h-40 shrink-0 rounded-[2.5rem] flex flex-col items-center justify-center border-4 shadow-xl ${selectedReport.health_score > 80 ? 'border-emerald-500 bg-emerald-500/10' : 'border-amber-500 bg-amber-500/10'}`}>
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 leading-none mb-2">Grade</span>
                <span className={`text-7xl font-black ${selectedReport.health_score > 80 ? 'text-emerald-400' : 'text-amber-400'}`}>{selectedReport.grade}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-5xl font-black text-white uppercase tracking-tighter mb-3 leading-none">{selectedReport.address}</h3>
                <p className="text-slate-300 font-bold uppercase tracking-[0.3em] text-[11px] flex items-center gap-3">
                  <Activity size={20} className="text-thermex-blue" />
                  Full House Health Report • {selectedReport.city}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
              <div className="p-8 rounded-[2.5rem] bg-black/10 border border-white/5 space-y-5">
                <Wind size={28} className="text-thermex-blue" />
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Air Pressure</span>
                  <div className="text-3xl font-mono font-bold text-white">{selectedReport.system_breathing}</div>
                </div>
              </div>
              <div className="p-8 rounded-[2.5rem] bg-black/10 border border-white/5 space-y-5">
                <Thermometer size={28} className="text-orange-400" />
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Heating Level</span>
                  <div className="text-3xl font-mono font-bold text-white">{selectedReport.heating_power}°</div>
                </div>
              </div>
              <div className="p-8 rounded-[2.5rem] bg-black/10 border border-white/5 space-y-5">
                <Cpu size={28} className="text-purple-400" />
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Unit Parts</span>
                  <div className="text-2xl font-bold text-white uppercase">{selectedReport.system_motors}</div>
                </div>
              </div>
            </div>

            <div className="p-12 rounded-[3.5rem] bg-emerald-500/5 border border-emerald-500/10 mb-16 relative z-10">
              <p className="text-lg text-slate-100 font-bold leading-relaxed italic border-l-4 border-emerald-500/30 pl-8">
                "This house system is working at {selectedReport.health_score}% power. Everything looks great and it should work well for a long time."
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 relative z-10">
              <Link 
                to={`/certificate/${selectedReport.id}`}
                className="flex-1 h-24 bg-white text-black rounded-[2.5rem] flex items-center justify-center gap-4 text-sm font-bold uppercase tracking-[0.3em] hover:bg-slate-100 transition-all shadow-xl"
              >
                <Printer size={28} />
                Print Safe Paper
              </Link>
              <button 
                onClick={() => setSelectedReport(null)}
                className="px-12 h-24 border border-white/10 rounded-[2.5rem] text-slate-300 font-bold uppercase text-xs tracking-[0.2em] hover:bg-white/10 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
