import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../utils/api';
import { Calendar, QrCode, ShieldCheck, Clock } from 'lucide-react';

export default function MyBookings() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=my-bookings');
      return;
    }

    async function loadBookings() {
      setLoading(true);
      const res = await apiFetch(`/bookings?user_id=${user.id}`);
      if (res.success) {
        setBookings(res.data);
      }
      setLoading(false);
    }
    loadBookings();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-text-muted">
        <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-gold/20 pb-4">
        <h1 className="font-serif text-3xl font-bold text-text-primary flex items-center gap-3">
          <Calendar className="w-7 h-7 text-gold" />
          <span>{t('navBookings')}</span>
        </h1>
        <p className="text-xs text-text-muted mt-1">All your active and completed darshan slot reservations</p>
      </div>

      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((b) => (
            <div key={b.id} className="glass-card p-6 rounded-2xl border border-gold/30 space-y-4 flex flex-col justify-between hover:border-gold/60 transition-all">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold border bg-gold/10 text-gold border-gold/30">
                    {b.booking_id}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                    b.status === 'CHECKED_IN' ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/40' : 'bg-gold/20 text-gold-light border-gold/40'
                  }`}>
                    {b.status}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-text-primary pt-1">{b.temple_name}</h3>
              </div>

              <div className="bg-bg-primary/50 p-3 rounded-xl border border-gold/10 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-text-muted">Date:</span>
                  <span className="font-semibold text-text-primary">{b.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Time Slot:</span>
                  <span className="font-semibold text-text-primary">{b.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Visitors:</span>
                  <span className="font-semibold text-text-primary">{b.visitor_count} Devotee(s)</span>
                </div>
              </div>

              <Link
                to={`/pass/${b.booking_id}`}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-gold via-gold-light to-gold-dark text-bg-primary font-bold text-xs shadow-gold-sm hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <QrCode className="w-4 h-4" />
                <span>View Digital Pass</span>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-16 text-center text-text-muted border border-gold/20 space-y-3">
          <p className="text-sm font-semibold">You have no darshan bookings yet.</p>
          <Link to="/temples" className="text-xs font-semibold text-gold underline">Explore & Book Temples</Link>
        </div>
      )}
    </div>
  );
}
