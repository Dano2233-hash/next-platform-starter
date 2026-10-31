import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Search,
  ShieldCheck,
  Menu,
  X,
  Gamepad2,
  Smartphone,
  Tv,
  Monitor,
  CreditCard,
  Sparkles,
  Layers,
  PhoneCall
} from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { totalItems, setIsDrawerOpen } = useCart();
  const { isAdmin } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Xbox', path: '/products?platform=Xbox' },
    { label: 'PlayStation', path: '/products?platform=PlayStation' },
    { label: 'PC', path: '/products?platform=PC' },
    { label: 'Mobile', path: '/products?platform=Mobile' },
    { label: 'Gift Cards', path: '/products?category=Gift+Cards' },
    { label: 'Subscriptions', path: '/products?category=Subscriptions' },
    { label: 'Others', path: '/products?category=Others' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#05070f]/90 border-b border-slate-800/80">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-slate-300 text-xs py-1.5 px-4 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-slate-200">
              Instant Manual Delivery in Kurdistan & Iraq
            </span>
            <span className="hidden md:inline text-slate-400">| Payment via FastPay, Korek & MasterCard</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="text-cyan-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Genuine Digital Codes
            </span>
            <Link
              to={isAdmin ? '/admin' : '/admin-login'}
              className="text-slate-400 hover:text-white transition-colors"
            >
              {isAdmin ? 'Admin Dashboard' : 'Admin'}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-indigo-600 p-[2px] shadow-lg shadow-cyan-900/30">
              <div className="w-full h-full bg-[#05070f] rounded-[10px] flex items-center justify-center group-hover:bg-[#080d1e] transition-colors">
                <Gamepad2 className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1 font-['Rajdhani',sans-serif]">
                DANO <span className="text-cyan-400">STORE</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-slate-400 font-semibold -mt-1">
                Gaming & Top-Ups
              </span>
            </div>
          </Link>

          {/* Search bar (Desktop) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md mx-4 relative"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search games, UC, Diamonds, V-Bucks, cards..."
              className="w-full bg-[#0c1222] border border-slate-700/80 rounded-xl py-2.5 pl-11 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          </form>

          {/* Right Actions: Cart & Mobile Menu */}
          <div className="flex items-center gap-3">
            <Link
              to="/products"
              className="hidden lg:flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-cyan-400 px-3 py-2 rounded-lg hover:bg-slate-800/40 transition-colors"
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              All Products
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/60 text-slate-200 px-4 py-2.5 rounded-xl font-medium text-sm transition-all shadow-lg active:scale-95"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5 text-cyan-400" />
              <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider">Cart</span>
              {totalItems > 0 && (
                <span className="bg-cyan-500 text-slate-950 text-xs font-extrabold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Category Navigation Bar (Desktop) */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-3 py-2 border-t border-slate-800/50 text-sm overflow-x-auto no-scrollbar">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60 font-medium text-xs lg:text-sm whitespace-nowrap transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/admin"
            className="ml-auto text-xs text-slate-400 hover:text-cyan-400 px-2 py-1 transition-colors"
          >
            Admin Panel
          </Link>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#080d1a] px-4 pt-3 pb-6 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search games, gift cards, top-ups..."
              className="w-full bg-[#0c1222] border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </form>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60 rounded-lg font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <Link
              to={isAdmin ? '/admin' : '/admin-login'}
              onClick={() => setMobileMenuOpen(false)}
              className="text-cyan-400 font-semibold"
            >
              {isAdmin ? 'Admin Dashboard' : 'Admin Login'}
            </Link>
            <span className="text-slate-400">Currency: IQD</span>
          </div>
        </div>
      )}
    </header>
  );
}
