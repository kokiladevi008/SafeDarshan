import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { apiFetch } from '../utils/api';
import CrowdStatus from '../components/CrowdStatus';
import AIRecommendation from '../components/AIRecommendation';
import TimingCard from '../components/TimingCard';
import { MapPin, Calendar, Clock, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function TempleDetails() {
  const { id } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [temple, setTemple] = useState(null);
  const [poojas, setPoojas] = useState([]);
  const [slots, setSlots] = useState([]);
  const [crowdData, setCrowdData] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAllData() {
      setLoading(true);
      const [tRes, pRes, sRes, cRes, predRes] = await Promise.all([
        apiFetch(`/temples/${id}`),
        apiFetch(`/temples/${id}/pooja`),
        apiFetch(`/temples/${id}/darshan`),
        apiFetch(`/temples/${id}/crowd`),
        apiFetch(`/temples/${id}/prediction`)
      ]);

      if (tRes.success) setTemple(tRes.data);
      if (pRes.success) setPoojas(pRes.data);
      if (sRes.success) {
        setSlots(sRes.data);
        if (sRes.data.length > 0) setSelectedSlot(sRes.data[0]);
      }
      if (cRes.success) setCrowdData(cRes.data);
      if (predRes.success) setPrediction(predRes);

      setLoading(false);
    }
    loadAllData();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-text-muted space-y-4">
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-sm font-semibold">Loading temple details and AI crowd telemetry...</p>
      </div>
    );
  }

  if (!temple) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-text-muted space-y-4">
        <h2 className="font-serif text-2xl text-text-primary">Temple Not Found</h2>
        <Link to="/temples" className="text-xs font-semibold text-gold underline">Return to Temples</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Top Banner & Hero Image */}
      <div className="relative rounded-3xl overflow-hidden glass-card border border-gold/30 shadow-dark-card">
        <div className="h-80 sm:h-96 w-full relative">
          <img
            src={temple.image_url}
            alt={temple.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171320] via-[#171320]/60 to-transparent"></div>
        </div>

        <div className="p-6 sm:p-10 -mt-24 relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-gold text-bg-primary text-xs font-bold shadow-gold-sm">
              {temple.state}
            </span>
            <span className="px-3.5 py-1 rounded-full bg-bg-surface/80 border border-gold/30 text-gold-light text-xs font-semibold">
              Max Capacity: {temple.capacity} Devotees
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-text-primary">
            {temple.name}
          </h1>

          <div className="flex items-center gap-2 text-sm text-gold">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span>{temple.location}</span>
          </div>

          <p className="text-xs sm:text-sm text-text-muted max-w-3xl leading-relaxed">
            {temple.description}
          </p>
        </div>
      </div>

      {/* Main Grid: AI & Telemetry Left, Booking & Slots Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 Cols): AI Prediction, Live Crowd, Timings */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* AI Recommendation Card */}
          <AIRecommendation prediction={prediction} />

          {/* Live Crowd Gauge */}
          <CrowdStatus crowdData={crowdData} />

          {/* Timings & Pooja Schedule */}
          <TimingCard
            openingTime={temple.opening_time}
            closingTime={temple.closing_time}
            poojaTimings={poojas}
          />

        </div>

        {/* Right Column (1 Col): Slot Booking Widget */}
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 border-2 border-gold/40 shadow-gold-glow sticky top-28 space-y-6">
            
            <div className="border-b border-gold/20 pb-4">
              <h3 className="font-serif text-xl font-bold text-text-primary flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gold" />
                {t('darshanSlots')}
              </h3>
              <p className="text-xs text-text-muted mt-1">Select date and time slot to reserve darshan pass</p>
            </div>

            {/* Slots List */}
            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {slots.map((slot) => {
                const isSelected = selectedSlot?.id === slot.id;
                const isFull = slot.status === 'FULL';

                return (
                  <button
                    key={slot.id}
                    disabled={isFull}
                    onClick={() => setSelectedSlot(slot)}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-gold/20 border-gold shadow-gold-sm text-text-primary'
                        : isFull
                        ? 'bg-bg-primary/30 border-gold/10 text-text-muted opacity-50 cursor-not-allowed'
                        : 'bg-bg-primary/60 border-gold/20 text-text-primary hover:border-gold/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-gold">{slot.date}</span>
                        <span className="text-[10px] text-text-muted">({slot.start_time} - {slot.end_time})</span>
                      </div>
                      <span className="text-[11px] text-text-muted mt-1 block">
                        {isFull ? 'Slot Full' : `${slot.available_seats} seats remaining`}
                      </span>
                    </div>

                    {isSelected && <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Book Action Button */}
            <button
              disabled={!selectedSlot || selectedSlot.status === 'FULL'}
              onClick={() => navigate(`/booking?temple_id=${temple.id}&slot_id=${selectedSlot.id}`)}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-gold via-gold-light to-gold-dark text-bg-primary font-bold text-sm shadow-gold-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{t('bookDarshan')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        </div>

      </div>

    </div>
  );
}
