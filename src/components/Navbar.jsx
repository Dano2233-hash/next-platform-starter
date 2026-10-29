import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Menu, X, Sparkles, Gamepad2 } from 'lucide-react';
import SearchBar from './SearchBar';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalCount, toggleCart } = useCart();
  const { isAdmin } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Xbox', path: '/products?platform=Xbox' },
    { name: 'PlayStation', path: '/products?platform=PlayStation' },
    { name: 'PC', path: '/products?platform=PC' },
    { name: 'Mobile', path: '/products?category=Mobile Top-Ups' },
    { name: 'Gift Cards', path: '/products?category=Gift Cards' },
    { name: 'Subscriptions', path: '/products?category=Subscriptions' },
    { name: 'Others', path: '/products' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname + location.search === path;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#05070f]/90 backdrop-blur-md">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900/60 via-purple-900/60 to-cyan-900/60 border-b border-slate-800/60 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-medium">
          <div className="flex items-center gap-2 text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Fast, Automated & Instant Digital Delivery in Kurdistan & Iraq</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-slate-400">
            <span>Currency: <strong className="text-slate-200">IQD</strong></span>
            <span>•</span>
            <span>Payments: FastPay, Korek, MasterCard</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5 shadow-lg group-hover:shadow-cyan-500/20 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent">
                Dano Store
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 -mt-1">
                Gaming Store
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden lg:block w-72 shrink-0">
            <SearchBar />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1 font-medium text-sm text-slate-300">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  isActive(link.path)
                    ? 'text-cyan-400 bg-slate-900 border border-slate-800 font-semibold'
                    : 'hover:text-slate-100 hover:bg-slate-900/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5">
            {/* Admin Link */}
            <Link
              to={isAdmin ? '/admin' : '/admin-login'}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50 transition-all"
              title={isAdmin ? 'Admin Dashboard' : 'Admin Login'}
            >
              <ShieldCheck className={`w-4 h-4 ${isAdmin ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">{isAdmin ? 'Dashboard' : 'Admin'}</span>
            </Link>

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="relative flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md hover:from-blue-500 hover:to-cyan-500 transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline font-bold">Cart</span>
              {totalCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-[11px] font-extrabold bg-slate-950 text-cyan-400 rounded-full border border-cyan-400/40">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900 border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar below header */}
        <div className="lg:hidden pb-3 pt-1">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                  isActive(link.path)
                    ? 'text-cyan-400 bg-slate-900 border border-cyan-500/30'
                    : 'text-slate-300 bg-slate-900/40 border border-slate-800/60 hover:bg-slate-900'
                }`}
              >
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
