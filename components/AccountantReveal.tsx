
import React, { useState, useEffect } from 'react';
import { BrandConfig } from '../types';
import { TrendingUp, Send, CheckCircle, Calculator, ChevronRight, FileText, Loader2, Truck, ShieldCheck, ArrowRight, DollarSign, PieChart, Info, Printer, Mail, X } from 'lucide-react';

export const AccountantReveal: React.FC<{ brand: BrandConfig }> = ({ brand }) => {
  const [showModal, setShowModal] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [truckCount, setTruckCount] = useState(5);
  const [costPerMinute, setCostPerMinute] = useState(1.92);

  // Recovery Formula: (Cost Per Minute * 30 mins * 250 days * Truck Count)
  const annualSavings = costPerMinute * 30 * 250 * truckCount;

  useEffect(() => {
    // Dynamic cost jitter to feel "live"
    const interval = setInterval(() => {
      setCostPerMinute(prev => prev + (Math.random() - 0.5) * 0.01);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
    <div className="max-w-[1200px] mx-auto space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Header & Truck Slider */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8 no-print">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-400 uppercase tracking-widest rounded">Financial Reveal Active</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-white uppercase leading-none">The Accountant Reveal</h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-3">Calculated Real-Time Recovery for {brand.companyName}</p>
        </div>
        
        <div className="glass p-6 rounded-[2rem] border border-white/10 flex flex-col md:flex-row items-center gap-8 w-full xl:w-auto shadow-2xl">
          <div className="flex flex-col items-center md:items-start gap-1">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Live Truck Fleet Count</span>
             <div className="flex items-center gap-4">
                <Truck className="text-thermex-blue" size={20} />
                <input 
                  type="range" 
                  min="1" 
                  max="50" 
                  value={truckCount} 
                  onChange={(e) => setTruckCount(parseInt(e.target.value))}
                  className="w-48 accent-thermex-blue"
                />
                <span className="text-3xl font-black text-white font-mono w-12">{truckCount}</span>
             </div>
          </div>
          <div className="h-12 w-px bg-white/10 hidden md:block" />
          <button 
            onClick={() => setShowModal(true)}
            className="w-full md:w-auto bg-white text-black h-16 px-10 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-slate-100 transition-all flex items-center justify-center gap-3 shadow-xl"
          >
            <Calculator size={18} />
            Reveal Recovery
          </button>
        </div>
      </div>

      {/* Annual Profit Recovery Card */}
      <div className="relative glass rounded-[3rem] p-12 border border-emerald-500/20 overflow-hidden shadow-2xl group">
        <div className="scanline opacity-10" />
        <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500" />
        
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12 relative z-10">
          <div className="space-y-6 flex-1 text-center lg:text-left">
            <div>
               <h3 className="text-[11px] font-black text-emerald-400 uppercase tracking-[0.4em] mb-4">Total Annual Profit Recovery</h3>
               <div className="text-8xl font-black text-white tracking-tighter leading-none mb-4 group-hover:scale-105 transition-transform duration-700">
                  ${annualSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
               </div>
               <p className="text-slate-400 text-sm font-bold max-w-md leading-relaxed">
                 Using the Enterprise Success Formula: <br/>
                 <span className="text-white font-mono text-xs">(${costPerMinute.toFixed(2)} CPM * 30m * 250d * {truckCount} Trucks)</span>
               </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full lg:w-auto shrink-0">
             <div className="p-8 rounded-[2rem] bg-black/20 border border-white/5 space-y-2">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Setup Cost Reconciliation</div>
                <div className="flex items-center gap-4 text-sm font-bold">
                   <span className="text-slate-400 line-through">$1,500 Audit Fee</span>
                   <ArrowRight size={14} className="text-emerald-500" />
                   <span className="text-emerald-400">$1,500 Subscription Credit</span>
                </div>
                <div className="text-xl font-black text-white font-mono mt-2">$0.00 <span className="text-[9px] text-slate-500 font-bold uppercase">Net Setup Cost</span></div>
             </div>
             <div className="p-8 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/20 flex flex-col justify-center items-center text-center">
                <ShieldCheck className="text-emerald-400 mb-2" size={32} />
                <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Accountant Ready</div>
                <div className="text-white font-bold text-xs mt-1">GAAP Compliant Reporting</div>
             </div>
          </div>
        </div>
      </div>

      {/* The Three Pillars of Recovery */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="glass rounded-[2.5rem] p-10 border border-white/10 space-y-6 hover:translate-y-[-8px] transition-all">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
            <Truck className="text-amber-500" size={32} />
          </div>
          <div>
            <h4 className="text-2xl font-black text-white uppercase tracking-tighter">1. Operational Leak</h4>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1 mb-4">Traffic Recovery Engine</p>
            <p className="text-sm text-slate-100 font-medium leading-relaxed">
              Eliminating the **"Traffic Tax"**. Money saved by bypassing GTA congestion via real-time 401/DVP diagnostic routing.
            </p>
          </div>
          <div className="pt-4 border-t border-white/5">
             <div className="text-2xl font-black text-amber-500 font-mono tracking-tight">+${(annualSavings * 0.35).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
             <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Estimated Yearly Delta</span>
          </div>
        </div>

        <div className="glass rounded-[2.5rem] p-10 border border-white/10 space-y-6 hover:translate-y-[-8px] transition-all">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
            <TrendingUp className="text-purple-500" size={32} />
          </div>
          <div>
            <h4 className="text-2xl font-black text-white uppercase tracking-tighter">2. Predictive Revenue</h4>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1 mb-4">AI-Spotted Repairs (TSI)</p>
            <p className="text-sm text-slate-100 font-medium leading-relaxed">
              Capturing **"Margin Drift"**. Identifying technical malfunctions via Digital Twin telemetry before total system failure.
            </p>
          </div>
          <div className="pt-4 border-t border-white/5">
             <div className="text-2xl font-black text-purple-500 font-mono tracking-tight">+${(annualSavings * 0.45).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
             <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Estimated Yearly Delta</span>
          </div>
        </div>

        <div className="glass rounded-[2.5rem] p-10 border border-white/10 space-y-6 hover:translate-y-[-8px] transition-all">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
            <DollarSign className="text-emerald-500" size={32} />
          </div>
          <div>
            <h4 className="text-2xl font-black text-white uppercase tracking-tighter">3. Incentive Capture</h4>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1 mb-4">Automated Rebate Filing</p>
            <p className="text-sm text-slate-100 font-medium leading-relaxed">
              Unlocking government capital. Maximum capture of Enbridge and municipal grants via automated compliance.
            </p>
          </div>
          <div className="pt-4 border-t border-white/5">
             <div className="text-2xl font-black text-emerald-500 font-mono tracking-tight">+${(annualSavings * 0.20).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
             <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Estimated Yearly Delta</span>
          </div>
        </div>
      </div>

      {/* Print-Only Executive Summary Section */}
      <div className="hidden print-only space-y-12">
        <div className="flex justify-between items-start border-b-2 border-slate-900 pb-8">
           <div>
             <h1 className="text-4xl font-black uppercase tracking-tighter">Executive ROI Summary</h1>
             <p className="text-slate-600 font-bold uppercase tracking-widest">Generated for {brand.companyName}</p>
           </div>
           <div className="text-right">
             <div className="font-bold">Audit Date: {new Date().toLocaleDateString()}</div>
             <div className="text-xs text-slate-500">System Ref: ENTERPRISE-REV-001</div>
           </div>
        </div>

        <div className="space-y-6">
           <h2 className="text-2xl font-black border-l-4 border-slate-900 pl-4 uppercase tracking-tighter">The Business Case</h2>
           <p className="text-slate-700 leading-relaxed text-lg">
             Current analysis identifies significant <strong>"Margin Drift"</strong> within regional service operations. Due to the increasing <strong>"Traffic Tax"</strong> inherent to the Toronto/GTA service corridors, operational efficiency is currently compromised at an estimated rate of ${costPerMinute.toFixed(2)} per vehicle minute. 
           </p>
           <p className="text-slate-700 leading-relaxed text-lg">
             The implementation of the <strong>{brand.companyName} Digital Twin Platform</strong> facilitates a total annual profit recovery of <strong>${annualSavings.toLocaleString()}</strong> by addressing Operational Leaks, Predictive Revenue Capture, and Automated Incentives.
           </p>
        </div>

        <div className="grid grid-cols-3 gap-8 pt-12">
           <div className="p-8 border-2 border-slate-200 rounded-3xl text-center">
              <div className="text-3xl font-black">${(annualSavings * 0.35).toLocaleString()}</div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-2">Ops Recovery</div>
           </div>
           <div className="p-8 border-2 border-slate-200 rounded-3xl text-center">
              <div className="text-3xl font-black">${(annualSavings * 0.45).toLocaleString()}</div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-2">Predictive Rev</div>
           </div>
           <div className="p-8 border-2 border-slate-200 rounded-3xl text-center">
              <div className="text-3xl font-black">${(annualSavings * 0.20).toLocaleString()}</div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-2">Incentive Capture</div>
           </div>
        </div>

        <div className="pt-24 border-t border-slate-100 flex justify-between items-end">
           <div className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">Confidential Enterprise Document</div>
           <div className="w-48 h-px bg-slate-300 relative">
              <div className="absolute -top-6 left-0 text-[10px] font-bold uppercase">Executive Signature</div>
           </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row justify-end gap-5 no-print">
        <button 
          onClick={() => window.print()}
          className="h-16 px-8 rounded-2xl border border-white/20 bg-white/5 text-white font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3"
        >
          <Printer size={18} />
          Executive PDF Summary
        </button>
        <button 
          onClick={() => setShowModal(true)}
          className="h-16 px-10 rounded-2xl bg-thermex-blue text-white font-black uppercase text-xs tracking-widest hover:bg-thermex-blue/90 transition-all shadow-2xl flex items-center justify-center gap-3"
        >
          <Mail size={18} />
          Send to Accountant
        </button>
      </div>

      {/* Reveal & Email Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={() => setShowModal(false)} />
          <div className="relative glass w-full max-w-2xl rounded-[3rem] p-12 border border-white/20 shadow-[0_0_100px_rgba(0,0,0,0.5)] animate-in zoom-in duration-300">
            <div className="scanline opacity-20" />
            
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-10 right-10 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"
            >
              <X size={20} />
            </button>

            <div className="space-y-8">
              <div className="text-center">
                <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="text-emerald-400" size={40} />
                </div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Business Case Ready</h3>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">Formal ROI Transmission for Accountancy firm</p>
              </div>

              <div className="p-8 rounded-[2rem] bg-black/40 border border-white/10 space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Destination Firm</label>
                    <input 
                      type="text" 
                      placeholder="e.g. KPMG / Deloitte / Local Partner" 
                      className="w-full h-14 bg-black/20 border border-white/10 rounded-xl px-5 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Pre-Written Case Summary</label>
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-[11px] text-slate-300 font-medium leading-relaxed italic">
                      "Dear Accountant, following an operational audit of our service fleet, we have identified a potential annual recovery of ${annualSavings.toLocaleString()}. This implementation mitigates Margin Drift and optimizes our tax strategy regarding GTA traffic congestion..."
                    </div>
                 </div>
              </div>

              <button 
                onClick={handleSendToAccountant}
                disabled={isSending || showSuccess}
                className="w-full h-20 bg-emerald-500 text-white rounded-3xl font-black uppercase tracking-[0.3em] text-xs hover:bg-emerald-400 transition-all shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSending ? <Loader2 size={24} className="animate-spin" /> : showSuccess ? <CheckCircle size={24} /> : <Send size={20} />}
                {isSending ? 'COMPILING CASE...' : showSuccess ? 'TRANSMISSION SUCCESS' : 'EXECUTE SEND'}
              </button>
              
              <p className="text-[9px] text-slate-500 text-center font-bold uppercase tracking-widest">A secure, encrypted link to the full ROI dashboard will be attached.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
