import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold/30 bg-bg-surface/80 hover:bg-gold/10 text-gold text-xs font-semibold tracking-wide transition-all shadow-gold-sm"
      title="Switch Language / மொழியை மாற்றுக"
    >
      <Globe className="w-3.5 h-3.5" />
      <span>{lang === 'en' ? 'தமிழ்' : 'English'}</span>
    </button>
  );
}
