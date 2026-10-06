import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Shield, Menu, X, Gamepad2, Sparkles } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartTotalCount, setIsCartOpen } = useCart();
  const { isAdmin } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { name: 'Xbox', path: '/products?category=xbox' },
    { name: 'PlayStation', path: '/products?category=playstation' },
    { name: 'PC', path: '/products?category=pc-gaming' },
    { name: 'Mobile', path: '/products?category=mobile-top-ups' },
    { name: 'Gift Cards', path: '/products?category=gift-cards' },
    { name: 'Subscriptions', path: '/products?category=subscriptions' },
    { name: 'Others', path: '/products' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && (location.pathname + location.search).startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#05070f]/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Bar / Announcement */}
      <div className="bg-gradient-to-r from-blue-900/60 via-cyan-900/60 to-purple-900/60 border-b border-cyan-500/10 py-1 px-4 text-center text-xs font-semibold text-cyan-200 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span>Instant Automated Digital Code & Top-Up Delivery in Kurdistan & Iraq!</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5 shadow-lg shadow-cyan-950/50 group-hover:shadow-cyan-500/30 transition-all duration-300">
              <div className="w-full h-full bg-[#05070f] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                Dano<span className="text-cyan-400">Store</span>
              </span>
              <span className="text-[9px] font-semibold tracking-widest text-slate-400 uppercase">
                Digital Gaming
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md relative"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search games, UC, diamonds, gift cards..."
              className="w-full bg-[#090d1a] border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-xs font-medium text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 px-2.5 py-1 text-[11px] font-bold rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors"
            >
              Search
            </button>
          </form>

          {/* Nav Right Section: Admin & Cart & Mobile Menu Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Admin Link */}
            <Link
              to={isAdmin ? '/admin' : '/admin-login'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                isAdmin
                  ? 'bg-purple-950/60 border-purple-600/50 text-purple-300 hover:bg-purple-900/60'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">
                {isAdmin ? 'Dashboard' : 'Admin'}
              </span>
            </Link>

            {/* Cart Button with Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-gradient-to-r from-blue-950/80 to-cyan-950/80 border border-slate-800 hover:border-cyan-500/50 text-slate-200 hover:text-cyan-400 transition-all duration-200"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              {cartTotalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-[11px] min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center border-2 border-[#05070f] shadow-lg animate-pulse">
                  {cartTotalCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Navigation Categories Row (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 py-2 overflow-x-auto border-t border-slate-800/40 no-scrollbar">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                isActive(link.path)
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090d1a] border-b border-slate-800 px-4 pt-3 pb-6 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search catalog..."
              className="w-full bg-[#05070f] border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </form>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors ${
                  isActive(link.path)
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 font-bold'
                    : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
