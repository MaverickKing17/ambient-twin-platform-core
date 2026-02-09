
import React, { useState, useRef, useMemo } from 'react';
import { Globe2, RefreshCw, Link2, ShieldCheck, Zap, Info, CheckCircle2, X, Lock, ExternalLink, ChevronRight, Loader2, Palette, Type as TypeIcon, Image as ImageIcon, Download, Cpu, Sparkles, Send, ClipboardCheck, Fingerprint, Database, Server } from 'lucide-react';
import { INITIAL_MOCK_DATA } from '../constants';
import { BrandConfig } from '../types';

interface OperationsCommandProps {
  brand: BrandConfig;
  onUpdateBrand: (b: BrandConfig) => void;
}

const FLEET_CITIES = ['Mississauga', 'North York', 'Vaughan', 'Brampton', 'Etobicoke', 'Toronto', 'Thornhill'];

const REBATE_QUEUE = [
  { id: 'R-101', client: 'Sarah Johnson', techNotes: "Installed high-efficiency Lennox EL296. Serial: 5821A49201. AFUE 96%. Heat pump addon: XP25. Client pays Enbridge via bill.", status: 'Pending AI Scan', value: 7100 },
  { id: 'R-102', client: 'David Chen', techNotes: "Replace old mid-eff with Daikin Fit 2-ton. SEER 18. AHU serial: D1920384. Outdoor unit: DZ18VC. Enbridge ID: 928374.", status: 'Ready to File', value: 4500 },
  { id: 'R-103', client: 'Anita Sharma', techNotes: "Standard maintenance turned into unit swap. Carrier 59TP6. AFUE 96.5. Filter swap to MERV 11. No heat pump.", status: 'In Review', value: 1500 },
];

