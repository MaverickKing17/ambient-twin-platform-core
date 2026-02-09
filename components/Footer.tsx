
import React from 'react';
import { MapPin, ShieldCheck, Globe, Scale, BookOpen, ScrollText, Zap, ShieldAlert, Award, FileLock2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-white/10 bg-slate-900/80 backdrop-blur-3xl py-24 px-10 no-print relative overflow-hidden">
      {/* Decorative Light Leak */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none" />

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 xl:gap-24 relative z-10">
        
        {/* Column 1: Brand Identity & Mission */}
        <div className="space-y-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)]">
              <span className="text-lg font-black text-slate-900">AT</span>
            </div>
            <div>
              <span className="font-black text-2xl tracking-tighter uppercase text-white block leading-none">
                Ambient Twin
              </span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-1 block">Enterprise OS</span>
            </div>
          </div>
          
          <p className="text-sm text-slate-100 leading-relaxed max-w-sm font-semibold">
            The premier institutional-grade operating system for HVAC asset management and financial yield optimization. Bridging mechanical engineering and executive reporting for the Greater Toronto Area.
          </p>
          
          {/* Enhanced Regulatory Cards */}
          <div className="flex flex-wrap gap-3 pt-2">
            <div className="group flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-xl transition-all hover:bg-red-500/20 hover:border-red-500/50 cursor-default">
              <ShieldAlert size={14} className="text-red-500" />
              <span className="text-[10px] font-black text-white tracking-widest uppercase">TSSA</span>
            </div>
            <div className="group flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-xl transition-all hover:bg-blue-500/20 hover:border-blue-500/50 cursor-default">
              <Award size={14} className="text-blue-500" />
              <span className="text-[10px] font-black text-white tracking-widest uppercase">HRAI</span>
            </div>
            <div className="group flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl transition-all hover:bg-emerald-500/20 hover:border-emerald-500/50 cursor-default">
              <FileLock2 size={14} className="text-emerald-500" />
              <span className="text-[10px] font-black text-white tracking-widest uppercase">PIPEDA</span>
            </div>
          </div>
        </div>

        {/* Column 2: Ontario Regulatory Compliance */}
        <div>
          <h4 className="text-[12px] font-black text-white uppercase tracking-[0.3em] mb-12 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-thermex-blue animate-pulse" />
            Ontario Regulatory
          </h4>
          <div className="space-y-8">
            <div className="group cursor-pointer border-l-2 border-transparent hover:border-thermex-blue pl-4 transition-all">
              <p className="text-sm font-black text-white uppercase tracking-tight">TSSA Compliance Framework</p>
              <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">Fuel Safety & Pressure Vessels Act (ON)</p>
            </div>
            <div className="group cursor-pointer border-l-2 border-transparent hover:border-thermex-blue pl-4 transition-all">
              <p className="text-sm font-black text-white uppercase tracking-tight">Ontario Consumer Protection</p>
              <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">CPA 2002 Door-to-Door Sales Logic</p>
            </div>
            <div className="group cursor-pointer border-l-2 border-transparent hover:border-thermex-blue pl-4 transition-all">
              <p className="text-sm font-black text-white uppercase tracking-tight">Municipal Licensing (GTA)</p>
              <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">GTA Integrated Service Permitting</p>
            </div>
          </div>
        </div>

        {/* Column 3: Legal Infrastructure Matrix */}
        <div>
          <h4 className="text-[12px] font-black text-white uppercase tracking-[0.3em] mb-12 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Legal Infrastructure
          </h4>
          <ul className="space-y-6">
            <li className="flex items-center gap-3 text-sm font-bold text-white hover:text-emerald-400 transition-colors cursor-pointer group">
              <ShieldCheck size={18} className="text-emerald-500" />
              Privacy Policy (PIPEDA/GDPR-C)
            </li>
            <li className="flex items-center gap-3 text-sm font-bold text-white hover:text-white transition-colors cursor-pointer group">
              <BookOpen size={18} className="text-slate-400 group-hover:text-white transition-colors" />
              Terms of Professional Service
            </li>
            <li className="text-sm font-bold text-slate-300 hover:text-white transition-colors cursor-pointer pl-8">
              SaaS Master Service Agreement
            </li>
            <li className="text-sm font-bold text-slate-300 hover:text-white transition-colors cursor-pointer pl-8">
              Toronto Jurisdiction Dispute Resolution
            </li>
            <li className="text-sm font-bold text-slate-300 hover:text-white transition-colors cursor-pointer pl-8">
              Data Sovereignty: Montreal Region
            </li>
          </ul>
        </div>

        {/* Column 4: Operational Disclosures */}
        <div className="flex flex-col">
          <h4 className="text-[12px] font-black text-white uppercase tracking-[0.3em] mb-12 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Execution & Operations
          </h4>
          <div className="space-y-12">
            <div className="glass-light p-6 rounded-2xl border border-white/20 bg-white/5 shadow-2xl">
              <p className="text-[11px] text-slate-100 leading-relaxed italic font-semibold">
                <span className="text-white font-black uppercase not-italic block mb-2 border-b border-white/10 pb-1">Risk Disclosure:</span> 
                Financial recovery metrics, including "401/DVP Burn Rates," are algorithmic estimates based on historical traffic patterns and $85/hr opportunity costs. Individual partner results may vary.
              </p>
            </div>
            
            <div className="flex items-center justify-between border-t border-white/20 pt-10">
              <div className="space-y-1">
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">HQ Region</span>
                <span className="text-sm font-black text-white flex items-center gap-2">
                  <MapPin size={16} className="text-red-500" />
                  TORONTO, ON
                </span>
              </div>
              <div className="space-y-1 text-right">
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Sync</span>
                <span className="text-sm font-mono font-black text-emerald-400">14ms (CA)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Corporate Ledger Bar */}
      <div className="max-w-[1600px] mx-auto mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em]">
          © 2026 AMBIENT TWIN ENTERPRISE. SUBSIDIARY OF AMBIENT AI HOLDINGS.
        </p>
        <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black text-white uppercase tracking-[0.3em]">
          <span className="hover:text-thermex-blue cursor-pointer transition-colors border-b border-transparent hover:border-thermex-blue">Security Report</span>
          <span className="hover:text-thermex-blue cursor-pointer transition-colors border-b border-transparent hover:border-thermex-blue">Transparency Registry</span>
          <span className="hover:text-thermex-blue cursor-pointer transition-colors border-b border-transparent hover:border-thermex-blue">Whistleblower Policy</span>
        </div>
      </div>
    </footer>
  );
};
