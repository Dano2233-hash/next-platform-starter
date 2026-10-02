import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ShoppingBag,
  Search,
  Gamepad2,
  Smartphone,
  Gift,
  Sparkles,
  ShieldAlert,
  Menu,
  X,
  Layers,
  ChevronDown,
  Lock,
  Flame,
  Check
} from 'lucide-react';
import { useCart } from '../hooks/useCart';

export const Navbar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { cartItemCount } = useCart();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/products');
    }
  };

  const categoriesNav = [
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
    <header className="sticky top-0 z-50 bg-[#05070f]/95 backdrop-blur-md border-b border-slate-800/80">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900/60 via-purple-900/60 to-cyan-900/60 border-b border-cyan-500/20 text-xs py-1.5 px-4 text-center font-medium text-slate-200 flex items-center justify-center gap-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
        <span>🔥 Instant Digital Delivery in Kurdistan & Iraq | FastPay, Korek & MasterCard Accepted</span>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-heading">
                DANO STORE
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold -mt-1">
                Digital Gaming
              </span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md relative items-center"
          >
            <input
              type="text"
              placeholder="Search games, UC, gift cards, subscriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 text-sm text-slate-100 placeholder-slate-400 rounded-xl pl-10 pr-20 py-2 border border-slate-800 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <button
              type="submit"
              className="absolute right-1.5 px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs font-bold border border-cyan-500/30 hover:bg-cyan-500 hover:text-slate-950 transition-colors"
            >
              Search
            </button>
          </form>

          {/* Actions: Admin & Cart */}
          <div className="flex items-center gap-3">
            <Link
              to="/admin"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-slate-300 hover:text-cyan-400 border border-slate-800 text-xs font-semibold transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              Admin
            </Link>

            <Link
              to="/cart"
              className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-600/10 hover:from-cyan-500/20 hover:to-blue-600/20 border border-cyan-500/30 text-cyan-300 transition-all relative group"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-cyan-400" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-500 text-white font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-bold hidden sm:inline">Cart</span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <form onSubmit={handleSearchSubmit} className="mt-3 md:hidden relative">
          <input
            type="text"
            placeholder="Search games, top-ups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 text-sm text-slate-100 placeholder-slate-400 rounded-xl pl-10 pr-10 py-2 border border-slate-800 focus:outline-none focus:border-cyan-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
        </form>

        {/* Category Navigation Bar - Desktop */}
        <nav className="hidden md:flex items-center gap-1 mt-3 pt-2 border-t border-slate-800/60 text-xs font-semibold overflow-x-auto no-scrollbar">
          {categoriesNav.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="px-3.5 py-1.5 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-slate-900 transition-all whitespace-nowrap"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-4 space-y-1">
          {categoriesNav.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-900 hover:text-cyan-400 font-medium"
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm text-cyan-400 bg-slate-900 font-bold border border-slate-800"
          >
            Admin Dashboard
          </Link>
        </div>
      )}
    </header>
  );
};
