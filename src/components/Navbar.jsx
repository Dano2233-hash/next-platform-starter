import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu, X, ShieldAlert } from 'lucide-react';

export function Navbar({ cartCount, isAdmin, onSearch, cartTotal }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Xbox', path: '/products?platform=Xbox' },
    { label: 'PlayStation', path: '/products?platform=PlayStation' },
    { label: 'PC', path: '/products?platform=PC' },
    { label: 'Mobile', path: '/products?category=mobile' },
    { label: 'Gift Cards', path: '/products?category=giftcards' },
    { label: 'Subscriptions', path: '/products?category=subscriptions' },
    { label: 'Others', path: '/products?category=others' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#151522] bg-[#050505]/90 backdrop-blur-md">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#0066ff] via-[#7000ff] to-[#00e5ff] py-1.5 px-4 text-center text-xs font-semibold tracking-wide text-white">
        ✨ Level Up Your Gaming | Kurdistan & Iraq's #1 Digital Store | Fast Manual Payment via FastPay, Korek & MasterCard!
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="text-xl font-black uppercase tracking-wider text-white">
              DANO <span className="text-[#00e5ff]">STORE</span>
            </span>
          </Link>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search games, gift cards, top-ups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-[#1e1e2d] bg-[#0c0c14] py-1.5 pl-4 pr-10 text-sm text-gray-200 outline-none transition placeholder:text-gray-500 focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff]"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
              <Search size={16} />
            </button>
          </form>

          {/* Desktop Nav Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <nav className="flex items-center gap-5 text-sm font-medium text-gray-300">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="hover:text-[#00e5ff] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to={isAdmin ? "/admin" : "/admin-login"}
                className={`flex items-center gap-1 hover:text-[#7000ff] transition-colors ${isAdmin ? 'text-[#00e5ff] font-semibold' : ''}`}
              >
                {isAdmin ? <ShieldAlert size={14} /> : <User size={14} />}
                {isAdmin ? 'Dashboard' : 'Admin'}
              </Link>
            </nav>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative flex items-center justify-center p-2 text-gray-300 hover:text-white transition"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#0066ff] text-[10px] font-bold text-white ring-2 ring-[#050505]">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* Search toggler/drawer or plain button for smaller screen */}
            <Link
              to="/cart"
              className="relative flex items-center justify-center p-2 text-gray-300 hover:text-white transition"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#0066ff] text-[10px] font-bold text-white ring-2 ring-[#050505]">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg p-2 text-gray-400 hover:bg-[#12121e] hover:text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#151522] bg-[#07070d] px-4 py-4 space-y-4">
          {/* Mobile search form */}
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Search digital products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-[#1e1e2d] bg-[#0c0c14] py-2 pl-4 pr-10 text-sm text-gray-200 outline-none placeholder:text-gray-500 focus:border-[#0066ff]"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={16} />
            </button>
          </form>

          <nav className="flex flex-col gap-3 font-medium text-gray-300 text-sm">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={handleNavClick}
                className="block py-2 hover:text-[#00e5ff] transition"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to={isAdmin ? "/admin" : "/admin-login"}
              onClick={handleNavClick}
              className={`flex items-center gap-2 py-2 hover:text-[#7000ff] transition ${isAdmin ? 'text-[#00e5ff]' : ''}`}
            >
              {isAdmin ? <ShieldAlert size={16} /> : <User size={16} />}
              {isAdmin ? 'Admin Dashboard' : 'Admin Login'}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
