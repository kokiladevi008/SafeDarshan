import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Users, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function CrowdStatus({ crowdData }) {
  const { t } = useLanguage();

  if (!crowdData) return null;

  const occupancy = crowdData.occupancy_percentage || 50;
  const level = crowdData.crowd_level || 'Moderate';

  const getBarColor = (occ) => {
    if (occ < 35) return 'from-emerald-500 to-emerald-400';
    if (occ < 65) return 'from-amber-500 to-amber-400';
    if (occ < 85) return 'from-orange-500 to-orange-400';
    return 'from-rose-600 to-rose-400';
  };

  const getBadgeStyle = (occ) => {
    if (occ < 35) return 'bg-success/20 text-emerald-400 border-success/40';
    if (occ < 65) return 'bg-warning/20 text-amber-300 border-warning/40';
    if (occ < 85) return 'bg-orange-950/40 text-orange-400 border-orange-500/40';
    return 'bg-danger/20 text-rose-400 border-danger/40';
  };

  return (
    <div className="glass-card rounded-2xl p-6 border border-gold/30 shadow-dark-card space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-serif text-lg font-bold text-text-primary flex items-center gap-2">
            <Users className="w-5 h-5 text-gold" />
            {t('currentCrowd')}
          </h3>
          <p className="text-xs text-text-muted mt-0.5">Live Occupancy & Crowd Telemetry</p>
        </div>

        <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getBadgeStyle(occupancy)}`}>
          {level} ({occupancy}%)
        </span>
      </div>

      {/* Progress Gauge Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-text-muted font-medium">
          <span>{crowdData.current_visitors} Devotees Present</span>
          <span>Max Capacity: {crowdData.capacity}</span>
        </div>
        <div className="w-full h-3 bg-bg-primary rounded-full overflow-hidden p-0.5 border border-gold/20">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${getBarColor(occupancy)} transition-all duration-700`}
            style={{ width: `${Math.min(100, occupancy)}%` }}
          ></div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        <div className="bg-bg-primary/60 p-4 rounded-xl border border-gold/10">
          <div className="flex items-center gap-2 text-text-muted text-xs">
            <Clock className="w-4 h-4 text-gold" />
            <span>{t('waitingTime')}</span>
          </div>
          <p className="text-xl font-bold text-text-primary mt-1">
            ~{crowdData.estimated_waiting_time_minutes || 45} mins
          </p>
        </div>

        <div className="bg-bg-primary/60 p-4 rounded-xl border border-gold/10">
          <div className="flex items-center gap-2 text-text-muted text-xs">
            <ShieldCheck className="w-4 h-4 text-gold" />
            <span>Security Status</span>
          </div>
          <p className="text-xl font-bold text-emerald-400 mt-1">
            Normal / Safe
          </p>
        </div>
      </div>
    </div>
  );
}
