import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { ShoppingBag, Search, Menu, X, LogIn, LayoutDashboard, LogOut, Home as HomeIcon, Gamepad2, ShoppingCart } from 'lucide-react';

export default function Navbar({ onOpenCart, onSearchSubmit, currentSearchVal = "" }) {
  const { getCartCount } = useCart();
  const { isAdmin, logout } = useAuth();
  const [searchVal, setSearchVal] = useState(currentSearchVal);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchVal(e.target.value);
  };

  const handleSearchSubmitLocal = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(searchVal);
    } else {
      window.location.href = `/products?search=${encodeURIComponent(searchVal)}`;
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Xbox', href: '/products?platform=Xbox' },
    { name: 'PlayStation', href: '/products?platform=PlayStation' },
    { name: 'PC', href: '/products?platform=PC' },
    { name: 'Mobile', href: '/products?platform=Mobile' },
    { name: 'Gift Cards', href: '/products?category=gift-cards' },
    { name: 'Subscriptions', href: '/products?category=subscriptions' },
    { name: 'Others', href: '/products?category=all' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-[#07070d]/95 backdrop-blur-md border-b border-white/5 shadow-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">

          {/* Logo Section */}
          <div className="flex items-center flex-shrink-0">
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-all">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-black uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-400 to-blue-500 group-hover:opacity-90">
                Dano Store
              </span>
            </a>
          </div>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearchSubmitLocal} className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <input
              type="text"
              placeholder="Search games, packages, gift cards..."
              value={searchVal}
              onChange={handleSearchChange}
              className="w-full bg-[#111122] border border-white/10 text-gray-100 text-sm rounded-full py-2.5 pl-5 pr-12 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-gray-500"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 rounded-full flex items-center justify-center text-white transition-opacity"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Desktop Nav Actions */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-white/5"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Search toggler for small screens */}
            <form onSubmit={handleSearchSubmitLocal} className="flex md:hidden relative max-w-[150px]">
              <input
                type="text"
                placeholder="Search..."
                value={searchVal}
                onChange={handleSearchChange}
                className="w-full bg-[#111122] border border-white/10 text-gray-100 text-xs rounded-full py-1.5 pl-3 pr-8 focus:outline-none focus:border-cyan-500 transition-all placeholder:text-gray-500"
              />
              <button type="submit" className="absolute right-2 top-2 text-cyan-400">
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Admin Nav */}
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <a
                  href="/admin"
                  className="bg-purple-950/40 hover:bg-purple-900/50 text-purple-300 border border-purple-800/50 p-2.5 rounded-full flex items-center justify-center gap-1 text-xs font-bold transition-all hover:scale-105"
                  title="Admin Dashboard"
                >
                  <LayoutDashboard className="w-4 h-4" />
                </a>
                <button
                  onClick={() => {
                    logout();
                    window.location.href = '/admin-login';
                  }}
                  className="bg-red-950/40 hover:bg-red-900/50 text-red-300 border border-red-800/50 p-2.5 rounded-full flex items-center justify-center transition-all"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <a
                href="/admin-login"
                className="bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 p-2.5 rounded-full flex items-center justify-center transition-all hover:scale-105"
                title="Admin Login"
              >
                <LogIn className="w-4 h-4" />
              </a>
            )}

            {/* Shopping Cart Icon */}
            <button
              onClick={onOpenCart}
              className="bg-[#111122] border border-white/10 hover:border-cyan-500/50 p-2.5 rounded-full flex items-center justify-center relative text-gray-200 hover:text-cyan-400 transition-all duration-300 group hover:scale-105"
            >
              <ShoppingCart className="w-5 h-5" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border border-black animate-pulse">
                  {getCartCount()}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0a14] border-t border-white/5 px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-4 py-3 text-sm font-bold text-gray-300 hover:text-white hover:bg-white/5 rounded-lg uppercase tracking-wider transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
