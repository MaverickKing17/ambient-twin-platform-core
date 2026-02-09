
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ReceiptText, ShieldCheck, Zap, Globe2, Building2 } from 'lucide-react';
import { BrandConfig } from '../types';

interface NavbarProps {
  brand: BrandConfig;
}

export const Navbar: React.FC<NavbarProps> = ({ brand }) => {
  const location = useLocation();

  return (
    <nav className="h-16 border-b border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50 no-print">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          {brand.logoUrl ? (
            <img src={brand.logoUrl} alt="Logo" className="w-8 h-8 rounded object-contain" />
          ) : (
            <div 
              className="w-8 h-8 rounded flex items-center justify-center transition-colors"
              style={{ backgroundColor: brand.primaryColor }}
            >
              <Zap className="text-white w-5 h-5" />
            </div>
          )}
          <span className="font-bold text-lg tracking-tight uppercase">
            {brand.companyName} <span className="text-slate-400 font-medium">Hub</span>
          </span>
        </div>
        
        <div className="hidden lg:flex items-center gap-4">
          <Link to="/" className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${location.pathname === '/' ? 'bg-white/10 text-white' : 'text-slate-300 hover:text-white'}`}>
            <LayoutDashboard size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Main Page</span>
          </Link>
          <Link to="/operations" className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${location.pathname === '/operations' ? 'bg-white/10 text-white' : 'text-slate-300 hover:text-white'}`}>
            <Globe2 size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Control Panel</span>
          </Link>
          <Link to="/realtors" className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${location.pathname === '/realtors' ? 'bg-white/10 text-white' : 'text-slate-300 hover:text-white'}`}>
            <Building2 size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Home Sellers</span>
          </Link>
          <Link to="/accountant" className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${location.pathname === '/accountant' ? 'bg-white/10 text-white' : 'text-slate-300 hover:text-white'}`}>
            <ReceiptText size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Money Reports</span>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          <ShieldCheck size={14} className="text-emerald-400" />
          Safe Connection
        </div>
      </div>
    </nav>
  );
};
