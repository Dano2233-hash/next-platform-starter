import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Gamepad2, Shield, Menu, X, Sparkles, Smartphone, Monitor, Tv, CreditCard, Layers } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { SearchBar } from './SearchBar';

export const Navbar = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const { isAdmin } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Xbox', path: '/products?platform=Xbox', icon: Gamepad2 },
    { name: 'PlayStation', path: '/products?platform=PlayStation', icon: Tv },
    { name: 'PC', path: '/products?platform=PC', icon: Monitor },
    { name: 'Mobile', path: '/products?category=Mobile Top-Ups', icon: Smartphone },
    { name: 'Gift Cards', path: '/products?category=Gift Cards', icon: CreditCard },
    { name: 'Subscriptions', path: '/products?category=Subscriptions', icon: Sparkles },
    { name: 'Others', path: '/products?category=Others', icon: Layers },
    { name: 'Admin', path: isAdmin ? '/admin' : '/admin-login', icon: Shield, highlight: true }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname + location.search === path;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#05070f]/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg">
      {/* Top Bar Announcement */}
      <div className="bg-gradient-to-r from-blue-900/60 via-cyan-900/40 to-purple-900/60 border-b border-cyan-500/10 py-1.5 px-4 text-center text-xs font-medium text-cyan-300 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span>Instant Digital Delivery in Kurdistan & Iraq • FastPay, Korek & MasterCard Accepted</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5 shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
              <div className="w-full h-full bg-[#05070f] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                Dano Store
              </span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-cyan-500 -mt-1">
                Digital Gaming
              </span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <SearchBar />
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 text-slate-200 hover:text-cyan-400 transition-all duration-200 flex items-center gap-2 group"
              title="View Cart"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Cart & Toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200"
            >
              <ShoppingCart className="w-5 h-5 text-cyan-400" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-cyan-400 text-black font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden py-2.5 border-t border-slate-800/60">
          <SearchBar />
        </div>

        {/* Desktop Navigation Links Row */}
        <nav className="hidden lg:flex items-center gap-1 py-2 overflow-x-auto no-scrollbar border-t border-slate-800/60 text-xs font-semibold">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all duration-200 shrink-0 ${
                  active
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                    : link.highlight
                    ? 'text-purple-400 hover:bg-purple-950/40 border border-purple-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#090d1a] border-b border-slate-800 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-800/80 hover:text-cyan-400 transition-colors"
              >
                {Icon && <Icon className="w-4 h-4 text-cyan-400" />}
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
