import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import LanguageToggle from './LanguageToggle';
import { Landmark, Menu, X, User, LogOut, ShieldAlert, CalendarCheck, Home as HomeIcon } from 'lucide-react';

export default function Navbar() {
  const { t } = useLanguage();
  const { user, logout, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-[#0D0B14]/90 backdrop-blur-md border-b border-gold/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/safedarshan-logo.svg"
              alt="SafeDarshan Logo"
              className="w-11 h-11 object-contain drop-shadow-[0_0_8px_rgba(201,162,75,0.4)] group-hover:scale-105 transition-transform"
            />
            <div>
              <span className="font-serif text-2xl font-bold gold-gradient-text tracking-wide block">
                {t('brandName')}
              </span>
              <span className="text-[10px] text-text-muted tracking-wider block font-sans uppercase">
                {t('brandTagline')}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-gold border-b-2 border-gold pb-1' : 'text-text-primary hover:text-gold-light'
              }`}
            >
              {t('navHome')}
            </Link>

            <Link
              to="/temples"
              className={`text-sm font-medium transition-colors ${
                isActive('/temples') ? 'text-gold border-b-2 border-gold pb-1' : 'text-text-primary hover:text-gold-light'
              }`}
            >
              {t('navTemples')}
            </Link>

            {user && (
              <>
                <Link
                  to="/my-bookings"
                  className={`text-sm font-medium transition-colors ${
                    isActive('/my-bookings') ? 'text-gold border-b-2 border-gold pb-1' : 'text-text-primary hover:text-gold-light'
                  }`}
                >
                  {t('navBookings')}
                </Link>

                <Link
                  to="/dashboard"
                  className={`text-sm font-medium transition-colors ${
                    isActive('/dashboard') ? 'text-gold border-b-2 border-gold pb-1' : 'text-text-primary hover:text-gold-light'
                  }`}
                >
                  {t('navDashboard')}
                </Link>
              </>
            )}

            {isAdmin && (
              <Link
                to="/admin"
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-maroon/80 border border-gold/40 text-gold-light hover:bg-maroon flex items-center gap-1 transition-colors"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-gold" />
                {t('navAdmin')}
              </Link>
            )}

            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${
                isActive('/about') ? 'text-gold border-b-2 border-gold pb-1' : 'text-text-primary hover:text-gold-light'
              }`}
            >
              {t('navAbout')}
            </Link>
          </nav>

          {/* Right Actions (Language Toggle & Auth) */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageToggle />

            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-surface border border-gold/20 text-xs font-medium text-text-primary hover:border-gold/50 transition-colors"
                >
                  <User className="w-4 h-4 text-gold" />
                  <span>{user.name}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg bg-bg-surface border border-gold/20 text-text-muted hover:text-danger hover:border-danger/40 transition-colors"
                  title={t('navLogout')}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-text-primary hover:text-gold transition-colors"
                >
                  {t('navLogin')}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-gold via-gold-light to-gold-dark text-bg-primary font-semibold text-xs shadow-gold-sm hover:brightness-110 transition-all"
                >
                  {t('navRegister')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gold focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-bg-surface/95 border-b border-gold/20 px-4 pt-2 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-text-primary hover:text-gold"
          >
            {t('navHome')}
          </Link>
          <Link
            to="/temples"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-text-primary hover:text-gold"
          >
            {t('navTemples')}
          </Link>
          {user && (
            <>
              <Link
                to="/my-bookings"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-text-primary hover:text-gold"
              >
                {t('navBookings')}
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-text-primary hover:text-gold"
              >
                {t('navDashboard')}
              </Link>
            </>
          )}
          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-gold"
            >
              {t('navAdmin')}
            </Link>
          )}
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-text-primary hover:text-gold"
          >
            {t('navAbout')}
          </Link>

          <div className="pt-4 border-t border-gold/20 flex flex-col gap-2">
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 text-xs font-semibold text-danger"
              >
                {t('navLogout')}
              </button>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 rounded-lg bg-bg-surface text-xs font-semibold border border-gold/30 text-gold"
                >
                  {t('navLogin')}
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 rounded-lg bg-gold text-xs font-semibold text-bg-primary"
                >
                  {t('navRegister')}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
