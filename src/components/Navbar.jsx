import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Gamepad2,
  Search,
  ShoppingCart,
  Menu,
  X,
  UserCheck,
  Sparkles,
  Smartphone,
  CreditCard,
  Tv
} from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems, setIsCartOpen } = useCart();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Xbox', path: '/products?platform=Xbox' },
    { name: 'PlayStation', path: '/products?platform=PlayStation' },
    { name: 'PC', path: '/products?platform=PC' },
    { name: 'Mobile', path: '/products?platform=Mobile' },
    { name: 'Gift Cards', path: '/products?category=giftcards' },
    { name: 'Subscriptions', path: '/products?category=subscriptions' },
    { name: 'Others', path: '/products' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#05070f]/95 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900/60 via-cyan-900/40 to-purple-900/60 text-slate-200 text-xs py-1.5 px-4 text-center border-b border-slate-800/50 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span className="font-semibold">Fast & Secure Digital Game Delivery in Kurdistan & Iraq!</span>
        <span className="hidden sm:inline text-cyan-300 font-bold">• IQD Payments Accepted (FastPay, Korek, MasterCard)</span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5 shadow-lg shadow-cyan-950/50 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-cyan-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
                Dano <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Store</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 block -mt-1 tracking-widest uppercase">
                Digital Gaming
              </span>
            </div>
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search games, gift cards, UC, top-ups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-full py-2 pl-4 pr-10 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Actions: Admin & Cart */}
          <div className="flex items-center gap-3">
            {/* Admin Link */}
            <Link
              to={isAdmin ? "/admin" : "/admin-login"}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-cyan-400 hover:bg-slate-800/80 border border-transparent hover:border-slate-700 transition-all"
            >
              <UserCheck className={`w-4 h-4 ${isAdmin ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">{isAdmin ? 'Admin Dashboard' : 'Admin'}</span>
            </Link>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 hover:text-cyan-400 transition-all group"
              aria-label="View Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5 text-slate-200 group-hover:text-cyan-400" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-extrabold text-[11px] min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center border-2 border-[#05070f] shadow-md">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Secondary Category Bar (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 py-2 overflow-x-auto border-t border-slate-800/40 text-xs font-semibold">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="px-3 py-1.5 rounded-md text-slate-300 hover:text-cyan-300 hover:bg-slate-800/60 transition-colors whitespace-nowrap"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#090d1a] px-4 pt-3 pb-5 space-y-3">
          {/* Search form in mobile drawer */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search store..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-3 pr-9 text-sm text-slate-100 placeholder-slate-400"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-cyan-400">
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Nav Links */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-800 text-sm font-medium text-slate-200 hover:border-cyan-500/50 hover:text-cyan-300"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
