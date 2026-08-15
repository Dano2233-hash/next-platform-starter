import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Gamepad2,
  ShoppingCart,
  Search,
  UserCheck,
  Menu,
  X,
  Smartphone,
  Monitor,
  Tv,
  CreditCard,
  Zap,
  Grid,
  ShieldAlert
} from 'lucide-react';

export default function Navbar({ cartCount, isAdmin }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
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
    { name: 'Others', path: '/products' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#050811]/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-purple-950 border-b border-slate-800 text-xs py-1.5 px-4 text-center text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden sm:inline font-medium text-cyan-400">
            ⚡ Fast & Instant Digital Delivery in Kurdistan & Iraq
          </span>
          <span className="mx-auto sm:mx-0 font-medium">
            🔥 Special Deals on PUBG UC, Steam Wallet & Discord Nitro!
          </span>
          <span className="hidden md:inline text-slate-400">
            Payment via <strong className="text-white font-semibold">FastPay, Korek & MasterCard</strong>
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5 shadow-lg shadow-blue-500/20 group-hover:shadow-cyan-500/30 transition-all">
              <div className="w-full h-full bg-[#050811] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-wider text-white flex items-center gap-1">
                DANO <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">STORE</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold -mt-1">
                Digital Gaming
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search games, UC, gift cards, subscriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 text-sm text-slate-100 placeholder-slate-500 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </form>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Admin Link */}
            <Link
              to={isAdmin ? '/admin' : '/admin-login'}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                isAdmin
                  ? 'bg-purple-950/60 border-purple-500/50 text-purple-300 hover:bg-purple-900/60'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-purple-400" />
              {isAdmin ? 'Admin Panel' : 'Admin'}
            </Link>

            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md transition-all"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to="/cart"
              className="relative p-2 text-slate-300 hover:text-white bg-slate-900 rounded-lg border border-slate-800"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-[16px] text-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white bg-slate-900 rounded-lg border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Category Navigation */}
        <nav className="hidden lg:flex items-center justify-between py-2 border-t border-slate-800/60 text-xs font-semibold">
          <div className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname + location.search === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600/20 text-cyan-400 border border-blue-500/30'
                      : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-900/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <Link
            to="/products"
            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-bold"
          >
            <Grid className="w-3.5 h-3.5" /> All Store Items
          </Link>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 pt-2 border-t border-slate-800 space-y-3">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search store..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 text-sm text-slate-100 placeholder-slate-500 border border-slate-800 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-cyan-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </form>

            {/* Mobile Nav Links */}
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 bg-slate-900/60 border border-slate-800 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:border-cyan-500/50"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to={isAdmin ? '/admin' : '/admin-login'}
                onClick={() => setMobileMenuOpen(false)}
                className="col-span-2 px-3 py-2 bg-purple-950/40 border border-purple-800/50 rounded-lg text-xs font-semibold text-purple-300 text-center flex items-center justify-center gap-1.5"
              >
                <UserCheck className="w-3.5 h-3.5" />
                {isAdmin ? 'Admin Dashboard' : 'Admin Login'}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
