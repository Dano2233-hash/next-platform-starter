import React from 'react';
import { ShoppingCart, LayoutDashboard, Shield, ChevronRight } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export default function Navbar({ cartCount, onOpenCart }) {
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Xbox', path: '/products?platform=xbox' },
    { name: 'PlayStation', path: '/products?platform=playstation' },
    { name: 'PC', path: '/products?platform=pc' },
    { name: 'Mobile', path: '/products?platform=mobile' },
    { name: 'Gift Cards', path: '/products?category=gift-cards' },
    { name: 'Subscriptions', path: '/products?category=subscriptions' },
    { name: 'Others', path: '/products?category=others' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050505]/90 backdrop-blur-md border-b border-slate-900/80">
      {/* Top Announcement Bar */}
      <div className="w-full bg-gradient-to-r from-[#0066ff] to-[#7000ff] text-white py-1 px-4 text-center text-xs font-black tracking-widest uppercase flex items-center justify-center gap-2">
        <span>⚡ Welcome to Dano Store Kurdistan! Purely Safe and Fast Digital Delivery! ⚡</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0066ff] to-[#7000ff] flex items-center justify-center shadow-lg shadow-[#0066ff]/20 border border-blue-400/20">
              <span className="font-black text-lg text-white tracking-tighter">DS</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg md:text-xl text-white tracking-tight leading-none group-hover:text-[#00e5ff] transition-colors">
                Dano Store
              </span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">
                Premium Store
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-slate-900 text-[#00e5ff]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/40'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Actions: Admin icon, Cart */}
          <div className="flex items-center gap-3">
            <Link
              to="/admin"
              className="p-2.5 rounded-xl bg-slate-900/40 hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-900 transition-all flex items-center gap-1.5"
              title="Admin Panel"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="hidden sm:inline text-xs font-extrabold uppercase tracking-wider">Admin</span>
            </Link>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="p-2.5 rounded-xl bg-gradient-to-tr from-slate-950 to-slate-900 border border-slate-800 text-slate-200 hover:text-[#00e5ff] hover:border-[#00e5ff]/30 transition-all relative flex items-center gap-2 group cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-xs font-black uppercase tracking-wider">My Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#00e5ff] text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile secondary category layout */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-3.5 pt-0.5 border-t border-slate-950/40 scrollbar-none">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900/60 border border-slate-900 text-[10px] font-bold text-slate-400 hover:text-white hover:bg-slate-900 whitespace-nowrap uppercase tracking-wider"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
