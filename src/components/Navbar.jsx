import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  ShieldCheck,
  Gamepad2,
  Tv,
  Monitor,
  Smartphone,
  CreditCard,
  Zap,
  Grid,
  Sparkles,
  LogOut,
} from 'lucide-react';

export default function Navbar({ cartCount = 0, isAdmin = false, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Sparkles },
    { name: 'Xbox', path: '/products?category=xbox', icon: Tv },
    { name: 'PlayStation', path: '/products?category=playstation', icon: Gamepad2 },
    { name: 'PC', path: '/products?category=pc', icon: Monitor },
    { name: 'Mobile', path: '/products?category=mobile', icon: Smartphone },
    { name: 'Gift Cards', path: '/products?category=giftcards', icon: CreditCard },
    { name: 'Subscriptions', path: '/products?category=subscriptions', icon: Zap },
    { name: 'Others', path: '/products', icon: Grid },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname + location.search === path) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#050811]/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-cyan-900 text-xs py-1.5 px-4 text-center text-cyan-200 font-semibold border-b border-slate-800 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-[11px] sm:text-xs">
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Instant Delivery for Kurdistan & Iraq Gamers
          </span>
          <div className="hidden md:flex items-center gap-4 text-slate-300">
            <span>FastPay • Korek • MasterCard Accepted</span>
            <span className="text-cyan-400">Currency: IQD</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-600 p-0.5 shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  D
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                Dano <span className="text-cyan-400">Store</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold -mt-1">
                Digital Gaming
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <input
              type="text"
              placeholder="Search games, UC, gift cards, subscriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 text-slate-100 placeholder-slate-500 text-xs rounded-xl pl-10 pr-4 py-2.5 border border-slate-700/70 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          </form>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Admin Badge/Link */}
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/admin"
                  className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-purple-950/80 text-purple-300 border border-purple-500/40 hover:bg-purple-900/80 transition"
                >
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>Admin Panel</span>
                </Link>
                <button
                  onClick={onLogout}
                  title="Logout Admin"
                  className="p-2 rounded-lg bg-red-950/50 hover:bg-red-900/50 text-red-400 border border-red-500/30 transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/admin-login"
                className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 transition"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                <span>Admin</span>
              </Link>
            )}

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 transition flex items-center justify-center group"
            >
              <ShoppingCart className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-200 lg:hidden hover:bg-slate-800 transition"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Category Nav Bar */}
        <nav className="hidden lg:flex items-center gap-1 py-2 border-t border-slate-800/60 overflow-x-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  active
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#090d16] border-b border-slate-800 px-4 pt-3 pb-6 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 text-slate-100 placeholder-slate-500 text-xs rounded-xl pl-10 pr-4 py-2.5 border border-slate-700"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </form>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 p-2.5 rounded-lg text-xs font-semibold ${
                    active
                      ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                      : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <Link
              to="/admin-login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Access</span>
            </Link>
            <span className="text-[11px] text-slate-500">IQD • FastPay / Korek</span>
          </div>
        </div>
      )}
    </header>
  );
}
