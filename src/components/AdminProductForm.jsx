import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X, Save } from 'lucide-react';
import { CATEGORIES, PLATFORMS, PRODUCT_TYPES } from '../data/categories';

export const AdminProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'PC Gaming',
    platform: 'PC',
    type: 'Game',
    price: '',
    oldPrice: '',
    description: '',
    image: '',
    stock: 99,
    rating: 4.8,
    soldCount: 0,
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: []
  });

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name || '',
        category: product.category || 'PC Gaming',
        platform: product.platform || 'PC',
        type: product.type || 'Game',
        price: product.price || '',
        oldPrice: product.oldPrice || '',
        description: product.description || '',
        image: product.image || '',
        stock: product.stock !== undefined ? product.stock : 99,
        rating: product.rating || 4.8,
        soldCount: product.soldCount || 0,
        tag: product.tag || '',
        isFeatured: !!product.isFeatured,
        isTrending: !!product.isTrending,
        isFlashDeal: !!product.isFlashDeal,
        isTopRated: !!product.isTopRated,
        packages: product.packages ? [...product.packages] : []
      });
    }
  }, [product]);

  const handlePackageAdd = () => {
    setFormData((prev) => ({
      ...prev,
      packages: [...prev.packages, { name: '', price: '', oldPrice: '' }]
    }));
  };

  const handlePackageChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.packages];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, packages: updated };
    });
  };

  const handlePackageRemove = (index) => {
    setFormData((prev) => ({
      ...prev,
      packages: prev.packages.filter((_, i) => i !== index)
    }));
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
      packages: formData.packages.map((pkg) => ({
        name: pkg.name,
        price: Number(pkg.price),
        oldPrice: pkg.oldPrice ? Number(pkg.oldPrice) : null
      }))
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <h3 className="text-lg font-bold text-slate-100">
          {product ? 'Edit Product' : 'Add New Product'}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-slate-100"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
            Product Title *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. PUBG Mobile UC"
            className="w-full bg-[#05070f] border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
            Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-[#05070f] border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:border-cyan-500"
          >
            {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
            Platform *
          </label>
          <select
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            className="w-full bg-[#05070f] border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:border-cyan-500"
          >
            {PLATFORMS.filter((p) => p.id !== 'all').map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
            Type *
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full bg-[#05070f] border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:border-cyan-500"
          >
            {PRODUCT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
            Base Price (IQD) *
          </label>
          <input
            type="number"
            required
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="15000"
            className="w-full bg-[#05070f] border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
            Old Price (IQD - Optional)
          </label>
          <input
            type="number"
            value={formData.oldPrice}
            onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
            placeholder="18000"
            className="w-full bg-[#05070f] border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
            Stock Quantity *
          </label>
          <input
            type="number"
            required
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            placeholder="99"
            className="w-full bg-[#05070f] border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
            Tag Badge (e.g. Hot, Sale, Best Seller)
          </label>
          <input
            type="text"
            value={formData.tag}
            onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
            placeholder="Hot"
            className="w-full bg-[#05070f] border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:border-cyan-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
          Image URL (Steam CDN / Direct Image Link)
        </label>
        <input
          type="url"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="https://cdn.akamai.steamstatic.com/steam/apps/..."
          className="w-full bg-[#05070f] border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:border-cyan-500"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
          Description
        </label>
        <textarea
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Product details and redemption instructions..."
          className="w-full bg-[#05070f] border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:border-cyan-500"
        />
      </div>

      {/* Packages Section */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Packages / Variants
          </label>
          <button
            type="button"
            onClick={handlePackageAdd}
            className="flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Package</span>
          </button>
        </div>

        {formData.packages.map((pkg, idx) => (
          <div key={idx} className="flex items-center gap-2 bg-[#05070f] p-2.5 rounded-xl border border-slate-800">
            <input
              type="text"
              placeholder="Package Name (e.g. 660 UC)"
              value={pkg.name}
              onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-100"
            />
            <input
              type="number"
              placeholder="Price IQD"
              value={pkg.price}
              onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
              className="w-28 bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-100"
            />
            <button
              type="button"
              onClick={() => handlePackageRemove(idx)}
              className="p-2 text-slate-500 hover:text-rose-400"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Section Placement Checkboxes */}
      <div className="pt-3 border-t border-slate-800">
        <label className="block text-xs font-bold uppercase text-slate-400 mb-2">
          Featured Sections
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="rounded accent-cyan-500"
            />
            <span>Featured Section</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isTrending}
              onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
              className="rounded accent-cyan-500"
            />
            <span>New & Trending</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFlashDeal}
              onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
              className="rounded accent-cyan-500"
            />
            <span>Flash Deals</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isTopRated}
              onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
              className="rounded accent-cyan-500"
            />
            <span>Top Rated</span>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-300 hover:bg-slate-800 text-xs font-bold"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs shadow-lg shadow-cyan-950/50"
        >
          <Save className="w-4 h-4" />
          <span>Save Product</span>
        </button>
      </div>
    </form>
  );
};
