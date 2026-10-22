import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Menu, X, Gamepad2, Sparkles, ChevronRight } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const { isAdmin } = useAuth();
  const location = useLocation();

  const cartCount = getCartCount();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Xbox', path: '/products?platform=Xbox' },
    { name: 'PlayStation', path: '/products?platform=PlayStation' },
    { name: 'PC', path: '/products?platform=PC' },
    { name: 'Mobile', path: '/products?platform=Mobile' },
    { name: 'Gift Cards', path: '/products?category=Gift Cards' },
    { name: 'Subscriptions', path: '/products?category=Subscriptions' },
    { name: 'Others', path: '/products?category=Others' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname + location.search === path;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#05070f]/90 backdrop-blur-md border-b border-slate-800/80 shadow-2xl">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900/60 via-cyan-900/40 to-purple-900/60 border-b border-cyan-500/20 py-1.5 px-4 text-center text-xs font-semibold text-slate-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2 text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Kurdistan & Iraq's #1 Digital Gaming Store</span>
          </div>
          <div className="mx-auto sm:mx-0 flex items-center gap-3">
            <span>Instant Digital Delivery • FastPay • Korek • MasterCard</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-wider text-slate-100 uppercase group-hover:text-cyan-400 transition-colors">
                DANO <span className="text-cyan-400 font-extrabold">STORE</span>
              </span>
              <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase -mt-1">
                Digital Gaming
              </span>
            </div>
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:block flex-1 max-w-md mx-4">
            <SearchBar />
          </div>

          {/* Cart & Admin Quick Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/admin"
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                isAdmin
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>{isAdmin ? 'Admin Portal' : 'Admin'}</span>
            </Link>

            <Link
              to="/cart"
              className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-cyan-400 hover:border-cyan-500/50 transition-all group"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform text-cyan-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-black text-[11px] rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30 animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="lg:hidden pb-3">
          <SearchBar onSearchSubmit={() => setMobileMenuOpen(false)} />
        </div>

        {/* Secondary Category Navigation Links (Desktop) */}
        <nav className="hidden xl:flex items-center gap-1 py-2 border-t border-slate-800/60 overflow-x-auto no-scrollbar">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold whitespace-nowrap transition-all ${
                isActive(link.path)
                  ? 'bg-gradient-to-r from-blue-600/30 to-cyan-500/30 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-900'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/admin"
            className="ml-auto px-3 py-1.5 rounded-lg text-xs font-bold text-amber-400 hover:text-amber-300 bg-amber-500/10 border border-amber-500/20"
          >
            Admin Panel
          </Link>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-950 border-b border-slate-800 px-4 py-4 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 pb-1 border-b border-slate-800">
            Categories & Platforms
          </div>
          <div className="grid grid-cols-2 gap-1.5 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-2.5 rounded-lg text-xs font-bold transition-all ${
                  isActive(link.path)
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'bg-slate-900 text-slate-300 hover:text-cyan-400'
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </Link>
            ))}
          </div>
          <div className="pt-2">
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-lg text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30"
            >
              <span>Admin Dashboard</span>
              <ShieldCheck className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
