import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Landmark, Shield, Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#090710] border-t border-gold/20 pt-16 pb-12 mt-20 text-text-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <img
                src="/safedarshan-logo.svg"
                alt="SafeDarshan Logo"
                className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(201,162,75,0.4)]"
              />
              <span className="font-serif text-xl font-bold gold-gradient-text">
                {t('brandName')}
              </span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              {t('brandSubtext')}
            </p>
            <div className="text-[11px] text-gold-light/80 italic">
              "Know the Crowd Before You Go."
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-text-primary uppercase tracking-wider mb-4 border-b border-gold/20 pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-gold transition-colors">{t('navHome')}</Link>
              </li>
              <li>
                <Link to="/temples" className="hover:text-gold transition-colors">{t('navTemples')}</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold transition-colors">{t('navAbout')}</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-gold transition-colors">{t('navLogin')}</Link>
              </li>
            </ul>
          </div>

          {/* Six Holy Temples */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-text-primary uppercase tracking-wider mb-4 border-b border-gold/20 pb-2">
              The 6 Sacred Shrines
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-gold transition-colors">Marudamalai Murugan Temple</li>
              <li className="hover:text-gold transition-colors">Masani Amman Temple</li>
              <li className="hover:text-gold transition-colors">Palani Murugan Temple</li>
              <li className="hover:text-gold transition-colors">Arunachaleswarar Temple</li>
              <li className="hover:text-gold transition-colors">Tirumala Venkateswara Temple</li>
              <li className="hover:text-gold transition-colors">Sabarimala Sree Dharma Sastha</li>
            </ul>
          </div>

          {/* Technology Guarantee */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold text-text-primary uppercase tracking-wider border-b border-gold/20 pb-2">
              AI Smart Features
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5 bg-bg-surface/50 p-3 rounded-lg border border-gold/10">
                <Sparkles className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>AI Machine Learning Crowd Prediction & Slot Optimization</span>
              </div>
              <div className="flex items-start gap-2.5 bg-bg-surface/50 p-3 rounded-lg border border-gold/10">
                <Shield className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>OpenCV + YOLO Real-time Crowd Density Monitoring</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between text-xs text-text-muted gap-4">
          <p>© 2026 SafeDarshan. Built with technology and tradition for devotees.</p>
          <div className="flex items-center gap-2">
            <span>Powered by React, Python Flask & MySQL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
