
import React from 'react';
import { MapPin, ShieldCheck, Globe, Scale, BookOpen, ScrollText, Zap, ShieldAlert, Award, FileLock2, Lock, ImageIcon } from 'lucide-react';
import { BrandConfig } from '../types';

export const Footer: React.FC<{ brand: BrandConfig }> = ({ brand }) => {
  return (
    <footer className="mt-auto border-t border-white/10 bg-slate-900/80 backdrop-blur-3xl py-24 px-10 no-print relative overflow-hidden">
      {/* Decorative Light Leak */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none" />

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 xl:gap-24 relative z-10">
        
        {/* Column 1: Brand Identity */}
        <div className="space-y-10">
          <div className="flex items-center gap-4">
            {brand.logoUrl ? (
              <img src={brand.logoUrl} alt="Footer Logo" className="w-12 h-12 rounded-2xl object-contain bg-white p-1" />
            ) : (
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ backgroundColor: brand.primaryColor }}
              >
                <Zap className="text-white w-6 h-6" />
              </div>
            )}
            <div>
              <span className="font-black text-2xl tracking-tighter uppercase text-white block leading-none">
                {brand.companyName}
              </span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-1 block">Toronto Enterprise Hub</span>
            </div>
          </div>
          
          <p className="text-sm text-slate-100 leading-relaxed max-w-sm font-semibold">
            The leading business platform for HVAC companies in Toronto. We help you manage units, find problems early, and save money for your clients.
          </p>
          
          <div className="flex flex-wrap gap-3 pt-2">
            <div className="group flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-xl transition-all hover:bg-red-500/20 hover:border-red-500/50 cursor-default">
              <ShieldAlert size={14} className="text-red-500" />
              <span className="text-[10px] font-black text-white tracking-widest uppercase">TSSA Ready</span>
            </div>
            <div className="group flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-xl transition-all hover:bg-blue-500/20 hover:border-blue-500/50 cursor-default">
              <Award size={14} className="text-blue-500" />
              <span className="text-[10px] font-black text-white tracking-widest uppercase">HRAI Member</span>
            </div>
            <div className="group flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl transition-all hover:bg-emerald-500/20 hover:border-emerald-500/50 cursor-default">
              <FileLock2 size={14} className="text-emerald-500" />
              <span className="text-[10px] font-black text-white tracking-widest uppercase">Safe Data</span>
            </div>
          </div>
        </div>

        {/* Column 2: System Safety */}
        <div>
          <h4 className="text-[12px] font-black text-white uppercase tracking-[0.3em] mb-12 flex items-center gap-3">
            <Lock size={14} className="text-emerald-500" />
            Safety First
          </h4>
          <div className="space-y-6">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck size={18} className="text-emerald-500" />
                <span className="text-xs font-black text-white uppercase tracking-widest">Clear Audit</span>
              </div>
              <p className="text-[9px] text-slate-400 font-bold leading-tight uppercase tracking-wider">Every check is saved and verified by the system.</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck size={18} className="text-blue-500" />
                <span className="text-xs font-black text-white uppercase tracking-widest">ISO Standards</span>
              </div>
              <p className="text-[9px] text-slate-400 font-bold leading-tight uppercase tracking-wider">Using global standards for keeping unit data safe.</p>
            </div>
          </div>
        </div>

        {/* Column 3: Rules & Help */}
        <div>
          <h4 className="text-[12px] font-black text-white uppercase tracking-[0.3em] mb-12 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Important Pages
          </h4>
          <ul className="space-y-6">
            <li className="flex items-center gap-3 text-sm font-bold text-white hover:text-emerald-400 transition-colors cursor-pointer group">
              <ShieldCheck size={18} className="text-emerald-500" />
              Privacy Rules
            </li>
            <li className="text-sm font-bold text-slate-300 hover:text-white transition-colors cursor-pointer pl-8">
              Service Agreement
            </li>
            <li className="text-sm font-bold text-slate-300 hover:text-white transition-colors cursor-pointer pl-8">
              Local Toronto Laws
            </li>
            <li className="text-sm font-bold text-slate-300 hover:text-white transition-colors cursor-pointer pl-8">
              Ontario Safety Rules
            </li>
          </ul>
        </div>

        {/* Column 4: Disclosure */}
        <div className="flex flex-col">
          <h4 className="text-[12px] font-black text-white uppercase tracking-[0.3em] mb-12 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            About This App
          </h4>
          <div className="space-y-12">
            <div className="p-6 rounded-2xl border border-white/20 bg-white/5">
              <p className="text-[11px] text-slate-200 leading-relaxed italic font-bold">
                <span className="text-white font-black uppercase not-italic block mb-2 border-b border-white/10 pb-1">Note:</span> 
                All savings are estimated. Traffic data is based on GTA highways like the 401 and DVP. Results can change for every home.
              </p>
            </div>
            
            <div className="flex items-center justify-between border-t border-white/10 pt-10">
              <div className="space-y-1">
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Toronto Hub</span>
                <span className="text-sm font-black text-white flex items-center gap-2">
                  <MapPin size={16} className="text-red-500" />
                  TORONTO, ON
                </span>
              </div>
              <div className="space-y-1 text-right">
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Network Speed</span>
                <span className="text-sm font-mono font-black text-emerald-400">14ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bar */}
      <div className="max-w-[1600px] mx-auto mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em]">
          © 2026 {brand.companyName.toUpperCase()}. ALL RIGHTS RESERVED.
        </p>
        <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black text-white uppercase tracking-[0.3em]">
          <span className="cursor-pointer transition-colors border-b border-transparent hover:border-white">Safety Report</span>
          <span className="cursor-pointer transition-colors border-b border-transparent hover:border-white">Transparency</span>
          <span className="cursor-pointer transition-colors border-b border-transparent hover:border-white">Help Desk</span>
        </div>
      </div>
    </footer>
  );
};
