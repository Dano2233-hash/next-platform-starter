import React, { useState } from 'react';
import { X, Plus, Trash2, Save, Sparkles } from 'lucide-react';
import { CATEGORIES, PLATFORMS } from '../data/categories.js';

export default function AdminProductForm({ initialProduct = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: initialProduct?.name || '',
    category: initialProduct?.category || 'mobile-topups',
    platform: initialProduct?.platform || 'Mobile',
    type: initialProduct?.type || 'Top-Up',
    price: initialProduct?.price || '',
    oldPrice: initialProduct?.oldPrice || '',
    description: initialProduct?.description || '',
    image: initialProduct?.image || '',
    stock: initialProduct?.stock !== undefined ? initialProduct.stock : 50,
    tag: initialProduct?.tag || '',
    isFeatured: initialProduct?.isFeatured || false,
    isTrending: initialProduct?.isTrending || false,
    isFlashDeal: initialProduct?.isFlashDeal || false,
    isTopRated: initialProduct?.isTopRated || false,
    packages: initialProduct?.packages?.length
      ? initialProduct.packages
      : [{ id: 'pkg-1', name: 'Standard Package', price: initialProduct?.price || 1000 }]
  });

  const handleAddPackage = () => {
    setFormData(prev => ({
      ...prev,
      packages: [
        ...prev.packages,
        { id: `pkg-${Date.now()}`, name: '', price: Number(prev.price) || 1000 }
      ]
    }));
  };

  const handlePackageChange = (index, field, value) => {
    const updated = [...formData.packages];
    updated[index] = {
      ...updated[index],
      [field]: field === 'price' ? Number(value) : value
    };
    setFormData({ ...formData, packages: updated });
  };

  const handleRemovePackage = (index) => {
    if (formData.packages.length <= 1) return;
    setFormData({
      ...formData,
      packages: formData.packages.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 text-slate-100 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-lg font-bold font-heading text-cyan-400 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          <span>{initialProduct ? 'Edit Product' : 'Add New Digital Product'}</span>
        </h3>
        <button
          onClick={onCancel}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Product Title</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. PUBG Mobile UC"
            className="w-full px-3.5 py-2 bg-slate-950 text-slate-100 text-sm rounded-xl border border-slate-800 focus:border-cyan-500 outline-none"
          />
        </div>

        {/* Category, Platform, Type Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 text-slate-100 text-xs rounded-xl border border-slate-800 focus:border-cyan-500 outline-none"
            >
              <option value="mobile-topups">Mobile Top-Ups</option>
              <option value="paid-games">Paid Games</option>
              <option value="gift-cards">Gift Cards</option>
              <option value="subscriptions">Subscriptions</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Platform</label>
            <select
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 text-slate-100 text-xs rounded-xl border border-slate-800 focus:border-cyan-500 outline-none"
            >
              <option value="PC">PC</option>
              <option value="Xbox">Xbox</option>
              <option value="PlayStation">PlayStation</option>
              <option value="Mobile">Mobile</option>
              <option value="Gift Card">Gift Card</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Product Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 text-slate-100 text-xs rounded-xl border border-slate-800 focus:border-cyan-500 outline-none"
            >
              <option value="Top-Up">Top-Up</option>
              <option value="Game">Game</option>
              <option value="Gift Card">Gift Card</option>
              <option value="Subscription">Subscription</option>
              <option value="Account">Account</option>
            </select>
          </div>
        </div>

        {/* Price, Old Price & Stock */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Starting Price (IQD)</label>
            <input
              type="number"
              required
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="1500"
              className="w-full px-3 py-2 bg-slate-950 text-slate-100 text-xs rounded-xl border border-slate-800 focus:border-cyan-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Old Price (IQD)</label>
            <input
              type="number"
              min="0"
              value={formData.oldPrice}
              onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
              placeholder="2000"
              className="w-full px-3 py-2 bg-slate-950 text-slate-100 text-xs rounded-xl border border-slate-800 focus:border-cyan-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Stock Count</label>
            <input
              type="number"
              min="0"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 text-slate-100 text-xs rounded-xl border border-slate-800 focus:border-cyan-500 outline-none"
            />
          </div>
        </div>

        {/* Image URL & Tag */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL (Optional)</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://cdn..."
              className="w-full px-3 py-2 bg-slate-950 text-slate-100 text-xs rounded-xl border border-slate-800 focus:border-cyan-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Badge Tag</label>
            <input
              type="text"
              value={formData.tag}
              onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
              placeholder="e.g. Hot Seller, Best Value"
              className="w-full px-3 py-2 bg-slate-950 text-slate-100 text-xs rounded-xl border border-slate-800 focus:border-cyan-500 outline-none"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
          <textarea
            rows={2}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Short product summary..."
            className="w-full px-3 py-2 bg-slate-950 text-slate-100 text-xs rounded-xl border border-slate-800 focus:border-cyan-500 outline-none"
          />
        </div>

        {/* Packages Builder */}
        <div className="border border-slate-800 rounded-xl p-3 bg-slate-950/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-400">Package Options</span>
            <button
              type="button"
              onClick={handleAddPackage}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[11px] font-semibold rounded-lg flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Add Package
            </button>
          </div>

          {formData.packages.map((pkg, idx) => (
            <div key={pkg.id || idx} className="flex items-center gap-2">
              <input
                type="text"
                value={pkg.name}
                onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                placeholder="Package Name (e.g. 60 UC)"
                className="flex-1 px-3 py-1.5 bg-slate-900 text-xs rounded-lg border border-slate-800 focus:border-cyan-500 outline-none"
              />
              <input
                type="number"
                value={pkg.price}
                onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                placeholder="Price (IQD)"
                className="w-28 px-3 py-1.5 bg-slate-900 text-xs rounded-lg border border-slate-800 focus:border-cyan-500 outline-none"
              />
              <button
                type="button"
                onClick={() => handleRemovePackage(idx)}
                disabled={formData.packages.length <= 1}
                className="p-1.5 text-slate-500 hover:text-red-400 disabled:opacity-30"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Feature Flags */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
          <label className="flex items-center gap-2 p-2 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer text-xs">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="accent-cyan-500"
            />
            <span>Featured</span>
          </label>

          <label className="flex items-center gap-2 p-2 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer text-xs">
            <input
              type="checkbox"
              checked={formData.isTrending}
              onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
              className="accent-cyan-500"
            />
            <span>Trending</span>
          </label>

          <label className="flex items-center gap-2 p-2 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer text-xs">
            <input
              type="checkbox"
              checked={formData.isFlashDeal}
              onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
              className="accent-cyan-500"
            />
            <span>Flash Deal</span>
          </label>

          <label className="flex items-center gap-2 p-2 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer text-xs">
            <input
              type="checkbox"
              checked={formData.isTopRated}
              onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
              className="accent-cyan-500"
            />
            <span>Top Rated</span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
          >
            <Save className="w-4 h-4" /> Save Product
          </button>
        </div>
      </form>
    </div>
  );
}
