import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ChevronRight } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { formatProductPrice } from '../utils/formatPrice';

export const SearchBar = ({ onSearchSubmit }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { products } = useProducts();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Filter products for preview dropdown
  const filteredProducts = query.trim()
    ? products
        .filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.platform.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      if (onSearchSubmit) onSearchSubmit();
    }
  };

  const handleSelectProduct = (product) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/product/${product.slug || product.id}`);
    if (onSearchSubmit) onSearchSubmit();
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search games, UC, gift cards, subscriptions..."
          className="w-full bg-slate-900/90 text-slate-100 placeholder-slate-400 border border-slate-700 focus:border-cyan-400 rounded-xl py-2 pl-10 pr-9 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all shadow-inner"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </form>

      {/* Instant Live Dropdown Results */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden divide-y divide-slate-800/60 backdrop-blur-xl">
          {filteredProducts.length > 0 ? (
            <>
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => handleSelectProduct(prod)}
                  className="p-3 hover:bg-slate-800/80 cursor-pointer flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 overflow-hidden flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-cyan-400">
                      {prod.image ? (
                        <img src={prod.image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        prod.platform
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition-colors line-clamp-1">
                        {prod.name}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                        <span className="bg-slate-800 px-1.5 py-0.5 rounded text-cyan-300 font-semibold">{prod.platform}</span>
                        <span>{prod.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-cyan-300 block">
                      {formatProductPrice(prod)}
                    </span>
                  </div>
                </div>
              ))}
              <button
                onClick={handleSearch}
                className="w-full p-2.5 bg-slate-950 hover:bg-slate-800/50 text-cyan-400 text-xs font-bold flex items-center justify-center gap-1 transition-colors"
              >
                <span>View all results for "{query}"</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <div className="p-4 text-center text-xs text-slate-400">
              No products found matching "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};
