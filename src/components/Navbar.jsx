import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, ShieldAlert, Sparkles } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Xbox', path: '/products?category=xbox' },
    { name: 'PlayStation', path: '/products?category=playstation' },
    { name: 'PC', path: '/products?category=pc' },
    { name: 'Mobile', path: '/products?category=mobile' },
    { name: 'Gift Cards', path: '/products?category=gift-cards' },
    { name: 'Subscriptions', path: '/products?category=subscriptions' },
    { name: 'Others', path: '/products?category=others' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#05070f]/95 backdrop-blur-md border-b border-slate-800/80">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900/60 via-purple-900/60 to-cyan-900/60 border-b border-blue-500/20 py-1.5 px-4 text-center text-xs font-medium text-slate-200">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>⚡ Direct Instant Digital Top-Ups & Game Keys in Kurdistan & Iraq | FastPay & Korek Accepted</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-950/50 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#05070f] rounded-[10px] flex items-center justify-center font-black text-cyan-400 text-lg">
                D
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent">
                Dano Store
              </span>
              <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest -mt-1">
                Digital Gaming
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                type="text"
                placeholder="Search games, gift cards, UC, V-Bucks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#090d1a] text-slate-200 text-xs rounded-lg pl-9 pr-4 py-2 border border-slate-800 focus:outline-none focus:border-cyan-500/80 transition-colors placeholder:text-slate-500"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Admin Nav Link */}
            <Link
              to={isAdmin ? "/admin" : "/admin-login"}
              className={`hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                isAdmin
                  ? 'bg-purple-950/60 border-purple-500/50 text-purple-300 hover:bg-purple-900/80'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
              <span>{isAdmin ? 'Admin Dashboard' : 'Admin'}</span>
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl bg-[#090d1a] border border-slate-800 hover:border-cyan-500/50 text-slate-200 hover:text-cyan-400 transition-all group"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-slate-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Categories Bar (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 py-2 border-t border-slate-800/50 overflow-x-auto text-xs font-medium text-slate-300 scrollbar-none">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="px-3 py-1 rounded-md hover:text-cyan-400 hover:bg-slate-900/60 transition-colors whitespace-nowrap"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#070b18] border-b border-slate-800 px-4 py-4 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0d1326] text-slate-200 text-xs rounded-lg pl-9 pr-4 py-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          </form>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 bg-slate-900/60 border border-slate-800/80 rounded-lg text-xs font-semibold text-slate-200 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors text-center"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2">
            <Link
              to={isAdmin ? "/admin" : "/admin-login"}
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-purple-950/40 border border-purple-500/40 text-purple-300 rounded-lg text-xs font-bold"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{isAdmin ? 'Admin Dashboard' : 'Admin Portal Login'}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
