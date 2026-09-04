import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { apiFetch } from '../utils/api';
import TempleCard from '../components/TempleCard';
import { Landmark, Search } from 'lucide-react';

export default function Temples() {
  const { t } = useLanguage();
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedState, setSelectedState] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadTemples() {
      setLoading(true);
      const url = selectedState === 'All' ? '/temples' : `/temples?state=${encodeURIComponent(selectedState)}`;
      const res = await apiFetch(url);
      if (res.success) {
        setTemples(res.data);
      }
      setLoading(false);
    }
    loadTemples();
  }, [selectedState]);

  const filteredTemples = temples.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gold/20 pb-8">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary flex items-center gap-3">
            <Landmark className="w-8 h-8 text-gold" />
            <span>{t('navTemples')}</span>
          </h1>
          <p className="text-xs text-text-muted mt-2">
            Explore crowd status, AI forecasts, and darshan slot availability for all 6 sacred temples.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search temple name or city..."
            className="w-full bg-bg-surface border border-gold/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-text-primary focus:outline-none focus:border-gold transition-colors placeholder:text-text-muted"
          />
        </div>
      </div>

      {/* State Filters */}
      <div className="flex flex-wrap gap-3">
        {['All', 'Tamil Nadu', 'Andhra Pradesh', 'Kerala'].map((st) => (
          <button
            key={st}
            onClick={() => setSelectedState(st)}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
              selectedState === st
                ? 'bg-gold text-bg-primary border-gold shadow-gold-sm'
                : 'bg-bg-surface text-text-muted border-gold/20 hover:text-gold hover:border-gold/40'
            }`}
          >
            {st === 'All' ? t('allStates') : st}
          </button>
        ))}
      </div>

      {/* Temple Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-96 rounded-2xl bg-bg-surface/50 animate-pulse border border-gold/10"></div>
          ))}
        </div>
      ) : filteredTemples.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemples.map((temple) => (
            <TempleCard key={temple.id} temple={temple} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-text-muted space-y-3 glass-card rounded-2xl border border-gold/20">
          <p className="text-sm font-semibold">No temples found matching your filter criteria.</p>
        </div>
      )}
    </div>
  );
}
