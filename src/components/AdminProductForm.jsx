import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Check, AlertCircle } from 'lucide-react';

export default function AdminProductForm({ initialProduct = null, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'mobile',
    platform: 'Mobile',
    type: 'Top-Up',
    price: 1500,
    oldPrice: '',
    description: '',
    image: '',
    stock: 100,
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: []
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (initialProduct) {
      setFormData({
        name: initialProduct.name || '',
        category: initialProduct.category || 'mobile',
        platform: initialProduct.platform || 'Mobile',
        type: initialProduct.type || 'Top-Up',
        price: initialProduct.price || 0,
        oldPrice: initialProduct.oldPrice || '',
        description: initialProduct.description || '',
        image: initialProduct.image || '',
        stock: initialProduct.stock ?? 100,
        tag: initialProduct.tag || '',
        isFeatured: !!initialProduct.isFeatured,
        isTrending: !!initialProduct.isTrending,
        isFlashDeal: !!initialProduct.isFlashDeal,
        isTopRated: !!initialProduct.isTopRated,
        packages: initialProduct.packages ? [...initialProduct.packages] : []
      });
    }
  }, [initialProduct]);

  const handleAddPackage = () => {
    setFormData(prev => ({
      ...prev,
      packages: [
        ...prev.packages,
        { id: `pkg-${Date.now()}`, name: 'New Package', price: 5000, oldPrice: '' }
      ]
    }));
  };

  const handleUpdatePackage = (index, field, value) => {
    setFormData(prev => {
      const updated = [...prev.packages];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, packages: updated };
    });
  };

  const handleRemovePackage = (index) => {
    setFormData(prev => ({
      ...prev,
      packages: prev.packages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Product name is required.');
      return;
    }
    if (formData.price < 0) {
      setError('Price cannot be negative.');
      return;
    }

    const cleanedData = {
      ...formData,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock),
      packages: formData.packages.length > 0
        ? formData.packages.map(p => ({
            ...p,
            price: Number(p.price),
            oldPrice: p.oldPrice ? Number(p.oldPrice) : null
          }))
        : null
    };

    onSubmit(cleanedData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#090d18] border border-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative text-gray-200">
        <div className="flex items-center justify-between pb-4 border-b border-gray-800">
          <h3 className="text-lg font-bold text-white">
            {initialProduct ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-xs">
          {/* Title & Tag */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <label className="block font-semibold mb-1 text-gray-300">Product Title *</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. PUBG Mobile UC Top-Up"
                className="w-full bg-[#050811] border border-gray-800 rounded-xl p-2.5 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-gray-300">Badge Tag</label>
              <input
                type="text"
                value={formData.tag}
                onChange={e => setFormData({ ...formData, tag: e.target.value })}
                placeholder="e.g. Best Seller"
                className="w-full bg-[#050811] border border-gray-800 rounded-xl p-2.5 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Category, Platform, Type */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-gray-300">Category</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-[#050811] border border-gray-800 rounded-xl p-2.5 text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="mobile">Mobile Top-Ups</option>
                <option value="pc">PC Gaming</option>
                <option value="xbox">Xbox</option>
                <option value="playstation">PlayStation</option>
                <option value="gift-cards">Gift Cards</option>
                <option value="subscriptions">Subscriptions</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-gray-300">Platform</label>
              <select
                value={formData.platform}
                onChange={e => setFormData({ ...formData, platform: e.target.value })}
                className="w-full bg-[#050811] border border-gray-800 rounded-xl p-2.5 text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="Mobile">Mobile</option>
                <option value="PC">PC</option>
                <option value="Xbox">Xbox</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Multi-platform">Multi-platform</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-gray-300">Type</label>
              <select
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-[#050811] border border-gray-800 rounded-xl p-2.5 text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="Top-Up">Top-Up</option>
                <option value="Game">Game</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Subscription">Subscription</option>
                <option value="Account">Account</option>
              </select>
            </div>
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-gray-300">Base Price (IQD) *</label>
              <input
                type="number"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-[#050811] border border-gray-800 rounded-xl p-2.5 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-gray-300">Old Price (IQD)</label>
              <input
                type="number"
                value={formData.oldPrice}
                onChange={e => setFormData({ ...formData, oldPrice: e.target.value })}
                placeholder="Optional"
                className="w-full bg-[#050811] border border-gray-800 rounded-xl p-2.5 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-gray-300">Stock Count</label>
              <input
                type="number"
                value={formData.stock}
                onChange={e => setFormData({ ...formData, stock: e.target.value })}
                className="w-full bg-[#050811] border border-gray-800 rounded-xl p-2.5 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Image URL & Description */}
          <div>
            <label className="block font-semibold mb-1 text-gray-300">Image URL (Optional)</label>
            <input
              type="text"
              value={formData.image}
              onChange={e => setFormData({ ...formData, image: e.target.value })}
              placeholder="Leave empty for fallback gradient visual"
              className="w-full bg-[#050811] border border-gray-800 rounded-xl p-2.5 text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-gray-300">Description</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#050811] border border-gray-800 rounded-xl p-2.5 text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Packages Builder */}
          <div className="p-3 rounded-xl bg-[#050811] border border-gray-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-400">Package Options (UC / Diamonds / Card Amounts)</span>
              <button
                type="button"
                onClick={handleAddPackage}
                className="px-2.5 py-1 rounded-lg bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Package
              </button>
            </div>

            {formData.packages.map((pkg, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-[#090d18] p-2 rounded-lg border border-gray-800">
                <input
                  type="text"
                  placeholder="Package Name"
                  value={pkg.name}
                  onChange={e => handleUpdatePackage(idx, 'name', e.target.value)}
                  className="flex-1 bg-[#050811] border border-gray-800 rounded p-1.5 text-white"
                />
                <input
                  type="number"
                  placeholder="Price (IQD)"
                  value={pkg.price}
                  onChange={e => handleUpdatePackage(idx, 'price', e.target.value)}
                  className="w-28 bg-[#050811] border border-gray-800 rounded p-1.5 text-white"
                />
                <button
                  type="button"
                  onClick={() => handleRemovePackage(idx)}
                  className="text-gray-500 hover:text-red-400 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Section Flags */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
            <label className="flex items-center space-x-2 bg-[#050811] p-2 rounded-xl border border-gray-800 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="rounded accent-cyan-500"
              />
              <span className="text-[11px] font-semibold">Featured</span>
            </label>
            <label className="flex items-center space-x-2 bg-[#050811] p-2 rounded-xl border border-gray-800 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isTrending}
                onChange={e => setFormData({ ...formData, isTrending: e.target.checked })}
                className="rounded accent-cyan-500"
              />
              <span className="text-[11px] font-semibold">Trending</span>
            </label>
            <label className="flex items-center space-x-2 bg-[#050811] p-2 rounded-xl border border-gray-800 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFlashDeal}
                onChange={e => setFormData({ ...formData, isFlashDeal: e.target.checked })}
                className="rounded accent-cyan-500"
              />
              <span className="text-[11px] font-semibold">Flash Deal</span>
            </label>
            <label className="flex items-center space-x-2 bg-[#050811] p-2 rounded-xl border border-gray-800 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isTopRated}
                onChange={e => setFormData({ ...formData, isTopRated: e.target.checked })}
                className="rounded accent-cyan-500"
              />
              <span className="text-[11px] font-semibold">Top Rated</span>
            </label>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold shadow-lg shadow-cyan-500/20"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
