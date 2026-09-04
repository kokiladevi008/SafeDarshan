import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';
import { User, Mail, Phone, Globe, Shield } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const { lang, t } = useLanguage();

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="glass-card rounded-3xl p-8 border border-gold/30 shadow-dark-card space-y-6">
        
        <div className="flex items-center gap-4 border-b border-gold/20 pb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold via-gold-light to-gold-dark text-bg-primary flex items-center justify-center font-serif font-bold text-2xl shadow-gold-sm">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-text-primary">{user.name}</h1>
            <span className="text-xs text-gold capitalize">{user.role} Account</span>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between p-4 rounded-xl bg-bg-primary/50 border border-gold/10">
            <span className="text-text-muted flex items-center gap-2">
              <Mail className="w-4 h-4 text-gold" />
              Email Address
            </span>
            <span className="font-semibold text-text-primary">{user.email}</span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-bg-primary/50 border border-gold/10">
            <span className="text-text-muted flex items-center gap-2">
              <Phone className="w-4 h-4 text-gold" />
              Phone Number
            </span>
            <span className="font-semibold text-text-primary">{user.phone}</span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-bg-primary/50 border border-gold/10">
            <span className="text-text-muted flex items-center gap-2">
              <Globe className="w-4 h-4 text-gold" />
              Preferred Interface Language
            </span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gold uppercase">{lang}</span>
              <LanguageToggle />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
