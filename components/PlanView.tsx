import React from 'react';
import { PlanResult } from '../types';
import { SimpleMarkdownRenderer, RECOMMENDED_GEAR } from '../constants';
import { ExternalLink, CheckCircle2, AlertTriangle, ShoppingBag, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  plan: PlanResult;
}

const PlanView: React.FC<Props> = ({ plan }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Main Content Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Header Image Placeholder */}
        <div className="h-48 md:h-64 w-full bg-slate-200 relative">
             <img 
                src="https://picsum.photos/1200/600?grayscale" 
                alt="Winter Landscape" 
                className="w-full h-full object-cover opacity-80"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6 text-white">
                    <p className="text-emerald-300 font-medium tracking-wider text-sm mb-1 uppercase">{t.winterExpedition}</p>
                    <h1 className="text-2xl md:text-3xl font-bold">{t.yourAdventure}</h1>
                </div>
             </div>
        </div>

        <div className="p-6 md:p-10">
          <SimpleMarkdownRenderer content={plan.markdownContent} />
        </div>
      </div>

      {/* Monetization: Recommended Gear (Affiliate Links) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4 text-slate-800">
            <ShoppingBag className="text-emerald-600" />
            <h3 className="text-lg font-bold">{t.gearShop}</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {RECOMMENDED_GEAR.map((item) => (
                <div key={item.id} className="group border border-slate-100 rounded-xl p-3 hover:border-emerald-200 hover:shadow-lg transition-all bg-slate-50">
                    <div className="aspect-square rounded-lg overflow-hidden mb-3 relative">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm p-1 text-white text-xs font-bold text-center">
                            {item.price}
                        </div>
                    </div>
                    <h4 className="font-medium text-slate-800 text-sm mb-2 line-clamp-1">{item.name}</h4>
                    <a 
                        href={item.link}
                        onClick={(e) => e.preventDefault()} // Prevent actual nav for demo
                        className="flex items-center justify-center gap-1 w-full py-2 bg-slate-900 text-white rounded-lg text-xs font-bold group-hover:bg-emerald-600 transition-colors"
                    >
                        {t.buyNow} <ArrowRight size={12} />
                    </a>
                </div>
            ))}
        </div>
      </div>

      {/* Safety Reminder */}
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 flex gap-4 items-start">
        <div className="text-amber-600 mt-1 shrink-0">
            <AlertTriangle size={24} />
        </div>
        <div>
            <h3 className="font-semibold text-amber-900 mb-1">{t.safetyCheck}</h3>
            <p className="text-amber-800 text-sm">{t.safetyContent}</p>
        </div>
      </div>

      {/* Sources Section */}
      {plan.sources.length > 0 && (
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <CheckCircle2 size={16} />
            {t.verifiedSource}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {plan.sources.map((source, idx) => (
              <a
                key={idx}
                href={source.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-emerald-400 hover:shadow-sm transition-all group"
              >
                <div className="bg-slate-100 p-2 rounded-md group-hover:bg-emerald-50 transition-colors">
                  <ExternalLink size={16} className="text-slate-400 group-hover:text-emerald-600" />
                </div>
                <span className="text-sm text-slate-700 font-medium truncate group-hover:text-emerald-800">
                  {source.title}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanView;