import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Check, Sparkles } from 'lucide-react';
import { CATEGORIES, PLATFORMS, PRODUCT_TYPES } from '../data/categories';

export default function AdminProductForm({ initialData = null, onSave, onClose }) {
  const [form, setForm] = useState({
    name: '',
    category: 'mobile',
    platform: 'Mobile',
    type: 'Top-Up',
    price: '',
    oldPrice: '',
    description: '',
    image: '',
    stock: 100,
    rating: 5.0,
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
  const [pkgOldPrice, setPkgOldPrice] = useState('');

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        category: initialData.category || 'mobile',
        platform: initialData.platform || 'Mobile',
        type: initialData.type || 'Top-Up',
        price: initialData.price || '',
        oldPrice: initialData.oldPrice || '',
        description: initialData.description || '',
        image: initialData.image || '',
        stock: initialData.stock ?? 100,
        rating: initialData.rating || 5.0,
        soldCount: initialData.soldCount || 0,
        tag: initialData.tag || '',
        isFeatured: !!initialData.isFeatured,
        isTrending: !!initialData.isTrending,
        isFlashDeal: !!initialData.isFlashDeal,
        isTopRated: !!initialData.isTopRated,
        packages: initialData.packages || []
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddPackage = (e) => {
    e.preventDefault();
    if (!pkgName.trim() || !pkgPrice) return;
    const newPkg = {
      name: pkgName.trim(),
      price: Number(pkgPrice) || 0,
      oldPrice: pkgOldPrice ? Number(pkgOldPrice) : null
    };
    setForm((prev) => ({
      ...prev,
      packages: [...prev.packages, newPkg]
    }));
    setPkgName('');
    setPkgPrice('');
    setPkgOldPrice('');
  };

  const handleRemovePackage = (index) => {
    setForm((prev) => ({
      ...prev,
      packages: prev.packages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#090e1a] border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span>{initialData ? 'Edit Product' : 'Add New Product'}</span>
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Product Title <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. PUBG Mobile UC Top-Up"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
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
              <label className="block text-xs font-semibold text-slate-300 mb-1">Platform</label>
              <select
                name="platform"
                value={form.platform}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
              >
                {PLATFORMS.filter((p) => p.id !== 'all').map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Product Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
              >
                {PRODUCT_TYPES.filter((t) => t.id !== 'all').map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Stock status */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            {/* Base Price */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Base Price (IQD) <span className="text-rose-400">*</span>
              </label>
              <input
                type="number"
                name="price"
                required
                value={form.price}
                onChange={handleChange}
                placeholder="15000"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            {/* Old Price */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Old Price (IQD - Optional)
              </label>
              <input
                type="number"
                name="oldPrice"
                value={form.oldPrice}
                onChange={handleChange}
                placeholder="18000"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            {/* Image URL */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Image URL (Steam CDN / Official Image)
              </label>
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://cdn.akamai.steamstatic.com/..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                If left blank or invalid, high-quality digital gradient visual fallback will automatically be rendered.
              </p>
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
              <textarea
                name="description"
                rows="2"
                value={form.description}
                onChange={handleChange}
                placeholder="Short description of the product or service..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-100 focus:border-cyan-500 focus:outline-none resize-none"
              ></textarea>
            </div>
          </div>

          {/* Feature Flags Section */}
          <div className="pt-2 border-t border-slate-800">
            <label className="block text-xs font-bold text-slate-300 mb-2">Display Sections / Badges</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800 cursor-pointer text-xs text-slate-200">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={form.isFeatured}
                  onChange={handleChange}
                  className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span>Featured</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800 cursor-pointer text-xs text-slate-200">
                <input
                  type="checkbox"
                  name="isTrending"
                  checked={form.isTrending}
                  onChange={handleChange}
                  className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span>Trending</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800 cursor-pointer text-xs text-slate-200">
                <input
                  type="checkbox"
                  name="isFlashDeal"
                  checked={form.isFlashDeal}
                  onChange={handleChange}
                  className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span>Flash Deal</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800 cursor-pointer text-xs text-slate-200">
                <input
                  type="checkbox"
                  name="isTopRated"
                  checked={form.isTopRated}
                  onChange={handleChange}
                  className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span>Top Rated</span>
              </label>
            </div>
          </div>

          {/* Packages Creator */}
          <div className="pt-2 border-t border-slate-800 space-y-3">
            <label className="block text-xs font-bold text-slate-300">
              Package Options ({form.packages.length})
            </label>

            {form.packages.length > 0 && (
              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {form.packages.map((pkg, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-900 text-xs border border-slate-800"
                  >
                    <div>
                      <span className="font-bold text-cyan-300">{pkg.name}</span>
                      <span className="text-slate-400 ml-2">{pkg.price} IQD</span>
                      {pkg.oldPrice && <span className="text-slate-500 line-through ml-1">{pkg.oldPrice} IQD</span>}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemovePackage(idx)}
                      className="text-rose-400 hover:text-rose-300 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <input
                type="text"
                value={pkgName}
                onChange={(e) => setPkgName(e.target.value)}
                placeholder="Pkg Name (e.g. 660 UC)"
                className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100"
              />
              <input
                type="number"
                value={pkgPrice}
                onChange={(e) => setPkgPrice(e.target.value)}
                placeholder="Price IQD"
                className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  value={pkgOldPrice}
                  onChange={(e) => setPkgOldPrice(e.target.value)}
                  placeholder="Old Price IQD"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100"
                />
                <button
                  type="button"
                  onClick={handleAddPackage}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 text-xs font-bold border border-cyan-500/40 flex items-center justify-center shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Form Action Buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Save Product</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
