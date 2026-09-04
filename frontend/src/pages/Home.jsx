import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { apiFetch } from '../utils/api';
import TempleCard from '../components/TempleCard';
import { Landmark, Sparkles, ShieldCheck, Clock, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const { t } = useLanguage();
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedState, setSelectedState] = useState('All');

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

  return (
    <div className="space-y-24 pb-16">
      
      {/* HERO SECTION WITH FULL CLEAR CRISP TEMPLE BACKGROUND */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-12 pb-16 overflow-hidden">
        
        {/* Full-width Clear Temple Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/temples/tiruvannamalai.jpg"
            alt="Arunachaleswarar Temple Backdrop"
            className="w-full h-full object-cover object-center scale-100 filter brightness-[0.65] contrast-[1.05]"
          />
          {/* Gentle Vignettes for readable text contrast while keeping background clear */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0B14]/70 via-[#0D0B14]/40 to-[#0D0B14]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0B14]/60 via-transparent to-[#0D0B14]/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center px-4 space-y-8">
          
          {/* Brand Picture Logo & Top Pill */}
          <div className="flex flex-col items-center space-y-4">
            <img
              src="/safedarshan-logo.svg"
              alt="SafeDarshan Logo"
              className="w-24 h-24 object-contain mx-auto drop-shadow-[0_0_30px_rgba(201,162,75,0.8)] hover:scale-105 transition-transform"
            />
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#171320]/90 backdrop-blur-md border border-gold/50 text-gold text-xs font-semibold tracking-wide shadow-gold-glow">
              <Sparkles className="w-4 h-4 text-gold-light" />
              <span>AI-Powered Smart Temple Visit System</span>
            </div>
          </div>

          {/* Main Hero Headings */}
          <div className="space-y-4">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-text-primary drop-shadow-lg">
              {t('heroTitle')}
            </h1>
            <p className="font-serif text-2xl sm:text-3xl font-semibold gold-gradient-text italic drop-shadow-md">
              "{t('brandTagline')}"
            </p>
          </div>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-text-primary font-medium leading-relaxed font-sans bg-[#171320]/80 backdrop-blur-md p-5 rounded-2xl border border-gold/30 shadow-dark-card">
            {t('heroDesc')}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/temples"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-gold via-gold-light to-gold-dark text-bg-primary font-bold text-sm shadow-gold-glow hover:brightness-110 transition-all flex items-center justify-center gap-2 group"
            >
              <span>{t('exploreBtn')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#featured-temples"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#171320]/90 backdrop-blur-md hover:bg-gold/10 border border-gold/40 text-gold font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-dark-card"
            >
              <Users className="w-4 h-4" />
              <span>{t('checkCrowdBtn')}</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="glass-card p-4 rounded-2xl text-center border border-gold/40 bg-[#171320]/90 backdrop-blur-md shadow-dark-card">
              <span className="font-serif text-3xl font-bold text-gold">6</span>
              <span className="text-xs text-text-muted block mt-0.5 font-medium">Sacred Shrines</span>
            </div>
            <div className="glass-card p-4 rounded-2xl text-center border border-gold/40 bg-[#171320]/90 backdrop-blur-md shadow-dark-card">
              <span className="font-serif text-3xl font-bold text-gold">Real-time</span>
              <span className="text-xs text-text-muted block mt-0.5 font-medium">YOLO Density Telemetry</span>
            </div>
            <div className="glass-card p-4 rounded-2xl text-center border border-gold/40 bg-[#171320]/90 backdrop-blur-md shadow-dark-card">
              <span className="font-serif text-3xl font-bold text-gold">ML Powered</span>
              <span className="text-xs text-text-muted block mt-0.5 font-medium">Wait Time Predictions</span>
            </div>
            <div className="glass-card p-4 rounded-2xl text-center border border-gold/40 bg-[#171320]/90 backdrop-blur-md shadow-dark-card">
              <span className="font-serif text-3xl font-bold text-gold">100% Digital</span>
              <span className="text-xs text-text-muted block mt-0.5 font-medium">QR Darshan Passes</span>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURED TEMPLES SECTION */}
      <section id="featured-temples" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gold/20 pb-6">
          <div>
            <h2 className="font-serif text-3xl font-bold text-text-primary">
              {t('featuredTemples')}
            </h2>
            <p className="text-xs text-text-muted mt-1">Explore crowd forecasts across Tamil Nadu, Andhra Pradesh & Kerala</p>
          </div>

          {/* State Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {['All', 'Tamil Nadu', 'Andhra Pradesh', 'Kerala'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedState(st)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  selectedState === st
                    ? 'bg-gold text-bg-primary border-gold shadow-gold-sm'
                    : 'bg-bg-surface text-text-muted border-gold/20 hover:text-gold hover:border-gold/40'
                }`}
              >
                {st === 'All' ? t('allStates') : st}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 rounded-2xl bg-bg-surface/50 animate-pulse border border-gold/10"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {temples.map((temple) => (
              <TempleCard key={temple.id} temple={temple} />
            ))}
          </div>
        )}
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="font-serif text-3xl font-bold gold-gradient-text">
            {t('howItWorks')}
          </h2>
          <p className="text-xs text-text-muted">Four simple steps to a peaceful and seamless temple visit</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-gold/20 space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-gold/20 text-gold font-serif font-bold text-lg flex items-center justify-center">1</div>
            <h3 className="font-bold text-sm text-text-primary">{t('step1Title')}</h3>
            <p className="text-xs text-text-muted leading-relaxed">{t('step1Desc')}</p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-gold/20 space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-gold/20 text-gold font-serif font-bold text-lg flex items-center justify-center">2</div>
            <h3 className="font-bold text-sm text-text-primary">{t('step2Title')}</h3>
            <p className="text-xs text-text-muted leading-relaxed">{t('step2Desc')}</p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-gold/20 space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-gold/20 text-gold font-serif font-bold text-lg flex items-center justify-center">3</div>
            <h3 className="font-bold text-sm text-text-primary">{t('step3Title')}</h3>
            <p className="text-xs text-text-muted leading-relaxed">{t('step3Desc')}</p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-gold/20 space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-gold/20 text-gold font-serif font-bold text-lg flex items-center justify-center">4</div>
            <h3 className="font-bold text-sm text-text-primary">{t('step4Title')}</h3>
            <p className="text-xs text-text-muted leading-relaxed">{t('step4Desc')}</p>
          </div>
        </div>
      </section>

      {/* CORE VALUE BANNER WITH FULL CLEAR TEMPLE IMAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border-2 border-gold/40 shadow-gold-glow p-8 sm:p-12">
          
          {/* Full Clear Temple Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/temples/sabarimala.jpg"
              alt="Sacred Sabarimala Backdrop"
              className="w-full h-full object-cover filter brightness-[0.55] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D0B14]/90 via-[#0D0B14]/70 to-transparent"></div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <span className="text-xs font-bold text-gold uppercase tracking-widest block">SafeDarshan Differentiator</span>
              <h3 className="font-serif text-3xl font-bold text-text-primary">
                Don't just book a darshan. <span className="gold-gradient-text">Know the crowd before you go.</span>
              </h3>
              <p className="text-xs text-text-primary/90 leading-relaxed font-medium">
                SafeDarshan combines traditional temple devotion with modern AI crowd telemetry. Our system guides devotees to choose the least crowded times for a peaceful spiritual experience.
              </p>
            </div>

            <Link
              to="/temples"
              className="px-8 py-4 rounded-xl bg-gold text-bg-primary font-bold text-sm shadow-gold-sm hover:brightness-110 transition-all flex-shrink-0"
            >
              Plan Your Visit Now
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
