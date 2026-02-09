
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { INITIAL_MOCK_DATA } from '../constants';
import { ShieldCheck, Calendar, MapPin, Printer, ArrowLeft, Zap } from 'lucide-react';
import { BrandConfig } from '../types';

interface RealtorCertificateProps {
  brand: BrandConfig;
}

export const RealtorCertificate: React.FC<RealtorCertificateProps> = ({ brand }) => {
  const { id } = useParams();
  const twin = INITIAL_MOCK_DATA.find(t => t.id === id);

  if (!twin) return <div className="p-20 text-center font-bold">Certificate not found.</div>;

  const getGradeColor = (grade: string) => {
    switch(grade) {
      case 'A': return 'text-emerald-500 border-emerald-500 bg-emerald-500/10';
      case 'B': return 'text-lime-500 border-lime-500 bg-lime-500/10';
      case 'C': return 'text-amber-500 border-amber-500 bg-amber-500/10';
      default: return 'text-red-500 border-red-500 bg-red-500/10';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-12 bg-white text-black min-h-[11in] shadow-2xl relative overflow-hidden border border-slate-200">
      {/* Decorative Branding for UI */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100 rotate-45 translate-x-32 -translate-y-32 no-print" />
      
      <div className="no-print mb-8 flex justify-between items-center">
        <Link to="/realtors" className="flex items-center gap-2 text-slate-500 hover:text-black font-semibold">
          <ArrowLeft size={18} />
          Back to Portal
        </Link>
        <button 
          onClick={() => window.print()}
          className="text-white px-6 py-2 rounded-xl flex items-center gap-2 font-bold shadow-lg transition-transform hover:scale-105"
          style={{ backgroundColor: brand.primaryColor }}
        >
          <Printer size={18} />
          Print Certificate
        </button>
      </div>

      <div className="flex justify-between items-start border-b-4 border-black pb-8 mb-12">
        <div className="flex items-center gap-4">
           {brand.logoUrl ? (
             <img src={brand.logoUrl} alt="Logo" className="w-16 h-16 object-contain" />
           ) : (
             <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white" style={{ backgroundColor: brand.primaryColor }}>
               <Zap size={32} />
             </div>
           )}
           <div>
             <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">{brand.companyName}</h1>
             <p className="text-lg font-bold text-slate-600 mt-1 uppercase tracking-widest">Safety Audit Division</p>
           </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-sm uppercase tracking-widest">Certificate #{twin.id.replace('tw-', 'ATC-')}</div>
          <div className="flex items-center gap-2 justify-end text-sm text-slate-500 mt-1">
            <Calendar size={14} /> Issued: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="text-center mb-16">
        <h2 className="text-5xl font-black uppercase tracking-tighter mb-2">Home Health Certificate</h2>
        <div className="h-1 w-24 mx-auto" style={{ backgroundColor: brand.primaryColor }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Property Inspected</h3>
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 text-slate-400" size={24} />
            <div>
              <p className="text-2xl font-bold">{twin.client_name}</p>
              <p className="text-xl text-slate-600">{twin.address}</p>
              <p className="text-xl text-slate-600">{twin.city}, ON</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center border-4 border-black rounded-[2.5rem] p-8 bg-slate-50">
          <span className="text-xs font-bold uppercase tracking-[0.3em] mb-2 text-slate-500">System Health Grade</span>
          <div className={`text-9xl font-black ${getGradeColor(twin.grade).split(' ')[0]}`}>
            {twin.grade}
          </div>
          <p className="mt-4 font-bold text-lg uppercase tracking-widest">{twin.health_score}/100 Rating</p>
        </div>
      </div>

      <div className="space-y-8 mb-16">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-200 pb-2">Technical Vital Signs</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border border-slate-200 rounded-2xl">
            <span className="block text-xs font-bold text-slate-400 uppercase mb-2">System Breathing</span>
            <div className="text-3xl font-bold">{twin.system_breathing} <span className="text-sm font-normal text-slate-500">iwc</span></div>
            <p className="text-[10px] text-slate-500 mt-2 font-bold uppercase">Optimal Range: &lt; 0.50</p>
          </div>
          <div className="p-6 border border-slate-200 rounded-2xl">
            <span className="block text-xs font-bold text-slate-400 uppercase mb-2">Heating Power</span>
            <div className="text-3xl font-bold">{twin.heating_power}° <span className="text-sm font-normal text-slate-500">ΔT</span></div>
            <p className="text-[10px] text-slate-500 mt-2 font-bold uppercase">Optimal Range: 35-45°</p>
          </div>
          <div className="p-6 border border-slate-200 rounded-2xl">
            <span className="block text-xs font-bold text-slate-400 uppercase mb-2">Motor Status</span>
            <div className="text-2xl font-bold uppercase tracking-tighter" style={{ color: brand.primaryColor }}>{twin.system_motors}</div>
            <p className="text-[10px] text-slate-500 mt-2 font-bold uppercase">Digital Twin Sync Active</p>
          </div>
        </div>
      </div>

      <div className="p-10 bg-slate-900 text-white rounded-[2.5rem] flex items-center gap-8 border-l-8" style={{ borderColor: brand.primaryColor }}>
        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
          <ShieldCheck size={40} className="text-emerald-400" />
        </div>
        <div>
          <h4 className="text-2xl font-black uppercase tracking-tight">Verified Real-Time Status</h4>
          <p className="text-slate-400 text-sm mt-2 leading-relaxed">
            This property is monitored by the <strong>{brand.companyName} Hub</strong>. All HVAC vital signs are verified by our digital twin engine to be within peak operating specifications as of the time of this audit.
          </p>
        </div>
      </div>

      <div className="mt-auto pt-12 flex justify-between items-end border-t border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-black text-xl" style={{ backgroundColor: brand.primaryColor }}>
            {brand.companyName.charAt(0)}
          </div>
          <div>
            <span className="font-bold text-sm block leading-none">{brand.companyName} Enterprise</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">Digital Twin Platform</span>
          </div>
        </div>
        <div className="text-[9px] text-slate-400 text-right uppercase font-bold tracking-[0.3em] max-w-[200px]">
          Official Safety Document • Toronto • Mississauga • Brampton • York Region
        </div>
      </div>
    </div>
  );
};
