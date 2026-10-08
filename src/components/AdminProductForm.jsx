import React, { useState, useEffect } from 'react';
import { CATEGORIES, PLATFORMS, TYPES } from '../data/categories';
import { X, Plus, Trash2, Save, CheckCircle2 } from 'lucide-react';

export default function AdminProductForm({ initialData = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'Mobile Top-Ups',
    platform: 'Mobile',
    type: 'Top-Up',
    price: 0,
    oldPrice: '',
    description: '',
    image: '',
    stock: 100,
    rating: 5.0,
    soldCount: 0,
    tag: 'Popular',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    isComingSoon: false,
    packages: [{ id: 'pkg-1', name: 'Standard Package', price: 0, oldPrice: '' }],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        image: initialData.image || '',
        oldPrice: initialData.oldPrice || '',
        packages: initialData.packages?.length
          ? initialData.packages
          : [{ id: 'pkg-1', name: 'Standard Package', price: initialData.price || 0, oldPrice: '' }],
      });
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'name' && !initialData) {
        updated.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      return updated;
    });
  };

  const handlePackageChange = (index, field, value) => {
    const updatedPkgs = [...formData.packages];
    updatedPkgs[index] = { ...updatedPkgs[index], [field]: value };
    setFormData({ ...formData, packages: updatedPkgs });
  };

  const addPackage = () => {
    setFormData({
      ...formData,
      packages: [
        ...formData.packages,
        { id: `pkg_${Date.now()}`, name: 'New Package', price: formData.price || 0, oldPrice: '' },
      ],
    });
  };

  const removePackage = (index) => {
    if (formData.packages.length <= 1) return;
    setFormData({
      ...formData,
      packages: formData.packages.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock),
      rating: Number(formData.rating),
      soldCount: Number(formData.soldCount),
      packages: formData.packages.map((p) => ({
        ...p,
        price: Number(p.price),
        oldPrice: p.oldPrice ? Number(p.oldPrice) : null,
      })),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-base font-extrabold text-slate-100">
          {initialData ? 'Edit Product' : 'Add New Product'}
        </h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Product Title</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full bg-slate-900 text-sm text-slate-100 p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">URL Slug</label>
          <input
            type="text"
            required
            value={formData.slug}
            onChange={(e) => handleChange('slug', e.target.value)}
            className="w-full bg-slate-900 text-sm text-slate-100 p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
          <select
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full bg-slate-900 text-sm text-slate-100 p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
          >
            {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Platform</label>
          <select
            value={formData.platform}
            onChange={(e) => handleChange('platform', e.target.value)}
            className="w-full bg-slate-900 text-sm text-slate-100 p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
          >
            {PLATFORMS.filter((p) => p.id !== 'all').map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Type</label>
          <select
            value={formData.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full bg-slate-900 text-sm text-slate-100 p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Starting Price (IQD)</label>
          <input
            type="number"
            required
            value={formData.price}
            onChange={(e) => handleChange('price', e.target.value)}
            className="w-full bg-slate-900 text-sm text-slate-100 p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Old Price / Sale Price (IQD, Optional)</label>
          <input
            type="number"
            value={formData.oldPrice}
            onChange={(e) => handleChange('oldPrice', e.target.value)}
            className="w-full bg-slate-900 text-sm text-slate-100 p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Stock Count</label>
          <input
            type="number"
            value={formData.stock}
            onChange={(e) => handleChange('stock', e.target.value)}
            className="w-full bg-slate-900 text-sm text-slate-100 p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Badge Tag</label>
          <input
            type="text"
            value={formData.tag}
            onChange={(e) => handleChange('tag', e.target.value)}
            className="w-full bg-slate-900 text-sm text-slate-100 p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL (Optional)</label>
          <input
            type="url"
            placeholder="https://..."
            value={formData.image}
            onChange={(e) => handleChange('image', e.target.value)}
            className="w-full bg-slate-900 text-sm text-slate-100 p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
          <textarea
            rows="3"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full bg-slate-900 text-sm text-slate-100 p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
          ></textarea>
        </div>
      </div>

      {/* Packages Section */}
      <div className="border-t border-slate-800 pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Package Options ({formData.packages.length})
          </h4>
          <button
            type="button"
            onClick={addPackage}
            className="flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300"
          >
            <Plus className="w-4 h-4" /> Add Package
          </button>
        </div>

        {formData.packages.map((pkg, idx) => (
          <div key={pkg.id || idx} className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-900 p-3 rounded-xl border border-slate-800 items-center">
            <input
              type="text"
              placeholder="Package Name (e.g. 660 UC)"
              value={pkg.name}
              onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
              className="bg-slate-950 text-xs text-slate-100 p-2 rounded-lg border border-slate-800 focus:border-cyan-500"
            />
            <input
              type="number"
              placeholder="Price (IQD)"
              value={pkg.price}
              onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
              className="bg-slate-950 text-xs text-slate-100 p-2 rounded-lg border border-slate-800 focus:border-cyan-500"
            />
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Old Price (Optional)"
                value={pkg.oldPrice || ''}
                onChange={(e) => handlePackageChange(idx, 'oldPrice', e.target.value)}
                className="bg-slate-950 text-xs text-slate-100 p-2 rounded-lg border border-slate-800 focus:border-cyan-500 flex-1"
              />
              {formData.packages.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePackage(idx)}
                  className="p-1.5 text-slate-500 hover:text-rose-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Feature Checkboxes */}
      <div className="border-t border-slate-800 pt-4 grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-semibold text-slate-300">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isFeatured}
            onChange={(e) => handleChange('isFeatured', e.target.checked)}
            className="rounded bg-slate-900 border-slate-700 text-cyan-500"
          />
          Featured
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isTrending}
            onChange={(e) => handleChange('isTrending', e.target.checked)}
            className="rounded bg-slate-900 border-slate-700 text-cyan-500"
          />
          Trending
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isFlashDeal}
            onChange={(e) => handleChange('isFlashDeal', e.target.checked)}
            className="rounded bg-slate-900 border-slate-700 text-cyan-500"
          />
          Flash Deal
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isTopRated}
            onChange={(e) => handleChange('isTopRated', e.target.checked)}
            className="rounded bg-slate-900 border-slate-700 text-cyan-500"
          />
          Top Rated
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isComingSoon}
            onChange={(e) => handleChange('isComingSoon', e.target.checked)}
            className="rounded bg-slate-900 border-slate-700 text-cyan-500"
          />
          Coming Soon
        </label>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:bg-slate-800"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-cyan-950/50"
        >
          <Save className="w-4 h-4" /> Save Product
        </button>
      </div>
    </form>
  );
}
