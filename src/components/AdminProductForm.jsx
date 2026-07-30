import React, { useState, useEffect } from 'react';
import { Plus, Trash, Save, X } from 'lucide-react';

export default function AdminProductForm({ product, onSave, onCancel }) {
  const isEditing = !!product;

  const [name, setName] = useState('');
  const [category, setCategory] = useState('pc');
  const [platform, setPlatform] = useState('PC');
  const [type, setType] = useState('Game');
  const [price, setPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [stock, setStock] = useState('10');
  const [rating, setRating] = useState('5.0');
  const [soldCount, setSoldCount] = useState('0');
  const [tag, setTag] = useState('');

  // Promotion Toggles
  const [isFeatured, setIsFeatured] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [isFlashDeal, setIsFlashDeal] = useState(false);
  const [isTopRated, setIsTopRated] = useState(false);

  // Package Options State
  const [packages, setPackages] = useState([]);
  const [pkgName, setPkgName] = useState('');
  const [pkgPrice, setPkgPrice] = useState('');

  // Hydrate fields if editing
  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setCategory(product.category || 'pc');
      setPlatform(product.platform || 'PC');
      setType(product.type || 'Game');
      setPrice(product.price !== undefined ? product.price.toString() : '');
      setOldPrice(product.oldPrice !== undefined && product.oldPrice !== null ? product.oldPrice.toString() : '');
      setDescription(product.description || '');
      setImage(product.image || '');
      setStock(product.stock !== undefined ? product.stock.toString() : '10');
      setRating(product.rating !== undefined ? product.rating.toString() : '5.0');
      setSoldCount(product.soldCount !== undefined ? product.soldCount.toString() : '0');
      setTag(product.tag || '');
      setIsFeatured(!!product.isFeatured);
      setIsTrending(!!product.isTrending);
      setIsFlashDeal(!!product.isFlashDeal);
      setIsTopRated(!!product.isTopRated);
      setPackages(product.packages || []);
    } else {
      // Clear form
      setName('');
      setCategory('pc');
      setPlatform('PC');
      setType('Game');
      setPrice('');
      setOldPrice('');
      setDescription('');
      setImage('');
      setStock('10');
      setRating('5.0');
      setSoldCount('0');
      setTag('');
      setIsFeatured(false);
      setIsTrending(false);
      setIsFlashDeal(false);
      setIsTopRated(false);
      setPackages([]);
    }
  }, [product]);

  const handleAddPackage = (e) => {
    e.preventDefault();
    if (!pkgName || !pkgPrice) return;
    setPackages([...packages, { name: pkgName, price: parseInt(pkgPrice) || 0 }]);
    setPkgName('');
    setPkgPrice('');
  };

  const handleRemovePackage = (index) => {
    setPackages(packages.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) {
      alert('Product Name and Base Price are required.');
      return;
    }

    const payload = {
      name,
      category,
      platform,
      type,
      price: parseInt(price) || 0,
      oldPrice: oldPrice ? parseInt(oldPrice) : null,
      description,
      image,
      stock: parseInt(stock) !== undefined ? parseInt(stock) : 10,
      rating: parseFloat(rating) || 5.0,
      soldCount: parseInt(soldCount) || 0,
      tag,
      isFeatured,
      isTrending,
      isFlashDeal,
      isTopRated,
      packages,
    };

    if (isEditing) {
      payload.id = product.id;
      payload.slug = product.slug;
    }

    onSave(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left max-w-4xl mx-auto bg-[#0d0d12] border border-white/5 p-6 md:p-8 rounded-3xl shadow-xl">
      <div className="flex justify-between items-center border-b border-white/5 pb-4">
        <h3 className="text-lg font-black text-white">
          {isEditing ? `Edit Product: ${product.name}` : 'Add New Premium Product'}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-zinc-500 hover:text-white transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Col - Basic Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Product Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. PUBG Mobile UC"
              className="w-full bg-white/[0.02] border border-white/10 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#12121a] border border-white/10 focus:border-cyan-500 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/20"
              >
                <option value="pc">PC Gaming</option>
                <option value="xbox">Xbox</option>
                <option value="playstation">PlayStation</option>
                <option value="mobile">Mobile Top-Ups</option>
                <option value="gift-cards">Gift Cards</option>
                <option value="subscriptions">Subscriptions</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full bg-[#12121a] border border-white/10 focus:border-cyan-500 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/20"
              >
                <option value="PC">PC</option>
                <option value="Xbox">Xbox</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Mobile">Mobile</option>
                <option value="Gift Card">Gift Card</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-[#12121a] border border-white/10 focus:border-cyan-500 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/20"
              >
                <option value="Game">Game</option>
                <option value="Top-Up">Top-Up</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Subscription">Subscription</option>
                <option value="Account">Account</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Base Price (IQD) *</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 15000"
                className="w-full bg-white/[0.02] border border-white/10 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Old Price (IQD)</label>
              <input
                type="number"
                value={oldPrice}
                onChange={(e) => setOldPrice(e.target.value)}
                placeholder="e.g. 18000"
                className="w-full bg-white/[0.02] border border-white/10 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Stock Level</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/10 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Image URL</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://cdn.akamai.steamstatic.com/..."
              className="w-full bg-white/[0.02] border border-white/10 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Right Col - Additional parameters, descriptions & packages */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Rating (1.0 - 5.0)</label>
              <input
                type="number"
                step="0.1"
                min="1.0"
                max="5.0"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/10 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Sold Count</label>
              <input
                type="number"
                value={soldCount}
                onChange={(e) => setSoldCount(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/10 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Promo Card Tag</label>
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="e.g. Sale, Hot, Popular"
              className="w-full bg-white/[0.02] border border-white/10 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Description</label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the product features and activation instructions..."
              className="w-full bg-white/[0.02] border border-white/10 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 resize-none"
            ></textarea>
          </div>

          {/* Promotion Options */}
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Promotional Placements</label>
            <div className="grid grid-cols-2 gap-3 bg-white/[0.01] p-3 rounded-2xl border border-white/[0.04]">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-zinc-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded border-white/10 text-cyan-500 focus:ring-0 focus:ring-offset-0 bg-[#0d0d12]"
                />
                <span>Featured Section</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-zinc-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={isTrending}
                  onChange={(e) => setIsTrending(e.target.checked)}
                  className="rounded border-white/10 text-cyan-500 focus:ring-0 bg-[#0d0d12]"
                />
                <span>New & Trending</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-zinc-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={isFlashDeal}
                  onChange={(e) => setIsFlashDeal(e.target.checked)}
                  className="rounded border-white/10 text-cyan-500 focus:ring-0 bg-[#0d0d12]"
                />
                <span>Flash Deals</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-zinc-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={isTopRated}
                  onChange={(e) => setIsTopRated(e.target.checked)}
                  className="rounded border-white/10 text-cyan-500 focus:ring-0 bg-[#0d0d12]"
                />
                <span>Top Rated</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Package Creator Section */}
      <div className="border-t border-white/5 pt-6">
        <h4 className="text-sm font-black text-white mb-3">Manage Packages / Denominations</h4>
        <p className="text-[11px] text-zinc-500 mb-4">
          Adding package options overrides the base price. Example packages: "60 UC" for "1500 IQD" or "10$ Gift Card" for "15000 IQD".
        </p>

        {/* Package Input Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white/[0.01] p-3.5 rounded-2xl border border-white/[0.04]">
          <input
            type="text"
            value={pkgName}
            onChange={(e) => setPkgName(e.target.value)}
            placeholder="Package name (e.g. 1000 VP)"
            className="bg-[#12121a] border border-white/5 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none"
          />
          <input
            type="number"
            value={pkgPrice}
            onChange={(e) => setPkgPrice(e.target.value)}
            placeholder="Package price in IQD (e.g. 15000)"
            className="bg-[#12121a] border border-white/5 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleAddPackage}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-xl flex items-center justify-center gap-1 text-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Package</span>
          </button>
        </div>

        {/* Existing Packages List */}
        {packages.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 px-3 bg-[#12121a] border border-white/5 rounded-xl text-xs"
              >
                <div className="text-left">
                  <span className="font-bold text-white block">{pkg.name}</span>
                  <span className="text-[#00e5ff] font-semibold">{pkg.price.toLocaleString()} IQD</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemovePackage(idx)}
                  className="text-red-500 hover:text-red-400 p-1 transition-colors"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-zinc-600 italic mt-3">No custom packages added. The product will sell at the base price.</p>
        )}
      </div>

      {/* Buttons */}
      <div className="border-t border-white/5 pt-6 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="bg-white/5 hover:bg-white/10 text-zinc-300 font-bold py-3 px-6 rounded-2xl text-xs transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black py-3 px-8 rounded-2xl text-xs flex items-center gap-2 shadow-lg shadow-blue-500/10 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>{isEditing ? 'Save Product Changes' : 'Create Premium Product'}</span>
        </button>
      </div>
    </form>
  );
}
