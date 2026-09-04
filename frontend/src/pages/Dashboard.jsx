import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../utils/api';
import { User, Calendar, Clock, CheckCircle2, QrCode, ArrowRight, Landmark } from 'lucide-react';

export default function Dashboard() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [dashData, setDashData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=dashboard');
      return;
    }

    async function loadDashboard() {
      setLoading(true);
      const res = await apiFetch(`/dashboard?user_id=${user.id}`);
      if (res.success) {
        setDashData(res.data);
      }
      setLoading(false);
    }
    loadDashboard();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-text-muted">
        <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  const stats = dashData?.stats || { total_bookings: 0, upcoming_count: 0, completed_count: 0 };
  const upcoming = dashData?.upcoming_visits || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Welcome Banner */}
      <div className="glass-card rounded-3xl p-8 border border-gold/30 shadow-dark-card flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-semibold text-gold uppercase tracking-wider block">
            {t('userDashboard')}
          </span>
          <h1 className="font-serif text-3xl font-bold text-text-primary">
            Welcome back, <span className="gold-gradient-text">{user?.name}</span>
          </h1>
          <p className="text-xs text-text-muted">Manage upcoming darshans, access digital QR passes, and view visit logs.</p>
        </div>

        <Link
          to="/temples"
          className="px-6 py-3 rounded-xl bg-gold text-bg-primary font-bold text-xs shadow-gold-sm hover:brightness-110 transition-all flex items-center gap-2 flex-shrink-0"
        >
          <Landmark className="w-4 h-4" />
          <span>Book New Darshan</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-gold/20 space-y-2">
          <span className="text-xs text-text-muted block uppercase font-semibold">{t('totalBookings')}</span>
          <span className="font-serif text-4xl font-bold text-gold">{stats.total_bookings}</span>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-gold/20 space-y-2">
          <span className="text-xs text-text-muted block uppercase font-semibold">Upcoming Darshans</span>
          <span className="font-serif text-4xl font-bold text-gold-light">{stats.upcoming_count}</span>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-gold/20 space-y-2">
          <span className="text-xs text-text-muted block uppercase font-semibold">{t('checkedInCount')}</span>
          <span className="font-serif text-4xl font-bold text-emerald-400">{stats.completed_count}</span>
        </div>
      </div>

      {/* Upcoming Visits Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-gold/20 pb-4">
          <h2 className="font-serif text-2xl font-bold text-text-primary flex items-center gap-2">
            <Calendar className="w-6 h-6 text-gold" />
            <span>{t('upcomingVisits')}</span>
          </h2>

          <Link to="/my-bookings" className="text-xs font-semibold text-gold hover:underline">
            View All
          </Link>
        </div>

        {upcoming.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcoming.map((b) => (
              <div key={b.id} className="glass-card p-6 rounded-2xl border border-gold/30 space-y-4 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-text-primary">{b.temple_name}</h3>
                    <span className="text-xs text-gold font-semibold mt-1 block">Booking ID: {b.booking_id}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-gold/20 text-gold-light text-xs font-semibold border border-gold/30">
                    {b.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-bg-primary/50 p-3 rounded-xl border border-gold/10">
                  <div>
                    <span className="text-text-muted block">Date</span>
                    <span className="font-semibold text-text-primary">{b.date}</span>
                  </div>
                  <div>
                    <span className="text-text-muted block">Time Slot</span>
                    <span className="font-semibold text-text-primary">{b.time}</span>
                  </div>
                </div>

                <Link
                  to={`/pass/${b.booking_id}`}
                  className="w-full py-2.5 rounded-xl bg-gold/10 hover:bg-gold hover:text-bg-primary border border-gold/30 text-gold text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <QrCode className="w-4 h-4" />
                  <span>View Digital QR Pass</span>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-12 text-center text-text-muted border border-gold/20 space-y-3">
            <p className="text-sm font-semibold">No upcoming darshan visits scheduled.</p>
            <Link to="/temples" className="text-xs font-semibold text-gold underline">Book a Darshan Slot</Link>
          </div>
        )}
      </div>

    </div>
  );
}
