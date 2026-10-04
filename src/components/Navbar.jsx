import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, ShieldCheck, Menu, X, Gamepad2, User, Search, Sparkles } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import SearchBar from './SearchBar';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItemCount, setIsCartOpen } = useCart();
  const { isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Xbox', path: '/products?platform=Xbox' },
    { name: 'PlayStation', path: '/products?platform=PlayStation' },
    { name: 'PC', path: '/products?platform=PC' },
    { name: 'Mobile', path: '/products?platform=Mobile' },
    { name: 'Gift Cards', path: '/products?category=giftcards' },
    { name: 'Subscriptions', path: '/products?category=subscriptions' },
    { name: 'Others', path: '/products' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#05070f]/95 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-cyan-900/40 border-b border-slate-800/60 py-1.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-medium text-slate-300">
          <div className="hidden sm:flex items-center gap-2 text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fast Kurdistan & Iraq Digital Delivery</span>
          </div>
          <p className="mx-auto sm:mx-0">
            🎮 Instant PUBG UC, Steam, PSN, Discord Nitro & Local FastPay / Korek Payments!
          </p>
          <div className="hidden md:flex items-center gap-3 text-slate-400">
            <span>24/7 Support</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">Instant Codes</span>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
              <div className="w-full h-full bg-[#070b19] rounded-[10.5px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg font-extrabold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                Dano Store
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold -mt-1">
                Digital Gaming
              </span>
            </div>
          </Link>

          {/* Center Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Cart Icon Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-200 transition-all hover:bg-slate-800 flex items-center gap-2"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5 text-cyan-400" />
              <span className="hidden sm:inline text-xs font-bold text-slate-300">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-lg border border-[#05070f]">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Admin Dashboard / Login Button */}
            <Link
              to={isAdmin ? '/admin' : '/admin-login'}
              className={`p-2.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
                isAdmin
                  ? 'bg-purple-950/60 border-purple-500/40 text-purple-300 hover:bg-purple-900/80'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              <User className="w-4 h-4 text-purple-400" />
              <span className="hidden sm:inline">{isAdmin ? 'Admin Panel' : 'Admin'}</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden pb-3">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>

        {/* Desktop Navigation Category Links Bar */}
        <nav className="hidden md:flex items-center gap-1 py-2 overflow-x-auto border-t border-slate-800/60 text-xs font-semibold">
          {navLinks.map((link) => {
            const isActive = location.pathname + location.search === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090d1a] border-t border-slate-800 p-4 space-y-2">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-slate-700"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
