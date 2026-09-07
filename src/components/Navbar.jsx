import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  Gamepad2,
  ShoppingCart,
  Search,
  Menu,
  X,
  Shield,
  Zap,
  Sparkles,
  PhoneCall,
  UserCheck
} from 'lucide-react'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'

export function Navbar({ onOpenCart }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { cartCount } = useCart()
  const { isAdmin } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setMobileMenuOpen(false)
    }
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Xbox', path: '/products?platform=Xbox' },
    { name: 'PlayStation', path: '/products?platform=PlayStation' },
    { name: 'PC', path: '/products?platform=PC' },
    { name: 'Mobile', path: '/products?category=Mobile%20Top-Ups' },
    { name: 'Gift Cards', path: '/products?category=Gift%20Cards' },
    { name: 'Subscriptions', path: '/products?category=Subscriptions' },
    { name: 'Others', path: '/products' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-[#050508]/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-purple-950 border-b border-slate-800/60 py-1.5 px-4 text-xs font-medium text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Sparkles className="w-3 h-3" /> Kurdistan & Iraq
            </span>
            <span className="hidden sm:inline text-slate-300">
              Instant Automated Delivery for Game Codes, UC, VP, & Gift Cards!
            </span>
          </div>
          <div className="flex items-center gap-4 shrink-0 text-[11px] text-slate-400">
            <span className="hidden md:flex items-center gap-1 text-cyan-400">
              <Zap className="w-3 h-3" /> FastPay / Korek / MasterCard
            </span>
            <Link to="/admin" className="hover:text-cyan-400 flex items-center gap-1 transition-colors">
              <Shield className="w-3 h-3" /> Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#070b14] rounded-[10px] flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
              Dano <span className="text-cyan-400">Store</span>
            </span>
            <span className="block text-[10px] tracking-wider text-slate-400 font-semibold uppercase -mt-1">
              Digital Gaming Store
            </span>
          </div>
        </Link>

        {/* Search Bar (Desktop) */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
          <input
            type="text"
            placeholder="Search games, UC, VP, gift cards, nitro..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0a0f1d] border border-slate-800 text-slate-200 placeholder-slate-500 text-sm rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-cyan-500/60 transition-colors"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs font-semibold hover:bg-cyan-500/30 transition-colors"
          >
            Search
          </button>
        </form>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Admin Link Badge */}
          {isAdmin ? (
            <Link
              to="/admin"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Admin Logged In</span>
            </Link>
          ) : (
            <Link
              to="/admin-login"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700/60 transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>Admin</span>
            </Link>
          )}

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-xl bg-[#0a0f1d] border border-slate-800 hover:border-cyan-500/50 text-slate-200 transition-colors"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5 text-cyan-400" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-cyan-500 text-slate-950 font-extrabold text-[11px] flex items-center justify-center shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-[#0a0f1d] border border-slate-800 text-slate-200"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Category Navigation Links (Desktop) */}
      <nav className="hidden md:block bg-[#080c17]/80 border-t border-slate-800/40 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto no-scrollbar text-xs font-semibold">
          {navLinks.map((link) => {
            const isActive = location.pathname + location.search === link.path
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                }`}
              >
                {link.name}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#070b15] px-4 pt-3 pb-6 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search store..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0d1326] border border-slate-800 text-slate-200 text-sm rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-cyan-500"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </form>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800">
            <Link
              to={isAdmin ? '/admin' : '/admin-login'}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold"
            >
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>{isAdmin ? 'Admin Dashboard' : 'Admin Login'}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
