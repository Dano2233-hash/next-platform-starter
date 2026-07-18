import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, ShieldAlert, Search } from 'lucide-react';
import SearchBar from './SearchBar';

export default function Navbar({ cartCount, onCartOpen }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Xbox", path: "/products?platform=Xbox" },
    { name: "PlayStation", path: "/products?platform=PlayStation" },
    { name: "PC", path: "/products?platform=PC" },
    { name: "Mobile", path: "/products?platform=Mobile" },
    { name: "Gift Cards", path: "/products?category=giftcards" },
    { name: "Subscriptions", path: "/products?category=subscriptions" },
    { name: "Others", path: "/products?category=others" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-500/10 bg-[#050505]/90 backdrop-blur-md">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-cyan-900/40 border-b border-blue-500/10 text-center py-1.5 text-xs font-medium tracking-wide text-cyan-200">
        🚀 FREE INSTANT DIGITAL DELIVERY ACROSS KURDISTAN & IRAQ • 24/7 CUSTOMER SUPPORT
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-purple-600 to-cyan-400 p-[2px] shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-all duration-300">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#050505]">
                <span className="text-lg font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">D</span>
              </div>
            </div>
            <span className="text-xl font-black tracking-tight text-white group-hover:text-cyan-300 transition duration-300">
              Dano<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"> Store</span>
            </span>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <SearchBar />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors rounded-lg hover:bg-white/5"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Search Icon (Mobile / Tablet) */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="lg:hidden p-2 text-gray-400 hover:text-cyan-400 transition rounded-lg hover:bg-white/5"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Admin Link */}
            <Link
              to="/admin"
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg border border-purple-500/20 bg-purple-950/10 text-xs font-semibold text-purple-300 hover:bg-purple-900/20 hover:border-purple-500/40 transition duration-300"
            >
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>Admin</span>
            </Link>

            {/* Cart Icon */}
            <button
              onClick={onCartOpen}
              className="relative p-2 text-gray-300 hover:text-cyan-400 transition-all duration-300 rounded-lg hover:bg-white/5"
              aria-label="Open Cart"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-[10px] font-bold text-white shadow-md shadow-cyan-500/40">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-gray-400 hover:text-white transition rounded-lg hover:bg-white/5"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Collapsible Search for Mobile */}
        {showSearch && (
          <div className="lg:hidden py-3 border-t border-blue-500/10">
            <SearchBar onSearchClose={() => setShowSearch(false)} />
          </div>
        )}
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-blue-500/10 bg-[#050505] py-4 px-4 space-y-3 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-semibold text-gray-300 hover:text-cyan-400 hover:bg-white/5 transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-blue-500/10 flex flex-col gap-2">
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-purple-500/30 bg-purple-950/20 text-purple-300 font-semibold text-sm hover:bg-purple-900/30 transition"
            >
              <ShieldAlert className="h-4 w-4" />
              <span>Admin Dashboard</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
