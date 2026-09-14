import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Shield, Menu, X, Gamepad2, Search } from 'lucide-react';
import SearchBar from './SearchBar.jsx';
import { useCart } from '../hooks/useCart.jsx';

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Xbox', path: '/products?platform=xbox' },
    { name: 'PlayStation', path: '/products?platform=playstation' },
    { name: 'PC', path: '/products?platform=pc' },
    { name: 'Mobile', path: '/products?platform=mobile' },
    { name: 'Gift Cards', path: '/products?category=gift-cards' },
    { name: 'Subscriptions', path: '/products?category=subscriptions' },
    { name: 'Others', path: '/products?category=paid-games' },
    { name: 'Admin', path: '/admin' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#050505]/90 backdrop-blur-md">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900/60 via-cyan-900/40 to-purple-900/60 text-slate-200 text-[11px] sm:text-xs py-1.5 px-4 text-center border-b border-slate-800/50 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
        <span className="font-medium">
          ⚡ Instant Delivery on Gaming Top-Ups & Digital Cards in Kurdistan & Iraq | FastPay, Korek, MasterCard
        </span>
      </div>

      {/* Main Navbar Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
            <div className="w-full h-full bg-[#050505] rounded-[10px] flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold font-heading tracking-wider bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              DANO<span className="text-cyan-400">.STORE</span>
            </span>
          </div>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden md:block flex-1 max-w-md mx-4">
          <SearchBar />
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Toggle Button */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 text-slate-300 hover:text-cyan-400 md:hidden rounded-lg hover:bg-slate-900"
            aria-label="Toggle Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-slate-300 hover:text-cyan-400 rounded-lg hover:bg-slate-900 transition-colors flex items-center gap-2"
            aria-label="Cart"
          >
            <div className="relative">
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 shadow-md shadow-cyan-500/30">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-xs font-semibold text-slate-300">Cart</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-cyan-400 lg:hidden rounded-lg hover:bg-slate-900 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Expansion */}
      {isSearchOpen && (
        <div className="md:hidden px-4 pb-3 pt-1 border-t border-slate-800/60 bg-[#050505]">
          <SearchBar />
        </div>
      )}

      {/* Desktop Links Row */}
      <nav className="hidden lg:block border-t border-slate-800/60 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-1 overflow-x-auto py-1.5 scrollbar-none">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-800 text-cyan-400 font-bold border border-cyan-500/30'
                    : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-900'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#050505] px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-sm font-semibold text-slate-200 hover:text-cyan-400 hover:bg-slate-900 rounded-lg transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
