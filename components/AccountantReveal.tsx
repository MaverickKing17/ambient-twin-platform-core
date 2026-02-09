
import React, { useState } from 'react';
/* Corrected: PartnerConfig was not exported from types.ts, using BrandConfig instead. */
import { BrandConfig } from '../types';
import { TrendingUp, Send, CheckCircle, Calculator, ChevronRight, FileText, Loader2 } from 'lucide-react';

/* Corrected: component now expects 'brand' prop of type 'BrandConfig' as passed from App.tsx */
export const AccountantReveal: React.FC<{ brand: BrandConfig }> = ({ brand }) => {
  const [showModal, setShowModal] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const stats = [
    { label: 'Time Saved', value: '4,250 min', sub: 'Doing better than last month' },
    { label: 'Units Working', value: '18', sub: 'Active now' },
    { label: 'Traffic Cost', value: '$1.92/min', sub: 'Cost of driving' }
  ];

  const handleSendToAccountant = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setShowModal(false);
      }, 2000);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white uppercase">Money Tracking</h1>
          <p className="text-slate-300 mt-2">See how much money you save by using this computer system.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-white text-black px-6 py-3 rounded-2xl font-bold hover:bg-slate-100 transition-all flex items-center gap-2 shadow-xl"
        >
          <Calculator size={20} />
          Check Total Savings
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="glass p-6 rounded-3xl border border-white/10">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">{s.label}</span>
            <div className="text-3xl font-mono font-bold mt-1 text-white">{s.value}</div>
            <div className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1 font-bold">
              <TrendingUp size={12} />
              {s.sub}
            </div>
          </div>
        ))}
      </div>

      <div className="glass rounded-3xl overflow-hidden border border-white/10">
        <div className="p-6 border-b border-white/10 bg-white/5 flex justify-between items-center">
          <h2 className="text-lg font-bold">Savings This Month</h2>
          <div className="flex items-center gap-4 text-[10px] font-bold">
            <span className="px-3 py-1 bg-white/10 rounded-full border border-white/10">Clear List</span>
            <span className="text-emerald-400">Extra Found</span>
            <span className="font-mono bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-400 uppercase">Total Cost: $0.00</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-[10px] uppercase font-bold text-slate-300">
                <th className="px-6 py-4">Where we saved</th>
                <th className="px-6 py-4">Reason</th>
                <th className="px-6 py-4">Change</th>
                <th className="px-6 py-4 text-right">Money Back</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-6 py-5 font-bold text-white uppercase">1. Driving Less</td>
                <td className="px-6 py-5 text-slate-200">Avoiding heavy traffic</td>
                <td className="px-6 py-5 text-slate-300">Faster paths</td>
                <td className="px-6 py-5 text-right font-mono text-emerald-400">+$24,500 /mo</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-6 py-5 font-bold text-white uppercase">2. Finding Repairs Early</td>
                <td className="px-6 py-5 text-slate-200">Knowing what breaks next</td>
                <td className="px-6 py-5 text-slate-300">Quick fixes</td>
                <td className="px-6 py-5 text-right font-mono text-emerald-400">+$18,200 /mo</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-6 py-5 font-bold text-white uppercase">3. City Money Forms</td>
                <td className="px-6 py-5 text-slate-200">Forms sent to the city</td>
                <td className="px-6 py-5 text-slate-300">Rebate help</td>
                <td className="px-6 py-5 text-right font-mono text-emerald-400">+$65,000 /mo</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-white/5">
                <td colSpan={3} className="px-6 py-6 font-bold text-lg text-white">Total Money Back</td>
                <td className="px-6 py-6 text-right font-mono text-3xl font-bold text-emerald-400">$107,700</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="flex justify-end gap-4 no-print">
        <button 
          onClick={() => window.print()} 
          className="flex items-center gap-2 px-6 py-3 border border-white/20 rounded-2xl hover:bg-white/10 transition-colors font-bold text-slate-200"
        >
          <FileText size={18} />
          Print Report
        </button>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-thermex-blue text-white rounded-2xl hover:bg-thermex-blue/90 transition-all font-bold shadow-xl"
        >
          <Send size={18} />
          Send to Office
        </button>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setShowModal(false)} />
          <div className="relative glass w-full max-w-lg rounded-[2.5rem] p-10 text-center space-y-8 animate-in zoom-in duration-300">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <TrendingUp className="text-emerald-400 w-10 h-10" />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-black mb-2 uppercase tracking-tighter text-white">Yearly Savings</h3>
              <p className="text-slate-300 font-bold">Estimated based on unit performance.</p>
            </div>
            
            <div className="text-6xl font-mono font-bold text-emerald-400 tracking-tighter">
              $1.29M
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                <span className="text-slate-400 font-bold uppercase">Time Saved</span>
                <span className="font-bold text-white">1,062,500 min</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                <span className="text-slate-400 font-bold uppercase">Work Efficiency</span>
                <span className="font-bold text-emerald-400">+22.4%</span>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <button 
                onClick={handleSendToAccountant}
                disabled={isSending || showSuccess}
                className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all shadow-lg disabled:opacity-50"
              >
                {isSending ? <Loader2 className="animate-spin" /> : showSuccess ? <CheckCircle /> : <Send />}
                {isSending ? 'SENDING...' : showSuccess ? 'REPORT SENT' : 'SEND EMAIL NOW'}
              </button>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
