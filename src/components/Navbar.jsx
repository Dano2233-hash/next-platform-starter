import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, ShieldCheck, Zap } from 'lucide-react';

export function Navbar({ cartCount = 0, onOpenCart, isAdmin = false }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Xbox', path: '/products?platform=xbox' },
    { label: 'PlayStation', path: '/products?platform=playstation' },
    { label: 'PC', path: '/products?platform=pc' },
    { label: 'Mobile', path: '/products?category=mobile' },
    { label: 'Gift Cards', path: '/products?category=gift-cards' },
    { label: 'Subscriptions', path: '/products?category=subscriptions' },
    { label: 'Others', path: '/products' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#050505]/95 backdrop-blur-md">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 text-white text-xs font-semibold py-1.5 px-4 text-center flex items-center justify-center gap-2 shadow-sm">
        <Zap className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
        <span> Kurdistan & Iraq's Premier Digital Gaming Store — 100% Instant & Direct Delivery</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              D
            </div>
            <span className="text-xl font-black tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              Dano <span className="text-cyan-400">Store</span>
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search games, top-ups, gift cards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 text-sm text-slate-100 placeholder-slate-400 rounded-lg pl-10 pr-4 py-2 border border-slate-800 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <button type="submit" className="hidden">Search</button>
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            {/* Admin Link */}
            <Link
              to={isAdmin ? "/admin" : "/admin-login"}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 text-xs font-medium text-slate-300 hover:text-white transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>{isAdmin ? "Dashboard" : "Admin"}</span>
            </Link>

            {/* Cart Icon */}
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 hover:text-white transition-colors"
              aria-label="Open Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5 text-cyan-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-cyan-500 text-slate-950 font-black text-[11px] rounded-full w-5 h-5 flex items-center justify-center border-2 border-[#050505]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Row */}
        <nav className="hidden md:flex items-center space-x-6 border-t border-slate-800/60 py-2.5 text-xs font-semibold text-slate-300 overflow-x-auto">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="hover:text-cyan-400 transition-colors whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0a0f1d] px-4 py-4 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <input
              type="text"
              placeholder="Search games, top-ups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 text-sm text-slate-100 placeholder-slate-400 rounded-lg pl-10 pr-4 py-2 border border-slate-800 focus:outline-none focus:border-cyan-500"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          </form>

          <div className="grid grid-cols-2 gap-2 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md bg-slate-900/60 text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors font-medium text-xs"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800/80">
            <Link
              to={isAdmin ? "/admin" : "/admin-login"}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-cyan-600/20 border border-cyan-500/30 text-cyan-300 font-semibold text-xs"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isAdmin ? "Admin Dashboard" : "Admin Login"}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
