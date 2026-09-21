import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, ShieldCheck, Zap, UserCheck, Menu, X } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

export const Navbar = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const { isAdmin } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/products');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Xbox', path: '/products?platform=Xbox' },
    { name: 'PlayStation', path: '/products?platform=PlayStation' },
    { name: 'PC', path: '/products?platform=PC' },
    { name: 'Mobile', path: '/products?platform=Mobile' },
    { name: 'Gift Cards', path: '/products?category=gift-cards' },
    { name: 'Subscriptions', path: '/products?category=subscriptions' },
    { name: 'Others', path: '/products' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#050811]/95 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 text-slate-300 text-xs py-1.5 px-4 border-b border-cyan-500/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-cyan-500/20 text-cyan-400 font-bold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase">
              Notice
            </span>
            <span className="truncate">
              ⚡ Instant Digital Delivery across Kurdistan & Iraq • FastPay, Korek & MasterCard Accepted!
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1 hover:text-cyan-400 transition-colors cursor-default">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> 100% Legal & Safe
            </span>
            <span className="flex items-center gap-1 hover:text-cyan-400 transition-colors cursor-default">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Instant Key Transfer
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow duration-300">
            <div className="w-full h-full bg-[#050811] rounded-[10px] flex items-center justify-center">
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-xl tracking-tighter">
                DS
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              Dano Store
            </span>
            <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase -mt-1">
              Digital Gaming
            </span>
          </div>
        </Link>

        {/* Search Bar - Desktop */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-4 relative">
          <input
            type="text"
            placeholder="Search games, UC, gift cards, subscriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/90 text-slate-100 placeholder-slate-500 pl-10 pr-4 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <button
            type="submit"
            className="absolute right-2 top-1.5 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs px-2.5 py-1 rounded-lg transition-colors"
          >
            Search
          </button>
        </form>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Admin Link / Badge */}
          {isAdmin ? (
            <Link
              to="/admin"
              className="flex items-center gap-1.5 bg-purple-950/60 border border-purple-500/30 text-purple-300 hover:text-white px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-sm"
            >
              <UserCheck className="w-4 h-4 text-purple-400" />
              <span>Dashboard</span>
            </Link>
          ) : (
            <Link
              to="/admin-login"
              className="hidden sm:flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-800 transition-colors"
            >
              <span>Admin</span>
            </Link>
          )}

          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-slate-900 hover:bg-slate-800 text-slate-200 p-2.5 rounded-xl border border-slate-800 transition-colors flex items-center justify-center group"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 text-slate-300 group-hover:text-cyan-400 transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden bg-slate-900 p-2.5 rounded-xl text-slate-300 border border-slate-800"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Category Nav Links Bar */}
      <nav className="hidden md:block bg-[#080d1a] border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-1 py-1.5 overflow-x-auto scrollbar-none text-xs font-semibold">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  to={link.path}
                  className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-slate-900/60 transition-colors whitespace-nowrap block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#080d1a] border-b border-slate-800 px-4 py-4 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search store..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 text-slate-100 placeholder-slate-500 pl-10 pr-4 py-2 rounded-xl border border-slate-800 text-sm focus:outline-none focus:border-cyan-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </form>

          <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 bg-slate-900/80 hover:bg-slate-800 text-slate-300 rounded-lg text-xs"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin-login"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 bg-purple-950/40 text-purple-300 border border-purple-500/20 rounded-lg text-xs col-span-2 text-center"
            >
              Admin Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
