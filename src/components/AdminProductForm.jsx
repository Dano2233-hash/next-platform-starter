import React, { useState, useEffect } from 'react';
import { CATEGORIES, PLATFORMS, PRODUCT_TYPES } from '../data/categories';
import { Plus, Save, X, Trash2 } from 'lucide-react';

export default function AdminProductForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'games',
    platform: 'PC',
    type: 'Game',
    price: '',
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

  const [newPackage, setNewPackage] = useState({ name: '', price: '' });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        price: initialData.price || '',
        oldPrice: initialData.oldPrice || '',
        packages: initialData.packages || []
      });
    }
  }, [initialData]);

  const handleAddPackage = () => {
    if (!newPackage.name.trim() || !newPackage.price) return;
    const pkgToAdd = {
      id: `pkg-${Date.now()}`,
      name: newPackage.name.trim(),
      price: Number(newPackage.price)
    };
    setFormData((prev) => ({
      ...prev,
      packages: [...prev.packages, pkgToAdd]
    }));
    setNewPackage({ name: '', price: '' });
  };

  const handleRemovePackage = (id) => {
    setFormData((prev) => ({
      ...prev,
      packages: prev.packages.filter((p) => p.id !== id)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) return;

    onSubmit({
      ...formData,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#090e1c] border border-slate-800 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-lg font-bold text-white">
          {initialData ? 'Edit Product' : 'Add New Product'}
        </h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Product Title *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. PUBG Mobile 660 UC"
            className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:border-cyan-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:border-cyan-500"
          >
            {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Platform */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Platform</label>
          <select
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:border-cyan-500"
          >
            {PLATFORMS.filter((p) => p.id !== 'all').map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:border-cyan-500"
          >
            {PRODUCT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Stock */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Stock Quantity</label>
          <input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:border-cyan-500"
          />
        </div>

        {/* Price (IQD) */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Price (IQD) *</label>
          <input
            type="number"
            required
            placeholder="e.g. 15000"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:border-cyan-500"
          />
        </div>

        {/* Old Price (IQD) */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Old Price (For Discount)</label>
          <input
            type="number"
            placeholder="e.g. 18000"
            value={formData.oldPrice}
            onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:border-cyan-500"
          />
        </div>

        {/* Tag */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Custom Tag / Badge</label>
          <input
            type="text"
            placeholder="e.g. Hot, Sale, GOTY"
            value={formData.tag}
            onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:border-cyan-500"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Image URL</label>
          <input
            type="text"
            placeholder="https://..."
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:border-cyan-500"
          />
        </div>

        {/* Description */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Description</label>
          <textarea
            rows="3"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Detailed description of the product..."
            className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:border-cyan-500"
          ></textarea>
        </div>

        {/* Package Selector Management */}
        <div className="sm:col-span-2 border-t border-slate-800 pt-4">
          <label className="block text-xs font-bold text-cyan-400 uppercase mb-2">Package Variants (Optional)</label>

          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Package Name (e.g. 660 UC)"
              value={newPackage.name}
              onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
              className="flex-1 bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2 text-xs"
            />
            <input
              type="number"
              placeholder="Price (IQD)"
              value={newPackage.price}
              onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
              className="w-28 bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2 text-xs"
            />
            <button
              type="button"
              onClick={handleAddPackage}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold rounded-xl text-xs flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>

          {formData.packages.length > 0 && (
            <div className="space-y-1.5">
              {formData.packages.map((pkg) => (
                <div key={pkg.id} className="flex items-center justify-between p-2 bg-slate-950 rounded-lg text-xs border border-slate-800">
                  <span className="font-semibold text-white">{pkg.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-cyan-300 font-bold">{pkg.price} IQD</span>
                    <button
                      type="button"
                      onClick={() => handleRemovePackage(pkg.id)}
                      className="text-slate-500 hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section Display Toggles */}
        <div className="sm:col-span-2 border-t border-slate-800 pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0"
            />
            Featured
          </label>

          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isTrending}
              onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
              className="rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0"
            />
            Trending
          </label>

          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFlashDeal}
              onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
              className="rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0"
            />
            Flash Deal
          </label>

          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isTopRated}
              onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
              className="rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0"
            />
            Top Rated
          </label>
        </div>

      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-5 py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-500 hover:to-cyan-500 flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
        >
          <Save className="w-4 h-4" /> Save Product
        </button>
      </div>
    </form>
  );
}
