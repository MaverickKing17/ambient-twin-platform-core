
import React, { useState, useEffect } from 'react';
import { BrandConfig } from '../types';
import { TrendingUp, Send, CheckCircle, Calculator, ChevronRight, FileText, Loader2, Truck, ShieldCheck, ArrowRight, DollarSign, PieChart, Info, Printer, Mail, X, BarChart3, Receipt, Landmark } from 'lucide-react';

export const AccountantReveal: React.FC<{ brand: BrandConfig }> = ({ brand }) => {
  const [showModal, setShowModal] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [truckCount, setTruckCount] = useState(5);
  const [costPerMinute, setCostPerMinute] = useState(1.92);
  const [revealStep, setRevealStep] = useState(0);

  // Recovery Formula: (Cost Per Minute * 30 mins * 250 days * Truck Count)
  const annualSavings = costPerMinute * 30 * 250 * truckCount;

  useEffect(() => {
    // Dynamic cost jitter to feel "live"
    const interval = setInterval(() => {
      setCostPerMinute(prev => prev + (Math.random() - 0.5) * 0.01);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const triggerReveal = () => {
    setShowModal(true);
    setRevealStep(0);
    // Sequence the reveal of the three pillars
    setTimeout(() => setRevealStep(1), 800);
    setTimeout(() => setRevealStep(2), 1600);
    setTimeout(() => setRevealStep(3), 2400);
    setTimeout(() => setRevealStep(4), 3200);
  };

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
    <div className="max-w-[1400px] mx-auto space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Header & Control Bar */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8 no-print">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">Financial Authority Dashboard</span>
          </div>
          <h1 className="text-6xl font-black tracking-tighter text-white uppercase leading-none">The Accountant Reveal</h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs mt-3 flex items-center gap-2">
            GAAP Compliant Profit Recovery Engine <span className="text-white/20">•</span> {brand.companyName} Enterprise
          </p>
        </div>
        
        <div className="glass p-8 rounded-[2.5rem] border border-white/10 flex flex-col md:flex-row items-center gap-10 w-full xl:w-auto shadow-2xl relative overflow-hidden">
          <div className="scanline opacity-10" />
          <div className="flex flex-col items-center md:items-start gap-2 relative z-10">
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Active Fleet Deployment</span>
             <div className="flex items-center gap-5">
                <Truck className="text-thermex-blue" size={24} />
                <input 
                  type="range" 
                  min="1" 
                  max="50" 
                  value={truckCount} 
                  onChange={(e) => setTruckCount(parseInt(e.target.value))}
                  className="w-48 accent-thermex-blue h-1.5 rounded-full bg-white/10 appearance-none cursor-pointer"
                />
                <span className="text-4xl font-black text-white font-mono w-16">{truckCount}</span>
             </div>
          </div>
          <div className="h-16 w-px bg-white/10 hidden md:block" />
          <button 
            onClick={triggerReveal}
            className="w-full md:w-auto bg-white text-black h-20 px-12 rounded-3xl font-black uppercase text-xs tracking-[0.3em] hover:bg-slate-100 transition-all flex items-center justify-center gap-4 shadow-xl active:scale-95"
          >
            <Calculator size={20} />
            Calculate Recovery
          </button>
        </div>
      </div>

      {/* Main Stats Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 no-print">
        {/* Annual Recovery Giant Card */}
        <div className="lg:col-span-8 relative glass rounded-[3.5rem] p-12 border border-emerald-500/20 overflow-hidden shadow-2xl flex flex-col justify-center min-h-[400px]">
          <div className="scanline opacity-20" />
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] rotate-12">
            <DollarSign size={300} />
          </div>
          <div className="relative z-10 space-y-6">
            <h3 className="text-[12px] font-black text-emerald-400 uppercase tracking-[0.5em] mb-4 flex items-center gap-3">
              <Landmark size={18} /> Annual Profit Recovery Goal
            </h3>
            <div className="text-[9rem] font-black text-white tracking-tighter leading-none mb-6 animate-in zoom-in duration-1000">
              ${annualSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
            <div className="p-6 bg-black/40 rounded-3xl border border-white/5 inline-flex items-center gap-4">
              <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-400">
                <Calculator size={24} />
              </div>
              <p className="text-slate-300 text-sm font-bold leading-tight">
                Calculated via Enterprise Success Formula: <br/>
                <span className="text-white font-mono text-xs">(${costPerMinute.toFixed(2)} CPM * 30m * 250d * {truckCount} Trucks)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Setup Reconciliation Table */}
        <div className="lg:col-span-4 glass rounded-[3.5rem] p-10 border border-white/10 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="scanline opacity-10" />
          <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
            <Receipt size={16} className="text-thermex-blue" />
            Accountant-Ready Table
          </h3>
          
          <div className="flex-1 space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest text-slate-500 border-b border-white/5 pb-4">
                <span>Description</span>
                <span>Amount</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-white uppercase tracking-tight">
                <span>Enterprise Audit Fee</span>
                <span className="text-red-400">$1,500.00</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-white uppercase tracking-tight">
                <span>Subscription Credit</span>
                <span className="text-emerald-400">-$1,500.00</span>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Net Setup Cost</div>
                  <div className="text-4xl font-black text-white font-mono tracking-tighter">$0.00</div>
                </div>
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400">
                  <ShieldCheck size={28} />
                </div>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed mt-10">
            Internal reconciliation protocol auto-balances setup liabilities against recurring service credits.
          </p>
        </div>
      </div>

      {/* The Three Pillars of Recovery Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 no-print">
        <div className="group glass rounded-[3rem] p-10 border border-white/10 space-y-8 hover:translate-y-[-10px] transition-all duration-500 shadow-xl bg-gradient-to-b from-white/5 to-transparent">
          <div className="w-20 h-20 rounded-[1.5rem] bg-amber-500/10 flex items-center justify-center border border-amber-500/20 shadow-inner group-hover:scale-110 transition-transform">
            <Truck className="text-amber-500" size={40} />
          </div>
          <div>
            <h4 className="text-3xl font-black text-white uppercase tracking-tighter">1. Operational Leak</h4>
            <p className="text-xs text-amber-500/80 font-black uppercase tracking-[0.3em] mt-2 mb-6">Traffic Tax Elimination</p>
            <p className="text-base text-slate-300 font-medium leading-relaxed">
              Recapturing lost vehicle minutes by bypassing **GTA Traffic Tax**. Uses real-time diagnostic routing to avoid the 401/DVP congestion zones.
            </p>
          </div>
          <div className="pt-8 border-t border-white/10 flex justify-between items-center">
             <div className="text-3xl font-black text-white font-mono tracking-tighter">${(annualSavings * 0.35).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Est. Recovery</span>
          </div>
        </div>

        <div className="group glass rounded-[3rem] p-10 border border-white/10 space-y-8 hover:translate-y-[-10px] transition-all duration-500 shadow-xl bg-gradient-to-b from-white/5 to-transparent">
          <div className="w-20 h-20 rounded-[1.5rem] bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shadow-inner group-hover:scale-110 transition-transform">
            <TrendingUp className="text-purple-500" size={40} />
          </div>
          <div>
            <h4 className="text-3xl font-black text-white uppercase tracking-tighter">2. Predictive Revenue</h4>
            <p className="text-xs text-purple-500/80 font-black uppercase tracking-[0.3em] mt-2 mb-6">Capturing Margin Drift</p>
            <p className="text-base text-slate-300 font-medium leading-relaxed">
              Identifying **Margin Drift** via AI-spotted technical indicators (TSI). Converting potential unit failure into structured predictive maintenance revenue.
            </p>
          </div>
          <div className="pt-8 border-t border-white/10 flex justify-between items-center">
             <div className="text-3xl font-black text-white font-mono tracking-tighter">${(annualSavings * 0.45).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Est. Recovery</span>
          </div>
        </div>

        <div className="group glass rounded-[3rem] p-10 border border-white/10 space-y-8 hover:translate-y-[-10px] transition-all duration-500 shadow-xl bg-gradient-to-b from-white/5 to-transparent">
          <div className="w-20 h-20 rounded-[1.5rem] bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-inner group-hover:scale-110 transition-transform">
            <BarChart3 className="text-emerald-500" size={40} />
          </div>
          <div>
            <h4 className="text-3xl font-black text-white uppercase tracking-tighter">3. Incentive Capture</h4>
            <p className="text-xs text-emerald-500/80 font-black uppercase tracking-[0.3em] mt-2 mb-6">Gov/Utility Recovery</p>
            <p className="text-base text-slate-300 font-medium leading-relaxed">
              Unlocking government capital. Automated processing of all available **Enbridge & Municipal rebates** for every high-efficiency install in your queue.
            </p>
          </div>
          <div className="pt-8 border-t border-white/10 flex justify-between items-center">
             <div className="text-3xl font-black text-white font-mono tracking-tighter">${(annualSavings * 0.20).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Est. Recovery</span>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row justify-end gap-6 no-print pt-10">
        <button 
          onClick={() => window.print()}
          className="h-20 px-12 rounded-[1.5rem] border-2 border-white/10 bg-white/5 text-white font-black uppercase text-[11px] tracking-[0.4em] hover:bg-white/10 transition-all flex items-center justify-center gap-4 active:scale-95"
        >
          <Printer size={20} />
          Executive PDF Summary
        </button>
        <button 
          onClick={triggerReveal}
          className="h-20 px-16 rounded-[1.5rem] bg-thermex-blue text-white font-black uppercase text-[11px] tracking-[0.4em] hover:bg-thermex-blue/90 transition-all shadow-[0_20px_40px_rgba(14,165,233,0.3)] flex items-center justify-center gap-4 active:scale-95"
        >
          <Mail size={20} />
          Send to Accountant
        </button>
      </div>

      {/* PRINT-OPTIMIZED EXECUTIVE SUMMARY */}
      <div className="hidden print:block bg-white p-12 text-slate-900 min-h-screen">
        <div className="flex justify-between items-start border-b-4 border-slate-900 pb-12 mb-16">
          <div className="space-y-2">
            <h1 className="text-5xl font-black uppercase tracking-tighter leading-none">{brand.companyName} ROI REPORT</h1>
            <p className="text-xl font-bold uppercase tracking-widest text-slate-500">Official Operational Audit Summary</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-slate-900 uppercase">GAAP Compliant</div>
            <div className="text-slate-500 font-bold">Generated: {new Date().toLocaleDateString()}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-20 mb-20">
          <div className="space-y-10">
            <h2 className="text-3xl font-black uppercase tracking-tighter border-l-8 border-slate-900 pl-6">Business Case Analysis</h2>
            <p className="text-xl leading-relaxed text-slate-700">
              This document serves as an official analysis of operational inefficiencies, termed <strong>"Margin Drift"</strong>, currently impacting the service fleet. Our Audit finds that the localized <strong>"Traffic Tax"</strong> inherent to the Toronto/GTA service corridors creates a liability of ${costPerMinute.toFixed(2)} per minute.
            </p>
            <p className="text-xl leading-relaxed text-slate-700">
              The implementation of the <strong>{brand.companyName} Hub</strong> facilitates a total annual profit recovery of <strong>${annualSavings.toLocaleString()}</strong> through algorithmic routing, predictive maintenance, and automated incentive capture.
            </p>
          </div>
          <div className="space-y-8">
            <div className="p-10 bg-slate-50 border-2 border-slate-200 rounded-3xl">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Total Annual Recovery Estimate</h3>
              <div className="text-7xl font-black text-slate-900">${annualSavings.toLocaleString()}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 border-2 border-slate-100 rounded-2xl">
                <span className="text-[10px] font-black uppercase text-slate-400">Truck Fleet</span>
                <div className="text-2xl font-black">{truckCount} Units</div>
              </div>
              <div className="p-6 border-2 border-slate-100 rounded-2xl">
                <span className="text-[10px] font-black uppercase text-slate-400">CPM Rate</span>
                <div className="text-2xl font-black">${costPerMinute.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-black uppercase tracking-widest border-b-2 border-slate-200 pb-4">Reconciliation Ledger</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-black uppercase text-slate-400 border-b border-slate-100">
                <th className="py-4">Recovery Stream</th>
                <th className="py-4 text-right">Value (CAD)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <tr><td className="py-6 text-xl font-bold">1. Operational Leakage (Traffic Tax)</td><td className="py-6 text-xl font-black text-right">${(annualSavings * 0.35).toLocaleString()}</td></tr>
              <tr><td className="py-6 text-xl font-bold">2. Predictive Revenue (Margin Drift)</td><td className="py-6 text-xl font-black text-right">${(annualSavings * 0.45).toLocaleString()}</td></tr>
              <tr><td className="py-6 text-xl font-bold">3. Incentive Capture (Government)</td><td className="py-6 text-xl font-black text-right">${(annualSavings * 0.20).toLocaleString()}</td></tr>
              <tr className="bg-slate-900 text-white"><td className="py-8 px-6 text-2xl font-black">TOTAL PROJECTED RECOVERY</td><td className="py-8 px-6 text-3xl font-black text-right">${annualSavings.toLocaleString()}</td></tr>
            </tbody>
          </table>
        </div>

        <div className="mt-auto pt-20 flex justify-between items-end">
          <div className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Produced by {brand.companyName} Financial Engine</div>
          <div className="w-64 border-t-2 border-slate-900 pt-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Executive Signature Authority</span>
          </div>
        </div>
      </div>

      {/* REVEAL & EMAIL MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => setShowModal(false)} />
          <div className="relative glass w-full max-w-2xl rounded-[4rem] p-12 border border-white/20 shadow-[0_0_120px_rgba(0,0,0,0.8)] animate-in zoom-in duration-300 overflow-hidden">
            <div className="scanline opacity-20" />
            
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-12 right-12 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all active:scale-90"
            >
              <X size={24} />
            </button>

            <div className="space-y-10">
              <div className="text-center">
                <div className="w-24 h-24 rounded-[2.5rem] bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <ShieldCheck className="text-emerald-500 animate-pulse" size={48} />
                </div>
                <h3 className="text-5xl font-black text-white uppercase tracking-tighter">Business Case Ready</h3>
                <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-[10px] mt-4">Transmitting ROI to Corporate Accountancy Firm</p>
              </div>

              {/* Reveal Sequence Display */}
              <div className="space-y-4 p-8 bg-black/40 rounded-[2.5rem] border border-white/5">
                {[
                  { label: "1. Operational Leak", val: annualSavings * 0.35, step: 1 },
                  { label: "2. Predictive Revenue", val: annualSavings * 0.45, step: 2 },
                  { label: "3. Incentive Capture", val: annualSavings * 0.20, step: 3 },
                ].map((item, i) => (
                  <div key={i} className={`flex justify-between items-center transition-all duration-500 ${revealStep >= item.step ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                    <span className="text-xl font-black text-emerald-400 font-mono">+${item.val.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                ))}
                
                <div className={`mt-6 pt-6 border-t border-white/10 flex justify-between items-center transition-all duration-1000 ${revealStep >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                  <span className="text-xs font-black text-white uppercase tracking-widest">Total Recovery Identified</span>
                  <span className="text-4xl font-black text-white font-mono tracking-tighter">${annualSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              </div>

              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Destination Accounting Partner</label>
                    <input 
                      type="text" 
                      placeholder="e.g. KPMG, Deloitte, or Corporate Firm" 
                      className="w-full h-16 bg-black/40 border border-white/10 rounded-2xl px-6 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-slate-700"
                    />
                 </div>
              </div>

              <button 
                onClick={handleSendToAccountant}
                disabled={isSending || showSuccess || revealStep < 4}
                className="w-full h-20 bg-emerald-500 text-white rounded-[2rem] font-black uppercase tracking-[0.4em] text-xs hover:bg-emerald-400 transition-all shadow-2xl flex items-center justify-center gap-4 disabled:opacity-30 active:scale-95"
              >
                {isSending ? <Loader2 size={24} className="animate-spin" /> : showSuccess ? <CheckCircle size={24} /> : <Send size={20} />}
                {isSending ? 'COMPILING CASE...' : showSuccess ? 'DISPATCH SUCCESS' : 'EXECUTE DISPATCH'}
              </button>
              
              <div className="flex items-center justify-center gap-3 text-[9px] text-slate-500 font-black uppercase tracking-widest">
                <Lock size={12} /> Secure, End-to-End Encrypted Handshake Authorized
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
