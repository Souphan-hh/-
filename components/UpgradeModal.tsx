import React from 'react';
import { X, Crown, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

const UpgradeModal: React.FC<Props> = ({ isOpen, onClose, onUpgrade }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm relative overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Decorative Header */}
        <div className="h-32 bg-gradient-to-br from-amber-400 via-orange-400 to-rose-500 relative">
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
            >
                <X size={20} />
            </button>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center transform rotate-3">
                    <Crown size={32} className="text-amber-500 fill-amber-500" />
                </div>
            </div>
        </div>

        <div className="pt-12 pb-8 px-6 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{t.subscribeTitle}</h2>
            <p className="text-slate-500 text-sm mb-6">{t.subscribeDesc}</p>

            <div className="space-y-3 text-left mb-8 bg-slate-50 p-4 rounded-xl">
                {[t.benefit1, t.benefit2, t.benefit3].map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                        <div className="p-1 bg-emerald-100 rounded-full mt-0.5">
                            <Check size={12} className="text-emerald-600" />
                        </div>
                        <span className="text-sm text-slate-700 font-medium">{benefit}</span>
                    </div>
                ))}
            </div>

            <div className="mb-6">
                <span className="text-3xl font-bold text-slate-900">{t.price}</span>
            </div>

            <button 
                onClick={onUpgrade}
                className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-slate-800 hover:shadow-xl transition-all active:scale-95"
            >
                {t.subscribeBtn}
            </button>

            <button onClick={onClose} className="mt-4 text-xs text-slate-400 font-medium hover:text-slate-600">
                {t.restore}
            </button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;