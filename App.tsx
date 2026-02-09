
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { AccountantReveal } from './components/AccountantReveal';
import { RealtorCertificate } from './components/RealtorCertificate';
import { RealtorPortal } from './components/RealtorPortal';
import { OperationsCommand } from './components/OperationsCommand';
import { BrandConfig } from './types';
import { Navbar } from './components/Navbar';
import { Ticker } from './components/Ticker';
import { Footer } from './components/Footer';

const DEFAULT_BRAND: BrandConfig = {
  companyName: 'HVAC OS',
  primaryColor: '#0ea5e9',
  logoUrl: null
};

const App: React.FC = () => {
  const [brand, setBrand] = useState<BrandConfig>(() => {
    const saved = localStorage.getItem('saas_branding');
    return saved ? JSON.parse(saved) : DEFAULT_BRAND;
  });
  
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', brand.primaryColor);
    localStorage.setItem('saas_branding', JSON.stringify(brand));
  }, [brand]);

  const updateBrand = (newBrand: BrandConfig) => setBrand(newBrand);

  return (
    <Router>
      <div className="min-h-screen bg-obsidian text-slate-100 flex flex-col">
        <Ticker />
        <Navbar brand={brand} />
        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Dashboard brand={brand} />} />
            <Route path="/operations" element={<OperationsCommand brand={brand} onUpdateBrand={updateBrand} />} />
            <Route path="/realtors" element={<RealtorPortal />} />
            <Route path="/accountant" element={<AccountantReveal brand={brand} />} />
            <Route path="/certificate/:id" element={<RealtorCertificate brand={brand} />} />
          </Routes>
        </main>
        <Footer brand={brand} />
      </div>
    </Router>
  );
};

export default App;
