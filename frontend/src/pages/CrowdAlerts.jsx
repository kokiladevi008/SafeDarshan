import React, { useEffect, useState } from 'react';
import { apiFetch } from '../utils/api';
import AlertCard from '../components/AlertCard';
import { Bell, Plus, AlertCircle } from 'lucide-react';

export default function CrowdAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zone, setZone] = useState('Queue Area');
  const [riskLevel, setRiskLevel] = useState('High');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadAlerts = async () => {
    setLoading(true);
    const res = await apiFetch('/admin/alerts');
    if (res.success) {
      setAlerts(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  const handleCreateAlert = async (e) => {
    e.preventDefault();
    if (!message) return;
    setSubmitting(true);

    const res = await apiFetch('/admin/alerts', {
      method: 'POST',
      body: JSON.stringify({
        temple_id: 1,
        zone,
        risk_level: riskLevel,
        message
      })
    });

    setSubmitting(false);
    if (res.success) {
      setMessage('');
      loadAlerts();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      <div className="border-b border-gold/20 pb-4">
        <h1 className="font-serif text-3xl font-bold text-text-primary flex items-center gap-3">
          <Bell className="w-7 h-7 text-gold" />
          <span>Crowd Density Alerts Console</span>
        </h1>
        <p className="text-xs text-text-muted mt-1">Manage live zone warnings and issue crowd advisories</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Create Broadcast Alert Form */}
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-bold text-text-primary">Issue New Advisory</h2>

          <form onSubmit={handleCreateAlert} className="glass-card rounded-2xl p-6 border border-gold/30 space-y-4">
            <div className="space-y-1 text-xs">
              <label className="text-gold font-semibold uppercase">Target Zone</label>
              <select
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="w-full bg-bg-primary border border-gold/30 rounded-xl p-2.5 text-text-primary focus:outline-none"
              >
                <option value="Entrance">Entrance Arch</option>
                <option value="Queue Area">Queue Area</option>
                <option value="Waiting Area">Waiting Hall</option>
                <option value="Main Hall">Main Hall</option>
                <option value="Sanctum Area">Sanctum Area</option>
                <option value="Exit">Exit Corridor</option>
              </select>
            </div>

            <div className="space-y-1 text-xs">
              <label className="text-gold font-semibold uppercase">Risk Level</label>
              <select
                value={riskLevel}
                onChange={(e) => setRiskLevel(e.target.value)}
                className="w-full bg-bg-primary border border-gold/30 rounded-xl p-2.5 text-text-primary focus:outline-none"
              >
                <option value="Low">Low Risk</option>
                <option value="Medium">Medium Risk</option>
                <option value="High">High Risk</option>
                <option value="Critical">Critical Risk</option>
              </select>
            </div>

            <div className="space-y-1 text-xs">
              <label className="text-gold font-semibold uppercase">Advisory Message</label>
              <textarea
                required
                rows={3}
                placeholder="e.g. Queue area density exceeding 80%. Advising devotees to use afternoon slot."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-bg-primary border border-gold/30 rounded-xl p-3 text-text-primary focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-gold text-bg-primary font-bold text-xs shadow-gold-sm hover:brightness-110 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Broadcast Alert</span>
            </button>
          </form>
        </div>

        {/* Alerts List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-serif text-xl font-bold text-text-primary">Active Alert Stream</h2>

          {loading ? (
            <div className="text-center py-12 text-text-muted">Loading alerts...</div>
          ) : alerts.length > 0 ? (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
              {alerts.map((a) => (
                <AlertCard key={a.id} alert={a} />
              ))}
            </div>
          ) : (
            <div className="glass-card p-12 text-center text-text-muted rounded-2xl border border-gold/20">
              No active crowd alerts recorded.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
