import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Gamepad2,
  Search,
  ShoppingBag,
  Menu,
  X,
  ShieldAlert,
  Sparkles,
  Smartphone,
  Tv,
  Gift,
  Monitor,
  Headphones
} from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems, setIsCartOpen } = useCart();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Xbox', path: '/products?platform=xbox' },
    { name: 'PlayStation', path: '/products?platform=playstation' },
    { name: 'PC', path: '/products?platform=pc' },
    { name: 'Mobile', path: '/products?category=mobile' },
    { name: 'Gift Cards', path: '/products?category=gift-cards' },
    { name: 'Subscriptions', path: '/products?category=subscriptions' },
    { name: 'Others', path: '/products' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050811]/95 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900/60 via-purple-900/60 to-blue-900/60 text-slate-200 text-xs py-1.5 px-4 text-center border-b border-cyan-500/20 font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span>Instant Automated Delivery in Kurdistan & Iraq — FastPay, Korek & MasterCard Accepted!</span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-400 to-purple-600 p-[2px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
              <div className="w-full h-full bg-[#080d1a] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tight bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                DANO STORE
              </span>
              <span className="text-[9px] uppercase tracking-widest text-cyan-400 font-bold -mt-1">
                Digital Gaming
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <input
              type="text"
              placeholder="Search games, UC, gift cards, subscriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0d1428] border border-slate-800 hover:border-slate-700 focus:border-cyan-500 rounded-xl py-2 pl-4 pr-10 text-sm text-slate-100 placeholder-slate-400 outline-none transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Actions (Cart & Admin) */}
          <div className="flex items-center gap-3">
            {/* Admin Link */}
            <Link
              to={isAdmin ? "/admin" : "/admin-login"}
              className="hidden lg:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
              {isAdmin ? "Admin Panel" : "Admin"}
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-[#0e162d] border border-slate-800 hover:border-cyan-500/50 text-slate-200 hover:text-cyan-400 transition-all group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 md:hidden"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Category Navigation Row */}
        <nav className="hidden md:flex items-center justify-between border-t border-slate-800/60 py-2.5 overflow-x-auto text-xs font-semibold text-slate-300">
          <div className="flex items-center space-x-6">
            {navLinks.map((link, idx) => {
              const isActive = location.pathname + location.search === link.path;
              return (
                <Link
                  key={idx}
                  to={link.path}
                  className={`transition-colors whitespace-nowrap ${
                    isActive ? 'text-cyan-400 font-bold' : 'hover:text-cyan-300'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-[11px] font-medium border-l border-slate-800 pl-4">
            <span className="flex items-center gap-1 text-cyan-400">
              <Headphones className="w-3.5 h-3.5" /> Support 24/7
            </span>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#090e1d] px-4 py-4 space-y-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0d1428] border border-slate-700 rounded-lg py-2 pl-3 pr-10 text-sm text-slate-100 placeholder-slate-400"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1">
              <Search className="w-4 h-4 text-slate-400" />
            </button>
          </form>

          <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-200 text-center"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
            <Link
              to={isAdmin ? "/admin" : "/admin-login"}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-purple-400 font-bold flex items-center gap-1"
            >
              <ShieldAlert className="w-4 h-4" />
              {isAdmin ? "Admin Dashboard" : "Admin Login"}
            </Link>
            <span className="text-slate-500">IQD Currency Only</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
