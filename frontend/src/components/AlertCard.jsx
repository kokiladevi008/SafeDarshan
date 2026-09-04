import React from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle, Info } from 'lucide-react';

export default function AlertCard({ alert }) {
  if (!alert) return null;

  const getRiskStyle = (level) => {
    switch (level) {
      case 'Critical':
        return {
          border: 'border-danger/50',
          bg: 'bg-danger/10',
          icon: <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0" />,
          badge: 'bg-danger/20 text-rose-300 border-danger/40'
        };
      case 'High':
        return {
          border: 'border-orange-500/40',
          bg: 'bg-orange-950/20',
          icon: <ShieldAlert className="w-5 h-5 text-orange-400 flex-shrink-0" />,
          badge: 'bg-orange-900/30 text-orange-300 border-orange-500/40'
        };
      case 'Medium':
        return {
          border: 'border-warning/40',
          bg: 'bg-warning/10',
          icon: <Info className="w-5 h-5 text-amber-400 flex-shrink-0" />,
          badge: 'bg-warning/20 text-amber-300 border-warning/40'
        };
      default:
        return {
          border: 'border-gold/30',
          bg: 'bg-gold/10',
          icon: <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />,
          badge: 'bg-gold/20 text-gold-light border-gold/40'
        };
    }
  };

  const style = getRiskStyle(alert.risk_level);

  return (
    <div className={`p-4 rounded-xl border ${style.border} ${style.bg} flex items-start gap-3 transition-all hover:scale-[1.01]`}>
      {style.icon}
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-xs text-text-primary">
            {alert.temple_name || 'Temple Zone Telemetry'} — <span className="text-gold">{alert.zone}</span>
          </span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${style.badge}`}>
            {alert.risk_level} Risk
          </span>
        </div>
        <p className="text-xs text-text-muted leading-relaxed">
          {alert.message}
        </p>
        <span className="text-[10px] text-text-muted/70 block pt-1">
          {alert.timestamp ? new Date(alert.timestamp).toLocaleTimeString() : 'Just now'}
        </span>
      </div>
    </div>
  );
}
