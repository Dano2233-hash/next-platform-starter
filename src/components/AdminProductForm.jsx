import React, { useState } from 'react';
import { CATEGORIES, PLATFORMS, PRODUCT_TYPES } from '../data/categories';
import { Plus, X, Trash2, Check } from 'lucide-react';

export default function AdminProductForm({ product = null, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || 'mobile',
    platform: product?.platform || 'Mobile',
    type: product?.type || 'Top-Up',
    price: product?.price || 5000,
    oldPrice: product?.oldPrice || '',
    stock: product?.stock || 100,
    rating: product?.rating || 4.9,
    soldCount: product?.soldCount || 100,
    tag: product?.tag || '',
    image: product?.image || '',
    description: product?.description || '',
    isFeatured: product?.isFeatured || false,
    isTrending: product?.isTrending || false,
    isFlashDeal: product?.isFlashDeal || false,
    isTopRated: product?.isTopRated || false,
    packages: product?.packages?.length
      ? product.packages
      : [{ name: 'Standard Package', price: product?.price || 5000 }],
  });

  const handlePackageChange = (index, field, value) => {
    const updated = [...formData.packages];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, packages: updated });
  };

  const addPackageRow = () => {
    setFormData({
      ...formData,
      packages: [...formData.packages, { name: '', price: 1000 }],
    });
  };

  const removePackageRow = (index) => {
    if (formData.packages.length === 1) return;
    setFormData({
      ...formData,
      packages: formData.packages.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const formattedData = {
      ...formData,
      price: Number(formData.price) || 0,
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock) || 0,
      rating: Number(formData.rating) || 5.0,
      soldCount: Number(formData.soldCount) || 0,
      packages: formData.packages.map((pkg) => ({
        name: pkg.name || 'Standard Package',
        price: Number(pkg.price) || 0,
        oldPrice: pkg.oldPrice ? Number(pkg.oldPrice) : null,
      })),
    };

    onSave(formattedData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#090d16] p-6 rounded-2xl border border-slate-800 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-lg font-bold text-white">
          {product ? 'Edit Product' : 'Add New Digital Product'}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-xs font-semibold text-slate-300">Product Title *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. PUBG Mobile UC"
            className="w-full bg-slate-900 text-slate-100 text-sm rounded-xl px-4 py-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-300">Category *</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-slate-900 text-slate-100 text-sm rounded-xl px-4 py-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Platform */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-300">Platform *</label>
          <select
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            className="w-full bg-slate-900 text-slate-100 text-sm rounded-xl px-4 py-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            {PLATFORMS.map((plat) => (
              <option key={plat.id} value={plat.id}>
                {plat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-300">Product Type *</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full bg-slate-900 text-slate-100 text-sm rounded-xl px-4 py-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            {PRODUCT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Base Price */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-300">Starting Price (IQD) *</label>
          <input
            type="number"
            required
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full bg-slate-900 text-slate-100 text-sm rounded-xl px-4 py-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Old Price */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-300">Old Price / Sale (IQD)</label>
          <input
            type="number"
            value={formData.oldPrice}
            onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
            placeholder="Optional sale price"
            className="w-full bg-slate-900 text-slate-100 text-sm rounded-xl px-4 py-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Stock */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-300">Stock Count *</label>
          <input
            type="number"
            required
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            className="w-full bg-slate-900 text-slate-100 text-sm rounded-xl px-4 py-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Image URL */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-xs font-semibold text-slate-300">
            Image URL <span className="text-slate-500">(Leave blank for clean ProductVisual fallback)</span>
          </label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://cdn.akamai.steamstatic.com/..."
            className="w-full bg-slate-900 text-slate-100 text-sm rounded-xl px-4 py-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-xs font-semibold text-slate-300">Description</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-slate-900 text-slate-100 text-sm rounded-xl px-4 py-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Packages Section */}
      <div className="pt-4 border-t border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-200">Package Variants</h4>
          <button
            type="button"
            onClick={addPackageRow}
            className="flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
          >
            <Plus className="w-4 h-4" /> Add Package
          </button>
        </div>

        <div className="space-y-2">
          {formData.packages.map((pkg, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Package Name (e.g. 660 UC)"
                value={pkg.name}
                onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                className="flex-1 bg-slate-900 text-slate-100 text-xs rounded-lg px-3 py-2 border border-slate-800"
              />
              <input
                type="number"
                placeholder="Price (IQD)"
                value={pkg.price}
                onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                className="w-32 bg-slate-900 text-slate-100 text-xs rounded-lg px-3 py-2 border border-slate-800"
              />
              {formData.packages.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePackageRow(idx)}
                  className="p-2 text-slate-500 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Section Feature Flags */}
      <div className="pt-4 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <label className="flex items-center gap-2 cursor-pointer text-slate-300">
          <input
            type="checkbox"
            checked={formData.isFeatured}
            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
            className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-cyan-500"
          />
          Featured
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-slate-300">
          <input
            type="checkbox"
            checked={formData.isTrending}
            onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
            className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-cyan-500"
          />
          Trending
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-slate-300">
          <input
            type="checkbox"
            checked={formData.isFlashDeal}
            onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
            className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-cyan-500"
          />
          Flash Deal
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-slate-300">
          <input
            type="checkbox"
            checked={formData.isTopRated}
            onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
            className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-cyan-500"
          />
          Top Rated
        </label>
      </div>

      {/* Form Buttons */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-extrabold shadow-md shadow-cyan-500/20 transition flex items-center gap-1.5"
        >
          <Check className="w-4 h-4" /> Save Product
        </button>
      </div>
    </form>
  );
}
