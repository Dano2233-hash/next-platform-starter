import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Gamepad2,
  ShoppingCart,
  Search,
  Menu,
  X,
  Shield,
  Zap,
  Smartphone,
  Gift,
  Tv,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount, openCart } = useCart();
  const { isAdmin } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Xbox', path: '/products?platform=Xbox' },
    { name: 'PlayStation', path: '/products?platform=PlayStation' },
    { name: 'PC', path: '/products?platform=PC' },
    { name: 'Mobile', path: '/products?category=mobile' },
    { name: 'Gift Cards', path: '/products?category=giftcards' },
    { name: 'Subscriptions', path: '/products?category=subscriptions' },
    { name: 'Others', path: '/products?category=all' }
  ];

  const isActive = (path) => location.pathname + location.search === path;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050508]/90 backdrop-blur-xl border-b border-slate-800/80">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900/60 via-purple-900/60 to-cyan-900/60 border-b border-slate-800/50 py-1.5 px-4 text-center text-[12px] font-medium text-slate-200">
        <div className="container mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span className="flex items-center gap-1 font-bold text-cyan-400 uppercase tracking-wider text-[11px] bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/50">
            <Zap className="w-3 h-3 fill-cyan-400" /> Fast Delivery
          </span>
          <span>Instant Digital Code & Top-Up Delivery in Kurdistan & Iraq.</span>
          <span className="text-slate-400 hidden sm:inline">|</span>
          <span className="text-cyan-300 font-semibold hidden sm:inline">
            FastPay • Korek • MasterCard
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#070a12] rounded-[10px] flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              DANO STORE
            </span>
            <span className="text-[9px] font-semibold tracking-widest text-slate-400 uppercase">
              Digital Gaming Kurdistan
            </span>
          </div>
        </Link>

        {/* Center Search Input (Desktop) */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex items-center flex-1 max-w-md relative mx-4"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search PUBG UC, Steam, PSN, GTA V, Nitro..."
            className="w-full bg-[#0c101a] text-slate-100 text-xs font-medium pl-10 pr-10 py-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

        {/* Right Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Admin link */}
          <Link
            to={isAdmin ? '/admin' : '/admin-login'}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-slate-700 transition-all"
          >
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isAdmin ? 'Dashboard' : 'Admin'}</span>
          </Link>

          {/* Cart Icon */}
          <button
            onClick={openCart}
            className="relative flex items-center justify-center p-2.5 rounded-xl bg-gradient-to-r from-blue-950/60 to-purple-950/60 border border-slate-800 hover:border-cyan-500/50 text-slate-100 hover:text-cyan-400 transition-all duration-200 group"
            aria-label="Open Cart"
          >
            <ShoppingCart className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-[11px] rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30 animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Desktop Links Bar */}
      <nav className="hidden md:block bg-[#080c14]/80 border-t border-slate-800/60 py-2">
        <div className="container mx-auto px-4 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 whitespace-nowrap ${
                  isActive(link.path)
                    ? 'text-cyan-400 bg-cyan-950/80 border border-cyan-800/50 shadow-sm shadow-cyan-500/20'
                    : 'text-slate-300 hover:text-cyan-300 hover:bg-slate-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-semibold pr-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-emerald-400">24/7 Delivery Active</span>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#080c14] border-t border-slate-800 p-4 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search games, UC, gift cards..."
              className="w-full bg-[#0f1522] text-slate-100 text-xs font-medium pl-10 pr-4 py-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </form>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs font-bold rounded-lg bg-slate-900/80 border border-slate-800 text-slate-200 hover:text-cyan-400 hover:border-cyan-800"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <Link
              to={isAdmin ? '/admin' : '/admin-login'}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-cyan-400"
            >
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>{isAdmin ? 'Admin Dashboard' : 'Admin Login'}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
