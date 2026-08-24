import React, { useState, useEffect } from 'react';
import { CATEGORIES, PLATFORMS } from '../data/categories';
import { X, Plus, Trash2, Save } from 'lucide-react';

export default function AdminProductForm({ initialProduct = null, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'mobile',
    platform: 'Mobile',
    type: 'Top-Up',
    price: 0,
    oldPrice: '',
    description: '',
    image: '',
    stock: 100,
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: [{ name: 'Standard Edition', price: 0 }],
  });

  useEffect(() => {
    if (initialProduct) {
      setFormData({
        ...initialProduct,
        oldPrice: initialProduct.oldPrice || '',
        tag: initialProduct.tag || '',
        packages: initialProduct.packages && initialProduct.packages.length > 0 ? initialProduct.packages : [{ name: 'Standard Edition', price: initialProduct.price || 0 }],
      });
    }
  }, [initialProduct]);

  const handlePackageChange = (index, field, value) => {
    const updated = [...formData.packages];
    updated[index][field] = field === 'price' ? parseInt(value, 10) || 0 : value;
    setFormData({
      ...formData,
      packages: updated,
      // Keep main price synced with first package price
      price: index === 0 && field === 'price' ? parseInt(value, 10) || 0 : formData.price,
    });
  };

  const addPackageRow = () => {
    setFormData({
      ...formData,
      packages: [...formData.packages, { name: 'New Package', price: 0 }],
    });
  };

  const removePackageRow = (index) => {
    if (formData.packages.length > 1) {
      setFormData({
        ...formData,
        packages: formData.packages.filter((_, i) => i !== index),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-lg font-bold text-slate-100">
          {initialProduct ? 'Edit Product' : 'Add New Product'}
        </h3>
        {onCancel && (
          <button type="button" onClick={onCancel} className="p-1 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Product Title</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Image URL (CDN link)</label>
          <input
            type="text"
            placeholder="https://cdn.akamai.steamstatic.com/..."
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          >
            {CATEGORIES.filter((c) => c.slug !== 'all').map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Platform</label>
          <select
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          >
            {PLATFORMS.filter((p) => p.id !== 'all').map((plat) => (
              <option key={plat.id} value={plat.id}>
                {plat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Type Badge</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          >
            <option value="Game">Game</option>
            <option value="Top-Up">Top-Up</option>
            <option value="Gift Card">Gift Card</option>
            <option value="Subscription">Subscription</option>
            <option value="Account">Account</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Stock Quantity</label>
          <input
            type="number"
            min="0"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value, 10) || 0 })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-300 mb-1">Description</label>
        <textarea
          rows="2"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
        />
      </div>

      {/* Packages Manager */}
      <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-cyan-400">Packages / Price Tiers</label>
          <button
            type="button"
            onClick={addPackageRow}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Package
          </button>
        </div>

        {formData.packages.map((pkg, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Package Name (e.g. 660 UC)"
              value={pkg.name}
              onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100"
            />
            <input
              type="number"
              placeholder="Price (IQD)"
              value={pkg.price}
              onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
              className="w-32 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100"
            />
            {formData.packages.length > 1 && (
              <button
                type="button"
                onClick={() => removePackageRow(idx)}
                className="text-slate-500 hover:text-red-400 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Section Flag Checkboxes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/40 p-3 rounded-xl border border-slate-800/80 text-xs font-medium">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isFeatured}
            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
            className="rounded border-slate-800 bg-slate-900 text-cyan-500 focus:ring-0"
          />
          <span>Featured</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isTrending}
            onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
            className="rounded border-slate-800 bg-slate-900 text-cyan-500 focus:ring-0"
          />
          <span>Trending</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isFlashDeal}
            onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
            className="rounded border-slate-800 bg-slate-900 text-cyan-500 focus:ring-0"
          />
          <span>Flash Deal</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isTopRated}
            onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
            className="rounded border-slate-800 bg-slate-900 text-cyan-500 focus:ring-0"
          />
          <span>Top Rated</span>
        </label>
      </div>

      {/* Submit Controls */}
      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:text-white"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
        >
          <Save className="w-4 h-4" />
          <span>Save Product</span>
        </button>
      </div>
    </form>
  );
}
