import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Shield, Menu, X, Gamepad2, Sparkles, ChevronRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import SearchBar from './SearchBar';

export function Navbar() {
  const { totalItemsCount, setIsDrawerOpen } = useCart();
  const { isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Xbox', path: '/products?platform=Xbox' },
    { name: 'PlayStation', path: '/products?platform=PlayStation' },
    { name: 'PC', path: '/products?platform=PC' },
    { name: 'Mobile', path: '/products?platform=Mobile' },
    { name: 'Gift Cards', path: '/products?category=gift-cards' },
    { name: 'Subscriptions', path: '/products?category=subscriptions' },
    { name: 'Others', path: '/products?category=others' },
    { name: 'Admin', path: isAdmin ? '/admin' : '/admin-login' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#05070f]/95 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900/60 via-purple-900/50 to-cyan-900/60 border-b border-cyan-500/20 py-1.5 px-4 text-xs font-medium text-center text-slate-200">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 mx-auto">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>
              ⚡ Kurdistan & Iraq Official Digital Store — Instant Delivery via FastPay, Korek & MasterCard!
            </span>
          </div>
          <span className="hidden md:inline-block text-[11px] text-cyan-300 font-semibold px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-800/60">
            IQD Only
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5 shadow-lg shadow-cyan-900/30 group-hover:shadow-cyan-500/30 transition-all">
              <div className="w-full h-full bg-[#080d1e] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1 font-mono">
                DANO <span className="text-cyan-400">STORE</span>
              </span>
              <span className="text-[10px] text-slate-400 -mt-1 tracking-wider uppercase font-semibold">
                Gaming & Top-Ups
              </span>
            </div>
          </Link>

          {/* Search bar in Center */}
          <div className="hidden lg:flex flex-1 max-w-md mx-6">
            <SearchBar />
          </div>

          {/* Actions: Admin button & Cart button & Mobile hamburger */}
          <div className="flex items-center gap-3">
            {/* Admin Badge/Link */}
            <Link
              to={isAdmin ? '/admin' : '/admin-login'}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-cyan-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 transition-all"
            >
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isAdmin ? 'Dashboard' : 'Admin'}</span>
            </Link>

            {/* Cart Icon with Live Counter */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-cyan-950/50 hover:shadow-cyan-600/30 transition-all cursor-pointer"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              <span className="flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-slate-950 text-cyan-300 text-xs font-bold border border-cyan-400/40">
                {totalItemsCount}
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 lg:hidden">
          <SearchBar />
        </div>

        {/* Navigation Categories Row */}
        <nav className="hidden lg:flex items-center justify-center gap-1 pt-3 mt-2 border-t border-slate-800/60 text-xs font-semibold">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg transition-all ${
                  isActive
                    ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-800/40'
                    : 'text-slate-300 hover:text-cyan-300 hover:bg-slate-800/60'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070b18] border-b border-slate-800 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-cyan-400 border border-transparent hover:border-slate-700"
            >
              <span>{link.name}</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export default Navbar;
