import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, ShieldCheck, User, Menu, X, Gamepad2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { totalItems } = useCart();
  const { isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
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
    { name: 'Others', path: '/products' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#05070f]/95 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900/60 via-purple-900/60 to-cyan-900/60 border-b border-cyan-500/20 py-1.5 px-4 text-xs font-medium text-center text-cyan-200 flex items-center justify-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
        <span>Official Kurdistan & Iraq Gaming Store - 100% Instant & Secure FastPay, Korek & MasterCard Delivery!</span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
              <Gamepad2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-orbitron font-extrabold text-xl tracking-wider text-white group-hover:text-cyan-400 transition-colors">
              DANO <span className="text-cyan-400">STORE</span>
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center flex-1 max-w-sm relative">
            <input
              type="text"
              placeholder="Search games, gift cards, UC..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0c1224] border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          </form>

          {/* Navigation Links - Desktop */}
          <nav className="hidden xl:flex items-center gap-1 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = location.pathname + location.search === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    isActive
                      ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-500/30'
                      : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-900/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Admin Link */}
            <Link
              to={isAdmin ? '/admin' : '/admin-login'}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
            >
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isAdmin ? 'Admin' : 'Admin'}</span>
            </Link>

            {/* Cart Button */}
            <Link
              to="/cart"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-md shadow-cyan-500/20 transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-slate-950" />
              <span className="hidden sm:inline">Cart</span>
              <span className="bg-slate-950 text-cyan-400 px-2 py-0.5 rounded-full text-xs font-mono font-extrabold ml-0.5">
                {totalItems}
              </span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-800 bg-[#070b18] px-4 pt-3 pb-6 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search games, gift cards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0c1224] border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          </form>

          <div className="grid grid-cols-2 gap-2 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md bg-slate-900/80 border border-slate-800/80 text-slate-200 hover:text-cyan-400"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to={isAdmin ? '/admin' : '/admin-login'}
              onClick={() => setMobileMenuOpen(false)}
              className="col-span-2 px-3 py-2 rounded-md bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-center font-semibold"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
