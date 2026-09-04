import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Clock, Users, ArrowRight, Sparkles } from 'lucide-react';

export default function TempleCard({ temple }) {
  const { t } = useLanguage();

  const getCrowdBadgeStyle = (level) => {
    switch (level) {
      case 'Low':
        return 'bg-success/20 text-emerald-400 border-success/40';
      case 'Moderate':
        return 'bg-warning/20 text-amber-300 border-warning/40';
      case 'High':
        return 'bg-orange-950/40 text-orange-400 border-orange-500/40';
      case 'Very High':
        return 'bg-danger/20 text-rose-400 border-danger/40';
      default:
        return 'bg-gold/20 text-gold-light border-gold/40';
    }
  };

  const getCrowdLabel = (level) => {
    switch (level) {
      case 'Low': return t('levelLow');
      case 'Moderate': return t('levelModerate');
      case 'High': return t('levelHigh');
      case 'Very High': return t('levelVeryHigh');
      default: return level || t('levelModerate');
    }
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden hover:border-gold/60 transition-all duration-300 hover:-translate-y-1 shadow-dark-card group flex flex-col h-full">
      
      {/* Temple Image & State Badge */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={temple.image_url}
          alt={temple.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171320] via-transparent to-black/30"></div>
        
        {/* State Tag */}
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0D0B14]/80 backdrop-blur-md text-[11px] font-semibold text-gold border border-gold/30">
          {temple.state}
        </span>

        {/* Live Crowd Badge */}
        <span className={`absolute top-4 right-4 px-3 py-1 rounded-full border text-xs font-semibold backdrop-blur-md ${getCrowdBadgeStyle(temple.crowd_level)}`}>
          {getCrowdLabel(temple.crowd_level)}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-serif text-xl font-bold text-text-primary group-hover:text-gold transition-colors line-clamp-1">
            {temple.name}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-text-muted mt-1.5">
            <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0" />
            <span className="line-clamp-1">{temple.location}</span>
          </div>

          <p className="text-xs text-text-muted mt-3 line-clamp-2 leading-relaxed">
            {temple.description}
          </p>
        </div>

        {/* Details & AI Specs */}
        <div className="pt-4 border-t border-gold/10 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-bg-primary/50 p-2.5 rounded-lg border border-gold/10">
              <span className="text-[10px] text-text-muted uppercase block">{t('waitingTime')}</span>
              <span className="font-semibold text-text-primary flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-gold" />
                ~{temple.waiting_time_minutes || 30} mins
              </span>
            </div>

            <div className="bg-bg-primary/50 p-2.5 rounded-lg border border-gold/10">
              <span className="text-[10px] text-text-muted uppercase block">{t('bestTime')}</span>
              <span className="font-semibold text-gold flex items-center gap-1 mt-0.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-light" />
                {temple.recommended_time || '14:00-15:00'}
              </span>
            </div>
          </div>

          {/* Action Link */}
          <Link
            to={`/temples/${temple.id}`}
            className="w-full mt-2 py-2.5 rounded-xl bg-gold/10 hover:bg-gold hover:text-bg-primary border border-gold/30 text-gold text-xs font-semibold flex items-center justify-center gap-2 transition-all group/btn"
          >
            <span>{t('viewDetails')}</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
