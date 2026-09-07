import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import { ProductCard } from '../components/ProductCard'
import { SearchBar } from '../components/SearchBar'
import { CATEGORIES, PLATFORMS } from '../data/categories'
import { SlidersHorizontal, Grid, RotateCcw } from 'lucide-react'

export function Products() {
  const { products } = useProducts()
  const [searchParams, setSearchParams] = useSearchParams()

  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all')
  const [selectedPlatform, setSelectedPlatform] = useState(searchParams.get('platform') || 'all')
  const [sortBy, setSortBy] = useState('popular')

  // Sync state with URL params
  useEffect(() => {
    const q = searchParams.get('search') || ''
    const c = searchParams.get('category') || 'all'
    const p = searchParams.get('platform') || 'all'
    setSearch(q)
    setSelectedCategory(c)
    setSelectedPlatform(p)
  }, [searchParams])

  const handleSearchChange = (val) => {
    setSearch(val)
    updateParams({ search: val })
  }

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId)
    updateParams({ category: catId === 'all' ? '' : catId })
  }

  const handlePlatformSelect = (platId) => {
    setSelectedPlatform(platId)
    updateParams({ platform: platId === 'all' ? '' : platId })
  }

  const updateParams = (newParams) => {
    const current = new URLSearchParams(searchParams)
    Object.entries(newParams).forEach(([k, v]) => {
      if (!v) {
        current.delete(k)
      } else {
        current.set(k, v)
      }
    })
    setSearchParams(current)
  }

  const resetFilters = () => {
    setSearch('')
    setSelectedCategory('all')
    setSelectedPlatform('all')
    setSortBy('popular')
    setSearchParams({})
  }

  // Filtering
  let filtered = products.filter((p) => {
    // Search matching
    if (search.trim()) {
      const q = search.toLowerCase().trim()
      const matchName = p.name.toLowerCase().includes(q)
      const matchDesc = p.description ? p.description.toLowerCase().includes(q) : false
      const matchTag = p.tag ? p.tag.toLowerCase().includes(q) : false
      if (!matchName && !matchDesc && !matchTag) return false
    }

    // Category matching
    if (selectedCategory !== 'all' && p.category !== selectedCategory) {
      return false
    }

    // Platform matching
    if (selectedPlatform !== 'all' && p.platform !== selectedPlatform) {
      return false
    }

    return true
  })

  // Sorting
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') {
      return Number(a.price) - Number(b.price)
    } else if (sortBy === 'price-high') {
      return Number(b.price) - Number(a.price)
    } else if (sortBy === 'rating') {
      return Number(b.rating || 0) - Number(a.rating || 0)
    } else {
      // popular
      return Number(b.soldCount || 0) - Number(a.soldCount || 0)
    }
  })

  return (
    <div className="space-y-8 pb-16">
      {/* Title */}
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2">
          <Grid className="w-7 h-7 text-cyan-400" />
          <span>All Store Products</span>
        </h1>
        <p className="text-slate-400 text-xs md:text-sm mt-1">
          Browse game licenses, mobile top-ups, gift cards, and subscriptions.
        </p>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-[#080d1a] p-4 rounded-2xl border border-slate-800 space-y-4">
        {/* Search */}
        <SearchBar
          value={search}
          onChange={handleSearchChange}
          onClear={() => handleSearchChange('')}
          placeholder="Search by game title, UC, VP, gift card, nitro..."
        />

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-bold text-slate-400 mr-2 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Category:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Platform Pills & Sort dropdown */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1 border-t border-slate-800/60">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 mr-2">Platform:</span>
            {PLATFORMS.map((plat) => (
              <button
                key={plat.id}
                onClick={() => handlePlatformSelect(plat.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedPlatform === plat.id
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {plat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <label className="text-xs font-bold text-slate-400">Sort By:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#0d1326] border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-cyan-500"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            {(search || selectedCategory !== 'all' || selectedPlatform !== 'all') && (
              <button
                onClick={resetFilters}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                title="Reset Filters"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>Showing <strong className="text-cyan-400">{filtered.length}</strong> products</span>
      </div>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="bg-[#080d1a] border border-slate-800 rounded-3xl p-12 text-center space-y-3">
          <Grid className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-200">No products match your filter</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search query, selecting "All Products", or resetting your platform filters.
          </p>
          <button
            onClick={resetFilters}
            className="mt-2 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
