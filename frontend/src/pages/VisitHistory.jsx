import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../utils/api';
import { Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function VisitHistory() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      if (!user) return;
      setLoading(true);
      const res = await apiFetch(`/dashboard?user_id=${user.id}`);
      if (res.success) {
        setHistory(res.data.recent_history || []);
      }
      setLoading(false);
    }
    loadHistory();
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-gold/20 pb-4">
        <h1 className="font-serif text-3xl font-bold text-text-primary flex items-center gap-3">
          <Clock className="w-7 h-7 text-gold" />
          <span>Devotee Visit History</span>
        </h1>
        <p className="text-xs text-text-muted mt-1">Audit log of your completed and checked-in darshan visits</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-text-muted">Loading history...</div>
      ) : (
        <div className="glass-card rounded-2xl border border-gold/20 overflow-hidden shadow-dark-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-bg-primary/80 text-gold font-serif border-b border-gold/20">
                <tr>
                  <th className="p-4">Booking ID</th>
                  <th className="p-4">Temple Shrine</th>
                  <th className="p-4">Visit Date</th>
                  <th className="p-4">Time Slot</th>
                  <th className="p-4">Headcount</th>
                  <th className="p-4">Verification Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/10 text-text-muted">
                {history.map((row) => (
                  <tr key={row.id} className="hover:bg-gold/5 transition-colors">
                    <td className="p-4 font-mono font-bold text-gold">{row.booking_id}</td>
                    <td className="p-4 font-semibold text-text-primary">{row.temple_name}</td>
                    <td className="p-4">{row.date}</td>
                    <td className="p-4">{row.time}</td>
                    <td className="p-4">{row.visitor_count} Person(s)</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border inline-flex items-center gap-1 ${
                        row.status === 'CHECKED_IN' ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/40' : 'bg-gold/20 text-gold-light border-gold/40'
                      }`}>
                        <CheckCircle2 className="w-3 h-3" />
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
