import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../utils/api';
import { User, Mail, Phone, Lock, Globe, AlertCircle, ArrowRight } from 'lucide-react';

export default function Register() {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [preferredLang, setPreferredLang] = useState('en');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    const res = await apiFetch('/register', {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
        preferred_language: preferredLang
      })
    });

    setSubmitting(false);

    if (res.success) {
      login(res.data);
      navigate('/dashboard');
    } else {
      setErrorMsg(res.error?.message || 'Registration failed. Please check inputs.');
    }
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center py-12 px-4 overflow-hidden">
      
      {/* Full Page Clear Temple Picture Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/temples/marudamalai.jpg"
          alt="Temple Background"
          className="w-full h-full object-cover scale-100 filter brightness-[0.55] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0B14]/75 via-[#0D0B14]/50 to-[#0D0B14]"></div>
      </div>

      <div className="relative z-10 max-w-md w-full space-y-6">
        
        {/* Logo & Header */}
        <div className="text-center space-y-3">
          <img
            src="/safedarshan-logo.svg"
            alt="SafeDarshan Logo"
            className="w-20 h-20 object-contain mx-auto drop-shadow-[0_0_20px_rgba(201,162,75,0.6)] hover:scale-105 transition-transform"
          />
          <div>
            <h1 className="font-serif text-3xl font-bold text-text-primary">
              Devotee Registration
            </h1>
            <p className="text-xs text-gold-light mt-1">Create an account for smart crowd alerts & QR passes</p>
          </div>
        </div>

        {errorMsg && (
          <div className="p-4 rounded-xl bg-danger/20 border border-danger/50 text-rose-300 text-xs flex items-center gap-3 backdrop-blur-md">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="glass-card rounded-3xl p-8 border border-gold/40 shadow-gold-glow space-y-4 bg-[#171320]/90 backdrop-blur-xl">
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-gold uppercase">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="e.g. Kokila Ramesh"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0D0B14]/80 border border-gold/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-text-primary focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-gold uppercase">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0D0B14]/80 border border-gold/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-text-primary focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-gold uppercase">Phone Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                placeholder="9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#0D0B14]/80 border border-gold/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-text-primary focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-gold uppercase">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0D0B14]/80 border border-gold/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-text-primary focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-gold uppercase">Preferred Language</label>
            <div className="relative">
              <Globe className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                value={preferredLang}
                onChange={(e) => setPreferredLang(e.target.value)}
                className="w-full bg-[#0D0B14]/80 border border-gold/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-text-primary focus:outline-none focus:border-gold"
              >
                <option value="en" className="bg-[#171320]">English</option>
                <option value="ta" className="bg-[#171320]">தமிழ் (Tamil)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-gold via-gold-light to-gold-dark text-bg-primary font-bold text-xs shadow-gold-glow hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            {submitting ? 'Creating Account...' : 'Register Account'}
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-center text-xs text-text-muted pt-2">
            Already registered?{' '}
            <Link to="/login" className="text-gold font-semibold underline hover:text-gold-light">Login Here</Link>
          </p>
        </form>
      </div>

    </div>
  );
}
