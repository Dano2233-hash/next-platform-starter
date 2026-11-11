import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Shield, Menu, X, Gamepad2, Sparkles } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import SearchBar from './SearchBar';

export function Navbar() {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

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
    <header className="sticky top-0 z-50 w-full bg-[#070b16]/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900/60 via-purple-900/50 to-cyan-900/60 border-b border-cyan-500/20 px-4 py-1.5 text-xs text-center text-slate-200">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Kurdistan & Iraq’s #1 Digital Gaming Store • Instant WhatsApp Support • Direct IQD Payments (FastPay, Korek, MasterCard)</span>
        </span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
              <div className="w-full h-full bg-[#070b16] rounded-xl flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent">
                Dano Store
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 -mt-1">
                Digital Gaming
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <SearchBar />
          </div>

          {/* Right Section: Admin & Cart & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Admin Link */}
            <Link
              to="/admin"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span>Admin</span>
            </Link>

            {/* Cart Icon with Counter */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 text-slate-200 hover:text-white transition-all shadow-sm group"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform text-cyan-400" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-xs rounded-full flex items-center justify-center shadow-md animate-in zoom-in-50">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 border-t border-slate-800/60 py-2 overflow-x-auto no-scrollbar">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-xs font-medium tracking-wide transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070b16] border-b border-slate-800 px-4 pt-2 pb-4 space-y-3">
          <div className="pt-1 pb-2">
            <SearchBar onSearch={(q) => {
              setMobileMenuOpen(false);
              navigate(`/products?search=${encodeURIComponent(q)}`);
            }} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-xs font-medium text-slate-200 bg-slate-900/80 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/30"
              >
                {link.name}
              </NavLink>
            ))}
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-xs font-semibold text-purple-300 bg-purple-950/30 border border-purple-500/30 flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
