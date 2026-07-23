import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X, User, Gift, Phone } from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';
import { useCart } from '../hooks/useCart';

export function Navbar() {
  const { navigate, route } = useNavigation();
  const { getCartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Update local search query if route query changes
  useEffect(() => {
    if (route.page === 'products' && route.search) {
      setSearchQuery(route.search);
    } else if (route.page !== 'products') {
      setSearchQuery('');
    }
  }, [route.page, route.search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`#/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('#/products');
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Home', href: '#/' },
    { label: 'Xbox', href: '#/products?platform=xbox' },
    { label: 'PlayStation', href: '#/products?platform=playstation' },
    { label: 'PC', href: '#/products?platform=pc' },
    { label: 'Mobile', href: '#/products?platform=mobile' },
    { label: 'Gift Cards', href: '#/products?platform=giftcard' },
    { label: 'Subscriptions', href: '#/products?platform=subscription' },
    { label: 'Others', href: '#/products?category=others' },
    { label: 'Admin', href: '#/admin' }
  ];

  const cartCount = getCartCount();

  const isLinkActive = (href) => {
    if (href === '#/') {
      return route.page === 'home';
    }
    const routeHash = window.location.hash || '#/';
    return routeHash.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#050505]/95 backdrop-blur-md border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('#/')}>
            <span className="text-xl sm:text-2xl font-black uppercase tracking-wider bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple bg-clip-text text-transparent transition hover:opacity-90">
              Dano Store
            </span>
          </div>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search games, gift cards, top-ups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0d0d15] text-white border border-brand-border/60 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue transition-colors duration-200"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </form>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-3 py-2 rounded-md text-xs font-semibold tracking-wide transition-colors duration-200 ${
                  isLinkActive(link.href)
                    ? 'text-brand-cyan bg-brand-blue/10 border border-brand-blue/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Cart Icon & Mobile Actions */}
          <div className="flex items-center gap-2">
            {/* Cart Icon Button */}
            <button
              onClick={() => navigate('#/cart')}
              className="relative p-2 rounded-lg bg-[#0d0d15] border border-brand-border/60 text-gray-300 hover:text-white hover:border-brand-blue/50 transition-all duration-200"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-blue text-[10px] font-bold text-white ring-2 ring-[#050505]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#0d0d15] border border-brand-border/60 text-gray-300 hover:text-white transition-all duration-200"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d0d15] border-b border-brand-border/80 px-4 pt-2 pb-4 space-y-3">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Search store..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#050505] text-white border border-brand-border/60 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </form>

          {/* Mobile Links */}
          <div className="grid grid-cols-2 gap-1 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-colors ${
                  isLinkActive(link.href)
                    ? 'text-brand-cyan bg-brand-blue/10 border border-brand-blue/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
