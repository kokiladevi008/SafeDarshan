import React, { useEffect, useState } from 'react';
import { apiFetch } from '../utils/api';
import { Eye, ShieldAlert, Users, RefreshCw } from 'lucide-react';

export default function CrowdMonitoring() {
  const [templeId, setTempleId] = useState(1);
  const [telemetry, setTelemetry] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTelemetry = async (id) => {
    setLoading(true);
    const res = await apiFetch(`/admin/crowd-monitoring?temple_id=${id}`);
    if (res.success) {
      setTelemetry(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTelemetry(templeId);
  }, [templeId]);

  const getRiskBadge = (risk) => {
    switch (risk) {
      case 'Critical': return 'bg-danger/20 text-rose-300 border-danger/40';
      case 'High': return 'bg-orange-950/40 text-orange-400 border-orange-500/40';
      case 'Medium': return 'bg-warning/20 text-amber-300 border-warning/40';
      default: return 'bg-success/20 text-emerald-400 border-success/40';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gold/20 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold">
            <Eye className="w-4 h-4" />
            <span>OpenCV + YOLO Telemetry</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-text-primary mt-2">
            Zone Crowd Density Monitor
          </h1>
          <p className="text-xs text-text-muted mt-1">Real-time headcount detection and zone capacity telemetry</p>
        </div>

        {/* Temple Selector & Refresh */}
        <div className="flex items-center gap-3">
          <select
            value={templeId}
            onChange={(e) => setTempleId(parseInt(e.target.value))}
            className="bg-bg-surface border border-gold/30 rounded-xl px-4 py-2.5 text-xs text-text-primary focus:outline-none focus:border-gold"
          >
            <option value={1}>Marudamalai Murugan Temple</option>
            <option value={2}>Masani Amman Temple</option>
            <option value={3}>Palani Murugan Temple</option>
            <option value={4}>Arunachaleswarar Temple</option>
            <option value={5}>Tirumala Venkateswara Temple</option>
            <option value={6}>Sabarimala Sree Dharma Sastha</option>
          </select>

          <button
            onClick={() => fetchTelemetry(templeId)}
            className="p-2.5 rounded-xl bg-gold/10 hover:bg-gold/20 border border-gold/30 text-gold transition-colors"
            title="Refresh OpenCV Telemetry Feed"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-text-muted">Loading CV Telemetry Feed...</div>
      ) : telemetry ? (
        <div className="space-y-6">
          <h2 className="font-serif text-xl font-bold text-gold">{telemetry.temple_name} — Zone Breakdown</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {telemetry.zones.map((zone) => (
              <div key={zone.zone} className="glass-card p-6 rounded-2xl border border-gold/30 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-text-primary">{zone.zone}</h3>
                    <span className="text-[11px] text-text-muted">Max Capacity: {zone.capacity}</span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getRiskBadge(zone.risk_level)}`}>
                    {zone.risk_level} Risk
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-text-muted font-medium">
                    <span>{zone.people_count} People Detected</span>
                    <span>{zone.occupancy_percentage}% Density</span>
                  </div>

                  <div className="w-full h-2.5 bg-bg-primary rounded-full overflow-hidden border border-gold/20">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${
                        zone.occupancy_percentage > 80 ? 'from-rose-600 to-rose-400' : 'from-gold-dark to-gold-light'
                      }`}
                      style={{ width: `${Math.min(100, zone.occupancy_percentage)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gold/10 flex justify-between items-center text-xs">
                  <span className="text-text-muted">Crowd Status:</span>
                  <span className="font-semibold text-gold">{zone.crowd_level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

    </div>
  );
}
