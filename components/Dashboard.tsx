
import React, { useState } from 'react';
// Added ShieldCheck to the list of icons imported from lucide-react
import { Search, MapPin, Activity, AlertCircle, FileCheck, DollarSign, ShieldCheck } from 'lucide-react';
import { CostClock } from './CostClock';
import { FurnaceWireframe } from './FurnaceWireframe';
import { INITIAL_MOCK_DATA } from '../constants';
import { DigitalTwin, PartnerConfig } from '../types';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC<{ partner: PartnerConfig }> = ({ partner }) => {
  const [selectedTwin, setSelectedTwin] = useState<DigitalTwin>(INITIAL_MOCK_DATA[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = INITIAL_MOCK_DATA.filter(d => 
    d.client_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">GTA Intelligence Hub</h1>
          <p className="text-slate-400 mt-1">Monitoring 1,240 active twins across the 401 & DVP corridors.</p>
        </div>
        <div className="flex items-center gap-4">
          <CostClock />
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full lg:h-[75vh]">
        
        {/* Col 1: Live GTA Activity Feed */}
        <div className="lg:col-span-3 flex flex-col glass rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <Activity className="text-emerald-500 w-4 h-4" />
              Live Activity
            </h3>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-500 w-3.5 h-3.5" />
              <input 
                type="text" 
                placeholder="Search GTA..." 
                className="bg-obsidian border border-border rounded-md pl-8 pr-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-slate-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
            {filteredData.map(twin => (
              <button 
                key={twin.id}
                onClick={() => setSelectedTwin(twin)}
                className={`w-full text-left p-3 rounded-xl transition-all border ${selectedTwin.id === twin.id ? 'bg-white/10 border-white/20' : 'hover:bg-white/5 border-transparent'}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-sm">{twin.client_name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${twin.health_score > 80 ? 'bg-emerald-500/20 text-emerald-400' : twin.health_score > 60 ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'}`}>
                    {twin.health_score}%
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                  <MapPin size={10} />
                  {twin.address}, {twin.city}
                </div>
                {twin.remote_resolution && (
                  <div className="mt-2 flex items-center gap-1.5 text-[10px] font-bold text-thermex-blue animate-pulse">
                    <ShieldCheck size={12} />
                    REMOTE RESOLUTION READY
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Col 2: Interactive System Vital Signs */}
        <div className="lg:col-span-6 glass rounded-2xl flex flex-col p-6 relative overflow-hidden">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-bold">{selectedTwin.client_name}'s System</h2>
              <p className="text-slate-400 flex items-center gap-2 text-sm mt-1">
                <MapPin size={14} /> {selectedTwin.address}, {selectedTwin.city}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Live Vital Signs</span>
              <span className="text-sm font-semibold text-emerald-400">{selectedTwin.live_vital_signs}</span>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <FurnaceWireframe twin={selectedTwin} />
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
            <div className="text-center">
              <span className="block text-xs text-slate-500 uppercase font-bold mb-1">System Breathing</span>
              <span className="text-xl font-mono">{selectedTwin.system_breathing} <span className="text-xs text-slate-600">iwc</span></span>
            </div>
            <div className="text-center">
              <span className="block text-xs text-slate-500 uppercase font-bold mb-1">Heating Power</span>
              <span className="text-xl font-mono">{selectedTwin.heating_power}° <span className="text-xs text-slate-600">ΔT</span></span>
            </div>
            <div className="text-center">
              <span className="block text-xs text-slate-500 uppercase font-bold mb-1">System Motors</span>
              <span className="text-xl font-mono text-thermex-blue">{selectedTwin.system_motors}</span>
            </div>
          </div>
        </div>

        {/* Col 3: Revenue & Rebate Sidebar */}
        <div className="lg:col-span-3 space-y-6 flex flex-col">
          <div className="glass rounded-2xl p-5 flex-1 flex flex-col">
            <h3 className="font-semibold flex items-center gap-2 mb-4">
              <DollarSign className="text-amber-500 w-4 h-4" />
              Revenue Engine
            </h3>
            
            <div className="space-y-4 flex-1">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs text-slate-500 uppercase font-bold">Ontario HRS Rebate Lead</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-2xl font-bold text-amber-500">$6,500</span>
                  <span className="text-[10px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full font-bold">PRE-QUALIFIED</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">Home Retrofit Score allows for immediate heat pump conversion incentive.</p>
              </div>

              {selectedTwin.alert_type !== 'None' && selectedTwin.remote_resolution && (
                <div className="p-4 rounded-xl bg-thermex-blue/10 border border-thermex-blue/30">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="text-thermex-blue w-4 h-4" />
                    <span className="text-xs font-bold text-thermex-blue uppercase">Remote Resolution</span>
                  </div>
                  <p className="text-sm font-semibold">Tripped Breaker Detected</p>
                  <p className="text-xs text-slate-400 mt-1">Prevented an unbillable <span className="text-white font-bold">$250 truck roll</span> via remote guidance.</p>
                </div>
              )}

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <span className="text-xs text-slate-500 uppercase font-bold">Predictive TSI</span>
                <div className="text-lg font-bold text-emerald-400 mt-1">+$1,450 Monthly</div>
                <p className="text-[11px] text-slate-400 mt-1">Total System Intelligence predictive revenue from planned maintenance.</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <Link to={`/certificate/${selectedTwin.id}`} className="w-full py-2 bg-white text-black text-center text-sm font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                <FileCheck size={16} />
                Generate Home Certificate
              </Link>
              <Link to="/accountant" className="w-full py-2 border border-border text-center text-sm font-semibold rounded-xl hover:bg-white/5 transition-colors">
                View Financial Recovery
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
