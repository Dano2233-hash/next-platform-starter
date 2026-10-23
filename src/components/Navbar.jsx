import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Search,
  ShieldCheck,
  Menu,
  X,
  Gamepad2,
  Box,
  Tv,
  Monitor,
  Smartphone,
  Gift,
  Zap,
  UserCheck
} from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { cartCount, openCart } = useCart();
  const { isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Gamepad2 },
    { name: 'Xbox', path: '/products?category=xbox', icon: Box },
    { name: 'PlayStation', path: '/products?category=playstation', icon: Tv },
    { name: 'PC', path: '/products?category=pc', icon: Monitor },
    { name: 'Mobile', path: '/products?category=mobile-topups', icon: Smartphone },
    { name: 'Gift Cards', path: '/products?category=gift-cards', icon: Gift },
    { name: 'Subscriptions', path: '/products?category=subscriptions', icon: Zap },
    { name: 'Others', path: '/products', icon: Gamepad2 },
    { name: 'Admin', path: isAdmin ? '/admin' : '/admin-login', icon: UserCheck },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname + location.search === path || (location.pathname === '/products' && path.startsWith('/products?'));
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900/60 via-purple-900/60 to-slate-900 px-4 py-1.5 text-center text-xs font-semibold text-cyan-300 border-b border-cyan-500/10 flex items-center justify-center space-x-2">
        <ShieldCheck className="w-4 h-4 text-cyan-400" />
        <span>Instant Digital Delivery in Kurdistan & Iraq | FastPay, Korek & MasterCard Accepted</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
              <Gamepad2 className="w-6 h-6 text-slate-950 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                Dano<span className="text-cyan-400 font-black">Store</span>
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold -mt-1">
                Gaming Store
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden lg:flex flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search games, UC, Diamonds, cards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 text-slate-100 text-xs font-medium placeholder-slate-500 rounded-xl px-4 py-2.5 pl-10 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <button
              type="submit"
              className="absolute right-2 top-1.5 px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-[11px] font-bold rounded-lg border border-cyan-500/30 transition-all"
            >
              Search
            </button>
          </form>

          {/* Right Actions: Cart & Mobile Toggle */}
          <div className="flex items-center space-x-3">
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 text-slate-200 hover:text-cyan-400 transition-all flex items-center space-x-2"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline text-xs font-bold">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-lg border border-slate-950">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Link Row */}
        <nav className="hidden lg:flex items-center space-x-1 py-2 border-t border-slate-800/60 overflow-x-auto text-xs font-semibold">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all shrink-0 ${
                  active
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 px-4 py-4 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search games, top-ups, cards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 text-slate-100 text-xs font-medium placeholder-slate-500 rounded-xl px-4 py-2.5 pl-10 border border-slate-800 focus:border-cyan-500 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </form>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 text-slate-200 text-xs font-semibold hover:border-cyan-500/40"
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
