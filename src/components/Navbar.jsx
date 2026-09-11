import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, ShieldCheck, Gamepad2, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems, setIsCartOpen } = useCart();
  const { isAdmin } = useAuth();
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
    { name: 'Home', path: '/' },
    { name: 'Xbox', path: '/products?platform=Xbox' },
    { name: 'PlayStation', path: '/products?platform=PlayStation' },
    { name: 'PC', path: '/products?platform=PC' },
    { name: 'Mobile', path: '/products?category=mobile' },
    { name: 'Gift Cards', path: '/products?category=gift-cards' },
    { name: 'Subscriptions', path: '/products?category=subscriptions' },
    { name: 'Others', path: '/products' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#07090e]/90 border-b border-slate-800/80 shadow-2xl">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900/60 via-purple-900/60 to-cyan-900/60 text-slate-200 text-xs py-1.5 px-4 text-center border-b border-white/5 font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span>Instant Digital Delivery across Kurdistan & Iraq • FastPay, Korek & MasterCard Accepted</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-600 flex items-center justify-center text-white font-extrabold shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Gamepad2 className="w-5 h-5 text-slate-950" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                DANO <span className="text-cyan-400">STORE</span>
              </span>
              <span className="text-[10px] text-slate-400 -mt-1 font-semibold tracking-wider uppercase">Gaming & Cards</span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-sm relative">
            <input
              type="text"
              placeholder="Search games, UC, gift cards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-full py-2 pl-4 pr-10 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Actions: Admin & Cart */}
          <div className="flex items-center gap-3">
            <Link
              to={isAdmin ? '/admin' : '/admin-login'}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-300 hover:text-cyan-400 hover:border-slate-700 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>{isAdmin ? 'Dashboard' : 'Admin'}</span>
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-[11px] min-w-[20px] h-[20px] px-1 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/40">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Navigation Categories Row (Desktop) */}
        <nav className="hidden md:flex items-center space-x-1 py-2 border-t border-slate-800/40 overflow-x-auto text-xs font-semibold text-slate-300">
          {navLinks.map((link) => {
            const isActive = location.pathname + location.search === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600/30 to-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'hover:text-white hover:bg-slate-900'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0e17] border-b border-slate-800 px-4 py-4 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 pl-3 pr-9 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
            />
            <button type="submit" className="absolute right-2 top-2.5 text-slate-400">
              <Search className="w-4 h-4" />
            </button>
          </form>

          <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-cyan-400"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to={isAdmin ? '/admin' : '/admin-login'}
              onClick={() => setMobileMenuOpen(false)}
              className="col-span-2 px-3 py-2 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-center font-bold"
            >
              {isAdmin ? 'Admin Dashboard' : 'Admin Login'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
