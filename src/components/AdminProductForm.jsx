import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X, Save } from 'lucide-react';
import { CATEGORIES, PLATFORMS, TYPES } from '../data/categories';

export default function AdminProductForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'mobile',
    platform: 'Mobile',
    type: 'Top-Up',
    price: 1000,
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
    packages: [{ name: 'Standard Package', price: 1000, oldPrice: '' }]
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        oldPrice: initialData.oldPrice || '',
        packages: initialData.packages && initialData.packages.length > 0
          ? initialData.packages.map(p => ({ ...p, oldPrice: p.oldPrice || '' }))
          : [{ name: 'Standard Package', price: initialData.price || 1000, oldPrice: '' }]
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
    const updatedPackages = [...formData.packages];
    updatedPackages[index] = {
      ...updatedPackages[index],
      [field]: value
    };
    setFormData({ ...formData, packages: updatedPackages });
  };

  const addPackageRow = () => {
    setFormData({
      ...formData,
      packages: [...formData.packages, { name: '', price: 1000, oldPrice: '' }]
    });
  };

  const removePackageRow = (index) => {
    if (formData.packages.length <= 1) return;
    setFormData({
      ...formData,
      packages: formData.packages.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Standardize numbers
    const processedPackages = formData.packages.map((pkg) => ({
      name: pkg.name || 'Standard',
      price: Number(pkg.price) || 0,
      oldPrice: pkg.oldPrice ? Number(pkg.oldPrice) : null
    }));

    const basePrice = processedPackages.length > 0 ? processedPackages[0].price : Number(formData.price);

    const submissionData = {
      ...formData,
      price: basePrice,
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock),
      soldCount: Number(formData.soldCount),
      rating: Number(formData.rating),
      packages: processedPackages
    };

    onSubmit(submissionData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#090e1a] border border-slate-800 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="font-extrabold text-base text-slate-100">
          {initialData ? 'Edit Product' : 'Add New Product'}
        </h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Name */}
        <div className="md:col-span-2">
          <label className="block font-bold text-slate-300 mb-1">Product Title</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. PUBG Mobile UC"
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-bold text-slate-300 mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-slate-100 focus:outline-none focus:border-cyan-500"
          >
            {CATEGORIES.filter((c) => c.slug !== 'all').map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Platform */}
        <div>
          <label className="block font-bold text-slate-300 mb-1">Platform</label>
          <select
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-slate-100 focus:outline-none focus:border-cyan-500"
          >
            {PLATFORMS.filter((p) => p.id !== 'all').map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block font-bold text-slate-300 mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-slate-100 focus:outline-none focus:border-cyan-500"
          >
            {TYPES.filter((t) => t.id !== 'all').map((t) => (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Stock */}
        <div>
          <label className="block font-bold text-slate-300 mb-1">Stock Quantity</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Image URL */}
        <div className="md:col-span-2">
          <label className="block font-bold text-slate-300 mb-1">
            Image URL (Leave empty to trigger clean ProductVisual graphic fallback)
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://cdn.akamai.steamstatic.com/..."
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block font-bold text-slate-300 mb-1">Description</label>
          <textarea
            rows={2}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Product description and details..."
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Packages Section */}
      <div className="space-y-3 pt-2 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-xs text-slate-200">Product Packages & Prices (IQD)</h4>
          <button
            type="button"
            onClick={addPackageRow}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-semibold text-[11px] rounded-lg border border-slate-700 flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Package
          </button>
        </div>

        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {formData.packages.map((pkg, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
              <input
                type="text"
                placeholder="Package Name (e.g. 660 UC)"
                value={pkg.name}
                onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-lg py-1 px-2 text-xs text-white"
              />
              <input
                type="number"
                placeholder="Price IQD"
                value={pkg.price}
                onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                className="w-24 bg-slate-900 border border-slate-800 rounded-lg py-1 px-2 text-xs text-cyan-300 font-bold"
              />
              <input
                type="number"
                placeholder="Old Price"
                value={pkg.oldPrice}
                onChange={(e) => handlePackageChange(idx, 'oldPrice', e.target.value)}
                className="w-24 bg-slate-900 border border-slate-800 rounded-lg py-1 px-2 text-xs text-slate-400"
              />
              <button
                type="button"
                onClick={() => removePackageRow(idx)}
                disabled={formData.packages.length <= 1}
                className="text-slate-500 hover:text-red-400 p-1 disabled:opacity-30"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Flags */}
      <div className="pt-2 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold">
        <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-slate-950 border border-slate-800">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
            className="accent-cyan-500"
          />
          Featured
        </label>
        <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-slate-950 border border-slate-800">
          <input
            type="checkbox"
            name="isTrending"
            checked={formData.isTrending}
            onChange={handleChange}
            className="accent-cyan-500"
          />
          Trending
        </label>
        <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-slate-950 border border-slate-800">
          <input
            type="checkbox"
            name="isFlashDeal"
            checked={formData.isFlashDeal}
            onChange={handleChange}
            className="accent-cyan-500"
          />
          Flash Deal
        </label>
        <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-slate-950 border border-slate-800">
          <input
            type="checkbox"
            name="isTopRated"
            checked={formData.isTopRated}
            onChange={handleChange}
            className="accent-cyan-500"
          />
          Top Rated
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          className="flex-1 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-extrabold text-xs rounded-xl hover:from-cyan-500 hover:to-blue-500 flex items-center justify-center gap-1.5"
        >
          <Save className="w-4 h-4" /> {initialData ? 'Save Changes' : 'Create Product'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
