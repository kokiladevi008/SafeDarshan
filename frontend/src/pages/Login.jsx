import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../utils/api';
import { Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';

export default function Login() {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirect = searchParams.get('redirect') || 'dashboard';

  const [email, setEmail] = useState('user@safedarshan.com');
  const [password, setPassword] = useState('user123');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    const res = await apiFetch('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    setSubmitting(false);

    if (res.success) {
      login(res.data);
      navigate(redirect === 'booking' ? '/temples' : `/${redirect}`);
    } else {
      setErrorMsg(res.error?.message || 'Login failed. Please check your credentials.');
    }
  };

  const setDemoAdmin = () => {
    setEmail('admin@safedarshan.com');
    setPassword('admin123');
  };

  const setDemoUser = () => {
    setEmail('user@safedarshan.com');
    setPassword('user123');
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center py-12 px-4 overflow-hidden">
      
      {/* Full Page Clear Temple Picture Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/temples/tiruvannamalai.jpg"
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
              Devotee Login
            </h1>
            <p className="text-xs text-gold-light mt-1">
              Sign in to manage bookings & access your verified QR pass
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="p-4 rounded-xl bg-danger/20 border border-danger/50 text-rose-300 text-xs flex items-center gap-3 backdrop-blur-md">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Quick Demo Selector */}
        <div className="flex gap-2 p-1.5 rounded-xl bg-[#171320]/90 backdrop-blur-md border border-gold/30 text-xs">
          <button
            type="button"
            onClick={setDemoUser}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
              email === 'user@safedarshan.com' ? 'bg-gold text-bg-primary shadow-gold-sm' : 'text-text-muted hover:text-gold'
            }`}
          >
            Demo Devotee
          </button>
          <button
            type="button"
            onClick={setDemoAdmin}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
              email === 'admin@safedarshan.com' ? 'bg-gold text-bg-primary shadow-gold-sm' : 'text-text-muted hover:text-gold'
            }`}
          >
            Demo Admin
          </button>
        </div>

        {/* Form Card */}
        <form onSubmit={handleLogin} className="glass-card rounded-3xl p-8 border border-gold/40 shadow-gold-glow space-y-5 bg-[#171320]/90 backdrop-blur-xl">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gold uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0D0B14]/80 border border-gold/30 rounded-xl pl-10 pr-4 py-3 text-xs text-text-primary focus:outline-none focus:border-gold transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gold uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0D0B14]/80 border border-gold/30 rounded-xl pl-10 pr-4 py-3 text-xs text-text-primary focus:outline-none focus:border-gold transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold via-gold-light to-gold-dark text-bg-primary font-bold text-xs shadow-gold-glow hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            {submitting ? 'Authenticating...' : 'Sign In'}
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-center text-xs text-text-muted pt-2">
            Don't have an account?{' '}
            <Link to="/register" className="text-gold font-semibold underline hover:text-gold-light">Register Now</Link>
          </p>
        </form>
      </div>

    </div>
  );
}
