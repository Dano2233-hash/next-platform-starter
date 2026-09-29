import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Gamepad2, ArrowRight } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';

export default function SearchBar({ placeholder = 'Search games, top-ups, gift cards...' }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { products } = useProducts();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Filter products matching search query
  const matchingProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.platform.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  const handleSelectProduct = (slug) => {
    navigate(`/product/${slug}`);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full bg-[#090d1a] border border-slate-800 hover:border-slate-700 focus:border-cyan-500/80 rounded-xl py-2 pl-10 pr-9 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-all duration-200"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-3 text-slate-400 hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </form>

      {/* Dropdown Live Results */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#0b1021] border border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden max-h-80 overflow-y-auto">
          {matchingProducts.length > 0 ? (
            <div>
              <div className="p-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-950/60 border-b border-slate-800">
                Found {matchingProducts.length} Results
              </div>
              {matchingProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleSelectProduct(product.slug)}
                  className="w-full text-left px-3.5 py-2.5 flex items-center gap-3 hover:bg-slate-900/80 border-b border-slate-800/40 last:border-0 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-colors shrink-0">
                    <Gamepad2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 truncate">
                      {product.name}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate">
                      {product.platform} • {product.category}
                    </p>
                  </div>
                  <span className="text-xs font-black text-cyan-400 shrink-0">
                    {formatPrice(product.price)}
                  </span>
                </button>
              ))}
              <button
                onClick={handleSubmit}
                className="w-full py-2.5 px-3 text-center text-xs font-bold text-cyan-400 hover:text-cyan-300 bg-slate-950/80 hover:bg-slate-900 flex items-center justify-center gap-1 transition-colors"
              >
                View all results for "{query}"
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="p-4 text-center text-xs text-slate-400">
              No products found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
