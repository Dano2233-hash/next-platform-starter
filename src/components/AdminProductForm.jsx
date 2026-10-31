import React, { useState, useEffect } from 'react';
import { CATEGORIES, PLATFORMS } from '../data/categories';
import { X, Plus, Trash2, Save } from 'lucide-react';

export default function AdminProductForm({ initialProduct, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Games',
    platform: 'PC',
    type: 'Game',
    price: 10000,
    oldPrice: 15000,
    stock: 50,
    image: '',
    description: '',
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: [{ id: 'pkg-1', name: 'Standard Edition', price: 10000, oldPrice: 15000 }]
  });

  useEffect(() => {
    if (initialProduct) {
      setFormData({
        ...initialProduct,
        packages: initialProduct.packages || [
          { id: 'pkg-1', name: 'Standard Edition', price: initialProduct.price, oldPrice: initialProduct.oldPrice }
        ]
      });
    }
  }, [initialProduct]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePackageChange = (index, field, value) => {
    const updated = [...formData.packages];
    updated[index] = {
      ...updated[index],
      [field]: field === 'price' || field === 'oldPrice' ? Number(value) : value
    };
    setFormData((prev) => ({ ...prev, packages: updated }));
  };

  const addPackage = () => {
    setFormData((prev) => ({
      ...prev,
      packages: [
        ...prev.packages,
        { id: `pkg-${Date.now()}`, name: 'New Package', price: Number(prev.price) || 5000 }
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
    onSave(formData);
  };

  return (
    <div className="bg-[#090e1c] border border-slate-700/80 rounded-2xl p-6 shadow-2xl">
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
        <h3 className="text-lg font-bold text-white font-['Rajdhani',sans-serif]">
          {initialProduct ? 'Edit Product' : 'Add New Product'}
        </h3>
        <button
          onClick={onCancel}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Product Title *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Red Dead Redemption 2"
              className="w-full bg-[#0c1222] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Image URL (Steam CDN / HTTPS)
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://cdn.akamai.steamstatic.com/..."
              className="w-full bg-[#0c1222] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-[#0c1222] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
            >
              {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Platform
            </label>
            <select
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              className="w-full bg-[#0c1222] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
            >
              {PLATFORMS.filter((p) => p.id !== 'all').map((plat) => (
                <option key={plat.id} value={plat.id}>
                  {plat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Base Price (IQD) *
            </label>
            <input
              type="number"
              name="price"
              required
              value={formData.price}
              onChange={handleChange}
              className="w-full bg-[#0c1222] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Old Price (IQD - for discount badge)
            </label>
            <input
              type="number"
              name="oldPrice"
              value={formData.oldPrice || ''}
              onChange={handleChange}
              className="w-full bg-[#0c1222] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Available Stock Count
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full bg-[#0c1222] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Custom Tag (e.g. 50% OFF, Bestseller)
            </label>
            <input
              type="text"
              name="tag"
              value={formData.tag || ''}
              onChange={handleChange}
              className="w-full bg-[#0c1222] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
            Description
          </label>
          <textarea
            rows={2}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Product details, delivery mode, regional restrictions..."
            className="w-full bg-[#0c1222] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Feature toggles */}
        <div className="pt-2">
          <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
            Store Section Placements
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured || false}
                onChange={handleChange}
                className="rounded accent-cyan-500"
              />
              Featured
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
              <input
                type="checkbox"
                name="isTrending"
                checked={formData.isTrending || false}
                onChange={handleChange}
                className="rounded accent-cyan-500"
              />
              Trending
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
              <input
                type="checkbox"
                name="isFlashDeal"
                checked={formData.isFlashDeal || false}
                onChange={handleChange}
                className="rounded accent-cyan-500"
              />
              Flash Deal
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
              <input
                type="checkbox"
                name="isTopRated"
                checked={formData.isTopRated || false}
                onChange={handleChange}
                className="rounded accent-cyan-500"
              />
              Top Rated
            </label>
          </div>
        </div>

        {/* Packages Editor */}
        <div className="pt-3 border-t border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-300 uppercase">
              Packages / Variations
            </label>
            <button
              type="button"
              onClick={addPackage}
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
            >
              <Plus className="w-3.5 h-3.5" /> Add Package
            </button>
          </div>

          <div className="space-y-2">
            {formData.packages.map((pkg, idx) => (
              <div key={pkg.id || idx} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Package Name (e.g. 660 UC)"
                  value={pkg.name}
                  onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                  className="flex-1 bg-[#0c1222] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                />
                <input
                  type="number"
                  placeholder="Price IQD"
                  value={pkg.price}
                  onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                  className="w-32 bg-[#0c1222] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={() => removePackage(idx)}
                  disabled={formData.packages.length <= 1}
                  className="p-2 text-slate-400 hover:text-red-400 disabled:opacity-30"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center gap-1.5 transition-colors shadow-lg shadow-cyan-950"
          >
            <Save className="w-4 h-4" />
            <span>Save Product</span>
          </button>
        </div>
      </form>
    </div>
  );
}
