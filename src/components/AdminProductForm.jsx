import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, CheckCircle, Package } from 'lucide-react';
import { CATEGORIES, PLATFORMS, PRODUCT_TYPES } from '../data/categories';

const AdminProductForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'games',
    platform: 'PC',
    type: 'Game',
    price: '',
    oldPrice: '',
    stock: 100,
    description: '',
    image: '',
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: [],
  });

  const [newPkgName, setNewPkgName] = useState('');
  const [newPkgPrice, setNewPkgPrice] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        category: initialData.category || 'games',
        platform: initialData.platform || 'PC',
        type: initialData.type || 'Game',
        price: initialData.price || '',
        oldPrice: initialData.oldPrice || '',
        stock: initialData.stock !== undefined ? initialData.stock : 100,
        description: initialData.description || '',
        image: initialData.image || '',
        tag: initialData.tag || '',
        isFeatured: Boolean(initialData.isFeatured),
        isTrending: Boolean(initialData.isTrending),
        isFlashDeal: Boolean(initialData.isFlashDeal),
        isTopRated: Boolean(initialData.isTopRated),
        packages: initialData.packages ? [...initialData.packages] : [],
      });
    }
  }, [initialData]);

  const handleAddPackage = () => {
    if (newPkgName.trim() && newPkgPrice) {
      setFormData({
        ...formData,
        packages: [...formData.packages, { name: newPkgName.trim(), price: Number(newPkgPrice) }],
      });
      setNewPkgName('');
      setNewPkgPrice('');
    }
  };

  const handleRemovePackage = (index) => {
    setFormData({
      ...formData,
      packages: formData.packages.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) {
      alert('Product Name and Price are required.');
      return;
    }
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-lg font-bold text-white">
          {initialData ? 'Edit Product' : 'Add New Product'}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
            Product Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. PUBG Mobile UC"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
          >
            {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Platform */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Platform</label>
          <select
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
          >
            {PLATFORMS.filter((p) => p.id !== 'all').map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
          >
            {PRODUCT_TYPES.filter((t) => t.id !== 'all').map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
            Base Price (IQD) <span className="text-rose-500">*</span>
          </label>
          <input
            type="number"
            required
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="e.g. 1500"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Old Price */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Old Price (IQD)</label>
          <input
            type="number"
            value={formData.oldPrice}
            onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
            placeholder="Optional sale price before discount"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Stock Level</label>
          <input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Tag */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Custom Tag Badge</label>
          <input
            type="text"
            value={formData.tag}
            onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
            placeholder="e.g. Best Seller, Hot, Must Play"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Image URL */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Image URL</label>
        <input
          type="url"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="https://cdn.akamai.steamstatic.com/..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
        />
        <p className="text-[11px] text-slate-500 mt-1">
          Leave blank to automatically display the custom ProductVisual fallback card.
        </p>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Description</label>
        <textarea
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
        />
      </div>

      {/* Packages Manager */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
        <h4 className="text-xs font-bold text-cyan-400 uppercase flex items-center gap-1.5">
          <Package className="w-4 h-4" />
          <span>Product Packages / Denominations</span>
        </h4>

        {formData.packages.length > 0 && (
          <div className="space-y-2">
            {formData.packages.map((pkg, idx) => (
              <div key={idx} className="flex items-center justify-between bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
                <span className="font-bold text-slate-200">{pkg.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400 font-extrabold">{pkg.price} IQD</span>
                  <button
                    type="button"
                    onClick={() => handleRemovePackage(idx)}
                    className="text-slate-500 hover:text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Package name (e.g. 660 UC)"
            value={newPkgName}
            onChange={(e) => setNewPkgName(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg py-1.5 px-3 text-xs text-slate-100"
          />
          <input
            type="number"
            placeholder="Price (IQD)"
            value={newPkgPrice}
            onChange={(e) => setNewPkgPrice(e.target.value)}
            className="w-28 bg-slate-900 border border-slate-800 rounded-lg py-1.5 px-3 text-xs text-slate-100"
          />
          <button
            type="button"
            onClick={handleAddPackage}
            className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold hover:bg-cyan-500/30"
          >
            Add
          </button>
        </div>
      </div>

      {/* Feature Checkboxes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isFeatured}
            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
            className="rounded border-slate-800 bg-slate-900 text-cyan-500 focus:ring-0"
          />
          <span>Featured</span>
        </label>
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isTrending}
            onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
            className="rounded border-slate-800 bg-slate-900 text-cyan-500 focus:ring-0"
          />
          <span>Trending</span>
        </label>
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isFlashDeal}
            onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
            className="rounded border-slate-800 bg-slate-900 text-cyan-500 focus:ring-0"
          />
          <span>Flash Deal</span>
        </label>
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isTopRated}
            onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
            className="rounded border-slate-800 bg-slate-900 text-cyan-500 focus:ring-0"
          />
          <span>Top Rated</span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 border-t border-slate-800 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 text-xs font-bold hover:bg-slate-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all"
        >
          Save Product
        </button>
      </div>
    </form>
  );
};

export default AdminProductForm;
