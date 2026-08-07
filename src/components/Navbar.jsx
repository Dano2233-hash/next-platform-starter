import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User, ShieldAlert } from 'lucide-react';

export function Navbar({ cartCount = 0 }) {
  const [isOpen, setIsOpen] = useState(false);
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
    { name: 'Xbox', path: '/products?category=xbox' },
    { name: 'PlayStation', path: '/products?category=playstation' },
    { name: 'PC', path: '/products?category=pc' },
    { name: 'Mobile', path: '/products?category=mobile' },
    { name: 'Gift Cards', path: '/products?category=giftcards' },
    { name: 'Subscriptions', path: '/products?category=subscriptions' },
    { name: 'Others', path: '/products?category=others' },
    { name: 'Admin', path: '/admin', isAdmin: true }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#06060c]/95 border-b border-slate-800/80 backdrop-blur-md">
      {/* Top banner / announcement bar */}
      <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 py-1.5 px-4 text-center text-xs font-semibold text-white tracking-wider">
        🔥 CHEAPEST GAME COINS & CODES IN IRAQ / KURDISTAN • INSTANT MANUAL DELIVERY 🔥
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group shrink-0">
            <span className="text-xl sm:text-2xl font-black uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 group-hover:from-cyan-300 group-hover:to-purple-400 transition-all duration-300">
              Dano Store
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
          </Link>

          {/* Search bar - Desktop */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex relative max-w-xs lg:max-w-md w-full">
            <input
              type="text"
              placeholder="Search games, UC, gift cards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 text-sm text-slate-200 pl-10 pr-4 py-2 rounded-lg border border-slate-700/60 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 placeholder-slate-500 transition-all duration-200"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
          </form>

          {/* Nav Links - Desktop */}
          <div className="hidden xl:flex items-center space-x-1.5 shrink-0">
            {navLinks.map((link) => {
              const isActive = location.pathname + location.search === link.path ||
                               (link.path !== '/' && location.pathname === '/products' && location.search.includes(link.path.split('=')[1]));
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs font-semibold tracking-wider uppercase px-3 py-2 rounded-md transition-all duration-200 ${
                    isActive
                      ? 'text-cyan-400 bg-slate-900/80 border border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                      : link.isAdmin
                      ? 'text-purple-400 hover:text-purple-300 hover:bg-purple-950/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Icons: Cart & Admin/User & Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            {/* Search - Mobile Toggle Button */}
            <button
              onClick={() => navigate('/products')}
              className="md:hidden p-1.5 text-slate-400 hover:text-white transition-colors duration-200"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 text-slate-300 hover:text-cyan-400 transition-all duration-200 flex items-center bg-slate-900/50 hover:bg-slate-900 rounded-lg border border-slate-800"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-[10px] font-black text-black px-2 py-0.5 rounded-full min-w-[18px] text-center shadow-[0_0_8px_rgba(6,182,212,0.4)] animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Admin Quick Icon */}
            <Link
              to="/admin"
              className="p-2 text-slate-300 hover:text-purple-400 transition-all duration-200 bg-slate-900/50 hover:bg-slate-900 rounded-lg border border-slate-800 hidden md:flex"
              title="Admin Panel"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden p-2 text-slate-400 hover:text-white focus:outline-none focus:text-white bg-slate-900/50 rounded-lg border border-slate-800"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="xl:hidden bg-[#090912]/98 border-t border-slate-800/80 px-4 pt-2 pb-6 space-y-3 transition-all duration-300">
          {/* Mobile search */}
          <form onSubmit={handleSearchSubmit} className="relative w-full py-1">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 text-sm text-slate-200 pl-10 pr-4 py-2.5 rounded-lg border border-slate-700/60 focus:outline-none"
            />
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
          </form>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => {
              const isActive = location.pathname + location.search === link.path ||
                               (link.path !== '/' && location.pathname === '/products' && location.search.includes(link.path.split('=')[1]));
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-xs font-bold tracking-wider uppercase px-4 py-3 rounded-lg text-center transition-all duration-200 border ${
                    isActive
                      ? 'text-cyan-400 bg-slate-900/80 border-cyan-500/30 shadow-md'
                      : link.isAdmin
                      ? 'text-purple-400 bg-purple-950/10 border-purple-500/20 hover:bg-purple-950/20'
                      : 'text-slate-300 bg-slate-900/30 border-slate-800 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
