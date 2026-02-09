
import React, { useState, useEffect } from 'react';
import { Globe2, RefreshCw, Database, CloudUpload, Link2, ShieldCheck, AlertCircle, HardDrive, Wind, Zap, Info, ArrowUpRight, CheckCircle2, X, Lock, ExternalLink, ChevronRight, FileText } from 'lucide-react';
import { INITIAL_MOCK_DATA } from '../constants';
import { DigitalTwin } from '../types';

export const OperationsCommand: React.FC = () => {
  const [syncStatus, setSyncStatus] = useState<Record<string, string>>({
    serviceTitan: 'connected',
    jobber: 'syncing',
    housecall: 'connected',
    rebateAI: 'processing'
  });

  const [activeAlerts, setActiveAlerts] = useState<DigitalTwin[]>([]);
  const [selectedFiling, setSelectedFiling] = useState<boolean>(false);
  const [activeIntegration, setActiveIntegration] = useState<{ name: string; url: string } | null>(null);

  useEffect(() => {
    // Filter twins with active alerts for the map
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

  const integrations = [
    { name: 'ServiceTitan', status: 'Active', color: 'emerald', url: 'https://www.servicetitan.com' },
    { name: 'Jobber', status: 'Syncing', color: 'amber', url: 'https://getjobber.com' },
    { name: 'Housecall Pro', status: 'Active', color: 'emerald', url: 'https://www.housecallpro.com' }
  ];

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-1000 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Operations Command</h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-2 flex items-center gap-2">
            <RefreshCw size={12} className="animate-spin text-emerald-500" />
            Global Sync: 21ms Latency • Node: TOR-CENTRAL-01
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass px-6 py-3 rounded-2xl border-l-4 border-emerald-500 flex items-center gap-4">
             <ShieldCheck className="text-emerald-500" size={24} />
             <div>
               <div className="text-[10px] font-black text-white uppercase tracking-widest text-left">Security Status</div>
               <div className="text-sm font-bold text-slate-400">SOC 2 Type II Compliant</div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Live GTA Leak & Issue Map */}
        <div className="lg:col-span-8 glass rounded-3xl p-8 relative overflow-hidden border border-white/5 min-h-[650px] flex flex-col">
          <div className="scanline opacity-20" />
          <div className="flex justify-between items-center mb-8 relative z-10">
            <div className="space-y-1">
              <h3 className="font-black text-xs uppercase tracking-[0.3em] text-white flex items-center gap-2">
                <Globe2 size={16} className="text-thermex-blue" />
                GTA Operational Hotspots
              </h3>
              <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Visualizing 401/DVP Congestion vs Field Issues</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tripped Breaker</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dirty Filter</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 bg-slate-900/40 rounded-3xl border border-white/5 relative group">
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
              <path d="M0,180 Q400,160 800,190" stroke="#f59e0b" strokeWidth="2" strokeDasharray="10 15" className="animate-[marquee_20s_linear_infinite] opacity-30" />
              <path d="M480,175 V420" stroke="#ef4444" strokeWidth="3" strokeDasharray="5 10" className="animate-[marquee_5s_linear_infinite] opacity-40" />
              
              {activeAlerts.map((twin) => {
                const { x, y } = getCityCoords(twin.city);
                const isBreaker = twin.alert_type === 'Tripped Breaker';
                return (
                  <g key={twin.id} filter="url(#glow)" className="cursor-pointer group/marker">
                    <circle cx={x} cy={y} r="15" fill={isBreaker ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)'} className="animate-ping" />
                    <circle cx={x} cy={y} r="6" fill={isBreaker ? '#ef4444' : '#f59e0b'} />
                    <g className="opacity-0 group-hover/marker:opacity-100 transition-opacity">
                      <rect x={x + 10} y={y - 40} width="140" height="35" rx="8" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(255,255,255,0.1)" />
                      <text x={x + 20} y={y - 18} fill="white" className="text-[10px] font-black uppercase tracking-widest">{twin.client_name}</text>
                    </g>
                  </g>
                );
              })}
            </svg>
            
            <div className="absolute bottom-6 left-6 flex flex-col gap-2">
               <div className="glass p-4 rounded-2xl border border-white/10 flex items-center gap-4">
                  <div className="text-center border-r border-white/10 pr-4">
                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Avg Transit</div>
                    <div className="text-xl font-bold text-white font-mono">42<span className="text-[10px] ml-1">MIN</span></div>
                  </div>
                  <div>
                    <div className="text-[9px] font-black text-red-500 uppercase tracking-widest mb-1">Traffic Burn</div>
                    <div className="text-xl font-bold text-red-500 font-mono">$1.92<span className="text-[10px] ml-1">/M</span></div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Right: Integration Hub & AI Automation */}
        <div className="lg:col-span-4 space-y-8">
          {/* AI Rebate Filing Center - Interactive */}
          <div className="glass rounded-3xl p-6 border border-emerald-500/20 bg-emerald-500/5 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-black text-xs uppercase tracking-[0.2em] text-emerald-400 flex items-center gap-2">
                <CheckCircle2 size={16} />
                Live AI Rebate Filing
              </h3>
              <span className="text-[9px] font-black text-emerald-500 animate-pulse uppercase">Syncing with Enbridge</span>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={() => setSelectedFiling(true)}
                className="w-full p-4 bg-black/40 rounded-2xl border border-white/5 flex justify-between items-center hover:bg-white/5 transition-all group"
              >
                <div className="flex flex-col items-start text-left">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight group-hover:text-white transition-colors">Active Filings</span>
                  <span className="text-2xl font-bold text-white font-mono">14</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all">
                  <ArrowUpRight size={20} />
                </div>
              </button>
              
              <button 
                onClick={() => setSelectedFiling(true)}
                className="w-full p-4 bg-black/40 rounded-2xl border border-white/5 flex justify-between items-center hover:bg-white/5 transition-all group"
              >
                <div className="flex flex-col items-start text-left">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight group-hover:text-white transition-colors">Earmarked Capital</span>
                  <span className="text-2xl font-bold text-emerald-400 font-mono">$84,500</span>
                </div>
                <div className="text-right">
                  <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Est. 48hr Payout</div>
                  <div className="text-[10px] font-black text-emerald-500 uppercase flex items-center gap-1 mt-1">
                    <RefreshCw size={10} className="animate-spin" />
                    Live Audit
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Integration Hub - Interactive */}
          <div className="glass rounded-3xl p-6 border border-white/5 space-y-6">
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
              <Link2 size={16} className="text-purple-500" />
              Ecosystem Sync
            </h3>
            <div className="space-y-3">
              {integrations.map(sync => (
                <button 
                  key={sync.name} 
                  onClick={() => setActiveIntegration(sync)}
                  className="w-full flex justify-between items-center p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center border border-white/5 group-hover:border-purple-500/50 transition-colors">
                      <Link2 size={14} className="text-purple-500" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-white uppercase tracking-tight group-hover:text-purple-400 transition-colors">{sync.name}</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className={`w-1.5 h-1.5 rounded-full bg-${sync.color}-500 ${sync.status === 'Syncing' ? 'animate-pulse' : ''}`} />
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{sync.status}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-slate-600 group-hover:text-white transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Technician Intake Vortex */}
          <div className="glass rounded-3xl p-6 border border-white/5 bg-gradient-to-br from-indigo-500/10 to-transparent">
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 mb-6">
              <Database size={16} className="text-indigo-500" />
              Field Log Vortex
            </h3>
            <div className="border-2 border-dashed border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center text-center group hover:border-indigo-500/50 transition-all cursor-pointer">
              <CloudUpload className="text-slate-600 group-hover:text-indigo-400 group-hover:scale-110 transition-all mb-4" size={48} />
              <p className="text-xs font-black text-white uppercase tracking-widest">Drop Technician Logs</p>
              <p className="text-[10px] text-slate-500 mt-2 font-bold leading-relaxed uppercase">Instant AI Parsing & CRM Injection</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rebate Ledger Modal */}
      {selectedFiling && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-obsidian/95 backdrop-blur-3xl" onClick={() => setSelectedFiling(false)} />
          <div className="relative glass w-full max-w-3xl rounded-[3rem] p-10 border border-white/10 shadow-2xl animate-in zoom-in duration-300">
            <div className="scanline opacity-20" />
            <div className="flex justify-between items-start mb-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                  <CheckCircle2 className="text-emerald-500" size={28} />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter">AI Rebate Ledger</h2>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2 mt-1">
                    <RefreshCw size={12} className="text-emerald-500 animate-spin" />
                    Enbridge Clean Home Synchronizer Active
                  </p>
                </div>
              </div>
              <button onClick={() => setSelectedFiling(false)} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 hover:text-white transition-all">
                <X size={20} />
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/5 bg-black/20">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-[9px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">
                  <tr>
                    <th className="px-6 py-4">Client Asset</th>
                    <th className="px-6 py-4">Rebate Type</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { client: 'Sarah Johnson', type: 'Heat Pump', status: 'Verification', value: '$7,100' },
                    { client: 'David Chen', type: 'Dual Fuel', status: 'Audit Ready', value: '$4,500' },
                    { client: 'Anita Sharma', type: 'High Efficiency', status: 'Processing', value: '$1,500' },
                    { client: 'Kevin O\'Leary', type: 'HVAC Seal', status: 'Verification', value: '$850' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="text-[11px] font-black text-white uppercase">{row.client}</div>
                        <div className="text-[9px] font-bold text-slate-500 uppercase mt-0.5">GTA-NODE-0{i+1}</div>
                      </td>
                      <td className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">{row.type}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-500 uppercase tracking-widest">{row.status}</span>
                      </td>
                      <td className="px-6 py-4 text-right font-mono font-bold text-emerald-400">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex gap-4">
              <button className="flex-1 h-14 bg-white text-black rounded-2xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all">
                <FileText size={18} />
                Generate Audit Bundle
              </button>
              <button onClick={() => setSelectedFiling(false)} className="px-8 h-14 border border-white/10 rounded-2xl text-slate-400 font-black uppercase text-[10px] tracking-widest hover:bg-white/5">
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Integration Login Modal */}
      {activeIntegration && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-obsidian/95 backdrop-blur-3xl" onClick={() => setActiveIntegration(null)} />
          <div className="relative glass w-full max-w-md rounded-[3rem] p-10 border border-white/10 shadow-2xl animate-in zoom-in duration-300">
            <div className="scanline opacity-20" />
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                  <Lock className="text-purple-500" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Auth Connect</h2>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{activeIntegration.name} Integration</p>
                </div>
              </div>
              <button onClick={() => setActiveIntegration(null)} className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 hover:text-white transition-all">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Integration Key / Email</label>
                <input 
                  type="text" 
                  placeholder="admin@enterprise-hvac.ca"
                  className="w-full h-14 bg-black/40 border border-white/10 rounded-2xl px-5 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-slate-700" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Secure Passcode</label>
                <input 
                  type="password" 
                  placeholder="••••••••••••"
                  className="w-full h-14 bg-black/40 border border-white/10 rounded-2xl px-5 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-slate-700" 
                />
              </div>

              <div className="pt-4 space-y-4">
                <button 
                  onClick={() => setActiveIntegration(null)}
                  className="w-full h-14 bg-purple-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-purple-500 transition-all shadow-xl shadow-purple-600/20"
                >
                  Verify Connection
                </button>
                
                <div className="flex flex-col items-center gap-2 pt-2">
                  <a 
                    href={activeIntegration.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-white transition-colors border-b border-transparent hover:border-white/20 pb-1"
                  >
                    <ExternalLink size={12} />
                    Visit {activeIntegration.name} Portal
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
