import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ChevronRight } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export const SearchBar = ({ products = [] }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const filteredProducts = query.trim() === ''
    ? []
    : products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.platform.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
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

  const handleSelect = (slug) => {
    navigate(`/product/${slug}`);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search games, gift cards, UC, subscriptions..."
          className="w-full bg-[#090e1a] border border-slate-800 focus:border-cyan-500 rounded-full py-2 pl-10 pr-10 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none transition-all duration-200"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-3.5 text-slate-400 hover:text-slate-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && filteredProducts.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#0c1427] border border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden divide-y divide-slate-800/80">
          {filteredProducts.map((p) => {
            const minPrice = Array.isArray(p.packages) && p.packages.length > 0
              ? Math.min(...p.packages.map((pkg) => pkg.price))
              : p.price;

            return (
              <button
                key={p.id}
                onClick={() => handleSelect(p.slug || p.id)}
                className="w-full text-left p-3 flex items-center justify-between hover:bg-slate-800/60 transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-slate-900 overflow-hidden shrink-0 border border-slate-800 flex items-center justify-center">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[10px] font-bold text-cyan-400 uppercase">{p.platform.slice(0, 3)}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 line-clamp-1">{p.name}</h4>
                    <span className="text-[10px] text-slate-400">{p.platform} • {p.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-right shrink-0">
                  <span className="text-xs font-bold text-cyan-400">{formatPrice(minPrice)}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </div>
              </button>
            );
          })}
          <button
            onClick={handleSubmit}
            className="w-full py-2.5 px-4 text-center text-xs font-semibold text-cyan-400 hover:bg-cyan-950/30 transition cursor-pointer"
          >
            View all results for "{query}"
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
