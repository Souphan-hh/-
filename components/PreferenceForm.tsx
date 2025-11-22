import React, { useState } from 'react';
import { Difficulty, Preferences, RouteStyle } from '../types';
import { Map, Users, Clock, MountainSnow, Compass, Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  onSubmit: (prefs: Preferences) => void;
  isLoading: boolean;
  isPro: boolean;
  onTriggerUpgrade: () => void;
}

const PreferenceForm: React.FC<Props> = ({ onSubmit, isLoading, isPro, onTriggerUpgrade }) => {
  const { t, language } = useLanguage();
  const [childAge, setChildAge] = useState(7);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
  const [duration, setDuration] = useState(3);
  const [routeStyle, setRouteStyle] = useState<RouteStyle>(RouteStyle.CLASSIC);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ childAge, difficulty, durationHours: duration, language, routeStyle });
  };

  const handleStyleChange = (style: RouteStyle) => {
    if (style === RouteStyle.HIDDEN_GEM && !isPro) {
        onTriggerUpgrade();
        return;
    }
    setRouteStyle(style);
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-slate-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-100 rounded-full text-emerald-600">
          <Map size={24} />
        </div>
        <h2 className="text-xl font-semibold text-slate-800">{t.planYourTrip}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Child Age */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-2">
            <Users size={16} />
            {t.childAge} ({childAge} {t.years})
          </label>
          <input
            type="range"
            min="3"
            max="15"
            value={childAge}
            onChange={(e) => setChildAge(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>3 {t.years}</span>
            <span>15 {t.years}</span>
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-3">
            <MountainSnow size={16} />
            {t.difficulty}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.keys(Difficulty).map((key) => {
              const level = key as keyof typeof Difficulty;
              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => setDifficulty(level as Difficulty)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border-2 ${
                    difficulty === level
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200'
                  }`}
                >
                  {t.difficultyLevels[level]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Route Style (VIP Feature) */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-3">
            <Compass size={16} />
            {t.routeStyle}
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
                type="button"
                onClick={() => handleStyleChange(RouteStyle.CLASSIC)}
                className={`px-3 py-3 rounded-lg text-sm font-medium transition-all border-2 relative ${
                routeStyle === RouteStyle.CLASSIC
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200'
                }`}
            >
                {t.routeStyles.CLASSIC}
            </button>

            <button
                type="button"
                onClick={() => handleStyleChange(RouteStyle.HIDDEN_GEM)}
                className={`px-3 py-3 rounded-lg text-sm font-medium transition-all border-2 relative flex items-center justify-center gap-2 ${
                routeStyle === RouteStyle.HIDDEN_GEM
                    ? 'border-amber-500 bg-amber-50 text-amber-700'
                    : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200'
                }`}
            >
                {t.routeStyles.HIDDEN_GEM}
                {!isPro && <Lock size={14} className="text-slate-400" />}
            </button>
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-2">
            <Clock size={16} />
            {t.hikingDuration} ({duration} {t.hrs})
          </label>
          <input
            type="range"
            min="1"
            max="8"
            step="0.5"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
           <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>1 {t.hrs}</span>
            <span>8 {t.hrs}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3.5 rounded-xl text-white font-semibold shadow-lg shadow-emerald-600/20 transition-all ${
            isLoading
              ? 'bg-emerald-400 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-emerald-600/30 active:scale-[0.98]'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t.findingRoutes}
            </span>
          ) : (
            t.findAdventure
          )}
        </button>
      </form>
    </div>
  );
};

export default PreferenceForm;