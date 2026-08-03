import React from 'react';
import { Search, ShoppingCart, User, X, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ cartItemCount, onCartOpen, onSearch, searchQuery, isAdmin, onLogout }) {
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/products');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#050505]/95 border-b border-[#111122] backdrop-blur-md">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-[#0066ff] via-[#7000ff] to-[#00e5ff] text-black text-[11px] font-bold py-1 px-4 text-center tracking-wider uppercase select-none">
        🎮 Welcome to Dano Store Kurdistan - Fast, Secure & Official Gaming Keys & Top-Ups ⚡
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo Branding */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <span className="text-xl sm:text-2xl font-black tracking-tighter uppercase bg-gradient-to-r from-[#00e5ff] to-[#7000ff] bg-clip-text text-transparent group-hover:glow-text-cyan transition-premium">
              Dano Store
            </span>
          </Link>

          {/* Search bar inside navbar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search games, cards, top-ups..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full bg-[#0a0a16] border border-[#1a1a2e] rounded-lg py-2 pl-4 pr-10 text-xs focus:outline-none focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff] text-white placeholder-gray-500 transition-premium"
            />
            <button type="submit" className="absolute right-3 top-2.5 text-gray-400 hover:text-[#00e5ff] transition-premium">
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Actions & Utilities */}
          <div className="flex items-center gap-4">

            {/* Admin Hub Link */}
            {isAdmin ? (
              <div className="flex items-center gap-2 bg-[#120033]/80 border border-[#7000ff]/30 px-3 py-1.5 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-purple-400">Admin Live</span>
                <Link to="/admin" className="text-xs font-bold text-white hover:text-purple-300 transition-premium">
                  Dashboard
                </Link>
                <button onClick={onLogout} className="text-gray-400 hover:text-red-400 transition-premium ml-1" title="Logout">
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                to="/admin-login"
                className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-[#00e5ff] transition-premium bg-[#0a0a16] border border-[#1a1a2e] px-3 py-1.5 rounded-lg"
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin</span>
              </Link>
            )}

            {/* Cart Icon with custom counter badge */}
            <button
              onClick={onCartOpen}
              className="relative p-2 bg-[#0a0a16] border border-[#1a1a2e] rounded-lg text-gray-300 hover:text-[#00e5ff] transition-premium flex items-center justify-center"
              aria-label="Open Shopping Cart"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#0066ff] text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full animate-pulse border border-[#050505]">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Categories / Navigation bar below branding */}
        <nav className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 border-t border-[#111122]/50 no-scrollbar select-none text-xs font-bold text-gray-400">
          <Link to="/" className="hover:text-white hover:border-[#00e5ff] py-1 border-b-2 border-transparent shrink-0">Home</Link>
          <span className="text-gray-700">|</span>
          <Link to="/products?category=xbox" className="hover:text-white hover:border-[#00e5ff] py-1 border-b-2 border-transparent shrink-0">Xbox</Link>
          <Link to="/products?category=playstation" className="hover:text-white hover:border-[#00e5ff] py-1 border-b-2 border-transparent shrink-0">PlayStation</Link>
          <Link to="/products?category=pc" className="hover:text-white hover:border-[#00e5ff] py-1 border-b-2 border-transparent shrink-0">PC</Link>
          <Link to="/products?category=mobile" className="hover:text-white hover:border-[#00e5ff] py-1 border-b-2 border-transparent shrink-0">Mobile</Link>
          <Link to="/products?category=giftcards" className="hover:text-white hover:border-[#00e5ff] py-1 border-b-2 border-transparent shrink-0">Gift Cards</Link>
          <Link to="/products?category=subscriptions" className="hover:text-white hover:border-[#00e5ff] py-1 border-b-2 border-transparent shrink-0">Subscriptions</Link>
          <Link to="/products?category=others" className="hover:text-white hover:border-[#00e5ff] py-1 border-b-2 border-transparent shrink-0">Others</Link>
        </nav>
      </div>
    </header>
  );
}
