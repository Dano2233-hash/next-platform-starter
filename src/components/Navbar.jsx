import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, ShieldAlert, Award } from 'lucide-react';
import SearchBar from './SearchBar';

export default function Navbar({ cartCount, onOpenCart }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Xbox', path: '/products?category=xbox' },
    { name: 'PlayStation', path: '/products?category=playstation' },
    { name: 'PC Gaming', path: '/products?category=pc' },
    { name: 'Mobile', path: '/products?category=mobile' },
    { name: 'Gift Cards', path: '/products?category=giftcards' },
    { name: 'Subscriptions', path: '/products?category=subscriptions' },
    { name: 'Others', path: '/products?category=others' },
    { name: 'Admin', path: '/admin' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full flex flex-col">
      {/* Top Announcement Bar */}
      <div className="w-full bg-gradient-to-r from-[#7000ff] via-[#0066ff] to-[#00e5ff] py-1.5 px-4 text-center text-[10px] md:text-xs font-bold text-white flex items-center justify-center gap-1.5 select-none shadow-md">
        <Award size={13} className="animate-bounce" />
        <span>RAMADAN OFFERS: GET INSTANT GAME DELIVERY & LOWEST TOP-UP RATES IN IRAQ! ⚡</span>
      </div>

      {/* Main Navbar */}
      <nav className="w-full bg-[#050505]/95 backdrop-blur-md border-b border-[#1a1e29]">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="text-md md:text-lg font-black tracking-widest text-white shrink-0 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00e5ff]"></span>
            DANO STORE
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-wider"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Search bar and Cart counter */}
          <div className="flex items-center gap-3 md:gap-4 shrink-0 flex-1 justify-end lg:flex-initial">
            <SearchBar className="hidden md:flex max-w-[200px]" />

            {/* Cart Icon */}
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-lg bg-[#0c0d12] border border-[#1a1e29] hover:bg-[#151824] hover:border-gray-600 text-gray-300 hover:text-white transition-all cursor-pointer select-none flex items-center justify-center"
            >
              <ShoppingCart size={16} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#00e5ff] text-[#050505] text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#0c0d12] border border-[#1a1e29] text-gray-300 hover:text-white cursor-pointer"
            >
              {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile Search block (below navbar on small screens) */}
        <div className="md:hidden px-4 pb-3 border-b border-[#1a1e29]/50">
          <SearchBar className="w-full" />
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden w-full bg-[#0c0d12] border-b border-[#1a1e29] px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-xs font-extrabold text-gray-400 hover:text-white py-1.5 uppercase tracking-widest"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
