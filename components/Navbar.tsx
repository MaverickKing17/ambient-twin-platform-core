
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ReceiptText, ShieldCheck, Zap, Globe2, Building2 } from 'lucide-react';
import { PartnerConfig } from '../types';
import { PARTNERS } from '../constants';

interface NavbarProps {
  currentPartner: PartnerConfig;
  onPartnerChange: (p: PartnerConfig) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPartner, onPartnerChange }) => {
  const location = useLocation();

  return (
    <nav className="h-16 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50 no-print">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-mckinnon-red to-orange-500 flex items-center justify-center">
            <Zap className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight">Ambient Twin <span className="text-slate-500 font-medium">Enterprise</span></span>
        </div>
        
        <div className="hidden lg:flex items-center gap-4">
          <Link to="/" className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${location.pathname === '/' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}>
            <LayoutDashboard size={16} />
            <span className="text-xs font-black uppercase tracking-widest">Dashboard</span>
          </Link>
          <Link to="/operations" className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${location.pathname === '/operations' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}>
            <Globe2 size={16} />
            <span className="text-xs font-black uppercase tracking-widest">Operations</span>
          </Link>
          <Link to="/realtors" className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${location.pathname === '/realtors' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}>
            <Building2 size={16} />
            <span className="text-xs font-black uppercase tracking-widest">Realtor Portal</span>
          </Link>
          <Link to="/accountant" className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${location.pathname === '/accountant' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}>
            <ReceiptText size={16} />
            <span className="text-xs font-black uppercase tracking-widest">Financials</span>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center bg-obsidian rounded-lg border border-border p-1">
          {Object.values(PARTNERS).map((p) => (
            <button
              key={p.id}
              onClick={() => onPartnerChange(p)}
              className={`px-3 py-1 text-[10px] font-black rounded uppercase tracking-widest transition-all ${currentPartner.id === p.id ? 'bg-white/10 text-white shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {p.name.split(' ')[0]}
            </button>
          ))}
        </div>
        <div className="h-8 w-px bg-border mx-2" />
        <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
          <ShieldCheck size={14} className="text-emerald-500" />
          SOC 2 SECURE
        </div>
      </div>
    </nav>
  );
};
