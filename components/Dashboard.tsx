
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Activity, AlertCircle, FileCheck, DollarSign, ShieldCheck, Zap, BrainCircuit, Loader2, CheckCircle2 } from 'lucide-react';
import { CostClock } from './CostClock';
import { FurnaceWireframe } from './FurnaceWireframe';
import { INITIAL_MOCK_DATA } from '../constants';
import { DigitalTwin, BrandConfig } from '../types';
import { Link } from 'react-router-dom';
import { triageDiagnostic } from '../services/geminiService';

export const Dashboard: React.FC<{ brand: BrandConfig }> = ({ brand }) => {
  const [selectedTwin, setSelectedTwin] = useState<DigitalTwin>(INITIAL_MOCK_DATA[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isFixing, setIsFixing] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  const filteredData = INITIAL_MOCK_DATA.filter(d => 
    d.client_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTriage = async () => {
    setIsAnalyzing(true);
    setAiAnalysis(null);
    setIsFixed(false);
    const result = await triageDiagnostic(`${selectedTwin.live_vital_signs}. Static: ${selectedTwin.system_breathing}, ΔT: ${selectedTwin.heating_power}, Motors: ${selectedTwin.system_motors}.`);
    setAiAnalysis(result);
    setIsAnalyzing(false);
  };

  const handleRemoteFix = () => {
    setIsFixing(true);
    setTimeout(() => {
      setIsFixing(false);
      setIsFixed(true);
      setAiAnalysis(prev => ({ ...prev, canRemoteResolve: false, issue: 'RESOLVED', simpleExplanation: 'Remote signal reset. Unit status is back to nominal.' }));
    }, 2500);
  };

  useEffect(() => {
    setAiAnalysis(null);
    setIsFixed(false);
  }, [selectedTwin]);

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span 
              className="text-[10px] font-bold px-2 py-0.5 rounded border flex items-center gap-1"
              style={{ color: brand.primaryColor, backgroundColor: `${brand.primaryColor}10`, borderColor: `${brand.primaryColor}20` }}
            >
              <Zap size={10} /> SYSTEM IS ON
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Toronto Service Hub</span>
          </div>
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase">{brand.companyName} View</h1>
          <p className="text-slate-300 mt-1 text-sm font-medium">Keep track of all units across the city.</p>
        </div>
        <div className="flex items-center gap-4">
          <CostClock />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full lg:min-h-[75vh]">
        
        {/* Col 1: Customer List */}
        <div className="lg:col-span-3 flex flex-col glass rounded-2xl overflow-hidden relative border border-white/10 shadow-lg">
          <div className="scanline" />
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/5">
            <h3 className="font-bold flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white">
              <Activity className="text-emerald-500 w-4 h-4" />
              Client List
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
              <input 
                type="text" 
                placeholder="Find name..." 
                className="bg-black/20 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs font-bold text-white focus:outline-none focus:ring-1 w-36 transition-all placeholder:text-slate-500"
                style={{ '--tw-ring-color': brand.primaryColor } as any}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
            {filteredData.map(twin => (
              <button 
                key={twin.id}
                onClick={() => setSelectedTwin(twin)}
                className={`w-full text-left p-4 rounded-xl transition-all border ${selectedTwin.id === twin.id ? 'bg-white/10 border-white/20 shadow-md' : 'hover:bg-white/5 border-transparent opacity-80 hover:opacity-100'}`}
              >
                <div className="flex justify-between items-start mb-1.5">
                  <span className="font-bold text-sm text-white uppercase tracking-tight">{twin.client_name}</span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-lg font-bold ${twin.health_score > 80 ? 'bg-emerald-500/20 text-emerald-400' : twin.health_score > 60 ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'}`}>
                    {twin.health_score}%
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-300 font-bold uppercase tracking-wide">
                  <MapPin size={10} className="text-red-500" />
                  {twin.city}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Col 2: Interactive Smart System */}
        <div className="lg:col-span-6 glass rounded-2xl flex flex-col p-8 relative overflow-hidden group border border-white/10 shadow-lg">
          <div className="scanline" />
          <div className="flex justify-between items-start mb-10 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[9px] font-bold bg-white/10 px-2 py-0.5 rounded tracking-widest text-slate-200 uppercase tracking-tighter">Code: {selectedTwin.id}</span>
              </div>
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase">{selectedTwin.client_name}</h2>
              <p className="text-slate-200 flex items-center gap-1.5 text-xs font-bold mt-1 uppercase tracking-wider">
                <MapPin size={12} className="text-red-500" /> {selectedTwin.address}, {selectedTwin.city}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em]">Real Time</span>
              </div>
              <span className="text-sm font-bold text-emerald-400 font-mono tracking-tighter uppercase">{selectedTwin.live_vital_signs}</span>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center relative z-10 mb-6 scale-110">
            <FurnaceWireframe twin={selectedTwin} />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 to-transparent pointer-events-none" />
          </div>

          <div className="grid grid-cols-3 gap-8 mt-4 pt-8 border-t border-white/10 relative z-10">
            <div className="text-center">
              <span className="block text-[9px] text-slate-300 uppercase font-bold tracking-widest mb-1">Air Flow</span>
              <span className="text-2xl font-mono font-bold text-white">{selectedTwin.system_breathing}<span className="text-[10px] text-slate-400 ml-1 font-normal">iwc</span></span>
            </div>
            <div className="text-center">
              <span className="block text-[9px] text-slate-300 uppercase font-bold tracking-widest mb-1">Heat Strength</span>
              <span className="text-2xl font-mono font-bold text-white">{selectedTwin.heating_power}°</span>
            </div>
            <div className="text-center">
              <span className="block text-[9px] text-slate-300 uppercase font-bold tracking-widest mb-1">Fan Check</span>
              <span className="text-2xl font-mono font-bold uppercase tracking-tighter" style={{ color: brand.primaryColor }}>{selectedTwin.system_motors}</span>
            </div>
          </div>
        </div>

        {/* Col 3: AI Help Panel */}
        <div className="lg:col-span-3 space-y-6 flex flex-col">
          <div className="glass rounded-2xl p-6 flex-1 flex flex-col relative overflow-hidden border border-white/20">
            <div className="scanline" />
            <h3 className="font-bold flex items-center gap-2 mb-6 text-[10px] uppercase tracking-[0.2em] text-slate-200">
              <BrainCircuit className="text-purple-400 w-4 h-4" />
              Smart Computer Help
            </h3>
            
            <div className="space-y-4 flex-1">
              {!aiAnalysis && !isAnalyzing ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <BrainCircuit className="text-slate-400 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Ask for Help</p>
                    <p className="text-[10px] text-slate-300 mt-1 leading-relaxed font-bold">The computer can check this unit for problems right now.</p>
                  </div>
                  <button 
                    onClick={handleTriage}
                    className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 uppercase tracking-widest"
                  >
                    RUN QUICK CHECK
                  </button>
                </div>
              ) : isAnalyzing ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4 space-y-4">
                  <Loader2 className="animate-spin text-purple-400 w-8 h-8" />
                  <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">Checking data...</p>
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-top-2 space-y-4">
                  <div className={`p-5 rounded-2xl border ${isFixed || aiAnalysis.issue === 'RESOLVED' ? 'bg-emerald-500/20 border-emerald-500/40' : aiAnalysis.canRemoteResolve ? 'bg-emerald-500/20 border-emerald-500/40' : 'bg-red-500/20 border-red-500/40'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                        {isFixed ? 'SUCCESS' : 'Problem Found'}
                      </span>
                      {(aiAnalysis.canRemoteResolve || isFixed) && <ShieldCheck size={14} className="text-emerald-500" />}
                    </div>
                    <p className="text-sm font-bold text-white uppercase">{aiAnalysis.issue}</p>
                    <p className="text-[11px] text-slate-100 mt-3 leading-relaxed italic border-t border-white/10 pt-3">"{aiAnalysis.simpleExplanation}"</p>
                    {aiAnalysis.canRemoteResolve && !isFixing && !isFixed && (
                      <button 
                        onClick={handleRemoteFix}
                        className="w-full mt-4 py-2 px-4 bg-emerald-500 text-white text-[9px] font-bold rounded-xl text-center tracking-[0.2em] shadow-lg hover:bg-emerald-400 transition-colors uppercase"
                      >
                        FIX FROM OFFICE
                      </button>
                    )}
                    {isFixing && (
                      <div className="mt-4 py-2 px-4 bg-emerald-500/20 text-emerald-400 text-[9px] font-bold rounded-xl text-center tracking-[0.2em] flex items-center justify-center gap-2 uppercase">
                        <Loader2 size={12} className="animate-spin" /> SENDING SIGNAL...
                      </div>
                    )}
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                     <span className="text-[9px] text-slate-300 uppercase font-bold tracking-widest">Money Saved</span>
                     <div className="text-lg font-bold text-amber-400 mt-1 tracking-tighter font-mono">{aiAnalysis.canRemoteResolve || isFixed ? '+$250.00' : 'NEED TRUCK'}</div>
                     <p className="text-[10px] text-slate-400 mt-1 font-bold">Saved by staying here.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-col gap-2 relative z-10">
              <Link to={`/certificate/${selectedTwin.id}`} className="w-full py-3 bg-white text-black text-center text-xs font-bold rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest">
                <FileCheck size={14} />
                Get Safety Paper
              </Link>
              <Link to="/accountant" className="w-full py-3 bg-white/10 border border-white/10 text-center text-xs font-bold rounded-xl hover:bg-white/20 transition-colors text-white uppercase tracking-widest">
                Money Reports
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
