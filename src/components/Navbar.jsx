import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, Shield, Sparkles, UserCheck } from 'lucide-react';

export default function Navbar({ cartCount = 0, onSearch, isAdmin = false, onOpenCart }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
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
    <header className="sticky top-0 z-50 w-full bg-[#050505]/95 backdrop-blur-md border-b border-slate-800">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-700 via-cyan-600 to-purple-700 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span>Official Digital Gaming Store for Kurdistan & Iraq — Instant Delivery via FastPay, Korek & MasterCard!</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 border border-cyan-400/30">
              <span className="font-black text-xl text-white tracking-tighter">DS</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent">
                Dano Store
              </span>
              <span className="text-[10px] text-cyan-400 font-semibold tracking-widest uppercase -mt-1">
                Digital Gaming
              </span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search games, top-ups, gift cards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 text-sm text-slate-100 placeholder-slate-400 rounded-full py-2.5 pl-10 pr-4 border border-slate-700/80 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          </form>

          {/* Right Actions: Admin & Cart */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to={isAdmin ? "/admin" : "/admin-login"}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition"
            >
              {isAdmin ? (
                <>
                  <UserCheck className="w-3.5 h-3.5 text-green-400" />
                  <span>Admin Panel</span>
                </>
              ) : (
                <>
                  <Shield className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Admin</span>
                </>
              )}
            </Link>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/20 transition duration-200 active:scale-95"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="ml-1 bg-white text-cyan-900 font-extrabold text-xs px-2 py-0.5 rounded-full shadow-inner">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Navigation Bar Links - Desktop */}
        <nav className="hidden lg:flex items-center space-x-1 py-2.5 border-t border-slate-800/60 overflow-x-auto text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="px-3.5 py-1.5 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-slate-900/80 transition-colors whitespace-nowrap"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#090d16] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <input
              type="text"
              placeholder="Search store..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 text-sm text-slate-100 placeholder-slate-400 rounded-lg py-2 pl-9 pr-4 border border-slate-800 focus:outline-none focus:border-cyan-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </form>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-slate-900 text-slate-200 hover:text-cyan-400 text-sm font-medium border border-slate-800/80"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to={isAdmin ? "/admin" : "/admin-login"}
              onClick={() => setMobileMenuOpen(false)}
              className="col-span-2 px-3 py-2 rounded-lg bg-slate-900 text-cyan-400 border border-cyan-500/30 text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4" />
              <span>{isAdmin ? "Admin Dashboard" : "Admin Login"}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
