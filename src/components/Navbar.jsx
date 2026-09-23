import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, ShieldCheck, Gamepad2, Smartphone, CreditCard, Sparkles, Monitor, Tv } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
    { name: 'Xbox', path: '/products?platform=Xbox' },
    { name: 'PlayStation', path: '/products?platform=PlayStation' },
    { name: 'PC', path: '/products?platform=PC' },
    { name: 'Mobile', path: '/products?platform=Mobile' },
    { name: 'Gift Cards', path: '/products?category=gift-cards' },
    { name: 'Subscriptions', path: '/products?category=subscriptions' },
    { name: 'Others', path: '/products?category=all' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#05070f]/90 border-b border-slate-800/80">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900/60 via-purple-900/60 to-blue-900/60 border-b border-cyan-500/20 py-1.5 px-4 text-center text-xs font-semibold text-cyan-200">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>Instant Digital Delivery in Kurdistan & Iraq | FastPay • Korek • MasterCard Supported</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
              <div className="w-full h-full bg-[#05070f] rounded-[10.5px] flex items-center justify-center">
                <span className="font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  D
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                Dano Store
              </span>
              <span className="text-[9px] text-cyan-400/80 font-bold tracking-wider uppercase -mt-1">
                Digital Gaming
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md relative items-center"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search PUBG UC, Steam, GTA V, Gift Cards..."
              className="w-full bg-slate-900/90 text-sm text-slate-100 placeholder-slate-400 px-4 py-2 pl-10 rounded-xl border border-slate-700/80 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            {searchQuery && (
              <button
                type="submit"
                className="absolute right-2 text-xs bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-2.5 py-1 rounded-lg transition-all"
              >
                Find
              </button>
            )}
          </form>

          {/* Right Actions: Cart & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/admin"
              className="hidden lg:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-purple-300 border border-purple-500/30 transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>Admin</span>
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-cyan-500/30 text-white px-3.5 py-2 rounded-xl transition-all shadow-md"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <span className="hidden sm:inline text-xs font-bold">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Category Navigation Bar (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-1 py-2 border-t border-slate-800/60 overflow-x-auto text-xs font-semibold">
          {navLinks.map((link) => {
            const isActive = location.pathname + location.search === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            to="/admin"
            className="ml-auto px-3 py-1.5 rounded-lg text-purple-400 hover:text-purple-300 hover:bg-purple-900/30 font-medium transition-all"
          >
            Admin Portal
          </Link>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070a14] border-b border-slate-800 px-4 pt-3 pb-6 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-slate-900 text-sm text-slate-100 placeholder-slate-400 px-4 py-2 pl-10 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3" />
          </form>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-800 flex items-center justify-between"
              >
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800">
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-bold"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Dashboard</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
