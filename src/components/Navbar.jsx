import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Gamepad2,
  ShoppingCart,
  Search,
  Menu,
  X,
  ShieldCheck,
  Flame,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const navigate = useNavigate();
  const { totalItems, setIsCartOpen } = useCart();
  const { isAdmin } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { name: 'Mobile', path: '/products?category=mobile-topup' },
    { name: 'Gift Cards', path: '/products?category=gift-cards' },
    { name: 'Subscriptions', path: '/products?category=subscriptions' },
    { name: 'Others', path: '/products?category=all' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#05070f]/90 border-b border-white/5 shadow-2xl">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900/60 via-purple-900/60 to-cyan-900/60 border-b border-cyan-500/10 px-4 py-1.5 text-xs text-center font-medium text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">Instant Digital Delivery in Kurdistan & Iraq</span>
          </div>
          <div className="mx-auto sm:mx-0 flex items-center gap-2 text-cyan-300 font-semibold">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>FastPay, Korek & Local Bank Cards Accepted</span>
          </div>
          <div className="hidden md:flex items-center gap-3 text-slate-400">
            <span>Official Digital Codes</span>
            <span>•</span>
            <span>24/7 Gamer Support</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">

          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
              <div className="w-full h-full bg-[#070b19] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-2xl font-bold tracking-wider text-white flex items-center gap-1">
                DANO <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">STORE</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase -mt-1">
                Gaming & Top-Ups
              </span>
            </div>
          </Link>

          {/* Search bar (Desktop) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden lg:flex flex-1 max-w-md relative"
          >
            <input
              type="text"
              placeholder="Search games, PUBG UC, gift cards, subscriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/80 text-sm text-slate-200 placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 border border-white/10 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Admin link */}
            <Link
              to={isAdmin ? '/admin' : '/admin-login'}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-cyan-400 hover:bg-slate-800/60 border border-transparent hover:border-slate-700 transition-all"
              title={isAdmin ? 'Admin Dashboard' : 'Admin Login'}
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>{isAdmin ? 'Admin Portal' : 'Admin'}</span>
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/50 hover:bg-slate-800 text-slate-200 hover:text-cyan-400 transition-all shadow-md group"
              aria-label="View Cart"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-105 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/50">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Category Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-1 py-2.5 border-t border-white/5 overflow-x-auto text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="px-3.5 py-1.5 rounded-lg text-slate-300 font-medium hover:text-cyan-400 hover:bg-white/5 transition-all whitespace-nowrap"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex-1" />
          <Link
            to="/products?sale=true"
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Special Deals</span>
          </Link>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#070b1a] px-4 pt-4 pb-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
          {/* Mobile search bar */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search store..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 text-sm text-slate-200 placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 border border-white/10 focus:border-cyan-500 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </form>

          {/* Mobile Links */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-white/5 text-sm font-medium text-slate-200 hover:text-cyan-400 hover:border-cyan-500/30"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <Link
              to={isAdmin ? '/admin' : '/admin-login'}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Admin Panel</span>
            </Link>
            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-cyan-400"
            >
              View Cart ({totalItems})
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
