import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Gamepad2,
  Search,
  ShoppingBag,
  Menu,
  X,
  ShieldCheck,
  Zap,
  UserCheck
} from 'lucide-react';
import { useCart } from '../hooks/useCart.jsx';
import { useAuth } from '../hooks/useAuth.jsx';

export const Navbar = () => {
  const { cartCount, toggleCart } = useCart();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Xbox', path: '/products?platform=Xbox' },
    { label: 'PlayStation', path: '/products?platform=PlayStation' },
    { label: 'PC', path: '/products?platform=PC' },
    { label: 'Mobile', path: '/products?platform=Mobile' },
    { label: 'Gift Cards', path: '/products?category=Gift Cards' },
    { label: 'Subscriptions', path: '/products?category=Subscriptions' },
    { label: 'Others', path: '/products?category=Others' },
    { label: 'Admin', path: isAdmin ? '/admin' : '/admin-login' }
  ];

  const isActive = (path) => {
    return location.pathname + location.search === path;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#05070f]/95 backdrop-blur-md border-b border-gray-800/80">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900/60 via-purple-900/50 to-blue-900/60 border-b border-blue-500/20 py-1.5 px-4 text-xs font-semibold text-cyan-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Fast Digital Delivery in Kurdistan & Iraq | FastPay, Korek & MasterCard</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] text-gray-300">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> 100% Guaranteed
            </span>
            <span>IQD Currency Only</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#05070f] rounded-[10px] flex items-center justify-center text-cyan-400">
                <Gamepad2 className="w-6 h-6 stroke-[2.2]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold text-white tracking-wider leading-none">
                DANO <span className="text-cyan-400">STORE</span>
              </span>
              <span className="text-[10px] text-gray-400 tracking-widest font-bold uppercase mt-0.5">
                Gaming Store
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`px-3 py-1.5 text-xs xl:text-sm font-bold rounded-lg transition-all ${
                  isActive(link.path)
                    ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-800/50'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                {link.label === 'Admin' && isAdmin ? (
                  <span className="flex items-center gap-1 text-purple-400">
                    <UserCheck className="w-3.5 h-3.5" /> Admin
                  </span>
                ) : (
                  link.label
                )}
              </Link>
            ))}
          </nav>

          {/* Search & Cart Icons */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Bar Desktop */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex relative w-48 xl:w-64">
              <input
                type="text"
                placeholder="Search games, UC..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#090e1f] text-xs text-white placeholder-gray-500 rounded-full pl-9 pr-3 py-2 border border-gray-800 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </form>

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="relative p-2.5 bg-[#090e1f] border border-gray-800 hover:border-cyan-500/50 text-gray-200 hover:text-cyan-400 rounded-xl transition-all shadow-md group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-gray-950 text-[11px] font-black rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30 animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 bg-[#090e1f] border border-gray-800 text-gray-300 hover:text-white rounded-xl"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3 pt-1">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Search games, gift cards, UC..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#090e1f] text-xs text-white placeholder-gray-500 rounded-xl pl-9 pr-3 py-2.5 border border-gray-800 focus:outline-none focus:border-cyan-500"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          </form>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070b18] border-b border-gray-800 px-4 py-4 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
                isActive(link.path)
                  ? 'text-cyan-400 bg-cyan-950/50 border border-cyan-800/40'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/40'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
