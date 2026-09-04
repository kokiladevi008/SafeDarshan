import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Landmark, Sparkles, Heart, ShieldCheck, ArrowRight } from 'lucide-react';

export default function About() {
  const { t } = useLanguage();

  const templeGallery = [
    { name: "Marudamalai Murugan Temple", state: "Tamil Nadu", image: "/temples/marudamalai.jpg" },
    { name: "Masani Amman Temple", state: "Tamil Nadu", image: "/temples/masani-amman.jpg" },
    { name: "Palani Murugan Temple", state: "Tamil Nadu", image: "/temples/palani.jpg" },
    { name: "Arunachaleswarar Temple", state: "Tamil Nadu", image: "/temples/tiruvannamalai.jpg" },
    { name: "Tirumala Venkateswara Temple", state: "Andhra Pradesh", image: "/temples/tirupati.jpg" },
    { name: "Sabarimala Sree Dharma Sastha", state: "Kerala", image: "/temples/sabarimala.jpg" },
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* AESTHETIC HERO SECTION WITH GEMINI-GENERATED TEMPLE BACKGROUND */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-12 pb-16 overflow-hidden">
        
        {/* Full-width Clear Temple Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/temples/tiruvannamalai.jpg"
            alt="Arunachaleswarar Sacred Temple"
            className="w-full h-full object-cover object-center scale-100 filter brightness-[0.55] contrast-[1.05]"
          />
          {/* Subtle Vignettes for readable high contrast text */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0B14]/80 via-[#0D0B14]/50 to-[#0D0B14]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0B14]/70 via-transparent to-[#0D0B14]/70"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 space-y-6">
          <img
            src="/safedarshan-logo.svg"
            alt="SafeDarshan Logo"
            className="w-20 h-20 object-contain mx-auto drop-shadow-[0_0_25px_rgba(201,162,75,0.8)] hover:scale-105 transition-transform"
          />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171320]/90 backdrop-blur-md border border-gold/40 text-gold text-xs font-semibold">
            <Landmark className="w-4 h-4" />
            <span>About SafeDarshan Platform</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-text-primary drop-shadow-md">
            Where Technology Meets Tradition
          </h1>

          <p className="font-serif text-2xl font-bold gold-gradient-text italic drop-shadow-sm">
            "Don't just book a darshan. Know the crowd before you go."
          </p>
        </div>
      </section>

      {/* AESTHETIC STORY & FEATURED TEMPLE IMAGE CARD SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Narrative Card */}
          <div className="glass-card rounded-3xl p-8 sm:p-10 border border-gold/30 shadow-dark-card space-y-6 bg-[#171320]/90 backdrop-blur-xl">
            <div className="flex items-center gap-3 border-b border-gold/20 pb-4">
              <div className="p-2.5 rounded-xl bg-gold/20 text-gold border border-gold/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-text-primary">
                Our Spiritual & Technological Vision
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-text-muted leading-relaxed">
              <p>
                <strong className="text-gold font-semibold">SafeDarshan</strong> combines modern artificial intelligence with age-old South Indian temple devotion. It empowers devotees to understand crowd conditions before travelling, predict busy periods, select optimal visiting times, and plan their darshan with total comfort.
              </p>
              <p>
                Whether embarking on a pilgrimage to the hill shrine of Marudamalai, worshiping at Masani Amman, climbing Sivagiri hill in Palani, attending the Agni Stalam in Tiruvannamalai, seeking divine blessings at Tirupati, or ascending the 18 holy steps at Sabarimala, SafeDarshan transforms crowd uncertainty into a peaceful spiritual experience.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <Link
                to="/temples"
                className="px-6 py-3 rounded-xl bg-gold text-bg-primary font-bold text-xs shadow-gold-sm hover:brightness-110 transition-all flex items-center gap-2"
              >
                <span>Explore Sacred Temples</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Aesthetic Gemini Temple Showcase Card */}
          <div className="relative group">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-gold-dark via-gold to-gold-light opacity-40 blur-xl group-hover:opacity-70 transition-opacity"></div>
            
            <div className="relative rounded-3xl overflow-hidden border-2 border-gold/50 shadow-gold-glow bg-[#171320]">
              <img
                src="/temples/palani.jpg"
                alt="Palani Murugan Hill Temple"
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.85]"
              />

              {/* Glassmorphic Caption Card */}
              <div className="absolute bottom-4 left-4 right-4 p-5 rounded-2xl bg-[#0D0B14]/85 backdrop-blur-md border border-gold/30 space-y-1">
                <span className="text-[10px] font-bold text-gold uppercase tracking-widest block">
                  Gemini Generated Visual Asset
                </span>
                <h3 className="font-serif text-lg font-bold text-text-primary">
                  Palani Murugan Hill Temple — Tamil Nadu
                </h3>
                <p className="text-xs text-text-muted">
                  Preserving traditional Dravidian architecture while guiding millions of devotees safely.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* AESTHETIC MOSAIC GALLERY OF ALL 6 SACRED SHRINES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 border-b border-gold/20 pb-6">
          <h2 className="font-serif text-3xl font-bold gold-gradient-text">
            The Six Holy Temple Shrines
          </h2>
          <p className="text-xs text-text-muted">
            High-resolution visual assets generated for SafeDarshan's smart crowd management system
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templeGallery.map((item, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl overflow-hidden border border-gold/30 hover:border-gold transition-all duration-300 group shadow-dark-card"
            >
              <div className="h-52 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.9]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171320] via-transparent to-transparent"></div>
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0D0B14]/80 backdrop-blur-md text-[10px] font-semibold text-gold border border-gold/30">
                  {item.state}
                </span>
              </div>

              <div className="p-4">
                <h3 className="font-serif font-bold text-sm text-text-primary group-hover:text-gold transition-colors">
                  {item.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
