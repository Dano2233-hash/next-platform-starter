import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Shield, Menu, X, Sparkles, ChevronRight, Zap } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems, setIsDrawerOpen } = useCart();
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
    { label: 'Home', path: '/' },
    { label: 'Xbox', path: '/products?platform=Xbox' },
    { label: 'PlayStation', path: '/products?platform=PlayStation' },
    { label: 'PC', path: '/products?platform=PC' },
    { label: 'Mobile', path: '/products?category=mobile' },
    { label: 'Gift Cards', path: '/products?category=gift-cards' },
    { label: 'Subscriptions', path: '/products?category=subscriptions' },
    { label: 'Others', path: '/products?category=games' },
    { label: 'Admin', path: '/admin', isSpecial: true }
  ];

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-purple-950 border-b border-blue-900/40 text-xs py-1.5 px-4 text-center text-slate-300 flex items-center justify-center gap-2">
        <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse inline" />
        <span>
          Instant Digital Delivery across <strong className="text-cyan-300 font-semibold">Kurdistan & Iraq</strong> • FastPay, Korek & MasterCard accepted
        </span>
      </div>

      {/* Main Navbar */}
      <div className="bg-[#05070f]/90 backdrop-blur-md border-b border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 gap-4">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-[2px] shadow-lg shadow-cyan-900/30">
                <div className="w-full h-full bg-[#05070f] rounded-[10px] flex items-center justify-center">
                  <span className="font-black text-lg bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                    D
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  Dano<span className="text-cyan-400"> Store</span>
                </span>
                <span className="text-[10px] tracking-widest text-slate-400 uppercase font-bold -mt-1">
                  Gaming Iraq
                </span>
              </div>
            </Link>

            {/* Desktop Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden md:flex flex-1 max-w-md relative items-center"
            >
              <div className="relative w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search PUBG UC, Steam cards, games, subscriptions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-20 py-2 bg-slate-900/80 border border-slate-800 rounded-full text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-black text-xs font-bold rounded-full transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Actions: Cart & Mobile toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/60 transition-all text-slate-200 group"
                aria-label="View Cart"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-[11px] rounded-full flex items-center justify-center shadow-md animate-scale">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline text-xs font-semibold text-slate-300">
                  Cart
                </span>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white md:hidden"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 py-2 overflow-x-auto scrollbar-none border-t border-slate-800/40 text-xs font-semibold">
            {navLinks.map((link) => {
              const isActive = location.pathname + location.search === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                      : link.isSpecial
                      ? 'text-amber-400 hover:text-amber-300 hover:bg-amber-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.isSpecial && <Shield className="w-3.5 h-3.5 text-amber-400" />}
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-[#070b16] p-4 space-y-3">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-16 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-200"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 bg-cyan-500 text-black text-xs font-bold rounded"
              >
                Go
              </button>
            </form>

            <div className="grid grid-cols-2 gap-1.5 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-cyan-400 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
