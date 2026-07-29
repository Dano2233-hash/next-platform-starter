import React, { useState, useEffect } from 'react';
import { Trash2, Plus, X } from 'lucide-react';

export default function AdminProductForm({ initialProduct, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: 'xbox',
    platform: 'Xbox',
    type: 'Game',
    price: 0,
    oldPrice: '',
    description: '',
    image: '',
    stock: 999,
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
  });

  const [packages, setPackages] = useState([{ name: 'Standard Edition', price: 0 }]);

  useEffect(() => {
    if (initialProduct) {
      setFormData({
        id: initialProduct.id || '',
        name: initialProduct.name || '',
        category: initialProduct.category || 'xbox',
        platform: initialProduct.platform || 'Xbox',
        type: initialProduct.type || 'Game',
        price: initialProduct.price || 0,
        oldPrice: initialProduct.oldPrice || '',
        description: initialProduct.description || '',
        image: initialProduct.image || '',
        stock: initialProduct.stock !== undefined ? initialProduct.stock : 999,
        tag: initialProduct.tag || '',
        isFeatured: !!initialProduct.isFeatured,
        isTrending: !!initialProduct.isTrending,
        isFlashDeal: !!initialProduct.isFlashDeal,
        isTopRated: !!initialProduct.isTopRated,
      });

      if (initialProduct.packages && initialProduct.packages.length > 0) {
        setPackages(initialProduct.packages);
      } else {
        setPackages([{ name: 'Standard Edition', price: initialProduct.price || 0 }]);
      }
    }
  }, [initialProduct]);

  // Handle free games constraints automatically
  const freeToPlayGames = [
    'counter-strike 2', 'pubg mobile', 'pubg: battlegrounds', 'fortnite', 'valorant',
    'efootball', 'roblox', 'free fire', 'call of duty mobile', 'mobile legends',
    'fc mobile', 'apex legends', 'warzone'
  ];

  const handleNameChange = (val) => {
    const isFreeGame = freeToPlayGames.some(fg => val.toLowerCase().includes(fg));
    let updatedFields = { name: val };

    if (isFreeGame) {
      // Must not be a base Game, force it to be a Top-Up or Subscription or Gift Card
      updatedFields.type = 'Top-Up';
    }

    setFormData(prev => ({ ...prev, ...updatedFields }));
  };

  const addPackageRow = () => {
    setPackages([...packages, { name: '', price: 0 }]);
  };

  const removePackageRow = (index) => {
    if (packages.length === 1) return;
    setPackages(packages.filter((_, idx) => idx !== index));
  };

  const handlePackageChange = (index, field, value) => {
    const updated = packages.map((pkg, idx) => {
      if (idx === index) {
        return {
          ...pkg,
          [field]: field === 'price' ? parseInt(value) || 0 : value
        };
      }
      return pkg;
    });
    setPackages(updated);

    // Update overall minimum price in the main form
    if (updated.length > 0) {
      const minPrice = Math.min(...updated.map(p => p.price));
      setFormData(prev => ({ ...prev, price: minPrice }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    // Safety checks for Free to Play Games
    const isFreeGameName = freeToPlayGames.some(fg => formData.name.toLowerCase().includes(fg));
    let finalType = formData.type;
    if (isFreeGameName && finalType === 'Game') {
      finalType = 'Top-Up'; // Force convert
    }

    const payload = {
      ...formData,
      type: finalType,
      packages,
      price: packages.length > 0 ? Math.min(...packages.map(p => p.price)) : parseInt(formData.price) || 0,
      oldPrice: formData.oldPrice ? parseInt(formData.oldPrice) || null : null,
      stock: parseInt(formData.stock) || 0,
    };

    onSave(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-xs text-white/80">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Name */}
        <div>
          <label className="block font-semibold text-white/60 mb-1">Product Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="e.g. Red Dead Redemption 2"
            className="w-full bg-[#050507] border border-white/10 rounded p-2.5 text-white text-xs focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold text-white/60 mb-1">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-[#050507] border border-white/10 rounded p-2.5 text-white text-xs focus:ring-1 focus:ring-cyan-500"
          >
            <option value="xbox">Xbox</option>
            <option value="playstation">PlayStation</option>
            <option value="pc">PC Gaming</option>
            <option value="mobile">Mobile Top-Ups</option>
            <option value="giftcards">Gift Cards</option>
            <option value="subscriptions">Subscriptions</option>
            <option value="others">Others</option>
          </select>
        </div>

        {/* Platform */}
        <div>
          <label className="block font-semibold text-white/60 mb-1">Platform Badge</label>
          <select
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            className="w-full bg-[#050507] border border-white/10 rounded p-2.5 text-white text-xs focus:ring-1 focus:ring-cyan-500"
          >
            <option value="Xbox">Xbox</option>
            <option value="PlayStation">PlayStation</option>
            <option value="PC">PC</option>
            <option value="Mobile">Mobile</option>
            <option value="Gift Card">Gift Card</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block font-semibold text-white/60 mb-1">Type Badge</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full bg-[#050507] border border-white/10 rounded p-2.5 text-white text-xs focus:ring-1 focus:ring-cyan-500"
          >
            <option value="Game">Game</option>
            <option value="Top-Up">Top-Up</option>
            <option value="Gift Card">Gift Card</option>
            <option value="Subscription">Subscription</option>
            <option value="Account">Account</option>
          </select>
          {freeToPlayGames.some(fg => formData.name.toLowerCase().includes(fg)) && (
            <p className="text-[10px] text-amber-500 mt-1">
              Note: Free-to-play titles cannot be listed as paid base "Game" types. Only top-ups / keys are legal.
            </p>
          )}
        </div>

        {/* Old Price */}
        <div>
          <label className="block font-semibold text-white/60 mb-1">Old Price (For sale display, IQD)</label>
          <input
            type="number"
            value={formData.oldPrice}
            onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
            placeholder="e.g. 50000"
            className="w-full bg-[#050507] border border-white/10 rounded p-2.5 text-white text-xs focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block font-semibold text-white/60 mb-1">Stock Amount</label>
          <input
            type="number"
            required
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            className="w-full bg-[#050507] border border-white/10 rounded p-2.5 text-white text-xs"
          />
        </div>

        {/* Image URL */}
        <div className="md:col-span-2">
          <label className="block font-semibold text-white/60 mb-1">Header Image URL (Steam or trusted CDN)</label>
          <input
            type="text"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://cdn.akamai.steamstatic.com/...header.jpg (Leave blank for ProductVisual fallback)"
            className="w-full bg-[#050507] border border-white/10 rounded p-2.5 text-white text-xs focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        {/* Tag */}
        <div>
          <label className="block font-semibold text-white/60 mb-1">Tag (e.g. Bestseller, HOT, New)</label>
          <input
            type="text"
            value={formData.tag}
            onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
            placeholder="Bestseller"
            className="w-full bg-[#050507] border border-white/10 rounded p-2.5 text-white text-xs"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block font-semibold text-white/60 mb-1">Description</label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            placeholder="Detailed digital services info..."
            className="w-full bg-[#050507] border border-white/10 rounded p-2.5 text-white text-xs resize-none"
          />
        </div>

      </div>

      {/* Flag Management */}
      <div className="bg-white/5 border border-white/5 p-4 rounded space-y-2">
        <h4 className="font-bold text-cyan-400 mb-2">Configure Landing Badges</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="accent-cyan-500 scale-110"
            />
            <span>Featured Product</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isTrending}
              onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
              className="accent-cyan-500 scale-110"
            />
            <span>Trending Product</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFlashDeal}
              onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
              className="accent-cyan-500 scale-110"
            />
            <span>Flash Deal</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isTopRated}
              onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
              className="accent-cyan-500 scale-110"
            />
            <span>Top Rated</span>
          </label>
        </div>
      </div>

      {/* Packages / Options section */}
      <div className="bg-white/5 border border-white/5 p-4 rounded space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-cyan-400">Packages / Pricing Options *</h4>
          <button
            type="button"
            onClick={addPackageRow}
            className="px-3 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 rounded font-semibold transition-all cursor-pointer"
          >
            + Add Option
          </button>
        </div>

        <div className="space-y-2">
          {packages.map((pkg, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-black/30 p-2.5 rounded border border-white/5">
              <input
                type="text"
                required
                placeholder="Option name (e.g. 60 UC, Steam Key)"
                value={pkg.name}
                onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                className="flex-1 bg-[#050507] border border-white/10 rounded p-1.5 text-white"
              />
              <input
                type="number"
                required
                placeholder="Price (IQD)"
                value={pkg.price}
                onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                className="w-32 bg-[#050507] border border-white/10 rounded p-1.5 text-white"
              />
              <button
                type="button"
                onClick={() => removePackageRow(idx)}
                disabled={packages.length === 1}
                className="p-1.5 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded disabled:opacity-20 transition-all cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Form Buttons */}
      <div className="flex items-center justify-end gap-3 border-t border-white/5 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 text-white/80 font-bold rounded cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-wider rounded cursor-pointer shadow-lg shadow-cyan-500/10 active:scale-95"
        >
          Save Product
        </button>
      </div>

    </form>
  );
}
