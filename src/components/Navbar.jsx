import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import {
  Gamepad2,
  Search,
  ShoppingBag,
  Menu,
  X,
  UserCheck,
  ShieldAlert,
  ChevronRight,
  Sparkles,
  Zap
} from 'lucide-react';

export const Navbar = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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
    { label: 'Mobile', path: '/products?platform=Mobile' },
    { label: 'Gift Cards', path: '/products?category=gift-cards' },
    { label: 'Subscriptions', path: '/products?category=subscriptions' },
    { label: 'Others', path: '/products' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#050505]/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse text-cyan-300" />
        <span>Instant Digital Delivery in Kurdistan & Iraq | 100% Guaranteed Official Cards & Top-Ups</span>
        <Zap className="w-3.5 h-3.5 text-yellow-300 hidden sm:inline" />
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1">
                Dano <span className="text-cyan-400">Store</span>
              </span>
              <span className="text-[10px] text-slate-400 tracking-wider -mt-1 font-medium uppercase">
                Digital Gaming
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md relative items-center"
          >
            <input
              type="text"
              placeholder="Search PUBG UC, Steam cards, GTA V, Discord..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 text-sm text-slate-200 placeholder-slate-500 rounded-xl px-4 py-2 pl-10 border border-slate-800 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          </form>

          {/* Right Actions: Admin & Cart */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Admin Link */}
            {isAdmin ? (
              <Link
                to="/admin"
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Admin Portal</span>
              </Link>
            ) : (
              <Link
                to="/admin-login"
                className="hidden sm:flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 hover:text-white hover:border-slate-700 transition-all"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
                <span>Admin</span>
              </Link>
            )}

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-slate-700 transition-all flex items-center justify-center group"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-cyan-500 text-slate-950 text-[11px] font-extrabold flex items-center justify-center shadow-md animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Categories Bar (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 py-2 overflow-x-auto border-t border-slate-800/60 text-xs font-medium text-slate-300 scrollbar-none">
          {navLinks.map((link) => {
            const isActive = location.pathname + location.search === link.path;
            return (
              <Link
                key={link.label}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600/20 text-cyan-400 border border-cyan-500/30 font-semibold'
                    : 'hover:text-cyan-400 hover:bg-slate-900'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 p-4 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search store..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 text-sm text-slate-200 placeholder-slate-500 rounded-xl px-4 py-2.5 pl-10 border border-slate-800 focus:outline-none focus:border-cyan-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </form>

          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-900/60 text-slate-300 hover:text-cyan-400 border border-slate-800/80"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <Link
              to={isAdmin ? '/admin' : '/admin-login'}
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Admin Portal"
              className="w-full text-center py-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 text-xs font-semibold"
            >
              {isAdmin ? 'Admin Dashboard' : 'Admin Login'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
