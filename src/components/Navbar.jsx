import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu, X } from 'lucide-react';
import { useCart } from '../hooks/useCart';

const Navbar = () => {
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Xbox', path: '/products?platform=Xbox' },
    { name: 'PlayStation', path: '/products?platform=PlayStation' },
    { name: 'PC', path: '/products?platform=PC' },
    { name: 'Mobile', path: '/products?platform=Mobile' },
    { name: 'Gift Cards', path: '/products?platform=Gift Card' },
    { name: 'Subscriptions', path: '/products?platform=PC/Mobile' },
    { name: 'Others', path: '/products?category=Others' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-navy-900/90 backdrop-blur-md border-b border-white/10">
      <div className="bg-accent-blue py-1 px-4 text-center text-xs font-medium">
        Fast delivery for all digital orders! 🚀
      </div>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-accent-cyan flex items-center">
            Dano <span className="text-white ml-1">Store</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium text-gray-300 hover:text-accent-cyan transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex relative w-64 lg:w-80">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-dark-700 border border-white/10 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-accent-cyan transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-accent-cyan">
              <Search size={18} />
            </button>
          </form>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/admin" className="text-gray-300 hover:text-accent-cyan transition-colors" title="Admin">
              <User size={22} />
            </Link>
            <Link to="/cart" className="relative text-gray-300 hover:text-accent-cyan transition-colors">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-purple text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              className="lg:hidden text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-navy-800 border-b border-white/10 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-dark-700 border border-white/10 rounded-lg py-2 pl-4 pr-10 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                <Search size={18} />
              </button>
            </form>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-300 font-medium py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
