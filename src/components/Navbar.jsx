import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Gamepad2,
  ShoppingCart,
  Search,
  User,
  Menu,
  X,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';

export default function Navbar({ cartCount = 0, isAdmin = false }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Xbox', path: '/products?category=xbox' },
    { name: 'PlayStation', path: '/products?category=playstation' },
    { name: 'PC', path: '/products?category=pc' },
    { name: 'Mobile', path: '/products?category=mobile' },
    { name: 'Gift Cards', path: '/products?category=gift-cards' },
    { name: 'Subscriptions', path: '/products?category=subscriptions' },
    { name: 'Others', path: '/products?category=others' },
    { name: 'Admin', path: isAdmin ? '/admin' : '/admin-login' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#050811]/95 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-slate-300 text-xs py-1.5 px-4 text-center border-b border-slate-800/60 font-medium">
        <div className="container mx-auto flex items-center justify-center gap-2">
          <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] uppercase font-bold px-2 py-0.5 rounded">
            Fast Delivery
          </span>
          <span>Official Gaming Cards & Digital Products for Kurdistan & Iraq</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#050811] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white block leading-none">
                DANO<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 ml-1">STORE</span>
              </span>
              <span className="text-[9px] text-slate-400 font-bold tracking-widest uppercase block">
                Digital Gaming
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md relative mx-4"
          >
            <input
              type="text"
              placeholder="Search PUBG UC, Steam Cards, Paid Games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0d1322] text-slate-200 border border-slate-700/80 focus:border-cyan-500 rounded-full py-2 pl-4 pr-10 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-500"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Actions: Admin Status & Cart Icon */}
          <div className="flex items-center gap-3 shrink-0">
            {isAdmin && (
              <Link
                to="/admin"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-purple-950/80 text-purple-300 border border-purple-500/50 rounded-lg text-xs font-semibold hover:bg-purple-900 transition-colors"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Admin Panel</span>
              </Link>
            )}

            <Link
              to="/cart"
              className="relative flex items-center justify-center p-2.5 bg-slate-900 border border-slate-700/80 hover:border-cyan-500 text-slate-200 hover:text-cyan-400 rounded-xl transition-all shadow-sm"
              aria-label="View Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Nav Categories Bar */}
        <nav className="hidden lg:flex items-center justify-between gap-1 mt-3 pt-2 border-t border-slate-800/60 text-xs font-semibold">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-slate-900/80 transition-all flex items-center gap-1"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-800/80 flex flex-col gap-3">
            {/* Mobile Search Form */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search games & cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0d1322] text-slate-200 border border-slate-700 rounded-lg py-2 pl-3 pr-10 text-xs"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Mobile Links */}
            <div className="grid grid-cols-2 gap-1 py-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 bg-slate-900/60 border border-slate-800 rounded-lg text-slate-300 text-xs font-medium hover:text-cyan-400 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
