import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, Shield, Gamepad2, Sparkles, Smartphone, Gift, Monitor, Tv, Layers } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount, setIsCartOpen } = useCart();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/', icon: Gamepad2 },
    { label: 'Xbox', path: '/products?category=xbox', icon: Tv },
    { label: 'PlayStation', path: '/products?category=playstation', icon: Gamepad2 },
    { label: 'PC', path: '/products?category=pc', icon: Monitor },
    { label: 'Mobile', path: '/products?category=mobile', icon: Smartphone },
    { label: 'Gift Cards', path: '/products?category=gift-cards', icon: Gift },
    { label: 'Subscriptions', path: '/products?category=subscriptions', icon: Sparkles },
    { label: 'Others', path: '/products?category=others', icon: Layers },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#050811]/90 backdrop-blur-md border-b border-gray-800/80">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900/40 via-cyan-900/40 to-purple-900/40 border-b border-cyan-500/10 py-1 px-4 text-center text-[11px] font-semibold text-cyan-300">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
          ⚡ Instant Digital Delivery in Kurdistan & Iraq | FastPay • Korek • MasterCard Accepted
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#050811] rounded-[11px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="text-lg md:text-xl font-black tracking-wider text-white">
              DANO<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">STORE</span>
            </span>
          </Link>

          {/* Desktop Search */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search games, UC, gift cards..."
              className="w-full bg-[#0b101d] border border-gray-800 text-xs text-white placeholder-gray-500 rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </form>

          {/* Right Actions: Cart & Admin */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-[#0b101d] border border-gray-800 text-gray-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all cursor-pointer"
              aria-label="View Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            <Link
              to={isAdmin ? "/admin" : "/admin-login"}
              className={`hidden sm:flex items-center space-x-1 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                isAdmin
                  ? "bg-purple-600/20 text-purple-300 border border-purple-500/40 hover:bg-purple-600/30"
                  : "bg-[#0b101d] border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700"
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span>{isAdmin ? "Admin Portal" : "Admin"}</span>
            </Link>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-[#0b101d] border border-gray-800 text-gray-300 hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Category Links */}
        <nav className="hidden md:flex items-center space-x-1 py-2 overflow-x-auto border-t border-gray-800/40">
          {navLinks.map((link) => {
            const isActive = location.pathname + location.search === link.path || (link.path !== '/' && location.search.includes(link.path.split('?')[1]));
            return (
              <Link
                key={link.label}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20'
                    : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800/50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-800 bg-[#090d18] px-4 py-4 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search games, UC, gift cards..."
              className="w-full bg-[#050811] border border-gray-800 text-xs text-white placeholder-gray-500 rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-cyan-500"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          </form>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const IconComp = link.icon;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 p-2.5 rounded-xl bg-[#050811] border border-gray-800/80 text-xs font-medium text-gray-300 hover:text-cyan-400 hover:border-cyan-500/30"
                >
                  <IconComp className="w-4 h-4 text-cyan-400" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-gray-800/60">
            <Link
              to={isAdmin ? "/admin" : "/admin-login"}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-bold"
            >
              <Shield className="w-4 h-4 text-purple-400" />
              <span>{isAdmin ? "Admin Dashboard" : "Admin Login"}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
