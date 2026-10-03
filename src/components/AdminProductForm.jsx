import React, { useState, useEffect } from 'react';
import { CATEGORIES, PLATFORMS, TYPES } from '../data/categories';
import { X, Plus, Trash2, Check, Sparkles } from 'lucide-react';

export const AdminProductForm = ({ initialData = null, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'mobile',
    platform: 'Mobile',
    type: 'Top-Up',
    price: 1000,
    oldPrice: 0,
    description: '',
    image: '',
    stock: 100,
    rating: 4.9,
    soldCount: 0,
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: []
  });

  const [pkgName, setPkgName] = useState('');
  const [pkgPrice, setPkgPrice] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        packages: initialData.packages || []
      });
    }
  }, [initialData]);

  const handleAddPackage = () => {
    if (!pkgName.trim() || !pkgPrice) return;
    setFormData({
      ...formData,
      packages: [...formData.packages, { name: pkgName.trim(), price: parseFloat(pkgPrice) }]
    });
    setPkgName('');
    setPkgPrice('');
  };

  const handleRemovePackage = (index) => {
    setFormData({
      ...formData,
      packages: formData.packages.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) return;
    onSave(formData);
  };

  return (
    <div className="bg-[#0a0e1a] border border-slate-800 rounded-2xl p-6 text-slate-100 max-w-3xl mx-auto shadow-2xl">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
        <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <span>{initialData ? 'Edit Product' : 'Add New Product'}</span>
        </h3>
        <button
          onClick={onCancel}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 text-xs">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Product Title *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#070b18] border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2 text-sm text-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Image URL</label>
            <input
              type="text"
              placeholder="https://..."
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full bg-[#070b18] border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2 text-sm text-white"
            />
          </div>
        </div>

        {/* Category, Platform, Type */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-[#070b18] border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-sm text-white"
            >
              {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Platform</label>
            <select
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              className="w-full bg-[#070b18] border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-sm text-white"
            >
              {PLATFORMS.filter((p) => p.id !== 'all').map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full bg-[#070b18] border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-sm text-white"
            >
              {TYPES.filter((t) => t.id !== 'all').map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Base Price (IQD) *</label>
            <input
              type="number"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              className="w-full bg-[#070b18] border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-sm text-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Old Price (IQD)</label>
            <input
              type="number"
              value={formData.oldPrice}
              onChange={(e) => setFormData({ ...formData, oldPrice: parseFloat(e.target.value) || 0 })}
              className="w-full bg-[#070b18] border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-sm text-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Stock Count</label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
              className="w-full bg-[#070b18] border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-sm text-white"
            />
          </div>
        </div>

        {/* Description & Tag */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block font-semibold text-slate-300 mb-1">Description</label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#070b18] border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2 text-sm text-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Badge Tag</label>
            <input
              type="text"
              placeholder="e.g. Popular, Hot"
              value={formData.tag}
              onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
              className="w-full bg-[#070b18] border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-sm text-white"
            />
          </div>
        </div>

        {/* Package Options Creator */}
        <div className="p-4 rounded-xl bg-[#070b18] border border-slate-800 space-y-3">
          <label className="block font-bold text-slate-200">Package Variants (UC, Diamonds, V-Bucks, Gift Values)</label>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Package Name (e.g. 660 UC)"
              value={pkgName}
              onChange={(e) => setPkgName(e.target.value)}
              className="flex-1 bg-[#0a0e1a] border border-slate-800 px-3 py-1.5 rounded-lg text-white"
            />
            <input
              type="number"
              placeholder="Price (IQD)"
              value={pkgPrice}
              onChange={(e) => setPkgPrice(e.target.value)}
              className="w-32 bg-[#0a0e1a] border border-slate-800 px-3 py-1.5 rounded-lg text-white"
            />
            <button
              type="button"
              onClick={handleAddPackage}
              className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {formData.packages.map((p, idx) => (
              <span
                key={idx}
                className="bg-slate-900 border border-slate-700 text-slate-200 text-xs px-2.5 py-1 rounded-lg flex items-center gap-2"
              >
                <span>{p.name} - {p.price} IQD</span>
                <button
                  type="button"
                  onClick={() => handleRemovePackage(idx)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Section Display Flags */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <label className="flex items-center gap-2 p-2.5 rounded-xl bg-[#070b18] border border-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="accent-cyan-500 rounded"
            />
            <span className="font-semibold text-slate-300">Featured</span>
          </label>

          <label className="flex items-center gap-2 p-2.5 rounded-xl bg-[#070b18] border border-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isTrending}
              onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
              className="accent-cyan-500 rounded"
            />
            <span className="font-semibold text-slate-300">Trending</span>
          </label>

          <label className="flex items-center gap-2 p-2.5 rounded-xl bg-[#070b18] border border-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFlashDeal}
              onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
              className="accent-cyan-500 rounded"
            />
            <span className="font-semibold text-slate-300">Flash Deal</span>
          </label>

          <label className="flex items-center gap-2 p-2.5 rounded-xl bg-[#070b18] border border-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isTopRated}
              onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
              className="accent-cyan-500 rounded"
            />
            <span className="font-semibold text-slate-300">Top Rated</span>
          </label>
        </div>

        {/* Action Controls */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
          >
            <Check className="w-4 h-4" /> Save Product
          </button>
        </div>
      </form>
    </div>
  );
};
