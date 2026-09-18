import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  Gamepad2,
  ShieldCheck,
  UserCheck,
  Zap,
  Sparkles,
  CreditCard,
  Smartphone
} from 'lucide-react';

export function Navbar({ cartCount = 0, onOpenCart }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

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
    { name: 'Gift Cards', path: '/products?category=gift-cards' },
    { name: 'Subscriptions', path: '/products?category=subscriptions' },
    { name: 'Others', path: '/products' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#050811]/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-cyan-950 via-blue-900 to-purple-950 border-b border-cyan-500/20 text-slate-200 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Zap class="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span>Fast Delivery across Kurdistan & Iraq • Instant Codes & Safe Top-Ups</span>
        <span className="hidden md:inline bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded border border-cyan-500/30">
          FastPay / Korek / MasterCard
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
              <div className="w-full h-full bg-[#050811] rounded-[10px] flex items-center justify-center">
                <Gamepad2 class="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                DANO STORE
              </span>
              <span className="text-[9px] text-cyan-400/80 font-bold uppercase tracking-widest -mt-1">
                Digital Gaming
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md mx-4 relative"
          >
            <input
              type="text"
              placeholder="Search games, UC, Diamonds, V-Bucks, Gift Cards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 text-sm text-slate-100 placeholder-slate-400 pl-10 pr-4 py-2 rounded-xl border border-slate-700/80 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all"
            />
            <Search class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white px-2.5 py-1 rounded-lg transition-colors"
            >
              Search
            </button>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Admin Link */}
            <Link
              to="/admin"
              className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-cyan-400 bg-slate-900/60 hover:bg-slate-800 border border-slate-800 px-3 py-2 rounded-xl transition-all"
            >
              <UserCheck class="w-4 h-4 text-cyan-400" />
              <span>Admin</span>
            </Link>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-sm px-4 py-2 rounded-xl shadow-lg shadow-cyan-600/20 hover:shadow-cyan-500/30 transition-all active:scale-95 cursor-pointer"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag class="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-purple-500 text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-[#050811] shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white rounded-xl bg-slate-900 border border-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X class="w-5 h-5" /> : <Menu class="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Category Navigation */}
        <nav className="hidden md:flex items-center justify-between border-t border-slate-800/60 py-2 text-xs font-semibold overflow-x-auto text-slate-300 no-scrollbar">
          <div className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="px-3 py-1.5 rounded-lg hover:text-cyan-400 hover:bg-slate-900/80 transition-colors whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-[11px] font-normal pl-4 border-l border-slate-800">
            <ShieldCheck class="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Legal Digital Codes</span>
          </div>
        </nav>

        {/* Mobile Expanded Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 text-sm text-slate-100 placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500"
              />
              <Search class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </form>

            <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-slate-900/80 hover:bg-slate-800 border border-slate-800/80 text-slate-200 hover:text-cyan-400 px-3 py-2.5 rounded-xl transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="col-span-2 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 border border-slate-700 text-cyan-400 font-bold px-3 py-2.5 rounded-xl flex items-center justify-center gap-2 text-center"
              >
                <UserCheck class="w-4 h-4" />
                <span>Admin Dashboard</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
