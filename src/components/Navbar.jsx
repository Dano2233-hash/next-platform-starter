import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Gamepad2,
  ShoppingCart,
  Search,
  UserCheck,
  Menu,
  X,
  ShieldAlert,
  Sparkles,
  Monitor,
  Tv,
  Smartphone,
  CreditCard,
  Zap,
  MoreHorizontal
} from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const navigate = useNavigate();
  const { cartCount, toggleCart } = useCart();
  const { isAdmin } = useAuth();
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
    { label: 'Home', path: '/' },
    { label: 'Xbox', path: '/products?category=xbox' },
    { label: 'PlayStation', path: '/products?category=playstation' },
    { label: 'PC', path: '/products?category=pc-games' },
    { label: 'Mobile', path: '/products?category=mobile' },
    { label: 'Gift Cards', path: '/products?category=gift-cards' },
    { label: 'Subscriptions', path: '/products?category=subscriptions' },
    { label: 'Others', path: '/products' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#05070f]/90 backdrop-blur-md">
      {/* Top Announcement Bar */}
      <div className="w-full bg-gradient-to-r from-blue-900/60 via-purple-900/60 to-cyan-900/60 py-1.5 px-4 text-center text-xs font-semibold text-cyan-200 border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Welcome to Dano Store — Kurdistan &amp; Iraq's #1 Digital Gaming Store! Direct FastPay, Korek &amp; MasterCard Payments.</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-0.5 shadow-lg group-hover:shadow-cyan-500/20 transition-all">
              <div className="w-full h-full bg-[#05070f] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Dano Store
              </span>
              <span className="text-[10px] font-semibold text-slate-400 -mt-1 tracking-widest uppercase">
                Digital Gaming
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-sm mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search games, gift cards, UC, VP..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/90 text-sm text-slate-100 placeholder-slate-500 rounded-full pl-10 pr-4 py-2 border border-slate-700/60 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </form>

          {/* Right Action Icons: Admin, Cart & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Admin Link */}
            <Link
              to={isAdmin ? "/admin" : "/admin-login"}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                isAdmin
                  ? 'bg-purple-950/80 text-purple-300 border-purple-500/40 hover:bg-purple-900/80'
                  : 'bg-slate-900/80 text-slate-300 border-slate-700/60 hover:text-cyan-400 hover:border-cyan-500/40'
              }`}
              title={isAdmin ? "Admin Dashboard" : "Admin Login"}
            >
              {isAdmin ? (
                <>
                  <UserCheck className="w-4 h-4 text-purple-400" />
                  <span className="hidden sm:inline">Admin</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-4 h-4 text-slate-400" />
                  <span className="hidden sm:inline">Admin</span>
                </>
              )}
            </Link>

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="relative flex items-center justify-center p-2 rounded-lg bg-slate-900/90 border border-slate-700/60 text-slate-200 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-cyan-500 text-black text-xs font-bold flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-900/90 border border-slate-700/60 text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Category Nav Links Bar */}
        <nav className="hidden md:flex items-center gap-1 py-2 overflow-x-auto border-t border-slate-800/60 text-xs font-medium text-slate-300">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="px-3 py-1.5 rounded-md hover:text-cyan-400 hover:bg-slate-900/80 transition-all whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#05070f] px-4 pt-3 pb-6 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search games, gift cards, UC..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 text-sm text-slate-100 placeholder-slate-500 rounded-lg pl-10 pr-4 py-2 border border-slate-700 focus:outline-none focus:border-cyan-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-200 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
