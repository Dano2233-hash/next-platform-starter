import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Gamepad2,
  ShoppingCart,
  Search,
  ShieldCheck,
  Menu,
  X,
  Smartphone,
  Monitor,
  Tv,
  Box,
  CreditCard,
  Sparkles,
  Layers,
  UserCheck,
} from 'lucide-react';
import { useCart } from '../hooks/useCart';

export default function Navbar() {
  const { cartCount, setIsDrawerOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
    { name: 'Gift Cards', path: '/products?category=gift-cards' },
    { name: 'Subscriptions', path: '/products?category=subscriptions' },
    { name: 'Others', path: '/products?category=all' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#05070f]/95 border-b border-slate-800/80">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900/60 via-purple-900/50 to-cyan-900/60 border-b border-cyan-500/20 py-1.5 px-4 text-center text-xs font-medium text-cyan-200 flex items-center justify-center gap-2">
        <Sparkles size={14} className="text-cyan-400 shrink-0" />
        <span>
          ⚡ Welcome to <strong>Dano Store</strong> — Instant Digital Codes & Top-Ups in Kurdistan & Iraq | Fast Delivery via FastPay, Korek & MasterCard!
        </span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Gamepad2 size={24} className="fill-slate-950" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white font-mono flex items-center gap-1">
                DANO <span className="text-cyan-400">STORE</span>
              </span>
              <span className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">
                Gaming & Top-Ups
              </span>
            </div>
          </Link>

          {/* Search bar on desktop */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md items-center relative"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search PUBG UC, GTA V, Steam cards, Nitro..."
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-full py-2 pl-10 pr-4 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
            <Search size={16} className="absolute left-3.5 text-slate-400 pointer-events-none" />
            <button
              type="submit"
              className="absolute right-1.5 px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-full transition-all"
            >
              Search
            </button>
          </form>

          {/* Right Navigation & Cart */}
          <div className="flex items-center gap-3">
            <Link
              to="/admin"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60 border border-slate-800 transition-colors"
            >
              <UserCheck size={14} />
              <span>Admin</span>
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500/60 text-slate-200 hover:text-cyan-400 transition-all group"
              aria-label="Open Shopping Cart"
            >
              <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-rose-500 to-cyan-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#05070f] animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Desktop Category Navigation Row */}
        <nav className="hidden md:flex items-center space-x-1 py-2 overflow-x-auto border-t border-slate-800/50 scrollbar-none text-xs font-medium text-slate-300">
          {navLinks.map((link) => {
            const isActive =
              location.pathname + location.search === link.path ||
              (link.path === '/' && location.pathname === '/' && !location.search);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 font-semibold border border-cyan-500/30'
                    : 'hover:text-white hover:bg-slate-800/60'
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
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 py-4 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-9 pr-3 text-sm text-slate-200"
            />
            <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
          </form>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs font-medium text-slate-300 bg-slate-900/60 rounded border border-slate-800/80 hover:text-cyan-400"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-xs font-medium text-cyan-400 bg-slate-900/60 rounded border border-cyan-500/30 flex items-center gap-1.5"
            >
              <UserCheck size={14} />
              <span>Admin Dashboard</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
