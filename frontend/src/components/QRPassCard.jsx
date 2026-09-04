import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Landmark, Calendar, Clock, User, ShieldCheck, Printer, CheckCircle2 } from 'lucide-react';

export default function QRPassCard({ booking }) {
  const { t } = useLanguage();

  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-md mx-auto rounded-3xl bg-bg-surface border-2 border-gold/50 shadow-gold-glow overflow-hidden p-6 sm:p-8 space-y-6 relative">
      {/* Decorative Gold Header Bar */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-gold-dark via-gold to-gold-light"></div>

      {/* Header */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold/20 border border-gold/40 flex items-center justify-center">
            <Landmark className="w-6 h-6 text-gold" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold gold-gradient-text">
              {t('brandName')}
            </h3>
            <span className="text-[10px] text-gold-light uppercase tracking-widest block font-sans">
              Digital Verification Pass
            </span>
          </div>
        </div>

        <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${
          booking.status === 'CHECKED_IN'
            ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/40'
            : 'bg-gold/20 text-gold-light border-gold/40'
        }`}>
          <ShieldCheck className="w-3.5 h-3.5" />
          {booking.status}
        </span>
      </div>

      {/* QR Code Container */}
      <div className="bg-[#FAF6ED] p-6 rounded-2xl border-2 border-gold/30 flex flex-col items-center justify-center space-y-3 shadow-inner">
        {booking.qr_code_base64 ? (
          <img
            src={booking.qr_code_base64}
            alt={`QR Code Pass ${booking.booking_id}`}
            className="w-48 h-48 object-contain rounded-lg border border-text-dark/20 p-1 bg-white"
          />
        ) : (
          <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500">
            QR Pass Rendering...
          </div>
        )}

        <div className="text-center">
          <span className="text-[10px] text-text-dark/70 font-semibold uppercase tracking-wider block">
            {t('qrPassCode')}
          </span>
          <span className="font-mono text-xl font-extrabold text-text-dark tracking-widest block mt-0.5">
            {booking.booking_id}
          </span>
        </div>
      </div>

      {/* Details Grid */}
      <div className="space-y-3 text-xs border-t border-gold/20 pt-4">
        <div className="flex justify-between items-center py-1 border-b border-gold/10">
          <span className="text-text-muted">Devotee Name:</span>
          <span className="font-semibold text-text-primary flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-gold" />
            {booking.user_name || 'Devotee'}
          </span>
        </div>

        <div className="flex justify-between items-center py-1 border-b border-gold/10">
          <span className="text-text-muted">Temple:</span>
          <span className="font-semibold text-gold">{booking.temple_name}</span>
        </div>

        <div className="flex justify-between items-center py-1 border-b border-gold/10">
          <span className="text-text-muted">Date & Time:</span>
          <span className="font-semibold text-text-primary flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-gold" />
            {booking.date} | {booking.time}
          </span>
        </div>

        <div className="flex justify-between items-center py-1">
          <span className="text-text-muted">Visitor Count:</span>
          <span className="font-semibold text-text-primary">{booking.visitor_count} Devotee(s)</span>
        </div>
      </div>

      {/* Print Action */}
      <button
        onClick={handlePrint}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-gold via-gold-light to-gold-dark text-bg-primary font-bold text-xs shadow-gold-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 print:hidden"
      >
        <Printer className="w-4 h-4" />
        <span>Print Digital QR Pass</span>
      </button>
    </div>
  );
}
