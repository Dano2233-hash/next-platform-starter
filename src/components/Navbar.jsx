import React, { useState } from 'react';
import { ShoppingCart, User, Menu, X, Search, Gamepad2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export default function Navbar({ activePage, navigate, onSearchChange, searchQuery }) {
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Nav Links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Xbox', path: '/xbox' },
    { name: 'PlayStation', path: '/playstation' },
    { name: 'PC', path: '/pc' },
    { name: 'Mobile', path: '/mobile' },
    { name: 'Gift Cards', path: '/gift-cards' },
    { name: 'Subscriptions', path: '/subscriptions' },
    { name: 'Others', path: '/others' },
    { name: 'Admin', path: '/admin' },
  ];

  const handleLinkClick = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/products');
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">

          {/* Logo */}
          <div
            onClick={() => handleLinkClick('/')}
            className="flex items-center gap-2 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-all duration-300">
              <Gamepad2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-blue-400 group-hover:to-cyan-400 transition-all duration-300 uppercase">
              Dano Store
            </span>
          </div>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex relative max-w-xs xl:max-w-md w-full"
          >
            <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-zinc-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search store..."
              value={searchQuery || ''}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (activePage !== '/products') {
                  navigate('/products');
                }
              }}
              className="w-full bg-white/[0.03] text-white pl-10 pr-4 py-2 rounded-xl border border-white/5 focus:border-cyan-500/50 focus:outline-none text-xs transition-all placeholder-zinc-500"
            />
          </form>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              // Exact or active matching
              const isActive =
                activePage === link.path ||
                (link.path !== '/' && activePage.startsWith(link.path));

              return (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.path)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'text-cyan-400 bg-white/[0.03]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.01]'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </div>

          {/* Right Icons: Cart & Menu */}
          <div className="flex items-center gap-3">
            {/* Search Toggle for Mobile */}
            <button
              onClick={() => navigate('/products')}
              className="md:hidden p-2.5 rounded-xl bg-white/[0.02] text-zinc-400 hover:text-white transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => navigate('/cart')}
              className="relative p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] text-zinc-300 hover:text-white transition-all duration-200 group"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5 transition-transform group-hover:scale-105" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-purple-600 border-2 border-[#050505] text-[9px] font-black text-white flex items-center justify-center px-1 shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] text-zinc-300 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-20 inset-x-0 bg-[#050505]/95 border-b border-white/5 py-4 px-4 space-y-2 backdrop-blur-2xl animate-fadeIn">
          {/* Mobile search bar */}
          <div className="relative mb-3">
            <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-zinc-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search store..."
              value={searchQuery || ''}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (activePage !== '/products') {
                  navigate('/products');
                }
              }}
              className="w-full bg-white/[0.03] text-white pl-10 pr-4 py-2.5 rounded-xl border border-white/5 focus:border-cyan-500 focus:outline-none text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const isActive =
                activePage === link.path ||
                (link.path !== '/' && activePage.startsWith(link.path));

              return (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.path)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'text-cyan-400 bg-white/[0.03] border-l-2 border-cyan-400'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.01]'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
