import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Gamepad2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';

export default function SearchBar({ placeholder = "Search games, top-ups, cards...", className = "" }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { products } = useProducts();
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const filteredProducts = query.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.platform.toLowerCase().includes(query.toLowerCase()) ||
        p.type.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSelectProduct = (slug) => {
    setQuery('');
    setIsOpen(false);
    navigate(`/product/${slug}`);
  };

  return (
    <div ref={wrapperRef} class={`relative w-full ${className}`}>
      <form onSubmit={handleSearchSubmit} className="relative flex items-center">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full bg-[#0d1326] border border-slate-800 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 rounded-xl py-2 pl-10 pr-9 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all duration-200"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </form>

      {/* Dropdown preview */}
      {isOpen && query.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#0c1020] border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50 divide-y divide-slate-800/50">
          {filteredProducts.length > 0 ? (
            <>
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product.slug)}
                  className="flex items-center justify-between px-4 py-3 hover:bg-slate-800/50 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-cyan-400 border border-slate-800 group-hover:border-cyan-500/40">
                      <Gamepad2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-100 group-hover:text-cyan-400 transition-colors">
                        {product.name}
                      </h4>
                      <div className="flex items-center space-x-2 text-xs text-slate-400">
                        <span className="text-cyan-500 font-medium">{product.platform}</span>
                        <span>•</span>
                        <span>{product.type}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-200 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                    From {formatPrice(product.price)}
                  </span>
                </div>
              ))}
              <button
                onClick={handleSearchSubmit}
                className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-slate-900/80 hover:bg-slate-800 text-xs font-semibold text-cyan-400 transition-colors"
              >
                <span>View all results for "{query}"</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <div className="px-4 py-6 text-center text-sm text-slate-400">
              No products found matching "<span className="text-white">{query}</span>"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
