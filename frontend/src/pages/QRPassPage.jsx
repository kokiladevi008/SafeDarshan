import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiFetch } from '../utils/api';
import QRPassCard from '../components/QRPassCard';
import { ArrowLeft } from 'lucide-react';

export default function QRPassPage() {
  const { booking_id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPass() {
      setLoading(true);
      const res = await apiFetch(`/bookings/${booking_id}`);
      if (res.success) {
        setBooking(res.data);
      }
      setLoading(false);
    }
    loadPass();
  }, [booking_id]);

  if (loading) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center text-text-muted">
        <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center text-text-muted space-y-4">
        <p className="text-sm">Pass details not found.</p>
        <Link to="/my-bookings" className="text-xs text-gold underline">Return to My Bookings</Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-12 space-y-6">
      <Link
        to="/my-bookings"
        className="inline-flex items-center gap-2 text-xs font-semibold text-gold hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to My Bookings</span>
      </Link>

      <QRPassCard booking={booking} />
    </div>
  );
}
