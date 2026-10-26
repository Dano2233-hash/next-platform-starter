import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Gamepad2,
  ShoppingCart,
  Shield,
  Menu,
  X,
  Smartphone,
  CreditCard,
  Zap,
  Globe,
  Layers,
  Sparkles
} from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import SearchBar from './SearchBar';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Xbox', path: '/products?platform=Xbox' },
    { name: 'PlayStation', path: '/products?platform=PlayStation' },
    { name: 'PC', path: '/products?platform=PC' },
    { name: 'Mobile', path: '/products?platform=Mobile' },
    { name: 'Gift Cards', path: '/products?category=giftcards' },
    { name: 'Subscriptions', path: '/products?category=subscriptions' },
    { name: 'Others', path: '/products?category=all' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname + location.search === path;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#05070f]/95 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900/60 via-cyan-900/40 to-purple-900/60 border-b border-cyan-500/10 text-slate-300 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center space-x-2">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span>Instant Digital Delivery in Kurdistan & Iraq • Pay via FastPay, Korek & MasterCard</span>
      </div>

      {/* Main Navbar Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
              <div className="w-full h-full bg-[#05070f] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                DANO<span className="text-cyan-400">STORE</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">Digital Gaming</span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <SearchBar />
          </div>

          {/* Actions & Admin & Cart */}
          <div className="flex items-center space-x-3 shrink-0">
            {isAdmin ? (
              <div className="flex items-center space-x-2">
                <Link
                  to="/admin"
                  className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Panel</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate('/admin-login');
                  }}
                  className="text-xs font-medium text-slate-400 hover:text-red-400 transition-colors px-2 py-1"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/admin-login"
                className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-medium text-slate-400 hover:text-cyan-400 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-slate-800/50"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin</span>
              </Link>
            )}

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center justify-center p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 hover:text-cyan-400 text-slate-200 transition-all duration-200"
              aria-label="View Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[11px] font-bold flex items-center justify-center shadow-lg shadow-cyan-500/50">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3 pt-1">
          <SearchBar />
        </div>

        {/* Category Navigation Bar (Desktop) */}
        <nav className="hidden md:flex items-center space-x-1 py-2 border-t border-slate-800/50 overflow-x-auto no-scrollbar">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition-all duration-200 ${
                  active
                    ? 'bg-blue-600/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
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
        <div className="md:hidden bg-[#0a0f24] border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-xs font-semibold px-3 py-2.5 rounded-lg transition-colors text-center ${
                  isActive(link.path)
                    ? 'bg-blue-600/20 text-cyan-400 border border-cyan-500/30'
                    : 'bg-slate-900 text-slate-300 border border-slate-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
            {isAdmin ? (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-cyan-400 font-semibold flex items-center space-x-1"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Go to Admin Panel</span>
              </Link>
            ) : (
              <Link
                to="/admin-login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-400 hover:text-cyan-400 flex items-center space-x-1"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Login</span>
              </Link>
            )}
            <span className="text-slate-500">IQD Only</span>
          </div>
        </div>
      )}
    </header>
  );
}
