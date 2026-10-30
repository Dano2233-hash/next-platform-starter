import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, ShieldCheck, Gamepad2, Menu, X, UserCheck } from 'lucide-react';
import SearchBar from './SearchBar';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItemCount } = useCart();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Xbox', path: '/products?platform=xbox' },
    { label: 'PlayStation', path: '/products?platform=playstation' },
    { label: 'PC', path: '/products?platform=pc' },
    { label: 'Mobile', path: '/products?platform=mobile' },
    { label: 'Gift Cards', path: '/products?category=gift-cards' },
    { label: 'Subscriptions', path: '/products?category=subscriptions' },
    { label: 'Others', path: '/products' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#05070f]/95 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[1.5px] shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#05070f] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400 bg-clip-text text-transparent">
                Dano Store
              </span>
              <span className="text-[9px] font-semibold text-slate-400 -mt-1 tracking-widest uppercase">
                Kurdistan / Iraq
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <SearchBar />
          </div>

          {/* Desktop Nav Actions */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.slice(0, 6).map((link) => {
              const isActive = location.pathname + location.search === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? 'text-cyan-400 bg-cyan-500/10'
                      : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Controls: Cart + Admin + Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-cyan-500/50 hover:bg-slate-800 text-slate-100 transition-all cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold hidden sm:inline">Cart</span>
              {cartItemCount > 0 && (
                <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-extrabold text-[11px] shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Admin Link */}
            <Link
              to={isAdmin ? '/admin' : '/admin-login'}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                isAdmin
                  ? 'bg-purple-950/60 border-purple-500/50 text-purple-300 hover:bg-purple-900/60'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {isAdmin ? <UserCheck className="w-3.5 h-3.5 text-purple-400" /> : <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />}
              <span className="hidden sm:inline">{isAdmin ? 'Dashboard' : 'Admin'}</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 lg:hidden cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="block md:hidden pb-3">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#05070f] px-4 py-3 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-xs font-semibold bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
