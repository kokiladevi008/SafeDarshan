import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { apiFetch } from '../utils/api';
import { QrCode, CheckCircle2, ShieldAlert, AlertCircle, Search, User, Landmark, Clock } from 'lucide-react';

export default function CheckIn() {
  const { t } = useLanguage();
  const [bookingId, setBookingId] = useState('SD20261001');
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCheckIn = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setResult(null);

    if (!bookingId) {
      setErrorMsg('Please enter a valid Booking ID.');
      return;
    }

    setSubmitting(true);
    const res = await apiFetch('/checkin', {
      method: 'POST',
      body: JSON.stringify({ booking_id: bookingId.trim() })
    });
    setSubmitting(false);

    if (res.success) {
      setResult(res.data);
    } else {
      setErrorMsg(res.error?.message || 'Verification failed. Invalid or already used pass.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-xl bg-gold/20 border border-gold/40 flex items-center justify-center mx-auto shadow-gold-sm">
          <QrCode className="w-6 h-6 text-gold" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-text-primary">
          {t('scanTitle')}
        </h1>
        <p className="text-xs text-text-muted">Enter or scan the devotee's Booking ID code for entrance check-in</p>
      </div>

      {/* Verification Input Form */}
      <form onSubmit={handleCheckIn} className="glass-card rounded-3xl p-6 sm:p-8 border border-gold/40 shadow-gold-glow space-y-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gold uppercase tracking-wider">
            {t('enterBookingId')}
          </label>
          <div className="relative">
            <Search className="w-5 h-5 text-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              placeholder="e.g. SD20261001"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value.toUpperCase())}
              className="w-full bg-bg-primary border border-gold/40 rounded-xl pl-11 pr-4 py-3.5 text-sm font-mono font-bold tracking-wider text-text-primary focus:outline-none focus:border-gold"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-gold via-gold-light to-gold-dark text-bg-primary font-bold text-xs shadow-gold-sm hover:brightness-110 transition-all flex items-center justify-center gap-2"
        >
          {submitting ? 'Verifying Pass...' : t('verifyCheckIn')}
        </button>
      </form>

      {/* Error Output */}
      {errorMsg && (
        <div className="p-5 rounded-2xl bg-danger/10 border border-danger/40 text-rose-300 text-xs flex items-center gap-3 shadow-dark-card">
          <AlertCircle className="w-6 h-6 text-rose-400 flex-shrink-0" />
          <div className="space-y-0.5">
            <span className="font-bold block">Check-In Denied</span>
            <p>{errorMsg}</p>
          </div>
        </div>
      )}

      {/* Success Output Banner */}
      {result && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/50 bg-emerald-950/20 space-y-6 shadow-gold-glow">
          <div className="flex items-center gap-3 border-b border-emerald-500/30 pb-4">
            <div className="p-2.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-emerald-400">
                {t('checkInSuccess')}
              </h3>
              <span className="text-xs text-text-muted">Status: Entry Authorized</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-bg-primary/60 p-3.5 rounded-xl border border-gold/15 space-y-1">
              <span className="text-text-muted flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-gold" />
                Devotee Name
              </span>
              <span className="font-bold text-text-primary text-sm block">{result.visitor_name}</span>
            </div>

            <div className="bg-bg-primary/60 p-3.5 rounded-xl border border-gold/15 space-y-1">
              <span className="text-text-muted flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5 text-gold" />
                Temple Shrine
              </span>
              <span className="font-bold text-gold text-sm block">{result.temple_name}</span>
            </div>

            <div className="bg-bg-primary/60 p-3.5 rounded-xl border border-gold/15 space-y-1">
              <span className="text-text-muted flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gold" />
                Slot Time Window
              </span>
              <span className="font-bold text-text-primary text-sm block">{result.time}</span>
            </div>

            <div className="bg-bg-primary/60 p-3.5 rounded-xl border border-gold/15 space-y-1">
              <span className="text-text-muted block">Visitor Count</span>
              <span className="font-bold text-emerald-400 text-sm block">{result.visitor_count} Devotee(s)</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
