import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import QRPassCard from '../components/QRPassCard';
import { CheckCircle2, ArrowRight, Home } from 'lucide-react';

export default function BookingConfirmation() {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking;

  if (!booking) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center text-text-muted space-y-4">
        <p className="text-sm">No recent booking session found.</p>
        <Link to="/temples" className="text-xs text-gold underline">Explore Temples</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      
      {/* Success Badge Banner */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-gold-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        
        <h1 className="font-serif text-3xl font-bold text-text-primary">
          {t('bookingSuccess')}
        </h1>
        
        <p className="text-xs text-text-muted">
          Your darshan slot has been reserved. Present the digital QR Pass below at the temple check-in gate.
        </p>
      </div>

      {/* Render Digital QR Pass Card */}
      <QRPassCard booking={booking} />

      {/* Bottom Nav Links */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          to="/dashboard"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gold/10 hover:bg-gold/20 border border-gold/30 text-gold text-xs font-semibold flex items-center justify-center gap-2 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Go to Devotee Dashboard</span>
        </Link>

        <Link
          to="/my-bookings"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-bg-surface hover:bg-gold/10 border border-gold/20 text-text-primary text-xs font-semibold flex items-center justify-center gap-2 transition-all"
        >
          <span>View All My Bookings</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
