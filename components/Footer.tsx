
import React from 'react';
import { MapPin, ShieldCheck, Globe, Scale, BookOpen, ScrollText } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-white/5 bg-black/40 py-16 px-8 no-print">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        
        {/* Brand & Mission */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center border border-white/10">
              <span className="text-xs font-black text-white">AT</span>
            </div>
            <span className="font-bold text-base tracking-tighter uppercase text-white">Ambient Twin <span className="text-slate-500">Enterprise</span></span>
          </div>
          <p className="text-xs text-slate-500 leading-loose max-w-sm">
            Ambient Twin is the premier institutional-grade operating system for HVAC asset management, predictive maintenance, and financial yield optimization. Headquartered in the Toronto Financial District, we bridge the gap between mechanical engineering and executive financial reporting.
          </p>
          <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
            {/* Regulatory Logos Placeholder Style */}
            <div className="h-6 w-12 bg-white/10 rounded flex items-center justify-center text-[8px] font-black">TSSA</div>
            <div className="h-6 w-12 bg-white/10 rounded flex items-center justify-center text-[8px] font-black">HRAI</div>
            <div className="h-6 w-12 bg-white/10 rounded flex items-center justify-center text-[8px] font-black">PIPEDA</div>
          </div>
        </div>

        {/* Regulatory & Compliance */}
        <div>
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-6 flex items-center gap-2">
            <Scale size={14} className="text-thermex-blue" />
            Ontario Regulatory
          </h4>
          <div className="space-y-4 text-[11px] text-slate-500 font-medium">
            <div className="group cursor-pointer">
              <p className="text-slate-300 group-hover:text-white transition-colors">TSSA Compliance Framework</p>
              <p className="text-[9px] text-slate-600 mt-1 uppercase">Fuel Safety & Pressure Vessels Act (ON)</p>
            </div>
            <div className="group cursor-pointer">
              <p className="text-slate-300 group-hover:text-white transition-colors">Ontario Consumer Protection</p>
              <p className="text-[9px] text-slate-600 mt-1 uppercase">CPA 2002 compliant door-to-door sales logic</p>
            </div>
            <div className="group cursor-pointer">
              <p className="text-slate-300 group-hover:text-white transition-colors">Municipal Licensing (GTA)</p>
              <p className="text-[9px] text-slate-600 mt-1 uppercase">Toronto, Peel, York, Halton Service Permitting</p>
            </div>
          </div>
        </div>

        {/* Legal & Privacy */}
        <div>
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-6 flex items-center gap-2">
            <ScrollText size={14} className="text-amber-500" />
            Legal Infrastructure
          </h4>
          <div className="space-y-4 text-[11px] text-slate-500">
            <ul className="space-y-3">
              <li className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors group">
                <ShieldCheck size={12} className="text-emerald-500 opacity-50 group-hover:opacity-100" />
                Enterprise Privacy Policy (PIPEDA/GDPR-C)
              </li>
              <li className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors group">
                <BookOpen size={12} className="text-slate-500 group-hover:text-white" />
                Terms of Professional Service
              </li>
              <li className="hover:text-white cursor-pointer transition-colors ml-5">SaaS Master Service Agreement (MSA)</li>
              <li className="hover:text-white cursor-pointer transition-colors ml-5">Toronto Jurisdiction Dispute Resolution</li>
              <li className="hover:text-white cursor-pointer transition-colors ml-5">Data Residency: Montreal (AWS CA-CENTRAL-1)</li>
            </ul>
          </div>
        </div>

        {/* Corporate Disclosure */}
        <div className="flex flex-col">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-6">Execution & Operations</h4>
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
              <p className="text-[10px] text-slate-400 leading-relaxed italic">
                <span className="text-slate-200 font-bold uppercase not-italic">Disclaimer:</span> Financial recovery metrics, including "401/DVP Burn Rates," are algorithmic estimates based on historical traffic patterns and regional labor cost averages ($85/hr opportunity cost). Individual partner EBITDA impact may vary based on truck inventory and technician speed.
              </p>
            </div>
            
            <div className="flex items-center justify-between border-t border-white/5 pt-6">
              <div className="text-left">
                <span className="block text-[9px] font-bold text-slate-600 uppercase">Region</span>
                <span className="text-[10px] font-bold text-slate-300 flex items-center gap-1">
                  <MapPin size={10} className="text-red-500" />
                  TORONTO HQ
                </span>
              </div>
              <div className="text-right">
                <span className="block text-[9px] font-bold text-slate-600 uppercase">System Latency</span>
                <span className="text-[10px] font-mono text-emerald-500">14ms (CA-EAST)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1600px] mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] font-mono text-slate-600">
          © 2026 AMBIENT TWIN ENTERPRISE. A SUBSIDIARY OF AMBIENT AI HOLDINGS. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-8 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
          <span className="hover:text-slate-400 cursor-pointer transition-colors">Security Audit Report</span>
          <span className="hover:text-slate-400 cursor-pointer transition-colors">Transparency Registry</span>
          <span className="hover:text-slate-400 cursor-pointer transition-colors">Whistleblower Policy</span>
        </div>
      </div>
    </footer>
  );
};
