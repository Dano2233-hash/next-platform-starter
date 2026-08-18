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
  Tv,
  Monitor,
  CreditCard,
  Zap,
  Shield,
  Layers
} from 'lucide-react';
import { SearchBar } from './SearchBar';

export function Navbar({ cartCount = 0, onOpenCart, isAdmin = false, onSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (navSearch.trim()) {
        if (onSearch) onSearch(navSearch);
        navigate(`/products?search=${encodeURIComponent(navSearch.trim())}`);
      }
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
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Bar / Announcement */}
      <div className="bg-gradient-to-r from-blue-900/60 via-slate-900 to-purple-900/60 border-b border-slate-800/50 py-1.5 px-4 text-center text-xs text-slate-300 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span className="font-semibold text-cyan-300">Fast Delivery in Kurdistan & Iraq:</span>
        <span className="hidden sm:inline">Pay via FastPay, Korek Cash & FIB MasterCard</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1">
                Dano <span className="text-cyan-400">Store</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono -mt-1 tracking-wider uppercase">
                Digital Gaming
              </span>
            </div>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <div className="relative">
              <SearchBar
                searchTerm={navSearch}
                setSearchTerm={(val) => {
                  setNavSearch(val);
                  if (onSearch) onSearch(val);
                }}
                placeholder="Search PUBG, Steam Cards, GTA V..."
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Admin Link */}
            <Link
              to={isAdmin ? '/admin' : '/admin-login'}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300 bg-slate-900 border border-slate-800 hover:border-cyan-500/40 hover:text-cyan-300 transition-all"
            >
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isAdmin ? 'Dashboard' : 'Admin'}</span>
            </Link>

            {/* Cart Icon */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400/50 text-white transition-all group"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-950 shadow-md">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
            >
              <ShoppingCart className="w-5 h-5 text-cyan-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-cyan-500 text-slate-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden lg:block border-t border-slate-800/60 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-start gap-1 py-1.5 text-xs font-bold text-slate-300 overflow-x-auto">
            {navLinks.map((link) => {
              const isActive = location.pathname + location.search === link.path;
              return (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                      isActive
                        ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-500/30'
                        : 'hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 p-4 space-y-4">
          <div className="mb-3">
            <SearchBar
              searchTerm={navSearch}
              setSearchTerm={(val) => {
                setNavSearch(val);
                if (onSearch) onSearch(val);
              }}
              placeholder="Search store..."
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:text-cyan-400 hover:border-cyan-500/30 text-center"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-3">
            <Link
              to={isAdmin ? '/admin' : '/admin-login'}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 font-bold text-xs"
            >
              <Shield className="w-4 h-4" />
              <span>{isAdmin ? 'Admin Dashboard' : 'Admin Login'}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
