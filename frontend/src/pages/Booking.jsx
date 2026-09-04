import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../utils/api';
import { Calendar, Clock, Users, Landmark, AlertCircle, ArrowRight } from 'lucide-react';

export default function Booking() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const templeId = searchParams.get('temple_id') || '1';
  const slotId = searchParams.get('slot_id');

  const [temple, setTemple] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState(slotId || '');
  const [visitorCount, setVisitorCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=booking');
      return;
    }

    async function loadBookingData() {
      setLoading(true);
      const [tRes, sRes] = await Promise.all([
        apiFetch(`/temples/${templeId}`),
        apiFetch(`/temples/${templeId}/darshan`)
      ]);

      if (tRes.success) setTemple(tRes.data);
      if (sRes.success) {
        setSlots(sRes.data);
        if (!selectedSlotId && sRes.data.length > 0) {
          setSelectedSlotId(sRes.data[0].id.toString());
        }
      }
      setLoading(false);
    }
    loadBookingData();
  }, [templeId, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!selectedSlotId) {
      setErrorMsg('Please select an available darshan time slot.');
      return;
    }

    setSubmitting(true);
    const payload = {
      user_id: user.id,
      temple_id: parseInt(templeId),
      slot_id: parseInt(selectedSlotId),
      visitor_count: visitorCount
    };

    const res = await apiFetch('/bookings', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    setSubmitting(false);

    if (res.success) {
      // Store returned booking data in navigate state for confirmation screen
      navigate('/booking-confirmation', { state: { booking: res.data } });
    } else {
      setErrorMsg(res.error?.message || 'Failed to complete booking. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center text-text-muted">
        <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  const activeSlot = slots.find(s => s.id.toString() === selectedSlotId);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold">
          <Landmark className="w-4 h-4" />
          <span>{temple?.name}</span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-text-primary">
          {t('bookingTitle')}
        </h1>
        <p className="text-xs text-text-muted">Select your preferred date, slot, and visitor count</p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-danger/10 border border-danger/40 text-rose-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6 sm:p-8 border border-gold/30 shadow-dark-card space-y-6">
        
        {/* User Info */}
        <div className="bg-bg-primary/50 p-4 rounded-xl border border-gold/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-text-muted block">Devotee Name:</span>
            <span className="font-semibold text-text-primary mt-0.5 block">{user?.name}</span>
          </div>
          <div>
            <span className="text-text-muted block">Contact Phone:</span>
            <span className="font-semibold text-text-primary mt-0.5 block">{user?.phone}</span>
          </div>
        </div>

        {/* Slot Selection */}
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-gold uppercase tracking-wider">
            {t('selectSlot')}
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[280px] overflow-y-auto pr-1">
            {slots.map((s) => {
              const isSelected = selectedSlotId === s.id.toString();
              const isFull = s.status === 'FULL';

              return (
                <div
                  key={s.id}
                  onClick={() => !isFull && setSelectedSlotId(s.id.toString())}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-gold/20 border-gold shadow-gold-sm text-text-primary'
                      : isFull
                      ? 'bg-bg-primary/30 border-gold/10 text-text-muted opacity-40 cursor-not-allowed'
                      : 'bg-bg-primary/60 border-gold/20 text-text-primary hover:border-gold/50'
                  }`}
                >
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-gold">{s.date}</span>
                    <span className="text-text-muted">{s.start_time} - {s.end_time}</span>
                  </div>
                  <div className="text-[11px] text-text-muted mt-2">
                    {isFull ? 'Slot Full' : `${s.available_seats} seats left`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Visitor Count Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-gold uppercase tracking-wider">
            {t('visitorCount')} (Max 6)
          </label>
          
          <div className="flex items-center gap-4 bg-bg-primary/60 p-3 rounded-xl border border-gold/20 max-w-xs">
            <Users className="w-5 h-5 text-gold" />
            <select
              value={visitorCount}
              onChange={(e) => setVisitorCount(parseInt(e.target.value))}
              className="bg-transparent text-text-primary font-semibold text-sm focus:outline-none w-full"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num} className="bg-bg-surface text-text-primary">
                  {num} Devotee{num > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting || !selectedSlotId}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-gold via-gold-light to-gold-dark text-bg-primary font-bold text-sm shadow-gold-glow hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {submitting ? 'Processing Darshan Slot...' : t('confirmBooking')}
          <ArrowRight className="w-4 h-4" />
        </button>

      </form>
    </div>
  );
}
