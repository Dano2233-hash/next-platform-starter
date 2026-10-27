import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, Shield, ShieldCheck, Flame, Smartphone, Monitor, Box, Tv, CreditCard, Sparkles, Home } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { isAdmin } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Xbox', path: '/products?platform=Xbox', icon: Box },
    { name: 'PlayStation', path: '/products?platform=PlayStation', icon: Tv },
    { name: 'PC', path: '/products?platform=PC', icon: Monitor },
    { name: 'Mobile', path: '/products?category=mobile', icon: Smartphone },
    { name: 'Gift Cards', path: '/products?category=giftcards', icon: CreditCard },
    { name: 'Subscriptions', path: '/products?category=subscriptions', icon: Sparkles },
    { name: 'Others', path: '/products', icon: Flame }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#05070f]/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-cyan-900 to-purple-900 text-xs py-1.5 px-4 text-center text-cyan-200 font-medium flex items-center justify-center gap-2 border-b border-cyan-500/20">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span>Instant Digital Delivery in Kurdistan & Iraq | FastPay • Korek • MasterCard</span>
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 flex items-center justify-center shadow-md shadow-cyan-950/50 border border-cyan-400/30 group-hover:scale-105 transition-transform">
            <span className="font-black text-white text-xl tracking-wider">D</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              Dano <span className="text-cyan-400">Store</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-slate-400 -mt-1 font-semibold">
              Digital Gaming
            </span>
          </div>
        </Link>

        {/* Search Bar - Desktop */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
          <input
            type="text"
            placeholder="Search games, UC, gift cards, subscriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-800 focus:border-cyan-500 text-slate-100 text-xs rounded-xl pl-9 pr-4 py-2.5 outline-none transition-colors placeholder:text-slate-500 shadow-inner"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </form>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Admin Link */}
          <Link
            to={isAdmin ? '/admin' : '/admin-login'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-cyan-400 transition-all"
          >
            {isAdmin ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Admin Panel</span>
              </>
            ) : (
              <>
                <Shield className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Admin</span>
              </>
            )}
          </Link>

          {/* Cart Icon Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-200 hover:text-cyan-400 transition-colors cursor-pointer"
            aria-label="Open Cart"
          >
            <ShoppingCart className="w-5 h-5 text-cyan-400" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border border-[#05070f] shadow-md animate-bounce">
                {totalItemsCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Navigation Links Bar - Desktop */}
      <div className="hidden md:block bg-slate-950/60 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-start gap-1 overflow-x-auto py-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                to={link.path}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-900 transition-colors whitespace-nowrap"
              >
                <Icon className="w-3.5 h-3.5 text-cyan-500/80" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#070a17] border-b border-slate-800 px-4 py-4 space-y-3 animate-fadeIn">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search store..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-slate-100 text-xs rounded-lg pl-9 pr-4 py-2.5 outline-none focus:border-cyan-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </form>

          {/* Mobile Nav Links */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-semibold text-slate-200 hover:text-cyan-400 hover:border-cyan-500/40"
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