export const OperationsCommand: React.FC<OperationsCommandProps> = ({ brand, onUpdateBrand }) => {
  const [selectedFiling, setSelectedFiling] = useState<boolean>(false);
  const [activeFiling, setActiveFiling] = useState<typeof REBATE_QUEUE[0] | null>(null);
  const [filingStep, setFilingStep] = useState<'queue' | 'form' | 'success'>('queue');
  const [isExtracting, setIsExtracting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'authenticating' | 'handshake' | 'connected'>('idle');
  
  const [formData, setFormData] = useState({
    serialNumber: '',
    modelNumber: '',
    efficiencyRating: '',
    installDate: new Date().toISOString().split('T')[0],
    enbridgeAccount: '',
    rebateTier: 'Energy Star Enhanced'
  });

  const [activeIntegration, setActiveIntegration] = useState<{ name: string; url: string; color: string } | null>(null);
  
  const logoInputRef = useRef<HTMLInputElement>(null);

  const fleetStatus = useMemo(() => {
    const status: Record<string, { type: string, active: boolean, client: string }> = {};
    FLEET_CITIES.forEach(city => {
      const twins = INITIAL_MOCK_DATA.filter(t => t.city === city);
      const breaker = twins.find(t => t.alert_type === 'Tripped Breaker');
      const filter = twins.find(t => t.alert_type === 'Dirty Filter');
      const activeAlert = breaker || filter;
      status[city] = {
        type: activeAlert?.alert_type || 'None',
        active: !!activeAlert,
        client: activeAlert?.client_name || twins[0]?.client_name || city
      };
    });
    return status;
  }, []);

  const getCityCoords = (city: string) => {
    const coords: Record<string, { x: number, y: number }> = {
      'Mississauga': { x: 180, y: 340 }, 'North York': { x: 480, y: 180 }, 'Vaughan': { x: 420, y: 120 },
      'Brampton': { x: 220, y: 160 }, 'Etobicoke': { x: 340, y: 280 }, 'Toronto': { x: 520, y: 380 }, 'Thornhill': { x: 500, y: 100 }
    };
    return coords[city] || { x: 400, y: 250 };
  };

  const handleIntegrationClick = (integration: any) => {
    setActiveIntegration(integration);
    setSyncStatus('idle');
  };

  const startAuthFlow = () => {
    setSyncStatus('authenticating');
    setTimeout(() => {
      setSyncStatus('handshake');
      setTimeout(() => {
        setSyncStatus('connected');
        setTimeout(() => {
          setActiveIntegration(null);
          setSyncStatus('idle');
        }, 1500);
      }, 2000);
    }, 1500);
  };

  const runAIExtraction = () => {
    if (!activeFiling) return;
    setIsExtracting(true);
    setTimeout(() => {
      setFormData({
        serialNumber: activeFiling.techNotes.match(/Serial:\s*(\S+)/)?.[1] || '5821A49201',
        modelNumber: activeFiling.techNotes.split(' ')[2] || 'EL296V',
        efficiencyRating: activeFiling.techNotes.match(/(\d+)%/)?.[0] || '96%',
        installDate: new Date().toISOString().split('T')[0],
        enbridgeAccount: activeFiling.techNotes.match(/ID:\s*(\d+)/)?.[1] || '882-938-12',
        rebateTier: 'Heat Pump Hybrid Program'
      });
      setIsExtracting(false);
    }, 2500);
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFilingStep('success');
    }, 2500);
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-1000 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Enterprise Control Center</h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-2 flex items-center gap-2">
            <RefreshCw size={12} className="animate-spin text-emerald-400" />
            Live Market Authority Active
          </p>
        </div>
        <div className="flex items-center gap-3 no-print">
          <div className="glass px-6 py-3 rounded-2xl border-l-4 border-emerald-500 flex items-center gap-4 shadow-xl">
             <ShieldCheck className="text-emerald-400" size={24} />
             <div>
               <div className="text-[10px] font-bold text-white uppercase tracking-widest text-left">Security Rank</div>
               <div className="text-sm font-bold text-slate-300">Tier 1 Encryption</div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Operations & Config */}
        <div className="lg:col-span-4 space-y-8">
          <div className="glass rounded-3xl p-8 border border-white/10 space-y-8 shadow-xl relative overflow-hidden">
            <div className="scanline opacity-10" />
            <h3 className="font-bold text-xs uppercase tracking-[0.3em] text-slate-200 flex items-center gap-2">
              <Palette size={16} style={{ color: brand.primaryColor }} />
              Platform Branding
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Enterprise Title</label>
                <div className="relative">
                  <TypeIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input type="text" value={brand.companyName} onChange={(e) => onUpdateBrand({ ...brand, companyName: e.target.value })} className="w-full h-14 bg-black/40 border border-white/10 rounded-2xl pl-12 pr-4 text-sm font-bold text-white focus:outline-none focus:ring-2 transition-all" style={{ '--tw-ring-color': brand.primaryColor } as any} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Company Identity</label>
                <input type="file" accept="image/*" className="hidden" ref={logoInputRef} onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => onUpdateBrand({ ...brand, logoUrl: reader.result as string });
                    reader.readAsDataURL(file);
                  }
                }} />
                <div onClick={() => logoInputRef.current?.click()} className="w-full h-32 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-white/30 transition-all bg-black/20 group">
                  {brand.logoUrl ? <img src={brand.logoUrl} alt="Logo" className="w-full h-full object-contain p-4" /> : <><ImageIcon className="text-slate-600 mb-2 group-hover:scale-110 transition-transform" /><span className="text-[10px] font-bold text-slate-500 uppercase">Load SVG Identity</span></>}
                </div>
              </div>
            </div>
          </div>

          {/* Connected Apps Section (Sync) */}
          <div className="glass rounded-3xl p-8 border border-white/10 space-y-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5"><Link2 size={64} /></div>
            <h3 className="font-bold text-xs uppercase tracking-[0.3em] text-white flex items-center gap-2">
              <RefreshCw size={16} className="text-thermex-blue" />
              API Handshake Center
            </h3>
            <div className="space-y-3">
              {[
                { name: 'ServiceTitan', status: 'Active', color: 'emerald', url: 'https://www.servicetitan.com' },
                { name: 'Jobber', status: 'Working', color: 'amber', url: 'https://getjobber.com' },
                { name: 'Housecall Pro', status: 'Ready', color: 'emerald', url: 'https://www.housecallpro.com' }
              ].map(sync => (
                <button 
                  key={sync.name} 
                  onClick={() => handleIntegrationClick(sync)}
                  className="w-full flex justify-between items-center p-5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-black/40 flex items-center justify-center border border-white/10 group-hover:border-thermex-blue transition-colors">
                      <Server size={18} className="text-thermex-blue" />
                    </div>
                    <div className="text-left">
                      <span className="text-xs font-black text-white uppercase tracking-tight">{sync.name}</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className={`w-1.5 h-1.5 rounded-full bg-${sync.color}-500 animate-pulse`} />
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{sync.status}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-600 group-hover:text-white transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Map & AI Engine */}
        <div className="lg:col-span-8 space-y-8">
          {/* Problem Map */}
          <div className="glass rounded-[3rem] p-10 relative overflow-hidden border border-white/10 min-h-[480px] shadow-2xl flex flex-col">
            <div className="scanline opacity-20" />
            <div className="flex justify-between items-center mb-8 relative z-10">
              <div className="space-y-1">
                <h3 className="font-black text-sm uppercase tracking-[0.4em] text-white flex items-center gap-2">
                  <Globe2 size={18} className="text-thermex-blue" />
                  Fleet Intelligence Map
                </h3>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Toronto & GTA Coverage Authority</p>
              </div>
            </div>
            <div className="flex-1 bg-slate-900/40 rounded-[2rem] border border-white/5 relative">
              <svg viewBox="0 0 800 500" className="w-full h-full opacity-60">
                <path d="M0,420 Q400,380 800,470 V500 H0 Z" fill="#0f172a" opacity="0.3" />
                {FLEET_CITIES.map((city) => {
                  const status = fleetStatus[city];
                  const { x, y } = getCityCoords(city);
                  return (
                    <g key={city} className="cursor-help group/city">
                      {status.active && <circle cx={x} cy={y} r="18" fill={status.type === 'Tripped Breaker' ? '#ef44441a' : '#f59e0b1a'} className="animate-ping" />}
                      <circle cx={x} cy={y} r="6" fill={status.active ? (status.type === 'Tripped Breaker' ? '#ef4444' : '#f59e0b') : '#334155'} />
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* AI Filing Engine Card */}
            <div 
              className="glass rounded-[2.5rem] p-10 border border-emerald-500/30 bg-emerald-500/5 space-y-6 cursor-pointer hover:border-emerald-500/60 transition-all shadow-2xl relative group overflow-hidden"
              onClick={() => { setSelectedFiling(true); setFilingStep('queue'); }}
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform"><Database size={48} /></div>
              <h3 className="font-black text-xs uppercase tracking-[0.3em] text-emerald-400 flex items-center gap-2">
                <Sparkles size={16} />
                AI Rebate Filing Engine
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-black/40 rounded-3xl border border-white/10">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Pending Scans</span>
                  <div className="text-3xl font-black text-white font-mono mt-1">03</div>
                </div>
                <div className="p-6 bg-black/40 rounded-3xl border border-white/10">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">YTD Recovery</span>
                  <div className="text-3xl font-black text-emerald-400 font-mono mt-1">$84K</div>
                </div>
              </div>
              <button className="w-full py-5 bg-emerald-500 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.3em] hover:bg-emerald-400 transition-colors shadow-xl">
                Enter Filing Laboratory
              </button>
            </div>

            {/* System Status Card */}
            <div className="glass rounded-[2.5rem] p-10 border border-white/10 bg-black/20 space-y-6 flex flex-col justify-center text-center">
               <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-2">
                  <Fingerprint className="text-slate-400" size={32} />
               </div>
               <h4 className="text-white font-black uppercase text-sm tracking-widest">Biometric Operations</h4>
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">Continuous hardware attestation and zero-trust logging enabled for all GTA service hubs.</p>
            </div>
          </div>
        </div>
      </div>

      {/* REBATE LABORATORY MODAL */}
      {selectedFiling && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={() => setSelectedFiling(false)} />
          <div className="relative glass w-full max-w-5xl rounded-[3.5rem] p-12 border border-white/20 shadow-2xl animate-in zoom-in duration-300 flex flex-col max-h-[92vh]">
            <div className="scanline opacity-20" />
            <div className="flex justify-between items-start mb-10 shrink-0">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-[2rem] bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30 shadow-inner">
                  <Cpu className="text-emerald-500 animate-pulse" size={36} />
                </div>
                <div>
                  <h2 className="text-4xl font-black text-white uppercase tracking-tighter">AI Filing Laboratory</h2>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2 mt-1">
                    <RefreshCw size={12} className="text-emerald-500 animate-spin" />
                    Government Sync Gateway v4.2
                  </p>
                </div>
              </div>
              <button onClick={() => setSelectedFiling(false)} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all shadow-xl">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-6">
              {filingStep === 'queue' && (
                <div className="space-y-8">
                  <h3 className="text-xs font-black text-white uppercase tracking-[0.4em] mb-6 border-b border-white/10 pb-4">Incoming Field Data Stream</h3>
                  <div className="space-y-4">
                    {REBATE_QUEUE.map(item => (
                      <div key={item.id} className="p-8 bg-black/40 border border-white/5 rounded-[2.5rem] flex justify-between items-center group hover:bg-white/5 hover:border-white/20 transition-all shadow-lg">
                        <div className="space-y-2">
                          <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em]">Asset Ref: {item.id}</span>
                          <div className="text-2xl font-black text-white uppercase tracking-tight">{item.client}</div>
                          <div className="text-[10px] text-emerald-400/60 font-mono italic">"AI Extraction Ready: Technical logs detected"</div>
                        </div>
                        <div className="flex items-center gap-10">
                          <div className="text-right">
                             <div className="text-2xl font-black text-emerald-400 font-mono tracking-tighter">+${item.value}</div>
                             <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Recovery Target</div>
                          </div>
                          <button 
                            onClick={() => { setActiveFiling(item); setFilingStep('form'); }}
                            className="px-10 py-4 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-200 transition-all shadow-xl flex items-center gap-3"
                          >
                            Process <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filingStep === 'form' && activeFiling && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in slide-in-from-right-12 duration-700">
                  <div className="space-y-8">
                    <div className="bg-black/60 rounded-[3rem] p-10 border border-white/5 space-y-6 relative overflow-hidden shadow-2xl">
                      <div className="scanline opacity-10" />
                      <div className="flex items-center justify-between">
                         <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.4em]">Technician Input Stream</h3>
                         <div className="px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/30 text-[8px] font-black text-purple-400 uppercase tracking-widest">Unstructured Text</div>
                      </div>
                      <div className="p-6 bg-black/40 rounded-2xl font-mono text-xs text-emerald-500/80 leading-relaxed border border-white/5 min-h-[160px] shadow-inner">
                        {activeFiling.techNotes}
                      </div>
                      <button 
                        onClick={runAIExtraction}
                        disabled={isExtracting}
                        className="w-full h-16 bg-purple-600/10 border border-purple-500/40 text-purple-300 rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:bg-purple-600 hover:text-white transition-all flex items-center justify-center gap-4 disabled:opacity-50 shadow-2xl"
                      >
                        {isExtracting ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
                        {isExtracting ? 'DECODING PARAMETERS...' : 'RUN AI AUTO-FILL'}
                      </button>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-[3rem] p-10 border border-white/10 space-y-8 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-white/5 pb-6">
                       <h3 className="text-xs font-black text-white uppercase tracking-[0.4em]">Structured Rebate Schema</h3>
                       <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 rounded-full text-[9px] font-black text-emerald-400 tracking-widest uppercase">
                         <ShieldCheck size={12} /> Compliance Validated
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Asset Serial</label>
                        <input type="text" value={formData.serialNumber} className="w-full h-12 bg-black/40 border border-white/10 rounded-xl px-5 text-sm font-mono font-bold text-white shadow-inner" readOnly />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Model Spec</label>
                        <input type="text" value={formData.modelNumber} className="w-full h-12 bg-black/40 border border-white/10 rounded-xl px-5 text-sm font-mono font-bold text-white shadow-inner" readOnly />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Efficiency Delta</label>
                        <input type="text" value={formData.efficiencyRating} className="w-full h-12 bg-black/40 border border-white/10 rounded-xl px-5 text-sm font-bold text-emerald-400" readOnly />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Enbridge ID</label>
                        <input type="text" value={formData.enbridgeAccount} className="w-full h-12 bg-black/40 border border-white/10 rounded-xl px-5 text-sm font-bold text-white" readOnly />
                      </div>
                    </div>

                    <button 
                      onClick={handleFinalSubmit}
                      disabled={isSubmitting || !formData.serialNumber}
                      className="w-full h-20 bg-emerald-500 text-white rounded-3xl font-black uppercase text-xs tracking-[0.4em] hover:bg-emerald-400 transition-all shadow-[0_20px_40px_rgba(16,185,129,0.3)] flex items-center justify-center gap-4 disabled:opacity-50 mt-6"
                    >
                      {isSubmitting ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
                      {isSubmitting ? 'ENCRYPTING...' : 'TRANSMIT TO REGULATOR'}
                    </button>
                  </div>
                </div>
              )}

              {filingStep === 'success' && (
                <div className="py-24 flex flex-col items-center justify-center text-center space-y-10 animate-in zoom-in duration-700">
                  <div className="w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(16,185,129,0.6)]">
                     <ClipboardCheck size={64} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-5xl font-black text-white uppercase tracking-tighter">Transmission Authorized</h3>
                    <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs mt-4">Municipal Receipt: #HUB-ENB-{Math.floor(Math.random()*900000)}</p>
                  </div>
                  <button onClick={() => { setFilingStep('queue'); setActiveFiling(null); }} className="px-16 h-16 bg-white text-black rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] hover:bg-slate-200 transition-all shadow-2xl">
                    Return to Operational Queue
                  </button>
                </div>
              )}
            </div>

            <div className="mt-10 pt-8 border-t border-white/10 flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] shrink-0">
               <div className="flex items-center gap-3"><Lock size={14} className="text-emerald-500" /> End-to-End Encrypted Handshake</div>
               <div>IESO-ENB SYNC PROTOCOL v4.2</div>
            </div>
          </div>
        </div>
      )}

      {/* AUTH HANDSHAKE MODAL */}
      {activeIntegration && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => setActiveIntegration(null)} />
          <div className="relative glass w-full max-w-lg rounded-[4rem] p-12 border border-white/20 shadow-2xl animate-in zoom-in duration-500">
            <div className="scanline opacity-20" />
            <div className="flex justify-between items-start mb-10">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-[1.5rem] bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shadow-inner">
                  <Fingerprint className="text-purple-400" size={32} />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">Secure Gateway</h2>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">Connecting to {activeIntegration.name}</p>
                </div>
              </div>
              <button onClick={() => setActiveIntegration(null)} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all shadow-xl">
                <X size={20} />
              </button>
            </div>

            {syncStatus === 'idle' ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Access Token / ID</label>
                    <input type="text" placeholder="name@enterprise.ca" className="w-full h-16 bg-black/40 border border-white/10 rounded-2xl px-6 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-slate-600 shadow-inner" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Secure Passcode</label>
                    <input type="password" placeholder="••••••••••••" className="w-full h-16 bg-black/40 border border-white/10 rounded-2xl px-6 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-slate-600 shadow-inner" />
                  </div>
                </div>
                <button 
                  onClick={startAuthFlow}
                  className="w-full h-20 bg-purple-600 text-white rounded-3xl font-black uppercase tracking-[0.4em] text-xs hover:bg-purple-500 transition-all shadow-[0_20px_40px_rgba(147,51,234,0.3)] flex items-center justify-center gap-4"
                >
                  <Lock size={18} /> Initiate Handshake
                </button>
                <p className="text-[9px] text-center text-slate-500 font-black uppercase tracking-widest">Biometric bypass available for verified hardware nodes</p>
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-10">
                 {syncStatus === 'authenticating' && (
                   <div className="animate-in zoom-in duration-300">
                     <Loader2 className="animate-spin text-purple-400 mb-6 mx-auto" size={64} />
                     <h3 className="text-xl font-black text-white uppercase tracking-[0.2em]">Authenticating Keys...</h3>
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">Validating Enterprise Token #X92-J81</p>
                   </div>
                 )}
                 {syncStatus === 'handshake' && (
                   <div className="animate-in zoom-in duration-300">
                     <div className="flex items-center gap-6 mb-8 justify-center">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center animate-pulse"><Database size={32} className="text-thermex-blue" /></div>
                        <div className="h-[2px] w-12 bg-thermex-blue animate-pulse" />
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center animate-pulse"><Server size={32} className="text-purple-400" /></div>
                     </div>
                     <h3 className="text-xl font-black text-white uppercase tracking-[0.2em]">Secure Handshake...</h3>
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">Synchronizing CRM Databases</p>
                   </div>
                 )}
                 {syncStatus === 'connected' && (
                   <div className="animate-in zoom-in duration-500 text-center">
                     <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(16,185,129,0.5)] mx-auto mb-8">
                       <ShieldCheck size={48} className="text-white" />
                     </div>
                     <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Gateway Secured</h3>
                     <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mt-4">Status: Connection Nominal</p>
                   </div>
                 )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
