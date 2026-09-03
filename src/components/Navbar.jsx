import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Gamepad2, ShieldCheck, Menu, X, Sparkles, User, HelpCircle } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

export const Navbar = () => {
  const { getCartCount, setIsCartOpen } = useCart();
  const { isAdmin } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Xbox', path: '/products?platform=Xbox' },
    { name: 'PlayStation', path: '/products?platform=PlayStation' },
    { name: 'PC', path: '/products?platform=PC' },
    { name: 'Mobile', path: '/products?platform=Mobile' },
    { name: 'Gift Cards', path: '/products?category=Gift Card' },
    { name: 'Subscriptions', path: '/products?category=Subscription' },
    { name: 'Others', path: '/products' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#050811]/95 backdrop-blur-md border-b border-slate-800/80 shadow-xl">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-slate-200 text-xs py-1.5 px-4 text-center font-medium border-b border-blue-800/50 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span>Official Kurdistan & Iraq Gaming Store - Instant Delivery via FastPay, Korek & MasterCard!</span>
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5 shadow-lg shadow-cyan-950/50">
              <div className="w-full h-full bg-[#070b19] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-wider bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                DANO<span className="text-cyan-400">STORE</span>
              </span>
              <span className="text-[9px] font-bold text-slate-400 -mt-1 tracking-widest uppercase">Digital Gaming</span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search games, UC, gift cards, subscriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700/70 focus:border-cyan-500 rounded-xl py-2 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all duration-200"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </form>

          {/* Right Section: Admin Link & Cart Button */}
          <div className="flex items-center gap-3">
            {/* Admin Link */}
            <Link
              to={isAdmin ? '/admin' : '/admin-login'}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 font-semibold transition-colors duration-200"
            >
              <ShieldCheck className={`w-4 h-4 ${isAdmin ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>{isAdmin ? 'Dashboard' : 'Admin'}</span>
            </Link>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl bg-gradient-to-r from-blue-600/20 to-cyan-500/20 hover:from-blue-600/30 hover:to-cyan-500/30 border border-cyan-500/40 text-cyan-300 flex items-center gap-2 transition-all duration-200"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline font-bold text-xs">Cart</span>
              {getCartCount() > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {getCartCount()}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Categories Navigation Row - Desktop */}
        <nav className="hidden md:flex items-center gap-1 border-t border-slate-800/60 py-2 overflow-x-auto">
          {navLinks.map((link) => {
            const isActive = location.pathname + location.search === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070b19] border-t border-slate-800 px-4 pt-3 pb-6 space-y-3">
          {/* Search in mobile menu */}
          <form onSubmit={handleSearchSubmit} className="mb-3">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search games, UC, gift cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-9 pr-3 text-xs text-slate-200 placeholder-slate-400 focus:outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </form>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-semibold text-slate-200 hover:text-cyan-400 hover:border-cyan-500/40"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800">
            <Link
              to={isAdmin ? '/admin' : '/admin-login'}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 text-xs text-slate-200 font-bold"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>{isAdmin ? 'Admin Dashboard' : 'Admin Login'}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
