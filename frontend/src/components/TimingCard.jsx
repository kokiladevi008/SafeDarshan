import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Clock, Sun, Moon, Flame } from 'lucide-react';

export default function TimingCard({ openingTime, closingTime, poojaTimings }) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Temple Opening & Closing Card */}
      <div className="glass-card rounded-2xl p-6 border border-gold/30 space-y-4">
        <h3 className="font-serif text-lg font-bold text-text-primary flex items-center gap-2">
          <Clock className="w-5 h-5 text-gold" />
          {t('openingClosing')}
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-bg-primary/50 p-4 rounded-xl border border-gold/15 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-300">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-text-muted uppercase block">Opening Time</span>
              <span className="text-base font-bold text-text-primary">{openingTime || '06:00 AM'}</span>
            </div>
          </div>

          <div className="bg-bg-primary/50 p-4 rounded-xl border border-gold/15 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-indigo-500/20 text-indigo-300">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-text-muted uppercase block">Closing Time</span>
              <span className="text-base font-bold text-text-primary">{closingTime || '08:30 PM'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pooja Timings Card */}
      <div className="glass-card rounded-2xl p-6 border border-gold/30 space-y-4">
        <h3 className="font-serif text-lg font-bold text-text-primary flex items-center gap-2">
          <Flame className="w-5 h-5 text-gold" />
          {t('poojaSchedule')}
        </h3>

        <div className="space-y-3">
          {poojaTimings && poojaTimings.length > 0 ? (
            poojaTimings.map((pooja) => (
              <div
                key={pooja.id}
                className="bg-bg-primary/60 p-4 rounded-xl border border-gold/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-gold/30 transition-colors"
              >
                <div>
                  <h4 className="font-semibold text-sm text-text-primary">{pooja.pooja_name}</h4>
                  <p className="text-xs text-text-muted mt-0.5">{pooja.description}</p>
                </div>
                <span className="text-xs font-bold text-gold px-3 py-1 rounded-full bg-gold/10 border border-gold/20 self-start sm:self-center">
                  {pooja.start_time} - {pooja.end_time}
                </span>
              </div>
            ))
          ) : (
            <p className="text-xs text-text-muted">Standard morning, afternoon, and evening poojas available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
