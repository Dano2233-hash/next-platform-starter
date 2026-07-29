import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu, X, ShieldAlert } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/products');
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
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0a0a0c]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-black tracking-wider text-white flex items-center gap-2">
              <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-600 bg-clip-text text-transparent">
                DANO
              </span>
              <span className="text-white text-base font-medium px-2 py-0.5 rounded bg-white/5 border border-white/10 uppercase tracking-widest text-xs">
                STORE
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-6 text-sm font-medium text-white/70">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="hover:text-cyan-400 transition-colors duration-200 py-1"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative max-w-xs w-full">
            <input
              type="text"
              placeholder="Search games, cards, top-ups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white placeholder-white/40 text-xs rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200"
            />
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-white/40" />
          </form>

          {/* Right actions */}
          <div className="flex items-center space-x-4">
            {/* Admin link */}
            <Link
              to="/admin"
              className="text-white/70 hover:text-cyan-400 transition-colors duration-200 p-2 flex items-center gap-1.5 text-xs bg-white/5 rounded-lg border border-white/5 hover:border-cyan-500/20"
              title="Admin Panel"
            >
              <User className="h-4 w-4" />
              <span className="hidden lg:inline">Admin</span>
            </Link>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 bg-[#0066ff]/10 hover:bg-[#0066ff]/20 text-cyan-400 hover:text-cyan-300 rounded-lg border border-cyan-500/20 transition-all duration-200 flex items-center justify-center cursor-pointer"
            >
              <ShoppingCart className="h-4.5 w-4.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white font-bold text-[10px] h-5 w-5 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden bg-[#0c0c0e] border-b border-white/5 px-4 pt-2 pb-4 space-y-3">
          {/* Mobile search bar */}
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white placeholder-white/40 text-xs rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-white/40" />
          </form>

          {/* Mobile Links */}
          <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="bg-white/5 px-3 py-2 rounded text-center text-white/80 hover:text-cyan-400 hover:bg-white/10 transition-all duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
