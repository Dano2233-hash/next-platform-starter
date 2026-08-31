import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Shield, Menu, X, Gamepad2, Sparkles } from 'lucide-react';

export default function Navbar({ cartCount = 0, onOpenCart }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
    { name: 'Mobile', path: '/products?category=mobile' },
    { name: 'Gift Cards', path: '/products?category=giftcards' },
    { name: 'Subscriptions', path: '/products?category=subscriptions' },
    { name: 'Others', path: '/products?category=games' },
  ];

  const isActiveLink = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && (location.pathname + location.search) === path) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#05070e]/95 backdrop-blur-md border-b border-slate-800/80 shadow-2xl">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-cyan-900 text-xs py-1.5 px-4 text-center border-b border-cyan-500/20 text-slate-200 font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span>Instant Digital Delivery in Kurdistan & Iraq | FastPay, Korek & MasterCard Accepted</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(0,102,255,0.4)] group-hover:scale-105 transition-all">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                Dano<span className="text-cyan-400">Store</span>
              </span>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest -mt-1">
                Digital Gaming
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search games, gift cards, UC, VP..."
              className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-500 rounded-xl py-2 pl-4 pr-10 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all"
            />
            <button
              type="submit"
              aria-label="Submit search"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-all"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Admin Link */}
            <Link
              to="/admin"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-cyan-400 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/30 transition-all"
            >
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>Admin</span>
            </Link>

            {/* Cart Icon */}
            <button
              onClick={onOpenCart}
              type="button"
              className="relative p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-200 transition-all"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5 text-cyan-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[10px] font-black flex items-center justify-center shadow-lg shadow-cyan-500/30 border border-slate-950 animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Category Navigation */}
        <nav className="hidden md:flex items-center gap-1 py-2 overflow-x-auto border-t border-slate-800/60 no-scrollbar text-xs font-semibold text-slate-300">
          {navLinks.map((link) => {
            const active = isActiveLink(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                  active
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold'
                    : 'hover:bg-slate-900 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            to="/admin"
            className="lg:hidden px-3.5 py-1.5 rounded-lg text-cyan-400 hover:bg-slate-900 font-bold ml-auto"
          >
            Admin
          </Link>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070b14] border-b border-slate-800 px-4 py-4 space-y-3 animate-fadeIn">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search store..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-4 pr-10 text-xs text-slate-100"
            />
            <button type="submit" aria-label="Submit search" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="w-4 h-4" />
            </button>
          </form>

          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-cyan-400 border border-slate-800/80"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-cyan-950/40 text-cyan-300 font-bold border border-cyan-500/30 flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5" />
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
