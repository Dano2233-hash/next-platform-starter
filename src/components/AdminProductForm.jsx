import React, { useState, useEffect } from 'react';
import { CATEGORIES, PLATFORMS, PRODUCT_TYPES } from '../data/categories';
import { Plus, Trash2, Save, X } from 'lucide-react';

export default function AdminProductForm({ initialData = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    slug: '',
    category: 'mobile-topups',
    platform: 'Mobile',
    type: 'Top-Up',
    price: 1000,
    oldPrice: '',
    description: '',
    image: '',
    stock: 100,
    rating: 5.0,
    soldCount: 0,
    tag: 'New',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    isComingSoon: false,
    packages: [{ id: 'pkg-1', name: 'Default Package', price: 1000, oldPrice: '' }]
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        oldPrice: initialData.oldPrice || '',
        packages: initialData.packages && initialData.packages.length > 0
          ? initialData.packages.map(p => ({ ...p, oldPrice: p.oldPrice || '' }))
          : [{ id: 'pkg-1', name: 'Default Package', price: initialData.price || 1000, oldPrice: '' }]
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePackageChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.packages];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, packages: updated };
    });
  };

  const addPackage = () => {
    setFormData((prev) => ({
      ...prev,
      packages: [
        ...prev.packages,
        { id: `pkg-${Date.now()}`, name: 'New Package', price: 1000, oldPrice: '' }
      ]
    }));
  };

  const removePackage = (index) => {
    if (formData.packages.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      packages: prev.packages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedPackages = formData.packages.map((pkg) => ({
      ...pkg,
      price: Number(pkg.price) || 0,
      oldPrice: pkg.oldPrice ? Number(pkg.oldPrice) : null
    }));

    const minPkgPrice = formattedPackages.length > 0
      ? Math.min(...formattedPackages.map((p) => p.price))
      : Number(formData.price);

    const submitPayload = {
      ...formData,
      price: minPkgPrice,
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock) || 0,
      rating: Number(formData.rating) || 5.0,
      soldCount: Number(formData.soldCount) || 0,
      packages: formattedPackages
    };

    onSubmit(submitPayload);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#0d1322] border border-slate-800 rounded-xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-lg font-extrabold text-slate-100">
          {initialData ? 'Edit Product' : 'Add New Product'}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="p-1 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Product Name & Tag */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Product Title *</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. PUBG Mobile 660 UC"
            className="w-full bg-slate-900 border border-slate-700/80 rounded-lg p-2.5 text-xs text-slate-100 outline-none focus:border-cyan-500"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Badge Tag</label>
          <input
            type="text"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            placeholder="e.g. Best Seller / Hot"
            className="w-full bg-slate-900 border border-slate-700/80 rounded-lg p-2.5 text-xs text-slate-100 outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Category, Platform, Type */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-lg p-2.5 text-xs text-slate-100 outline-none focus:border-cyan-500"
          >
            {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Platform *</label>
          <select
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-lg p-2.5 text-xs text-slate-100 outline-none focus:border-cyan-500"
          >
            {PLATFORMS.filter((p) => p.id !== 'all').map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Type *</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-lg p-2.5 text-xs text-slate-100 outline-none focus:border-cyan-500"
          >
            {PRODUCT_TYPES.filter((t) => t.id !== 'all').map((t) => (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Image URL & Stock */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Image URL (Optional)</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://cdn.akamai.steamstatic.com/..."
            className="w-full bg-slate-900 border border-slate-700/80 rounded-lg p-2.5 text-xs text-slate-100 outline-none focus:border-cyan-500"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Stock Quantity</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-lg p-2.5 text-xs text-slate-100 outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-bold text-slate-300 mb-1">Description</label>
        <textarea
          name="description"
          rows="2"
          value={formData.description}
          onChange={handleChange}
          placeholder="Product details and activation instructions..."
          className="w-full bg-slate-900 border border-slate-700/80 rounded-lg p-2.5 text-xs text-slate-100 outline-none focus:border-cyan-500 resize-none"
        />
      </div>

      {/* Packages / Options Section */}
      <div className="border border-slate-800 rounded-xl p-4 bg-slate-950/50 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider">
            Packages / Options (IQD)
          </h4>
          <button
            type="button"
            onClick={addPackage}
            className="flex items-center gap-1 text-xs font-bold text-cyan-400 hover:underline"
          >
            <Plus className="w-3.5 h-3.5" /> Add Package Option
          </button>
        </div>

        {formData.packages.map((pkg, idx) => (
          <div key={pkg.id || idx} className="grid grid-cols-12 gap-2 items-center bg-slate-900 p-2 rounded-lg border border-slate-800">
            <div className="col-span-5">
              <input
                type="text"
                placeholder="Package Name (e.g. 660 UC)"
                value={pkg.name}
                onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-xs text-slate-100"
              />
            </div>
            <div className="col-span-3">
              <input
                type="number"
                placeholder="Price IQD"
                value={pkg.price}
                onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-xs text-slate-100"
              />
            </div>
            <div className="col-span-3">
              <input
                type="number"
                placeholder="Old Price IQD"
                value={pkg.oldPrice}
                onChange={(e) => handlePackageChange(idx, 'oldPrice', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-xs text-slate-100"
              />
            </div>
            <div className="col-span-1 text-right">
              {formData.packages.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePackage(idx)}
                  className="text-slate-500 hover:text-red-400 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Feature Checkboxes */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 text-xs font-semibold text-slate-300">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
            className="rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0"
          />
          <span>Featured</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="isTrending"
            checked={formData.isTrending}
            onChange={handleChange}
            className="rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0"
          />
          <span>Trending</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="isFlashDeal"
            checked={formData.isFlashDeal}
            onChange={handleChange}
            className="rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0"
          />
          <span>Flash Deal</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="isTopRated"
            checked={formData.isTopRated}
            onChange={handleChange}
            className="rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0"
          />
          <span>Top Rated</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="isComingSoon"
            checked={formData.isComingSoon}
            onChange={handleChange}
            className="rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0"
          />
          <span>Coming Soon</span>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 text-xs font-bold"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold shadow-lg"
        >
          <Save className="w-4 h-4" />
          <span>Save Product</span>
        </button>
      </div>
    </form>
  );
}
