
import React, { useState, useEffect } from 'react';
import { Globe2, RefreshCw, Database, CloudUpload, Link2, ShieldCheck, AlertCircle, HardDrive } from 'lucide-react';

export const OperationsCommand: React.FC = () => {
  const [syncStatus, setSyncStatus] = useState<Record<string, string>>({
    serviceTitan: 'connected',
    jobber: 'syncing',
    housecall: 'connected',
    rebateAI: 'idle'
  });

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-1000">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Operations Command</h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-2 flex items-center gap-2">
            <RefreshCw size={12} className="animate-spin text-emerald-500" />
            Global Sync: 21ms Latency
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass px-6 py-3 rounded-2xl border-l-4 border-emerald-500 flex items-center gap-4">
             <ShieldCheck className="text-emerald-500" size={24} />
             <div>
               <div className="text-[10px] font-black text-white uppercase tracking-widest">Security Status</div>
               <div className="text-sm font-bold text-slate-400">SOC 2 Type II Compliant</div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Live GTA Leak Map */}
        <div className="lg:col-span-8 glass rounded-3xl p-8 relative overflow-hidden border border-white/5 min-h-[600px] flex flex-col">
          <div className="scanline opacity-20" />
          <div className="flex justify-between items-center mb-8 relative z-10">
            <h3 className="font-black text-xs uppercase tracking-[0.3em] text-white flex items-center gap-2">
              <Globe2 size={16} className="text-thermex-blue" />
              GTA Profit Leakage Map (401/DVP/QEW)
            </h3>
            <span className="text-[10px] font-black text-red-500 animate-pulse uppercase tracking-widest bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
              Live Congestion Loss: $1,420/hr
            </span>
          </div>
          
          <div className="flex-1 bg-slate-900/40 rounded-3xl border border-white/5 relative group cursor-crosshair">
            {/* SVG STYLIZED GTA MAP */}
            <svg viewBox="0 0 800 500" className="w-full h-full opacity-60">
              {/* Lake Ontario */}
              <path d="M0,400 Q400,350 800,450 V500 H0 Z" fill="#1e293b" opacity="0.3" />
              {/* Hwy 401 */}
              <path d="M0,150 Q400,140 800,160" stroke="#f59e0b" strokeWidth="4" strokeDasharray="10 15" className="animate-[marquee_20s_linear_infinite]" />
              {/* DVP */}
              <path d="M450,145 V400" stroke="#ef4444" strokeWidth="6" strokeDasharray="5 10" className="animate-[marquee_5s_linear_infinite]" />
              {/* QEW */}
              <path d="M0,250 Q200,350 450,400" stroke="#10b981" strokeWidth="3" strokeDasharray="15 20" />
              
              {/* Hotspots */}
              <circle cx="450" cy="145" r="10" fill="#ef4444" className="animate-ping" />
              <circle cx="300" cy="142" r="6" fill="#f59e0b" className="animate-pulse" />
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
               <div className="text-[10px] font-black text-slate-600 uppercase tracking-[1em]">Toronto Core</div>
            </div>
          </div>
        </div>

        {/* Right: Integration Hub & Intake */}
        <div className="lg:col-span-4 space-y-8">
          {/* Integration Hub */}
          <div className="glass rounded-3xl p-6 border border-white/5 space-y-6">
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
              <Link2 size={16} className="text-purple-500" />
              Ecosystem Sync
            </h3>
            <div className="space-y-4">
              {[
                { name: 'ServiceTitan', status: 'Active', color: 'emerald' },
                { name: 'Jobber', status: 'Syncing', color: 'amber' },
                { name: 'Housecall Pro', status: 'Active', color: 'emerald' },
                { name: 'Enbridge Rebate AI', status: 'Standby', color: 'slate' }
              ].map(sync => (
                <div key={sync.name} className="flex justify-between items-center p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors group cursor-default">
                  <span className="text-xs font-black text-white uppercase tracking-tight group-hover:text-emerald-400 transition-colors">{sync.name}</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full bg-${sync.color}-500 ${sync.status === 'Syncing' ? 'animate-pulse' : ''}`} />
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{sync.status}</span>
                  </div>
                </div>
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
    </div>
  );
};
