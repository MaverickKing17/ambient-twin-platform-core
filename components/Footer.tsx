
import React from 'react';
import { MapPin, ShieldCheck, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-white/5 bg-black/20 py-12 px-8 no-print">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
              <span className="text-[10px] font-bold">AT</span>
            </div>
            <span className="font-bold text-sm tracking-tighter uppercase">Ambient Twin Enterprise</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
            The definitive operating system for HVAC asset management and financial recovery in the Greater Toronto Area.
          </p>
        </div>

        <div>
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Regional HQ</h4>
          <div className="space-y-2 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <MapPin size={12} />
              100 King St West, Toronto, ON
            </div>
            <div className="flex items-center gap-2">
              <Globe size={12} />
              serving GTA / Peel / York / Halton
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Compliance</h4>
          <div className="space-y-2 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
              <ShieldCheck size={12} className="text-emerald-500" />
              Ontario HRS Audit Verified
            </div>
            <p className="hover:text-white cursor-pointer transition-colors">Enterprise Privacy Policy</p>
            <p className="hover:text-white cursor-pointer transition-colors">Data Residency (Canada-East)</p>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between">
          <div className="text-right">
            <span className="block text-[10px] font-bold text-slate-600 uppercase">System Status</span>
            <span className="text-[10px] font-bold text-emerald-500 flex items-center justify-end gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              OPERATIONAL
            </span>
          </div>
          <p className="text-[10px] font-mono text-slate-600 mt-8">
            © 2026 AMBIENT TWIN. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};
