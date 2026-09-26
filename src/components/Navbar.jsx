import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, ShieldCheck, Gamepad2, Menu, X, Flame } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export const Navbar = () => {
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Xbox', path: '/products?category=xbox' },
    { name: 'PlayStation', path: '/products?category=playstation' },
    { name: 'PC', path: '/products?category=pc' },
    { name: 'Mobile', path: '/products?category=mobile' },
    { name: 'Gift Cards', path: '/products?category=gift-cards' },
    { name: 'Subscriptions', path: '/products?category=subscriptions' },
    { name: 'Others', path: '/products?category=others' },
    { name: 'Admin', path: '/admin' },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#05070f]/95 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900/60 via-cyan-900/40 to-purple-900/60 border-b border-cyan-500/20 py-1.5 px-4 text-center text-xs font-semibold text-cyan-200 flex items-center justify-center gap-2">
        <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
        <span>Instant Digital Delivery in Kurdistan &amp; Iraq | FastPay, Korek &amp; MasterCard Accepted</span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5 shadow-lg shadow-cyan-950/50 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#070b19] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-wider bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent">
                DANO STORE
              </span>
              <span className="text-[9px] uppercase tracking-widest text-cyan-400 font-bold -mt-1">
                Digital Gaming
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <input
              type="text"
              placeholder="Search games, UC, VP, V-Bucks, gift cards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a0f24] border border-slate-700 focus:border-cyan-400 text-slate-100 placeholder-slate-400 text-xs rounded-xl py-2 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Right Actions: Cart & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-cyan-400 text-slate-200 hover:text-cyan-400 transition-all flex items-center justify-center"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#05070f] shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-200 hover:text-cyan-400"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Nav Navigation Bar */}
        <nav className="hidden md:flex items-center gap-1 py-2 overflow-x-auto border-t border-slate-800/40">
          {navLinks.map((link) => {
            const isActive = location.pathname + location.search === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Search & Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800 space-y-3">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0a0f24] border border-slate-700 text-slate-100 placeholder-slate-400 text-xs rounded-xl py-2 pl-4 pr-10 focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 text-slate-400"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            <div className="grid grid-cols-2 gap-2 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:text-cyan-400 text-xs font-semibold text-center"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
