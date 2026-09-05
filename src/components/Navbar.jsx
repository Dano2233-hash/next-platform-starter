import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, ShieldCheck, Menu, X, Gamepad2, ChevronRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItemsCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    { name: 'Xbox', path: '/products?platform=Xbox' },
    { name: 'PlayStation', path: '/products?platform=PlayStation' },
    { name: 'PC', path: '/products?platform=PC' },
    { name: 'Mobile', path: '/products?category=mobile-topups' },
    { name: 'Gift Cards', path: '/products?category=gift-cards' },
    { name: 'Subscriptions', path: '/products?category=subscriptions' },
    { name: 'Others', path: '/products?category=paid-games' }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && (location.pathname + location.search).includes(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-xs py-1.5 px-4 text-center text-cyan-200 font-medium border-b border-blue-800/40">
        <span className="inline-flex items-center gap-2">
          <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold uppercase text-[10px]">
            Kurdistan & Iraq
          </span>
          Fast & Trusted Digital Gaming Codes | FastPay, Korek Cash & MasterCard Accepted!
        </span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 flex items-center justify-center text-white font-black shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Gamepad2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent">
                Dano Store
              </span>
              <span className="text-[9px] uppercase tracking-widest text-cyan-400 font-semibold -mt-1">
                Digital Gaming
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search games, UC, gift cards, subscriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-800 focus:border-cyan-500 text-slate-100 placeholder-slate-500 rounded-full py-2 pl-4 pr-10 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold transition-all"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Right Controls: Admin Link & Cart Counter */}
          <div className="flex items-center gap-3">
            {/* Admin Link */}
            <Link
              to="/admin"
              className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300 hover:text-cyan-400 font-medium px-3 py-1.5 rounded-lg border border-slate-800 hover:border-cyan-500/30 transition-all bg-slate-900/50"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Admin</span>
            </Link>

            {/* Cart Icon & Counter */}
            <Link
              to="/cart"
              className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-200 hover:text-cyan-400 transition-all group"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {totalItemsCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Category & Platform Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 overflow-x-auto py-2 border-t border-slate-900 text-xs font-medium scrollbar-none">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                isActive(link.path)
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0a0e17] border-b border-slate-800 p-4 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 rounded-lg py-2 pl-3 pr-10 text-xs"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded bg-cyan-600 text-slate-950 font-bold"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-900 hover:text-cyan-400"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </Link>
            ))}

            <Link
              to="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-lg text-sm font-medium text-cyan-400 bg-cyan-950/30 border border-cyan-800/40 mt-2"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Admin Dashboard
              </span>
              <ChevronRight className="w-4 h-4 text-cyan-600" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
