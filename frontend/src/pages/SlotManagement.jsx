import React, { useState } from 'react';
import { apiFetch } from '../utils/api';
import { PlusCircle, Calendar, Clock, Users, CheckCircle2, AlertCircle } from 'lucide-react';

export default function SlotManagement() {
  const [templeId, setTempleId] = useState(1);
  const [date, setDate] = useState('2026-09-15');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [capacity, setCapacity] = useState(500);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleCreateSlot = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    setSubmitting(true);

    const res = await apiFetch('/admin/slots', {
      method: 'POST',
      body: JSON.stringify({
        temple_id: parseInt(templeId),
        date,
        start_time: startTime,
        end_time: endTime,
        capacity: parseInt(capacity)
      })
    });

    setSubmitting(false);

    if (res.success) {
      setSuccessMsg(`Darshan slot (${date} ${startTime}-${endTime}) created successfully!`);
    } else {
      setErrorMsg(res.error?.message || 'Failed to create slot.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="border-b border-gold/20 pb-4">
        <h1 className="font-serif text-3xl font-bold text-text-primary flex items-center gap-3">
          <PlusCircle className="w-7 h-7 text-gold" />
          <span>Darshan Slot & Capacity Control</span>
        </h1>
        <p className="text-xs text-text-muted mt-1">Configure slot time windows and maximum visitor limits</p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-danger/10 border border-danger/40 text-rose-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleCreateSlot} className="glass-card rounded-3xl p-8 border border-gold/30 space-y-6">
        
        <div className="space-y-1 text-xs">
          <label className="text-gold font-semibold uppercase">Select Temple</label>
          <select
            value={templeId}
            onChange={(e) => setTempleId(e.target.value)}
            className="w-full bg-bg-primary border border-gold/30 rounded-xl p-3 text-text-primary focus:outline-none"
          >
            <option value={1}>Marudamalai Murugan Temple</option>
            <option value={2}>Masani Amman Temple</option>
            <option value={3}>Palani Murugan Temple</option>
            <option value={4}>Arunachaleswarar Temple</option>
            <option value={5}>Tirumala Venkateswara Temple</option>
            <option value={6}>Sabarimala Sree Dharma Sastha</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <label className="text-gold font-semibold uppercase">Slot Date</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-bg-primary border border-gold/30 rounded-xl p-3 text-text-primary focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-gold font-semibold uppercase">Slot Capacity</label>
            <input
              type="number"
              required
              min={50}
              max={5000}
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="w-full bg-bg-primary border border-gold/30 rounded-xl p-3 text-text-primary focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <label className="text-gold font-semibold uppercase">Start Time</label>
            <input
              type="text"
              required
              placeholder="e.g. 09:00"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full bg-bg-primary border border-gold/30 rounded-xl p-3 text-text-primary focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-gold font-semibold uppercase">End Time</label>
            <input
              type="text"
              required
              placeholder="e.g. 10:00"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full bg-bg-primary border border-gold/30 rounded-xl p-3 text-text-primary focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-gold via-gold-light to-gold-dark text-bg-primary font-bold text-xs shadow-gold-sm hover:brightness-110 transition-all flex items-center justify-center gap-2"
        >
          {submitting ? 'Creating Slot...' : 'Create Darshan Slot'}
        </button>

      </form>
    </div>
  );
}
