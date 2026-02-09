
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { AccountantReveal } from './components/AccountantReveal';
import { RealtorCertificate } from './components/RealtorCertificate';
import { PARTNERS } from './constants';
import { PartnerConfig } from './types';
import { Navbar } from './components/Navbar';

const App: React.FC = () => {
  const [partner, setPartner] = useState<PartnerConfig>(PARTNERS['mckinnon']);
  
  // BrandEngine Hook
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', partner.accent_color);
  }, [partner]);

  return (
    <Router>
      <div className="min-h-screen bg-obsidian text-slate-100 flex flex-col">
        <Navbar currentPartner={partner} onPartnerChange={setPartner} />
        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Dashboard partner={partner} />} />
            <Route path="/accountant" element={<AccountantReveal partner={partner} />} />
            <Route path="/certificate/:id" element={<RealtorCertificate />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
