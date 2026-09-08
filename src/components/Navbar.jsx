import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Menu, X, Gamepad2, Search } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, toggleCart } = useCart();
  const { isAdmin } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Xbox', path: '/products?category=xbox' },
    { name: 'PlayStation', path: '/products?category=playstation' },
    { name: 'PC', path: '/products?category=pc' },
    { name: 'Mobile', path: '/products?category=mobile' },
    { name: 'Gift Cards', path: '/products?category=giftcards' },
    { name: 'Subscriptions', path: '/products?category=subscriptions' },
    { name: 'Others', path: '/products?category=others' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#050505]/90 border-b border-slate-800/80">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900/60 via-cyan-900/40 to-purple-900/60 border-b border-cyan-500/20 py-1.5 px-4 text-center text-[11px] font-semibold text-cyan-200">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          ⚡ FAST DELIVERY IN KURDISTAN & IRAQ • FASTPAY, KOREK & MASTERCARD ACCEPTED
        </span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-[1.5px] shadow-lg shadow-cyan-950/50 group-hover:shadow-cyan-500/20 transition-shadow">
              <div className="w-full h-full bg-[#080d1a] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-wider text-white group-hover:text-cyan-300 transition-colors uppercase">
                DANO <span className="text-cyan-400">STORE</span>
              </span>
              <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase -mt-1">
                Gaming Digital Store
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden lg:block flex-1 max-w-md mx-4">
            <SearchBar />
          </div>

          {/* Right Action Icons & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Admin Link */}
            <Link
              to={isAdmin ? '/admin' : '/admin-login'}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">{isAdmin ? 'Dashboard' : 'Admin'}</span>
            </Link>

            {/* Cart Button with Counter */}
            <button
              onClick={toggleCart}
              className="relative flex items-center justify-center p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-200 hover:text-white transition-all active:scale-95"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-extrabold text-[10px] flex items-center justify-center shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Category Nav Links Bar */}
        <nav className="hidden lg:flex items-center gap-1 border-t border-slate-800/60 py-2">
          {navLinks.map((link) => {
            const isActive = location.pathname + location.search === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#080d1a] border-b border-slate-800 px-4 pt-3 pb-6 space-y-4">
          <div className="mb-2">
            <SearchBar />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-xs font-bold text-slate-300 bg-slate-900/80 border border-slate-800 hover:text-cyan-400"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
