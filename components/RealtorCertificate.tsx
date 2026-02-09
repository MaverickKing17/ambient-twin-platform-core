
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { INITIAL_MOCK_DATA } from '../constants';
import { ShieldCheck, Calendar, MapPin, Printer, ArrowLeft, Zap, Award, CheckCircle2, Activity, Wind, Thermometer, Cpu } from 'lucide-react';
import { BrandConfig, HealthGrade } from '../types';

interface RealtorCertificateProps {
  brand: BrandConfig;
}

export const RealtorCertificate: React.FC<RealtorCertificateProps> = ({ brand }) => {
  const { id } = useParams();
  const twin = INITIAL_MOCK_DATA.find(t => t.id === id);

  if (!twin) return <div className="p-20 text-center font-bold text-white">Certificate not found.</div>;

  const getGradeTheme = (grade: HealthGrade) => {
    switch(grade) {
      case HealthGrade.A: return { color: '#10b981', bg: 'bg-emerald-50', border: 'border-emerald-500', text: 'text-emerald-600', label: 'Platinum Status' };
      case HealthGrade.B: return { color: '#84cc16', bg: 'bg-lime-50', border: 'border-lime-500', text: 'text-lime-600', label: 'Gold Status' };
      case HealthGrade.C: return { color: '#f59e0b', bg: 'bg-amber-50', border: 'border-amber-500', text: 'text-amber-600', label: 'Silver Status' };
      default: return { color: '#ef4444', bg: 'bg-red-50', border: '#ef4444', text: 'text-red-600', label: 'Action Required' };
    }
  };

  const theme = getGradeTheme(twin.grade);

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 no-print min-h-screen">
      {/* Top Navigation Control */}
      <div className="mb-8 flex justify-between items-center no-print">
        <Link to="/realtors" className="flex items-center gap-2 text-slate-400 hover:text-white font-bold uppercase text-[10px] tracking-[0.2em] transition-all">
          <ArrowLeft size={16} />
          Back to Agent Portal
        </Link>
        <button 
          onClick={() => window.print()}
          className="px-8 py-3 rounded-2xl text-white font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
          style={{ backgroundColor: brand.primaryColor }}
        >
          <Printer size={18} />
          Generate Official PDF
        </button>
      </div>

      {/* The Certificate Itself */}
      <div className="bg-white text-slate-900 shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative overflow-hidden print:shadow-none print:border-0 border border-white/10 mx-auto" 
           style={{ width: '100%', minHeight: '11in', padding: '3rem' }}>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-50 opacity-50 rotate-45 translate-x-48 -translate-y-48 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 border-l border-b border-slate-100 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
          <Zap size={600} strokeWidth={0.5} />
        </div>

        {/* Header Section */}
        <div className="flex justify-between items-start border-b-2 border-slate-900 pb-10 mb-12 relative z-10">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center shadow-xl ring-4 ring-slate-50" style={{ backgroundColor: brand.primaryColor }}>
              {brand.logoUrl ? (
                <img src={brand.logoUrl} alt="Logo" className="w-12 h-12 object-contain brightness-0 invert" />
              ) : (
                <Zap className="text-white" size={40} />
              )}
            </div>
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">{brand.companyName}</h1>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">Precision Safety Audit</span>
                <div className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Toronto Hub v4.0</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
              <Award size={12} className="text-amber-400" />
              Verified Authenticity
            </div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Doc ID: {twin.id.replace('tw-', 'HUB-ATC-')}</div>
            <div className="text-[10px] font-bold text-slate-900 uppercase tracking-widest mt-1">Issued: {new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase()}</div>
          </div>
        </div>

        {/* Title Content */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-7xl font-black uppercase tracking-tighter text-slate-900 mb-4">Home Health Certificate</h2>
          <div className="flex justify-center items-center gap-6">
            <div className="h-[2px] w-24 bg-slate-200" />
            <span className="text-xs font-black text-slate-400 uppercase tracking-[0.5em]">System Vital Audit</span>
            <div className="h-[2px] w-24 bg-slate-200" />
          </div>
        </div>

        {/* Main Grade and Property Data */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16 relative z-10">
          <div className="space-y-10">
            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <MapPin size={100} />
              </div>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <MapPin size={14} className="text-red-500" />
                Property Under Surveillance
              </h3>
              <div className="space-y-1">
                <p className="text-4xl font-black text-slate-900 tracking-tight">{twin.client_name}</p>
                <p className="text-xl text-slate-600 font-semibold">{twin.address}</p>
                <p className="text-lg text-slate-400 font-bold uppercase tracking-widest">{twin.city}, ONTARIO</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-slate-400">
               <CheckCircle2 className="text-emerald-500" size={24} />
               <p className="text-xs font-bold leading-relaxed">This property has been continuously monitored for the last 365 days via our proprietary <strong>Digital Twin Engine</strong>.</p>
            </div>
          </div>

          <div className="relative flex justify-center">
            {/* Health Gauge Visual */}
            <div className={`w-80 h-80 rounded-[4rem] flex flex-col items-center justify-center border-2 shadow-2xl relative transition-all duration-1000 group ${theme.bg} ${theme.border}`}>
              <div className="absolute inset-4 rounded-[3rem] border border-slate-200 border-dashed animate-pulse-slow" />
              <span className={`text-[12px] font-black uppercase tracking-[0.4em] mb-2 ${theme.text}`}>{theme.label}</span>
              <div className="text-[10rem] font-black text-slate-900 leading-none tracking-tighter flex items-baseline">
                {twin.grade}
              </div>
              <div className="mt-4 flex flex-col items-center">
                <div className="h-2 w-48 bg-slate-200 rounded-full overflow-hidden p-0.5 border border-slate-300">
                   <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${twin.health_score}%`, backgroundColor: theme.color }} />
                </div>
                <span className="mt-3 font-black text-slate-900 text-lg tracking-tighter">{twin.health_score}/100 PERFORMANCE RATING</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Vitals Cards */}
        <div className="mb-16 relative z-10">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8 flex items-center gap-3">
             <Activity size={16} className="text-slate-900" />
             Diagnostic Vital Sign Telemetry
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-[2rem] border-2 border-slate-100 bg-white shadow-sm hover:border-slate-900 transition-all group">
              <div className="flex items-center justify-between mb-6">
                <Wind size={24} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Static Pressure</span>
              </div>
              <div className="text-4xl font-black text-slate-900 leading-none mb-2">{twin.system_breathing} <span className="text-sm font-bold text-slate-400 uppercase">iwc</span></div>
              <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Optimal Flow: Verified</p>
            </div>

            <div className="p-8 rounded-[2rem] border-2 border-slate-100 bg-white shadow-sm hover:border-slate-900 transition-all group">
              <div className="flex items-center justify-between mb-6">
                <Thermometer size={24} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Thermal Output</span>
              </div>
              <div className="text-4xl font-black text-slate-900 leading-none mb-2">{twin.heating_power}° <span className="text-sm font-bold text-slate-400 uppercase">ΔT</span></div>
              <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Heating Power: Optimal</p>
            </div>

            <div className="p-8 rounded-[2rem] border-2 border-slate-100 bg-white shadow-sm hover:border-slate-900 transition-all group">
              <div className="flex items-center justify-between mb-6">
                <Cpu size={24} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Motor Dynamics</span>
              </div>
              <div className="text-4xl font-black text-slate-900 leading-none mb-2 tracking-tighter uppercase">{twin.system_motors}</div>
              <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Sync State: Active</p>
            </div>
          </div>
        </div>

        {/* Verification Footer Block */}
        <div className="p-10 bg-slate-900 rounded-[3rem] text-white flex items-center gap-10 relative overflow-hidden mb-16">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-x-32 -translate-y-32 blur-3xl pointer-events-none" />
          <div className="w-24 h-24 rounded-[2rem] bg-white/10 flex items-center justify-center shrink-0 shadow-inner">
            <ShieldCheck size={48} className="text-emerald-400" />
          </div>
          <div className="relative z-10">
            <h4 className="text-3xl font-black uppercase tracking-tight mb-2">Authenticated Safe Status</h4>
            <p className="text-slate-400 text-base font-medium leading-relaxed max-w-2xl">
              This certificate acts as a legal attestation that the mechanical systems at this address are functioning within the manufacturer's specified peak efficiency envelopes. Verified by <strong>{brand.companyName} Enterprise Hub</strong>.
            </p>
          </div>
        </div>

        {/* Official Footer */}
        <div className="mt-auto pt-10 flex justify-between items-end border-t border-slate-100 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg" style={{ backgroundColor: brand.primaryColor }}>
              {brand.companyName.charAt(0)}
            </div>
            <div>
              <span className="font-black text-lg block leading-none uppercase tracking-tighter">{brand.companyName} Enterprise</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 block">Audit Authority Division</span>
            </div>
          </div>
          <div className="text-[9px] text-slate-400 text-right uppercase font-black tracking-[0.4em] max-w-[280px] leading-relaxed">
            PRODUCED BY AMBIENT TWIN V4 • CERTIFIED TORONTO MECHANICAL AUDIT • NON-TRANSFERABLE WITHOUT SYNC ID
          </div>
        </div>
      </div>

      {/* Footer Branding for Page */}
      <div className="mt-12 text-center no-print">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">
          Official Documentation Portal • {brand.companyName}
        </p>
      </div>
    </div>
  );
};
