import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Check } from 'lucide-react';
import { CATEGORIES, PLATFORMS, PRODUCT_TYPES } from '../data/categories';

export default function AdminProductForm({ product, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || 'games',
    platform: product?.platform || 'PC',
    type: product?.type || 'Game',
    price: product?.price || 0,
    oldPrice: product?.oldPrice || '',
    stock: product?.stock !== undefined ? product.stock : 100,
    description: product?.description || '',
    image: product?.image || '',
    tag: product?.tag || '',
    isFeatured: product?.isFeatured || false,
    isTrending: product?.isTrending || false,
    isFlashDeal: product?.isFlashDeal || false,
    isTopRated: product?.isTopRated || false,
    packages: product?.packages?.length ? product.packages : [{ name: 'Standard', price: product?.price || 0 }]
  });

  const [errors, setErrors] = useState({});

  const handlePackageChange = (index, field, val) => {
    const updated = [...formData.packages];
    updated[index][field] = field === 'price' ? Number(val) : val;
    setFormData({ ...formData, packages: updated });
  };

  const addPackage = () => {
    setFormData({
      ...formData,
      packages: [...formData.packages, { name: 'New Package', price: 0 }]
    });
  };

  const removePackage = (index) => {
    if (formData.packages.length <= 1) return;
    setFormData({
      ...formData,
      packages: formData.packages.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Product name is required';
    if (formData.price <= 0 && (!formData.packages || formData.packages.length === 0)) errs.price = 'Valid price is required';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const lowestPrice = formData.packages && formData.packages.length > 0
      ? Math.min(...formData.packages.map((p) => p.price || 0))
      : Number(formData.price);

    onSave({
      ...formData,
      price: lowestPrice,
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock)
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 text-slate-100 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <h3 className="text-lg font-extrabold text-white">
            {product ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Name */}
          <div>
            <label className="block font-bold text-slate-300 mb-1">Product Title *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
              placeholder="e.g. PUBG Mobile 60 UC Top-Up"
            />
            {errors.name && <p className="text-rose-400 text-[11px] mt-1">{errors.name}</p>}
          </div>

          {/* Category, Platform, Type Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
              >
                {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Platform</label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
              >
                {PLATFORMS.filter(p => p.id !== 'all').map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
              >
                {PRODUCT_TYPES.filter(t => t.id !== 'all').map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Base Price (IQD)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-300 mb-1">Old Price (IQD)</label>
              <input
                type="number"
                value={formData.oldPrice}
                onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                placeholder="Optional"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-300 mb-1">Stock Count</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Image URL & Tag */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Image URL (Optional)</label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="Steam header URL or image link"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-300 mb-1">Tag / Badge</label>
              <input
                type="text"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                placeholder="e.g. Flash Deal, Top Sales"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-bold text-slate-300 mb-1">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Packages Builder */}
          <div className="border-t border-slate-800 pt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold text-slate-200">Packages / Top-Up Options</label>
              <button
                type="button"
                onClick={addPackage}
                className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold hover:bg-cyan-500/30"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Package</span>
              </button>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {formData.packages.map((pkg, idx) => (
                <div key={idx} className="flex items-center space-x-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
                  <input
                    type="text"
                    placeholder="Package Name (e.g. 600 UC)"
                    value={pkg.name}
                    onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Price IQD"
                    value={pkg.price}
                    onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                    className="w-32 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removePackage(idx)}
                    className="p-1.5 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Flags */}
          <div className="border-t border-slate-800 pt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'isFeatured', label: 'Featured' },
              { id: 'isTrending', label: 'Trending' },
              { id: 'isFlashDeal', label: 'Flash Deal' },
              { id: 'isTopRated', label: 'Top Rated' }
            ].map((flag) => (
              <label key={flag.id} className="flex items-center space-x-2 bg-slate-950 p-2 rounded-xl border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData[flag.id]}
                  onChange={(e) => setFormData({ ...formData, [flag.id]: e.target.checked })}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span className="font-semibold text-slate-300">{flag.label}</span>
              </label>
            ))}
          </div>

          {/* Buttons */}
          <div className="pt-4 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-lg shadow-cyan-500/20 hover:opacity-90"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
