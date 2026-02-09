
import React, { useState, useEffect, useRef } from 'react';
import { Globe2, RefreshCw, Database, CloudUpload, Link2, ShieldCheck, AlertCircle, HardDrive, Wind, Zap, Info, ArrowUpRight, CheckCircle2, X, Lock, ExternalLink, ChevronRight, FileText, UserCircle, Loader2, Palette, Type as TypeIcon, Image as ImageIcon } from 'lucide-react';
import { INITIAL_MOCK_DATA } from '../constants';
import { DigitalTwin, BrandConfig } from '../types';

interface OperationsCommandProps {
  brand: BrandConfig;
  onUpdateBrand: (b: BrandConfig) => void;
}

export const OperationsCommand: React.FC<OperationsCommandProps> = ({ brand, onUpdateBrand }) => {
  const [activeAlerts, setActiveAlerts] = useState<DigitalTwin[]>([]);
  const [selectedFiling, setSelectedFiling] = useState<boolean>(false);
  const [activeIntegration, setActiveIntegration] = useState<{ name: string; url: string } | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const alerts = INITIAL_MOCK_DATA.filter(twin => twin.alert_type && twin.alert_type !== 'None');
    setActiveAlerts(alerts);
  }, []);

  const getCityCoords = (city: string) => {
    const coords: Record<string, { x: number, y: number }> = {
      'Mississauga': { x: 180, y: 340 },
      'North York': { x: 480, y: 180 },
      'Vaughan': { x: 420, y: 120 },
      'Brampton': { x: 220, y: 160 },
      'Etobicoke': { x: 340, y: 280 },
      'Toronto': { x: 520, y: 380 },
      'Thornhill': { x: 500, y: 100 }
    };
    return coords[city] || { x: 400, y: 250 };
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateBrand({ ...brand, logoUrl: reader.result as string });
      };
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

  const handleDownloadForms = () => {
    alert('Preparing your money back forms for download...');
    setTimeout(() => {
      alert('Download started. Please check your browser downloads.');
    }, 1000);
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
                  <input 
                    type="color"
                    value={brand.primaryColor}
                    onChange={(e) => onUpdateBrand({ ...brand, primaryColor: e.target.value })}
                    className="w-14 h-14 bg-black/20 border border-white/10 rounded-2xl p-1 cursor-pointer overflow-hidden"
                  />
                  <input 
                    type="text"
                    value={brand.primaryColor}
                    onChange={(e) => onUpdateBrand({ ...brand, primaryColor: e.target.value })}
                    className="flex-1 h-14 bg-black/20 border border-white/10 rounded-2xl px-4 text-sm font-mono font-bold text-white focus:outline-none focus:ring-2 transition-all"
                    style={{ '--tw-ring-color': brand.primaryColor } as any}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Company Logo</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  ref={logoInputRef}
                  onChange={handleLogoUpload}
                />
                <div 
                  onClick={() => logoInputRef.current?.click()}
                  className="w-full h-32 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-white/30 transition-all group overflow-hidden bg-black/10"
                >
                  {brand.logoUrl ? (
                    <img src={brand.logoUrl} alt="Preview" className="w-full h-full object-contain p-4" />
                  ) : (
                    <>
                      <ImageIcon className="text-slate-500 mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Upload Logo File</span>
                    </>
                  )}
                </div>
                {brand.logoUrl && (
                  <button 
                    onClick={() => onUpdateBrand({ ...brand, logoUrl: null })}
                    className="w-full mt-2 text-[10px] font-bold text-red-400 uppercase tracking-widest hover:text-red-300"
                  >
                    Remove Logo
                  </button>
                )}
              </div>
            </div>

            <div className="pt-4">
              <button 
                onClick={() => onUpdateBrand({ companyName: 'HVAC OS', primaryColor: '#0ea5e9', logoUrl: null })}
                className="w-full h-12 border border-white/10 rounded-xl text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all"
              >
                Reset to Default
              </button>
            </div>
          </div>

          {/* Linked Apps */}
          <div className="glass rounded-3xl p-8 border border-white/10 space-y-6 shadow-lg">
            <h3 className="font-bold text-xs uppercase tracking-[0.3em] text-slate-200 flex items-center gap-2">
              <Link2 size={16} className="text-purple-400" />
              Connected Business Apps
            </h3>
            <div className="space-y-3">
              {integrations.map(sync => (
                <button 
                  key={sync.name} 
                  onClick={() => setActiveIntegration(sync)}
                  className="w-full flex justify-between items-center p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center border border-white/5 group-hover:border-purple-400 transition-colors">
                      <UserCircle size={14} className="text-purple-400" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white uppercase tracking-tight group-hover:text-purple-300 transition-colors">{sync.name}</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className={`w-1.5 h-1.5 rounded-full bg-${sync.color}-500 ${sync.status === 'Working' ? 'animate-pulse' : ''}`} />
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{sync.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold text-slate-500 uppercase opacity-0 group-hover:opacity-100 transition-opacity">Log In</span>
                    <ChevronRight size={16} className="text-slate-500 group-hover:text-white transition-colors" />
                  </div>
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
                <h3 className="font-bold text-xs uppercase tracking-[0.3em] text-white flex items-center gap-2">
                  <Globe2 size={16} className="text-thermex-blue" />
                  Problem Map: Toronto Area
                </h3>
                <p className="text-[9px] text-slate-300 font-bold uppercase tracking-widest">Showing unit issues across the city</p>
              </div>
            </div>
            
            <div className="flex-1 bg-slate-800/20 rounded-3xl border border-white/5 relative group">
              <svg viewBox="0 0 800 500" className="w-full h-full opacity-60">
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <path d="M0,420 Q400,380 800,470 V500 H0 Z" fill="#1e293b" opacity="0.3" />
                {activeAlerts.map((twin) => {
                  const { x, y } = getCityCoords(twin.city);
                  const isBreaker = twin.alert_type === 'Tripped Breaker';
                  return (
                    <g key={twin.id} filter="url(#glow)" className="cursor-pointer group/marker">
                      <circle cx={x} cy={y} r="15" fill={isBreaker ? '#ef44441a' : '#f59e0b1a'} className="animate-ping" />
                      <circle cx={x} cy={y} r="6" fill={isBreaker ? '#ef4444' : '#f59e0b'} />
                      <g className="opacity-0 group-hover/marker:opacity-100 transition-opacity">
                        <rect x={x + 10} y={y - 40} width="140" height="35" rx="8" fill="rgba(71, 85, 105, 0.95)" stroke="rgba(255,255,255,0.1)" />
                        <text x={x + 20} y={y - 18} fill="white" className="text-[10px] font-bold uppercase tracking-widest">{twin.client_name}</text>
                      </g>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Money Back Filing Center */}
            <div 
              className="glass rounded-3xl p-8 border border-emerald-500/30 bg-emerald-500/5 space-y-6 cursor-pointer hover:border-emerald-500/60 transition-all shadow-lg"
              onClick={() => setSelectedFiling(true)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  Money Back Filing
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-black/20 rounded-2xl border border-white/5">
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tight">Active Forms</span>
                  <div className="text-2xl font-bold text-white font-mono mt-1">14</div>
                </div>
                <div className="p-4 bg-black/20 rounded-2xl border border-white/5">
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tight">Recovered</span>
                  <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">$84.5K</div>
                </div>
              </div>
              <button className="w-full py-4 bg-emerald-500 text-white font-bold rounded-2xl text-[11px] uppercase tracking-widest hover:bg-emerald-400 transition-colors shadow-lg">
                View All Filings
              </button>
            </div>

            {/* Log Upload Area */}
            <div className="glass rounded-3xl p-8 border border-white/10 bg-gradient-to-br from-indigo-500/5 to-transparent shadow-lg relative flex flex-col justify-center">
              <input 
                type="file" 
                multiple 
                className="hidden" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
              />
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center group hover:border-indigo-400 transition-all cursor-pointer"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="animate-spin text-indigo-400 mb-4" size={48} />
                    <p className="text-xs font-bold text-white uppercase tracking-widest">Parsing Logs...</p>
                  </>
                ) : (
                  <>
                    <CloudUpload className="text-slate-400 group-hover:text-indigo-400 group-hover:scale-105 transition-all mb-4" size={48} />
                    <p className="text-xs font-bold text-white uppercase tracking-widest">Drop Work Logs</p>
                    <p className="text-[9px] text-slate-400 mt-2 font-bold uppercase">The computer reads log files</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forms Modal */}
      {selectedFiling && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" onClick={() => setSelectedFiling(false)} />
          <div className="relative glass w-full max-w-3xl rounded-[3rem] p-10 border border-white/20 shadow-2xl animate-in zoom-in duration-300">
            <div className="scanline opacity-20" />
            <div className="flex justify-between items-start mb-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                  <CheckCircle2 className="text-emerald-500" size={28} />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Money Back List</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 mt-1">
                    <RefreshCw size={12} className="text-emerald-500 animate-spin" />
                    Checking for latest money
                  </p>
                </div>
              </div>
              <button onClick={() => setSelectedFiling(false)} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                <X size={20} />
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/10">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-[9px] font-bold text-slate-300 uppercase tracking-widest border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Fix Type</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Money Back</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { client: 'Sarah Johnson', type: 'Heat Pump', status: 'Checking', value: '$7,100' },
                    { client: 'David Chen', type: 'Dual Fuel', status: 'Ready', value: '$4,500' },
                    { client: 'Anita Sharma', type: 'High Efficiency', status: 'Sending', value: '$1,500' },
                    { client: 'Kevin O\'Leary', type: 'Air Seal', status: 'Checking', value: '$850' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="text-[11px] font-bold text-white uppercase">{row.client}</div>
                      </td>
                      <td className="px-6 py-4 text-[10px] font-bold text-slate-300 uppercase tracking-wider">{row.type}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold text-emerald-400 uppercase tracking-widest">{row.status}</span>
                      </td>
                      <td className="px-6 py-4 text-right font-mono font-bold text-emerald-400">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <div className="flex gap-4">
                <button 
                  onClick={handleDownloadForms}
                  className="flex-1 h-14 bg-white text-black rounded-2xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest hover:bg-slate-100 transition-all shadow-lg"
                >
                  <FileText size={18} />
                  Download Forms
                </button>
                <button onClick={() => setSelectedFiling(false)} className="px-8 h-14 border border-white/20 rounded-2xl text-slate-300 font-bold uppercase text-[10px] tracking-widest hover:bg-white/10">
                  Close
                </button>
              </div>
              
              <div className="flex justify-center pt-2">
                <a 
                  href="https://www.enbridgegas.com/residential/rebates-energy-conservation" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-emerald-400 transition-colors"
                >
                  <ExternalLink size={12} />
                  Go to Enbridge Rebate Website
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {activeIntegration && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-3xl" onClick={() => setActiveIntegration(null)} />
          <div className="relative glass w-full max-w-md rounded-[3rem] p-10 border border-white/20 shadow-2xl animate-in zoom-in duration-300">
            <div className="scanline opacity-20" />
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                  <Lock className="text-purple-400" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Sign In</h2>
                  <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Link with {activeIntegration.name}</p>
                </div>
              </div>
              <button onClick={() => setActiveIntegration(null)} className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] ml-2">User Name</label>
                <input 
                  type="text" 
                  placeholder="name@company.ca"
                  className="w-full h-14 bg-black/20 border border-white/10 rounded-2xl px-5 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-slate-500" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] ml-2">Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••••••"
                  className="w-full h-14 bg-black/20 border border-white/10 rounded-2xl px-5 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-slate-500" 
                />
              </div>

              <div className="pt-4 space-y-4">
                <button 
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className="w-full h-14 bg-purple-600 text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-purple-500 transition-all shadow-xl shadow-purple-600/20 disabled:opacity-50"
                >
                  {isLoggingIn ? <Loader2 className="animate-spin mx-auto" size={20} /> : 'Log In Now'}
                </button>
                
                <div className="flex flex-col items-center gap-4 pt-4 border-t border-white/10">
                  <a 
                    href={activeIntegration.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full h-12 border border-white/20 rounded-xl flex items-center justify-center gap-3 text-[10px] font-bold text-slate-300 uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all"
                  >
                    <ExternalLink size={14} />
                    Go to {activeIntegration.name} Website
                  </a>
                  <p className="text-[9px] text-slate-500 font-bold uppercase">Need help? Contact support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
