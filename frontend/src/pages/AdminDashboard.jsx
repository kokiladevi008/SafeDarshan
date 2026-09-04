import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../utils/api';
import { ShieldAlert, Users, Calendar, CheckCircle2, Eye, Bell, PlusCircle, QrCode } from 'lucide-react';

export default function AdminDashboard() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAdminData() {
      setLoading(true);
      const res = await apiFetch('/admin/overview');
      if (res.success) {
        setOverview(res.data);
      }
      setLoading(false);
    }
    loadAdminData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-text-muted">
        <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  const stats = overview?.stats || {};
  const recentBookings = overview?.recent_bookings || [];
  const recentAlerts = overview?.recent_alerts || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Admin Header */}
      <div className="glass-card rounded-3xl p-8 border border-gold/40 shadow-gold-glow flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-maroon/80 border border-gold/30 text-gold-light text-xs font-semibold">
            <ShieldAlert className="w-4 h-4 text-gold" />
            <span>Admin Command Center</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-text-primary">
            SafeDarshan System Overview
          </h1>
          <p className="text-xs text-text-muted">Real-time crowd monitoring, OpenCV+YOLO zone density, and QR check-in telemetry</p>
        </div>

        {/* Quick Admin Actions */}
        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/checkin"
            className="px-4 py-2.5 rounded-xl bg-gold text-bg-primary font-bold text-xs shadow-gold-sm hover:brightness-110 flex items-center gap-2"
          >
            <QrCode className="w-4 h-4" />
            <span>Scan QR Check-In</span>
          </Link>

          <Link
            to="/admin/crowd-monitoring"
            className="px-4 py-2.5 rounded-xl bg-bg-surface hover:bg-gold/10 border border-gold/30 text-gold font-semibold text-xs flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            <span>Live OpenCV Telemetry</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-gold/20 space-y-2">
          <span className="text-xs text-text-muted uppercase font-semibold block">Total Temples</span>
          <span className="font-serif text-4xl font-bold text-gold">{stats.total_temples}</span>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-gold/20 space-y-2">
          <span className="text-xs text-text-muted uppercase font-semibold block">Total Bookings</span>
          <span className="font-serif text-4xl font-bold text-gold-light">{stats.total_bookings}</span>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-gold/20 space-y-2">
          <span className="text-xs text-text-muted uppercase font-semibold block">Completed Check-Ins</span>
          <span className="font-serif text-4xl font-bold text-emerald-400">{stats.total_checkins}</span>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-gold/20 space-y-2">
          <span className="text-xs text-text-muted uppercase font-semibold block">Predicted Peak Window</span>
          <span className="font-serif text-2xl font-bold text-amber-300 block pt-1">{stats.predicted_peak_window}</span>
        </div>
      </div>

      {/* Admin Modules Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/admin/crowd-monitoring"
          className="glass-card p-6 rounded-2xl border border-gold/30 hover:border-gold transition-all group space-y-3"
        >
          <Eye className="w-8 h-8 text-gold group-hover:scale-110 transition-transform" />
          <h3 className="font-serif text-lg font-bold text-text-primary">OpenCV + YOLO Telemetry</h3>
          <p className="text-xs text-text-muted">Monitor people count and density across 6 zones per temple.</p>
        </Link>

        <Link
          to="/admin/alerts"
          className="glass-card p-6 rounded-2xl border border-gold/30 hover:border-gold transition-all group space-y-3"
        >
          <Bell className="w-8 h-8 text-gold group-hover:scale-110 transition-transform" />
          <h3 className="font-serif text-lg font-bold text-text-primary">Crowd Density Alerts</h3>
          <p className="text-xs text-text-muted">View active risk warnings and broadcast crowd advisories.</p>
        </Link>

        <Link
          to="/admin/slots"
          className="glass-card p-6 rounded-2xl border border-gold/30 hover:border-gold transition-all group space-y-3"
        >
          <PlusCircle className="w-8 h-8 text-gold group-hover:scale-110 transition-transform" />
          <h3 className="font-serif text-lg font-bold text-text-primary">Slot & Capacity Management</h3>
          <p className="text-xs text-text-muted">Create new darshan slots and adjust maximum visitor limits.</p>
        </Link>
      </div>

    </div>
  );
}
