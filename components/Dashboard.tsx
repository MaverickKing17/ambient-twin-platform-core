
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Activity, AlertCircle, FileCheck, DollarSign, ShieldCheck, Zap, BrainCircuit, Loader2 } from 'lucide-react';
import { CostClock } from './CostClock';
import { FurnaceWireframe } from './FurnaceWireframe';
import { INITIAL_MOCK_DATA } from '../constants';
import { DigitalTwin, PartnerConfig } from '../types';
import { Link } from 'react-router-dom';
import { triageDiagnostic } from '../services/geminiService';

export const Dashboard: React.FC<{ partner: PartnerConfig }> = ({ partner }) => {
  const [selectedTwin, setSelectedTwin] = useState<DigitalTwin>(INITIAL_MOCK_DATA[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const filteredData = INITIAL_MOCK_DATA.filter(d => 
    d.client_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTriage = async () => {
    setIsAnalyzing(true);
    setAiAnalysis(null);
    const result = await triageDiagnostic(`${selectedTwin.live_vital_signs}. Static: ${selectedTwin.system_breathing}, ΔT: ${selectedTwin.heating_power}, Motors: ${selectedTwin.system_motors}.`);
    setAiAnalysis(result);
    setIsAnalyzing(false);
  };

  useEffect(() => {
    setAiAnalysis(null);
  }, [selectedTwin]);

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
              <Zap size={10} /> SYSTEM SYNC ACTIVE
            </span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Zone: GTA-ENT-01</span>
          </div>
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase">GTA Intelligence Hub</h1>
          <p className="text-slate-400 mt-1 text-sm">Institutional asset oversight for the Greater Toronto Area.</p>
        </div>
        <div className="flex items-center gap-4">
          <CostClock />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full lg:min-h-[75vh]">
        
        {/* Col 1: Asset Ledger */}
        <div className="lg:col-span-3 flex flex-col glass rounded-2xl overflow-hidden relative border border-white/5">
          <div className="scanline" />
          <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/2">
            <h3 className="font-bold flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-400">
              <Activity className="text-emerald-500 w-3 h-3" />
              Asset Ledger
            </h3>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-500 w-3 h-3" />
              <input 
                type="text" 
                placeholder="Find Twin..." 
                className="bg-black/40 border border-white/10 rounded-lg pl-7 pr-2 py-1 text-[10px] font-bold focus:outline-none focus:ring-1 focus:ring-emerald-500 w-32 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            {filteredData.map(twin => (
              <button 
                key={twin.id}
                onClick={() => setSelectedTwin(twin)}
                className={`w-full text-left p-3 rounded-xl transition-all border ${selectedTwin.id === twin.id ? 'bg-white/10 border-white/20 shadow-xl' : 'hover:bg-white/5 border-transparent opacity-60 hover:opacity-100'}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-xs text-white">{twin.client_name}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-black ${twin.health_score > 80 ? 'bg-emerald-500/20 text-emerald-400' : twin.health_score > 60 ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'}`}>
                    {twin.health_score}%
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium italic">
                  <MapPin size={8} />
                  {twin.city}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Col 2: Interactive Diagnostic Twin */}
        <div className="lg:col-span-6 glass rounded-2xl flex flex-col p-8 relative overflow-hidden group border border-white/5 shadow-2xl">
          <div className="scanline" />
          <div className="flex justify-between items-start mb-10 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[9px] font-black bg-white/10 px-2 py-0.5 rounded tracking-widest text-slate-300 uppercase">Twin ID: {selectedTwin.id}</span>
              </div>
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase">{selectedTwin.client_name}</h2>
              <p className="text-slate-500 flex items-center gap-1.5 text-xs font-semibold mt-1">
                <MapPin size={12} className="text-red-500" /> {selectedTwin.address}, {selectedTwin.city}, ON
              </p>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Live Stream</span>
              </div>
              <span className="text-sm font-bold text-emerald-400 font-mono tracking-tighter uppercase">{selectedTwin.live_vital_signs}</span>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center relative z-10 mb-6">
            <FurnaceWireframe twin={selectedTwin} />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 to-transparent pointer-events-none" />
          </div>

          <div className="grid grid-cols-3 gap-8 mt-4 pt-8 border-t border-white/5 relative z-10">
            <div className="text-center">
              <span className="block text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">Breathing</span>
              <span className="text-2xl font-mono font-bold text-white">{selectedTwin.system_breathing}<span className="text-[10px] text-slate-600 ml-1 font-normal italic">iwc</span></span>
            </div>
            <div className="text-center">
              <span className="block text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">Power</span>
              <span className="text-2xl font-mono font-bold text-white">{selectedTwin.heating_power}°<span className="text-[10px] text-slate-600 ml-1 font-normal italic">ΔT</span></span>
            </div>
            <div className="text-center">
              <span className="block text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">Target</span>
              <span className="text-2xl font-mono font-bold text-thermex-blue uppercase tracking-tighter">{selectedTwin.system_motors}</span>
            </div>
          </div>
        </div>

        {/* Col 3: AI Diagnostic Panel */}
        <div className="lg:col-span-3 space-y-6 flex flex-col">
          <div className="glass rounded-2xl p-6 flex-1 flex flex-col relative overflow-hidden border border-white/10">
            <div className="scanline" />
            <h3 className="font-black flex items-center gap-2 mb-6 text-[10px] uppercase tracking-[0.2em] text-slate-400">
              <BrainCircuit className="text-purple-500 w-4 h-4" />
              AI Command Triage
            </h3>
            
            <div className="space-y-4 flex-1">
              {!aiAnalysis && !isAnalyzing ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <BrainCircuit className="text-slate-600 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-300">Analysis Required</p>
                    <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">System requires Gemini interrogation to determine the optimal remote resolution path.</p>
                  </div>
                  <button 
                    onClick={handleTriage}
                    className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-black rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-purple-500/20 uppercase tracking-widest"
                  >
                    RUN AI TRIAGE
                  </button>
                </div>
              ) : isAnalyzing ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4 space-y-4">
                  <Loader2 className="animate-spin text-purple-500 w-8 h-8" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Interrogating Twin Telemetry...</p>
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-top-2 space-y-4">
                  <div className={`p-5 rounded-2xl border ${aiAnalysis.canRemoteResolve ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white">Gemini Verdict</span>
                      {aiAnalysis.canRemoteResolve && <ShieldCheck size={14} className="text-emerald-500" />}
                    </div>
                    <p className="text-sm font-black text-white uppercase">{aiAnalysis.issue}</p>
                    <p className="text-[11px] text-slate-400 mt-3 leading-relaxed italic border-t border-white/5 pt-3">"{aiAnalysis.simpleExplanation}"</p>
                    {aiAnalysis.canRemoteResolve && (
                      <div className="mt-4 py-2 px-4 bg-emerald-500 text-white text-[9px] font-black rounded-xl text-center tracking-[0.2em] shadow-lg shadow-emerald-500/20 cursor-pointer hover:bg-emerald-400 transition-colors">
                        EXECUTE REMOTE RESET
                      </div>
                    )}
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                     <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest">OpEx Savings</span>
                     <div className="text-lg font-bold text-amber-500 mt-1 tracking-tighter">{aiAnalysis.canRemoteResolve ? '+$250.00 RECOVERED' : 'TRUCK DISPATCH REQ'}</div>
                     <p className="text-[10px] text-slate-500 mt-1">Calculated via 401/DVP Burn Formula.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-col gap-2 relative z-10">
              <Link to={`/certificate/${selectedTwin.id}`} className="w-full py-3 bg-white text-black text-center text-xs font-black rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2 shadow-2xl shadow-white/10 uppercase tracking-widest">
                <FileCheck size={14} />
                Generate Audit
              </Link>
              <Link to="/accountant" className="w-full py-3 bg-white/5 border border-white/10 text-center text-xs font-bold rounded-xl hover:bg-white/10 transition-colors text-slate-400 uppercase tracking-widest">
                Financial Core
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
