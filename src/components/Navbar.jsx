import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Gamepad2,
  ShoppingCart,
  Menu,
  X,
  ShieldCheck,
  Search,
  ChevronRight,
} from 'lucide-react';
import SearchBar from './SearchBar';

export default function Navbar({ cartCount = 0, onOpenCart }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Xbox', path: '/products?platform=Xbox' },
    { name: 'PlayStation', path: '/products?platform=PlayStation' },
    { name: 'PC', path: '/products?platform=PC' },
    { name: 'Mobile', path: '/products?platform=Mobile' },
    { name: 'Gift Cards', path: '/products?category=gift-cards' },
    { name: 'Subscriptions', path: '/products?category=subscriptions' },
    { name: 'Others', path: '/products?category=all' },
  ];

  const isActiveLink = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname + location.search === path) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#050505]/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-700 via-cyan-600 to-purple-700 text-white text-[11px] font-bold py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2">
        <span className="px-1.5 py-0.5 rounded bg-white/20 text-[10px] uppercase">Official</span>
        <span>Welcome to Dano Store — Kurdistan & Iraq Digital Gaming Store. Instant Processing!</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#050505] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg md:text-xl tracking-wider text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-400">
                Dano Store
              </span>
              <span className="text-[9px] uppercase tracking-widest text-cyan-400 font-bold -mt-1">
                Digital Gaming
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden lg:block flex-1 max-w-sm mx-4">
            <SearchBar />
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">

            {/* Admin Link */}
            <Link
              to="/admin"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 text-xs font-bold transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Admin</span>
            </Link>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400 text-white font-bold text-xs transition-all active:scale-95"
              aria-label="View Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4 text-cyan-400" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 w-4 h-4 bg-gradient-to-r from-rose-500 to-red-600 text-white rounded-full text-[10px] font-extrabold flex items-center justify-center shadow-md animate-pulse">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white md:hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links Row */}
        <nav className="hidden md:flex items-center gap-1 overflow-x-auto border-t border-slate-800/60 py-2">
          {navLinks.map((link) => {
            const active = isActiveLink(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  active
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
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
        <div className="md:hidden border-t border-slate-800 bg-[#080b14] px-4 py-4 space-y-3">
          <div className="mb-3">
            <SearchBar />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-bold text-slate-200 hover:text-cyan-400 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="col-span-2 px-3 py-2 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-xs font-bold text-cyan-400 flex items-center justify-between mt-2"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Portal</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
