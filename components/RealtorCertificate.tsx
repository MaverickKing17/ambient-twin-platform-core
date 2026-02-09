
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { INITIAL_MOCK_DATA } from '../constants';
import { ShieldCheck, Calendar, MapPin, Printer, ArrowLeft } from 'lucide-react';

export const RealtorCertificate: React.FC = () => {
  const { id } = useParams();
  const twin = INITIAL_MOCK_DATA.find(t => t.id === id);

  if (!twin) return <div>Twin not found</div>;

  const getGradeColor = (grade: string) => {
    switch(grade) {
      case 'A': return 'text-emerald-500 border-emerald-500 bg-emerald-500/10';
      case 'B': return 'text-lime-500 border-lime-500 bg-lime-500/10';
      case 'C': return 'text-amber-500 border-amber-500 bg-amber-500/10';
      default: return 'text-red-500 border-red-500 bg-red-500/10';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-12 bg-white text-black min-h-[11in] shadow-2xl relative overflow-hidden">
      {/* Decorative Branding for UI */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100 rotate-45 translate-x-32 -translate-y-32 no-print" />
      
      <div className="no-print mb-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-black font-semibold">
          <ArrowLeft size={18} />
          Back to Hub
        </Link>
        <button 
          onClick={() => window.print()}
          className="bg-black text-white px-6 py-2 rounded-xl flex items-center gap-2 font-bold"
        >
          <Printer size={18} />
          Print Certificate
        </button>
      </div>

      <div className="flex justify-between items-start border-b-4 border-black pb-8 mb-12">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">Home Health Certificate</h1>
          <p className="text-xl font-medium text-slate-600">Ambient Twin Enterprise Official Audit</p>
        </div>
        <div className="text-right">
          <div className="font-bold">Certificate #{twin.id.replace('tw-', 'ATC-')}</div>
          <div className="flex items-center gap-2 justify-end text-sm text-slate-500">
            <Calendar size={14} /> Issued: {new Date().toLocaleDateString()}
          </div>
        </div>
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

        <div className="flex flex-col items-center justify-center border-4 border-black rounded-3xl p-8 bg-slate-50">
          <span className="text-xs font-bold uppercase tracking-[0.3em] mb-2">Overall Health Grade</span>
          <div className={`text-9xl font-black ${getGradeColor(twin.grade).split(' ')[0]}`}>
            {twin.grade}
          </div>
          <p className="mt-4 font-bold text-lg">{twin.health_score}/100 System Rating</p>
        </div>
      </div>

      <div className="space-y-8 mb-16">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-200 pb-2">System Performance Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border border-slate-200 rounded-2xl">
            <span className="block text-xs font-bold text-slate-400 uppercase mb-2">System Breathing</span>
            <div className="text-3xl font-bold">{twin.system_breathing} iwc</div>
            <p className="text-sm text-slate-500 mt-2 italic">Standard: 0.50 iwc</p>
          </div>
          <div className="p-6 border border-slate-200 rounded-2xl">
            <span className="block text-xs font-bold text-slate-400 uppercase mb-2">Heating Power</span>
            <div className="text-3xl font-bold">{twin.heating_power}° ΔT</div>
            <p className="text-sm text-slate-500 mt-2 italic">Standard: 35-45° ΔT</p>
          </div>
          <div className="p-6 border border-slate-200 rounded-2xl">
            <span className="block text-xs font-bold text-slate-400 uppercase mb-2">Motor Health</span>
            <div className="text-3xl font-bold">{twin.system_motors}</div>
            <p className="text-sm text-slate-500 mt-2 italic">Telemetry check passed</p>
          </div>
        </div>
      </div>

      <div className="p-8 bg-black text-white rounded-3xl flex items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
          <ShieldCheck size={32} className="text-emerald-400" />
        </div>
        <div>
          <h4 className="text-xl font-bold">Verified for Market Sale</h4>
          <p className="text-slate-400 text-sm">This property has been continuously monitored by the Ambient Twin Enterprise platform. All "Vital Signs" are within manufacturer specification for peak efficiency.</p>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-200 flex justify-between items-end grayscale opacity-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black flex items-center justify-center text-white font-bold rounded">A</div>
          <span className="font-bold text-sm">Ambient Twin Enterprise Hub</span>
        </div>
        <div className="text-[10px] text-slate-400 text-right uppercase font-bold tracking-widest">
          Toronto / GTA / Mississauga / North York / Vaughan / Brampton
        </div>
      </div>
    </div>
  );
};
