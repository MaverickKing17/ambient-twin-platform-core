
import React from 'react';
import { BrandConfig } from '../types';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Scale, Gavel, ScrollText, AlertCircle, Info } from 'lucide-react';

interface LegalViewProps {
  type: 'privacy' | 'agreement' | 'laws' | 'safety';
  brand: BrandConfig;
}

export const LegalView: React.FC<LegalViewProps> = ({ type, brand }) => {
  const content = {
    privacy: {
      title: "Privacy Rules & Data Policy",
      subtitle: "Enterprise Data Protection Standards",
      icon: <ShieldCheck className="text-emerald-500" size={32} />,
      sections: [
        {
          heading: "1. Digital Twin Privacy Protocol",
          body: "All telemetry data captured from connected HVAC units is encrypted using AES-256 standards. Our 'Ambient Twin' technology ensures that while technical vital signs are monitored, individual resident lifestyle data remains strictly confidential and non-retrievable by third parties."
        },
        {
          heading: "2. Data Residency",
          body: "For all GTA operations, data is stored on localized secure nodes within the province of Ontario. We adhere to all PIPEDA (Personal Information Protection and Electronic Documents Act) requirements for the handling of residential service logs."
        },
        {
          heading: "3. Transparency & Audit",
          body: "Users of the HVAC OS Hub have the right to request a full disclosure of all data stored regarding their specific service IDs. We provide a 'Zero-Knowledge' proof of security for all realtor-shared certificates."
        }
      ]
    },
    agreement: {
      title: "Service Agreement",
      subtitle: "Standard Terms for Enterprise SaaS Partners",
      icon: <ScrollText className="text-thermex-blue" size={32} />,
      sections: [
        {
          heading: "1. The $1,500 Setup Reconciliation",
          body: "As part of our commitment to HVAC profitability, the initial $1,500 Audit/Setup fee is immediately applied as a Subscription Credit to your account. This ensures a net-zero entry cost for valid enterprise partners."
        },
        {
          heading: "2. Platform Uptime (SLA)",
          body: "HVAC OS guarantees a 99.9% uptime for the live traffic and diagnostic engine. Any downtime exceeding 4 consecutive hours will result in automatic service credits to the enterprise user."
        },
        {
          heading: "3. Professional Use Only",
          body: "This platform is intended for licensed HVAC technicians and authorized real estate personnel. Misuse of telemetry data or fraudulent filing of rebate forms will result in immediate termination of the SaaS license."
        }
      ]
    },
    laws: {
      title: "Local Toronto Laws",
      subtitle: "Compliance with GTA Municipal Regulations",
      icon: <Gavel className="text-amber-500" size={32} />,
      sections: [
        {
          heading: "1. Toronto Noise Bylaw (Chapter 591)",
          body: "All HVAC unit installations within the City of Toronto must comply with the acoustic emission standards set forth in Municipal Code Chapter 591. Our Digital Twin engine automatically flags units exceeding decibel thresholds near property lines."
        },
        {
          heading: "2. DVP and 401 Access Rules",
          body: "Our 'Traffic Tax' calculator accounts for the City's commercial vehicle restrictions. Service routing is optimized to comply with weight and axle restrictions on local municipal feeder roads during peak service hours."
        },
        {
          heading: "3. Municipal Rebate Eligibility",
          body: "Specific incentives provided by the City of Toronto for high-efficiency heat pump transitions are subject to ongoing verification. Our Incentive Capture pillar remains updated with current municipal grant cycles."
        }
      ]
    },
    safety: {
      title: "Ontario Safety Rules",
      subtitle: "TSSA and Provincial Gas Code Compliance",
      icon: <AlertCircle className="text-red-500" size={32} />,
      sections: [
        {
          heading: "1. TSSA Act 2000 Compliance",
          body: "All technicians using this platform must maintain valid OBT1/2/3 licensing. The Hub acts as a digital record of safety checks but does not replace the requirement for TSSA-certified physical inspections."
        },
        {
          heading: "2. B149.1 Natural Gas Installation Code",
          body: "Our system diagnostics are programmed based on the CSA B149.1 standards. Any deviation in static pressure or inducer operation that suggests a venting hazard triggers an immediate 'Critical Red' status on the main dashboard."
        },
        {
          heading: "3. Carbon Monoxide Mitigation",
          body: "In accordance with Ontario law, any service call logged through the system regarding heat exchanger failure mandates the verification of a working Carbon Monoxide alarm on site. This is a non-bypassable field in the work log parsing engine."
        }
      ]
    }
  };

  const page = content[type];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 animate-in fade-in duration-700">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 font-bold uppercase text-[10px] tracking-widest">
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      <div className="glass rounded-[3rem] p-12 lg:p-16 border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="scanline opacity-10" />
        
        <div className="flex items-center gap-6 mb-12">
          <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
            {page.icon}
          </div>
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">{page.title}</h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2" style={{ color: brand.primaryColor }}>{page.subtitle}</p>
          </div>
        </div>

        <div className="space-y-12">
          {page.sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: brand.primaryColor }} />
                {section.heading}
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm font-medium">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Info className="text-slate-500" size={16} />
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Document ID: HUB-{type.toUpperCase()}-2026</span>
          </div>
          <button 
            onClick={() => window.print()}
            className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
          >
            Download as PDF
          </button>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
          Official Documentation of {brand.companyName} Enterprise Hub
        </p>
      </div>
    </div>
  );
};
