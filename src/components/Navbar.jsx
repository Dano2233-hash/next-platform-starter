import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Gamepad2,
  Search,
  ShoppingBag,
  UserCheck,
  Menu,
  X,
  Zap,
  ShieldCheck,
  Tv,
  Smartphone,
  Gift,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

export function Navbar({ onOpenCart }) {
  const { cartCount } = useCart();
  const { isAdmin } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Xbox', path: '/products?platform=Xbox' },
    { name: 'PlayStation', path: '/products?platform=PlayStation' },
    { name: 'PC', path: '/products?platform=PC' },
    { name: 'Mobile', path: '/products?platform=Mobile' },
    { name: 'Gift Cards', path: '/products?category=Gift Cards' },
    { name: 'Subscriptions', path: '/products?category=Subscriptions' },
    { name: 'Others', path: '/products' },
    { name: 'Admin', path: isAdmin ? '/admin' : '/admin-login' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#05070f]/95 backdrop-blur-md border-b border-slate-800/80">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900/60 via-cyan-900/40 to-purple-900/60 text-slate-200 text-[11px] sm:text-xs py-1.5 px-4 text-center border-b border-slate-800/50 flex items-center justify-center gap-2 font-medium">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span>⚡ Instant Automated Code & Top-Up Delivery in Kurdistan & Iraq | FastPay, Korek & MasterCard Supported</span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-[#090d1f] rounded-[11px] flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1">
              Dano <span className="text-cyan-400">Store</span>
            </span>
            <span className="text-[9px] text-slate-400 uppercase tracking-widest font-semibold -mt-1">
              Gaming Kurdistan
            </span>
          </div>
        </Link>

        {/* Desktop Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex items-center flex-1 max-w-md relative"
        >
          <input
            type="text"
            placeholder="Search PUBG UC, Steam cards, GTA V..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700/70 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <button
            type="submit"
            className="absolute right-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 text-[10px] font-bold uppercase hover:bg-cyan-500/30 transition-colors"
          >
            Search
          </button>
        </form>

        {/* Right Actions (Cart & Admin & Mobile Toggle) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Cart Icon Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-xl bg-slate-900/90 border border-slate-700/70 text-slate-200 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-[10px] min-w-[20px] text-center shadow-md animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Admin Status Pill */}
          {isAdmin && (
            <Link
              to="/admin"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold hover:bg-purple-500/20 transition-all"
            >
              <UserCheck className="w-4 h-4 text-purple-400" />
              <span>Admin Panel</span>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Desktop Category Navigation Link Bar */}
      <nav className="hidden lg:block border-t border-slate-800/60 bg-[#070a17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-semibold text-slate-300">
          <div className="flex items-center space-x-1 py-2 overflow-x-auto">
            {navLinks.map((link) => {
              const isActive = location.pathname + location.search === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold'
                      : 'hover:text-cyan-400 hover:bg-slate-900/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium shrink-0">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>24/7 Fast Delivery</span>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0e21] border-b border-slate-800 p-4 space-y-4">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search games, UC, gift cards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          </form>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-200 text-xs font-semibold hover:border-cyan-500/40 hover:text-cyan-300 transition-all text-center"
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

export default Navbar;
