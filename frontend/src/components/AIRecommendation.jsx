import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Calendar, Clock, AlertCircle } from 'lucide-react';

export default function AIRecommendation({ prediction }) {
  const { lang, t } = useLanguage();

  if (!prediction || !prediction.data) return null;

  const data = prediction.data;
  const advisoryText = data.advisory ? (data.advisory[lang] || data.advisory['en']) : '';

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-bg-surface via-[#1f192b] to-[#171320] p-6 border border-gold/40 shadow-gold-glow space-y-4">
      {/* Decorative Glow Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-gold/20 text-gold border border-gold/30">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold gold-gradient-text">
              {t('aiRecommendation')}
            </h3>
            <span className="text-[10px] text-text-muted uppercase tracking-wider block">
              Machine Learning Smart Advisory Engine
            </span>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-semibold">
          Demo AI Forecast
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="bg-bg-primary/70 p-4 rounded-xl border border-gold/15">
          <span className="text-xs text-text-muted block">{t('bestTime')}</span>
          <span className="text-lg font-bold text-gold flex items-center gap-1.5 mt-1">
            <Clock className="w-4 h-4 text-gold-light" />
            {data.recommended_slot || '14:00-15:00'}
          </span>
        </div>

        <div className="bg-bg-primary/70 p-4 rounded-xl border border-gold/15">
          <span className="text-xs text-text-muted block">Predicted Crowd Count</span>
          <span className="text-lg font-bold text-text-primary mt-1 block">
            {data.predicted_count} Devotees
          </span>
        </div>

        <div className="bg-bg-primary/70 p-4 rounded-xl border border-gold/15">
          <span className="text-xs text-text-muted block">Crowd Risk Level</span>
          <span className={`text-lg font-bold mt-1 block ${data.risk_level === 'Critical' ? 'text-rose-400' : 'text-emerald-400'}`}>
            {data.risk_level} Risk
          </span>
        </div>
      </div>

      {/* Bilingual Advisory Text */}
      {advisoryText && (
        <div className="p-4 rounded-xl bg-gold/10 border border-gold/30 text-xs text-gold-light flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">{advisoryText}</p>
        </div>
      )}
    </div>
  );
}
