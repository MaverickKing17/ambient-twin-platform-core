
import React, { useState } from 'react';
import { PartnerConfig } from '../types';
import { TrendingUp, Send, CheckCircle, Calculator, ChevronRight, FileText } from 'lucide-react';

export const AccountantReveal: React.FC<{ partner: PartnerConfig }> = ({ partner }) => {
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const stats = [
    { label: 'Saved Minutes', value: '4,250', sub: '+12% vs last month' },
    { label: 'Truck Count', value: '18', sub: 'Active in GTA' },
    { label: 'Avg Burn Rate', value: '$1.92/m', sub: 'Real-time 401/DVP' }
  ];

  const annualRecovery = 4250 * 250 * 18 / 60; // Just illustrative calculation

  const handleSendToAccountant = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setShowModal(false);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Financial Recovery Engine</h1>
          <p className="text-slate-400 mt-2">Converting technical HVAC monitoring into enterprise EBITDA.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-white text-black px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-transform flex items-center gap-2"
        >
          <Calculator size={20} />
          Reveal Profit Recovery
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="glass p-6 rounded-3xl border border-white/5">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{s.label}</span>
            <div className="text-3xl font-mono font-bold mt-1">{s.value}</div>
            <div className="text-[11px] text-emerald-500 mt-2 flex items-center gap-1">
              <TrendingUp size={12} />
              {s.sub}
            </div>
          </div>
        ))}
      </div>

      <div className="glass rounded-3xl overflow-hidden border border-white/5">
        <div className="p-6 border-b border-border bg-white/5 flex justify-between items-center">
          <h2 className="text-lg font-bold">Accountant-Ready Leakage Report</h2>
          <div className="flex items-center gap-4 text-xs">
            <span className="px-3 py-1 bg-white/10 rounded-full border border-white/10">$1,500 Audit Fee Applied</span>
            <span className="font-bold text-emerald-500">$1,500 Subscription Credit Applied</span>
            <span className="font-mono bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-400">NET SETUP: $0.00</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border text-[10px] uppercase font-bold text-slate-500">
                <th className="px-6 py-4">Financial Driver</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Operational Impact</th>
                <th className="px-6 py-4 text-right">Recovery Value</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-border hover:bg-white/5 transition-colors">
                <td className="px-6 py-5 font-bold">1. Operational Leak (Traffic)</td>
                <td className="px-6 py-5 text-slate-400">DVP/401 Congestion ID via ORS API</td>
                <td className="px-6 py-5">Optimized Routing Logic</td>
                <td className="px-6 py-5 text-right font-mono text-emerald-400">+$24,500 /mo</td>
              </tr>
              <tr className="border-b border-border hover:bg-white/5 transition-colors">
                <td className="px-6 py-5 font-bold">2. Predictive Revenue (TSI)</td>
                <td className="px-6 py-5 text-slate-400">Early failure detection algorithm</td>
                <td className="px-6 py-5">Service conversion @ 82%</td>
                <td className="px-6 py-5 text-right font-mono text-emerald-400">+$18,200 /mo</td>
              </tr>
              <tr className="border-b border-border hover:bg-white/5 transition-colors">
                <td className="px-6 py-5 font-bold">3. Incentive Capture (Rebates)</td>
                <td className="px-6 py-5 text-slate-400">Ontario HRS Lead Integration</td>
                <td className="px-6 py-5">Auto-prequalify HP conversions</td>
                <td className="px-6 py-5 text-right font-mono text-emerald-400">+$65,000 /mo</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-white/5">
                <td colSpan={3} className="px-6 py-6 font-bold text-lg">Estimated Monthly Recovery</td>
                <td className="px-6 py-6 text-right font-mono text-3xl font-bold text-emerald-500">$107,700</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="flex justify-end gap-4 no-print">
        <button 
          onClick={() => window.print()} 
          className="flex items-center gap-2 px-6 py-3 border border-border rounded-2xl hover:bg-white/5 transition-colors font-semibold"
        >
          <FileText size={18} />
          Print Recovery Report
        </button>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-thermex-blue text-white rounded-2xl hover:bg-thermex-blue/80 transition-colors font-bold"
        >
          <Send size={18} />
          Send to Accountant
        </button>
      </div>

      {/* Success Reveal Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-obsidian/90 backdrop-blur-xl" onClick={() => setShowModal(false)} />
          <div className="relative glass w-full max-w-lg rounded-[2.5rem] p-10 text-center space-y-8 animate-in zoom-in duration-300">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <TrendingUp className="text-emerald-500 w-10 h-10" />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2 uppercase tracking-tighter">Annual Profit Recovery</h3>
              <p className="text-slate-400">Based on your current truck count and efficiency leaks.</p>
            </div>
            
            <div className="text-6xl font-mono font-bold text-emerald-400 tracking-tighter">
              $1.29M
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm border-b border-border pb-2">
                <span className="text-slate-500">Saved Minutes/Yr</span>
                <span className="font-bold">1,062,500</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-border pb-2">
                <span className="text-slate-500">Truck Efficiency</span>
                <span className="font-bold text-emerald-500">+22.4%</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-border pb-2">
                <span className="text-slate-500">Setup Credit</span>
                <span className="font-bold">-$1,500.00</span>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <button 
                onClick={handleSendToAccountant}
                className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors"
              >
                {showSuccess ? <CheckCircle /> : <Send />}
                {showSuccess ? 'SENT SUCCESSFULLY' : 'EXECUTE EMAIL TO ACCOUNTANT'}
              </button>
              <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-white transition-colors text-sm font-semibold">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
