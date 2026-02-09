
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Globe2, RefreshCw, Database, CloudUpload, Link2, ShieldCheck, AlertCircle, HardDrive, Wind, Zap, Info, ArrowUpRight, CheckCircle2, X, Lock, ExternalLink, ChevronRight, FileText, UserCircle, Loader2, Palette, Type as TypeIcon, Image as ImageIcon, Download, Cpu, Sparkles, Send, ClipboardCheck } from 'lucide-react';
import { INITIAL_MOCK_DATA } from '../constants';
import { DigitalTwin, BrandConfig } from '../types';

interface OperationsCommandProps {
  brand: BrandConfig;
  onUpdateBrand: (b: BrandConfig) => void;
}

const FLEET_CITIES = ['Mississauga', 'North York', 'Vaughan', 'Brampton', 'Etobicoke', 'Toronto', 'Thornhill'];

// Mock Rebate Data for the Queue
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
  
  // Structured Form State
  const [formData, setFormData] = useState({
    serialNumber: '',
    modelNumber: '',
    efficiencyRating: '',
    installDate: new Date().toISOString().split('T')[0],
    enbridgeAccount: '',
    rebateTier: 'Energy Star Enhanced'
  });

  const [activeIntegration, setActiveIntegration] = useState<{ name: string; url: string } | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const runAIExtraction = () => {
    if (!activeFiling) return;
    setIsExtracting(true);
    // Simulate AI parsing text logs
    setTimeout(() => {
      setFormData({
        serialNumber: activeFiling.techNotes.match(/Serial:\s*(\S+)/)?.[1] || 'S/N-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        modelNumber: activeFiling.techNotes.split(' ')[2] || 'MODEL-X',
        efficiencyRating: activeFiling.techNotes.match(/(\d+)%/)?.[0] || '96%',
        installDate: new Date().toISOString().split('T')[0],
        enbridgeAccount: activeFiling.techNotes.match(/ID:\s*(\d+)/)?.[1] || '882-938-12',
        rebateTier: 'Heat Pump Hybrid Program'
      });
      setIsExtracting(false);
    }, 2000);
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFilingStep('success');
    }, 2500);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => onUpdateBrand({ ...brand, logoUrl: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleLogin = () => {
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      setActiveIntegration(null);
      alert('Successfully connected to service provider.');
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        alert(`Successfully parsed ${e.target.files?.length} service logs.`);
      }, 2000);
    }
  };

  const integrations = [
    { name: 'ServiceTitan', status: 'Active', color: 'emerald', url: 'https://www.servicetitan.com' },
    { name: 'Jobber', status: 'Working', color: 'amber', url: 'https://getjobber.com' },
    { name: 'Housecall Pro', status: 'Active', color: 'emerald', url: 'https://www.housecallpro.com' }
  ];

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-1000 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Agency Control Page</h1>
          <p className="text-slate-300 font-bold uppercase tracking-[0.2em] text-[10px] mt-2 flex items-center gap-2">
            <RefreshCw size={12} className="animate-spin text-emerald-400" />
            Live Update Engine Active
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass px-6 py-3 rounded-2xl border-l-4 border-emerald-500 flex items-center gap-4">
             <ShieldCheck className="text-emerald-400" size={24} />
             <div>
               <div className="text-[10px] font-bold text-white uppercase tracking-widest text-left">Safe System</div>
               <div className="text-sm font-bold text-slate-300">Working Perfectly</div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Col 1: Brand Customization */}
        <div className="lg:col-span-4 space-y-8">
          <div className="glass rounded-3xl p-8 border border-white/10 space-y-8 shadow-xl relative overflow-hidden">
            <div className="scanline opacity-10" />
            <h3 className="font-bold text-xs uppercase tracking-[0.3em] text-slate-200 flex items-center gap-2">
              <Palette size={16} style={{ color: brand.primaryColor }} />
              Brand & Identity
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Company Name</label>
                <div className="relative">
                  <TypeIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input 
                    type="text"
                    value={brand.companyName}
                    onChange={(e) => onUpdateBrand({ ...brand, companyName: e.target.value })}
                    className="w-full h-14 bg-black/20 border border-white/10 rounded-2xl pl-12 pr-4 text-sm font-bold text-white focus:outline-none focus:ring-2 transition-all"
                    style={{ '--tw-ring-color': brand.primaryColor } as any}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Brand Primary Color</label>
                <div className="flex gap-4">
                  <input type="color" value={brand.primaryColor} onChange={(e) => onUpdateBrand({ ...brand, primaryColor: e.target.value })} className="w-14 h-14 bg-black/20 border border-white/10 rounded-2xl p-1 cursor-pointer overflow-hidden" />
                  <input type="text" value={brand.primaryColor} onChange={(e) => onUpdateBrand({ ...brand, primaryColor: e.target.value })} className="flex-1 h-14 bg-black/20 border border-white/10 rounded-2xl px-4 text-sm font-mono font-bold text-white focus:outline-none focus:ring-2 transition-all" style={{ '--tw-ring-color': brand.primaryColor } as any} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Company Logo</label>
                <input type="file" accept="image/*" className="hidden" ref={logoInputRef} onChange={handleLogoUpload} />
                <div onClick={() => logoInputRef.current?.click()} className="w-full h-32 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-white/30 transition-all group overflow-hidden bg-black/10">
                  {brand.logoUrl ? <img src={brand.logoUrl} alt="Preview" className="w-full h-full object-contain p-4" /> : <><ImageIcon className="text-slate-500 mb-2 group-hover:scale-110 transition-transform" /><span className="text-[10px] font-bold text-slate-400 uppercase">Upload Logo File</span></>}
                </div>
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl p-8 border border-white/10 space-y-6 shadow-lg">
            <h3 className="font-bold text-xs uppercase tracking-[0.3em] text-slate-200 flex items-center gap-2"><Link2 size={16} className="text-purple-400" />Connected Business Apps</h3>
            <div className="space-y-3">
              {integrations.map(sync => (
                <button key={sync.name} onClick={() => setActiveIntegration(sync)} className="w-full flex justify-between items-center p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center border border-white/5 group-hover:border-purple-400 transition-colors"><UserCircle size={14} className="text-purple-400" /></div>
                    <div><span className="text-xs font-bold text-white uppercase tracking-tight group-hover:text-purple-300 transition-colors">{sync.name}</span><div className="flex items-center gap-1.5 mt-0.5"><div className={`w-1.5 h-1.5 rounded-full bg-${sync.color}-500 ${sync.status === 'Working' ? 'animate-pulse' : ''}`} /><span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{sync.status}</span></div></div>
                  </div>
                  <ChevronRight size={16} className="text-slate-500 group-hover:text-white transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Col 2: Map & Operations */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="glass rounded-3xl p-8 relative overflow-hidden border border-white/10 min-h-[500px] flex flex-col shadow-lg">
            <div className="scanline opacity-20" />
            <div className="flex justify-between items-center mb-8 relative z-10">
              <div className="space-y-1">
                <h3 className="font-bold text-xs uppercase tracking-[0.3em] text-white flex items-center gap-2"><Globe2 size={16} className="text-thermex-blue" />Problem Map: Toronto Area</h3>
                <p className="text-[9px] text-slate-300 font-bold uppercase tracking-widest">Live Fleet Health Dashboard</p>
              </div>
            </div>
            
            <div className="flex-1 bg-slate-800/20 rounded-3xl border border-white/5 relative group">
              <svg viewBox="0 0 800 500" className="w-full h-full opacity-60">
                <defs><filter id="glow"><feGaussianBlur stdDeviation="2.5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
                <path d="M0,420 Q400,380 800,470 V500 H0 Z" fill="#1e293b" opacity="0.3" />
                {FLEET_CITIES.map((cityName) => {
                  const status = fleetStatus[cityName];
                  const { x, y } = getCityCoords(cityName);
                  const color = status.type === 'Tripped Breaker' ? '#ef4444' : (status.type === 'Dirty Filter' ? '#f59e0b' : '#64748b');
                  return (
                    <g key={cityName} filter="url(#glow)" className="cursor-pointer group/marker">
                      {status.active && <circle cx={x} cy={y} r="15" fill={status.type === 'Tripped Breaker' ? '#ef44441a' : '#f59e0b1a'} className="animate-ping" />}
                      <circle cx={x} cy={y} r="6" fill={color} />
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass rounded-3xl p-8 border border-emerald-500/30 bg-emerald-500/5 space-y-6 cursor-pointer hover:border-emerald-500/60 transition-all shadow-lg" onClick={() => { setSelectedFiling(true); setFilingStep('queue'); }}>
              <div className="flex justify-between items-center"><h3 className="font-bold text-xs uppercase tracking-[0.2em] text-emerald-400 flex items-center gap-2"><CheckCircle2 size={16} />AI Rebate Filing</h3></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-black/20 rounded-2xl border border-white/5"><span className="text-[10px] font-bold text-slate-300 uppercase tracking-tight">Pending Scan</span><div className="text-2xl font-bold text-white font-mono mt-1">3</div></div>
                <div className="p-4 bg-black/20 rounded-2xl border border-white/5"><span className="text-[10px] font-bold text-slate-300 uppercase tracking-tight">Recovered</span><div className="text-2xl font-bold text-emerald-400 font-mono mt-1">$84.5K</div></div>
              </div>
              <button className="w-full py-4 bg-emerald-500 text-white font-bold rounded-2xl text-[11px] uppercase tracking-widest hover:bg-emerald-400 transition-colors shadow-lg">Open Filing Engine</button>
            </div>

            <div className="glass rounded-3xl p-8 border border-white/10 bg-gradient-to-br from-indigo-500/5 to-transparent shadow-lg relative flex flex-col justify-center">
              <input type="file" multiple className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
              <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center group hover:border-indigo-400 transition-all cursor-pointer">
                {isUploading ? <><Loader2 className="animate-spin text-indigo-400 mb-4" size={48} /><p className="text-xs font-bold text-white uppercase tracking-widest">Parsing Logs...</p></> : <><CloudUpload className="text-slate-400 group-hover:text-indigo-400 group-hover:scale-105 transition-all mb-4" size={48} /><p className="text-xs font-bold text-white uppercase tracking-widest">Drop Work Logs</p></>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* REBATE MODAL ENGINE */}
      {selectedFiling && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" onClick={() => setSelectedFiling(false)} />
          <div className="relative glass w-full max-w-4xl rounded-[3rem] p-10 border border-white/20 shadow-2xl animate-in zoom-in duration-300 flex flex-col max-h-[90vh]">
            <div className="scanline opacity-20" />
            
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-8 shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                  <Sparkles className="text-emerald-500 animate-pulse" size={28} />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter">AI Auto-Filing Engine</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 mt-1">
                    <RefreshCw size={12} className="text-emerald-500 animate-spin" />
                    Syncing with Enbridge/IESO Rebate Servers
                  </p>
                </div>
              </div>
              <button onClick={() => setSelectedFiling(false)} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
              {filingStep === 'queue' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                  <div className="bg-black/20 rounded-2xl border border-white/10 p-6">
                    <h3 className="text-xs font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                       <Cpu size={14} className="text-purple-400" />
                       Unparsed Intake Queue
                    </h3>
                    <div className="space-y-3">
                      {REBATE_QUEUE.map(item => (
                        <div key={item.id} className="p-5 bg-white/5 border border-white/5 rounded-2xl flex justify-between items-center group hover:bg-white/10 transition-all">
                          <div className="space-y-1">
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">ID: {item.id}</span>
                            <div className="text-lg font-bold text-white uppercase">{item.client}</div>
                            <div className="text-[10px] text-slate-400 font-medium italic line-clamp-1 max-w-md">"{item.techNotes}"</div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                               <div className="text-xs font-black text-emerald-400 font-mono tracking-tighter uppercase">+${item.value}</div>
                               <div className="text-[8px] font-bold text-slate-500 uppercase">Est. Rebate</div>
                            </div>
                            <button 
                              onClick={() => { setActiveFiling(item); setFilingStep('form'); }}
                              className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-white uppercase tracking-widest hover:bg-white text-black transition-all flex items-center gap-2"
                            >
                              Process <ChevronRight size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {filingStep === 'form' && activeFiling && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in slide-in-from-right-8 duration-500">
                  {/* Left: AI Log Analysis */}
                  <div className="space-y-6">
                    <div className="bg-black/40 rounded-[2rem] p-8 border border-white/5 space-y-4">
                      <div className="flex items-center justify-between">
                         <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Technician Field Log</h3>
                         <button onClick={() => setFilingStep('queue')} className="text-[9px] font-bold text-slate-500 hover:text-white uppercase tracking-widest flex items-center gap-1">
                           <X size={12} /> Cancel
                         </button>
                      </div>
                      <div className="p-4 bg-black/60 rounded-xl font-mono text-xs text-emerald-400 leading-relaxed border border-white/5 min-h-[120px]">
                        {activeFiling.techNotes}
                      </div>
                      <button 
                        onClick={runAIExtraction}
                        disabled={isExtracting}
                        className="w-full h-14 bg-purple-600/20 border border-purple-500/40 text-purple-300 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                      >
                        {isExtracting ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                        {isExtracting ? 'DECODING VITAL SIGNS...' : 'AI AUTO-EXTRACT DATA'}
                      </button>
                    </div>

                    <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-[2rem] flex items-center gap-4">
                       <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center"><Info size={20} className="text-emerald-500" /></div>
                       <p className="text-[10px] font-bold text-slate-300 leading-relaxed uppercase">The AI is trained on <span className="text-white">IESO 2026 Guidelines</span>. It automatically spots heat pump SEER ratings and AFUE percentages from messy text.</p>
                    </div>
                  </div>

                  {/* Right: The Rebate Form */}
                  <div className="bg-white/5 rounded-[2rem] p-8 border border-white/10 space-y-6">
                    <div className="flex items-center justify-between mb-2">
                       <h3 className="text-xs font-black text-white uppercase tracking-widest">Official Form Data</h3>
                       <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/20 rounded text-[8px] font-bold text-emerald-400 tracking-widest uppercase">
                         <ShieldCheck size={10} /> Validated
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">Serial Number</label>
                        <input type="text" value={formData.serialNumber} className="w-full h-11 bg-black/20 border border-white/10 rounded-xl px-4 text-xs font-mono font-bold text-white" readOnly />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">Model #</label>
                        <input type="text" value={formData.modelNumber} className="w-full h-11 bg-black/20 border border-white/10 rounded-xl px-4 text-xs font-mono font-bold text-white" readOnly />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">AFUE/SEER Rating</label>
                        <input type="text" value={formData.efficiencyRating} className="w-full h-11 bg-black/20 border border-white/10 rounded-xl px-4 text-xs font-bold text-emerald-400" readOnly />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">Enbridge Acct</label>
                        <input type="text" value={formData.enbridgeAccount} className="w-full h-11 bg-black/20 border border-white/10 rounded-xl px-4 text-xs font-bold text-white" readOnly />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                       <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">Selected Rebate Pathway</label>
                       <div className="w-full h-12 bg-white/5 border border-emerald-500/30 rounded-xl px-4 flex items-center justify-between">
                          <span className="text-[10px] font-black text-emerald-400 uppercase">{formData.rebateTier}</span>
                          <CheckCircle2 size={16} className="text-emerald-500" />
                       </div>
                    </div>

                    <button 
                      onClick={handleFinalSubmit}
                      disabled={isSubmitting || !formData.serialNumber}
                      className="w-full h-16 bg-emerald-500 text-white rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3 disabled:opacity-50 mt-4"
                    >
                      {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                      {isSubmitting ? 'TRANSMITTING...' : 'TRANSMIT TO ENBRIDGE'}
                    </button>
                  </div>
                </div>
              )}

              {filingStep === 'success' && (
                <div className="py-20 flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.5)]">
                     <ClipboardCheck size={48} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-white uppercase tracking-tighter">Transmission Successful</h3>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-3">Rebate Application Ref: #ENB-58293-192</p>
                  </div>
                  <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] max-w-md">
                     <p className="text-sm text-slate-300 leading-relaxed font-bold">
                       The customer will receive an email confirmation within 15 minutes. Estimated recovery of <span className="text-emerald-400">${activeFiling?.value}</span> has been logged to your corporate dashboard.
                     </p>
                  </div>
                  <button onClick={() => { setFilingStep('queue'); setActiveFiling(null); }} className="px-12 h-14 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-100 transition-all">
                    Back to Queue
                  </button>
                </div>
              )}
            </div>

            {/* Footer Disclosure */}
            <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center text-[9px] font-black text-slate-500 uppercase tracking-widest shrink-0">
               <div className="flex items-center gap-2">
                 <Lock size={12} /> Encrypted Submission
               </div>
               <div>IESO-ENB SYNC v4.2</div>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal (Stay as is) */}
      {activeIntegration && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-3xl" onClick={() => setActiveIntegration(null)} />
          <div className="relative glass w-full max-md rounded-[3rem] p-10 border border-white/20 shadow-2xl animate-in zoom-in duration-300">
             {/* Content remains similar but with consistent styling */}
             <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30"><Lock className="text-purple-400" size={24} /></div>
                <div><h2 className="text-2xl font-black text-white uppercase tracking-tighter">Sign In</h2><p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Link with {activeIntegration.name}</p></div>
              </div>
              <button onClick={() => setActiveIntegration(null)} className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"><X size={16} /></button>
            </div>
            <div className="space-y-6">
              <input type="text" placeholder="name@company.ca" className="w-full h-14 bg-black/20 border border-white/10 rounded-2xl px-5 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-slate-500" />
              <input type="password" placeholder="••••••••••••" className="w-full h-14 bg-black/20 border border-white/10 rounded-2xl px-5 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-slate-500" />
              <button onClick={handleLogin} disabled={isLoggingIn} className="w-full h-14 bg-purple-600 text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-purple-500 transition-all shadow-xl disabled:opacity-50">
                {isLoggingIn ? <Loader2 className="animate-spin mx-auto" size={20} /> : 'Log In Now'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
