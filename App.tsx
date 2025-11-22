import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Mountain, Languages, Crown } from 'lucide-react';
import PreferenceForm from './components/PreferenceForm';
import PlanView from './components/PlanView';
import UpgradeModal from './components/UpgradeModal';
import { generateHikingPlan } from './services/geminiService';
import { Preferences, PlanResult, RouteStyle } from './types';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const AppContent: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [plan, setPlan] = useState<PlanResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Monetization State
  const [isPro, setIsPro] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const handleGeneratePlan = async (prefs: Preferences) => {
    setIsLoading(true);
    setError(null);
    setPlan(null);
    try {
      // In a real app, pass the route style to the prompt to customize output
      // For now, we assume the prompt logic handles it or we just simulate the gating
      const result = await generateHikingPlan(prefs);
      setPlan(result);
    } catch (err) {
      setError(t.error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
    if (plan) {
        setPlan(null);
    }
  };

  const handleUpgrade = () => {
    // Simulate API call for payment
    setTimeout(() => {
        setIsPro(true);
        setShowUpgradeModal(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans relative">
      <UpgradeModal 
        isOpen={showUpgradeModal} 
        onClose={() => setShowUpgradeModal(false)} 
        onUpgrade={handleUpgrade} 
      />

      {/* Navigation / Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-700 cursor-pointer" onClick={() => setPlan(null)}>
            <Mountain size={28} strokeWidth={2.5} />
            <span className="text-xl font-bold tracking-tight hidden sm:inline">{t.appName}</span>
            <span className="text-xl font-bold tracking-tight sm:hidden">NingboTrails</span>
          </div>
          
          <div className="flex items-center gap-3">
             {!isPro ? (
                 <button 
                    onClick={() => setShowUpgradeModal(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md hover:shadow-lg transition-all active:scale-95 text-sm font-bold"
                 >
                    <Crown size={14} fill="currentColor" />
                    <span className="hidden md:inline">{t.upgradeToPro}</span>
                    <span className="md:hidden">VIP</span>
                 </button>
             ) : (
                 <div className="flex items-center gap-1 px-2 py-1 bg-slate-800 text-amber-400 rounded-md text-xs font-bold tracking-wider">
                     <Crown size={10} fill="currentColor" />
                     {t.proBadge}
                 </div>
             )}

             <button 
               onClick={toggleLanguage}
               className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors text-sm font-medium"
               aria-label="Switch Language"
             >
               <Languages size={16} />
               <span>{language === 'en' ? '中文' : 'English'}</span>
             </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {!plan && !isLoading && (
        <div className="relative bg-emerald-900 text-white py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/snow.png')]"></div>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{t.heroTitle}</h1>
            <p className="text-emerald-100 text-lg md:text-xl mb-8 leading-relaxed">
              {t.heroDesc}
            </p>
          </div>
        </div>
      )}

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar / Form */}
          <div className={`lg:col-span-4 ${plan ? 'lg:sticky lg:top-24' : 'lg:col-start-5 lg:col-span-4'}`}>
             <PreferenceForm 
                onSubmit={handleGeneratePlan} 
                isLoading={isLoading} 
                isPro={isPro}
                onTriggerUpgrade={() => setShowUpgradeModal(true)}
             />
          </div>

          {/* Results Area */}
          <div className="lg:col-span-8">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 mb-6 animate-pulse">
                {error}
              </div>
            )}

            {isLoading && (
               <div className="flex flex-col items-center justify-center py-20 space-y-6 text-center">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Mountain size={20} className="text-slate-300" />
                    </div>
                  </div>
                  <div>
                      <h3 className="text-lg font-medium text-slate-800">{t.consulting}</h3>
                      <p className="text-slate-500 text-sm max-w-xs mx-auto mt-2">{t.consultingDesc}</p>
                  </div>
               </div>
            )}

            {plan && <PlanView plan={plan} />}
          </div>

        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;